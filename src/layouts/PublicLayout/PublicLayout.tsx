import CircularProgess from "@/components/Spinner/CircularProgess";
import { isAuthenticated } from "@/utils/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const ok = isAuthenticated();
    setAuthed(ok);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CircularProgess />
      </div>
    );
  }

  if (authed) {
    return <Navigate to="/feed" replace />;
  }
  return <>
    
    {children}
  </>;
};

export default PublicRoute;