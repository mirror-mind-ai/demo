# Test guide — S6

## Pré-requisitos

- `npm install` rodado.
- Pode ou não existir `data/conjunto.db` previamente.

## Caminho feliz

1. Rodar `npm run seed`.
2. Console deve mostrar:
   ```
   Limpando tabelas...
   Inserindo membros...
     8 membros inseridos.
   Inserindo fios e mensagens...
     5 fios inseridos.
   Seed concluído.
   ```
3. Abrir `data/conjunto.db` em um cliente SQLite:
   ```
   sqlite3 data/conjunto.db "SELECT COUNT(*) FROM members;"
   → 8
   sqlite3 data/conjunto.db "SELECT COUNT(*) FROM threads;"
   → 5
   sqlite3 data/conjunto.db "SELECT COUNT(*) FROM messages;"
   → 12
   ```
4. Rodar `npm run seed` uma segunda vez. Mesmo output, mesmas
   contagens. Estado idempotente.

## Casos a verificar

- Inserir um membro manualmente (`INSERT INTO members ...`), depois
  rodar `npm run seed`. O membro manual desaparece (DELETE FROM
  members no início do script).
- Inserir uma mensagem em um fio existente manualmente. Mesmo
  comportamento: `npm run seed` apaga e recria do zero.
- Subir o server (`npm run dev`) com o banco recém-semeado. Todas as
  páginas (`/members`, `/threads`, perfis individuais, fios) devem
  funcionar sem erro.
