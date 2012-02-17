RevealDown.Behaviors.flash = function(context) {
  $(context).find(".close").click(function() {
    $this = $(this);
    $this.parent(".flash").hide();
  });
};