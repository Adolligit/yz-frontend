import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from './auth/RouteGuards';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

// Mapa de páginas do app (SPA: a página não recarrega, só troca o conteúdo).
// Páginas futuras (recuperar senha, retorno do login com Google...) entram aqui.
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/cadastro" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      <Route path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      {/* qualquer endereço desconhecido volta para o início */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
