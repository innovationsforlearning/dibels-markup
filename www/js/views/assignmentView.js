App.Views.Assignment = Backbone.View.extend({
  template: App.templates.assignments,

  events: {
    "click" : "removeView"
  },

  initialize: function() {
    _.bindAll(this);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  },

  removeView: function() {
    this.$el.empty();
  }
});
