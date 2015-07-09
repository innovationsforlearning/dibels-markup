App.Views.Tile = Backbone.View.extend({
  template: App.templates.tile,

  selectedClass: "",

  events: {
    "click": "handleClick"
  },

  initialize: function(options) {
    _.bindAll(this);
    this.index = options.index;
    this.listen();
  },

  listen: function() {
    this.listenTo(App.Dispatcher, "StimulusChangeRequested:" + App.Config.skill.readingStrategies, this.handleStimulusChangeRequested);
    this.listenTo(App.Dispatcher, "StimulusChangeRequested:" + App.Config.skill.letterNames, this.handleStimulusChangeRequested);
    this.listenTo(App.Dispatcher, "StimulusChangeRequested:" + App.Config.skill.letterSounds, this.handleStimulusChangeRequested);
    this.listenTo(App.Dispatcher, "StimulusChangeRequested:" + App.Config.skill.sightWords, this.handleStimulusChangeRequested);
    this.listenTo(App.Dispatcher, "StimulusChangeRequested:" + App.Config.skill.onsetRimes, this.handleStimulusChangeRequested);
    this.listenTo(App.Dispatcher, "StimulusChangeRequested:" + App.Config.skill.stageStories, this.handleStimulusChangeRequested);
    this.listenTo(App.Dispatcher, "StimulusChangeRequested:" + App.Config.skill.leveledTexts, this.handleStimulusChangeRequested);
  },

  render: function() {
    this.$el.html(this.template(this.templateJSON()));
    return this;
  },

  templateJSON: function() {
    return {
      index: this.index,
      stimulusValue: this.model.get("value"),
      assessmentClass: "st-" + this.model.get("assessment"),
      selectedClass: this.selectedClass
    };
  },

  setAssessment: function(assessment) {
    this.model.set({assessment: assessment, client_updated_at: App.newISODate()});
    this.model.save(null, {description:"tileView.setAssessment"})
      .fail(App.logRemoteSaveError);
    this.render();
  },

  handleClick: function() {
    App.selectedStimulus = this.model;
    App.Dispatcher.trigger("StimulusChangeRequested:" + this.model.get("skill"),
      {
        skill: this.model.get("skill"),
        value: this.model.get("value"),
        model: this.model
      });
    App.Dispatcher.trigger("buttonAssessmentClicked", this.model.get("assessment"));
    return false;
  },

  handleButtonAssessmentClicked: function(assessment) {
    this.setAssessment(assessment);
  },

  handleStimulusChangeRequested: function(options) {
    if ((options.value === this.model.get("value")) && (options.skill === this.model.get("skill"))) {
      this.selectedClass = "st-selected";
      this.listenTo(App.Dispatcher, "buttonAssessmentClicked", this.handleButtonAssessmentClicked);
    } else {
      this.selectedClass = "";
      this.stopListening(App.Dispatcher, "buttonAssessmentClicked");
    }
    this.render();
  }
});
