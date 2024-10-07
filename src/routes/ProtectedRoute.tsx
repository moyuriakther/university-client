import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const token = useAppSelector((state) => state?.auth?.token);  
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
