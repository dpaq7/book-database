// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1Fqy1":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "bed887d14d6bcbeb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gLLPy":[function(require,module,exports,__globalThis) {
var _apiJs = require("./api.js");
var _uiJs = require("./ui.js");
var _bookServiceJs = require("./book-service.js");
var _challengeServiceJs = require("./challenge-service.js");
var _importExportJs = require("./import-export.js");
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>{
    // Initialize services
    (0, _apiJs.apiService).init();
    (0, _uiJs.uiService).init();
    (0, _bookServiceJs.bookService).init();
    (0, _challengeServiceJs.challengeService).init();
    (0, _importExportJs.importExportService).init();
    // Load initial data
    (0, _bookServiceJs.bookService).loadBooks();
    (0, _challengeServiceJs.challengeService).loadChallenges();
    // Set up navigation
    setupNavigation();
    // Set up event listeners
    setupEventListeners();
});
// Set up navigation between pages
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link)=>{
        link.addEventListener('click', (e)=>{
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach((l)=>l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            // Get page to show
            const page = link.getAttribute('data-page');
            // Update page title
            const pageTitle = document.getElementById('page-title');
            pageTitle.textContent = link.textContent.trim();
            // Hide all pages
            const pages = document.querySelectorAll('.page-content');
            pages.forEach((p)=>p.classList.add('d-none'));
            // Show selected page
            const selectedPage = document.getElementById(`${page}-page`);
            if (selectedPage) selectedPage.classList.remove('d-none');
            // Load page-specific data
            if (page === 'books') (0, _bookServiceJs.bookService).loadBooks();
            else if (page === 'currently-reading') (0, _bookServiceJs.bookService).loadShelf('currently-reading');
            else if (page === 'read') (0, _bookServiceJs.bookService).loadShelf('read');
            else if (page === 'to-read') (0, _bookServiceJs.bookService).loadShelf('to-read');
            else if (page === 'favorites') (0, _bookServiceJs.bookService).loadFavorites();
            else if (page === 'challenges') (0, _challengeServiceJs.challengeService).loadChallenges();
        });
    });
}
// Set up event listeners for various actions
function setupEventListeners() {
    // Add book button
    const addBookBtn = document.getElementById('add-book-btn');
    addBookBtn.addEventListener('click', ()=>{
        (0, _uiJs.uiService).showBookModal();
    });
    // Save book button
    const saveBookBtn = document.getElementById('save-book-btn');
    saveBookBtn.addEventListener('click', ()=>{
        (0, _bookServiceJs.bookService).saveBook();
    });
    // Search button
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', ()=>{
        const searchInput = document.getElementById('search-input');
        (0, _bookServiceJs.bookService).searchBooks(searchInput.value);
    });
    // Search input (on enter key)
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', (e)=>{
        if (e.key === 'Enter') (0, _bookServiceJs.bookService).searchBooks(searchInput.value);
    });
    // New challenge button
    const newChallengeBtn = document.getElementById('new-challenge-btn');
    newChallengeBtn.addEventListener('click', ()=>{
        (0, _uiJs.uiService).showChallengeModal();
    });
    // Save challenge button
    const saveChallengeBtn = document.getElementById('save-challenge-btn');
    saveChallengeBtn.addEventListener('click', ()=>{
        (0, _challengeServiceJs.challengeService).saveChallenge();
    });
    // Save reading progress button
    const saveProgressBtn = document.getElementById('save-progress-btn');
    saveProgressBtn.addEventListener('click', ()=>{
        (0, _bookServiceJs.bookService).saveReadingProgress();
    });
    // Current page input (update percent)
    const currentPageInput = document.getElementById('current-page');
    currentPageInput.addEventListener('input', ()=>{
        (0, _uiJs.uiService).updatePercentFromPage();
    });
    // Percent complete slider (update page)
    const percentComplete = document.getElementById('percent-complete');
    percentComplete.addEventListener('input', ()=>{
        (0, _uiJs.uiService).updatePageFromPercent();
    });
    // Import form
    const importForm = document.getElementById('import-form');
    importForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        (0, _importExportJs.importExportService).importBooks();
    });
    // Export buttons
    const exportJsonBtn = document.getElementById('export-json-btn');
    exportJsonBtn.addEventListener('click', ()=>{
        (0, _importExportJs.importExportService).exportBooks('json');
    });
    const exportCsvBtn = document.getElementById('export-csv-btn');
    exportCsvBtn.addEventListener('click', ()=>{
        (0, _importExportJs.importExportService).exportBooks('csv');
    });
}

},{"./api.js":"8Zgej","./ui.js":"h5UjH","./book-service.js":"ayw3y","./challenge-service.js":"9Gdmg","./import-export.js":"aRDBj"}],"8Zgej":[function(require,module,exports,__globalThis) {
// API Service for handling API requests
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "apiService", ()=>apiService);
const apiService = {
    // Base URL for API requests
    baseUrl: 'http://localhost:10000/api',
    // Initialize the API service
    init () {
        console.log('API Service initialized in development mode');
        console.log('API Base URL:', this.baseUrl);
    },
    // Generic GET request
    async get (endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },
    // Generic POST request
    async post (endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },
    // Generic PUT request
    async put (endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },
    // Generic DELETE request
    async delete (endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    },
    // File upload with FormData
    async uploadFile (endpoint, file, fileType) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Upload Error:', error);
            throw error;
        }
    },
    // Book-specific API methods
    // Get all books
    async getBooks () {
        return this.get('books');
    },
    // Get a single book
    async getBook (id) {
        return this.get(`books/${id}`);
    },
    // Create a new book
    async createBook (book) {
        return this.post('books', book);
    },
    // Update a book
    async updateBook (id, book) {
        return this.put(`books/${id}`, book);
    },
    // Delete a book
    async deleteBook (id) {
        return this.delete(`books/${id}`);
    },
    // Update reading progress
    async updateReadingProgress (id, progress) {
        return this.put(`books/${id}/progress`, progress);
    },
    // Reading Challenge API methods
    // Get all challenges
    async getChallenges () {
        return this.get('challenges');
    },
    // Create a new challenge
    async createChallenge (challenge) {
        return this.post('challenges', challenge);
    },
    // Update a challenge
    async updateChallenge (year, challenge) {
        return this.put(`challenges/${year}`, challenge);
    },
    // Import/Export API methods
    // Import books from JSON
    async importJson (file) {
        return this.uploadFile('import/json', file);
    },
    // Import books from CSV
    async importCsv (file) {
        return this.uploadFile('import/csv', file);
    },
    // Export books to JSON
    async exportJson () {
        return this.get('export/json');
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"h5UjH":[function(require,module,exports,__globalThis) {
// UI Service for handling UI-related operations
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "uiService", ()=>uiService);
const uiService = {
    // Bootstrap modal instances
    bookModal: null,
    progressModal: null,
    challengeModal: null,
    // Initialize the UI service
    init () {
        // Initialize Bootstrap modals
        this.bookModal = new bootstrap.Modal(document.getElementById('book-modal'));
        this.progressModal = new bootstrap.Modal(document.getElementById('progress-modal'));
        this.challengeModal = new bootstrap.Modal(document.getElementById('challenge-modal'));
    },
    // Show book modal for adding/editing a book
    showBookModal (book = null) {
        const modalTitle = document.getElementById('book-modal-label');
        const bookForm = document.getElementById('book-form');
        // Reset form
        bookForm.reset();
        if (book) {
            // Edit existing book
            modalTitle.textContent = 'Edit Book';
            // Fill form with book data
            document.getElementById('book-id').value = book.bookId;
            document.getElementById('title').value = book.title || '';
            document.getElementById('author').value = book.author || '';
            document.getElementById('additional-authors').value = book.additionalAuthors || '';
            document.getElementById('isbn').value = book.isbn || '';
            document.getElementById('isbn13').value = book.isbn13 || '';
            document.getElementById('publisher').value = book.publisher || '';
            document.getElementById('binding').value = book.binding || '';
            document.getElementById('pages').value = book.pages || '';
            document.getElementById('published').value = book.published || '';
            document.getElementById('edition-published').value = book.editionPublished || '';
            document.getElementById('exclusive-shelf').value = book.exclusiveShelf || 'to-read';
            document.getElementById('bookshelves').value = book.bookshelves || '';
            document.getElementById('rating').value = book.rating || '';
            document.getElementById('my-review').value = book.myReview || '';
        } else {
            // Add new book
            modalTitle.textContent = 'Add New Book';
            document.getElementById('book-id').value = '';
        }
        this.bookModal.show();
    },
    // Show reading progress modal
    showProgressModal (book) {
        const bookTitle = document.getElementById('book-title');
        const totalPages = document.getElementById('total-pages');
        const currentPage = document.getElementById('current-page');
        const percentComplete = document.getElementById('percent-complete');
        const progressBookId = document.getElementById('progress-book-id');
        // Reset form
        document.getElementById('progress-form').reset();
        // Fill form with book data
        bookTitle.value = book.title;
        totalPages.value = book.pages || 0;
        // Set current progress
        if (book.readingProgress) {
            currentPage.value = book.readingProgress.currentPage || 0;
            percentComplete.value = book.readingProgress.percentComplete || 0;
            document.getElementById('percent-display').textContent = `${book.readingProgress.percentComplete || 0}%`;
        } else {
            currentPage.value = 0;
            percentComplete.value = 0;
            document.getElementById('percent-display').textContent = '0%';
        }
        // Set max value for current page
        currentPage.max = book.pages || 100;
        // Set book ID
        progressBookId.value = book.bookId;
        this.progressModal.show();
    },
    // Show challenge modal
    showChallengeModal (challenge = null) {
        const modalTitle = document.getElementById('challenge-modal-label');
        const challengeForm = document.getElementById('challenge-form');
        // Reset form
        challengeForm.reset();
        if (challenge) {
            // Edit existing challenge
            modalTitle.textContent = 'Edit Reading Challenge';
            // Fill form with challenge data
            document.getElementById('challenge-year').value = challenge.year;
            document.getElementById('challenge-goal').value = challenge.goal;
            // Disable year field for existing challenges
            document.getElementById('challenge-year').disabled = true;
        } else {
            // Add new challenge
            modalTitle.textContent = 'New Reading Challenge';
            // Set default year to current year
            const currentYear = new Date().getFullYear();
            document.getElementById('challenge-year').value = currentYear;
            // Enable year field for new challenges
            document.getElementById('challenge-year').disabled = false;
        }
        this.challengeModal.show();
    },
    // Update percent complete from current page
    updatePercentFromPage () {
        const currentPage = document.getElementById('current-page');
        const totalPages = document.getElementById('total-pages');
        const percentComplete = document.getElementById('percent-complete');
        const percentDisplay = document.getElementById('percent-display');
        if (totalPages.value > 0) {
            const percent = Math.round(currentPage.value / totalPages.value * 100);
            percentComplete.value = percent;
            percentDisplay.textContent = `${percent}%`;
        }
    },
    // Update current page from percent complete
    updatePageFromPercent () {
        const currentPage = document.getElementById('current-page');
        const totalPages = document.getElementById('total-pages');
        const percentComplete = document.getElementById('percent-complete');
        const percentDisplay = document.getElementById('percent-display');
        if (totalPages.value > 0) {
            const page = Math.round(percentComplete.value / 100 * totalPages.value);
            currentPage.value = page;
            percentDisplay.textContent = `${percentComplete.value}%`;
        }
    },
    // Show toast notification
    showToast (message, type = 'success') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        // Create toast element
        const toastEl = document.createElement('div');
        toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        // Create toast content
        toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
        // Add toast to container
        toastContainer.appendChild(toastEl);
        // Initialize and show toast
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });
        toast.show();
        // Remove toast after it's hidden
        toastEl.addEventListener('hidden.bs.toast', ()=>{
            toastEl.remove();
        });
    },
    // Show confirmation dialog
    showConfirmation (message, callback) {
        if (confirm(message)) callback();
    },
    // Render star rating
    renderStarRating (rating) {
        let stars = '';
        for(let i = 1; i <= 5; i++)if (i <= rating) stars += '<i class="bi bi-star-fill rating-star"></i>';
        else stars += '<i class="bi bi-star rating-star"></i>';
        return stars;
    },
    // Format date string (YYYY/MM/DD to MM/DD/YYYY)
    formatDate (dateString) {
        if (!dateString) return '';
        const parts = dateString.split('/');
        if (parts.length !== 3) return dateString;
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    },
    // Get shelf badge HTML
    getShelfBadge (shelf) {
        let badgeClass = '';
        let icon = '';
        switch(shelf){
            case 'read':
                badgeClass = 'shelf-read';
                icon = 'bi-check-circle';
                break;
            case 'currently-reading':
                badgeClass = 'shelf-currently-reading';
                icon = 'bi-bookmark';
                break;
            case 'to-read':
                badgeClass = 'shelf-to-read';
                icon = 'bi-hourglass';
                break;
            default:
                badgeClass = 'bg-secondary text-white';
                icon = 'bi-book';
        }
        return `<span class="book-shelf ${badgeClass}"><i class="bi ${icon} me-1"></i>${this.formatShelfName(shelf)}</span>`;
    },
    // Format shelf name for display
    formatShelfName (shelf) {
        switch(shelf){
            case 'read':
                return 'Read';
            case 'currently-reading':
                return 'Currently Reading';
            case 'to-read':
                return 'To Read';
            default:
                return shelf;
        }
    },
    // Create pagination
    createPagination (currentPage, totalPages, onPageChange) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        if (totalPages <= 1) return;
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        const prevLink = document.createElement('a');
        prevLink.className = 'page-link';
        prevLink.href = '#';
        prevLink.setAttribute('aria-label', 'Previous');
        prevLink.innerHTML = '<span aria-hidden="true">&laquo;</span>';
        if (currentPage > 1) prevLink.addEventListener('click', (e)=>{
            e.preventDefault();
            onPageChange(currentPage - 1);
        });
        prevLi.appendChild(prevLink);
        pagination.appendChild(prevLi);
        // Page numbers
        const maxPages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
        let endPage = Math.min(totalPages, startPage + maxPages - 1);
        if (endPage - startPage + 1 < maxPages) startPage = Math.max(1, endPage - maxPages + 1);
        for(let i = startPage; i <= endPage; i++){
            const pageLi = document.createElement('li');
            pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i !== currentPage) pageLink.addEventListener('click', (e)=>{
                e.preventDefault();
                onPageChange(i);
            });
            pageLi.appendChild(pageLink);
            pagination.appendChild(pageLi);
        }
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        const nextLink = document.createElement('a');
        nextLink.className = 'page-link';
        nextLink.href = '#';
        nextLink.setAttribute('aria-label', 'Next');
        nextLink.innerHTML = '<span aria-hidden="true">&raquo;</span>';
        if (currentPage < totalPages) nextLink.addEventListener('click', (e)=>{
            e.preventDefault();
            onPageChange(currentPage + 1);
        });
        nextLi.appendChild(nextLink);
        pagination.appendChild(nextLi);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ayw3y":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bookService", ()=>bookService);
var _apiJs = require("./api.js");
var _uiJs = require("./ui.js");
const bookService = {
    books: [],
    filteredBooks: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    currentFilter: 'all',
    activeFilters: {
        author: '',
        genre: '',
        rating: '',
        readStatus: ''
    },
    // Initialize the book service
    init () {
        // Set up event delegation for book actions
        document.addEventListener('click', (e)=>{
            // Edit book button
            if (e.target.closest('.edit-book-btn')) {
                const bookId = e.target.closest('.edit-book-btn').getAttribute('data-id');
                this.editBook(bookId);
            }
            // Delete book button
            if (e.target.closest('.delete-book-btn')) {
                const bookId = e.target.closest('.delete-book-btn').getAttribute('data-id');
                this.confirmDeleteBook(bookId);
            }
            // Update progress button
            if (e.target.closest('.progress-book-btn')) {
                const bookId = e.target.closest('.progress-book-btn').getAttribute('data-id');
                this.showProgressModal(bookId);
            }
        });
        // Set up event listeners for filter buttons
        const applyFiltersBtn = document.getElementById('apply-filters-btn');
        if (applyFiltersBtn) applyFiltersBtn.addEventListener('click', ()=>{
            this.applyFilters();
        });
        const clearFiltersBtn = document.getElementById('clear-filters-btn');
        if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', ()=>{
            this.clearFilters();
        });
        // Load initial data
        this.loadBooks();
    },
    // Load all books
    async loadBooks (page = 1) {
        try {
            this.currentPage = page;
            this.currentFilter = null;
            // Get books from API
            const books = await (0, _apiJs.apiService).getBooks();
            this.books = books;
            this.filteredBooks = books;
            this.currentFilter = 'all';
            this.currentPage = page;
            // Calculate total pages
            this.totalPages = Math.ceil(books.length / this.itemsPerPage);
            // Render books table
            this.renderBooksTable(books);
            // Create pagination
            (0, _uiJs.uiService).createPagination(page, this.totalPages, (page)=>{
                this.currentPage = page;
                this.renderBooksTable(books);
            });
            // Populate filter dropdowns
            this.populateFilterOptions(books);
            // Reset page title
            const pageTitle = document.getElementById('page-title');
            pageTitle.textContent = 'All Books';
        } catch (error) {
            console.error('Error loading books:', error);
            (0, _uiJs.uiService).showToast('Error loading books', 'danger');
        }
    },
    // Load books by shelf
    async loadShelf (shelf) {
        try {
            // Get all books from API
            const books = await (0, _apiJs.apiService).getBooks();
            // Filter books by shelf
            const filteredBooks = books.filter((book)=>book.exclusiveShelf === shelf);
            // Store filtered books
            this.books = books;
            this.filteredBooks = filteredBooks;
            this.currentFilter = shelf;
            // Render books in card view
            this.renderBookCards(filteredBooks, shelf);
        } catch (error) {
            console.error(`Error loading ${shelf} books:`, error);
            (0, _uiJs.uiService).showToast(`Error loading ${shelf} books`, 'danger');
        }
    },
    // Load favorite books
    async loadFavorites () {
        try {
            // Get all books from API
            const books = await (0, _apiJs.apiService).getBooks();
            // Filter books that have "favorites" in bookshelves
            const filteredBooks = books.filter((book)=>book.bookshelves && book.bookshelves.toLowerCase().includes('favorites'));
            // Store filtered books
            this.books = books;
            this.filteredBooks = filteredBooks;
            this.currentFilter = 'favorites';
            // Render books in card view
            this.renderBookCards(filteredBooks, 'favorites');
        } catch (error) {
            console.error('Error loading favorite books:', error);
            (0, _uiJs.uiService).showToast('Error loading favorite books', 'danger');
        }
    },
    // Search books
    async searchBooks (query) {
        if (!query.trim()) {
            this.loadBooks();
            return;
        }
        try {
            // Get all books from API
            const books = await (0, _apiJs.apiService).getBooks();
            // Filter books by search query
            const filteredBooks = books.filter((book)=>{
                const searchFields = [
                    book.title || '',
                    book.author || '',
                    book.additionalAuthors || '',
                    book.publisher || '',
                    book.isbn || '',
                    book.isbn13 ? book.isbn13.toString() : ''
                ];
                const searchText = searchFields.join(' ').toLowerCase();
                return searchText.includes(query.toLowerCase());
            });
            // Store filtered books
            this.books = books;
            this.filteredBooks = filteredBooks;
            this.currentFilter = 'search';
            this.currentPage = 1; // Reset to first page for search results
            // Calculate total pages
            this.totalPages = Math.ceil(filteredBooks.length / this.itemsPerPage);
            // Render books table
            this.renderBooksTable(filteredBooks);
            // Create pagination
            (0, _uiJs.uiService).createPagination(1, this.totalPages, (page)=>{
                this.currentPage = page;
                this.renderBooksTable(filteredBooks);
            });
            // Show search results message
            const pageTitle = document.getElementById('page-title');
            pageTitle.textContent = `Search Results: ${filteredBooks.length} books found`;
            // Make sure the books page is visible
            document.querySelectorAll('.page-content').forEach((page)=>{
                page.classList.add('d-none');
            });
            document.getElementById('books-page').classList.remove('d-none');
            // Log search results to console for debugging
            console.log(`Search results for "${query}":`, filteredBooks);
        } catch (error) {
            console.error('Error searching books:', error);
            (0, _uiJs.uiService).showToast('Error searching books', 'danger');
        }
    },
    // Populate filter options
    populateFilterOptions (books) {
        // Get unique authors
        const authors = [
            ...new Set(books.map((book)=>book.author).filter(Boolean))
        ].sort();
        const authorSelect = document.getElementById('filter-author');
        // Clear existing options except the first one
        while(authorSelect.options.length > 1)authorSelect.remove(1);
        // Add author options
        authors.forEach((author)=>{
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorSelect.appendChild(option);
        });
        // Get unique genres/bookshelves
        const genres = [
            ...new Set(books.map((book)=>book.bookshelves).filter(Boolean).flatMap((shelves)=>shelves.split(',').map((s)=>s.trim())))
        ].sort();
        const genreSelect = document.getElementById('filter-genre');
        // Clear existing options except the first one
        while(genreSelect.options.length > 1)genreSelect.remove(1);
        // Add genre options
        genres.forEach((genre)=>{
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });
    },
    // Apply filters
    applyFilters () {
        // Get filter values
        const author = document.getElementById('filter-author').value;
        const genre = document.getElementById('filter-genre').value;
        const rating = document.getElementById('filter-rating').value;
        const readStatus = document.getElementById('filter-read-status').value;
        // Store active filters
        this.activeFilters = {
            author,
            genre,
            rating,
            readStatus
        };
        // Filter books
        let filteredBooks = this.books;
        // Filter by author
        if (author) filteredBooks = filteredBooks.filter((book)=>book.author === author);
        // Filter by genre/bookshelf
        if (genre) filteredBooks = filteredBooks.filter((book)=>{
            const bookshelves = book.bookshelves || '';
            return bookshelves.split(',').map((s)=>s.trim()).includes(genre);
        });
        // Filter by rating
        if (rating) {
            const minRating = parseInt(rating);
            filteredBooks = filteredBooks.filter((book)=>{
                const bookRating = book.rating || 0;
                return bookRating >= minRating;
            });
        }
        // Filter by read status
        if (readStatus) filteredBooks = filteredBooks.filter((book)=>book.exclusiveShelf === readStatus);
        // Store filtered books
        this.filteredBooks = filteredBooks;
        this.currentFilter = 'filter';
        this.currentPage = 1; // Reset to first page for filtered results
        // Calculate total pages
        this.totalPages = Math.ceil(filteredBooks.length / this.itemsPerPage);
        // Render books table
        this.renderBooksTable(filteredBooks);
        // Create pagination
        (0, _uiJs.uiService).createPagination(1, this.totalPages, (page)=>{
            this.currentPage = page;
            this.renderBooksTable(filteredBooks);
        });
        // Show filter results message
        const pageTitle = document.getElementById('page-title');
        pageTitle.textContent = `Filtered Results: ${filteredBooks.length} books found`;
        // Make sure the books page is visible
        document.querySelectorAll('.page-content').forEach((page)=>{
            page.classList.add('d-none');
        });
        document.getElementById('books-page').classList.remove('d-none');
        // Hide the filter modal
        const filterModal = bootstrap.Modal.getInstance(document.getElementById('filter-modal'));
        filterModal.hide();
        // Show applied filters summary
        this.showFilterSummary();
    },
    // Clear filters
    clearFilters () {
        // Reset filter form
        document.getElementById('filter-form').reset();
        // Reset active filters
        this.activeFilters = {
            author: '',
            genre: '',
            rating: '',
            readStatus: ''
        };
        // Load all books
        this.loadBooks();
        // Hide the filter modal
        const filterModal = bootstrap.Modal.getInstance(document.getElementById('filter-modal'));
        filterModal.hide();
    },
    // Show filter summary
    showFilterSummary () {
        const { author, genre, rating, readStatus } = this.activeFilters;
        if (!author && !genre && !rating && !readStatus) return;
        let message = 'Filters applied: ';
        const filters = [];
        if (author) filters.push(`Author: ${author}`);
        if (genre) filters.push(`Genre: ${genre}`);
        if (rating) filters.push(`${rating}+ Stars`);
        if (readStatus) filters.push(`Status: ${(0, _uiJs.uiService).formatShelfName(readStatus)}`);
        message += filters.join(', ');
        (0, _uiJs.uiService).showToast(message, 'info');
    },
    // Render books table
    renderBooksTable (books) {
        const tableBody = document.getElementById('books-table-body');
        tableBody.innerHTML = '';
        // Calculate start and end indices for current page
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, books.length);
        // Get books for current page
        const booksForPage = books.slice(startIndex, endIndex);
        if (booksForPage.length === 0) {
            tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No books found</td>
        </tr>
      `;
            return;
        }
        // Create table rows
        booksForPage.forEach((book)=>{
            const row = document.createElement('tr');
            // Book title
            const titleCell = document.createElement('td');
            titleCell.innerHTML = `<span class="book-title">${book.title}</span>`;
            row.appendChild(titleCell);
            // Author
            const authorCell = document.createElement('td');
            authorCell.innerHTML = `<span class="book-author">${book.author}</span>`;
            row.appendChild(authorCell);
            // Rating
            const ratingCell = document.createElement('td');
            ratingCell.innerHTML = `<div class="book-rating">${(0, _uiJs.uiService).renderStarRating(book.rating)}</div>`;
            row.appendChild(ratingCell);
            // Shelf
            const shelfCell = document.createElement('td');
            shelfCell.innerHTML = (0, _uiJs.uiService).getShelfBadge(book.exclusiveShelf);
            row.appendChild(shelfCell);
            // Pages
            const pagesCell = document.createElement('td');
            pagesCell.textContent = book.pages || '-';
            row.appendChild(pagesCell);
            // Actions
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-sm btn-outline-primary action-btn progress-book-btn" data-id="${book.bookId}" title="Update Progress">
            <i class="bi bi-bookmark"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary action-btn edit-book-btn" data-id="${book.bookId}" title="Edit">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger action-btn delete-book-btn" data-id="${book.bookId}" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
            row.appendChild(actionsCell);
            tableBody.appendChild(row);
        });
    },
    // Render book cards
    renderBookCards (books, container) {
        const containerElement = document.getElementById(`${container}-books`);
        containerElement.innerHTML = '';
        if (books.length === 0) {
            containerElement.innerHTML = `
        <div class="col-12 text-center my-5">
          <h5>No books found</h5>
        </div>
      `;
            return;
        }
        books.forEach((book)=>{
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
            // Reading progress HTML
            let progressHtml = '';
            if (book.exclusiveShelf === 'currently-reading' && book.readingProgress) {
                const percent = book.readingProgress.percentComplete || 0;
                const currentPage = book.readingProgress.currentPage || 0;
                const totalPages = book.pages || 0;
                progressHtml = `
          <div class="progress-container">
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: ${percent}%" 
                aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress-info">
              <span>${currentPage} of ${totalPages} pages</span>
              <span>${percent}% complete</span>
            </div>
          </div>
        `;
            }
            card.innerHTML = `
        <div class="card book-card">
          <div class="card-img-top">
            <i class="bi bi-book"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-author">${book.author}</p>
            <div class="card-rating mb-2">${(0, _uiJs.uiService).renderStarRating(book.rating)}</div>
            ${(0, _uiJs.uiService).getShelfBadge(book.exclusiveShelf)}
            ${progressHtml}
            <div class="mt-3">
              <button type="button" class="btn btn-sm btn-outline-primary progress-book-btn" data-id="${book.bookId}">
                <i class="bi bi-bookmark me-1"></i>Update Progress
              </button>
              <div class="btn-group mt-2" role="group">
                <button type="button" class="btn btn-sm btn-outline-secondary edit-book-btn" data-id="${book.bookId}">
                  <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger delete-book-btn" data-id="${book.bookId}">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
            containerElement.appendChild(card);
        });
    },
    // Save book (create or update)
    async saveBook () {
        try {
            // Get form data
            const bookId = document.getElementById('book-id').value;
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const additionalAuthors = document.getElementById('additional-authors').value;
            const isbn = document.getElementById('isbn').value;
            const isbn13 = document.getElementById('isbn13').value;
            const publisher = document.getElementById('publisher').value;
            const binding = document.getElementById('binding').value;
            const pages = document.getElementById('pages').value;
            const published = document.getElementById('published').value;
            const editionPublished = document.getElementById('edition-published').value;
            const exclusiveShelf = document.getElementById('exclusive-shelf').value;
            const bookshelves = document.getElementById('bookshelves').value;
            const rating = document.getElementById('rating').value;
            const myReview = document.getElementById('my-review').value;
            // Create book object
            const book = {
                title,
                author,
                additionalAuthors,
                isbn,
                isbn13: isbn13 ? parseInt(isbn13) : null,
                publisher,
                binding,
                pages: pages ? parseInt(pages) : null,
                published: published ? parseInt(published) : null,
                editionPublished: editionPublished ? parseInt(editionPublished) : null,
                exclusiveShelf,
                bookshelves,
                rating: rating ? parseInt(rating) : null,
                myReview,
                dateAdded: new Date().toISOString().split('T')[0].replace(/-/g, '/')
            };
            let result;
            if (bookId) {
                // Update existing book
                result = await (0, _apiJs.apiService).updateBook(bookId, book);
                (0, _uiJs.uiService).showToast('Book updated successfully', 'success');
            } else {
                // Create new book
                result = await (0, _apiJs.apiService).createBook(book);
                (0, _uiJs.uiService).showToast('Book added successfully', 'success');
            }
            // Hide modal
            (0, _uiJs.uiService).bookModal.hide();
            // Reload books
            if (this.currentFilter) {
                if (this.currentFilter === 'favorites') this.loadFavorites();
                else this.loadShelf(this.currentFilter);
            } else this.loadBooks(this.currentPage);
        } catch (error) {
            console.error('Error saving book:', error);
            (0, _uiJs.uiService).showToast('Error saving book', 'danger');
        }
    },
    // Edit book
    async editBook (bookId) {
        try {
            // Find book in current books array
            const book = this.books.find((b)=>b.bookId == bookId);
            if (book) // Show book modal with book data
            (0, _uiJs.uiService).showBookModal(book);
            else {
                // Fetch book from API
                const book = await (0, _apiJs.apiService).getBook(bookId);
                (0, _uiJs.uiService).showBookModal(book);
            }
        } catch (error) {
            console.error('Error editing book:', error);
            (0, _uiJs.uiService).showToast('Error loading book details', 'danger');
        }
    },
    // Confirm delete book
    confirmDeleteBook (bookId) {
        (0, _uiJs.uiService).showConfirmation('Are you sure you want to delete this book?', ()=>{
            this.deleteBook(bookId);
        });
    },
    // Delete book
    async deleteBook (bookId) {
        try {
            // Delete book from API
            await (0, _apiJs.apiService).deleteBook(bookId);
            // Show success message
            (0, _uiJs.uiService).showToast('Book deleted successfully', 'success');
            // Reload books
            if (this.currentFilter) {
                if (this.currentFilter === 'favorites') this.loadFavorites();
                else this.loadShelf(this.currentFilter);
            } else this.loadBooks(this.currentPage);
        } catch (error) {
            console.error('Error deleting book:', error);
            (0, _uiJs.uiService).showToast('Error deleting book', 'danger');
        }
    },
    // Show progress modal
    async showProgressModal (bookId) {
        try {
            // Find book in current books array
            let book = this.books.find((b)=>b.bookId == bookId);
            if (!book) // Fetch book from API
            book = await (0, _apiJs.apiService).getBook(bookId);
            if (book) // Show progress modal with book data
            (0, _uiJs.uiService).showProgressModal(book);
        } catch (error) {
            console.error('Error showing progress modal:', error);
            (0, _uiJs.uiService).showToast('Error loading book details', 'danger');
        }
    },
    // Save reading progress
    async saveReadingProgress () {
        try {
            // Get form data
            const bookId = document.getElementById('progress-book-id').value;
            const currentPage = parseInt(document.getElementById('current-page').value);
            const percentComplete = parseInt(document.getElementById('percent-complete').value);
            // Update reading progress
            const progress = {
                currentPage,
                percentComplete
            };
            await (0, _apiJs.apiService).updateReadingProgress(bookId, progress);
            // Show success message
            (0, _uiJs.uiService).showToast('Reading progress updated', 'success');
            // Hide modal
            (0, _uiJs.uiService).progressModal.hide();
            // Reload books
            if (this.currentFilter) {
                if (this.currentFilter === 'favorites') this.loadFavorites();
                else this.loadShelf(this.currentFilter);
            } else this.loadBooks(this.currentPage);
        } catch (error) {
            console.error('Error saving reading progress:', error);
            (0, _uiJs.uiService).showToast('Error updating reading progress', 'danger');
        }
    }
};

},{"./api.js":"8Zgej","./ui.js":"h5UjH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Gdmg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "challengeService", ()=>challengeService);
var _apiJs = require("./api.js");
var _uiJs = require("./ui.js");
const challengeService = {
    challenges: [],
    // Initialize the challenge service
    init () {
    // Nothing specific to initialize
    },
    // Load all reading challenges
    async loadChallenges () {
        try {
            // Get challenges from API
            const challenges = await (0, _apiJs.apiService).getChallenges();
            this.challenges = challenges;
            // Render challenges
            this.renderChallenges(challenges);
            // Create reading progress chart
            this.createReadingProgressChart(challenges);
        } catch (error) {
            console.error('Error loading challenges:', error);
            (0, _uiJs.uiService).showToast('Error loading reading challenges', 'danger');
        }
    },
    // Render challenges
    renderChallenges (challenges) {
        // Render current year challenge
        this.renderCurrentChallenge(challenges);
        // Render past challenges
        this.renderPastChallenges(challenges);
    },
    // Render current year challenge
    renderCurrentChallenge (challenges) {
        const currentYear = new Date().getFullYear();
        const currentChallenge = challenges.find((c)=>c.year === currentYear);
        const currentChallengeElement = document.getElementById('current-challenge');
        if (!currentChallenge) {
            currentChallengeElement.innerHTML = `
        <div class="text-center py-4">
          <p>No reading challenge set for ${currentYear}</p>
          <button class="btn btn-primary" id="new-challenge-btn">
            <i class="bi bi-plus-lg me-2"></i>Set a Reading Goal
          </button>
        </div>
      `;
            // Add event listener to new challenge button
            const newChallengeBtn = document.getElementById('new-challenge-btn');
            newChallengeBtn.addEventListener('click', ()=>{
                (0, _uiJs.uiService).showChallengeModal();
            });
            return;
        }
        // Calculate progress percentage
        const progressPercent = Math.min(100, Math.round(currentChallenge.completed / currentChallenge.goal * 100));
        // Determine progress bar color
        let progressColor = 'bg-success';
        if (progressPercent < 25) progressColor = 'bg-danger';
        else if (progressPercent < 50) progressColor = 'bg-warning';
        else if (progressPercent < 75) progressColor = 'bg-info';
        currentChallengeElement.innerHTML = `
      <div class="challenge-card">
        <h2 class="text-center mb-3">${currentYear} Reading Challenge</h2>
        <div class="text-center mb-4">
          <h3>
            <span class="badge ${progressPercent >= 100 ? 'bg-success' : 'bg-primary'}">
              ${currentChallenge.completed} of ${currentChallenge.goal} books
            </span>
          </h3>
        </div>
        <div class="progress challenge-progress">
          <div class="progress-bar ${progressColor}" role="progressbar" 
            style="width: ${progressPercent}%" 
            aria-valuenow="${progressPercent}" 
            aria-valuemin="0" 
            aria-valuemax="100">
            ${progressPercent}%
          </div>
        </div>
        <div class="challenge-info">
          <span>Started: ${new Date(currentChallenge.createdAt).toLocaleDateString()}</span>
          <span>${currentChallenge.goal - currentChallenge.completed} books to go</span>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline-primary edit-challenge-btn" data-year="${currentChallenge.year}">
            <i class="bi bi-pencil me-2"></i>Edit Challenge
          </button>
        </div>
      </div>
    `;
        // Add event listener to edit challenge button
        const editChallengeBtn = document.querySelector('.edit-challenge-btn');
        editChallengeBtn.addEventListener('click', ()=>{
            this.editChallenge(currentChallenge.year);
        });
    },
    // Render past challenges
    renderPastChallenges (challenges) {
        const currentYear = new Date().getFullYear();
        const pastChallenges = challenges.filter((c)=>c.year !== currentYear).sort((a, b)=>b.year - a.year);
        const pastChallengesElement = document.getElementById('past-challenges');
        if (pastChallenges.length === 0) {
            pastChallengesElement.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">No past reading challenges</td>
        </tr>
      `;
            return;
        }
        pastChallengesElement.innerHTML = '';
        pastChallenges.forEach((challenge)=>{
            // Calculate progress percentage
            const progressPercent = Math.min(100, Math.round(challenge.completed / challenge.goal * 100));
            // Determine progress bar color
            let progressColor = 'bg-success';
            if (progressPercent < 25) progressColor = 'bg-danger';
            else if (progressPercent < 50) progressColor = 'bg-warning';
            else if (progressPercent < 75) progressColor = 'bg-info';
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${challenge.year}</td>
        <td>${challenge.goal}</td>
        <td>${challenge.completed}</td>
        <td>
          <div class="progress">
            <div class="progress-bar ${progressColor}" role="progressbar" 
              style="width: ${progressPercent}%" 
              aria-valuenow="${progressPercent}" 
              aria-valuemin="0" 
              aria-valuemax="100">
              ${progressPercent}%
            </div>
          </div>
        </td>
      `;
            pastChallengesElement.appendChild(row);
        });
    },
    // Create reading progress chart
    createReadingProgressChart (challenges) {
        const currentYear = new Date().getFullYear();
        const currentChallenge = challenges.find((c)=>c.year === currentYear);
        if (!currentChallenge) return;
        const ctx = document.getElementById('reading-progress-chart').getContext('2d');
        // Get monthly data (this would normally come from the API)
        // For now, we'll create mock data
        const monthlyData = this.generateMonthlyData(currentChallenge.completed);
        // Calculate target line (goal divided by 12 months, cumulative)
        const targetLine = Array(12).fill(0).map((_, i)=>{
            return Math.round((i + 1) / 12 * currentChallenge.goal);
        });
        // Create chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                datasets: [
                    {
                        label: 'Books Read',
                        data: monthlyData.cumulative,
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Target',
                        data: targetLine,
                        borderColor: 'rgba(220, 53, 69, 0.5)',
                        borderWidth: 2,
                        borderDash: [
                            5,
                            5
                        ],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                return `${label}: ${value} books`;
                            }
                        }
                    }
                }
            }
        });
    },
    // Generate monthly reading data (mock data)
    generateMonthlyData (totalBooks) {
        const currentMonth = new Date().getMonth();
        // Generate random monthly counts that sum to totalBooks
        const monthlyCount = Array(12).fill(0);
        // Only fill months up to current month
        let remaining = totalBooks;
        for(let i = 0; i <= currentMonth; i++){
            if (i === currentMonth) monthlyCount[i] = remaining;
            else {
                const count = Math.floor(Math.random() * (remaining / 2)) + 1;
                monthlyCount[i] = Math.min(count, remaining);
                remaining -= monthlyCount[i];
            }
            if (remaining <= 0) break;
        }
        // Calculate cumulative counts
        const cumulativeCount = [];
        let sum = 0;
        for(let i = 0; i < 12; i++){
            sum += monthlyCount[i];
            cumulativeCount.push(sum);
        }
        return {
            monthly: monthlyCount,
            cumulative: cumulativeCount
        };
    },
    // Save challenge
    async saveChallenge () {
        try {
            // Get form data
            const year = parseInt(document.getElementById('challenge-year').value);
            const goal = parseInt(document.getElementById('challenge-goal').value);
            if (!year || !goal) {
                (0, _uiJs.uiService).showToast('Please fill in all fields', 'warning');
                return;
            }
            // Check if challenge for this year already exists
            const existingChallenge = this.challenges.find((c)=>c.year === year);
            if (existingChallenge) {
                // Update existing challenge
                await (0, _apiJs.apiService).updateChallenge(year, {
                    goal,
                    completed: existingChallenge.completed
                });
                (0, _uiJs.uiService).showToast('Reading challenge updated', 'success');
            } else {
                // Create new challenge
                await (0, _apiJs.apiService).createChallenge({
                    year,
                    goal
                });
                (0, _uiJs.uiService).showToast('Reading challenge created', 'success');
            }
            // Hide modal
            (0, _uiJs.uiService).challengeModal.hide();
            // Reload challenges
            this.loadChallenges();
        } catch (error) {
            console.error('Error saving challenge:', error);
            (0, _uiJs.uiService).showToast('Error saving reading challenge', 'danger');
        }
    },
    // Edit challenge
    editChallenge (year) {
        const challenge = this.challenges.find((c)=>c.year === year);
        if (challenge) (0, _uiJs.uiService).showChallengeModal(challenge);
    }
};

},{"./api.js":"8Zgej","./ui.js":"h5UjH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aRDBj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "importExportService", ()=>importExportService);
var _apiJs = require("./api.js");
var _uiJs = require("./ui.js");
var _bookServiceJs = require("./book-service.js");
const importExportService = {
    // Initialize the import/export service
    init () {
    // Nothing specific to initialize
    },
    // Import books from file
    async importBooks () {
        try {
            const fileInput = document.getElementById('import-file');
            if (!fileInput.files || fileInput.files.length === 0) {
                (0, _uiJs.uiService).showToast('Please select a file to import', 'warning');
                return;
            }
            const file = fileInput.files[0];
            const fileType = this.getFileType(file.name);
            if (!fileType) {
                (0, _uiJs.uiService).showToast('Unsupported file format. Please use JSON or CSV files.', 'warning');
                return;
            }
            // Show loading message
            (0, _uiJs.uiService).showToast('Importing books, please wait...', 'info');
            let result;
            if (fileType === 'json') result = await (0, _apiJs.apiService).importJson(file);
            else if (fileType === 'csv') result = await (0, _apiJs.apiService).importCsv(file);
            // Show success message
            (0, _uiJs.uiService).showToast(result.message, 'success');
            // Reset file input
            fileInput.value = '';
            // Reload books
            (0, _bookServiceJs.bookService).loadBooks();
        } catch (error) {
            console.error('Error importing books:', error);
            (0, _uiJs.uiService).showToast('Error importing books', 'danger');
        }
    },
    // Export books to file
    async exportBooks (format) {
        try {
            // Show loading message
            (0, _uiJs.uiService).showToast(`Preparing ${format.toUpperCase()} export...`, 'info');
            // Get books from API
            const books = await (0, _apiJs.apiService).exportJson();
            if (format === 'json') this.exportJson(books);
            else if (format === 'csv') this.exportCsv(books);
        } catch (error) {
            console.error('Error exporting books:', error);
            (0, _uiJs.uiService).showToast('Error exporting books', 'danger');
        }
    },
    // Export books to JSON file
    exportJson (books) {
        const jsonString = JSON.stringify(books, null, 2);
        const blob = new Blob([
            jsonString
        ], {
            type: 'application/json'
        });
        // Generate filename with current date
        const date = new Date().toISOString().split('T')[0];
        const filename = `book_export_${date}.json`;
        // Save file
        saveAs(blob, filename);
        // Show success message
        (0, _uiJs.uiService).showToast('Books exported to JSON successfully', 'success');
    },
    // Export books to CSV file
    exportCsv (books) {
        // Get all possible headers from books
        const headers = this.getAllHeaders(books);
        // Create CSV content
        let csvContent = headers.join(',') + '\\n';
        books.forEach((book)=>{
            const row = headers.map((header)=>{
                const value = book[this.camelCase(header)];
                // Handle different value types
                if (value === null || value === undefined) return '';
                else if (typeof value === 'string') // Escape quotes and wrap in quotes
                return '"' + value.replace(/"/g, '""') + '"';
                else if (Array.isArray(value)) return '"' + JSON.stringify(value).replace(/"/g, '""') + '"';
                else return value;
            });
            csvContent += row.join(',') + '\\n';
        });
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8'
        });
        // Generate filename with current date
        const date = new Date().toISOString().split('T')[0];
        const filename = `book_export_${date}.csv`;
        // Save file
        saveAs(blob, filename);
        // Show success message
        (0, _uiJs.uiService).showToast('Books exported to CSV successfully', 'success');
    },
    // Get file type from filename
    getFileType (filename) {
        const extension = filename.split('.').pop().toLowerCase();
        if (extension === 'json') return 'json';
        else if (extension === 'csv') return 'csv';
        return null;
    },
    // Get all headers from books
    getAllHeaders (books) {
        const headers = new Set();
        // Original headers from the Goodreads export
        const originalHeaders = [
            'Book Id',
            'Title',
            'Author',
            'Author (By Last Name)',
            'Additional Authors',
            'ISBN',
            'ISBN13',
            'Rating',
            'Average Rating',
            'Publisher',
            'Binding',
            'Pages',
            'BEq',
            'Edition Published',
            'Published',
            'Date Read',
            'Date Added',
            'Bookshelves',
            'Bookshelves with positions',
            'Exclusive Shelf',
            'My Review',
            'Spoiler',
            'Private Notes',
            'Read Count',
            'Owned Copies'
        ];
        // Add original headers
        originalHeaders.forEach((header)=>headers.add(header));
        return Array.from(headers);
    },
    // Convert header to camelCase
    camelCase (header) {
        // Special case for 'Book Id'
        if (header === 'Book Id') return 'bookId';
        // Special case for 'Author (By Last Name)'
        if (header === 'Author (By Last Name)') return 'authorByLastName';
        // Special case for 'BEq'
        if (header === 'BEq') return 'beq';
        // Special case for 'ISBN'
        if (header === 'ISBN') return 'isbn';
        // Special case for 'ISBN13'
        if (header === 'ISBN13') return 'isbn13';
        // Special case for 'Bookshelves with positions'
        if (header === 'Bookshelves with positions') return 'bookshelvesWithPositions';
        // Special case for 'Exclusive Shelf'
        if (header === 'Exclusive Shelf') return 'exclusiveShelf';
        // Special case for 'My Review'
        if (header === 'My Review') return 'myReview';
        // Special case for 'Read Count'
        if (header === 'Read Count') return 'readCount';
        // Special case for 'Owned Copies'
        if (header === 'Owned Copies') return 'ownedCopies';
        // Special case for 'Edition Published'
        if (header === 'Edition Published') return 'editionPublished';
        // Special case for 'Date Read'
        if (header === 'Date Read') return 'dateRead';
        // Special case for 'Date Added'
        if (header === 'Date Added') return 'dateAdded';
        // Special case for 'Private Notes'
        if (header === 'Private Notes') return 'privateNotes';
        // Special case for 'Average Rating'
        if (header === 'Average Rating') return 'averageRating';
        // General case
        return header.toLowerCase().replace(/\s(.)/g, (_, char)=>char.toUpperCase());
    }
};

},{"./api.js":"8Zgej","./ui.js":"h5UjH","./book-service.js":"ayw3y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["1Fqy1","gLLPy"], "gLLPy", "parcelRequire94c2")

//# sourceMappingURL=index.4d6bcbeb.js.map
