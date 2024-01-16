import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";

export const App = () => {
  const router = useNavigate();

  useEffect(() => {
    if (router) {
      router("/homepage");
    }
  }, [router]);
  return <> </>;
};
