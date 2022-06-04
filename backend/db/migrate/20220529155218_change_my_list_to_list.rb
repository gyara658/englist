class ChangeMyListToList < ActiveRecord::Migration[6.0]
  def change
    rename_table :my_lists, :list
  end
end
