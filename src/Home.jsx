import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
import vkLogo from "./assets/vk.svg";
import ytLogo from "./assets/yt.svg";
import whoWeGuy from "./assets/pop1.svg";
import coolGuy from "./assets/pop2.svg";
import mouth from "./assets/mouth_all.svg";
import what from "./assets/what_watch.svg";
import who from "./assets/who_we.svg";
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
    <div ref={eyeRef} className="home-eye">
      <div
        className="home-pupil"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
    </div>
  );
}

export default function Home() {
  const [mousePos, setPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
  };

  return (
    <main className="home-page">

      {/* ── ШАПКА ──
      <header className="home-header">
        <button
          className="home-logo-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="На главную"
        >
          <img src={logo} alt="Попкорн" className="home-logo" />
          <span>попкорн</span>
        </button>

        <nav className="home-nav" aria-label="Главная навигация">
          <button onClick={() => scrollTo("physics-det")}>физика вокруг</button>
          <button onClick={() => scrollTo("light-det")}>открой свет</button>
        </nav>
      </header> */}

      {/* ── ШАПКА ── */}
            <header className="sticky top-0 z-50 bg-[#FCFDED] border-b border-[#3E1D08]/10 px-4 sm:px-6 lg:px-14 py-3 sm:py-4 flex justify-between items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 sm:gap-3 hover:scale-110 transition-transform"
                aria-label="На главную"
              >
                <img src={logo} alt="Попкорн" className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
                <span className="font-heading text-base sm:text-xl tracking-tight text-[#3E1D08] uppercase">ПОПКОРН</span>
              </button>
              <nav className="flex gap-3 sm:gap-5 lg:gap-8 font-heading text-xs sm:text-sm lg:text-lg font-bold uppercase tracking-normal text-[#3E1D08]" aria-label="Главная навигация">
                <button onClick={() => scrollTo("physics-det")} className="transition-all duration-300 hover:text-[#F06520] hover:-translate-y-1">
                  физика вокруг
                </button>
                <button onClick={() => scrollTo("light-det")} className="transition-all duration-300 hover:text-[#F06520] hover:-translate-y-1">
                  открой свет
                </button>
              </nav>
            </header>

      {/* ── ГЕРОЙ ── */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-inner">
          <h1 id="home-title" className="home-hero-title">
            <span className="home-hero-white">Привет!</span>
            <span className="home-hero-orange">Это</span>
            <span className="home-hero-orange">попкорн)</span>
          </h1>

          <div className="home-hero-copy">
            <p className="home-hero-white-line">Здесь просто и весело о сложном</p>
            <p className="home-hero-orange-line">Нескучный научно популярный<br />журнал нового формата</p>
          </div>

          {/* Маскот-лицо */}
          <div className="home-hero-face" aria-hidden="true">
            <div className="home-hero-eyes">
              <Eye mousePos={mousePos} />
              <Eye mousePos={mousePos} />
            </div>
            <img src={mouth} alt="" className="home-hero-mouth" />
          </div>
        </div>
      </section>

      {/* ── КТО МЫ ── */}
      <section className="home-about" aria-labelledby="about-title">
        <div className="home-wide home-about-grid">
          <div className="home-about-person" aria-hidden="true">
            <img src={whoWeGuy} alt="" className="home-about-popcorn" />
            <div className="home-about-bubble">
              <img src={who} alt="" />
              <span id="about-title">кто мы?</span>
            </div>
          </div>

          <div className="home-about-text">
            <p>
              «Попкорн» — это журнал для неугомонных умов. Каждый интересный научный факт,
              подобно зерну кукурузы, под действием правильно подобранного «нагрева» внезапно
              взрывается в голове читателя, превращая сухую информацию в яркое, воздушное 
              и запоминающееся озарение.
            </p>
          </div>
        </div>
      </section>

      {/* ── ЧТО ПОСМОТРЕТЬ ── */}
      <section className="home-watch" aria-labelledby="watch-title">
        <div className="home-wide home-watch-inner">
          <div className="home-watch-bubble" aria-hidden="true">
            <img src={what} alt="" />
            <span id="watch-title">что посмотреть?</span>
          </div>
          <img src={coolGuy} alt="" className="home-watch-popcorn" aria-hidden="true" />

          <div className="home-watch-cards">
            <article className="home-watch-card">
              <h3>Физика вокруг</h3>
              <p className="home-card-lead">Физика из учебника — в жизни</p>
              <p className="home-card-text">
                Мы превращаем школьную физику в увлекательное приключение. Помогаем учителям
                разнообразить уроки, а ученикам закрепить, полученные знания на примерах из жизни.
              </p>
              <button className="home-orange-button" onClick={() => scrollTo("physics-det")}>Скорее смотреть</button>
            </article>

            <article className="home-watch-card">
              <h3>Открой свет</h3>
              <p className="home-card-lead">Свет и оптика по-новому</p>
              <p className="home-card-text">
                Это научно-популярные видео, где мы говорим о свете легко и интересно. Без сложных
                формул, зато с крутыми примерами из жизни.
              </p>
              <button className="home-orange-button" onClick={() => scrollTo("light-det")}>Скорее смотреть</button>
            </article>
          </div>
        </div>
      </section>

      {/* ── ФИЗИКА ВОКРУГ — видео ── */}
      <section id="physics-det" className="home-detail home-detail-physics" aria-labelledby="physics-title">
        <div className="home-wide">
          <h2 id="physics-title">Физика вокруг</h2>
          <article className="home-detail-card">
            <h3>Почему взрывается попкорн?</h3>
            <p className="home-card-lead">Разберемся в этом с точки зрения молекулярно кинетической теории</p>
            <p className="home-detail-text">
              Ролик предназначен для просмотра после изучения Главы 1 “Тепловые явления”<br />
              учебника “Физика : 8-й класс. Базовый уровень” авторов И. М. Перышкин, А. И. Иванов.
            </p>
            <button className="home-orange-button home-detail-button" onClick={() => navigate("/physics")}>Скорее смотреть</button>
          </article>
        </div>
      </section>

      {/* ── ОТКРОЙ СВЕТ — видео ── */}
      <section id="light-det" className="home-detail home-detail-light" aria-labelledby="light-title">
        <div className="home-wide">
          <h2 id="light-title">Открой свет</h2>
          <article className="home-detail-card">
            <h3>Как сделать свет</h3>
            <p className="home-card-lead">Пошаговая инструкция по созданию солнечного света</p>
            <p className="home-detail-text">
              От термоядерного синтеза в ядре Солнца до голубого неба над головой.<br />
              Узнай, какой длинный путь проходит каждый фотон, который освещает твою комнату.
            </p>
            <button className="home-orange-button home-detail-button" onClick={() => navigate("/light")}>Скорее смотреть</button>
          </article>
        </div>
      </section>

      {/* ── ФУТЕР ── */}
      <footer className="home-footer">
        <div className="home-wide home-footer-inner">
          <div className="home-footer-left">
            <img src={logofutter} alt="Попкорн — взрыв знаний" className="home-footer-logo" />
            <p>Давай общаться!</p>
            <a href="mailto:popcorn@magazin-p.ru">popcorn@magazin-p.ru</a>
          </div>

          <div className="home-footer-right">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="home-to-top"
              aria-label="Наверх"
            >
              <svg width="53" height="66" viewBox="0 0 53 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.5 58V12M26.5 12L9 29.5M26.5 12L44 29.5" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="home-socials">
              <a href="https://vkvideo.ru/@club238840885" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте"><img src={vkLogo} alt="" /></a>
              <a href="https://www.youtube.com/@popcorn-magazin" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src={ytLogo} alt="" /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
