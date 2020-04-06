Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update, :show]
    resources :posts, only: [:index, :create, :show] do
      resources :comments, only: [:create, :update, :destroy]
    end
    resources :likes, only: [:create, :destroy]
    resources :friendships, only: [:create, :update, :destroy]
  end

  root "static_pages#root"
end
