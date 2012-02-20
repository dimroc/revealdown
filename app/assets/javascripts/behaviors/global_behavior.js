(function() {
  RevealDown.stretchPadding = 20;
  RevealDown.Behaviors.keepToHeight = function(context) {
    context.find("*.vertical-fluid").each(function(){
      var $this = $(this);
      RevealDown.Behaviors.stretchToHeight($this);
      $(window).resize(function(){
        RevealDown.Behaviors.stretchToHeight($this);
      });
    });
  };

  RevealDown.Behaviors.global = function(context) {
    RevealDown.Behaviors.keepToHeight(context);
  };

  RevealDown.Behaviors.stretchToHeight = function(context) {
    var $context = $(context);
    var windowHeight = $(window).height();
    var offset = $context.offset();
    var buffer = $context.outerHeight() - $context.height();

    $context.height(windowHeight - offset.top - buffer - RevealDown.stretchPadding);
  };
})();