class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.references :notifiable, polymorphic: true, index: true
      t.boolean :read, default: false, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :notifications, :user_id
  end
end
