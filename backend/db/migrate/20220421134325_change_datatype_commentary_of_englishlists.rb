class ChangeDatatypeCommentaryOfEnglishlists < ActiveRecord::Migration[6.0]
  def change
    change_column :englishlists, :commentary, :text
  end
end
