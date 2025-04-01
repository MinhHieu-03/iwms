
export type SupportedLanguages = 'en' | 'vi';

export type TranslationKey = 
  // Common
  | 'save_changes'
  | 'cancel'
  | 'submit'
  | 'logout'
  
  // Navigation & Sidebar
  | 'dashboard'
  | 'operator_interface'
  | 'inbound_outbound'
  | 'warehouse_layout'
  | 'robot_missions'
  | 'team_management'
  | 'user_settings'
  | 'system_settings'
  | 'warehouse_settings'
  | 'notifications'
  | 'help_center'
  
  // User Settings
  | 'appearance'
  | 'dark_mode'
  | 'dark_mode_description'
  | 'language'
  | 'language_description'
  | 'settings_saved'
  | 'notification_preferences'
  | 'email_notifications'
  | 'email_notifications_description'
  | 'push_notifications'
  | 'push_notifications_description'
  | 'security'
  | 'current_password'
  | 'new_password'
  | 'confirm_password'
  | 'update_password'
  
  // Missions
  | 'active_missions'
  | 'recent_missions'
  | 'mission_id'
  | 'robot'
  | 'type'
  | 'status'
  | 'from'
  | 'to'
  | 'started'
  | 'finished'
  | 'actions'
  | 'pause'
  | 'cancel_mission'
  | 'new_mission'
  | 'mission_templates'
  | 'new_template'
  | 'search_templates'
  | 'filter'
  | 'date'
  | 'no_templates_found'
  | 'try_different_search'
  | 'create_first_template'
  | 'clear_search'
  | 'edit'
  | 'duplicate'
  | 'delete'
  | 'steps'
  | 'modified'
  | 'delete_template'
  | 'delete_template_confirm'
  | 'template_created'
  | 'template_created_description'
  | 'template_deleted'
  | 'template_deleted_description'
  | 'edit_template'
  | 'template_name'
  | 'template_description'
  | 'add_step'
  | 'remove_step'
  | 'save_template'
  | 'template_updated'
  | 'template_updated_description'
  | 'graph'
  | 'visual_editor'
  | 'settings'
  
  // Operator Interface
  | 'select_dock'
  | 'default_dock'
  | 'current_location'
  | 'start_shift'
  | 'end_shift'
  | 'inbound'
  | 'outbound'
  | 'history'
  | 'dock_history'
  | 'dock'
  | 'activity'
  | 'scan_barcode'
  | 'enter_barcode'
  | 'recent_activity'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'performance_metrics'
  | 'orders_processed'
  | 'avg_completion_time'
  | 'today'
  | 'this_week'
  | 'this_month'
  | 'minutes_per_order'
  | 'efficiency_rating'
  | 'excellent'
  | 'good'
  | 'average'
  | 'needs_improvement'
  | 'process_inbound'
  | 'process_outbound'
  
  // Warehouse Layout
  | 'warehouse_overview'
  | 'warehouse_zones'
  | 'manage_zones'
  | 'size'
  | 'occupancy'
  | '2d_layout'
  | '3d_visualization'
  | 'rack_configurations'
  | 'configure_racks'
  | 'overview'
  | 'zones'
  | 'racks'
  | 'to_be_implemented'
  | 'row'
  | 'column'
  | 'stored_items'
  | 'no_items_stored'
  | 'shelf'
  | 'in_stock'
  | 'low_stock'
  | 'quantity'
  
  // System Settings
  | 'database_configuration'
  | 'database_url'
  | 'connection_pool'
  | 'query_timeout'
  | 'server_settings'
  | 'server_port'
  | 'environment'
  | 'log_level'
  | 'storage_configuration'
  | 'storage_path'
  | 'automatic_backups'
  | 'backup_frequency'
  | 'api_configuration'
  | 'api_key'
  | 'regenerate'
  | 'rate_limit'
  | 'development'
  | 'staging'
  | 'production'
  | 'debug'
  | 'info'
  | 'warning'
  | 'error'
  | 'enabled'
  | 'disabled'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'reset'
  
  // Warehouse Settings & Team Management
  | 'team_settings'
  | 'warehouse_configuration'
  | 'reset_to_defaults'
  | 'add_zone'
  | 'zone_name'
  | 'number_of_rows'
  | 'number_of_columns'
  | 'shelf_levels'
  | 'configured_storage_zones'
  | 'add_loading_dock'
  | 'dock_name'
  | 'dock_type'
  | 'configured_loading_docks'
  | 'add_dock'
  | 'structure_saved'
  | 'structure_saved_description'
  | 'zone_added'
  | 'zone_added_description'
  | 'zone_deleted'
  | 'zone_deleted_description'
  | 'dock_added'
  | 'dock_added_description'
  | 'dock_deleted'
  | 'dock_deleted_description'
  | 'storage_zones'
  | 'loading_docks'
  | 'maintenance'
  | 'inactive'
  | 'active'
  | 'both'
  | 'rows'
  | 'columns'
  | 'levels'
  | 'save_structure'
  
  // Team Management
  | 'user_management'
  | 'create_user'
  | 'edit_user'
  | 'disable_user'
  | 'administrator'
  | 'operator'
  | 'manager'
  | 'roles_permissions'
  | 'edit_permissions'
  | 'user_groups'
  | 'manage_group'
  | 'users'
  | 'roles'
  | 'groups'
  | 'full_access'
  | 'inventory_reports'
  | 'process_operations'
  | 'warehouse_staff'
  | 'management_team'
  | 'it_support'
  | 'members'
  | 'create_role'
  | 'create_group'
  
  // Help Center
  | 'guides'
  | 'faqs'
  | 'contact_support'
  | 'popular_guides'
  | 'quick_answers'
  
  // Dashboard
  | 'inventory_overview'
  | 'total_items'
  | 'low_stock_items'
  | 'out_of_stock'
  | 'recent_activity_dashboard'
  | 'system_status'
  | 'online'
  | 'robots_available'
  | 'pending_orders'
  | 'recent_alerts'
  
  // Inbound/Outbound
  | 'inbound_orders'
  | 'outbound_orders'
  | 'new_inbound_order'
  | 'new_outbound_order'
  | 'order_id'
  | 'supplier'
  | 'customer'
  | 'items'
  
  // Notifications
  | 'mark_all_read'
  | 'clear_all'
  | 'no_notifications'
  | 'notification_time';

export const translations: Record<SupportedLanguages, Record<TranslationKey, string>> = {
  en: {
    // Common
    save_changes: 'Save Changes',
    cancel: 'Cancel',
    submit: 'Submit',
    logout: 'Log out',
    
    // Navigation & Sidebar
    dashboard: 'Dashboard',
    operator_interface: 'Operator Interface',
    inbound_outbound: 'Inbound/Outbound',
    warehouse_layout: 'Warehouse Layout',
    robot_missions: 'Robot Missions',
    team_management: 'Team Management',
    user_settings: 'User Settings',
    system_settings: 'System Settings',
    warehouse_settings: 'Warehouse Settings',
    notifications: 'Notifications',
    help_center: 'Help Center',
    
    // User Settings
    appearance: 'Appearance',
    dark_mode: 'Dark Mode',
    dark_mode_description: 'Toggle between light and dark theme',
    language: 'Language',
    language_description: 'Select your preferred language',
    settings_saved: 'Settings saved!',
    notification_preferences: 'Notification Preferences',
    email_notifications: 'Email Notifications',
    email_notifications_description: 'Receive notifications via email',
    push_notifications: 'Push Notifications',
    push_notifications_description: 'Receive push notifications in browser',
    security: 'Security',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_password: 'Confirm Password',
    update_password: 'Update Password',
    
    // Missions
    active_missions: 'Active Missions',
    recent_missions: 'Recent Missions',
    mission_id: 'Mission ID',
    robot: 'Robot',
    type: 'Type',
    status: 'Status',
    from: 'From',
    to: 'To',
    started: 'Started',
    finished: 'Finished',
    actions: 'Actions',
    pause: 'Pause',
    cancel_mission: 'Cancel',
    new_mission: 'New Mission',
    mission_templates: 'Mission Templates',
    new_template: 'New Template',
    search_templates: 'Search templates...',
    filter: 'Filter',
    date: 'Date',
    no_templates_found: 'No templates found',
    try_different_search: 'Try a different search term',
    create_first_template: 'Create your first template to get started',
    clear_search: 'Clear search',
    edit: 'Edit',
    duplicate: 'Duplicate',
    delete: 'Delete',
    steps: 'Steps',
    modified: 'Modified:',
    delete_template: 'Delete Template',
    delete_template_confirm: 'Are you sure you want to delete this template? This action cannot be undone.',
    template_created: 'Template created',
    template_created_description: 'has been created successfully.',
    template_deleted: 'Template deleted',
    template_deleted_description: 'has been deleted.',
    edit_template: 'Edit Template',
    template_name: 'Template Name',
    template_description: 'Description',
    add_step: 'Add Step',
    remove_step: 'Remove Step',
    save_template: 'Save Template',
    template_updated: 'Template updated',
    template_updated_description: 'has been updated successfully.',
    graph: 'Graph',
    visual_editor: 'Visual Editor',
    settings: 'Settings',
    
    // Operator Interface
    select_dock: 'Select Dock',
    default_dock: 'Default Dock',
    current_location: 'Current Location',
    start_shift: 'Start Shift',
    end_shift: 'End Shift',
    inbound: 'Inbound',
    outbound: 'Outbound',
    history: 'History',
    dock_history: 'Dock History',
    dock: 'Dock',
    activity: 'Activity',
    scan_barcode: 'Scan Barcode',
    enter_barcode: 'Enter Barcode',
    recent_activity: 'Recent Activity',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    performance_metrics: 'Performance Metrics',
    orders_processed: 'Orders Processed',
    avg_completion_time: 'Avg. Completion Time',
    today: 'Today',
    this_week: 'This Week',
    this_month: 'This Month',
    minutes_per_order: 'min/order',
    efficiency_rating: 'Efficiency Rating',
    excellent: 'Excellent',
    good: 'Good',
    average: 'Average',
    needs_improvement: 'Needs Improvement',
    process_inbound: 'Process Inbound',
    process_outbound: 'Process Outbound',
    
    // Warehouse Layout
    warehouse_overview: 'Warehouse Overview',
    warehouse_zones: 'Warehouse Zones',
    manage_zones: 'Manage warehouse zones and their configurations.',
    size: 'Size',
    occupancy: 'Occupancy',
    '2d_layout': '2D Layout',
    '3d_visualization': '3D Visualization',
    rack_configurations: 'Rack Configurations',
    configure_racks: 'Configure storage racks and shelving units.',
    overview: 'Overview',
    zones: 'Zones',
    racks: 'Racks',
    to_be_implemented: 'Rack configuration functionality to be implemented.',
    row: 'Row',
    column: 'Column',
    stored_items: 'Stored Items',
    no_items_stored: 'No items stored in this location',
    shelf: 'Shelf',
    in_stock: 'In Stock',
    low_stock: 'Low Stock',
    quantity: 'Qty',
    
    // System Settings
    database_configuration: 'Database Configuration',
    database_url: 'Database URL',
    connection_pool: 'Connection Pool Size',
    query_timeout: 'Query Timeout (seconds)',
    server_settings: 'Server Settings',
    server_port: 'Server Port',
    environment: 'Environment',
    log_level: 'Log Level',
    storage_configuration: 'Storage Configuration',
    storage_path: 'Storage Path',
    automatic_backups: 'Automatic Backups',
    backup_frequency: 'Backup Frequency',
    api_configuration: 'API Configuration',
    api_key: 'API Key',
    regenerate: 'Regenerate',
    rate_limit: 'Rate Limit (requests per minute)',
    development: 'Development',
    staging: 'Staging',
    production: 'Production',
    debug: 'Debug',
    info: 'Info',
    warning: 'Warning',
    error: 'Error',
    enabled: 'Enabled',
    disabled: 'Disabled',
    hourly: 'Hourly',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    reset: 'Reset',
    
    // Warehouse Settings & Team Management
    team_settings: 'Team Settings',
    warehouse_configuration: 'Warehouse Configuration',
    reset_to_defaults: 'Reset to defaults',
    add_zone: 'Add Zone',
    zone_name: 'Zone Name',
    number_of_rows: 'Number of Rows',
    number_of_columns: 'Number of Columns',
    shelf_levels: 'Shelf Levels',
    configured_storage_zones: 'Configured Storage Zones',
    add_loading_dock: 'Add Loading Dock',
    dock_name: 'Dock Name',
    dock_type: 'Dock Type',
    configured_loading_docks: 'Configured Loading Docks',
    add_dock: 'Add Dock',
    structure_saved: 'Structure Saved',
    structure_saved_description: 'Your warehouse structure has been saved successfully.',
    zone_added: 'Zone Added',
    zone_added_description: 'has been added to the warehouse.',
    zone_deleted: 'Zone Deleted',
    zone_deleted_description: 'The selected zone has been removed from the warehouse.',
    dock_added: 'Dock Added',
    dock_added_description: 'has been added to the warehouse.',
    dock_deleted: 'Dock Deleted',
    dock_deleted_description: 'The selected dock has been removed from the warehouse.',
    storage_zones: 'Storage Zones',
    loading_docks: 'Loading Docks',
    maintenance: 'Maintenance',
    inactive: 'Inactive',
    active: 'Active',
    both: 'Both',
    rows: 'rows',
    columns: 'columns',
    levels: 'levels',
    save_structure: 'Save Structure',
    
    // Team Management
    user_management: 'User Management',
    create_user: 'Create User',
    edit_user: 'Edit User',
    disable_user: 'Disable',
    administrator: 'Administrator',
    operator: 'Operator',
    manager: 'Manager',
    roles_permissions: 'Roles & Permissions',
    edit_permissions: 'Edit Permissions',
    user_groups: 'User Groups',
    manage_group: 'Manage Group',
    users: 'Users',
    roles: 'Roles & Permissions',
    groups: 'Groups',
    full_access: 'Full access to all system features',
    inventory_reports: 'Can manage inventory and view reports',
    process_operations: 'Limited to processing inbound/outbound operations',
    warehouse_staff: 'Warehouse Staff',
    management_team: 'Management Team',
    it_support: 'IT Support',
    members: 'members',
    create_role: 'Create Role',
    create_group: 'Create Group',
    
    // Help Center
    guides: 'Guides',
    faqs: 'FAQs',
    contact_support: 'Contact Support',
    popular_guides: 'Popular Guides',
    quick_answers: 'Quick Answers',
    
    // Dashboard
    inventory_overview: 'Inventory Overview',
    total_items: 'Total Items',
    low_stock_items: 'Low Stock Items',
    out_of_stock: 'Out of Stock',
    recent_activity_dashboard: 'Recent Activity',
    system_status: 'System Status',
    online: 'Online',
    robots_available: 'Robots Available',
    pending_orders: 'Pending Orders',
    recent_alerts: 'Recent Alerts',
    
    // Inbound/Outbound
    inbound_orders: 'Inbound Orders',
    outbound_orders: 'Outbound Orders',
    new_inbound_order: 'New Inbound Order',
    new_outbound_order: 'New Outbound Order',
    order_id: 'Order ID',
    supplier: 'Supplier',
    customer: 'Customer',
    items: 'Items',
    
    // Notifications
    mark_all_read: 'Mark all as read',
    clear_all: 'Clear all',
    no_notifications: 'No notifications',
    notification_time: 'ago'
  },
  vi: {
    // Common
    save_changes: 'Lưu thay đổi',
    cancel: 'Hủy',
    submit: 'Gửi',
    logout: 'Đăng xuất',
    
    // Navigation & Sidebar
    dashboard: 'Bảng điều khiển',
    operator_interface: 'Giao diện người vận hành',
    inbound_outbound: 'Nhập/Xuất kho',
    warehouse_layout: 'Bố trí kho',
    robot_missions: 'Nhiệm vụ robot',
    team_management: 'Quản lý nhóm',
    user_settings: 'Cài đặt người dùng',
    system_settings: 'Cài đặt hệ thống',
    warehouse_settings: 'Cài đặt kho',
    notifications: 'Thông báo',
    help_center: 'Trung tâm trợ giúp',
    
    // User Settings
    appearance: 'Giao diện',
    dark_mode: 'Chế độ tối',
    dark_mode_description: 'Chuyển đổi giữa chủ đề sáng và tối',
    language: 'Ngôn ngữ',
    language_description: 'Chọn ngôn ngữ ưa thích của bạn',
    settings_saved: 'Đã lưu cài đặt!',
    notification_preferences: 'Tùy chọn thông báo',
    email_notifications: 'Thông báo qua email',
    email_notifications_description: 'Nhận thông báo qua email',
    push_notifications: 'Thông báo đẩy',
    push_notifications_description: 'Nhận thông báo đẩy trong trình duyệt',
    security: 'Bảo mật',
    current_password: 'Mật khẩu hiện tại',
    new_password: 'Mật khẩu mới',
    confirm_password: 'Xác nhận mật khẩu',
    update_password: 'Cập nhật mật khẩu',
    
    // Missions
    active_missions: 'Nhiệm vụ đang hoạt động',
    recent_missions: 'Nhiệm vụ gần đây',
    mission_id: 'ID Nhiệm vụ',
    robot: 'Robot',
    type: 'Loại',
    status: 'Trạng thái',
    from: 'Từ',
    to: 'Đến',
    started: 'Bắt đầu',
    finished: 'Kết thúc',
    actions: 'Thao tác',
    pause: 'Tạm dừng',
    cancel_mission: 'Hủy',
    new_mission: 'Nhiệm vụ mới',
    mission_templates: 'Mẫu nhiệm vụ',
    new_template: 'Mẫu mới',
    search_templates: 'Tìm kiếm mẫu...',
    filter: 'Lọc',
    date: 'Ngày',
    no_templates_found: 'Không tìm thấy mẫu',
    try_different_search: 'Thử từ khóa tìm kiếm khác',
    create_first_template: 'Tạo mẫu đầu tiên để bắt đầu',
    clear_search: 'Xóa tìm kiếm',
    edit: 'Chỉnh sửa',
    duplicate: 'Nhân bản',
    delete: 'Xóa',
    steps: 'Bước',
    modified: 'Đã sửa:',
    delete_template: 'Xóa mẫu',
    delete_template_confirm: 'Bạn có chắc chắn muốn xóa mẫu này? Hành động này không thể hoàn tác.',
    template_created: 'Đã tạo mẫu',
    template_created_description: 'đã được tạo thành công.',
    template_deleted: 'Đã xóa mẫu',
    template_deleted_description: 'đã được xóa.',
    edit_template: 'Chỉnh sửa mẫu',
    template_name: 'Tên mẫu',
    template_description: 'Mô tả',
    add_step: 'Thêm bước',
    remove_step: 'Xóa bước',
    save_template: 'Lưu mẫu',
    template_updated: 'Cập nhật mẫu',
    template_updated_description: 'đã được cập nhật thành công.',
    graph: 'Biểu đồ',
    visual_editor: 'Trình soạn thảo trực quan',
    settings: 'Cài đặt',
    
    // Operator Interface
    select_dock: 'Chọn khu vực',
    default_dock: 'Khu vực mặc định',
    current_location: 'Vị trí hiện tại',
    start_shift: 'Bắt đầu ca',
    end_shift: 'Kết thúc ca',
    inbound: 'Nhập kho',
    outbound: 'Xuất kho',
    history: 'Lịch sử',
    dock_history: 'Lịch sử khu vực',
    dock: 'Khu vực',
    activity: 'Hoạt động',
    scan_barcode: 'Quét mã vạch',
    enter_barcode: 'Nhập mã vạch',
    recent_activity: 'Hoạt động gần đây',
    processing: 'Đang xử lý',
    completed: 'Hoàn thành',
    failed: 'Thất bại',
    performance_metrics: 'Chỉ số hiệu suất',
    orders_processed: 'Đơn đã xử lý',
    avg_completion_time: 'Thời gian hoàn thành trung bình',
    today: 'Hôm nay',
    this_week: 'Tuần này',
    this_month: 'Tháng này',
    minutes_per_order: 'phút/đơn hàng',
    efficiency_rating: 'Đánh giá hiệu quả',
    excellent: 'Xuất sắc',
    good: 'Tốt',
    average: 'Trung bình',
    needs_improvement: 'Cần cải thiện',
    process_inbound: 'Xử lý nhập kho',
    process_outbound: 'Xử lý xuất kho',
    
    // Warehouse Layout
    warehouse_overview: 'Tổng quan kho',
    warehouse_zones: 'Khu vực kho',
    manage_zones: 'Quản lý các khu vực kho và cấu hình của chúng.',
    size: 'Kích thước',
    occupancy: 'Tỷ lệ lấp đầy',
    '2d_layout': 'Bố trí 2D',
    '3d_visualization': 'Hình ảnh 3D',
    rack_configurations: 'Cấu hình kệ',
    configure_racks: 'Cấu hình kệ lưu trữ và đơn vị kệ.',
    overview: 'Tổng quan',
    zones: 'Khu vực',
    racks: 'Kệ',
    to_be_implemented: 'Chức năng cấu hình kệ sẽ được triển khai sau.',
    row: 'Hàng',
    column: 'Cột',
    stored_items: 'Các mặt hàng lưu trữ',
    no_items_stored: 'Không có hàng hóa được lưu trữ ở vị trí này',
    shelf: 'Kệ',
    in_stock: 'Còn hàng',
    low_stock: 'Sắp hết',
    quantity: 'SL',
    
    // System Settings
    database_configuration: 'Cấu hình cơ sở dữ liệu',
    database_url: 'URL cơ sở dữ liệu',
    connection_pool: 'Kích thước nhóm kết nối',
    query_timeout: 'Thời gian chờ truy vấn (giây)',
    server_settings: 'Cài đặt máy chủ',
    server_port: 'Cổng máy chủ',
    environment: 'Môi trường',
    log_level: 'Mức độ ghi nhật ký',
    storage_configuration: 'Cấu hình lưu trữ',
    storage_path: 'Đường dẫn lưu trữ',
    automatic_backups: 'Sao lưu tự động',
    backup_frequency: 'Tần suất sao lưu',
    api_configuration: 'Cấu hình API',
    api_key: 'Khóa API',
    regenerate: 'Tạo lại',
    rate_limit: 'Giới hạn tốc độ (yêu cầu mỗi phút)',
    development: 'Phát triển',
    staging: 'Dàn dựng',
    production: 'Sản xuất',
    debug: 'Gỡ lỗi',
    info: 'Thông tin',
    warning: 'Cảnh báo',
    error: 'Lỗi',
    enabled: 'Bật',
    disabled: 'Tắt',
    hourly: 'Hàng giờ',
    daily: 'Hàng ngày',
    weekly: 'Hàng tuần',
    monthly: 'Hàng tháng',
    reset: 'Đặt lại',
    
    // Warehouse Settings & Team Management
    team_settings: 'Cài đặt nhóm',
    warehouse_configuration: 'Cấu hình kho',
    reset_to_defaults: 'Đặt lại về mặc định',
    add_zone: 'Thêm khu vực',
    zone_name: 'Tên khu vực',
    number_of_rows: 'Số hàng',
    number_of_columns: 'Số cột',
    shelf_levels: 'Số tầng kệ',
    configured_storage_zones: 'Khu vực lưu trữ đã cấu hình',
    add_loading_dock: 'Thêm bến bốc dỡ',
    dock_name: 'Tên bến',
    dock_type: 'Loại bến',
    configured_loading_docks: 'Bến bốc dỡ đã cấu hình',
    add_dock: 'Thêm bến',
    structure_saved: 'Đã lưu cấu trúc',
    structure_saved_description: 'Cấu trúc kho của bạn đã được lưu thành công.',
    zone_added: 'Đã thêm khu vực',
    zone_added_description: 'đã được thêm vào kho.',
    zone_deleted: 'Đã xóa khu vực',
    zone_deleted_description: 'Khu vực đã chọn đã được xóa khỏi kho.',
    dock_added: 'Đã thêm bến',
    dock_added_description: 'đã được thêm vào kho.',
    dock_deleted: 'Đã xóa bến',
    dock_deleted_description: 'Bến đã chọn đã được xóa khỏi kho.',
    storage_zones: 'Khu vực lưu trữ',
    loading_docks: 'Bến bốc dỡ',
    maintenance: 'Bảo trì',
    inactive: 'Không hoạt động',
    active: 'Hoạt động',
    both: 'Cả hai',
    rows: 'hàng',
    columns: 'cột',
    levels: 'tầng',
    save_structure: 'Lưu cấu trúc',
    
    // Team Management
    user_management: 'Quản lý người dùng',
    create_user: 'Tạo người dùng',
    edit_user: 'Chỉnh sửa người dùng',
    disable_user: 'Vô hiệu hóa',
    administrator: 'Quản trị viên',
    operator: 'Người vận hành',
    manager: 'Người quản lý',
    roles_permissions: 'Vai trò & Quyền hạn',
    edit_permissions: 'Chỉnh sửa quyền',
    user_groups: 'Nhóm người dùng',
    manage_group: 'Quản lý nhóm',
    users: 'Người dùng',
    roles: 'Vai trò & Quyền hạn',
    groups: 'Nhóm',
    full_access: 'Toàn quyền truy cập vào tất cả tính năng của hệ thống',
    inventory_reports: 'Có thể quản lý kho và xem báo cáo',
    process_operations: 'Chỉ giới hạn ở xử lý hoạt động nhập/xuất kho',
    warehouse_staff: 'Nhân viên kho',
    management_team: 'Nhóm quản lý',
    it_support: 'Hỗ trợ IT',
    members: 'thành viên',
    create_role: 'Tạo vai trò',
    create_group: 'Tạo nhóm',
    
    // Help Center
    guides: 'Hướng dẫn',
    faqs: 'Câu hỏi thường gặp',
    contact_support: 'Liên hệ hỗ trợ',
    popular_guides: 'Hướng dẫn phổ biến',
    quick_answers: 'Câu trả lời nhanh',
    
    // Dashboard
    inventory_overview: 'Tổng quan kho',
    total_items: 'Tổng số mặt hàng',
    low_stock_items: 'Mặt hàng sắp hết',
    out_of_stock: 'Hết hàng',
    recent_activity_dashboard: 'Hoạt động gần đây',
    system_status: 'Trạng thái hệ thống',
    online: 'Trực tuyến',
    robots_available: 'Robot khả dụng',
    pending_orders: 'Đơn hàng đang chờ xử lý',
    recent_alerts: 'Cảnh báo gần đây',
    
    // Inbound/Outbound
    inbound_orders: 'Đơn nhập kho',
    outbound_orders: 'Đơn xuất kho',
    new_inbound_order: 'Đơn nhập kho mới',
    new_outbound_order: 'Đơn xuất kho mới',
    order_id: 'ID đơn hàng',
    supplier: 'Nhà cung cấp',
    customer: 'Khách hàng',
    items: 'Mặt hàng',
    
    // Notifications
    mark_all_read: 'Đánh dấu tất cả là đã đọc',
    clear_all: 'Xóa tất cả',
    no_notifications: 'Không có thông báo',
    notification_time: 'trước'
  }
};
