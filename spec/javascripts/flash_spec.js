describe("flash notices", function() {
  var $fixture = "<div class='flash' data-behavior='flash'>Something<div class='close'>x</div></div>";

  documentEach(function() {
    $('#jasmine_content').html($fixture);
  });

  it("should close when .close is clicked", function() {
    expect($(".flash").is(":visible")).toEqual(true);
    $(".close").click();
    expect($(".flash").is(":visible")).toEqual(false);
  });
});