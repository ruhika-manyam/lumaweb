/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var LE = Object.create;
  var Cn = Object.defineProperty;
  var NE = Object.getOwnPropertyDescriptor;
  var DE = Object.getOwnPropertyNames;
  var ME = Object.getPrototypeOf,
    FE = Object.prototype.hasOwnProperty;
  var ue = (e, t) => () => (e && (t = e((e = 0))), t);
  var f = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Oe = (e, t) => {
      for (var n in t) Cn(e, n, { get: t[n], enumerable: !0 });
    },
    oa = (e, t, n, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let o of DE(t))
          !FE.call(e, o) &&
            o !== n &&
            Cn(e, o, {
              get: () => t[o],
              enumerable: !(r = NE(t, o)) || r.enumerable,
            });
      return e;
    };
  var te = (e, t, n) => (
      (n = e != null ? LE(ME(e)) : {}),
      oa(
        t || !e || !e.__esModule
          ? Cn(n, "default", { value: e, enumerable: !0 })
          : n,
        e
      )
    ),
    ke = (e) => oa(Cn({}, "__esModule", { value: !0 }), e);
  var aa = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let r = function (a) {
          let u = window.getComputedStyle(a, null),
            l = u.getPropertyValue("position"),
            g = u.getPropertyValue("overflow"),
            p = u.getPropertyValue("display");
          (!l || l === "static") && (a.style.position = "relative"),
            g !== "hidden" && (a.style.overflow = "hidden"),
            (!p || p === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        o = function (a) {
          let u = window.getComputedStyle(a, null),
            l = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let g in l)
            u.getPropertyValue(g) !== l[g] && (a.style[g] = l[g]);
        },
        i = function (a) {
          let u = a.parentNode;
          r(u),
            o(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let l = a[u].nodeName.toLowerCase();
            if (l === "img") {
              if (t) continue;
              a[u].complete
                ? i(a[u])
                : a[u].addEventListener("load", function () {
                    i(this);
                  });
            } else
              l === "video"
                ? a[u].readyState > 0
                  ? i(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      i(this);
                    })
                : i(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var sa = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(r) {
        Webflow.env("design") ||
          ($("video").each(function () {
            r && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            r ? n($(this)) : t($(this));
          }));
      }
      function t(r) {
        r.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 0);
        });
      }
      function n(r) {
        r.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 1);
        });
      }
      $(document).ready(() => {
        let r = window.matchMedia("(prefers-reduced-motion: reduce)");
        r.addEventListener("change", (o) => {
          e(!o.matches);
        }),
          r.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (o) {
            if (Webflow.env("design")) return;
            let i = $(o.currentTarget),
              s = $(`video#${i.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                n(i),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(i);
                    });
              } else s.pause(), t(i);
          });
      });
    })();
  });
  var kr = f(() => {
    "use strict";
    window.tram = (function (e) {
      function t(c, E) {
        var m = new ge.Bare();
        return m.init(c, E);
      }
      function n(c) {
        return c.replace(/[A-Z]/g, function (E) {
          return "-" + E.toLowerCase();
        });
      }
      function r(c) {
        var E = parseInt(c.slice(1), 16),
          m = (E >> 16) & 255,
          b = (E >> 8) & 255,
          C = 255 & E;
        return [m, b, C];
      }
      function o(c, E, m) {
        return (
          "#" + ((1 << 24) | (c << 16) | (E << 8) | m).toString(16).slice(1)
        );
      }
      function i() {}
      function s(c, E) {
        l("Type warning: Expected: [" + c + "] Got: [" + typeof E + "] " + E);
      }
      function a(c, E, m) {
        l("Units do not match [" + c + "]: " + E + ", " + m);
      }
      function u(c, E, m) {
        if ((E !== void 0 && (m = E), c === void 0)) return m;
        var b = m;
        return (
          Zt.test(c) || !dt.test(c)
            ? (b = parseInt(c, 10))
            : dt.test(c) && (b = 1e3 * parseFloat(c)),
          0 > b && (b = 0),
          b === b ? b : m
        );
      }
      function l(c) {
        ae.debug && window && window.console.warn(c);
      }
      function g(c) {
        for (var E = -1, m = c ? c.length : 0, b = []; ++E < m; ) {
          var C = c[E];
          C && b.push(C);
        }
        return b;
      }
      var p = (function (c, E, m) {
          function b(Q) {
            return typeof Q == "object";
          }
          function C(Q) {
            return typeof Q == "function";
          }
          function w() {}
          function U(Q, se) {
            function D() {
              var Ie = new Z();
              return C(Ie.init) && Ie.init.apply(Ie, arguments), Ie;
            }
            function Z() {}
            se === m && ((se = Q), (Q = Object)), (D.Bare = Z);
            var J,
              de = (w[c] = Q[c]),
              Be = (Z[c] = D[c] = new w());
            return (
              (Be.constructor = D),
              (D.mixin = function (Ie) {
                return (Z[c] = D[c] = U(D, Ie)[c]), D;
              }),
              (D.open = function (Ie) {
                if (
                  ((J = {}),
                  C(Ie) ? (J = Ie.call(D, Be, de, D, Q)) : b(Ie) && (J = Ie),
                  b(J))
                )
                  for (var Jt in J) E.call(J, Jt) && (Be[Jt] = J[Jt]);
                return C(Be.init) || (Be.init = Q), D;
              }),
              D.open(se)
            );
          }
          return U;
        })("prototype", {}.hasOwnProperty),
        d = {
          ease: [
            "ease",
            function (c, E, m, b) {
              var C = (c /= b) * c,
                w = C * c;
              return (
                E +
                m * (-2.75 * w * C + 11 * C * C + -15.5 * w + 8 * C + 0.25 * c)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (c, E, m, b) {
              var C = (c /= b) * c,
                w = C * c;
              return E + m * (-1 * w * C + 3 * C * C + -3 * w + 2 * C);
            },
          ],
          "ease-out": [
            "ease-out",
            function (c, E, m, b) {
              var C = (c /= b) * c,
                w = C * c;
              return (
                E +
                m * (0.3 * w * C + -1.6 * C * C + 2.2 * w + -1.8 * C + 1.9 * c)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (c, E, m, b) {
              var C = (c /= b) * c,
                w = C * c;
              return E + m * (2 * w * C + -5 * C * C + 2 * w + 2 * C);
            },
          ],
          linear: [
            "linear",
            function (c, E, m, b) {
              return (m * c) / b + E;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (c, E, m, b) {
              return m * (c /= b) * c + E;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (c, E, m, b) {
              return -m * (c /= b) * (c - 2) + E;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (c, E, m, b) {
              return (c /= b / 2) < 1
                ? (m / 2) * c * c + E
                : (-m / 2) * (--c * (c - 2) - 1) + E;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (c, E, m, b) {
              return m * (c /= b) * c * c + E;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (c, E, m, b) {
              return m * ((c = c / b - 1) * c * c + 1) + E;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (c, E, m, b) {
              return (c /= b / 2) < 1
                ? (m / 2) * c * c * c + E
                : (m / 2) * ((c -= 2) * c * c + 2) + E;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (c, E, m, b) {
              return m * (c /= b) * c * c * c + E;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (c, E, m, b) {
              return -m * ((c = c / b - 1) * c * c * c - 1) + E;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (c, E, m, b) {
              return (c /= b / 2) < 1
                ? (m / 2) * c * c * c * c + E
                : (-m / 2) * ((c -= 2) * c * c * c - 2) + E;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (c, E, m, b) {
              return m * (c /= b) * c * c * c * c + E;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (c, E, m, b) {
              return m * ((c = c / b - 1) * c * c * c * c + 1) + E;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (c, E, m, b) {
              return (c /= b / 2) < 1
                ? (m / 2) * c * c * c * c * c + E
                : (m / 2) * ((c -= 2) * c * c * c * c + 2) + E;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (c, E, m, b) {
              return -m * Math.cos((c / b) * (Math.PI / 2)) + m + E;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (c, E, m, b) {
              return m * Math.sin((c / b) * (Math.PI / 2)) + E;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (c, E, m, b) {
              return (-m / 2) * (Math.cos((Math.PI * c) / b) - 1) + E;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (c, E, m, b) {
              return c === 0 ? E : m * Math.pow(2, 10 * (c / b - 1)) + E;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (c, E, m, b) {
              return c === b
                ? E + m
                : m * (-Math.pow(2, (-10 * c) / b) + 1) + E;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (c, E, m, b) {
              return c === 0
                ? E
                : c === b
                ? E + m
                : (c /= b / 2) < 1
                ? (m / 2) * Math.pow(2, 10 * (c - 1)) + E
                : (m / 2) * (-Math.pow(2, -10 * --c) + 2) + E;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (c, E, m, b) {
              return -m * (Math.sqrt(1 - (c /= b) * c) - 1) + E;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (c, E, m, b) {
              return m * Math.sqrt(1 - (c = c / b - 1) * c) + E;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (c, E, m, b) {
              return (c /= b / 2) < 1
                ? (-m / 2) * (Math.sqrt(1 - c * c) - 1) + E
                : (m / 2) * (Math.sqrt(1 - (c -= 2) * c) + 1) + E;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (c, E, m, b, C) {
              return (
                C === void 0 && (C = 1.70158),
                m * (c /= b) * c * ((C + 1) * c - C) + E
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (c, E, m, b, C) {
              return (
                C === void 0 && (C = 1.70158),
                m * ((c = c / b - 1) * c * ((C + 1) * c + C) + 1) + E
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (c, E, m, b, C) {
              return (
                C === void 0 && (C = 1.70158),
                (c /= b / 2) < 1
                  ? (m / 2) * c * c * (((C *= 1.525) + 1) * c - C) + E
                  : (m / 2) *
                      ((c -= 2) * c * (((C *= 1.525) + 1) * c + C) + 2) +
                    E
              );
            },
          ],
        },
        y = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        S = document,
        _ = window,
        A = "bkwld-tram",
        v = /[\-\.0-9]/g,
        O = /[A-Z]/,
        T = "number",
        x = /^(rgb|#)/,
        P = /(em|cm|mm|in|pt|pc|px)$/,
        R = /(em|cm|mm|in|pt|pc|px|%)$/,
        G = /(deg|rad|turn)$/,
        X = "unitless",
        B = /(all|none) 0s ease 0s/,
        H = /^(width|height)$/,
        j = " ",
        N = S.createElement("a"),
        I = ["Webkit", "Moz", "O", "ms"],
        L = ["-webkit-", "-moz-", "-o-", "-ms-"],
        V = function (c) {
          if (c in N.style) return { dom: c, css: c };
          var E,
            m,
            b = "",
            C = c.split("-");
          for (E = 0; E < C.length; E++)
            b += C[E].charAt(0).toUpperCase() + C[E].slice(1);
          for (E = 0; E < I.length; E++)
            if (((m = I[E] + b), m in N.style))
              return { dom: m, css: L[E] + c };
        },
        F = (t.support = {
          bind: Function.prototype.bind,
          transform: V("transform"),
          transition: V("transition"),
          backface: V("backface-visibility"),
          timing: V("transition-timing-function"),
        });
      if (F.transition) {
        var z = F.timing.dom;
        if (((N.style[z] = d["ease-in-back"][0]), !N.style[z]))
          for (var K in y) d[K][0] = y[K];
      }
      var ne = (t.frame = (function () {
          var c =
            _.requestAnimationFrame ||
            _.webkitRequestAnimationFrame ||
            _.mozRequestAnimationFrame ||
            _.oRequestAnimationFrame ||
            _.msRequestAnimationFrame;
          return c && F.bind
            ? c.bind(_)
            : function (E) {
                _.setTimeout(E, 16);
              };
        })()),
        me = (t.now = (function () {
          var c = _.performance,
            E = c && (c.now || c.webkitNow || c.msNow || c.mozNow);
          return E && F.bind
            ? E.bind(c)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        Ve = p(function (c) {
          function E(W, ee) {
            var le = g(("" + W).split(j)),
              re = le[0];
            ee = ee || {};
            var Te = q[re];
            if (!Te) return l("Unsupported property: " + re);
            if (!ee.weak || !this.props[re]) {
              var Ne = Te[0],
                Se = this.props[re];
              return (
                Se || (Se = this.props[re] = new Ne.Bare()),
                Se.init(this.$el, le, Te, ee),
                Se
              );
            }
          }
          function m(W, ee, le) {
            if (W) {
              var re = typeof W;
              if (
                (ee ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                re == "number" && ee)
              )
                return (
                  (this.timer = new nt({
                    duration: W,
                    context: this,
                    complete: w,
                  })),
                  void (this.active = !0)
                );
              if (re == "string" && ee) {
                switch (W) {
                  case "hide":
                    D.call(this);
                    break;
                  case "stop":
                    U.call(this);
                    break;
                  case "redraw":
                    Z.call(this);
                    break;
                  default:
                    E.call(this, W, le && le[1]);
                }
                return w.call(this);
              }
              if (re == "function") return void W.call(this, this);
              if (re == "object") {
                var Te = 0;
                Be.call(
                  this,
                  W,
                  function (pe, PE) {
                    pe.span > Te && (Te = pe.span), pe.stop(), pe.animate(PE);
                  },
                  function (pe) {
                    "wait" in pe && (Te = u(pe.wait, 0));
                  }
                ),
                  de.call(this),
                  Te > 0 &&
                    ((this.timer = new nt({ duration: Te, context: this })),
                    (this.active = !0),
                    ee && (this.timer.complete = w));
                var Ne = this,
                  Se = !1,
                  Rn = {};
                ne(function () {
                  Be.call(Ne, W, function (pe) {
                    pe.active && ((Se = !0), (Rn[pe.name] = pe.nextStyle));
                  }),
                    Se && Ne.$el.css(Rn);
                });
              }
            }
          }
          function b(W) {
            (W = u(W, 0)),
              this.active
                ? this.queue.push({ options: W })
                : ((this.timer = new nt({
                    duration: W,
                    context: this,
                    complete: w,
                  })),
                  (this.active = !0));
          }
          function C(W) {
            return this.active
              ? (this.queue.push({ options: W, args: arguments }),
                void (this.timer.complete = w))
              : l(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function w() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var W = this.queue.shift();
              m.call(this, W.options, !0, W.args);
            }
          }
          function U(W) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ee;
            typeof W == "string"
              ? ((ee = {}), (ee[W] = 1))
              : (ee = typeof W == "object" && W != null ? W : this.props),
              Be.call(this, ee, Ie),
              de.call(this);
          }
          function Q(W) {
            U.call(this, W), Be.call(this, W, Jt, RE);
          }
          function se(W) {
            typeof W != "string" && (W = "block"), (this.el.style.display = W);
          }
          function D() {
            U.call(this), (this.el.style.display = "none");
          }
          function Z() {
            this.el.offsetHeight;
          }
          function J() {
            U.call(this), e.removeData(this.el, A), (this.$el = this.el = null);
          }
          function de() {
            var W,
              ee,
              le = [];
            this.upstream && le.push(this.upstream);
            for (W in this.props)
              (ee = this.props[W]), ee.active && le.push(ee.string);
            (le = le.join(",")),
              this.style !== le &&
                ((this.style = le), (this.el.style[F.transition.dom] = le));
          }
          function Be(W, ee, le) {
            var re,
              Te,
              Ne,
              Se,
              Rn = ee !== Ie,
              pe = {};
            for (re in W)
              (Ne = W[re]),
                re in ce
                  ? (pe.transform || (pe.transform = {}),
                    (pe.transform[re] = Ne))
                  : (O.test(re) && (re = n(re)),
                    re in q ? (pe[re] = Ne) : (Se || (Se = {}), (Se[re] = Ne)));
            for (re in pe) {
              if (((Ne = pe[re]), (Te = this.props[re]), !Te)) {
                if (!Rn) continue;
                Te = E.call(this, re);
              }
              ee.call(this, Te, Ne);
            }
            le && Se && le.call(this, Se);
          }
          function Ie(W) {
            W.stop();
          }
          function Jt(W, ee) {
            W.set(ee);
          }
          function RE(W) {
            this.$el.css(W);
          }
          function Le(W, ee) {
            c[W] = function () {
              return this.children
                ? CE.call(this, ee, arguments)
                : (this.el && ee.apply(this, arguments), this);
            };
          }
          function CE(W, ee) {
            var le,
              re = this.children.length;
            for (le = 0; re > le; le++) W.apply(this.children[le], ee);
            return this;
          }
          (c.init = function (W) {
            if (
              ((this.$el = e(W)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ae.keepInherited && !ae.fallback)
            ) {
              var ee = M(this.el, "transition");
              ee && !B.test(ee) && (this.upstream = ee);
            }
            F.backface &&
              ae.hideBackface &&
              h(this.el, F.backface.css, "hidden");
          }),
            Le("add", E),
            Le("start", m),
            Le("wait", b),
            Le("then", C),
            Le("next", w),
            Le("stop", U),
            Le("set", Q),
            Le("show", se),
            Le("hide", D),
            Le("redraw", Z),
            Le("destroy", J);
        }),
        ge = p(Ve, function (c) {
          function E(m, b) {
            var C = e.data(m, A) || e.data(m, A, new Ve.Bare());
            return C.el || C.init(m), b ? C.start(b) : C;
          }
          c.init = function (m, b) {
            var C = e(m);
            if (!C.length) return this;
            if (C.length === 1) return E(C[0], b);
            var w = [];
            return (
              C.each(function (U, Q) {
                w.push(E(Q, b));
              }),
              (this.children = w),
              this
            );
          };
        }),
        Y = p(function (c) {
          function E() {
            var w = this.get();
            this.update("auto");
            var U = this.get();
            return this.update(w), U;
          }
          function m(w, U, Q) {
            return U !== void 0 && (Q = U), w in d ? w : Q;
          }
          function b(w) {
            var U = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(w);
            return (U ? o(U[1], U[2], U[3]) : w).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var C = { duration: 500, ease: "ease", delay: 0 };
          (c.init = function (w, U, Q, se) {
            (this.$el = w), (this.el = w[0]);
            var D = U[0];
            Q[2] && (D = Q[2]),
              k[D] && (D = k[D]),
              (this.name = D),
              (this.type = Q[1]),
              (this.duration = u(U[1], this.duration, C.duration)),
              (this.ease = m(U[2], this.ease, C.ease)),
              (this.delay = u(U[3], this.delay, C.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = H.test(this.name)),
              (this.unit = se.unit || this.unit || ae.defaultUnit),
              (this.angle = se.angle || this.angle || ae.defaultAngle),
              ae.fallback || se.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    j +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? j + d[this.ease][0] : "") +
                    (this.delay ? j + this.delay + "ms" : "")));
          }),
            (c.set = function (w) {
              (w = this.convert(w, this.type)), this.update(w), this.redraw();
            }),
            (c.transition = function (w) {
              (this.active = !0),
                (w = this.convert(w, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  w == "auto" && (w = E.call(this))),
                (this.nextStyle = w);
            }),
            (c.fallback = function (w) {
              var U =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (w = this.convert(w, this.type)),
                this.auto &&
                  (U == "auto" && (U = this.convert(this.get(), this.type)),
                  w == "auto" && (w = E.call(this))),
                (this.tween = new ft({
                  from: U,
                  to: w,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (c.get = function () {
              return M(this.el, this.name);
            }),
            (c.update = function (w) {
              h(this.el, this.name, w);
            }),
            (c.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                h(this.el, this.name, this.get()));
              var w = this.tween;
              w && w.context && w.destroy();
            }),
            (c.convert = function (w, U) {
              if (w == "auto" && this.auto) return w;
              var Q,
                se = typeof w == "number",
                D = typeof w == "string";
              switch (U) {
                case T:
                  if (se) return w;
                  if (D && w.replace(v, "") === "") return +w;
                  Q = "number(unitless)";
                  break;
                case x:
                  if (D) {
                    if (w === "" && this.original) return this.original;
                    if (U.test(w))
                      return w.charAt(0) == "#" && w.length == 7 ? w : b(w);
                  }
                  Q = "hex or rgb string";
                  break;
                case P:
                  if (se) return w + this.unit;
                  if (D && U.test(w)) return w;
                  Q = "number(px) or string(unit)";
                  break;
                case R:
                  if (se) return w + this.unit;
                  if (D && U.test(w)) return w;
                  Q = "number(px) or string(unit or %)";
                  break;
                case G:
                  if (se) return w + this.angle;
                  if (D && U.test(w)) return w;
                  Q = "number(deg) or string(angle)";
                  break;
                case X:
                  if (se || (D && R.test(w))) return w;
                  Q = "number(unitless) or string(unit or %)";
              }
              return s(Q, w), w;
            }),
            (c.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        Ee = p(Y, function (c, E) {
          c.init = function () {
            E.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), x));
          };
        }),
        lt = p(Y, function (c, E) {
          (c.init = function () {
            E.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (c.get = function () {
              return this.$el[this.name]();
            }),
            (c.update = function (m) {
              this.$el[this.name](m);
            });
        }),
        It = p(Y, function (c, E) {
          function m(b, C) {
            var w, U, Q, se, D;
            for (w in b)
              (se = ce[w]),
                (Q = se[0]),
                (U = se[1] || w),
                (D = this.convert(b[w], Q)),
                C.call(this, U, D, Q);
          }
          (c.init = function () {
            E.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                ce.perspective &&
                  ae.perspective &&
                  ((this.current.perspective = ae.perspective),
                  h(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (c.set = function (b) {
              m.call(this, b, function (C, w) {
                this.current[C] = w;
              }),
                h(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (c.transition = function (b) {
              var C = this.values(b);
              this.tween = new $t({
                current: this.current,
                values: C,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var w,
                U = {};
              for (w in this.current) U[w] = w in C ? C[w] : this.current[w];
              (this.active = !0), (this.nextStyle = this.style(U));
            }),
            (c.fallback = function (b) {
              var C = this.values(b);
              this.tween = new $t({
                current: this.current,
                values: C,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (c.update = function () {
              h(this.el, this.name, this.style(this.current));
            }),
            (c.style = function (b) {
              var C,
                w = "";
              for (C in b) w += C + "(" + b[C] + ") ";
              return w;
            }),
            (c.values = function (b) {
              var C,
                w = {};
              return (
                m.call(this, b, function (U, Q, se) {
                  (w[U] = Q),
                    this.current[U] === void 0 &&
                      ((C = 0),
                      ~U.indexOf("scale") && (C = 1),
                      (this.current[U] = this.convert(C, se)));
                }),
                w
              );
            });
        }),
        ft = p(function (c) {
          function E(D) {
            Q.push(D) === 1 && ne(m);
          }
          function m() {
            var D,
              Z,
              J,
              de = Q.length;
            if (de)
              for (ne(m), Z = me(), D = de; D--; ) (J = Q[D]), J && J.render(Z);
          }
          function b(D) {
            var Z,
              J = e.inArray(D, Q);
            J >= 0 &&
              ((Z = Q.slice(J + 1)),
              (Q.length = J),
              Z.length && (Q = Q.concat(Z)));
          }
          function C(D) {
            return Math.round(D * se) / se;
          }
          function w(D, Z, J) {
            return o(
              D[0] + J * (Z[0] - D[0]),
              D[1] + J * (Z[1] - D[1]),
              D[2] + J * (Z[2] - D[2])
            );
          }
          var U = { ease: d.ease[1], from: 0, to: 1 };
          (c.init = function (D) {
            (this.duration = D.duration || 0), (this.delay = D.delay || 0);
            var Z = D.ease || U.ease;
            d[Z] && (Z = d[Z][1]),
              typeof Z != "function" && (Z = U.ease),
              (this.ease = Z),
              (this.update = D.update || i),
              (this.complete = D.complete || i),
              (this.context = D.context || this),
              (this.name = D.name);
            var J = D.from,
              de = D.to;
            J === void 0 && (J = U.from),
              de === void 0 && (de = U.to),
              (this.unit = D.unit || ""),
              typeof J == "number" && typeof de == "number"
                ? ((this.begin = J), (this.change = de - J))
                : this.format(de, J),
              (this.value = this.begin + this.unit),
              (this.start = me()),
              D.autoplay !== !1 && this.play();
          }),
            (c.play = function () {
              this.active ||
                (this.start || (this.start = me()),
                (this.active = !0),
                E(this));
            }),
            (c.stop = function () {
              this.active && ((this.active = !1), b(this));
            }),
            (c.render = function (D) {
              var Z,
                J = D - this.start;
              if (this.delay) {
                if (J <= this.delay) return;
                J -= this.delay;
              }
              if (J < this.duration) {
                var de = this.ease(J, 0, 1, this.duration);
                return (
                  (Z = this.startRGB
                    ? w(this.startRGB, this.endRGB, de)
                    : C(this.begin + de * this.change)),
                  (this.value = Z + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (Z = this.endHex || this.begin + this.change),
                (this.value = Z + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (c.format = function (D, Z) {
              if (((Z += ""), (D += ""), D.charAt(0) == "#"))
                return (
                  (this.startRGB = r(Z)),
                  (this.endRGB = r(D)),
                  (this.endHex = D),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var J = Z.replace(v, ""),
                  de = D.replace(v, "");
                J !== de && a("tween", Z, D), (this.unit = J);
              }
              (Z = parseFloat(Z)),
                (D = parseFloat(D)),
                (this.begin = this.value = Z),
                (this.change = D - Z);
            }),
            (c.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = i);
            });
          var Q = [],
            se = 1e3;
        }),
        nt = p(ft, function (c) {
          (c.init = function (E) {
            (this.duration = E.duration || 0),
              (this.complete = E.complete || i),
              (this.context = E.context),
              this.play();
          }),
            (c.render = function (E) {
              var m = E - this.start;
              m < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        $t = p(ft, function (c, E) {
          (c.init = function (m) {
            (this.context = m.context),
              (this.update = m.update),
              (this.tweens = []),
              (this.current = m.current);
            var b, C;
            for (b in m.values)
              (C = m.values[b]),
                this.current[b] !== C &&
                  this.tweens.push(
                    new ft({
                      name: b,
                      from: this.current[b],
                      to: C,
                      duration: m.duration,
                      delay: m.delay,
                      ease: m.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (c.render = function (m) {
              var b,
                C,
                w = this.tweens.length,
                U = !1;
              for (b = w; b--; )
                (C = this.tweens[b]),
                  C.context &&
                    (C.render(m), (this.current[C.name] = C.value), (U = !0));
              return U
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (c.destroy = function () {
              if ((E.destroy.call(this), this.tweens)) {
                var m,
                  b = this.tweens.length;
                for (m = b; m--; ) this.tweens[m].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ae = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !F.transition,
          agentTests: [],
        });
      (t.fallback = function (c) {
        if (!F.transition) return (ae.fallback = !0);
        ae.agentTests.push("(" + c + ")");
        var E = new RegExp(ae.agentTests.join("|"), "i");
        ae.fallback = E.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (c) {
          return new ft(c);
        }),
        (t.delay = function (c, E, m) {
          return new nt({ complete: E, duration: c, context: m });
        }),
        (e.fn.tram = function (c) {
          return t.call(null, this, c);
        });
      var h = e.style,
        M = e.css,
        k = { transform: F.transform && F.transform.css },
        q = {
          color: [Ee, x],
          background: [Ee, x, "background-color"],
          "outline-color": [Ee, x],
          "border-color": [Ee, x],
          "border-top-color": [Ee, x],
          "border-right-color": [Ee, x],
          "border-bottom-color": [Ee, x],
          "border-left-color": [Ee, x],
          "border-width": [Y, P],
          "border-top-width": [Y, P],
          "border-right-width": [Y, P],
          "border-bottom-width": [Y, P],
          "border-left-width": [Y, P],
          "border-spacing": [Y, P],
          "letter-spacing": [Y, P],
          margin: [Y, P],
          "margin-top": [Y, P],
          "margin-right": [Y, P],
          "margin-bottom": [Y, P],
          "margin-left": [Y, P],
          padding: [Y, P],
          "padding-top": [Y, P],
          "padding-right": [Y, P],
          "padding-bottom": [Y, P],
          "padding-left": [Y, P],
          "outline-width": [Y, P],
          opacity: [Y, T],
          top: [Y, R],
          right: [Y, R],
          bottom: [Y, R],
          left: [Y, R],
          "font-size": [Y, R],
          "text-indent": [Y, R],
          "word-spacing": [Y, R],
          width: [Y, R],
          "min-width": [Y, R],
          "max-width": [Y, R],
          height: [Y, R],
          "min-height": [Y, R],
          "max-height": [Y, R],
          "line-height": [Y, X],
          "scroll-top": [lt, T, "scrollTop"],
          "scroll-left": [lt, T, "scrollLeft"],
        },
        ce = {};
      F.transform &&
        ((q.transform = [It]),
        (ce = {
          x: [R, "translateX"],
          y: [R, "translateY"],
          rotate: [G],
          rotateX: [G],
          rotateY: [G],
          scale: [T],
          scaleX: [T],
          scaleY: [T],
          skew: [G],
          skewX: [G],
          skewY: [G],
        })),
        F.transform &&
          F.backface &&
          ((ce.z = [R, "translateZ"]),
          (ce.rotateZ = [G]),
          (ce.scaleZ = [T]),
          (ce.perspective = [P]));
      var Zt = /ms/,
        dt = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var ca = f((sF, ua) => {
    "use strict";
    var qE = window.$,
      GE = kr() && qE.tram;
    ua.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        n = Array.prototype,
        r = Object.prototype,
        o = Function.prototype,
        i = n.push,
        s = n.slice,
        a = n.concat,
        u = r.toString,
        l = r.hasOwnProperty,
        g = n.forEach,
        p = n.map,
        d = n.reduce,
        y = n.reduceRight,
        S = n.filter,
        _ = n.every,
        A = n.some,
        v = n.indexOf,
        O = n.lastIndexOf,
        T = Array.isArray,
        x = Object.keys,
        P = o.bind,
        R =
          (e.each =
          e.forEach =
            function (I, L, V) {
              if (I == null) return I;
              if (g && I.forEach === g) I.forEach(L, V);
              else if (I.length === +I.length) {
                for (var F = 0, z = I.length; F < z; F++)
                  if (L.call(V, I[F], F, I) === t) return;
              } else
                for (var K = e.keys(I), F = 0, z = K.length; F < z; F++)
                  if (L.call(V, I[K[F]], K[F], I) === t) return;
              return I;
            });
      (e.map = e.collect =
        function (I, L, V) {
          var F = [];
          return I == null
            ? F
            : p && I.map === p
            ? I.map(L, V)
            : (R(I, function (z, K, ne) {
                F.push(L.call(V, z, K, ne));
              }),
              F);
        }),
        (e.find = e.detect =
          function (I, L, V) {
            var F;
            return (
              G(I, function (z, K, ne) {
                if (L.call(V, z, K, ne)) return (F = z), !0;
              }),
              F
            );
          }),
        (e.filter = e.select =
          function (I, L, V) {
            var F = [];
            return I == null
              ? F
              : S && I.filter === S
              ? I.filter(L, V)
              : (R(I, function (z, K, ne) {
                  L.call(V, z, K, ne) && F.push(z);
                }),
                F);
          });
      var G =
        (e.some =
        e.any =
          function (I, L, V) {
            L || (L = e.identity);
            var F = !1;
            return I == null
              ? F
              : A && I.some === A
              ? I.some(L, V)
              : (R(I, function (z, K, ne) {
                  if (F || (F = L.call(V, z, K, ne))) return t;
                }),
                !!F);
          });
      (e.contains = e.include =
        function (I, L) {
          return I == null
            ? !1
            : v && I.indexOf === v
            ? I.indexOf(L) != -1
            : G(I, function (V) {
                return V === L;
              });
        }),
        (e.delay = function (I, L) {
          var V = s.call(arguments, 2);
          return setTimeout(function () {
            return I.apply(null, V);
          }, L);
        }),
        (e.defer = function (I) {
          return e.delay.apply(e, [I, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (I) {
          var L, V, F;
          return function () {
            L ||
              ((L = !0),
              (V = arguments),
              (F = this),
              GE.frame(function () {
                (L = !1), I.apply(F, V);
              }));
          };
        }),
        (e.debounce = function (I, L, V) {
          var F,
            z,
            K,
            ne,
            me,
            Ve = function () {
              var ge = e.now() - ne;
              ge < L
                ? (F = setTimeout(Ve, L - ge))
                : ((F = null), V || ((me = I.apply(K, z)), (K = z = null)));
            };
          return function () {
            (K = this), (z = arguments), (ne = e.now());
            var ge = V && !F;
            return (
              F || (F = setTimeout(Ve, L)),
              ge && ((me = I.apply(K, z)), (K = z = null)),
              me
            );
          };
        }),
        (e.defaults = function (I) {
          if (!e.isObject(I)) return I;
          for (var L = 1, V = arguments.length; L < V; L++) {
            var F = arguments[L];
            for (var z in F) I[z] === void 0 && (I[z] = F[z]);
          }
          return I;
        }),
        (e.keys = function (I) {
          if (!e.isObject(I)) return [];
          if (x) return x(I);
          var L = [];
          for (var V in I) e.has(I, V) && L.push(V);
          return L;
        }),
        (e.has = function (I, L) {
          return l.call(I, L);
        }),
        (e.isObject = function (I) {
          return I === Object(I);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var X = /(.)^/,
        B = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        H = /\\|'|\r|\n|\u2028|\u2029/g,
        j = function (I) {
          return "\\" + B[I];
        },
        N = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (I, L, V) {
          !L && V && (L = V), (L = e.defaults({}, L, e.templateSettings));
          var F = RegExp(
              [
                (L.escape || X).source,
                (L.interpolate || X).source,
                (L.evaluate || X).source,
              ].join("|") + "|$",
              "g"
            ),
            z = 0,
            K = "__p+='";
          I.replace(F, function (ge, Y, Ee, lt, It) {
            return (
              (K += I.slice(z, It).replace(H, j)),
              (z = It + ge.length),
              Y
                ? (K +=
                    `'+
((__t=(` +
                    Y +
                    `))==null?'':_.escape(__t))+
'`)
                : Ee
                ? (K +=
                    `'+
((__t=(` +
                    Ee +
                    `))==null?'':__t)+
'`)
                : lt &&
                  (K +=
                    `';
` +
                    lt +
                    `
__p+='`),
              ge
            );
          }),
            (K += `';
`);
          var ne = L.variable;
          if (ne) {
            if (!N.test(ne))
              throw new Error("variable is not a bare identifier: " + ne);
          } else
            (K =
              `with(obj||{}){
` +
              K +
              `}
`),
              (ne = "obj");
          K =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            K +
            `return __p;
`;
          var me;
          try {
            me = new Function(L.variable || "obj", "_", K);
          } catch (ge) {
            throw ((ge.source = K), ge);
          }
          var Ve = function (ge) {
            return me.call(this, ge, e);
          };
          return (
            (Ve.source =
              "function(" +
              ne +
              `){
` +
              K +
              "}"),
            Ve
          );
        }),
        e
      );
    })();
  });
  var He = f((uF, ya) => {
    "use strict";
    var ie = {},
      Tt = {},
      bt = [],
      Hr = window.Webflow || [],
      rt = window.jQuery,
      Me = rt(window),
      XE = rt(document),
      Ue = rt.isFunction,
      De = (ie._ = ca()),
      fa = (ie.tram = kr() && rt.tram),
      Ln = !1,
      Wr = !1;
    fa.config.hideBackface = !1;
    fa.config.keepInherited = !0;
    ie.define = function (e, t, n) {
      Tt[e] && pa(Tt[e]);
      var r = (Tt[e] = t(rt, De, n) || {});
      return da(r), r;
    };
    ie.require = function (e) {
      return Tt[e];
    };
    function da(e) {
      ie.env() &&
        (Ue(e.design) && Me.on("__wf_design", e.design),
        Ue(e.preview) && Me.on("__wf_preview", e.preview)),
        Ue(e.destroy) && Me.on("__wf_destroy", e.destroy),
        e.ready && Ue(e.ready) && VE(e);
    }
    function VE(e) {
      if (Ln) {
        e.ready();
        return;
      }
      De.contains(bt, e.ready) || bt.push(e.ready);
    }
    function pa(e) {
      Ue(e.design) && Me.off("__wf_design", e.design),
        Ue(e.preview) && Me.off("__wf_preview", e.preview),
        Ue(e.destroy) && Me.off("__wf_destroy", e.destroy),
        e.ready && Ue(e.ready) && BE(e);
    }
    function BE(e) {
      bt = De.filter(bt, function (t) {
        return t !== e.ready;
      });
    }
    ie.push = function (e) {
      if (Ln) {
        Ue(e) && e();
        return;
      }
      Hr.push(e);
    };
    ie.env = function (e) {
      var t = window.__wf_design,
        n = typeof t < "u";
      if (!e) return n;
      if (e === "design") return n && t;
      if (e === "preview") return n && !t;
      if (e === "slug") return n && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var Pn = navigator.userAgent.toLowerCase(),
      ha = (ie.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      kE = (ie.env.chrome =
        /chrome/.test(Pn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(Pn.match(/chrome\/(\d+)\./)[1], 10)),
      UE = (ie.env.ios = /(ipod|iphone|ipad)/.test(Pn));
    ie.env.safari = /safari/.test(Pn) && !kE && !UE;
    var Ur;
    ha &&
      XE.on("touchstart mousedown", function (e) {
        Ur = e.target;
      });
    ie.validClick = ha
      ? function (e) {
          return e === Ur || rt.contains(e, Ur);
        }
      : function () {
          return !0;
        };
    var ga = "resize.webflow orientationchange.webflow load.webflow",
      HE = "scroll.webflow " + ga;
    ie.resize = zr(Me, ga);
    ie.scroll = zr(Me, HE);
    ie.redraw = zr();
    function zr(e, t) {
      var n = [],
        r = {};
      return (
        (r.up = De.throttle(function (o) {
          De.each(n, function (i) {
            i(o);
          });
        })),
        e && t && e.on(t, r.up),
        (r.on = function (o) {
          typeof o == "function" && (De.contains(n, o) || n.push(o));
        }),
        (r.off = function (o) {
          if (!arguments.length) {
            n = [];
            return;
          }
          n = De.filter(n, function (i) {
            return i !== o;
          });
        }),
        r
      );
    }
    ie.location = function (e) {
      window.location = e;
    };
    ie.env() && (ie.location = function () {});
    ie.ready = function () {
      (Ln = !0), Wr ? WE() : De.each(bt, la), De.each(Hr, la), ie.resize.up();
    };
    function la(e) {
      Ue(e) && e();
    }
    function WE() {
      (Wr = !1), De.each(Tt, da);
    }
    var pt;
    ie.load = function (e) {
      pt.then(e);
    };
    function Ea() {
      pt && (pt.reject(), Me.off("load", pt.resolve)),
        (pt = new rt.Deferred()),
        Me.on("load", pt.resolve);
    }
    ie.destroy = function (e) {
      (e = e || {}),
        (Wr = !0),
        Me.triggerHandler("__wf_destroy"),
        e.domready != null && (Ln = e.domready),
        De.each(Tt, pa),
        ie.resize.off(),
        ie.scroll.off(),
        ie.redraw.off(),
        (bt = []),
        (Hr = []),
        pt.state() === "pending" && Ea();
    };
    rt(ie.ready);
    Ea();
    ya.exports = window.Webflow = ie;
  });
  var _a = f((cF, ma) => {
    "use strict";
    var va = He();
    va.define(
      "brand",
      (ma.exports = function (e) {
        var t = {},
          n = document,
          r = e("html"),
          o = e("body"),
          i = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          l;
        t.ready = function () {
          var y = r.attr("data-wf-status"),
            S = r.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(S) && s.hostname !== S && (y = !0),
            y &&
              !a &&
              ((l = l || p()),
              d(),
              setTimeout(d, 500),
              e(n).off(u, g).on(u, g));
        };
        function g() {
          var y =
            n.fullScreen ||
            n.mozFullScreen ||
            n.webkitIsFullScreen ||
            n.msFullscreenElement ||
            !!n.webkitFullscreenElement;
          e(l).attr("style", y ? "display: none !important;" : "");
        }
        function p() {
          var y = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            S = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            _ = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return y.append(S, _), y[0];
        }
        function d() {
          var y = o.children(i),
            S = y.length && y.get(0) === l,
            _ = va.env("editor");
          if (S) {
            _ && y.remove();
            return;
          }
          y.length && y.remove(), _ || o.append(l);
        }
        return t;
      })
    );
  });
  var Ta = f((lF, Ia) => {
    "use strict";
    var Kr = He();
    Kr.define(
      "edit",
      (Ia.exports = function (e, t, n) {
        if (
          ((n = n || {}),
          (Kr.env("test") || Kr.env("frame")) && !n.fixture && !zE())
        )
          return { exit: 1 };
        var r = {},
          o = e(window),
          i = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          l = n.load || d,
          g = !1;
        try {
          g =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        g
          ? l()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            l()
          : o.on(a, p).triggerHandler(a);
        function p() {
          u || (/\?edit/.test(s.hash) && l());
        }
        function d() {
          (u = !0),
            (window.WebflowEditor = !0),
            o.off(a, p),
            O(function (x) {
              e.ajax({
                url: v("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: i.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: y(x),
              });
            });
        }
        function y(x) {
          return function (P) {
            if (!P) {
              console.error("Could not load editor data");
              return;
            }
            (P.thirdPartyCookiesSupported = x),
              S(A(P.scriptPath), function () {
                window.WebflowEditor(P);
              });
          };
        }
        function S(x, P) {
          e.ajax({ type: "GET", url: x, dataType: "script", cache: !0 }).then(
            P,
            _
          );
        }
        function _(x, P, R) {
          throw (console.error("Could not load editor script: " + P), R);
        }
        function A(x) {
          return x.indexOf("//") >= 0
            ? x
            : v("https://editor-api.webflow.com" + x);
        }
        function v(x) {
          return x.replace(/([^:])\/\//g, "$1/");
        }
        function O(x) {
          var P = window.document.createElement("iframe");
          (P.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (P.style.display = "none"),
            (P.sandbox = "allow-scripts allow-same-origin");
          var R = function (G) {
            G.data === "WF_third_party_cookies_unsupported"
              ? (T(P, R), x(!1))
              : G.data === "WF_third_party_cookies_supported" &&
                (T(P, R), x(!0));
          };
          (P.onerror = function () {
            T(P, R), x(!1);
          }),
            window.addEventListener("message", R, !1),
            window.document.body.appendChild(P);
        }
        function T(x, P) {
          window.removeEventListener("message", P, !1), x.remove();
        }
        return r;
      })
    );
    function zE() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Aa = f((fF, ba) => {
    "use strict";
    var KE = He();
    KE.define(
      "focus-visible",
      (ba.exports = function () {
        function e(n) {
          var r = !0,
            o = !1,
            i = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(T) {
            return !!(
              T &&
              T !== document &&
              T.nodeName !== "HTML" &&
              T.nodeName !== "BODY" &&
              "classList" in T &&
              "contains" in T.classList
            );
          }
          function u(T) {
            var x = T.type,
              P = T.tagName;
            return !!(
              (P === "INPUT" && s[x] && !T.readOnly) ||
              (P === "TEXTAREA" && !T.readOnly) ||
              T.isContentEditable
            );
          }
          function l(T) {
            T.getAttribute("data-wf-focus-visible") ||
              T.setAttribute("data-wf-focus-visible", "true");
          }
          function g(T) {
            T.getAttribute("data-wf-focus-visible") &&
              T.removeAttribute("data-wf-focus-visible");
          }
          function p(T) {
            T.metaKey ||
              T.altKey ||
              T.ctrlKey ||
              (a(n.activeElement) && l(n.activeElement), (r = !0));
          }
          function d() {
            r = !1;
          }
          function y(T) {
            a(T.target) && (r || u(T.target)) && l(T.target);
          }
          function S(T) {
            a(T.target) &&
              T.target.hasAttribute("data-wf-focus-visible") &&
              ((o = !0),
              window.clearTimeout(i),
              (i = window.setTimeout(function () {
                o = !1;
              }, 100)),
              g(T.target));
          }
          function _() {
            document.visibilityState === "hidden" && (o && (r = !0), A());
          }
          function A() {
            document.addEventListener("mousemove", O),
              document.addEventListener("mousedown", O),
              document.addEventListener("mouseup", O),
              document.addEventListener("pointermove", O),
              document.addEventListener("pointerdown", O),
              document.addEventListener("pointerup", O),
              document.addEventListener("touchmove", O),
              document.addEventListener("touchstart", O),
              document.addEventListener("touchend", O);
          }
          function v() {
            document.removeEventListener("mousemove", O),
              document.removeEventListener("mousedown", O),
              document.removeEventListener("mouseup", O),
              document.removeEventListener("pointermove", O),
              document.removeEventListener("pointerdown", O),
              document.removeEventListener("pointerup", O),
              document.removeEventListener("touchmove", O),
              document.removeEventListener("touchstart", O),
              document.removeEventListener("touchend", O);
          }
          function O(T) {
            (T.target.nodeName && T.target.nodeName.toLowerCase() === "html") ||
              ((r = !1), v());
          }
          document.addEventListener("keydown", p, !0),
            document.addEventListener("mousedown", d, !0),
            document.addEventListener("pointerdown", d, !0),
            document.addEventListener("touchstart", d, !0),
            document.addEventListener("visibilitychange", _, !0),
            A(),
            n.addEventListener("focus", y, !0),
            n.addEventListener("blur", S, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var wa = f((dF, Oa) => {
    "use strict";
    var Sa = He();
    Sa.define(
      "focus",
      (Oa.exports = function () {
        var e = [],
          t = !1;
        function n(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function r(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function o(s) {
          r(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function i() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Sa.env.safari &&
            (document.addEventListener("mousedown", o, !0),
            document.addEventListener("mouseup", n, !0),
            document.addEventListener("click", n, !0));
        }
        return { ready: i };
      })
    );
  });
  var Ca = f((pF, Ra) => {
    "use strict";
    var jr = window.jQuery,
      We = {},
      Nn = [],
      xa = ".w-ix",
      Dn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), jr(t).triggerHandler(We.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), jr(t).triggerHandler(We.types.OUTRO));
        },
      };
    We.triggers = {};
    We.types = { INTRO: "w-ix-intro" + xa, OUTRO: "w-ix-outro" + xa };
    We.init = function () {
      for (var e = Nn.length, t = 0; t < e; t++) {
        var n = Nn[t];
        n[0](0, n[1]);
      }
      (Nn = []), jr.extend(We.triggers, Dn);
    };
    We.async = function () {
      for (var e in Dn) {
        var t = Dn[e];
        Dn.hasOwnProperty(e) &&
          (We.triggers[e] = function (n, r) {
            Nn.push([t, r]);
          });
      }
    };
    We.async();
    Ra.exports = We;
  });
  var Qr = f((hF, Na) => {
    "use strict";
    var Yr = Ca();
    function Pa(e, t) {
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, null), e.dispatchEvent(n);
    }
    var jE = window.jQuery,
      Mn = {},
      La = ".w-ix",
      YE = {
        reset: function (e, t) {
          Yr.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Yr.triggers.intro(e, t), Pa(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Yr.triggers.outro(e, t), Pa(t, "COMPONENT_INACTIVE");
        },
      };
    Mn.triggers = {};
    Mn.types = { INTRO: "w-ix-intro" + La, OUTRO: "w-ix-outro" + La };
    jE.extend(Mn.triggers, YE);
    Na.exports = Mn;
  });
  var $r = f((gF, Da) => {
    var QE =
      typeof global == "object" && global && global.Object === Object && global;
    Da.exports = QE;
  });
  var Fe = f((EF, Ma) => {
    var $E = $r(),
      ZE = typeof self == "object" && self && self.Object === Object && self,
      JE = $E || ZE || Function("return this")();
    Ma.exports = JE;
  });
  var At = f((yF, Fa) => {
    var ey = Fe(),
      ty = ey.Symbol;
    Fa.exports = ty;
  });
  var Va = f((vF, Xa) => {
    var qa = At(),
      Ga = Object.prototype,
      ny = Ga.hasOwnProperty,
      ry = Ga.toString,
      en = qa ? qa.toStringTag : void 0;
    function iy(e) {
      var t = ny.call(e, en),
        n = e[en];
      try {
        e[en] = void 0;
        var r = !0;
      } catch {}
      var o = ry.call(e);
      return r && (t ? (e[en] = n) : delete e[en]), o;
    }
    Xa.exports = iy;
  });
  var ka = f((mF, Ba) => {
    var oy = Object.prototype,
      ay = oy.toString;
    function sy(e) {
      return ay.call(e);
    }
    Ba.exports = sy;
  });
  var it = f((_F, Wa) => {
    var Ua = At(),
      uy = Va(),
      cy = ka(),
      ly = "[object Null]",
      fy = "[object Undefined]",
      Ha = Ua ? Ua.toStringTag : void 0;
    function dy(e) {
      return e == null
        ? e === void 0
          ? fy
          : ly
        : Ha && Ha in Object(e)
        ? uy(e)
        : cy(e);
    }
    Wa.exports = dy;
  });
  var Zr = f((IF, za) => {
    function py(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    za.exports = py;
  });
  var Jr = f((TF, Ka) => {
    var hy = Zr(),
      gy = hy(Object.getPrototypeOf, Object);
    Ka.exports = gy;
  });
  var $e = f((bF, ja) => {
    function Ey(e) {
      return e != null && typeof e == "object";
    }
    ja.exports = Ey;
  });
  var ei = f((AF, Qa) => {
    var yy = it(),
      vy = Jr(),
      my = $e(),
      _y = "[object Object]",
      Iy = Function.prototype,
      Ty = Object.prototype,
      Ya = Iy.toString,
      by = Ty.hasOwnProperty,
      Ay = Ya.call(Object);
    function Sy(e) {
      if (!my(e) || yy(e) != _y) return !1;
      var t = vy(e);
      if (t === null) return !0;
      var n = by.call(t, "constructor") && t.constructor;
      return typeof n == "function" && n instanceof n && Ya.call(n) == Ay;
    }
    Qa.exports = Sy;
  });
  var $a = f((ti) => {
    "use strict";
    Object.defineProperty(ti, "__esModule", { value: !0 });
    ti.default = Oy;
    function Oy(e) {
      var t,
        n = e.Symbol;
      return (
        typeof n == "function"
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var Za = f((ri, ni) => {
    "use strict";
    Object.defineProperty(ri, "__esModule", { value: !0 });
    var wy = $a(),
      xy = Ry(wy);
    function Ry(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var St;
    typeof self < "u"
      ? (St = self)
      : typeof window < "u"
      ? (St = window)
      : typeof global < "u"
      ? (St = global)
      : typeof ni < "u"
      ? (St = ni)
      : (St = Function("return this")());
    var Cy = (0, xy.default)(St);
    ri.default = Cy;
  });
  var ii = f((tn) => {
    "use strict";
    tn.__esModule = !0;
    tn.ActionTypes = void 0;
    tn.default = ns;
    var Py = ei(),
      Ly = ts(Py),
      Ny = Za(),
      Ja = ts(Ny);
    function ts(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var es = (tn.ActionTypes = { INIT: "@@redux/INIT" });
    function ns(e, t, n) {
      var r;
      if (
        (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
        typeof n < "u")
      ) {
        if (typeof n != "function")
          throw new Error("Expected the enhancer to be a function.");
        return n(ns)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var o = e,
        i = t,
        s = [],
        a = s,
        u = !1;
      function l() {
        a === s && (a = s.slice());
      }
      function g() {
        return i;
      }
      function p(_) {
        if (typeof _ != "function")
          throw new Error("Expected listener to be a function.");
        var A = !0;
        return (
          l(),
          a.push(_),
          function () {
            if (A) {
              (A = !1), l();
              var O = a.indexOf(_);
              a.splice(O, 1);
            }
          }
        );
      }
      function d(_) {
        if (!(0, Ly.default)(_))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof _.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (i = o(i, _));
        } finally {
          u = !1;
        }
        for (var A = (s = a), v = 0; v < A.length; v++) A[v]();
        return _;
      }
      function y(_) {
        if (typeof _ != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (o = _), d({ type: es.INIT });
      }
      function S() {
        var _,
          A = p;
        return (
          (_ = {
            subscribe: function (O) {
              if (typeof O != "object")
                throw new TypeError("Expected the observer to be an object.");
              function T() {
                O.next && O.next(g());
              }
              T();
              var x = A(T);
              return { unsubscribe: x };
            },
          }),
          (_[Ja.default] = function () {
            return this;
          }),
          _
        );
      }
      return (
        d({ type: es.INIT }),
        (r = { dispatch: d, subscribe: p, getState: g, replaceReducer: y }),
        (r[Ja.default] = S),
        r
      );
    }
  });
  var ai = f((oi) => {
    "use strict";
    oi.__esModule = !0;
    oi.default = Dy;
    function Dy(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var os = f((si) => {
    "use strict";
    si.__esModule = !0;
    si.default = Xy;
    var rs = ii(),
      My = ei(),
      xF = is(My),
      Fy = ai(),
      RF = is(Fy);
    function is(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function qy(e, t) {
      var n = t && t.type,
        r = (n && '"' + n.toString() + '"') || "an action";
      return (
        "Given action " +
        r +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Gy(e) {
      Object.keys(e).forEach(function (t) {
        var n = e[t],
          r = n(void 0, { type: rs.ActionTypes.INIT });
        if (typeof r > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var o =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof n(void 0, { type: o }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                rs.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Xy(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var o = t[r];
        typeof e[o] == "function" && (n[o] = e[o]);
      }
      var i = Object.keys(n);
      if (!1) var s;
      var a;
      try {
        Gy(n);
      } catch (u) {
        a = u;
      }
      return function () {
        var l =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          g = arguments[1];
        if (a) throw a;
        if (!1) var p;
        for (var d = !1, y = {}, S = 0; S < i.length; S++) {
          var _ = i[S],
            A = n[_],
            v = l[_],
            O = A(v, g);
          if (typeof O > "u") {
            var T = qy(_, g);
            throw new Error(T);
          }
          (y[_] = O), (d = d || O !== v);
        }
        return d ? y : l;
      };
    }
  });
  var ss = f((ui) => {
    "use strict";
    ui.__esModule = !0;
    ui.default = Vy;
    function as(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Vy(e, t) {
      if (typeof e == "function") return as(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var n = Object.keys(e), r = {}, o = 0; o < n.length; o++) {
        var i = n[o],
          s = e[i];
        typeof s == "function" && (r[i] = as(s, t));
      }
      return r;
    }
  });
  var li = f((ci) => {
    "use strict";
    ci.__esModule = !0;
    ci.default = By;
    function By() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      if (t.length === 0)
        return function (i) {
          return i;
        };
      if (t.length === 1) return t[0];
      var r = t[t.length - 1],
        o = t.slice(0, -1);
      return function () {
        return o.reduceRight(function (i, s) {
          return s(i);
        }, r.apply(void 0, arguments));
      };
    }
  });
  var us = f((fi) => {
    "use strict";
    fi.__esModule = !0;
    var ky =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    fi.default = zy;
    var Uy = li(),
      Hy = Wy(Uy);
    function Wy(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function zy() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (r) {
        return function (o, i, s) {
          var a = r(o, i, s),
            u = a.dispatch,
            l = [],
            g = {
              getState: a.getState,
              dispatch: function (d) {
                return u(d);
              },
            };
          return (
            (l = t.map(function (p) {
              return p(g);
            })),
            (u = Hy.default.apply(void 0, l)(a.dispatch)),
            ky({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var di = f((Pe) => {
    "use strict";
    Pe.__esModule = !0;
    Pe.compose =
      Pe.applyMiddleware =
      Pe.bindActionCreators =
      Pe.combineReducers =
      Pe.createStore =
        void 0;
    var Ky = ii(),
      jy = Ot(Ky),
      Yy = os(),
      Qy = Ot(Yy),
      $y = ss(),
      Zy = Ot($y),
      Jy = us(),
      ev = Ot(Jy),
      tv = li(),
      nv = Ot(tv),
      rv = ai(),
      DF = Ot(rv);
    function Ot(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Pe.createStore = jy.default;
    Pe.combineReducers = Qy.default;
    Pe.bindActionCreators = Zy.default;
    Pe.applyMiddleware = ev.default;
    Pe.compose = nv.default;
  });
  var qe,
    pi,
    ze,
    iv,
    ov,
    Fn,
    av,
    hi = ue(() => {
      "use strict";
      (qe = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (pi = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (ze = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (iv = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (ov = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Fn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (av = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var we,
    sv,
    qn = ue(() => {
      "use strict";
      (we = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (sv = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var uv,
    cs = ue(() => {
      "use strict";
      uv = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var cv,
    lv,
    fv,
    dv,
    pv,
    hv,
    gv,
    gi,
    ls = ue(() => {
      "use strict";
      qn();
      ({
        TRANSFORM_MOVE: cv,
        TRANSFORM_SCALE: lv,
        TRANSFORM_ROTATE: fv,
        TRANSFORM_SKEW: dv,
        STYLE_SIZE: pv,
        STYLE_FILTER: hv,
        STYLE_FONT_VARIATION: gv,
      } = we),
        (gi = {
          [cv]: !0,
          [lv]: !0,
          [fv]: !0,
          [dv]: !0,
          [pv]: !0,
          [hv]: !0,
          [gv]: !0,
        });
    });
  var he = {};
  Oe(he, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => Lv,
    IX2_ANIMATION_FRAME_CHANGED: () => Ov,
    IX2_CLEAR_REQUESTED: () => bv,
    IX2_ELEMENT_STATE_CHANGED: () => Pv,
    IX2_EVENT_LISTENER_ADDED: () => Av,
    IX2_EVENT_STATE_CHANGED: () => Sv,
    IX2_INSTANCE_ADDED: () => xv,
    IX2_INSTANCE_REMOVED: () => Cv,
    IX2_INSTANCE_STARTED: () => Rv,
    IX2_MEDIA_QUERIES_DEFINED: () => Dv,
    IX2_PARAMETER_CHANGED: () => wv,
    IX2_PLAYBACK_REQUESTED: () => Iv,
    IX2_PREVIEW_REQUESTED: () => _v,
    IX2_RAW_DATA_IMPORTED: () => Ev,
    IX2_SESSION_INITIALIZED: () => yv,
    IX2_SESSION_STARTED: () => vv,
    IX2_SESSION_STOPPED: () => mv,
    IX2_STOP_REQUESTED: () => Tv,
    IX2_TEST_FRAME_RENDERED: () => Mv,
    IX2_VIEWPORT_WIDTH_CHANGED: () => Nv,
  });
  var Ev,
    yv,
    vv,
    mv,
    _v,
    Iv,
    Tv,
    bv,
    Av,
    Sv,
    Ov,
    wv,
    xv,
    Rv,
    Cv,
    Pv,
    Lv,
    Nv,
    Dv,
    Mv,
    fs = ue(() => {
      "use strict";
      (Ev = "IX2_RAW_DATA_IMPORTED"),
        (yv = "IX2_SESSION_INITIALIZED"),
        (vv = "IX2_SESSION_STARTED"),
        (mv = "IX2_SESSION_STOPPED"),
        (_v = "IX2_PREVIEW_REQUESTED"),
        (Iv = "IX2_PLAYBACK_REQUESTED"),
        (Tv = "IX2_STOP_REQUESTED"),
        (bv = "IX2_CLEAR_REQUESTED"),
        (Av = "IX2_EVENT_LISTENER_ADDED"),
        (Sv = "IX2_EVENT_STATE_CHANGED"),
        (Ov = "IX2_ANIMATION_FRAME_CHANGED"),
        (wv = "IX2_PARAMETER_CHANGED"),
        (xv = "IX2_INSTANCE_ADDED"),
        (Rv = "IX2_INSTANCE_STARTED"),
        (Cv = "IX2_INSTANCE_REMOVED"),
        (Pv = "IX2_ELEMENT_STATE_CHANGED"),
        (Lv = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (Nv = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (Dv = "IX2_MEDIA_QUERIES_DEFINED"),
        (Mv = "IX2_TEST_FRAME_RENDERED");
    });
  var _e = {};
  Oe(_e, {
    ABSTRACT_NODE: () => Nm,
    AUTO: () => Tm,
    BACKGROUND: () => Em,
    BACKGROUND_COLOR: () => gm,
    BAR_DELIMITER: () => Sm,
    BORDER_COLOR: () => ym,
    BOUNDARY_SELECTOR: () => Vv,
    CHILDREN: () => Om,
    COLON_DELIMITER: () => Am,
    COLOR: () => vm,
    COMMA_DELIMITER: () => bm,
    CONFIG_UNIT: () => jv,
    CONFIG_VALUE: () => Hv,
    CONFIG_X_UNIT: () => Wv,
    CONFIG_X_VALUE: () => Bv,
    CONFIG_Y_UNIT: () => zv,
    CONFIG_Y_VALUE: () => kv,
    CONFIG_Z_UNIT: () => Kv,
    CONFIG_Z_VALUE: () => Uv,
    DISPLAY: () => mm,
    FILTER: () => fm,
    FLEX: () => _m,
    FONT_VARIATION_SETTINGS: () => dm,
    HEIGHT: () => hm,
    HTML_ELEMENT: () => Pm,
    IMMEDIATE_CHILDREN: () => wm,
    IX2_ID_DELIMITER: () => Fv,
    OPACITY: () => lm,
    PARENT: () => Rm,
    PLAIN_OBJECT: () => Lm,
    PRESERVE_3D: () => Cm,
    RENDER_GENERAL: () => Mm,
    RENDER_PLUGIN: () => qm,
    RENDER_STYLE: () => Fm,
    RENDER_TRANSFORM: () => Dm,
    ROTATE_X: () => im,
    ROTATE_Y: () => om,
    ROTATE_Z: () => am,
    SCALE_3D: () => rm,
    SCALE_X: () => em,
    SCALE_Y: () => tm,
    SCALE_Z: () => nm,
    SIBLINGS: () => xm,
    SKEW: () => sm,
    SKEW_X: () => um,
    SKEW_Y: () => cm,
    TRANSFORM: () => Yv,
    TRANSLATE_3D: () => Jv,
    TRANSLATE_X: () => Qv,
    TRANSLATE_Y: () => $v,
    TRANSLATE_Z: () => Zv,
    WF_PAGE: () => qv,
    WIDTH: () => pm,
    WILL_CHANGE: () => Im,
    W_MOD_IX: () => Xv,
    W_MOD_JS: () => Gv,
  });
  var Fv,
    qv,
    Gv,
    Xv,
    Vv,
    Bv,
    kv,
    Uv,
    Hv,
    Wv,
    zv,
    Kv,
    jv,
    Yv,
    Qv,
    $v,
    Zv,
    Jv,
    em,
    tm,
    nm,
    rm,
    im,
    om,
    am,
    sm,
    um,
    cm,
    lm,
    fm,
    dm,
    pm,
    hm,
    gm,
    Em,
    ym,
    vm,
    mm,
    _m,
    Im,
    Tm,
    bm,
    Am,
    Sm,
    Om,
    wm,
    xm,
    Rm,
    Cm,
    Pm,
    Lm,
    Nm,
    Dm,
    Mm,
    Fm,
    qm,
    ds = ue(() => {
      "use strict";
      (Fv = "|"),
        (qv = "data-wf-page"),
        (Gv = "w-mod-js"),
        (Xv = "w-mod-ix"),
        (Vv = ".w-dyn-item"),
        (Bv = "xValue"),
        (kv = "yValue"),
        (Uv = "zValue"),
        (Hv = "value"),
        (Wv = "xUnit"),
        (zv = "yUnit"),
        (Kv = "zUnit"),
        (jv = "unit"),
        (Yv = "transform"),
        (Qv = "translateX"),
        ($v = "translateY"),
        (Zv = "translateZ"),
        (Jv = "translate3d"),
        (em = "scaleX"),
        (tm = "scaleY"),
        (nm = "scaleZ"),
        (rm = "scale3d"),
        (im = "rotateX"),
        (om = "rotateY"),
        (am = "rotateZ"),
        (sm = "skew"),
        (um = "skewX"),
        (cm = "skewY"),
        (lm = "opacity"),
        (fm = "filter"),
        (dm = "font-variation-settings"),
        (pm = "width"),
        (hm = "height"),
        (gm = "backgroundColor"),
        (Em = "background"),
        (ym = "borderColor"),
        (vm = "color"),
        (mm = "display"),
        (_m = "flex"),
        (Im = "willChange"),
        (Tm = "AUTO"),
        (bm = ","),
        (Am = ":"),
        (Sm = "|"),
        (Om = "CHILDREN"),
        (wm = "IMMEDIATE_CHILDREN"),
        (xm = "SIBLINGS"),
        (Rm = "PARENT"),
        (Cm = "preserve-3d"),
        (Pm = "HTML_ELEMENT"),
        (Lm = "PLAIN_OBJECT"),
        (Nm = "ABSTRACT_NODE"),
        (Dm = "RENDER_TRANSFORM"),
        (Mm = "RENDER_GENERAL"),
        (Fm = "RENDER_STYLE"),
        (qm = "RENDER_PLUGIN");
    });
  var ps = {};
  Oe(ps, {
    ActionAppliesTo: () => sv,
    ActionTypeConsts: () => we,
    EventAppliesTo: () => pi,
    EventBasedOn: () => ze,
    EventContinuousMouseAxes: () => iv,
    EventLimitAffectedElements: () => ov,
    EventTypeConsts: () => qe,
    IX2EngineActionTypes: () => he,
    IX2EngineConstants: () => _e,
    InteractionTypeConsts: () => uv,
    QuickEffectDirectionConsts: () => av,
    QuickEffectIds: () => Fn,
    ReducedMotionTypes: () => gi,
  });
  var xe = ue(() => {
    "use strict";
    hi();
    qn();
    cs();
    ls();
    fs();
    ds();
    qn();
    hi();
  });
  var Gm,
    hs,
    gs = ue(() => {
      "use strict";
      xe();
      ({ IX2_RAW_DATA_IMPORTED: Gm } = he),
        (hs = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case Gm:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var wt = f((fe) => {
    "use strict";
    Object.defineProperty(fe, "__esModule", { value: !0 });
    var Xm =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    fe.clone = Xn;
    fe.addLast = vs;
    fe.addFirst = ms;
    fe.removeLast = _s;
    fe.removeFirst = Is;
    fe.insert = Ts;
    fe.removeAt = bs;
    fe.replaceAt = As;
    fe.getIn = Vn;
    fe.set = Bn;
    fe.setIn = kn;
    fe.update = Os;
    fe.updateIn = ws;
    fe.merge = xs;
    fe.mergeDeep = Rs;
    fe.mergeIn = Cs;
    fe.omit = Ps;
    fe.addDefaults = Ls;
    var Es = "INVALID_ARGS";
    function ys(e) {
      throw new Error(e);
    }
    function Ei(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var Vm = {}.hasOwnProperty;
    function Xn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Ei(e), n = {}, r = 0; r < t.length; r++) {
        var o = t[r];
        n[o] = e[o];
      }
      return n;
    }
    function Re(e, t, n) {
      var r = n;
      r == null && ys(Es);
      for (
        var o = !1, i = arguments.length, s = Array(i > 3 ? i - 3 : 0), a = 3;
        a < i;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var l = s[u];
        if (l != null) {
          var g = Ei(l);
          if (g.length)
            for (var p = 0; p <= g.length; p++) {
              var d = g[p];
              if (!(e && r[d] !== void 0)) {
                var y = l[d];
                t && Gn(r[d]) && Gn(y) && (y = Re(e, t, r[d], y)),
                  !(y === void 0 || y === r[d]) &&
                    (o || ((o = !0), (r = Xn(r))), (r[d] = y));
              }
            }
        }
      }
      return r;
    }
    function Gn(e) {
      var t = typeof e > "u" ? "undefined" : Xm(e);
      return e != null && (t === "object" || t === "function");
    }
    function vs(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function ms(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function _s(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Is(e) {
      return e.length ? e.slice(1) : e;
    }
    function Ts(e, t, n) {
      return e
        .slice(0, t)
        .concat(Array.isArray(n) ? n : [n])
        .concat(e.slice(t));
    }
    function bs(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function As(e, t, n) {
      if (e[t] === n) return e;
      for (var r = e.length, o = Array(r), i = 0; i < r; i++) o[i] = e[i];
      return (o[t] = n), o;
    }
    function Vn(e, t) {
      if ((!Array.isArray(t) && ys(Es), e != null)) {
        for (var n = e, r = 0; r < t.length; r++) {
          var o = t[r];
          if (((n = n?.[o]), n === void 0)) return n;
        }
        return n;
      }
    }
    function Bn(e, t, n) {
      var r = typeof t == "number" ? [] : {},
        o = e ?? r;
      if (o[t] === n) return o;
      var i = Xn(o);
      return (i[t] = n), i;
    }
    function Ss(e, t, n, r) {
      var o = void 0,
        i = t[r];
      if (r === t.length - 1) o = n;
      else {
        var s =
          Gn(e) && Gn(e[i]) ? e[i] : typeof t[r + 1] == "number" ? [] : {};
        o = Ss(s, t, n, r + 1);
      }
      return Bn(e, i, o);
    }
    function kn(e, t, n) {
      return t.length ? Ss(e, t, n, 0) : n;
    }
    function Os(e, t, n) {
      var r = e?.[t],
        o = n(r);
      return Bn(e, t, o);
    }
    function ws(e, t, n) {
      var r = Vn(e, t),
        o = n(r);
      return kn(e, t, o);
    }
    function xs(e, t, n, r, o, i) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Re.call.apply(Re, [null, !1, !1, e, t, n, r, o, i].concat(a))
        : Re(!1, !1, e, t, n, r, o, i);
    }
    function Rs(e, t, n, r, o, i) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Re.call.apply(Re, [null, !1, !0, e, t, n, r, o, i].concat(a))
        : Re(!1, !0, e, t, n, r, o, i);
    }
    function Cs(e, t, n, r, o, i, s) {
      var a = Vn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          l = arguments.length,
          g = Array(l > 7 ? l - 7 : 0),
          p = 7;
        p < l;
        p++
      )
        g[p - 7] = arguments[p];
      return (
        g.length
          ? (u = Re.call.apply(Re, [null, !1, !1, a, n, r, o, i, s].concat(g)))
          : (u = Re(!1, !1, a, n, r, o, i, s)),
        kn(e, t, u)
      );
    }
    function Ps(e, t) {
      for (var n = Array.isArray(t) ? t : [t], r = !1, o = 0; o < n.length; o++)
        if (Vm.call(e, n[o])) {
          r = !0;
          break;
        }
      if (!r) return e;
      for (var i = {}, s = Ei(e), a = 0; a < s.length; a++) {
        var u = s[a];
        n.indexOf(u) >= 0 || (i[u] = e[u]);
      }
      return i;
    }
    function Ls(e, t, n, r, o, i) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Re.call.apply(Re, [null, !0, !1, e, t, n, r, o, i].concat(a))
        : Re(!0, !1, e, t, n, r, o, i);
    }
    var Bm = {
      clone: Xn,
      addLast: vs,
      addFirst: ms,
      removeLast: _s,
      removeFirst: Is,
      insert: Ts,
      removeAt: bs,
      replaceAt: As,
      getIn: Vn,
      set: Bn,
      setIn: kn,
      update: Os,
      updateIn: ws,
      merge: xs,
      mergeDeep: Rs,
      mergeIn: Cs,
      omit: Ps,
      addDefaults: Ls,
    };
    fe.default = Bm;
  });
  var Ds,
    km,
    Um,
    Hm,
    Wm,
    zm,
    Ns,
    Ms,
    Fs = ue(() => {
      "use strict";
      xe();
      (Ds = te(wt())),
        ({
          IX2_PREVIEW_REQUESTED: km,
          IX2_PLAYBACK_REQUESTED: Um,
          IX2_STOP_REQUESTED: Hm,
          IX2_CLEAR_REQUESTED: Wm,
        } = he),
        (zm = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Ns = Object.create(null, {
          [km]: { value: "preview" },
          [Um]: { value: "playback" },
          [Hm]: { value: "stop" },
          [Wm]: { value: "clear" },
        })),
        (Ms = (e = zm, t) => {
          if (t.type in Ns) {
            let n = [Ns[t.type]];
            return (0, Ds.setIn)(e, [n], { ...t.payload });
          }
          return e;
        });
    });
  var be,
    Km,
    jm,
    Ym,
    Qm,
    $m,
    Zm,
    Jm,
    e_,
    t_,
    n_,
    qs,
    r_,
    Gs,
    Xs = ue(() => {
      "use strict";
      xe();
      (be = te(wt())),
        ({
          IX2_SESSION_INITIALIZED: Km,
          IX2_SESSION_STARTED: jm,
          IX2_TEST_FRAME_RENDERED: Ym,
          IX2_SESSION_STOPPED: Qm,
          IX2_EVENT_LISTENER_ADDED: $m,
          IX2_EVENT_STATE_CHANGED: Zm,
          IX2_ANIMATION_FRAME_CHANGED: Jm,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: e_,
          IX2_VIEWPORT_WIDTH_CHANGED: t_,
          IX2_MEDIA_QUERIES_DEFINED: n_,
        } = he),
        (qs = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (r_ = 20),
        (Gs = (e = qs, t) => {
          switch (t.type) {
            case Km: {
              let { hasBoundaryNodes: n, reducedMotion: r } = t.payload;
              return (0, be.merge)(e, {
                hasBoundaryNodes: n,
                reducedMotion: r,
              });
            }
            case jm:
              return (0, be.set)(e, "active", !0);
            case Ym: {
              let {
                payload: { step: n = r_ },
              } = t;
              return (0, be.set)(e, "tick", e.tick + n);
            }
            case Qm:
              return qs;
            case Jm: {
              let {
                payload: { now: n },
              } = t;
              return (0, be.set)(e, "tick", n);
            }
            case $m: {
              let n = (0, be.addLast)(e.eventListeners, t.payload);
              return (0, be.set)(e, "eventListeners", n);
            }
            case Zm: {
              let { stateKey: n, newState: r } = t.payload;
              return (0, be.setIn)(e, ["eventState", n], r);
            }
            case e_: {
              let { actionListId: n, isPlaying: r } = t.payload;
              return (0, be.setIn)(e, ["playbackState", n], r);
            }
            case t_: {
              let { width: n, mediaQueries: r } = t.payload,
                o = r.length,
                i = null;
              for (let s = 0; s < o; s++) {
                let { key: a, min: u, max: l } = r[s];
                if (n >= u && n <= l) {
                  i = a;
                  break;
                }
              }
              return (0, be.merge)(e, { viewportWidth: n, mediaQueryKey: i });
            }
            case n_:
              return (0, be.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var Bs = f((e2, Vs) => {
    function i_() {
      (this.__data__ = []), (this.size = 0);
    }
    Vs.exports = i_;
  });
  var Un = f((t2, ks) => {
    function o_(e, t) {
      return e === t || (e !== e && t !== t);
    }
    ks.exports = o_;
  });
  var nn = f((n2, Us) => {
    var a_ = Un();
    function s_(e, t) {
      for (var n = e.length; n--; ) if (a_(e[n][0], t)) return n;
      return -1;
    }
    Us.exports = s_;
  });
  var Ws = f((r2, Hs) => {
    var u_ = nn(),
      c_ = Array.prototype,
      l_ = c_.splice;
    function f_(e) {
      var t = this.__data__,
        n = u_(t, e);
      if (n < 0) return !1;
      var r = t.length - 1;
      return n == r ? t.pop() : l_.call(t, n, 1), --this.size, !0;
    }
    Hs.exports = f_;
  });
  var Ks = f((i2, zs) => {
    var d_ = nn();
    function p_(e) {
      var t = this.__data__,
        n = d_(t, e);
      return n < 0 ? void 0 : t[n][1];
    }
    zs.exports = p_;
  });
  var Ys = f((o2, js) => {
    var h_ = nn();
    function g_(e) {
      return h_(this.__data__, e) > -1;
    }
    js.exports = g_;
  });
  var $s = f((a2, Qs) => {
    var E_ = nn();
    function y_(e, t) {
      var n = this.__data__,
        r = E_(n, e);
      return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
    }
    Qs.exports = y_;
  });
  var rn = f((s2, Zs) => {
    var v_ = Bs(),
      m_ = Ws(),
      __ = Ks(),
      I_ = Ys(),
      T_ = $s();
    function xt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    xt.prototype.clear = v_;
    xt.prototype.delete = m_;
    xt.prototype.get = __;
    xt.prototype.has = I_;
    xt.prototype.set = T_;
    Zs.exports = xt;
  });
  var eu = f((u2, Js) => {
    var b_ = rn();
    function A_() {
      (this.__data__ = new b_()), (this.size = 0);
    }
    Js.exports = A_;
  });
  var nu = f((c2, tu) => {
    function S_(e) {
      var t = this.__data__,
        n = t.delete(e);
      return (this.size = t.size), n;
    }
    tu.exports = S_;
  });
  var iu = f((l2, ru) => {
    function O_(e) {
      return this.__data__.get(e);
    }
    ru.exports = O_;
  });
  var au = f((f2, ou) => {
    function w_(e) {
      return this.__data__.has(e);
    }
    ou.exports = w_;
  });
  var Ke = f((d2, su) => {
    function x_(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    su.exports = x_;
  });
  var yi = f((p2, uu) => {
    var R_ = it(),
      C_ = Ke(),
      P_ = "[object AsyncFunction]",
      L_ = "[object Function]",
      N_ = "[object GeneratorFunction]",
      D_ = "[object Proxy]";
    function M_(e) {
      if (!C_(e)) return !1;
      var t = R_(e);
      return t == L_ || t == N_ || t == P_ || t == D_;
    }
    uu.exports = M_;
  });
  var lu = f((h2, cu) => {
    var F_ = Fe(),
      q_ = F_["__core-js_shared__"];
    cu.exports = q_;
  });
  var pu = f((g2, du) => {
    var vi = lu(),
      fu = (function () {
        var e = /[^.]+$/.exec((vi && vi.keys && vi.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function G_(e) {
      return !!fu && fu in e;
    }
    du.exports = G_;
  });
  var mi = f((E2, hu) => {
    var X_ = Function.prototype,
      V_ = X_.toString;
    function B_(e) {
      if (e != null) {
        try {
          return V_.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    hu.exports = B_;
  });
  var Eu = f((y2, gu) => {
    var k_ = yi(),
      U_ = pu(),
      H_ = Ke(),
      W_ = mi(),
      z_ = /[\\^$.*+?()[\]{}|]/g,
      K_ = /^\[object .+?Constructor\]$/,
      j_ = Function.prototype,
      Y_ = Object.prototype,
      Q_ = j_.toString,
      $_ = Y_.hasOwnProperty,
      Z_ = RegExp(
        "^" +
          Q_.call($_)
            .replace(z_, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function J_(e) {
      if (!H_(e) || U_(e)) return !1;
      var t = k_(e) ? Z_ : K_;
      return t.test(W_(e));
    }
    gu.exports = J_;
  });
  var vu = f((v2, yu) => {
    function eI(e, t) {
      return e?.[t];
    }
    yu.exports = eI;
  });
  var ot = f((m2, mu) => {
    var tI = Eu(),
      nI = vu();
    function rI(e, t) {
      var n = nI(e, t);
      return tI(n) ? n : void 0;
    }
    mu.exports = rI;
  });
  var Hn = f((_2, _u) => {
    var iI = ot(),
      oI = Fe(),
      aI = iI(oI, "Map");
    _u.exports = aI;
  });
  var on = f((I2, Iu) => {
    var sI = ot(),
      uI = sI(Object, "create");
    Iu.exports = uI;
  });
  var Au = f((T2, bu) => {
    var Tu = on();
    function cI() {
      (this.__data__ = Tu ? Tu(null) : {}), (this.size = 0);
    }
    bu.exports = cI;
  });
  var Ou = f((b2, Su) => {
    function lI(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Su.exports = lI;
  });
  var xu = f((A2, wu) => {
    var fI = on(),
      dI = "__lodash_hash_undefined__",
      pI = Object.prototype,
      hI = pI.hasOwnProperty;
    function gI(e) {
      var t = this.__data__;
      if (fI) {
        var n = t[e];
        return n === dI ? void 0 : n;
      }
      return hI.call(t, e) ? t[e] : void 0;
    }
    wu.exports = gI;
  });
  var Cu = f((S2, Ru) => {
    var EI = on(),
      yI = Object.prototype,
      vI = yI.hasOwnProperty;
    function mI(e) {
      var t = this.__data__;
      return EI ? t[e] !== void 0 : vI.call(t, e);
    }
    Ru.exports = mI;
  });
  var Lu = f((O2, Pu) => {
    var _I = on(),
      II = "__lodash_hash_undefined__";
    function TI(e, t) {
      var n = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (n[e] = _I && t === void 0 ? II : t),
        this
      );
    }
    Pu.exports = TI;
  });
  var Du = f((w2, Nu) => {
    var bI = Au(),
      AI = Ou(),
      SI = xu(),
      OI = Cu(),
      wI = Lu();
    function Rt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Rt.prototype.clear = bI;
    Rt.prototype.delete = AI;
    Rt.prototype.get = SI;
    Rt.prototype.has = OI;
    Rt.prototype.set = wI;
    Nu.exports = Rt;
  });
  var qu = f((x2, Fu) => {
    var Mu = Du(),
      xI = rn(),
      RI = Hn();
    function CI() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Mu(),
          map: new (RI || xI)(),
          string: new Mu(),
        });
    }
    Fu.exports = CI;
  });
  var Xu = f((R2, Gu) => {
    function PI(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Gu.exports = PI;
  });
  var an = f((C2, Vu) => {
    var LI = Xu();
    function NI(e, t) {
      var n = e.__data__;
      return LI(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
    }
    Vu.exports = NI;
  });
  var ku = f((P2, Bu) => {
    var DI = an();
    function MI(e) {
      var t = DI(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Bu.exports = MI;
  });
  var Hu = f((L2, Uu) => {
    var FI = an();
    function qI(e) {
      return FI(this, e).get(e);
    }
    Uu.exports = qI;
  });
  var zu = f((N2, Wu) => {
    var GI = an();
    function XI(e) {
      return GI(this, e).has(e);
    }
    Wu.exports = XI;
  });
  var ju = f((D2, Ku) => {
    var VI = an();
    function BI(e, t) {
      var n = VI(this, e),
        r = n.size;
      return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
    }
    Ku.exports = BI;
  });
  var Wn = f((M2, Yu) => {
    var kI = qu(),
      UI = ku(),
      HI = Hu(),
      WI = zu(),
      zI = ju();
    function Ct(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Ct.prototype.clear = kI;
    Ct.prototype.delete = UI;
    Ct.prototype.get = HI;
    Ct.prototype.has = WI;
    Ct.prototype.set = zI;
    Yu.exports = Ct;
  });
  var $u = f((F2, Qu) => {
    var KI = rn(),
      jI = Hn(),
      YI = Wn(),
      QI = 200;
    function $I(e, t) {
      var n = this.__data__;
      if (n instanceof KI) {
        var r = n.__data__;
        if (!jI || r.length < QI - 1)
          return r.push([e, t]), (this.size = ++n.size), this;
        n = this.__data__ = new YI(r);
      }
      return n.set(e, t), (this.size = n.size), this;
    }
    Qu.exports = $I;
  });
  var _i = f((q2, Zu) => {
    var ZI = rn(),
      JI = eu(),
      eT = nu(),
      tT = iu(),
      nT = au(),
      rT = $u();
    function Pt(e) {
      var t = (this.__data__ = new ZI(e));
      this.size = t.size;
    }
    Pt.prototype.clear = JI;
    Pt.prototype.delete = eT;
    Pt.prototype.get = tT;
    Pt.prototype.has = nT;
    Pt.prototype.set = rT;
    Zu.exports = Pt;
  });
  var ec = f((G2, Ju) => {
    var iT = "__lodash_hash_undefined__";
    function oT(e) {
      return this.__data__.set(e, iT), this;
    }
    Ju.exports = oT;
  });
  var nc = f((X2, tc) => {
    function aT(e) {
      return this.__data__.has(e);
    }
    tc.exports = aT;
  });
  var ic = f((V2, rc) => {
    var sT = Wn(),
      uT = ec(),
      cT = nc();
    function zn(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.__data__ = new sT(); ++t < n; ) this.add(e[t]);
    }
    zn.prototype.add = zn.prototype.push = uT;
    zn.prototype.has = cT;
    rc.exports = zn;
  });
  var ac = f((B2, oc) => {
    function lT(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
        if (t(e[n], n, e)) return !0;
      return !1;
    }
    oc.exports = lT;
  });
  var uc = f((k2, sc) => {
    function fT(e, t) {
      return e.has(t);
    }
    sc.exports = fT;
  });
  var Ii = f((U2, cc) => {
    var dT = ic(),
      pT = ac(),
      hT = uc(),
      gT = 1,
      ET = 2;
    function yT(e, t, n, r, o, i) {
      var s = n & gT,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var l = i.get(e),
        g = i.get(t);
      if (l && g) return l == t && g == e;
      var p = -1,
        d = !0,
        y = n & ET ? new dT() : void 0;
      for (i.set(e, t), i.set(t, e); ++p < a; ) {
        var S = e[p],
          _ = t[p];
        if (r) var A = s ? r(_, S, p, t, e, i) : r(S, _, p, e, t, i);
        if (A !== void 0) {
          if (A) continue;
          d = !1;
          break;
        }
        if (y) {
          if (
            !pT(t, function (v, O) {
              if (!hT(y, O) && (S === v || o(S, v, n, r, i))) return y.push(O);
            })
          ) {
            d = !1;
            break;
          }
        } else if (!(S === _ || o(S, _, n, r, i))) {
          d = !1;
          break;
        }
      }
      return i.delete(e), i.delete(t), d;
    }
    cc.exports = yT;
  });
  var fc = f((H2, lc) => {
    var vT = Fe(),
      mT = vT.Uint8Array;
    lc.exports = mT;
  });
  var pc = f((W2, dc) => {
    function _T(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r, o) {
          n[++t] = [o, r];
        }),
        n
      );
    }
    dc.exports = _T;
  });
  var gc = f((z2, hc) => {
    function IT(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r) {
          n[++t] = r;
        }),
        n
      );
    }
    hc.exports = IT;
  });
  var _c = f((K2, mc) => {
    var Ec = At(),
      yc = fc(),
      TT = Un(),
      bT = Ii(),
      AT = pc(),
      ST = gc(),
      OT = 1,
      wT = 2,
      xT = "[object Boolean]",
      RT = "[object Date]",
      CT = "[object Error]",
      PT = "[object Map]",
      LT = "[object Number]",
      NT = "[object RegExp]",
      DT = "[object Set]",
      MT = "[object String]",
      FT = "[object Symbol]",
      qT = "[object ArrayBuffer]",
      GT = "[object DataView]",
      vc = Ec ? Ec.prototype : void 0,
      Ti = vc ? vc.valueOf : void 0;
    function XT(e, t, n, r, o, i, s) {
      switch (n) {
        case GT:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case qT:
          return !(e.byteLength != t.byteLength || !i(new yc(e), new yc(t)));
        case xT:
        case RT:
        case LT:
          return TT(+e, +t);
        case CT:
          return e.name == t.name && e.message == t.message;
        case NT:
        case MT:
          return e == t + "";
        case PT:
          var a = AT;
        case DT:
          var u = r & OT;
          if ((a || (a = ST), e.size != t.size && !u)) return !1;
          var l = s.get(e);
          if (l) return l == t;
          (r |= wT), s.set(e, t);
          var g = bT(a(e), a(t), r, o, i, s);
          return s.delete(e), g;
        case FT:
          if (Ti) return Ti.call(e) == Ti.call(t);
      }
      return !1;
    }
    mc.exports = XT;
  });
  var Kn = f((j2, Ic) => {
    function VT(e, t) {
      for (var n = -1, r = t.length, o = e.length; ++n < r; ) e[o + n] = t[n];
      return e;
    }
    Ic.exports = VT;
  });
  var ye = f((Y2, Tc) => {
    var BT = Array.isArray;
    Tc.exports = BT;
  });
  var bi = f((Q2, bc) => {
    var kT = Kn(),
      UT = ye();
    function HT(e, t, n) {
      var r = t(e);
      return UT(e) ? r : kT(r, n(e));
    }
    bc.exports = HT;
  });
  var Sc = f(($2, Ac) => {
    function WT(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, o = 0, i = []; ++n < r; ) {
        var s = e[n];
        t(s, n, e) && (i[o++] = s);
      }
      return i;
    }
    Ac.exports = WT;
  });
  var Ai = f((Z2, Oc) => {
    function zT() {
      return [];
    }
    Oc.exports = zT;
  });
  var Si = f((J2, xc) => {
    var KT = Sc(),
      jT = Ai(),
      YT = Object.prototype,
      QT = YT.propertyIsEnumerable,
      wc = Object.getOwnPropertySymbols,
      $T = wc
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                KT(wc(e), function (t) {
                  return QT.call(e, t);
                }));
          }
        : jT;
    xc.exports = $T;
  });
  var Cc = f((eq, Rc) => {
    function ZT(e, t) {
      for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
      return r;
    }
    Rc.exports = ZT;
  });
  var Lc = f((tq, Pc) => {
    var JT = it(),
      eb = $e(),
      tb = "[object Arguments]";
    function nb(e) {
      return eb(e) && JT(e) == tb;
    }
    Pc.exports = nb;
  });
  var sn = f((nq, Mc) => {
    var Nc = Lc(),
      rb = $e(),
      Dc = Object.prototype,
      ib = Dc.hasOwnProperty,
      ob = Dc.propertyIsEnumerable,
      ab = Nc(
        (function () {
          return arguments;
        })()
      )
        ? Nc
        : function (e) {
            return rb(e) && ib.call(e, "callee") && !ob.call(e, "callee");
          };
    Mc.exports = ab;
  });
  var qc = f((rq, Fc) => {
    function sb() {
      return !1;
    }
    Fc.exports = sb;
  });
  var jn = f((un, Lt) => {
    var ub = Fe(),
      cb = qc(),
      Vc = typeof un == "object" && un && !un.nodeType && un,
      Gc = Vc && typeof Lt == "object" && Lt && !Lt.nodeType && Lt,
      lb = Gc && Gc.exports === Vc,
      Xc = lb ? ub.Buffer : void 0,
      fb = Xc ? Xc.isBuffer : void 0,
      db = fb || cb;
    Lt.exports = db;
  });
  var Yn = f((iq, Bc) => {
    var pb = 9007199254740991,
      hb = /^(?:0|[1-9]\d*)$/;
    function gb(e, t) {
      var n = typeof e;
      return (
        (t = t ?? pb),
        !!t &&
          (n == "number" || (n != "symbol" && hb.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Bc.exports = gb;
  });
  var Qn = f((oq, kc) => {
    var Eb = 9007199254740991;
    function yb(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Eb;
    }
    kc.exports = yb;
  });
  var Hc = f((aq, Uc) => {
    var vb = it(),
      mb = Qn(),
      _b = $e(),
      Ib = "[object Arguments]",
      Tb = "[object Array]",
      bb = "[object Boolean]",
      Ab = "[object Date]",
      Sb = "[object Error]",
      Ob = "[object Function]",
      wb = "[object Map]",
      xb = "[object Number]",
      Rb = "[object Object]",
      Cb = "[object RegExp]",
      Pb = "[object Set]",
      Lb = "[object String]",
      Nb = "[object WeakMap]",
      Db = "[object ArrayBuffer]",
      Mb = "[object DataView]",
      Fb = "[object Float32Array]",
      qb = "[object Float64Array]",
      Gb = "[object Int8Array]",
      Xb = "[object Int16Array]",
      Vb = "[object Int32Array]",
      Bb = "[object Uint8Array]",
      kb = "[object Uint8ClampedArray]",
      Ub = "[object Uint16Array]",
      Hb = "[object Uint32Array]",
      oe = {};
    oe[Fb] =
      oe[qb] =
      oe[Gb] =
      oe[Xb] =
      oe[Vb] =
      oe[Bb] =
      oe[kb] =
      oe[Ub] =
      oe[Hb] =
        !0;
    oe[Ib] =
      oe[Tb] =
      oe[Db] =
      oe[bb] =
      oe[Mb] =
      oe[Ab] =
      oe[Sb] =
      oe[Ob] =
      oe[wb] =
      oe[xb] =
      oe[Rb] =
      oe[Cb] =
      oe[Pb] =
      oe[Lb] =
      oe[Nb] =
        !1;
    function Wb(e) {
      return _b(e) && mb(e.length) && !!oe[vb(e)];
    }
    Uc.exports = Wb;
  });
  var zc = f((sq, Wc) => {
    function zb(e) {
      return function (t) {
        return e(t);
      };
    }
    Wc.exports = zb;
  });
  var jc = f((cn, Nt) => {
    var Kb = $r(),
      Kc = typeof cn == "object" && cn && !cn.nodeType && cn,
      ln = Kc && typeof Nt == "object" && Nt && !Nt.nodeType && Nt,
      jb = ln && ln.exports === Kc,
      Oi = jb && Kb.process,
      Yb = (function () {
        try {
          var e = ln && ln.require && ln.require("util").types;
          return e || (Oi && Oi.binding && Oi.binding("util"));
        } catch {}
      })();
    Nt.exports = Yb;
  });
  var $n = f((uq, $c) => {
    var Qb = Hc(),
      $b = zc(),
      Yc = jc(),
      Qc = Yc && Yc.isTypedArray,
      Zb = Qc ? $b(Qc) : Qb;
    $c.exports = Zb;
  });
  var wi = f((cq, Zc) => {
    var Jb = Cc(),
      e0 = sn(),
      t0 = ye(),
      n0 = jn(),
      r0 = Yn(),
      i0 = $n(),
      o0 = Object.prototype,
      a0 = o0.hasOwnProperty;
    function s0(e, t) {
      var n = t0(e),
        r = !n && e0(e),
        o = !n && !r && n0(e),
        i = !n && !r && !o && i0(e),
        s = n || r || o || i,
        a = s ? Jb(e.length, String) : [],
        u = a.length;
      for (var l in e)
        (t || a0.call(e, l)) &&
          !(
            s &&
            (l == "length" ||
              (o && (l == "offset" || l == "parent")) ||
              (i &&
                (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
              r0(l, u))
          ) &&
          a.push(l);
      return a;
    }
    Zc.exports = s0;
  });
  var Zn = f((lq, Jc) => {
    var u0 = Object.prototype;
    function c0(e) {
      var t = e && e.constructor,
        n = (typeof t == "function" && t.prototype) || u0;
      return e === n;
    }
    Jc.exports = c0;
  });
  var tl = f((fq, el) => {
    var l0 = Zr(),
      f0 = l0(Object.keys, Object);
    el.exports = f0;
  });
  var Jn = f((dq, nl) => {
    var d0 = Zn(),
      p0 = tl(),
      h0 = Object.prototype,
      g0 = h0.hasOwnProperty;
    function E0(e) {
      if (!d0(e)) return p0(e);
      var t = [];
      for (var n in Object(e)) g0.call(e, n) && n != "constructor" && t.push(n);
      return t;
    }
    nl.exports = E0;
  });
  var ht = f((pq, rl) => {
    var y0 = yi(),
      v0 = Qn();
    function m0(e) {
      return e != null && v0(e.length) && !y0(e);
    }
    rl.exports = m0;
  });
  var fn = f((hq, il) => {
    var _0 = wi(),
      I0 = Jn(),
      T0 = ht();
    function b0(e) {
      return T0(e) ? _0(e) : I0(e);
    }
    il.exports = b0;
  });
  var al = f((gq, ol) => {
    var A0 = bi(),
      S0 = Si(),
      O0 = fn();
    function w0(e) {
      return A0(e, O0, S0);
    }
    ol.exports = w0;
  });
  var cl = f((Eq, ul) => {
    var sl = al(),
      x0 = 1,
      R0 = Object.prototype,
      C0 = R0.hasOwnProperty;
    function P0(e, t, n, r, o, i) {
      var s = n & x0,
        a = sl(e),
        u = a.length,
        l = sl(t),
        g = l.length;
      if (u != g && !s) return !1;
      for (var p = u; p--; ) {
        var d = a[p];
        if (!(s ? d in t : C0.call(t, d))) return !1;
      }
      var y = i.get(e),
        S = i.get(t);
      if (y && S) return y == t && S == e;
      var _ = !0;
      i.set(e, t), i.set(t, e);
      for (var A = s; ++p < u; ) {
        d = a[p];
        var v = e[d],
          O = t[d];
        if (r) var T = s ? r(O, v, d, t, e, i) : r(v, O, d, e, t, i);
        if (!(T === void 0 ? v === O || o(v, O, n, r, i) : T)) {
          _ = !1;
          break;
        }
        A || (A = d == "constructor");
      }
      if (_ && !A) {
        var x = e.constructor,
          P = t.constructor;
        x != P &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof x == "function" &&
            x instanceof x &&
            typeof P == "function" &&
            P instanceof P
          ) &&
          (_ = !1);
      }
      return i.delete(e), i.delete(t), _;
    }
    ul.exports = P0;
  });
  var fl = f((yq, ll) => {
    var L0 = ot(),
      N0 = Fe(),
      D0 = L0(N0, "DataView");
    ll.exports = D0;
  });
  var pl = f((vq, dl) => {
    var M0 = ot(),
      F0 = Fe(),
      q0 = M0(F0, "Promise");
    dl.exports = q0;
  });
  var gl = f((mq, hl) => {
    var G0 = ot(),
      X0 = Fe(),
      V0 = G0(X0, "Set");
    hl.exports = V0;
  });
  var xi = f((_q, El) => {
    var B0 = ot(),
      k0 = Fe(),
      U0 = B0(k0, "WeakMap");
    El.exports = U0;
  });
  var er = f((Iq, bl) => {
    var Ri = fl(),
      Ci = Hn(),
      Pi = pl(),
      Li = gl(),
      Ni = xi(),
      Tl = it(),
      Dt = mi(),
      yl = "[object Map]",
      H0 = "[object Object]",
      vl = "[object Promise]",
      ml = "[object Set]",
      _l = "[object WeakMap]",
      Il = "[object DataView]",
      W0 = Dt(Ri),
      z0 = Dt(Ci),
      K0 = Dt(Pi),
      j0 = Dt(Li),
      Y0 = Dt(Ni),
      gt = Tl;
    ((Ri && gt(new Ri(new ArrayBuffer(1))) != Il) ||
      (Ci && gt(new Ci()) != yl) ||
      (Pi && gt(Pi.resolve()) != vl) ||
      (Li && gt(new Li()) != ml) ||
      (Ni && gt(new Ni()) != _l)) &&
      (gt = function (e) {
        var t = Tl(e),
          n = t == H0 ? e.constructor : void 0,
          r = n ? Dt(n) : "";
        if (r)
          switch (r) {
            case W0:
              return Il;
            case z0:
              return yl;
            case K0:
              return vl;
            case j0:
              return ml;
            case Y0:
              return _l;
          }
        return t;
      });
    bl.exports = gt;
  });
  var Pl = f((Tq, Cl) => {
    var Di = _i(),
      Q0 = Ii(),
      $0 = _c(),
      Z0 = cl(),
      Al = er(),
      Sl = ye(),
      Ol = jn(),
      J0 = $n(),
      eA = 1,
      wl = "[object Arguments]",
      xl = "[object Array]",
      tr = "[object Object]",
      tA = Object.prototype,
      Rl = tA.hasOwnProperty;
    function nA(e, t, n, r, o, i) {
      var s = Sl(e),
        a = Sl(t),
        u = s ? xl : Al(e),
        l = a ? xl : Al(t);
      (u = u == wl ? tr : u), (l = l == wl ? tr : l);
      var g = u == tr,
        p = l == tr,
        d = u == l;
      if (d && Ol(e)) {
        if (!Ol(t)) return !1;
        (s = !0), (g = !1);
      }
      if (d && !g)
        return (
          i || (i = new Di()),
          s || J0(e) ? Q0(e, t, n, r, o, i) : $0(e, t, u, n, r, o, i)
        );
      if (!(n & eA)) {
        var y = g && Rl.call(e, "__wrapped__"),
          S = p && Rl.call(t, "__wrapped__");
        if (y || S) {
          var _ = y ? e.value() : e,
            A = S ? t.value() : t;
          return i || (i = new Di()), o(_, A, n, r, i);
        }
      }
      return d ? (i || (i = new Di()), Z0(e, t, n, r, o, i)) : !1;
    }
    Cl.exports = nA;
  });
  var Mi = f((bq, Dl) => {
    var rA = Pl(),
      Ll = $e();
    function Nl(e, t, n, r, o) {
      return e === t
        ? !0
        : e == null || t == null || (!Ll(e) && !Ll(t))
        ? e !== e && t !== t
        : rA(e, t, n, r, Nl, o);
    }
    Dl.exports = Nl;
  });
  var Fl = f((Aq, Ml) => {
    var iA = _i(),
      oA = Mi(),
      aA = 1,
      sA = 2;
    function uA(e, t, n, r) {
      var o = n.length,
        i = o,
        s = !r;
      if (e == null) return !i;
      for (e = Object(e); o--; ) {
        var a = n[o];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++o < i; ) {
        a = n[o];
        var u = a[0],
          l = e[u],
          g = a[1];
        if (s && a[2]) {
          if (l === void 0 && !(u in e)) return !1;
        } else {
          var p = new iA();
          if (r) var d = r(l, g, u, e, t, p);
          if (!(d === void 0 ? oA(g, l, aA | sA, r, p) : d)) return !1;
        }
      }
      return !0;
    }
    Ml.exports = uA;
  });
  var Fi = f((Sq, ql) => {
    var cA = Ke();
    function lA(e) {
      return e === e && !cA(e);
    }
    ql.exports = lA;
  });
  var Xl = f((Oq, Gl) => {
    var fA = Fi(),
      dA = fn();
    function pA(e) {
      for (var t = dA(e), n = t.length; n--; ) {
        var r = t[n],
          o = e[r];
        t[n] = [r, o, fA(o)];
      }
      return t;
    }
    Gl.exports = pA;
  });
  var qi = f((wq, Vl) => {
    function hA(e, t) {
      return function (n) {
        return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
      };
    }
    Vl.exports = hA;
  });
  var kl = f((xq, Bl) => {
    var gA = Fl(),
      EA = Xl(),
      yA = qi();
    function vA(e) {
      var t = EA(e);
      return t.length == 1 && t[0][2]
        ? yA(t[0][0], t[0][1])
        : function (n) {
            return n === e || gA(n, e, t);
          };
    }
    Bl.exports = vA;
  });
  var dn = f((Rq, Ul) => {
    var mA = it(),
      _A = $e(),
      IA = "[object Symbol]";
    function TA(e) {
      return typeof e == "symbol" || (_A(e) && mA(e) == IA);
    }
    Ul.exports = TA;
  });
  var nr = f((Cq, Hl) => {
    var bA = ye(),
      AA = dn(),
      SA = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      OA = /^\w*$/;
    function wA(e, t) {
      if (bA(e)) return !1;
      var n = typeof e;
      return n == "number" ||
        n == "symbol" ||
        n == "boolean" ||
        e == null ||
        AA(e)
        ? !0
        : OA.test(e) || !SA.test(e) || (t != null && e in Object(t));
    }
    Hl.exports = wA;
  });
  var Kl = f((Pq, zl) => {
    var Wl = Wn(),
      xA = "Expected a function";
    function Gi(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(xA);
      var n = function () {
        var r = arguments,
          o = t ? t.apply(this, r) : r[0],
          i = n.cache;
        if (i.has(o)) return i.get(o);
        var s = e.apply(this, r);
        return (n.cache = i.set(o, s) || i), s;
      };
      return (n.cache = new (Gi.Cache || Wl)()), n;
    }
    Gi.Cache = Wl;
    zl.exports = Gi;
  });
  var Yl = f((Lq, jl) => {
    var RA = Kl(),
      CA = 500;
    function PA(e) {
      var t = RA(e, function (r) {
          return n.size === CA && n.clear(), r;
        }),
        n = t.cache;
      return t;
    }
    jl.exports = PA;
  });
  var $l = f((Nq, Ql) => {
    var LA = Yl(),
      NA =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      DA = /\\(\\)?/g,
      MA = LA(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(NA, function (n, r, o, i) {
            t.push(o ? i.replace(DA, "$1") : r || n);
          }),
          t
        );
      });
    Ql.exports = MA;
  });
  var Xi = f((Dq, Zl) => {
    function FA(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
        o[n] = t(e[n], n, e);
      return o;
    }
    Zl.exports = FA;
  });
  var of = f((Mq, rf) => {
    var Jl = At(),
      qA = Xi(),
      GA = ye(),
      XA = dn(),
      VA = 1 / 0,
      ef = Jl ? Jl.prototype : void 0,
      tf = ef ? ef.toString : void 0;
    function nf(e) {
      if (typeof e == "string") return e;
      if (GA(e)) return qA(e, nf) + "";
      if (XA(e)) return tf ? tf.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -VA ? "-0" : t;
    }
    rf.exports = nf;
  });
  var sf = f((Fq, af) => {
    var BA = of();
    function kA(e) {
      return e == null ? "" : BA(e);
    }
    af.exports = kA;
  });
  var pn = f((qq, uf) => {
    var UA = ye(),
      HA = nr(),
      WA = $l(),
      zA = sf();
    function KA(e, t) {
      return UA(e) ? e : HA(e, t) ? [e] : WA(zA(e));
    }
    uf.exports = KA;
  });
  var Mt = f((Gq, cf) => {
    var jA = dn(),
      YA = 1 / 0;
    function QA(e) {
      if (typeof e == "string" || jA(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -YA ? "-0" : t;
    }
    cf.exports = QA;
  });
  var rr = f((Xq, lf) => {
    var $A = pn(),
      ZA = Mt();
    function JA(e, t) {
      t = $A(t, e);
      for (var n = 0, r = t.length; e != null && n < r; ) e = e[ZA(t[n++])];
      return n && n == r ? e : void 0;
    }
    lf.exports = JA;
  });
  var ir = f((Vq, ff) => {
    var eS = rr();
    function tS(e, t, n) {
      var r = e == null ? void 0 : eS(e, t);
      return r === void 0 ? n : r;
    }
    ff.exports = tS;
  });
  var pf = f((Bq, df) => {
    function nS(e, t) {
      return e != null && t in Object(e);
    }
    df.exports = nS;
  });
  var gf = f((kq, hf) => {
    var rS = pn(),
      iS = sn(),
      oS = ye(),
      aS = Yn(),
      sS = Qn(),
      uS = Mt();
    function cS(e, t, n) {
      t = rS(t, e);
      for (var r = -1, o = t.length, i = !1; ++r < o; ) {
        var s = uS(t[r]);
        if (!(i = e != null && n(e, s))) break;
        e = e[s];
      }
      return i || ++r != o
        ? i
        : ((o = e == null ? 0 : e.length),
          !!o && sS(o) && aS(s, o) && (oS(e) || iS(e)));
    }
    hf.exports = cS;
  });
  var yf = f((Uq, Ef) => {
    var lS = pf(),
      fS = gf();
    function dS(e, t) {
      return e != null && fS(e, t, lS);
    }
    Ef.exports = dS;
  });
  var mf = f((Hq, vf) => {
    var pS = Mi(),
      hS = ir(),
      gS = yf(),
      ES = nr(),
      yS = Fi(),
      vS = qi(),
      mS = Mt(),
      _S = 1,
      IS = 2;
    function TS(e, t) {
      return ES(e) && yS(t)
        ? vS(mS(e), t)
        : function (n) {
            var r = hS(n, e);
            return r === void 0 && r === t ? gS(n, e) : pS(t, r, _S | IS);
          };
    }
    vf.exports = TS;
  });
  var or = f((Wq, _f) => {
    function bS(e) {
      return e;
    }
    _f.exports = bS;
  });
  var Vi = f((zq, If) => {
    function AS(e) {
      return function (t) {
        return t?.[e];
      };
    }
    If.exports = AS;
  });
  var bf = f((Kq, Tf) => {
    var SS = rr();
    function OS(e) {
      return function (t) {
        return SS(t, e);
      };
    }
    Tf.exports = OS;
  });
  var Sf = f((jq, Af) => {
    var wS = Vi(),
      xS = bf(),
      RS = nr(),
      CS = Mt();
    function PS(e) {
      return RS(e) ? wS(CS(e)) : xS(e);
    }
    Af.exports = PS;
  });
  var at = f((Yq, Of) => {
    var LS = kl(),
      NS = mf(),
      DS = or(),
      MS = ye(),
      FS = Sf();
    function qS(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? DS
        : typeof e == "object"
        ? MS(e)
          ? NS(e[0], e[1])
          : LS(e)
        : FS(e);
    }
    Of.exports = qS;
  });
  var Bi = f((Qq, wf) => {
    var GS = at(),
      XS = ht(),
      VS = fn();
    function BS(e) {
      return function (t, n, r) {
        var o = Object(t);
        if (!XS(t)) {
          var i = GS(n, 3);
          (t = VS(t)),
            (n = function (a) {
              return i(o[a], a, o);
            });
        }
        var s = e(t, n, r);
        return s > -1 ? o[i ? t[s] : s] : void 0;
      };
    }
    wf.exports = BS;
  });
  var ki = f(($q, xf) => {
    function kS(e, t, n, r) {
      for (var o = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
        if (t(e[i], i, e)) return i;
      return -1;
    }
    xf.exports = kS;
  });
  var Cf = f((Zq, Rf) => {
    var US = /\s/;
    function HS(e) {
      for (var t = e.length; t-- && US.test(e.charAt(t)); );
      return t;
    }
    Rf.exports = HS;
  });
  var Lf = f((Jq, Pf) => {
    var WS = Cf(),
      zS = /^\s+/;
    function KS(e) {
      return e && e.slice(0, WS(e) + 1).replace(zS, "");
    }
    Pf.exports = KS;
  });
  var ar = f((e1, Mf) => {
    var jS = Lf(),
      Nf = Ke(),
      YS = dn(),
      Df = 0 / 0,
      QS = /^[-+]0x[0-9a-f]+$/i,
      $S = /^0b[01]+$/i,
      ZS = /^0o[0-7]+$/i,
      JS = parseInt;
    function eO(e) {
      if (typeof e == "number") return e;
      if (YS(e)) return Df;
      if (Nf(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Nf(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = jS(e);
      var n = $S.test(e);
      return n || ZS.test(e) ? JS(e.slice(2), n ? 2 : 8) : QS.test(e) ? Df : +e;
    }
    Mf.exports = eO;
  });
  var Gf = f((t1, qf) => {
    var tO = ar(),
      Ff = 1 / 0,
      nO = 17976931348623157e292;
    function rO(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = tO(e)), e === Ff || e === -Ff)) {
        var t = e < 0 ? -1 : 1;
        return t * nO;
      }
      return e === e ? e : 0;
    }
    qf.exports = rO;
  });
  var Ui = f((n1, Xf) => {
    var iO = Gf();
    function oO(e) {
      var t = iO(e),
        n = t % 1;
      return t === t ? (n ? t - n : t) : 0;
    }
    Xf.exports = oO;
  });
  var Bf = f((r1, Vf) => {
    var aO = ki(),
      sO = at(),
      uO = Ui(),
      cO = Math.max;
    function lO(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var o = n == null ? 0 : uO(n);
      return o < 0 && (o = cO(r + o, 0)), aO(e, sO(t, 3), o);
    }
    Vf.exports = lO;
  });
  var Hi = f((i1, kf) => {
    var fO = Bi(),
      dO = Bf(),
      pO = fO(dO);
    kf.exports = pO;
  });
  var Wf = {};
  Oe(Wf, {
    ELEMENT_MATCHES: () => hO,
    FLEX_PREFIXED: () => Wi,
    IS_BROWSER_ENV: () => Ge,
    TRANSFORM_PREFIXED: () => st,
    TRANSFORM_STYLE_PREFIXED: () => ur,
    withBrowser: () => sr,
  });
  var Hf,
    Ge,
    sr,
    hO,
    Wi,
    st,
    Uf,
    ur,
    cr = ue(() => {
      "use strict";
      (Hf = te(Hi())),
        (Ge = typeof window < "u"),
        (sr = (e, t) => (Ge ? e() : t)),
        (hO = sr(() =>
          (0, Hf.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Wi = sr(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            n = "";
          try {
            let { length: r } = t;
            for (let o = 0; o < r; o++) {
              let i = t[o];
              if (((e.style.display = i), e.style.display === i)) return i;
            }
            return n;
          } catch {
            return n;
          }
        }, "flex")),
        (st = sr(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              n = "Transform",
              { length: r } = t;
            for (let o = 0; o < r; o++) {
              let i = t[o] + n;
              if (e.style[i] !== void 0) return i;
            }
          }
          return "transform";
        }, "transform")),
        (Uf = st.split("transform")[0]),
        (ur = Uf ? Uf + "TransformStyle" : "transformStyle");
    });
  var zi = f((o1, Qf) => {
    var gO = 4,
      EO = 0.001,
      yO = 1e-7,
      vO = 10,
      hn = 11,
      lr = 1 / (hn - 1),
      mO = typeof Float32Array == "function";
    function zf(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function Kf(e, t) {
      return 3 * t - 6 * e;
    }
    function jf(e) {
      return 3 * e;
    }
    function fr(e, t, n) {
      return ((zf(t, n) * e + Kf(t, n)) * e + jf(t)) * e;
    }
    function Yf(e, t, n) {
      return 3 * zf(t, n) * e * e + 2 * Kf(t, n) * e + jf(t);
    }
    function _O(e, t, n, r, o) {
      var i,
        s,
        a = 0;
      do
        (s = t + (n - t) / 2), (i = fr(s, r, o) - e), i > 0 ? (n = s) : (t = s);
      while (Math.abs(i) > yO && ++a < vO);
      return s;
    }
    function IO(e, t, n, r) {
      for (var o = 0; o < gO; ++o) {
        var i = Yf(t, n, r);
        if (i === 0) return t;
        var s = fr(t, n, r) - e;
        t -= s / i;
      }
      return t;
    }
    Qf.exports = function (t, n, r, o) {
      if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var i = mO ? new Float32Array(hn) : new Array(hn);
      if (t !== n || r !== o)
        for (var s = 0; s < hn; ++s) i[s] = fr(s * lr, t, r);
      function a(u) {
        for (var l = 0, g = 1, p = hn - 1; g !== p && i[g] <= u; ++g) l += lr;
        --g;
        var d = (u - i[g]) / (i[g + 1] - i[g]),
          y = l + d * lr,
          S = Yf(y, t, r);
        return S >= EO ? IO(u, y, t, r) : S === 0 ? y : _O(u, l, l + lr, t, r);
      }
      return function (l) {
        return t === n && r === o
          ? l
          : l === 0
          ? 0
          : l === 1
          ? 1
          : fr(a(l), n, o);
      };
    };
  });
  var En = {};
  Oe(En, {
    bounce: () => rw,
    bouncePast: () => iw,
    ease: () => TO,
    easeIn: () => bO,
    easeInOut: () => SO,
    easeOut: () => AO,
    inBack: () => jO,
    inCirc: () => HO,
    inCubic: () => RO,
    inElastic: () => $O,
    inExpo: () => BO,
    inOutBack: () => QO,
    inOutCirc: () => zO,
    inOutCubic: () => PO,
    inOutElastic: () => JO,
    inOutExpo: () => UO,
    inOutQuad: () => xO,
    inOutQuart: () => DO,
    inOutQuint: () => qO,
    inOutSine: () => VO,
    inQuad: () => OO,
    inQuart: () => LO,
    inQuint: () => MO,
    inSine: () => GO,
    outBack: () => YO,
    outBounce: () => KO,
    outCirc: () => WO,
    outCubic: () => CO,
    outElastic: () => ZO,
    outExpo: () => kO,
    outQuad: () => wO,
    outQuart: () => NO,
    outQuint: () => FO,
    outSine: () => XO,
    swingFrom: () => tw,
    swingFromTo: () => ew,
    swingTo: () => nw,
  });
  function OO(e) {
    return Math.pow(e, 2);
  }
  function wO(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function xO(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function RO(e) {
    return Math.pow(e, 3);
  }
  function CO(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function PO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function LO(e) {
    return Math.pow(e, 4);
  }
  function NO(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function DO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function MO(e) {
    return Math.pow(e, 5);
  }
  function FO(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function qO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function GO(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function XO(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function VO(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function BO(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function kO(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function UO(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function HO(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function WO(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function zO(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function KO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function jO(e) {
    let t = Ze;
    return e * e * ((t + 1) * e - t);
  }
  function YO(e) {
    let t = Ze;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function QO(e) {
    let t = Ze;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function $O(e) {
    let t = Ze,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        -(
          r *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / n)
        ));
  }
  function ZO(e) {
    let t = Ze,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        r * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / n) + 1);
  }
  function JO(e) {
    let t = Ze,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (n || (n = 0.3 * 1.5),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        e < 1
          ? -0.5 *
            (r *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n))
          : r *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n) *
              0.5 +
            1);
  }
  function ew(e) {
    let t = Ze;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function tw(e) {
    let t = Ze;
    return e * e * ((t + 1) * e - t);
  }
  function nw(e) {
    let t = Ze;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function rw(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function iw(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var gn,
    Ze,
    TO,
    bO,
    AO,
    SO,
    Ki = ue(() => {
      "use strict";
      (gn = te(zi())),
        (Ze = 1.70158),
        (TO = (0, gn.default)(0.25, 0.1, 0.25, 1)),
        (bO = (0, gn.default)(0.42, 0, 1, 1)),
        (AO = (0, gn.default)(0, 0, 0.58, 1)),
        (SO = (0, gn.default)(0.42, 0, 0.58, 1));
    });
  var Zf = {};
  Oe(Zf, {
    applyEasing: () => aw,
    createBezierEasing: () => ow,
    optimizeFloat: () => yn,
  });
  function yn(e, t = 5, n = 10) {
    let r = Math.pow(n, t),
      o = Number(Math.round(e * r) / r);
    return Math.abs(o) > 1e-4 ? o : 0;
  }
  function ow(e) {
    return (0, $f.default)(...e);
  }
  function aw(e, t, n) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : yn(n ? (t > 0 ? n(t) : t) : t > 0 && e && En[e] ? En[e](t) : t);
  }
  var $f,
    ji = ue(() => {
      "use strict";
      Ki();
      $f = te(zi());
    });
  var td = {};
  Oe(td, {
    createElementState: () => ed,
    ixElements: () => _w,
    mergeActionState: () => Yi,
  });
  function ed(e, t, n, r, o) {
    let i =
      n === sw ? (0, Ft.getIn)(o, ["config", "target", "objectId"]) : null;
    return (0, Ft.mergeIn)(e, [r], { id: r, ref: t, refId: i, refType: n });
  }
  function Yi(e, t, n, r, o) {
    let i = Tw(o);
    return (0, Ft.mergeIn)(e, [t, mw, n], r, i);
  }
  function Tw(e) {
    let { config: t } = e;
    return Iw.reduce((n, r) => {
      let o = r[0],
        i = r[1],
        s = t[o],
        a = t[i];
      return s != null && a != null && (n[i] = a), n;
    }, {});
  }
  var Ft,
    s1,
    sw,
    u1,
    uw,
    cw,
    lw,
    fw,
    dw,
    pw,
    hw,
    gw,
    Ew,
    yw,
    vw,
    Jf,
    mw,
    _w,
    Iw,
    nd = ue(() => {
      "use strict";
      Ft = te(wt());
      xe();
      ({
        HTML_ELEMENT: s1,
        PLAIN_OBJECT: sw,
        ABSTRACT_NODE: u1,
        CONFIG_X_VALUE: uw,
        CONFIG_Y_VALUE: cw,
        CONFIG_Z_VALUE: lw,
        CONFIG_VALUE: fw,
        CONFIG_X_UNIT: dw,
        CONFIG_Y_UNIT: pw,
        CONFIG_Z_UNIT: hw,
        CONFIG_UNIT: gw,
      } = _e),
        ({
          IX2_SESSION_STOPPED: Ew,
          IX2_INSTANCE_ADDED: yw,
          IX2_ELEMENT_STATE_CHANGED: vw,
        } = he),
        (Jf = {}),
        (mw = "refState"),
        (_w = (e = Jf, t = {}) => {
          switch (t.type) {
            case Ew:
              return Jf;
            case yw: {
              let {
                  elementId: n,
                  element: r,
                  origin: o,
                  actionItem: i,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = i,
                u = e;
              return (
                (0, Ft.getIn)(u, [n, r]) !== r && (u = ed(u, r, s, n, i)),
                Yi(u, n, a, o, i)
              );
            }
            case vw: {
              let {
                elementId: n,
                actionTypeId: r,
                current: o,
                actionItem: i,
              } = t.payload;
              return Yi(e, n, r, o, i);
            }
            default:
              return e;
          }
        });
      Iw = [
        [uw, dw],
        [cw, pw],
        [lw, hw],
        [fw, gw],
      ];
    });
  var rd = f((Qi) => {
    "use strict";
    Object.defineProperty(Qi, "__esModule", { value: !0 });
    function bw(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    bw(Qi, {
      clearPlugin: function () {
        return Cw;
      },
      createPluginInstance: function () {
        return xw;
      },
      getPluginConfig: function () {
        return Aw;
      },
      getPluginDestination: function () {
        return ww;
      },
      getPluginDuration: function () {
        return Sw;
      },
      getPluginOrigin: function () {
        return Ow;
      },
      renderPlugin: function () {
        return Rw;
      },
    });
    var Aw = (e) => e.value,
      Sw = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let n = parseFloat(e.getAttribute("data-duration"));
        return n > 0
          ? n * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      },
      Ow = (e) => e || { value: 0 },
      ww = (e) => ({ value: e.value }),
      xw = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return t.stop(), t.setSubframe(!0), t;
      },
      Rw = (e, t, n) => {
        if (!e) return;
        let r = t[n.actionTypeId].value / 100;
        e.goToFrame(e.frames * r);
      },
      Cw = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
  });
  var od = f(($i) => {
    "use strict";
    Object.defineProperty($i, "__esModule", { value: !0 });
    function Pw(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    Pw($i, {
      clearPlugin: function () {
        return Bw;
      },
      createPluginInstance: function () {
        return Xw;
      },
      getPluginConfig: function () {
        return Mw;
      },
      getPluginDestination: function () {
        return Gw;
      },
      getPluginDuration: function () {
        return Fw;
      },
      getPluginOrigin: function () {
        return qw;
      },
      renderPlugin: function () {
        return Vw;
      },
    });
    var Lw = (e) => document.querySelector(`[data-w-id="${e}"]`),
      Nw = () => window.Webflow.require("spline"),
      Dw = (e, t) => e.filter((n) => !t.includes(n)),
      Mw = (e, t) => e.value[t],
      Fw = () => null,
      id = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      qw = (e, t) => {
        let n = t.config.value,
          r = Object.keys(n);
        if (e) {
          let i = Object.keys(e),
            s = Dw(r, i);
          return s.length ? s.reduce((u, l) => ((u[l] = id[l]), u), e) : e;
        }
        return r.reduce((i, s) => ((i[s] = id[s]), i), {});
      },
      Gw = (e) => e.value,
      Xw = (e, t) => {
        let n = t?.config?.target?.pluginElement;
        return n ? Lw(n) : null;
      },
      Vw = (e, t, n) => {
        let r = Nw(),
          o = r.getInstance(e),
          i = n.config.target.objectId,
          s = (a) => {
            if (!a)
              throw new Error("Invalid spline app passed to renderSpline");
            let u = i && a.findObjectById(i);
            if (!u) return;
            let { PLUGIN_SPLINE: l } = t;
            l.positionX != null && (u.position.x = l.positionX),
              l.positionY != null && (u.position.y = l.positionY),
              l.positionZ != null && (u.position.z = l.positionZ),
              l.rotationX != null && (u.rotation.x = l.rotationX),
              l.rotationY != null && (u.rotation.y = l.rotationY),
              l.rotationZ != null && (u.rotation.z = l.rotationZ),
              l.scaleX != null && (u.scale.x = l.scaleX),
              l.scaleY != null && (u.scale.y = l.scaleY),
              l.scaleZ != null && (u.scale.z = l.scaleZ);
          };
        o ? s(o.spline) : r.setLoadHandler(e, s);
      },
      Bw = () => null;
  });
  var Ji = f((Zi) => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Object.defineProperty(Zi, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return kw;
      },
    });
    var ad = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function kw(e) {
      let t,
        n,
        r,
        o = 1,
        i = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof ad[i] == "string" ? ad[i].toLowerCase() : null) || i;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3 || u.length === 4
          ? ((t = parseInt(u[0] + u[0], 16)),
            (n = parseInt(u[1] + u[1], 16)),
            (r = parseInt(u[2] + u[2], 16)),
            u.length === 4 && (o = parseInt(u[3] + u[3], 16) / 255))
          : (u.length === 6 || u.length === 8) &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (n = parseInt(u.substring(2, 4), 16)),
            (r = parseInt(u.substring(4, 6), 16)),
            u.length === 8 && (o = parseInt(u.substring(6, 8), 16) / 255));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10)),
          (o = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          g = parseFloat(u[1].replace("%", "")) / 100,
          p = parseFloat(u[2].replace("%", "")) / 100;
        o = parseFloat(u[3]);
        let d = (1 - Math.abs(2 * p - 1)) * g,
          y = d * (1 - Math.abs(((l / 60) % 2) - 1)),
          S = p - d / 2,
          _,
          A,
          v;
        l >= 0 && l < 60
          ? ((_ = d), (A = y), (v = 0))
          : l >= 60 && l < 120
          ? ((_ = y), (A = d), (v = 0))
          : l >= 120 && l < 180
          ? ((_ = 0), (A = d), (v = y))
          : l >= 180 && l < 240
          ? ((_ = 0), (A = y), (v = d))
          : l >= 240 && l < 300
          ? ((_ = y), (A = 0), (v = d))
          : ((_ = d), (A = 0), (v = y)),
          (t = Math.round((_ + S) * 255)),
          (n = Math.round((A + S) * 255)),
          (r = Math.round((v + S) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          g = parseFloat(u[1].replace("%", "")) / 100,
          p = parseFloat(u[2].replace("%", "")) / 100,
          d = (1 - Math.abs(2 * p - 1)) * g,
          y = d * (1 - Math.abs(((l / 60) % 2) - 1)),
          S = p - d / 2,
          _,
          A,
          v;
        l >= 0 && l < 60
          ? ((_ = d), (A = y), (v = 0))
          : l >= 60 && l < 120
          ? ((_ = y), (A = d), (v = 0))
          : l >= 120 && l < 180
          ? ((_ = 0), (A = d), (v = y))
          : l >= 180 && l < 240
          ? ((_ = 0), (A = y), (v = d))
          : l >= 240 && l < 300
          ? ((_ = y), (A = 0), (v = d))
          : ((_ = d), (A = 0), (v = y)),
          (t = Math.round((_ + S) * 255)),
          (n = Math.round((A + S) * 255)),
          (r = Math.round((v + S) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: n, blue: r, alpha: o };
    }
  });
  var sd = f((eo) => {
    "use strict";
    Object.defineProperty(eo, "__esModule", { value: !0 });
    function Uw(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    Uw(eo, {
      clearPlugin: function () {
        return $w;
      },
      createPluginInstance: function () {
        return Yw;
      },
      getPluginConfig: function () {
        return Ww;
      },
      getPluginDestination: function () {
        return jw;
      },
      getPluginDuration: function () {
        return zw;
      },
      getPluginOrigin: function () {
        return Kw;
      },
      renderPlugin: function () {
        return Qw;
      },
    });
    var Hw = Ji(),
      Ww = (e, t) => e.value[t],
      zw = () => null,
      Kw = (e, t) => {
        if (e) return e;
        let n = t.config.value,
          r = t.config.target.objectId,
          o = getComputedStyle(document.documentElement).getPropertyValue(r);
        if (n.size != null) return { size: parseInt(o, 10) };
        if (n.red != null && n.green != null && n.blue != null)
          return (0, Hw.normalizeColor)(o);
      },
      jw = (e) => e.value,
      Yw = () => null,
      Qw = (e, t, n) => {
        let r = n.config.target.objectId,
          o = n.config.value.unit,
          { PLUGIN_VARIABLE: i } = t,
          { size: s, red: a, green: u, blue: l, alpha: g } = i,
          p;
        s != null && (p = s + o),
          a != null &&
            l != null &&
            u != null &&
            g != null &&
            (p = `rgba(${a}, ${u}, ${l}, ${g})`),
          p != null && document.documentElement.style.setProperty(r, p);
      },
      $w = (e, t) => {
        let n = t.config.target.objectId;
        document.documentElement.style.removeProperty(n);
      };
  });
  var cd = f((ro) => {
    "use strict";
    Object.defineProperty(ro, "__esModule", { value: !0 });
    Object.defineProperty(ro, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return tx;
      },
    });
    var to = (xe(), ke(ps)),
      Zw = no(rd()),
      Jw = no(od()),
      ex = no(sd());
    function ud(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (ud = function (r) {
        return r ? n : t;
      })(e);
    }
    function no(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = ud(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
          var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, i, s)
            : (r[i] = e[i]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var tx = new Map([
      [to.ActionTypeConsts.PLUGIN_LOTTIE, { ...Zw }],
      [to.ActionTypeConsts.PLUGIN_SPLINE, { ...Jw }],
      [to.ActionTypeConsts.PLUGIN_VARIABLE, { ...ex }],
    ]);
  });
  var ld = {};
  Oe(ld, {
    clearPlugin: () => co,
    createPluginInstance: () => rx,
    getPluginConfig: () => oo,
    getPluginDestination: () => so,
    getPluginDuration: () => nx,
    getPluginOrigin: () => ao,
    isPluginType: () => Et,
    renderPlugin: () => uo,
  });
  function Et(e) {
    return io.pluginMethodMap.has(e);
  }
  var io,
    yt,
    oo,
    ao,
    nx,
    so,
    rx,
    uo,
    co,
    lo = ue(() => {
      "use strict";
      cr();
      io = te(cd());
      (yt = (e) => (t) => {
        if (!Ge) return () => null;
        let n = io.pluginMethodMap.get(t);
        if (!n) throw new Error(`IX2 no plugin configured for: ${t}`);
        let r = n[e];
        if (!r) throw new Error(`IX2 invalid plugin method: ${e}`);
        return r;
      }),
        (oo = yt("getPluginConfig")),
        (ao = yt("getPluginOrigin")),
        (nx = yt("getPluginDuration")),
        (so = yt("getPluginDestination")),
        (rx = yt("createPluginInstance")),
        (uo = yt("renderPlugin")),
        (co = yt("clearPlugin"));
    });
  var dd = f((g1, fd) => {
    function ix(e, t) {
      return e == null || e !== e ? t : e;
    }
    fd.exports = ix;
  });
  var hd = f((E1, pd) => {
    function ox(e, t, n, r) {
      var o = -1,
        i = e == null ? 0 : e.length;
      for (r && i && (n = e[++o]); ++o < i; ) n = t(n, e[o], o, e);
      return n;
    }
    pd.exports = ox;
  });
  var Ed = f((y1, gd) => {
    function ax(e) {
      return function (t, n, r) {
        for (var o = -1, i = Object(t), s = r(t), a = s.length; a--; ) {
          var u = s[e ? a : ++o];
          if (n(i[u], u, i) === !1) break;
        }
        return t;
      };
    }
    gd.exports = ax;
  });
  var vd = f((v1, yd) => {
    var sx = Ed(),
      ux = sx();
    yd.exports = ux;
  });
  var fo = f((m1, md) => {
    var cx = vd(),
      lx = fn();
    function fx(e, t) {
      return e && cx(e, t, lx);
    }
    md.exports = fx;
  });
  var Id = f((_1, _d) => {
    var dx = ht();
    function px(e, t) {
      return function (n, r) {
        if (n == null) return n;
        if (!dx(n)) return e(n, r);
        for (
          var o = n.length, i = t ? o : -1, s = Object(n);
          (t ? i-- : ++i < o) && r(s[i], i, s) !== !1;

        );
        return n;
      };
    }
    _d.exports = px;
  });
  var po = f((I1, Td) => {
    var hx = fo(),
      gx = Id(),
      Ex = gx(hx);
    Td.exports = Ex;
  });
  var Ad = f((T1, bd) => {
    function yx(e, t, n, r, o) {
      return (
        o(e, function (i, s, a) {
          n = r ? ((r = !1), i) : t(n, i, s, a);
        }),
        n
      );
    }
    bd.exports = yx;
  });
  var Od = f((b1, Sd) => {
    var vx = hd(),
      mx = po(),
      _x = at(),
      Ix = Ad(),
      Tx = ye();
    function bx(e, t, n) {
      var r = Tx(e) ? vx : Ix,
        o = arguments.length < 3;
      return r(e, _x(t, 4), n, o, mx);
    }
    Sd.exports = bx;
  });
  var xd = f((A1, wd) => {
    var Ax = ki(),
      Sx = at(),
      Ox = Ui(),
      wx = Math.max,
      xx = Math.min;
    function Rx(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var o = r - 1;
      return (
        n !== void 0 &&
          ((o = Ox(n)), (o = n < 0 ? wx(r + o, 0) : xx(o, r - 1))),
        Ax(e, Sx(t, 3), o, !0)
      );
    }
    wd.exports = Rx;
  });
  var Cd = f((S1, Rd) => {
    var Cx = Bi(),
      Px = xd(),
      Lx = Cx(Px);
    Rd.exports = Lx;
  });
  function Pd(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function Nx(e, t) {
    if (Pd(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (let o = 0; o < n.length; o++)
      if (!Object.hasOwn(t, n[o]) || !Pd(e[n[o]], t[n[o]])) return !1;
    return !0;
  }
  var ho,
    Ld = ue(() => {
      "use strict";
      ho = Nx;
    });
  var Qd = {};
  Oe(Qd, {
    cleanupHTMLElement: () => CR,
    clearAllStyles: () => RR,
    clearObjectCache: () => Qx,
    getActionListProgress: () => LR,
    getAffectedElements: () => mo,
    getComputedStyle: () => iR,
    getDestinationValues: () => fR,
    getElementId: () => eR,
    getInstanceId: () => Zx,
    getInstanceOrigin: () => sR,
    getItemConfigByKey: () => lR,
    getMaxDurationItemIndex: () => Yd,
    getNamespacedParameterId: () => MR,
    getRenderType: () => zd,
    getStyleProp: () => dR,
    mediaQueriesEqual: () => qR,
    observeStore: () => rR,
    reduceListToGroup: () => NR,
    reifyState: () => tR,
    renderHTMLElement: () => pR,
    shallowEqual: () => ho,
    shouldAllowMediaQuery: () => FR,
    shouldNamespaceEventParameter: () => DR,
    stringifyTarget: () => GR,
  });
  function Qx() {
    dr.clear();
  }
  function Zx() {
    return "i" + $x++;
  }
  function eR(e, t) {
    for (let n in e) {
      let r = e[n];
      if (r && r.ref === t) return r.id;
    }
    return "e" + Jx++;
  }
  function tR({ events: e, actionLists: t, site: n } = {}) {
    let r = (0, Er.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      o = n && n.mediaQueries,
      i = [];
    return (
      o
        ? (i = o.map((s) => s.key))
        : ((o = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: r,
          mediaQueries: o,
          mediaQueryKeys: i,
        },
      }
    );
  }
  function rR({ store: e, select: t, onChange: n, comparator: r = nR }) {
    let { getState: o, subscribe: i } = e,
      s = i(u),
      a = t(o());
    function u() {
      let l = t(o());
      if (l == null) {
        s();
        return;
      }
      r(l, a) || ((a = l), n(a, e));
    }
    return s;
  }
  function Md(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: n,
        objectId: r,
        selector: o,
        selectorGuids: i,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: n,
        objectId: r,
        selector: o,
        selectorGuids: i,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function mo({
    config: e,
    event: t,
    eventTarget: n,
    elementRoot: r,
    elementApi: o,
  }) {
    if (!o) throw new Error("IX2 missing elementApi");
    let { targets: i } = e;
    if (Array.isArray(i) && i.length > 0)
      return i.reduce(
        (N, I) =>
          N.concat(
            mo({
              config: { target: I },
              event: t,
              eventTarget: n,
              elementRoot: r,
              elementApi: o,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: l,
        getSiblingElements: g,
        matchSelector: p,
        elementContains: d,
        isSiblingNode: y,
      } = o,
      { target: S } = e;
    if (!S) return [];
    let {
      id: _,
      objectId: A,
      selector: v,
      selectorGuids: O,
      appliesTo: T,
      useEventTarget: x,
    } = Md(S);
    if (A) return [dr.has(A) ? dr.get(A) : dr.set(A, {}).get(A)];
    if (T === pi.PAGE) {
      let N = s(_);
      return N ? [N] : [];
    }
    let R = (t?.action?.config?.affectedElements ?? {})[_ || v] || {},
      G = !!(R.id || R.selector),
      X,
      B,
      H,
      j = t && a(Md(t.target));
    if (
      (G
        ? ((X = R.limitAffectedElements), (B = j), (H = a(R)))
        : (B = H = a({ id: _, selector: v, selectorGuids: O })),
      t && x)
    ) {
      let N = n && (H || x === !0) ? [n] : u(j);
      if (H) {
        if (x === Kx) return u(H).filter((I) => N.some((L) => d(I, L)));
        if (x === Nd) return u(H).filter((I) => N.some((L) => d(L, I)));
        if (x === Dd) return u(H).filter((I) => N.some((L) => y(L, I)));
      }
      return N;
    }
    return B == null || H == null
      ? []
      : Ge && r
      ? u(H).filter((N) => r.contains(N))
      : X === Nd
      ? u(B, H)
      : X === zx
      ? l(u(B)).filter(p(H))
      : X === Dd
      ? g(u(B)).filter(p(H))
      : u(H);
  }
  function iR({ element: e, actionItem: t }) {
    if (!Ge) return {};
    let { actionTypeId: n } = t;
    switch (n) {
      case Bt:
      case kt:
      case Ut:
      case Ht:
      case vr:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function sR(e, t = {}, n = {}, r, o) {
    let { getStyle: i } = o,
      { actionTypeId: s } = r;
    if (Et(s)) return ao(s)(t[s], r);
    switch (r.actionTypeId) {
      case Gt:
      case Xt:
      case Vt:
      case In:
        return t[r.actionTypeId] || _o[r.actionTypeId];
      case Tn:
        return oR(t[r.actionTypeId], r.config.filters);
      case bn:
        return aR(t[r.actionTypeId], r.config.fontVariations);
      case Ud:
        return { value: (0, Je.default)(parseFloat(i(e, hr)), 1) };
      case Bt: {
        let a = i(e, je),
          u = i(e, Ye),
          l,
          g;
        return (
          r.config.widthUnit === ut
            ? (l = Fd.test(a) ? parseFloat(a) : parseFloat(n.width))
            : (l = (0, Je.default)(parseFloat(a), parseFloat(n.width))),
          r.config.heightUnit === ut
            ? (g = Fd.test(u) ? parseFloat(u) : parseFloat(n.height))
            : (g = (0, Je.default)(parseFloat(u), parseFloat(n.height))),
          { widthValue: l, heightValue: g }
        );
      }
      case kt:
      case Ut:
      case Ht:
        return OR({
          element: e,
          actionTypeId: r.actionTypeId,
          computedStyle: n,
          getStyle: i,
        });
      case vr:
        return { value: (0, Je.default)(i(e, gr), n.display) };
      case Yx:
        return t[r.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function fR({ element: e, actionItem: t, elementApi: n }) {
    if (Et(t.actionTypeId)) return so(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case Gt:
      case Xt:
      case Vt:
      case In: {
        let { xValue: r, yValue: o, zValue: i } = t.config;
        return { xValue: r, yValue: o, zValue: i };
      }
      case Bt: {
        let { getStyle: r, setStyle: o, getProperty: i } = n,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: l } = t.config;
        if (!Ge) return { widthValue: u, heightValue: l };
        if (s === ut) {
          let g = r(e, je);
          o(e, je, ""), (u = i(e, "offsetWidth")), o(e, je, g);
        }
        if (a === ut) {
          let g = r(e, Ye);
          o(e, Ye, ""), (l = i(e, "offsetHeight")), o(e, Ye, g);
        }
        return { widthValue: u, heightValue: l };
      }
      case kt:
      case Ut:
      case Ht: {
        let {
          rValue: r,
          gValue: o,
          bValue: i,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = n,
            l = u(e, a),
            g = (0, Xd.normalizeColor)(l);
          return {
            rValue: g.red,
            gValue: g.green,
            bValue: g.blue,
            aValue: g.alpha,
          };
        }
        return { rValue: r, gValue: o, bValue: i, aValue: s };
      }
      case Tn:
        return t.config.filters.reduce(uR, {});
      case bn:
        return t.config.fontVariations.reduce(cR, {});
      default: {
        let { value: r } = t.config;
        return { value: r };
      }
    }
  }
  function zd(e) {
    if (/^TRANSFORM_/.test(e)) return Bd;
    if (/^STYLE_/.test(e)) return yo;
    if (/^GENERAL_/.test(e)) return Eo;
    if (/^PLUGIN_/.test(e)) return kd;
  }
  function dR(e, t) {
    return e === yo ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function pR(e, t, n, r, o, i, s, a, u) {
    switch (a) {
      case Bd:
        return vR(e, t, n, o, s);
      case yo:
        return wR(e, t, n, o, i, s);
      case Eo:
        return xR(e, o, s);
      case kd: {
        let { actionTypeId: l } = o;
        if (Et(l)) return uo(l)(u, t, o);
      }
    }
  }
  function vR(e, t, n, r, o) {
    let i = yR
        .map((a) => {
          let u = _o[a],
            {
              xValue: l = u.xValue,
              yValue: g = u.yValue,
              zValue: p = u.zValue,
              xUnit: d = "",
              yUnit: y = "",
              zUnit: S = "",
            } = t[a] || {};
          switch (a) {
            case Gt:
              return `${Fx}(${l}${d}, ${g}${y}, ${p}${S})`;
            case Xt:
              return `${qx}(${l}${d}, ${g}${y}, ${p}${S})`;
            case Vt:
              return `${Gx}(${l}${d}) ${Xx}(${g}${y}) ${Vx}(${p}${S})`;
            case In:
              return `${Bx}(${l}${d}, ${g}${y})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: s } = o;
    vt(e, st, o), s(e, st, i), IR(r, n) && s(e, ur, kx);
  }
  function mR(e, t, n, r) {
    let o = (0, Er.default)(t, (s, a, u) => `${s} ${u}(${a}${ER(u, n)})`, ""),
      { setStyle: i } = r;
    vt(e, vn, r), i(e, vn, o);
  }
  function _R(e, t, n, r) {
    let o = (0, Er.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: i } = r;
    vt(e, mn, r), i(e, mn, o);
  }
  function IR({ actionTypeId: e }, { xValue: t, yValue: n, zValue: r }) {
    return (
      (e === Gt && r !== void 0) ||
      (e === Xt && r !== void 0) ||
      (e === Vt && (t !== void 0 || n !== void 0))
    );
  }
  function SR(e, t) {
    let n = e.exec(t);
    return n ? n[1] : "";
  }
  function OR({ element: e, actionTypeId: t, computedStyle: n, getStyle: r }) {
    let o = vo[t],
      i = r(e, o),
      s = bR.test(i) ? i : n[o],
      a = SR(AR, s).split(_n);
    return {
      rValue: (0, Je.default)(parseInt(a[0], 10), 255),
      gValue: (0, Je.default)(parseInt(a[1], 10), 255),
      bValue: (0, Je.default)(parseInt(a[2], 10), 255),
      aValue: (0, Je.default)(parseFloat(a[3]), 1),
    };
  }
  function wR(e, t, n, r, o, i) {
    let { setStyle: s } = i;
    switch (r.actionTypeId) {
      case Bt: {
        let { widthUnit: a = "", heightUnit: u = "" } = r.config,
          { widthValue: l, heightValue: g } = n;
        l !== void 0 && (a === ut && (a = "px"), vt(e, je, i), s(e, je, l + a)),
          g !== void 0 &&
            (u === ut && (u = "px"), vt(e, Ye, i), s(e, Ye, g + u));
        break;
      }
      case Tn: {
        mR(e, n, r.config, i);
        break;
      }
      case bn: {
        _R(e, n, r.config, i);
        break;
      }
      case kt:
      case Ut:
      case Ht: {
        let a = vo[r.actionTypeId],
          u = Math.round(n.rValue),
          l = Math.round(n.gValue),
          g = Math.round(n.bValue),
          p = n.aValue;
        vt(e, a, i),
          s(e, a, p >= 1 ? `rgb(${u},${l},${g})` : `rgba(${u},${l},${g},${p})`);
        break;
      }
      default: {
        let { unit: a = "" } = r.config;
        vt(e, o, i), s(e, o, n.value + a);
        break;
      }
    }
  }
  function xR(e, t, n) {
    let { setStyle: r } = n;
    switch (t.actionTypeId) {
      case vr: {
        let { value: o } = t.config;
        o === Ux && Ge ? r(e, gr, Wi) : r(e, gr, o);
        return;
      }
    }
  }
  function vt(e, t, n) {
    if (!Ge) return;
    let r = Wd[t];
    if (!r) return;
    let { getStyle: o, setStyle: i } = n,
      s = o(e, qt);
    if (!s) {
      i(e, qt, r);
      return;
    }
    let a = s.split(_n).map(Hd);
    a.indexOf(r) === -1 && i(e, qt, a.concat(r).join(_n));
  }
  function Kd(e, t, n) {
    if (!Ge) return;
    let r = Wd[t];
    if (!r) return;
    let { getStyle: o, setStyle: i } = n,
      s = o(e, qt);
    !s ||
      s.indexOf(r) === -1 ||
      i(
        e,
        qt,
        s
          .split(_n)
          .map(Hd)
          .filter((a) => a !== r)
          .join(_n)
      );
  }
  function RR({ store: e, elementApi: t }) {
    let { ixData: n } = e.getState(),
      { events: r = {}, actionLists: o = {} } = n;
    Object.keys(r).forEach((i) => {
      let s = r[i],
        { config: a } = s.action,
        { actionListId: u } = a,
        l = o[u];
      l && qd({ actionList: l, event: s, elementApi: t });
    }),
      Object.keys(o).forEach((i) => {
        qd({ actionList: o[i], elementApi: t });
      });
  }
  function qd({ actionList: e = {}, event: t, elementApi: n }) {
    let { actionItemGroups: r, continuousParameterGroups: o } = e;
    r &&
      r.forEach((i) => {
        Gd({ actionGroup: i, event: t, elementApi: n });
      }),
      o &&
        o.forEach((i) => {
          let { continuousActionGroups: s } = i;
          s.forEach((a) => {
            Gd({ actionGroup: a, event: t, elementApi: n });
          });
        });
  }
  function Gd({ actionGroup: e, event: t, elementApi: n }) {
    let { actionItems: r } = e;
    r.forEach((o) => {
      let { actionTypeId: i, config: s } = o,
        a;
      Et(i)
        ? (a = (u) => co(i)(u, o))
        : (a = jd({ effect: PR, actionTypeId: i, elementApi: n })),
        mo({ config: s, event: t, elementApi: n }).forEach(a);
    });
  }
  function CR(e, t, n) {
    let { setStyle: r, getStyle: o } = n,
      { actionTypeId: i } = t;
    if (i === Bt) {
      let { config: s } = t;
      s.widthUnit === ut && r(e, je, ""), s.heightUnit === ut && r(e, Ye, "");
    }
    o(e, qt) && jd({ effect: Kd, actionTypeId: i, elementApi: n })(e);
  }
  function PR(e, t, n) {
    let { setStyle: r } = n;
    Kd(e, t, n), r(e, t, ""), t === st && r(e, ur, "");
  }
  function Yd(e) {
    let t = 0,
      n = 0;
    return (
      e.forEach((r, o) => {
        let { config: i } = r,
          s = i.delay + i.duration;
        s >= t && ((t = s), (n = o));
      }),
      n
    );
  }
  function LR(e, t) {
    let { actionItemGroups: n, useFirstGroupAsInitialState: r } = e,
      { actionItem: o, verboseTimeElapsed: i = 0 } = t,
      s = 0,
      a = 0;
    return (
      n.forEach((u, l) => {
        if (r && l === 0) return;
        let { actionItems: g } = u,
          p = g[Yd(g)],
          { config: d, actionTypeId: y } = p;
        o.id === p.id && (a = s + i);
        let S = zd(y) === Eo ? 0 : d.duration;
        s += d.delay + S;
      }),
      s > 0 ? yn(a / s) : 0
    );
  }
  function NR({ actionList: e, actionItemId: t, rawData: n }) {
    let { actionItemGroups: r, continuousParameterGroups: o } = e,
      i = [],
      s = (a) => (
        i.push((0, yr.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      r && r.some(({ actionItems: a }) => a.some(s)),
      o &&
        o.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: l }) => l.some(s));
        }),
      (0, yr.setIn)(n, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: i }] },
      })
    );
  }
  function DR(e, { basedOn: t }) {
    return (
      (e === qe.SCROLLING_IN_VIEW && (t === ze.ELEMENT || t == null)) ||
      (e === qe.MOUSE_MOVE && t === ze.ELEMENT)
    );
  }
  function MR(e, t) {
    return e + jx + t;
  }
  function FR(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function qR(e, t) {
    return ho(e && e.sort(), t && t.sort());
  }
  function GR(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + go + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: n = "", useEventTarget: r = "" } = e;
    return t + go + n + go + r;
  }
  var Je,
    Er,
    pr,
    yr,
    Xd,
    Dx,
    Mx,
    Fx,
    qx,
    Gx,
    Xx,
    Vx,
    Bx,
    kx,
    Ux,
    hr,
    vn,
    mn,
    je,
    Ye,
    Vd,
    Hx,
    Wx,
    Nd,
    zx,
    Dd,
    Kx,
    gr,
    qt,
    ut,
    _n,
    jx,
    go,
    Bd,
    Eo,
    yo,
    kd,
    Gt,
    Xt,
    Vt,
    In,
    Ud,
    Tn,
    bn,
    Bt,
    kt,
    Ut,
    Ht,
    vr,
    Yx,
    Hd,
    vo,
    Wd,
    dr,
    $x,
    Jx,
    nR,
    Fd,
    oR,
    aR,
    uR,
    cR,
    lR,
    _o,
    hR,
    gR,
    ER,
    yR,
    TR,
    bR,
    AR,
    jd,
    $d = ue(() => {
      "use strict";
      (Je = te(dd())), (Er = te(Od())), (pr = te(Cd())), (yr = te(wt()));
      xe();
      Ld();
      ji();
      Xd = te(Ji());
      lo();
      cr();
      ({
        BACKGROUND: Dx,
        TRANSFORM: Mx,
        TRANSLATE_3D: Fx,
        SCALE_3D: qx,
        ROTATE_X: Gx,
        ROTATE_Y: Xx,
        ROTATE_Z: Vx,
        SKEW: Bx,
        PRESERVE_3D: kx,
        FLEX: Ux,
        OPACITY: hr,
        FILTER: vn,
        FONT_VARIATION_SETTINGS: mn,
        WIDTH: je,
        HEIGHT: Ye,
        BACKGROUND_COLOR: Vd,
        BORDER_COLOR: Hx,
        COLOR: Wx,
        CHILDREN: Nd,
        IMMEDIATE_CHILDREN: zx,
        SIBLINGS: Dd,
        PARENT: Kx,
        DISPLAY: gr,
        WILL_CHANGE: qt,
        AUTO: ut,
        COMMA_DELIMITER: _n,
        COLON_DELIMITER: jx,
        BAR_DELIMITER: go,
        RENDER_TRANSFORM: Bd,
        RENDER_GENERAL: Eo,
        RENDER_STYLE: yo,
        RENDER_PLUGIN: kd,
      } = _e),
        ({
          TRANSFORM_MOVE: Gt,
          TRANSFORM_SCALE: Xt,
          TRANSFORM_ROTATE: Vt,
          TRANSFORM_SKEW: In,
          STYLE_OPACITY: Ud,
          STYLE_FILTER: Tn,
          STYLE_FONT_VARIATION: bn,
          STYLE_SIZE: Bt,
          STYLE_BACKGROUND_COLOR: kt,
          STYLE_BORDER: Ut,
          STYLE_TEXT_COLOR: Ht,
          GENERAL_DISPLAY: vr,
          OBJECT_VALUE: Yx,
        } = we),
        (Hd = (e) => e.trim()),
        (vo = Object.freeze({ [kt]: Vd, [Ut]: Hx, [Ht]: Wx })),
        (Wd = Object.freeze({
          [st]: Mx,
          [Vd]: Dx,
          [hr]: hr,
          [vn]: vn,
          [je]: je,
          [Ye]: Ye,
          [mn]: mn,
        })),
        (dr = new Map());
      $x = 1;
      Jx = 1;
      nR = (e, t) => e === t;
      (Fd = /px/),
        (oR = (e, t) =>
          t.reduce(
            (n, r) => (n[r.type] == null && (n[r.type] = hR[r.type]), n),
            e || {}
          )),
        (aR = (e, t) =>
          t.reduce(
            (n, r) => (
              n[r.type] == null &&
                (n[r.type] = gR[r.type] || r.defaultValue || 0),
              n
            ),
            e || {}
          ));
      (uR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (cR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (lR = (e, t, n) => {
          if (Et(e)) return oo(e)(n, t);
          switch (e) {
            case Tn: {
              let r = (0, pr.default)(n.filters, ({ type: o }) => o === t);
              return r ? r.value : 0;
            }
            case bn: {
              let r = (0, pr.default)(
                n.fontVariations,
                ({ type: o }) => o === t
              );
              return r ? r.value : 0;
            }
            default:
              return n[t];
          }
        });
      (_o = {
        [Gt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Xt]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Vt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [In]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (hR = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (gR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (ER = (e, t) => {
          let n = (0, pr.default)(t.filters, ({ type: r }) => r === e);
          if (n && n.unit) return n.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (yR = Object.keys(_o));
      (TR = "\\(([^)]+)\\)"), (bR = /^rgb/), (AR = RegExp(`rgba?${TR}`));
      jd =
        ({ effect: e, actionTypeId: t, elementApi: n }) =>
        (r) => {
          switch (t) {
            case Gt:
            case Xt:
            case Vt:
            case In:
              e(r, st, n);
              break;
            case Tn:
              e(r, vn, n);
              break;
            case bn:
              e(r, mn, n);
              break;
            case Ud:
              e(r, hr, n);
              break;
            case Bt:
              e(r, je, n), e(r, Ye, n);
              break;
            case kt:
            case Ut:
            case Ht:
              e(r, vo[t], n);
              break;
            case vr:
              e(r, gr, n);
              break;
          }
        };
    });
  var mt = f((Io) => {
    "use strict";
    Object.defineProperty(Io, "__esModule", { value: !0 });
    function XR(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    XR(Io, {
      IX2BrowserSupport: function () {
        return VR;
      },
      IX2EasingUtils: function () {
        return kR;
      },
      IX2Easings: function () {
        return BR;
      },
      IX2ElementsReducer: function () {
        return UR;
      },
      IX2VanillaPlugins: function () {
        return HR;
      },
      IX2VanillaUtils: function () {
        return WR;
      },
    });
    var VR = Wt((cr(), ke(Wf))),
      BR = Wt((Ki(), ke(En))),
      kR = Wt((ji(), ke(Zf))),
      UR = Wt((nd(), ke(td))),
      HR = Wt((lo(), ke(ld))),
      WR = Wt(($d(), ke(Qd)));
    function Zd(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (Zd = function (r) {
        return r ? n : t;
      })(e);
    }
    function Wt(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = Zd(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
          var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, i, s)
            : (r[i] = e[i]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
  });
  var _r,
    et,
    zR,
    KR,
    jR,
    YR,
    QR,
    $R,
    mr,
    Jd,
    ZR,
    JR,
    To,
    eC,
    tC,
    nC,
    rC,
    ep,
    tp = ue(() => {
      "use strict";
      xe();
      (_r = te(mt())),
        (et = te(wt())),
        ({
          IX2_RAW_DATA_IMPORTED: zR,
          IX2_SESSION_STOPPED: KR,
          IX2_INSTANCE_ADDED: jR,
          IX2_INSTANCE_STARTED: YR,
          IX2_INSTANCE_REMOVED: QR,
          IX2_ANIMATION_FRAME_CHANGED: $R,
        } = he),
        ({
          optimizeFloat: mr,
          applyEasing: Jd,
          createBezierEasing: ZR,
        } = _r.IX2EasingUtils),
        ({ RENDER_GENERAL: JR } = _e),
        ({
          getItemConfigByKey: To,
          getRenderType: eC,
          getStyleProp: tC,
        } = _r.IX2VanillaUtils),
        (nC = (e, t) => {
          let {
              position: n,
              parameterId: r,
              actionGroups: o,
              destinationKeys: i,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: l,
              skipMotion: g,
              skipToValue: p,
            } = e,
            { parameters: d } = t.payload,
            y = Math.max(1 - s, 0.01),
            S = d[r];
          S == null && ((y = 1), (S = a));
          let _ = Math.max(S, 0) || 0,
            A = mr(_ - n),
            v = g ? p : mr(n + A * y),
            O = v * 100;
          if (v === n && e.current) return e;
          let T, x, P, R;
          for (let X = 0, { length: B } = o; X < B; X++) {
            let { keyframe: H, actionItems: j } = o[X];
            if ((X === 0 && (T = j[0]), O >= H)) {
              T = j[0];
              let N = o[X + 1],
                I = N && O !== H;
              (x = I ? N.actionItems[0] : null),
                I && ((P = H / 100), (R = (N.keyframe - H) / 100));
            }
          }
          let G = {};
          if (T && !x)
            for (let X = 0, { length: B } = i; X < B; X++) {
              let H = i[X];
              G[H] = To(u, H, T.config);
            }
          else if (T && x && P !== void 0 && R !== void 0) {
            let X = (v - P) / R,
              B = T.config.easing,
              H = Jd(B, X, l);
            for (let j = 0, { length: N } = i; j < N; j++) {
              let I = i[j],
                L = To(u, I, T.config),
                z = (To(u, I, x.config) - L) * H + L;
              G[I] = z;
            }
          }
          return (0, et.merge)(e, { position: v, current: G });
        }),
        (rC = (e, t) => {
          let {
              active: n,
              origin: r,
              start: o,
              immediate: i,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: l,
              destinationKeys: g,
              pluginDuration: p,
              instanceDelay: d,
              customEasingFn: y,
              skipMotion: S,
            } = e,
            _ = u.config.easing,
            { duration: A, delay: v } = u.config;
          p != null && (A = p),
            (v = d ?? v),
            s === JR ? (A = 0) : (i || S) && (A = v = 0);
          let { now: O } = t.payload;
          if (n && r) {
            let T = O - (o + v);
            if (a) {
              let X = O - o,
                B = A + v,
                H = mr(Math.min(Math.max(0, X / B), 1));
              e = (0, et.set)(e, "verboseTimeElapsed", B * H);
            }
            if (T < 0) return e;
            let x = mr(Math.min(Math.max(0, T / A), 1)),
              P = Jd(_, x, y),
              R = {},
              G = null;
            return (
              g.length &&
                (G = g.reduce((X, B) => {
                  let H = l[B],
                    j = parseFloat(r[B]) || 0,
                    I = (parseFloat(H) - j) * P + j;
                  return (X[B] = I), X;
                }, {})),
              (R.current = G),
              (R.position = x),
              x === 1 && ((R.active = !1), (R.complete = !0)),
              (0, et.merge)(e, R)
            );
          }
          return e;
        }),
        (ep = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case zR:
              return t.payload.ixInstances || Object.freeze({});
            case KR:
              return Object.freeze({});
            case jR: {
              let {
                  instanceId: n,
                  elementId: r,
                  actionItem: o,
                  eventId: i,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: l,
                  isCarrier: g,
                  origin: p,
                  destination: d,
                  immediate: y,
                  verbose: S,
                  continuous: _,
                  parameterId: A,
                  actionGroups: v,
                  smoothing: O,
                  restingValue: T,
                  pluginInstance: x,
                  pluginDuration: P,
                  instanceDelay: R,
                  skipMotion: G,
                  skipToValue: X,
                } = t.payload,
                { actionTypeId: B } = o,
                H = eC(B),
                j = tC(H, B),
                N = Object.keys(d).filter(
                  (L) => d[L] != null && typeof d[L] != "string"
                ),
                { easing: I } = o.config;
              return (0, et.set)(e, n, {
                id: n,
                elementId: r,
                active: !1,
                position: 0,
                start: 0,
                origin: p,
                destination: d,
                destinationKeys: N,
                immediate: y,
                verbose: S,
                current: null,
                actionItem: o,
                actionTypeId: B,
                eventId: i,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: l,
                renderType: H,
                isCarrier: g,
                styleProp: j,
                continuous: _,
                parameterId: A,
                actionGroups: v,
                smoothing: O,
                restingValue: T,
                pluginInstance: x,
                pluginDuration: P,
                instanceDelay: R,
                skipMotion: G,
                skipToValue: X,
                customEasingFn:
                  Array.isArray(I) && I.length === 4 ? ZR(I) : void 0,
              });
            }
            case YR: {
              let { instanceId: n, time: r } = t.payload;
              return (0, et.mergeIn)(e, [n], {
                active: !0,
                complete: !1,
                start: r,
              });
            }
            case QR: {
              let { instanceId: n } = t.payload;
              if (!e[n]) return e;
              let r = {},
                o = Object.keys(e),
                { length: i } = o;
              for (let s = 0; s < i; s++) {
                let a = o[s];
                a !== n && (r[a] = e[a]);
              }
              return r;
            }
            case $R: {
              let n = e,
                r = Object.keys(e),
                { length: o } = r;
              for (let i = 0; i < o; i++) {
                let s = r[i],
                  a = e[s],
                  u = a.continuous ? nC : rC;
                n = (0, et.set)(n, s, u(a, t));
              }
              return n;
            }
            default:
              return e;
          }
        });
    });
  var iC,
    oC,
    aC,
    np,
    rp = ue(() => {
      "use strict";
      xe();
      ({
        IX2_RAW_DATA_IMPORTED: iC,
        IX2_SESSION_STOPPED: oC,
        IX2_PARAMETER_CHANGED: aC,
      } = he),
        (np = (e = {}, t) => {
          switch (t.type) {
            case iC:
              return t.payload.ixParameters || {};
            case oC:
              return {};
            case aC: {
              let { key: n, value: r } = t.payload;
              return (e[n] = r), e;
            }
            default:
              return e;
          }
        });
    });
  var ap = {};
  Oe(ap, { default: () => uC });
  var ip,
    op,
    sC,
    uC,
    sp = ue(() => {
      "use strict";
      ip = te(di());
      gs();
      Fs();
      Xs();
      op = te(mt());
      tp();
      rp();
      ({ ixElements: sC } = op.IX2ElementsReducer),
        (uC = (0, ip.combineReducers)({
          ixData: hs,
          ixRequest: Ms,
          ixSession: Gs,
          ixElements: sC,
          ixInstances: ep,
          ixParameters: np,
        }));
    });
  var cp = f((U1, up) => {
    var cC = it(),
      lC = ye(),
      fC = $e(),
      dC = "[object String]";
    function pC(e) {
      return typeof e == "string" || (!lC(e) && fC(e) && cC(e) == dC);
    }
    up.exports = pC;
  });
  var fp = f((H1, lp) => {
    var hC = Vi(),
      gC = hC("length");
    lp.exports = gC;
  });
  var pp = f((W1, dp) => {
    var EC = "\\ud800-\\udfff",
      yC = "\\u0300-\\u036f",
      vC = "\\ufe20-\\ufe2f",
      mC = "\\u20d0-\\u20ff",
      _C = yC + vC + mC,
      IC = "\\ufe0e\\ufe0f",
      TC = "\\u200d",
      bC = RegExp("[" + TC + EC + _C + IC + "]");
    function AC(e) {
      return bC.test(e);
    }
    dp.exports = AC;
  });
  var Tp = f((z1, Ip) => {
    var gp = "\\ud800-\\udfff",
      SC = "\\u0300-\\u036f",
      OC = "\\ufe20-\\ufe2f",
      wC = "\\u20d0-\\u20ff",
      xC = SC + OC + wC,
      RC = "\\ufe0e\\ufe0f",
      CC = "[" + gp + "]",
      bo = "[" + xC + "]",
      Ao = "\\ud83c[\\udffb-\\udfff]",
      PC = "(?:" + bo + "|" + Ao + ")",
      Ep = "[^" + gp + "]",
      yp = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      vp = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      LC = "\\u200d",
      mp = PC + "?",
      _p = "[" + RC + "]?",
      NC = "(?:" + LC + "(?:" + [Ep, yp, vp].join("|") + ")" + _p + mp + ")*",
      DC = _p + mp + NC,
      MC = "(?:" + [Ep + bo + "?", bo, yp, vp, CC].join("|") + ")",
      hp = RegExp(Ao + "(?=" + Ao + ")|" + MC + DC, "g");
    function FC(e) {
      for (var t = (hp.lastIndex = 0); hp.test(e); ) ++t;
      return t;
    }
    Ip.exports = FC;
  });
  var Ap = f((K1, bp) => {
    var qC = fp(),
      GC = pp(),
      XC = Tp();
    function VC(e) {
      return GC(e) ? XC(e) : qC(e);
    }
    bp.exports = VC;
  });
  var Op = f((j1, Sp) => {
    var BC = Jn(),
      kC = er(),
      UC = ht(),
      HC = cp(),
      WC = Ap(),
      zC = "[object Map]",
      KC = "[object Set]";
    function jC(e) {
      if (e == null) return 0;
      if (UC(e)) return HC(e) ? WC(e) : e.length;
      var t = kC(e);
      return t == zC || t == KC ? e.size : BC(e).length;
    }
    Sp.exports = jC;
  });
  var xp = f((Y1, wp) => {
    var YC = "Expected a function";
    function QC(e) {
      if (typeof e != "function") throw new TypeError(YC);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    wp.exports = QC;
  });
  var So = f((Q1, Rp) => {
    var $C = ot(),
      ZC = (function () {
        try {
          var e = $C(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Rp.exports = ZC;
  });
  var Oo = f(($1, Pp) => {
    var Cp = So();
    function JC(e, t, n) {
      t == "__proto__" && Cp
        ? Cp(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (e[t] = n);
    }
    Pp.exports = JC;
  });
  var Np = f((Z1, Lp) => {
    var eP = Oo(),
      tP = Un(),
      nP = Object.prototype,
      rP = nP.hasOwnProperty;
    function iP(e, t, n) {
      var r = e[t];
      (!(rP.call(e, t) && tP(r, n)) || (n === void 0 && !(t in e))) &&
        eP(e, t, n);
    }
    Lp.exports = iP;
  });
  var Fp = f((J1, Mp) => {
    var oP = Np(),
      aP = pn(),
      sP = Yn(),
      Dp = Ke(),
      uP = Mt();
    function cP(e, t, n, r) {
      if (!Dp(e)) return e;
      t = aP(t, e);
      for (var o = -1, i = t.length, s = i - 1, a = e; a != null && ++o < i; ) {
        var u = uP(t[o]),
          l = n;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (o != s) {
          var g = a[u];
          (l = r ? r(g, u, a) : void 0),
            l === void 0 && (l = Dp(g) ? g : sP(t[o + 1]) ? [] : {});
        }
        oP(a, u, l), (a = a[u]);
      }
      return e;
    }
    Mp.exports = cP;
  });
  var Gp = f((eG, qp) => {
    var lP = rr(),
      fP = Fp(),
      dP = pn();
    function pP(e, t, n) {
      for (var r = -1, o = t.length, i = {}; ++r < o; ) {
        var s = t[r],
          a = lP(e, s);
        n(a, s) && fP(i, dP(s, e), a);
      }
      return i;
    }
    qp.exports = pP;
  });
  var Vp = f((tG, Xp) => {
    var hP = Kn(),
      gP = Jr(),
      EP = Si(),
      yP = Ai(),
      vP = Object.getOwnPropertySymbols,
      mP = vP
        ? function (e) {
            for (var t = []; e; ) hP(t, EP(e)), (e = gP(e));
            return t;
          }
        : yP;
    Xp.exports = mP;
  });
  var kp = f((nG, Bp) => {
    function _P(e) {
      var t = [];
      if (e != null) for (var n in Object(e)) t.push(n);
      return t;
    }
    Bp.exports = _P;
  });
  var Hp = f((rG, Up) => {
    var IP = Ke(),
      TP = Zn(),
      bP = kp(),
      AP = Object.prototype,
      SP = AP.hasOwnProperty;
    function OP(e) {
      if (!IP(e)) return bP(e);
      var t = TP(e),
        n = [];
      for (var r in e)
        (r == "constructor" && (t || !SP.call(e, r))) || n.push(r);
      return n;
    }
    Up.exports = OP;
  });
  var zp = f((iG, Wp) => {
    var wP = wi(),
      xP = Hp(),
      RP = ht();
    function CP(e) {
      return RP(e) ? wP(e, !0) : xP(e);
    }
    Wp.exports = CP;
  });
  var jp = f((oG, Kp) => {
    var PP = bi(),
      LP = Vp(),
      NP = zp();
    function DP(e) {
      return PP(e, NP, LP);
    }
    Kp.exports = DP;
  });
  var Qp = f((aG, Yp) => {
    var MP = Xi(),
      FP = at(),
      qP = Gp(),
      GP = jp();
    function XP(e, t) {
      if (e == null) return {};
      var n = MP(GP(e), function (r) {
        return [r];
      });
      return (
        (t = FP(t)),
        qP(e, n, function (r, o) {
          return t(r, o[0]);
        })
      );
    }
    Yp.exports = XP;
  });
  var Zp = f((sG, $p) => {
    var VP = at(),
      BP = xp(),
      kP = Qp();
    function UP(e, t) {
      return kP(e, BP(VP(t)));
    }
    $p.exports = UP;
  });
  var eh = f((uG, Jp) => {
    var HP = Jn(),
      WP = er(),
      zP = sn(),
      KP = ye(),
      jP = ht(),
      YP = jn(),
      QP = Zn(),
      $P = $n(),
      ZP = "[object Map]",
      JP = "[object Set]",
      eL = Object.prototype,
      tL = eL.hasOwnProperty;
    function nL(e) {
      if (e == null) return !0;
      if (
        jP(e) &&
        (KP(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          YP(e) ||
          $P(e) ||
          zP(e))
      )
        return !e.length;
      var t = WP(e);
      if (t == ZP || t == JP) return !e.size;
      if (QP(e)) return !HP(e).length;
      for (var n in e) if (tL.call(e, n)) return !1;
      return !0;
    }
    Jp.exports = nL;
  });
  var nh = f((cG, th) => {
    var rL = Oo(),
      iL = fo(),
      oL = at();
    function aL(e, t) {
      var n = {};
      return (
        (t = oL(t, 3)),
        iL(e, function (r, o, i) {
          rL(n, o, t(r, o, i));
        }),
        n
      );
    }
    th.exports = aL;
  });
  var ih = f((lG, rh) => {
    function sL(e, t) {
      for (
        var n = -1, r = e == null ? 0 : e.length;
        ++n < r && t(e[n], n, e) !== !1;

      );
      return e;
    }
    rh.exports = sL;
  });
  var ah = f((fG, oh) => {
    var uL = or();
    function cL(e) {
      return typeof e == "function" ? e : uL;
    }
    oh.exports = cL;
  });
  var uh = f((dG, sh) => {
    var lL = ih(),
      fL = po(),
      dL = ah(),
      pL = ye();
    function hL(e, t) {
      var n = pL(e) ? lL : fL;
      return n(e, dL(t));
    }
    sh.exports = hL;
  });
  var lh = f((pG, ch) => {
    var gL = Fe(),
      EL = function () {
        return gL.Date.now();
      };
    ch.exports = EL;
  });
  var ph = f((hG, dh) => {
    var yL = Ke(),
      wo = lh(),
      fh = ar(),
      vL = "Expected a function",
      mL = Math.max,
      _L = Math.min;
    function IL(e, t, n) {
      var r,
        o,
        i,
        s,
        a,
        u,
        l = 0,
        g = !1,
        p = !1,
        d = !0;
      if (typeof e != "function") throw new TypeError(vL);
      (t = fh(t) || 0),
        yL(n) &&
          ((g = !!n.leading),
          (p = "maxWait" in n),
          (i = p ? mL(fh(n.maxWait) || 0, t) : i),
          (d = "trailing" in n ? !!n.trailing : d));
      function y(R) {
        var G = r,
          X = o;
        return (r = o = void 0), (l = R), (s = e.apply(X, G)), s;
      }
      function S(R) {
        return (l = R), (a = setTimeout(v, t)), g ? y(R) : s;
      }
      function _(R) {
        var G = R - u,
          X = R - l,
          B = t - G;
        return p ? _L(B, i - X) : B;
      }
      function A(R) {
        var G = R - u,
          X = R - l;
        return u === void 0 || G >= t || G < 0 || (p && X >= i);
      }
      function v() {
        var R = wo();
        if (A(R)) return O(R);
        a = setTimeout(v, _(R));
      }
      function O(R) {
        return (a = void 0), d && r ? y(R) : ((r = o = void 0), s);
      }
      function T() {
        a !== void 0 && clearTimeout(a), (l = 0), (r = u = o = a = void 0);
      }
      function x() {
        return a === void 0 ? s : O(wo());
      }
      function P() {
        var R = wo(),
          G = A(R);
        if (((r = arguments), (o = this), (u = R), G)) {
          if (a === void 0) return S(u);
          if (p) return clearTimeout(a), (a = setTimeout(v, t)), y(u);
        }
        return a === void 0 && (a = setTimeout(v, t)), s;
      }
      return (P.cancel = T), (P.flush = x), P;
    }
    dh.exports = IL;
  });
  var gh = f((gG, hh) => {
    var TL = ph(),
      bL = Ke(),
      AL = "Expected a function";
    function SL(e, t, n) {
      var r = !0,
        o = !0;
      if (typeof e != "function") throw new TypeError(AL);
      return (
        bL(n) &&
          ((r = "leading" in n ? !!n.leading : r),
          (o = "trailing" in n ? !!n.trailing : o)),
        TL(e, t, { leading: r, maxWait: t, trailing: o })
      );
    }
    hh.exports = SL;
  });
  var yh = {};
  Oe(yh, {
    actionListPlaybackChanged: () => Kt,
    animationFrameChanged: () => Tr,
    clearRequested: () => QL,
    elementStateChanged: () => Mo,
    eventListenerAdded: () => Ir,
    eventStateChanged: () => Lo,
    instanceAdded: () => No,
    instanceRemoved: () => Do,
    instanceStarted: () => br,
    mediaQueriesDefined: () => qo,
    parameterChanged: () => zt,
    playbackRequested: () => jL,
    previewRequested: () => KL,
    rawDataImported: () => xo,
    sessionInitialized: () => Ro,
    sessionStarted: () => Co,
    sessionStopped: () => Po,
    stopRequested: () => YL,
    testFrameRendered: () => $L,
    viewportWidthChanged: () => Fo,
  });
  var Eh,
    OL,
    wL,
    xL,
    RL,
    CL,
    PL,
    LL,
    NL,
    DL,
    ML,
    FL,
    qL,
    GL,
    XL,
    VL,
    BL,
    kL,
    UL,
    HL,
    WL,
    zL,
    xo,
    Ro,
    Co,
    Po,
    KL,
    jL,
    YL,
    QL,
    Ir,
    $L,
    Lo,
    Tr,
    zt,
    No,
    br,
    Do,
    Mo,
    Kt,
    Fo,
    qo,
    Ar = ue(() => {
      "use strict";
      xe();
      (Eh = te(mt())),
        ({
          IX2_RAW_DATA_IMPORTED: OL,
          IX2_SESSION_INITIALIZED: wL,
          IX2_SESSION_STARTED: xL,
          IX2_SESSION_STOPPED: RL,
          IX2_PREVIEW_REQUESTED: CL,
          IX2_PLAYBACK_REQUESTED: PL,
          IX2_STOP_REQUESTED: LL,
          IX2_CLEAR_REQUESTED: NL,
          IX2_EVENT_LISTENER_ADDED: DL,
          IX2_TEST_FRAME_RENDERED: ML,
          IX2_EVENT_STATE_CHANGED: FL,
          IX2_ANIMATION_FRAME_CHANGED: qL,
          IX2_PARAMETER_CHANGED: GL,
          IX2_INSTANCE_ADDED: XL,
          IX2_INSTANCE_STARTED: VL,
          IX2_INSTANCE_REMOVED: BL,
          IX2_ELEMENT_STATE_CHANGED: kL,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: UL,
          IX2_VIEWPORT_WIDTH_CHANGED: HL,
          IX2_MEDIA_QUERIES_DEFINED: WL,
        } = he),
        ({ reifyState: zL } = Eh.IX2VanillaUtils),
        (xo = (e) => ({ type: OL, payload: { ...zL(e) } })),
        (Ro = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: wL,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Co = () => ({ type: xL })),
        (Po = () => ({ type: RL })),
        (KL = ({ rawData: e, defer: t }) => ({
          type: CL,
          payload: { defer: t, rawData: e },
        })),
        (jL = ({
          actionTypeId: e = we.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: n,
          eventId: r,
          allowEvents: o,
          immediate: i,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: PL,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: n,
            testManual: s,
            eventId: r,
            allowEvents: o,
            immediate: i,
            verbose: a,
            rawData: u,
          },
        })),
        (YL = (e) => ({ type: LL, payload: { actionListId: e } })),
        (QL = () => ({ type: NL })),
        (Ir = (e, t) => ({
          type: DL,
          payload: { target: e, listenerParams: t },
        })),
        ($L = (e = 1) => ({ type: ML, payload: { step: e } })),
        (Lo = (e, t) => ({ type: FL, payload: { stateKey: e, newState: t } })),
        (Tr = (e, t) => ({ type: qL, payload: { now: e, parameters: t } })),
        (zt = (e, t) => ({ type: GL, payload: { key: e, value: t } })),
        (No = (e) => ({ type: XL, payload: { ...e } })),
        (br = (e, t) => ({ type: VL, payload: { instanceId: e, time: t } })),
        (Do = (e) => ({ type: BL, payload: { instanceId: e } })),
        (Mo = (e, t, n, r) => ({
          type: kL,
          payload: { elementId: e, actionTypeId: t, current: n, actionItem: r },
        })),
        (Kt = ({ actionListId: e, isPlaying: t }) => ({
          type: UL,
          payload: { actionListId: e, isPlaying: t },
        })),
        (Fo = ({ width: e, mediaQueries: t }) => ({
          type: HL,
          payload: { width: e, mediaQueries: t },
        })),
        (qo = () => ({ type: WL }));
    });
  var Ae = {};
  Oe(Ae, {
    elementContains: () => Vo,
    getChildElements: () => sN,
    getClosestElement: () => An,
    getProperty: () => nN,
    getQuerySelector: () => Xo,
    getRefType: () => Bo,
    getSiblingElements: () => uN,
    getStyle: () => tN,
    getValidDocument: () => iN,
    isSiblingNode: () => aN,
    matchSelector: () => rN,
    queryDocument: () => oN,
    setStyle: () => eN,
  });
  function eN(e, t, n) {
    e.style[t] = n;
  }
  function tN(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function nN(e, t) {
    return e[t];
  }
  function rN(e) {
    return (t) => t[Go](e);
  }
  function Xo({ id: e, selector: t }) {
    if (e) {
      let n = e;
      if (e.indexOf(vh) !== -1) {
        let r = e.split(vh),
          o = r[0];
        if (((n = r[1]), o !== document.documentElement.getAttribute(_h)))
          return null;
      }
      return `[data-w-id="${n}"], [data-w-id^="${n}_instance"]`;
    }
    return t;
  }
  function iN(e) {
    return e == null || e === document.documentElement.getAttribute(_h)
      ? document
      : null;
  }
  function oN(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function Vo(e, t) {
    return e.contains(t);
  }
  function aN(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function sN(e) {
    let t = [];
    for (let n = 0, { length: r } = e || []; n < r; n++) {
      let { children: o } = e[n],
        { length: i } = o;
      if (i) for (let s = 0; s < i; s++) t.push(o[s]);
    }
    return t;
  }
  function uN(e = []) {
    let t = [],
      n = [];
    for (let r = 0, { length: o } = e; r < o; r++) {
      let { parentNode: i } = e[r];
      if (!i || !i.children || !i.children.length || n.indexOf(i) !== -1)
        continue;
      n.push(i);
      let s = i.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function Bo(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? ZL
        : JL
      : null;
  }
  var mh,
    Go,
    vh,
    ZL,
    JL,
    _h,
    An,
    Ih = ue(() => {
      "use strict";
      mh = te(mt());
      xe();
      ({ ELEMENT_MATCHES: Go } = mh.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: vh,
          HTML_ELEMENT: ZL,
          PLAIN_OBJECT: JL,
          WF_PAGE: _h,
        } = _e);
      An = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let n = e;
            do {
              if (n[Go] && n[Go](t)) return n;
              n = n.parentNode;
            } while (n != null);
            return null;
          };
    });
  var ko = f((vG, bh) => {
    var cN = Ke(),
      Th = Object.create,
      lN = (function () {
        function e() {}
        return function (t) {
          if (!cN(t)) return {};
          if (Th) return Th(t);
          e.prototype = t;
          var n = new e();
          return (e.prototype = void 0), n;
        };
      })();
    bh.exports = lN;
  });
  var Sr = f((mG, Ah) => {
    function fN() {}
    Ah.exports = fN;
  });
  var wr = f((_G, Sh) => {
    var dN = ko(),
      pN = Sr();
    function Or(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    Or.prototype = dN(pN.prototype);
    Or.prototype.constructor = Or;
    Sh.exports = Or;
  });
  var Rh = f((IG, xh) => {
    var Oh = At(),
      hN = sn(),
      gN = ye(),
      wh = Oh ? Oh.isConcatSpreadable : void 0;
    function EN(e) {
      return gN(e) || hN(e) || !!(wh && e && e[wh]);
    }
    xh.exports = EN;
  });
  var Lh = f((TG, Ph) => {
    var yN = Kn(),
      vN = Rh();
    function Ch(e, t, n, r, o) {
      var i = -1,
        s = e.length;
      for (n || (n = vN), o || (o = []); ++i < s; ) {
        var a = e[i];
        t > 0 && n(a)
          ? t > 1
            ? Ch(a, t - 1, n, r, o)
            : yN(o, a)
          : r || (o[o.length] = a);
      }
      return o;
    }
    Ph.exports = Ch;
  });
  var Dh = f((bG, Nh) => {
    var mN = Lh();
    function _N(e) {
      var t = e == null ? 0 : e.length;
      return t ? mN(e, 1) : [];
    }
    Nh.exports = _N;
  });
  var Fh = f((AG, Mh) => {
    function IN(e, t, n) {
      switch (n.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, n[0]);
        case 2:
          return e.call(t, n[0], n[1]);
        case 3:
          return e.call(t, n[0], n[1], n[2]);
      }
      return e.apply(t, n);
    }
    Mh.exports = IN;
  });
  var Xh = f((SG, Gh) => {
    var TN = Fh(),
      qh = Math.max;
    function bN(e, t, n) {
      return (
        (t = qh(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var r = arguments, o = -1, i = qh(r.length - t, 0), s = Array(i);
            ++o < i;

          )
            s[o] = r[t + o];
          o = -1;
          for (var a = Array(t + 1); ++o < t; ) a[o] = r[o];
          return (a[t] = n(s)), TN(e, this, a);
        }
      );
    }
    Gh.exports = bN;
  });
  var Bh = f((OG, Vh) => {
    function AN(e) {
      return function () {
        return e;
      };
    }
    Vh.exports = AN;
  });
  var Hh = f((wG, Uh) => {
    var SN = Bh(),
      kh = So(),
      ON = or(),
      wN = kh
        ? function (e, t) {
            return kh(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: SN(t),
              writable: !0,
            });
          }
        : ON;
    Uh.exports = wN;
  });
  var zh = f((xG, Wh) => {
    var xN = 800,
      RN = 16,
      CN = Date.now;
    function PN(e) {
      var t = 0,
        n = 0;
      return function () {
        var r = CN(),
          o = RN - (r - n);
        if (((n = r), o > 0)) {
          if (++t >= xN) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    Wh.exports = PN;
  });
  var jh = f((RG, Kh) => {
    var LN = Hh(),
      NN = zh(),
      DN = NN(LN);
    Kh.exports = DN;
  });
  var Qh = f((CG, Yh) => {
    var MN = Dh(),
      FN = Xh(),
      qN = jh();
    function GN(e) {
      return qN(FN(e, void 0, MN), e + "");
    }
    Yh.exports = GN;
  });
  var Jh = f((PG, Zh) => {
    var $h = xi(),
      XN = $h && new $h();
    Zh.exports = XN;
  });
  var tg = f((LG, eg) => {
    function VN() {}
    eg.exports = VN;
  });
  var Uo = f((NG, rg) => {
    var ng = Jh(),
      BN = tg(),
      kN = ng
        ? function (e) {
            return ng.get(e);
          }
        : BN;
    rg.exports = kN;
  });
  var og = f((DG, ig) => {
    var UN = {};
    ig.exports = UN;
  });
  var Ho = f((MG, sg) => {
    var ag = og(),
      HN = Object.prototype,
      WN = HN.hasOwnProperty;
    function zN(e) {
      for (
        var t = e.name + "", n = ag[t], r = WN.call(ag, t) ? n.length : 0;
        r--;

      ) {
        var o = n[r],
          i = o.func;
        if (i == null || i == e) return o.name;
      }
      return t;
    }
    sg.exports = zN;
  });
  var Rr = f((FG, ug) => {
    var KN = ko(),
      jN = Sr(),
      YN = 4294967295;
    function xr(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = YN),
        (this.__views__ = []);
    }
    xr.prototype = KN(jN.prototype);
    xr.prototype.constructor = xr;
    ug.exports = xr;
  });
  var lg = f((qG, cg) => {
    function QN(e, t) {
      var n = -1,
        r = e.length;
      for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
      return t;
    }
    cg.exports = QN;
  });
  var dg = f((GG, fg) => {
    var $N = Rr(),
      ZN = wr(),
      JN = lg();
    function eD(e) {
      if (e instanceof $N) return e.clone();
      var t = new ZN(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = JN(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    fg.exports = eD;
  });
  var gg = f((XG, hg) => {
    var tD = Rr(),
      pg = wr(),
      nD = Sr(),
      rD = ye(),
      iD = $e(),
      oD = dg(),
      aD = Object.prototype,
      sD = aD.hasOwnProperty;
    function Cr(e) {
      if (iD(e) && !rD(e) && !(e instanceof tD)) {
        if (e instanceof pg) return e;
        if (sD.call(e, "__wrapped__")) return oD(e);
      }
      return new pg(e);
    }
    Cr.prototype = nD.prototype;
    Cr.prototype.constructor = Cr;
    hg.exports = Cr;
  });
  var yg = f((VG, Eg) => {
    var uD = Rr(),
      cD = Uo(),
      lD = Ho(),
      fD = gg();
    function dD(e) {
      var t = lD(e),
        n = fD[t];
      if (typeof n != "function" || !(t in uD.prototype)) return !1;
      if (e === n) return !0;
      var r = cD(n);
      return !!r && e === r[0];
    }
    Eg.exports = dD;
  });
  var Ig = f((BG, _g) => {
    var vg = wr(),
      pD = Qh(),
      hD = Uo(),
      Wo = Ho(),
      gD = ye(),
      mg = yg(),
      ED = "Expected a function",
      yD = 8,
      vD = 32,
      mD = 128,
      _D = 256;
    function ID(e) {
      return pD(function (t) {
        var n = t.length,
          r = n,
          o = vg.prototype.thru;
        for (e && t.reverse(); r--; ) {
          var i = t[r];
          if (typeof i != "function") throw new TypeError(ED);
          if (o && !s && Wo(i) == "wrapper") var s = new vg([], !0);
        }
        for (r = s ? r : n; ++r < n; ) {
          i = t[r];
          var a = Wo(i),
            u = a == "wrapper" ? hD(i) : void 0;
          u &&
          mg(u[0]) &&
          u[1] == (mD | yD | vD | _D) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[Wo(u[0])].apply(s, u[3]))
            : (s = i.length == 1 && mg(i) ? s[a]() : s.thru(i));
        }
        return function () {
          var l = arguments,
            g = l[0];
          if (s && l.length == 1 && gD(g)) return s.plant(g).value();
          for (var p = 0, d = n ? t[p].apply(this, l) : g; ++p < n; )
            d = t[p].call(this, d);
          return d;
        };
      });
    }
    _g.exports = ID;
  });
  var bg = f((kG, Tg) => {
    var TD = Ig(),
      bD = TD();
    Tg.exports = bD;
  });
  var Sg = f((UG, Ag) => {
    function AD(e, t, n) {
      return (
        e === e &&
          (n !== void 0 && (e = e <= n ? e : n),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    Ag.exports = AD;
  });
  var wg = f((HG, Og) => {
    var SD = Sg(),
      zo = ar();
    function OD(e, t, n) {
      return (
        n === void 0 && ((n = t), (t = void 0)),
        n !== void 0 && ((n = zo(n)), (n = n === n ? n : 0)),
        t !== void 0 && ((t = zo(t)), (t = t === t ? t : 0)),
        SD(zo(e), t, n)
      );
    }
    Og.exports = OD;
  });
  var Fg,
    qg,
    Gg,
    Xg,
    wD,
    xD,
    RD,
    CD,
    PD,
    LD,
    ND,
    DD,
    MD,
    FD,
    qD,
    GD,
    XD,
    VD,
    BD,
    Vg,
    Bg,
    kD,
    UD,
    HD,
    kg,
    WD,
    zD,
    Ug,
    KD,
    Ko,
    Hg,
    xg,
    Rg,
    Wg,
    On,
    jD,
    Qe,
    zg,
    YD,
    Ce,
    Xe,
    wn,
    Kg,
    jo,
    Cg,
    Yo,
    QD,
    Sn,
    $D,
    ZD,
    JD,
    jg,
    Pg,
    eM,
    Lg,
    tM,
    nM,
    rM,
    Ng,
    Pr,
    Lr,
    Dg,
    Mg,
    Yg,
    Qg = ue(() => {
      "use strict";
      (Fg = te(bg())), (qg = te(ir())), (Gg = te(wg()));
      xe();
      Qo();
      Ar();
      (Xg = te(mt())),
        ({
          MOUSE_CLICK: wD,
          MOUSE_SECOND_CLICK: xD,
          MOUSE_DOWN: RD,
          MOUSE_UP: CD,
          MOUSE_OVER: PD,
          MOUSE_OUT: LD,
          DROPDOWN_CLOSE: ND,
          DROPDOWN_OPEN: DD,
          SLIDER_ACTIVE: MD,
          SLIDER_INACTIVE: FD,
          TAB_ACTIVE: qD,
          TAB_INACTIVE: GD,
          NAVBAR_CLOSE: XD,
          NAVBAR_OPEN: VD,
          MOUSE_MOVE: BD,
          PAGE_SCROLL_DOWN: Vg,
          SCROLL_INTO_VIEW: Bg,
          SCROLL_OUT_OF_VIEW: kD,
          PAGE_SCROLL_UP: UD,
          SCROLLING_IN_VIEW: HD,
          PAGE_FINISH: kg,
          ECOMMERCE_CART_CLOSE: WD,
          ECOMMERCE_CART_OPEN: zD,
          PAGE_START: Ug,
          PAGE_SCROLL: KD,
        } = qe),
        (Ko = "COMPONENT_ACTIVE"),
        (Hg = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: xg } = _e),
        ({ getNamespacedParameterId: Rg } = Xg.IX2VanillaUtils),
        (Wg = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (On = Wg(({ element: e, nativeEvent: t }) => e === t.target)),
        (jD = Wg(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (Qe = (0, Fg.default)([On, jD])),
        (zg = (e, t) => {
          if (t) {
            let { ixData: n } = e.getState(),
              { events: r } = n,
              o = r[t];
            if (o && !QD[o.eventTypeId]) return o;
          }
          return null;
        }),
        (YD = ({ store: e, event: t }) => {
          let { action: n } = t,
            { autoStopEventId: r } = n.config;
          return !!zg(e, r);
        }),
        (Ce = ({ store: e, event: t, element: n, eventStateKey: r }, o) => {
          let { action: i, id: s } = t,
            { actionListId: a, autoStopEventId: u } = i.config,
            l = zg(e, u);
          return (
            l &&
              jt({
                store: e,
                eventId: u,
                eventTarget: n,
                eventStateKey: u + xg + r.split(xg)[1],
                actionListId: (0, qg.default)(l, "action.config.actionListId"),
              }),
            jt({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            xn({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            o
          );
        }),
        (Xe = (e, t) => (n, r) => e(n, r) === !0 ? t(n, r) : r),
        (wn = { handler: Xe(Qe, Ce) }),
        (Kg = { ...wn, types: [Ko, Hg].join(" ") }),
        (jo = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Cg = "mouseover mouseout"),
        (Yo = { types: jo }),
        (QD = { PAGE_START: Ug, PAGE_FINISH: kg }),
        (Sn = (() => {
          let e = window.pageXOffset !== void 0,
            n =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : n.scrollLeft,
            scrollTop: e ? window.pageYOffset : n.scrollTop,
            stiffScrollTop: (0, Gg.default)(
              e ? window.pageYOffset : n.scrollTop,
              0,
              n.scrollHeight - window.innerHeight
            ),
            scrollWidth: n.scrollWidth,
            scrollHeight: n.scrollHeight,
            clientWidth: n.clientWidth,
            clientHeight: n.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        ($D = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (ZD = ({ element: e, nativeEvent: t }) => {
          let { type: n, target: r, relatedTarget: o } = t,
            i = e.contains(r);
          if (n === "mouseover" && i) return !0;
          let s = e.contains(o);
          return !!(n === "mouseout" && i && s);
        }),
        (JD = (e) => {
          let {
              element: t,
              event: { config: n },
            } = e,
            { clientWidth: r, clientHeight: o } = Sn(),
            i = n.scrollOffsetValue,
            u = n.scrollOffsetUnit === "PX" ? i : (o * (i || 0)) / 100;
          return $D(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: r,
            bottom: o - u,
          });
        }),
        (jg = (e) => (t, n) => {
          let { type: r } = t.nativeEvent,
            o = [Ko, Hg].indexOf(r) !== -1 ? r === Ko : n.isActive,
            i = { ...n, isActive: o };
          return ((!n || i.isActive !== n.isActive) && e(t, i)) || i;
        }),
        (Pg = (e) => (t, n) => {
          let r = { elementHovered: ZD(t) };
          return (
            ((n ? r.elementHovered !== n.elementHovered : r.elementHovered) &&
              e(t, r)) ||
            r
          );
        }),
        (eM = (e) => (t, n) => {
          let r = { ...n, elementVisible: JD(t) };
          return (
            ((n ? r.elementVisible !== n.elementVisible : r.elementVisible) &&
              e(t, r)) ||
            r
          );
        }),
        (Lg =
          (e) =>
          (t, n = {}) => {
            let { stiffScrollTop: r, scrollHeight: o, innerHeight: i } = Sn(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: l } = s,
              g = l === "PX",
              p = o - i,
              d = Number((r / p).toFixed(2));
            if (n && n.percentTop === d) return n;
            let y = (g ? u : (i * (u || 0)) / 100) / p,
              S,
              _,
              A = 0;
            n &&
              ((S = d > n.percentTop),
              (_ = n.scrollingDown !== S),
              (A = _ ? d : n.anchorTop));
            let v = a === Vg ? d >= A + y : d <= A - y,
              O = {
                ...n,
                percentTop: d,
                inBounds: v,
                anchorTop: A,
                scrollingDown: S,
              };
            return (n && v && (_ || O.inBounds !== n.inBounds) && e(t, O)) || O;
          }),
        (tM = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (nM = (e) => (t, n) => {
          let r = { finished: document.readyState === "complete" };
          return r.finished && !(n && n.finshed) && e(t), r;
        }),
        (rM = (e) => (t, n) => {
          let r = { started: !0 };
          return n || e(t), r;
        }),
        (Ng =
          (e) =>
          (t, n = { clickCount: 0 }) => {
            let r = { clickCount: (n.clickCount % 2) + 1 };
            return (r.clickCount !== n.clickCount && e(t, r)) || r;
          }),
        (Pr = (e = !0) => ({
          ...Kg,
          handler: Xe(
            e ? Qe : On,
            jg((t, n) => (n.isActive ? wn.handler(t, n) : n))
          ),
        })),
        (Lr = (e = !0) => ({
          ...Kg,
          handler: Xe(
            e ? Qe : On,
            jg((t, n) => (n.isActive ? n : wn.handler(t, n)))
          ),
        })),
        (Dg = {
          ...Yo,
          handler: eM((e, t) => {
            let { elementVisible: n } = t,
              { event: r, store: o } = e,
              { ixData: i } = o.getState(),
              { events: s } = i;
            return !s[r.action.config.autoStopEventId] && t.triggered
              ? t
              : (r.eventTypeId === Bg) === n
              ? (Ce(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (Mg = 0.05),
        (Yg = {
          [MD]: Pr(),
          [FD]: Lr(),
          [DD]: Pr(),
          [ND]: Lr(),
          [VD]: Pr(!1),
          [XD]: Lr(!1),
          [qD]: Pr(),
          [GD]: Lr(),
          [zD]: { types: "ecommerce-cart-open", handler: Xe(Qe, Ce) },
          [WD]: { types: "ecommerce-cart-close", handler: Xe(Qe, Ce) },
          [wD]: {
            types: "click",
            handler: Xe(
              Qe,
              Ng((e, { clickCount: t }) => {
                YD(e) ? t === 1 && Ce(e) : Ce(e);
              })
            ),
          },
          [xD]: {
            types: "click",
            handler: Xe(
              Qe,
              Ng((e, { clickCount: t }) => {
                t === 2 && Ce(e);
              })
            ),
          },
          [RD]: { ...wn, types: "mousedown" },
          [CD]: { ...wn, types: "mouseup" },
          [PD]: {
            types: Cg,
            handler: Xe(
              Qe,
              Pg((e, t) => {
                t.elementHovered && Ce(e);
              })
            ),
          },
          [LD]: {
            types: Cg,
            handler: Xe(
              Qe,
              Pg((e, t) => {
                t.elementHovered || Ce(e);
              })
            ),
          },
          [BD]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: r,
                eventStateKey: o,
              },
              i = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: l,
                  restingState: g = 0,
                } = n,
                {
                  clientX: p = i.clientX,
                  clientY: d = i.clientY,
                  pageX: y = i.pageX,
                  pageY: S = i.pageY,
                } = r,
                _ = a === "X_AXIS",
                A = r.type === "mouseout",
                v = g / 100,
                O = u,
                T = !1;
              switch (s) {
                case ze.VIEWPORT: {
                  v = _
                    ? Math.min(p, window.innerWidth) / window.innerWidth
                    : Math.min(d, window.innerHeight) / window.innerHeight;
                  break;
                }
                case ze.PAGE: {
                  let {
                    scrollLeft: x,
                    scrollTop: P,
                    scrollWidth: R,
                    scrollHeight: G,
                  } = Sn();
                  v = _ ? Math.min(x + y, R) / R : Math.min(P + S, G) / G;
                  break;
                }
                case ze.ELEMENT:
                default: {
                  O = Rg(o, u);
                  let x = r.type.indexOf("mouse") === 0;
                  if (x && Qe({ element: t, nativeEvent: r }) !== !0) break;
                  let P = t.getBoundingClientRect(),
                    { left: R, top: G, width: X, height: B } = P;
                  if (!x && !tM({ left: p, top: d }, P)) break;
                  (T = !0), (v = _ ? (p - R) / X : (d - G) / B);
                  break;
                }
              }
              return (
                A && (v > 1 - Mg || v < Mg) && (v = Math.round(v)),
                (s !== ze.ELEMENT || T || T !== i.elementHovered) &&
                  ((v = l ? 1 - v : v), e.dispatch(zt(O, v))),
                {
                  elementHovered: T,
                  clientX: p,
                  clientY: d,
                  pageX: y,
                  pageY: S,
                }
              );
            },
          },
          [KD]: {
            types: jo,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: r } = t,
                { scrollTop: o, scrollHeight: i, clientHeight: s } = Sn(),
                a = o / (i - s);
              (a = r ? 1 - a : a), e.dispatch(zt(n, a));
            },
          },
          [HD]: {
            types: jo,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: r },
              o = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: i,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: l,
                } = Sn(),
                {
                  basedOn: g,
                  selectedAxis: p,
                  continuousParameterGroupId: d,
                  startsEntering: y,
                  startsExiting: S,
                  addEndOffset: _,
                  addStartOffset: A,
                  addOffsetValue: v = 0,
                  endOffsetValue: O = 0,
                } = n,
                T = p === "X_AXIS";
              if (g === ze.VIEWPORT) {
                let x = T ? i / a : s / u;
                return (
                  x !== o.scrollPercent && t.dispatch(zt(d, x)),
                  { scrollPercent: x }
                );
              } else {
                let x = Rg(r, d),
                  P = e.getBoundingClientRect(),
                  R = (A ? v : 0) / 100,
                  G = (_ ? O : 0) / 100;
                (R = y ? R : 1 - R), (G = S ? G : 1 - G);
                let X = P.top + Math.min(P.height * R, l),
                  H = P.top + P.height * G - X,
                  j = Math.min(l + H, u),
                  I = Math.min(Math.max(0, l - X), j) / j;
                return (
                  I !== o.scrollPercent && t.dispatch(zt(x, I)),
                  { scrollPercent: I }
                );
              }
            },
          },
          [Bg]: Dg,
          [kD]: Dg,
          [Vg]: {
            ...Yo,
            handler: Lg((e, t) => {
              t.scrollingDown && Ce(e);
            }),
          },
          [UD]: {
            ...Yo,
            handler: Lg((e, t) => {
              t.scrollingDown || Ce(e);
            }),
          },
          [kg]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Xe(On, nM(Ce)),
          },
          [Ug]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Xe(On, rM(Ce)),
          },
        });
    });
  var pE = {};
  Oe(pE, {
    observeRequests: () => bM,
    startActionGroup: () => xn,
    startEngine: () => Gr,
    stopActionGroup: () => jt,
    stopAllActionGroups: () => lE,
    stopEngine: () => Xr,
  });
  function bM(e) {
    _t({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: OM }),
      _t({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: wM }),
      _t({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: xM }),
      _t({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: RM });
  }
  function AM(e) {
    _t({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Xr(e),
          aE({ store: e, elementApi: Ae }),
          Gr({ store: e, allowEvents: !0 }),
          sE();
      },
    });
  }
  function SM(e, t) {
    let n = _t({
      store: e,
      select: ({ ixSession: r }) => r.tick,
      onChange: (r) => {
        t(r), n();
      },
    });
  }
  function OM({ rawData: e, defer: t }, n) {
    let r = () => {
      Gr({ store: n, rawData: e, allowEvents: !0 }), sE();
    };
    t ? setTimeout(r, 0) : r();
  }
  function sE() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function wM(e, t) {
    let {
        actionTypeId: n,
        actionListId: r,
        actionItemId: o,
        eventId: i,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: l = !0,
      } = e,
      { rawData: g } = e;
    if (r && o && g && a) {
      let p = g.actionLists[r];
      p && (g = dM({ actionList: p, actionItemId: o, rawData: g }));
    }
    if (
      (Gr({ store: t, rawData: g, allowEvents: s, testManual: u }),
      (r && n === we.GENERAL_START_ACTION) || $o(n))
    ) {
      jt({ store: t, actionListId: r }),
        cE({ store: t, actionListId: r, eventId: i });
      let p = xn({
        store: t,
        eventId: i,
        actionListId: r,
        immediate: a,
        verbose: l,
      });
      l && p && t.dispatch(Kt({ actionListId: r, isPlaying: !a }));
    }
  }
  function xM({ actionListId: e }, t) {
    e ? jt({ store: t, actionListId: e }) : lE({ store: t }), Xr(t);
  }
  function RM(e, t) {
    Xr(t), aE({ store: t, elementApi: Ae });
  }
  function Gr({ store: e, rawData: t, allowEvents: n, testManual: r }) {
    let { ixSession: o } = e.getState();
    t && e.dispatch(xo(t)),
      o.active ||
        (e.dispatch(
          Ro({
            hasBoundaryNodes: !!document.querySelector(Dr),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        n &&
          (MM(e), CM(), e.getState().ixSession.hasDefinedMediaQueries && AM(e)),
        e.dispatch(Co()),
        PM(e, r));
  }
  function CM() {
    let { documentElement: e } = document;
    e.className.indexOf($g) === -1 && (e.className += ` ${$g}`);
  }
  function PM(e, t) {
    let n = (r) => {
      let { ixSession: o, ixParameters: i } = e.getState();
      o.active &&
        (e.dispatch(Tr(r, i)), t ? SM(e, n) : requestAnimationFrame(n));
    };
    n(window.performance.now());
  }
  function Xr(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: n } = t;
      n.forEach(LM), EM(), e.dispatch(Po());
    }
  }
  function LM({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function NM({
    store: e,
    eventStateKey: t,
    eventTarget: n,
    eventId: r,
    eventConfig: o,
    actionListId: i,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: l, ixSession: g } = e.getState(),
      { events: p } = l,
      d = p[r],
      { eventTypeId: y } = d,
      S = {},
      _ = {},
      A = [],
      { continuousActionGroups: v } = s,
      { id: O } = s;
    pM(y, o) && (O = hM(t, O));
    let T = g.hasBoundaryNodes && n ? An(n, Dr) : null;
    v.forEach((x) => {
      let { keyframe: P, actionItems: R } = x;
      R.forEach((G) => {
        let { actionTypeId: X } = G,
          { target: B } = G.config;
        if (!B) return;
        let H = B.boundaryMode ? T : null,
          j = yM(B) + Zo + X;
        if (((_[j] = DM(_[j], P, G)), !S[j])) {
          S[j] = !0;
          let { config: N } = G;
          Mr({
            config: N,
            event: d,
            eventTarget: n,
            elementRoot: H,
            elementApi: Ae,
          }).forEach((I) => {
            A.push({ element: I, key: j });
          });
        }
      });
    }),
      A.forEach(({ element: x, key: P }) => {
        let R = _[P],
          G = (0, tt.default)(R, "[0].actionItems[0]", {}),
          { actionTypeId: X } = G,
          B = qr(X) ? ea(X)(x, G) : null,
          H = Jo({ element: x, actionItem: G, elementApi: Ae }, B);
        ta({
          store: e,
          element: x,
          eventId: r,
          actionListId: i,
          actionItem: G,
          destination: H,
          continuous: !0,
          parameterId: O,
          actionGroups: R,
          smoothing: a,
          restingValue: u,
          pluginInstance: B,
        });
      });
  }
  function DM(e = [], t, n) {
    let r = [...e],
      o;
    return (
      r.some((i, s) => (i.keyframe === t ? ((o = s), !0) : !1)),
      o == null && ((o = r.length), r.push({ keyframe: t, actionItems: [] })),
      r[o].actionItems.push(n),
      r
    );
  }
  function MM(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: n } = t;
    uE(e),
      (0, Yt.default)(n, (o, i) => {
        let s = Yg[i];
        if (!s) {
          console.warn(`IX2 event type not configured: ${i}`);
          return;
        }
        BM({ logic: s, store: e, events: o });
      });
    let { ixSession: r } = e.getState();
    r.eventListeners.length && qM(e);
  }
  function qM(e) {
    let t = () => {
      uE(e);
    };
    FM.forEach((n) => {
      window.addEventListener(n, t), e.dispatch(Ir(window, [n, t]));
    }),
      t();
  }
  function uE(e) {
    let { ixSession: t, ixData: n } = e.getState(),
      r = window.innerWidth;
    if (r !== t.viewportWidth) {
      let { mediaQueries: o } = n;
      e.dispatch(Fo({ width: r, mediaQueries: o }));
    }
  }
  function BM({ logic: e, store: t, events: n }) {
    kM(n);
    let { types: r, handler: o } = e,
      { ixData: i } = t.getState(),
      { actionLists: s } = i,
      a = GM(n, VM);
    if (!(0, eE.default)(a)) return;
    (0, Yt.default)(a, (p, d) => {
      let y = n[d],
        { action: S, id: _, mediaQueries: A = i.mediaQueryKeys } = y,
        { actionListId: v } = S.config;
      vM(A, i.mediaQueryKeys) || t.dispatch(qo()),
        S.actionTypeId === we.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(y.config) ? y.config : [y.config]).forEach((T) => {
            let { continuousParameterGroupId: x } = T,
              P = (0, tt.default)(s, `${v}.continuousParameterGroups`, []),
              R = (0, Jg.default)(P, ({ id: B }) => B === x),
              G = (T.smoothing || 0) / 100,
              X = (T.restingState || 0) / 100;
            R &&
              p.forEach((B, H) => {
                let j = _ + Zo + H;
                NM({
                  store: t,
                  eventStateKey: j,
                  eventTarget: B,
                  eventId: _,
                  eventConfig: T,
                  actionListId: v,
                  parameterGroup: R,
                  smoothing: G,
                  restingValue: X,
                });
              });
          }),
        (S.actionTypeId === we.GENERAL_START_ACTION || $o(S.actionTypeId)) &&
          cE({ store: t, actionListId: v, eventId: _ });
    });
    let u = (p) => {
        let { ixSession: d } = t.getState();
        XM(a, (y, S, _) => {
          let A = n[S],
            v = d.eventState[_],
            { action: O, mediaQueries: T = i.mediaQueryKeys } = A;
          if (!Fr(T, d.mediaQueryKey)) return;
          let x = (P = {}) => {
            let R = o(
              {
                store: t,
                element: y,
                event: A,
                eventConfig: P,
                nativeEvent: p,
                eventStateKey: _,
              },
              v
            );
            mM(R, v) || t.dispatch(Lo(_, R));
          };
          O.actionTypeId === we.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(A.config) ? A.config : [A.config]).forEach(x)
            : x();
        });
      },
      l = (0, iE.default)(u, TM),
      g = ({ target: p = document, types: d, throttle: y }) => {
        d.split(" ")
          .filter(Boolean)
          .forEach((S) => {
            let _ = y ? l : u;
            p.addEventListener(S, _), t.dispatch(Ir(p, [S, _]));
          });
      };
    Array.isArray(r) ? r.forEach(g) : typeof r == "string" && g(e);
  }
  function kM(e) {
    if (!IM) return;
    let t = {},
      n = "";
    for (let r in e) {
      let { eventTypeId: o, target: i } = e[r],
        s = Xo(i);
      t[s] ||
        ((o === qe.MOUSE_CLICK || o === qe.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (n += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (n) {
      let r = document.createElement("style");
      (r.textContent = n), document.body.appendChild(r);
    }
  }
  function cE({ store: e, actionListId: t, eventId: n }) {
    let { ixData: r, ixSession: o } = e.getState(),
      { actionLists: i, events: s } = r,
      a = s[n],
      u = i[t];
    if (u && u.useFirstGroupAsInitialState) {
      let l = (0, tt.default)(u, "actionItemGroups[0].actionItems", []),
        g = (0, tt.default)(a, "mediaQueries", r.mediaQueryKeys);
      if (!Fr(g, o.mediaQueryKey)) return;
      l.forEach((p) => {
        let { config: d, actionTypeId: y } = p,
          S =
            d?.target?.useEventTarget === !0 && d?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : d,
          _ = Mr({ config: S, event: a, elementApi: Ae }),
          A = qr(y);
        _.forEach((v) => {
          let O = A ? ea(y)(v, p) : null;
          ta({
            destination: Jo({ element: v, actionItem: p, elementApi: Ae }, O),
            immediate: !0,
            store: e,
            element: v,
            eventId: n,
            actionItem: p,
            actionListId: t,
            pluginInstance: O,
          });
        });
      });
    }
  }
  function lE({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, Yt.default)(t, (n) => {
      if (!n.continuous) {
        let { actionListId: r, verbose: o } = n;
        na(n, e), o && e.dispatch(Kt({ actionListId: r, isPlaying: !1 }));
      }
    });
  }
  function jt({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: o,
  }) {
    let { ixInstances: i, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && n ? An(n, Dr) : null;
    (0, Yt.default)(i, (u) => {
      let l = (0, tt.default)(u, "actionItem.config.target.boundaryMode"),
        g = r ? u.eventStateKey === r : !0;
      if (u.actionListId === o && u.eventId === t && g) {
        if (a && l && !Vo(a, u.element)) return;
        na(u, e),
          u.verbose && e.dispatch(Kt({ actionListId: o, isPlaying: !1 }));
      }
    });
  }
  function xn({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: o,
    groupIndex: i = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: l } = e.getState(),
      { events: g } = u,
      p = g[t] || {},
      { mediaQueries: d = u.mediaQueryKeys } = p,
      y = (0, tt.default)(u, `actionLists.${o}`, {}),
      { actionItemGroups: S, useFirstGroupAsInitialState: _ } = y;
    if (!S || !S.length) return !1;
    i >= S.length && (0, tt.default)(p, "config.loop") && (i = 0),
      i === 0 && _ && i++;
    let v =
        (i === 0 || (i === 1 && _)) && $o(p.action?.actionTypeId)
          ? p.config.delay
          : void 0,
      O = (0, tt.default)(S, [i, "actionItems"], []);
    if (!O.length || !Fr(d, l.mediaQueryKey)) return !1;
    let T = l.hasBoundaryNodes && n ? An(n, Dr) : null,
      x = cM(O),
      P = !1;
    return (
      O.forEach((R, G) => {
        let { config: X, actionTypeId: B } = R,
          H = qr(B),
          { target: j } = X;
        if (!j) return;
        let N = j.boundaryMode ? T : null;
        Mr({
          config: X,
          event: p,
          eventTarget: n,
          elementRoot: N,
          elementApi: Ae,
        }).forEach((L, V) => {
          let F = H ? ea(B)(L, R) : null,
            z = H ? _M(B)(L, R) : null;
          P = !0;
          let K = x === G && V === 0,
            ne = lM({ element: L, actionItem: R }),
            me = Jo({ element: L, actionItem: R, elementApi: Ae }, F);
          ta({
            store: e,
            element: L,
            actionItem: R,
            eventId: t,
            eventTarget: n,
            eventStateKey: r,
            actionListId: o,
            groupIndex: i,
            isCarrier: K,
            computedStyle: ne,
            destination: me,
            immediate: s,
            verbose: a,
            pluginInstance: F,
            pluginDuration: z,
            instanceDelay: v,
          });
        });
      }),
      P
    );
  }
  function ta(e) {
    let { store: t, computedStyle: n, ...r } = e,
      {
        element: o,
        actionItem: i,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: l,
        eventId: g,
      } = r,
      p = !u,
      d = sM(),
      { ixElements: y, ixSession: S, ixData: _ } = t.getState(),
      A = aM(y, o),
      { refState: v } = y[A] || {},
      O = Bo(o),
      T = S.reducedMotion && gi[i.actionTypeId],
      x;
    if (T && u)
      switch (_.events[g]?.eventTypeId) {
        case qe.MOUSE_MOVE:
        case qe.MOUSE_MOVE_IN_VIEWPORT:
          x = l;
          break;
        default:
          x = 0.5;
          break;
      }
    let P = fM(o, v, n, i, Ae, a);
    if (
      (t.dispatch(
        No({
          instanceId: d,
          elementId: A,
          origin: P,
          refType: O,
          skipMotion: T,
          skipToValue: x,
          ...r,
        })
      ),
      fE(document.body, "ix2-animation-started", d),
      s)
    ) {
      UM(t, d);
      return;
    }
    _t({ store: t, select: ({ ixInstances: R }) => R[d], onChange: dE }),
      p && t.dispatch(br(d, S.tick));
  }
  function na(e, t) {
    fE(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: n, actionItem: r } = e,
      { ixElements: o } = t.getState(),
      { ref: i, refType: s } = o[n] || {};
    s === oE && gM(i, r, Ae), t.dispatch(Do(e.id));
  }
  function fE(e, t, n) {
    let r = document.createEvent("CustomEvent");
    r.initCustomEvent(t, !0, !0, n), e.dispatchEvent(r);
  }
  function UM(e, t) {
    let { ixParameters: n } = e.getState();
    e.dispatch(br(t, 0)), e.dispatch(Tr(performance.now(), n));
    let { ixInstances: r } = e.getState();
    dE(r[t], e);
  }
  function dE(e, t) {
    let {
        active: n,
        continuous: r,
        complete: o,
        elementId: i,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: l,
        groupIndex: g,
        eventId: p,
        eventTarget: d,
        eventStateKey: y,
        actionListId: S,
        isCarrier: _,
        styleProp: A,
        verbose: v,
        pluginInstance: O,
      } = e,
      { ixData: T, ixSession: x } = t.getState(),
      { events: P } = T,
      R = P && P[p] ? P[p] : {},
      { mediaQueries: G = T.mediaQueryKeys } = R;
    if (Fr(G, x.mediaQueryKey) && (r || n || o)) {
      if (l || (u === oM && o)) {
        t.dispatch(Mo(i, a, l, s));
        let { ixElements: X } = t.getState(),
          { ref: B, refType: H, refState: j } = X[i] || {},
          N = j && j[a];
        (H === oE || qr(a)) && uM(B, j, N, p, s, A, Ae, u, O);
      }
      if (o) {
        if (_) {
          let X = xn({
            store: t,
            eventId: p,
            eventTarget: d,
            eventStateKey: y,
            actionListId: S,
            groupIndex: g + 1,
            verbose: v,
          });
          v && !X && t.dispatch(Kt({ actionListId: S, isPlaying: !1 }));
        }
        na(e, t);
      }
    }
  }
  var Jg,
    tt,
    eE,
    tE,
    nE,
    rE,
    Yt,
    iE,
    Nr,
    iM,
    $o,
    Zo,
    Dr,
    oE,
    oM,
    $g,
    Mr,
    aM,
    Jo,
    _t,
    sM,
    uM,
    aE,
    cM,
    lM,
    fM,
    dM,
    pM,
    hM,
    Fr,
    gM,
    EM,
    yM,
    vM,
    mM,
    qr,
    ea,
    _M,
    Zg,
    IM,
    TM,
    FM,
    GM,
    XM,
    VM,
    Qo = ue(() => {
      "use strict";
      (Jg = te(Hi())),
        (tt = te(ir())),
        (eE = te(Op())),
        (tE = te(Zp())),
        (nE = te(eh())),
        (rE = te(nh())),
        (Yt = te(uh())),
        (iE = te(gh()));
      xe();
      Nr = te(mt());
      Ar();
      Ih();
      Qg();
      (iM = Object.keys(Fn)),
        ($o = (e) => iM.includes(e)),
        ({
          COLON_DELIMITER: Zo,
          BOUNDARY_SELECTOR: Dr,
          HTML_ELEMENT: oE,
          RENDER_GENERAL: oM,
          W_MOD_IX: $g,
        } = _e),
        ({
          getAffectedElements: Mr,
          getElementId: aM,
          getDestinationValues: Jo,
          observeStore: _t,
          getInstanceId: sM,
          renderHTMLElement: uM,
          clearAllStyles: aE,
          getMaxDurationItemIndex: cM,
          getComputedStyle: lM,
          getInstanceOrigin: fM,
          reduceListToGroup: dM,
          shouldNamespaceEventParameter: pM,
          getNamespacedParameterId: hM,
          shouldAllowMediaQuery: Fr,
          cleanupHTMLElement: gM,
          clearObjectCache: EM,
          stringifyTarget: yM,
          mediaQueriesEqual: vM,
          shallowEqual: mM,
        } = Nr.IX2VanillaUtils),
        ({
          isPluginType: qr,
          createPluginInstance: ea,
          getPluginDuration: _M,
        } = Nr.IX2VanillaPlugins),
        (Zg = navigator.userAgent),
        (IM = Zg.match(/iPad/i) || Zg.match(/iPhone/)),
        (TM = 12);
      FM = ["resize", "orientationchange"];
      (GM = (e, t) => (0, tE.default)((0, rE.default)(e, t), nE.default)),
        (XM = (e, t) => {
          (0, Yt.default)(e, (n, r) => {
            n.forEach((o, i) => {
              let s = r + Zo + i;
              t(o, r, s);
            });
          });
        }),
        (VM = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Mr({ config: t, elementApi: Ae });
        });
    });
  var EE = f((ia) => {
    "use strict";
    Object.defineProperty(ia, "__esModule", { value: !0 });
    function HM(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    HM(ia, {
      actions: function () {
        return KM;
      },
      destroy: function () {
        return gE;
      },
      init: function () {
        return $M;
      },
      setEnv: function () {
        return QM;
      },
      store: function () {
        return Vr;
      },
    });
    var WM = di(),
      zM = jM((sp(), ke(ap))),
      ra = (Qo(), ke(pE)),
      KM = YM((Ar(), ke(yh)));
    function jM(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function hE(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (hE = function (r) {
        return r ? n : t;
      })(e);
    }
    function YM(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = hE(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
          var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, i, s)
            : (r[i] = e[i]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var Vr = (0, WM.createStore)(zM.default);
    function QM(e) {
      e() && (0, ra.observeRequests)(Vr);
    }
    function $M(e) {
      gE(), (0, ra.startEngine)({ store: Vr, rawData: e, allowEvents: !0 });
    }
    function gE() {
      (0, ra.stopEngine)(Vr);
    }
  });
  var _E = f((eX, mE) => {
    "use strict";
    var yE = He(),
      vE = EE();
    vE.setEnv(yE.env);
    yE.define(
      "ix2",
      (mE.exports = function () {
        return vE;
      })
    );
  });
  var TE = f((tX, IE) => {
    "use strict";
    var Qt = He();
    Qt.define(
      "links",
      (IE.exports = function (e, t) {
        var n = {},
          r = e(window),
          o,
          i = Qt.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          l = /index\.(html|php)$/,
          g = /\/$/,
          p,
          d;
        n.ready = n.design = n.preview = y;
        function y() {
          (o = i && Qt.env("design")),
            (d = Qt.env("slug") || s.pathname || ""),
            Qt.scroll.off(_),
            (p = []);
          for (var v = document.links, O = 0; O < v.length; ++O) S(v[O]);
          p.length && (Qt.scroll.on(_), _());
        }
        function S(v) {
          if (!v.getAttribute("hreflang")) {
            var O =
              (o && v.getAttribute("href-disabled")) || v.getAttribute("href");
            if (((a.href = O), !(O.indexOf(":") >= 0))) {
              var T = e(v);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var x = e(a.hash);
                x.length && p.push({ link: T, sec: x, active: !1 });
                return;
              }
              if (!(O === "#" || O === "")) {
                var P =
                  a.href === s.href || O === d || (l.test(O) && g.test(d));
                A(T, u, P);
              }
            }
          }
        }
        function _() {
          var v = r.scrollTop(),
            O = r.height();
          t.each(p, function (T) {
            if (!T.link.attr("hreflang")) {
              var x = T.link,
                P = T.sec,
                R = P.offset().top,
                G = P.outerHeight(),
                X = O * 0.5,
                B = P.is(":visible") && R + G - X >= v && R + X <= v + O;
              T.active !== B && ((T.active = B), A(x, u, B));
            }
          });
        }
        function A(v, O, T) {
          var x = v.hasClass(O);
          (T && x) || (!T && !x) || (T ? v.addClass(O) : v.removeClass(O));
        }
        return n;
      })
    );
  });
  var AE = f((nX, bE) => {
    "use strict";
    var Br = He();
    Br.define(
      "scroll",
      (bE.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          n = window.location,
          r = S() ? null : window.history,
          o = e(window),
          i = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (N) {
              window.setTimeout(N, 15);
            },
          u = Br.env("editor") ? ".w-editor-body" : "body",
          l =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          g = 'a[href="#"]',
          p = 'a[href*="#"]:not(.w-tab-link):not(' + g + ")",
          d = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          y = document.createElement("style");
        y.appendChild(document.createTextNode(d));
        function S() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var _ = /^#[a-zA-Z0-9][\w:.-]*$/;
        function A(N) {
          return _.test(N.hash) && N.host + N.pathname === n.host + n.pathname;
        }
        let v =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function O() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            v.matches
          );
        }
        function T(N, I) {
          var L;
          switch (I) {
            case "add":
              (L = N.attr("tabindex")),
                L
                  ? N.attr("data-wf-tabindex-swap", L)
                  : N.attr("tabindex", "-1");
              break;
            case "remove":
              (L = N.attr("data-wf-tabindex-swap")),
                L
                  ? (N.attr("tabindex", L),
                    N.removeAttr("data-wf-tabindex-swap"))
                  : N.removeAttr("tabindex");
              break;
          }
          N.toggleClass("wf-force-outline-none", I === "add");
        }
        function x(N) {
          var I = N.currentTarget;
          if (
            !(
              Br.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(I.className))
            )
          ) {
            var L = A(I) ? I.hash : "";
            if (L !== "") {
              var V = e(L);
              V.length &&
                (N && (N.preventDefault(), N.stopPropagation()),
                P(L, N),
                window.setTimeout(
                  function () {
                    R(V, function () {
                      T(V, "add"),
                        V.get(0).focus({ preventScroll: !0 }),
                        T(V, "remove");
                    });
                  },
                  N ? 0 : 300
                ));
            }
          }
        }
        function P(N) {
          if (
            n.hash !== N &&
            r &&
            r.pushState &&
            !(Br.env.chrome && n.protocol === "file:")
          ) {
            var I = r.state && r.state.hash;
            I !== N && r.pushState({ hash: N }, "", N);
          }
        }
        function R(N, I) {
          var L = o.scrollTop(),
            V = G(N);
          if (L !== V) {
            var F = X(N, L, V),
              z = Date.now(),
              K = function () {
                var ne = Date.now() - z;
                window.scroll(0, B(L, V, ne, F)),
                  ne <= F ? a(K) : typeof I == "function" && I();
              };
            a(K);
          }
        }
        function G(N) {
          var I = e(l),
            L = I.css("position") === "fixed" ? I.outerHeight() : 0,
            V = N.offset().top - L;
          if (N.data("scroll") === "mid") {
            var F = o.height() - L,
              z = N.outerHeight();
            z < F && (V -= Math.round((F - z) / 2));
          }
          return V;
        }
        function X(N, I, L) {
          if (O()) return 0;
          var V = 1;
          return (
            s.add(N).each(function (F, z) {
              var K = parseFloat(z.getAttribute("data-scroll-time"));
              !isNaN(K) && K >= 0 && (V = K);
            }),
            (472.143 * Math.log(Math.abs(I - L) + 125) - 2e3) * V
          );
        }
        function B(N, I, L, V) {
          return L > V ? I : N + (I - N) * H(L / V);
        }
        function H(N) {
          return N < 0.5
            ? 4 * N * N * N
            : (N - 1) * (2 * N - 2) * (2 * N - 2) + 1;
        }
        function j() {
          var { WF_CLICK_EMPTY: N, WF_CLICK_SCROLL: I } = t;
          i.on(I, p, x),
            i.on(N, g, function (L) {
              L.preventDefault();
            }),
            document.head.insertBefore(y, document.head.firstChild);
        }
        return { ready: j };
      })
    );
  });
  var OE = f((rX, SE) => {
    "use strict";
    var ZM = He();
    ZM.define(
      "touch",
      (SE.exports = function (e) {
        var t = {},
          n = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (i) {
            return (
              (i = typeof i == "string" ? e(i).get(0) : i), i ? new r(i) : null
            );
          });
        function r(i) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            l,
            g;
          i.addEventListener("touchstart", p, !1),
            i.addEventListener("touchmove", d, !1),
            i.addEventListener("touchend", y, !1),
            i.addEventListener("touchcancel", S, !1),
            i.addEventListener("mousedown", p, !1),
            i.addEventListener("mousemove", d, !1),
            i.addEventListener("mouseup", y, !1),
            i.addEventListener("mouseout", S, !1);
          function p(A) {
            var v = A.touches;
            (v && v.length > 1) ||
              ((s = !0),
              v ? ((a = !0), (l = v[0].clientX)) : (l = A.clientX),
              (g = l));
          }
          function d(A) {
            if (s) {
              if (a && A.type === "mousemove") {
                A.preventDefault(), A.stopPropagation();
                return;
              }
              var v = A.touches,
                O = v ? v[0].clientX : A.clientX,
                T = O - g;
              (g = O),
                Math.abs(T) > u &&
                  n &&
                  String(n()) === "" &&
                  (o("swipe", A, { direction: T > 0 ? "right" : "left" }), S());
            }
          }
          function y(A) {
            if (s && ((s = !1), a && A.type === "mouseup")) {
              A.preventDefault(), A.stopPropagation(), (a = !1);
              return;
            }
          }
          function S() {
            s = !1;
          }
          function _() {
            i.removeEventListener("touchstart", p, !1),
              i.removeEventListener("touchmove", d, !1),
              i.removeEventListener("touchend", y, !1),
              i.removeEventListener("touchcancel", S, !1),
              i.removeEventListener("mousedown", p, !1),
              i.removeEventListener("mousemove", d, !1),
              i.removeEventListener("mouseup", y, !1),
              i.removeEventListener("mouseout", S, !1),
              (i = null);
          }
          this.destroy = _;
        }
        function o(i, s, a) {
          var u = e.Event(i, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var xE = f((iX, wE) => {
    "use strict";
    var ct = He(),
      JM = Qr(),
      ve = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    ct.define(
      "navbar",
      (wE.exports = function (e, t) {
        var n = {},
          r = e.tram,
          o = e(window),
          i = e(document),
          s = t.debounce,
          a,
          u,
          l,
          g,
          p = ct.env(),
          d = '<div class="w-nav-overlay" data-wf-ignore />',
          y = ".w-nav",
          S = "w--open",
          _ = "w--nav-dropdown-open",
          A = "w--nav-dropdown-toggle-open",
          v = "w--nav-dropdown-list-open",
          O = "w--nav-link-open",
          T = JM.triggers,
          x = e();
        (n.ready = n.design = n.preview = P),
          (n.destroy = function () {
            (x = e()), R(), u && u.length && u.each(H);
          });
        function P() {
          (l = p && ct.env("design")),
            (g = ct.env("editor")),
            (a = e(document.body)),
            (u = i.find(y)),
            u.length && (u.each(B), R(), G());
        }
        function R() {
          ct.resize.off(X);
        }
        function G() {
          ct.resize.on(X);
        }
        function X() {
          u.each(Y);
        }
        function B(h, M) {
          var k = e(M),
            q = e.data(M, y);
          q ||
            (q = e.data(M, y, {
              open: !1,
              el: k,
              config: {},
              selectedIdx: -1,
            })),
            (q.menu = k.find(".w-nav-menu")),
            (q.links = q.menu.find(".w-nav-link")),
            (q.dropdowns = q.menu.find(".w-dropdown")),
            (q.dropdownToggle = q.menu.find(".w-dropdown-toggle")),
            (q.dropdownList = q.menu.find(".w-dropdown-list")),
            (q.button = k.find(".w-nav-button")),
            (q.container = k.find(".w-container")),
            (q.overlayContainerId = "w-nav-overlay-" + h),
            (q.outside = Ve(q));
          var ce = k.find(".w-nav-brand");
          ce &&
            ce.attr("href") === "/" &&
            ce.attr("aria-label") == null &&
            ce.attr("aria-label", "home"),
            q.button.attr("style", "-webkit-user-select: text;"),
            q.button.attr("aria-label") == null &&
              q.button.attr("aria-label", "menu"),
            q.button.attr("role", "button"),
            q.button.attr("tabindex", "0"),
            q.button.attr("aria-controls", q.overlayContainerId),
            q.button.attr("aria-haspopup", "menu"),
            q.button.attr("aria-expanded", "false"),
            q.el.off(y),
            q.button.off(y),
            q.menu.off(y),
            I(q),
            l
              ? (j(q), q.el.on("setting" + y, L(q)))
              : (N(q),
                q.button.on("click" + y, ne(q)),
                q.menu.on("click" + y, "a", me(q)),
                q.button.on("keydown" + y, V(q)),
                q.el.on("keydown" + y, F(q))),
            Y(h, M);
        }
        function H(h, M) {
          var k = e.data(M, y);
          k && (j(k), e.removeData(M, y));
        }
        function j(h) {
          h.overlay && (ae(h, !0), h.overlay.remove(), (h.overlay = null));
        }
        function N(h) {
          h.overlay ||
            ((h.overlay = e(d).appendTo(h.el)),
            h.overlay.attr("id", h.overlayContainerId),
            (h.parent = h.menu.parent()),
            ae(h, !0));
        }
        function I(h) {
          var M = {},
            k = h.config || {},
            q = (M.animation = h.el.attr("data-animation") || "default");
          (M.animOver = /^over/.test(q)),
            (M.animDirect = /left$/.test(q) ? -1 : 1),
            k.animation !== q && h.open && t.defer(K, h),
            (M.easing = h.el.attr("data-easing") || "ease"),
            (M.easing2 = h.el.attr("data-easing2") || "ease");
          var ce = h.el.attr("data-duration");
          (M.duration = ce != null ? Number(ce) : 400),
            (M.docHeight = h.el.attr("data-doc-height")),
            (h.config = M);
        }
        function L(h) {
          return function (M, k) {
            k = k || {};
            var q = o.width();
            I(h),
              k.open === !0 && nt(h, !0),
              k.open === !1 && ae(h, !0),
              h.open &&
                t.defer(function () {
                  q !== o.width() && K(h);
                });
          };
        }
        function V(h) {
          return function (M) {
            switch (M.keyCode) {
              case ve.SPACE:
              case ve.ENTER:
                return ne(h)(), M.preventDefault(), M.stopPropagation();
              case ve.ESCAPE:
                return ae(h), M.preventDefault(), M.stopPropagation();
              case ve.ARROW_RIGHT:
              case ve.ARROW_DOWN:
              case ve.HOME:
              case ve.END:
                return h.open
                  ? (M.keyCode === ve.END
                      ? (h.selectedIdx = h.links.length - 1)
                      : (h.selectedIdx = 0),
                    z(h),
                    M.preventDefault(),
                    M.stopPropagation())
                  : (M.preventDefault(), M.stopPropagation());
            }
          };
        }
        function F(h) {
          return function (M) {
            if (h.open)
              switch (
                ((h.selectedIdx = h.links.index(document.activeElement)),
                M.keyCode)
              ) {
                case ve.HOME:
                case ve.END:
                  return (
                    M.keyCode === ve.END
                      ? (h.selectedIdx = h.links.length - 1)
                      : (h.selectedIdx = 0),
                    z(h),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
                case ve.ESCAPE:
                  return (
                    ae(h),
                    h.button.focus(),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
                case ve.ARROW_LEFT:
                case ve.ARROW_UP:
                  return (
                    (h.selectedIdx = Math.max(-1, h.selectedIdx - 1)),
                    z(h),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
                case ve.ARROW_RIGHT:
                case ve.ARROW_DOWN:
                  return (
                    (h.selectedIdx = Math.min(
                      h.links.length - 1,
                      h.selectedIdx + 1
                    )),
                    z(h),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
              }
          };
        }
        function z(h) {
          if (h.links[h.selectedIdx]) {
            var M = h.links[h.selectedIdx];
            M.focus(), me(M);
          }
        }
        function K(h) {
          h.open && (ae(h, !0), nt(h, !0));
        }
        function ne(h) {
          return s(function () {
            h.open ? ae(h) : nt(h);
          });
        }
        function me(h) {
          return function (M) {
            var k = e(this),
              q = k.attr("href");
            if (!ct.validClick(M.currentTarget)) {
              M.preventDefault();
              return;
            }
            q && q.indexOf("#") === 0 && h.open && ae(h);
          };
        }
        function Ve(h) {
          return (
            h.outside && i.off("click" + y, h.outside),
            function (M) {
              var k = e(M.target);
              (g && k.closest(".w-editor-bem-EditorOverlay").length) ||
                ge(h, k);
            }
          );
        }
        var ge = s(function (h, M) {
          if (h.open) {
            var k = M.closest(".w-nav-menu");
            h.menu.is(k) || ae(h);
          }
        });
        function Y(h, M) {
          var k = e.data(M, y),
            q = (k.collapsed = k.button.css("display") !== "none");
          if ((k.open && !q && !l && ae(k, !0), k.container.length)) {
            var ce = lt(k);
            k.links.each(ce), k.dropdowns.each(ce);
          }
          k.open && $t(k);
        }
        var Ee = "max-width";
        function lt(h) {
          var M = h.container.css(Ee);
          return (
            M === "none" && (M = ""),
            function (k, q) {
              (q = e(q)), q.css(Ee, ""), q.css(Ee) === "none" && q.css(Ee, M);
            }
          );
        }
        function It(h, M) {
          M.setAttribute("data-nav-menu-open", "");
        }
        function ft(h, M) {
          M.removeAttribute("data-nav-menu-open");
        }
        function nt(h, M) {
          if (h.open) return;
          (h.open = !0),
            h.menu.each(It),
            h.links.addClass(O),
            h.dropdowns.addClass(_),
            h.dropdownToggle.addClass(A),
            h.dropdownList.addClass(v),
            h.button.addClass(S);
          var k = h.config,
            q = k.animation;
          (q === "none" || !r.support.transform || k.duration <= 0) && (M = !0);
          var ce = $t(h),
            Zt = h.menu.outerHeight(!0),
            dt = h.menu.outerWidth(!0),
            c = h.el.height(),
            E = h.el[0];
          if (
            (Y(0, E),
            T.intro(0, E),
            ct.redraw.up(),
            l || i.on("click" + y, h.outside),
            M)
          ) {
            C();
            return;
          }
          var m = "transform " + k.duration + "ms " + k.easing;
          if (
            (h.overlay &&
              ((x = h.menu.prev()), h.overlay.show().append(h.menu)),
            k.animOver)
          ) {
            r(h.menu)
              .add(m)
              .set({ x: k.animDirect * dt, height: ce })
              .start({ x: 0 })
              .then(C),
              h.overlay && h.overlay.width(dt);
            return;
          }
          var b = c + Zt;
          r(h.menu).add(m).set({ y: -b }).start({ y: 0 }).then(C);
          function C() {
            h.button.attr("aria-expanded", "true");
          }
        }
        function $t(h) {
          var M = h.config,
            k = M.docHeight ? i.height() : a.height();
          return (
            M.animOver
              ? h.menu.height(k)
              : h.el.css("position") !== "fixed" && (k -= h.el.outerHeight(!0)),
            h.overlay && h.overlay.height(k),
            k
          );
        }
        function ae(h, M) {
          if (!h.open) return;
          (h.open = !1), h.button.removeClass(S);
          var k = h.config;
          if (
            ((k.animation === "none" ||
              !r.support.transform ||
              k.duration <= 0) &&
              (M = !0),
            T.outro(0, h.el[0]),
            i.off("click" + y, h.outside),
            M)
          ) {
            r(h.menu).stop(), E();
            return;
          }
          var q = "transform " + k.duration + "ms " + k.easing2,
            ce = h.menu.outerHeight(!0),
            Zt = h.menu.outerWidth(!0),
            dt = h.el.height();
          if (k.animOver) {
            r(h.menu)
              .add(q)
              .start({ x: Zt * k.animDirect })
              .then(E);
            return;
          }
          var c = dt + ce;
          r(h.menu).add(q).start({ y: -c }).then(E);
          function E() {
            h.menu.height(""),
              r(h.menu).set({ x: 0, y: 0 }),
              h.menu.each(ft),
              h.links.removeClass(O),
              h.dropdowns.removeClass(_),
              h.dropdownToggle.removeClass(A),
              h.dropdownList.removeClass(v),
              h.overlay &&
                h.overlay.children().length &&
                (x.length ? h.menu.insertAfter(x) : h.menu.prependTo(h.parent),
                h.overlay.attr("style", "").hide()),
              h.el.triggerHandler("w-close"),
              h.button.attr("aria-expanded", "false");
          }
        }
        return n;
      })
    );
  });
  aa();
  sa();
  _a();
  Ta();
  Aa();
  wa();
  Qr();
  _E();
  TE();
  AE();
  OE();
  xE();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|52e3300e-5313-1364-18eb-90a470090417",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|52e3300e-5313-1364-18eb-90a470090417",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1691593780960,
    },
    "e-4": {
      id: "e-4",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-5",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|5aa940da-5ba8-2135-c97c-538ec1e9c528",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|5aa940da-5ba8-2135-c97c-538ec1e9c528",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 45,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692275488728,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|bb1008a2-ab1d-0c89-f681-7cb6158a62d0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|bb1008a2-ab1d-0c89-f681-7cb6158a62d0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692275974828,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-9",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|3bb15278-2396-5368-e1f3-4b76da0c9c0a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|3bb15278-2396-5368-e1f3-4b76da0c9c0a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692281003354,
    },
    "e-12": {
      id: "e-12",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-13",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|5de1ae64-40bf-9042-c8ee-87156738ecd2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|5de1ae64-40bf-9042-c8ee-87156738ecd2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 30,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692347915214,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-17",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|f3f19ab7-8432-26f8-41a8-2f3b9633b557",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|f3f19ab7-8432-26f8-41a8-2f3b9633b557",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 30,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692370051511,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-19",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|2bd433ad-b3a1-3441-9ee9-626dc954c41b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|2bd433ad-b3a1-3441-9ee9-626dc954c41b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 30,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692370147822,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-21",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|8c22386d-5817-a17a-a789-dc43cd8ecd7e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|8c22386d-5817-a17a-a789-dc43cd8ecd7e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692377595408,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-23",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|f6b8f8ab-ceff-10e4-1c6d-14a52558370b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|f6b8f8ab-ceff-10e4-1c6d-14a52558370b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692637408064,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650057f73744d6f9a46e25b1|f6b8f8ab-ceff-10e4-1c6d-14a52558370b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650057f73744d6f9a46e25b1|f6b8f8ab-ceff-10e4-1c6d-14a52558370b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692637408065,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Jellyfish",
      continuousParameterGroups: [
        {
          id: "a-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-n-11",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: 0.6,
                    yValue: 0.6,
                    locked: true,
                  },
                },
                {
                  id: "a-n-16",
                  actionTypeId: "STYLE_FILTER",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    filters: [
                      { type: "blur", filterId: "6a18", value: 45, unit: "px" },
                    ],
                  },
                },
              ],
            },
            {
              keyframe: 47,
              actionItems: [
                {
                  id: "a-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: 20,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 49,
              actionItems: [
                {
                  id: "a-n-12",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "easeOut",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-n-13",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "easeOut",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: 0.6,
                    yValue: 0.6,
                    locked: true,
                  },
                },
                {
                  id: "a-n-3",
                  actionTypeId: "STYLE_FILTER",
                  config: {
                    delay: 0,
                    easing: "easeOut",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    filters: [
                      { type: "blur", filterId: "204d", value: 12, unit: "px" },
                    ],
                  },
                },
              ],
            },
            {
              keyframe: 55,
              actionItems: [
                {
                  id: "a-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-n-4",
                  actionTypeId: "STYLE_FILTER",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    filters: [
                      { type: "blur", filterId: "26be", value: 0, unit: "px" },
                    ],
                  },
                },
              ],
            },
            {
              keyframe: 60,
              actionItems: [
                {
                  id: "a-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: -10,
                    yValue: 40,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 79,
              actionItems: [
                {
                  id: "a-n-7",
                  actionTypeId: "STYLE_FILTER",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    filters: [
                      { type: "blur", filterId: "5fdd", value: 0, unit: "px" },
                    ],
                  },
                },
                {
                  id: "a-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-n-15",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-n-17",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: -5,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 85,
              actionItems: [
                {
                  id: "a-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-n-8",
                  actionTypeId: "STYLE_FILTER",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    filters: [
                      { type: "blur", filterId: "070d", value: 12, unit: "px" },
                    ],
                  },
                },
                {
                  id: "a-n-14",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      selector: ".fwd-video-jellyfish",
                      selectorGuids: ["9e536a37-f7d4-8fb9-5691-77c18c9993c2"],
                    },
                    xValue: 0.8,
                    yValue: 0.8,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1691593788345,
    },
    "a-4": {
      id: "a-4",
      title: "Services Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "650057f73744d6f9a46e25b1|a66a3bf2-123f-42c2-77c0-7b3417594c23",
                },
                xValue: -80,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-4-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "650057f73744d6f9a46e25b1|a66a3bf2-123f-42c2-77c0-7b3417594c23",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-4-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|5e27d9fb-2c7d-28ee-8f50-551f4363222c",
                },
                xValue: 80,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-4-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|5e27d9fb-2c7d-28ee-8f50-551f4363222c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {
                  id: "650057f73744d6f9a46e25b1|a66a3bf2-123f-42c2-77c0-7b3417594c23",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-4-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {
                  id: "650057f73744d6f9a46e25b1|a66a3bf2-123f-42c2-77c0-7b3417594c23",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-4-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|5e27d9fb-2c7d-28ee-8f50-551f4363222c",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-4-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|5e27d9fb-2c7d-28ee-8f50-551f4363222c",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692275497808,
    },
    "a-5": {
      id: "a-5",
      title: "Hero Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|4305eb7b-1b28-5673-d211-213bca3af05f",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|c95c91a6-cf43-0fc7-d98c-1f61d2ad6128",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeOut",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|c95c91a6-cf43-0fc7-d98c-1f61d2ad6128",
                },
                yValue: 25,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "650057f73744d6f9a46e25b1|06472505-86ce-f394-805f-dc25bd4004e0",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".fwd-hero-info-wrapper.fwd-hide-on-menu",
                  selectorGuids: [
                    "f531c302-e3b1-452f-ff5e-68f978b7c7c2",
                    "03af742e-6ad6-79be-cb61-920736473a7e",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-15",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".fwd-svg-element",
                  selectorGuids: ["b6f66731-ad15-1d6a-c7b6-efd8a8894dca"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-arrow-down",
                  selectorGuids: ["8b5d20d3-8b26-5efa-9730-0754a21da31d"],
                },
                yValue: -15,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-30",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-link.nav-about",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "fb2026b4-c803-0f1c-abd1-d3ef53c2529b",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-23",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-link.nav-services",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "9a698c5a-4084-b9db-f85d-33c65c5c8ae8",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-24",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-link.nav-team",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "c86721b7-f1c9-5f91-dbe1-fb7fd4a8fa40",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-25",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".nav-link.nav-contact",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "6a1bae2b-e5dc-fd89-7d77-089df9fec3e9",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-31",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".navbar",
                  selectorGuids: ["f3238399-36be-05dc-52b4-d0bb5dc4b447"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-32",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-info-text.fwd-text-effect",
                  selectorGuids: [
                    "0d31d3d8-7847-0c01-4995-a4fa1a8d88c7",
                    "ce978f0b-6249-b62d-8700-1573cafa1f89",
                  ],
                },
                yValue: -8,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-34",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-info-img-wrapper",
                  selectorGuids: ["a4b6feaa-f4bf-a0d4-986a-34fbe51c991e"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 800,
                easing: "ease",
                duration: 750,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|4305eb7b-1b28-5673-d211-213bca3af05f",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 800,
                easing: "ease",
                duration: 750,
                target: {
                  id: "650057f73744d6f9a46e25b1|06472505-86ce-f394-805f-dc25bd4004e0",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-26",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 800,
                easing: "ease",
                duration: 100,
                target: {
                  selector: ".nav-link.nav-about",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "fb2026b4-c803-0f1c-abd1-d3ef53c2529b",
                  ],
                },
                value: 0.8,
                unit: "",
              },
            },
            {
              id: "a-5-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 850,
                easing: "ease",
                duration: 750,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|c95c91a6-cf43-0fc7-d98c-1f61d2ad6128",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 850,
                easing: "ease",
                duration: 750,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "650057f73744d6f9a46e25b1|c95c91a6-cf43-0fc7-d98c-1f61d2ad6128",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-27",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 980,
                easing: "ease",
                duration: 100,
                target: {
                  selector: ".nav-link.nav-services",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "9a698c5a-4084-b9db-f85d-33c65c5c8ae8",
                  ],
                },
                value: 0.8,
                unit: "",
              },
            },
            {
              id: "a-5-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1000,
                easing: "ease",
                duration: 800,
                target: {
                  selector: ".fwd-hero-info-wrapper.fwd-hide-on-menu",
                  selectorGuids: [
                    "f531c302-e3b1-452f-ff5e-68f978b7c7c2",
                    "03af742e-6ad6-79be-cb61-920736473a7e",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-28",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1080,
                easing: "ease",
                duration: 100,
                target: {
                  selector: ".nav-link.nav-team",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "c86721b7-f1c9-5f91-dbe1-fb7fd4a8fa40",
                  ],
                },
                value: 0.8,
                unit: "",
              },
            },
            {
              id: "a-5-n-33",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "ease",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-info-text.fwd-text-effect",
                  selectorGuids: [
                    "0d31d3d8-7847-0c01-4995-a4fa1a8d88c7",
                    "ce978f0b-6249-b62d-8700-1573cafa1f89",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-29",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1230,
                easing: "ease",
                duration: 100,
                target: {
                  selector: ".nav-link.nav-contact",
                  selectorGuids: [
                    "bf8a4d9d-b81a-d9f2-82ae-4713391c4421",
                    "6a1bae2b-e5dc-fd89-7d77-089df9fec3e9",
                  ],
                },
                value: 0.8,
                unit: "",
              },
            },
            {
              id: "a-5-n-35",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1280,
                easing: "easeOut",
                duration: 800,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-info-img-wrapper",
                  selectorGuids: ["a4b6feaa-f4bf-a0d4-986a-34fbe51c991e"],
                },
                yValue: 14,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-16",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 800,
                target: {
                  selector: ".fwd-svg-element",
                  selectorGuids: ["b6f66731-ad15-1d6a-c7b6-efd8a8894dca"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-5-n-36",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 50,
                easing: "ease",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-info-img-wrapper",
                  selectorGuids: ["a4b6feaa-f4bf-a0d4-986a-34fbe51c991e"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692275979685,
    },
    "a-6": {
      id: "a-6",
      title: "Floating",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 4200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-5",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "1cdbe265-94a8-c56e-0108-d2cb96d0bbe0",
                  ],
                },
                xValue: -18,
                yValue: 50,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 10,
                easing: "ease",
                duration: 6000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-8",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "8d9bc615-ad52-6c8b-0af1-fb67423ebd60",
                  ],
                },
                xValue: -10,
                yValue: -21,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "ease",
                duration: 4200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-2",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "c43b3848-e02a-8804-2a96-49096b03697e",
                  ],
                },
                xValue: 20,
                yValue: 45,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: "ease",
                duration: 4000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-3",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "d51e7630-dcef-b07b-5334-32dcac6d798f",
                  ],
                },
                xValue: -28,
                yValue: -14,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: "ease",
                duration: 5100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-4",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "dcf6cb30-7057-92c6-6b4a-d4b94abe7dd1",
                  ],
                },
                xValue: -35,
                yValue: 30,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "",
                duration: 4000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-6",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "f3450ff5-0678-a54e-36c3-723c1401eb96",
                  ],
                },
                xValue: 24,
                yValue: -8,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 600,
                easing: "ease",
                duration: 3800,
                target: {
                  selector: ".fwd-team-member-c.fwd-floatie-1",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "78650962-3140-9aeb-6a0f-d2bae703cb40",
                  ],
                },
                xValue: -45,
                yValue: 50,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 600,
                easing: "ease",
                duration: 4200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-7",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "b1e2122e-479f-a9df-c922-8abe1439307d",
                  ],
                },
                xValue: -35,
                yValue: 35,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-6-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 5000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-4",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "dcf6cb30-7057-92c6-6b4a-d4b94abe7dd1",
                  ],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 5400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-6",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "f3450ff5-0678-a54e-36c3-723c1401eb96",
                  ],
                },
                xValue: -8,
                yValue: 24,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 2500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-8",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "8d9bc615-ad52-6c8b-0af1-fb67423ebd60",
                  ],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 10,
                easing: "ease",
                duration: 4800,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-7",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "b1e2122e-479f-a9df-c922-8abe1439307d",
                  ],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "ease",
                duration: 4900,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-3",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "d51e7630-dcef-b07b-5334-32dcac6d798f",
                  ],
                },
                xValue: 12,
                yValue: 30,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "ease",
                duration: 3900,
                target: {
                  selector: ".fwd-team-member-c.fwd-floatie-1",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "78650962-3140-9aeb-6a0f-d2bae703cb40",
                  ],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 600,
                easing: "ease",
                duration: 5000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-5",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "1cdbe265-94a8-c56e-0108-d2cb96d0bbe0",
                  ],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "ease",
                duration: 4100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".fwd-team-member-c.fwd-floatie-2",
                  selectorGuids: [
                    "c915f79e-1063-a0e5-fa27-3724d4059744",
                    "c43b3848-e02a-8804-2a96-49096b03697e",
                  ],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692281026082,
    },
    "a-8": {
      id: "a-8",
      title: "Sea Bottom Section Reveal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".fwd-footer-bottom.fwd-hide-on-menu",
                  selectorGuids: [
                    "f25634f0-54ce-34d5-5325-fd73af7bbb3f",
                    "47af108b-0728-8c01-57a3-2b0f3fe7c335",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-8-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1000,
                easing: "ease",
                duration: 1200,
                target: {
                  selector: ".fwd-footer-bottom.fwd-hide-on-menu",
                  selectorGuids: [
                    "f25634f0-54ce-34d5-5325-fd73af7bbb3f",
                    "47af108b-0728-8c01-57a3-2b0f3fe7c335",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692347939750,
    },
    "a-9": {
      id: "a-9",
      title: "Header Slide Left",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "650057f73744d6f9a46e25b1|f3f19ab7-8432-26f8-41a8-2f3b9633b557",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-9-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {},
                xValue: -25,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-9-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {
                  id: "650057f73744d6f9a46e25b1|f3f19ab7-8432-26f8-41a8-2f3b9633b557",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-9-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {},
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692370064125,
    },
    "a-10": {
      id: "a-10",
      title: "Header Slide Right",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650057f73744d6f9a46e25b1|2bd433ad-b3a1-3441-9ee9-626dc954c41b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-10-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {},
                xValue: 25,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-10-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {
                  selector: ".fwd-large-heading-container.fwd-align-right",
                  selectorGuids: [
                    "c1efddd7-50b9-ff17-949c-e95a607144b2",
                    "ec7ed1aa-3c44-f16d-991e-284e70464957",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-10-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 1000,
                target: {},
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692370064125,
    },
    "a-11": {
      id: "a-11",
      title: "Floating Arrow",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: "ease",
                duration: 1200,
                target: {
                  useEventTarget: true,
                  id: "650057f73744d6f9a46e25b1|8c22386d-5817-a17a-a789-dc43cd8ecd7e",
                },
                yValue: 10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "ease",
                duration: 1600,
                target: {
                  useEventTarget: true,
                  id: "650057f73744d6f9a46e25b1|8c22386d-5817-a17a-a789-dc43cd8ecd7e",
                },
                yValue: -2,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692377624585,
    },
    "a-2": {
      id: "a-2",
      title: "Hamburger Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hamburger-menu-bar.top",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa7",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-2-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hamburger-menu-bar.top",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa7",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hamburger-menu-bar.bottom",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa8",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-2-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hamburger-menu-bar.bottom",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa8",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-menu",
                  selectorGuids: ["4a009483-000a-2591-8e19-411e53e0f5ae"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".hamburger-menu-bar.top",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa7",
                  ],
                },
                zValue: 135,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-2-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".hamburger-menu-bar.top",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa7",
                  ],
                },
                yValue: 6,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hamburger-menu-bar.bottom",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa8",
                  ],
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-2-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hamburger-menu-bar.bottom",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa8",
                  ],
                },
                yValue: -2,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 350,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-menu",
                  selectorGuids: ["4a009483-000a-2591-8e19-411e53e0f5ae"],
                },
                value: 0.99,
                unit: "",
              },
            },
            {
              id: "a-2-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 10,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-menu",
                  selectorGuids: ["4a009483-000a-2591-8e19-411e53e0f5ae"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691671686213,
    },
    "a-3": {
      id: "a-3",
      title: "Hamburger Closes",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".hamburger-menu-bar.top",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa7",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-3-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".hamburger-menu-bar.top",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa7",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-3-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hamburger-menu-bar.bottom",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa8",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-3-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hamburger-menu-bar.bottom",
                  selectorGuids: [
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa6",
                    "e92b6514-7bdd-a36f-d97b-ef36a9933aa8",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-3-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-menu",
                  selectorGuids: ["4a009483-000a-2591-8e19-411e53e0f5ae"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-3-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 10,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-menu",
                  selectorGuids: ["4a009483-000a-2591-8e19-411e53e0f5ae"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691671686213,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
