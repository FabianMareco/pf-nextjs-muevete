import Image from 'next/image';

const Copy = ({ dark = true }: { dark?: boolean }) => (
  <>
    <p className={`mt-7 max-w-md text-lg leading-relaxed ${dark ? 'text-paper/70' : 'text-muted'}`}>
      Danza, yoga y nutrición guiada, en vivo y grabadas. Para cualquier nivel, desde donde estés.
    </p>
    <div className="mt-9 flex flex-wrap gap-3">
      <a className="btn-accent btn-lg">Ver clases <i className="fas fa-arrow-down text-sm" /></a>
      <a className={dark ? 'btn-ghost-dark btn-lg' : 'btn-outline btn-lg'}>Ver packs</a>
    </div>
  </>
);

const Title = ({ dark = true, size = 'text-[clamp(3rem,8vw,6.5rem)]' }) => (
  <h1 className={`font-display font-extrabold ${size} leading-[0.95] tracking-[-0.04em] ${dark ? 'text-paper' : 'text-ink'}`}>
    <span className="block">Movete hoy.</span>
    <span className="block text-accent">A tu ritmo.</span>
  </h1>
);

/* A: formas orgánicas que respiran */
function VariantA() {
  return (
    <section className="bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-0 grid lg:grid-cols-12 gap-12 items-center lg:min-h-[calc(100dvh-72px)]">
        <div className="lg:col-span-6"><Title /><Copy /></div>
        <div className="lg:col-span-6 relative h-[460px] sm:h-[560px] lg:h-[640px]">
          <div className="blob blob-a absolute right-[2%] top-[4%] w-[78%] h-[86%] bg-accent" />
          <div className="blob blob-b absolute right-[8%] top-[0%] w-[72%] h-[84%] overflow-hidden">
            <Image src="/multimedia/C.jpg" alt="" fill className="object-cover object-[50%_30%]" sizes="40vw" />
          </div>
          <div className="blob blob-c absolute left-0 bottom-0 w-[44%] h-[46%] overflow-hidden ring-[10px] ring-ink">
            <Image src="/multimedia/H.jpg" alt="" fill className="object-cover" sizes="25vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* B: arcos escalonados, como bailarines en fila */
function VariantB() {
  const arcs = [
    { src: 'clases8.png', h: 'h-[78%]', d: '0s', pos: 'object-[50%_20%]' },
    { src: 'C.jpg', h: 'h-[96%]', d: '-2s', pos: 'object-[50%_30%]' },
    { src: 'B2.jpg', h: 'h-[70%]', d: '-4s', pos: 'object-center' },
  ];
  return (
    <section className="bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-0 grid lg:grid-cols-12 gap-12 items-center lg:min-h-[calc(100dvh-72px)]">
        <div className="lg:col-span-5"><Title size="text-[clamp(3rem,6.2vw,5.6rem)]" /><Copy /></div>
        <div className="lg:col-span-7 relative h-[440px] sm:h-[560px] lg:h-[640px] flex items-end justify-center gap-3 sm:gap-5">
          <div className="absolute left-1/2 top-[6%] -translate-x-1/2 w-[46%] aspect-square rounded-full bg-accent" />
          {arcs.map((a) => (
            <div key={a.src} className={`float relative w-[31%] ${a.h} rounded-t-full rounded-b-[28px] overflow-hidden`} style={{ animationDelay: a.d }}>
              <Image src={`/multimedia/${a.src}`} alt="" fill className={`object-cover ${a.pos}`} sizes="22vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* C: fotos dentro del título */
function VariantC() {
  const pill = (src: string, pos = 'object-center') => (
    <span className="relative inline-block align-middle w-[1.9em] h-[0.82em] rounded-full overflow-hidden mx-[0.12em] -mt-[0.12em]">
      <Image src={`/multimedia/${src}`} alt="" fill className={`object-cover ${pos}`} sizes="20vw" />
    </span>
  );
  return (
    <section className="bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-20 lg:min-h-[calc(100dvh-72px)] flex flex-col justify-center">
        <h1 className="font-display font-extrabold text-paper text-[clamp(2.6rem,8.6vw,8.4rem)] whitespace-nowrap leading-[0.92] tracking-[-0.05em]">
          <span className="block">Movete {pill('C.jpg', 'object-[50%_25%]')} hoy.</span>
          <span className="block text-accent">A tu {pill('clases8.png', 'object-[50%_25%]')} ritmo.</span>
        </h1>
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6"><Copy /></div>
          <div className="hidden lg:block lg:col-span-6 relative h-56">
            <div className="absolute right-0 bottom-0 w-[62%] h-full rounded-[999px] overflow-hidden">
              <Image src="/multimedia/H.jpg" alt="" fill className="object-cover object-[50%_35%]" sizes="30vw" />
            </div>
            <div className="absolute right-[56%] bottom-6 w-28 h-28 rounded-full overflow-hidden ring-8 ring-ink">
              <Image src="/multimedia/clases1.png" alt="" fill className="object-cover" sizes="10vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Preview() {
  return (
    <>
      <style>{`
        .blob { border-radius: 62% 38% 46% 54% / 58% 44% 56% 42%; animation: morph 14s ease-in-out infinite; }
        .blob-a { animation-duration: 18s; animation-direction: reverse; transform: rotate(8deg); }
        .blob-c { border-radius: 44% 56% 62% 38% / 50% 62% 38% 50%; animation-duration: 11s; }
        @keyframes morph {
          0%,100% { border-radius: 62% 38% 46% 54% / 58% 44% 56% 42%; }
          33% { border-radius: 40% 60% 58% 42% / 44% 58% 42% 56%; }
          66% { border-radius: 54% 46% 36% 64% / 62% 38% 62% 38%; }
        }
        .float { animation: float 7s ease-in-out infinite; }
        @keyframes float { 50% { transform: translateY(-14px); } }
      `}</style>
      <div id="A"><VariantA /></div>
      <div id="B"><VariantB /></div>
      <div id="C"><VariantC /></div>
    </>
  );
}
