#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Revealdown::Application.load_tasks

if Rails.env.development?
  # Append jslint and jasmine:ci to the default task (rake spec)
  task default: :jslint
  task default: "jasmine:ci"

  Rake::Task[:jasmine].overwrite do
    Rake::Task[:jslint].invoke
    Rake::Task["jasmine:server".to_sym].invoke
  end
end
