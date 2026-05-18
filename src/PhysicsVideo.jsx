import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/popcorn_header.png";
import vkLogo from "./assets/vk_logo.png";
import ytLogo from "./assets/yt_logo.png";

function Accordion({ title, bg = "bg-[#FCFDED]", titleColor = "text-[#3E1D08]", children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${bg} border-2 border-[#3E1D08] rounded-[28px] overflow-hidden`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center px-8 py-6 text-left"
      >
        <span className={`font-heading font-bold text-lg ${titleColor}`}>{title}</span>
        <span
          className={`text-2xl font-bold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>
      {open && <div className="px-8 pb-8">{children}</div>}
    </div>
  );
}

export default function PhysicsVideo() {
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-[#FCFDED] text-[#3E1D08]">

      {/* ── ШАПКА ── */}
      <header className="sticky top-0 z-50 bg-[#FCFDED] border-b border-[#3E1D08]/10 px-6 lg:px-14 py-4 flex justify-between items-center">
        <button onClick={() => navigate("/")} className="flex items-center gap-3">
          <img src={logo} alt="Попкорн" className="w-9 h-9 object-contain" />
          <span className="font-brand text-xl tracking-tight text-[#3E1D08] uppercase">ПОПКОРН</span>
        </button>
        <nav className="flex gap-8 font-heading text-sm font-bold uppercase tracking-widest text-[#3E1D08]">
          <button
            onClick={() => { navigate("/"); setTimeout(() => { const el = document.getElementById("physics-det"); if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" }); }, 100); }}
            className="hover:text-[#F06520] transition-colors"
          >
            физика вокруг
          </button>
          <button
            onClick={() => { navigate("/"); setTimeout(() => { const el = document.getElementById("light-det"); if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" }); }, 100); }}
            className="hover:text-[#F06520] transition-colors"
          >
            открой свет
          </button>
        </nav>
      </header>

      {/* ── ГЕРОЙ ── */}
      <section className="bg-[#FFC044] px-6 lg:px-14 pt-14 pb-14 flex flex-col items-center text-center gap-10">
        <h1 className="font-brand text-[72px] lg:text-[96px] leading-[0.9] uppercase text-[#FCFDED]">
          ПОЧЕМУ<br />ВЗРЫВАЕТСЯ<br />ПОПКОРН
        </h1>
        {/* Кнопка-плей */}
        <button className="w-20 h-20 rounded-full bg-[#F06520] flex items-center justify-center shadow-lg hover:bg-[#3E1D08] transition-colors">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <polygon points="8,4 26,15 8,26" fill="#FCFDED" />
          </svg>
        </button>
      </section>

      {/* ── КОНТЕНТ ── */}
      <article className="px-6 lg:px-14 py-16 max-w-4xl mx-auto flex flex-col gap-12">

        {/* Заголовок статьи */}
        <div>
          <h2 className="font-brand text-[52px] lg:text-[68px] leading-none text-[#3E1D08] mb-4">
            Почему взрывается попкорн?
          </h2>
          <p className="font-heading font-bold text-base text-[#3E1D08]/60 italic">
            Приложение к видео — это конспект физической попкорной теории
          </p>
        </div>

        {/* Раздел 1 */}
        <div>
          <h3 className="font-heading font-bold text-2xl text-[#F06520] mb-5">
            Что говорит молекулярно-кинетическая теория?
          </h3>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-[#3E1D08]/80">
              <p>
                По этой теории, атомы и молекулы вещества находятся в непрерывном хаотическом движении.
                Чем выше температура — тем быстрее они движутся. Между молекулами действуют силы
                притяжения и отталкивания.
              </p>
              <p>
                Когда зерно нагревается, молекулы воды внутри движутся всё быстрее, давление внутри
                зерна растёт. Оболочка зерна удерживает давление до определённого предела.
              </p>
              <p>
                При достижении критического давления оболочка разрывается — происходит взрыв.
                Крахмал моментально расширяется и застывает в виде пышной пены — это и есть попкорн!
              </p>
            </div>
            {/* Схема молекул */}
            <div className="bg-[#F5E0AE] rounded-[20px] p-6 flex flex-col items-center gap-3">
              <p className="font-heading font-bold text-sm text-[#3E1D08] mb-2">Модель движения молекул</p>
              <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
                {[
                  [30,25],[70,15],[120,30],[160,20],[180,55],[150,70],[170,100],
                  [130,110],[90,95],[55,115],[20,90],[10,55],[50,60],[100,55],
                  [140,50],[80,75],[110,80],[40,40],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 9 : 7}
                    fill={i % 4 === 0 ? "#F06520" : "#FFC044"}
                    opacity="0.85"
                  />
                ))}
              </svg>
              <p className="text-xs text-[#3E1D08]/60 text-center">
                Молекулы в хаотичном движении — чем горячее, тем быстрее
              </p>
            </div>
          </div>
        </div>

        {/* Раздел 2 */}
        <div>
          <h3 className="font-heading font-bold text-2xl text-[#F06520] mb-5">
            Что внутри зерна?
          </h3>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-[#3E1D08]/80">
              <p>
                Зерно кукурузы — это природная герметичная «кастрюля под давлением».
                Внутри — крахмал и небольшое количество воды (около 13–14%).
              </p>
              <p>
                При нагреве вода превращается в пар. Пар занимает в 1700 раз больше объёма, чем вода.
                Давление внутри твёрдой оболочки стремительно растёт.
              </p>
              <p>
                Оболочка — перикарп — очень прочная. Она удерживает давление до&nbsp;9 атмосфер.
                Когда предел превышен — <strong>БУМ!</strong>
              </p>
            </div>
            {/* Иллюстрация зерна */}
            <div className="relative flex justify-center">
              <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
                {/* Зерно */}
                <ellipse cx="110" cy="110" rx="80" ry="60" fill="#FFC044" stroke="#3E1D08" strokeWidth="2.5"/>
                {/* Крахмал */}
                {[
                  [90,105],[110,90],[130,108],[105,120],[125,95],[85,125],[115,130],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="6" fill="#F5E0AE" opacity="0.9"/>
                ))}
                {/* Вода */}
                {[
                  [100,100],[120,115],[95,115],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="#7EC8E3" opacity="0.85"/>
                ))}
                {/* Оболочка — highlight */}
                <ellipse cx="110" cy="110" rx="80" ry="60" fill="none" stroke="#F06520" strokeWidth="3" strokeDasharray="6 4"/>
              </svg>
              {/* Подписи */}
              <div className="absolute top-2 left-2 bg-[#FFC044] text-[#3E1D08] font-heading font-bold text-xs px-3 py-1 rounded-full border border-[#3E1D08]">
                КРАХМАЛ
              </div>
              <div className="absolute top-2 right-2 bg-[#7EC8E3] text-[#3E1D08] font-heading font-bold text-xs px-3 py-1 rounded-full border border-[#3E1D08]">
                ВОДЯНОЙ ПАР
              </div>
            </div>
          </div>
        </div>

        {/* Фото + цитата */}
        <div className="bg-[#3E1D08] rounded-[28px] overflow-hidden grid lg:grid-cols-2 items-center">
          {/* Заглушка фото */}
          <div className="h-56 lg:h-full bg-[#5a2e10] flex items-center justify-center">
            <span className="font-heading font-bold text-[#FFC044]/50 text-sm">фото зёрен кукурузы</span>
          </div>
          <div className="p-8 lg:p-10 flex flex-col gap-4">
            <p className="font-heading font-bold text-xl text-[#FFC044] leading-snug">
              Именно твёрдая оболочка — секрет взрыва
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              Обычная кукуруза не «взрывается» — у неё тонкая оболочка, пар выходит постепенно.
              Попкорн особый: перикарп практически непроницаем для воды.
            </p>
          </div>
        </div>

        {/* Что происходит в момент взрыва */}
        <div className="bg-[#F06520] rounded-[28px] p-8 lg:p-10 text-[#FCFDED]">
          <h3 className="font-heading font-bold text-2xl mb-4">В момент взрыва:</h3>
          <ul className="flex flex-col gap-3 text-[15px] leading-relaxed">
            <li className="flex gap-3 items-start">
              <span className="font-brand text-2xl leading-none mt-0.5">1</span>
              <span>Давление внутри достигает ~9 атм — оболочка трескается за миллисекунды</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="font-brand text-2xl leading-none mt-0.5">2</span>
              <span>Крахмальная масса мгновенно расширяется в 40–50 раз</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="font-brand text-2xl leading-none mt-0.5">3</span>
              <span>Пузырьки пара застывают — образуется пористая белая «пена» попкорна</span>
            </li>
          </ul>
        </div>

        {/* Фото готового попкорна */}
        <div className="bg-[#FFC044] rounded-[28px] h-56 flex items-center justify-center">
          <span className="font-heading font-bold text-[#3E1D08]/40 text-sm">фото готового попкорна</span>
        </div>

        {/* Тест */}
        <Accordion
          title="Тест: Что ты узнал о физике?"
          bg="bg-[#FFC044]"
          titleColor="text-[#3E1D08]"
        >
          <div className="flex flex-col gap-6 mt-2">
            {[
              {
                q: "Что происходит с молекулами воды при нагревании?",
                options: ["Они останавливаются", "Они движутся быстрее", "Они уменьшаются", "Они исчезают"],
                correct: 1,
              },
              {
                q: "Во сколько раз пар занимает больше объёма, чем вода?",
                options: ["В 10 раз", "В 100 раз", "В 1700 раз", "В 3000 раз"],
                correct: 2,
              },
              {
                q: "Как называется оболочка зерна кукурузы?",
                options: ["Эндосперм", "Перикарп", "Зародыш", "Глютен"],
                correct: 1,
              },
            ].map((item, qi) => (
              <QuizQuestion key={qi} index={qi + 1} {...item} />
            ))}
          </div>
        </Accordion>

        {/* Методическая информация */}
        <Accordion title="Методическая информация для учителей">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-[#3E1D08]/80 mt-2">
            <p>
              Ролик предназначен для просмотра после изучения Главы 1 «Тепловые явления» учебника
              «Физика: 8-й класс. Базовый уровень» авторов И. М. Перышкин, А. И. Иванов.
            </p>
            <p>
              <strong>Цели урока:</strong> закрепить знания о молекулярно-кинетической теории,
              давлении газов и фазовых переходах на наглядном бытовом примере.
            </p>
            <p>
              <strong>Рекомендации:</strong> предложите ученикам до просмотра записать гипотезу —
              почему, по их мнению, взрывается попкорн. После просмотра сравните с правильным ответом.
            </p>
            <p>
              <strong>Связь с программой:</strong> тепловые явления, агрегатные состояния вещества,
              молекулярно-кинетическая теория, давление газа.
            </p>
          </div>
        </Accordion>

      </article>

      {/* ── ФУТЕР ── */}
      <footer className="bg-[#3E1D08] text-white px-6 lg:px-14 py-12">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Попкорн" className="w-10 h-10 object-contain" />
              <div className="leading-none">
                <div className="font-brand text-[#FFC044] text-2xl uppercase">ПОПКОРН</div>
                <div className="text-[#FFC044]/70 text-xs mt-0.5 tracking-wide">взрыв знаний</div>
              </div>
            </div>
            <p className="font-heading font-bold text-lg mb-1">Давай общаться!</p>
            <a
              href="mailto:popcorn@magazin.com"
              className="text-sm text-white/60 underline hover:text-white/90 transition-colors"
            >
              popcorn@magazin.com
            </a>
          </div>
          <div className="flex flex-col items-end gap-6">
            <button
              onClick={scrollToTop}
              className="w-11 h-11 border border-white/30 rounded-full flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
            >
              ↑
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

function QuizQuestion({ index, q, options, correct }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col gap-3">
      <p className="font-heading font-bold text-base text-[#3E1D08]">
        {index}. {q}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correct;
          let cls = "px-4 py-2.5 rounded-xl border-2 font-heading font-bold text-sm text-left transition-colors cursor-pointer ";
          if (selected === null) {
            cls += "border-[#3E1D08] bg-[#FCFDED] hover:bg-[#3E1D08]/10";
          } else if (isSelected && isCorrect) {
            cls += "border-green-600 bg-green-100 text-green-800";
          } else if (isSelected && !isCorrect) {
            cls += "border-red-500 bg-red-100 text-red-700";
          } else if (isCorrect) {
            cls += "border-green-600 bg-green-100 text-green-800";
          } else {
            cls += "border-[#3E1D08]/30 bg-[#FCFDED]/60 text-[#3E1D08]/50";
          }
          return (
            <button key={i} className={cls} onClick={() => setSelected(i)} disabled={selected !== null}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <p className={`text-sm font-heading font-bold ${selected === correct ? "text-green-700" : "text-red-600"}`}>
          {selected === correct ? "Правильно!" : `Неверно. Правильный ответ: «${options[correct]}»`}
        </p>
      )}
    </div>
  );
}
