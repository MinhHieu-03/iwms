
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Dashboard from "@/pages/Dashboard";
import InboundOutbound from "@/pages/InboundOutbound";
import WarehouseLayout from "@/pages/WarehouseLayout";
import Missions from "@/pages/Missions";
import TeamSettings from "@/pages/TeamSettings";
import UserSettings from "@/pages/UserSettings";
import SystemSettings from "@/pages/SystemSettings";
import Notifications from "@/pages/Notifications";
import Help from "@/pages/Help";
import OperatorInterface from "@/pages/OperatorInterface";
import WarehouseSettings from "@/pages/WarehouseSettings";
import WarehouseStorageConfig from "@/pages/WarehouseStorageConfig";
import LayoutConfig from "@/components/warehouse-settings/LayoutConfig";
import StorageModelConfig from "@/components/warehouse-settings/StorageModelConfig";
import UsersTab from "@/components/team/UsersTab";
import RolesTab from "@/components/team/RolesTab";
import GroupsTab from "@/components/team/GroupsTab";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/operator-interface" element={<OperatorInterface />} />
            <Route path="/inbound-outbound" element={<InboundOutbound />} />
            <Route path="/layout" element={<WarehouseLayout />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/team-settings" element={<TeamSettings />} />
              <Route path="/team-settings/:section" element={<TeamSettings />} />
              <Route path="/team-settings/users" element={<UsersTab />} />
              <Route path="/team-settings/roles" element={<RolesTab />} />
              <Route path="/team-settings/groups" element={<GroupsTab />} />
            <Route path="/user-settings" element={<UserSettings />} />
            <Route path="/system-settings" element={<SystemSettings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<Help />} />
            <Route path="/warehouse-settings" element={<WarehouseSettings />} />
              <Route path="/warehouse-settings/layout" element={<LayoutConfig />} />
              <Route path="/warehouse-settings/storage" element={<StorageModelConfig />} />
            <Route path="/warehouse-storage-config" element={<WarehouseStorageConfig />} />
          </Routes>
          <Toaster />
        </Navbar>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
