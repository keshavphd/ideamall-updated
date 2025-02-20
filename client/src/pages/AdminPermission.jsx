import React from "react";
import { useSelector } from "react-redux";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user.role == "ADMIN" ? (
        children
      ) : (
        <div className="p-4 bg-red-400 text-red-950">
          <p>You do not have permission...</p>
        </div>
      )}
    </>
  );
};

export default AdminPermission;
