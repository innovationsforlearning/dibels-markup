App.Views.ButtonClear = Backbone.View.extend({
  template: App.templates.buttonClear,

  selectedClass: "",

  events: {
    "click" : "handleClick"
  },

  initialize: function() {
    _.bindAll(this);
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.templateJSON()));
  },

  templateJSON: function(){
    return {
      selectedClass: this.selectedClass
    };
  },

  makeActive: function(){
    this.selectedClass = "st-selected";
    this.render();
  },

  makeInactive: function(){
    this.selectedClass = "";
    this.render();
  },

  handleClick: function() {
    console.log("buttonClear clicked");
    App.Dispatcher.trigger("buttonAssessmentClicked","clear");
    return false;
  }

});
