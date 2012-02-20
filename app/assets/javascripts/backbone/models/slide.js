(function() {
  RevealDown.Models = RevealDown.Models || {};
  RevealDown.Models.Slide = Backbone.Model.extend({
    defaults: {
      "content": "# Enter your title!"
    }
  });
})();