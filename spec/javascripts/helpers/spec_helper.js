loadFixture = function(fixture) {
  $("#jasmine_content").html(fixture);
};

// Allow initialization code to be run before
// initializing the application.
// In other words, allow code to be run or fixtures to
// be loaded before firing our equivalent of document.ready()
// Only run once per spec.
documentEach = function(func) {
  beforeEach(function() {
    jasmine.Clock.useMock();
    jasmine.Ajax.useMock();

    func();
    ich.grabTemplates();
    RevealDown.init();
  });
};

afterEach(function() {
  $("#jasmine_content").html('');
  ich.clearAll();
});