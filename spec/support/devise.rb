module Warden
  module Test
    module Helpers
      # Alias Warden helpers to be the same name
      # as the Devise helpers.
      alias_method :sign_in, :login_as
      alias_method :sign_out, :logout
    end
  end
end

RSpec.configure do |config|
  config.include Devise::TestHelpers, :type => :controller
  config.include Warden::Test::Helpers, :type => :request

  config.after(:each, :type => :request) do
    Warden.test_reset!
  end
end