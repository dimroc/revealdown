(function() {
  RevealDown.Views = RevealDown.Views || {};

  RevealDown.Views.AppView = Backbone.View.extend({
    initialize: function() {
      this.slidelist = new RevealDown.Collections.SlideList();

      this.slidelist.on("add", function(slide) {
        this._createSlideMarker(slide);
        this.currentSlide = slide;
        this._presentSlide();
      }, this);

      this.slidelist.on("remove", function(slide) {
        this._removeSlideMarker(slide);
        this._recountSlideMarkers();
        this._selectSlideEntry(this.$el.find(".slide_marker").first());
        this.currentSlide = this.slidelist.first();
        this._presentSlide();
      }, this);

      this.addSlide();
    },

    events: {
      "click .add_slide": "addSlide",
      "click .remove_slide": "removeSlide",
      "click .slide_marker": "selectSlide"
    },

    addSlide: function() {
      this.slidelist.add(new RevealDown.Models.Slide());
    },

    removeSlide: function() {
      if(this.slidelist.size() > 1) {
        this.slidelist.remove(this.currentSlide);
      }
    },

    selectSlide: function(event) {
      var $target = $(event.currentTarget);
      this._selectSlideEntry($target);
      var slideIndex = parseInt($target.find(".slide_order").text(), 10) - 1;
      this.currentSlide = this.slidelist.at(slideIndex);
      this._presentSlide();
    },

    _recountSlideMarkers: function() {
      var slide_count = 0;
      this.$el.find("*.slide_marker").each(function(i, e) {
        $(e).find(".slide_order").text(++slide_count);
      });

      return slide_count;
    },

    _refreshRemoveSlideFunctionality: function() {
      if(this.$el.find(".slide_marker").length > 1) {
        this.$el.find(".remove_slide").removeClass("disabled");
      } else {
        this.$el.find(".remove_slide").addClass("disabled");
      }
    },

    _removeSlideMarker: function(slide) {
      this.$el.find(".slide_marker.selected").remove();
      this._selectSlideEntry(this.$el.find(".slide_marker").first());
      this._refreshRemoveSlideFunctionality();
    },

    _selectSlideEntry: function($element) {
      this.$el.find(".selected").removeClass("selected active");
      $element.addClass("selected active");
    },

    _presentSlide: function() {
      if(this.slide_view) {
        this.slide_view.close();
        this.slide_view = null;
      }

      var options = { model: this.currentSlide, el: $("#revealdown .slide") };
      this.slide_view = new RevealDown.Views.SlideView(options);
      this.slide_view.render();
    },

    _createSlideMarker: function(slide) {
      var $slide_marker = $(ich.slide_marker_template({order: this.slidelist.size(), caption: slide.get('caption')}));
      this._selectSlideEntry($slide_marker);
      var that = this;
      $slide_marker.click(function() {
        that._selectSlideEntry($(that));
      });

      this.$el.find(".slides").append($slide_marker);
      this._refreshRemoveSlideFunctionality();
    }
  });
})();
