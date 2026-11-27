// Tudo o que fala com o backend passa por aqui, e é aqui que o token do login fica guardado.

// Endereço do backend. Em desenvolvimento usa o localhost; em produção basta
// definir VITE_API_URL (ex.: no arquivo .env.production do front).
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const TOKEN_KEY = 'yz-token';

// Plano B: só é usado se o navegador bloquear o localStorage (o token vale até fechar a aba).
let tokenEmMemoria = null;

export function getToken() {
  try {
    const salvo = localStorage.getItem(TOKEN_KEY);
    if (salvo) return salvo;
  } catch {
    /* localStorage indisponível */
  }
  return tokenEmMemoria;
}

export function saveToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    tokenEmMemoria = token;
  }
}

export function clearToken() {
  tokenEmMemoria = null;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* nada a fazer */
  }
}

// Faz a chamada, anexa o token (se houver) e devolve o JSON.
// Em caso de erro, lança um Error com:
//   - message: texto pronto para mostrar ao usuário
//   - status:  código HTTP (401, 409...) ou 0 quando não foi possível falar com o servidor
export async function api(path, { method = 'GET', body } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let resposta;
  try {
    resposta = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    const erro = new Error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    erro.status = 0;
    throw erro;
  }

  let dados = null;
  try {
    dados = await resposta.json();
  } catch {
    /* resposta sem JSON */
  }

  if (!resposta.ok) {
    const erro = new Error(dados?.error || 'Algo deu errado. Tente novamente.');
    erro.status = resposta.status;
    throw erro;
  }

  return dados;
}
