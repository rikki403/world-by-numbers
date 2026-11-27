/* main.js — hash router + wiring for every control. No network, no libraries. */

function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const key = hash.split("/")[0];
  const fn = VIEWS[key] || VIEWS[""];
  document.getElementById("app").innerHTML = fn();
  document.querySelectorAll("#nav a").forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("data-route") === (VIEWS[key] ? key : ""));
  });
  wire(key);
  window.scrollTo(0, 0);
}

function wire(key) {
  if (key === "countries") {
    const q = document.getElementById("cq");
    if (q) {
      q.addEventListener("input", function () { countryState.q = q.value; rerenderKeepFocus(); });
      q.addEventListener("keydown", function (e) { if (e.key === "Enter") e.preventDefault(); });
    }
    document.querySelectorAll("[data-region]").forEach(function (b) {
      b.addEventListener("click", function () { countryState.region = b.getAttribute("data-region"); route(); });
    });
    document.querySelectorAll("[data-sort]").forEach(function (b) {
      b.addEventListener("click", function () {
        const k = b.getAttribute("data-sort");
        if (countryState.sort === k) { countryState.dir = -countryState.dir; }
        else { countryState.sort = k; countryState.dir = (k === "name") ? 1 : -1; }
        route();
      });
    });
    document.querySelectorAll("table.data tbody tr").forEach(function (tr) {
      tr.addEventListener("click", function () {
        const name = tr.getAttribute("data-name");
        countryState.sel = (countryState.sel === name) ? null : name;
        route();
      });
    });
  }
  if (key === "indicators") {
    document.querySelectorAll("[data-cat]").forEach(function (b) {
      b.addEventListener("click", function () { indState.cat = b.getAttribute("data-cat"); route(); });
    });
  }
  if (key === "trends") {
    document.querySelectorAll("[data-trend]").forEach(function (b) {
      b.addEventListener("click", function () { trendState.key = b.getAttribute("data-trend"); route(); });
    });
  }
  if (key === "compare") {
    const a = document.getElementById("cmpA"), b = document.getElementById("cmpB");
    if (a) a.addEventListener("change", function () { cmpState.a = a.value; route(); });
    if (b) b.addEventListener("change", function () { cmpState.b = b.value; route(); });
  }
}

/* Re-render the countries view while keeping the search box focused,
   so typing never loses the cursor. */
function rerenderKeepFocus() {
  const pos = document.getElementById("cq").selectionStart;
  route();
  const q = document.getElementById("cq");
  if (q) { q.focus(); q.setSelectionRange(pos, pos); }
}

window.addEventListener("hashchange", route);
route();
