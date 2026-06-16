import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
import vkLogo from "./assets/vk.svg";
import ytLogo from "./assets/yt.svg";
import logofutter from "./assets/logo_futter.svg";
import lightHand from "./assets/light-hand.jpg";

const steps = [
  {
    title: "Шаг 1. Найдите подходящее место",
    body: (
      <>
        <p>
          Вам понадобится звезда. Можно взять любую — их во Вселенной миллиарды. Но мы возьмём ту,
          что ближе. Наше Солнце.
        </p>
        <ul>
          <li>Диаметр Солнца — 1 392 700 километров. Это в 109 раз больше диаметра Земли.</li>
          <li>Температура в ядре — около 15 миллионов градусов Цельсия.</li>
          <li>Масса Солнца — 1,989 × 10³⁰ килограммов. Это 99,86% от всей массы Солнечной системы.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Шаг 2. Возьмите водород",
    body: (
      <p>
        Солнце почти целиком состоит из водорода — самого простого и лёгкого газа во Вселенной.
        Возьмите два атома водорода. Сожмите с температурой в 15 миллионов градусов. Они сольются
        в один атом гелия. В этот момент крошечная часть массы исчезает. Она превращается в чистую
        энергию. Именно эту энергию и называют фотоном — частицей света. Сохраните его — он вам понадобится.
      </p>
    ),
  },
  {
    title: "Шаг 3. Подождите",
    body: (
      <>
        <p>
          Не торопитесь. Фотон не может сразу покинуть звезду. Внутри слишком тесно — он будет
          сталкиваться с атомами, поглощаться и рождаться заново, снова и снова. Этот этап займёт
          от ста тысяч до миллиона лет.
        </p>
        <p>По сравнению история человечества — 200 000 лет.</p>
      </>
    ),
  },
  {
    title: "Шаг 4. Выпустите наружу",
    body: (
      <p>
        Когда фотон наконец доберётся до поверхности — отпустите. Перед ним 150 миллионов километров
        открытого космоса. Больше ничего не нужно делать. Он сам знает скорость — 300 000 километров
        в секунду. Быстрее во Вселенной не бывает. Через восемь минут он будет на месте.
      </p>
    ),
  },
  {
    title: "Шаг 5. Добавьте Луну (по желанию)",
    body: (
      <p>
        Часть фотонов можно направить не на Землю, а на Луну. Но Луна не умеет делать свой свет.
        Она просто отражает солнечный. Этого хватит, чтобы ночью было видно дорогу. Луна ничего
        не производит. Она просто не забывает отдавать то, что получила.
      </p>
    ),
  },
  {
    title: "Шаг 6. Пропустите через атмосферу",
    body: (
      <p>
        Теперь самый красивый этап. Фотоны влетают в атмосферу Земли и сталкиваются с молекулами
        воздуха. Синие и фиолетовые волны не умеют лететь прямо — они рассеиваются во все стороны
        и заполняют всё вокруг. А на закате путь через атмосферу длиннее. Синие волны не добираются
        до конца — остаются только красные и оранжевые.
      </p>
    ),
  },
];

function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-[#FCFDED] border-b border-[#3E1D08]/10 px-4 sm:px-6 lg:px-14 py-3 sm:py-4 flex justify-between items-center">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 sm:gap-3 hover:scale-110 transition-transform"
      >
        <img src={logo} alt="Попкорн" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
        <span className="font-heading text-base sm:text-xl tracking-tight text-[#3E1D08] uppercase">ПОПКОРН</span>
      </button>
      <nav className="hidden sm:flex gap-4 lg:gap-8 font-heading text-sm lg:text-lg font-bold uppercase tracking-normal text-[#3E1D08]">
        <button onClick={() => navigate("/physics")} className="hover:text-[#F06520] transition-colors">
          физика вокруг
        </button>
        <button onClick={() => navigate("/light")} className="hover:text-[#F06520] transition-colors">
          открой свет
        </button>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#3E1D08] text-white px-6 lg:px-14 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-0">
        <div>
          <img src={logofutter} alt="Попкорн" className="mb-6 w-50 h-auto" />
          <p className="font-sans font-bold text-lg -mb-2 text-[#F5E0AE]">Давай общаться!</p>
          <a
            href="mailto:popcorn@magazin-p.ru"
            className="text-sm text-[#F5E0AE] underline hover:text-[#F5E0AE]/80 transition-colors"
          >
            popcorn@magazin-p.ru
          </a>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#FFC044] hover:text-[#F06520] transition-colors"
            aria-label="Наверх"
          >
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 40V10M18 10L6 22M18 10L30 22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex gap-4">
            <a href="https://vkvideo.ru/@club238840885" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
              <img src={vkLogo} alt="ВКонтакте" className="w-10 h-10" />
            </a>
            <a href="https://www.youtube.com/@popcorn-magazin" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
              <img src={ytLogo} alt="YouTube" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LightVideo() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FCFDED] text-[#3E1D08] min-h-screen">
      <Header />

      <section className="bg-[#3E1D08] px-4 sm:px-6 lg:px-14 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[18px] md:rounded-[24px] overflow-hidden bg-black">
            <video
              className="w-full aspect-video object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/images/open-light-poster.jpg"
            >
              <source src={`${import.meta.env.BASE_URL}video/open-light.mp4`} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
        </div>
      </section>

      <main className="px-4 sm:px-6 lg:px-14 pt-10 md:pt-12 pb-20 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
          <span className="border border-[#3E1D08] rounded-full px-4 py-1 text-sm font-sans font-light">Открой свет</span>
        </div>

        <h1 className="font-heading text-[44px] sm:text-[64px] md:text-[78px] lg:text-[92px] leading-none text-[#F06520] mb-4">
          Как сделать свет
        </h1>
        <p className="font-sans font-bold text-base sm:text-lg text-[#3E1D08] mb-8">
          Инструкция, как сделать свет, который освещает нам каждый день.
        </p>

        <div className="rounded-[18px] md:rounded-[24px] overflow-hidden mb-8 md:mb-10">
          <img src={lightHand} alt="Солнечный свет проходит сквозь пальцы" className="w-full h-auto object-cover" />
        </div>

        <article className="max-w-2xl mx-auto text-[#3E1D08]">
          <p className="text-base leading-relaxed mb-10">
            Вы когда-нибудь пробовали включить свет просто… подождав миллион лет? Звучит странно,
            но именно так работает наше Солнце. Внутри него происходит настоящее волшебство,
            которое физики называют термоядерным синтезом. Давайте заглянем на кухню звёзд!
          </p>

          <div className="flex flex-col gap-8">
            {steps.map((step) => (
              <section key={step.title} className="light-article-step">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#3E1D08] mb-3">
                  {step.title}
                </h2>
                <div className="text-base leading-relaxed flex flex-col gap-4">{step.body}</div>
              </section>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#3E1D08] mb-3">Все готово</h2>
            <div className="text-base leading-relaxed flex flex-col gap-4">
              <p>Свет, который сейчас падает на тебя, начал свой путь ещё до появления первых людей.</p>
              <p>
                Представь, что каждый лучик, который ты видишь за окном, — это путешественник,
                который родился внутри гигантского Солнца, блуждал там миллион лет, а потом за
                8 минут пересёк космос, чтобы коснуться твоего носа. Круто, правда?
              </p>
            </div>
          </section>
        </article>
      </main>

      <section className="bg-[#FFC044] px-4 sm:px-6 lg:px-14 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <svg className="mb-6 w-full max-w-[493px] h-auto" viewBox="0 0 493 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 0.5C17.2893 0.5 0.5 17.2893 0.5 38C0.5 58.7107 17.2893 75.5 38 75.5H49.4404C47.3021 84.9115 38.5254 98.1672 14.4277 100.952C14.323 100.964 14.2894 101.106 14.3887 101.142C30.4775 106.93 64.4693 109.192 79.9404 75.5H455C475.711 75.5 492.5 58.7107 492.5 38C492.5 17.2893 475.711 0.5 455 0.5H38Z" fill="#F5E0AE" />
            <path d="M38 75.5V76V76V75.5ZM49.4404 75.5V75H50.0668L49.928 75.6108L49.4404 75.5ZM14.4277 100.952L14.3696 100.456L14.3703 100.455L14.4277 100.952ZM14.3887 101.142L14.2194 101.612V101.612L14.3887 101.142ZM79.9404 75.5L79.4861 75.2914L79.6198 75H79.9404V75.5ZM455 0.5V0V0V0.5ZM38 0.5V1C17.5655 1 1 17.5655 1 38H0.5H0C0 17.0132 17.0132 0 38 0V0.5ZM0.5 38H1C1 58.4345 17.5655 75 38 75V75.5V76C17.0132 76 0 58.9868 0 38H0.5ZM38 75.5V75H49.4404V75.5V76H38V75.5ZM49.4404 75.5L49.928 75.6108C47.7413 85.235 38.7875 98.6402 14.4851 101.449L14.4277 100.952L14.3703 100.455C38.2632 97.6942 46.8628 84.588 48.9529 75.3892L49.4404 75.5ZM14.4277 100.952L14.4859 101.449C14.6656 101.428 14.788 101.291 14.8201 101.145C14.8366 101.07 14.8341 100.973 14.7861 100.876C14.7347 100.773 14.6476 100.703 14.558 100.671L14.3887 101.142L14.2194 101.612C14.0801 101.562 13.96 101.461 13.8903 101.321C13.824 101.187 13.8177 101.047 13.8434 100.931C13.8936 100.702 14.0852 100.489 14.3696 100.456L14.4277 100.952ZM14.3887 101.142L14.558 100.671C22.5322 103.54 34.9524 105.535 47.2819 102.639C59.587 99.749 71.82 91.9858 79.4861 75.2914L79.9404 75.5L80.3948 75.7086C72.5898 92.7058 60.0913 100.658 47.5105 103.613C34.954 106.562 22.334 104.532 14.2194 101.612L14.3887 101.142ZM79.9404 75.5V75H455V75.5V76H79.9404V75.5ZM455 75.5V75C475.435 75 492 58.4345 492 38H492.5H493C493 58.9868 475.987 76 455 76V75.5ZM492.5 38H492C492 17.5655 475.435 1 455 1V0.5V0C475.987 4.76837e-07 493 17.0132 493 38H492.5ZM455 0.5V1H38V0.5V0H455V0.5Z" fill="#3E1D08" />
            <text x="246.5" y="38" textAnchor="middle" dominantBaseline="central" fontFamily="'Toyz', 'Lilita One', cursive" fontSize="22" letterSpacing="2" fill="#3E1D08">ЧТО ЕЩЁ ПОСМОТРЕТЬ?</text>
          </svg>

          <div className="bg-[#FCFDED] border border-[#3E1D08]/30 rounded-[24px] p-6 sm:p-8 max-w-5xl">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFC044] mb-1">
              Почему взрывается попкорн?
            </h3>
            <p className="font-sans font-bold text-sm sm:text-base text-[#3E1D08] mb-3">
              Разберемся в этом с точки зрения молекулярно-кинетической теории
            </p>
            <p className="text-sm leading-relaxed text-[#3E1D08] mb-6 max-w-4xl">
              Ролик предназначен для просмотра после изучения Главы 1 «Тепловые явления» учебника
              «Физика: 8-й класс. Базовый уровень» авторов И. М. Перышкин, А. И. Иванов.
            </p>
            <button
              onClick={() => navigate("/physics")}
              className="bg-[#F06520] text-white px-10 py-4 rounded-full font-sans font-bold tracking-wide hover:bg-[#FFC044] hover:text-[#3E1D08] transition-colors"
            >
              Скорее смотреть
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
