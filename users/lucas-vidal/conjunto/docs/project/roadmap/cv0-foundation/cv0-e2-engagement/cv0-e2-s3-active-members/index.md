# CV0.E2.S3 — Lista de membros ordenada por atividade

**Status:** ⚪ planejada
**Epic:** [CV0.E2 — Engajamento](../)

> **Como membro do Conjunto, eu quero alternar a ordenação da lista de
> membros entre alfabética e por atividade recente, para encontrar
> alguém específico ou perceber quem está ativo, conforme meu
> momento.**

## Problema

Hoje a lista em `/members` é ordenada por nome. Útil para encontrar
alguém específico, mas inútil para sentir quem está ativo na
comunidade nesta semana. Em uma comunidade pequena, esse sinal
muda a percepção de "está vivo aqui".

## Em uma frase

Adicionar uma toggle na página `/members` que alterna entre
ordenação alfabética e ordenação por atividade recente (membros
que estiveram online mais recentemente primeiro).

## Dependências

Requer `last_seen_at` em `members`, que vem de [CV0.E2.S1](../cv0-e2-s1-last-seen/).
S3 não entra antes de S1 fechar.

## Notas

A toggle deve persistir a escolha do membro em cookie ou
localStorage. Default: alfabética (preserva a expectativa atual).
Ativação consciente, não imposta.
