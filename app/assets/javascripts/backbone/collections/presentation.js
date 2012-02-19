(function() {
  RevealDown.Collections = RevealDown.Collections || {};
  RevealDown.Collections.Presentation = Backbone.Collection.extend({
    model: RevealDown.Models.Slide
  });
})();