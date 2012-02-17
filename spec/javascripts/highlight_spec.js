describe("highlight js integration", function() {
  var $fixture = $("<div>" +
      "<div class='input'><textarea></textarea></div>" +
      "<div class='output raw' data-behavior='highlight'>" +
      "<pre><code>\n" +
      "<h1>Header</h1><p>Should be colored</p>" +
      "</code></pre>" +
      "</div>" +
      "</div>");

  documentEach(function() {
    spyOn(hljs, 'initHighlighting');
    spyOn(hljs, 'highlightBlock');
    loadFixture($fixture);
  });

  it("should highlight on load", function() {
    expect(hljs.initHighlighting).toHaveBeenCalled();
  });

  describe("when content changes", function() {
    beforeEach(function() {
      $(".input textarea").sendkeys("new content");
    });

    it("should still highlight on load", function() {
      expect(hljs.highlightBlock).toHaveBeenCalled();
    });
  });
});