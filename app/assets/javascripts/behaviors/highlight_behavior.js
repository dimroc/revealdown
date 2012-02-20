(function() {
  var highlightConversion = function(context) {
    context.find("pre code").each(function(index, el) {
      hljs.highlightBlock(el, '  ');
    });
  };

  RevealDown.Behaviors.highlight = function(context) {
    hljs.initHighlighting();
    highlightConversion(context);
    $(".input textarea").keyup(function() {
      highlightConversion(context);
    });
  };
})();