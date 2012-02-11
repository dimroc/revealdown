RevealDown.Behaviors.flash = function(context) {
  $(".flash .close").click(function() {
    $this = $(this);
    $this.parent(".flash").hide();
  });
};