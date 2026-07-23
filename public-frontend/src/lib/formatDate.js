export function formatDate(value) {
  if (!value) return null;
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(value),
  );
}
