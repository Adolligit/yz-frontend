import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, getToken, saveToken, clearToken } from '../Api.js';

// Guarda "quem está logado" e compartilha isso com todas as páginas do app.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Se há token salvo, ainda precisamos confirmar com o servidor antes de decidir a tela
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  // Ao abrir (ou recarregar) o app: se existe token, pergunta ao servidor quem é o usuário.
  // É isso que mantém a pessoa logada sem pedir a senha de novo.
  useEffect(() => {
    if (!getToken()) return undefined;

    let cancelado = false;
    api('/api/auth/me')
      .then((dados) => {
        if (!cancelado) setUser(dados.usuario);
      })
      .catch((erro) => {
        // Token vencido ou inválido: descarta. Se foi só o servidor fora do ar, mantém o token.
        if (erro.status === 401) clearToken();
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const login = useCallback(async (email, senha) => {
    const dados = await api('/api/auth/login', { method: 'POST', body: { email, senha } });
    saveToken(dados.token);
    setUser(dados.usuario);
  }, []);

  const register = useCallback(async (nome, email, senha) => {
    const dados = await api('/api/auth/register', { method: 'POST', body: { nome, email, senha } });
    saveToken(dados.token);
    setUser(dados.usuario);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa ser usado dentro de <AuthProvider>.');
  return ctx;
}
