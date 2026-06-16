import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import PhysicsVideo from "./PhysicsVideo";
import LightVideo from "./LightVideo";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/physics" element={<PhysicsVideo />} />
        <Route path="/light" element={<LightVideo />} />
      </Routes>
    </>
  );
}