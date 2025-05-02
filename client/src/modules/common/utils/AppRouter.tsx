import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes, { Route as RouteType } from "src/routes";

interface AppRouterProps {
  children: React.ReactNode;
}

function getRouteElement(route: RouteType): React.ReactNode {
  return route.element;
}

const AppRouter: React.FC<AppRouterProps> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={getRouteElement(route)}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
