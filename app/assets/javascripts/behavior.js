// Behavior pattern used to only load document.ready scripts
// if said ui element is present. Behavior pattern credit belongs to:
// Adam Berlin: https://github.com/berlin-ab
(function() {
  RevealDown = {
    Behaviors: {},
    Models: {},
    Views: {},
    Collections: {},
    init: function() {
      RevealDown.loadBehaviors();
      RevealDown.app = new RevealDown.Views.AppView({el: $("#revealdown")});
    }
  };

  RevealDown.loadBehaviors = function() {
    if(RevealDown.Behaviors.global) {
      RevealDown.Behaviors.global($(document));
    }

    $("*[data-behavior]").each(function() {
      var behaviorName = $(this).attr('data-behavior');
      var behavior = RevealDown.Behaviors[behaviorName];
      if(behavior) { behavior($(this)); }
    });
  };
})();

$(function() {
  RevealDown.init();
});