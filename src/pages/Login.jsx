import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;

    setErro('');
    setEnviando(true);
    try {
      // Se der certo, o AuthContext guarda o token e a PublicOnlyRoute leva para o chat
      await login(email.trim(), senha);
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <AuthLayout
      title="Entrar"
      subtitle="Bem-vindo de volta! Entre para continuar seu treino com a Yzai."
      footer={
        <>
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="font-semibold text-[#20c997] hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field
          label="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="voce@email.com"
          autoFocus
          required
        />

        <Field
          label="Senha"
          type="password"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          placeholder="Sua senha"
          required
        />

        {erro && (
          <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {erro}
          </div>
        )}

        <button
          type="submit"
          disabled={enviando || !email.trim() || !senha}
          className="w-full rounded-xl bg-[#20c997] px-4 py-3.5 font-bold text-black transition-colors hover:bg-[#19a57b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </AuthLayout>
  );
}
