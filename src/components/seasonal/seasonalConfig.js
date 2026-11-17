export const seasonalConfig = {
  enabled: true,
  festival: "auto", // auto | christmas | newYear | none
  duration: 1800, // Safely bounded to 1500-2000 ms.
  periods: [
    { festival: "christmas", start: "2026-11-17", end: "2026-12-26" },
    { festival: "newYear", start: "2026-12-27", end: "2027-01-03" },
  ],
};

// Calendar comparisons deliberately avoid parsing ISO strings as UTC dates.
function calendarDay(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return { year: y, month: m, key: y * 10000 + m * 100 + d };
}

export function resolveSeasonalCampaign(date = new Date(), settings = seasonalConfig, preview) {
  if (!settings.enabled || !Number.isFinite(date.getTime())) return null;
  const mode = preview || settings.festival;
  if (mode === "none") return null;
  const today = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const periods = (settings.periods || []).map(period => ({
    ...period, from: calendarDay(period.start), to: calendarDay(period.end),
  })).filter(period => period.from && period.to && period.from.key <= period.to.key);
  const active = periods.find(period => period.from.key <= today && today <= period.to.key);
  const festival = mode === "auto" ? active?.festival : mode;
  if (!festival) return null;
  const rawDuration = Number(settings.duration);
  const duration = Math.min(2000, Math.max(1500, Number.isFinite(rawDuration) ? rawDuration : 1800));
  // A manual New Year preview uses its active/upcoming campaign, never a fixed year.
  const yearPeriod = periods.filter(period => period.festival === "newYear" && period.to.key >= today)
    .sort((a, b) => a.from.key - b.from.key)[0];
  const year = yearPeriod
    ? (yearPeriod.from.month === 12 && yearPeriod.to.year === yearPeriod.from.year ? yearPeriod.to.year + 1 : yearPeriod.to.year)
    : date.getFullYear() + 1;
  return { festival, duration, year };
}
