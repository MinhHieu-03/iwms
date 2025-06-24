export type TranslationKey = 
  // Inbound Table
  | 'inbound.title'
  | 'inbound.table'
  | 'inbound.table.title'
  | 'inbound.create'
  | 'inbound.edit'
  | 'inbound.pic'
  | 'inbound.sku'
  | 'inbound.origin'
  | 'inbound.product_name'
  | 'inbound.destination'
  | 'inbound.status'
  | 'inbound.created_at'
  | 'inbound.updated_at'
  
  // Status values
  | 'inbound.status.wait_fill'
  | 'inbound.status.in_progress'
  | 'inbound.status.completed'
  | 'inbound.status.cancelled'
  
  // Origin values
  | 'inbound.origin.inbound'
  | 'inbound.origin.outbound'
  | 'inbound.origin.internal'
  
  // Actions and buttons
  | 'inbound.btn.create_new'
  | 'inbound.btn.delete'
  | 'inbound.btn.reload'
  | 'inbound.btn.save'
  | 'inbound.btn.cancel'
  
  // Placeholders
  | 'inbound.placeholder.pic'
  | 'inbound.placeholder.sku'
  | 'inbound.sku_placeholder'
  | 'inbound.placeholder.origin'
  | 'inbound.placeholder.product_name'
  | 'inbound.product_name_placeholder'
  | 'inbound.placeholder.destination'
  | 'inbound.placeholder.status'
  | 'inbound.storage_location'
  | 'inbound.storage_location_placeholder'
  | 'inbound.quantity'
  | 'inbound.quantity_placeholder'
  | 'inbound.add_storage_location'
  
  // Validation messages
  | 'inbound.validation.required'
  | 'inbound.validation.pic_required'
  | 'inbound.validation.sku_required'
  | 'inbound.validation.origin_required'
  | 'inbound.validation.product_name_required'
  | 'inbound.validation.destination_required'
  | 'inbound.validation.status_required'
  
  // Success/Error messages
  | 'inbound.message.create_success'
  | 'inbound.message.create_error'
  | 'inbound.message.update_success'
  | 'inbound.message.update_error'
  | 'inbound.message.delete_success'
  | 'inbound.message.delete_error'
  | 'inbound.message.confirm_delete'
  | 'inbound.message.confirm_delete_multiple';
