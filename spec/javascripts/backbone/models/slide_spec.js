describe("slide model", function() {
  describe("when instatiated", function() {
    var slide = null;
    beforeEach(function() {
      slide = new RevealDown.Models.Slide({
        content: "# Markdown content"
      });
    });

    it("should exhibit attributes", function() {
      expect(slide.get('content')).toEqual("# Markdown content");
    });
  });
});