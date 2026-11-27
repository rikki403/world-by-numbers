/* views.js — one render function per section. All numbers come from data.js.
   Polish pass: fixed name-column sorting (strings need localeCompare),
   removed dead code from the Indicators view, clarified source wordings. */

function cite(fig) { return fig.source + ", " + fig.year; }

function kpi(label, value, sub) {
  return '<div class="kpi"><div class="k-label">' + esc(label) + '</div>' +
    '<div class="k-value">' + esc(value) + '</div><div class="k-sub">' + esc(sub) + '</div></div>';
}

function viewOverview() {
  const top5 = COUNTRIES.slice(0, 5).map(function (c) {
    return { label: c.name, value: c.pop, display: c.pop.toLocaleString("en-US") + "m" };
  });
  const gdpShare = [
    { label: "United States", value: 29.18 },
    { label: "China", value: 18.74 },
    { label: "Germany", value: 4.69 },
    { label: "Japan", value: 4.03 },
    { label: "India", value: 3.91 },
    { label: "Rest of the world", value: 57.8 }
  ];
  const colors = ["#0f766e", "#b45309", "#1d4ed8", "#be185d", "#4d7c0f", "#64748b"];
  const legend = '<ul class="legend">' + gdpShare.map(function (s, i) {
    return '<li><span class="sw" style="background:' + colors[i] + '"></span>' + esc(s.label) +
      '<b>$' + s.value.toFixed(2) + 'tn</b></li>';
  }).join("") + "</ul>";
  return '' +
    '<h2>The world at a glance</h2>' +
    '<p class="lede">8.22 billion people live on Earth. Together they produce about $118 trillion a year, live 73.5 years on average, and emit 37.4 billion tonnes of fossil CO2. Pick a section above to dig into countries, indicators, trends — or compare two countries head to head.</p>' +
    '<div class="kpis">' +
      kpi("World population", WORLD.population.value, cite(WORLD.population)) +
      kpi("World GDP", WORLD.gdp.value, cite(WORLD.gdp)) +
      kpi("Life expectancy", WORLD.lifeExpectancy.value, cite(WORLD.lifeExpectancy)) +
      kpi("Fossil CO2", WORLD.co2.value, cite(WORLD.co2)) +
    '</div>' +
    '<div class="kpis">' +
      kpi("GDP per person (PPP)", WORLD.gdpPppPerCapita.value, cite(WORLD.gdpPppPerCapita)) +
      kpi("Fertility rate", WORLD.fertility.value, cite(WORLD.fertility)) +
      kpi("Living in cities", WORLD.urban.value, cite(WORLD.urban)) +
      kpi("People online", WORLD.internet.value, cite(WORLD.internet)) +
    '</div>' +
    '<div class="grid2">' +
      '<section class="panel"><h3>Largest countries by population</h3>' +
        barChart(top5, { color: "#0f766e" }) +
        '<p class="src"><b>Source:</b> UN World Population Prospects 2024, mid-2024 estimates. India passed China as the most populous country in 2023.</p></section>' +
      '<section class="panel"><h3>Who makes the world&rsquo;s GDP?</h3>' +
        donutChart(gdpShare, { center: "$118tn", centerSub: "world GDP, 2025" }) + legend +
        '<p class="src"><b>Source:</b> World Bank, World Development Indicators, 2024–2025. The US and China alone make 43% of world output.</p></section>' +
    '</div>' +
    '<section class="panel"><h3>Three numbers that explain the century</h3>' +
      '<ul class="facts">' +
      '<li><span>World population will peak at about <b>10.3 billion</b> in the mid-2080s, then slowly fall.</span><span>UN, 2024</span></li>' +
      '<li><span>Life expectancy rose from 66.8 years in 2000 to 73.3 in 2024 — despite the pandemic dip.</span><span>UN, 2024</span></li>' +
      '<li><span>Fossil CO2 keeps setting records: 37.4 billion tonnes in 2024, up 0.8% on 2023.</span><span>GCB, 2024</span></li>' +
      '<li><span>1 in 4 people on Earth is under 15; 1 in 10 is 65 or older.</span><span>World Bank, 2025</span></li>' +
      '</ul></section>' +
    '<p class="note">Every figure on this site carries its source and year. ' + FIGURE_COUNT +
    ' individual figures are published across the Countries, Indicators and Trends pages.</p>';
}

/* ---- Countries ---- */
let countryState = { q: "", region: "All", sort: "pop", dir: -1, sel: null };

function countryRows() {
  const list = COUNTRIES.filter(function (c) {
    const okRegion = countryState.region === "All" || c.region === countryState.region;
    const okQ = !countryState.q || c.name.toLowerCase().indexOf(countryState.q.toLowerCase()) !== -1;
    return okRegion && okQ;
  });
  const k = countryState.sort;
  list.sort(function (a, b) {
    if (k === "name") return a.name.localeCompare(b.name) * countryState.dir;
    return (a[k] - b[k]) * countryState.dir;
  });
  return list;
}

function viewCountries() {
  const rows = countryRows();
  const regions = ["All", "Asia", "Europe", "Americas", "Africa"];
  const chips = regions.map(function (r) {
    return '<button class="chip' + (countryState.region === r ? " on" : "") + '" data-region="' + r + '">' + r + "</button>";
  }).join("");
  const sortBtn = function (key, label) {
    const arrow = countryState.sort === key ? (countryState.dir === -1 ? " ▼" : " ▲") : "";
    return '<button data-sort="' + key + '">' + label + arrow + "</button>";
  };
  const body = rows.map(function (c) {
    return '<tr data-name="' + esc(c.name) + '" class="' + (countryState.sel === c.name ? "sel" : "") + '">' +
      "<td><strong>" + esc(c.name) + "</strong><br><span style='color:#6b7686;font-size:12.5px'>" + c.region + "</span></td>" +
      "<td>" + c.pop.toLocaleString("en-US") + "</td>" +
      "<td>$" + c.gdp.toLocaleString("en-US") + "bn</td>" +
      "<td>$" + c.gdpCap.toLocaleString("en-US") + "</td>" +
      "<td>" + c.life.toFixed(1) + "</td>" +
      "<td>" + c.co2.toLocaleString("en-US") + "</td>" +
      "<td>" + c.fertility.toFixed(1) + "</td></tr>";
  }).join("");
  let detail = "";
  if (countryState.sel) {
    const c = COUNTRIES.find(function (x) { return x.name === countryState.sel; });
    if (c) {
      detail = '<section class="panel detail"><h3>' + esc(c.name) + ' — in detail</h3>' +
        "<p>" + esc(c.name) + " is the " + (COUNTRIES.indexOf(c) + 1) + "th largest country by population in this table (" + c.region + ").</p><dl>" +
        "<dt>Population</dt><dd>" + c.pop.toLocaleString("en-US") + " million</dd>" +
        "<dt>GDP</dt><dd>$" + c.gdp.toLocaleString("en-US") + " billion</dd>" +
        "<dt>GDP per person</dt><dd>$" + c.gdpCap.toLocaleString("en-US") + "</dd>" +
        "<dt>Life expectancy</dt><dd>" + c.life.toFixed(1) + " years</dd>" +
        "<dt>Fossil CO2</dt><dd>" + c.co2.toLocaleString("en-US") + " million tonnes</dd>" +
        "<dt>Fertility</dt><dd>" + c.fertility.toFixed(1) + " births per woman</dd></dl>" +
        '<p class="src"><b>Sources:</b> population — UN WPP 2024; GDP — World Bank, 2024; life expectancy &amp; fertility — World Bank, 2023–2024; CO2 — Global Carbon Budget 2025.</p></section>';
    }
  }
  return '' +
    "<h2>Countries</h2>" +
    '<p class="lede">The 20 most populous countries — home to about three quarters of humanity. Search, filter by region, sort any column, or tap a row for the detail card.</p>' +
    '<div class="controls"><input type="search" id="cq" placeholder="Search a country…" value="' + esc(countryState.q) + '" aria-label="Search countries">' + chips + "</div>" +
    '<div class="tablewrap"><table class="data"><thead><tr>' +
    "<th>" + sortBtn("name", "Country") + "</th>" +
    "<th>" + sortBtn("pop", "Population (m)") + "</th>" +
    "<th>" + sortBtn("gdp", "GDP ($bn)") + "</th>" +
    "<th>" + sortBtn("gdpCap", "GDP / person ($)") + "</th>" +
    "<th>" + sortBtn("life", "Life exp. (yrs)") + "</th>" +
    "<th>" + sortBtn("co2", "CO2 (Mt)") + "</th>" +
    "<th>" + sortBtn("fertility", "Fertility") + "</th>" +
    "</tr></thead><tbody>" + (body || '<tr><td colspan="7">No country matches that search.</td></tr>') + "</tbody></table></div>" +
    '<p class="count-note">Showing ' + rows.length + " of " + COUNTRIES.length + ' countries. Population: UN WPP 2024 · GDP: World Bank 2024 · Life expectancy: World Bank 2023 · CO2: Global Carbon Budget 2025.</p>' +
    detail;
}

/* ---- Indicators ---- */
let indState = { cat: "economy" };

function viewIndicators() {
  const cats = Object.keys(INDICATORS);
  const tabs = cats.map(function (k) {
    return '<button class="chip' + (indState.cat === k ? " on" : "") + '" data-cat="' + k + '">' + INDICATORS[k].title + "</button>";
  }).join("");
  const ind = INDICATORS[indState.cat];
  const chartItems = ind.rows.map(function (r) {
    return { label: r.label, value: r.value, display: fmtNum(r.value) };
  });
  const chartColor = indState.cat === "climate" ? "#b45309" : indState.cat === "health" ? "#be185d" : "#0f766e";
  const facts = ind.extra.map(function (f) {
    return "<li><span>" + esc(f[0]) + "</span><span>" + esc(f[1]) + "</span></li>";
  }).join("");
  return '' +
    "<h2>Indicators</h2>" +
    '<p class="lede">One topic at a time, ranked. Switch category to see the leaders in economy, health, demographics, climate or education.</p>' +
    '<div class="controls">' + tabs + "</div>" +
    '<section class="panel"><h3>' + esc(ind.title) + ' — top 10</h3><p>' + esc(ind.blurb) + "</p>" +
    barChart(chartItems, { color: chartColor }) +
    '<p class="src"><b>Source:</b> ' + esc(ind.source) + ". Values are the latest published year for each figure; see Sources for details.</p></section>" +
    '<section class="panel"><h3>More ' + esc(ind.title.toLowerCase()) + " figures</h3><ul class=\"facts\">" + facts + "</ul></section>";
}

/* ---- Trends ---- */
let trendState = { key: "population" };

function viewTrends() {
  const keys = Object.keys(TRENDS);
  const tabs = keys.map(function (k) {
    return '<button class="chip' + (trendState.key === k ? " on" : "") + '" data-trend="' + k + '">' + TRENDS[k].title + "</button>";
  }).join("");
  const t = TRENDS[trendState.key];
  const first = t.points[0], last = t.points[t.points.length - 1];
  const change = (((last[1] - first[1]) / first[1]) * 100).toFixed(0);
  const colors = { population: "#0f766e", gdp: "#1d4ed8", life: "#be185d", co2: "#b45309" };
  const summary = keys.map(function (k) {
    const tr = TRENDS[k];
    const a = tr.points[0], b = tr.points[tr.points.length - 1];
    return '<li><span>' + esc(tr.title) + ": " + fmtNum(a[1]) + " (" + a[0] + ") → " + fmtNum(b[1]) + " (" + b[0] + ")</span><span>" + esc(tr.source) + "</span></li>";
  }).join("");
  return '' +
    "<h2>Trends</h2>" +
    '<p class="lede">How the world changed. One chart at a time — pick a series below. The population curve bends but never falls; CO2 does not bend at all yet.</p>' +
    '<div class="controls">' + tabs + "</div>" +
    '<section class="panel"><h3>' + esc(t.title) + " — " + first[0] + " to " + last[0] + "</h3>" +
    lineChart(t.points, { color: colors[trendState.key], unit: t.unit }) +
    '<p><strong>' + fmtNum(first[1]) + " → " + fmtNum(last[1]) + " " + esc(t.unit) + "</strong> — a change of " + (change >= 0 ? "+" : "") + change + "% over the period.</p>" +
    '<p class="src"><b>Source:</b> ' + esc(t.source) + ".</p></section>" +
    '<section class="panel"><h3>All four series, at a glance</h3><ul class="facts">' + summary + "</ul></section>";
}

/* ---- Compare ---- */
let cmpState = { a: "China", b: "United States" };

function cmpRow(label, av, bv, unit, fmt) {
  const f = fmt || function (v) { return v.toLocaleString("en-US"); };
  const max = Math.max(av, bv) || 1;
  return '<div class="cmp-row">' + esc(label) + " <b>" + f(av) + " " + unit + " vs " + f(bv) + " " + unit + "</b>" +
    '<div class="cmpbar"><i style="width:' + Math.round((av / max) * 100) + '%"></i></div>' +
    '<div class="cmpbar b"><i style="width:' + Math.round((bv / max) * 100) + '%"></i></div></div>';
}

function viewCompare() {
  const opts = function (sel) {
    return COUNTRIES.map(function (c) {
      return '<option value="' + esc(c.name) + '"' + (c.name === sel ? " selected" : "") + ">" + esc(c.name) + "</option>";
    }).join("");
  };
  const A = COUNTRIES.find(function (c) { return c.name === cmpState.a; });
  const B = COUNTRIES.find(function (c) { return c.name === cmpState.b; });
  return '' +
    "<h2>Compare two countries</h2>" +
    '<p class="lede">Pick any two of the 20 largest countries and see them side by side — same numbers, same years, no spin.</p>' +
    '<div class="controls"><label>Country A <select id="cmpA" aria-label="First country">' + opts(cmpState.a) + '</select></label>' +
    '<label>Country B <select id="cmpB" aria-label="Second country">' + opts(cmpState.b) + '</select></label></div>' +
    '<div class="vs"><div class="col"><h3>' + esc(A.name) + "</h3><p>" + A.region + " · population rank #" + (COUNTRIES.indexOf(A) + 1) + "</p>" +
    cmpRow("Population (millions)", A.pop, B.pop, "m") +
    cmpRow("GDP ($bn)", A.gdp, B.gdp, "bn") +
    cmpRow("GDP per person ($)", A.gdpCap, B.gdpCap, "") +
    cmpRow("Life expectancy (years)", A.life, B.life, "yrs", function (v) { return v.toFixed(1); }) +
    cmpRow("Fossil CO2 (Mt)", A.co2, B.co2, "Mt") +
    cmpRow("Fertility", A.fertility, B.fertility, "", function (v) { return v.toFixed(1); }) +
    '</div><div class="mid">VS</div><div class="col"><h3>' + esc(B.name) + "</h3><p>" + B.region + " · population rank #" + (COUNTRIES.indexOf(B) + 1) + "</p>" +
    "<p><strong>" + esc(B.name) + "</strong> at a glance:</p><ul class=\"facts\">" +
    "<li><span>Population</span><span>" + B.pop.toLocaleString("en-US") + " million</span></li>" +
    "<li><span>GDP</span><span>$" + B.gdp.toLocaleString("en-US") + " billion</span></li>" +
    "<li><span>GDP per person</span><span>$" + B.gdpCap.toLocaleString("en-US") + "</span></li>" +
    "<li><span>Life expectancy</span><span>" + B.life.toFixed(1) + " years</span></li>" +
    "<li><span>Fossil CO2</span><span>" + B.co2.toLocaleString("en-US") + " Mt</span></li>" +
    "<li><span>Fertility</span><span>" + B.fertility.toFixed(1) + "</span></li></ul>" +
    '<p class="src"><b>Sources:</b> population — UN WPP 2024; GDP — World Bank, 2024; life expectancy &amp; fertility — World Bank, 2023–2024; CO2 — Global Carbon Budget 2025. Teal bars are ' + esc(A.name) + "; amber bars are " + esc(B.name) + ".</p></div></div>";
}

/* ---- Sources ---- */
function viewSources() {
  const rows = SOURCES.map(function (s) {
    return "<li><span><strong>" + esc(s[0]) + "</strong><br>" + esc(s[1]) + "</span></li>";
  }).join("");
  return '' +
    "<h2>Sources &amp; methods</h2>" +
    '<p class="lede">Nothing here is invented. Every figure on this site comes from a published official source, and each page names the source and year beside the number.</p>' +
    '<section class="panel"><h3>Where the numbers come from</h3><ul class="facts">' + rows + "</ul></section>" +
    '<section class="panel"><h3>How to read this site</h3>' +
    "<p><strong>Years differ on purpose.</strong> Each figure uses the latest year its source publishes — population is 2024–2025, GDP is 2024, life expectancy is mostly 2023. The year is always shown next to the figure.</p>" +
    "<p><strong>GDP is nominal</strong> (current US dollars at market exchange rates) unless it says PPP — purchasing-power parity, which adjusts for what money buys locally. China leads on PPP; the United States leads at market rates.</p>" +
    "<p><strong>CO2 is fossil-fuel CO2</strong> (including cement), counted where it is emitted, from the Global Carbon Budget. Land-use emissions add about 4.2 billion tonnes on top.</p>" +
    "<p><strong>Rounding.</strong> Big numbers are rounded for readability (for example $29.18 trillion). Rankings use the unrounded published values.</p>" +
    "<p><strong>Figures count:</strong> " + FIGURE_COUNT + " individual published figures across the Overview, Countries, Indicators and Trends pages.</p></section>" +
    '<p class="note">Found a figure that looks out of date? Check the source and year shown beside it — sources revise their numbers, and this site reports the vintage it cites.</p>';
}

const VIEWS = {
  "": viewOverview,
  countries: viewCountries,
  indicators: viewIndicators,
  trends: viewTrends,
  compare: viewCompare,
  sources: viewSources
};
