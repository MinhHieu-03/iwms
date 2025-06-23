export type TranslationKey = 
  // Outbound Table
  | 'outbound.table'
  | 'outbound.table.title'
  | 'outbound.title'
  | 'outbound.create'
  | 'outbound.edit'
  | 'outbound.sku'
  | 'outbound.product_name'
  | 'outbound.qty'
  | 'outbound.unit'
  | 'outbound.location'
  | 'outbound.status'
  | 'outbound.created_at'
  | 'outbound.updated_at'
  
  // Status values
  | 'outbound.status.pending'
  | 'outbound.status.wait_fill'
  | 'outbound.status.in_progress'
  | 'outbound.status.completed'
  | 'outbound.status.cancelled'
  
  // Unit values
  | 'outbound.unit.pcs'
  | 'outbound.unit.boxes'
  | 'outbound.unit.kg'
  | 'outbound.unit.units'
  | 'outbound.unit.liters'
  | 'outbound.unit.meters'
  
  // Actions and buttons
  | 'outbound.btn.create_new'
  | 'outbound.btn.delete'
  | 'outbound.btn.reload'
  | 'outbound.btn.save'
  | 'outbound.btn.cancel'
  
  // Placeholders
  | 'outbound.placeholder.sku'
  | 'outbound.placeholder.product_name'
  | 'outbound.placeholder.qty'
  | 'outbound.placeholder.unit'
  | 'outbound.placeholder.location'
  | 'outbound.placeholder.status'
  
  // Validation messages
  | 'outbound.validation.required'
  | 'outbound.validation.sku_required'
  | 'outbound.validation.product_name_required'
  | 'outbound.validation.qty_required'
  | 'outbound.validation.qty_positive'
  | 'outbound.validation.unit_required'
  | 'outbound.validation.location_required'
  | 'outbound.validation.status_required'
  
  // Storage/Location
  | 'outbound.storage'
  | 'outbound.storage.loading'
  | 'outbound.placeholder.storage'
  
  // Success/Error messages
  | 'outbound.message.create_success'
  | 'outbound.message.create_error'
  | 'outbound.message.update_success'
  | 'outbound.message.update_error'
  | 'outbound.message.delete_success'
  | 'outbound.message.delete_error'
  | 'outbound.message.confirm_delete'
  | 'outbound.message.confirm_delete_multiple';
