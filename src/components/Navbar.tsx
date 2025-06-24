import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LayoutList,
  Settings,
  Box,
  Truck,
  Bot,
  User,
  Users,
  Bell,
  HelpCircle,
  LogOut,
  MonitorSmartphone,
  Warehouse,
  ChevronDown,
  ChevronRight,
  Smartphone,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { SupportedLanguages, TranslationKey } from "@/lib/i18n/translations";

type NavSection = {
  title: string;
  items: NavItem[];
};

type NavItem = {
  path: string;
  name: TranslationKey;
  icon: React.ReactNode;
  badge?: number;
  children?: NavItem[];
};

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const user = {
    name: "doan nguyen",
    email: "dnt@vti.com.vn",
    avatar: "",
  };

  const navSections = [
    {
      title: "Main",
      items: [
        {
          path: "/",
          name: "dashboard" as TranslationKey,
          icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
          path: "/operator-interface",
          name: "operator_interface" as TranslationKey,
          icon: <MonitorSmartphone className="w-5 h-5" />,
        },
        {
          path: "/inbound-outbound",
          name: "inbound_outbound" as TranslationKey,
          icon: <Truck className="w-5 h-5" />,
        },
        {
          path: "/layout",
          name: "warehouse_layout" as TranslationKey,
          icon: <LayoutList className="w-5 h-5" />,
        },
        {
          path: "/missions",
          name: "robot_missions" as TranslationKey,
          icon: <Bot className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          path: "/warehouse-settings",
          name: "warehouse_settings" as TranslationKey,
          icon: <Warehouse className="w-5 h-5" />,
          children: [
            {
              path: "/warehouse-settings/layout",
              name: "layout_configuration" as TranslationKey,
              icon: <LayoutList className="w-4 h-4" />,
            },
            {
              path: "/warehouse-settings/storage",
              name: "storage_model_configuration" as TranslationKey,
              icon: <Box className="w-4 h-4" />,
            },
          ],
        },
        {
          path: "/mission-settings",
          name: "mission_settings" as TranslationKey,
          icon: <Bot className="w-5 h-5" />,
          children: [
            {
              path: "/mission-settings/template",
              name: "mission_setting_template" as TranslationKey,
              icon: <FileText className="w-4 h-4" />,
            },
            {
              path: "/mission-settings/device",
              name: "mission_setting_device" as TranslationKey,
              icon: <Smartphone className="w-4 h-4" />,
            },
            {
              path: "/mission-settings/device-template",
              name: "mission_setting_device_template" as TranslationKey,
              icon: <FileText className="w-4 h-4" />,
            }
          ]
        },
        {
          path: "/team-settings",
          name: "team_management" as TranslationKey,
          icon: <Users className="w-5 h-5" />,
        },
        // {
        //   path: "/user-settings",
        //   name: "user_settings" as TranslationKey,
        //   icon: <User className="w-5 h-5" />,
        // },
        // {
        //   path: "/system-settings",
        //   name: "system_settings" as TranslationKey,
        //   icon: <Settings className="w-5 h-5" />,
        // },
      ],
    },
  ];

  const supportItems = [
    {
      path: "/notifications",
      name: "notifications" as TranslationKey,
      icon: <Bell className="w-5 h-5" />,
      badge: 3,
    },
    {
      path: "/help",
      name: "help_center" as TranslationKey,
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  const toggleSubmenu = (path: string) => {
    setExpandedMenus((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const renderNavItem = (item: NavItem) => {
    const isActive =
      location.pathname === item.path ||
      (item.path !== "/" && location.pathname.startsWith(item.path));
    const isExpanded = expandedMenus.includes(item.path);

    if (item.children) {
      return (
        <div key={item.path} className="space-y-1">
          <button
            onClick={() => toggleSubmenu(item.path)}
            className={`flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 w-full text-left ${
              isActive
                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span>{t(item.name)}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isExpanded && (
            <div className="ml-4 space-y-1">
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === child.path
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {child.icon}
                  <span className="text-sm">{t(child.name)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center justify-between px-4 py-3 rounded-md mb-1 transition-all duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground font-medium shadow-sm"
            : "text-foreground hover:bg-muted"
        }`}
      >
        <div className="flex items-center space-x-3">
          {item.icon}
          <span className="capitalize">{t(item.name)}</span>
        </div>
        {item.badge && (
          <Badge variant="destructive" className="text-xs">
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  React.useEffect(() => {
    // Auto-expand warehouse settings if we're on a child page
    if (location.pathname.startsWith("/warehouse-settings")) {
      setExpandedMenus((prev) =>
        prev.includes("/warehouse-settings")
          ? prev
          : [...prev, "/warehouse-settings"]
      );
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border shadow-sm z-50 overflow-y-auto">
        <div className="p-4 flex items-center space-x-2 border-b border-border">
          <Box className="h-6 w-6 text-warehouse-primary" />
          <h1 className="text-lg font-bold text-warehouse-primary">
            iWMS System
          </h1>
        </div>

        <div className="flex flex-col h-full">
          <nav className="p-2 space-y-6 flex-1">
            {navSections.map((section, index) => (
              <div key={index} className="space-y-1">
                <h2 className="mb-2 px-4 text-xs font-bold text-black uppercase tracking-wider">
                  {section.title}
                </h2>
                {section.items.map(renderNavItem)}
              </div>
            ))}
          </nav>

          {/* Support Section and Logout at Bottom */}
          <div className="border-t border-border p-2">
            <div className="space-y-1 mb-4">
              <h2 className="mb-2 px-4 text-xs font-bold text-black uppercase tracking-wider">
                Support
              </h2>
              {supportItems.map(renderNavItem)}
            </div>

            {isAuthenticated && (
              <div className="px-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 rounded-md w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col bg-background text-foreground min-h-screen">
        {/* Top Header */}
        <header className="bg-background shadow-sm h-16 flex items-center justify-between px-6 border-b border-border sticky top-0 z-40">
          <div className="flex items-center">
            <div
              className={`h-8 w-1 rounded-full mr-2 ${
                location.pathname === "/"
                  ? "bg-warehouse-primary"
                  : location.pathname === "/inbound-outbound"
                  ? "bg-warehouse-accent1"
                  : location.pathname === "/layout"
                  ? "bg-warehouse-secondary"
                  : location.pathname === "/missions"
                  ? "bg-warehouse-accent2"
                  : location.pathname.startsWith("/team-settings")
                  ? "bg-indigo-500"
                  : location.pathname === "/user-settings"
                  ? "bg-teal-500"
                  : location.pathname === "/system-settings"
                  ? "bg-purple-500"
                  : location.pathname === "/notifications"
                  ? "bg-amber-500"
                  : location.pathname === "/operator-interface"
                  ? "bg-cyan-500"
                  : location.pathname === "/help"
                  ? "bg-green-500"
                  : location.pathname.startsWith("/warehouse-settings")
                  ? "bg-orange-500"
                  : "bg-warehouse-highlight"
              }`}
            ></div>
            <h1 className="text-xl font-bold">
              {location.pathname.startsWith("/warehouse-settings")
                ? location.pathname === "/warehouse-settings/layout"
                  ? "Cấu hình cấu trúc kho"
                  : location.pathname === "/warehouse-settings/storage"
                  ? "Cấu hình lưu trữ kho"
                  : t("warehouse_settings")
                : location.pathname.startsWith("/team-settings")
                ? t("team_management")
                : t(location.pathname as TranslationKey)}
            </h1>
          </div>

          {/* User profile dropdown & Language selector */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />

            <Link
              to="/notifications"
              className="relative p-2 rounded-full hover:bg-muted"
            >
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 rounded-full hover:bg-muted p-1 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/user-settings">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("user_settings")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/notifications">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>{t("notifications")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>{t("help_center")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-red-500">{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
