import React from "react";
import NotFoundPage from "src/modules/common/pages/NotFoundPage";
import SettingsPage from "src/modules/common/pages/SettingsPage";
import HandTablePage from "src/modules/poker/pages/HandTablePage/HandTablePage";
import MainPage from "src/modules/poker/pages/MainPage/MainPage";

export type Route = {
  path: string;
  element: React.ReactNode;
};
const routes: Route[] = [
  { element: <MainPage />, path: "/" },
  { element: <HandTablePage />, path: "/table" },
  { element: <SettingsPage />, path: "/settings" },
  { element: <NotFoundPage />, path: "/*" },
];

export default routes;
