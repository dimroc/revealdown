// Behavior pattern used to only load document.ready scripts
// if said ui element is present. Behavior pattern credit belongs to:
// Adam Berlin: https://github.com/berlin-ab

RevealDown = {};
RevealDown.Behaviors = {};

var loadBehavior = function() {
  $("*[data-behavior]").each(function() {
    var behaviorName = $(this).attr('data-behavior');
    var behavior = RevealDown.Behaviors[behaviorName];
    behavior($(this));
  });
};

$(function(){
  loadBehavior();
});