import { TranslationKey } from '../../type_more/inbound';

export const vi: Record<TranslationKey, string> = {
  // Inbound Table
  'inbound.table': 'Bảng Nhập Kho',
  'inbound.table.title': 'Quản Lý Nhập Kho',
  'inbound.create': 'Tạo Nhập Kho',
  'inbound.edit': 'Chỉnh Sửa Nhập Kho',
  'inbound.pic': 'Người Phụ Trách',
  'inbound.sku': 'Mã SKU',
  'inbound.origin': 'Nguồn Gốc',
  'inbound.product_name': 'Tên Sản Phẩm',
  'inbound.destination': 'Đích Đến',
  'inbound.status': 'Trạng Thái',
  'inbound.created_at': 'Ngày Tạo',
  'inbound.updated_at': 'Ngày Cập Nhật',
  
  // Status values
  'inbound.status.wait_fill': 'Chờ Điền',
  'inbound.status.in_progress': 'Đang Xử Lý',
  'inbound.status.completed': 'Hoàn Thành',
  'inbound.status.cancelled': 'Đã Hủy',
  
  // Origin values
  'inbound.origin.inbound': 'Nhập Kho',
  'inbound.origin.outbound': 'Xuất Kho',
  'inbound.origin.internal': 'Nội Bộ',
  
  // Actions and buttons
  'inbound.btn.create_new': 'Tạo Mới',
  'inbound.btn.delete': 'Xóa',
  'inbound.btn.reload': 'Tải Lại',
  'inbound.btn.save': 'Lưu',
  'inbound.btn.cancel': 'Hủy',
  
  // Placeholders
  'inbound.placeholder.pic': 'Nhập người phụ trách',
  'inbound.placeholder.sku': 'Nhập mã SKU',
  'inbound.placeholder.origin': 'Chọn nguồn gốc',
  'inbound.placeholder.product_name': 'Nhập tên sản phẩm',
  'inbound.placeholder.destination': 'Nhập đích đến (vd: A-02/01-03)',
  'inbound.placeholder.status': 'Chọn trạng thái',
  
  // Validation messages
  'inbound.validation.required': 'Trường này là bắt buộc',
  'inbound.validation.pic_required': 'Người phụ trách là bắt buộc',
  'inbound.validation.sku_required': 'Mã SKU là bắt buộc',
  'inbound.validation.origin_required': 'Nguồn gốc là bắt buộc',
  'inbound.validation.product_name_required': 'Tên sản phẩm là bắt buộc',
  'inbound.validation.destination_required': 'Đích đến là bắt buộc',
  'inbound.validation.status_required': 'Trạng thái là bắt buộc',
  
  // Success/Error messages
  'inbound.message.create_success': 'Tạo nhập kho thành công',
  'inbound.message.create_error': 'Không thể tạo nhập kho',
  'inbound.message.update_success': 'Cập nhật nhập kho thành công',
  'inbound.message.update_error': 'Không thể cập nhật nhập kho',
  'inbound.message.delete_success': 'Xóa nhập kho thành công',
  'inbound.message.delete_error': 'Không thể xóa nhập kho',
  'inbound.message.confirm_delete': 'Xác Nhận Xóa',
  'inbound.message.confirm_delete_multiple': 'Bạn có chắc chắn muốn xóa {{count}} mục? Hành động này không thể hoàn tác.',
};
