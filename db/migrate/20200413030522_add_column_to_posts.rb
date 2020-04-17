class AddColumnToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :receiver_id, :integer
    add_index :posts, :receiver_id
  end
end
