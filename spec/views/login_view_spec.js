describe('App.Views.Login', function() {
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
    subject = new App.Views.Login({el: '#applicationContainer'});
  });

  afterEach(function() {
    _.bindAll.restore();
  });

  it("has a template", function() {
    expect(subject.template()).to.exist;
  });

  describe("events", function() {
    it("has a login success event", function() {
      expect(subject.events["click #submit"]).to.equal("handleLoginSuccess");
    });
  });

  it("calls render on initialize", function() {
    sinon.spy(subject, "render");
    subject.initialize();
    expect(subject.render).to.have.been.called;
  });

  it("#render", function() {
    subject.render();
    expect(subject.$el).not.to.be.empty;
  });

  describe("handlers", function() {
    it("handles login success", function() {
      var loginSuccess = sinon.spy();
      sinon.spy(App.Dispatcher, "trigger");
      subject.handleLoginSuccess();
      expect(App.Dispatcher.trigger).to.have.been.calledWith("loginSuccess");
      App.Dispatcher.trigger.restore();
    });
  });
});
