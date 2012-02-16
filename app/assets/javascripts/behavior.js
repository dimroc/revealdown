// Behavior pattern used to only load document.ready scripts
// if said ui element is present. Behavior pattern credit belongs to:
// Adam Berlin: https://github.com/berlin-ab

RevealDown = {};
RevealDown.Behaviors = {};

RevealDown.loadBehaviors = function() {
  if(RevealDown.Behaviors.global) {
    RevealDown.Behaviors.global($(document));
  }

  $("*[data-behavior]").each(function() {
    var behaviorName = $(this).attr('data-behavior');
    var behavior = RevealDown.Behaviors[behaviorName];
    behavior($(this));
  });
};

$(function() {
  RevealDown.loadBehaviors();
});