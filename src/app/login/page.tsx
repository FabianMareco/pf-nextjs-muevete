// src/app/login/page.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Inicio de sesión exitoso');
      router.push('/');
    } catch (error) {
      toast.error('Error al iniciar sesión con Google');
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Completa todos los campos');
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast.success('Bienvenido/a');
      router.push('/');
    } catch (error: any) {
      toast.error(error.code === 'auth/invalid-credential' ? 'Email o contraseña incorrectos' : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) return toast.error('Ingresa tu email');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success('Email de recuperación enviado');
      setShowResetModal(false);
      setResetEmail('');
    } catch (error: any) {
      toast.error(error.code === 'auth/user-not-found' ? 'No existe cuenta con ese email' : 'Error al enviar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-ink mb-6">Iniciar sesión</h1>

        <button
          onClick={handleGoogleSignIn}
          className="w-full btn-primary flex items-center justify-center gap-2 mb-6"
        >
          <i className="fab fa-google"></i> Continuar con Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-muted">O con email</span></div>
        </div>

        <form onSubmit={handleEmailSignIn}>
          <div className="mb-4">
            <label className="block font-bold mb-1 text-ink">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1 text-ink">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-accent disabled:opacity-50">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <button onClick={() => setShowResetModal(true)} className="w-full mt-3 btn-outline">
          Olvidé mi contraseña
        </button>

        <p className="text-center mt-4 text-sm text-muted">
          ¿No tenés cuenta?{' '}
          <Link href="/register" className="text-accent-deep font-semibold hover:underline">
            Registrate acá
          </Link>
        </p>
      </div>

      {/* Modal recuperar */}
      {showResetModal && (
        <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-6" style={{ transformOrigin: 'center' }}>
            <h2 className="text-xl font-bold text-ink mb-4">Recuperar contraseña</h2>
            <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="tu@email.com" className="input mb-4" />
            <div className="flex gap-3">
              <button onClick={handleResetPassword} className="flex-1 btn-accent">Enviar email</button>
              <button onClick={() => setShowResetModal(false)} className="flex-1 border-2 border-neutral text-muted font-bold py-2.5 rounded-control hover:bg-neutral transition active:scale-[0.97]">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}