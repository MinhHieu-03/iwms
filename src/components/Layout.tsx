
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  LayoutList, 
  Settings, 
  Box, 
  Truck,
  Home,
  Bot
} from "lucide-react";

type NavItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    path: "/inbound-outbound",
    name: "In/Out",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    path: "/layout",
    name: "Layout",
    icon: <LayoutList className="w-5 h-5" />,
  },
  {
    path: "/missions",
    name: "Missions",
    icon: <Bot className="w-5 h-5" />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-warehouse-background">
      {/* Sidebar */}
      <div className="w-64 bg-warehouse-primary text-white">
        <div className="p-4 flex items-center space-x-2 border-b border-warehouse-dark/20">
          <Box className="h-6 w-6" />
          <h1 className="text-lg font-bold">SmartWareHub</h1>
        </div>
        <nav className="p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md mb-1 hover:bg-warehouse-dark/20 transition-colors ${
                location.pathname === item.path
                  ? "bg-warehouse-dark/20 text-warehouse-highlight"
                  : ""
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-warehouse-primary">
            {navItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
