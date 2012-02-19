(function() {
  RevealDown.Views = RevealDown.Views || {};

  var recountSlides = function(context) {
    var slide_count = 0;
    context.find("*.slide_entry").each(function(i, e) {
      $(e).find(".slide_order").text(++slide_count);
    });

    return slide_count;
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

  RevealDown.Views.AppView = Backbone.View.extend({
    initialize: function() {
      this.slide_count = 0;
      this.presentation = new RevealDown.Collections.Presentation();
      this.addSlide();
    },

    events: {
      "click .add_slide": "addSlide",
      "click .remove_slide": "removeSlide"
    },

    addSlide: function() {
      var $slide_entry = $(ich.slide_entry({order: ++this.slide_count, caption: "Some Caption"}));
      var context = this.$(".slide-tracker");
      selectSlideEntry($slide_entry, context);
      $slide_entry.click(function() {
        selectSlideEntry($(this), context);
      });

      context.find(".slides").append($slide_entry);
      refreshRemoveSlideFunctionality(context);
    },

    removeSlide: function() {
      var context = this.$(".slide-tracker");

      if(!$(this).hasClass("disabled") && context.find(".slide_entry").length > 1) {
        context.find(".slide_entry.selected").remove();
        selectSlideEntry(context.find(".slide_entry").first(), context);
        refreshRemoveSlideFunctionality(context);
        this.slide_count = recountSlides(context);
      }
    }
  });
})();