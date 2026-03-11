import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import AppShell from "./components/layout/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import UnifiedDashboardPage from "./pages/UnifiedDashboardPage";
import ITSecurityPage from "./pages/ITSecurityPage";
import OTSecurityPage from "./pages/OTSecurityPage";
import IoTSecurityPage from "./pages/IoTSecurityPage";
import ThreatIntelPage from "./pages/ThreatIntelPage";
import IncidentsPage from "./pages/IncidentsPage";
import IncidentDetailPage from "./pages/IncidentDetailPage";
import AssetsPage from "./pages/AssetsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import UserProfilePage from "./pages/UserProfilePage";
import ITAssetDetailPage from "./pages/ITAssetDetailPage";
import OTDeviceDetailPage from "./pages/OTDeviceDetailPage";
import IoTDeviceDetailPage from "./pages/IoTDeviceDetailPage";

export const router = createBrowserRouter(
  [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UnifiedDashboardPage />,
      },
      {
        path: "dashboard",
        element: <UnifiedDashboardPage />,
      },
      {
        path: "it",
        element: <ITSecurityPage />,
      },
      {
        path: "it/assets/:assetId",
        element: <ITAssetDetailPage />,
      },
      {
        path: "ot",
        element: <OTSecurityPage />,
      },
      {
        path: "ot/devices/:deviceId",
        element: <OTDeviceDetailPage />,
      },
      {
        path: "iot",
        element: <IoTSecurityPage />,
      },
      {
        path: "iot/devices/:deviceId",
        element: <IoTDeviceDetailPage />,
      },
      {
        path: "threat-intel",
        element: <ThreatIntelPage />,
      },
      {
        path: "incidents",
        element: <IncidentsPage />,
      },
      {
        path: "incidents/:incidentId",
        element: <IncidentDetailPage />,
      },
      {
        path: "assets",
        element: <AssetsPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "profile",
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

