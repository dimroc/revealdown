describe("slide tracker", function() {
  var $container = null;
  var htmlFixture = "<div data-behavior='slide_tracker'>" +
      "<div class='slides'>" +
      "</div>" +
      "<div class='add_slide'>+</div>" +
      "<script id='slide_entry' type='text/html'>" +
        "<div class='slide_entry'>" +
        "<p>{{ order }}</p>" +
        "<p>{{ caption }}</p>" +
        "</div>" +
      "</script>" +
      "</div>";

  documentEach(function() {
    // Always reload and recreate the fixture via
    // jQuery to prevent test pollution.
    $container = $(htmlFixture);
    loadFixture($container);
  });

  it("should initialize one slide entry on load", function() {
    var $slides = $container.find(".slides");
    expect($slides.find(".slide_entry").length).toEqual(1);
    expect($slides.text()).toContain("1");
  });

  it("should allow the user to add more slides", function() {
    $container.find(".add_slide").click();
    expect($container.find(".slide_entry").length).toEqual(2);
    expect($container.text()).toContain("2");
  });

  describe("when there are multiple slides", function() {
    beforeEach(function() {
      $container.find(".add_slide").click();
    });

    it("should allow the user to switch between slides", function() {
      var $selected = $container.find(".slides .selected");
      expect($selected.text()).toContain("2");

      var $slide = $container.find(".slides .slide_entry").first();
      $slide.click();

      $selected = $container.find(".slides .selected");
      expect($selected.text()).toContain("1");
    });
  });
});