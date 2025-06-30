import { TranslationKey } from '../../type_more/inbound';

export const en: Record<TranslationKey, string> = {
  // Inbound Table
  'inbound.title': 'Inbound Management',
  'inbound.table': 'Inbound Table',
  'inbound.table.title': 'Inbound Management',
  'inbound.create': 'Create Inbound',
  'inbound.store_info': 'Store info',
  'inbound.edit': 'Edit Inbound',
  'inbound.detail_title': 'Inbound Details',
  'inbound.id': 'ID',
  'inbound.inventory_title': 'Inventory Information',
  'inbound.inventory_id': 'Inventory ID',
  'inbound.inventory_sku': 'Inventory SKU',
  'inbound.inventory_product_name': 'Inventory Product Name',
  'inbound.location_id': 'Location ID',
  'inbound.location_code': 'Location Code',
  'inbound.inventory_status': 'Inventory Status',
  'inbound.store_items': 'Store Items',
  'inbound.store_key': 'Store Type',
  'inbound.store_quantity': 'Quantity',
  'inbound.pic': 'PIC',
  'inbound.sku': 'SKU',
  'inbound.origin': 'Origin',
  'inbound.product_name': 'Product Name',
  'inbound.destination': 'Destination',
  'inbound.status': 'Status',
  'inbound.created_at': 'Created At',
  'inbound.updated_at': 'Updated At',
  
  // New fields for inbound management
  'inbound.quantity': 'Quantity',
  'inbound.store_method': 'Store Method',
  'inbound.packing_method': 'Packing Method',
  'inbound.bin_code': 'Bin Code',
  'inbound.supplier': 'Supplier',
  'inbound.invoice_code': 'Invoice Code',
  'inbound.note': 'Note',
  
  // Store method values
  'inbound.store_method_bin': 'Bin',
  'inbound.store_method_carton': 'Carton',
  'inbound.store_method_kit': 'Kit',
  
  // Packing method values
  'inbound.packing_method_carton': 'Carton',
  'inbound.packing_method_kit': 'Kit',
  
  // Status values
  'inbound.status.wait_fill': 'Wait Fill',
  'inbound.status.in_progress': 'In Progress',
  'inbound.status.completed': 'Completed',
  'inbound.status.cancelled': 'Cancelled',
  'inbound.status_new': 'New',
  'inbound.status_pending': 'Pending',
  'inbound.status_done': 'Done',
  
  // Origin values
  'inbound.origin.inbound': 'Inbound',
  'inbound.origin.outbound': 'Outbound',
  'inbound.origin.internal': 'Internal',
  
  // Actions and buttons
  'inbound.btn.create_new': 'Create New',
  'inbound.btn.delete': 'Delete',
  'inbound.btn.reload': 'Reload',
  'inbound.btn.save': 'Save',
  'inbound.btn.cancel': 'Cancel',
  
  // Placeholders
  'inbound.placeholder.pic': 'Enter PIC',
  'inbound.placeholder.sku': 'Enter SKU',
  'inbound.sku_placeholder': 'Select SKU',
  'inbound.placeholder.origin': 'Select Origin',
  'inbound.placeholder.product_name': 'Enter Product Name',
  'inbound.product_name_placeholder': 'Enter Product Name',
  'inbound.placeholder.destination': 'Enter Destination (e.g., A-02/01-03)',
  'inbound.placeholder.status': 'Select Status',
  'inbound.storage_location': 'Storage Location',
  'inbound.storage_location_placeholder': 'Select Storage Location',
  'inbound.quantity_placeholder': 'Enter Quantity',
  'inbound.add_storage_location': 'Add Storage Location',
  
  // Validation messages
  'inbound.validation.required': 'This field is required',
  'inbound.validation.pic_required': 'PIC is required',
  'inbound.validation.sku_required': 'SKU is required',
  'inbound.validation.origin_required': 'Origin is required',
  'inbound.validation.product_name_required': 'Product name is required',
  'inbound.validation.destination_required': 'Destination is required',
  'inbound.validation.status_required': 'Status is required',
  'inbound.validation.quantity_required': 'Quantity is required',
  'inbound.validation.store_method_required': 'Store method is required',
  'inbound.validation.packing_method_required': 'Packing method is required',
  'inbound.validation.bin_code_required': 'Bin code is required',
  'inbound.validation.supplier_required': 'Supplier is required',
  'inbound.validation.invoice_code_required': 'Invoice code is required',
  
  // Success/Error messages
  'inbound.message.create_success': 'Inbound created successfully',
  'inbound.message.create_error': 'Failed to create inbound',
  'inbound.message.update_success': 'Inbound updated successfully',
  'inbound.message.update_error': 'Failed to update inbound',
  'inbound.message.delete_success': 'Inbound(s) deleted successfully',
  'inbound.message.delete_error': 'Failed to delete inbound(s)',
  'inbound.message.confirm_delete': 'Delete Confirmation',
  'inbound.message.confirm_delete_multiple': 'Are you sure you want to delete {{count}} item(s)? This action cannot be undone.',
};
