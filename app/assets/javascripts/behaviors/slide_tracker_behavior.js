(function() {
  var slide_count = null;

  var selectSlideEntry = function($element, context) {
    context.find(".selected").removeClass("selected btn-info");
    $element.addClass("selected btn-info");
  };

  var createSlideEntry = function(context) {
    var $slide_entry = $(ich.slide_entry({order: ++slide_count, caption: "Some Caption"}));
    selectSlideEntry($slide_entry, context);
    $slide_entry.click(function() {
      selectSlideEntry($(this), context);
    });

    context.find(".slides").append($slide_entry);
  };

  RevealDown.Behaviors.slide_tracker = function(context) {
    slide_count = 0;
    createSlideEntry(context);
    context.find(".add_slide").click(function() {
      createSlideEntry(context);
    });
  };
})();
