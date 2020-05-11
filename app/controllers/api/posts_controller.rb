class Api::PostsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @post_ids = []

        if params[:user_id].nil?
            @users = []
            @posts = Post.all.order(updated_at: :desc)

            @posts.each do |post|
                @post_ids << post.id
                @users << post.user
                receiver = User.find_by(id: post.receiver_id)
                @users << receiver if !@users.include?(receiver)
            end
        else
            user = User.find(params[:user_id])
            @users = User.fetch_authors(user).push(user)
            @posts = user.received_posts
        end

        render :index
    end

    def create
        @post = Post.new(post_params)
        @post.user_id = current_user.id
        @post.receiver_id = params[:post][:receiver_id]

        if @post.save
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def show
        @post = Post.find(params[:id])
    end

    def destroy
        @post = Post.find(params[:id])

        if @post
            @post.destroy
        end
        render json: { post: @post }
    end

    def update
        @post = Post.find(params[:post][:id])

        if @post.update(post_params)
            render :show
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    private
    def post_params
        params.require(:post).permit(:body)
    end
end