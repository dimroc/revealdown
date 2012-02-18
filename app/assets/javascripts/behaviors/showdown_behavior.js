(function() {
  RevealDown.Behaviors.showdown = function(context) {
    var converter = new Showdown.converter();
    var lastText = null;

    var $context = $(context);
    $context.find(".input textarea").keyup(function() {
      text = $context.find(".input textarea").val();

      if (text && text == lastText) { return; }
      else { lastText = text; }

      text = converter.makeHtml(text);

      $context.find(".output.raw pre code").text(text);
      $context.find(".output.rendered").html($(text));
    });
  };
})();