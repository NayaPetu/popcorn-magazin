import { useNavigate } from "react-router-dom";

export default function PhysicsVideo() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-main)] min-h-screen">
      <header className="p-6 flex justify-between">
        <h1 onClick={() => navigate("/")} className="cursor-pointer font-black">
          Попкорн
        </h1>
      </header>

      <div className="p-12">
        <h1 className="text-5xl text-[var(--accent)] font-black">
          Почему взрывается попкорн?
        </h1>
      </div>
    </div>
  );
}