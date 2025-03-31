
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
  | 'high_contrast'
  | 'high_contrast_description'
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
  | 'language'
  | 'language_description'
  | 'settings_saved'
  
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
  
  // Help Center
  | 'guides'
  | 'faqs'
  | 'contact_support'
  | 'popular_guides'
  | 'quick_answers'
  
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
    high_contrast: 'High Contrast',
    high_contrast_description: 'Increase contrast for better visibility',
    notification_preferences: 'Notification Preferences',
    email_notifications: 'Email Notifications',
    email_notifications_description: 'Receive notifications via email',
    push_notifications: 'Push Notifications',
    push_notifications_description: 'Receive push notifications in browser',
    security: 'Security',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_password: 'Confirm New Password',
    update_password: 'Update Password',
    language: 'Language',
    language_description: 'Select your preferred language',
    settings_saved: 'Settings saved!',
    
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
    steps: 'steps',
    modified: 'Modified:',
    delete_template: 'Delete Template',
    delete_template_confirm: 'Are you sure you want to delete this template? This action cannot be undone.',
    template_created: 'Template created',
    template_created_description: 'has been created successfully.',
    template_deleted: 'Template deleted',
    template_deleted_description: 'has been deleted.',
    
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
    
    // Help Center
    guides: 'Guides',
    faqs: 'FAQs',
    contact_support: 'Contact Support',
    popular_guides: 'Popular Guides',
    quick_answers: 'Quick Answers',
    
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
    high_contrast: 'Độ tương phản cao',
    high_contrast_description: 'Tăng độ tương phản để xem rõ hơn',
    notification_preferences: 'Tùy chọn thông báo',
    email_notifications: 'Thông báo qua email',
    email_notifications_description: 'Nhận thông báo qua email',
    push_notifications: 'Thông báo đẩy',
    push_notifications_description: 'Nhận thông báo đẩy trong trình duyệt',
    security: 'Bảo mật',
    current_password: 'Mật khẩu hiện tại',
    new_password: 'Mật khẩu mới',
    confirm_password: 'Xác nhận mật khẩu mới',
    update_password: 'Cập nhật mật khẩu',
    language: 'Ngôn ngữ',
    language_description: 'Chọn ngôn ngữ ưa thích của bạn',
    settings_saved: 'Đã lưu cài đặt!',
    
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
    steps: 'bước',
    modified: 'Đã sửa:',
    delete_template: 'Xóa mẫu',
    delete_template_confirm: 'Bạn có chắc chắn muốn xóa mẫu này? Hành động này không thể hoàn tác.',
    template_created: 'Đã tạo mẫu',
    template_created_description: 'đã được tạo thành công.',
    template_deleted: 'Đã xóa mẫu',
    template_deleted_description: 'đã được xóa.',
    
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
    
    // Help Center
    guides: 'Hướng dẫn',
    faqs: 'Câu hỏi thường gặp',
    contact_support: 'Liên hệ hỗ trợ',
    popular_guides: 'Hướng dẫn phổ biến',
    quick_answers: 'Câu trả lời nhanh',
    
    // Notifications
    mark_all_read: 'Đánh dấu tất cả là đã đọc',
    clear_all: 'Xóa tất cả',
    no_notifications: 'Không có thông báo',
    notification_time: 'trước'
  }
};
