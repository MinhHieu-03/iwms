
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import InboundOutbound from "@/pages/InboundOutbound";
import WarehouseLayout from "@/pages/WarehouseLayout";
import Missions from "@/pages/Missions";
import TemplateEdit from "@/pages/TemplateEdit";
import TeamSettings from "@/pages/TeamSettings";
import UserEdit from "@/pages/team/UserEdit";
import RoleEdit from "@/pages/team/RoleEdit";
import GroupEdit from "@/pages/team/GroupEdit";
import UserSettings from "@/pages/UserSettings";
import Settings from "@/pages/Settings";
import SystemSettings from "@/pages/SystemSettings";
import WarehouseSettings from "@/pages/WarehouseSettings";
import WarehouseLayoutConfig from "@/pages/WarehouseLayoutConfig";
import WarehouseStorageConfig from "@/pages/WarehouseStorageConfig";
import OperatorInterface from "@/pages/OperatorInterface";
import OperatorInbound from "@/pages/OperatorInbound";
import OperatorOutbound from "@/pages/OperatorOutbound";
import Notifications from "@/pages/Notifications";
import Help from "@/pages/Help";
import HelpGuides from "@/pages/HelpGuides";
import HelpFAQs from "@/pages/HelpFAQs";
import OrderHistory from "@/pages/OrderHistory";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inbound-outbound" element={<InboundOutbound />} />
              <Route path="/layout" element={<WarehouseLayout />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/missions/template/:id" element={<TemplateEdit />} />
              <Route path="/team-settings" element={<TeamSettings />} />
              <Route path="/team-settings/users/:id" element={<UserEdit />} />
              <Route path="/team-settings/roles/:id" element={<RoleEdit />} />
              <Route path="/team-settings/groups/:id" element={<GroupEdit />} />
              <Route path="/user-settings" element={<UserSettings />} />
              <Route path="/system-settings" element={<SystemSettings />} />
              <Route path="/warehouse-settings" element={<WarehouseSettings />} />
              <Route path="/warehouse-settings/layout" element={<WarehouseLayoutConfig />} />
              <Route path="/warehouse-settings/storage" element={<WarehouseStorageConfig />} />
              <Route path="/operator-interface" element={<OperatorInterface />} />
              <Route path="/operator-interface/inbound" element={<OperatorInbound />} />
              <Route path="/operator-interface/outbound" element={<OperatorOutbound />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/help" element={<Help />} />
              <Route path="/help/guides" element={<HelpGuides />} />
              <Route path="/help/faqs" element={<HelpFAQs />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
