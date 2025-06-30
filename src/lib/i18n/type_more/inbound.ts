export type TranslationKey = 
  // Inbound Table
  | 'inbound.title'
  | 'inbound.table'
  | 'inbound.table.title'
  | 'inbound.create'
  | 'inbound.edit'
  | 'inbound.detail_title'
  | 'inbound.id'
  | 'inbound.store_info'
  | 'inbound.inventory_title'
  | 'inbound.inventory_id'
  | 'inbound.inventory_sku'
  | 'inbound.inventory_product_name'
  | 'inbound.location_id'
  | 'inbound.location_code'
  | 'inbound.inventory_status'
  | 'inbound.store_items'
  | 'inbound.store_key'
  | 'inbound.store_quantity'
  | 'inbound.pic'
  | 'inbound.sku'
  | 'inbound.origin'
  | 'inbound.product_name'
  | 'inbound.destination'
  | 'inbound.status'
  | 'inbound.created_at'
  | 'inbound.updated_at'
  
  // New fields for inbound management
  | 'inbound.quantity'
  | 'inbound.store_method'
  | 'inbound.packing_method'
  | 'inbound.bin_code'
  | 'inbound.supplier'
  | 'inbound.invoice_code'
  | 'inbound.note'
  
  // Store method values
  | 'inbound.store_method_bin'
  | 'inbound.store_method_carton'
  | 'inbound.store_method_kit'
  
  // Packing method values
  | 'inbound.packing_method_carton'
  | 'inbound.packing_method_kit'
  
  // Status values
  | 'inbound.status.wait_fill'
  | 'inbound.status.in_progress'
  | 'inbound.status.completed'
  | 'inbound.status.cancelled'
  | 'inbound.status_new'
  | 'inbound.status_pending'
  | 'inbound.status_done'
  
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
  | 'inbound.validation.quantity_required'
  | 'inbound.validation.store_method_required'
  | 'inbound.validation.packing_method_required'
  | 'inbound.validation.bin_code_required'
  | 'inbound.validation.supplier_required'
  | 'inbound.validation.invoice_code_required'
  
  // Success/Error messages
  | 'inbound.message.create_success'
  | 'inbound.message.create_error'
  | 'inbound.message.update_success'
  | 'inbound.message.update_error'
  | 'inbound.message.delete_success'
  | 'inbound.message.delete_error'
  | 'inbound.message.confirm_delete'
  | 'inbound.message.confirm_delete_multiple';
