class Api::V1::EnglishlistsController < ApplicationController
  def index
    @wordlist = Englishlist.all
    render json: { status: 200, wordlist: @wordlist }
  end
end
