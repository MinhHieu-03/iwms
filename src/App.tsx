import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";

// Dynamic imports for better code splitting
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const WarehouseLayout = React.lazy(() => import("./pages/WarehouseLayout"));
const InboundOutbound = React.lazy(() => import("./pages/InboundOutbound"));
const Missions = React.lazy(() => import("./pages/Missions"));
const Settings = React.lazy(() => import("./pages/Settings"));
const TeamSettings = React.lazy(() => import("./pages/TeamSettings"));
const UserSettings = React.lazy(() => import("./pages/UserSettings"));
const SystemSettings = React.lazy(() => import("./pages/SystemSettings"));
const WarehouseSettings = React.lazy(() => import("./pages/WarehouseSettings"));
const WarehouseLayoutConfig = React.lazy(() => import("./pages/WarehouseLayoutConfig"));
const WarehouseStorageConfig = React.lazy(() => import("./pages/WarehouseStorageConfig"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const Help = React.lazy(() => import("./pages/Help"));
const HelpGuides = React.lazy(() => import("./pages/HelpGuides"));
const HelpFAQs = React.lazy(() => import("./pages/HelpFAQs"));
const OperatorInterface = React.lazy(() => import("./pages/OperatorInterface"));
const InboundManagement = React.lazy(() => import("@/components/inbound_management"));
const OperatorOutbound = React.lazy(() => import("./pages/OperatorOutbound"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Outbound = React.lazy(() => import("./pages/outbound"));
const OutboundOdd = React.lazy(() => import("./pages/outbound_odd"));
const Ptl = React.lazy(() => import("./pages/ptl"));
const OddPtl = React.lazy(() => import("./pages/odd_ptl"));
const OrderHistory = React.lazy(() => import("./pages/OrderHistory"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const UserEdit = React.lazy(() => import("./pages/team/UserEdit"));
const RoleEdit = React.lazy(() => import("./pages/team/RoleEdit"));
const GroupEdit = React.lazy(() => import("./pages/team/GroupEdit"));
const TemplateEdit = React.lazy(() => import("./pages/TemplateEdit"));
const OrderDetails = React.lazy(() => import("./pages/OrderDetails"));
const Login = React.lazy(() => import("./pages/Login"));
const MissionsTemplates = React.lazy(() => import("./components/missions/MissionsTemplates"));
const MissionTemplate = React.lazy(() => import("./components/mission_setting/mission_template"));
const DeviceTemplate = React.lazy(() => import("./components/device/DeviceTemplate"));
const DeviceList = React.lazy(() => import("./components/device/DeviceList"));
const IssueTimeSchedule = React.lazy(() => import("./pages/issue-time-schedule"));

import { LanguageProvider } from "./contexts/LanguageProvider";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import { createRoute } from "./lib/utils";
import { route as mission_template_route } from "./components/mission_setting/mission_template/const";
import { ConfigProvider } from "antd";

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
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public route - accessible without authentication */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected routes - require authentication */}
                  <Route
                    path="/*"
                    element={
                      <ProtectedRoute>
                        <Navbar>
                          <Suspense fallback={<LoadingSpinner />}>
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
                              <Route path="/inventory" element={<Inventory />} />
                              <Route path="/issue-time-schedule" element={<IssueTimeSchedule />} />
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
                              <Route
                                path={createRoute([
                                  ...mission_template_route,
                                  "new",
                                ])}
                                element={<TemplateEdit />}
                              />
                              <Route
                                path={createRoute(mission_template_route)}
                                element={<MissionTemplate />}
                              />
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
                          </Suspense>
                        </Navbar>
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/oi/outbound" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CustomTheme>
                          <Outbound />
                        </CustomTheme>
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/oi/outbound-odd" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CustomTheme>
                          <OutboundOdd />
                        </CustomTheme>
                      </Suspense>
                    } 
                  />
                  <Route
                    path="/oi/inbound"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CustomTheme>
                          <InboundManagement />
                        </CustomTheme>
                      </Suspense>
                    }
                  />
                  <Route 
                    path="/oi/outbound-ptl" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CustomTheme>
                          <Ptl />
                        </CustomTheme>
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/oi/outbound-odd-ptl" 
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <CustomTheme>
                          <OddPtl />
                        </CustomTheme>
                      </Suspense>
                    } 
                  />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </Router>
        </LanguageProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

const CustomTheme = ({ children }) => (
  <ConfigProvider
    theme={{
      components: {
        Table: {
          fontSize: 24,
          headerBg: "#f5f5f5",
          headerColor: "#262626",
          cellFontSize: 24,
        },
      },
      token: {
        fontSize: 24,
      },
    }}
  >
    {children}
  </ConfigProvider>
);
