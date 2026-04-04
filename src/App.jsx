import { useEffect, useState, useRef } from "react";

// Компонент глаза (анимация за курсором)
function Eye({ mousePos }) {
  const eyeRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (eyeRef.current) {
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const dx = mousePos.x - eyeCenterX;
      const dy = mousePos.y - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 10, 10);
      setOffset({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    }
  }, [mousePos]);

  return (
    <div ref={eyeRef} className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-[3px] border-black shadow-inner">
      <div className="w-6 h-6 bg-black rounded-full" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} />
    </div>
  );
}

export default function PopcornSite() {
  const [mousePos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FFF9E6] min-h-screen font-sans text-[#2D2926] pb-10">
      {/* 1. Header (Sticky) */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-black/5 py-4 px-12 z-50 flex justify-between items-center">
        <h1 className="font-black text-xl uppercase tracking-tighter">Попкорн</h1>
        <nav className="flex gap-8 font-bold text-sm uppercase">
          <button onClick={() => scrollTo("physics")} className="hover:text-[#FF6B35]">Физика</button>
          <button onClick={() => scrollTo("light")} className="hover:text-[#FF6B35]">Свет</button>
        </nav>
      </header>

      {/* 2. Hero Section (Желтый блок) */}
      <section className="bg-[#FFC542] mx-4 my-2 rounded-[3rem] p-16 flex justify-between items-center relative overflow-hidden">
        <div className="max-w-xl">
          <h1 className="text-7xl font-black text-white leading-[1.1] mb-6">Привет!<br />Это Попкорн)</h1>
          <p className="text-white text-xl font-medium opacity-90">
            Здесь просто и весело о сложном. Нескучный научно-популярный журнал нового формата.
          </p>
        </div>
        {/* Глаза попкорна */}
        <div className="flex flex-col items-center mr-10">
          <div className="flex gap-3 mb-2">
            <Eye mousePos={mousePos} />
            <Eye mousePos={mousePos} />
          </div>
          <div className="w-40 h-20 bg-black rounded-b-full opacity-20"></div>
        </div>
      </section>

      {/* 3. О нас (Кто мы?) */}
      <section className="px-12 py-16 flex gap-10 items-center">
        <div className="text-7xl">🍿</div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm flex-1">
          <span className="bg-[#FFC542] px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">Кто мы?</span>
          <p className="text-lg leading-relaxed text-gray-700">
            Мы научно-популярный журнал. Нас завораживает окружающий мир, и мы хотим поделиться своим энтузиазмом через свою работу...
          </p>
        </div>
      </section>

      {/* 4. Что посмотреть (Темный блок) */}
      <section className="bg-[#2D2926] mx-4 rounded-[3rem] p-14 text-white">
        <div className="flex justify-between items-center mb-12">
          <h2 className="bg-white text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider">Что посмотреть?</h2>
          <span className="text-4xl">😎</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center">
            <h3 className="text-3xl font-black mb-2 italic">Физика вокруг</h3>
            <p className="opacity-60 mb-8">Физика из учебника — в жизни</p>
            <button onClick={() => scrollTo("physics")} className="bg-[#FF6B35] text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition uppercase text-sm">Скорее смотреть</button>
          </div>
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center">
            <h3 className="text-3xl font-black mb-2 italic">Открой свет</h3>
            <p className="opacity-60 mb-8">Свет и оптика по-новому</p>
            <button onClick={() => scrollTo("light")} className="bg-[#FF6B35] text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition uppercase text-sm">Скорее смотреть</button>
          </div>
        </div>
      </section>

      {/* 5. Разделы с видео (Физика) */}
      <section id="physics" className="p-12 mt-10">
        <h2 className="text-6xl font-black text-[#FF6B35] mb-10 tracking-tighter uppercase italic">Физика вокруг</h2>
        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm max-w-4xl">
          <h3 className="text-3xl font-black mb-4 text-[#FF6B35]">Почему взрывается попкорн?</h3>
          <p className="text-gray-500 mb-8 text-lg">Разберемся в этом с точки зрения молекулярно-кинетической теории.</p>
          <button onClick={() => window.open('https://youtube.com', '_blank')} className="bg-[#FF6B35] text-white px-12 py-5 rounded-2xl font-black hover:shadow-lg transition uppercase tracking-widest">Смотреть ролик</button>
        </div>
      </section>

      {/* 6. Разделы с видео (Свет) */}
      <section id="light" className="p-12">
        <h2 className="text-6xl font-black text-[#FFC542] mb-10 tracking-tighter uppercase italic">Открой свет</h2>
        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm max-w-4xl">
          <h3 className="text-3xl font-black mb-4 text-[#FFC542]">Как сделать свет</h3>
          <p className="text-gray-500 mb-8 text-lg">Пошаговая инструкция по созданию солнечного света своими руками.</p>
          <button onClick={() => window.open('https://youtube.com', '_blank')} className="bg-[#FFC542] text-white px-12 py-5 rounded-2xl font-black hover:shadow-lg transition uppercase tracking-widest">Смотреть ролик</button>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="mt-20 px-12 flex justify-between items-center opacity-40 font-bold uppercase text-xs tracking-widest">
        <div>© 2024 Попкорн Журнал</div>
        <div className="flex gap-6">
          <a href="https://youtube.com" target="_blank" className="hover:text-red-600">YouTube</a>
          <a href="https://vk.com" target="_blank" className="hover:text-blue-600">VK</a>
        </div>
      </footer>
    </div>
  );
}
