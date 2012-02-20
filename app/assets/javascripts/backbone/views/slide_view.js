(function() {
  RevealDown.Views = RevealDown.Views || {};

  RevealDown.Views.SlideView = Backbone.View.extend({
    initialize: function() {
    },

    events: {
    },

    render: function() {
      var $slide = $(ich.slide_template());
      this.$el.html($slide);
      Backbone.ModelBinding.bind(this);

      RevealDown.loadBehaviors({context: $(this.el)});
    },

    close: function() {
      this.$el.empty();
      this.unbind();
      Backbone.ModelBinding.unbind(this);
    }
  });
})();