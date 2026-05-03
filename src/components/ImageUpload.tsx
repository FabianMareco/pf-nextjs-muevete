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
      <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
      {uploading && <p className="text-sm text-gray-500 mt-1">Subiendo...</p>}
    </div>
  );
}