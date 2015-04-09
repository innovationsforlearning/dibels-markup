App.Views.MatrixMenuTab = Backbone.View.extend({
  template: App.templates.tab,

  events: {
    "click": "handleClick"
  },

  initialize: function(options) {
    _.bindAll(this);
    this.label = options.label;
    this.status = "";
  },

  render:  function() {
    this.$el.html(this.template(this.templateJSON()));
    return this;
  },

  templateJSON: function() {
    return {
      label: this.label,
      status: this.status
    };
  },

  makeActive: function(f){
    this.status = (f?"st-active":"");
    this.render();
  },

  handleClick: function(){
    this.makeActive(true);
  }
});
