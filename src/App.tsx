
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";
import UserEdit from "./pages/team/UserEdit";
import RoleEdit from "./pages/team/RoleEdit";
import GroupEdit from "./pages/team/GroupEdit";
import TemplateEdit from "./pages/TemplateEdit";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/Login";
import MissionsTemplates from "./components/missions/MissionsTemplates";
import ProtectedRoute from "./components/ProtectedRoute";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public route - accessible without authentication */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes - require authentication */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <Navbar>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/layout" element={<WarehouseLayout />} />
                      <Route path="/inbound-outbound" element={<InboundOutbound />} />
                      <Route path="/inbound-outbound/history" element={<OrderHistory />} />
                      <Route path="/missions" element={<Missions />} />
                      <Route path="/missions/templates" element={<MissionsTemplates />} />
                      <Route path="/missions/templates/new" element={<TemplateEdit />} />
                      <Route path="/missions/templates/:id" element={<TemplateEdit />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/team-settings" element={<TeamSettings />} />
                      <Route path="/team-settings/:section" element={<TeamSettings />} />
                      <Route path="/team-settings/users/:id" element={<UserEdit />} />
                      <Route path="/team-settings/roles/:id" element={<RoleEdit />} />
                      <Route path="/team-settings/groups/:id" element={<GroupEdit />} />
                      <Route path="/user-settings" element={<UserSettings />} />
                      <Route path="/system-settings" element={<SystemSettings />} />
                      <Route path="/warehouse-settings" element={<WarehouseSettings />} />
                      <Route path="/warehouse-settings/layout" element={<WarehouseLayoutConfig />} />
                      <Route path="/warehouse-settings/storage" element={<WarehouseStorageConfig />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/help/guides" element={<HelpGuides />} />
                      <Route path="/help/faqs" element={<HelpFAQs />} />
                      <Route path="/operator-interface" element={<OperatorInterface />} />
                      <Route path="/operator-interface/inbound" element={<OperatorInbound />} />
                      <Route path="/operator-interface/outbound" element={<OperatorOutbound />} />
                      <Route path="/operator-interface/order/:orderId" element={<OrderDetails />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Navbar>
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
