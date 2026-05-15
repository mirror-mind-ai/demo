/**
 * Seed: popula data/conjunto.db com membros e fios iniciais.
 *
 * Idempotente: apaga as tabelas e recria do zero a cada execução.
 * Útil para a demo porque garante estado limpo a cada `npm run seed`.
 */

import { db } from "../src/db.js";

console.log("Limpando tabelas...");
db.exec("DELETE FROM messages; DELETE FROM threads; DELETE FROM members;");
// Reset autoincrement counters so ids are stable across reseeds.
db.exec("DELETE FROM sqlite_sequence WHERE name IN ('members','threads','messages')");

console.log("Inserindo membros...");

const insertMember = db.prepare(`
  INSERT INTO members (name, email, role, company, bio, joined_at)
  VALUES (@name, @email, @role, @company, @bio, @joined_at)
`);

const members = [
  {
    name: "Lucas Vidal",
    email: "lucas@conjunto.dev",
    role: "Fundador",
    company: "Solo (Florianópolis)",
    bio: "Construtor da Conjunto. Consultor independente em engenharia e liderança técnica há dezessete meses, depois de quase seis anos como head of engineering em fintech.",
    joined_at: "2026-04-01T10:00:00Z",
  },
  {
    name: "André Lemos",
    email: "andre@example.com",
    role: "Engineering Manager",
    company: "Scale-up de saúde",
    bio: "Atravessando promoção a head pendente há quatro meses. Sente que a empresa está adiando.",
    joined_at: "2026-04-10T10:00:00Z",
  },
  {
    name: "Beatriz Santos",
    email: "beatriz@example.com",
    role: "Tech Lead",
    company: "Fintech em Floripa",
    bio: "Engenheira forte aprendendo a delegar. Tendência a fazer o trabalho em vez de cuidar de quem faz.",
    joined_at: "2026-04-12T10:00:00Z",
  },
  {
    name: "Caio Furtado",
    email: "caio@example.com",
    role: "Head of Platform",
    company: "B2B em Belo Horizonte",
    bio: "Time pequeno, pressão alta. Considerando sair.",
    joined_at: "2026-04-14T10:00:00Z",
  },
  {
    name: "Diana Lopes",
    email: "diana@example.com",
    role: "Engineering Manager",
    company: "SaaS em Curitiba",
    bio: "Veio do produto, única do grupo que não começou como engenheira. Carrega impostor síndrome técnica.",
    joined_at: "2026-04-16T10:00:00Z",
  },
  {
    name: "Eduardo Camargo",
    email: "eduardo@example.com",
    role: "Tech Lead",
    company: "Cripto em Recife",
    bio: "Mais energia que método. Trabalho excelente, sustentação irregular.",
    joined_at: "2026-04-18T10:00:00Z",
  },
  {
    name: "Felipe Andrade",
    email: "felipe@example.com",
    role: "Head of Engineering",
    company: "Scale-up de RH em São Paulo",
    bio: "Mais experiente do grupo. Atravessando reorganização de estrutura.",
    joined_at: "2026-04-20T10:00:00Z",
  },
  {
    name: "Gabriela Mendes",
    email: "gabriela@example.com",
    role: "Engineering Manager",
    company: "Edtech em Porto Alegre",
    bio: "Construindo time do zero, contratou cinco em três meses. Exausta.",
    joined_at: "2026-04-22T10:00:00Z",
  },
];

const memberIds: Record<string, number> = {};
for (const m of members) {
  const result = insertMember.run(m);
  memberIds[m.name] = Number(result.lastInsertRowid);
}

console.log(`  ${members.length} membros inseridos.`);

console.log("Inserindo fios e mensagens...");

const insertThread = db.prepare(`
  INSERT INTO threads (title, slug, theme, started_by, started_at) VALUES (?, ?, ?, ?, ?)
`);
const insertMsg = db.prepare(`
  INSERT INTO messages (thread_id, author_id, body, posted_at) VALUES (?, ?, ?, ?)
`);

interface ThreadSeed {
  title: string;
  slug: string;
  theme: "carreira" | "operacao" | "autoconhecimento";
  startedBy: string;
  startedAt: string;
  messages: { author: string; body: string; postedAt: string }[];
}

const threadSeeds: ThreadSeed[] = [
  {
    title: "Promoção a head adiada: como conduzir a conversa com meu CTO?",
    slug: "promocao-a-head-adiada",
    theme: "carreira",
    startedBy: "André Lemos",
    startedAt: "2026-05-02T14:00:00Z",
    messages: [
      {
        author: "André Lemos",
        body: "Faz quatro meses que conversei sobre essa promoção. Em cada reunião de 1:1 ele afirma que está perto, mas nada acontece. Comecei a achar que estou sendo enrolado, mas tenho medo de chegar nessa conversa com tom errado e perder o que já construí. Como vocês conduziriam?",
        postedAt: "2026-05-02T14:00:00Z",
      },
      {
        author: "Felipe Andrade",
        body: "Quando vivi isso, ajudou separar duas perguntas. Primeiro: existe um caminho real para essa promoção, com critérios e timeline? Se não houver, a promoção não está adiada, ela não existe. Segundo: se houver, qual é o gap entre você e os critérios? Pedir essas duas em uma reunião dedicada (não na 1:1) força uma conversa que CTO bom respeita.",
        postedAt: "2026-05-02T15:30:00Z",
      },
      {
        author: "Lucas Vidal",
        body: "Concordo com o Felipe. Adicionaria um terceiro corte: o que muda para você se a resposta for não? Saber isso antes da conversa muda o tom dela. Conversa de promoção feita por quem já decidiu o próximo passo, independente do resultado, sai diferente.",
        postedAt: "2026-05-02T16:45:00Z",
      },
    ],
  },
  {
    title: "Delegar sem virar gargalo nem virar ausente",
    slug: "delegar-sem-virar-gargalo",
    theme: "operacao",
    startedBy: "Beatriz Santos",
    startedAt: "2026-04-28T10:00:00Z",
    messages: [
      {
        author: "Beatriz Santos",
        body: "Toda semana eu juro que essa é a semana que vou parar de pegar tickets eu mesma. Toda semana eu acabo pegando dois ou três 'só pra resolver rápido'. Sei intelectualmente que é problema. Operacionalmente, no calor, escolho fazer. Como vocês quebraram esse ciclo?",
        postedAt: "2026-04-28T10:00:00Z",
      },
      {
        author: "Diana Lopes",
        body: "Pra mim só virou possível quando aceitei que delegar é mais lento no curto prazo. Cada vez que eu queria 'só resolver rápido', eu me lembrava: a velocidade que estou ganhando agora estou pagando em três semanas quando alguém precisar mexer nisso e não souber por que está assim.",
        postedAt: "2026-04-28T11:20:00Z",
      },
      {
        author: "Lucas Vidal",
        body: "Há um exercício útil: por uma semana, registre cada vez que você pegou um ticket que poderia ter delegado, e por quê. Quase sempre o padrão é o mesmo (urgência percebida, dúvida sobre quem vai conseguir, querer fazer algo concreto num dia que está parecendo só reuniões). Identificar o padrão é mais útil do que tentar resistir ao impulso.",
        postedAt: "2026-04-28T13:00:00Z",
      },
      {
        author: "Diana Lopes",
        body: "Voltei a esse fio depois de uma semana. O padrão que a Bia descreve, de pegar o ticket no calor, eu reconheço de um ângulo um pouco diferente. Abri em paralelo, vale ler junto:\n\n[[fio:imposter-syndrome-tecnica]]\n\nA raiz pode ser a mesma: dificuldade de confiar que a coisa segue sem a gente pôr a mão.",
        postedAt: "2026-05-03T09:30:00Z",
      },
    ],
  },
  {
    title: "Sair de uma empresa que você ajudou a construir",
    slug: "sair-de-empresa-que-construiu",
    theme: "carreira",
    startedBy: "Caio Furtado",
    startedAt: "2026-05-04T16:00:00Z",
    messages: [
      {
        author: "Caio Furtado",
        body: "Cinco anos. Time de oito que eu contratei. Sair agora dói por motivos que não são profissionais. Como vocês separam o que é cuidado legítimo com as pessoas, e o que é apego que está te segurando num lugar que não serve mais?",
        postedAt: "2026-05-04T16:00:00Z",
      },
      {
        author: "Gabriela Mendes",
        body: "A pergunta que me ajudou: se eu nunca tivesse trabalhado nessa empresa, e me ofertassem essa posição hoje, eu aceitaria? Quase sempre a resposta é não, e a gente percebe que estava trocando o futuro pelo investimento já feito.",
        postedAt: "2026-05-04T17:30:00Z",
      },
    ],
  },
  {
    title: "Imposter syndrome técnica num cargo de liderança",
    slug: "imposter-syndrome-tecnica",
    theme: "autoconhecimento",
    startedBy: "Diana Lopes",
    startedAt: "2026-05-01T09:00:00Z",
    messages: [
      {
        author: "Diana Lopes",
        body: "Sou EM mas não venho de engenharia. Em decisões técnicas, ainda tenho aquele momento de hesitar antes de opinar, como se precisasse de credencial. Sei que liderar engenharia não é o mesmo que codar, mas a voz na cabeça diz o contrário. Como vocês equacionaram isso?",
        postedAt: "2026-05-01T09:00:00Z",
      },
      {
        author: "Lucas Vidal",
        body: "Tem dois tipos de decisão técnica. Uma exige expertise no detalhe do código. Outra exige enxergar o sistema de pessoas e processos que produz código. EM bom é especialista no segundo. Quando você hesitar, separe: estou hesitando porque genuinamente não sei o detalhe técnico, ou porque acho que sem credencial eu não posso pensar em sistemas? Quase sempre é o segundo.",
        postedAt: "2026-05-01T10:00:00Z",
      },
    ],
  },
  {
    title: "Reorganização de estrutura: de quatro squads para dois",
    slug: "reorg-quatro-squads-para-dois",
    theme: "operacao",
    startedBy: "Felipe Andrade",
    startedAt: "2026-04-25T11:00:00Z",
    messages: [
      {
        author: "Felipe Andrade",
        body: "Estamos no meio de uma reorganização. Quatro squads viram dois. Já avisei as pessoas, comuniquei a estrutura nova, mas a moral está baixa. Sinto que falhei na comunicação. Como vocês conduzem essas mudanças sem perder o time pelo caminho?",
        postedAt: "2026-04-25T11:00:00Z",
      },
      {
        author: "Eduardo Camargo",
        body: "Talvez não tenha sido a comunicação que falhou. Reorg sempre derruba moral, independente de como você comunica. As pessoas precisam tempo para reconstruir referência (com quem agora eu trabalho, qual minha cadência, o que esperam de mim). Esse tempo costuma ser semanas, às vezes meses. Persistir na clareza ajuda mais do que melhorar a mensagem inicial.",
        postedAt: "2026-04-25T13:30:00Z",
      },
    ],
  },
];

for (const t of threadSeeds) {
  const tid = Number(
    insertThread.run(t.title, t.slug, t.theme, memberIds[t.startedBy], t.startedAt).lastInsertRowid
  );
  for (const msg of t.messages) {
    insertMsg.run(tid, memberIds[msg.author], msg.body, msg.postedAt);
  }
}

console.log(`  ${threadSeeds.length} fios inseridos.`);
console.log("Seed concluído.");
