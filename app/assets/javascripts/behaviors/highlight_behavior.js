(function() {
  RevealDown.Behaviors.highlight = function(context) {
    hljs.initHighlighting();
    $(".input textarea").keyup(function() {
      context.find("pre code").each(function(index, el) {
        hljs.highlightBlock(el, '  ');
      });
    });
  };
})();