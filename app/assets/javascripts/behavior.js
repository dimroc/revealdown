// Behavior pattern used to only load document.ready scripts
// if said ui element is present or passed within context.
// Original behavior pattern credit belongs to:
// Adam Berlin: https://github.com/berlin-ab

(function() {
  RevealDown = {
    Behaviors: {},
    Models: {},
    Views: {},
    Collections: {},
    init: function() {
      RevealDown.loadBehaviors();
    }
  };

  RevealDown.loadBehaviors = function(options) {
    var context = $(document);
    if(options && options.context) {
      context = options.context;
    }

    if(RevealDown.Behaviors.global) {
      RevealDown.Behaviors.global(context);
    }

    context.find("*[data-behavior]").andSelf().each(function() {
      var behaviorName = $(this).attr('data-behavior');
      var behavior = RevealDown.Behaviors[behaviorName];
      if(behavior) { behavior($(this)); }
    });
  };
})();

$(function() {
  RevealDown.init();
});