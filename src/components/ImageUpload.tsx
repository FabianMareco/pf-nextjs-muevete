'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ImageUpload({ onImageUploaded }: { onImageUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        onImageUploaded(data.url);
        toast.success('Imagen subida');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Error al subir');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="text-sm text-ink file:mr-3 file:py-2 file:px-4 file:rounded-control file:border-0 file:bg-ink file:text-paper file:font-semibold hover:file:bg-surface file:transition file:cursor-pointer"
      />
      {uploading && <p className="text-sm text-muted mt-1 flex items-center gap-1.5"><i className="fas fa-spinner fa-spin" aria-hidden="true" />Subiendo...</p>}
    </div>
  );
}