App.Views.Matrix = Backbone.View.extend({
  template: App.templates.matrix,

  tiles: {},

  initialize: function() {
    _.bindAll(this);
    this.render();
    this.matrixMenuView = new App.Views.MatrixMenu({ el: ".js-matrixMenu" });
    this.tiles.letter_names = new App.Views.StimuliTilesLetterNames({ el: ".js-stimuliTiles" });
    this.tiles.letter_sounds = new App.Views.StimuliTilesLetterSounds({ el: ".js-stimuliTiles" });
    this.tiles.sight_words = new App.Views.StimuliTilesSightWords({ el: ".js-stimuliTiles" });
    this.tiles.onset_rimes = new App.Views.StimuliTilesOnsetRimes({ el: ".js-stimuliTiles" });
    this.tiles.stage_stories = new App.Views.StimuliTilesStageStories({ el: ".js-stimuliTiles" });
    this.tiles.leveled_texts = new App.Views.StimuliTilesLeveledTexts({ el: ".js-stimuliTiles" });
    this.matrixStudentSelectorView = new App.Views.MatrixStudentSelector({ el: ".js-matrixStudentSelector" });
    this.listen();
  },

  listen: function() {
    this.listenTo(App.Dispatcher, "matrixStudentSelectorTabActiveRequest", this.handleStudentChangeRequest);
    this.listenTo(App.Dispatcher, "matrixRerenderRequest", this.handleRerenderRequest);
  },

  render: function() {
    this.$el.html(this.template());
  },

  handleRerenderRequest: function() {
    var tile = this.tiles[App.selectedSkill];
    tile.handleSkillReplaceRequest();
    tile.render();
  },

  handleStudentChangeRequest: function(selectedStudents) {
    var tile = this.tiles[App.selectedSkill];
    tile.handleSkillReplaceRequest();
    tile.render();
    var stage = (selectedStudents.previous ? selectedStudents.previous.displayedReadingStage() : null);
    if ((selectedStudents.current.displayedReadingStage() === stage) && ( App.selectedStimulus )) {
      // NOTE: if stimuli data is consistent selectedStimulus will find exactly 1 match
      // but while the data is not consistent App.selectedStimulus may find 0 or >1 match
      App.selectedStimulus = App.stimuli.where(
        {
          user_id: selectedStudents.current.get("id"),
          reading_stage: stage,
          skill: App.selectedStimulus.get("skill"),
          value: App.selectedStimulus.get("value")
        })[0];
      if (App.selectedStimulus) {
        App.Dispatcher.trigger("StimulusChangeRequested:" + App.selectedStimulus.get("skill"),
          {
            skill: App.selectedStimulus.get("skill"),
            value: App.selectedStimulus.get("value"),
            model: App.selectedStimulus
          }
        );
        App.Dispatcher.trigger("buttonAssessmentClicked", App.selectedStimulus.get("assessment"));
      }
    } else {
      App.Dispatcher.trigger("buttonAssessmentClicked", "none");
    }
  }
});
