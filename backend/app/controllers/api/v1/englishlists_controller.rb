class Api::V1::EnglishlistsController < ApplicationController
  def index
    @wordlist = englishlist.all
    render json: @wordlist
  end
end
