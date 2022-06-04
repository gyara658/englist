class RemoveMyList < ActiveRecord::Migration[6.0]
  def change
    drop_table :list
    drop_table :uses
  end
end
