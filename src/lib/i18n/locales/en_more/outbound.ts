import { TranslationKey } from '../../type_more/outbound';

export const en: Record<TranslationKey, string> = {
  // Outbound Table
  'outbound.table': 'Outbound Table',
  'outbound.table.title': 'Outbound Management',
  'outbound.title': 'Outbound Orders',
  'outbound.create': 'Create Outbound',
  'outbound.edit': 'Edit Outbound',
  'outbound.sku': 'SKU',
  'outbound.product_name': 'Product Name',
  'outbound.qty': 'Quantity',
  'outbound.unit': 'Unit',
  'outbound.location': 'Location',
  'outbound.status': 'Status',
  'outbound.created_at': 'Created At',
  'outbound.updated_at': 'Updated At',
  
  // Status values
  'outbound.status.pending': 'Pending',
  'outbound.status.wait_fill': 'Wait Fill',
  'outbound.status.in_progress': 'In Progress',
  'outbound.status.completed': 'Completed',
  'outbound.status.cancelled': 'Cancelled',
  
  // Unit values
  'outbound.unit.pcs': 'Pieces',
  'outbound.unit.boxes': 'Boxes',
  'outbound.unit.kg': 'Kilograms',
  'outbound.unit.units': 'Units',
  'outbound.unit.liters': 'Liters',
  'outbound.unit.meters': 'Meters',
  
  // Actions and buttons
  'outbound.btn.create_new': 'Create New',
  'outbound.btn.delete': 'Delete',
  'outbound.btn.reload': 'Reload',
  'outbound.btn.save': 'Save',
  'outbound.btn.cancel': 'Cancel',
  
  // Placeholders
  'outbound.placeholder.sku': 'Enter SKU',
  'outbound.placeholder.product_name': 'Enter Product Name',
  'outbound.placeholder.qty': 'Enter Quantity',
  'outbound.placeholder.unit': 'Select Unit',
  'outbound.placeholder.location': 'Enter Location (e.g., A-01-01)',
  'outbound.placeholder.status': 'Select Status',
  
  // Validation messages
  'outbound.validation.required': 'This field is required',
  'outbound.validation.sku_required': 'SKU is required',
  'outbound.validation.product_name_required': 'Product name is required',
  'outbound.validation.qty_required': 'Quantity is required',
  'outbound.validation.qty_positive': 'Quantity must be greater than 0',
  'outbound.validation.unit_required': 'Unit is required',
  'outbound.validation.location_required': 'Location is required',
  'outbound.validation.status_required': 'Status is required',
  
  // Storage/Location
  'outbound.storage': 'Storage Unit',
  'outbound.storage.loading': 'Loading storage locations...',
  'outbound.placeholder.storage': 'Select storage Unit',
  
  // Success/Error messages
  'outbound.message.create_success': 'Outbound created successfully',
  'outbound.message.create_error': 'Failed to create outbound',
  'outbound.message.update_success': 'Outbound updated successfully',
  'outbound.message.update_error': 'Failed to update outbound',
  'outbound.message.delete_success': 'Outbound(s) deleted successfully',
  'outbound.message.delete_error': 'Failed to delete outbound(s)',
  'outbound.message.confirm_delete': 'Delete Confirmation',
  'outbound.message.confirm_delete_multiple': 'Are you sure you want to delete {{count}} item(s)? This action cannot be undone.',
};
