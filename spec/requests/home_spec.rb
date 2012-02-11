require 'spec_helper'

feature "Home page" do
  scenario "visitor should be able to convert markdown to html", js: true do
    visit root_path
    title = "# SomeTitle"
    content = "#{Faker::Lorem.paragraph}"
    within("section.input") { fill_in "input", with: "#{title}\n#{content}" }
    within("section.output .rendered") { page.should have_content "SomeTitle" }
    within("section.output .rendered") { page.should have_content content }
    within("section.output .raw") do
      page.should have_css "pre code"
      page.should have_content "<h1"
      page.should have_content "<p>"
      page.should have_content content
    end
  end
end