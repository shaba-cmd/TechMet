import { useEffect, useState } from "react";
import App from "./App.tsx";
import { Admin } from "./components/Admin/Admin.tsx";

const isAdmin = () => window.location.hash.startsWith("#/admin");

export function Root() {
  const [admin, setAdmin] = useState(isAdmin);

  useEffect(() => {
    const onHash = () => setAdmin(isAdmin());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return admin ? <Admin /> : <App />;
}
