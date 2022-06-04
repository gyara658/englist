class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.integer :user_id, null: false
      t.integer :englishlist_id, null: false
      t.timestamps
    end
  end
end
