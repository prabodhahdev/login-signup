// src/components/LogoutButton.jsx
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem("role"); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{ padding: "8px 16px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
