// Packs the original compiled React build into one self-contained HTML page,
// with an in-browser stand-in for the Laravel API seeded from nyp_db.sql.
const fs = require('fs');
const path = require('path');

const root = process.argv[2];               // path to frontend/ (after npm run build)
const out = process.argv[3];
const app = root;
const build = path.join(app, 'build');

const read = p => fs.readFileSync(p, 'utf8');
const b64 = (p, mime) => `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
const safe = s => s.replace(/<\/script/gi, '<\\/script').replace(/\/\/# sourceMappingURL=.*$/gm, '');

const indexHtml = read(path.join(build, 'index.html'));
const runtime = indexHtml.match(/<script>([\s\S]*?)<\/script>/)[1];
const jsDir = path.join(build, 'static', 'js');
const cssDir = path.join(build, 'static', 'css');
const pick = (dir, re) => fs.readdirSync(dir).find(f => re.test(f));
const vendorJs = read(path.join(jsDir, pick(jsDir, /^2\..*\.chunk\.js$/)));
const mainJs = read(path.join(jsDir, pick(jsDir, /^main\..*\.chunk\.js$/)));
let css = read(path.join(cssDir, pick(cssDir, /^main\..*\.chunk\.css$/)));
css = css.replace(/url\(\/static\/media\/([^)]+)\)/g, (m, f) =>
  `url(${b64(path.join(build, 'static', 'media', f), 'image/png')})`)
  .replace(/\/\*# sourceMappingURL=.*?\*\//g, '');


// Seed rows copied from nyp_db.sql (password hash and api_token left out).
const seed = {
  categories: [
    { category_id: 1, category_desc: 'Dance', created_at: '2019-05-15 23:10:16', updated_at: '2019-05-15 23:10:16' },
    { category_id: 2, category_desc: 'Sports', created_at: '2019-05-15 23:10:22', updated_at: '2019-05-15 23:10:22' },
    { category_id: 3, category_desc: 'Entertainment', created_at: '2019-05-15 23:10:31', updated_at: '2019-05-15 23:10:31' },
    { category_id: 4, category_desc: 'Cultural', created_at: '2019-05-15 23:10:46', updated_at: '2019-05-15 23:10:46' }
  ],
  users: [
    { user_id: 1, username: 'harry', role: 'student', phoneNo: '81236789', created_at: '2019-05-15 23:11:06', updated_at: '2019-05-15 23:11:06' }
  ],
  events: [
    { event_id: 1, event_title: 'NYP Groove', event_desc: "Think you've got the moves to thrill and rock an audience? Round up your squad and show off your cool steps at NYP GROOVE! street dance competition. Stand to win attractive prizes!", startDate: '2019-05-05', endDate: '2019-05-11', startTime: '3PM', endTime: '5PM', organiser: 'NYP Dance Club', venue: 'Block A, Nanyang Polytechnic', u_id: 1, c_id: 1, photo: 'nypgroove.jpg', organiser_email: 'dancenyp@nyp_email.com', status: 'Ongoing', closing_date: '2019-04-28', cancellation_date: null, created_at: '2019-05-15 23:17:57', updated_at: '2019-05-15 23:17:57' }
  ],
  event__feedback: [],
  event__registers: []
};

const shim = `
(function () {
  var KEY = 'nyp-demo-db-v1';
  var SEED = ${JSON.stringify(seed)};
  var KEYS = { users: 'user_id', events: 'event_id', categories: 'category_id', event__feedback: 'id', event__registers: 'id' };
  var FILLABLE = { events: ['event_title','event_desc','startDate','endDate','startTime','endTime','organiser','venue','u_id','c_id','photo','organiser_email','status','closing_date'] };
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function load() { try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {} return clone(SEED); }
  var db = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }
  window.nypDemoReset = function () { db = clone(SEED); try { localStorage.removeItem(KEY); } catch (e) {} };
  function now() { return new Date().toISOString().slice(0, 19).replace('T', ' '); }
  // Rows go back exactly as stored, like Event::all() does.
  function withPhoto(row) { return row; }
  function json(body, status) {
    return new Response(body === null ? '' : JSON.stringify(body), { status: status || 200, headers: { 'Content-Type': 'application/json' } });
  }
  function readFile(f) { return new Promise(function (res) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = function () { res(''); }; r.readAsDataURL(f); }); }
  function bodyOf(init) {
    var b = init && init.body;
    if (!b) return Promise.resolve({});
    if (typeof b === 'string') { try { return Promise.resolve(JSON.parse(b)); } catch (e) { return Promise.resolve({}); } }
    if (b instanceof FormData) {
      var obj = {}, jobs = [];
      b.forEach(function (v, k) {
        if (v instanceof File) { obj[k] = v.name; }
        else obj[k] = v;
      });
      return Promise.all(jobs).then(function () { return obj; });
    }
    return Promise.resolve({});
  }
  function only(table, data) {
    var f = FILLABLE[table]; if (!f) return data;
    var o = {}; f.forEach(function (k) { if (k in data) o[k] = data[k]; }); return o;
  }
  function route(method, rest, init) {
    var parts = rest.split('?')[0].replace(/\\/+$/, '').split('/');
    var table = parts[0], id = parts[1];
    if (!KEYS[table]) return Promise.resolve(json({ message: '' }, 404));
    var pk = KEYS[table], rows = db[table];
    var find = function () { for (var i = 0; i < rows.length; i++) if (String(rows[i][pk]) === String(id)) return i; return -1; };
    if (method === 'GET' && !id) return Promise.resolve(json(rows.map(withPhoto)));
    if (method === 'GET') { var i = find(); return Promise.resolve(i < 0 ? json(null) : json(withPhoto(rows[i]))); }
    if (method === 'POST' && !id) {
      return bodyOf(init).then(function (data) {
        var row = only(table, data);
        var next = rows.reduce(function (m, r) { return Math.max(m, r[pk]); }, 0) + 1;
        row[pk] = next; row.created_at = row.updated_at = now();
        rows.push(row); save();
        return json(withPhoto(row), 201);
      });
    }
    if ((method === 'PUT' || method === 'DELETE') && id) {
      var j = find();
      if (j < 0) return Promise.resolve(json({ message: 'No query results for model.' }, 404));
      if (method === 'DELETE') { rows.splice(j, 1); save(); return Promise.resolve(json(204)); }
      return bodyOf(init).then(function (data) {
        Object.assign(rows[j], only(table, data), { updated_at: now() }); save();
        return json(withPhoto(rows[j]));
      });
    }
    // Same response Laravel gives when a route has no handler for the method.
    return Promise.resolve(json({ message: 'The ' + method + ' method is not supported for this route.' }, 405));
  }
  var realFetch = window.fetch.bind(window);
  var API = /^https?:\\/\\/nypapp\\.eventsmgr\\/api\\/(.*)$/;
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input.url;
    var m = API.exec(url);
    if (!m) return realFetch(input, init);
    var method = ((init && init.method) || 'GET').toUpperCase();
    return new Promise(function (r) { setTimeout(r, 250); }).then(function () { return route(method, m[1], init); });
  };
})();
`;

const NO_STRIP = process.env.NO_STRIP === '1';
const STANDALONE = process.env.STANDALONE === '1';
let html = `<title>NYP Mobile Events Manager</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Demo frame: thin navy strip above the untouched 2019 UI. Single light theme by choice, matching the original app. */
:root {
  --strip-bg: #14213d;
  --strip-fg: #eef2fb;
  --strip-muted: #a9b6d3;
  --strip-accent: #ffd34d;
  --app-bg: #b8d4ff;
  --font-ui: "IBM Plex Sans", -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "IBM Plex Mono", Consolas, monospace;
  color-scheme: light;
}
${css}
body { background: var(--app-bg); }
.demo-strip { background: var(--strip-bg); color: var(--strip-fg); font-family: var(--font-ui); font-size: 0.875rem; line-height: 1.45;
  padding-block: 10px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.demo-strip .row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 20px; max-width: 1200px; margin: 0 auto; }
.demo-strip .msg { flex: 1 1 380px; min-width: 0; }
.demo-strip strong { color: var(--strip-accent); font-weight: 600; letter-spacing: 0.02em; }
.demo-strip .muted { color: var(--strip-muted); }
.demo-strip code { font-family: var(--font-mono); font-size: 0.8125rem; color: var(--strip-fg); }
.demo-strip .stack { font-family: var(--font-mono); font-size: 0.75rem; color: var(--strip-muted); letter-spacing: 0.04em; text-transform: uppercase; }
.demo-strip button { font: inherit; font-size: 0.8125rem; color: var(--strip-bg); background: var(--strip-accent); border: 0; border-radius: 4px; padding: 6px 12px; cursor: pointer; }
.demo-strip button:hover { filter: brightness(1.08); }
.demo-strip button:focus-visible { outline: 2px solid var(--strip-fg); outline-offset: 2px; }
.app-frame { overflow-x: auto; }
/* Alignment overrides: centre the 2019 layout instead of its fixed 500px left offsets. */
#root header { margin: 24px auto 0; width: calc(100% - 32px); max-width: 1280px; height: auto; aspect-ratio: 1280 / 251; background-size: contain; background-position: center; }
#root ul.header { justify-content: center; flex-wrap: wrap; gap: 8px 48px; padding: 24px 16px; margin: 24px 0 0; }
#root ul.header li { margin-left: 0; }
#root .content { max-width: 1200px; margin: 0 auto; padding: 8px 16px 48px; }
#root #registerEvent, #root #editEvent { margin-left: 0; }
#root h1 { text-align: center; }
#root table#column { margin: 0 auto; }
#root ul.flex { justify-content: center; gap: 24px; padding: 0; }
#root #eventform { max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; align-items: stretch; }
#root #eventform label { display: block; }
#root #eventform p { display: grid; grid-template-columns: 170px minmax(0, 1fr); align-items: center; gap: 12px; margin: 0 0 12px; }
#root #eventform input:not([type=submit]), #root #eventform select { width: 100%; box-sizing: border-box; padding: 6px 8px; font: inherit; }
#root #eventform input[type=submit] { align-self: center; margin-top: 12px; padding: 10px 32px; font: inherit; background: #fff; color: #4d6eff; border: 2px solid green; cursor: pointer; }
@media (max-width: 640px) {
  #root header { margin-top: 12px; width: calc(100% - 24px); }
  #root ul.header { gap: 4px; padding: 10px 8px; margin-top: 12px; flex-wrap: nowrap; justify-content: space-around; }
  #root ul.header li a { font-size: 17px; padding: 8px 14px; }
  #root .content { padding: 4px 12px 32px; }
  #root h1 { font-size: 1.4rem; }
  #root table#column { display: flex; overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; }
  #root table#column > div { flex: 0 0 auto; }
  #root th { font-size: 14px; white-space: nowrap; }
  #root td { font-size: 13px; white-space: nowrap; }
  #root ul.flex { gap: 12px; }
  #root #Event { padding: 8px 14px; }
  #root #eventform p { grid-template-columns: 1fr; gap: 4px; margin-bottom: 10px; }
}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:wght@400;600&display=swap">
${NO_STRIP ? '' : `<div class="demo-strip" role="note">
  <div class="row">
    <div class="msg"><strong>Live demo</strong> &middot; 2019 polytechnic Final Year Project, running from its original compiled React build.
      <span class="muted">The Laravel API is simulated in your browser using the seed data from <code>nyp_db.sql</code>. Events you create stay in this browser only.</span></div>
    <span class="stack">React 16 &middot; Laravel 5.8 &middot; MySQL</span>
    <button type="button" id="demo-reset">Reset demo data</button>
  </div>
</div>`}
<div class="app-frame"><div id="root"></div></div>
<script>${safe(shim)}</script>
<script>
var rb = document.getElementById('demo-reset'); if (rb) rb.addEventListener('click', function () {
  window.nypDemoReset(); location.reload();
});
</script>
<script>${safe(runtime)}</script>
<script>${safe(vendorJs)}</script>
<script>${safe(mainJs)}</script>
`;
if (STANDALONE) {
  const cut = html.indexOf('</style>') + '</style>'.length;
  const linkEnd = html.indexOf('>', html.indexOf('<link', cut)) + 1;
  html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
    + '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
    + html.slice(0, linkEnd) + '\n</head>\n<body>' + html.slice(linkEnd) + '</body>\n</html>\n';
}
fs.writeFileSync(out, html);
console.log('wrote', out, (html.length / 1024).toFixed(0) + ' KB');
