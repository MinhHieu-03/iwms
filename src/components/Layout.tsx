
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  LayoutList, 
  Settings, 
  Box, 
  Truck,
  Home,
  Bot,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); // For demo purposes, user is logged in
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "", // Empty for fallback to show
  };

  return (
    <div className="flex min-h-screen bg-warehouse-background">
      {/* Sidebar - updated with modern styling */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 flex items-center space-x-2 border-b border-gray-100">
          <Box className="h-6 w-6 text-warehouse-primary" />
          <h1 className="text-lg font-bold text-warehouse-primary">SmartWareHub</h1>
        </div>
        <nav className="p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md mb-1 hover:bg-gray-50 transition-colors ${
                location.pathname === item.path
                  ? "bg-warehouse-primary/10 text-warehouse-primary font-medium"
                  : "text-gray-600"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b">
          {/* Remove redundant view name */}
          <div className="flex items-center">
            <div className={`h-8 w-1 rounded-full mr-2 ${
              location.pathname === "/" ? "bg-warehouse-primary" :
              location.pathname === "/inbound-outbound" ? "bg-warehouse-accent1" :
              location.pathname === "/layout" ? "bg-warehouse-secondary" :
              location.pathname === "/missions" ? "bg-warehouse-accent2" :
              "bg-warehouse-highlight"
            }`}></div>
            <h1 className="text-xl font-bold text-gray-800">
              {navItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
            </h1>
          </div>

          {/* User profile dropdown */}
          <div className="flex items-center">
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
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
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
