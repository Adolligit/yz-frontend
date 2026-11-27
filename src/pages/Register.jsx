import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';

export default function Register() {
  const { register } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;

    // Conferências simples aqui; o servidor repete todas elas (é ele quem manda de verdade)
    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (senha !== confirmacao) {
      setErro('As senhas não são iguais.');
      return;
    }

    setErro('');
    setEnviando(true);
    try {
      // Cadastro feito = já entra logado (o AuthContext guarda o token)
      await register(nome.trim(), email.trim(), senha);
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const incompleto = !nome.trim() || !email.trim() || !senha || !confirmacao;

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Cadastre-se para treinar com a Yzai sem limites."
      footer={
        <>
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold text-[#20c997] hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field
          label="Nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          maxLength={100}
          autoFocus
          required
        />

        <Field
          label="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="voce@email.com"
          maxLength={100}
          required
        />

        <Field
          label="Senha"
          type="password"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="new-password"
          placeholder="Crie uma senha"
          hint="Mínimo de 8 caracteres."
          required
        />

        <Field
          label="Confirmar senha"
          type="password"
          name="confirmacao"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          autoComplete="new-password"
          placeholder="Repita a senha"
          required
        />

        {erro && (
          <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {erro}
          </div>
        )}

        <button
          type="submit"
          disabled={enviando || incompleto}
          className="w-full rounded-xl bg-[#20c997] px-4 py-3.5 font-bold text-black transition-colors hover:bg-[#19a57b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? 'Criando conta...' : 'Criar conta grátis'}
        </button>
      </form>
    </AuthLayout>
  );
}
