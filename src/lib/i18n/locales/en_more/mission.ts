import { TranslationKey } from "../../types";

export const en: Partial<Record<TranslationKey, string>> = {
  "mission-setting.template": "Mission Template",
  "/mission-setting/template": "Mission Template",
  mission_settings: "Mission Settings",
  mission_setting_template: "Mission Template",
  mission_setting_device: "Device Management",
  mission_setting_device_template: "Device Type",

  // Mission Management
  "mission.title": "Mission Management",
  "mission.mission_code": "Mission Code",
  "mission.robot_code": "Robot Code",
  "mission.origin": "Origin",
  "mission.destination": "Destination",
  "mission.description": "Description",
  "mission.bin_id": "Bin ID",
  "mission.inventory": "Inventory",
  "mission.eta": "ETA",
  "mission.status_history": "Status History",

  // Mission Types
  "mission.type": "Mission Type",
  "mission.type.inbound": "Inbound",
  "mission.type.outbound": "Outbound",
  "mission.type.internal": "Internal",
  "mission.type.back_whs": "Back to Warehouse",
  "mission.type.transfer_gate": "Transfer to Gate",
  "mission.type.unknown": "Unknown",

  // Mission States
  "mission.state": "State",
  "mission.state.new": "New",
  "mission.state.processing": "Processing",
  "mission.state.done": "Done",
  "mission.state.error": "Error",
  "mission.state.done_picking": "Done Picking",
  "mission.state.unknown": "Unknown",

  // Mission Inventory
  "mission.inventory_material_no": "Material Number",
  "mission.inventory_qty": "Quantity",
  "mission.inventory_qty_available": "Available Quantity",
  "mission.inventory_id": "Inventory ID",
  "mission.kit_merger": "Kit Merger",

  // Modal Titles
  "mission.create_title": "Create New Mission",
  "mission.edit_title": "Edit Mission",
  "mission.detail_title": "Mission Details",

  // Form Placeholders
  "mission.mission_code_placeholder": "Enter mission code",
  "mission.robot_code_placeholder": "Enter robot code",
  "mission.origin_placeholder": "Enter origin location",
  "mission.destination_placeholder": "Enter destination location",
  "mission.description_placeholder": "Enter mission description",
  "mission.bin_id_placeholder": "Enter bin ID",
  "mission.inventory_material_no_placeholder": "Enter material number",
  "mission.inventory_qty_placeholder": "Enter quantity",
  "mission.inventory_qty_available_placeholder": "Enter available quantity",
  "mission.type_placeholder": "Select mission type",
  "mission.state_placeholder": "Select mission state",
  "mission.eta_placeholder": "Enter estimated time (minutes)",

  // Search and Filter
  "mission.search_placeholder":
    "Search by mission code, robot, origin, destination...",
  "mission.filter_by_state": "Filter by State",
  "mission.filter_by_type": "Filter by Type",

  // Form Validation
  "mission.mission_code_required": "Mission code is required",
  "mission.type_required": "Mission type is required",

  // Sections
  "mission.basic_info": "Basic Information",
  "mission.inventory_info": "Inventory Information",
  "mission.inventory_section": "Inventory Details",
  "mission.additional_info": "Additional Information",
  "mission.no_status_history": "No status history available",

  // Buttons
  "btn.export_excel": "Export Excel",
  "btn.delete_selected": "Delete Selected",

  // Mission Template
  "mission_template.delete_single_confirm":
    "Are you sure you want to delete this mission template? This action cannot be undone.",
  "mission_template.delete_multiple_confirm":
    "Are you sure you want to delete {{count}} mission templates? This action cannot be undone.",
};
