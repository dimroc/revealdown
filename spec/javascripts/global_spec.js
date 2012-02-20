describe("global behaviors", function() {
  describe("vertical fluid containers", function() {
    var fixture = "<div class='vertical-fluid' style='position:absolute;top:0'>" +
        "Something</div>";

    documentEach(function() {
      loadFixture(fixture);
    });

    it("should stretch to the bottom of the window", function() {
      expect($(".vertical-fluid").height()).toEqual($(window).height() - RevealDown.stretchPadding);
    });

    describe("with an offset from the top", function() {
      var offset = 50, $container;
      beforeEach(function() {
        var $container = $("<div style='margin-top:" + offset + "px'></div>");
        $verticalfluid = $(".vertical-fluid").css('position', 'relative');
        $container.append($verticalfluid);
        loadFixture($container);
        $(window).trigger('resize');
      });

      it("should not stretch past the bottom of the window", function() {
        expect($(".vertical-fluid").height()).toEqual($(window).height() - offset - RevealDown.stretchPadding);
      });
    });

    describe("after window resize", function() {
      it("should resize to the bottom", function() {
        spyOn(RevealDown.Behaviors, 'stretchToHeight').andCallThrough();
        $(window).trigger('resize');
        expect(RevealDown.Behaviors.stretchToHeight).toHaveBeenCalled();
      });
    });
  });
});