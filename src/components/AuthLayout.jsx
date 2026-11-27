import React from 'react';

// Moldura comum às telas de login e cadastro: marca no topo, cartão no centro, link no rodapé.
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#0b1120] px-4 py-10 font-sans text-gray-100">
      {/* brilho verde bem suave ao fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#20c997]/10 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#20c997]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45" aria-hidden="true">
              <line x1="12" y1="4" x2="12" y2="20"></line>
              <line x1="8" y1="4" x2="16" y2="4"></line>
              <line x1="8" y1="20" x2="16" y2="20"></line>
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-wide text-white">Yz</span>
        </div>

        <div className="rounded-[1.25rem] border border-gray-800 bg-[#131b2c] p-6 shadow-2xl sm:p-8">
          <h1 className="text-[1.5rem] font-bold text-white">{title}</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">{footer}</p>
      </div>
    </div>
  );
}
