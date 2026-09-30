export function parseTodoTitle(title: string): string | null {
  const t = title.trim();
  return t ? t : null;
}
