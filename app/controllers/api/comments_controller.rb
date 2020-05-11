class Api::CommentsController < ApplicationController
    before_action :ensure_logged_in
    def show
        @comment = Comment.find(params[:id])
        @user = comment.user
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.post_id = params[:post_id]
        @comment.user = current_user

        if @comment.save
            render :show
        end
    end

    def update

    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
        render json: { comment: @comment }
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :post_id)
        
    end
end