import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
import vkLogo from "./assets/vk.svg";
import ytLogo from "./assets/yt.svg";
import whoWeGuy from "./assets/pop1.svg";
import coolGuy from "./assets/pop2.svg";
import mouth from "./assets/mouth_all.svg";
import who from "./assets/who_we.svg";
import what from "./assets/what_watch.svg";
import logofutter from "./assets/logo_futter.svg";

function Eye({ mousePos }) {
  const eyeRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!eyeRef.current) return;
    const rect = eyeRef.current.getBoundingClientRect();
    const dx = mousePos.x - (rect.left + rect.width / 2);
    const dy = mousePos.y - (rect.top + rect.height / 2);
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.hypot(dx, dy) / 10, 70);
    setOffset({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
  }, [mousePos]);

  return (
    <div
      ref={eyeRef}
      style={{ width: 220, height: 220 }}
      className="bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner"
    >
      <div
        style={{
          width: 100,
          height: 100,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 60ms linear",
        }}
        className="bg-[#3E1D08] rounded-full"
      />
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
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FCFDED] text-[#3E1D08]">

      {/* ── ШАПКА ── */}
      <header className="sticky top-0 z-50 bg-[#FCFDED] border-b border-[#3E1D08]/10 px-6 lg:px-14 py-4 flex justify-between items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 hover:scale-110 transition-transform"
          // className="hover:text-[#F06520] transition-colors"
        >
          <img src={logo} alt="Попкорн" className="w-9 h-9 object-contain" />
          <span className="font-heading text-xl tracking-tight text-[#3E1D08] uppercase ">ПОПКОРН</span>
        </button>
        <nav className="flex gap-8 font-heading text-lg font-bold uppercase tracking-normal text-[#3E1D08]">
          <button onClick={() => scrollTo("physics-det")} className="hover:text-[#F06520] transition-colors">
            физика вокруг
          </button>
          <button onClick={() => scrollTo("light-det")} className="hover:text-[#F06520] transition-colors">
            открой свет
          </button>
        </nav>
      </header>

      {/* ── ГЕРОЙ ── */}
      <section className="bg-[#FFC044] px-6 lg:px-14 pt-14 pb-0 flex justify-between items-start overflow-hidden min-h-[520px]">
        {/* Текст */}
        <div className="pt-2 pb-14 max-w-[520px]">
          <h1 className="font-brand text-[86px] lg:text-[104px] leading-[0.88] uppercase text-[#FCFDED] mb-7">
            ПРИВЕТ!<br />
            <span className="text-[#F06520]"> ЭТО<br /> ПОПКОРН) </span>
          </h1>
          <p className="font-sans font-sm text-xl text-[#FCFDED] leading-snug">
            Здесь просто и весело о сложном
          </p>
          <p className="font-sans font-sm text-xl text-[#F06520] leading-snug">
            Нескучный научно популярный журнал <br />нового формата
          </p>
        </div>

        {/* Маскот-лицо */}
        <div className="relative flex-shrink-0 self-end" style={{ width: 460, height: 380 }}>
          {/* Глаза */}
          <div
            className="flex -space-x-6 absolute"
            style={{ top: -160, right: -20, transform: "rotate(-18deg)" }}
          >
            <Eye mousePos={mousePos} />
            <Eye mousePos={mousePos} />
          </div>
          {/* Рот */}
          <img
            src={mouth}
            alt=""
            className="absolute"
            style={{ bottom: 30, left:110, width: 560 }}
          />
        </div>
      </section>

      {/* ── КТО МЫ ── */}
      <section className="px-6 lg:px-14 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] items-center gap-12">
          {/* Маскот + пузырь */}
          <div className="relative flex justify-center">
            <div className="relative">
              <img src={whoWeGuy} alt="Персонаж Попкорн" className="w-64 h-auto object-contain" />
              <div className="absolute -top-[-20px] right-[-110px] inline-flex items-center justify-center">
                <img src={who} alt="" className="w-32 h-auto" />
                <span className="absolute -translate-y-2 font-brand font-bold text-lg text-[#3E1D08]">КТО МЫ?</span>
              </div>
            </div>
          </div>

          {/* Текстовый блок */}
          <div className="border-2 border-[#3E1D08] rounded-[28px] p-8 lg:p-10">
            <p className="text-base lg:text-lg leading-relaxed text-[#3E1D08]">
              «Попкорн» — это журнал для неугомонных умов.
              Каждый интересный научный факт, подобно зерну кукурузы, под действием правильно
              подобранного «нагрева» внезапно взрывается в голове читателя, превращая сухую
              информацию в яркое, воздушное и запоминающееся озарение.
            </p>
          </div>
        </div>
      </section>

      {/* ── ЧТО ПОСМОТРЕТЬ ── */}
      <section className="bg-[#3E1D08] px-6 lg:px-14 py-20">
        <div className="max-w-6xl mx-auto relative">
          {/* Заголовок-пузырь + маскот */}
          <div className="flex justify-end items-center mb-10 pr-44 lg:pr-52">
            <div className="relative inline-flex items-center justify-center">
              <img src={what} alt="" className="w-52 h-auto" />
              <span className="absolute -translate-y-2 font-brand font-bold text-base text-[#3E1D08]">ЧТО ПОСМОТРЕТЬ?</span>
            </div>
          </div>
          <img
            src={coolGuy}
            alt=""
            className="absolute right-0 -top-8 w-38 lg:w-44 h-auto z-10"
          />

          {/* Карточки */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Физика вокруг */}
            <div className="bg-[#FCFDED] text-[#3E1D08] p-8 lg:p-10 rounded-[28px] flex flex-col">
              <h3 className="font-heading font-bold text-2xl text-[#F06520] mb-1">Физика вокруг</h3>
              <p className="font-heading font-bold text-sm mb-4">Физика из учебника — в жизни</p>
              <p className="text-sm leading-relaxed text-[#3E1D08]/75 mb-8 flex-1">
                Мы превращаем школьную физику в увлекательное приключение.
                Помогаем учителям разнообразить уроки, а ученикам закрепить,
                полученные знания на примерах из жизни.
              </p>
              <button
                onClick={() => scrollTo("physics-det")}
                className="w-full bg-[#F06520] text-white py-4 rounded-full font-sans font-bold  tracking-wide hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors"
              >
                Скорее смотреть
              </button>
            </div>

            {/* Открой свет */}
            <div className="bg-[#FCFDED] text-[#3E1D08] p-8 lg:p-10 rounded-[28px] flex flex-col">
              <h3 className="font-heading font-bold text-2xl text-[#F06520] mb-1">Открой свет</h3>
              <p className="font-heading font-bold text-sm mb-4">Свет и оптика по-новому</p>
              <p className="text-sm leading-relaxed text-[#3E1D08]/75 mb-8 flex-1">
                Это научно-популярные видео, где мы говорим о свете легко и интересно.
                Без сложных формул, зато с крутыми примерами из жизни.
              </p>
              <button
                onClick={() => scrollTo("light-det")}
                className="w-full bg-[#F06520] text-white py-4 rounded-full font-sans font-bold  tracking-wide hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors"
              >
                Скорее смотреть
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ФИЗИКА ВОКРУГ — видео ── */}
      <section id="physics-det" className="px-6 lg:px-14 pt-16 pb-4 max-w-6xl mx-auto">
        <h2 className="font-heading text-[72px] lg:text-[88px] leading-none text-[#F06520] mb-8">
          Физика вокруг
        </h2>
        <div className="border-2 border-[#3E1D08] rounded-[28px] p-8 lg:p-10">
          <h3 className="font-heading font-bold text-xl text-[#FFC044] mb-2">
            Почему взрывается попкорн?
          </h3>
          <p className="font-heading font-bold text-sm mb-5">
            Разберемся в этом с точки зрения молекулярно кинетической теории
          </p>
          <p className="text-sm leading-relaxed text-[#3E1D08]/65 mb-8 max-w-2xl">
            Ролик предназначен для просмотра после изучения Главы&nbsp;1 «Тепловые явления»
            учебника «Физика&nbsp;: 8-й класс. Базовый уровень» авторов И.&nbsp;М.&nbsp;Перышкин,
            А.&nbsp;И.&nbsp;Иванов.
          </p>
          <button
            onClick={() => navigate("/physics")}
            className="bg-[#F06520] text-white px-10 py-4 rounded-full font-sans font-bold  tracking-wide hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors"
          >
            Скорее смотреть
          </button>
        </div>
      </section>

      {/* ── ОТКРОЙ СВЕТ — видео ── */}
      <section id="light-det" className="px-6 lg:px-14 pt-16 pb-20 max-w-6xl mx-auto">
        <h2 className="font-heading text-[72px] lg:text-[88px] leading-none text-[#F06520] mb-8">
          Открой свет
        </h2>
        <div className="border-2 border-[#3E1D08] rounded-[28px] p-8 lg:p-10">
          <h3 className="font-heading font-bold text-xl text-[#FFC044] mb-2">
            Как сделать свет
          </h3>
          <p className="font-heading font-bold text-sm mb-5">
            Пошаговая инструкция по созданию солнечного света
          </p>
          <p className="text-sm leading-relaxed text-[#3E1D08]/65 mb-8 max-w-2xl">
            От термоядерного синтеза в ядре Солнца до голубого неба над головой.
            Узнай, какой длинный путь проходит каждый фотон, который освещает твою комнату.
          </p>
          <button
            onClick={() => navigate("/light")}
            className="bg-[#F06520] text-white px-10 py-4 rounded-full font-sans font-bold  tracking-wide hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors"
          >
            Скорее смотреть
          </button>
        </div>
      </section>

      {/* ── ФУТЕР ── */}
      <footer className="bg-[#3E1D08] text-white px-6 lg:px-14 py-12">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          {/* Левая часть */}
          <div>
            <img src={logofutter} alt="Попкорн" className="mb-6 w-50 h-auto" />
            <p className="font-sans font-bold text-lg -mb-2 text-[#F5E0AE]">Давай общаться!</p>
            <a
              href="mailto:popcorn@magazin.com"
              className="text-sm text-[#F5E0AE] underline hover:text-[#F5E0AE]/80 transition-colors"
            >
              popcorn@magazin.com
            </a>
          </div>

          {/* Правая часть */}
          <div className="flex flex-col items-end gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[#FFC044] hover:text-[#F06520] transition-colors"
            >
              <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 40V10M18 10L6 22M18 10L30 22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-75 transition-opacity">
                <img src={vkLogo} alt="ВКонтакте" className="w-10 h-10" />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity">
                <img src={ytLogo} alt="YouTube" className="w-10 h-10" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
