import "../App.css";
import AppRouter from "./AppRouter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchMe } from "../shared/hooks/useAuth";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";
import SeoManager from "../shared/components/SeoManager";

function App() {
  const { data: user } = useFetchMe();

  const setUser = useAuthStore((s) => s.setUser);
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);
  return (
    <>
      <SeoManager />
      <AppRouter />
    </>
  );
}

export default App;
