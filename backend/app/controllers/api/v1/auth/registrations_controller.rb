class Api::V1::Auth::RegistrationsController < ApplicationController
  private
    # アカウント作成
    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
end
