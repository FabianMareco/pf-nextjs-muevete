// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-accent border-t-transparent"></div>
        <p className="mt-4 text-muted">Cargando...</p>
      </div>
    </div>
  );
}