class Api::PostsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @posts = Post.all
    end

    def create
        @post = Post.new(post_params)
        
        if @post.save
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def show
        @post = Post.find(params[:id])
    end

    private
    def post_params
        params.require(:post).permit(:body, :user_id)
    end
end