describe("slide tracker", function() {
  var $container = null;
  var htmlFixture = "<div data-behavior='slide_tracker'>" +
      "<div class='slides'>" +
      "</div>" +
      "<div class='add_slide'>+</div>" +
      "<div class='remove_slide'>+</div>" +
      "<script id='slide_entry' type='text/html'>" +
        "<div class='slide_entry'>" +
        "<p class='slide_order'>{{ order }}</p>" +
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

  it("should not allow the user to remove the only slide", function() {
    expect($container.find(".remove_slide").hasClass('disabled')).toBe(true);
    $container.find(".remove_slide").click();
    expect($container.find(".slide_entry").length).toEqual(1);
  });

  describe("when there are multiple slides", function() {
    beforeEach(function() {
      $container.find(".add_slide").click();
      $container.find(".add_slide").click();
    });

    it("should allow the user to switch between slides", function() {
      var $selected = $container.find(".slides .selected");
      expect($selected.text()).toContain("3");

      var $slide = $container.find(".slides .slide_entry").first();
      $slide.click();

      $selected = $container.find(".slides .selected");
      expect($selected.text()).toContain("1");
    });

    it("should allow the user to remove a slide", function() {
      expect($container.find(".slide_entry").length).toEqual(3);
      $container.find(".remove_slide").click();
      expect($container.find(".slide_entry").length).toEqual(2);
    });

    describe("and one has been removed", function() {
      beforeEach(function() {
        $container.find(".slide_entry:first-child").click();
        $container.find(".remove_slide").click();
      });

      it("should renumber the slides", function() {
        expect($container.text()).toContain("1");
        expect($container.text()).toContain("2");
      });

      it("should add a slide with the correct order", function() {
        expect($container.text()).not.toContain("3");
        $container.find(".add_slide").click();
        expect($container.text()).toContain("3");
      });
    });
  });
});