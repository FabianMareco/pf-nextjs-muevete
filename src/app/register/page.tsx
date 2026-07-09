'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { registerWithEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Completa todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      toast.success('Registro exitoso');
      router.push('/');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Este email ya está registrado');
      } else {
        toast.error('Error al registrarse');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-4" style={{ backgroundImage: "linear-gradient(rgba(20,17,15,0.55), rgba(20,17,15,0.55)), url('/multimedia/C.jpg')" }}>
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-ink mb-6">Crear cuenta</h1>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block font-bold mb-1 text-ink">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1 text-ink">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-bold mb-1 text-ink">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-accent disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-muted">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-accent-deep font-semibold hover:underline">
            Iniciá sesión acá
          </Link>
        </p>
      </div>
    </div>
  );
}