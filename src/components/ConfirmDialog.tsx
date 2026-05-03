'use client';
 
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'danger' | 'info';
}
 
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmDialogProps) {
  if (!isOpen) return null;
 
  const isInfo = variant === 'info';
 
  const confirmStyles = isInfo
    ? 'bg-green-600 hover:bg-green-700 text-white'
    : 'bg-red-600 hover:bg-red-700 text-white';
 
  const iconStyles = isInfo ? 'text-green-500' : 'text-red-500';
  const icon = isInfo ? '✅' : '🗑️';
 
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className={`text-3xl text-center mb-3 ${iconStyles}`}>{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{message}</p>
        <div className={`flex gap-3 ${isInfo ? 'justify-center' : 'justify-end'}`}>
          {!isInfo && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-100 transition"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-6 py-2 rounded-lg font-semibold transition ${confirmStyles}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
 