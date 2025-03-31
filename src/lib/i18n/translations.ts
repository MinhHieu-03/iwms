
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
  | 'date'
  | 'dock'
  | 'activity';

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
    date: 'Date',
    dock: 'Dock',
    activity: 'Activity'
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
    date: 'Ngày',
    dock: 'Khu vực',
    activity: 'Hoạt động'
  }
};
