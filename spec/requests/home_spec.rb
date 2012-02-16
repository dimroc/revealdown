require 'spec_helper'

feature "Home page" do
  let(:title) { "Test Title" }
  let(:content) { Faker::Lorem.paragraph }
  scenario "visitor should be able to convert markdown to html", js: true do
    visit root_path
    within("section.input") { fill_in "input", with: "# #{title}\n#{content}" }

    within("section.output.rendered") { page.should have_content title }
    within("section.output.rendered") { page.should have_content content }
    within("section.output.raw") do
      page.should have_css "pre code"
      page.should have_content "<h1"
      page.should have_content title
      page.should have_content "<p>"
      page.should have_content content
    end

    # spec the view a bit by ensuring stretch column
    page.should have_css ".vertical-fluid"
  end
end