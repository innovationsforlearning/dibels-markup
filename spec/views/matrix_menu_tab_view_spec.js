describe('App.Views.MatrixMenuTab', function() {
  var subject;
  var xhr;
  var requests;

  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };

    appendFixture("div", { class: "js-tab" });
    subject = new App.Views.MatrixMenuTab({el: '.js-tab'});
  });

  it("has a reference to the element", function() {
    expect(subject.$el).to.exist;
  });

  it("has a template", function() {
    expect(subject.template()).to.exist;
  });

  it("calls render on initialize", function() {
    expect(subject.$el).not.to.be.empty;
  });

  it("renders", function() {
    expect(subject.$el).not.to.be.empty;
  });

});

