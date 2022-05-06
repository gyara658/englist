require "csv"

Dir[File.join(Rails.root, 'db', 'seeds', 'script', '*.rb')].sort.each do |seed|
  load seed
end
