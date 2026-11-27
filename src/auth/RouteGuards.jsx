import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function TelaCarregando() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#0b1120]">
      <div
        role="status"
        aria-label="Carregando"
        className="h-8 w-8 animate-spin rounded-full border-2 border-[#20c997] border-t-transparent"
      />
    </div>
  );
}

// Páginas que exigem login (ex.: o chat). Sem login, vai para /login
// e, depois de entrar, volta para a página que a pessoa tentou abrir.
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <TelaCarregando />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

// Páginas de login e cadastro: quem já está logado não precisa vê-las.
export function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <TelaCarregando />;
  if (user) return <Navigate to={location.state?.from?.pathname ?? '/'} replace />;
  return children;
}
