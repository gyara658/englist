class CreateEnglishlists < ActiveRecord::Migration[6.0]
  def change
    create_table :englishlists do |t|
      t.string :word
      t.string :meaning
      t.string :commentary
      t.text :example
      t.text :example_meaning
      t.string :wordtype
      t.timestamps
    end
  end
end
