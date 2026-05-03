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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-glass w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-secondary-light mb-6">🔐 Iniciar Sesión</h1>
        
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-accent hover:bg-accent-dark text-primary-dark font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition mb-6"
        >
          <i className="fab fa-google"></i> Continuar con Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-primary-dark/80 text-secondary-light">O con email</span></div>
        </div>

        <form onSubmit={handleEmailSignIn}>
          <div className="mb-4">
            <label className="block font-bold mb-1 text-secondary-light">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" required />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1 text-secondary-light">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary-light hover:bg-primary text-white py-2 rounded-lg transition disabled:opacity-50">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <button onClick={() => setShowResetModal(true)} className="w-full mt-3 bg-danger hover:bg-danger-dark text-white py-2 rounded-lg transition">
          🔑 Olvidé mi contraseña
        </button>

        <p className="text-center mt-4 text-sm text-secondary-light">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-accent hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>

      {/* Modal recuperar */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card-glass w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-secondary-light mb-4">Recuperar contraseña</h2>
            <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="tu@email.com" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white mb-4" />
            <div className="flex gap-3">
              <button onClick={handleResetPassword} className="flex-1 bg-accent text-primary-dark py-2 rounded hover:bg-accent-dark">Enviar email</button>
              <button onClick={() => setShowResetModal(false)} className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}