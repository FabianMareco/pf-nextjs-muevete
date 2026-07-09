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
    ? 'bg-success hover:bg-success-dark text-white'
    : 'bg-danger hover:bg-danger-dark text-white';

  const iconStyles = isInfo ? 'text-success' : 'text-danger';
  const icon = isInfo ? 'fa-circle-check' : 'fa-trash-can';

  return (
    <div className="fixed inset-0 bg-ink/70 flex items-center justify-center z-[100] p-4">
      <div className="card max-w-sm w-full p-6" style={{ transformOrigin: 'center' }}>
        <div className={`text-3xl text-center mb-3 ${iconStyles}`}>
          <i className={`fas ${icon}`} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-ink text-center mb-2">{title}</h3>
        <p className="text-muted text-center mb-6">{message}</p>
        <div className={`flex gap-3 ${isInfo ? 'justify-center' : 'justify-end'}`}>
          {!isInfo && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-control border-2 border-neutral text-muted font-semibold hover:bg-neutral transition active:scale-[0.97]"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-6 py-2 rounded-control font-semibold transition active:scale-[0.97] ${confirmStyles}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
 