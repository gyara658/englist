class ChangeDatatypeMeaningOfEnglishlists < ActiveRecord::Migration[6.0]
  def change
    change_column :englishlists, :meaning, :text
  end
end
