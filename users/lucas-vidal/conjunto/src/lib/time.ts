/**
 * Relative time formatting in Portuguese.
 *
 * Pure function: receives an ISO timestamp and an optional "now"
 * reference (defaults to Date.now()). Returns a human-readable
 * string like "há 3 horas" or "agora mesmo".
 */

export function formatRelativeTime(
  iso: string,
  nowMs: number = Date.now()
): string {
  const then = new Date(iso).getTime();
  if (isNaN(then)) return "";

  const diffMs = nowMs - then;
  if (diffMs < 0) return "agora mesmo";

  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return "agora mesmo";
  if (minutes === 1) return "há 1 minuto";
  if (minutes < 60) return `há ${minutes} minutos`;
  if (hours === 1) return "há 1 hora";
  if (hours < 24) return `há ${hours} horas`;
  if (days === 1) return "há 1 dia";
  if (days < 7) return `há ${days} dias`;
  if (weeks === 1) return "há 1 semana";
  if (days < 30) return `há ${weeks} semanas`;
  return "há mais de um mês";
}
