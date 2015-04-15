describe('App.Views.MenuAssessment', function() {
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
    appendFixture("div", { class: "js-menuAssessment" });
    subject = new App.Views.MenuAssessment({el: '.js-menuAssessment'});
  });

  afterEach(function() {
    _.bindAll.restore();
  });

  it("has a template", function() {
    expect(subject.template()).to.exist;
  });

  describe("initialize", function() {
    it("calls render on initialize", function() {
      sinon.spy(subject, "render");
      subject.initialize();
      expect(subject.render).to.have.been.called;
    });

    it("creates a button mastered view", function() {
      expect(subject.buttonMasteredView).to.be.an.instanceOf(App.Views.ButtonMastered);
    });

    it("creates a button learning view", function() {
      expect(subject.buttonLearningView).to.be.an.instanceOf(App.Views.ButtonLearning);
    });

    it("creates a button needs work view", function() {
      expect(subject.buttonNeedsWorkView).to.be.an.instanceOf(App.Views.ButtonNeedsWork);
    });

    it("creates a button clear view", function() {
      expect(subject.buttonClearView).to.be.an.instanceOf(App.Views.ButtonClear);
    });
  });

  it("renders", function() {
    subject.render();
    expect(subject.$el).not.to.be.empty;
  });
});
