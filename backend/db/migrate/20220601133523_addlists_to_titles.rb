class AddlistsToTitles < ActiveRecord::Migration[6.0]
  def change
    add_column :lists, :word, :string
    add_column :lists, :example, :string
    add_column :lists, :exampleMeaning, :string
    add_column :lists, :meaning, :string
  end
end
