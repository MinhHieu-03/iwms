import { TranslationKey } from '../../type_more/outbound';

export const vi: Record<TranslationKey, string> = {
  // Outbound Table
  'outbound.table': 'Bảng Xuất Kho',
  'outbound.table.title': 'Quản Lý Xuất Kho',
  'outbound.title': 'Đơn Hàng Xuất Kho',
  'outbound.create': 'Tạo Xuất Kho',
  'outbound.edit': 'Chỉnh Sửa Xuất Kho',
  'outbound.sku': 'Mã SKU',
  'outbound.product_name': 'Tên Sản Phẩm',
  'outbound.qty': 'Số Lượng',
  'outbound.unit': 'Đơn Vị',
  'outbound.location': 'Vị Trí',
  'outbound.status': 'Trạng Thái',
  'outbound.created_at': 'Ngày Tạo',
  'outbound.updated_at': 'Ngày Cập Nhật',
  
  // Status values
  'outbound.status.pending': 'Chờ Xử Lý',
  'outbound.status.wait_fill': 'Chờ Điền',
  'outbound.status.in_progress': 'Đang Xử Lý',
  'outbound.status.completed': 'Hoàn Thành',
  'outbound.status.cancelled': 'Đã Hủy',
  
  // Unit values
  'outbound.unit.pcs': 'Cái',
  'outbound.unit.boxes': 'Hộp',
  'outbound.unit.kg': 'Kilogram',
  'outbound.unit.units': 'Đơn Vị',
  'outbound.unit.liters': 'Lít',
  'outbound.unit.meters': 'Mét',
  
  // Actions and buttons
  'outbound.btn.create_new': 'Tạo Mới',
  'outbound.btn.delete': 'Xóa',
  'outbound.btn.reload': 'Tải Lại',
  'outbound.btn.save': 'Lưu',
  'outbound.btn.cancel': 'Hủy',
  
  // Placeholders
  'outbound.placeholder.sku': 'Nhập mã SKU',
  'outbound.placeholder.product_name': 'Nhập tên sản phẩm',
  'outbound.placeholder.qty': 'Nhập số lượng',
  'outbound.placeholder.unit': 'Chọn đơn vị',
  'outbound.placeholder.location': 'Nhập vị trí (vd: A-01-01)',
  'outbound.placeholder.status': 'Chọn trạng thái',
  
  // Validation messages
  'outbound.validation.required': 'Trường này là bắt buộc',
  'outbound.validation.sku_required': 'Mã SKU là bắt buộc',
  'outbound.validation.product_name_required': 'Tên sản phẩm là bắt buộc',
  'outbound.validation.qty_required': 'Số lượng là bắt buộc',
  'outbound.validation.qty_positive': 'Số lượng phải lớn hơn 0',
  'outbound.validation.unit_required': 'Đơn vị là bắt buộc',
  'outbound.validation.location_required': 'Vị trí là bắt buộc',
  'outbound.validation.status_required': 'Trạng thái là bắt buộc',
  
  // Storage/Location
  'outbound.storage': 'Vị Trí Lưu Trữ',
  'outbound.storage.loading': 'Đang tải vị trí lưu trữ...',
  'outbound.placeholder.storage': 'Chọn vị trí lưu trữ',
  
  // Success/Error messages
  'outbound.message.create_success': 'Tạo xuất kho thành công',
  'outbound.message.create_error': 'Không thể tạo xuất kho',
  'outbound.message.update_success': 'Cập nhật xuất kho thành công',
  'outbound.message.update_error': 'Không thể cập nhật xuất kho',
  'outbound.message.delete_success': 'Xóa xuất kho thành công',
  'outbound.message.delete_error': 'Không thể xóa xuất kho',
  'outbound.message.confirm_delete': 'Xác Nhận Xóa',
  'outbound.message.confirm_delete_multiple': 'Bạn có chắc chắn muốn xóa {{count}} mục? Hành động này không thể hoàn tác.',
};
