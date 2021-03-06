describe('App.Views.ConferenceManagement', function() {
  var subject;
  var xhr;
  var requests;

  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };

    sinon.stub(_, "bindAll");
    subject = new App.Views.ConferenceManagement({ el: '#applicationContainer' });
  });

  afterEach(function() {
    _.bindAll.restore();
  });

  it("has a template", function() {
    expect(subject.template()).to.exist;
  });

  it("#events", function() {
    expect(subject.events['click .js-manageButton']).to.equal('handleDisplayManage');
  });

  describe("#initialize", function() {
    it("calls render on initialize", function() {
      sinon.spy(subject, "render");
      subject.initialize();
      expect(subject.render).to.have.been.called;
    });

    it("calls listen on initialize", function() {
      sinon.spy(subject, "listen");
      subject.initialize();
      expect(subject.listen).to.have.been.called;
    });

    it("creates a students collection", function() {
      expect(App.students).to.be.an.instanceOf(App.Collections.Students);
    });

    it("sets the selected skill to nothing", function() {
      expect(App.selectedSkill).to.equal("");
    });
  });

  describe("#listen", function() {
    it("listens for the startSessionRequested", function() {
      sinon.spy(subject, "listenTo");
      subject.listen();
      expect(subject.listenTo).to.have.been.calledWith(App.Dispatcher, "startSessionRequested", subject.handleStartSessionRequested);
    });

    it("listens for the endSessionRequested", function() {
      sinon.spy(subject, "listenTo");
      subject.listen();
      expect(subject.listenTo).to.have.been.calledWith(App.Dispatcher, "endSessionRequested", subject.handleEndSessionRequested);
    });
  });

  describe("#render", function() {
    it("#renders", function() {
      subject.render();
      expect(subject.$el).not.to.be.empty;
    });

    it("creates a conference group view", function() {
      subject.render();
      expect($(".js-studentGroup").length).not.to.equal(0);
    });

    it("creates a conference group dropdown view", function() {
      subject.render();
      expect($(".js-groupDropdown").length).not.to.equal(0);
    });

    it("creates a conference student view", function() {
      subject.render();
      expect($(".icon-student").length).not.to.equal(0);
    });
  });

  describe("#handleStartSessionRequested", function() {
    beforeEach(function() {
      App.students = new App.Collections.Students();
      App.students.add(App.roster.at(0));
      App.students.add(App.roster.at(1));
      App.students.add(App.roster.at(2));

      App.selectedStudent = App.students.at(0);
      App.selectedSkill = "";
    });

    it("creates a teacher workspace view", function() {
      subject.handleStartSessionRequested();
      expect(subject.teacherWorkspace).to.be.an.instanceOf(App.Views.TeacherWorkspace);
    });

    it("removes itself", function() {
      subject.handleStartSessionRequested();
      expect($("container--management container").length).to.equal(0);
    });

    it("calls #setStartSessionTime", function() {
      sinon.spy(subject, "setStartSessionTime");
      subject.handleStartSessionRequested();
      expect(subject.setStartSessionTime).to.have.been.called;
    });

    it("adds an event listener for pause on the document", function() {
      sinon.spy(document, "addEventListener");
      subject.handleStartSessionRequested();
      expect(document.addEventListener).to.have.been.calledWith("pause", subject.handlePauseEvent, false);
      document.addEventListener.restore();
    });
  });

  describe("#handleDisplayManage", function() {
    it("opens an in-app-browser", function() {
      subject.handleDisplayManage();
      expect(window.open).to.have.been.calledWith(App.Config.tutormateUrl() + "/students/manage", "_blank", "location=yes");
    });
  });

  describe("#setStartSessionTime", function() {
    it("creates a ConferenceSession model", function() {
      subject.setStartSessionTime();
      expect(subject.model).to.be.an.instanceOf(App.Models.ConferenceSession);
    });

    xit("calls save on the model", function() {
      //var backup = _.clone(App.Models.ConferenceSession);
      // sinon.stub(App.Models, 'ConferenceSession').returns({
      //   save: sinon.stub().returns({ fail: function(){}})
      // });
      // subject.setStartSessionTime();
      // expect(subject.model.save).to.have.been.called;
      // App.Models.ConferenceSession.restore();
      //App.Models.ConferenceSession = backup;
    });
  });

  describe("#setEndSessionTime", function() {
    it("sets a new date on the model", function() {
      subject.setStartSessionTime();
      sinon.spy(subject.model, "set");
      subject.setEndSessionTime();
      expect(subject.model.set).to.have.been.called;
      // expect(subject.model.set).to.have.been.calledWith({ended_at: new Date()}); #TODO figure out Date stubs
    });

    it("stops listening to the pause event", function() {
      subject.setStartSessionTime();
      sinon.spy(document, "removeEventListener");
      subject.setEndSessionTime();
      expect(document.removeEventListener).to.have.been.calledWith("pause", subject.handlePauseEvent);
      document.removeEventListener.restore();
    });
  });

  describe("#handlePauseEvent", function() {
    it("calls set end session time", function() {
      subject.setStartSessionTime();
      sinon.spy(subject, "setEndSessionTime");
      subject.handlePauseEvent();
      expect(subject.setEndSessionTime).to.have.been.called;
    });

    it("calls save on the model", function() {
      subject.setStartSessionTime();
      sinon.spy(subject.model, "save");
      subject.handlePauseEvent();
      expect(subject.model.save).to.have.been.called;
    });
  });

  describe("#handleEndSessionRequested", function() {
    beforeEach(function(){
      App.applicationView = { handleResumeEvent: function(){} };
    });

    xit("calls setEndSessionTime", function() {
      subject.setStartSessionTime();
      sinon.spy(subject, "setEndSessionTime");
      subject.handleEndSessionRequested();
      expect(subject.setEndSessionTime).to.have.been.called;
    });

    xit("calls the handleResumeEvent", function() {
      sinon.spy(App.applicationView, "handleResumeEvent");
      subject.setStartSessionTime();
      subject.handleEndSessionRequested();
      expect(App.applicationView.handleResumeEvent).to.have.been.called;
    });
  });
});
