App.Views.MatrixMenu = Backbone.View.extend({

  template: App.templates.matrixMenu,

  gridClass: "js-matrixMenuTabs",
  tabClassName: "menu--tab grid-cell",
  tabTag: "a",
  tabs: [
    { label: "LETTER NAMES & SOUNDS", key: App.Config.skill.letters},
    { label: "SIGHT WORDS", key: App.Config.skill.sightWords},
    { label: "ONSETS & RIMES", key: App.Config.skill.onsetRimes},
    { label: "AFFIXES", key: App.Config.skill.affixes},
    { label: "STORIES", key: App.Config.skill.stories}
  ],

  initialize: function() {
    _.bindAll(this);
    this.render();
    this.listen();
    this.Letters.makeActive();
  },

  listen: function (){
    this.listenTo(App.Dispatcher, "matrixMenuTabActiveRequest", this.handleMatrixMenuTabActveRequest);
  },

  render: function(){
    this.$el.html(this.template(this.templateJSON()));
    this.$gridClass = $("." + this.gridClass);
    var that = this;
    _.each(this.tabs, function(tab){
      var options = {
        tagName: that.tabTag,
        className: that.tabClassName,
        label: tab.label
      };
      var view = that[tab.key] = new App.Views.MatrixMenuTab(options);
      that.$gridClass.append(view.render().el);
    });

    this.toggleTab = new App.Views.ButtonMatrixToggle({el: ".js-buttonMatrixToggle"});
    this.$gridClass.append(this.toggleTab.render().el);
  },

  templateJSON: function() {
    return {
      jsClass: this.gridClass
    };
  },

  handleMatrixMenuTabActveRequest: function(selectedTab){
    var that = this;
    _.each(this.tabs, function(tab){
      if(selectedTab.label === tab.label) {
        selectedTab.makeActive();
        App.Dispatcher.trigger("stimuliTilesViewRequest", tab.key);
      } else {
        that[tab.key].makeInactive();
      }
    });
  }
});
