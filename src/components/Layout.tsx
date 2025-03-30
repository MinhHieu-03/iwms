
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
  Warehouse
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

type NavSection = {
  title: string;
  items: NavItem[];
};

type NavItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
  badge?: number;
};

const navSections: NavSection[] = [
  {
    title: "Main",
    items: [
      {
        path: "/",
        name: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        path: "/operator-interface",
        name: "Operator Interface",
        icon: <MonitorSmartphone className="w-5 h-5" />,
      },
      {
        path: "/inbound-outbound",
        name: "Inbound/Outbound",
        icon: <Truck className="w-5 h-5" />,
      },
      {
        path: "/layout",
        name: "Warehouse Layout",
        icon: <LayoutList className="w-5 h-5" />,
      },
      {
        path: "/missions",
        name: "Robot Missions",
        icon: <Bot className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        path: "/team-settings",
        name: "Team Management",
        icon: <Users className="w-5 h-5" />,
      },
      {
        path: "/user-settings",
        name: "User Settings",
        icon: <User className="w-5 h-5" />,
      },
      {
        path: "/system-settings",
        name: "System Settings",
        icon: <Settings className="w-5 h-5" />,
      },
      {
        path: "/warehouse-settings",
        name: "Warehouse Settings",
        icon: <Warehouse className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        path: "/notifications",
        name: "Notifications",
        icon: <Bell className="w-5 h-5" />,
        badge: 3,
      },
      {
        path: "/help",
        name: "Help Center",
        icon: <HelpCircle className="w-5 h-5" />,
      },
    ],
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); // For demo purposes, user is logged in
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "", // Empty for fallback to show
  };

  return (
    <div className="flex min-h-screen bg-warehouse-background">
      {/* Sidebar - enhanced with active state highlighting */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 flex items-center space-x-2 border-b border-gray-100">
          <Box className="h-6 w-6 text-warehouse-primary" />
          <h1 className="text-lg font-bold text-warehouse-primary">SmartWareHub</h1>
        </div>
        <nav className="p-2 space-y-6">
          {navSections.map((section, index) => (
            <div key={index} className="space-y-1">
              <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h2>
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-md mb-1 transition-all duration-200 ${
                    (location.pathname === item.path || 
                     (item.path !== "/" && location.pathname.startsWith(item.path)))
                      ? "bg-warehouse-primary text-white font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge className="bg-red-500 text-white text-xs">{item.badge}</Badge>
                  )}
                </Link>
              ))}
            </div>
          ))}
          
          {isLoggedIn && (
            <div className="mt-auto pt-4 border-t border-gray-100 px-4 py-2">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-md w-full text-left text-red-500 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b">
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
              "bg-warehouse-highlight"
            }`}></div>
            <h1 className="text-xl font-bold text-gray-800">
              {navSections.flatMap(s => s.items).find((item) => 
                item.path === location.pathname || 
                (item.path !== "/" && location.pathname.startsWith(item.path))
              )?.name || "Dashboard"}
            </h1>
          </div>

          {/* User profile dropdown */}
          <div className="flex items-center space-x-2">
            <Link to="/notifications" className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 rounded-full hover:bg-gray-100 p-1 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-warehouse-primary/10 text-warehouse-primary">
                        {user.name.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/user-settings">
                      <User className="mr-2 h-4 w-4" />
                      <span>User Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/notifications">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help Center</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-red-500">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="px-4 py-2 bg-warehouse-primary text-white rounded-md text-sm font-medium hover:bg-warehouse-primary/90 transition-colors"
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
