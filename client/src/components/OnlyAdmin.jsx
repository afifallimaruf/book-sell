import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function OnlyAdmin() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default OnlyAdmin;
