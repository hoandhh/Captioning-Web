import { useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
const PermissionProvider = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default PermissionProvider;
