import { TranslationKey } from '../../type_more/inbound';

export const vi: Record<TranslationKey, string> = {
  // Inbound Table
  'inbound.title': 'Quản Lý Nhập Kho',
  'inbound.table': 'Bảng Nhập Kho',
  'inbound.table.title': 'Quản Lý Nhập Kho',
  'inbound.create': 'Tạo Đơn Nhập kho',
  'inbound.store_info': 'Lưu kho',
  'inbound.edit': 'Chỉnh Sửa Nhập Kho',
  'inbound.detail_title': 'Chi Tiết Nhập Kho',
  'inbound.id': 'Mã ID',
  'inbound.inventory_title': 'Thông Tin Tồn Kho',
  'inbound.inventory_id': 'Mã Tồn Kho',
  'inbound.inventory_sku': 'SKU Tồn Kho',
  'inbound.inventory_product_name': 'Tên Sản Phẩm Tồn Kho',
  'inbound.location_id': 'Mã Vị Trí',
  'inbound.location_code': 'Mã Vị Trí Lưu Kho',
  'inbound.inventory_status': 'Trạng Thái Tồn Kho',
  'inbound.store_items': 'Danh Sách Lưu Trữ',
  'inbound.store_key': 'Loại Lưu Trữ',
  'inbound.store_quantity': 'Số Lượng',
  'inbound.pic': 'Người Phụ Trách',
  'inbound.sku': 'Mã vật tư',
  'inbound.origin': 'Phân loại',
  'inbound.product_name': 'Tên vật tư',
  'inbound.destination': 'Vị trí lưu kho',
  'inbound.status': 'Trạng Thái',
  'inbound.created_at': 'Thời điểm tạo',
  'inbound.updated_at': 'Thời điểm cập nhật',
  'inbound.actions': 'Hành động',
  
  // New fields for inbound management
  'inbound.quantity': 'Số lượng',
  'inbound.store_method': 'Phương thức lưu trữ',
  'inbound.packing_method': 'Phương thức đóng gói',
  'inbound.bin_code': 'Mã bin',
  'inbound.supplier': 'Nhà cung cấp',
  'inbound.invoice_code': 'Mã hóa đơn',
  'inbound.note': 'Ghi chú',
  
  // Store method values
  'inbound.store_method_bin': 'Bin',
  'inbound.store_method_carton': 'Thùng carton',
  'inbound.store_method_kit': 'Bộ kit',
  
  // Packing method values
  'inbound.packing_method_carton': 'Thùng carton',
  'inbound.packing_method_kit': 'Bộ kit',
  
  // Status values
  'inbound.status.wait_fill': 'Chờ Điền',
  'inbound.status.in_progress': 'Đang Xử Lý',
  'inbound.status.completed': 'Hoàn Thành',
  'inbound.status.cancelled': 'Đã Hủy',
  'inbound.status_new': 'Mới',
  'inbound.status_pending': 'Đang chờ',
  'inbound.status_done': 'Hoàn thành',
  
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
  'inbound.placeholder.sku': 'Nhập Mã vật tư',
  'inbound.sku_placeholder': 'Chọn Mã vật tư',
  'inbound.placeholder.origin': 'Chọn Phân loại',
  'inbound.placeholder.product_name': 'Nhập Tên vật tư',
  'inbound.product_name_placeholder': 'Nhập Tên vật tư',
  'inbound.placeholder.destination': 'Nhập Vị trí lưu kho (vd: A-02/01-03)',
  'inbound.placeholder.status': 'Chọn trạng thái',
  'inbound.storage_location': 'Vị trí lưu kho',
  'inbound.storage_location_placeholder': 'Chọn vị trí lưu kho',
  'inbound.quantity_placeholder': 'Nhập số lượng',
  'inbound.add_storage_location': 'Thêm vị trí lưu kho',
  
  // Validation messages
  'inbound.validation.required': 'Trường này là bắt buộc',
  'inbound.validation.pic_required': 'Người phụ trách là bắt buộc',
  'inbound.validation.sku_required': 'Mã vật tư là bắt buộc',
  'inbound.validation.origin_required': 'Phân loại là bắt buộc',
  'inbound.validation.product_name_required': 'Tên vật tư là bắt buộc',
  'inbound.validation.destination_required': 'Vị trí lưu kho là bắt buộc',
  'inbound.validation.status_required': 'Trạng thái là bắt buộc',
  'inbound.validation.quantity_required': 'Số lượng là bắt buộc',
  'inbound.validation.store_method_required': 'Phương thức lưu trữ là bắt buộc',
  'inbound.validation.packing_method_required': 'Phương thức đóng gói là bắt buộc',
  'inbound.validation.bin_code_required': 'Mã bin là bắt buộc',
  'inbound.validation.supplier_required': 'Nhà cung cấp là bắt buộc',
  'inbound.validation.invoice_code_required': 'Mã hóa đơn là bắt buộc',
  
  // Success/Error messages
  'inbound.message.create_success': 'Tạo Đơn Nhập kho thành công',
  'inbound.message.create_error': 'Không thể Tạo Đơn Nhập kho',
  'inbound.message.update_success': 'Cập nhật nhập kho thành công',
  'inbound.message.update_error': 'Không thể cập nhật nhập kho',
  'inbound.message.delete_success': 'Xóa nhập kho thành công',
  'inbound.message.delete_error': 'Không thể xóa nhập kho',
  'inbound.message.confirm_delete': 'Xác Nhận Xóa',
  'inbound.message.confirm_delete_multiple': 'Bạn có chắc chắn muốn xóa {{count}} mục? Hành động này không thể hoàn tác.',
  'inbound.confirm_cancel': 'Xác Nhận Hủy',
  'inbound.confirm_cancel_description': 'Bạn có chắc chắn muốn hủy đơn nhập kho này? Hành động này không thể hoàn tác.',
};
