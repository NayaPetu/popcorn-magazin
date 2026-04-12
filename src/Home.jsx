import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/popcorn_header.png";
import vkLogo from "./assets/vk_logo.png";
import ytLogo from "./assets/yt_logo.png";
import whoWeGuy from "./assets/who_we_guy.png";
import coolGuy from "./assets/cool_guy.png";   // ← добавили

function Eye({ mousePos }) {
  const eyeRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (eyeRef.current) {
      const rect = eyeRef.current.getBoundingClientRect();
      const dx = mousePos.x - (rect.left + rect.width / 2);
      const dy = mousePos.y - (rect.top + rect.height / 2);
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 8, 28);
      setOffset({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    }
  }, [mousePos]);

  return (
    <div ref={eyeRef} className="eye w-[140px] h-[140px] bg-white rounded-full flex items-center justify-center border-[14px] border-[#381a08] shadow-[inset_0_10px_20px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.15)]">
      <div className="pupil w-[68px] h-[68px] bg-[#381a08] rounded-full" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} />
    </div>
  );
}

export default function Home() {
  const [mousePos, setPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-[#381a08] font-sans">
      {/* HEADER */}
      <header className="sticky top-0 bg-white border-b border-black/10 px-8 lg:px-16 py-6 flex justify-between items-center z-50">
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 cursor-pointer">
          <img src={logo} alt="Попкорн" className="w-14 h-14 object-contain" />
          <h1 className="font-black text-3xl uppercase tracking-tighter">ПОПКОРН</h1>
        </div>
        <nav className="flex gap-10 font-black text-sm uppercase tracking-[2px]">
          <button onClick={() => scrollTo("physics-det")} className="hover:text-[#F26522]">ФИЗИКА ВОКРУГ</button>
          <button onClick={() => scrollTo("light-det")} className="hover:text-[#F26522]">ОТКРОЙ СВЕТ</button>
        </nav>
      </header>

      {/* HERO */}
      <section className="bg-[#FFC542] px-8 lg:px-20 py-20 lg:py-28 flex flex-col lg:flex-row justify-between items-center gap-12 w-full">
        <div className="max-w-2xl">
          <h1 className="text-[100px] leading-[0.85] font-black text-white mb-8 italic uppercase tracking-tighter">
            ПРИВЕТ!<br />ЭТО <span className="text-[#F26522]">ПОПКОРН)</span>
          </h1>
          <p className="text-3xl font-bold leading-tight">
            <span className="text-white">Здесь просто и весело о сложном</span><br />
            <span className="text-[#F26522]">Нескучный научно популярный<br />журнал нового формата</span>
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="flex gap-8">
            <Eye mousePos={mousePos} />
            <Eye mousePos={mousePos} />
          </div>
          <div className="mt-[-25px] w-[320px] h-[140px] bg-[#381a08] rounded-b-[160px] relative shadow-[0_20px_30px_rgba(0,0,0,0.3)]">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[220px] h-[80px] bg-[#FF6B35] rounded-b-[110px] overflow-hidden" />
          </div>
        </div>
      </section>

      {/* КТО МЫ? */}
      <section className="px-8 lg:px-16 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] items-center gap-12">
          <div className="relative flex justify-center items-center h-full">
            <div className="relative">
              <img 
                src={whoWeGuy} 
                alt="Кто мы" 
                className="w-80 h-auto object-contain" 
              />
              <div className="absolute -top-4 -right-12 bg-[#F8EFD2] text-[#381a08] font-bold text-2xl px-6 py-2 rounded-3xl shadow-lg whitespace-nowrap">
                КТО МЫ?
                <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[#F8EFD2] -rotate-[15deg]" />
              </div>
            </div>
          </div>

          <div className="border-2 border-[#381a08] rounded-[40px] p-8 lg:p-12">
            <p className="text-2xl font-bold leading-relaxed text-[#381a08]">
              Мы научно популярный журнал.<br />
              Нас завораживает окружающий мир, и мы хотим поделиться своим энтузиазмом через свою работу.<br />
              Мы хотим показать, что мир, в котором мы живём работает, потому что существует наука.<br />
              Наша миссия пробудить любопытство и интерес к миру.
            </p>
          </div>
        </div>
      </section>

      {/* ЧТО ПОСМОТРЕТЬ? — cool_guy.png точно как на картинке */}
      <section className="bg-[#381a08] px-8 lg:px-20 py-24 text-white">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Bubble + персонаж */}
          <div className="flex justify-between items-center mb-16 relative">
            <div className="bg-white text-[#381a08] font-black text-xl px-10 py-3 rounded-[9999px] inline-flex items-center gap-3 shadow-lg">
              ЧТО ПОСМОТРЕТЬ?
            </div>

            {/* cool_guy.png — позиционирован точно как на картинке (сверху справа) */}
            <img 
              src={coolGuy} 
              alt="Cool guy" 
              className="absolute right-0 top-[-65px] w-36 lg:w-44 h-auto z-10"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Карточка Физика вокруг */}
            <div className="bg-white text-[#381a08] p-12 rounded-[48px]">
              <h3 className="text-4xl font-black mb-3 text-[#F26522] uppercase tracking-tighter">Физика вокруг</h3>
              <p className="font-bold text-xl mb-4">Физика из учебника — в жизни</p>
              <p className="text-gray-600 leading-snug text-lg mb-12">
                Мы превращаем школьную физику в увлекательное приключение. Помогаем учителям разнообразить уроки, а ученикам закрепить, полученные знания на примерах из жизни.
              </p>
              <button 
                onClick={() => scrollTo("physics-det")}
                className="w-full bg-[#F26522] text-white py-6 rounded-3xl font-black uppercase text-xl transition-colors duration-300 hover:bg-[#FFC542] hover:text-[#381a08]"
              >
                Скорее смотреть
              </button>
            </div>

            {/* Карточка Открой свет */}
            <div className="bg-white text-[#381a08] p-12 rounded-[48px]">
              <h3 className="text-4xl font-black mb-3 text-[#F26522] uppercase tracking-tighter">Открой свет</h3>
              <p className="font-bold text-xl mb-4">Свет и оптика по-новому</p>
              <p className="text-gray-600 leading-snug text-lg mb-12">
                Это научно-популярные видео, где мы говорим о свете легко и интересно. Без сложных формул, зато с крутыми примерами из жизни.
              </p>
              <button 
                onClick={() => scrollTo("light-det")}
                className="w-full bg-[#F26522] text-white py-6 rounded-3xl font-black uppercase text-xl transition-colors duration-300 hover:bg-[#FFC542] hover:text-[#381a08]"
              >
                Скорее смотреть
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ФИЗИКА ВОКРУГ */}
      <section id="physics-det" className="px-8 lg:px-16 py-24 max-w-7xl mx-auto">
        <h2 className="text-8xl font-black text-[#F26522] mb-12 uppercase tracking-tighter">Физика вокруг</h2>
        <div className="bg-white border-2 border-[#381a08] p-14 rounded-[60px]">
          <h3 className="text-4xl font-black text-[#FFC542] mb-4 uppercase">Почему взрывается попкорн?</h3>
          <p className="text-2xl font-bold mb-6">Разберемся в этом с точки зрения молекулярно кинетической теории</p>
          <p className="text-gray-500 mb-12 text-xl leading-relaxed max-w-4xl">
            Ролик предназначен для просмотра после изучения Главы 1 «Тепловые явления» учебника «Физика : 8-й класс. Базовый уровень» авторов И. М. Перышкин, А. И. Иванов.
          </p>
          <button onClick={() => navigate("/physics")} className="bg-[#F26522] text-white px-16 py-7 rounded-3xl font-black uppercase text-2xl transition-colors duration-300 hover:bg-[#FFC542] hover:text-[#381a08]">
            Скорее смотреть
          </button>
        </div>
      </section>

      {/* ОТКРОЙ СВЕТ */}
      <section id="light-det" className="px-8 lg:px-16 py-24 max-w-7xl mx-auto">
        <h2 className="text-8xl font-black text-[#F26522] mb-12 uppercase tracking-tighter">Открой свет</h2>
        <div className="bg-white border-2 border-[#381a08] p-14 rounded-[60px]">
          <h3 className="text-4xl font-black text-[#FFC542] mb-4 uppercase">Как сделать свет</h3>
          <p className="text-2xl font-bold mb-6">Пошаговая инструкция по созданию солнечного света</p>
          <p className="text-gray-500 mb-12 text-xl leading-relaxed max-w-4xl">
            От термоядерного синтеза в ядре Солнца до голубого неба над головой. Узнай, какой длинный путь проходит каждый фотон, который освещает твою комнату.
          </p>
          <button onClick={() => navigate("/light")} className="bg-[#F26522] text-white px-16 py-7 rounded-3xl font-black uppercase text-2xl transition-colors duration-300 hover:bg-[#FFC542] hover:text-[#381a08]">
            Скорее смотреть
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#381a08] text-white px-8 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-end gap-12">
          <div>
            <div className="flex items-center gap-3 mb-8"> 
                <img src={logo} alt="Попкорн" className="w-14 h-14 object-contain" />
                 <h2 className="font-black text-[#FFC542] text-4xl uppercase tracking-tighter">ПОПКОРН</h2>
            </div>
            <p className="font-bold text-2xl mb-1">Давай общаться!</p>
            <p className="opacity-70 text-xl underline">popcorn@magazin.com</p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={vkLogo} alt="ВКонтакте" className="w-12 h-12" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={ytLogo} alt="YouTube" className="w-12 h-12" />
            </a>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="fixed bottom-12 right-12 bg-[#381a08] text-[#FFC542] w-16 h-16 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl border-2 border-white/10 z-50"
          >
            ↑
          </button>
        </div>
      </footer>
    </div>
  );
}