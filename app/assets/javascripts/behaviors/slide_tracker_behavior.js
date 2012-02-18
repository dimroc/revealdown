(function() {
  var slide_count = null;

  var recountSlides = function(context) {
    context.find("*.slide_entry").each(function(i, e) {
      slide_count = i + 1;
      $(e).find(".slide_order").text(slide_count);
    });
  };

  var refreshRemoveSlideFunctionality = function(context) {
    if(context.find(".slide_entry").length > 1) {
      context.find(".remove_slide").removeClass("disabled");
    } else {
      context.find(".remove_slide").addClass("disabled");
    }
  };

  var selectSlideEntry = function($element, context) {
    context.find(".selected").removeClass("selected active");
    $element.addClass("selected active");
  };

  var createSlideEntry = function(context) {
    var $slide_entry = $(ich.slide_entry({order: ++slide_count, caption: "Some Caption"}));
    selectSlideEntry($slide_entry, context);
    $slide_entry.click(function() {
      selectSlideEntry($(this), context);
    });

    context.find(".slides").append($slide_entry);
    refreshRemoveSlideFunctionality(context);
  };

  RevealDown.Behaviors.slide_tracker = function(context) {
    slide_count = 0;
    createSlideEntry(context);

    context.find(".add_slide").click(function() {
      createSlideEntry(context);
    });

    refreshRemoveSlideFunctionality(context);

    context.find(".remove_slide").click(function() {
      if(!$(this).hasClass("disabled") && context.find(".slide_entry").length > 1) {
        context.find(".slide_entry.selected").remove();
        selectSlideEntry(context.find(".slide_entry").first(), context);
        refreshRemoveSlideFunctionality(context);
        recountSlides(context);
      }
    });
  };
})();
