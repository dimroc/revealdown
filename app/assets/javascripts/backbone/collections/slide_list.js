(function() {
  RevealDown.Collections = RevealDown.Collections || {};
  RevealDown.Collections.SlideList = Backbone.Collection.extend({
    model: RevealDown.Models.Slide
  });
})();