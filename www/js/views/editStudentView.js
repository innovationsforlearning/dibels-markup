App.Views.EditStudent = Backbone.View.extend({
  template: App.templates.editStudent,

  events: {
    "click .js-editStudentButtonClose": "handleCloseRequest",
    "click #js-editReadingStage": "handleTabRequest",
    "click #js-editAssignments": "handleTabRequest",
    "click #js-editNotes": "handleTabRequest",
  },

  ids: [
    "js-editReadingStage",
    "js-editAssignments",
    "js-editNotes"
  ],

  views: {},

  editContainer: ".js-editContainer",
  $editContainer: null,

  initialize: function() {
    _.bindAll(this);
    this.render();
    this.$editContainer = $(this.editContainer);
    this.views["js-editNotes"] = new App.Views.EditStudentNotesView({el: this.editContainer});
    this.views["js-editReadingStage"] = new App.Views.EditStudentReadingStageView({el: this.editContainer});
    this.makeActive(this.ids[2]);

  },

  render: function() {
    this.$el.html(this.template(this.templateJSON()));

    return this;
  },

  templateJSON: function() {
    return {
      reading_stage: App.selectedStudent.get("reading_stage"),
      student_shortname: App.selectedStudent.shortName()
    }
  },

  makeActive: function(tabId){
    $("#" + tabId).addClass("st-selected");
    this.views[tabId].render();
  },

  makeInactive: function(){
    for(var i=0;i< this.ids.length; i=i+1){
      $("#" + this.ids[i]).removeClass("st-selected");
    }
    this.$editContainer.empty();
  },

  handleTabRequest: function(tabClickEvent) {
    console.log("handleTabRequest:"+tabClickEvent.currentTarget.id);
    this.makeInactive();
    this.makeActive(tabClickEvent.currentTarget.id);
    return false;
  },

  handleCloseRequest: function () {
    this.$el.empty();
  }

});
