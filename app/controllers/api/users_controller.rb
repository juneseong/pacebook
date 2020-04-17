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
        @user = current_user
        
        if params[:user][:profile_img]
            @user.profile_img.attach(params[:user][:profile_img])
            user_update = @user.save
        elsif params[:user][:cover_img]
            @user.cover_img.attach(params[:user][:cover_img])
            user_update = @user.save
        else
            user_update = @user.update(user_params)
        end

        if user_update
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end

    end

    def show
        @user = User.find(params[:id])
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :birth_date, :gender)
    end
end