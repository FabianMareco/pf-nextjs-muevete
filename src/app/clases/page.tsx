'use client';
import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '@/hooks/useCart';
import packsData from '@/data/packs.json';
import ConfirmDialog from '@/components/ConfirmDialog';
 
const cardsData = [
  { title: "DANZA JAZZ", description: "Explora diversos estilos de la danza Jazz: Modern Jazz, Lyrical Jazz, Theatre Jazz, Contemporary Jazz. No importa si eres principiante o avanzado, hay una clase disponible para que empieces a aprender." },
  { title: "DANZA CLÁSICA", description: "Descubre nuestras clases de danza clásica diseñadas para todos los niveles. Mejora tu técnica, flexibilidad y expresión artística, guiado por profesionales que te acompañarán en cada paso hacia el dominio del ballet." },
  { title: "DANZA CONTEMPORÁNEA", description: "Las clases de danza contemporánea están abiertas a todos los niveles, ofreciendo una mezcla de técnica, improvisación y expresión creativa. Mejora tu flexibilidad y fuerza mientras exploras nuevas formas de moverte." },
  { title: "YOGA", description: "Realiza nuestras clases de yoga accesibles para todos los niveles. Mejora tu flexibilidad, fuerza y bienestar mental, guiado por profesionales. ¡Conéctate desde cualquier lugar y muévete!" },
  { title: "TANGO", description: "Vive la pasión del tango con nuestras clases online para todos los niveles. Aprende desde casa, con instructores expertos, a bailar y disfrutar de este hermoso arte. ¡Únete y siente el ritmo!" },
  { title: "ESTILOS URBANOS", description: "Aprende el ritmo y la energía de los estilos urbanos con nuestras clases en línea. Aprende a bailar hip hop, street dance y más, guiado por profesionales. ¡Mejora tus movimientos desde casa, a tu ritmo!" },
  { title: "FLEXIBILIDAD Y ELONGACIÓN", description: "Mejora tu elasticidad y bienestar en las clases de elongación y flexibilidad. Los ejercicios están guiados para aumentar tu rango de movimiento, reducir tensiones musculares y mejorar tu postura desde casa." },
  { title: "EXPRESIÓN CORPORAL", description: "Descubre en las clases de expresión corporal infinitas posibilidades del movimiento. Mejora tu coordinación, creatividad y conciencia corporal con ejercicios dinámicos y divertidos. ¡Conéctate desde cualquier lugar del mundo!" },
  { title: "DANZAS FOLCLÓRICAS DEL MUNDO", description: "Viaja a países como Argentina, Paraguay o Ucrania en las clases del folclore del mundo. Aprende los pasos típicos, coreografías y más. ¡Empieza una clase ahora!" },
  { title: "PILATES MAT", description: "Clases de Pilates Mat personalizadas para todos los niveles. Mejora tu flexibilidad, fuerza y bienestar en un ambiente motivador. ¡Únete a nuestra comunidad hoy!" },
  { title: "FLAMENCO", description: "Aprender Flamenco en línea nunca fué tan fácil como ahora. Explora la guitarra, el baile y el cante desde la comodidad de tu hogar. ¡Vive la pasión del arte flamenco y descubre a tu bailaor/a interior! ¡Olé!" },
  { title: "MOVILIDAD ARTICULAR PARA TODOS", description: "Cada día necesitamos acondicionar el cuerpo y trabajar la movilidad articular para mantener una salud física óptima, no importa tu profesión, esta clase es indispensable para todos." },
  { title: "DANZA PARA NIÑOS", description: "Nuestras clases están preparadas especialmente para la diversión y el aprendizaje de los más pequeños. Guiadas por profesionales con experiencia en el aprendizaje de tempranas edades. ¡Todos los niños son bienvenidos!" },
  { title: "IMPROVISACIÓN", description: "La improvisación es una disciplina que se entrena, explora lugares desconocidos por el movimiento propio, invita a la reflexión y el descubrimiento constante. Cada clase es una invitación a jugar y aprender ¡Aprende a improvisar y llena tu danza de vida!" },
  { title: "NUTRICIÓN PARA EL MOVIMIENTO Y EL BIENESTAR", description: "Somos el resultado de cómo nos alimentamos. Aprende como adquirir una correcta alimentación con los nutrientes necesarios para poder dar tu mejor versión cada día. Este curso te brindará las herramientas necesarias para llevar tu alimentación al siguiente nivel." }
];
 
export default function ClasesPage() {
  const packsRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [showMovimiento, setShowMovimiento] = useState(true);
  const [addedPack, setAddedPack] = useState<any | null>(null);
 
  useEffect(() => { AOS.init({ duration: 1000 }); }, []);
 
  const scrollToPacks = () => packsRef.current?.scrollIntoView({ behavior: 'smooth' });
 
  const handleBuyPack = (pack: any) => {
    addItem({
      id: String(pack.id), // ID como string para que coincida con el doc de Firestore
      name: pack.nombre,
      price: pack.precio,
      type: 'pack',
      category: pack.categoria,
        quantity: 1,
    }, 1);
    setAddedPack(pack);
  };
 
  const movimientoPacks = packsData.filter(p => p.categoria === 'clases');
  const nutricionPacks = packsData.filter(p => p.categoria === 'nutricion');
 
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-center text-2xl font-carter text-secondary-light mb-6" data-aos="fade-up" style={{ fontFamily: "'PermanentMarker-Regular', cursive", textShadow: '4px 4px 0px rgba(238,155,0,0.4), 8px 8px 0px rgba(187,62,3,0.25)' }}>Clases</h3>
 
        <div className="flex flex-row justify-center gap-4 mb-8 mt-8">
          {[21, 22, 11].map((num, idx) => (
            <div key={num} className="w-1/3 px-2" data-aos="fade-left" data-aos-delay={idx * 200}>
              <img src={`/multimedia/${num}.png`} alt="" className="w-full rounded-2xl shadow-lg" />
            </div>
          ))}
        </div>
 
        <div data-aos="fade-up">
          <p className="texto-contenido">
            En las clases de MUEVETE encontrarás una experiencia única que combina diversidad y accesibilidad.
            Con múltiples opciones que abarcan desde el ballet y danza contemporánea hasta yoga y stretching,
            la plataforma en línea de MUEVETE está diseñada para todos los niveles, ya seas principiante o avanzado.
            Cada lección es impartida por profesionales altamente capacitados, que guían a los alumnos a través de técnicas,
            ejercicios y prácticas creativas. Los beneficios incluyen una mejora en la flexibilidad, la fuerza,
            y la conexión mente-cuerpo, así como la posibilidad de aprender a tu propio ritmo, desde cualquier lugar con acceso a internet.
            La variedad de estilos asegura que siempre encuentres una clase que se adapte a tus objetivos y preferencias,
            haciéndote sentir en plenitud y motivación.
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {cardsData.map((card, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition" data-aos="fade-up" data-aos-delay={idx * 50}>
              <div className="h-56 bg-gray-200/20 flex items-center justify-center">
                <img src={`/multimedia/clases${idx + 1}.png`} alt={card.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h5 className="text-xl font-bold text-center text-secondary-light mb-2">{card.title}</h5>
                <p className="text-secondary-light/80 text-sm">{card.description}</p>
                <button onClick={scrollToPacks} className="mt-4 bg-[#AE2012] hover:bg-[#9B2226] text-white py-2 px-4 rounded-lg w-full transition">
                  IR A UNA CLASE
                </button>
              </div>
            </div>
          ))}
        </div>
 
        <div ref={packsRef} className="mt-16">
          <h3 className="text-center text-2xl font-carter text-secondary-light mb-8" style={{ fontFamily: "'PermanentMarker-Regular', cursive", textShadow: '4px 4px 0px rgba(238,155,0,0.4), 8px 8px 0px rgba(187,62,3,0.25)' }}>✨ Elige tu pack ✨</h3>
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <button onClick={() => setShowMovimiento(true)} className={`px-6 py-2 rounded-full ${showMovimiento ? 'bg-accent' : 'bg-primary-light'} text-white`}>💃 CLASES PARA MOVERSE</button>
            <button onClick={() => setShowMovimiento(false)} className={`px-6 py-2 rounded-full ${!showMovimiento ? 'bg-accent' : 'bg-primary-light'} text-white`}>🥗 CURSOS O ASESORÍAS</button>
          </div>
 
          {showMovimiento ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {movimientoPacks.filter(p => [1,2,3].includes(p.id)).map(pack => (
                  <div key={pack.id} className="card-glass p-6 text-center">
                    <h4 className="text-xl font-bold text-secondary-light">💃 {pack.nombre}</h4>
                    <p className="text-secondary-light/80 text-sm mt-2">{pack.descripcion}</p>
                    <p className="text-2xl font-bold text-accent mt-4">💰 ${pack.precio.toLocaleString()}</p>
                    <button onClick={() => handleBuyPack(pack)} className="btn-accent w-full mt-4">🛒 Comprar</button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {movimientoPacks.filter(p => [4,11].includes(p.id)).map(pack => (
                  <div key={pack.id} className="card-glass p-6 text-center border-2 border-accent transform scale-105">
                    <span className="bg-accent text-primary-dark text-xs font-bold px-3 py-1 rounded-full">⭐ PREMIUM</span>
                    <h4 className="text-xl font-bold text-secondary-light mt-2">💃 {pack.nombre}</h4>
                    <p className="text-secondary-light/80 text-sm mt-2">{pack.descripcion}</p>
                    <p className="text-2xl font-bold text-accent mt-4">💰 ${pack.precio.toLocaleString()}</p>
                    <button onClick={() => handleBuyPack(pack)} className="btn-accent w-full mt-4">🛒 Comprar</button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {nutricionPacks.filter(p => [5,6,7,9].includes(p.id)).map(pack => (
                  <div key={pack.id} className="card-glass p-6 text-center">
                    <h4 className="text-xl font-bold text-secondary-light">🥗 {pack.nombre}</h4>
                    <p className="text-secondary-light/80 text-sm mt-2">{pack.descripcion}</p>
                    <p className="text-2xl font-bold text-accent mt-4">💰 ${pack.precio.toLocaleString()}</p>
                    <button onClick={() => handleBuyPack(pack)} className="btn-accent w-full mt-4">🛒 Comprar</button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {nutricionPacks.filter(p => [8,10].includes(p.id)).map(pack => (
                  <div key={pack.id} className="card-glass p-6 text-center border-2 border-accent transform scale-105">
                    <span className="bg-accent text-primary-dark text-xs font-bold px-3 py-1 rounded-full">⭐ PREMIUM</span>
                    <h4 className="text-xl font-bold text-secondary-light mt-2">🥗 {pack.nombre}</h4>
                    <p className="text-secondary-light/80 text-sm mt-2">{pack.descripcion}</p>
                    <p className="text-2xl font-bold text-accent mt-4">💰 ${pack.precio.toLocaleString()}</p>
                    <button onClick={() => handleBuyPack(pack)} className="btn-accent w-full mt-4">🛒 Comprar</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
 
      {/* Dialog: pack agregado */}
      <ConfirmDialog
        isOpen={!!addedPack}
        title="¡Agregado al carrito!"
        message={addedPack ? `"${addedPack.nombre}" fue agregado a tu carrito por $${addedPack.precio.toLocaleString()}.` : ''}
        confirmLabel="Aceptar"
        variant="info"
        onConfirm={() => setAddedPack(null)}
      />
    </div>
  );
}
 