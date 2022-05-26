class CreateMyLists < ActiveRecord::Migration[6.0]
  def change
    create_table :my_lists do |t|
      t.integer :user_id
      t.integer :englishlists_id

      t.timestamps
    end
  end
end
