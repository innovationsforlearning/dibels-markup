App.Views.NavMain = Backbone.View.extend({
  template: App.templates.navMain,

  events: {
    'click .js-menuToggle': 'handleToggleMenu',
    'click .js-manageButton': 'handleDisplayManage',
    'click .js-logout': 'handleLogout'
  },

  initialize: function() {
    _.bindAll(this);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  },

  handleToggleMenu: function() {
    $(".js-mainNav").toggleClass("st-show");
  },

  handleDisplayManage: function() {
    App.browser = window.open(App.Config.tutormateUrl() + "/students/manage", "_blank", "location=yes");
    App.browser.addEventListener("exit", this.handleInAppBrowserExit);
    return false;
  },

  handleInAppBrowserExit: function() {
    App.Dispatcher.trigger("resyncRequest");
  },

  handleLogout: function() {
    App.Dispatcher.trigger("endSessionLogoutRequested");
  }
});
