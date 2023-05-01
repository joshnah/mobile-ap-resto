import { useEffect } from "react";
import { login } from "../services/dataService";

export default function LoginPage() {
  useEffect(() => {
    // Dispatch login action and set user state after logging in
    login("admin@gmail.com", "admin");
  }, []);

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}