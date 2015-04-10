describe('App.Views.StimuliTilesSightWords', function() {
  var subject;
  var xhr;
  var requests;

  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };

    appendFixture("div", { class: "js-stimuliTiles" });
    subject = new App.Views.StimuliTilesSightWords({el: '.js-stimuliTiles'});
  });

  it("has a reference to the element", function() {
    expect(subject.$el).to.exist;
  });

  it("has a template", function() {
    expect(subject.template()).to.exist;
  });

  describe("initialize", function() {
    it("calls render on initialize", function() {
      expect(subject.$el).not.to.be.empty;
    });

    it("creates a tab view", function() {
      expect(subject.$el.first()).not.to.be.undefined;
    });

  });

  it("renders", function() {
    subject.render();
    expect(subject.$el).not.to.be.empty;
  });
});