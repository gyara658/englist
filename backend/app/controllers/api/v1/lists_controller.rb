class Api::V1::ListsController < ApplicationController
  def index
    # @lists = List.find(params[:user_id])
    @lists = List.all
    render json: { status: 200, lists: @lists }
  end

  def create
    list = List.new(mylist_params)

    if list.save
      render json: { status: 200, list: list }
    else
      render json: { status: 500, list: "作成に失敗しました" }
    end
  end

  private
    def mylist_params
      params.permit(:user_id, :englishlist_id, :word, :example, :example_meaning, :meaning)
    end
end
