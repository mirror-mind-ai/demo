"""Seed de dados financeiros fictícios para o Lucas Vidal.

Cenário: consultor independente em engenharia de software há 17 meses,
mora em Florianópolis com Marina (esposa, arquiteta autônoma) e Olívia
(filha, 7 anos). Três frentes de receita:

  - Klar (consultoria, contrato de 6 meses, 4 meses dentro): R$ 32k/mês
  - Sustentação (grupo de mentoria, 7 membros): R$ 4.9k/mês
  - Conjunto (plataforma própria, ainda sem assinante pagante): R$ 0

Reserva de aproximadamente nove meses de gastos. Burn mensal R$ 16k a
R$ 18k.

Idempotente: se já houver contas com os nomes canônicos, o script
re-aplica apenas os snapshots mais recentes (sem duplicar transações).

Executado pelo install.sh do mirror-demo após a instalação da extensão
finances. MIRROR_HOME deve estar setado para o home runtime do Lucas.
"""

from __future__ import annotations

import os
import sys
import uuid
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

# A extensão finances precisa estar no sys.path para que `src.store_writes`
# resolva. O install.py adiciona automaticamente; quando rodado direto,
# adicionamos aqui também.
EXT_ROOT = Path.home() / "Code" / "mirror-extensions" / "finances"
if EXT_ROOT.exists() and str(EXT_ROOT) not in sys.path:
    sys.path.insert(0, str(EXT_ROOT))

from memory.db.connection import get_connection  # noqa: E402
from memory.extensions.api import ExtensionAPI  # noqa: E402
from memory.extensions.loader import load_extension  # noqa: E402

from src.store import list_accounts  # noqa: E402
from src.store_writes import (  # noqa: E402
    create_account,
    create_bill,
    get_or_create_category,
    record_snapshot,
)


# -----------------------------------------------------------------------------
# Datas-âncora
# -----------------------------------------------------------------------------

TODAY = date(2026, 5, 16)  # consistente com o resto do personagem
OPENING_DATE = (TODAY - timedelta(days=120)).isoformat()


def iso(d: date) -> str:
    return d.isoformat()


def iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def new_id() -> str:
    return uuid.uuid4().hex[:8]


# -----------------------------------------------------------------------------
# Estrutura de contas
# -----------------------------------------------------------------------------

ACCOUNTS = [
    {
        "name": "Nubank Conta Corrente PF",
        "bank": "Nubank",
        "type": "checking",
        "entity": "personal",
        "liquidity": "liquid",
        "opening_balance": 18000.00,
        "current_balance": 15234.56,
    },
    {
        "name": "Nubank Cartão de Crédito",
        "bank": "Nubank",
        "type": "credit_card",
        "entity": "personal",
        "liquidity": "liquid",
        "opening_balance": 0.00,
        "current_balance": -8420.18,  # fatura em aberto
    },
    {
        "name": "Tesouro Selic — Reserva",
        "bank": "XP",
        "type": "savings",
        "entity": "personal",
        "liquidity": "semi_liquid",
        "opening_balance": 175000.00,
        "current_balance": 181450.32,
    },
    {
        "name": "Inter Empresa CNPJ",
        "bank": "Inter",
        "type": "checking",
        "entity": "business",
        "liquidity": "liquid",
        "opening_balance": 12000.00,
        "current_balance": 25890.40,
    },
]


# -----------------------------------------------------------------------------
# Categorias
# -----------------------------------------------------------------------------

INCOME_CATEGORIES = [
    ("Klar — consultoria", "income"),
    ("Sustentação — mentoria", "income"),
    ("Conjunto — assinatura", "income"),  # vazia por enquanto
    ("Rendimento — reserva", "income"),
]

EXPENSE_CATEGORIES = [
    ("Aluguel", "expense"),
    ("Saúde — plano família", "expense"),
    ("Escola — Olívia", "expense"),
    ("Mercado e casa", "expense"),
    ("Carro — combustível e manutenção", "expense"),
    ("Software — SaaS e dev", "expense"),
    ("Lazer e jantar", "expense"),
    ("Viagens", "expense"),
    ("Impostos", "expense"),
    ("Diversos", "expense"),
]

TRANSFER_CATEGORIES = [
    ("Transferência PF↔CNPJ", "transfer"),
]


# -----------------------------------------------------------------------------
# Transações (últimos 90 dias)
# -----------------------------------------------------------------------------

def build_transactions(account_ids: dict[str, str], cat_ids: dict[str, str]) -> list[dict]:
    """Constrói transações realistas distribuídas nos últimos 3 meses.

    Padrão: receita da Klar chega na conta CNPJ todo dia 5 do mês; uma
    transferência interna paga o pro-labore (~R$ 22k) para a conta PF
    no dia 6. Sustentação chega como receita direta na PF (mentorados
    pagam via Pix individual). Despesas familiares saem da PF.
    Software/SaaS pode sair do cartão ou PJ.
    """
    pf = account_ids["Nubank Conta Corrente PF"]
    cc = account_ids["Nubank Cartão de Crédito"]
    pj = account_ids["Inter Empresa CNPJ"]
    reserva = account_ids["Tesouro Selic — Reserva"]

    txns: list[dict] = []

    # Mês a mês, 3 meses para trás (fev, mar, abr/2026 considerando "hoje" = 16/05)
    months = [
        (TODAY.replace(day=1) - timedelta(days=1)).replace(day=1),  # abr
        (TODAY.replace(day=1) - timedelta(days=32)).replace(day=1),  # mar
        (TODAY.replace(day=1) - timedelta(days=63)).replace(day=1),  # fev
    ]

    for month_start in months:
        y, m = month_start.year, month_start.month

        # Receita da Klar (CNPJ, dia 5)
        txns.append({
            "account_id": pj,
            "date": iso(date(y, m, 5)),
            "description": "Klar Logística — NF consultoria mensal",
            "memo": "Mês 4 do contrato de 6",
            "amount": 32000.00,
            "type": "credit",
            "category_id": cat_ids["Klar — consultoria"],
        })

        # Transferência CNPJ → PF (pro-labore, dia 6)
        txns.append({
            "account_id": pj,
            "date": iso(date(y, m, 6)),
            "description": "TED para PF — pro-labore",
            "memo": "Pro-labore mensal",
            "amount": -22000.00,
            "type": "debit",
            "category_id": cat_ids["Transferência PF↔CNPJ"],
        })
        txns.append({
            "account_id": pf,
            "date": iso(date(y, m, 6)),
            "description": "TED de CNPJ — pro-labore",
            "memo": "Pro-labore mensal",
            "amount": 22000.00,
            "type": "credit",
            "category_id": cat_ids["Transferência PF↔CNPJ"],
        })

        # Impostos PJ (DAS Simples, dia 20)
        txns.append({
            "account_id": pj,
            "date": iso(date(y, m, 20)),
            "description": "DAS Simples Nacional",
            "memo": f"Competência {m-1:02d}/{y}",
            "amount": -2080.00,
            "type": "debit",
            "category_id": cat_ids["Impostos"],
        })

        # Sustentação: 7 mentorados x ~R$700, escalonado nos dias 1, 3, 8, 10, 12, 15, 18
        sustenta_days_amounts = [
            (1, 700.00, "André Lemos — mentoria abril"),
            (3, 700.00, "Beatriz Santos — mentoria abril"),
            (8, 700.00, "Caio Furtado — mentoria abril"),
            (10, 700.00, "Diana Lopes — mentoria abril"),
            (12, 700.00, "Eduardo Camargo — mentoria abril"),
            (15, 700.00, "Felipe Andrade — mentoria abril"),
            (18, 700.00, "Gabriela Mendes — mentoria abril"),
        ]
        for day, amt, desc in sustenta_days_amounts:
            try:
                txns.append({
                    "account_id": pf,
                    "date": iso(date(y, m, day)),
                    "description": "Pix recebido — " + desc,
                    "memo": "Mentoria mensal Sustentação",
                    "amount": amt,
                    "type": "credit",
                    "category_id": cat_ids["Sustentação — mentoria"],
                })
            except ValueError:
                pass  # dia inválido para o mês, ignora

        # Aluguel (dia 10)
        txns.append({
            "account_id": pf,
            "date": iso(date(y, m, 10)),
            "description": "Aluguel — imobiliária Ilha",
            "memo": "Aluguel apto Lagoa",
            "amount": -5500.00,
            "type": "debit",
            "category_id": cat_ids["Aluguel"],
        })

        # Plano de saúde (dia 12)
        txns.append({
            "account_id": pf,
            "date": iso(date(y, m, 12)),
            "description": "Unimed — plano família",
            "memo": "Marina, Lucas, Olívia",
            "amount": -2800.00,
            "type": "debit",
            "category_id": cat_ids["Saúde — plano família"],
        })

        # Escola Olívia (dia 15)
        txns.append({
            "account_id": pf,
            "date": iso(date(y, m, 15)),
            "description": "Escola Waldorf — mensalidade",
            "memo": "Olívia, 2º ano",
            "amount": -2500.00,
            "type": "debit",
            "category_id": cat_ids["Escola — Olívia"],
        })

        # Mercado (4-5 vezes no mês, valores variados)
        mercado_days = [(3, 850), (10, 720), (17, 940), (24, 680)]
        for day, amt in mercado_days:
            try:
                txns.append({
                    "account_id": pf,
                    "date": iso(date(y, m, day)),
                    "description": "Mercado Angeloni",
                    "memo": "Mercado da semana",
                    "amount": -amt,
                    "type": "debit",
                    "category_id": cat_ids["Mercado e casa"],
                })
            except ValueError:
                pass

        # Combustível
        try:
            txns.append({
                "account_id": cc,
                "date": iso(date(y, m, 8)),
                "description": "Posto Ipiranga — Lagoa",
                "memo": "Tanque cheio",
                "amount": -380.00,
                "type": "debit",
                "category_id": cat_ids["Carro — combustível e manutenção"],
            })
        except ValueError:
            pass

        # Software SaaS (cartão, dia 14)
        try:
            txns.append({
                "account_id": cc,
                "date": iso(date(y, m, 14)),
                "description": "GitHub — assinatura Team",
                "memo": "github.com/billing",
                "amount": -50.00,
                "type": "debit",
                "category_id": cat_ids["Software — SaaS e dev"],
            })
            txns.append({
                "account_id": cc,
                "date": iso(date(y, m, 14)),
                "description": "Linear — assinatura",
                "memo": "linear.app",
                "amount": -90.00,
                "type": "debit",
                "category_id": cat_ids["Software — SaaS e dev"],
            })
            txns.append({
                "account_id": cc,
                "date": iso(date(y, m, 14)),
                "description": "Anthropic — Claude API",
                "memo": "console.anthropic.com",
                "amount": -380.00,
                "type": "debit",
                "category_id": cat_ids["Software — SaaS e dev"],
            })
        except ValueError:
            pass

        # Lazer (jantar com Marina, dia 22)
        try:
            txns.append({
                "account_id": cc,
                "date": iso(date(y, m, 22)),
                "description": "Restaurante Ostradamus",
                "memo": "Jantar com Marina",
                "amount": -320.00,
                "type": "debit",
                "category_id": cat_ids["Lazer e jantar"],
            })
        except ValueError:
            pass

        # Diversos (pequenas variáveis)
        try:
            txns.append({
                "account_id": cc,
                "date": iso(date(y, m, 19)),
                "description": "Amazon — livros",
                "memo": "Compra mensal",
                "amount": -210.00,
                "type": "debit",
                "category_id": cat_ids["Diversos"],
            })
        except ValueError:
            pass

        # Pagamento da fatura do cartão (sai da PF, dia 28)
        try:
            txns.append({
                "account_id": pf,
                "date": iso(date(y, m, 28)),
                "description": "Pagamento fatura Nubank",
                "memo": f"Fatura {m:02d}/{y}",
                "amount": -1450.00,
                "type": "debit",
                "category_id": cat_ids["Diversos"],
            })
        except ValueError:
            pass

    # Rendimento mensal da reserva (Selic, dia 1)
    for month_start in months:
        y, m = month_start.year, month_start.month
        txns.append({
            "account_id": reserva,
            "date": iso(date(y, m, 1)),
            "description": "Rendimento Selic",
            "memo": f"Rendimento {m-1:02d}/{y}",
            "amount": 1800.00,
            "type": "credit",
            "category_id": cat_ids["Rendimento — reserva"],
        })

    return txns


# -----------------------------------------------------------------------------
# Boletos recorrentes
# -----------------------------------------------------------------------------

RECURRING_BILLS = [
    {"name": "Aluguel", "entity": "personal", "category": "fixed", "amount": 5500.00, "day_of_month": 10},
    {"name": "Plano de saúde família (Unimed)", "entity": "personal", "category": "fixed", "amount": 2800.00, "day_of_month": 12},
    {"name": "Escola Waldorf — Olívia", "entity": "personal", "category": "fixed", "amount": 2500.00, "day_of_month": 15},
    {"name": "Internet (NET Floripa)", "entity": "personal", "category": "fixed", "amount": 200.00, "day_of_month": 5},
    {"name": "Energia elétrica (Celesc)", "entity": "personal", "category": "variable", "amount": 350.00, "day_of_month": 15},
    {"name": "Água (Casan)", "entity": "personal", "category": "variable", "amount": 120.00, "day_of_month": 18},
    {"name": "GitHub Team", "entity": "business", "category": "fixed", "amount": 50.00, "day_of_month": 14},
    {"name": "Linear", "entity": "business", "category": "fixed", "amount": 90.00, "day_of_month": 14},
    {"name": "Anthropic API (estimado)", "entity": "business", "category": "variable", "amount": 380.00, "day_of_month": 14},
    {"name": "Contador", "entity": "business", "category": "fixed", "amount": 380.00, "day_of_month": 25},
]


# -----------------------------------------------------------------------------
# Orquestração
# -----------------------------------------------------------------------------

def seed(api: ExtensionAPI) -> None:
    # Idempotência: se já houver contas com os nomes canônicos, pula tudo.
    existing = list_accounts(api)
    existing_names = {a.name for a in existing}
    target_names = {a["name"] for a in ACCOUNTS}
    if target_names.issubset(existing_names):
        print("  Finanças já populadas, pulando seed (idempotente).")
        return

    print("  Criando contas...")
    account_ids: dict[str, str] = {}
    for acc in ACCOUNTS:
        if acc["name"] in existing_names:
            # Encontrar o ID da conta existente
            for e in existing:
                if e.name == acc["name"]:
                    account_ids[acc["name"]] = e.id
                    break
            continue
        aid = create_account(
            api,
            name=acc["name"],
            bank=acc["bank"],
            type=acc["type"],
            entity=acc["entity"],
            liquidity=acc["liquidity"],
            opening_balance=acc["opening_balance"],
            opening_date=OPENING_DATE,
        )
        account_ids[acc["name"]] = aid
        print(f"    + {acc['name']} ({aid})")

    print("  Criando categorias...")
    cat_ids: dict[str, str] = {}
    for name, ctype in INCOME_CATEGORIES + EXPENSE_CATEGORIES + TRANSFER_CATEGORIES:
        cid = get_or_create_category(api, name=name, type=ctype)
        cat_ids[name] = cid

    print("  Inserindo transações dos últimos 90 dias...")
    txns = build_transactions(account_ids, cat_ids)
    with api.transaction():
        for t in txns:
            api.execute(
                "INSERT INTO ext_finances_transactions "
                "(id, account_id, date, description, memo, amount, type, "
                " category_id, fit_id, balance_after, created_at, metadata) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, ?, NULL)",
                (
                    new_id(),
                    t["account_id"],
                    t["date"],
                    t["description"],
                    t["memo"],
                    t["amount"],
                    t["type"],
                    t["category_id"],
                    iso_now(),
                ),
            )
    print(f"    {len(txns)} transações inseridas.")

    print("  Snapshots atuais (saldo de referência hoje)...")
    today_iso = iso(TODAY)
    for acc in ACCOUNTS:
        aid = account_ids[acc["name"]]
        record_snapshot(api, account_id=aid, date=today_iso, balance=acc["current_balance"])
        print(f"    {acc['name']:<40} R$ {acc['current_balance']:>12,.2f}")

    print("  Boletos recorrentes...")
    for bill in RECURRING_BILLS:
        create_bill(api, **bill)
    print(f"    {len(RECURRING_BILLS)} boletos.")

    print("  Seed financeiro concluído.")


def main() -> int:
    # MIRROR_HOME deve estar setado pelo install.py
    mirror_home_str = os.environ.get("MIRROR_HOME")
    if not mirror_home_str:
        sys.stderr.write("ERROR: MIRROR_HOME não setado.\n")
        return 1
    mirror_home = Path(mirror_home_str)

    ext_dir = mirror_home / "extensions" / "finances"
    if not ext_dir.exists():
        sys.stderr.write(
            f"ERROR: extensão finances não instalada em {ext_dir}\n"
        )
        return 1

    db_path = mirror_home / "memory.db"
    conn = get_connection(db_path)
    try:
        api = load_extension(ext_dir, connection=conn, reload=True)
        seed(api)
    finally:
        conn.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
