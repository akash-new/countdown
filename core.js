// Shared logic. Runs in the browser (PWA) AND inside the Scriptable widget,
// so keep it free of DOM / Scriptable APIs.

function dateKey(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// Whole-day index for a YYYY-MM-DD key (UTC maths, so DST can't shift a day).
function dayNum(key) {
  const [y, m, d] = key.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86400000;
}

function daysUntil(key, now) {
  return dayNum(key) - dayNum(dateKey(now || new Date()));
}

// upcoming: days to go | ongoing: day X of Y | past: days since it ended
function eventStatus(ev, now) {
  const start = daysUntil(ev.date, now);
  const end = ev.endDate ? daysUntil(ev.endDate, now) : start;
  if (start > 0) return { state: "upcoming", days: start };
  if (end >= 0) return { state: "ongoing", day: 1 - start, total: end - start + 1 };
  return { state: "past", days: -end };
}

function phaseFor(st) {
  if (st.state === "ongoing") return "today";
  if (st.days > 30) return "far";
  if (st.days > 7) return "mid";
  if (st.days > 2) return "close";
  return "final";
}

// Active events, most urgent first (ongoing, then soonest).
function rankEvents(events, now) {
  return events
    .map((ev) => ({ ev, st: eventStatus(ev, now) }))
    .filter((x) => x.st.state !== "past")
    .sort((a, b) => {
      if (a.st.state !== b.st.state) return a.st.state === "ongoing" ? -1 : 1;
      return (a.st.days || 0) - (b.st.days || 0);
    });
}

function headline(st) {
  if (st.state === "upcoming")
    return { big: String(st.days), small: st.days === 1 ? "day to go" : "days to go" };
  if (st.state === "ongoing")
    return st.total > 1
      ? { big: `${st.day}/${st.total}`, small: "days in" }
      : { big: "GO", small: "today" };
  return { big: String(st.days), small: st.days === 1 ? "day ago" : "days ago" };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function quotePool(Q, mode, category, phase) {
  const m = Q[mode] || Q.gentle;
  const cat = (m[category] && m[category][phase]) || [];
  return cat.concat(m.any[phase] || []);
}

// Deterministic per day: consecutive days step through the pool, so the app,
// widget and notification all show the same line and it doesn't repeat.
function pickQuote(Q, mode, item, now) {
  const d = now || new Date();
  let text;
  if (!item) {
    const pool = Q[mode].any.done;
    text = pool[dayNum(dateKey(d)) % pool.length];
  } else {
    const pool = quotePool(Q, mode, item.ev.category, phaseFor(item.st));
    text = pool[(dayNum(dateKey(d)) + hashStr(item.ev.id)) % pool.length];
  }
  const n = item && item.st.days != null ? item.st.days : 0;
  return text.replace(/\{n\}/g, n).replace(/\{title\}/g, item ? item.ev.title : "");
}

function summaryLine(item) {
  const h = headline(item.st);
  return item.st.state === "ongoing" && item.st.total > 1
    ? `${item.ev.title}: day ${item.st.day} of ${item.st.total}`
    : `${item.ev.title}: ${h.big} ${h.small}`;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    dateKey, dayNum, daysUntil, eventStatus, phaseFor, rankEvents,
    headline, pickQuote, quotePool, summaryLine,
  };
}
