import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { User, LogOut, Building2, LogIn } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, logout } from "@/store/authSlice";

interface OutboundHeaderProps {
  selectedGate?: string;
  title?: string;
  onGateChange?: (gate: string) => void;
}

const OutboundHeader: React.FC<OutboundHeaderProps> = ({
  selectedGate = "1",
  onGateChange,
  title = ""
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, user } = useAppSelector((state) => state.auth);
  
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });
  const [currentGate, setCurrentGate] = useState(selectedGate);
  const [storedUsername, setStoredUsername] = useState<string>("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get stored user info if authenticated
    if (isAuthenticated) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setStoredUsername(parsedUser.name || parsedUser.username || "User");
        } catch (e) {
          console.error("Error parsing stored user:", e);
        }
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
      return;
    }

    try {
      await dispatch(login({
        username: loginForm.username,
        password: loginForm.password
      })).unwrap();
      
      // Clear form and close modal on successful login
      setLoginForm({ username: "", password: "" });
      handleModalClose(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleGateChange = (gate: string) => {
    setCurrentGate(gate);
    onGateChange?.(gate);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleModalClose = (open: boolean) => {
    setIsLoginModalOpen(open);
    if (!open) {
      // Clear form when modal is closed
      setLoginForm({ username: "", password: "" });
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left section - Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              {title}
            </h1>
          </div>

          {/* Center section - Current Time */}
          <div className="flex-1 flex justify-center">
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-gray-800">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </div>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString('vn-VN', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          {/* Right section - Gate selector and Login/User info */}
          <div className="flex items-center gap-4">
            {/* Gate selector */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Cửa ra:</span>
              </div>
              <Select value={currentGate} onValueChange={handleGateChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Cửa ra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Cửa ra 1</SelectItem>
                  <SelectItem value="2">Cửa ra 2</SelectItem>
                  <SelectItem value="3">Cửa ra 3</SelectItem>
                </SelectContent>
              </Select>
              {/* <Badge variant="outline" className="text-blue-600 border-blue-200">
                Gate {currentGate}
              </Badge> */}
            </div>

            {/* Login or User info */}
            <div className="flex items-center gap-4 border-l pl-4">
              {!isAuthenticated ? (
              <Dialog open={isLoginModalOpen} onOpenChange={handleModalClose}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    đăng nhập
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Sign In to Outbound System
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Tên đăng nhập</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Nhập tên đăng nhập của bạn"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleModalClose(false)}
                      >
                        Hủy
                      </Button>
                      <Button 
                        onClick={handleLogin}
                        disabled={loading || !loginForm.username || !loginForm.password}
                        className="min-w-[100px]"
                      >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={(user as any)?.avatar || ""} />
                  <AvatarFallback>
                    {(storedUsername || loginForm.username)?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {storedUsername || (user as any)?.name || loginForm.username || "User"}
                  </span>
                  {/* <Badge variant="secondary" className="text-xs">
                    Authenticated
                  </Badge> */}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Đăng xuất
                </Button>
              </div>
            )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutboundHeader;
