class RenameExampleMeaningColumnToLists < ActiveRecord::Migration[6.0]
  def change
    rename_column :lists, :exampleMeaning, :example_meaning
  end
end
