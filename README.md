# Lança Aí — guia de publicação

App de controle financeiro pessoal, com autenticação real e dados salvos na nuvem (Supabase). Só você acessa sua conta.

## 1. Criar o banco de dados (Supabase — grátis)

1. Acesse **supabase.com** → crie uma conta → **New Project**.
2. Escolha um nome, senha do banco (guarde essa senha) e a região mais próxima (São Paulo, se disponível).
3. Espere o projeto ser criado (leva ~2 minutos).
4. No menu lateral, vá em **SQL Editor** → **New query**.
5. Abra o arquivo `supabase-schema.sql` (está nesta pasta), copie tudo, cole no editor e clique em **Run**.
6. Vá em **Project Settings → API**. Copie:
   - **Project URL**
   - **anon public key**

## 2. Configurar o projeto

1. Extraia esta pasta no seu computador.
2. Renomeie `.env.example` para `.env`.
3. Cole a URL e a chave que você copiou:
   ```
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-aqui
   ```

## 3. Testar localmente (opcional, mas recomendado)

Precisa ter o [Node.js](https://nodejs.org) instalado (versão 18 ou mais recente).

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Crie sua conta e teste.

## 4. Publicar de graça (Vercel)

1. Crie uma conta em **vercel.com** (pode entrar com GitHub).
2. Suba esta pasta para um repositório novo no **GitHub** (crie o repositório vazio, depois: `git init`, `git add .`, `git commit -m "talao"`, `git remote add origin SEU-LINK`, `git push -u origin main`).
3. Na Vercel: **Add New → Project** → selecione o repositório.
4. Em **Environment Variables**, adicione as mesmas duas variáveis do `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Clique em **Deploy**. Em ~1 minuto você tem um link tipo `lanca-ai-seunome.vercel.app` — só seu.

## 5. Instalar como app no celular

1. Abra o link no navegador do celular (Chrome ou Safari).
2. Toque no menu → **Adicionar à tela inicial** (Android) ou **Adicionar à Tela de Início** (iPhone, no botão de compartilhar).
3. O Talão passa a abrir como um app normal, com ícone próprio.

## Segurança

- A autenticação é feita pelo Supabase (Auth real, senha nunca fica em texto puro).
- O RLS (Row Level Security) do banco garante que cada conta só enxerga seus próprios dados — mesmo que alguém tivesse a chave `anon`, não conseguiria ler dados de outra conta.
- Ninguém acessa seu link a menos que você o compartilhe — e mesmo assim precisaria criar conta própria (os dados de cada login são isolados).
