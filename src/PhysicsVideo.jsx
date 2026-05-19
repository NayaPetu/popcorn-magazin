import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo.svg";
import vkLogo from "./assets/vk.svg";
import ytLogo from "./assets/yt.svg";
import logofutter from "./assets/logo_futter.svg";
import pops1 from "./assets/pops_1.png";
import pops2 from "./assets/pops_2.png";
import pops3 from "./assets/pops_3.png";
import pops4 from "./assets/pops_4.png";
import PopcornAnimation from "./components/popcorn-scene";
import what_watch_next from "./assets/what_watch_next.svg";

export default function PhysicsVideo() {
  const [animKey, setAnimKey] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const restartAnim = () => {
    try { localStorage.removeItem('popcorn-anim:t'); } catch {}
    setAnimKey(k => k + 1);
  };

  const QUESTIONS = [
    {
      text: "1. Какое утверждение НЕ относится к молекулярно-кинетической теории (МКТ)?",
      options: [
        "Все вещества состоят из частиц, между которыми есть промежутки",
        "Частицы вещества находятся в непрерывном хаотическом движении",
        "Частицы вещества притягиваются и отталкиваются друг от друга",
        "При нагревании любое вещество обязательно становится твёрдым",
      ],
      correct: 3,
    },
    {
      text: "2. Благодаря какому физическому явлению тепло от нагретой поверхности проходит сквозь оболочку зерна и нагревает крахмал с водой внутри?",
      options: ["Диффузия", "Теплопроводность", "Парообразование", "Излучение"],
      correct: 1,
    },
    {
      text: "3. Почему молекулы воды при нагревании внутри зерна превращаются в газ (пар)?",
      options: [
        "Потому что расстояние между молекулами уменьшается",
        "Потому что молекулы перестают взаимодействовать друг с другом",
        "Потому что некоторые молекулы получают достаточно энергии, чтобы преодолеть притяжение соседних молекул",
        "Потому что крахмал выталкивает молекулы воды наружу",
      ],
      correct: 2,
    },
  ];

  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const score = submitted
    ? QUESTIONS.filter((q, i) => answers[i] === q.correct).length
    : null;

  return (
    <div className="bg-[#FCFDED] text-[#3E1D08]">

      {/* ── ШАПКА ── */}
      <header className="sticky top-0 z-50 bg-[#FCFDED] border-b border-[#3E1D08]/10 px-4 sm:px-6 lg:px-14 py-3 sm:py-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 sm:gap-3 hover:scale-110 transition-transform"
        >
          <img src={logo} alt="Попкорн" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <span className="font-heading text-base sm:text-xl tracking-tight text-[#3E1D08] uppercase">ПОПКОРН</span>
        </button>
        <nav className="hidden sm:flex gap-4 lg:gap-8 font-heading text-sm lg:text-lg font-bold uppercase tracking-normal text-[#3E1D08]">
          <button onClick={() => navigate("/")} className="hover:text-[#F06520] transition-colors">
            физика вокруг
          </button>
          <button onClick={() => navigate("/")} className="hover:text-[#F06520] transition-colors">
            открой свет
          </button>
        </nav>
      </header>

      {/* ── ВИДЕО ── */}
      <div className=" bg-[#3E1D08] px-6 lg:px-14 pt-10 pb-4 max-w-6xl mx-auto">
        <div className="bg-[#3E1D08] rounded-[28px] p-4">
          <div className="relative w-full overflow-hidden rounded-[18px]" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://vk.com/video_ext.php?oid=-238840885&id=456239017&hd=2"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* ── КОНТЕНТ ── */}
      <div className="px-6 lg:px-14 py-10 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
          <span className="border border-[#3E1D08] rounded-full px-3 sm:px-4 py-1 text-sm font-sans font-light">Физика вокруг</span>
          <span className="border border-[#3E1D08] rounded-full px-3 sm:px-4 py-1 text-sm font-sans font-light">8 класс</span>
          <span className="border border-[#3E1D08] rounded-full px-3 sm:px-4 py-1 text-sm font-sans font-light">МКТ</span>
        </div>
        <h1 className="font-heading text-[40px] sm:text-[60px] md:text-[72px] lg:text-[88px] leading-none text-[#F06520] mb-4">
          Почему взрывается попкорн?
        </h1>
        <p className="font-sans font-bold text-lg text-[#3E1D08]">
          Приготовление попкорна — это маленький физический эксперимент
        </p>
      </div>

      {/* ── СТАТЬЯ ── */}
      <div className="px-6 lg:px-14 pb-16 max-w-6xl mx-auto">

        {/* Картинка 1 */}
        <div className="mb-10 rounded-[28px] overflow-hidden">
          <img src={pops1} alt="Этапы взрыва попкорна" className="w-full h-auto object-cover" />
        </div>

        {/* Вводный текст */}
        <p className="text-base leading-relaxed text-[#3E1D08] mb-12 max-w-2xl">
          Ты когда-нибудь стоял у микроволновки и смотрел, как бумажный пакет вдруг начинает
          раздуваться, а потом — БАХ! — оттуда доносится целая серия весёлых хлопков? А когда
          открываешь пакет, внутри гора белых пушистых хлопьев. Это попкорн. Но почему обычное
          зёрнышко кукурузы превращается в облачко? Ответ спрятан внутри зернышка. И чтобы его
          найти, нам придётся ненадолго стать физиками. Не пугайся, это очень вкусная физика!
        </p>

        {/* Подзаголовок раздела */}
        <h2 className="text-base font-bold text-3xl lg:text-5xl text-[#3E1D08] mb-6">
          Что говорит молекулярно-кинетическая теория?
        </h2>

        {/* Текст раздела */}
        <p className="text-base leading-relaxed text-[#3E1D08] mb-5 max-w-2xl">
          Любое вещество, даже твёрдое зерно, состоит из невероятно маленьких частиц — молекул,
          между которыми существуют промежутки. Эти молекулы постоянно и хаотично движутся и
          взаимодействуют друг с другом: притягиваются, отталкиваются, влияют друг на друга.
        </p>
        <p className="text-base leading-relaxed text-[#3E1D08] mb-12 max-w-2xl">
          Это называется молекулярно-кинетической теорией (сокращённо — МКТ). Именно эта теория
          объясняет физические свойства веществ с точки зрения движения и взаимодействия молекул.
          Воспользуемся этими знаниями, чтобы понять, почему с зернышком кукурузы происходит такой
          волшебный взрыв.
        </p>

        {/* Картинка 2 */}
        <div className="rounded-[28px] overflow-hidden border-2 border-[#3E1D08]/10 mb-16">
          <img src={pops2} alt="Молекулярно-кинетическая теория" className="w-full h-auto object-cover" />
        </div>

        {/* Подзаголовок */}
        <h2 className="text-base font-bold text-3xl lg:text-4xl text-[#3E1D08] mb-4">
          Что внутри зерна?
        </h2>
        <p className="text-base leading-relaxed text-[#3E1D08] mb-10 max-w-2xl">
          Возьмём одно сырое зерно попкорна. Снаружи — твёрдая, почти герметичная оболочка.
          Внутри — крахмал и несколько капелек воды.
        </p>

        {/* Картинка 3 */}
        <div className="rounded-[28px] overflow-hidden mb-10">
          <img src={pops3} alt="Строение зерна попкорна" className="w-full h-auto object-cover" />
        </div>

        {/* Текст после картинки */}
        <div className="max-w-2xl flex flex-col gap-5 text-base leading-relaxed text-[#3E1D08]">
          <p>
            Когда мы начинаем греть зерно, сначала нагревается его внешняя часть. А потом тепло
            передаётся внутрь. Этот процесс называется теплопроводностью. Благодаря ему всё зерно
            становится горячим.
          </p>
          <p>
            По мере нагрева внутренняя энергия молекул растёт. Они начинают двигаться всё быстрее
            и быстрее. Особенно это заметно у молекул воды.
          </p>
          <p>
            В жидкой воде молекулы крепко притягиваются друг к другу. Но когда температура
            поднимается, некоторые из них получают достаточно энергии, чтобы вырваться. Жидкость
            превращается в газ — водяной пар. А газ занимает гораздо больший объём, чем жидкость.
          </p>
          <p>
            Но беда в том, что у зерна очень прочная и почти герметичная оболочка. Пар не может
            выйти наружу. Он накапливается, и давление внутри растёт, растёт, растёт…
          </p>
          <p>
            Одновременно с этим крахмал внутри нагревается, размягчается и становится похож на
            вязкую кашу. Когда давление пара становится слишком большим — оболочка разрывается!
            Пар мгновенно расширяется, выталкивая размягчённый крахмал наружу. Тот вспенивается,
            остывает в воздухе — и получается пушистый попкорн.
          </p>
        </div>

      </div>

      {/* ── АНИМАЦИЯ ── */}
      <div className="px-6 lg:px-14 pb-16 max-w-6xl mx-auto">
        <div
          className="relative w-full rounded-[28px] overflow-hidden bg-[#0a0504]"
          style={{ paddingTop: "56.25%" }}
        >
          <div className="absolute inset-0">
            <PopcornAnimation key={animKey} />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={restartAnim}
            className="bg-[#F06520] text-white px-10 py-4 rounded-full font-sans font-bold tracking-wide hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors"
          >
            нагреть зерно попкорна
          </button>
        </div>
      </div>

      {/* ── КОНЕЦ СТАТЬИ ── */}
      <div className="px-6 lg:px-14 pb-16 max-w-6xl mx-auto">
        <div className="max-w-2xl flex flex-col gap-4 text-base leading-relaxed text-[#3E1D08] mb-10">
          <p>Теперь ты знаешь физику попкорна!</p>
          <div>
            <p className="mb-2">Всё благодаря этим процессам:</p>
            <ul className="list-disc list-inside flex flex-col gap-1 pl-2">
              <li><span className="font-bold">Теплопроводности</span> — тепло проникает внутрь зерна.</li>
              <li><span className="font-bold">Парообразованию</span> — вода становится паром и создаёт давление.</li>
              <li><span className="font-bold">Диффузии</span> — молекулы воды проникают в крахмал, размягчая его.</li>
            </ul>
          </div>
          <p>
            А управляет всем этим шоу молекулярно-кинетическая теория.
            Так что в следующий раз, когда будешь хрустеть попкорном,
            можешь гордо сказать: «Я знаю физику этого взрыва!»
          </p>
        </div>

        <div className="rounded-[28px] overflow-hidden">
          <img src={pops4} alt="Зёрна попкорна" className="w-full h-auto object-cover" />
        </div>
      </div>

      {/* ── ТЕСТ ── */}
      <div className="px-6 lg:px-14 pb-16 max-w-6xl mx-auto">
        <div className="border border-[#D4C4A0] rounded-[28px] overflow-hidden bg-[#F5EDD3]">

          {/* Шапка теста */}
          <div className="flex justify-between items-start px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#3E1D08]">
                Тест: Что ты узнал о физике?
              </h2>
              <p className="text-sm text-[#3E1D08]/60 mt-1">
                Три вопроса по мотивам статьи и ролика. Проверь себя!
              </p>
            </div>
            <button
              onClick={() => setQuizOpen(o => !o)}
              className="shrink-0 ml-4 w-12 h-12 rounded-full border-2 border-[#F06520] text-[#F06520] flex items-center justify-center hover:bg-[#F06520] hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d={quizOpen ? "M3 11L9 5L15 11" : "M3 7L9 13L15 7"}
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Тело теста */}
          {quizOpen && (
            <div className="px-4 sm:px-8 pb-6 sm:pb-8">
              {QUESTIONS.map((q, qi) => (
                <div key={qi} className="mb-8">
                  <p className="font-bold text-[#3E1D08] mb-2 leading-snug">{q.text}</p>
                  <div className="flex flex-col">
                    {q.options.map((opt, oi) => {
                      const isSelected = answers[qi] === oi;
                      const isCorrect = oi === q.correct;
                      const optionColor = submitted
                        ? isCorrect
                          ? "text-[#2E7D32]"
                          : isSelected
                          ? "text-[#C62828]"
                          : "text-[#3E1D08]"
                        : "text-[#3E1D08]";
                      return (
                        <label
                          key={oi}
                          className="flex items-start gap-3 py-3 border-t border-[#C8A96E]/40 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name={`q${qi}`}
                            value={oi}
                            checked={isSelected}
                            onChange={() => !submitted && setAnswers(a => ({ ...a, [qi]: oi }))}
                            disabled={submitted}
                            className="mt-0.5 accent-[#F06520] w-4 h-4 shrink-0"
                          />
                          <span className={`text-sm leading-snug ${optionColor}`}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}

              {!submitted ? (
                <button
                  onClick={() => allAnswered && setSubmitted(true)}
                  disabled={!allAnswered}
                  className="bg-[#F06520] text-white px-10 py-3 rounded-full font-sans font-bold tracking-wide disabled:opacity-40 hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors"
                >
                  Проверить
                </button>
              ) : (
                <p className="font-heading text-xl text-[#3E1D08]">
                  Твой результат:{" "}
                  <span className="text-[#F06520] font-bold">
                    {score} из {QUESTIONS.length}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── МЕТОДИЧКА ── */}
      <div className="px-6 lg:px-14 pb-16 max-w-6xl mx-auto">
        <div className={`border border-[#D4C4A0] bg-[#F5EDD3] transition-all ${methodOpen ? "rounded-[28px]" : "rounded-full"}`}>

          {/* Шапка */}
          <div
            className="flex justify-between items-center px-4 sm:px-8 py-4 cursor-pointer select-none"
            onClick={() => setMethodOpen(o => !o)}
          >
            <span className="font-heading text-lg font-bold text-[#3E1D08]">
              Методическая информация для учителей
            </span>
            <button
              className="shrink-0 ml-4 w-10 h-10 rounded-full border-2 border-[#F06520] text-[#F06520] flex items-center justify-center hover:bg-[#F06520] hover:text-white transition-colors"
              tabIndex={-1}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d={methodOpen ? "M2 10L8 4L14 10" : "M2 6L8 12L14 6"}
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Тело */}
          {methodOpen && (
            <div className="px-4 sm:px-8 pb-6 sm:pb-8 text-sm leading-relaxed text-[#3E1D08]">
              <p className="mb-3">
                Ролик предназначен после изучения Главы 1 «Тепловые явления» учебника «Физика. 8-й класс. Базовый уровень»
                (авторы И. М. Перышкин, А. И. Иванов).
              </p>
              <p className="mb-5">
                <span className="font-bold">Главная цель:</span> показать ученикам, что физика — не просто формулы и параграфы,
                а живые процессы, которые происходят вокруг нас каждый день. Даже в попкорне.
              </p>

              <p className="font-bold mb-2">Связь с темами учебника:</p>
              <ul className="list-disc list-inside flex flex-col gap-1 mb-6 pl-2">
                <li>Молекулярно-кинетическая теория — §1 «Основные положения МКТ».</li>
                <li>Внутренняя энергия — §2 «Внутренняя энергия».</li>
                <li>Диффузия — §3 «Диффузия в газах, жидкостях и твёрдых телах».</li>
                <li>Теплопроводность — §4 «Теплопроводность».</li>
                <li>Давление газа — §8 «Давление газа».</li>
                <li>Парообразование и конденсация — §12 «Парообразование и конденсация».</li>
              </ul>

              <p className="font-bold text-base mb-4">Как использовать видео на уроке</p>

              <p className="font-bold mb-2">Вариант 1. Мотивация в начале темы (5–7 минут)</p>
              <ol className="list-decimal list-inside flex flex-col gap-1 mb-5 pl-2">
                <li>Покажите ролик целиком.</li>
                <li>Задайте вопрос классу: «Какие физические явления вы заметили?». (Ученики называют: взрыв, нагрев, теплопроводность, парообразование, повышение давления газа, расширение, разрыв оболочки.)</li>
                <li>Сделайте вывод: «Вот видите — физика совсем не скучная. Она прямо на вашей кухне!»</li>
              </ol>

              <p className="font-bold mb-2">Вариант 2. Закрепление после изучения тепловых явлений (10–15 минут)</p>
              <ol className="list-decimal list-inside flex flex-col gap-1 mb-5 pl-2">
                <li>Показать видео с остановками: на каждом этапе (нагрев, парообразование, рост давления, разрыв) попросить назвать изученное явление.</li>
                <li>Работа в парах: нарисовать в тетради «Физическую карту попкорна» со стрелками (тепло → увеличение скорости молекул → повышение давления → взрыв).</li>
                <li>Вопрос для обсуждения: «Почему попкорн не взрывается, если его медленно нагревать зерно при открытой оболочке?» (пар выходит, давление не нарастает).</li>
              </ol>

              <p className="font-bold mb-2">Вариант 3. Домашнее задание (творческое)</p>
              <ol className="list-decimal list-inside flex flex-col gap-1 pl-2">
                <li>Написать короткую сказку (или комикс) от лица молекулы воды внутри зерна попкорна.</li>
                <li>Провести домашний эксперимент: попробовать взорвать попкорн на сковороде с крышкой и без крышки — сравнить результат.</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* ── ЧТО ЕЩЁ ПОСМОТРЕТЬ ── */}
      <div className="bg-[#FFC044] px-6 lg:px-14 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Пузырь */}
          <svg className="mb-6 w-full max-w-[493px] h-auto" viewBox="0 0 493 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 0.5C17.2893 0.5 0.5 17.2893 0.5 38C0.5 58.7107 17.2893 75.5 38 75.5H49.4404C47.3021 84.9115 38.5254 98.1672 14.4277 100.952C14.323 100.964 14.2894 101.106 14.3887 101.142C30.4775 106.93 64.4693 109.192 79.9404 75.5H455C475.711 75.5 492.5 58.7107 492.5 38C492.5 17.2893 475.711 0.5 455 0.5H38Z" fill="#F5E0AE"/>
            <path d="M38 75.5V76V76V75.5ZM49.4404 75.5V75H50.0668L49.928 75.6108L49.4404 75.5ZM14.4277 100.952L14.3696 100.456L14.3703 100.455L14.4277 100.952ZM14.3887 101.142L14.2194 101.612V101.612L14.3887 101.142ZM79.9404 75.5L79.4861 75.2914L79.6198 75H79.9404V75.5ZM455 0.5V0V0V0.5ZM38 0.5V1C17.5655 1 1 17.5655 1 38H0.5H0C0 17.0132 17.0132 0 38 0V0.5ZM0.5 38H1C1 58.4345 17.5655 75 38 75V75.5V76C17.0132 76 0 58.9868 0 38H0.5ZM38 75.5V75H49.4404V75.5V76H38V75.5ZM49.4404 75.5L49.928 75.6108C47.7413 85.235 38.7875 98.6402 14.4851 101.449L14.4277 100.952L14.3703 100.455C38.2632 97.6942 46.8628 84.588 48.9529 75.3892L49.4404 75.5ZM14.4277 100.952L14.4859 101.449C14.6656 101.428 14.788 101.291 14.8201 101.145C14.8366 101.07 14.8341 100.973 14.7861 100.876C14.7347 100.773 14.6476 100.703 14.558 100.671L14.3887 101.142L14.2194 101.612C14.0801 101.562 13.96 101.461 13.8903 101.321C13.824 101.187 13.8177 101.047 13.8434 100.931C13.8936 100.702 14.0852 100.489 14.3696 100.456L14.4277 100.952ZM14.3887 101.142L14.558 100.671C22.5322 103.54 34.9524 105.535 47.2819 102.639C59.587 99.749 71.82 91.9858 79.4861 75.2914L79.9404 75.5L80.3948 75.7086C72.5898 92.7058 60.0913 100.658 47.5105 103.613C34.954 106.562 22.334 104.532 14.2194 101.612L14.3887 101.142ZM79.9404 75.5V75H455V75.5V76H79.9404V75.5ZM455 75.5V75C475.435 75 492 58.4345 492 38H492.5H493C493 58.9868 475.987 76 455 76V75.5ZM492.5 38H492C492 17.5655 475.435 1 455 1V0.5V0C475.987 4.76837e-07 493 17.0132 493 38H492.5ZM455 0.5V1H38V0.5V0H455V0.5Z" fill="#3E1D08"/>
            <text x="246.5" y="38" textAnchor="middle" dominantBaseline="central" fontFamily="'Toyz', 'Lilita One', cursive" fontSize="22" letterSpacing="2" fill="#3E1D08">ЧТО ЕЩЁ ПОСМОТРЕТЬ?</text>
          </svg>

          {/* Карточка */}
          <div className="bg-white rounded-[24px] p-8 max-w-xl">
            <h3 className="font-heading text-xl font-bold text-[#F06520] mb-1">
              Как сделать свет
            </h3>
            <p className="font-sans font-bold text-sm text-[#3E1D08] mb-3">
              Пошаговая инструкция по созданию солнечного света
            </p>
            <p className="text-sm leading-relaxed text-[#3E1D08] mb-6">
              От термоядерного синтеза в ядре Солнца до голубого неба над головой.
              Узнай, какой длинный путь проходит каждый фотон, который освещает твою комнату.
            </p>
            <button className="bg-[#F06520] text-white px-8 py-3 rounded-full font-sans font-bold tracking-wide hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors">
              Скорее смотреть
            </button>
          </div>
        </div>
      </div>

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
