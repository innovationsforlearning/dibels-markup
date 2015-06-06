App.Views.ConferenceManagementSingle = Backbone.View.extend({
  template: App.templates.conferenceManagementSingle,

  conferenceGroups: {},

  initialize: function() {
    _.bindAll(this);
    App.selectedSkill = "";
    this.listen();
    this.render();
  },

  listen: function() {
    this.listenTo(App.Dispatcher, "addStudentRequested", this.handleAddStudentRequested);
  },

  render: function() {
    this.$el.html(this.template());
    this.$tbody = this.$el.find("tbody");

    var studentConferences = App.conferences.where({conference_type: "user", classroom_id: App.loggedInTeacher.classroom_id});
    studentConferences = _.reject(studentConferences, function(conference){
      return (App.students.findWhere({id: conference.get("user_ids")[0]}));
    });
    _.each(studentConferences, function(studentConference) {
      var view = this.conferenceGroups[studentConference.get("id")] = new App.Views.ConferenceStudentSingle({ model: studentConference});
      this.$tbody.append(view.render().el);
    }, this);
    return this;
  },

  handleAddStudentRequested: function() {
    this.$el.empty();
    return false;
  }
});
