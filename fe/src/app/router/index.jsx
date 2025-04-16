import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Login = lazy(() => import("../../views/auth/login/index"));
const LayoutAdmin = lazy(() => import("../../app/layout/admin/index"));
const LayoutClient = lazy(() => import("../../app/layout/user/index"));
const DashboardAdmin = lazy(() =>
  import("../../views/main/admin/dashboard/index")
);
const ManageAccountsAdmin = lazy(() =>
  import("../../views/main/admin/manage-accounts/index")
);
const CaptionImage = lazy(() =>
  import("../../views/main/client/CaptionImage/index")
);
import PermissionProvider from "../../components/providers/PermissionProvider";
import { ConfigProvider } from "antd";
import themeConfig from "../../config/themeConfig";
import viVN from "antd/locale/vi_VN";
import About from "../../views/main/client/About";
const Home = lazy(() => import("../../views/main/client/home/index"));
const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <PermissionProvider>
        <Suspense>
          <LayoutAdmin />
        </Suspense>
      </PermissionProvider>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense>
            <DashboardAdmin />
          </Suspense>
        ),
      },
      {
        path: "manage-accounts",
        element: (
          <Suspense>
            <ManageAccountsAdmin />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <ConfigProvider theme={themeConfig} locale={viVN}>
        <Suspense>
          <LayoutClient />
        </Suspense>
      </ConfigProvider>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "caption-image",
        element: (
          <Suspense>
            <CaptionImage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);

const Router = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
