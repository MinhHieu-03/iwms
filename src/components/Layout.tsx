
import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  ChevronDown
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
import { useLanguage } from "@/contexts/LanguageContext";
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

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const { t } = useLanguage();
  
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
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
            }
          ]
        },
        {
          path: "/team-settings",
          name: "team_management" as TranslationKey,
          icon: <Users className="w-5 h-5" />,
        },
        {
          path: "/user-settings",
          name: "user_settings" as TranslationKey,
          icon: <User className="w-5 h-5" />,
        },
        {
          path: "/system-settings",
          name: "system_settings" as TranslationKey,
          icon: <Settings className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Support",
      items: [
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
      ],
    },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path || 
                     (item.path !== "/" && location.pathname.startsWith(item.path));

    if (item.children) {
      return (
        <DropdownMenu key={item.path}>
          <DropdownMenuTrigger asChild>
            <button
              className={`flex items-center justify-between px-4 py-3 rounded-md mb-1 transition-all duration-200 w-full text-left ${
                isActive
                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{t(item.name)}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.path} asChild>
                <Link
                  to={child.path}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  {child.icon}
                  <span>{t(child.name)}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
          <span>{t(item.name)}</span>
        </div>
        {item.badge && (
          <Badge variant="destructive" className="text-xs">{item.badge}</Badge>
        )}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r border-border shadow-sm">
        <div className="p-4 flex items-center space-x-2 border-b border-border">
          <Box className="h-6 w-6 text-warehouse-primary" />
          <h1 className="text-lg font-bold text-warehouse-primary">SmartWareHub</h1>
        </div>
        <nav className="p-2 space-y-6">
          {navSections.map((section, index) => (
            <div key={index} className="space-y-1">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h2>
              {section.items.map(renderNavItem)}
            </div>
          ))}
          
          {isLoggedIn && (
            <div className="mt-auto pt-4 border-t border-border px-4 py-2">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-md w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-5 h-5" />
                <span>{t("logout")}</span>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background text-foreground">
        <header className="bg-background shadow-sm h-16 flex items-center justify-between px-6 border-b border-border">
          <div className="flex items-center">
            <div className={`h-8 w-1 rounded-full mr-2 ${
              location.pathname === "/" ? "bg-warehouse-primary" :
              location.pathname === "/inbound-outbound" ? "bg-warehouse-accent1" :
              location.pathname === "/layout" ? "bg-warehouse-secondary" :
              location.pathname === "/missions" ? "bg-warehouse-accent2" :
              location.pathname === "/team-settings" ? "bg-indigo-500" :
              location.pathname === "/user-settings" ? "bg-teal-500" :
              location.pathname === "/system-settings" ? "bg-purple-500" :
              location.pathname === "/notifications" ? "bg-amber-500" :
              location.pathname === "/operator-interface" ? "bg-cyan-500" :
              location.pathname === "/help" ? "bg-green-500" :
              location.pathname.startsWith("/warehouse-settings") ? "bg-orange-500" :
              "bg-warehouse-highlight"
            }`}></div>
            <h1 className="text-xl font-bold">
              {location.pathname.startsWith("/warehouse-settings") 
                ? location.pathname === "/warehouse-settings/layout" 
                  ? "Layout Configuration"
                  : location.pathname === "/warehouse-settings/storage"
                  ? "Storage Model Configuration"
                  : t("warehouse_settings")
                : t(
                  navSections.flatMap(s => s.items)
                    .find((item) => 
                      item.path === location.pathname || 
                      (item.path !== "/" && location.pathname.startsWith(item.path))
                    )?.name || ("dashboard" as TranslationKey)
                )}
            </h1>
          </div>

          {/* User profile dropdown & Language selector */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Link to="/notifications" className="relative p-2 rounded-full hover:bg-muted">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 rounded-full hover:bg-muted p-1 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
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
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-red-500">{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Log in
              </button>
            )}
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
