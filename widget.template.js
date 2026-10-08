// ---- Scriptable widget (CONFIG, QUOTES and core.js are prepended by the app) ----

function addText(stack, text, size, weight, color, opts) {
  const t = stack.addText(text);
  t.font = Font.systemFont(size);
  if (weight === "bold") t.font = Font.boldSystemFont(size);
  if (weight === "heavy") t.font = Font.heavySystemFont(size);
  t.textColor = new Color(color);
  if (opts && opts.lines) t.lineLimit = opts.lines;
  if (opts && opts.minScale) t.minimumScaleFactor = opts.minScale;
  return t;
}

function eventColumn(parent, item, bigSize) {
  const col = parent.addStack();
  col.layoutVertically();
  const h = headline(item.st);
  addText(col, h.big, bigSize, "heavy", "#FF7A18", { lines: 1, minScale: 0.5 });
  addText(col, h.small, 11, "regular", "#BBBBBB", { lines: 1 });
  addText(col, item.ev.title, 12, "bold", "#FFFFFF", { lines: 2, minScale: 0.7 });
  return col;
}

function buildWidget(ranked, quote, family) {
  const w = new ListWidget();
  w.backgroundColor = new Color("#14141C");
  w.setPadding(14, 14, 14, 14);

  // Refresh just after midnight so the number changes on its own.
  const next = new Date();
  next.setDate(next.getDate() + 1);
  next.setHours(0, 5, 0, 0);
  w.refreshAfterDate = next;

  if (!ranked.length) {
    addText(w, "All done 🎉", 20, "heavy", "#FFFFFF");
    w.addSpacer(6);
    addText(w, quote, 12, "regular", "#BBBBBB", { minScale: 0.7 });
    return w;
  }

  if (family === "small" || family === undefined) {
    eventColumn(w, ranked[0], 44);
    w.addSpacer();
    return w;
  }

  const row = w.addStack();
  row.centerAlignContent();
  ranked.slice(0, 3).forEach((item, i) => {
    if (i > 0) row.addSpacer();
    eventColumn(row, item, i === 0 ? 44 : 30);
  });
  w.addSpacer();
  addText(w, quote, 12, "regular", "#DDDDDD", { lines: 3, minScale: 0.75 });
  return w;
}

async function main() {
  const now = new Date();
  const ranked = rankEvents(CONFIG.events, now);
  const quote = pickQuote(QUOTES, CONFIG.mode, ranked[0], now);

  // Called from a Shortcut with any input -> return notification text.
  if (typeof args !== "undefined" && args.shortcutParameter != null) {
    const title = ranked.length ? summaryLine(ranked[0]) : "All done";
    const others = ranked.slice(1).map(summaryLine).join("\n");
    Script.setShortcutOutput(JSON.stringify({ title, body: quote + (others ? "\n" + others : "") }));
    Script.complete();
    return;
  }

  const widget = buildWidget(ranked, quote, config.widgetFamily);
  if (config.runsInWidget) Script.setWidget(widget);
  else await widget.presentMedium();
  Script.complete();
}

main();
