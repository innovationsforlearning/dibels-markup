App.Views.ButtonLetters = Backbone.View.extend({
  template: App.templates.buttonLetters,

  initialize: function() {
    _.bindAll(this);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  }
});
