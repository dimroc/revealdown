describe("slide tracker", function() {
  var $container = null;
  var htmlFixture = "<div id='revealdown' data-behavior='backbone'><div class='slide-tracker'>" +
      "<ul class='slides'>" +
      "</ul>" +
      "<div class='add_slide'>+</div>" +
      "<div class='remove_slide'>-</div>" +
      "</div>" +
      "<div class='slide'></div>" +
      "<script id='slide_marker_template' type='text/html'>" +
        "<div class='slide_marker'>" +
        "<p class='slide_order'>{{ order }}</p>" +
        "<p>{{ caption }}</p>" +
        "</div>" +
      "</script>" +
      "<script id='slide_template' type='text/html'>" +
        "<section class='input'>" +
        "<textarea class='vertical-fluid' data-bind='content'></textarea>" +
        "</section>" +
        "<section class='output raw' data-behavior='highlight'><pre class='vertical-fluid'><code class='html'></code></pre></section>" +
        "<section class='output rendered vertical-fluid'></section>" +
      "</script>" +
      "</div>";

  documentEach(function() {
    // Always reload and recreate the fixture via
    // jQuery to prevent test pollution.
    $container = $(htmlFixture);
    loadFixture($container);
  });

  it("should initialize one slide entry on load", function() {
    console.log($container);
    var $slides = $container.find(".slides");
    expect($slides.find(".slide_marker").length).toEqual(1);
    expect($slides.text()).toContain("1");
  });

  it("should allow the user to add more slides", function() {
    $container.find(".add_slide").click();
    expect($container.find(".slide_marker").length).toEqual(2);
    expect($container.text()).toContain("2");
  });

  it("should not allow the user to remove the only slide", function() {
    expect($container.find(".remove_slide").hasClass('disabled')).toBe(true);
    $container.find(".remove_slide").click();
    expect($container.find(".slide_marker").length).toEqual(1);
  });

  describe("when there are multiple slides", function() {
    var initialInput = "Here is some INITIAL input";
    var lastInput = "Here is some final input";
    beforeEach(function() {
      var $textarea = $container.find(".input textarea");
      $textarea.val('').sendkeys(initialInput);

      $container.find(".add_slide").click();
      $container.find(".add_slide").click();
      $textarea = $container.find(".input textarea");
      $textarea.val(lastInput);
    });

    it("should allow the user to switch between slides", function() {
      var $selected = $container.find(".slides .selected");
      var $textarea = $container.find(".input textarea");

      expect($textarea.val()).toContain(lastInput);
      expect($selected.text()).toContain("3");

      var $slide = $container.find(".slides .slide_marker").first();
      $slide.click();

      $selected = $container.find(".slides .selected");
      $textarea = $container.find(".input textarea");

      // TODO: Figure out how to have binding persist data in these tests
      expect($textarea.text()).not.toContain(initialInput);
      expect($selected.text()).toContain("1");
    });

    it("should allow the user to remove a slide", function() {
      var $textarea = $container.find(".input textarea");

      expect($textarea.val()).toContain(lastInput);
      expect($container.find(".slide_marker").length).toEqual(3);

      $container.find(".remove_slide").click();

      $textarea = $container.find(".input textarea");
      expect($textarea.val()).not.toContain(lastInput);
      expect($container.find(".slide_marker").length).toEqual(2);
    });

    describe("and one has been removed", function() {
      beforeEach(function() {
        $container.find(".slide_marker:first-child").click();
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