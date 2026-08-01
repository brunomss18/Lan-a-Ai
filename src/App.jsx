import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

const DEFAULT_CATEGORY_RULES = [
  // Supermercados e mercearias
  { keyword: "extra", category: "Alimentação" },
  { keyword: "carrefour", category: "Alimentação" },
  { keyword: "pão de açúcar", category: "Alimentação" },
  { keyword: "pao de acucar", category: "Alimentação" },
  { keyword: "assai", category: "Alimentação" },
  { keyword: "assaí", category: "Alimentação" },
  { keyword: "atacadão", category: "Alimentação" },
  { keyword: "atacadao", category: "Alimentação" },
  { keyword: "big supermercado", category: "Alimentação" },
  { keyword: "dia supermercado", category: "Alimentação" },
  { keyword: "comper", category: "Alimentação" },
  { keyword: "angeloni", category: "Alimentação" },
  { keyword: "savegnago", category: "Alimentação" },
  { keyword: "muffato", category: "Alimentação" },
  { keyword: "condor supermercado", category: "Alimentação" },
  { keyword: "bretas", category: "Alimentação" },
  { keyword: "zaffari", category: "Alimentação" },
  { keyword: "coop", category: "Alimentação" },
  { keyword: "sonda supermercados", category: "Alimentação" },
  { keyword: "bistek", category: "Alimentação" },
  { keyword: "giassi", category: "Alimentação" },
  { keyword: "imperatriz supermercado", category: "Alimentação" },
  { keyword: "prezunic", category: "Alimentação" },
  { keyword: "guanabara", category: "Alimentação" },
  { keyword: "mundial supermercado", category: "Alimentação" },
  { keyword: "hortifruti", category: "Alimentação" },
  { keyword: "sacolão", category: "Alimentação" },
  { keyword: "sacolao", category: "Alimentação" },
  { keyword: "supermercado", category: "Alimentação" },
  { keyword: "mercado", category: "Alimentação" },
  { keyword: "mercadinho", category: "Alimentação" },
  { keyword: "padaria", category: "Alimentação" },
  { keyword: "açougue", category: "Alimentação" },
  { keyword: "acougue", category: "Alimentação" },
  { keyword: "quitanda", category: "Alimentação" },
  { keyword: "feira", category: "Alimentação" },
  // Restaurantes e delivery
  { keyword: "ifood", category: "Alimentação" },
  { keyword: "rappi", category: "Alimentação" },
  { keyword: "uber eats", category: "Alimentação" },
  { keyword: "restaurante", category: "Alimentação" },
  { keyword: "lanchonete", category: "Alimentação" },
  { keyword: "mcdonald", category: "Alimentação" },
  { keyword: "burger king", category: "Alimentação" },
  { keyword: "habib's", category: "Alimentação" },
  { keyword: "habibs", category: "Alimentação" },
  { keyword: "subway", category: "Alimentação" },
  { keyword: "domino's", category: "Alimentação" },
  { keyword: "dominos", category: "Alimentação" },
  { keyword: "pizza hut", category: "Alimentação" },
  { keyword: "starbucks", category: "Alimentação" },
  { keyword: "cafeteria", category: "Alimentação" },
  { keyword: "padoca", category: "Alimentação" },
  // Transporte
  { keyword: "posto", category: "Transporte" },
  { keyword: "shell", category: "Transporte" },
  { keyword: "ipiranga", category: "Transporte" },
  { keyword: "petrobras", category: "Transporte" },
  { keyword: "br mania", category: "Transporte" },
  { keyword: "ale combustíveis", category: "Transporte" },
  { keyword: "raízen", category: "Transporte" },
  { keyword: "uber", category: "Transporte" },
  { keyword: "99", category: "Transporte" },
  { keyword: "indriver", category: "Transporte" },
  { keyword: "cabify", category: "Transporte" },
  { keyword: "estacionamento", category: "Transporte" },
  { keyword: "pedágio", category: "Transporte" },
  { keyword: "pedagio", category: "Transporte" },
  { keyword: "sem parar", category: "Transporte" },
  { keyword: "metrô", category: "Transporte" },
  { keyword: "metro", category: "Transporte" },
  { keyword: "bilhete único", category: "Transporte" },
  { keyword: "oficina mecânica", category: "Transporte" },
  { keyword: "borracharia", category: "Transporte" },
  // Saúde
  { keyword: "farmácia", category: "Saúde" },
  { keyword: "farmacia", category: "Saúde" },
  { keyword: "drogaria", category: "Saúde" },
  { keyword: "droga raia", category: "Saúde" },
  { keyword: "drogaraia", category: "Saúde" },
  { keyword: "drogasil", category: "Saúde" },
  { keyword: "pacheco", category: "Saúde" },
  { keyword: "extrafarma", category: "Saúde" },
  { keyword: "pague menos", category: "Saúde" },
  { keyword: "farmácias são paulo", category: "Saúde" },
  { keyword: "ultrafarma", category: "Saúde" },
  { keyword: "panvel", category: "Saúde" },
  { keyword: "nissei", category: "Saúde" },
  { keyword: "venâncio", category: "Saúde" },
  { keyword: "venancio", category: "Saúde" },
  { keyword: "academia", category: "Saúde" },
  { keyword: "smartfit", category: "Saúde" },
  { keyword: "smart fit", category: "Saúde" },
  { keyword: "clínica", category: "Saúde" },
  { keyword: "clinica", category: "Saúde" },
  { keyword: "hospital", category: "Saúde" },
  { keyword: "laboratório", category: "Saúde" },
  { keyword: "laboratorio", category: "Saúde" },
  { keyword: "dentista", category: "Saúde" },
  { keyword: "plano de saúde", category: "Saúde" },
  { keyword: "unimed", category: "Saúde" },
  { keyword: "amil", category: "Saúde" },
  { keyword: "hapvida", category: "Saúde" },
  { keyword: "notredame", category: "Saúde" },
  { keyword: "sulamerica saude", category: "Saúde" },
  // Assinaturas
  { keyword: "netflix", category: "Assinaturas" },
  { keyword: "spotify", category: "Assinaturas" },
  { keyword: "amazon prime", category: "Assinaturas" },
  { keyword: "disney+", category: "Assinaturas" },
  { keyword: "disney plus", category: "Assinaturas" },
  { keyword: "hbo max", category: "Assinaturas" },
  { keyword: "max streaming", category: "Assinaturas" },
  { keyword: "globoplay", category: "Assinaturas" },
  { keyword: "deezer", category: "Assinaturas" },
  { keyword: "youtube premium", category: "Assinaturas" },
  { keyword: "game pass", category: "Assinaturas" },
  { keyword: "playstation plus", category: "Assinaturas" },
  { keyword: "apple music", category: "Assinaturas" },
  { keyword: "apple tv", category: "Assinaturas" },
  { keyword: "icloud", category: "Assinaturas" },
  { keyword: "google one", category: "Assinaturas" },
  // Compras / marketplaces
  { keyword: "amazon", category: "Compras" },
  { keyword: "shopee", category: "Compras" },
  { keyword: "shein", category: "Compras" },
  { keyword: "aliexpress", category: "Compras" },
  { keyword: "mercado livre", category: "Compras" },
  { keyword: "mercadolivre", category: "Compras" },
  { keyword: "magazine luiza", category: "Compras" },
  { keyword: "magalu", category: "Compras" },
  { keyword: "americanas", category: "Compras" },
  { keyword: "casas bahia", category: "Compras" },
  { keyword: "ponto frio", category: "Compras" },
  { keyword: "submarino", category: "Compras" },
  { keyword: "netshoes", category: "Compras" },
  { keyword: "centauro", category: "Compras" },
  { keyword: "kabum", category: "Compras" },
  { keyword: "fast shop", category: "Compras" },
  { keyword: "renner", category: "Vestuário" },
  { keyword: "c&a", category: "Vestuário" },
  { keyword: "riachuelo", category: "Vestuário" },
  { keyword: "zara", category: "Vestuário" },
  { keyword: "marisa", category: "Vestuário" },
  { keyword: "hering", category: "Vestuário" },
  { keyword: "shopping", category: "Vestuário" },
  { keyword: "sapataria", category: "Vestuário" },
  // Moradia
  { keyword: "aluguel", category: "Moradia" },
  { keyword: "condomínio", category: "Moradia" },
  { keyword: "condominio", category: "Moradia" },
  { keyword: "iptu", category: "Moradia" },
  { keyword: "leroy merlin", category: "Moradia" },
  { keyword: "telhanorte", category: "Moradia" },
  { keyword: "c&c casa", category: "Moradia" },
  { keyword: "tok&stok", category: "Moradia" },
  // Contas
  { keyword: "luz", category: "Contas" },
  { keyword: "energia", category: "Contas" },
  { keyword: "sabesp", category: "Contas" },
  { keyword: "água", category: "Contas" },
  { keyword: "agua", category: "Contas" },
  { keyword: "internet", category: "Contas" },
  { keyword: "celular", category: "Contas" },
  { keyword: "cemig", category: "Contas" },
  { keyword: "light", category: "Contas" },
  { keyword: "enel", category: "Contas" },
  { keyword: "cpfl", category: "Contas" },
  { keyword: "copel", category: "Contas" },
  { keyword: "comgás", category: "Contas" },
  { keyword: "comgas", category: "Contas" },
  { keyword: "vivo", category: "Contas" },
  { keyword: "claro", category: "Contas" },
  { keyword: "tim", category: "Contas" },
  { keyword: "oi telecom", category: "Contas" },
  { keyword: "sky", category: "Contas" },
  // Educação
  { keyword: "escola", category: "Educação" },
  { keyword: "faculdade", category: "Educação" },
  { keyword: "curso", category: "Educação" },
  { keyword: "udemy", category: "Educação" },
  { keyword: "alura", category: "Educação" },
  { keyword: "mensalidade escolar", category: "Educação" },
  // Pets
  { keyword: "petz", category: "Pets" },
  { keyword: "cobasi", category: "Pets" },
  { keyword: "petlove", category: "Pets" },
  { keyword: "pet shop", category: "Pets" },
  { keyword: "petshop", category: "Pets" },
  { keyword: "veterinário", category: "Pets" },
  { keyword: "veterinario", category: "Pets" },
];

const CATEGORY_COLORS = {
  Alimentação: "#E3B341", Transporte: "#5FAF9F", Saúde: "#E1685A", Assinaturas: "#9C8CD9",
  Compras: "#D98E4A", Moradia: "#6FBF73", Contas: "#7FA6D9", Vestuário: "#D97AB0",
  Educação: "#7AC0D9", Pets: "#B08968", Outros: "#8A8D97",
};
const CATEGORY_ICONS = {
  Alimentação: "🍽️", Transporte: "🚗", Saúde: "💊", Assinaturas: "📱",
  Compras: "🛍️", Moradia: "🏠", Contas: "💡", Vestuário: "👕",
  Educação: "📚", Pets: "🐾", Outros: "📎",
};
const MONTH_NAMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function uid() { return Math.random().toString(36).slice(2, 10); }
function todayStr() { return new Date().toISOString().slice(0, 10); }
function fmtMoney(v) { if (v == null || isNaN(v)) return "—"; return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
function fmtDateBR(dstr) { if (!dstr) return "—"; const [y, m, d] = dstr.split("-"); return `${d}/${m}/${y}`; }
function catIcon(cat) { return CATEGORY_ICONS[cat] || "📎"; }
function catColor(cat) { return CATEGORY_COLORS[cat] || CATEGORY_COLORS.Outros; }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }

function parseMessage(text, cards, categoryRules, defaultCard) {
  const lower = text.toLowerCase();
  let amount = null;
  let m = lower.match(/r\$\s*([\d]+(?:[.,]\d{1,2})?)/);
  if (!m) m = lower.match(/(\d+(?:[.,]\d{1,2})?)\s*reais/);
  if (m) amount = parseFloat(m[1].replace(",", "."));

  let date = todayStr();
  if (/\bontem\b/.test(lower)) {
    const d = new Date(); d.setDate(d.getDate() - 1); date = d.toISOString().slice(0, 10);
  } else {
    const dm = lower.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
    if (dm) {
      const day = parseInt(dm[1], 10); const month = parseInt(dm[2], 10) - 1;
      const year = dm[3] ? (dm[3].length === 2 ? 2000 + parseInt(dm[3], 10) : parseInt(dm[3], 10)) : new Date().getFullYear();
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) date = d.toISOString().slice(0, 10);
    }
  }

  let cardId = null, cardName = null;
  for (const c of cards) { if (lower.includes(c.name.toLowerCase())) { cardId = c.id; cardName = c.name; break; } }
  if (!cardName) { const cm = lower.match(/cart[aã]o\s+([a-zà-ú0-9]+)/); if (cm) cardName = cm[1].toUpperCase(); }
  if (!cardName) {
    if (lower.includes("pix")) cardName = "Pix";
    else if (lower.includes("débito") || lower.includes("debito")) cardName = "Débito";
    else if (lower.includes("dinheiro")) cardName = "Dinheiro";
  }
  if (!cardName && defaultCard) { cardId = defaultCard.id; cardName = defaultCard.name; }

  let merchant = null;
  const mm = lower.match(/\b(?:no|na|em)\s+([a-zà-ú0-9\s]+?)(?:\s+com|\s+no valor|\s+valor|\s+r\$|,|$)/);
  if (mm) merchant = mm[1].trim().replace(/\s+/g, " ");

  let category = "Outros";
  const hay = (merchant || "") + " " + lower;
  for (const rule of categoryRules) { if (hay.includes(rule.keyword.toLowerCase())) { category = rule.category; break; } }

  let installments = 1, perAmount = amount;
  const instA = lower.match(/(\d+)\s*x\s*de\s*r?\$?\s*([\d]+(?:[.,]\d{1,2})?)/);
  if (instA) { installments = parseInt(instA[1], 10); perAmount = parseFloat(instA[2].replace(",", ".")); amount = perAmount; }
  else {
    const instB = lower.match(/em\s*(\d+)\s*x\b/) || lower.match(/\b(\d+)\s*x\b/);
    if (instB && amount != null) { const n = parseInt(instB[1], 10); if (n > 1) { installments = n; perAmount = amount / n; } }
  }

  return { amount, card_id: cardId, card_name: cardName || "", merchant: merchant || "", category, date, raw: text, installments, perAmount };
}

function getInvoiceInfo(dateStr, card) {
  if (!card || card.closing_day == null || card.due_day == null) return null;
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate();
  let closingMonth = d.getMonth(), closingYear = d.getFullYear();
  if (day > card.closing_day) { closingMonth += 1; if (closingMonth > 11) { closingMonth = 0; closingYear += 1; } }
  let dueMonth = closingMonth, dueYear = closingYear;
  if (card.due_day < card.closing_day) { dueMonth += 1; if (dueMonth > 11) { dueMonth = 0; dueYear += 1; } }
  const closingDate = new Date(closingYear, closingMonth, card.closing_day);
  const dueDate = new Date(dueYear, dueMonth, card.due_day);
  const label = `Fatura ${String(closingMonth + 1).padStart(2, "0")}/${closingYear}`;
  return { label, closingDate, dueDate };
}
function invoiceStatus(inv) {
  if (!inv) return null;
  const now = new Date();
  if (now < inv.closingDate) return { text: "Em aberto (acumulando)", cls: "st-open" };
  if (now < inv.dueDate) return { text: "Fechada — aguardando pagamento", cls: "st-closed" };
  return { text: "Vencida / paga", cls: "st-due" };
}
function downloadCSV(rows, filename) {
  const header = ["Data", "Local", "Categoria", "Cartão", "Valor"];
  const csvLines = [header.join(";")].concat(rows.map((t) => [fmtDateBR(t.date), t.merchant || "", t.category, t.card_name || "", (t.amount || 0).toFixed(2).replace(".", ",")].join(";")));
  const blob = new Blob(["\uFEFF" + csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------- AUTH ----------

function AuthGate({ onLoggedIn }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleReset() {
    setErr(""); setInfo("");
    if (!email.trim()) { setErr("Digite seu e-mail para receber o link de redefinição."); return; }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setInfo("Enviamos um link para redefinir sua senha. Confira seu e-mail (e o spam).");
  }

  async function handleSubmit() {
    setErr(""); setInfo("");
    if (mode === "reset") { handleReset(); return; }
    if (!email.trim() || !password) { setErr("Preencha e-mail e senha."); return; }
    setBusy(true);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: name.trim() || email.trim() } },
      });
      setBusy(false);
      if (error) { setErr(error.message); return; }
      if (data.session) { onLoggedIn(data.session.user); return; }
      setInfo("Conta criada. Verifique seu e-mail para confirmar antes de entrar.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setBusy(false);
      if (error) { setErr(error.message); return; }
      onLoggedIn(data.user);
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleFormSubmit} autoComplete="on">
        <div className="auth-brand">Lança Aí</div>
        <div className="auth-sub">seu controle financeiro, lançado por mensagem</div>
        <div className="auth-tabs">
          <button type="button" className={mode === "login" ? "auth-tab active" : "auth-tab"} onClick={() => { setMode("login"); setErr(""); setInfo(""); }}>Entrar</button>
          <button type="button" className={mode === "signup" ? "auth-tab active" : "auth-tab"} onClick={() => { setMode("signup"); setErr(""); setInfo(""); }}>Criar conta</button>
        </div>
        {mode === "signup" && (
          <div className="auth-field"><label>Nome</label><input name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" /></div>
        )}
        <div className="auth-field"><label>E-mail</label><input type="email" name="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" /></div>
        {mode !== "reset" && (
          <div className="auth-field"><label>Senha</label><input type="password" name="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></div>
        )}
        {err && <div className="auth-err">{err}</div>}
        {info && <div className="auth-info">{info}</div>}
        <button type="submit" className="auth-submit" disabled={busy}>{busy ? "Aguarde..." : mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar link de redefinição"}</button>
        {mode === "login" && (
          <button type="button" className="auth-forgot" onClick={() => { setMode("reset"); setErr(""); setInfo(""); }}>Esqueci minha senha</button>
        )}
        {mode === "reset" && (
          <button type="button" className="auth-forgot" onClick={() => { setMode("login"); setErr(""); setInfo(""); }}>Voltar para o login</button>
        )}
        <div className="auth-note">Autenticação real via Supabase — só você acessa sua conta.</div>
      </form>
    </div>
  );
}

function NewPasswordScreen({ onDone }) {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setErr("");
    if (password.length < 6) { setErr("A senha precisa ter pelo menos 6 caracteres."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    onDone();
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="auth-brand">Lança Aí</div>
        <div className="auth-sub">Defina sua nova senha</div>
        <div className="auth-field"><label>Nova senha</label><input type="password" name="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></div>
        {err && <div className="auth-err">{err}</div>}
        <button type="submit" className="auth-submit" disabled={busy}>{busy ? "Aguarde..." : "Salvar nova senha"}</button>
      </form>
    </div>
  );
}

// ---------- MAIN APP ----------

export default function App() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const [page, setPage] = useState("visao");
  const [cards, setCards] = useState([]);
  const [categoryRules, setCategoryRules] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [globalBudget, setGlobalBudget] = useState(null);
  const [recurrences, setRecurrences] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [monthCursor, setMonthCursor] = useState(() => { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() }; });
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCard, setFilterCard] = useState("todos");
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "PASSWORD_RECOVERY") setPasswordRecovery(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const user = session?.user || null;

  useEffect(() => {
    if (!user) { setDataLoaded(false); return; }
    (async () => {
      const uidVal = user.id;
      const [cardsRes, txRes, rulesRes, budgetsRes, globalRes, recRes] = await Promise.all([
        supabase.from("cards").select("*").eq("user_id", uidVal),
        supabase.from("transactions").select("*").eq("user_id", uidVal).order("date", { ascending: false }),
        supabase.from("category_rules").select("*").eq("user_id", uidVal),
        supabase.from("budgets").select("*").eq("user_id", uidVal),
        supabase.from("global_budget").select("*").eq("user_id", uidVal).maybeSingle(),
        supabase.from("recurrences").select("*").eq("user_id", uidVal),
      ]);

      let cardsData = cardsRes.data || [];
      if (cardsData.length === 0) {
        const { data: created } = await supabase.from("cards").insert({ user_id: uidVal, name: "Meu cartão", closing_day: 5, due_day: 12, is_default: true }).select();
        cardsData = created || [];
      }
      setCards(cardsData);
      setTransactions(txRes.data || []);
      setCategoryRules(rulesRes.data && rulesRes.data.length > 0 ? rulesRes.data : DEFAULT_CATEGORY_RULES.map((r) => ({ ...r, id: uid() })));
      if (!rulesRes.data || rulesRes.data.length === 0) {
        await supabase.from("category_rules").insert(DEFAULT_CATEGORY_RULES.map((r) => ({ user_id: uidVal, keyword: r.keyword, category: r.category })));
      }
      const bObj = {};
      (budgetsRes.data || []).forEach((b) => { bObj[b.category] = Number(b.amount); });
      setBudgets(bObj);
      setGlobalBudget(globalRes.data ? Number(globalRes.data.amount) : null);
      setRecurrences(recRes.data || []);
      setDataLoaded(true);
    })();
  }, [user?.id]);

  // auto-generate recurring transactions for the current real month
  useEffect(() => {
    if (!dataLoaded || !user) return;
    const today = new Date();
    const y = today.getFullYear(), m = today.getMonth(), day = today.getDate();
    const toAdd = [];
    recurrences.forEach((r) => {
      if (!r.active) return;
      if (day < r.day) return;
      const exists = transactions.some((t) => t.recurrence_id === r.id && new Date(t.date + "T00:00:00").getFullYear() === y && new Date(t.date + "T00:00:00").getMonth() === m);
      if (!exists) {
        const d = new Date(y, m, Math.min(r.day, daysInMonth(y, m)));
        toAdd.push({ user_id: user.id, amount: r.amount, card_id: r.card_id || null, card_name: r.card_name || "", merchant: r.merchant, category: r.category, date: d.toISOString().slice(0, 10), raw: `Recorrente: ${r.merchant}`, recurrence_id: r.id });
      }
    });
    if (toAdd.length) {
      (async () => {
        const { data } = await supabase.from("transactions").insert(toAdd).select();
        if (data) { setTransactions((prev) => [...data, ...prev]); showToast(`${data.length} lançamento(s) recorrente(s) adicionado(s).`); }
      })();
    }
    // eslint-disable-next-line
  }, [dataLoaded, recurrences]);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 2600); }
  async function handleLogout() { await supabase.auth.signOut(); }

  const defaultCard = cards.find((c) => c.is_default) || null;

  async function handleParse() {
    if (!input.trim()) return;
    const lower = input.toLowerCase();
    const isEditCmd = /^(corrig[ei]r?|editar|mudar|ajustar)\s+(o\s+)?(último|ultimo)\s+lan[çc]amento/.test(lower);
    if (isEditCmd) {
      if (transactions.length === 0) { showToast("Nenhum lançamento pra corrigir ainda."); setInput(""); return; }
      const last = transactions[0];
      const patch = {};
      const amtMatch = lower.match(/r\$\s*([\d]+(?:[.,]\d{1,2})?)/) || lower.match(/(\d+(?:[.,]\d{1,2})?)\s*reais/);
      if (amtMatch) patch.amount = parseFloat(amtMatch[1].replace(",", "."));
      const catMatch = lower.match(/categoria\s+([a-zà-úA-Z]+)/);
      if (catMatch) patch.category = catMatch[1].charAt(0).toUpperCase() + catMatch[1].slice(1);
      const { data, error } = await supabase.from("transactions").update(patch).eq("id", last.id).select();
      if (!error && data) { setTransactions((prev) => prev.map((t) => (t.id === last.id ? data[0] : t))); showToast("Último lançamento corrigido."); }
      else showToast("Não consegui corrigir — tente editar manualmente.");
      setInput("");
      return;
    }
    setPending(parseMessage(input, cards, categoryRules, defaultCard));
    setInput("");
  }

  async function maybeLearnRule(merchant, category) {
    const key = (merchant || "").trim().toLowerCase();
    if (!key || key.length < 3) return;
    const alreadyKnown = categoryRules.some((r) => key.includes(r.keyword.toLowerCase()));
    if (alreadyKnown) return;
    const row = { user_id: user.id, keyword: key, category };
    const { data, error } = await supabase.from("category_rules").insert(row).select();
    if (!error && data) {
      setCategoryRules((prev) => [data[0], ...prev]);
      showToast(`"${merchant}" salvo em ${category} — próxima vez reconheço sozinho.`);
    }
  }

  async function handleSave() {
    if (!pending) return;
    if (pending.amount == null) { showToast("Confirme o valor antes de lançar."); return; }
    const n = pending.installments && pending.installments > 1 ? pending.installments : 1;
    const uidVal = user.id;
    if (n > 1) {
      const groupId = uid();
      const baseDate = new Date(pending.date + "T00:00:00");
      const rows = [];
      for (let i = 0; i < n; i++) {
        const yy = baseDate.getFullYear(), mo = baseDate.getMonth() + i;
        const targetY = yy + Math.floor(mo / 12);
        const targetM = ((mo % 12) + 12) % 12;
        const d = new Date(targetY, targetM, Math.min(baseDate.getDate(), daysInMonth(targetY, targetM)));
        rows.push({ user_id: uidVal, amount: pending.perAmount, card_id: pending.card_id, card_name: pending.card_name, merchant: `${pending.merchant} (${i + 1}/${n})`, category: pending.category, date: d.toISOString().slice(0, 10), raw: pending.raw, installment_group_id: groupId, installment_index: i + 1, installment_total: n });
      }
      const { data, error } = await supabase.from("transactions").insert(rows).select();
      if (error) { showToast("Erro ao salvar parcelas."); return; }
      setTransactions((prev) => [...data, ...prev]);
      showToast(`${n} parcelas lançadas.`);
      maybeLearnRule(pending.merchant, pending.category);
    } else {
      const row = { user_id: uidVal, amount: pending.amount, card_id: pending.card_id, card_name: pending.card_name, merchant: pending.merchant, category: pending.category, date: pending.date, raw: pending.raw };
      const { data, error } = await supabase.from("transactions").insert(row).select();
      if (error) { showToast("Erro ao salvar lançamento."); return; }
      setTransactions((prev) => [data[0], ...prev]);
      showToast("Lançado.");
      maybeLearnRule(pending.merchant, pending.category);
    }
    setPending(null);
    inputRef.current?.focus();
  }
  function updatePendingField(field, value) { setPending((p) => ({ ...p, [field]: value })); }

  function startEdit(t) { setEditingId(t.id); setEditDraft({ ...t }); setConfirmDeleteId(null); }
  function cancelEdit() { setEditingId(null); setEditDraft(null); }
  async function saveEdit() {
    if (editDraft.amount == null) { showToast("Valor não pode ficar vazio."); return; }
    const { id, ...patch } = editDraft;
    const { data, error } = await supabase.from("transactions").update(patch).eq("id", id).select();
    if (error) { showToast("Erro ao atualizar."); return; }
    setTransactions((prev) => prev.map((t) => (t.id === id ? data[0] : t)));
    setEditingId(null); setEditDraft(null);
    showToast("Atualizado.");
  }
  function updateEditField(field, value) { setEditDraft((p) => ({ ...p, [field]: value })); }

  async function handleDeleteClick(id) {
    if (confirmDeleteId === id) {
      const { error } = await supabase.from("transactions").delete().eq("id", id);
      if (!error) { setTransactions((prev) => prev.filter((t) => t.id !== id)); showToast("Excluído."); }
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId((cur) => (cur === id ? null : cur)), 3000);
    }
  }

  async function addCard(name, closingDay, dueDay, limit) {
    if (!name.trim()) return;
    const row = { user_id: user.id, name: name.trim(), closing_day: Number(closingDay), due_day: Number(dueDay), limit_amount: limit ? Number(limit) : null, is_default: cards.length === 0 };
    const { data, error } = await supabase.from("cards").insert(row).select();
    if (!error) setCards((prev) => [...prev, data[0]]);
  }
  async function removeCard(id) {
    const { error } = await supabase.from("cards").delete().eq("id", id);
    if (!error) setCards((prev) => prev.filter((c) => c.id !== id));
  }
  async function setDefaultCard(id) {
    await supabase.from("cards").update({ is_default: false }).eq("user_id", user.id);
    await supabase.from("cards").update({ is_default: true }).eq("id", id);
    setCards((prev) => prev.map((c) => ({ ...c, is_default: c.id === id })));
  }
  async function updateCardLimit(id, value) {
    const limit_amount = value === "" ? null : Number(value);
    const { error } = await supabase.from("cards").update({ limit_amount }).eq("id", id);
    if (!error) setCards((prev) => prev.map((c) => (c.id === id ? { ...c, limit_amount } : c)));
  }

  async function addRule(keyword, category) {
    if (!keyword.trim() || !category.trim()) return;
    const row = { user_id: user.id, keyword: keyword.trim().toLowerCase(), category: category.trim() };
    const { data, error } = await supabase.from("category_rules").insert(row).select();
    if (!error) setCategoryRules((prev) => [data[0], ...prev]);
  }
  async function removeRule(id) {
    const { error } = await supabase.from("category_rules").delete().eq("id", id);
    if (!error) setCategoryRules((prev) => prev.filter((r) => r.id !== id));
  }
  async function updateBudget(cat, value) {
    if (value === "") {
      await supabase.from("budgets").delete().eq("user_id", user.id).eq("category", cat);
      setBudgets((prev) => { const n = { ...prev }; delete n[cat]; return n; });
      return;
    }
    const amount = Number(value);
    await supabase.from("budgets").upsert({ user_id: user.id, category: cat, amount });
    setBudgets((prev) => ({ ...prev, [cat]: amount }));
  }
  async function updateGlobalBudget(value) {
    if (value === "") {
      await supabase.from("global_budget").delete().eq("user_id", user.id);
      setGlobalBudget(null);
      return;
    }
    const amount = Number(value);
    await supabase.from("global_budget").upsert({ user_id: user.id, amount });
    setGlobalBudget(amount);
  }

  async function addRecurrence(rec) {
    const row = { user_id: user.id, active: true, ...rec };
    const { data, error } = await supabase.from("recurrences").insert(row).select();
    if (!error) setRecurrences((prev) => [...prev, data[0]]);
  }
  async function removeRecurrence(id) {
    const { error } = await supabase.from("recurrences").delete().eq("id", id);
    if (!error) setRecurrences((prev) => prev.filter((r) => r.id !== id));
  }
  async function toggleRecurrence(id, current) {
    const { error } = await supabase.from("recurrences").update({ active: !current }).eq("id", id);
    if (!error) setRecurrences((prev) => prev.map((r) => (r.id === id ? { ...r, active: !current } : r)));
  }

  function prevMonth() { setMonthCursor((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 })); }
  function nextMonth() { setMonthCursor((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 })); }

  const monthTx = transactions.filter((t) => { const d = new Date(t.date + "T00:00:00"); return d.getFullYear() === monthCursor.y && d.getMonth() === monthCursor.m; });
  const monthTotal = monthTx.reduce((s, t) => s + Number(t.amount || 0), 0);
  const prevCursor = monthCursor.m === 0 ? { y: monthCursor.y - 1, m: 11 } : { y: monthCursor.y, m: monthCursor.m - 1 };
  const prevMonthTotal = transactions.filter((t) => { const d = new Date(t.date + "T00:00:00"); return d.getFullYear() === prevCursor.y && d.getMonth() === prevCursor.m; }).reduce((s, t) => s + Number(t.amount || 0), 0);
  const deltaPct = prevMonthTotal > 0 ? ((monthTotal - prevMonthTotal) / prevMonthTotal) * 100 : null;

  const byCategory = {};
  monthTx.forEach((t) => { byCategory[t.category] = (byCategory[t.category] || 0) + Number(t.amount || 0); });
  const maxCat = Math.max(1, ...Object.values(byCategory));
  const byCard = {};
  monthTx.forEach((t) => { const key = t.card_id || t.card_name || "outro"; byCard[key] = (byCard[key] || 0) + Number(t.amount || 0); });
  const cardMap = Object.fromEntries(cards.map((c) => [c.id, c]));

  const filteredTx = monthTx.filter((t) => {
    if (filterCard !== "todos") { const key = t.card_id || t.card_name || "outro"; if (key !== filterCard) return false; }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      if (!(t.merchant || "").toLowerCase().includes(q) && !(t.category || "").toLowerCase().includes(q) && !(t.raw || "").toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const allCategoriesForBudget = Array.from(new Set([...Object.keys(CATEGORY_COLORS), ...Object.keys(byCategory)]));

  if (checkingSession) return <div className="talao-root talao-loading" />;
  if (passwordRecovery) return <div className="talao-root"><GlobalStyle /><NewPasswordScreen onDone={() => setPasswordRecovery(false)} /></div>;
  if (!user) return <div className="talao-root"><GlobalStyle /><AuthGate onLoggedIn={() => {}} /></div>;
  if (!dataLoaded) return <div className="talao-root talao-loading" />;

  const monthLabel = `${MONTH_NAMES[monthCursor.m]} ${monthCursor.y}`;
  const userName = user.user_metadata?.full_name || user.email;

  return (
    <div className="talao-root">
      <GlobalStyle />
      <div className="app-shell">
        <nav className="sidebar">
          <div className="brand">Lança Aí</div>
          <button className={page === "visao" ? "nav-item active" : "nav-item"} onClick={() => setPage("visao")}>Visão geral</button>
          <button className={page === "lanc" ? "nav-item active" : "nav-item"} onClick={() => setPage("lanc")}>Lançamentos</button>
          <button className={page === "recorrentes" ? "nav-item active" : "nav-item"} onClick={() => setPage("recorrentes")}>Recorrentes</button>
          <button className={page === "cartoes" ? "nav-item active" : "nav-item"} onClick={() => setPage("cartoes")}>Cartões</button>
          <button className={page === "categorias" ? "nav-item active" : "nav-item"} onClick={() => setPage("categorias")}>Categorias</button>
          <button className={page === "ajuda" ? "nav-item active" : "nav-item"} onClick={() => setPage("ajuda")}>Como usar</button>
          <div className="sidebar-spacer" />
          <div className="sidebar-user">{userName}</div>
          <button className="nav-item logout" onClick={handleLogout}>Sair</button>
        </nav>

        <main className="main">
          <div className="topbar">
            <div className="month-switch">
              <button onClick={prevMonth}>‹</button><span>{monthLabel}</span><button onClick={nextMonth}>›</button>
            </div>
            <div className="topbar-total">
              <span className="ttl-label">Total do mês</span>
              <span className="ttl-value">{fmtMoney(monthTotal)}</span>
              {deltaPct != null && <span className={"ttl-delta " + (deltaPct > 0 ? "up" : "down")}>{deltaPct > 0 ? "▲" : "▼"} {Math.abs(deltaPct).toFixed(0)}% vs mês anterior</span>}
            </div>
          </div>

          {page === "visao" && (
            <div className="page">
              <div className="inputbar">
                <input ref={inputRef} placeholder="Ex: Compra no Extra com cartão PDA no valor de R$ 55, ou 3x de R$100" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleParse()} />
                <button className="btn" onClick={handleParse}>Lançar</button>
              </div>
              <div className="talao-hint">Também aceita comando: "corrigir último lançamento pra R$ 65"</div>

              {pending && <PendingCard pending={pending} cards={cards} updatePendingField={updatePendingField} onCancel={() => setPending(null)} onSave={handleSave} />}

              <div className="section-label">Meta do mês</div>
              <div className="goal-row">
                <input type="number" placeholder="sem meta definida" value={globalBudget ?? ""} onChange={(e) => updateGlobalBudget(e.target.value)} />
                {globalBudget != null && (
                  <div className="goal-bar-wrap">
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(100, (monthTotal / globalBudget) * 100)}%`, background: monthTotal > globalBudget ? "var(--expense)" : "var(--accent2)" }} /></div>
                    <span className="goal-status">{monthTotal > globalBudget ? `Estourou em ${fmtMoney(monthTotal - globalBudget)}` : `Faltam ${fmtMoney(globalBudget - monthTotal)}`}</span>
                  </div>
                )}
              </div>

              <div className="section-label">Gasto por categoria</div>
              {Object.keys(byCategory).length === 0 ? <div className="empty">Sem lançamentos em {monthLabel}.</div> : (
                <div className="bars">
                  {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, val]) => {
                    const budget = budgets[cat]; const over = budget && val > budget;
                    return (
                      <div className="bar-row" key={cat}>
                        <div className="bar-label">{catIcon(cat)} {cat}</div>
                        <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(100, (val / maxCat) * 100)}%`, background: over ? "var(--expense)" : catColor(cat) }} /></div>
                        <div className="bar-value">{fmtMoney(val)}{budget ? <span className="bar-budget">{over ? " acima de " : " / "}{fmtMoney(budget)}</span> : null}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="section-label">Gasto por cartão</div>
              {Object.keys(byCard).length === 0 ? <div className="empty">Sem lançamentos em {monthLabel}.</div> : (
                <div className="card-grid">
                  {Object.entries(byCard).map(([key, val]) => { const card = cardMap[key]; return (
                    <div className="mini-card" key={key}><div className="mini-card-name">{card ? card.name : key}</div><div className="mini-card-val">{fmtMoney(val)}</div></div>
                  ); })}
                </div>
              )}
            </div>
          )}

          {page === "lanc" && (
            <div className="page">
              <div className="inputbar">
                <input ref={inputRef} placeholder="Ex: Compra no Extra com cartão PDA no valor de R$ 55, ou 3x de R$100" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleParse()} />
                <button className="btn" onClick={handleParse}>Lançar</button>
              </div>
              {pending && <PendingCard pending={pending} cards={cards} updatePendingField={updatePendingField} onCancel={() => setPending(null)} onSave={handleSave} />}

              <div className="lanc-toolbar">
                <input className="search-input" placeholder="Buscar por local, categoria..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <select className="filter-select" value={filterCard} onChange={(e) => setFilterCard(e.target.value)}>
                  <option value="todos">Todos os cartões</option>
                  {cards.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  <option value="Pix">Pix</option><option value="Débito">Débito</option><option value="Dinheiro">Dinheiro</option>
                </select>
                <button className="btn btn-ghost" onClick={() => downloadCSV(filteredTx, `talao-${monthCursor.y}-${String(monthCursor.m + 1).padStart(2, "0")}.csv`)} disabled={filteredTx.length === 0}>Exportar CSV</button>
              </div>

              <div className="section-label">Lançamentos — {monthLabel} ({filteredTx.length})</div>
              {filteredTx.length === 0 ? <div className="empty">Nada encontrado.</div> : (
                <div className="stub-list">
                  {filteredTx.map((t) => {
                    const card = t.card_id ? cardMap[t.card_id] : null;
                    const inv = card ? getInvoiceInfo(t.date, card) : null;
                    if (editingId === t.id) {
                      return (
                        <div className="edit-stub" key={t.id}>
                          <div className="pending-grid">
                            <div className="pending-field"><label>Valor (R$)</label><input type="number" step="0.01" value={editDraft.amount ?? ""} onChange={(e) => updateEditField("amount", e.target.value === "" ? null : parseFloat(e.target.value))} /></div>
                            <div className="pending-field"><label>Data</label><input type="date" value={editDraft.date} onChange={(e) => updateEditField("date", e.target.value)} /></div>
                            <div className="pending-field"><label>Local</label><input value={editDraft.merchant} onChange={(e) => updateEditField("merchant", e.target.value)} /></div>
                            <div className="pending-field"><label>Categoria</label><input value={editDraft.category} onChange={(e) => updateEditField("category", e.target.value)} /></div>
                            <div className="pending-field">
                              <label>Cartão</label>
                              <select value={editDraft.card_id || editDraft.card_name || ""} onChange={(e) => { const c = cards.find((c) => c.id === e.target.value); if (c) { updateEditField("card_id", c.id); updateEditField("card_name", c.name); } else { updateEditField("card_id", null); updateEditField("card_name", e.target.value); } }}>
                                <option value="">— selecionar —</option>
                                {cards.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                <option value="Pix">Pix</option><option value="Débito">Débito</option><option value="Dinheiro">Dinheiro</option>
                              </select>
                            </div>
                          </div>
                          <div className="pending-actions"><button className="btn btn-ghost" onClick={cancelEdit}>Cancelar</button><button className="btn" onClick={saveEdit}>Salvar</button></div>
                        </div>
                      );
                    }
                    return (
                      <div className="stub" key={t.id}>
                        <div className="stub-badge" style={{ background: catColor(t.category) }} />
                        <div className="stub-main">
                          <div className="stub-merchant">{catIcon(t.category)} {t.merchant || "Sem local"} {t.installment_total ? <span className="stub-tag">parcela</span> : null} {t.recurrence_id ? <span className="stub-tag">recorrente</span> : null}</div>
                          <div className="stub-meta">{fmtDateBR(t.date)} · {t.category} · {t.card_name || "—"}{inv ? ` · ${inv.label} (vence ${fmtDateBR(inv.dueDate.toISOString().slice(0, 10))})` : ""}</div>
                        </div>
                        <div className="stub-amount">{fmtMoney(t.amount)}</div>
                        <button className="stub-edit" onClick={() => startEdit(t)} title="Editar">✎</button>
                        <button className={confirmDeleteId === t.id ? "stub-del confirming" : "stub-del"} onClick={() => handleDeleteClick(t.id)} title="Excluir">{confirmDeleteId === t.id ? "confirmar?" : "×"}</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {page === "recorrentes" && (
            <div className="page">
              <div className="section-label">Lançamentos recorrentes</div>
              {recurrences.length === 0 ? <div className="empty">Nenhum cadastrado. Aluguel, assinaturas e academia entram aqui.</div> : (
                <div className="card-manage-list">
                  {recurrences.map((r) => (
                    <div className="card-manage-row" key={r.id}>
                      <div className="cmr-main">
                        <div className="cmr-name">{catIcon(r.category)} {r.merchant}</div>
                        <div className="cmr-meta">dia {r.day} · {r.category} · {r.card_name || "sem cartão definido"} · {r.active ? "ativo" : "pausado"}</div>
                      </div>
                      <div className="cmr-val">{fmtMoney(r.amount)}</div>
                      <button className="mini-del" onClick={() => toggleRecurrence(r.id, r.active)}>{r.active ? "pausar" : "ativar"}</button>
                      <button className="mini-del" onClick={() => removeRecurrence(r.id)}>remover</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="section-label">Adicionar recorrência</div>
              <RecurrenceAddRow cards={cards} onAdd={addRecurrence} />
            </div>
          )}

          {page === "cartoes" && (
            <div className="page">
              <div className="section-label">Seus cartões</div>
              <div className="card-manage-list">
                {cards.map((c) => {
                  const total = byCard[c.id] || 0;
                  const inv = getInvoiceInfo(todayStr(), c);
                  const status = invoiceStatus(inv);
                  const openTotal = transactions.filter((t) => t.card_id === c.id && (() => { const i = getInvoiceInfo(t.date, c); return i && inv && i.label === inv.label; })()).reduce((s, t) => s + Number(t.amount || 0), 0);
                  const available = c.limit_amount != null ? c.limit_amount - openTotal : null;
                  return (
                    <div className="card-manage-row wide" key={c.id}>
                      <div className="cmr-main">
                        <div className="cmr-name">{c.is_default ? "★ " : ""}{c.name}</div>
                        <div className="cmr-meta">fecha dia {c.closing_day} · vence dia {c.due_day}{inv ? ` · ${inv.label}` : ""}</div>
                        {status && <span className={"status-badge " + status.cls}>{status.text}</span>}
                        {c.limit_amount != null && (
                          <div className="limit-wrap">
                            <div className="bar-track small"><div className="bar-fill" style={{ width: `${Math.min(100, (openTotal / c.limit_amount) * 100)}%`, background: available < 0 ? "var(--expense)" : "var(--accent2)" }} /></div>
                            <span className="limit-label">disponível: {fmtMoney(available)} de {fmtMoney(c.limit_amount)}</span>
                          </div>
                        )}
                        <div className="limit-edit"><label>Limite (R$)</label><input type="number" defaultValue={c.limit_amount ?? ""} onBlur={(e) => updateCardLimit(c.id, e.target.value)} placeholder="sem limite" /></div>
                      </div>
                      <div className="cmr-val">{fmtMoney(total)}<span className="cmr-val-label">em {monthLabel}</span></div>
                      <div className="cmr-actions">
                        {!c.is_default && <button className="mini-del" onClick={() => setDefaultCard(c.id)}>tornar padrão</button>}
                        <button className="mini-del" onClick={() => removeCard(c.id)}>remover</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="section-label">Adicionar cartão</div>
              <CardAddRow onAdd={addCard} />
            </div>
          )}

          {page === "categorias" && (
            <div className="page">
              <div className="section-label">Gasto por categoria — {monthLabel}</div>
              {Object.keys(byCategory).length === 0 ? <div className="empty">Sem lançamentos em {monthLabel}.</div> : (
                <div className="bars">
                  {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, val]) => {
                    const budget = budgets[cat]; const over = budget && val > budget;
                    return (
                      <div className="bar-row" key={cat}>
                        <div className="bar-label">{catIcon(cat)} {cat}</div>
                        <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(100, (val / maxCat) * 100)}%`, background: over ? "var(--expense)" : catColor(cat) }} /></div>
                        <div className="bar-value">{fmtMoney(val)}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="section-label">Orçamento mensal por categoria</div>
              <div className="budget-list">
                {allCategoriesForBudget.map((cat) => (
                  <div className="budget-row" key={cat}><span className="budget-cat">{catIcon(cat)} {cat}</span><input type="number" defaultValue={budgets[cat] ?? ""} onBlur={(e) => updateBudget(cat, e.target.value)} placeholder="sem limite" /></div>
                ))}
              </div>
              <div className="section-label">Palavras-chave → categoria</div>
              <div className="rule-list">
                {categoryRules.map((r) => (<div className="rule-row" key={r.id}><span>{r.keyword} → {r.category}</span><button className="mini-del" onClick={() => removeRule(r.id)}>remover</button></div>))}
              </div>
              <RuleAddRow onAdd={addRule} />
            </div>
          )}
          {page === "ajuda" && (
            <div className="page help-page">
              <div className="help-block">
                <h3>Lançando um gasto</h3>
                <p>Digite naturalmente na barra de mensagem. O app identifica sozinho o valor, o local, o cartão e a categoria.</p>
                <div className="help-example">"Compra no Extra com cartão PDA no valor de R$ 55"</div>
                <div className="help-example">"Uber ontem, R$ 23"</div>
                <p>Se o app não reconhecer algo (cartão, categoria), ele mostra uma tela de confirmação pra você completar antes de salvar.</p>
              </div>

              <div className="help-block">
                <h3>Parcelamento</h3>
                <p>Use "Nx de RS Y" ou "R$ total em Nx" que o app divide automaticamente, uma parcela por mês.</p>
                <div className="help-example">"Geladeira 5x de R$ 200"</div>
                <div className="help-example">"R$ 900 em 3x na Amazon"</div>
              </div>

              <div className="help-block">
                <h3>Corrigir o último lançamento pelo chat</h3>
                <p>Sem precisar abrir a edição manual:</p>
                <div className="help-example">"corrigir último lançamento pra R$ 65"</div>
                <div className="help-example">"corrigir último lançamento categoria Transporte"</div>
              </div>

              <div className="help-block">
                <h3>Recorrentes</h3>
                <p>Aluguel, assinaturas, academia — cadastre uma vez na aba <strong>Recorrentes</strong> com o dia do mês. O app lança sozinho quando o dia chega, sem duplicar.</p>
              </div>

              <div className="help-block">
                <h3>Cartões</h3>
                <p>Cadastre cada cartão com o dia de fechamento e vencimento da fatura. Marque um como <strong>★ padrão</strong> — se você não citar cartão na mensagem, ele usa esse automaticamente. Defina um limite pra acompanhar quanto ainda está disponível na fatura atual.</p>
              </div>

              <div className="help-block">
                <h3>Categorias e orçamento</h3>
                <p>Cada categoria tem palavras-chave que a reconhecem automaticamente (ex: "extra", "ifood" → Alimentação). Adicione as suas na aba <strong>Categorias</strong>. Defina um limite mensal por categoria (ou uma meta geral na Visão Geral) pra ver quando estourar.</p>
                <p>Toda vez que você confirma uma loja que o app ainda não conhecia, ele aprende sozinho — da próxima vez já reconhece a categoria certa automaticamente.</p>
              </div>

              <div className="help-block">
                <h3>Editar, excluir e exportar</h3>
                <p>Na aba <strong>Lançamentos</strong>: ✎ edita, × exclui (pede confirmação antes). O botão <strong>Exportar CSV</strong> baixa os lançamentos filtrados do mês pra planilha.</p>
              </div>

              <div className="help-block">
                <h3>Navegando por mês</h3>
                <p>As setas ‹ › no topo trocam o mês visualizado — categorias, cartões e total recalculam automaticamente.</p>
              </div>
            </div>
          )}
        </main>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function PendingCard({ pending, cards, updatePendingField, onCancel, onSave }) {
  return (
    <div className="pending-card">
      <div className="pending-title">Confirme antes de salvar</div>
      <div className="pending-grid">
        <div className="pending-field"><label>Valor por parcela (R$)</label><input type="number" step="0.01" value={pending.perAmount ?? pending.amount ?? ""} onChange={(e) => { const v = e.target.value === "" ? null : parseFloat(e.target.value); updatePendingField("perAmount", v); updatePendingField("amount", v); }} /></div>
        <div className="pending-field"><label>Parcelas</label><input type="number" min="1" value={pending.installments ?? 1} onChange={(e) => updatePendingField("installments", e.target.value === "" ? 1 : parseInt(e.target.value, 10))} /></div>
        <div className="pending-field"><label>Data</label><input type="date" value={pending.date} onChange={(e) => updatePendingField("date", e.target.value)} /></div>
        <div className="pending-field"><label>Local</label><input value={pending.merchant} onChange={(e) => updatePendingField("merchant", e.target.value)} /></div>
        <div className="pending-field"><label>Categoria</label><input value={pending.category} onChange={(e) => updatePendingField("category", e.target.value)} /></div>
        <div className="pending-field">
          <label>Cartão</label>
          <select value={pending.card_id || pending.card_name || ""} onChange={(e) => { const c = cards.find((c) => c.id === e.target.value); if (c) { updatePendingField("card_id", c.id); updatePendingField("card_name", c.name); } else { updatePendingField("card_id", null); updatePendingField("card_name", e.target.value); } }}>
            <option value="">— selecionar —</option>
            {cards.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            <option value="Pix">Pix</option><option value="Débito">Débito</option><option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
      </div>
      {pending.installments > 1 && <div className="pending-note">Vai lançar {pending.installments}x de {fmtMoney(pending.perAmount)} em meses seguidos, a partir da data acima.</div>}
      <div className="pending-actions"><button className="btn btn-ghost" onClick={onCancel}>Cancelar</button><button className="btn" onClick={onSave}>Salvar lançamento</button></div>
    </div>
  );
}

function CardAddRow({ onAdd }) {
  const [name, setName] = useState(""); const [closing, setClosing] = useState(""); const [due, setDue] = useState(""); const [limit, setLimit] = useState("");
  return (
    <div className="add-row">
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} style={{ flex: 2 }} />
      <input placeholder="Fecha (dia)" type="number" value={closing} onChange={(e) => setClosing(e.target.value)} style={{ flex: 1 }} />
      <input placeholder="Vence (dia)" type="number" value={due} onChange={(e) => setDue(e.target.value)} style={{ flex: 1 }} />
      <input placeholder="Limite (opcional)" type="number" value={limit} onChange={(e) => setLimit(e.target.value)} style={{ flex: 1 }} />
      <button className="btn" onClick={() => { if (name && closing && due) { onAdd(name, closing, due, limit); setName(""); setClosing(""); setDue(""); setLimit(""); } }}>+</button>
    </div>
  );
}
function RuleAddRow({ onAdd }) {
  const [keyword, setKeyword] = useState(""); const [category, setCategory] = useState("");
  return (
    <div className="add-row">
      <input placeholder="Palavra-chave (ex: extra)" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <input placeholder="Categoria (ex: Alimentação)" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button className="btn" onClick={() => { if (keyword && category) { onAdd(keyword, category); setKeyword(""); setCategory(""); } }}>+</button>
    </div>
  );
}
function RecurrenceAddRow({ cards, onAdd }) {
  const [merchant, setMerchant] = useState(""); const [category, setCategory] = useState(""); const [amount, setAmount] = useState(""); const [day, setDay] = useState(""); const [cardId, setCardId] = useState("");
  return (
    <div className="add-row wrap">
      <input placeholder="Nome (ex: Aluguel)" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
      <input placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Valor (R$)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input placeholder="Dia do mês" type="number" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} />
      <select value={cardId} onChange={(e) => setCardId(e.target.value)}>
        <option value="">Cartão (opcional)</option>
        {cards.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button className="btn" onClick={() => {
        if (!merchant || !category || !amount || !day) return;
        const card = cards.find((c) => c.id === cardId);
        onAdd({ merchant, category, amount: parseFloat(amount), day: parseInt(day, 10), card_id: card ? card.id : null, card_name: card ? card.name : "" });
        setMerchant(""); setCategory(""); setAmount(""); setDay(""); setCardId("");
      }}>+</button>
    </div>
  );
}

function GlobalStyle() {
  return (
    <style>{`
      .talao-root {
        --bg: #15161B; --surface: #1E2027; --surface-alt: #262933; --border: #34373F;
        --text: #EDEDEF; --text-soft: #9A9CA5; --accent: #E3B341; --accent2: #5FAF9F; --expense: #E1685A;
        font-family: 'Inter', -apple-system, sans-serif; background: var(--bg); color: var(--text);
        min-height: 100vh; position: relative;      }
      .talao-root * { box-sizing: border-box; }
      .talao-loading { background: #15161B; }

      .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 30px; }
      .auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 30px 28px; width: 100%; max-width: 360px; }
      .auth-brand { font-family: Georgia, serif; font-size: 28px; font-weight: 600; color: var(--accent); }
      .auth-sub { font-size: 12.5px; color: var(--text-soft); margin: 4px 0 20px; }
      .auth-tabs { display: flex; gap: 6px; margin-bottom: 18px; background: var(--surface-alt); border-radius: 8px; padding: 3px; }
      .auth-tab { flex: 1; background: none; border: none; color: var(--text-soft); padding: 8px 0; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
      .auth-tab.active { background: var(--accent); color: #1a1a1a; }
      .auth-field { margin-bottom: 14px; }
      .auth-field label { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-soft); margin-bottom: 5px; }
      .auth-field input { width: 100%; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; color: var(--text); font-size: 13.5px; font-family: inherit; }
      .auth-field input:focus { outline: 1.5px solid var(--accent); }
      .auth-err { color: var(--expense); font-size: 12px; margin-bottom: 12px; }
      .auth-info { color: var(--accent2); font-size: 12px; margin-bottom: 12px; }
      .auth-submit { width: 100%; background: var(--accent); color: #1a1a1a; border: none; border-radius: 8px; padding: 11px 0; font-weight: 700; font-size: 13.5px; cursor: pointer; }
      .auth-submit:disabled { opacity: 0.6; }
      .auth-forgot { display: block; width: 100%; text-align: center; background: none; border: none; color: var(--accent2); font-size: 12px; margin-top: 10px; cursor: pointer; }
      .auth-forgot:hover { text-decoration: underline; }
      .auth-note { font-size: 10.5px; color: var(--text-soft); margin-top: 14px; text-align: center; line-height: 1.4; }

      .app-shell { display: flex; min-height: 100vh; }
      .sidebar { width: 190px; flex-shrink: 0; background: var(--surface); border-right: 1px solid var(--border); padding: 20px 14px; display: flex; flex-direction: column; }
      .brand { font-family: Georgia, serif; font-size: 21px; color: var(--accent); font-weight: 600; margin-bottom: 22px; padding: 0 6px; }
      .nav-item { text-align: left; background: none; border: none; color: var(--text-soft); padding: 10px 12px; border-radius: 8px; font-size: 13px; cursor: pointer; margin-bottom: 3px; font-weight: 500; }
      .nav-item:hover { background: var(--surface-alt); color: var(--text); }
      .nav-item.active { background: var(--surface-alt); color: var(--accent); font-weight: 700; }
      .sidebar-spacer { flex: 1; }
      .sidebar-user { font-size: 11.5px; color: var(--text-soft); padding: 0 12px 6px; word-break: break-word; }
      .nav-item.logout { color: var(--expense); }

      .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
      .topbar { display: flex; justify-content: space-between; align-items: center; padding: 18px 26px; border-bottom: 1px solid var(--border); flex-wrap: wrap; gap: 10px; }
      .month-switch { display: flex; align-items: center; gap: 12px; font-family: Georgia, serif; font-size: 17px; }
      .month-switch button { background: var(--surface-alt); border: 1px solid var(--border); color: var(--text); width: 26px; height: 26px; border-radius: 6px; cursor: pointer; font-size: 14px; }
      .topbar-total { text-align: right; }
      .ttl-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-soft); }
      .ttl-value { font-family: 'Courier New', monospace; font-size: 19px; font-weight: 600; color: var(--expense); }
      .ttl-delta { display: block; font-size: 10.5px; font-weight: 600; margin-top: 2px; }
      .ttl-delta.up { color: var(--expense); } .ttl-delta.down { color: var(--accent2); }

      .page { padding: 22px 26px 30px; overflow-y: auto; }
      .inputbar { display: flex; gap: 8px; margin-bottom: 6px; }
      .inputbar input { flex: 1; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 8px; padding: 11px 13px; color: var(--text); font-size: 13.5px; font-family: inherit; }
      .inputbar input:focus { outline: 1.5px solid var(--accent); }
      .talao-hint { font-size: 11px; color: var(--text-soft); margin-bottom: 16px; }
      .btn { background: var(--accent); color: #1a1a1a; border: none; border-radius: 8px; padding: 0 18px; font-size: 13px; font-weight: 700; cursor: pointer; height: 38px; }
      .btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text); }

      .pending-card, .edit-stub { background: var(--surface); border: 1.5px dashed var(--accent); border-radius: 10px; padding: 16px 18px; margin-bottom: 20px; }
      .pending-title { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); font-weight: 700; margin-bottom: 10px; }
      .pending-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
      .pending-field label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-soft); margin-bottom: 4px; }
      .pending-field input, .pending-field select { width: 100%; border: 1px solid var(--border); border-radius: 6px; padding: 7px 9px; font-size: 13px; font-family: inherit; background: var(--surface-alt); color: var(--text); }
      .pending-note { font-size: 11.5px; color: var(--accent); margin-bottom: 10px; }
      .pending-actions { display: flex; gap: 8px; justify-content: flex-end; }

      .lanc-toolbar { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
      .search-input { flex: 1; min-width: 160px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 8px; padding: 9px 12px; color: var(--text); font-size: 13px; font-family: inherit; }
      .filter-select { background: var(--surface-alt); border: 1px solid var(--border); border-radius: 8px; padding: 9px 10px; color: var(--text); font-size: 13px; font-family: inherit; }

      .section-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-soft); font-weight: 700; margin: 22px 0 10px; }
      .empty { text-align: center; padding: 30px 16px; color: var(--text-soft); font-size: 12.5px; border: 1.5px dashed var(--border); border-radius: 10px; }

      .goal-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 6px; }
      .goal-row > input { width: 200px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 8px; padding: 8px 10px; color: var(--text); font-family: 'Courier New', monospace; font-size: 13px; }
      .goal-bar-wrap { display: flex; align-items: center; gap: 10px; }
      .goal-status { font-size: 11.5px; color: var(--text-soft); white-space: nowrap; }

      .bars { display: flex; flex-direction: column; gap: 8px; }
      .bar-row { display: flex; align-items: center; gap: 10px; }
      .bar-label { font-size: 12px; width: 110px; flex-shrink: 0; }
      .bar-track { flex: 1; background: var(--surface-alt); border-radius: 4px; height: 13px; overflow: hidden; }
      .bar-track.small { height: 8px; }
      .bar-fill { height: 100%; border-radius: 4px; }
      .bar-value { font-family: 'Courier New', monospace; font-size: 11.5px; min-width: 74px; text-align: right; }
      .bar-budget { color: var(--text-soft); font-size: 10.5px; }

      .budget-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
      .budget-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; }
      .budget-cat { font-size: 12.5px; }
      .budget-row input { width: 110px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 6px; padding: 6px 9px; color: var(--text); font-size: 12.5px; font-family: 'Courier New', monospace; text-align: right; }

      .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
      .mini-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; }
      .mini-card-name { font-size: 12px; color: var(--text-soft); }
      .mini-card-val { font-family: 'Courier New', monospace; font-size: 16px; font-weight: 600; color: var(--expense); margin-top: 3px; }

      .stub-list { display: flex; flex-direction: column; gap: 9px; }
      .stub { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px 15px; display: flex; align-items: center; gap: 10px; }
      .stub-badge { width: 7px; height: 32px; border-radius: 3px; flex-shrink: 0; }
      .stub-main { flex: 1; min-width: 0; }
      .stub-merchant { font-size: 13.5px; font-weight: 600; text-transform: capitalize; }
      .stub-tag { display: inline-block; font-size: 9px; text-transform: uppercase; letter-spacing: 0.3px; background: var(--surface-alt); color: var(--accent2); border-radius: 4px; padding: 1px 5px; margin-left: 6px; font-weight: 700; }
      .stub-meta { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
      .stub-amount { font-family: 'Courier New', monospace; font-size: 14.5px; font-weight: 600; color: var(--expense); white-space: nowrap; }
      .stub-edit { background: none; border: none; color: var(--text-soft); cursor: pointer; font-size: 13px; padding: 4px 6px; }
      .stub-edit:hover { color: var(--accent); }
      .stub-del { background: none; border: none; color: var(--text-soft); cursor: pointer; font-size: 16px; padding: 2px 6px; }
      .stub-del:hover { color: var(--expense); }
      .stub-del.confirming { font-size: 11px; font-weight: 700; color: var(--expense); border: 1px solid var(--expense); border-radius: 6px; padding: 4px 8px; }

      .card-manage-list { display: flex; flex-direction: column; gap: 8px; }
      .card-manage-row { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px 15px; display: flex; align-items: center; gap: 14px; }
      .card-manage-row.wide { align-items: flex-start; flex-wrap: wrap; }
      .cmr-main { flex: 1; min-width: 200px; }
      .cmr-name { font-size: 14px; font-weight: 700; }
      .cmr-meta { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
      .cmr-val { font-family: 'Courier New', monospace; font-size: 15px; font-weight: 600; color: var(--expense); text-align: right; }
      .cmr-val-label { display: block; font-family: 'Inter', sans-serif; font-size: 9.5px; color: var(--text-soft); font-weight: 400; }
      .cmr-actions { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; }

      .status-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 10px; margin-top: 6px; }
      .status-badge.st-open { background: rgba(95,175,159,0.15); color: var(--accent2); }
      .status-badge.st-closed { background: rgba(227,179,65,0.15); color: var(--accent); }
      .status-badge.st-due { background: rgba(225,104,90,0.15); color: var(--expense); }

      .limit-wrap { display: flex; align-items: center; gap: 8px; margin-top: 8px; max-width: 320px; }
      .limit-label { font-size: 10.5px; color: var(--text-soft); white-space: nowrap; }
      .limit-edit { margin-top: 8px; display: flex; align-items: center; gap: 6px; }
      .limit-edit label { font-size: 10px; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.4px; }
      .limit-edit input { width: 110px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 6px; padding: 5px 8px; color: var(--text); font-size: 12px; font-family: 'Courier New', monospace; }

      .rule-list { max-height: 200px; overflow-y: auto; margin-bottom: 10px; }
      .rule-row { display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 12.5px; }
      .rule-row span { flex: 1; }
      .mini-del { background: none; border: none; color: var(--text-soft); cursor: pointer; font-size: 11.5px; white-space: nowrap; }
      .mini-del:hover { color: var(--expense); }

      .add-row { display: flex; gap: 6px; }
      .add-row.wrap { flex-wrap: wrap; }
      .add-row input, .add-row select { flex: 1; min-width: 110px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; font-size: 12.5px; color: var(--text); font-family: inherit; }

      .toast { position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #1a1a1a; padding: 9px 18px; border-radius: 20px; font-size: 12.5px; font-weight: 600; z-index: 20; }

      .help-page { max-width: 620px; }
      .help-block { margin-bottom: 26px; }
      .help-block h3 { font-family: Georgia, serif; font-size: 16px; color: var(--accent); margin: 0 0 8px; }
      .help-block p { font-size: 13px; line-height: 1.6; color: var(--text); margin: 0 0 8px; }
      .help-example { font-family: 'Courier New', monospace; font-size: 12.5px; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; margin-bottom: 6px; color: var(--accent2); }

      @media (max-width: 700px) {
        .app-shell { flex-direction: column; }
        .sidebar { width: 100%; flex-direction: row; align-items: center; overflow-x: auto; padding: 12px 14px; gap: 4px; }
        .brand { margin-bottom: 0; margin-right: 8px; }
        .sidebar-spacer { display: none; } .sidebar-user { display: none; }
        .pending-grid { grid-template-columns: 1fr; }
        .topbar { flex-direction: column; align-items: flex-start; }
        .topbar-total { text-align: left; }
      }
    `}</style>
  );
}
