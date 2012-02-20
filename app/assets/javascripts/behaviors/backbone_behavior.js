(function() {
  RevealDown.Behaviors.backbone = function(context) {
    var el = null;
    if(context.attr('id') == "revealdown") {
      el = context;
    } else {
      el = context.find("#revealdown");
    }

    RevealDown.app = new RevealDown.Views.AppView({el: el});
  };
})();