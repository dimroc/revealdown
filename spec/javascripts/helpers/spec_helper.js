documentEach = function(func) {
  beforeEach(function() {
    func();
    RevealDown.loadBehaviors();
  });
};

afterEach(function() {
  $("#jasmine_content").html('');
});