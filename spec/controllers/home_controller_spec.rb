require 'spec_helper'

describe HomeController do
  describe "visitor" do
    it "GET#index" do
      get :index
      response.should be_ok
    end

    it "routes from root to home#index" do
      { get: root_path }.should route_to(
          controller: "home",
          action: "index",
      )
    end
  end
end