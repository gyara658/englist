require "csv"

CSV.foreach('db/seeds/CSV/TSL.csv', headers: true) do |row|
  Englishlist.create(
    word: row['word'],
    meaning: row['meaning'],
    commentary: row['commentary'],
    example: row['example'],
    example_meaning: row['example_meaning'],
    wordtype: row['Wordtype']
  )
end
