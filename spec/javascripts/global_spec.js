describe("global functionality", function() {
  describe("vertical fluid containers", function() {
    var $fixture = $("<div class='vertical-fluid' style='position:absolute;top:0'>" +
        "Something</div>");
    fixtureAndDocumentReady($fixture);

    it("should stretch to the bottom of the window", function() {
      expect($fixture.height()).toEqual($(window).height() - RevealDown.stretchPadding);
    });

    describe("with an offset from the top", function() {
      var offset = 50;
      beforeEach(function() {
        $container = $("<div style='margin-top:" + offset + "px'></div>");
        $fixture.css('position', 'relative');
        $container.append($fixture);
        loadFixture($container);
        $(window).trigger('resize');
      });

      it("should not stretch past the bottom of the window", function() {
        expect($fixture.height()).toEqual($(window).height() - offset - RevealDown.stretchPadding);
      });
    });

    describe("after window resize", function() {
      beforeEach(function() {
      });

      it("should resize to the bottom", function() {
        spyOn(RevealDown, 'stretchToHeight').andCallThrough();
        $(window).trigger('resize');
        expect(RevealDown.stretchToHeight).toHaveBeenCalled();
      });
    });
  });
});