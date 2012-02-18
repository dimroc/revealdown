(function() {
  RevealDown.stretchPadding = 20;
  RevealDown.stretchToHeight = function($element) {
    var windowHeight = $(window).height();
    var offset = $element.offset();
    var buffer = $element.outerHeight() - $element.height();

    $element.height(windowHeight - offset.top - buffer - RevealDown.stretchPadding);
  };

  RevealDown.Behaviors.global = function(context) {
    $("*.vertical-fluid").each(function(){
      var $this = $(this);
      RevealDown.stretchToHeight($this);
      $(window).resize(function(){
        RevealDown.stretchToHeight($this);
      });
    });
  };
})();