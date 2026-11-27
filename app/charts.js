/* charts.js — hand-drawn SVG charts. No libraries, no network.
   Every chart is built from the numbers in data.js. */

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* Horizontal bar chart. items: [{label, value, display}] */
function barChart(items, opts) {
  const o = Object.assign({ width: 640, rowH: 34, maxLabel: 118, color: "#0f766e", unit: "" }, opts || {});
  const max = Math.max.apply(null, items.map(function (i) { return i.value; }));
  const plotW = o.width - o.maxLabel - 90;
  const h = items.length * o.rowH + 14;
  let out = '<svg class="chart" viewBox="0 0 ' + o.width + ' ' + h + '" role="img" aria-label="Bar chart">';
  items.forEach(function (it, i) {
    const y = 8 + i * o.rowH;
    const w = Math.max(2, Math.round((it.value / max) * plotW));
    out += '<text x="0" y="' + (y + 15) + '" class="chart-label">' + esc(it.label) + '</text>';
    out += '<rect x="' + o.maxLabel + '" y="' + y + '" width="' + w + '" height="20" rx="4" fill="' + o.color + '"/>';
    out += '<text x="' + (o.maxLabel + w + 8) + '" y="' + (y + 15) + '" class="chart-value">' + esc(it.display || String(it.value)) + '</text>';
  });
  out += "</svg>";
  return out;
}

/* Line chart over time. points: [[year, value], ...] */
function lineChart(points, opts) {
  const o = Object.assign({ width: 640, height: 260, color: "#b45309", unit: "" }, opts || {});
  const padL = 52, padR = 16, padT = 18, padB = 30;
  const xs = points.map(function (p) { return p[0]; });
  const ys = points.map(function (p) { return p[1]; });
  const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
  let y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
  const span = (y1 - y0) || 1;
  y0 -= span * 0.12; y1 += span * 0.12;
  const X = function (x) { return padL + ((x - x0) / (x1 - x0)) * (o.width - padL - padR); };
  const Y = function (y) { return padT + (1 - (y - y0) / (y1 - y0)) * (o.height - padT - padB); };
  let d = points.map(function (p, i) { return (i ? "L" : "M") + X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1); }).join(" ");
  let out = '<svg class="chart" viewBox="0 0 ' + o.width + ' ' + o.height + '" role="img" aria-label="Line chart">';
  [0.25, 0.5, 0.75].forEach(function (f) {
    const yv = y0 + (y1 - y0) * f;
    out += '<line x1="' + padL + '" y1="' + Y(yv) + '" x2="' + (o.width - padR) + '" y2="' + Y(yv) + '" class="grid"/>';
    out += '<text x="' + (padL - 6) + '" y="' + (Y(yv) + 4) + '" class="chart-axis" text-anchor="end">' + fmtNum(yv) + '</text>';
  });
  out += '<path d="' + d + '" fill="none" stroke="' + o.color + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
  points.forEach(function (p) {
    out += '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="4.5" fill="' + o.color + '"/>';
    out += '<text x="' + X(p[0]) + '" y="' + (o.height - 10) + '" class="chart-axis" text-anchor="middle">' + p[0] + '</text>';
    out += '<text x="' + X(p[0]) + '" y="' + (Y(p[1]) - 10) + '" class="chart-value" text-anchor="middle">' + fmtNum(p[1]) + '</text>';
  });
  out += "</svg>";
  return out;
}

/* Donut chart for shares. items: [{label, value}] — values are shares in %. */
function donutChart(items, opts) {
  const o = Object.assign({ size: 300, colors: ["#0f766e", "#b45309", "#1d4ed8", "#be185d", "#4d7c0f", "#6d28d9", "#64748b"] }, opts || {});
  const cx = o.size / 2, cy = o.size / 2, r = o.size / 2 - 14, inner = r * 0.62;
  const total = items.reduce(function (s, i) { return s + i.value; }, 0);
  let a = -Math.PI / 2, out = '<svg class="chart donut" viewBox="0 0 ' + o.size + ' ' + o.size + '" role="img" aria-label="Donut chart">';
  items.forEach(function (it, i) {
    const frac = it.value / total, a2 = a + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(a), y1 = cy + r * Math.sin(a);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const xi1 = cx + inner * Math.cos(a2), yi1 = cy + inner * Math.sin(a2);
    const xi2 = cx + inner * Math.cos(a), yi2 = cy + inner * Math.sin(a);
    out += '<path d="M' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + x2.toFixed(1) + ',' + y2.toFixed(1) +
      ' L' + xi1.toFixed(1) + ',' + yi1.toFixed(1) + ' A' + inner + ',' + inner + ' 0 ' + large + ' 0 ' + xi2.toFixed(1) + ',' + yi2.toFixed(1) + ' Z" fill="' + o.colors[i % o.colors.length] + '"/>';
    a = a2;
  });
  out += '<text x="' + cx + '" y="' + (cy - 4) + '" class="donut-big" text-anchor="middle">' + esc(o.center || "") + '</text>';
  out += '<text x="' + cx + '" y="' + (cy + 18) + '" class="donut-small" text-anchor="middle">' + esc(o.centerSub || "") + '</text>';
  out += "</svg>";
  return out;
}

function fmtNum(v) {
  if (Math.abs(v) >= 1000) return v.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(v) >= 100) return v.toFixed(0);
  if (Math.abs(v) >= 10) return v.toFixed(1);
  return String(Math.round(v * 100) / 100);
}
