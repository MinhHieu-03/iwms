import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import WarehouseLayout from "./pages/WarehouseLayout";
import InboundOutbound from "./pages/InboundOutbound";
import Missions from "./pages/Missions";
import Settings from "./pages/Settings";
import TeamSettings from "./pages/TeamSettings";
import UserSettings from "./pages/UserSettings";
import SystemSettings from "./pages/SystemSettings";
import WarehouseSettings from "./pages/WarehouseSettings";
import WarehouseLayoutConfig from "./pages/WarehouseLayoutConfig";
import WarehouseStorageConfig from "./pages/WarehouseStorageConfig";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import HelpGuides from "./pages/HelpGuides";
import HelpFAQs from "./pages/HelpFAQs";
import OperatorInterface from "./pages/OperatorInterface";
import OperatorInbound from "./pages/OperatorInbound";
import OperatorOutbound from "./pages/OperatorOutbound";
import Outbound from "./pages/outbound";
import OutboundOdd from "./pages/outbound_odd";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";
import UserEdit from "./pages/team/UserEdit";
import RoleEdit from "./pages/team/RoleEdit";
import GroupEdit from "./pages/team/GroupEdit";
import TemplateEdit from "./pages/TemplateEdit";
import OrderDetails from "./pages/OrderDetails";
import InboundManagement from "./pages/InboundManagement";
import Login from "./pages/Login";
import MissionsTemplates from "./components/missions/MissionsTemplates";
import MissionTemplate from "./components/missions/MissionTemplate2";
import DeviceTemplate from "./components/device/DeviceTemplate";
import DeviceList from "./components/device/DeviceList";
import ProtectedRoute from "./components/ProtectedRoute";
import { LanguageProvider } from "./contexts/LanguageProvider";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Public route - accessible without authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/oi/outbound" element={<Outbound />} />
                <Route path="/oi/outbound-odd" element={<OutboundOdd />} />
                <Route path="/oi/inbound" element={<InboundManagement />} />
                {/* Protected routes - require authentication */}
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Navbar>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/layout" element={<WarehouseLayout />} />
                          <Route
                            path="/inbound-outbound"
                            element={<InboundOutbound />}
                          />
                          <Route
                            path="/inbound-outbound/history"
                            element={<OrderHistory />}
                          />
                          <Route path="/missions" element={<Missions />} />
                          <Route
                            path="/missions/templates"
                            element={<MissionsTemplates />}
                          />
                          <Route
                            path="/missions/templates/new"
                            element={<TemplateEdit />}
                          />
                          <Route
                            path="/missions/templates/:id"
                            element={<TemplateEdit />}
                          />
                          <Route
                            path="/mission-settings/template"
                            element={<MissionTemplate />}
                          />
                          <Route
                            path="/mission-settings/device"
                            element={<DeviceList />}
                          />
                          <Route
                            path="/mission-settings/device-template"
                            element={<DeviceTemplate />}
                          />
                          <Route path="/settings" element={<Settings />} />
                          <Route
                            path="/team-settings"
                            element={<TeamSettings />}
                          />
                          <Route
                            path="/team-settings/:section"
                            element={<TeamSettings />}
                          />
                          <Route
                            path="/team-settings/users/:id"
                            element={<UserEdit />}
                          />
                          <Route
                            path="/team-settings/roles/:id"
                            element={<RoleEdit />}
                          />
                          <Route
                            path="/team-settings/groups/:id"
                            element={<GroupEdit />}
                          />
                          <Route
                            path="/user-settings"
                            element={<UserSettings />}
                          />
                          <Route
                            path="/system-settings"
                            element={<SystemSettings />}
                          />
                          <Route
                            path="/warehouse-settings"
                            element={<WarehouseSettings />}
                          />
                          <Route
                            path="/warehouse-settings/layout"
                            element={<WarehouseLayoutConfig />}
                          />
                          <Route
                            path="/warehouse-settings/storage"
                            element={<WarehouseStorageConfig />}
                          />
                          <Route
                            path="/notifications"
                            element={<Notifications />}
                          />
                          <Route path="/help" element={<Help />} />
                          <Route path="/help/guides" element={<HelpGuides />} />
                          <Route path="/help/faqs" element={<HelpFAQs />} />
                          <Route
                            path="/operator-interface"
                            element={<OperatorInterface />}
                          />
                          {/* <Route
                          path="/operator-interface/inbound"
                          element={<OperatorInbound />}
                        /> */}
                          <Route
                            path="/operator-interface/outbound"
                            element={<OperatorOutbound />}
                          />
                          <Route
                            path="/operator-interface/order/:orderId"
                            element={<OrderDetails />}
                          />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Navbar>
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </LanguageProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
