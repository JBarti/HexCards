// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/navbar.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DECKS = {
  prvi_dek: ["https://picsum.photos/300", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"],
  drugi_dek: ["https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"]
};

function tab_setup() {
  var window_hash = window.location.hash;
  if (!window_hash) window_hash = "#nav-decks";
  var clicked_tab = document.querySelector("[href='".concat(window_hash, "']"));
  document.querySelectorAll(".nav-link").forEach(function (element) {
    if (clicked_tab === element) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
  document.querySelectorAll(".tab-container").forEach(function (element) {
    if (element.getAttribute("data-hash") === window_hash) {
      element.classList.remove("d-none");
    } else {
      element.classList.add("d-none");
    }
  });
}

function select_deck(event) {
  var clicked_link = event.target;

  if (clicked_link.classList.contains("active")) {
    clicked_link.classList.remove("active");
  } else {
    clicked_link.classList.add("active");
  }

  var selected_cards = [];
  document.querySelectorAll(".list-group-item.active").forEach(function (element) {
    selected_cards.push.apply(selected_cards, _toConsumableArray(DECKS[element.innerHTML]));
  });
  build_cards(selected_cards);
}

function build_cards(selected_cards) {
  var cards_container = document.querySelector(".container-cards");
  var template_hexagon = document.querySelector("#hex-template");
  Array.from(cards_container.querySelectorAll(".hex:not(.first)")).slice(1).forEach(function (element) {
    element.remove();
  });
  selected_cards.forEach(function (card_url) {
    var hexagon = template_hexagon.content.cloneNode(true).firstChild;
    hexagon.addEventListener("click", function () {
      cards_container.dispatchEvent(new CustomEvent("cardSelect", {
        detail: {
          image_url: card_url
        }
      }));
    });
    hexagon.style.backgroundImage = "url(\"".concat(card_url, "\")");
    cards_container.appendChild(hexagon);
  });
}

function setup_decks() {
  var deck_list_template = document.querySelector("#deck-list-template");
  var deck_list = document.querySelector(".container-decks");
  Object.keys(DECKS).forEach(function (deck_name) {
    var new_deck_list_item = deck_list_template.content.cloneNode(true).firstChild;
    new_deck_list_item.innerHTML = deck_name;
    deck_list.appendChild(new_deck_list_item);
  });
  var list_group_links = document.querySelectorAll(".list-group.tab-container>div");
  list_group_links.forEach(function (element) {
    element.addEventListener("click", select_deck);
  });
}

exports.setup_decks = setup_decks;
exports.tab_setup = tab_setup;
},{}],"scripts/grid.js":[function(require,module,exports) {
var grid_state = {
  data: {},
  add_card: function add_card(card_pos, image_url) {
    this.data[card_pos] = image_url;
  },
  remove_card: function remove_card(card_pos) {
    delete this.data[card_pos];
  },
  store: function store() {
    window.localStorage.setItem("hex_grid_map", JSON.stringify(this.data));
  },
  restore: function restore() {
    var _this = this;

    this.data = JSON.parse(window.localStorage.getItem("hex_grid_map") || "{}");
    console.log(this.data);
    Object.keys(this.data).forEach(function (hex_position) {
      var hex = document.querySelector("[data-position=\"".concat(hex_position, "\"]"));
      hex.style.backgroundImage = "url(\"".concat(_this.data[hex_position], "\")");
    });
  },
  clear: function clear() {
    this.data = {};
  }
};

function select_hexagon(event) {
  var selected_hex = document.querySelector(".hex-container>.hex.bg-primary");

  if (selected_hex) {
    selected_hex.classList.remove("bg-primary");
    selected_hex.classList.add("bg-light");
  }

  var new_select = event.target;
  new_select.classList.add("bg-primary");
  new_select.classList.remove("bg-light");
}

function fill_hexagon(image_url) {
  var selected_hex = document.querySelector(".hex-container>.hex.bg-primary");

  if (!selected_hex) {
    return;
  }

  selected_hex.style.backgroundImage = "url(\"".concat(image_url, "\")");
  grid_state.add_card(selected_hex.getAttribute("data-position"), image_url);
}

function empty_hexagon() {
  var selected_hex = document.querySelector(".hex-container>.hex.bg-primary");

  if (!selected_hex) {
    return;
  }

  selected_hex.style.backgroundImage = "";
  var hex_pos = selected_hex.getAttribute("data-position");
  grid_state.remove_card(hex_pos);
}

function generate_grid() {
  var template_hexagon = document.querySelector("#hex-template");
  var grid_container = document.querySelector(".hex-container");

  for (var j = 1; j <= 30; j++) {
    for (var i = 1; i <= 30; i++) {
      var hexagon = template_hexagon.content.cloneNode(true).firstChild;
      hexagon.setAttribute("data-position", "".concat(j, "-").concat(i));
      hexagon.addEventListener("click", select_hexagon);
      hexagon.style.gridRowStart = j;
      if (j % 2 == 1) hexagon.style.gridColumn = "".concat(i * 2, " / span 2");else hexagon.style.gridColumn = "".concat(i * 2 - 1, " / span 2");
      grid_container.appendChild(hexagon);
    }
  }
}

exports.generate_grid = generate_grid;
exports.fill_hexagon = fill_hexagon;
exports.grid_state = grid_state;
exports.empty_hexagon = empty_hexagon;
},{}],"app.js":[function(require,module,exports) {
var _require = require("./scripts/navbar"),
    setup_decks = _require.setup_decks,
    tab_setup = _require.tab_setup;

var _require2 = require("./scripts/grid"),
    generate_grid = _require2.generate_grid,
    fill_hexagon = _require2.fill_hexagon,
    grid_state = _require2.grid_state,
    empty_hexagon = _require2.empty_hexagon;

var DEFAULT_HEX_WIDTH = 240;
var DEFAULT_HEX_HEIGHT = 265;
var DEFAULT_GRID_AUTO_ROWS = 200;

function zoom_grid(scale) {
  var hexes = document.querySelectorAll(".hex-container>.hex");
  hexes.forEach(function (hex) {
    hex.style.width = "".concat(DEFAULT_HEX_WIDTH * scale, "px");
    hex.style.height = "".concat(DEFAULT_HEX_HEIGHT * scale, "px");
  });
  var grid_container = document.querySelector(".hex-container");
  grid_container.style.gridAutoRows = "".concat(DEFAULT_GRID_AUTO_ROWS * scale, "px");
}

document.querySelector(".container-cards").addEventListener("cardSelect", function (event) {
  var image_url = event.detail.image_url;
  fill_hexagon(image_url);
});
generate_grid();
tab_setup();
setup_decks();
grid_state.restore();
window.addEventListener("hashchange", tab_setup);
window.addEventListener("beforeunload", function () {
  return grid_state.store();
});
document.querySelector(".scale-select").addEventListener("change", function (event) {
  var scale_size = Number(event.target.value);
  console.log(scale_size);
  zoom_grid(scale_size);
});
document.querySelector(".hex-delete").addEventListener("click", function () {
  empty_hexagon();
});
document.querySelector(".cards-tools>button").addEventListener("click", function () {
  grid_state.clear();
  location.reload();
});
},{"./scripts/navbar":"scripts/navbar.js","./scripts/grid":"scripts/grid.js"}],"../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35575" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map