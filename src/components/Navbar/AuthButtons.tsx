import AuthContext from "@/context/AuthContext";
import { LogIn, LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthButtons = ({ authenticated }: { authenticated: boolean | null }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  if (authenticated === null) {
    return <div className="h-10 w-24" aria-hidden="true" />;
  }

  if (authenticated) {
    return (
      <button
        onClick={async () => {
          await logout();
          navigate("/login", { replace: true });
        }}
        className="flex items-center gap-2 bg-primary-dark text-white border-2 border-white px-4 py-2 rounded-lg cursor-pointer"
      >
        <LogOut /> Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/login", { replace: true })}
      className="flex items-center gap-2 text-white bg-primary-light border-2 border-white px-4 py-2 rounded-lg cursor-pointer"
    >
      <LogIn /> Login
    </button>
  );
};

export default AuthButtons;
