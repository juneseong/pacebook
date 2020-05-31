class Api::PostsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @post_ids = []

        if params[:user_id].nil?
            @users = []
            @posts = []
            @all_posts = Post.all.order(updated_at: :desc)

            @all_posts.each do |post|
                if post.user.id == current_user.id || post.receiver.id == current_user.id
                    @posts << post
                    next
                end

                user_ids = []
                requester1 = Friendship.find_by(requester_id: post.user.id, requestee_id: current_user.id)
                requester2 = Friendship.find_by(requester_id: post.receiver.id, requestee_id: current_user.id)
                requestee1 = Friendship.find_by(requestee_id: post.user.id, requester_id: current_user.id)
                requestee2 = Friendship.find_by(requestee_id: post.receiver.id, requester_id: current_user.id)
                
                user_ids << requester1.requester_id if !requester1.nil? && requester1.status
                user_ids << requester2.requester_id if !requester2.nil? && requester2.status
                user_ids << requestee1.requestee_id if !requestee1.nil? && requestee1.status
                user_ids << requestee2.requestee_id if !requestee2.nil? && requestee2.status

                @posts << post if !user_ids.empty?
            end

            @posts.each do |post|
                @post_ids << post.id
                @users << post.user
                receiver = User.find_by(id: post.receiver_id)
                @users << receiver if !@users.include?(receiver)
            end

            @user = current_user
        else
            @user = User.find(params[:user_id])
            @users = User.fetch_authors(@user).push(@user)
            @posts = @user.received_posts
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