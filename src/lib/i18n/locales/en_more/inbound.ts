import { TranslationKey } from '../../type_more/inbound';

export const en: Record<TranslationKey, string> = {
  // Inbound Table
  'inbound.table': 'Inbound Table',
  'inbound.table.title': 'Inbound Management',
  'inbound.create': 'Create Inbound',
  'inbound.edit': 'Edit Inbound',
  'inbound.pic': 'PIC',
  'inbound.sku': 'SKU',
  'inbound.origin': 'Origin',
  'inbound.product_name': 'Product Name',
  'inbound.destination': 'Destination',
  'inbound.status': 'Status',
  'inbound.created_at': 'Created At',
  'inbound.updated_at': 'Updated At',
  
  // Status values
  'inbound.status.wait_fill': 'Wait Fill',
  'inbound.status.in_progress': 'In Progress',
  'inbound.status.completed': 'Completed',
  'inbound.status.cancelled': 'Cancelled',
  
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
  'inbound.placeholder.origin': 'Select Origin',
  'inbound.placeholder.product_name': 'Enter Product Name',
  'inbound.placeholder.destination': 'Enter Destination (e.g., A-02/01-03)',
  'inbound.placeholder.status': 'Select Status',
  
  // Validation messages
  'inbound.validation.required': 'This field is required',
  'inbound.validation.pic_required': 'PIC is required',
  'inbound.validation.sku_required': 'SKU is required',
  'inbound.validation.origin_required': 'Origin is required',
  'inbound.validation.product_name_required': 'Product name is required',
  'inbound.validation.destination_required': 'Destination is required',
  'inbound.validation.status_required': 'Status is required',
  
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
