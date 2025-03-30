
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import InboundOutbound from "./pages/InboundOutbound";
import WarehouseLayout from "./pages/WarehouseLayout";
import Missions from "./pages/Missions";
import UserSettings from "./pages/UserSettings";
import SystemSettings from "./pages/SystemSettings";
import TeamSettings from "./pages/TeamSettings";
import WarehouseSettings from "./pages/WarehouseSettings";
import OperatorInterface from "./pages/OperatorInterface";
import OperatorInbound from "./pages/OperatorInbound";
import OperatorOutbound from "./pages/OperatorOutbound";
import OrderHistory from "./pages/OrderHistory";
import Help from "./pages/Help";
import HelpGuides from "./pages/HelpGuides";
import HelpFAQs from "./pages/HelpFAQs";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          
          {/* Operator Interface routes */}
          <Route path="/operator-interface" element={<Layout><OperatorInterface /></Layout>} />
          <Route path="/operator-interface/inbound" element={<Layout><OperatorInbound /></Layout>} />
          <Route path="/operator-interface/outbound" element={<Layout><OperatorOutbound /></Layout>} />
          
          {/* Inbound/Outbound routes */}
          <Route path="/inbound-outbound" element={<Layout><InboundOutbound /></Layout>} />
          <Route path="/inbound-outbound/history" element={<Layout><OrderHistory /></Layout>} />
          
          <Route path="/layout" element={<Layout><WarehouseLayout /></Layout>} />
          
          {/* Missions routes */}
          <Route path="/missions" element={<Layout><Missions /></Layout>} />
          <Route path="/missions/templates" element={<Layout><Missions /></Layout>} />
          <Route path="/missions/templates/:id" element={<Layout><Missions /></Layout>} />
          
          {/* Settings routes */}
          <Route path="/user-settings" element={<Layout><UserSettings /></Layout>} />
          <Route path="/system-settings" element={<Layout><SystemSettings /></Layout>} />
          <Route path="/warehouse-settings" element={<Layout><WarehouseSettings /></Layout>} />
          <Route path="/team-settings" element={<Layout><TeamSettings /></Layout>} />
          <Route path="/team-settings/:section" element={<Layout><TeamSettings /></Layout>} />
          
          {/* Support routes */}
          <Route path="/help" element={<Layout><Help /></Layout>} />
          <Route path="/help/guides/:guideId" element={<Layout><HelpGuides /></Layout>} />
          <Route path="/help/faqs" element={<Layout><HelpFAQs /></Layout>} />
          <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
