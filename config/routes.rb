Revealdown::Application.routes.draw do
  devise_for :users

  devise_scope :user do
    match "/sign_in" => "devise/sessions#new"
    match "/sign_out" => "devise/sessions#destroy"
  end

  root :to => 'home#index'
end
