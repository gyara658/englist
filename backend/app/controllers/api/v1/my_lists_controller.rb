class Api::V1::MyListsController < ApplicationController
  def create
    mylist = MyList.new(mylist_params)

    if mylist.save
      render json: { status: 200, mylist: mylist }
    else
      render json: { status: 500, mylist: "作成に失敗しました" }
    end
  end

  private
    def mylist_params
      params.permit(:englishlists_id, :user_id)
    end
end
