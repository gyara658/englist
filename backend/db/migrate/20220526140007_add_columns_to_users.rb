class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :profile, :string, limit: 1000
    remove_column :users, :nickname, :string
  end
end
