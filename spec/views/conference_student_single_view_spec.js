describe('App.Views.ConferenceStudentSingle', function() {
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
    subject = new App.Views.ConferenceStudentSingle({ el: '#applicationContainer', model: App.conferences.get(76) });
  });

  afterEach(function() {
    _.bindAll.restore();
  });

  it("has a template", function() {
    expect(subject.template()).to.exist;
  });

  it("sets the student model", function() {
    expect(subject.studentModel).to.be.an.instanceOf(App.Models.Student);
  });

  it("#events", function() {
    expect(subject.events["click .js-addStudent"]).to.equal("handleAddStudent");
  });

  it("#renders", function() {
    subject.render();
    expect(subject.$el).not.to.be.empty;
  });

  describe("#templateJSON", function() {
    it("sets the shortName", function() {
      expect(subject.templateJSON().shortName).to.equal("CLARK K.");
    });

    it("sets the reading stage", function() {
      expect(subject.templateJSON().readingStage).to.equal(3);
    });

    it("sets the reading stage growth", function() {
      expect(subject.templateJSON().readingStageGrowth).to.equal(2);
    });

    it("sets the daysOnCurrentReadingStage", function() {
      expect(subject.templateJSON().daysOnCurrentReadingStage).to.be.a("number");
    });

    it("sets the daysSinceLastSession", function() {
      var clock = sinon.useFakeTimers(moment.utc([2015,4,29]).valueOf());
      expect(subject.templateJSON().daysSinceLastSession).to.equal(1);
      clock.restore();
    });

    it("sets the number_per_week", function() {
      expect(subject.templateJSON().numberPerWeek).to.equal(3);
    });
  });

  describe("helper functions", function() {
    xit("#daysOnCurrentReadingStage", function() {
      expect(subject.daysOnCurrentReadingStage()).to.equal();
    });

    it("#daysSinceLastSession", function() {
      var clock = sinon.useFakeTimers(moment.utc([2015,4,29]).valueOf());
      expect(subject.daysSinceLastSession()).to.to.equal(1);
      clock.restore();
    });
  });

  describe("#handleAddStudent", function() {
    it("sets the selected student", function() {
      subject.handleAddStudent();
      expect(App.selectedStudent).to.equal(subject.studentModel);
    });

    it("adds the student model to App.students", function() {
      App.students = new App.Collections.Students();
      subject.handleAddStudent();
      expect(App.students.length).to.equal(1);
    });

    it("triggers addStudentRequested", function() {
      sinon.spy(App.Dispatcher, "trigger");
      subject.handleAddStudent();
      expect(App.Dispatcher.trigger).to.have.been.calledWith("addStudentRequested");
      App.Dispatcher.trigger.restore();
    });
  });
});
