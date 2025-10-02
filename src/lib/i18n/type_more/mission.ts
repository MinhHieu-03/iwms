export type TranslationKey = 
    | 'mission_settings'
    | 'mission_setting_template'
    | 'mission_setting_device'
    | 'mission_setting_device_template'
    | 'mission-setting.template'
    | '/mission-setting/template'
    
    // Mission Management
    | 'mission.title'
    | 'mission.mission_code'
    | 'mission.robot_code'
    | 'mission.origin'
    | 'mission.destination'
    | 'mission.description'
    | 'mission.bin_id'
    | 'mission.inventory'
    | 'mission.eta'
    | 'mission.status_history'

    // Mission Types
    | 'mission.type'
    | 'mission.type.inbound'
    | 'mission.type.outbound'
    | 'mission.type.internal'
    | 'mission.type.back_whs'
    | 'mission.type.transfer_gate'
    | 'mission.type.unknown'

    // Mission States
    | 'mission.state'
    | 'mission.state.new'
    | 'mission.state.processing'
    | 'mission.state.done'
    | 'mission.state.error'
    | 'mission.state.done_picking'
    | 'mission.state.unknown'

    // Mission Inventory
    | 'mission.inventory_material_no'
    | 'mission.inventory_qty'
    | 'mission.inventory_qty_available'
    | 'mission.inventory_id'
    | 'mission.kit_merger'

    // Modal Titles
    | 'mission.create_title'
    | 'mission.edit_title'
    | 'mission.detail_title'

    // Form Placeholders
    | 'mission.mission_code_placeholder'
    | 'mission.robot_code_placeholder'
    | 'mission.origin_placeholder'
    | 'mission.destination_placeholder'
    | 'mission.description_placeholder'
    | 'mission.bin_id_placeholder'
    | 'mission.inventory_material_no_placeholder'
    | 'mission.inventory_qty_placeholder'
    | 'mission.inventory_qty_available_placeholder'
    | 'mission.type_placeholder'
    | 'mission.state_placeholder'
    | 'mission.eta_placeholder'

    // Search and Filter
    | 'mission.search_placeholder'
    | 'mission.filter_by_state'
    | 'mission.filter_by_type'

    // Form Validation
    | 'mission.mission_code_required'
    | 'mission.type_required'

    // Sections
    | 'mission.basic_info'
    | 'mission.inventory_info'
    | 'mission.inventory_section'
    | 'mission.additional_info'
    | 'mission.no_status_history'

    // Buttons
    | 'btn.export_excel'
    | 'btn.delete_selected'