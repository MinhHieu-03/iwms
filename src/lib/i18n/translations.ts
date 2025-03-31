
export type SupportedLanguages = 'en' | 'vi';

export type TranslationKey = 
  // Common
  | 'save_changes'
  | 'cancel'
  | 'submit'
  
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
  | 'logout'
  
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
  | 'settings_saved';

export const translations: Record<SupportedLanguages, Record<TranslationKey, string>> = {
  en: {
    // Common
    save_changes: 'Save Changes',
    cancel: 'Cancel',
    submit: 'Submit',
    
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
    logout: 'Log out',
    
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
    settings_saved: 'Settings saved!'
  },
  vi: {
    // Common
    save_changes: 'Lưu thay đổi',
    cancel: 'Hủy',
    submit: 'Gửi',
    
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
    logout: 'Đăng xuất',
    
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
    settings_saved: 'Đã lưu cài đặt!'
  }
};
