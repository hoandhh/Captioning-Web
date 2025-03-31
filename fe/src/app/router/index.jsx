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
      <Suspense>
        <LayoutAdmin />
      </Suspense>
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
    path: "caption-image",
    element: (
      <Suspense>
        <LayoutClient />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense>
            <CaptionImage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "",
    element: (
      <Suspense>
        <LayoutClient />
      </Suspense>
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
