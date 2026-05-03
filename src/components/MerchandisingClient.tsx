'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
 
const icons: Record<string, string> = {
  tazas: '☕',
  remeras: '👕',
  bolsos: '👜',
  botellas: '💧',
  zapatillas: '👟',
  equipamiento: '🏋️',
};
 
const names: Record<string, string> = {
  tazas: 'Tazas',
  remeras: 'Remeras Oversize',
  bolsos: 'Bolsos',
  botellas: 'Hidratación',
  zapatillas: 'Zapatillas de Danza',
  equipamiento: 'Equipamiento',
};
 
const subcategoryOrder = ['tazas', 'remeras', 'bolsos', 'botellas', 'zapatillas', 'equipamiento'];
 
export default function MerchandisingClient({ products }: { products: any[] }) {
  const [activeFilters, setActiveFilters] = useState<string[]>(subcategoryOrder);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const toggleFilter = (sub: string) => {
    setActiveFilters(prev =>
      prev.includes(sub)
        ? prev.length === 1 ? prev : prev.filter(s => s !== sub)
        : [...prev, sub]
    );
  };
 
  const toggleAll = () => {
    setActiveFilters(
      activeFilters.length === subcategoryOrder.length ? [subcategoryOrder[0]] : subcategoryOrder
    );
  };
 
  const order = [
    'TAZA 1','TAZA 2','TAZA 3','TAZA 4','TAZA 5','TAZA 6','TAZA 7','TAZA 8','TAZA 9',
    'REMERA 1','REMERA 2','REMERA 3','REMERA 4','REMERA 5','REMERA 6','REMERA 7','REMERA 8','REMERA 9',
    'BOLSO 1','BOLSO 2','BOLSO 3','BOLSO 4','BOLSO 5','BOLSO 6','BOLSO 7','BOLSO 8','BOLSO 9',
    'BOTELLA 1','BOTELLA 2','BOTELLA 3','BOTELLA 4','BOTELLA 5','BOTELLA 6','BOTELLA 7','BOTELLA 8','BOTELLA 9',
    'ZAPATILLA BALLET','ZAPATILLA JAZZ BADANA','ZAPATILLA TAP','ZAPATILLA JAZZ','ZAPATILLA JAZZ 2','ZAPATILLA BALLROOM','ZAPATILLA HEELS PINK','ZAPATILLA HEELS DARK','ZAPATILLA HEEL BUCANERA',
    'PESAS 2 KG','MAT YOGA','LADRILLO YOGA','THERABANDS','FOAM ROLLER','PELOTAS DE TENIS X3','PELOTA YOGA','CINTA YOGA','RODILLERAS',
  ];
 
  const sorted = [...products].sort((a, b) => {
    const ia = order.indexOf(a.name);
    const ib = order.indexOf(b.name);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
 
  const grouped: Record<string, any[]> = {};
  sorted.forEach(p => {
    if (!grouped[p.subcategory]) grouped[p.subcategory] = [];
    grouped[p.subcategory].push(p);
  });
 
  const visibleSubs = subcategoryOrder.filter(sub => activeFilters.includes(sub) && grouped[sub]);
  const allSelected = activeFilters.length === subcategoryOrder.length;
 
  return (
    <div className="flex flex-col lg:flex-row gap-8">
 
      {/* Sidebar desktop */}
      <aside className="hidden lg:block w-52 flex-shrink-0">
        <div className="card-glass p-4 sticky top-24">
          <h3 className="text-secondary-light font-bold mb-4 text-sm uppercase tracking-wide">Categorías</h3>
 
          {/* Todos */}
          <label className="flex items-center gap-2 mb-3 cursor-pointer text-secondary-light text-sm hover:text-white transition">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="accent-red-500 w-4 h-4"
            />
            <span className="font-semibold">Todas</span>
          </label>
 
          <div className="border-t border-white/10 mb-3" />
 
          {subcategoryOrder.map(sub => (
            <label key={sub} className="flex items-center gap-2 mb-2 cursor-pointer text-secondary-light text-sm hover:text-white transition">
              <input
                type="checkbox"
                checked={activeFilters.includes(sub)}
                onChange={() => toggleFilter(sub)}
                className="accent-red-500 w-4 h-4"
              />
              <span>{icons[sub]} {names[sub]}</span>
            </label>
          ))}
 
          <div className="border-t border-white/10 mt-3 pt-3">
            <p className="text-secondary-light/50 text-xs">
              {sorted.filter(p => activeFilters.includes(p.subcategory)).length} productos
            </p>
          </div>
        </div>
      </aside>
 
      {/* Botón filtros mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full card-glass p-3 text-secondary-light text-sm font-bold flex justify-between items-center"
        >
          <span>🔽 Filtrar por categoría</span>
          <span className="text-xs text-secondary-light/60">{activeFilters.length} seleccionadas</span>
        </button>
 
        {sidebarOpen && (
          <div className="card-glass p-4 mt-2">
            <label className="flex items-center gap-2 mb-3 cursor-pointer text-secondary-light text-sm">
              <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-red-500 w-4 h-4" />
              <span className="font-semibold">Todas</span>
            </label>
            <div className="border-t border-white/10 mb-3" />
            <div className="grid grid-cols-2 gap-2">
              {subcategoryOrder.map(sub => (
                <label key={sub} className="flex items-center gap-2 cursor-pointer text-secondary-light text-sm">
                  <input
                    type="checkbox"
                    checked={activeFilters.includes(sub)}
                    onChange={() => toggleFilter(sub)}
                    className="accent-red-500 w-4 h-4"
                  />
                  <span>{icons[sub]} {names[sub]}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
 
      {/* Productos */}
      <div className="flex-1">
        {visibleSubs.length === 0 && (
          <p className="text-center text-secondary-light py-12">No hay productos en las categorías seleccionadas.</p>
        )}
 
        {visibleSubs.map(sub => (
          <div key={sub} className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 pb-2 border-b-4 border-red-500 inline-block w-full">
              {icons[sub]} {names[sub]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[sub].map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}