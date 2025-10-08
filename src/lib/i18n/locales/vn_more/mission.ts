import { TranslationKey } from "../../types";

export const vi: Partial<Record<TranslationKey, string>> = {
  "mission-setting.template": "Mẫu nhiệm vụ",
  "/mission-setting/template": "Mẫu nhiệm vụ",
  mission_settings: "Cài đặt nhiệm vụ",
  mission_setting_template: "Mẫu nhiệm vụ",
  mission_setting_device: "Quản lý thiết bị",
  mission_setting_device_template: "Loại thiết bị",

  // Mission Management
  "mission.title": "Quản lý nhiệm vụ",
  "mission.mission_code": "Mã nhiệm vụ",
  "mission.robot_code": "Mã robot",
  "mission.origin": "Điểm xuất phát",
  "mission.destination": "Điểm đích",
  "mission.description": "Mô tả",
  "mission.bin_id": "Mã thùng",
  "mission.inventory": "Kho hàng",
  "mission.eta": "Thời gian dự kiến",
  "mission.status_history": "Lịch sử trạng thái",

  // Mission Types
  "mission.type": "Loại nhiệm vụ",
  "mission.type.inbound": "Nhập kho",
  "mission.type.outbound": "Xuất kho",
  "mission.type.internal": "Nội bộ",
  "mission.type.back_whs": "Về kho chính",
  "mission.type.transfer_gate": "Chuyển đến cổng",
  "mission.type.unknown": "Không xác định",

  // Mission States
  "mission.state": "Trạng thái",
  "mission.state.new": "Mới",
  "mission.state.processing": "Đang xử lý",
  "mission.state.done": "Hoàn thành",
  "mission.state.error": "Lỗi",
  "mission.state.done_picking": "Hoàn thành lấy hàng",
  "mission.state.unknown": "Không xác định",

  // Mission Inventory
  "mission.inventory_material_no": "Số hiệu vật tư",
  "mission.inventory_qty": "Số lượng",
  "mission.inventory_qty_available": "Số lượng có sẵn",
  "mission.inventory_id": "Mã kho hàng",
  "mission.kit_merger": "Bộ kết hợp",

  // Modal Titles
  "mission.create_title": "Tạo nhiệm vụ mới",
  "mission.edit_title": "Chỉnh sửa nhiệm vụ",
  "mission.detail_title": "Chi tiết nhiệm vụ",

  // Form Placeholders
  "mission.mission_code_placeholder": "Nhập mã nhiệm vụ",
  "mission.robot_code_placeholder": "Nhập mã robot",
  "mission.origin_placeholder": "Nhập điểm xuất phát",
  "mission.destination_placeholder": "Nhập điểm đích",
  "mission.description_placeholder": "Nhập mô tả nhiệm vụ",
  "mission.bin_id_placeholder": "Nhập mã thùng",
  "mission.inventory_material_no_placeholder": "Nhập số hiệu vật tư",
  "mission.inventory_qty_placeholder": "Nhập số lượng",
  "mission.inventory_qty_available_placeholder": "Nhập số lượng có sẵn",
  "mission.type_placeholder": "Chọn loại nhiệm vụ",
  "mission.state_placeholder": "Chọn trạng thái nhiệm vụ",
  "mission.eta_placeholder": "Nhập thời gian dự kiến (phút)",

  // Search and Filter
  "mission.search_placeholder":
    "Tìm kiếm theo mã nhiệm vụ, robot, xuất phát, đích...",
  "mission.filter_by_state": "Lọc theo trạng thái",
  "mission.filter_by_type": "Lọc theo loại",

  // Form Validation
  "mission.mission_code_required": "Mã nhiệm vụ là bắt buộc",
  "mission.type_required": "Loại nhiệm vụ là bắt buộc",

  // Sections
  "mission.basic_info": "Thông tin cơ bản",
  "mission.inventory_info": "Thông tin kho hàng",
  "mission.inventory_section": "Chi tiết kho hàng",
  "mission.additional_info": "Thông tin bổ sung",
  "mission.no_status_history": "Không có lịch sử trạng thái",

  // Buttons
  "btn.export_excel": "Xuất Excel",
  "btn.delete_selected": "Xóa các mục đã chọn",

  // Mission Template
  "mission_template.delete_single_confirm":
    "Bạn có chắc chắn muốn xóa mẫu nhiệm vụ này? Hành động này không thể hoàn tác.",
  "mission_template.delete_multiple_confirm":
    "Bạn có chắc chắn muốn xóa {{count}} mẫu nhiệm vụ? Hành động này không thể hoàn tác.",
};
