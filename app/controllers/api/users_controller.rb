class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        
    end

    def show
        @user = User.find(params[:id])
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :birth_date, :gender)
    end
end