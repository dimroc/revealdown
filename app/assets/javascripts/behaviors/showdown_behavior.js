(function() {
  var converter = new Showdown.converter();

  var showdownConversion = function($context) {
    var text = $context.find(".input textarea").val();
    text = converter.makeHtml(text);

    $context.find(".output.raw pre code").text(text);
    $context.find(".output.rendered").html($(text));
  };

  RevealDown.Behaviors.showdown = function(context) {
    var $context = $(context);
    showdownConversion($context);
    $context.find(".input textarea").keyup(function() {
      showdownConversion($context);
    });
  };
})();