class Api::CommentsController < ApplicationController
    before_action :ensure_logged_in
    def show
        @comment = Comment.find(params[:id])
    end

    def create
        @comment = Comment.new(comment_params)

        if @comment.save
            @user = @comment.user
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
        params.require(:comment).permit(:body)
    end
end