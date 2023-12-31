"undefined" != typeof exports && (exports = void 0),
    (function (t, e) {
        (t = "undefined" != typeof globalThis ? globalThis : t || self).jarallax = (function () {
            "use strict";
            function t(t) {
                "complete" === document.readyState || "interactive" === document.readyState ? t() : document.addEventListener("DOMContentLoaded", t, { capture: !0, once: !0, passive: !0 });
            }
            let e;
            var i = (e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}),
                a = {
                    type: "scroll",
                    speed: 0.5,
                    containerClass: "jarallax-container",
                    imgSrc: null,
                    imgElement: ".jarallax-img",
                    imgSize: "cover",
                    imgPosition: "50% 50%",
                    imgRepeat: "no-repeat",
                    keepImg: !1,
                    elementInViewport: null,
                    zIndex: -100,
                    disableParallax: !1,
                    onScroll: null,
                    onInit: null,
                    onDestroy: null,
                    onCoverImage: null,
                    videoClass: "jarallax-video",
                    videoSrc: null,
                    videoStartTime: 0,
                    videoEndTime: 0,
                    videoVolume: 0,
                    videoLoop: !0,
                    videoPlayOnlyVisible: !0,
                    videoLazyLoading: !0,
                    disableVideo: !1,
                    onVideoInsert: null,
                    onVideoWorkerInit: null,
                };
            const { navigator: n } = i,
                o = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n.userAgent);
            let s, r, d;
            function l() {
                (s = i.innerWidth || document.documentElement.clientWidth),
                    o
                        ? (!d && document.body && (((d = document.createElement("div")).style.cssText = "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;"), document.body.appendChild(d)),
                          (r = (d ? d.clientHeight : 0) || i.innerHeight || document.documentElement.clientHeight))
                        : (r = i.innerHeight || document.documentElement.clientHeight);
            }
            function c() {
                return { width: s, height: r };
            }
            l(),
                i.addEventListener("resize", l),
                i.addEventListener("orientationchange", l),
                i.addEventListener("load", l),
                t(() => {
                    l();
                });
            const u = [];
            function f() {
                if (!u.length) return;
                const { width: t, height: e } = c();
                u.forEach((i, a) => {
                    const { instance: n, oldData: o } = i;
                    if (!n.isVisible()) return;
                    const s = n.$item.getBoundingClientRect(),
                        r = { width: s.width, height: s.height, top: s.top, bottom: s.bottom, wndW: t, wndH: e },
                        d = !o || o.wndW !== r.wndW || o.wndH !== r.wndH || o.width !== r.width || o.height !== r.height,
                        l = d || !o || o.top !== r.top || o.bottom !== r.bottom;
                    (u[a].oldData = r), d && n.onResize(), l && n.onScroll();
                }),
                    i.requestAnimationFrame(f);
            }
            const p = new i.IntersectionObserver(
                    (t) => {
                        t.forEach((t) => {
                            t.target.jarallax.isElementInViewport = t.isIntersecting;
                        });
                    },
                    { rootMargin: "50px" }
                ),
                { navigator: h } = i;
            let m = 0;
            class g {
                constructor(t, e) {
                    const i = this;
                    (i.instanceID = m), (m += 1), (i.$item = t), (i.defaults = { ...a });
                    const n = i.$item.dataset || {},
                        o = {};
                    if (
                        (Object.keys(n).forEach((t) => {
                            const e = t.substr(0, 1).toLowerCase() + t.substr(1);
                            e && void 0 !== i.defaults[e] && (o[e] = n[t]);
                        }),
                        (i.options = i.extend({}, i.defaults, o, e)),
                        (i.pureOptions = i.extend({}, i.options)),
                        Object.keys(i.options).forEach((t) => {
                            "true" === i.options[t] ? (i.options[t] = !0) : "false" === i.options[t] && (i.options[t] = !1);
                        }),
                        (i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed)))),
                        "string" == typeof i.options.disableParallax && (i.options.disableParallax = new RegExp(i.options.disableParallax)),
                        i.options.disableParallax instanceof RegExp)
                    ) {
                        const t = i.options.disableParallax;
                        i.options.disableParallax = () => t.test(h.userAgent);
                    }
                    if (
                        ("function" != typeof i.options.disableParallax && (i.options.disableParallax = () => !1),
                        "string" == typeof i.options.disableVideo && (i.options.disableVideo = new RegExp(i.options.disableVideo)),
                        i.options.disableVideo instanceof RegExp)
                    ) {
                        const t = i.options.disableVideo;
                        i.options.disableVideo = () => t.test(h.userAgent);
                    }
                    "function" != typeof i.options.disableVideo && (i.options.disableVideo = () => !1);
                    let s = i.options.elementInViewport;
                    s && "object" == typeof s && void 0 !== s.length && ([s] = s),
                        s instanceof Element || (s = null),
                        (i.options.elementInViewport = s),
                        (i.image = { src: i.options.imgSrc || null, $container: null, useImgTag: !1, position: "fixed" }),
                        i.initImg() && i.canInitParallax() && i.init();
                }
                css(t, e) {
                    return (function (t, e) {
                        return "string" == typeof e
                            ? i.getComputedStyle(t).getPropertyValue(e)
                            : (Object.keys(e).forEach((i) => {
                                  t.style[i] = e[i];
                              }),
                              t);
                    })(t, e);
                }
                extend(t, ...e) {
                    return (function (t, ...e) {
                        return (
                            (t = t || {}),
                            Object.keys(e).forEach((i) => {
                                e[i] &&
                                    Object.keys(e[i]).forEach((a) => {
                                        t[a] = e[i][a];
                                    });
                            }),
                            t
                        );
                    })(t, ...e);
                }
                getWindowData() {
                    const { width: t, height: e } = c();
                    return { width: t, height: e, y: document.documentElement.scrollTop };
                }
                initImg() {
                    const t = this;
                    let e = t.options.imgElement;
                    return (
                        e && "string" == typeof e && (e = t.$item.querySelector(e)),
                        e instanceof Element || (t.options.imgSrc ? ((e = new Image()).src = t.options.imgSrc) : (e = null)),
                        e && (t.options.keepImg ? (t.image.$item = e.cloneNode(!0)) : ((t.image.$item = e), (t.image.$itemParent = e.parentNode)), (t.image.useImgTag = !0)),
                        !(
                            !t.image.$item &&
                            (null === t.image.src && ((t.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), (t.image.bgImage = t.css(t.$item, "background-image"))),
                            !t.image.bgImage || "none" === t.image.bgImage)
                        )
                    );
                }
                canInitParallax() {
                    return !this.options.disableParallax();
                }
                init() {
                    const t = this,
                        e = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" };
                    let a = { pointerEvents: "none", transformStyle: "preserve-3d", backfaceVisibility: "hidden" };
                    if (!t.options.keepImg) {
                        const e = t.$item.getAttribute("style");
                        if ((e && t.$item.setAttribute("data-jarallax-original-styles", e), t.image.useImgTag)) {
                            const e = t.image.$item.getAttribute("style");
                            e && t.image.$item.setAttribute("data-jarallax-original-styles", e);
                        }
                    }
                    if (
                        ("static" === t.css(t.$item, "position") && t.css(t.$item, { position: "relative" }),
                        "auto" === t.css(t.$item, "z-index") && t.css(t.$item, { zIndex: 0 }),
                        (t.image.$container = document.createElement("div")),
                        t.css(t.image.$container, e),
                        t.css(t.image.$container, { "z-index": t.options.zIndex }),
                        "fixed" === this.image.position && t.css(t.image.$container, { "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }),
                        t.image.$container.setAttribute("id", `jarallax-container-${t.instanceID}`),
                        t.options.containerClass && t.image.$container.setAttribute("class", t.options.containerClass),
                        t.$item.appendChild(t.image.$container),
                        t.image.useImgTag
                            ? (a = t.extend({ "object-fit": t.options.imgSize, "object-position": t.options.imgPosition, "max-width": "none" }, e, a))
                            : ((t.image.$item = document.createElement("div")),
                              t.image.src &&
                                  (a = t.extend(
                                      { "background-position": t.options.imgPosition, "background-size": t.options.imgSize, "background-repeat": t.options.imgRepeat, "background-image": t.image.bgImage || `url("${t.image.src}")` },
                                      e,
                                      a
                                  ))),
                        ("opacity" !== t.options.type && "scale" !== t.options.type && "scale-opacity" !== t.options.type && 1 !== t.options.speed) || (t.image.position = "absolute"),
                        "fixed" === t.image.position)
                    ) {
                        const e = (function (t) {
                            const e = [];
                            for (; null !== t.parentElement; ) 1 === (t = t.parentElement).nodeType && e.push(t);
                            return e;
                        })(t.$item).filter((t) => {
                            const e = i.getComputedStyle(t),
                                a = e["-webkit-transform"] || e["-moz-transform"] || e.transform;
                            return (a && "none" !== a) || /(auto|scroll)/.test(e.overflow + e["overflow-y"] + e["overflow-x"]);
                        });
                        t.image.position = e.length ? "absolute" : "fixed";
                    }
                    var n;
                    (a.position = t.image.position),
                        t.css(t.image.$item, a),
                        t.image.$container.appendChild(t.image.$item),
                        t.onResize(),
                        t.onScroll(!0),
                        t.options.onInit && t.options.onInit.call(t),
                        "none" !== t.css(t.$item, "background-image") && t.css(t.$item, { "background-image": "none" }),
                        (n = t),
                        u.push({ instance: n }),
                        1 === u.length && i.requestAnimationFrame(f),
                        p.observe(n.options.elementInViewport || n.$item);
                }
                destroy() {
                    const t = this;
                    var e;
                    (e = t),
                        u.forEach((t, i) => {
                            t.instance.instanceID === e.instanceID && u.splice(i, 1);
                        }),
                        p.unobserve(e.options.elementInViewport || e.$item);
                    const i = t.$item.getAttribute("data-jarallax-original-styles");
                    if ((t.$item.removeAttribute("data-jarallax-original-styles"), i ? t.$item.setAttribute("style", i) : t.$item.removeAttribute("style"), t.image.useImgTag)) {
                        const e = t.image.$item.getAttribute("data-jarallax-original-styles");
                        t.image.$item.removeAttribute("data-jarallax-original-styles"),
                            e ? t.image.$item.setAttribute("style", i) : t.image.$item.removeAttribute("style"),
                            t.image.$itemParent && t.image.$itemParent.appendChild(t.image.$item);
                    }
                    t.image.$container && t.image.$container.parentNode.removeChild(t.image.$container), t.options.onDestroy && t.options.onDestroy.call(t), delete t.$item.jarallax;
                }
                coverImage() {
                    const t = this,
                        { height: e } = c(),
                        i = t.image.$container.getBoundingClientRect(),
                        a = i.height,
                        { speed: n } = t.options,
                        o = "scroll" === t.options.type || "scroll-opacity" === t.options.type;
                    let s = 0,
                        r = a,
                        d = 0;
                    return (
                        o && (n < 0 ? ((s = n * Math.max(a, e)), e < a && (s -= n * (a - e))) : (s = n * (a + e)), n > 1 ? (r = Math.abs(s - e)) : n < 0 ? (r = s / n + Math.abs(s)) : (r += (e - a) * (1 - n)), (s /= 2)),
                        (t.parallaxScrollDistance = s),
                        (d = o ? (e - r) / 2 : (a - r) / 2),
                        t.css(t.image.$item, { height: `${r}px`, marginTop: `${d}px`, left: "fixed" === t.image.position ? `${i.left}px` : "0", width: `${i.width}px` }),
                        t.options.onCoverImage && t.options.onCoverImage.call(t),
                        { image: { height: r, marginTop: d }, container: i }
                    );
                }
                isVisible() {
                    return this.isElementInViewport || !1;
                }
                onScroll(t) {
                    const e = this;
                    if (!t && !e.isVisible()) return;
                    const { height: i } = c(),
                        a = e.$item.getBoundingClientRect(),
                        n = a.top,
                        o = a.height,
                        s = {},
                        r = Math.max(0, n),
                        d = Math.max(0, o + n),
                        l = Math.max(0, -n),
                        u = Math.max(0, n + o - i),
                        f = Math.max(0, o - (n + o - i)),
                        p = Math.max(0, -n + i - o),
                        h = 1 - ((i - n) / (i + o)) * 2;
                    let m = 1;
                    if (
                        (o < i ? (m = 1 - (l || u) / o) : d <= i ? (m = d / i) : f <= i && (m = f / i),
                        ("opacity" !== e.options.type && "scale-opacity" !== e.options.type && "scroll-opacity" !== e.options.type) || ((s.transform = "translate3d(0,0,0)"), (s.opacity = m)),
                        "scale" === e.options.type || "scale-opacity" === e.options.type)
                    ) {
                        let t = 1;
                        e.options.speed < 0 ? (t -= e.options.speed * m) : (t += e.options.speed * (1 - m)), (s.transform = `scale(${t}) translate3d(0,0,0)`);
                    }
                    if ("scroll" === e.options.type || "scroll-opacity" === e.options.type) {
                        let t = e.parallaxScrollDistance * h;
                        "absolute" === e.image.position && (t -= n), (s.transform = `translate3d(0,${t}px,0)`);
                    }
                    e.css(e.image.$item, s),
                        e.options.onScroll && e.options.onScroll.call(e, { section: a, beforeTop: r, beforeTopEnd: d, afterTop: l, beforeBottom: u, beforeBottomEnd: f, afterBottom: p, visiblePercent: m, fromViewportCenter: h });
                }
                onResize() {
                    this.coverImage();
                }
            }
            const v = function (t, e, ...i) {
                ("object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName) && (t = [t]);
                const a = t.length;
                let n,
                    o = 0;
                for (; o < a; o += 1) if (("object" == typeof e || void 0 === e ? t[o].jarallax || (t[o].jarallax = new g(t[o], e)) : t[o].jarallax && (n = t[o].jarallax[e].apply(t[o].jarallax, i)), void 0 !== n)) return n;
                return t;
            };
            v.constructor = g;
            const y = i.jQuery_T4NT;
            if (void 0 !== y) {
                const t = function (...t) {
                    Array.prototype.unshift.call(t, this);
                    const e = v.apply(i, t);
                    return "object" != typeof e ? e : this;
                };
                t.constructor = v.constructor;
                const e = y.fn.jarallax;
                (y.fn.jarallax = t),
                    (y.fn.jarallax.noConflict = function () {
                        return (y.fn.jarallax = e), this;
                    });
            }
            return (
                t(() => {
                    v(document.querySelectorAll("[data-jarallax]"));
                }),
                v
            );
        })();
    })(this),
    (jQuery_T4NT.fn.t4sJarallax = jQuery_T4NT.fn.jarallax.noConflict()),
    (function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jQuery_T4NT"], t) : t(jQuery_T4NT);
    })(function (t) {
        "use strict";
        function e(t) {
            var e = t.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            return new RegExp(e);
        }
        function i(t) {
            return function (i) {
                var n = i.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
                if (n)
                    for (var o = 0, s = n.length; o < s; ++o) {
                        var d = n[o].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                            l = e(d[0]),
                            c = d[1] || "",
                            u = d[3] || "",
                            f = null;
                        (d = d[2]), r.hasOwnProperty(d) && ((f = r[d]), (f = Number(t[f]))), null !== f && ("!" === c && (f = a(u, f)), "" === c && f < 10 && (f = "0" + f.toString()), (i = i.replace(l, f.toString())));
                    }
                return i.replace(/%%/, "%");
            };
        }
        function a(t, e) {
            var i = "s",
                a = "";
            return t && (1 === (t = t.replace(/(:|;|\s)/gi, "").split(/\,/)).length ? (i = t[0]) : ((a = t[0]), (i = t[1]))), Math.abs(e) > 1 ? i : a;
        }
        var n = [],
            o = [],
            s = { precision: 100, elapse: !1, defer: !1 };
        o.push(/^[0-9]*$/.source), o.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), o.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), (o = new RegExp(o.join("|")));
        var r = { Y: "years", m: "months", n: "daysToMonth", d: "daysToWeek", w: "weeks", W: "weeksToMonth", H: "hours", M: "minutes", S: "seconds", D: "totalDays", I: "totalHours", N: "totalMinutes", T: "totalSeconds" },
            d = function (e, i, a) {
                (this.el = e),
                    (this.$el = t(e)),
                    (this.interval = null),
                    (this.offset = {}),
                    (this.options = t.extend({}, s)),
                    (this.instanceNumber = n.length),
                    n.push(this),
                    this.$el.data("countdown-instance", this.instanceNumber),
                    a && ("function" == typeof a ? (this.$el.on("update.countdown", a), this.$el.on("stoped.countdown", a), this.$el.on("finish.countdown", a)) : (this.options = t.extend({}, s, a))),
                    this.setFinalDate(i),
                    !1 === this.options.defer && this.start();
            };
        t.extend(d.prototype, {
            start: function () {
                null !== this.interval && clearInterval(this.interval);
                var t = this;
                this.update(),
                    (this.interval = setInterval(function () {
                        t.update.call(t);
                    }, this.options.precision));
            },
            stop: function () {
                clearInterval(this.interval), (this.interval = null), this.dispatchEvent("stoped");
            },
            toggle: function () {
                this.interval ? this.stop() : this.start();
            },
            pause: function () {
                this.stop();
            },
            resume: function () {
                this.start();
            },
            remove: function () {
                this.stop.call(this), (n[this.instanceNumber] = null), delete this.$el.data().countdownInstance;
            },
            setFinalDate: function (t) {
                this.finalDate = (function (t) {
                    if (t instanceof Date) return t;
                    if (String(t).match(o)) return String(t).match(/^[0-9]*$/) && (t = Number(t)), String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")), new Date(t);
                    throw new Error("Couldn't cast `" + t + "` to a date object.");
                })(t);
            },
            update: function () {
                if (0 !== this.$el.closest("html").length) {
                    var e,
                        i = void 0 !== t._data(this.el, "events"),
                        a = new Date();
                    (e = this.finalDate.getTime() - a.getTime()),
                        (e = Math.ceil(e / 1e3)),
                        (e = !this.options.elapse && e < 0 ? 0 : Math.abs(e)),
                        this.totalSecsLeft !== e &&
                            i &&
                            ((this.totalSecsLeft = e),
                            (this.elapsed = a >= this.finalDate),
                            (this.offset = {
                                seconds: this.totalSecsLeft % 60,
                                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                                daysToMonth: Math.floor((this.totalSecsLeft / 60 / 60 / 24) % 30.4368),
                                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                                years: Math.abs(this.finalDate.getFullYear() - a.getFullYear()),
                                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                                totalSeconds: this.totalSecsLeft,
                            }),
                            this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")));
                } else this.remove();
            },
            dispatchEvent: function (e) {
                var a = t.Event(e + ".countdown");
                (a.finalDate = this.finalDate), (a.elapsed = this.elapsed), (a.offset = t.extend({}, this.offset)), (a.strftime = i(this.offset)), this.$el.trigger(a);
            },
        }),
            (t.fn.countdown = function () {
                var e = Array.prototype.slice.call(arguments, 0);
                return this.each(function () {
                    var i = t(this).data("countdown-instance");
                    if (void 0 !== i) {
                        var a = n[i],
                            o = e[0];
                        d.prototype.hasOwnProperty(o)
                            ? a[o].apply(a, e.slice(1))
                            : null === String(o).match(/^[$A-Z_][0-9A-Z_$]*$/i)
                            ? (a.setFinalDate.call(a, o), a.start())
                            : t.error("Method %s does not exist on jQuery_T4NT.countdown".replace(/\%s/gi, o));
                    } else new d(this, e[0], e[1]);
                });
            });
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e());
    })(this, function () {
        "use strict";
        var t = "millisecond",
            e = "second",
            i = "minute",
            a = "hour",
            n = "day",
            o = "week",
            s = "month",
            r = "quarter",
            d = "year",
            l = "date",
            c = "Invalid Date",
            u = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            f = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            p = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") },
            h = function (t, e, i) {
                var a = String(t);
                return !a || a.length >= e ? t : "" + Array(e + 1 - a.length).join(i) + t;
            },
            m = {
                s: h,
                z: function (t) {
                    var e = -t.utcOffset(),
                        i = Math.abs(e),
                        a = Math.floor(i / 60),
                        n = i % 60;
                    return (e <= 0 ? "+" : "-") + h(a, 2, "0") + ":" + h(n, 2, "0");
                },
                m: function t(e, i) {
                    if (e.date() < i.date()) return -t(i, e);
                    var a = 12 * (i.year() - e.year()) + (i.month() - e.month()),
                        n = e.clone().add(a, s),
                        o = i - n < 0,
                        r = e.clone().add(a + (o ? -1 : 1), s);
                    return +(-(a + (i - n) / (o ? n - r : r - n)) || 0);
                },
                a: function (t) {
                    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
                },
                p: function (c) {
                    return (
                        { M: s, y: d, w: o, d: n, D: l, h: a, m: i, s: e, ms: t, Q: r }[c] ||
                        String(c || "")
                            .toLowerCase()
                            .replace(/s$/, "")
                    );
                },
                u: function (t) {
                    return void 0 === t;
                },
            },
            g = "en",
            v = {};
        v[g] = p;
        var y = function (t) {
                return t instanceof T;
            },
            b = function (t, e, i) {
                var a;
                if (!t) return g;
                if ("string" == typeof t) v[t] && (a = t), e && ((v[t] = e), (a = t));
                else {
                    var n = t.name;
                    (v[n] = t), (a = n);
                }
                return !i && a && (g = a), a || (!i && g);
            },
            S = function (t, e) {
                if (y(t)) return t.clone();
                var i = "object" == typeof e ? e : {};
                return (i.date = t), (i.args = arguments), new T(i);
            },
            w = m;
        (w.l = b),
            (w.i = y),
            (w.w = function (t, e) {
                return S(t, { locale: e.$L, utc: e.$u, x: e.$x, $offset: e.$offset });
            });
        var T = (function () {
                function p(t) {
                    (this.$L = b(t.locale, null, !0)), this.parse(t);
                }
                var h = p.prototype;
                return (
                    (h.parse = function (t) {
                        (this.$d = (function (t) {
                            var e = t.date,
                                i = t.utc;
                            if (null === e) return new Date(NaN);
                            if (w.u(e)) return new Date();
                            if (e instanceof Date) return new Date(e);
                            if ("string" == typeof e && !/Z$/i.test(e)) {
                                var a = e.match(u);
                                if (a) {
                                    var n = a[2] - 1 || 0,
                                        o = (a[7] || "0").substring(0, 3);
                                    return i ? new Date(Date.UTC(a[1], n, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, o)) : new Date(a[1], n, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, o);
                                }
                            }
                            return new Date(e);
                        })(t)),
                            (this.$x = t.x || {}),
                            this.init();
                    }),
                    (h.init = function () {
                        var t = this.$d;
                        (this.$y = t.getFullYear()),
                            (this.$M = t.getMonth()),
                            (this.$D = t.getDate()),
                            (this.$W = t.getDay()),
                            (this.$H = t.getHours()),
                            (this.$m = t.getMinutes()),
                            (this.$s = t.getSeconds()),
                            (this.$ms = t.getMilliseconds());
                    }),
                    (h.$utils = function () {
                        return w;
                    }),
                    (h.isValid = function () {
                        return !(this.$d.toString() === c);
                    }),
                    (h.isSame = function (t, e) {
                        var i = S(t);
                        return this.startOf(e) <= i && i <= this.endOf(e);
                    }),
                    (h.isAfter = function (t, e) {
                        return S(t) < this.startOf(e);
                    }),
                    (h.isBefore = function (t, e) {
                        return this.endOf(e) < S(t);
                    }),
                    (h.$g = function (t, e, i) {
                        return w.u(t) ? this[e] : this.set(i, t);
                    }),
                    (h.unix = function () {
                        return Math.floor(this.valueOf() / 1e3);
                    }),
                    (h.valueOf = function () {
                        return this.$d.getTime();
                    }),
                    (h.startOf = function (t, r) {
                        var c = this,
                            u = !!w.u(r) || r,
                            f = w.p(t),
                            p = function (t, e) {
                                var i = w.w(c.$u ? Date.UTC(c.$y, e, t) : new Date(c.$y, e, t), c);
                                return u ? i : i.endOf(n);
                            },
                            h = function (t, e) {
                                return w.w(c.toDate()[t].apply(c.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), c);
                            },
                            m = this.$W,
                            g = this.$M,
                            v = this.$D,
                            y = "set" + (this.$u ? "UTC" : "");
                        switch (f) {
                            case d:
                                return u ? p(1, 0) : p(31, 11);
                            case s:
                                return u ? p(1, g) : p(0, g + 1);
                            case o:
                                var b = this.$locale().weekStart || 0,
                                    S = (m < b ? m + 7 : m) - b;
                                return p(u ? v - S : v + (6 - S), g);
                            case n:
                            case l:
                                return h(y + "Hours", 0);
                            case a:
                                return h(y + "Minutes", 1);
                            case i:
                                return h(y + "Seconds", 2);
                            case e:
                                return h(y + "Milliseconds", 3);
                            default:
                                return this.clone();
                        }
                    }),
                    (h.endOf = function (t) {
                        return this.startOf(t, !1);
                    }),
                    (h.$set = function (o, r) {
                        var c,
                            u = w.p(o),
                            f = "set" + (this.$u ? "UTC" : ""),
                            p = ((c = {}), (c[n] = f + "Date"), (c[l] = f + "Date"), (c[s] = f + "Month"), (c[d] = f + "FullYear"), (c[a] = f + "Hours"), (c[i] = f + "Minutes"), (c[e] = f + "Seconds"), (c[t] = f + "Milliseconds"), c)[u],
                            h = u === n ? this.$D + (r - this.$W) : r;
                        if (u === s || u === d) {
                            var m = this.clone().set(l, 1);
                            m.$d[p](h), m.init(), (this.$d = m.set(l, Math.min(this.$D, m.daysInMonth())).$d);
                        } else p && this.$d[p](h);
                        return this.init(), this;
                    }),
                    (h.set = function (t, e) {
                        return this.clone().$set(t, e);
                    }),
                    (h.get = function (t) {
                        return this[w.p(t)]();
                    }),
                    (h.add = function (t, r) {
                        var l,
                            c = this;
                        t = Number(t);
                        var u = w.p(r),
                            f = function (e) {
                                var i = S(c);
                                return w.w(i.date(i.date() + Math.round(e * t)), c);
                            };
                        if (u === s) return this.set(s, this.$M + t);
                        if (u === d) return this.set(d, this.$y + t);
                        if (u === n) return f(1);
                        if (u === o) return f(7);
                        var p = ((l = {}), (l[i] = 6e4), (l[a] = 36e5), (l[e] = 1e3), l)[u] || 1,
                            h = this.$d.getTime() + t * p;
                        return w.w(h, this);
                    }),
                    (h.subtract = function (t, e) {
                        return this.add(-1 * t, e);
                    }),
                    (h.format = function (t) {
                        var e = this,
                            i = this.$locale();
                        if (!this.isValid()) return i.invalidDate || c;
                        var a = t || "YYYY-MM-DDTHH:mm:ssZ",
                            n = w.z(this),
                            o = this.$H,
                            s = this.$m,
                            r = this.$M,
                            d = i.weekdays,
                            l = i.months,
                            u = function (t, i, n, o) {
                                return (t && (t[i] || t(e, a))) || n[i].substr(0, o);
                            },
                            p = function (t) {
                                return w.s(o % 12 || 12, t, "0");
                            },
                            h =
                                i.meridiem ||
                                function (t, e, i) {
                                    var a = t < 12 ? "AM" : "PM";
                                    return i ? a.toLowerCase() : a;
                                },
                            m = {
                                YY: String(this.$y).slice(-2),
                                YYYY: this.$y,
                                M: r + 1,
                                MM: w.s(r + 1, 2, "0"),
                                MMM: u(i.monthsShort, r, l, 3),
                                MMMM: u(l, r),
                                D: this.$D,
                                DD: w.s(this.$D, 2, "0"),
                                d: String(this.$W),
                                dd: u(i.weekdaysMin, this.$W, d, 2),
                                ddd: u(i.weekdaysShort, this.$W, d, 3),
                                dddd: d[this.$W],
                                H: String(o),
                                HH: w.s(o, 2, "0"),
                                h: p(1),
                                hh: p(2),
                                a: h(o, s, !0),
                                A: h(o, s, !1),
                                m: String(s),
                                mm: w.s(s, 2, "0"),
                                s: String(this.$s),
                                ss: w.s(this.$s, 2, "0"),
                                SSS: w.s(this.$ms, 3, "0"),
                                Z: n,
                            };
                        return a.replace(f, function (t, e) {
                            return e || m[t] || n.replace(":", "");
                        });
                    }),
                    (h.utcOffset = function () {
                        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                    }),
                    (h.diff = function (t, l, c) {
                        var u,
                            f = w.p(l),
                            p = S(t),
                            h = 6e4 * (p.utcOffset() - this.utcOffset()),
                            m = this - p,
                            g = w.m(this, p);
                        return (g = ((u = {}), (u[d] = g / 12), (u[s] = g), (u[r] = g / 3), (u[o] = (m - h) / 6048e5), (u[n] = (m - h) / 864e5), (u[a] = m / 36e5), (u[i] = m / 6e4), (u[e] = m / 1e3), u)[f] || m), c ? g : w.a(g);
                    }),
                    (h.daysInMonth = function () {
                        return this.endOf(s).$D;
                    }),
                    (h.$locale = function () {
                        return v[this.$L];
                    }),
                    (h.locale = function (t, e) {
                        if (!t) return this.$L;
                        var i = this.clone(),
                            a = b(t, e, !0);
                        return a && (i.$L = a), i;
                    }),
                    (h.clone = function () {
                        return w.w(this.$d, this);
                    }),
                    (h.toDate = function () {
                        return new Date(this.valueOf());
                    }),
                    (h.toJSON = function () {
                        return this.isValid() ? this.toISOString() : null;
                    }),
                    (h.toISOString = function () {
                        return this.$d.toISOString();
                    }),
                    (h.toString = function () {
                        return this.$d.toUTCString();
                    }),
                    p
                );
            })(),
            _ = T.prototype;
        return (
            (S.prototype = _),
            [
                ["$ms", t],
                ["$s", e],
                ["$m", i],
                ["$H", a],
                ["$W", n],
                ["$M", s],
                ["$y", d],
                ["$D", l],
            ].forEach(function (t) {
                _[t[1]] = function (e) {
                    return this.$g(e, t[0], t[1]);
                };
            }),
            (S.extend = function (t, e) {
                return t.$i || (t(e, T, S), (t.$i = !0)), S;
            }),
            (S.locale = b),
            (S.isDayjs = y),
            (S.unix = function (t) {
                return S(1e3 * t);
            }),
            (S.en = v[g]),
            (S.Ls = v),
            (S.p = {}),
            S
        );
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = e());
    })(this, function () {
        "use strict";
        var t = "minute",
            e = /[+-]\d\d(?::?\d\d)?/g,
            i = /([+-]|\d\d)/g;
        return function (a, n, o) {
            var s = n.prototype;
            (o.utc = function (t) {
                return new n({ date: t, utc: !0, args: arguments });
            }),
                (s.utc = function (e) {
                    var i = o(this.toDate(), { locale: this.$L, utc: !0 });
                    return e ? i.add(this.utcOffset(), t) : i;
                }),
                (s.local = function () {
                    return o(this.toDate(), { locale: this.$L, utc: !1 });
                });
            var r = s.parse;
            s.parse = function (t) {
                t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), r.call(this, t);
            };
            var d = s.init;
            s.init = function () {
                if (this.$u) {
                    var t = this.$d;
                    (this.$y = t.getUTCFullYear()),
                        (this.$M = t.getUTCMonth()),
                        (this.$D = t.getUTCDate()),
                        (this.$W = t.getUTCDay()),
                        (this.$H = t.getUTCHours()),
                        (this.$m = t.getUTCMinutes()),
                        (this.$s = t.getUTCSeconds()),
                        (this.$ms = t.getUTCMilliseconds());
                } else d.call(this);
            };
            var l = s.utcOffset;
            s.utcOffset = function (a, n) {
                var o = this.$utils().u;
                if (o(a)) return this.$u ? 0 : o(this.$offset) ? l.call(this) : this.$offset;
                if (
                    "string" == typeof a &&
                    null ===
                        (a = (function (t) {
                            void 0 === t && (t = "");
                            var a = t.match(e);
                            if (!a) return null;
                            var n = ("" + a[0]).match(i) || ["-", 0, 0],
                                o = n[0],
                                s = 60 * +n[1] + +n[2];
                            return 0 === s ? 0 : "+" === o ? s : -s;
                        })(a))
                )
                    return this;
                var s = Math.abs(a) <= 16 ? 60 * a : a,
                    r = this;
                if (n) return (r.$offset = s), (r.$u = 0 === a), r;
                if (0 !== a) {
                    var d = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                    ((r = this.local().add(s + d, t)).$offset = s), (r.$x.$localOffset = d);
                } else r = this.utc();
                return r;
            };
            var c = s.format;
            (s.format = function (t) {
                var e = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return c.call(this, e);
            }),
                (s.valueOf = function () {
                    var t = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || new Date().getTimezoneOffset());
                    return this.$d.valueOf() - 6e4 * t;
                }),
                (s.isUTC = function () {
                    return !!this.$u;
                }),
                (s.toISOString = function () {
                    return this.toDate().toISOString();
                }),
                (s.toString = function () {
                    return this.toDate().toUTCString();
                });
            var u = s.toDate;
            s.toDate = function (t) {
                return "s" === t && this.$offset ? o(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : u.call(this);
            };
            var f = s.diff;
            s.diff = function (t, e, i) {
                if (t && this.$u === t.$u) return f.call(this, t, e, i);
                var a = this.local(),
                    n = o(t).local();
                return f.call(a, n, e, i);
            };
        };
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = e())
            : "function" == typeof define && define.amd
            ? define(e)
            : ((t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_timezone = e());
    })(this, function () {
        "use strict";
        var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 },
            e = {};
        return function (i, a, n) {
            var o,
                s = function (t, i, a) {
                    void 0 === a && (a = {});
                    var n = new Date(t);
                    return (function (t, i) {
                        void 0 === i && (i = {});
                        var a = i.timeZoneName || "short",
                            n = t + "|" + a,
                            o = e[n];
                        return (
                            o || ((o = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: t, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: a })), (e[n] = o)), o
                        );
                    })(i, a).formatToParts(n);
                },
                r = function (e, i) {
                    for (var a = s(e, i), o = [], r = 0; r < a.length; r += 1) {
                        var d = a[r],
                            l = d.type,
                            c = d.value,
                            u = t[l];
                        u >= 0 && (o[u] = parseInt(c, 10));
                    }
                    var f = o[3],
                        p = 24 === f ? 0 : f,
                        h = o[0] + "-" + o[1] + "-" + o[2] + " " + p + ":" + o[4] + ":" + o[5] + ":000",
                        m = +e;
                    return (n.utc(h).valueOf() - (m -= m % 1e3)) / 6e4;
                },
                d = a.prototype;
            (d.tz = function (t, e) {
                void 0 === t && (t = o);
                var i = this.utcOffset(),
                    a = this.toDate(),
                    s = a.toLocaleString("en-US", { timeZone: t }),
                    r = Math.round((a - new Date(s)) / 1e3 / 60),
                    d = n(s)
                        .$set("millisecond", this.$ms)
                        .utcOffset(15 * -Math.round(a.getTimezoneOffset() / 15) - r, !0);
                if (e) {
                    var l = d.utcOffset();
                    d = d.add(i - l, "minute");
                }
                return (d.$x.$timezone = t), d;
            }),
                (d.offsetName = function (t) {
                    var e = this.$x.$timezone || n.tz.guess(),
                        i = s(this.valueOf(), e, { timeZoneName: t }).find(function (t) {
                            return "timezonename" === t.type.toLowerCase();
                        });
                    return i && i.value;
                });
            var l = d.startOf;
            (d.startOf = function (t, e) {
                if (!this.$x || !this.$x.$timezone) return l.call(this, t, e);
                var i = n(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
                return l.call(i, t, e).tz(this.$x.$timezone, !0);
            }),
                (n.tz = function (t, e, i) {
                    var a = i && e,
                        s = i || e || o,
                        d = r(+n(), s);
                    if ("string" != typeof t) return n(t).tz(s);
                    var l = (function (t, e, i) {
                            var a = t - 60 * e * 1e3,
                                n = r(a, i);
                            if (e === n) return [a, e];
                            var o = r((a -= 60 * (n - e) * 1e3), i);
                            return n === o ? [a, n] : [t - 60 * Math.min(n, o) * 1e3, Math.max(n, o)];
                        })(n.utc(t, a).valueOf(), d, s),
                        c = l[0],
                        u = l[1],
                        f = n(c).utcOffset(u);
                    return (f.$x.$timezone = s), f;
                }),
                (n.tz.guess = function () {
                    return Intl.DateTimeFormat().resolvedOptions().timeZone;
                }),
                (n.tz.setDefault = function (t) {
                    o = t;
                });
        };
    });
var dayjs_utc = window.dayjs_plugin_utc,
    dayjs_timezone = window.dayjs_plugin_timezone;
function _typeof(t) {
    "@babel/helpers - typeof";
    return (_typeof =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                  return typeof t;
              }
            : function (t) {
                  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
              })(t);
}
function createCommonjsModule(t, e, i) {
    return (
        t(
            (i = {
                path: e,
                exports: {},
                require: function (t, e) {
                    return commonjsRequire(t, null == e ? i.path : e);
                },
            }),
            i.exports
        ),
        i.exports
    );
}
function commonjsRequire() {
    throw new Error("Error commonjs");
}
dayjs.locale("en"),
    dayjs.extend(dayjs_utc),
    dayjs.extend(dayjs_timezone),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jQuery_T4NT"], t) : "object" == typeof exports ? t(require("jQuery_T4NT")) : t(window.jQuery_T4NT || window.Zepto);
    })(function (t) {
        var e,
            i,
            a,
            n,
            o,
            s,
            r = {},
            d = function () {},
            l = !!window.jQuery_T4NT,
            c = t(window),
            u = function (t, i) {
                e.ev.on("mfp" + t + ".mfp", i);
            },
            f = function (e, i, a, n) {
                var o = document.createElement("div");
                return (o.className = "mfp-" + e), a && (o.innerHTML = a), n ? i && i.appendChild(o) : ((o = t(o)), i && o.appendTo(i)), o;
            },
            p = function (i, a) {
                e.ev.triggerHandler("mfp" + i, a), e.st.callbacks && ((i = i.charAt(0).toLowerCase() + i.slice(1)), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(a) ? a : [a]));
            },
            h = function (i) {
                return (i === s && e.currTemplate.closeBtn) || ((e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose))), (s = i)), e.currTemplate.closeBtn;
            },
            m = function () {
                t.magnificPopupT4s.instance || ((e = new d()).init(), (t.magnificPopupT4s.instance = e));
            };
        (d.prototype = {
            constructor: d,
            init: function () {
                var i = navigator.appVersion;
                (e.isLowIE = e.isIE8 = document.all && !document.addEventListener),
                    (e.isAndroid = /android/gi.test(i)),
                    (e.isIOS = /iphone|ipad|ipod/gi.test(i)),
                    (e.supportsTransition = (function () {
                        var t = document.createElement("p").style,
                            e = ["ms", "O", "Moz", "Webkit"];
                        if (void 0 !== t.transition) return !0;
                        for (; e.length; ) if (e.pop() + "Transition" in t) return !0;
                        return !1;
                    })()),
                    (e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
                    (a = t(document)),
                    (e.popupsCache = {});
            },
            open: function (i) {
                var n;
                if (!1 === i.isObj) {
                    (e.items = i.items.toArray()), (e.index = 0);
                    var s,
                        r = i.items;
                    for (n = 0; n < r.length; n++)
                        if (((s = r[n]).parsed && (s = s.el[0]), s === i.el[0])) {
                            e.index = n;
                            break;
                        }
                } else (e.items = t.isArray(i.items) ? i.items : [i.items]), (e.index = i.index || 0);
                if (!e.isOpen) {
                    (e.types = []),
                        (o = ""),
                        i.mainEl && i.mainEl.length ? (e.ev = i.mainEl.eq(0)) : (e.ev = a),
                        i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), (e.currTemplate = e.popupsCache[i.key])) : (e.currTemplate = {}),
                        (e.st = t.extend(!0, {}, t.magnificPopupT4s.defaults, i)),
                        (e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos),
                        e.st.modal && ((e.st.closeOnContentClick = !1), (e.st.closeOnBgClick = !1), (e.st.showCloseBtn = !1), (e.st.enableEscapeKey = !1)),
                        e.bgOverlay ||
                            ((e.bgOverlay = f("bg").on("click.mfp", function () {
                                e.close();
                            })),
                            (e.wrap = f("wrap")
                                .attr("tabindex", -1)
                                .on("click.mfp", function (t) {
                                    e._checkIfClose(t.target) && e.close();
                                })),
                            (e.container = f("container", e.wrap))),
                        (e.contentContainer = f("content")),
                        e.st.preloader && (e.preloader = f("preloader", e.container, e.st.tLoading));
                    var d = t.magnificPopupT4s.modules;
                    for (n = 0; n < d.length; n++) {
                        var l = d[n];
                        (l = l.charAt(0).toUpperCase() + l.slice(1)), e["init" + l].call(e);
                    }
                    p("BeforeOpen"),
                        e.st.showCloseBtn &&
                            (e.st.closeBtnInside
                                ? (u("MarkupParse", function (t, e, i, a) {
                                      i.close_replaceWith = h(a.type);
                                  }),
                                  (o += " mfp-close-btn-in"))
                                : e.wrap.append(h())),
                        e.st.alignTop && (o += " mfp-align-top"),
                        e.fixedContentPos ? e.wrap.css({ overflow: e.st.overflowY, overflowX: "hidden", overflowY: e.st.overflowY }) : e.wrap.css({ top: c.scrollTop(), position: "absolute" }),
                        (!1 === e.st.fixedBgPos || ("auto" === e.st.fixedBgPos && !e.fixedContentPos)) && e.bgOverlay.css({ height: a.height(), position: "absolute" }),
                        e.st.enableEscapeKey &&
                            a.on("keyup.mfp", function (t) {
                                27 === t.keyCode && e.close();
                            }),
                        c.on("resize.mfp", function () {
                            e.updateSize();
                        }),
                        e.st.closeOnContentClick || (o += " mfp-auto-cursor"),
                        o && e.wrap.addClass(o);
                    var m = (e.wH = c.height()),
                        g = {};
                    if (e.fixedContentPos && e._hasScrollBar(m)) {
                        var v = e._getScrollbarSize();
                        v && (g.marginRight = v);
                    }
                    e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : (g.overflow = "hidden"));
                    var y = e.st.mainClass;
                    return (
                        e.isIE7 && (y += " mfp-ie7"),
                        y && e._addClassToMFP(y),
                        e.updateItemHTML(),
                        p("BuildControls"),
                        t("html").css(g),
                        e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)),
                        (e._lastFocusedEl = document.activeElement),
                        setTimeout(function () {
                            e.content ? (e._addClassToMFP("mfp-ready"), e._setFocus()) : e.bgOverlay.addClass("mfp-ready"), a.on("focusin.mfp", e._onFocusIn);
                        }, 16),
                        (e.isOpen = !0),
                        e.updateSize(m),
                        p("Open"),
                        i
                    );
                }
                e.updateItemHTML();
            },
            close: function () {
                e.isOpen &&
                    (p("BeforeClose"),
                    (e.isOpen = !1),
                    e.st.removalDelay && !e.isLowIE && e.supportsTransition
                        ? (e._addClassToMFP("mfp-removing"),
                          setTimeout(function () {
                              e._close();
                          }, e.st.removalDelay))
                        : e._close());
            },
            _close: function () {
                p("Close");
                var i = "mfp-removing mfp-ready ";
                if ((e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos)) {
                    var n = { marginRight: "" };
                    e.isIE7 ? t("body, html").css("overflow", "") : (n.overflow = ""), t("html").css(n);
                }
                a.off("keyup.mfp focusin.mfp"),
                    e.ev.off(".mfp"),
                    e.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                    e.bgOverlay.attr("class", "mfp-bg"),
                    e.container.attr("class", "mfp-container"),
                    !e.st.showCloseBtn || (e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type]) || (e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach()),
                    e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(),
                    (e.currItem = null),
                    (e.content = null),
                    (e.currTemplate = null),
                    (e.prevHeight = 0),
                    p("AfterClose");
            },
            updateSize: function (t) {
                if (e.isIOS) {
                    var i = document.documentElement.clientWidth / window.innerWidth,
                        a = window.innerHeight * i;
                    e.wrap.css("height", a), (e.wH = a);
                } else e.wH = t || c.height();
                e.fixedContentPos || e.wrap.css("height", e.wH), p("Resize");
            },
            updateItemHTML: function () {
                var i = e.items[e.index];
                e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
                var a = i.type;
                if ((p("BeforeChange", [e.currItem ? e.currItem.type : "", a]), (e.currItem = i), !e.currTemplate[a])) {
                    var o = !!e.st[a] && e.st[a].markup;
                    p("FirstMarkupParse", o), (e.currTemplate[a] = !o || t(o));
                }
                n && n !== i.type && e.container.removeClass("mfp-" + n + "-holder");
                var s = e["get" + a.charAt(0).toUpperCase() + a.slice(1)](i, e.currTemplate[a]);
                e.appendContent(s, a), (i.preloaded = !0), p("Change", i), (n = i.type), e.container.prepend(e.contentContainer), p("AfterChange");
            },
            appendContent: function (t, i, a) {
                if ("" == t && "ajax" == i) return !1;
                (e.content = t),
                    t ? (e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(h()) : (e.content = t)) : (e.content = ""),
                    p("BeforeAppend"),
                    e.container.addClass("mfp-" + i + "-holder"),
                    e.contentContainer.append(e.content);
            },
            parseEl: function (i) {
                var a,
                    n = e.items[i];
                if ((n.tagName ? (n = { el: t(n) }) : ((a = n.type), (n = { data: n, src: n.src })), n.el)) {
                    for (var o = e.types, s = 0; s < o.length; s++)
                        if (n.el.hasClass("mfp-" + o[s])) {
                            a = o[s];
                            break;
                        }
                    (n.src = n.el.attr("data-mfp-src")), n.src || (n.src = n.el.attr("href"));
                }
                return (n.type = a || e.st.type || "inline"), (n.index = i), (n.parsed = !0), (e.items[i] = n), p("ElementParse", n), e.items[i];
            },
            addGroup: function (t, i) {
                var a = function (a) {
                    (a.mfpEl = this), e._openClick(a, t, i);
                };
                i || (i = {});
                var n = "click.magnificPopupT4s";
                (i.mainEl = t), i.items ? ((i.isObj = !0), t.off(n).on(n, a)) : ((i.isObj = !1), i.delegate ? t.off(n).on(n, i.delegate, a) : ((i.items = t), t.off(n).on(n, a)));
            },
            _openClick: function (i, a, n) {
                if ((void 0 !== n.midClick ? n.midClick : t.magnificPopupT4s.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                    var o = void 0 !== n.disableOn ? n.disableOn : t.magnificPopupT4s.defaults.disableOn;
                    if (o)
                        if (t.isFunction(o)) {
                            if (!o.call(e)) return !0;
                        } else if (c.width() < o) return !0;
                    i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), (n.el = t(i.mfpEl)), n.delegate && (n.items = a.find(n.delegate)), e.open(n);
                }
            },
            updateStatus: function (t, a) {
                if (e.preloader) {
                    i !== t && e.container.removeClass("mfp-s-" + i), a || "loading" !== t || (a = e.st.tLoading);
                    var n = { status: t, text: a };
                    p("UpdateStatus", n),
                        (t = n.status),
                        (a = n.text),
                        e.preloader.html(a),
                        e.preloader.find("a").on("click", function (t) {
                            t.stopImmediatePropagation();
                        }),
                        e.container.addClass("mfp-s-" + t),
                        (i = t);
                }
            },
            _checkIfClose: function (i) {
                if (!t(i).hasClass("mfp-prevent-close")) {
                    var a = e.st.closeOnContentClick,
                        n = e.st.closeOnBgClick;
                    if (a && n) return !0;
                    if (!e.content || t(i).hasClass("mfp-close") || (e.preloader && i === e.preloader[0])) return !0;
                    if (i === e.content[0] || t.contains(e.content[0], i)) {
                        if (a) return !0;
                    } else if (n && t.contains(document, i)) return !0;
                    return !1;
                }
            },
            _addClassToMFP: function (t) {
                e.bgOverlay.addClass(t), e.wrap.addClass(t);
            },
            _removeClassFromMFP: function (t) {
                this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
            },
            _hasScrollBar: function (t) {
                return (e.isIE7 ? a.height() : document.body.scrollHeight) > (t || c.height());
            },
            _setFocus: function () {
                (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus();
            },
            _onFocusIn: function (i) {
                if (i.target !== e.wrap[0] && !t.contains(e.wrap[0], i.target)) return e._setFocus(), !1;
            },
            _parseMarkup: function (e, i, a) {
                var n;
                a.data && (i = t.extend(a.data, i)),
                    p("MarkupParse", [e, i, a]),
                    t.each(i, function (i, a) {
                        if (void 0 === a || !1 === a) return !0;
                        if ((n = i.split("_")).length > 1) {
                            var o = e.find(".mfp-" + n[0]);
                            if (o.length > 0) {
                                var s = n[1];
                                "replaceWith" === s ? o[0] !== a[0] && o.replaceWith(a) : "img" === s ? (o.is("img") ? o.attr("src", a) : o.replaceWith(t("<img>").attr("src", a).attr("class", o.attr("class")))) : o.attr(n[1], a);
                            }
                        } else e.find(".mfp-" + i).html(a);
                    });
            },
            _getScrollbarSize: function () {
                if (void 0 === e.scrollbarSize) {
                    var t = document.createElement("div");
                    (t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"), document.body.appendChild(t), (e.scrollbarSize = t.offsetWidth - t.clientWidth), document.body.removeChild(t);
                }
                return e.scrollbarSize;
            },
        }),
            (t.magnificPopupT4s = {
                instance: null,
                proto: d.prototype,
                modules: [],
                open: function (e, i) {
                    return m(), ((e = e ? t.extend(!0, {}, e) : {}).isObj = !0), (e.index = i || 0), this.instance.open(e);
                },
                close: function () {
                    return t.magnificPopupT4s.instance && t.magnificPopupT4s.instance.close();
                },
                registerModule: function (e, i) {
                    i.options && (t.magnificPopupT4s.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e);
                },
                defaults: {
                    disableOn: 0,
                    key: null,
                    midClick: !1,
                    mainClass: "",
                    preloader: !0,
                    focus: "",
                    closeOnContentClick: !1,
                    closeOnBgClick: !0,
                    closeBtnInside: !0,
                    showCloseBtn: !0,
                    enableEscapeKey: !0,
                    modal: !1,
                    alignTop: !1,
                    removalDelay: 0,
                    prependTo: null,
                    fixedContentPos: "auto",
                    fixedBgPos: "auto",
                    overflowY: "auto",
                    closeMarkup:
                        '<button title="%title%" type="button" class="mfp-close"><svg class="t4smfp-icon-close" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>',
                    tClose: "Close (Esc)",
                    tLoading: "Loading...",
                    autoFocusLast: !0,
                },
            }),
            (t.fn.magnificPopupT4s = function (i) {
                m();
                var a = t(this);
                if ("string" == typeof i)
                    if ("open" === i) {
                        var n,
                            o = l ? a.data("magnificPopup") : a[0].magnificPopupT4s,
                            s = parseInt(arguments[1], 10) || 0;
                        o.items ? (n = o.items[s]) : ((n = a), o.delegate && (n = n.find(o.delegate)), (n = n.eq(s))), e._openClick({ mfpEl: n }, a, o);
                    } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
                else (i = t.extend(!0, {}, i)), l ? a.data("magnificPopup", i) : (a[0].magnificPopupT4s = i), e.addGroup(a, i);
                return a;
            });
        var g,
            v,
            y,
            b = function () {
                y && (v.after(y.addClass(g)).detach(), (y = null));
            };
        t.magnificPopupT4s.registerModule("inline", {
            options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
            proto: {
                initInline: function () {
                    e.types.push("inline"),
                        u("Close.inline", function () {
                            b();
                        });
                },
                getInline: function (i, a) {
                    if ((b(), i.src)) {
                        var n = e.st.inline,
                            o = t(i.src);
                        if (o.length) {
                            var s = o[0].parentNode;
                            s && s.tagName && (v || ((g = n.hiddenClass), (v = f(g)), (g = "mfp-" + g)), (y = o.after(v).detach().removeClass(g))), e.updateStatus("ready");
                        } else e.updateStatus("error", n.tNotFound), (o = t("<div>"));
                        return (i.inlineElement = o), o;
                    }
                    return e.updateStatus("ready"), e._parseMarkup(a, {}, i), a;
                },
            },
        });
        var S,
            w,
            T,
            _ = function () {
                S && t(document.body).removeClass(S);
            },
            $ = function () {
                _(), e.req && e.req.abort();
            };
        t.magnificPopupT4s.registerModule("ajax", {
            options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
            proto: {
                initAjax: function () {
                    e.types.push("ajax"), (S = e.st.ajax.cursor), u("Close.ajax", $), u("BeforeChange.ajax", $);
                },
                getAjax: function (i) {
                    S && t(document.body).addClass(S), e.updateStatus("loading");
                    var a = t(i.el).attr("data-storageid") || "nt94",
                        n = t.extend(
                            {
                                url: i.src,
                                success: function (n, o, s) {
                                    var d = { data: n, xhr: s };
                                    p("ParseAjax", d),
                                        e.appendContent(t(d.data), "ajax"),
                                        (i.finished = !0),
                                        _(),
                                        e._setFocus(),
                                        setTimeout(function () {
                                            e.wrap.addClass("mfp-ready");
                                        }, 16),
                                        e.updateStatus("ready"),
                                        p("AjaxContentAdded"),
                                        (r[a] = n);
                                },
                                error: function () {
                                    _(), (i.finished = i.loadError = !0), e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src));
                                },
                            },
                            e.st.ajax.settings
                        ),
                        o = r[a];
                    if (void 0 !== o) {
                        var s = { data: o };
                        p("ParseAjax", s),
                            e.appendContent(t(s.data), "ajax"),
                            _(),
                            e._setFocus(),
                            setTimeout(function () {
                                e.wrap.addClass("mfp-ready");
                            }, 16),
                            e.updateStatus("ready"),
                            p("AjaxContentAdded");
                    } else e.req = t.ajax(n);
                    return "";
                },
            },
        }),
            t.magnificPopupT4s.registerModule("image", {
                options: {
                    markup:
                        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                    cursor: "mfp-zoom-out-cur",
                    titleSrc: "title",
                    verticalFit: !0,
                    tError: '<a href="%url%">The image</a> could not be loaded.',
                },
                proto: {
                    initImage: function () {
                        var i = e.st.image,
                            a = ".image";
                        e.types.push("image"),
                            u("Open" + a, function () {
                                "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor);
                            }),
                            u("Close" + a, function () {
                                i.cursor && t(document.body).removeClass(i.cursor), c.off("resize.mfp");
                            }),
                            u("Resize" + a, e.resizeImage),
                            e.isLowIE && u("AfterChange", e.resizeImage);
                    },
                    resizeImage: function () {
                        var t = e.currItem;
                        if (t && t.img && e.st.image.verticalFit) {
                            var i = 0;
                            e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i);
                        }
                    },
                    _onImageHasSize: function (t) {
                        t.img && ((t.hasSize = !0), w && clearInterval(w), (t.isCheckingImgSize = !1), p("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), (t.imgHidden = !1)));
                    },
                    findImageSize: function (t) {
                        var i = 0,
                            a = t.img[0],
                            n = function (o) {
                                w && clearInterval(w),
                                    (w = setInterval(function () {
                                        a.naturalWidth > 0 ? e._onImageHasSize(t) : (i > 200 && clearInterval(w), 3 == ++i ? n(10) : 40 === i ? n(50) : 100 === i && n(500));
                                    }, o));
                            };
                        n(1);
                    },
                    getImage: function (i, a) {
                        var n = 0,
                            o = function () {
                                i &&
                                    (i.img[0].complete
                                        ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), (i.hasSize = !0), (i.loaded = !0), p("ImageLoadComplete"))
                                        : ++n < 200
                                        ? setTimeout(o, 100)
                                        : s());
                            },
                            s = function () {
                                i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", r.tError.replace("%url%", i.src))), (i.hasSize = !0), (i.loaded = !0), (i.loadError = !0));
                            },
                            r = e.st.image,
                            d = a.find(".mfp-img");
                        if (d.length) {
                            var l = document.createElement("img");
                            (l.className = "mfp-img"),
                                i.el && i.el.find("img").length && (l.alt = i.el.find("img").attr("alt")),
                                (i.img = t(l).on("load.mfploader", o).on("error.mfploader", s)),
                                (l.src = i.src),
                                d.is("img") && (i.img = i.img.clone()),
                                (l = i.img[0]).naturalWidth > 0 ? (i.hasSize = !0) : l.width || (i.hasSize = !1);
                        }
                        return (
                            e._parseMarkup(
                                a,
                                {
                                    title: (function (i) {
                                        if (i.data && void 0 !== i.data.title) return i.data.title;
                                        var a = e.st.image.titleSrc;
                                        if (a) {
                                            if (t.isFunction(a)) return a.call(e, i);
                                            if (i.el) return i.el.attr(a) || "";
                                        }
                                        return "";
                                    })(i),
                                    img_replaceWith: i.img,
                                },
                                i
                            ),
                            e.resizeImage(),
                            i.hasSize
                                ? (w && clearInterval(w), i.loadError ? (a.addClass("mfp-loading"), e.updateStatus("error", r.tError.replace("%url%", i.src))) : (a.removeClass("mfp-loading"), e.updateStatus("ready")), a)
                                : (e.updateStatus("loading"), (i.loading = !0), i.hasSize || ((i.imgHidden = !0), a.addClass("mfp-loading"), e.findImageSize(i)), a)
                        );
                    },
                },
            }),
            t.magnificPopupT4s.registerModule("zoom", {
                options: {
                    enabled: !1,
                    easing: "ease-in-out",
                    duration: 300,
                    opener: function (t) {
                        return t.is("img") ? t : t.find("img");
                    },
                },
                proto: {
                    initZoom: function () {
                        var t,
                            i = e.st.zoom,
                            a = ".zoom";
                        if (i.enabled && e.supportsTransition) {
                            var n,
                                o,
                                s = i.duration,
                                r = function (t) {
                                    var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                        a = "all " + i.duration / 1e3 + "s " + i.easing,
                                        n = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                        o = "transition";
                                    return (n["-webkit-" + o] = n["-moz-" + o] = n["-o-" + o] = n[o] = a), e.css(n), e;
                                },
                                d = function () {
                                    e.content.css("visibility", "visible");
                                };
                            u("BuildControls" + a, function () {
                                if (e._allowZoom()) {
                                    if ((clearTimeout(n), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom()))) return void d();
                                    (o = r(t)).css(e._getOffset()),
                                        e.wrap.append(o),
                                        (n = setTimeout(function () {
                                            o.css(e._getOffset(!0)),
                                                (n = setTimeout(function () {
                                                    d(),
                                                        setTimeout(function () {
                                                            o.remove(), (t = o = null), p("ZoomAnimationEnded");
                                                        }, 16);
                                                }, s));
                                        }, 16));
                                }
                            }),
                                u("BeforeClose" + a, function () {
                                    if (e._allowZoom()) {
                                        if ((clearTimeout(n), (e.st.removalDelay = s), !t)) {
                                            if (!(t = e._getItemToZoom())) return;
                                            o = r(t);
                                        }
                                        o.css(e._getOffset(!0)),
                                            e.wrap.append(o),
                                            e.content.css("visibility", "hidden"),
                                            setTimeout(function () {
                                                o.css(e._getOffset());
                                            }, 16);
                                    }
                                }),
                                u("Close" + a, function () {
                                    e._allowZoom() && (d(), o && o.remove(), (t = null));
                                });
                        }
                    },
                    _allowZoom: function () {
                        return "image" === e.currItem.type;
                    },
                    _getItemToZoom: function () {
                        return !!e.currItem.hasSize && e.currItem.img;
                    },
                    _getOffset: function (i) {
                        var a,
                            n = (a = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                            o = parseInt(a.css("padding-top"), 10),
                            s = parseInt(a.css("padding-bottom"), 10);
                        n.top -= t(window).scrollTop() - o;
                        var r = { width: a.width(), height: (l ? a.innerHeight() : a[0].offsetHeight) - s - o };
                        return (
                            void 0 === T && (T = void 0 !== document.createElement("p").style.MozTransform), T ? (r["-moz-transform"] = r.transform = "translate(" + n.left + "px," + n.top + "px)") : ((r.left = n.left), (r.top = n.top)), r
                        );
                    },
                },
            });
        var C = function (t) {
            if (e.currTemplate.iframe) {
                var i = e.currTemplate.iframe.find("iframe");
                i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"));
            }
        };
        t.magnificPopupT4s.registerModule("iframe", {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                    vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                    gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
                },
            },
            proto: {
                initIframe: function () {
                    e.types.push("iframe"),
                        u("BeforeChange", function (t, e, i) {
                            e !== i && ("iframe" === e ? C() : "iframe" === i && C(!0));
                        }),
                        u("Close.iframe", function () {
                            C();
                        });
                },
                getIframe: function (i, a) {
                    var n = i.src,
                        o = e.st.iframe;
                    t.each(o.patterns, function () {
                        if (n.indexOf(this.index) > -1) return this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), (n = this.src.replace(/%id%/g, n)), !1;
                    });
                    var s = {};
                    return o.srcAction && (s[o.srcAction] = n), e._parseMarkup(a, s, i), e.updateStatus("ready"), a;
                },
            },
        });
        var k = function (t) {
                var i = e.items.length;
                return t > i - 1 ? t - i : t < 0 ? i + t : t;
            },
            I = function (t, e, i) {
                return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i);
            };
        t.magnificPopupT4s.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%",
            },
            proto: {
                initGallery: function () {
                    var i = e.st.gallery,
                        n = ".mfp-gallery";
                    if (((e.direction = !0), !i || !i.enabled)) return !1;
                    (o += " mfp-gallery"),
                        u("Open" + n, function () {
                            i.navigateByImgClick &&
                                e.wrap.on("click" + n, ".mfp-img", function () {
                                    if (e.items.length > 1) return e.next(), !1;
                                }),
                                a.on("keydown" + n, function (t) {
                                    37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next();
                                });
                        }),
                        u("UpdateStatus" + n, function (t, i) {
                            i.text && (i.text = I(i.text, e.currItem.index, e.items.length));
                        }),
                        u("MarkupParse" + n, function (t, a, n, o) {
                            var s = e.items.length;
                            n.counter = s > 1 ? I(i.tCounter, o.index, s) : "";
                        }),
                        u("BuildControls" + n, function () {
                            if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                                var a = i.arrowMarkup,
                                    n = (e.arrowLeft = t(a.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass("mfp-prevent-close")),
                                    o = (e.arrowRight = t(a.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass("mfp-prevent-close"));
                                n.click(function () {
                                    e.prev();
                                }),
                                    o.click(function () {
                                        e.next();
                                    }),
                                    e.container.append(n.add(o));
                            }
                        }),
                        u("Change" + n, function () {
                            e._preloadTimeout && clearTimeout(e._preloadTimeout),
                                (e._preloadTimeout = setTimeout(function () {
                                    e.preloadNearbyImages(), (e._preloadTimeout = null);
                                }, 16));
                        }),
                        u("Close" + n, function () {
                            a.off(n), e.wrap.off("click" + n), (e.arrowRight = e.arrowLeft = null);
                        });
                },
                next: function () {
                    (e.direction = !0), (e.index = k(e.index + 1)), e.updateItemHTML();
                },
                prev: function () {
                    (e.direction = !1), (e.index = k(e.index - 1)), e.updateItemHTML();
                },
                goTo: function (t) {
                    (e.direction = t >= e.index), (e.index = t), e.updateItemHTML();
                },
                preloadNearbyImages: function () {
                    var t,
                        i = e.st.gallery.preload,
                        a = Math.min(i[0], e.items.length),
                        n = Math.min(i[1], e.items.length);
                    for (t = 1; t <= (e.direction ? n : a); t++) e._preloadItem(e.index + t);
                    for (t = 1; t <= (e.direction ? a : n); t++) e._preloadItem(e.index - t);
                },
                _preloadItem: function (i) {
                    if (((i = k(i)), !e.items[i].preloaded)) {
                        var a = e.items[i];
                        a.parsed || (a = e.parseEl(i)),
                            p("LazyLoad", a),
                            "image" === a.type &&
                                (a.img = t('<img class="mfp-img" />')
                                    .on("load.mfploader", function () {
                                        a.hasSize = !0;
                                    })
                                    .on("error.mfploader", function () {
                                        (a.hasSize = !0), (a.loadError = !0), p("LazyLoadError", a);
                                    })
                                    .attr("src", a.src)),
                            (a.preloaded = !0);
                    }
                },
            },
        }),
            t.magnificPopupT4s.registerModule("retina", {
                options: {
                    replaceSrc: function (t) {
                        return t.src.replace(/\.\w+$/, function (t) {
                            return "@2x" + t;
                        });
                    },
                    ratio: 1,
                },
                proto: {
                    initRetina: function () {
                        if (window.devicePixelRatio > 1) {
                            var t = e.st.retina,
                                i = t.ratio;
                            (i = isNaN(i) ? i() : i) > 1 &&
                                (u("ImageHasSize.retina", function (t, e) {
                                    e.img.css({ "max-width": e.img[0].naturalWidth / i, width: "100%" });
                                }),
                                u("ElementParse.retina", function (e, a) {
                                    a.src = t.replaceSrc(a, i);
                                }));
                        }
                    },
                },
            }),
            m();
    });
var fastdomT4s = createCommonjsModule(function (t) {
        !(function (e) {
            var i = function () {},
                a =
                    e.requestAnimationFrame ||
                    e.webkitRequestAnimationFrame ||
                    e.mozRequestAnimationFrame ||
                    e.msRequestAnimationFrame ||
                    function (t) {
                        return setTimeout(t, 16);
                    };
            function n() {
                (this.reads = []), (this.writes = []), (this.raf = a.bind(e));
            }
            function o(t) {
                t.scheduled ||
                    ((t.scheduled = !0),
                    t.raf(
                        function (t) {
                            var e,
                                a = t.writes,
                                n = t.reads;
                            try {
                                i("flushing reads", n.length), s(n), i("flushing writes", a.length), s(a);
                            } catch (t) {
                                e = t;
                            }
                            (t.scheduled = !1), (n.length || a.length) && o(t);
                            if (e) {
                                if ((i("task errored", e.message), !t.catch)) throw e;
                                t.catch(e);
                            }
                        }.bind(null, t)
                    ));
            }
            function s(t) {
                for (var e; (e = t.shift()); ) e();
            }
            function r(t, e) {
                var i = t.indexOf(e);
                return !!~i && !!t.splice(i, 1);
            }
            n.prototype = {
                constructor: n,
                measure: function (t, e) {
                    var i = e ? t.bind(e) : t;
                    return this.reads.push(i), o(this), i;
                },
                mutate: function (t, e) {
                    var i = e ? t.bind(e) : t;
                    return this.writes.push(i), o(this), i;
                },
                clear: function (t) {
                    return r(this.reads, t) || r(this.writes, t);
                },
                extend: function (t) {
                    if ("object" != _typeof(t)) throw new Error("expected object");
                    var e = Object.create(this);
                    return (
                        (function (t, e) {
                            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                        })(e, t),
                        (e.fastdom = this),
                        e.initialize && e.initialize(),
                        e
                    );
                },
                catch: null,
            };
            var d = (e.fastdom = e.fastdom || new n());
            t.exports = d;
        })("undefined" != typeof window ? window : commonjsGlobal);
    }),
    smoothscroll = createCommonjsModule(function (t, e) {
        !(function () {
            t.exports = {
                polyfill: function () {
                    var t = window,
                        e = document;
                    if (!("scrollBehavior" in e.documentElement.style && !0 !== t.__forceSmoothScrollPolyfill__)) {
                        var i,
                            a = t.HTMLElement || t.Element,
                            n = 468,
                            o = { scroll: t.scroll || t.scrollTo, scrollBy: t.scrollBy, elementScroll: a.prototype.scroll || d, scrollIntoView: a.prototype.scrollIntoView },
                            s = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now,
                            r = ((i = t.navigator.userAgent), new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(i) ? 1 : 0);
                        (t.scroll = t.scrollTo = function () {
                            void 0 !== arguments[0] &&
                                (!0 !== l(arguments[0])
                                    ? h.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset)
                                    : o.scroll.call(
                                          t,
                                          void 0 !== arguments[0].left ? arguments[0].left : "object" !== _typeof(arguments[0]) ? arguments[0] : t.scrollX || t.pageXOffset,
                                          void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset
                                      ));
                        }),
                            (t.scrollBy = function () {
                                void 0 !== arguments[0] &&
                                    (l(arguments[0])
                                        ? o.scrollBy.call(
                                              t,
                                              void 0 !== arguments[0].left ? arguments[0].left : "object" !== _typeof(arguments[0]) ? arguments[0] : 0,
                                              void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0
                                          )
                                        : h.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)));
                            }),
                            (a.prototype.scroll = a.prototype.scrollTo = function () {
                                if (void 0 !== arguments[0])
                                    if (!0 !== l(arguments[0])) {
                                        var t = arguments[0].left,
                                            e = arguments[0].top;
                                        h.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e);
                                    } else {
                                        if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                                        o.elementScroll.call(
                                            this,
                                            void 0 !== arguments[0].left ? ~~arguments[0].left : "object" !== _typeof(arguments[0]) ? ~~arguments[0] : this.scrollLeft,
                                            void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop
                                        );
                                    }
                            }),
                            (a.prototype.scrollBy = function () {
                                void 0 !== arguments[0] &&
                                    (!0 !== l(arguments[0])
                                        ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior })
                                        : o.elementScroll.call(
                                              this,
                                              void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft,
                                              void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop
                                          ));
                            }),
                            (a.prototype.scrollIntoView = function () {
                                if (!0 !== l(arguments[0])) {
                                    var i = (function (t) {
                                            for (; t !== e.body && !1 === f(t); ) t = t.parentNode || t.host;
                                            return t;
                                        })(this),
                                        a = i.getBoundingClientRect(),
                                        n = this.getBoundingClientRect();
                                    i !== e.body
                                        ? (h.call(this, i, i.scrollLeft + n.left - a.left, i.scrollTop + n.top - a.top), "fixed" !== t.getComputedStyle(i).position && t.scrollBy({ left: a.left, top: a.top, behavior: "smooth" }))
                                        : t.scrollBy({ left: n.left, top: n.top, behavior: "smooth" });
                                } else o.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
                            });
                    }
                    function d(t, e) {
                        (this.scrollLeft = t), (this.scrollTop = e);
                    }
                    function l(t) {
                        if (null === t || "object" !== _typeof(t) || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
                        if ("object" === _typeof(t) && "smooth" === t.behavior) return !1;
                        throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.");
                    }
                    function c(t, e) {
                        return "Y" === e ? t.clientHeight + r < t.scrollHeight : "X" === e ? t.clientWidth + r < t.scrollWidth : void 0;
                    }
                    function u(e, i) {
                        var a = t.getComputedStyle(e, null)["overflow" + i];
                        return "auto" === a || "scroll" === a;
                    }
                    function f(t) {
                        var e = c(t, "Y") && u(t, "Y"),
                            i = c(t, "X") && u(t, "X");
                        return e || i;
                    }
                    function p(e) {
                        var i,
                            a,
                            o,
                            r,
                            d = (s() - e.startTime) / n;
                        (r = d = d > 1 ? 1 : d),
                            (i = 0.5 * (1 - Math.cos(Math.PI * r))),
                            (a = e.startX + (e.x - e.startX) * i),
                            (o = e.startY + (e.y - e.startY) * i),
                            e.method.call(e.scrollable, a, o),
                            (a === e.x && o === e.y) || t.requestAnimationFrame(p.bind(t, e));
                    }
                    function h(i, a, n) {
                        var r,
                            l,
                            c,
                            u,
                            f = s();
                        i === e.body ? ((r = t), (l = t.scrollX || t.pageXOffset), (c = t.scrollY || t.pageYOffset), (u = o.scroll)) : ((r = i), (l = i.scrollLeft), (c = i.scrollTop), (u = d)),
                            p({ scrollable: r, method: u, startTime: f, startX: l, startY: c, x: a, y: n });
                    }
                },
            };
        })();
    });
function onYouTubeIframeAPIReady() {
    document.dispatchEvent(new CustomEvent("youtube:ready"));
}
!(function (t) {
    "use strict";
    var e = t(window),
        i = t(document),
        a = e.width(),
        n = t("html"),
        o = t("body"),
        s = a < 768,
        r = a <= 1024,
        d = window.T4Srequest.design_mode,
        l = window.T4Sstrings,
        c = T4SThemeSP.cacheNameFirst,
        u = !!("ontouchstart" in window || (window.DocumentTouch && window.document instanceof DocumentTouch) || window.navigator.maxTouchPoints || window.navigator.msMaxTouchPoints);
    (T4SThemeSP.isHover = n.hasClass("t4sp-hover")),
        (T4SThemeSP.isTouch = u && (!T4SThemeSP.isHover || r)),
        document.addEventListener("theme:hover", function (t) {
            (T4SThemeSP.isHover = !0), (T4SThemeSP.isTouch = !1);
        }),
        (T4SThemeSP.getToFetchSection = function (t, e = "text", i = null) {
            let a = t ? T4SThemeSP.root_url + t : i;
            return fetch(a, { method: "GET", headers: { "Cache-Control": "no-cache" } })
                .then((t) => (t.redirected ? "NVT_94" : "text" == e ? t.text() : t.json()))
                .then((t) => t)
                .catch((t) => (console.warn(t), "NVT_94"));
        }),
        (T4SThemeSP.OverflowScroller = (function () {
            function t(t, e) {
                (!t && a > 767) ||
                    ((this.element = t),
                    (this.options = e),
                    (this.lastKnownY = window.scrollY),
                    (this.currentTop = 0),
                    (this.initialTopOffset = e.offsetTop || parseInt(window.getComputedStyle(this.element).top)),
                    this._attachListeners(),
                    e.updateOffsetTop && ((this.initialTopOffsetCache = this.initialTopOffset), this._updateInitialTopOffset()));
            }
            return (
                (t.prototype = Object.assign({}, t.prototype, {
                    _updateInitialTopOffset: function () {
                        window.addEventListener("T4sHeaderReveal", function () {
                            this.initialTopOffset = this.initialTopOffsetCache;
                        }),
                            window.addEventListener("T4sHeaderHide", function () {
                                this.initialTopOffset = 30;
                            });
                    },
                    _attachListeners: function () {
                        (this._checkPositionListener = this._checkPosition.bind(this)), window.addEventListener("scroll", this._checkPositionListener);
                    },
                    _checkPosition: function () {
                        var t = this;
                        fastdomT4s.measure(function () {
                            var e = t.element.getBoundingClientRect().top + window.scrollY - t.element.offsetTop + t.initialTopOffset,
                                i = t.element.clientHeight - window.innerHeight + (t.options.offsetBottom || 0);
                            window.scrollY < t.lastKnownY ? (t.currentTop -= window.scrollY - t.lastKnownY) : (t.currentTop += t.lastKnownY - window.scrollY),
                                (t.currentTop = Math.min(Math.max(t.currentTop, -i), e, t.initialTopOffset)),
                                (t.lastKnownY = window.scrollY);
                        }),
                            fastdomT4s.mutate(function () {
                                t.element.style.top = "".concat(t.currentTop, "px");
                            });
                    },
                    destroy: function () {
                        window.removeEventListener("scroll", this._checkPositionListener);
                    },
                })),
                t
            );
        })());
    var f = (function () {
            var e = "[data-swatch-item]",
                i = "is--unavailable",
                a = "is--soldout " + i,
                n = window.T4SProductStrings,
                s = n.unavailable,
                r = n.addToCart,
                d = n.soldOut,
                l = n.preOrder,
                c = ((r = n.addToCart), n.replace_qs_atc),
                u = n.replace_qs_pre,
                f = n.badgeSavePercent2,
                p = n.badgeSaveFixed2,
                h = "aria-disabled";
            function m(e) {
                (this.$container = e.$container),
                    (this.variants = e.variants),
                    (this.productOptions = e.productOptions),
                    (this.productOptionSize = e.PrOptionsSize),
                    (this.formSelectorId = e.formSelectorId),
                    (this.$formSelectorId = t(this.formSelectorId)),
                    (this.$originalSelectorId = e.$originalSelectorId),
                    (this.originalSelectorId = this.$originalSelectorId[0]),
                    (this.enableHistoryState = e.enableHistoryState),
                    (this.removeSoldout = e.removeSoldout),
                    (this.$options1 = e.$options1),
                    (this.$options2 = e.$options2),
                    (this.$options3 = e.$options3),
                    (this.isNoPick = e.isNoPick),
                    (this.isNoPickOriginal = e.isNoPick),
                    (this.hasSoldoutUnavailable = e.hasSoldoutUnavailable),
                    (this.canMediaGroup = e.canMediaGroup),
                    (this.badgesConfigs = e.badgesConfigs),
                    (this.$variantImg = e.$variantImg),
                    (this.disableVariantImage = e.disableVariantImage),
                    (this.swatchWidth = e.swatchWidth),
                    (this.$incomingMess = this.$formSelectorId.find("[data-incoming__mess")),
                    (this.isSticky = e.isSticky),
                    (this.useStickySelect = e.useStickySelect),
                    (this.isMainProduct = e.isMainProduct),
                    (this.$quantity = this.$formSelectorId.find("[data-quantity-value")),
                    (this.$mainMedia = this.$container.find("[data-main-media]")),
                    (this.$mainNav = this.$container.find(".t4s-carousel__nav")),
                    (this.clickedOptions = []),
                    (this.showFirstMedia = !this.isNoPickOriginal && e.showFirstMedia),
                    (this.oldVariant = {}),
                    (this.currentVariant = {}),
                    (this.mediaID = 0),
                    (this.eventClickedSwatch = !1),
                    (this.variantState = { available: !0, soldOut: !1, onSale: !1, preOrder: !1, showUnitPrice: !1 }),
                    (this.$productPrice = this.$container.find("[data-product-price]")),
                    (this.formartPrice = "ins-del" == this.$productPrice.data("formartPrice") ? "<ins>money_ins</ins> <del>money_del</del>" : "<del>money_del</del> <ins>money_ins</ins>"),
                    (this.saletype = this.$productPrice.data("saletype"));
                let i = this.$container.find("[data-product-unit-price]");
                (this.$unit_price = i.find("[data-unit-price]")), (this.$unit_base = i.find("[data-unit-base]"));
                let a = this.$container.find("[data-product-single-badge]"),
                    n = this.badgesConfigs.texts,
                    o = this.badgesConfigs.saleStyle;
                if (
                    ((this.badgeSelector = { $onSale: a.find("[data-badge-sale]"), $preOrder: a.find("[data-badge-preorder]"), $soldOut: a.find("[data-badge-soldout]") }),
                    (this.saleLabel = "2" == o ? n.SavePercent : n.sale),
                    (this.useComingMess = !1),
                    this.$incomingMess[0] &&
                        ((this.useComingMess = !0),
                        (this.$incomingAvailable = this.$incomingMess.find("[data-incoming-available]")),
                        (this.$incomingSoldout = this.$incomingMess.find("[data-incoming-soldout]")),
                        (this.$incomingAvailableDate = this.$incomingAvailable.find("[data-incoming-date]")),
                        (this.$incomingSoldoutDate = this.$incomingSoldout.find("[data-incoming-date]"))),
                    (this.$addToCartButton = this.formSelectorId.find('[type="submit"][name="add"]')),
                    (this.$quantityWrapper = this.formSelectorId.find("[data-quantity-wrapper]")),
                    (this.$paymentButton = this.formSelectorId.find(".shopify-payment-button")),
                    (this.$addToCartButtonText = this.$addToCartButton.find(".t4s-btn-atc_text")),
                    this.isSticky)
                ) {
                    let e = t("[data-sticky-addtocart]");
                    (this.$stickyimg = e.find("[data-sticky-img] img")),
                        (this.$stickyVtitle = e.find("[data-sticky-v-title]")),
                        (this.$stickyPrice = e.find("[data-sticky-price]")),
                        (this.$stickyATC = e.find("[data-action-atc]")),
                        (this.$stickyATCText = this.$stickyATC.find(".t4s-btn-atc_text")),
                        (this.$stickySelect = e.find("[data-sticky-select]")),
                        (this.stickyImgOrginal = this.$stickyimg.data("orginal")),
                        (this.$stickyQuantityWrapper = e.find("[data-quantity-wrapper]")),
                        (this.$stickyQuantity = this.$stickyQuantityWrapper.find("[data-quantity-value]")),
                        (this.isStickyChanging = !1),
                        (s = this).$stickySelect.on("change:drop", function (t, e, i) {
                            (s.eventClickedSwatch = !1), (s.isStickyChanging = !0), (s.originalSelectorId.value = i), s.originalSelectorId.dispatchEvent(new Event("change", { bubbles: !0, cancelable: !0 }));
                        });
                }
                var s;
                (T4SThemeSP.isEditCartReplace && ((this.txt_addToCart = c), (this.txt_preOrder = u)),
                (this.unQuickShopInline = e.unQuickShopInline),
                (this.isQuickShopForm = e.isQuickShopForm),
                (this.$imgMainItem = this.$container.find("[data-main-img-change]")),
                e.unQuickShopInline)
                    ? (this.originalSelectorId.addEventListener("change", this._onSelectChange.bind(this)),
                      this._updateSwatchFromSizeOne(),
                      this.isNoPick ? (this.currentVariant = this._getVariantFromVariantid()) : this.originalSelectorId.dispatchEvent(new Event("change", { bubbles: !0, cancelable: !0 })))
                    : ((s = this).$container.one("replace:btnAtc", function () {
                          (s.$addToCartButton = s.$container.find(".t4s-pr-addtocart")), (s.$quantityWrapper = s.$container.find("[data-quantity-wrapper]")), (s.$addToCartButtonText = s.$addToCartButton.find(".t4s-text-pr"));
                      }),
                      (a = s.$container.find("[data-product-badge]")),
                      (s.badgeSelector = { $onSale: a.find("[data-badge-sale]"), $preOrder: a.find("[data-badge-preorder]"), $soldOut: a.find("[data-badge-soldout]") }),
                      (s.$dataHref = s.$container.find("[data-pr-href]")),
                      (s.productHref = s.$dataHref.attr("href")),
                      (s.currentVariant = s._getVariantFromVariantid()),
                      s.$originalSelectorId.on("change", s._onQuickShopInlineChange.bind(s)),
                      s._updateSwatchFromSizeOne());
            }
            return (
                (m.prototype = Object.assign({}, m.prototype, {
                    _onSelectChange: function () {
                        this.eventClickedSwatch || (this.oldVariant = this.currentVariant);
                        var t = this.eventClickedSwatch ? this.currentVariant : this._getVariantFromVariantid();
                        this._setVariantState(t),
                            this._updateSwatchSelector(t, this.oldVariant, this.formSelectorId, this.hasSoldoutUnavailable),
                            this._updatePrice(t, this.oldVariant, this.$container),
                            this._updateAddToCartButton(t, this.oldVariant, this.$addToCartButton, this.$quantityWrapper, this.$paymentButton, this.$addToCartButtonText),
                            this._updateAvailability(t, this.oldVariant, this.$container),
                            this._updateSKU(t, this.oldVariant, this.$container),
                            this._updateBarcode(t, this.oldVariant, this.$container),
                            this._updateMetafield(t, this.oldVariant, this.$container),
                            this._updateDelivery(t, this.oldVariant, this.$container),
                            this._updateInventoryQuantity(t, this.oldVariant, this.$container),
                            this._updatePickupAvailabilityContent(t, this.$container),
                            this._updateNotifyBackinStock(t, this.$container),
                            this._updateBadges(),
                            this._updateIncomingMess(t),
                            t &&
                                ((this.currentVariant = t),
                                this.canMediaGroup && this._updateMediaFilter(t, this.oldVariant, this.$container),
                                this._updateMedia(t, this.oldVariant, this.$container),
                                this._updateQuantity(t),
                                this.disableVariantImage || this._updateVariantImageSwatch(t),
                                this.isSticky && this._updateStickyATC(t),
                                this.enableHistoryState && this._updateHistoryState(t),
                                this.$container.trigger({ type: "variant:changed", currentVariant: t, oldVariant: this.oldVariant }));
                    },
                    _onQuickShopInlineChange: function () {
                        (this.notSelected = !0), this.eventClickedSwatch || (this.oldVariant = this.currentVariant);
                        var t = this.eventClickedSwatch ? this.currentVariant : this._getVariantFromVariantid();
                        this._setVariantState(t),
                            this._updateSwatchSelector(t, this.oldVariant, this.formSelectorId, this.hasSoldoutUnavailable),
                            this._updatePrice(t, this.oldVariant, this.$container),
                            this._updateAtcBtnQSInline(t, this.oldVariant, this.$addToCartButton, this.$quantityWrapper, this.$addToCartButtonText),
                            this._updateBadges(),
                            t &&
                                ((this.currentVariant = t),
                                this._updateMedia(t, this.oldVariant, this.$container),
                                this._updateQuantity(t),
                                this.$dataHref.attr("href", this._getUrlWithVariant(this.productHref, t.id)),
                                this.disableVariantImage || this._updateVariantImageSwatch(t),
                                this.$container.trigger({ type: "variant:changed", currentVariant: t, oldVariant: this.oldVariant }));
                    },
                    _getVariantFromOptions: function () {
                        var t = this.clickedOptions;
                        return (
                            this.variants.find(function (e) {
                                return t.every(function (t) {
                                    return e[t.index] === t.value;
                                });
                            }) || "nathan"
                        );
                    },
                    _getVariantFromSize: function () {
                        var e,
                            i = this.variants,
                            a = this.productOptionSize,
                            n = this.removeSoldout,
                            o = this.clickedOptions[0].value,
                            s = this.clickedOptions[1],
                            r = (this.clickedOptions[2], this.clickedCurrentValue),
                            d = this.clickedCurrentIndex;
                        return (
                            1 == a
                                ? (e = t.grep(i, function (t, e) {
                                      return t.available;
                                  }))
                                : (3 == a) & n
                                ? ((s = s.value),
                                  (e = t.grep(i, function (t, e) {
                                      return t.option1 == o && t.option2 == s && t.available;
                                  }))[0] ||
                                      (e = t.grep(i, function (t, e) {
                                          return t.available && t[d] == r;
                                      })))
                                : n
                                ? (e = t.grep(i, function (t, e) {
                                      return t.option1 == o && t.available;
                                  }))[0] ||
                                  (e = t.grep(i, function (t, e) {
                                      return t.available && t[d] == r;
                                  }))
                                : 3 == a
                                ? ((s = s.value),
                                  (e = t.grep(i, function (t, e) {
                                      return t.option1 == o && t.option2 == s;
                                  }))[0] ||
                                      (e = t.grep(i, function (t, e) {
                                          return t[d] == r;
                                      })))
                                : (e = t.grep(i, function (t, e) {
                                      return t.option1 == o;
                                  }))[0] ||
                                  (e = t.grep(i, function (t, e) {
                                      return t[d] == r;
                                  })),
                            e[0]
                        );
                    },
                    _getVariantFromVariantid: function () {
                        var t = [],
                            e = this.variants,
                            i = e.length,
                            a = this.$originalSelectorId.val();
                        for (let n = 0; n < i; n++)
                            if (e[n].id == a) {
                                t[0] = e[n];
                                break;
                            }
                        return t[0] || null;
                    },
                    _getVariantFromOptionIndex: function (e, i) {
                        var a,
                            n = this.variants,
                            o = i.option1,
                            s = i.option2,
                            r = i.option3;
                        switch (e) {
                            case 1:
                                a = t.grep(n, function (t, e) {
                                    return t.option1 == o;
                                });
                                break;
                            case 2:
                                a = t.grep(n, function (t, e) {
                                    return t.option2 == s;
                                });
                                break;
                            case 3:
                                a = t.grep(n, function (t, e) {
                                    return t.option3 == r;
                                });
                                break;
                            case 1.2:
                                a = t.grep(n, function (t, e) {
                                    return t.option1 == o && t.option2 == s;
                                });
                                break;
                            default:
                                a = t.grep(n, function (t, e) {
                                    return 0 == t.available;
                                });
                        }
                        return a || "nathan";
                    },
                    _updateMediaFilterNoPick: function () {
                        if (this.clickedCurrentValue && this.clickedCurrentIndex && this.canMediaGroup) {
                            var t = this.clickedCurrentIndex.replace("option", ""),
                                e = this.productOptions[parseInt(t) - 1].name || "not4s",
                                i = this.clickedCurrentValue || "not4s",
                                a = this.$mainMedia,
                                n = this.$mainNav,
                                o = `[data-grname="${(e + "").toLowerCase()}"][data-grpvl="${(i + "").toLowerCase()}"]`,
                                s = a.find(o),
                                r = n.find(o);
                            0 != s.length &&
                                (a.find("[data-main-slide]").addClass("is--media-hide"),
                                s.removeClass("is--media-hide"),
                                n.find(".t4s-carousel__nav-item").addClass("is--media-hide"),
                                r.removeClass("is--media-hide"),
                                a.hasClass("flickityt4s-enabled") ? (a.trigger("update.flickityt4s"), r.hasClass("is-nav-selected") || r.first().addClass("is-nav-selected")) : a.hasClass("isotopet4s-enabled") && (b(a), a.isotopet4s()));
                        }
                    },
                    _updateSwatchFromSizeOne: function () {
                        var t,
                            e = this.variants,
                            i = e.length,
                            a = !1,
                            n = 0,
                            o = this.productOptionSize,
                            s = this.productOptions;
                        if (3 == o)
                            var r = s[0].values.length,
                                d = s[1].values.length,
                                l = s[2].values.length;
                        else if (2 == o) (r = s[0].values.length), (d = s[1].values.length);
                        if (
                            (o < 2
                                ? ((a = 1), (t = this.$options1))
                                : 2 == o && 1 == r
                                ? ((a = 1), (t = this.$options2), (n = 1))
                                : 2 == o && 1 == d
                                ? ((a = 1), (t = this.$options1))
                                : 3 == o && 1 == r && 1 == d
                                ? ((a = 1), (t = this.$options3), (n = 2))
                                : 3 == o && 1 == r && 1 == l
                                ? ((a = 1), (t = this.$options2), (n = 1))
                                : 3 == o && 1 == d && 1 == l
                                ? ((a = 1), (t = this.$options1))
                                : 3 == o && 1 == l && (a = 2),
                            this.hasSoldoutUnavailable)
                        ) {
                            let t = s[n].values,
                                a = t.length,
                                o = this[`$options${n + 1}`].find("[data-swatch-item]");
                            for (let s = 0; s < a; s++) {
                                let a = !0,
                                    r = t[s];
                                for (let t = 0; t < i; t++) {
                                    let i = e[t];
                                    if (i.options[n] == r && i.available) {
                                        a = !1;
                                        break;
                                    }
                                }
                                a && o.eq(s).addClass("is--soldout");
                            }
                        }
                        (this.getProductSize = a), (this.$optionsOne = t), (this.$optionsOneIndex = n);
                    },
                    _updateMediaFilter: function (t, e, i) {
                        if (this.currentVariant && this.canMediaGroup) {
                            var a,
                                n,
                                o,
                                s,
                                r,
                                d = this.productOptions,
                                l = this.productOptionSize,
                                c = this.currentVariant,
                                u = this.$mainMedia,
                                f = this.$mainNav;
                            for (let t = 0; t < l; t++)
                                if (((s = d[t].name || "not4s"), 0 != u.find(`[data-grname="${(s + "").toLowerCase()}"]`).length)) {
                                    (r = c.options[t] + ""), (a = `[data-grname="${(s + "").toLowerCase()}"][data-grpvl="${r.toLowerCase()}"]`);
                                    break;
                                }
                            if (((n = u.find(a)), (o = f.find(a)), 0 != n.length && r != this.groupValue))
                                if (
                                    ((this.groupValue = r),
                                    u.find("[data-main-slide]").addClass("is--media-hide"),
                                    n.removeClass("is--media-hide"),
                                    f.find(".t4s-carousel__nav-item").addClass("is--media-hide"),
                                    o.removeClass("is--media-hide"),
                                    u.hasClass("flickityt4s-enabled"))
                                ) {
                                    if ((u.trigger("update.flickityt4s"), t.featured_media)) var p = u.find(`[data-media-id="${t.featured_media.id}"`).index();
                                    u.flickityt4s("selectCell", p, !1, !1);
                                } else u.hasClass("isotopet4s-enabled") && (b(u), u.isotopet4s());
                        }
                    },
                    _updateSwatchSelector: function (t, n, o, s) {
                        var r,
                            d,
                            l,
                            c,
                            u,
                            f,
                            p,
                            h = 1,
                            m = this.$options1,
                            g = this.$options2,
                            v = this.$options3,
                            y = this.getProductSize || this.productOptionSize,
                            b = [],
                            S = 0,
                            w = t.option1,
                            T = t.option2,
                            _ = t.option3,
                            $ = [],
                            C = [],
                            k = [];
                        if (
                            (o.find(".is--selected").removeClass("is--selected"),
                            o.find("[data-current-value]").html(""),
                            ($ = this.productOptions[0].values),
                            m.find("[data-current-value]").html(w),
                            m.find(e).eq($.indexOf(w)).addClass("is--selected"),
                            g[0] && ((C = this.productOptions[1].values), g.find("[data-current-value]").html(T), g.find(e).eq(C.indexOf(T)).addClass("is--selected")),
                            v[0] && ((k = this.productOptions[2].values), v.find("[data-current-value]").html(_), v.find(e).eq(k.indexOf(_)).addClass("is--selected")),
                            s)
                        )
                            switch (y) {
                                case 3:
                                    for (
                                        1 == k.length ? ((r = m), (d = $), (l = "option3"), (c = _), (u = "option1"), (h = 3)) : ((r = v), (d = k), (l = "option1"), (c = w), (u = "option3")),
                                            S = (b = this._getVariantFromOptionIndex(h, t)).length,
                                            r.find(e).addClass(a),
                                            g.find(e).addClass(a),
                                            p = 0;
                                        p < S;
                                        p++
                                    )
                                        (f = b[p])[l] == c &&
                                            (f.available
                                                ? (g.find(e).eq(C.indexOf(f.option2)).removeClass(a), f.option2 == T && r.find(e).eq(d.indexOf(f[u])).removeClass(a))
                                                : (g.find(e).eq(C.indexOf(f.option2)).removeClass(i), f.option2 == T && r.find(e).eq(d.indexOf(f[u])).removeClass(i)));
                                    break;
                                case 2:
                                    for (S = (b = this._getVariantFromOptionIndex(1, t)).length, g.find(e).addClass(a), p = 0; p < S; p++)
                                        (f = b[p]).option1 == w &&
                                            g
                                                .find(e)
                                                .eq(C.indexOf(f.option2))
                                                .removeClass(f.available ? a : i);
                                    break;
                                default:
                                    this.removeSoldout && this.$optionsOne.find(".is--selected").is(":hidden") && this.$optionsOne.find("[data-swatch-item]:visible:first").trigger("click");
                            }
                    },
                    _updateMetafield: function (e, i, a) {
                        e &&
                            e.id != i.id &&
                            (a.find("[data-variant-toggle]").hide(),
                            a.find(`[data-variant-toggle="${e.id}"]`).show(),
                            this.isMainProduct && (t("[data-variant-tab][data-variant-toggle]").hide(), t(`[data-variant-tab][data-variant-toggle="${e.id}"]`).show()));
                    },
                    _updateMedia: function (t, e, i) {
                        if (t.featured_media && JSON.stringify(t.featured_media) !== JSON.stringify(e.featured_media) && !this.showFirstMedia) {
                            if (!this.unQuickShopInline || this.isQuickShopForm) {
                                let e = t.featured_media.preview_image,
                                    i = !0,
                                    a = this.$imgMainItem.hasClass("lazyloadt4sed") && i ? 0 : 100;
                                return (
                                    setTimeout(
                                        function () {
                                            this.$imgMainItem.attr("data-srcset", T4SThemeSP.Images.getNewImageUrl(e.src, 1)), (i = !1);
                                        }.bind(this),
                                        a
                                    ),
                                    void (this.notSelected && (this.$container.addClass("t4s-colors-selected"), (this.notSelected = !1)))
                                );
                            }
                            this.mediaID = t.featured_media.id;
                            var a = i.find("[data-main-media]");
                            if (a.hasClass("flickityt4s-enabled")) {
                                var n = a.find('[data-media-id="' + this.mediaID + '"]').index();
                                a.flickityt4s("select", n, !1, !0), (this.eventClickedSwatch = !1);
                            } else if (!a.hasClass("t4s-of-scrollIntoView")) {
                                var o = a.find('[data-media-id="' + this.mediaID + '"]'),
                                    s = o[0];
                                if (!s || T4SThemeSP.isVisible(o) || this.isStickyChanging) return;
                                this.header || (this.header = document.querySelector(".t4s-section-header")),
                                    this.header.dispatchEvent(new Event("preventHeaderReveal")),
                                    window.setTimeout(() => {
                                        (a[0].scrollLeft = 0), s.scrollIntoView({ behavior: "smooth" });
                                    });
                            }
                        } else this.showFirstMedia = !1;
                    },
                    _updateMediaFirst: function (t) {
                        if (this.unQuickShopInline) return;
                        var e = t.closest("[data-swatch-option]");
                        if (!e.hasClass("is-t4s-style__color")) return;
                        let i = this.variants,
                            a = i.length,
                            n = e.data("id");
                        let o = (function (t) {
                            for (let e = 0; e < a; e++) {
                                let a = i[e];
                                if (a.featured_media && (a.options[n] + "").toLowerCase() == t) return a.featured_media.preview_image;
                            }
                        })((t.data("value") + "").toLowerCase());
                        o && this.$imgMainItem.attr("data-srcset", T4SThemeSP.Images.getNewImageUrl(o.src, 1));
                    },
                    _updatePrice: function (t, e, i) {
                        if (!t) return void this.$productPrice.hide();
                        let a = t.price,
                            s = t.compare_at_price;
                        if (!this.isNoPickOriginal && a === e.price && s === e.compare_at_price && t.unit_price === e.unit_price) return;
                        this.isNoPickOriginal && (this.isNoPickOriginal = !1);
                        let r = T4SThemeSP.Currency.formatMoney(a);
                        if ((this.$productPrice.show(), this.variantState.onSale)) {
                            let t = T4SThemeSP.Currency.formatMoney(s),
                                e = this.formartPrice.replace("money_ins", r).replace("money_del", t),
                                i = s - a,
                                o = (100 * i) / s,
                                d = Math.round(o);
                            void 0 !== n.price_template && (e = n.price_template.replace("INS", r).replace("DEL", t)),
                                this.isSticky && this.$stickyPrice.html(e),
                                this.badgeSelector.$onSale.html(this.saleLabel.replace("[sale]", d)),
                                "1" == this.saletype
                                    ? (e += ` <span class="t4s-badge-price">${f.replace("[sale]", d)}</span>`)
                                    : "2" == this.saletype && (e += ` <span class="t4s-badge-price">${p.replace("[sale]", T4SThemeSP.Currency.formatMoney(i))}</span>`),
                                this.$productPrice.html(e);
                        } else this.$productPrice.html(r), this.isSticky && this.$stickyPrice.html(r);
                        this.variantState.showUnitPrice && (this.$unit_price.html(T4SThemeSP.Currency.formatMoney(t.unit_price)), this.$unit_base.html(T4SThemeSP.Currency.getBaseUnit(t))),
                            this.$container.find("shopify-payment-terms").attr("variant-id", t.id),
                            o.trigger("currency:update");
                    },
                    _updateQuantity: function (t) {
                        var e = t.quantity_rule.min || 1,
                            i = t.quantity_rule.max || 9999;
                        if (this.variantState.preOrder) this.$quantity.attr({ min: e, max: i }), this.isSticky && this.$stickyQuantity.attr({ min: e, max: i });
                        else if (null != t.inventory_management && "continue" != t.inventory_policy) {
                            let a = t.inventory_quantity;
                            a < i && (i = a),
                                this.$quantity.attr({ min: e, max: i }),
                                this.isSticky && this.$stickyQuantity.attr({ min: e, max: i }),
                                parseInt(this.$quantity.val()) > a && this.$quantity.attr("value", 1).val(1),
                                this.isSticky && parseInt(this.$stickyQuantity.val()) > a && this.$stickyQuantity.attr("value", 1).val(1);
                        } else this.$quantity.attr({ min: e, max: i }), this.isSticky && this.$stickyQuantity.attr({ min: e, max: i });
                    },
                    _updateAvailability: function (t, e, i) {
                        var a = i.find("[data-product-available]");
                        if (a[0]) {
                            var n = a.find("[data-available-status]"),
                                o = a.find("[data-soldout-status]"),
                                s = a.find("[data-instock-status]"),
                                r = a.find("[data-preorder-status]");
                            t ? (a.show(), this.variantState.available ? (n.show(), o.hide(), this.variantState.preOrder ? (r.show(), s.hide()) : (s.show(), r.hide())) : (o.show(), n.hide())) : a.hide();
                        }
                    },
                    _updateBarcode: function (t, e, i) {
                        var a = i.find("[data-product-barcode]");
                        if (a[0]) {
                            var n = a.find("[data-product__barcode-number]");
                            if (t && "" !== t.barcode) {
                                if (e && e.barcode === t.barcode) return;
                                n.text(t.barcode), a.show(0);
                            } else a.hide(0);
                        }
                    },
                    _updateSKU: function (t, e, i) {
                        var a = i.find("[data-product-sku]");
                        if (a[0]) {
                            var n = a.find("[data-product__sku-number]");
                            if (t && "" !== t.sku) {
                                if (e && e.sku === t.sku) return;
                                n.text(t.sku), a.show(0);
                            } else a.hide(0);
                        }
                    },
                    _updateAddToCartButton: function (t, e, i, a, n, o) {
                        if (i[0] || n[0])
                            if ((T4SThemeSP.isEditCartReplace && !i.is("[data-replace-item]") && i.attr("data-replace-item", ""), t && "nathan" != t))
                                if (t.available) {
                                    let t = this.variantState.preOrder ? this.txt_preOrder || l : this.txt_addToCart || r;
                                    a.show(),
                                        i.removeAttr("disabled " + h).attr("data-atc-form", ""),
                                        o.text(t),
                                        n.show(),
                                        this.isSticky && (this.$stickyQuantityWrapper.show(), this.$stickyATC.removeAttr("disabled " + h), this.$stickyATCText.text(t));
                                } else
                                    a.hide(),
                                        i.attr("disabled", "disabled").attr(h, !0).removeAttr("data-atc-form", ""),
                                        o.text(d),
                                        n.hide(),
                                        this.isSticky && (this.$stickyQuantityWrapper.hide(), this.$stickyATC.attr("disabled", "disabled").attr(h, !0), this.$stickyATCText.text(d));
                            else
                                i.attr("disabled", "disabled").attr(h, !0).removeAttr("data-atc-form"),
                                    o.text(s),
                                    a.hide(),
                                    n.hide(),
                                    this.isSticky && (this.$stickyQuantityWrapper.hide(), this.$stickyATC.attr("disabled", "disabled").attr(h, !0), this.$stickyATCText.text(s));
                    },
                    _updateAtcBtnQSInline: function (t, e, i, a, n) {
                        if (i[0])
                            if (t && "nathan" != t)
                                if (t.available) {
                                    let e = this.variantState.preOrder ? this.txt_preOrder || l : this.txt_addToCart || r;
                                    a.show(),
                                        i
                                            .removeAttr("disabled " + h)
                                            .attr("data-action-atc", "")
                                            .attr("data-variant-id", t.id),
                                        n.text(e);
                                } else a.hide(), i.attr("disabled", "disabled").attr(h, !0).removeAttr("data-action-atc", ""), n.text(d);
                            else i.attr("disabled", "disabled").attr(h, !0).removeAttr("data-action-atc"), n.text(s), a.hide();
                    },
                    _updateDelivery: function (t, e, i) {
                        var a = i.find("[data-order-delivery]");
                        if (a[0])
                            if (t && t.available) {
                                var n = S(a.attr("data-order-delivery"));
                                this.variantState.preOrder && n.hideWithPreorder ? a.hide() : a.show();
                            } else a.hide();
                    },
                    _updateInventoryQuantity: function (t, e, i) {
                        var a = i.find("[data-inventory-qty]");
                        a[0] && (t && t.available ? a.trigger({ type: "variant:inventory", currentVariant: t, oldVariant: this.oldVariant }) : a.hide());
                    },
                    _updatePickupAvailabilityContent: function (t, e) {
                        let i = t.available ? "pickupAvailability:update" : "pickupAvailability:clear";
                        e.trigger({ type: i, currentVariant: t });
                    },
                    _updateNotifyBackinStock: function (t, e) {
                        let i = this.variantState.available ? "notifyBackinStock:hide" : "notifyBackinStock:show";
                        e.trigger({ type: i, currentVariant: t });
                    },
                    _updateBadges: function () {
                        let t = this.variantState,
                            e = this.badgeSelector;
                        t.onSale ? e.$onSale.removeAttr("hidden") : e.$onSale.attr("hidden", !0),
                            t.preOrder ? e.$preOrder.removeAttr("hidden") : e.$preOrder.attr("hidden", !0),
                            t.soldOut ? e.$soldOut.removeAttr("hidden") : e.$soldOut.attr("hidden", !0);
                    },
                    _setVariantState: function (t) {
                        t
                            ? (this.variantState = {
                                  available: t.available,
                                  soldOut: !t.available,
                                  onSale: t.compare_at_price > t.price,
                                  showUnitPrice: !!t.unit_price,
                                  preOrder: "shopify" == t.inventory_management && t.inventory_quantity <= 0 && t.available,
                              })
                            : (this.variantState.available = !1);
                    },
                    _updateVariantImageSwatch: function (t) {
                        if (!t.featured_image) return;
                        let e = this.$variantImg.find(".is--selected"),
                            i = e.find("[data-img-el]");
                        (e = i[0] ? i : e).attr("data-bg", T4SThemeSP.Images.getNewImageUrl(t.featured_image.src, this.swatchWidth));
                    },
                    _updateIncomingMess: function (t) {
                        if (!this.useComingMess) return;
                        let e = t.next_incoming_date,
                            i = t.inventory_quantity,
                            a = t.incoming,
                            n = t.inventory_management;
                        t && e && !(i > 0) && a && "shopify" == n
                            ? (this.$incomingMess.removeAttr("hidden"),
                              this.variantState.available
                                  ? (this.$incomingAvailableDate.html(e), this.$incomingSoldout.hide(), this.$incomingAvailable.show())
                                  : (this.$incomingSoldoutDate.html(e), this.$incomingAvailable.hide(), this.$incomingSoldout.show()))
                            : this.$incomingMess.attr("hidden", "");
                    },
                    _updateStickyATC: function (t) {
                        (this.isStickyChanging = !1),
                            this.$stickyimg.attr("data-src", t.featured_image ? T4SThemeSP.Images.lazyloadImagePath(t.featured_image.src) : this.stickyImgOrginal),
                            this.useStickySelect
                                ? t.available &&
                                  (this.$stickyVtitle.find("[data-dropdown-open]>span").text(t.title),
                                  this.$stickySelect.find("[data-dropdown-item]").removeClass("is--selected"),
                                  this.$stickySelect.find(`[data-dropdown-item][data-value="${t.id}"]`).addClass("is--selected"))
                                : this.$stickyVtitle.html(t.title),
                            this.$stickyATC.attr("data-variant-id", t.id);
                    },
                    _updateHistoryState: function (t) {
                        if (history.replaceState && t) {
                            var e = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + t.id;
                            window.history.replaceState({ path: e }, "", e);
                        }
                    },
                    _getUrlWithVariant: function (t, e) {
                        return /variant=/.test(t) ? t.replace(/(variant=)[^&]+/, "$1" + e) : /\?/.test(t) ? t.concat("&variant=").concat(e) : t.concat("?variant=").concat(e);
                    },
                })),
                m
            );
        })(),
        p = (function () {
            var e = "data-animation-atc",
                i = T4Sconfigs.timezone,
                a = "t4_nt_guess";
            try {
                a = dayjs.tz.guess();
            } catch (t) {}
            var n = "not4" != i && a != i;
            function o(t) {
                (this.$container = t), this.BootSalesInt();
            }
            function s(t) {
                if (0 != t.length) {
                    var i = S(t.attr(e)),
                        a = i.ani;
                    if ("none" != a) {
                        var n = "is--animated " + a,
                            o = parseInt(i.time),
                            s = parseInt(i.animTime) || 1e3;
                        setInterval(function () {
                            t.addClass(n),
                                setTimeout(function () {
                                    t.removeClass(n);
                                }, s);
                        }, o);
                    }
                }
            }
            return (
                (o.prototype = Object.assign({}, o.prototype, {
                    BootSalesInt: function () {
                        this._liveView(), this._flashSold(), this._animationATC(), this._orderDelivery(), this._inventoryQuantity(), this._countdown();
                    },
                    _getRandomInt: function (t, e) {
                        return Math.floor(Math.random() * (e - t + 1)) + t;
                    },
                    _animationATC: function () {
                        var t = this.$container.find("[" + e + "]");
                        return s(t), void t.length;
                    },
                    _liveView: function () {
                        var t = this.$container.find("[data-live-view]");
                        if (0 != t.length) {
                            var e = S(t.attr("data-live-view")),
                                i = this,
                                a = e.min,
                                n = e.max,
                                o = e.interval,
                                s = i._getRandomInt(a, n),
                                r = ["1", "2", "4", "3", "6", "10", "-1", "-3", "-2", "-4", "-6"],
                                d = ["10", "20", "15"],
                                l = "",
                                c = "",
                                u = "",
                                f = t.find("[data-count]");
                            p(), t.show(), setInterval(p, o);
                        }
                        function p() {
                            if (((l = Math.floor(Math.random() * r.length)), (c = r[l]), (s = parseInt(s) + parseInt(c)), a >= s)) {
                                u = Math.floor(Math.random() * d.length);
                                var t = d[u];
                                s += t;
                            }
                            (s < a || s > n) && (s = i._getRandomInt(a, n)), f.html(parseInt(s));
                        }
                    },
                    _flashSold: function () {
                        var t = this.$container.find("[data-flash-sold]");
                        if (0 != t.length) {
                            var e = S(t.attr("data-flash-sold")),
                                i = this,
                                a = e.mins,
                                n = e.maxs,
                                o = e.mint,
                                s = e.maxt,
                                r = e.id,
                                d = sessionStorage.getItem("soldS" + r) || i._getRandomInt(a, n),
                                l = sessionStorage.getItem("soldT" + r) || i._getRandomInt(o, s),
                                c = parseInt(d),
                                u = parseInt(l),
                                f = parseInt(e.time),
                                p = t.find("[data-sold]"),
                                h = t.find("[data-hour]");
                            g(),
                                m(c, u),
                                t.show(),
                                setInterval(function () {
                                    (c += i._getRandomInt(1, 4)), (u += 1 * (Math.random() * (0.8 - 0.1) + 0.1).toFixed(1)), g(), m(c, u);
                                }, f);
                        }
                        function m(t, e) {
                            p.html(t), h.html(Math.floor(u)), sessionStorage.setItem("soldS" + r, t), sessionStorage.setItem("soldT" + r, e);
                        }
                        function g() {
                            c > n && (c = i._getRandomInt(a, n)), u > s && (u = i._getRandomInt(o, s));
                        }
                    },
                    _orderDelivery: function () {
                        var e = this.$container.find("[data-order-delivery]");
                        if (0 != e.length) {
                            var a = S(e.attr("data-order-delivery")),
                                o = a.format_day,
                                s = a.time.replace("24:00:00", "23:59:59") || "19041994",
                                r = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                                d = a.estimateStartDate || 0,
                                l = a.estimateEndDate || 0,
                                c = a.cut_day.replace(/ /g, "").split(","),
                                u = dayjs(),
                                f = 0,
                                p = dayjs(),
                                h = 0,
                                m = a.timezone,
                                g = dayjs(),
                                v = g.format("HHmmss"),
                                y = s.replace(/ /g, "").replace(/:/g, ""),
                                b = T4SProductStrings.order_dayNames.replace(/ /g, "").split(","),
                                w = T4SProductStrings.order_monthNames.replace(/ /g, "").split(",");
                            if (n && m)
                                try {
                                    v = (g = dayjs.tz(g, i)).format("HHmmss");
                                } catch (t) {
                                    console.log("Timezone error: " + i);
                                }
                            if ((parseInt(v) >= parseInt(y) && ((g = g.add(1, "day")), (u = u.add(1, "day")), (p = p.add(1, "day"))), "2" == a.mode)) {
                                for (; c.indexOf(r[u.format("d")]) > -1; ) u = u.add(1, "day");
                                for (; f < d; ) f++, (u = u.add(1, "day")), c.indexOf(r[u.format("d")]) > -1 && f--;
                                for (; c.indexOf(r[p.format("d")]) > -1; ) p = p.add(1, "day");
                                for (; h < l; ) h++, (p = p.add(1, "day")), c.indexOf(r[p.format("d")]) > -1 && h--;
                            } else {
                                for (u = u.add(d, "day"); c.indexOf(r[u.format("d")]) > -1; ) u = u.add(1, "day");
                                for (p = p.add(l, "day"); c.indexOf(r[p.format("d")]) > -1; ) p = p.add(1, "day");
                            }
                            (b = O(b)), (w = O(w));
                            var T = parseInt(u.format("D")),
                                _ = T + V(T),
                                $ = w[parseInt(u.format("M")) - 1],
                                C = b[parseInt(u.format("d"))],
                                k = parseInt(p.format("D")),
                                I = k + V(k),
                                x = w[parseInt(p.format("M")) - 1],
                                P = b[parseInt(p.format("d"))];
                            if (
                                (e.find("[data-start-delivery]").html(u.format(o).replace("t44", C).replace("t45", _).replace("t46", $)),
                                e.find("[data-end-delivery]").html(p.format(o).replace("t44", P).replace("t45", I).replace("t46", x)),
                                "19041994" != s)
                            ) {
                                var M = e.find("[data-hour-delivery]");
                                M.countdown(g.format("YYYY-MM-DD " + s), { elapse: !0 }).on("update.countdown", function (i) {
                                    if (i.elapsed) e.hide();
                                    else {
                                        var a = 24 * i.offset.totalDays + i.offset.hours;
                                        M.html(i.strftime(t.trim(M.html().replace("[totalHours]", a)))).show();
                                    }
                                });
                            }
                            e.show();
                        }
                        function O(t) {
                            return t.filter(function (t, e, i) {
                                return i.indexOf(t) === e;
                            });
                        }
                        function V(t) {
                            if (t > 3 && t < 21) return "th";
                            switch (t % 10) {
                                case 1:
                                    return "st";
                                case 2:
                                    return "nd";
                                case 3:
                                    return "rd";
                                default:
                                    return "th";
                            }
                        }
                    },
                    _inventoryQuantity: function () {
                        var t = this.$container.find("[data-inventory-qty]");
                        if (0 != t.length) {
                            t.removeAttr("data-ttcalc");
                            var e = S(t.attr("data-inventory-qty")),
                                i = this,
                                a = e.stock,
                                n = e.qty,
                                o = e.total,
                                s = e.min,
                                r = e.max,
                                l = e.reduce,
                                c = e.bgprocess,
                                u = e.bgten,
                                f = e.id,
                                p = e.inventoryQty || 0,
                                h = null,
                                m = null,
                                g = 1,
                                v = 1.7,
                                y = 0.17,
                                b = i._getRandomInt(s, r),
                                w = t.find("[data-count]"),
                                T = t.find("[data-progressbar]"),
                                _ = t.find("[data-message]"),
                                $ = T.find(">div");
                            if (
                                (t.on("variant:inventory", function (e) {
                                    if ("2" != a) {
                                        var o = e.currentVariant,
                                            d = o.inventory_quantity || 0;
                                        if (((f = o.id), (d >= n || d < 1) && "1" == a)) t.hide();
                                        else {
                                            (d >= n || 0 == d) && isStorageSpSession && ((d = sessionStorage.getItem("probar" + f) || i._getRandomInt(s, r)), t.attr("data-variant-qty" + f, d)),
                                                t.attr("data-variant-qty" + f, d),
                                                sessionStorage.setItem("probar" + f, d),
                                                w.text(d);
                                            var l = (100 * d) / t.attr("data-ttcalc"),
                                                p = d < 10 ? u : c;
                                            $.css({ "background-color": p, width: l + "%" }), _.show(), T.show(), t.show();
                                        }
                                    } else t.show();
                                }),
                                !(p >= n || p < 1) || "1" != a)
                            ) {
                                if ((p < n && p > 0 && (b = p), isStorageSpSession && !d && "1" != a)) {
                                    var C = sessionStorage.getItem("probar" + f);
                                    C > 0 && (b = C);
                                }
                                w.text(b).css({ "background-color": "#fff", color: c }),
                                    k(b, c, u),
                                    _.show(),
                                    T.show(),
                                    (function () {
                                        if (!l) return;
                                        (h = setTimeout(function () {
                                            --b < g && (b = I(t.attr("data-variant-qty" + f)) || i._getRandomInt(s, r)),
                                                w.css({ "background-color": c, color: "#fff" }),
                                                setTimeout(function () {
                                                    w.css({ "background-color": "#fff", color: c });
                                                }, 1800),
                                                w.text(b),
                                                k(b, c, u);
                                        }, 6e4 * y)),
                                            (m = setInterval(function () {
                                                --b < g && ((b = I(t.attr("data-variant-qty" + f)) || i._getRandomInt(s, r)), t.on("destroy:inventoryQty").hide()),
                                                    w.css({ "background-color": c, color: "#fff" }),
                                                    setTimeout(function () {
                                                        w.css({ "background-color": "#fff", color: c });
                                                    }, 1800),
                                                    w.text(b),
                                                    k(b, c, u);
                                            }, 6e4 * v));
                                    })(),
                                    t.on("destroy:inventoryQty", function () {
                                        clearTimeout(h), clearInterval(m);
                                    }),
                                    t.on("update:inventoryQty", function () {
                                        var e = parseInt(w.text()) - 1;
                                        if (!(e < 1)) {
                                            w.text(e);
                                            var i = (100 * e) / t.attr("data-ttcalc"),
                                                a = e < 10 ? u : c;
                                            $.css({ "background-color": a, width: i + "%" });
                                        }
                                    });
                            }
                        }
                        function k(e, i, a) {
                            (e = parseInt(e)), isStorageSpSession && sessionStorage.setItem("probar" + f, e), (o = t.attr("data-ttcalc") || o > e ? o : e + o), t.attr("data-ttcalc", o);
                            var n = (100 * e) / o,
                                s = e < 10 ? a : i;
                            $.css("background-color", s),
                                setTimeout(function () {
                                    $.css("width", n + "%");
                                }, 300),
                                $.css("background-color", s);
                        }
                        function I(t) {
                            return t || 0;
                        }
                    },
                    _countdown: function () {
                        var t = this.$container.find("[data-countdown-pr]");
                        if (0 != t.length) {
                            var e,
                                a = t.find("[data-cd-options]"),
                                o = S(a.attr("data-cd-options"));
                            if (!o.isCountdownMeta) {
                                e = o.cd_date.replace("24:00:00", "23:59:59").split(",");
                                var s,
                                    r,
                                    d = dayjs(),
                                    l = d.format("HHmmss"),
                                    c = e.length;
                                if (n)
                                    try {
                                        l = (d = dayjs.tz(d, i)).format("HHmmss");
                                    } catch (t) {
                                        console.log("Timezone error: " + i);
                                    }
                                for (s = 0; s < c; s++) {
                                    if (parseInt(e[s].replace(/:/g, "")) >= l) {
                                        r = e[s];
                                        break;
                                    }
                                    s == c - 1 && (r = e[s]);
                                }
                                a.attr("data-date", d.format("YYYY-MM-DD") + " " + r);
                            }
                            a.attr("data-countdown-t4s", ""), T4SThemeSP.Countdown();
                        }
                    },
                })),
                { init: o, ani: s }
            );
        })(),
        h = (function () {
            var t = {},
                e = { shopify: "shopify", external: "external" },
                i = { productMediaWrapper: "[data-product-single-media-wrapper]" },
                a = { enableVideoLooping: "enable-video-looping", enableVideoMuting: "enable-video-muting", enableVideoAutoplaying: "enable-video-autoplaying", videoId: "video-id" };
            function n(i) {
                i
                    ? (function () {
                          for (var i in t)
                              if (t.hasOwnProperty(i)) {
                                  var a = t[i];
                                  if (a.nativeVideo) continue;
                                  a.host === e.shopify && (a.element.setAttribute("controls", "controls"), (a.nativeVideo = !0));
                              }
                      })()
                    : o();
            }
            function o() {
                for (var e in t) {
                    if (t.hasOwnProperty(e)) t[e].ready();
                }
            }
            return {
                init: function (o, s) {
                    if (o) {
                        var r = o.querySelector("iframe, video");
                        if (r) {
                            var d = o.getAttribute("data-nt-media-id");
                            (t[d] = {
                                mediaId: d,
                                sectionId: s,
                                host: ((l = r), "VIDEO" === l.tagName ? e.shopify : e.external),
                                container: o,
                                element: r,
                                ready: function () {
                                    !(function (t) {
                                        if (!t.player) {
                                            var e = t.container.closest(i.productMediaWrapper),
                                                n = "true" === e.getAttribute("data-" + a.enableVideoLooping),
                                                o = "true" === e.getAttribute("data-" + a.enableVideoMuting),
                                                s = "true" === e.getAttribute("data-" + a.enableVideoAutoplaying);
                                            (t.player = new Shopify.Video(t.element, { loop: { active: n }, volume: o ? 0 : 1, muted: o })), e.classList.add("is-media__initialized");
                                            var r = function () {
                                                t.player && t.player.pause();
                                            };
                                            e.addEventListener("mediaHidden", r),
                                                e.addEventListener("xrLaunch", r),
                                                e.addEventListener("mediaVisible", function () {
                                                    !T4SThemeSP.isTouch && s && t.player && t.player.play();
                                                });
                                        }
                                    })(this);
                                },
                            }),
                                window.Shopify.loadFeatures([{ name: "video-ui", version: "2.0", onLoad: n }]),
                                T4SThemeSP.LibraryLoader.load("plyrShopifyStyles");
                        }
                    }
                    var l;
                },
                hosts: e,
                loadVideos: o,
                removeSectionVideos: function (e) {
                    for (var i in t)
                        if (t.hasOwnProperty(i)) {
                            var a = t[i];
                            a.sectionId === e && (a.player && a.player.destroy(), delete t[i]);
                        }
                },
            };
        })(),
        m = (function () {
            var t = {},
                e = {},
                i = {},
                a = { mediaGroup: "[data-product-single-media-group]", xrButton: "[data-shopify-xr]" };
            function n(e) {
                if (!e)
                    if (window.ShopifyXR) {
                        for (var i in t)
                            if (t.hasOwnProperty(i)) {
                                var a = t[i];
                                if (a.loaded) continue;
                                var o = document.querySelector("#ModelJson-" + i);
                                window.ShopifyXR.addModels(JSON.parse(o.innerHTML)), (a.loaded = !0);
                            }
                        window.ShopifyXR.setupXRElements();
                    } else
                        document.addEventListener("shopify_xr_initialized", function () {
                            n();
                        });
            }
            function o(t) {
                if (!t)
                    for (var i in e)
                        if (e.hasOwnProperty(i)) {
                            var a = e[i];
                            a.modelViewerUi || (a.modelViewerUi = new Shopify.ModelViewerUI(a.element)), s(a);
                        }
            }
            function s(t) {
                var e = i[t.sectionId];
                t.container.classList.add("is-media__initialized"),
                    t.container.addEventListener("mediaVisible", function () {
                        e.element && e.element.setAttribute("data-shopify-model3d-id", t.modelId), T4SThemeSP.isTouch || t.modelViewerUi.play();
                    }),
                    t.container.addEventListener("mediaHidden", function () {
                        e.element && e.element.setAttribute("data-shopify-model3d-id", e.defaultId), t.modelViewerUi.pause();
                    }),
                    t.container.addEventListener("xrLaunch", function () {
                        t.modelViewerUi.pause();
                    });
            }
            return {
                init: function (s, r) {
                    (t[r] = { loaded: !1 }),
                        s.forEach(function (t, n) {
                            var o = t.getAttribute("data-nt-media-id"),
                                s = t.querySelector("model-viewer"),
                                d = s.getAttribute("data-model-id");
                            if (0 === n) {
                                var l = t.closest(a.mediaGroup).querySelector(a.xrButton);
                                i[r] = { element: l, defaultId: d };
                            }
                            e[o] = { modelId: d, sectionId: r, container: t, element: s };
                        }),
                        window.Shopify.loadFeatures([
                            { name: "shopify-xr", version: "1.0", onLoad: n },
                            { name: "model-viewer-ui", version: "1.0", onLoad: o },
                        ]),
                        T4SThemeSP.LibraryLoader.load("modelViewerUiStyles");
                },
                removeSectionModels: function (i) {
                    for (var a in e) e.hasOwnProperty(a) && e[a].sectionId === i && (e[a].modelViewerUi.destroy(), delete e[a]);
                    delete t[i];
                },
            };
        })(),
        g = (function () {
            var e = !1;
            function i(e, i) {
                e = e[0];
                let a = JSON.parse(document.querySelector("#Json360-" + i).innerHTML),
                    n = a.imgArray,
                    o = parseFloat(e.getAttribute("data-min")) || 1.194,
                    s = parseFloat(e.getAttribute("data-max")) || 2,
                    r = window.devicePixelRatio < o ? o : window.devicePixelRatio,
                    d = r > s ? s : r,
                    l = Math.round(e.clientWidth * d);
                a.imgArray = [];
                for (let t in n) a.imgArray.push(`${n[t]}&width=${l}`);
                a.onReady = function () {
                    !(function (e, i) {
                        i.classList.add("is-media__initialized"),
                            i.addEventListener("mediaVisible", function () {
                                if (!T4SThemeSP.isTouch)
                                    try {
                                        e.play(), t(i.querySelector(".nav_bar_play")).removeClass("nav_bar_play").addClass("nav_bar_stop");
                                    } catch (t) {}
                            }),
                            t(i).hasClass("is-selected") &&
                                (e.play(),
                                setTimeout(function () {
                                    t(i.querySelector(".nav_bar_play")).removeClass("nav_bar_play").addClass("nav_bar_stop");
                                }, 50));
                        i.addEventListener("mediaHidden", function () {
                            e.stop(), t(i.querySelector(".nav_bar_stop")).removeClass("nav_bar_stop").addClass("nav_bar_play");
                        });
                    })(c, e);
                };
                var c = t(e.querySelector(".t4s-threesixty")).ThreeSixty(a);
            }
            return {
                init: function (t, a) {
                    e
                        ? i(t, a)
                        : $script(T4Sconfigs.script12b, function () {
                              i(t, a), (e = !0);
                          });
                },
            };
        })(),
        v = (function () {
            var e = "[data-pickup-availability-popup-open]",
                i = "[data-pickup-availability-popup-close]",
                a = l.mfp_close,
                n = l.mfp_loading,
                s = {};
            function r(t, e) {
                (this.container = e),
                    (this.idPopup = this.container.dataset.idPopup),
                    (this.hasOnlyDefaultVariant = "true" === this.container.dataset.hasOnlyDefaultVariant),
                    (this.rootUrl = this.container.dataset.rootUrl),
                    (this.variantId = this.container.dataset.variantId);
                var i = this;
                t.on("pickupAvailability:update", function (t) {
                    i.updateContent(t.currentVariant.id);
                }),
                    t.on("pickupAvailability:clear", function (t) {
                        i.clearContent();
                    });
            }
            return (
                (r.prototype = Object.assign({}, r.prototype, {
                    updateContent: function (t = this.variantId) {
                        let i = this.rootUrl;
                        i.endsWith("/") || (i += "/");
                        var a = i + "variants/" + t + "/?section_id=pickup-availability",
                            n = this,
                            o = c + "pickup-availability" + t,
                            r = n.container.querySelector(e);
                        (n.container.style.opacity = 0.5),
                            r && ((r.disabled = !0), r.setAttribute("aria-busy", !0)),
                            s[o]
                                ? n.updateResponse(s[o])
                                : T4SThemeSP.getToFetchSection(null, "text", a).then((t) => {
                                      "NVT_94" != t && ((s[o] = t), n.updateResponse(t));
                                  });
                    },
                    updateResponse: function (t) {
                        if ("" !== t.trim()) {
                            (this.container.innerHTML = t), (this.container.innerHTML = this.container.firstElementChild.innerHTML), (this.container.style.opacity = 1);
                            var i = this.container.querySelector(e);
                            i && ((this.container.querySelector("#pickupAvailabilityPopup").id = this.idPopup), i.addEventListener("click", this._onClickModalOpen.bind(this)));
                        }
                    },
                    clearContent: function () {
                        this.container.innerHTML = "";
                    },
                    _onClickModalOpen: function () {
                        var e = this;
                        t.magnificPopupT4s.open({
                            items: { src: `#${e.idPopup}` },
                            type: "inline",
                            removalDelay: 500,
                            tClose: a,
                            tLoading: n,
                            callbacks: {
                                beforeOpen: function () {
                                    this.st.mainClass = "mfp-move-horizontal t4s-pickup-availability_pp_wrapper";
                                },
                                open: function () {
                                    o.trigger("NTpopupInline:offClose"), o.trigger("currency:update");
                                    var t = document.querySelector(`#${e.idPopup} ${i}`);
                                    t && (t.removeEventListener("click", e._onClickModalClose), t.addEventListener("click", e._onClickModalClose));
                                },
                                beforeClose: function () {},
                                close: function () {},
                                afterClose: function () {
                                    o.trigger("NTpopupInline:onClose");
                                },
                            },
                        });
                    },
                    _onClickModalClose: function () {
                        t.magnificPopupT4s.close();
                    },
                })),
                r
            );
        })(),
        y = (function () {
            var a,
                s,
                r,
                d = { isShow: "is--shown", isActive: "sticky-is--active", isHiddenMb: "is-hidden--mobile" },
                l = "click.sticky",
                c = e.height(),
                u = i.height(),
                f = 0,
                h = 0,
                m = "#t4s-backToTop",
                g = "is--show";
            function v(i, n, c) {
                if (!i[0]) return;
                var u,
                    f = this,
                    h = "2" == n;
                (s = i.offset().top + i.outerHeight()),
                    f._updateContent(),
                    (r = a.find("[data-action-info-close]")),
                    p.ani(a.find("[data-action-atc]")),
                    f._stickyAddToCartToggle(),
                    h || (a.addClass(d.isShow), o.addClass(d.isActive)),
                    e.scroll(function () {
                        u && clearTimeout(u),
                            (u = setTimeout(function () {
                                f._stickyAddToCartToggle(h);
                            }, 30));
                    });
                var v = a.find("[data-quantity-wrapper] [data-quantity-value]"),
                    b = i.find("[data-quantity-value");
                v.change(function () {
                    b.val(this.value);
                }),
                    b.change(function () {
                        v.val(this.value);
                    }),
                    c ||
                        a.find("[data-sticky-v-title]").on(l, function (e) {
                            e.preventDefault(), t("html, body").animate({ scrollTop: i.offset().top - 100 }, isBehaviorSmooth ? 0 : 500), r.trigger(l);
                        });
                let S = a.find(".t4s-sticky-atc__product"),
                    w = a.find("[data-action-atc]"),
                    T = !0;
                a.find("[data-action-atc][data-action-delay]").on(l, function (i) {
                    !t(this)[0].hasAttribute("data-action-delay") ||
                        e.width() > 767 ||
                        (i.preventDefault(),
                        i.stopPropagation(),
                        (T = !0),
                        S.slideDown({
                            start: function () {
                                t(this).css({ display: "flex" }), w.removeAttr("data-action-delay"), t(m).removeClass(g);
                            },
                            complete: function () {
                                y(), t(m).addClass(g);
                            },
                        }));
                }),
                    r.on(l, function (i) {
                        !T ||
                            e.width() > 767 ||
                            (i.preventDefault(),
                            (T = !1),
                            S.slideUp({
                                start: function () {
                                    w.attr("data-action-delay", ""), t(m).removeClass(g);
                                },
                                complete: function () {
                                    y(), t(m).addClass(g);
                                },
                            }));
                    }),
                    e.on("resize.sticky", y);
            }
            function y() {
                (h = a.outerHeight()), f != h && ((f = h), n.css({ "--stickyATC-height": a.outerHeight() + "px" }));
            }
            return (
                (v.prototype = Object.assign({}, v.prototype, {
                    _updateContent: function () {
                        T4SThemeSP.$appendComponent.after(t("#t4s-sticky-atc-temp").html()), (a = t("[data-sticky-addtocart]"));
                    },
                    _stickyAddToCartToggle: function (t) {
                        var n = e.scrollTop(),
                            f = parseInt(n + c) + 0;
                        (u = i.height()),
                            s < n && f !== u && f < u
                                ? (a.addClass(d.isShow), o.addClass(d.isActive), y())
                                : (f === u || f > u || (s > n && t)) && (a.removeClass(d.isShow), o.removeClass(d.isActive), a.find("[data-dropdown-open].is--clicked").click(), r.trigger(l));
                    },
                })),
                v
            );
        })();
    function b(e) {
        var i = e.find(".t4s-product__media-item:not(.is--media-hide)"),
            a = i.length;
        (4 == a || a > 5) && (a = "normal"),
            e.attr("data-media-sizes", a),
            e.find(".t4s-product__media-item:not(.is--media-hide):last").addClass("is--media-last"),
            e.find(".t4s-product__media-item").attr("data-index", ""),
            i.each(function (e) {
                t(this).attr("data-index", e);
            });
    }
    function S(t) {
        return JSON.parse(t || "{}");
    }
    (T4SThemeSP.Product = (function () {
        var r = "data-product-featured",
            d = {},
            l = {},
            c = !n.hasClass("is-remove-unavai-0"),
            u = "is-pswp-disable",
            w = ".t4s-color-mode__variant_image .is--first-color",
            T = "[data-main-media]",
            _ = "[data-pickup-availability-container]",
            $ = T4Sconfigs,
            C = T4SProductStrings,
            k = $.nowTimestamp,
            I = $.new_day_int,
            x = $.use_sale_badge,
            P = $.label_sale_style,
            M = $.use_preorder_badge,
            O = $.use_new_badge,
            V = $.use_soldout_badge,
            A = $.use_custom_badge,
            L = { sale: C.badgeSale, new: C.badgeNew, preOrder: C.badgepreOrder, soldout: C.badgeSoldout, SavePercent: C.badgeSavePercent },
            E = { texts: L, saleStyle: P };
        function D(e) {
            if (((this.$container = t(e)), this.$container.is("[data-product-options]"))) this._itemQuickShopInline();
            else if (
                ((this.productConfigs = S(this.$container.attr(r))),
                (this.productID = this.productConfigs.id),
                (this.container = e),
                (this.$mainMedia = this.$container.find(T)),
                (this.mainMedia = this.$mainMedia[0]),
                (this.sectionId = this.productConfigs.sectionId),
                (this.disableSwatch = this.productConfigs.disableSwatch),
                (this.isSticky = this.productConfigs.isSticky),
                (this.isStickyMB = this.productConfigs.isStickyMB),
                (this.stickyShow = this.productConfigs.stickyShow),
                (this.useStickySelect = this.productConfigs.useStickySelect),
                (this.$shortDes = this.$container.find("[data-des-height]")),
                (this.eventHandlers = {}),
                this._createBadgesProduct(),
                this._initBootSales(),
                this._initSubmit(),
                this.productConfigs.id)
            ) {
                (this.$variantImg = this.$container.find(w)),
                    (this.disableVariantImage = !this.$variantImg[0]),
                    (this.$formSelectorId = this.$container.find(this.productConfigs.formID)),
                    (this.$formSelectorIdLength = this.$formSelectorId.length),
                    (this.pickupAvailabilityContainer = this.$container.find(_)[0]),
                    this.pickupAvailabilityContainer && this.$formSelectorIdLength > 0 && (this._initPickupAvailability(), this.disableSwatch && this.pickupAvailability.updateContent()),
                    this._initNotifyBackinStock(),
                    s && !this.isStickyMB && (this.isSticky = !1),
                    this.isSticky && this._initStickyAddToCart(),
                    !this.disableSwatch &&
                        this.$formSelectorIdLength > 0 &&
                        ((this.$originalSelectorId = this.$formSelectorId.find('select[name="id"]')),
                        (this.$options1 = this.$formSelectorId.find('[data-swatch-option][data-id="0"]')),
                        (this.$options2 = this.$formSelectorId.find('[data-swatch-option][data-id="1"]')),
                        (this.$options3 = this.$formSelectorId.find('[data-swatch-option][data-id="2"]')),
                        this.PrOptionsSize,
                        this.disableVariantImage || ((this.$variantImgItems = this.$variantImg.find("[data-swatch-item]")), (this.colorOptionIndex = this.$variantImg.data("id")), (this.swatchWidth = 2 * this.$variantImgItems.outerWidth())),
                        this._initVariants(),
                        this._swatchesEventListeners(),
                        this._changeMediaSlider(),
                        this.disableVariantImage || this._updateVariantImageSwatchFirst());
                var i = this;
                i.mainMedia && i._initProductIsotope(),
                    setTimeout(function () {
                        i.mainMedia &&
                            (i._initLoadContent(),
                            setTimeout(function () {
                                i._initProductVideo(), i._initModelViewerLibraries(), i._initShopifyXrLaunch(), i._init360ViewerLibraries();
                                var t = i.container.querySelector(".t4s-product__info-container--sticky");
                                t && i.productConfigs.infoOverflowScroller && (i.infoOverflowScroller = new T4SThemeSP.OverflowScroller(t, { offsetTop: 109, offsetBottom: 30, updateOffsetTop: !0 }));
                            }, 100));
                    }, 1e3);
                var n = i.productConfigs.main_click;
                if ("none" != n && i.mainMedia) {
                    if ((T4SThemeSP.isTouch && i.productConfigs.enable_zoom_click_mb) || (T4SThemeSP.isHover && "pswp" == n)) {
                        var o = this.$mainMedia.find("." + u);
                        o.removeClass(u),
                            T4SThemeSP.isTouch &&
                                i.productConfigs.enable_zoom_click_mb &&
                                a > 1024 &&
                                document.addEventListener("theme:hover", function (t) {
                                    o.addClass(u);
                                });
                    }
                    this.$shortDes &&
                        (this.$shortDes.each(function (e, i) {
                            t(i)
                                .parent()
                                .css("--full-h", t(i).height() + "px");
                        }),
                        this.$shortDes.on("click", function () {
                            t(this)
                                .parent()
                                .css("--full-h", t(this).height() + "px");
                        }));
                }
            }
        }
        return (
            (D.prototype = Object.assign({}, D.prototype, {
                _itemQuickShopInline: function () {
                    (this.$qsInline = this.$container.find("[data-qs-inl]")),
                        (this.$formSelectorId = this.$qsInline.find("form")),
                        (this.$originalSelectorId = this.$formSelectorId.find('select[name="id"]')),
                        (this.$options1 = this.$formSelectorId.find('[data-swatch-option][data-id="0"]')),
                        (this.$options2 = this.$formSelectorId.find('[data-swatch-option][data-id="1"]')),
                        (this.$options3 = this.$formSelectorId.find('[data-swatch-option][data-id="2"]')),
                        (this.productConfigs = S(this.$originalSelectorId.attr("data-product-featured"))),
                        (this.productID = this.productConfigs.id),
                        (this.$variantImg = this.$qsInline.find(w)),
                        (this.disableVariantImage = !this.$variantImg[0]),
                        this.disableVariantImage || ((this.$variantImgItems = this.$variantImg.find("[data-swatch-item]")), (this.colorOptionIndex = this.$variantImg.data("id")), (this.swatchWidth = 2 * this.$variantImgItems.outerWidth())),
                        this._initVariants(),
                        this._swatchesEventListeners(),
                        this._initSubmit(),
                        this.disableVariantImage || this._updateVariantImageSwatchFirst();
                },
                _initVariants: function () {
                    var e,
                        i,
                        a,
                        n = this.productConfigs;
                    if ((n.isGrouped && (n.isGrouped = this.$container.find("form[data-groups-pr-form]").length > 0), !n.isGrouped)) {
                        if (d[this.productID]) (a = d[this.productID]), (i = l[this.productID]), (this.PrOptionsSize = i.length);
                        else
                            try {
                                (a = JSON.parse(this.$container.find(".pr_variants_json").html())),
                                    this.$originalSelectorId.find("> option").each(function (i) {
                                        (e = t(this)),
                                            (a[i].incoming = e.data("incoming")),
                                            (a[i].next_incoming_date = e.data("nextincomingdate") || null),
                                            (a[i].inventory_policy = e.data("inventorypolicy") || null),
                                            (a[i].inventory_quantity = e.data("inventoryquantity"));
                                    }),
                                    (d[this.productID] = a),
                                    (i = JSON.parse(this.$container.find(".pr_options_json").html())),
                                    (l[this.productID] = i),
                                    (this.PrOptionsSize = i.length);
                            } catch (t) {
                                return void console.log("not found pr json");
                            }
                        "boolean" != typeof n.unQuickShopInline && (n.unQuickShopInline = !0);
                        var o = {
                            enableHistoryState: n.enableHistoryState || !1,
                            $container: this.$container,
                            formSelectorId: this.$formSelectorId,
                            $originalSelectorId: this.$originalSelectorId,
                            $options1: this.$options1,
                            $options2: this.$options2,
                            $options3: this.$options3,
                            variants: a,
                            productOptions: i,
                            PrOptionsSize: this.PrOptionsSize,
                            removeSoldout: n.removeSoldout,
                            isNoPick: n.isNoPick,
                            hasSoldoutUnavailable: n.hasSoldoutUnavailable,
                            canMediaGroup: n.canMediaGroup,
                            isMainProduct: n.isMainProduct,
                            oldVariant: {},
                            badgesConfigs: E,
                            $variantImg: this.$variantImg,
                            disableVariantImage: this.disableVariantImage,
                            swatchWidth: this.swatchWidth,
                            isSticky: this.isSticky,
                            useStickySelect: this.useStickySelect,
                            showFirstMedia: n.showFirstMedia,
                            unQuickShopInline: n.unQuickShopInline,
                            isQuickShopForm: n.isQuickShopForm,
                        };
                        this.Variants = new f(o);
                    }
                },
                _swatchesEventListeners: function () {
                    if (this.PrOptionsSize) {
                        var e,
                            i,
                            a,
                            n = !0,
                            s = this.$formSelectorId.hasClass("is-form-t4spritem"),
                            r = this;
                        r.$formSelectorId.on("click", "[data-swatch-item]:not(.is--selected)", function (d) {
                            d.preventDefault();
                            var l = t(this);
                            if (
                                (l.addClass("is--selected").siblings().removeClass("is--selected"),
                                l.closest("[data-swatch-option]").find("[data-current-value]").html(l.data("value")),
                                s &&
                                    n &&
                                    (r.$formSelectorId.addClass("t4sproduct-swatched"),
                                    r.$formSelectorId.find('[data-swatch-option][data-id="0"] [data-swatch-name],[data-swatch-option][data-id="1"],[data-swatch-option][data-id="2"]').show(150),
                                    (n = !1)),
                                (r.Variants.clickedCurrentValue = l.data("value") + ""),
                                (a = l.closest("[data-swatch-option]").data("id")),
                                (r.Variants.clickedCurrentIndex = "option" + ++a),
                                r.$formSelectorId.find(".is--selected").length < r.PrOptionsSize && r.Variants.isNoPick)
                            )
                                return r.Variants._updateMediaFilterNoPick(), void r.Variants._updateMediaFirst(l);
                            (r.Variants.eventClickedSwatch = !0),
                                (r.Variants.clickedOptions = []),
                                r.$formSelectorId.find("[data-swatch-option] .is--selected").each(function (e, i) {
                                    r.Variants.clickedOptions.push({ value: t(i).data("value") + "", index: "option" + ++e });
                                }),
                                r.Variants.isNoPick || (r.Variants.oldVariant = r.Variants.currentVariant),
                                r.Variants.isNoPick && (o.trigger("hide.t4s.notices"), r.isSticky && t("[data-sticky-addtocart]").removeAttr("hidden"), (r.Variants.isNoPick = !1), r.$container.trigger("replace:btnAtc")),
                                (i = r.Variants._getVariantFromOptions()),
                                r.$originalSelectorId.val(i.id),
                                (e = r.$originalSelectorId.val()),
                                !c || (null !== e && "" !== e) || ((i = r.Variants._getVariantFromSize()), r.$originalSelectorId.val(i.id), (e = r.$originalSelectorId.val())),
                                (r.Variants.currentVariant = i),
                                r.$originalSelectorId[0].dispatchEvent(new Event("change", { bubbles: !0, cancelable: !0 }));
                        });
                    }
                },
                _changeMediaSlider: function () {
                    if (this.PrOptionsSize && this.productConfigs.changeVariantByImg && 0 != this.$container.find(".flickityt4s[data-main-media] .t4s-product__media-item--variant").length) {
                        var e,
                            i,
                            a,
                            n,
                            o = this;
                        this.$container
                            .find(".flickityt4s[data-main-media]")
                            .off("select.flickityt4s")
                            .on("select.flickityt4s", function (s, r) {
                                t(this).trigger("select.carousel"),
                                    (n = t(this).find(".flickityt4s-slider>[data-main-slide]").eq(r)).hasClass("t4s-product__media-item--variant") &&
                                        !o.Variants.eventClickedSwatch &&
                                        ((e = n.data("media-id")),
                                        (a = o.$originalSelectorId.val()),
                                        void 0 === (i = o.$originalSelectorId.find('option[data-mdid="' + e + '"]:not(:disabled)').val()) ||
                                            a == i ||
                                            o.Variants.isNoPick ||
                                            o.Variants.mediaID == e ||
                                            (o.$originalSelectorId.val(i), o.$originalSelectorId[0].dispatchEvent(new Event("change", { bubbles: !0, cancelable: !0 }))));
                            });
                    }
                },
                _initBootSales: function () {
                    this.BootSales = new p.init(this.$container);
                },
                _initSubmit: function () {
                    i.trigger({ type: "submitAtc:t4s", $container: this.$container });
                },
                _initProductVideo: function () {
                    var t = this.sectionId,
                        e = this.mainMedia.querySelectorAll('[data-media-type="video"], [data-media-type="external_video"]');
                    e.length < 1 ||
                        e.forEach(function (e) {
                            h.init(e, t);
                        });
                },
                _init360ViewerLibraries: function () {
                    var t = this.mainMedia.querySelectorAll('[data-media-type="360"]');
                    t.length < 1 || g.init(t, this.sectionId);
                },
                _initModelViewerLibraries: function () {
                    var t = this.mainMedia.querySelectorAll('[data-media-type="model"]');
                    t.length < 1 || m.init(t, this.sectionId);
                },
                _initShopifyXrLaunch: function () {
                    (this.eventHandlers.initShopifyXrLaunchHandler = this._initShopifyXrLaunchHandler.bind(this)), document.addEventListener("shopify_xr_launch", this.eventHandlers.initShopifyXrLaunchHandler);
                },
                _initShopifyXrLaunchHandler: function () {
                    this.mainMedia.querySelector("[data-product-single-media-wrapper]").dispatchEvent(new CustomEvent("xrLaunch", { bubbles: !0, cancelable: !0 }));
                },
                loadContent: function (t) {
                    if (t.getAttribute("loaded")) return;
                    const e = document.createElement("div"),
                        i = t.querySelector("template");
                    e.appendChild(i.content.firstElementChild.cloneNode(!0)), t.setAttribute("loaded", !0);
                    t.appendChild(e.querySelector("video, model-viewer, iframe"));
                    i.remove();
                },
                _initLoadContent: function () {
                    var t = this;
                    t.mainMedia.querySelectorAll("[data-deferred-media]").forEach(function (e) {
                        e.classList.add("is--adding"), t.loadContent(e.querySelector(".t4s-pr"));
                    });
                },
                _initProductIsotope: function () {
                    var t = this;
                    !s &&
                        t.productConfigs.hasIsotope &&
                        (b(this.$mainMedia),
                        T4SThemeSP.Isotopet4s.init(this.$mainMedia),
                        e.on("resize.prIstope", function () {
                            e.width() < 768 && t.$mainMedia.hasClass("isotopet4s-enabled")
                                ? t.$mainMedia.isotopet4s("destroy").removeClass("isotopet4s-enabled")
                                : e.width() >= 768 &&
                                  !t.$mainMedia.hasClass("isotopet4s-enabled") &&
                                  setTimeout(function () {
                                      T4SThemeSP.Isotopet4s.init(t.$mainMedia);
                                  }, 500);
                        }));
                },
                _initPickupAvailability: function () {
                    this.pickupAvailability = new v(this.$container, this.pickupAvailabilityContainer);
                },
                _initNotifyBackinStock: function () {
                    let e = this,
                        i = this.$container.find(".t4s-product-notify-stock"),
                        a = this.$container.find("[data-notify-stock-btn]");
                    if (i[0] || a[0])
                        if (i[0])
                            this.$container.on("notifyBackinStock:show", function (a) {
                                let n = t("#ContactFormNotifyStock" + e.productID);
                                i.show();
                                let o = `${a.currentVariant.name.replace("- ", "( ")} ) ${e.productConfigs.orgUrl}?variants=${a.currentVariant.id}`;
                                n.find('[name="contact[product]"]').text(o);
                            }),
                                this.$container.on("notifyBackinStock:hide", function (t) {
                                    i.hide();
                                });
                        else {
                            var n = this.$container.find("[data-notify-stock-btn]"),
                                o = n.data("root-url"),
                                s = "";
                            if (
                                (o.endsWith("/") || (o += "/"),
                                (s = `${o}variants/${n.data("variant-id")}/?section_id=back-in-stock`),
                                n.attr("data-mfp-src", s).hide().removeClass("t4s-d-none"),
                                !this.productConfigs.available && this.productConfigs.disableSwatch)
                            )
                                return void n.show();
                            this.$container.on("notifyBackinStock:show", function (t) {
                                (s = `${o}variants/${t.currentVariant.id}/?section_id=back-in-stock`), n.attr({ "data-mfp-src": s, "data-storageid": `notify-stock${t.currentVariant.id}` }).show();
                            }),
                                this.$container.on("notifyBackinStock:hide", function (t) {
                                    n.hide();
                                });
                        }
                },
                _createBadgesProduct: function () {
                    let t = this.$container.find("[data-product-single-badge]"),
                        e = (t.attr("data-sort") || "").replace(/ /g, "").split(","),
                        i = this.productConfigs,
                        a = "";
                    if (0 == e.length || 0 == t.length) return;
                    let n = e.length;
                    for (let t = 0; t < n; t++)
                        switch (e[t]) {
                            case "sale":
                                if (!x) break;
                                let n = i.compare_at_price,
                                    c = i.price;
                                if (n <= c) {
                                    a += '<span data-badge-sale class="t4s-badge-item t4s-badge-sale" hidden></span>';
                                    break;
                                }
                                if ("2" == P)
                                    var o = (100 * (n - c)) / n,
                                        s = L.SavePercent.replace("[sale]", Math.round(o));
                                else if ("3" == P) {
                                    var r = n - c;
                                    s = T4SThemeSP.Currency.formatMoney(r);
                                } else s = L[e[t]];
                                a += '<span data-badge-sale class="t4s-badge-item t4s-badge-sale">' + s + "</span>";
                                break;
                            case "preOrder":
                                if (!M) break;
                                a += `<span data-badge-preorder class="t4s-badge-item t4s-badge-preorder"${i.isPreoder ? "" : " hidden"}>${L[e[t]]}</span>`;
                                break;
                            case "new":
                                var d = k - i.dateStart,
                                    l = Math.floor(d / 3600);
                                if ((l = Math.floor(l / 24)) >= I || !O) break;
                                a += '<span class="t4s-badge-item t4s-badge-new">' + L[e[t]] + "</span>";
                                break;
                            case "soldout":
                                if (!V) break;
                                a += `<span data-badge-soldout class="t4s-badge-item t4s-badge-soldout"${i.available ? " hidden" : ""}>${L[e[t]]}</span>`;
                                break;
                            default:
                                let u = i.customBadge;
                                if (!u || !A) break;
                                let f = u.length;
                                for (let t = 0; t < f; t++) a += '<span class="t4s-badge-item t4s-badge-custom t4s-badge-' + i.customBadgeHandle[t] + '">' + u[t] + "</span>";
                        }
                    t.html(a);
                },
                _updateVariantImageSwatchFirst: function () {
                    let e = this,
                        i = e.Variants.variants,
                        a = i.length,
                        n = this.colorOptionIndex;
                    e.$variantImgItems.each(function (o) {
                        let s = t(this),
                            r = (function (t) {
                                for (let e = 0; e < a; e++) {
                                    let a = i[e];
                                    if (a.featured_image && (a.options[n] + "").toLowerCase() == t) return a.featured_image;
                                }
                            })((s.data("value") + "").toLowerCase());
                        if (!r) return;
                        let d = s.find("[data-img-el]");
                        (s = d[0] ? d : s).attr("data-bg", T4SThemeSP.Images.getNewImageUrl(r.src, e.swatchWidth));
                    });
                },
                _initStickyAddToCart: function () {
                    this.stickyAddToCart = new y(this.$formSelectorId, this.stickyShow, this.useStickySelect);
                },
            })),
            D
        );
    })()),
        (T4SThemeSP._initProducts = (function () {
            var e = "data-product-featured",
                i = "initProducts__enabled";
            return function () {
                t("[" + e + "]:not(." + i + ")").each(function () {
                    t(this).addClass(i), new T4SThemeSP.Product(this);
                });
            };
        })()),
        (T4SThemeSP._initBundlePrs = (function () {
            var e = "data-product-bundles",
                i = "initBundles__enabled",
                a = "has--hover-pin",
                n = "is--hover",
                o = "is--trigger-hover";
            return function () {
                t("[" + e + "]:not(." + i + ")").each(function () {
                    let e = t(this);
                    e.addClass(i),
                        p.ani(e.find("[data-atc-form]")),
                        (function (e) {
                            if (T4SThemeSP.isTouch || 0 == e.length) return;
                            let i = e.find("[data-bundles-pr-form]"),
                                s = e.find("[data-bundle-image]");
                            e.hoverIntent({
                                selector: "[data-bundle-pin]",
                                sensitivity: 6,
                                interval: 40,
                                timeout: 40,
                                over: function (e) {
                                    s.addClass(a), i.addClass(a), t(this).addClass(n), t(t(this).data("trigger")).addClass(o);
                                },
                                out: function () {
                                    s.removeClass(a), i.removeClass(a), s.find("." + n).removeClass(n), i.find("." + o).removeClass(o);
                                },
                            });
                        })(e);
                });
            };
        })()),
        (T4SThemeSP.Cookies = (function () {
            return function () {
                var t;
                (t = navigator.cookieEnabled) || ((document.cookie = "testcookie"), (t = -1 !== document.cookie.indexOf("testcookie"))), t || n.addClass("not--cookies");
            };
        })()),
        (T4SThemeSP.isVisible = function (i, a, n, o, s) {
            if (!(i.length < 1)) {
                o = o || "both";
                var r = e,
                    d = i.length > 1 ? i.eq(0) : i,
                    l = null != s,
                    c = l ? t(s) : r,
                    u = l ? c.position() : 0,
                    f = d.get(0),
                    p = c.outerWidth(),
                    h = c.outerHeight(),
                    m = !0 !== n || f.offsetWidth * f.offsetHeight;
                if ("function" == typeof f.getBoundingClientRect) {
                    var g = f.getBoundingClientRect(),
                        v = l ? g.top - u.top >= 0 && g.top < h + u.top : g.top >= 0 && g.top < h,
                        y = l ? g.bottom - u.top > 0 && g.bottom <= h + u.top : g.bottom > 0 && g.bottom <= h,
                        b = l ? g.left - u.left >= 0 && g.left < p + u.left : g.left >= 0 && g.left < p,
                        S = l ? g.right - u.left > 0 && g.right < p + u.left : g.right > 0 && g.right <= p,
                        w = a ? v || y : v && y,
                        T = a ? b || S : b && S;
                    (w = (g.top < 0 && g.bottom > h) || w), (T = (g.left < 0 && g.right > p) || T);
                    if ("both" === o) return m && w && T;
                    if ("vertical" === o) return m && w;
                    if ("horizontal" === o) return m && T;
                } else {
                    var _ = l ? 0 : u,
                        $ = _ + h,
                        C = c.scrollLeft(),
                        k = C + p,
                        I = d.position(),
                        x = I.top,
                        P = x + d.height(),
                        M = I.left,
                        O = M + d.width(),
                        V = !0 === a ? P : x,
                        A = !0 === a ? x : P,
                        L = !0 === a ? O : M,
                        E = !0 === a ? M : O;
                    if ("both" === o) return !!m && A <= $ && V >= _ && E <= k && L >= C;
                    if ("vertical" === o) return !!m && A <= $ && V >= _;
                    if ("horizontal" === o) return !!m && E <= k && L >= C;
                }
            }
        }),
        (T4SThemeSP.Tabs = (function () {
            var e,
                i,
                a,
                n,
                o = "t4s-tabs-enabled",
                s = "t4s-tabs-simple-enabled",
                r = "t4s-tabs-accordion-enabled",
                d = "t4s-active",
                l = 300,
                c = 150;
            return {
                Default: function () {
                    0 != (i = t(`[data-t4s-tabs]:not(.${o})`)).length &&
                        (i.addClass(o),
                        i.on("click", "[data-t4s-tab-ul] [data-t4s-tab-item]", function (i) {
                            i.preventDefault();
                            var a = t(this),
                                n = a.closest("[data-t4s-tabs]"),
                                o = a.attr("href") || a.data("id-tab"),
                                s = n.find(o),
                                r = s.find(".flickityt4s"),
                                l = s.find(".isotopet4s");
                            n.find("." + d).removeClass(d),
                                n.find("[data-t4s-tab-content]").hide(),
                                a.addClass(d),
                                s.show().addClass(d),
                                s.closest("[data-t4s-tab-wrapper]").addClass(d),
                                clearTimeout(e),
                                (e = setTimeout(function () {
                                    r.hasClass("flickityt4s-enabled") ? r.flickityt4s("resize") : l.hasClass("isotopet4s-enabled") && l.isotopet4s("layout");
                                }, 200));
                        }));
                },
                Simple: function () {
                    0 != (a = t(`[data-t4s-tabs2]:not(.${s})`)).length &&
                        (a.addClass(s),
                        a.on("click", "[data-t4s-tab-ul2] [data-t4s-tab-item]", function (e) {
                            e.preventDefault();
                            var i = t(this),
                                a = i.closest("[data-t4s-tabs2]"),
                                n = i.attr("href") || i.data("id-tab"),
                                o = a.find(n);
                            a.find("." + d).removeClass(d),
                                i.addClass(d),
                                o.addClass(d),
                                o.closest("[data-t4s-tab-wrapper]").addClass(d),
                                o.closest("[data-t4s-tabs2]").attr("data-tab-active", n.replace("#", "")),
                                i.is("[data-triger-btns-tab]") && (o.hasClass("flickityt4s flickityt4s-enabled") ? o.trigger("updateBtnTab.flickityt4s") : o.find(".flickityt4s.flickityt4s-enabled").trigger("updateBtnTab.flickityt4s"));
                        }));
                },
                Accordion: function () {
                    0 != (n = t(`[data-t4s-tabs]:not(.${r})`)).length &&
                        (n.addClass(r),
                        t(".t4s-type-accordion, [data-t4s-accordion-pr]")
                            .find("." + d)
                            .find("[data-t4s-tab-content]")
                            .css("display", "block"),
                        n.on("click", "[data-t4s-tab-wrapper] [data-t4s-tab-item]", function (e) {
                            e.preventDefault();
                            var i = t(this),
                                a = i.closest("[data-t4s-tabs]"),
                                n = a.find("[data-t4s-tab-ul]"),
                                o = a.find("[data-t4s-tab-wrapper]:not([data-no-auto-close])." + d),
                                s = o.find("[data-t4s-tab-content]"),
                                r = i.closest("[data-t4s-tab-wrapper]"),
                                u = r.find("[data-t4s-tab-content]"),
                                f = i.closest(".t4s-section"),
                                p = u.find(".flickityt4s"),
                                h = u.find(".isotopet4s");
                            0 == f.length && (f = i.closest(".t4s-section,.shopify-section")),
                                r.hasClass(d)
                                    ? (n.find("." + d).removeClass(d), r.removeClass(d), u.slideUp(l).removeClass(d))
                                    : (o.removeClass(d),
                                      n.find("." + d).removeClass(d),
                                      r.addClass(d),
                                      n.find(`a[href="${i.attr("href")}"], [data-href="${i.attr("href")}"]`).addClass(d),
                                      s.slideUp(c).removeClass(d),
                                      u
                                          .stop(!0, !0)
                                          .slideDown(l, function () {
                                              if ((p.hasClass("flickityt4s-enabled") ? p.flickityt4s("resize") : h.hasClass("isotopet4s-enabled") && h.isotopet4s("layout"), !T4SThemeSP.isVisible(i, !0))) {
                                                  var e = t(".t4s-section-header").height() || 0,
                                                      a = f.find(".t4s-tab-wrapper.t4s-active").offset().top - e - 10;
                                                  t("body,html").animate({ scrollTop: a });
                                              }
                                          })
                                          .addClass(d));
                        }));
                },
            };
        })()),
        (T4SThemeSP.RenderRefresh = (function () {
            function e(t) {
                o.trigger("currency:update");
                let e = t.find(".flickityt4s"),
                    i = t.find(".isotopet4s");
                t.find(".t4s-products").length > 0 && "function" == typeof T4SThemeSP.reinitProductGridItem && T4SThemeSP.reinitProductGridItem(),
                    i.length > 0 && T4SThemeSP.Isotopet4s.init(i),
                    e.length > 0 && (e[0].flickityt4s = new T4SThemeSP.Carousel(e[0])),
                    T4SThemeSP.ProductItem.resizeObserver(),
                    T4SThemeSP.initLoadMore && T4SThemeSP.initLoadMore();
            }
            return function () {
                0 != t("[data-render-lazy-component]").length &&
                    (t("[data-render-lazy-component].lazyloadt4sed").each(function () {
                        e(t(this));
                    }),
                    t("[data-render-lazy-component]:not(.lazyloadt4sed)").one("lazyincluded", function (i) {
                        var a = t(i.target)[0];
                        e(t(a));
                    }),
                    t("[data-render-lazy-component]:not(.lazyloadt4s)").addClass("lazyloadt4s"));
            };
        })()),
        (T4SThemeSP.ParallaxInt = function () {
            var e = t("[data-parallax-t4strue]:not(.parallax_enabled)");
            0 != e.length &&
                e.each(function () {
                    var e = t(this),
                        i = e.attr("data-imgsl") || e.find(".t4s-parallax-img:visible")[0] || ".t4s-parallax-img";
                    (e.find(i).length > 0 || e.is(".t4s-parallax-bg.lazyloadt4sed")) && e.addClass("parallax_enabled").t4sJarallax({ speed: e.attr("data-speed") || 0.8, imgElement: i });
                });
        }),
        (T4SThemeSP.Countdown = (function () {
            var e = T4Sconfigs.timezone,
                i = "t4_nt_guess";
            try {
                i = dayjs.tz.guess();
            } catch (t) {}
            return function () {
                var a = t("[data-countdown-t4s]:not(.t4s-countdown-enabled)");
                0 != a.length &&
                    a.each(function () {
                        var a,
                            n = t(this),
                            o = t(n.attr("data-keyid")).html() || t.trim(n.html()) || "%D days %H:%M:%S",
                            s = n.is("[data-refresh-owl]"),
                            r = n.data("loop"),
                            d = n.data("date"),
                            l = parseInt(n.data("dayl")),
                            c = dayjs(),
                            u = d.replace(/\//g, "").replace(/-/g, "") + "",
                            f = parseInt(u),
                            p = u.length < 9 ? "YYYYMMDD" : "YYYYMMDDHHmmss";
                        if (((f > parseInt(c.format(p)) || l < 1) && (r = !1), r || "true" == r)) {
                            var h = dayjs(d).format(" HH:mm:ss"),
                                m = l - (c.diff(d.replace(/\//g, "-"), "days") % l);
                            (d = (c = c.add(m, "day")).format("YYYY/MM/DD") + h), n.attr("data-dateloop", d);
                        }
                        n
                            .countdown(
                                (function (t) {
                                    if (void 0 !== t) {
                                        var a = t.replace("24:00:00", "23:59:59");
                                        if ("not4" != e && i != e)
                                            try {
                                                a = dayjs.tz(t.replace(/\//g, "-"), e).toDate();
                                            } catch (t) {
                                                console.log("Timezone error: " + e);
                                            }
                                        else a = new Date(a);
                                        return a;
                                    }
                                })(d),
                                { elapse: !0 }
                            )
                            .on("update.countdown", function (t) {
                                if (t.elapsed) n.html("").addClass("expired_cdt4s").closest("[data-countdown-wrap]").html("").addClass("expired_cdt4s");
                                else {
                                    var e = 24 * t.offset.totalDays + t.offset.hours;
                                    n.html(t.strftime(o.replace("[totalHours]", e)));
                                }
                            })
                            .addClass("t4s-countdown-enabled")
                            .closest("[data-countdown-wrap]")
                            .addClass("t4s-countdown-enabled"),
                            s &&
                                (clearTimeout(a),
                                (a = setTimeout(() => {
                                    n.closest(".flickityt4s-enabled").flickityt4s("resize");
                                }, 600)));
                    });
            };
        })());
    var w = (function () {
        const e = {
            from: 0,
            to: 0,
            speed: 1e3,
            refreshInterval: 100,
            decimals: 0,
            formatter: function (t, e) {
                return t.toFixed(e.decimals);
            },
            onUpdate: null,
            onComplete: null,
        };
        function i(i, a) {
            const n = "object" == typeof a ? a : {};
            (this.$element = t(i)), (this.options = Object.assign({}, e, this._dataOptions(), n)), this._init();
        }
        return (
            (i.prototype = Object.assign({}, i.prototype, {
                _init: function () {
                    (this.value = this.options.from), (this.loops = Math.ceil(this.options.speed / this.options.refreshInterval)), (this.loopCount = 0), (this.increment = (this.options.to - this.options.from) / this.loops), this._start();
                },
                _dataOptions: function () {
                    var t = { from: this.$element.data("from"), to: this.$element.data("to"), speed: this.$element.data("speed"), refreshInterval: this.$element.data("refresh-interval"), decimals: this.$element.data("decimals") },
                        e = Object.keys(t);
                    for (var i in e) {
                        var a = e[i];
                        void 0 === t[a] && delete t[a];
                    }
                    return t;
                },
                _update: function () {
                    (this.value += this.increment),
                        this.loopCount++,
                        this._render(),
                        "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value),
                        this.loopCount >= this.loops && (clearInterval(this.interval), (this.value = this.options.to), "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value));
                },
                _render: function () {
                    var t = this.options.formatter.call(this.$element, this.value, this.options);
                    this.$element.text(t);
                },
                _start: function () {
                    this._stop(), this._render(), (this.interval = setInterval(this._update.bind(this), this.options.refreshInterval));
                },
                _stop: function () {
                    this.interval && clearInterval(this.interval);
                },
            })),
            i
        );
    })();
    (T4SThemeSP.AnimateOnScroll = (function () {
        var e = T4Sconfigs.timeani || 200,
            i = new IntersectionObserver(function (a, n) {
                a.forEach(function (a) {
                    var n = a.target;
                    a.isIntersecting &&
                        !n.classList.contains("t4s_animated") &&
                        (setTimeout(function () {
                            n.classList.add("t4s_animated"), t(n).is("[data-count-to]") && (this.countTo = new w(n));
                        }, e),
                        i.unobserve(n));
                });
            });
        return function () {
            var e = t("[data-t4s-animate]:not(.t4s-animate-init)");
            0 != e.length &&
                window.IntersectionObserver &&
                e.each(function (e) {
                    i.observe(this), t(this).addClass("t4s-animate-init");
                });
        };
    })()),
        (T4SThemeSP.PopupMFP = (function () {
            var e = t.fn.magnificPopupT4s,
                i = l.mfp_close,
                a = l.mfp_loading,
                s = t("[data-open-mfp-inline]:not(.t4s-mfp-enabled)"),
                r = t("[data-open-mfp-iframe]:not(.t4s-mfp-enabled)"),
                d = t("[data-open-mfp-video]:not(.t4s-mfp-enabled)"),
                c = t("[data-open-mfp-ajax]:not(.t4s-mfp-enabled)"),
                u = t("[data-open-mfp]"),
                f = "is-opening-mfp";
            return function () {
                void 0 !== e &&
                    (0 != s.length &&
                        s
                            .magnificPopupT4s({
                                type: "inline",
                                removalDelay: 500,
                                tClose: i,
                                tLoading: a,
                                callbacks: {
                                    beforeOpen: function () {
                                        n.addClass(f), (this.st.mainClass = "mfp-move-horizontal t4s-inline-popup-wrapper t4s-rte " + t(this.st.el).data("id") || "");
                                    },
                                    open: function () {
                                        o.trigger("NTpopupInline:offClose"), o.trigger("currency:update");
                                    },
                                    afterClose: function () {
                                        o.trigger("NTpopupInline:onClose"), n.removeClass(f);
                                    },
                                },
                            })
                            .addClass("t4s-mfp-enabled"),
                    0 != (r = t("[data-open-mfp-iframe]:not(.t4s-mfp-enabled)")).length &&
                        r
                            .magnificPopupT4s({
                                type: "iframe",
                                tClose: i,
                                tLoading: a,
                                iframe: {
                                    markup: '<div class="mfp-iframe-scaler t4s-pr t4s-mfp-iframe"><div class="mfp-close"></div><iframe class="mfp-iframe" allow="autoplay; encrypted-media" frameborder="0" allowfullscreen></iframe></div>',
                                    patterns: {
                                        youtube: { index: "youtube.com/", id: "v=", src: "//www.youtube.com/embed/%id%?enablejsapi=1&autoplay=0&rel=0&playlist=%id%&loop=1" },
                                        vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=0&loop=1" },
                                        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
                                    },
                                    srcAction: "iframe_src",
                                },
                                callbacks: {
                                    beforeOpen: function () {
                                        n.addClass(f), (this.st.mainClass = "t4s-iframe-popup-wrapper " + t(this.st.el).data("id") || "");
                                    },
                                    change: function () {},
                                    open: function () {
                                        var e = t(this.st.el),
                                            i = t(".t4s-mfp-iframe").find(".mfp-iframe"),
                                            a = i.attr("src");
                                        e.is("[data-autoplay-true]") && (a = a.replace("autoplay=0", "autoplay=1")), e.is("[data-loop-false]") && (a = (a = a.split("&playlist=")[0]).replace("loop=1", "loop=0")), i.attr("src", a);
                                    },
                                    close: function () {},
                                    afterClose: function () {
                                        n.removeClass(f);
                                    },
                                },
                            })
                            .addClass("t4s-mfp-enabled"),
                    0 != (d = t("[data-open-mfp-video]:not(.t4s-mfp-enabled)")).length &&
                        d.on("click", function (e) {
                            e.preventDefault();
                            var o,
                                s = t(this),
                                r = JSON.parse(s.attr("data-options") || "{}"),
                                d = r.type,
                                l = r.vid,
                                c = r.autoplay,
                                u = r.loop,
                                p = '<iframe src="src_t4s" class="class_t4s" title="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                                h = { html5: "html5", youtube: "youtube", vimeo: "vimeo" };
                            switch (d) {
                                case h.html5:
                                    let e = r.id,
                                        i = "";
                                    (i = e && t(e)[0] ? t(e).html() : '<video class="mfp-video" src="' + r.srcDefault + '" preload="auto" controls ' + (c ? "autoplay" : "") + (c ? " loop" : "") + " playsinline></video>"),
                                        (o = `<div class="mfp-video-scaler t4s-pr t4s-mfp-video">${i.replace("<video", '<video  class="mfp-video"')}</div>`);
                                    break;
                                case h.youtube:
                                    (p = p
                                        .replace("src_t4s", "//www.youtube.com/embed/" + l + "?enablejsapi=1&showinfo=0&controls=1&modestbranding=1&autoplay=" + +c + "&rel=0" + (u ? "&playlist=" + l + "&loop=1" : ""))
                                        .replace("class_t4s", "js-youtube")),
                                        (o = '<div class="mfp-iframe-scaler t4s-pr t4s-mfp-iframe">' + p + "</div>");
                                    break;
                                case h.vimeo:
                                    (p = p.replace("src_t4s", "//player.vimeo.com/video/" + l + "?&portrait=0&byline=0&color=" + r.accent_color + "&autoplay=" + +c + "&loop=" + +u).replace("class_t4s", "js-vimeo")),
                                        (o = '<div class="mfp-iframe-scaler t4s-pr t4s-mfp-iframe">' + p + "</div>");
                            }
                            t.magnificPopupT4s.open({
                                items: { src: o, type: "inline" },
                                tClose: i,
                                tLoading: a,
                                callbacks: {
                                    beforeOpen: function () {
                                        n.addClass(f), (this.st.mainClass = "t4s-video-popup-wrapper mfp-video-holder " + s.data("id") || "");
                                    },
                                    open: function () {
                                        s.addClass("t4s-mfp-enabled");
                                    },
                                    afterClose: function () {
                                        s.removeClass("t4s-mfp-enabled"), n.removeClass(f);
                                    },
                                },
                            });
                        }),
                    0 != (c = t("[data-open-mfp-ajax]:not(.t4s-mfp-enabled)")).length &&
                        c
                            .magnificPopupT4s({
                                type: "ajax",
                                removalDelay: 500,
                                tClose: i,
                                tLoading: '<div class="t4s-loading-spin t4s-spin-centered t4s-spin-dark t4s-spin-medium"></div>',
                                callbacks: {
                                    parseAjax: function (e) {
                                        var i = t(this.st.el),
                                            a = i.data("id") || "",
                                            n = i.data("class") || "",
                                            o = i.data("style") || "",
                                            s = e.data;
                                        e.data = `<div class="mfp-with-anim t4s-mfp-popup t4s-rte ${n}" id="${a}" style="${o}">${s.split("[t4splitlz]")[1] || s}</div>`;
                                    },
                                    ajaxContentAdded: function () {},
                                    beforeOpen: function () {
                                        n.addClass(f), (this.st.mainClass = "mfp-move-horizontal t4s-ajax-popup-wrapper");
                                    },
                                    open: function () {
                                        var e = t(this.st.el).data("custom"),
                                            i = t(this.st.el).data("phone"),
                                            a = t(".t4s-ajax-popup-wrapper:not(.mfp-bg) .mfp-content");
                                        if (
                                            (o.trigger("NTpopupInline:offClose"),
                                            o.trigger("currency:update"),
                                            0 == i &&
                                                (a.find("#t4s-ContactFormAsk__phone").remove(),
                                                setTimeout(function () {
                                                    a.find("#t4s-ContactFormAsk__phone").remove();
                                                }, 400)),
                                            e)
                                        ) {
                                            var n = e.split("||");
                                            t.each(n, function (t, e) {
                                                var i = e.split("=>");
                                                a.find(i[0]).html(i[1]);
                                            }),
                                                setTimeout(function () {
                                                    t.each(n, function (t, e) {
                                                        var i = e.split("=>");
                                                        a.find(i[0]).html(i[1]);
                                                    });
                                                }, 400);
                                        }
                                    },
                                    afterClose: function () {
                                        o.trigger("NTpopupInline:onClose"), n.removeClass(f);
                                    },
                                },
                            })
                            .addClass("t4s-mfp-enabled"),
                    0 != u.length &&
                        o.on("click", "[data-open-mfp]", function (e) {
                            e.preventDefault();
                            var i = t(e.currentTarget),
                                a = (t("html"), i.data()),
                                o = a.opennt,
                                s = a.color,
                                r = a.bg,
                                d = a.pos,
                                l = a.ani || "has_ntcanvas",
                                c = a.remove,
                                u = a.class,
                                p = a.close || !1,
                                h = a.focuslast || !1,
                                m = i.attr("data-focus"),
                                g = window.pageYOffset;
                            window.height,
                                t("#shopify-section-header_banner").outerHeight(),
                                t(".ntheader_wrapper").outerHeight(),
                                i.addClass("current_clicked"),
                                t.magnificPopupT4s.open({
                                    items: { src: o, type: "inline", tLoading: '<div class="loading-spin dark"></div>' },
                                    tClose: nt_settings.close,
                                    removalDelay: 300,
                                    closeBtnInside: p,
                                    focus: m,
                                    autoFocusLast: h,
                                    callbacks: {
                                        beforeOpen: function () {
                                            (this.st.mainClass = l + " " + s + " " + l + "_" + d), n.addClass(f);
                                        },
                                        open: function () {
                                            n.addClass(l),
                                                n.addClass(l + "_" + d),
                                                u && t(".mfp-content").addClass(u),
                                                r && t(".mfp-bg").addClass(r),
                                                body.on("click", ".close_pp", function (e) {
                                                    e.preventDefault(), t.magnificPopup.close();
                                                }),
                                                g && t("html, body").scrollTop(g);
                                        },
                                        beforeClose: function () {
                                            n.removeClass(l);
                                        },
                                        afterClose: function () {
                                            n.removeClass(l + "_" + d), t(".current_clicked").removeClass("current_clicked"), c && t(o).removeClass("mfp-hide"), n.removeClass(f);
                                        },
                                    },
                                });
                        }));
            };
        })()),
        (T4SThemeSP.NTpopupInline = (function () {
            var e,
                i = t("#t4s_temp_modal").html(),
                a = "modalt4s:trigger",
                s = "modalt4s:opened",
                r = "modalt4s:closed",
                d = "modalt4s:destroy",
                l = "t4s-modal--is-active",
                c = "t4s-modal-opened",
                u = "click.t4s_qv",
                f = "keyup.t4s_qv",
                p = "transitionend webkitTransitionEnd oTransitionEnd";
            function h() {
                return t("html").hasClass(c);
            }
            function m(t) {
                27 === t.keyCode && o.trigger(r);
            }
            function g(e) {
                t(e.target).parents().is(".t4s-modal__inner") || t(e.target).parents().is(".mfp-ready") || t(e.target).is("#t4s-notices__wrapper") || t(e.target).parents().is("#t4s-notices__wrapper") || (e.preventDefault(), o.trigger(r));
            }
            return function (v, y, b, S = null) {
                (e = S),
                    o.off(a).on(a, function (t) {
                        h() ? o.trigger(r) : o.trigger(s);
                    }),
                    o.off(s).on(s, function (a) {
                        h() ||
                            ((function (a) {
                                T4SThemeSP.$appendComponent.after(i), e && n.addClass(e), t(".t4s-modal__content").html(a);
                            })(v),
                            (function (e) {
                                n.addClass(c),
                                    n.css({ "margin-right": T4SThemeSP.scrollbarWidth }),
                                    t(".t4s-modal").addClass(l),
                                    t(".t4s-modal").on(p, function () {
                                        t(this).focus().off(p);
                                    }),
                                    setTimeout(function () {
                                        t(".t4s-modal").focus();
                                    }, 500),
                                    e();
                            })(b));
                    }),
                    o.off(r).on(r, function (i) {
                        h() &&
                            (t(".t4s-modal .flickityt4s-enabled").trigger("destroy.t4s"),
                            t("html").css({ "margin-right": "" }),
                            t("html").removeClass(c).addClass("t4s-modal-closing"),
                            t(".t4s-modal").removeClass(l).addClass("t4s-modal--is-closing"),
                            setTimeout(function () {
                                t(".t4s-modal").remove(), t("html").removeClass("t4s-modal-closing"), e && n.removeClass(e), (T4SThemeSP.isEditCartReplace = !1);
                            }, 500),
                            o.trigger(d),
                            o.trigger("t4s:hideTooltip"));
                    }),
                    o.off(d).on(d, function (t) {
                        o.off(a).off(s).off(r).off(d).off(u).off(f);
                    }),
                    o.on(u, "[data-t4s-modal-close]", function (t) {
                        t.preventDefault(), o.trigger(r);
                    }),
                    o.on(u, g),
                    o.on(f, m),
                    o.on("NTpopupInline:offClose", function (t) {
                        o.off(f, m), o.off(u, g);
                    }),
                    o.on("NTpopupInline:onClose", function (t) {
                        o.on(f, m), o.on(u, g);
                    });
            };
        })()),
        (T4SThemeSP.Currency = (function () {
            var t = "${{amount}}",
                e = T4SThemeSP.settings && T4SThemeSP.settings.superScriptPrice,
                i = window.T4Sconfigs.moneyFormat,
                a = function (t, e) {
                    return null == t || t != t ? e : t;
                };
            return {
                formatMoney: function (n, o) {
                    o || (o = i), "string" == typeof n && (n = n.replace(".", ""));
                    var s = "",
                        r = /\{\{\s*(\w+)\s*\}\}/,
                        d = o || t;
                    function l(t, e, i, n) {
                        if (((e = a(e, 2)), (i = a(i, ",")), (n = a(n, ".")), isNaN(t) || null == t)) return 0;
                        var o = (t = (t / 100).toFixed(e)).split(".");
                        return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (o[1] ? n + o[1] : "");
                    }
                    switch (d.match(r)[1]) {
                        case "amount":
                            (s = l(n, 2)), e && s && s.includes(".") && (s = s.replace(".", "<sup>") + "</sup>");
                            break;
                        case "amount_no_decimals":
                            s = l(n, 0);
                            break;
                        case "amount_with_comma_separator":
                            (s = l(n, 2, ".", ",")), e && s && s.includes(".") && (s = s.replace(",", "<sup>") + "</sup>");
                            break;
                        case "amount_no_decimals_with_comma_separator":
                            s = l(n, 0, ".", ",");
                            break;
                        case "amount_no_decimals_with_space_separator":
                            s = l(n, 0, " ");
                            break;
                        case "amount_with_apostrophe_separator":
                            s = l(n, 2, "'");
                    }
                    return d.replace(r, s);
                },
                getBaseUnit: function (t) {
                    if (t && t.unit_price_measurement && t.unit_price_measurement.reference_value)
                        return 1 === t.unit_price_measurement.reference_value ? t.unit_price_measurement.reference_unit : t.unit_price_measurement.reference_value + t.unit_price_measurement.reference_unit;
                },
            };
        })()),
        (T4SThemeSP.slate = {});
    var T = T4SThemeSP.slate;
    (T.utils = {
        getParameterByName: function (t, e) {
            e || (e = window.location.href), (t = t.replace(/[[\]]/g, "\\$&"));
            var i = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
            return i ? (i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "") : null;
        },
        removeParameterByName: function (t, e) {
            e || (e = window.location.href), (t = t.replace(/[[\]]/g, "\\$&"));
            var i = e.split("?")[0],
                a = [],
                n = -1 !== e.indexOf("?") ? e.split("?")[1] : "";
            if ("" !== n) {
                for (var o = (a = n.split("&")).length - 1; o >= 0; o -= 1) a[o].split("=")[0] === t && a.splice(o, 1);
                a.length && (i = i + "?" + a.join("&"));
            }
            return i;
        },
        resizeSelects: function (e) {
            e.each(function () {
                var e = t(this),
                    i = e.find("option:selected").text(),
                    a = t("<span>").html(i);
                a.appendTo("body");
                var n = a.width();
                a.remove(), e.width(n + 10);
            });
        },
        keyboardKeys: { TAB: 9, ENTER: 13, ESCAPE: 27, LEFTARROW: 37, RIGHTARROW: 39 },
    }),
        (T.rte = {
            wrapTable: function (t) {
                t.$tables.wrap('<div class="' + t.tableWrapperClass + '"></div>');
            },
            wrapIframe: function (e) {
                e.$iframes.each(function () {
                    t(this).wrap('<div class="' + e.iframeWrapperClass + '"></div>'), (this.src = this.src);
                });
            },
        }),
        (T.a11y = {
            pageLinkFocus: function (t) {
                var e = "js-focus-hidden";
                t.first()
                    .attr("tabIndex", "-1")
                    .focus()
                    .addClass(e)
                    .one("blur", function () {
                        t.first().removeClass(e).removeAttr("tabindex");
                    });
            },
            focusHash: function () {
                var e = window.location.hash;
                e && document.getElementById(e.slice(1)) && this.pageLinkFocus(t(e));
            },
            bindInPageLinks: function () {
                t("a[href*=#]").on(
                    "click",
                    function (e) {
                        this.pageLinkFocus(t(e.currentTarget.hash));
                    }.bind(this)
                );
            },
            trapFocus: function (e) {
                var i = { focusin: e.namespace ? "focusin." + e.namespace : "focusin", focusout: e.namespace ? "focusout." + e.namespace : "focusout", keydown: e.namespace ? "keydown." + e.namespace : "keydown.handleFocus" },
                    a = e.$container.find(t('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])').filter(":visible")),
                    n = a[0],
                    o = a[a.length - 1];
                e.$elementToFocus || (e.$elementToFocus = e.$container),
                    e.$container.attr("tabindex", "-1"),
                    e.$elementToFocus.focus(),
                    t(document).off("focusin"),
                    t(document).on(i.focusout, function () {
                        t(document).off(i.keydown);
                    }),
                    t(document).on(i.focusin, function (e) {
                        (e.target !== o && e.target !== n) ||
                            t(document).on(i.keydown, function (t) {
                                !(function (t) {
                                    t.keyCode === T.utils.keyboardKeys.TAB && (t.target !== o || t.shiftKey || (t.preventDefault(), n.focus()), t.target === n && t.shiftKey && (t.preventDefault(), o.focus()));
                                })(t);
                            });
                    });
            },
            removeTrapFocus: function (e) {
                var i = e.namespace ? "focusin." + e.namespace : "focusin";
                e.$container && e.$container.length && e.$container.removeAttr("tabindex"), t(document).off(i);
            },
            accessibleLinks: function (e) {
                var i = document.querySelector("body"),
                    a = { newWindow: "a11y-new-window-message", external: "a11y-external-message", newWindowExternal: "a11y-new-window-external-message" };
                (void 0 !== e.$links && e.$links.jquery) || (e.$links = t("a[href]:not([aria-describedby])")),
                    t.each(e.$links, function () {
                        var e = t(this),
                            i = e.attr("target"),
                            n = e.attr("rel"),
                            o = (function (t) {
                                var e = window.location.hostname;
                                return t[0].hostname !== e;
                            })(e),
                            s = "_blank" === i;
                        o && e.attr("aria-describedby", a.external),
                            s &&
                                ((void 0 !== n && -1 !== n.indexOf("noopener")) ||
                                    e.attr("rel", function (t, e) {
                                        return (void 0 === e ? "" : e + " ") + "noopener";
                                    }),
                                e.attr("aria-describedby", a.newWindow)),
                            o && s && e.attr("aria-describedby", a.newWindowExternal);
                    }),
                    (function (e) {
                        "object" != typeof e && (e = {});
                        var n = t.extend({ newWindow: "Opens in a new window.", external: "Opens external website.", newWindowExternal: "Opens external website in a new window." }, e),
                            o = document.createElement("ul"),
                            s = "";
                        for (var r in n) s += "<li id=" + a[r] + ">" + n[r] + "</li>";
                        o.setAttribute("hidden", !0), (o.innerHTML = s), i.appendChild(o);
                    })(e.messages);
            },
        }),
        (T4SThemeSP.LinkMyltiLang = (function () {
            var e = T4SThemeSP.root_url,
                i = window.location.hostname,
                a = T4Sroutes.root_url,
                n = "is--checked-link",
                o = i + a;
            return function () {
                "/" != e &&
                    t(`a[href*="${i}"]:not(.${n}):not([href*="@"])`).each(function () {
                        let s = t(this),
                            r = s.attr("href");
                        s.addClass(n), (r.indexOf(i + e) >= 0 && "/" != r) || r.indexOf("preview_theme_id=") > -1 || ("/" != r ? s.attr("href", r.replace(i, o)) : s.attr("href", a));
                    });
            };
        })());
    var _,
        $ = (function () {
            function e(e) {
                var i = this;
                if (((i.$slider = t(e)), (i.slideWrap = i.$slider.closest("[data-slide-wrap]")[0] || e), !i.slideWrap)) return;
                if (
                    ((i.sliderOptions = JSON.parse(i.$slider.attr("data-options") || "{}")),
                    (i.slider = e),
                    (i.sliderItems = e.querySelectorAll(".t4s-slider__slide")),
                    (i.pageCount = i.slideWrap.querySelector(".t4s-slider-counter--current")),
                    (i.pageTotal = i.slideWrap.querySelector(".t4s-slider-counter--total")),
                    (i.prevButton = i.slideWrap.querySelector(".t4s-slider__slide-prev")),
                    (i.nextButton = i.slideWrap.querySelector(".t4s-slider__slide-next")),
                    !i.slider || !i.nextButton)
                )
                    return;
                new ResizeObserver((t) => i._initPages()).observe(i.slider),
                    i.slider.addEventListener("scroll", i._update.bind(i)),
                    i.prevButton.addEventListener("click", i._onButtonClick.bind(i)),
                    i.nextButton.addEventListener("click", i._onButtonClick.bind(i));
            }
            return (
                (e.prototype = Object.assign({}, e.prototype, {
                    _initPages: function () {
                        this.slider.classList.remove("is--active"),
                            0 !== !this.sliderItems.length &&
                                (this.slider.classList.add("is--active"),
                                (this.slidesPerPage = Math.floor(this.slider.clientWidth / this.sliderItems[0].clientWidth)),
                                (this.totalPages = this.sliderItems.length - this.slidesPerPage + 1),
                                this._update());
                    },
                    _update: function () {
                        this.pageCount &&
                            this.pageTotal &&
                            ((this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItems[0].clientWidth) + 1),
                            1 === this.currentPage ? this.prevButton.setAttribute("disabled", !0) : this.prevButton.removeAttribute("disabled"),
                            this.currentPage === this.totalPages ? this.nextButton.setAttribute("disabled", !0) : this.nextButton.removeAttribute("disabled"),
                            (this.pageCount.textContent = this.currentPage),
                            (this.pageTotal.textContent = this.totalPages));
                    },
                    _onButtonClick: function (t) {
                        t.preventDefault();
                        const e = "next" === t.currentTarget.name ? this.slider.scrollLeft + this.sliderItems[0].clientWidth : this.slider.scrollLeft - this.sliderItems[0].clientWidth;
                        this.slider.scrollTo({ left: e });
                    },
                })),
                e
            );
        })();
    (T4SThemeSP.SliderComponentInt = void (
        0 != (_ = t(".t4s-slider:not(.t4s-enabled)")).length &&
        _.each(function (t) {
            this.classList.add("t4s-enabled"), (this.sliderComponent = new $(this));
        })
    )),
        (T4SThemeSP.LibraryLoader = (function () {
            var t = { link: "link", script: "script" },
                e = { requested: "requested", loaded: "loaded" },
                a = "https://cdn.shopify.com/shopifycloud/",
                n = {
                    youtubeSdk: { tagId: "youtube-sdk", src: "https://www.youtube.com/iframe_api", type: t.script },
                    vimeoSdk: { tagId: "vimeo-sdk", src: "https://player.vimeo.com/api/player.js", type: t.script },
                    plyrShopifyStyles: { tagId: "plyr-shopify-styles", src: a + "plyr/v2.0/shopify-plyr.css", type: t.link },
                    modelViewerUiStyles: { tagId: "shopify-model-viewer-ui-styles", src: a + "model-viewer-ui/assets/v1.0/model-viewer-ui.css", type: t.link },
                };
            return {
                load: function (a, o) {
                    var s = n[a];
                    if (s) {
                        if (d && "youtubeSdk" == a && window.YT) return o(), void i.trigger("youtube:ready");
                        if (s.status !== e.requested)
                            if (((o = o || function () {}), s.status !== e.loaded)) {
                                var r;
                                switch (((s.status = e.requested), s.type)) {
                                    case t.script:
                                        r = (function (t, i) {
                                            var a = document.createElement("script");
                                            return (
                                                (a.src = t.src),
                                                a.addEventListener("load", function () {
                                                    (t.status = e.loaded), i();
                                                }),
                                                a
                                            );
                                        })(s, o);
                                        break;
                                    case t.link:
                                        r = (function (t, i) {
                                            var a = document.createElement("link");
                                            return (
                                                (a.href = t.src),
                                                (a.rel = "stylesheet"),
                                                (a.type = "text/css"),
                                                a.addEventListener("load", function () {
                                                    (t.status = e.loaded), i();
                                                }),
                                                a
                                            );
                                        })(s, o);
                                }
                                (r.id = s.tagId), (s.element = r);
                                var l = document.getElementsByTagName(s.type)[0];
                                l.parentNode.insertBefore(r, l);
                            } else o();
                    }
                },
            };
        })());
    var C,
        k = (function () {
            var a = { html5: "html5", youtube: "youtube", vimeo: "vimeo" },
                n = !1,
                o = !1;
            function s(e) {
                switch (
                    ((this.$video = t(e)),
                    (this.video_options = JSON.parse(this.$video.attr("data-options") || "{}")),
                    (this.video_type = this.video_options.type),
                    (this.video_mute = this.video_options.mute),
                    (this.$videoInsert = this.$video.find("[data-bgvideo-insert]")),
                    (this.$elementToInsert = this.$videoInsert.length ? this.$videoInsert : this.$video),
                    (this.elementToInsert = this.$elementToInsert[0]),
                    this.$video.attr("loaded", !0),
                    this.video_type)
                ) {
                    case a.html5:
                        this._setupBgHtml5Video();
                        break;
                    case a.youtube:
                        window.YT ? this._setupBgYouTubeVideo() : (this._triggerBgYouTubeVideo(), n || (T4SThemeSP.LibraryLoader.load("youtubeSdk"), (n = !0)));
                        break;
                    case a.vimeo:
                        window.Vimeo ? this._setupBgVimeoVideo() : (this._triggerBgVimeoVideo(), o || (T4SThemeSP.LibraryLoader.load("vimeoSdk", this._loadedVimeoSDK.bind(this)), (o = !0)));
                }
            }
            return (
                (s.prototype = Object.assign({}, s.prototype, {
                    _triggerBgYouTubeVideo: function () {
                        var t = this;
                        i.on("youtube:ready", function (e) {
                            t._setupBgYouTubeVideo();
                        });
                    },
                    _loadedVimeoSDK: function () {
                        i.trigger("vimeo:ready");
                    },
                    _triggerBgVimeoVideo: function () {
                        var t = this;
                        i.on("vimeo:ready", function (e) {
                            t._setupBgVimeoVideo();
                        });
                    },
                    _setupBgHtml5Video: function () {
                        var e = this,
                            i = e.video_options.id;
                        let a = i && t(i)[0] ? t(i).html() : '<video class="t4s_bg_vid_html5" src="' + e.video_options.srcDefault + '" preload="auto" playsinline autoplay ' + (e.video_mute ? "muted " : " ") + "loop></video>";
                        e.$elementToInsert.replaceWith(a),
                            e.$video.find(".t4s_bg_vid_html5").on("playing", function (t) {
                                e.$video.addClass("t4s-bgvideo-playing");
                            });
                    },
                    _setupBgYouTubeVideo: function () {
                        if (window.YT) {
                            var t = this;
                            (t.player = new YT.Player(t.elementToInsert, {
                                videoId: t.video_options.vid,
                                playerVars: {
                                    iv_load_policy: 3,
                                    enablejsapi: 1,
                                    disablekb: 1,
                                    autoplay: 0,
                                    controls: 0,
                                    rel: 0,
                                    loop: 0,
                                    playsinline: 1,
                                    modestbranding: 1,
                                    autohide: 1,
                                    branding: 0,
                                    cc_load_policy: 0,
                                    fs: 0,
                                    quality: "hd1080",
                                    wmode: "transparent",
                                    height: "100%",
                                    width: "100%",
                                    origin: t.video_options.requestHost,
                                },
                                events: { onReady: t.onPlayerReady.bind(this), onStateChange: t.onPlayerStateChange.bind(this) },
                            })),
                                t.resizeVideoBackground(),
                                e.on(
                                    "resize",
                                    T4SThemeSP.debounce(
                                        300,
                                        function () {
                                            t.resizeVideoBackground();
                                        }.bind(t)
                                    )
                                );
                        }
                    },
                    onPlayerReady: function (t) {
                        this.video_mute && this.player.mute(), this.player.playVideo();
                    },
                    onPlayerStateChange: function (t) {
                        t.data === YT.PlayerState.PLAYING ? this.$video.addClass("t4s-bgvideo-playing") : t.data === YT.PlayerState.ENDED && this.player.playVideo();
                    },
                    _setupBgVimeoVideo: function () {
                        if (window.Vimeo) {
                            var t = this;
                            (t.player = new Vimeo.Player(t.elementToInsert.parentNode, { id: t.video_options.vid, autoplay: !0, autopause: !1, muted: !0, background: !0, loop: t.video_mute })),
                                t.$videoInsert.remove(),
                                t.resizeVideoBackground(),
                                e.on(
                                    "resize",
                                    T4SThemeSP.debounce(
                                        300,
                                        function () {
                                            t.resizeVideoBackground();
                                        }.bind(t)
                                    )
                                ),
                                t.player.on("play", function () {
                                    t.$video.addClass("t4s-bgvideo-playing");
                                }),
                                t.player.on("ended", function () {});
                        }
                    },
                    resizeVideoBackground: function () {
                        var t,
                            e,
                            i,
                            a,
                            n = this.$video,
                            o = n.innerWidth(),
                            s = n.innerHeight();
                        o / s < 16 / 9
                            ? ((t = s * (16 / 9)), (e = s), (i = -Math.round((t - o) / 2) + "px"), (a = -Math.round((e - s) / 2) + "px"))
                            : ((e = (t = o) * (9 / 16)), (a = -Math.round((e - s) / 2) + "px"), (i = -Math.round((t - o) / 2) + "px")),
                            (t += "px"),
                            (e += "px"),
                            n.find("iframe").css({ maxWidth: "1000%", marginLeft: i, marginTop: a, width: t, height: e });
                    },
                })),
                s
            );
        })();
    (T4SThemeSP.BgVideo = function () {
        var e = t('[data-video-background]:not([loaded="true"])');
        0 != e.length &&
            e.each(function (t) {
                this.bgVideo = new k(this);
            });
    }),
        (T4SThemeSP.Footer = (function () {
            var i = { opened: "is--footer_opened" },
                a = 200;
            function n() {
                t("[data-footer-open]")
                    .off("click")
                    .on("click", function () {
                        var e = t(this).parent(),
                            n = e.find("> [data-footer-content]");
                        e.hasClass(i.opened) ? (e.removeClass(i.opened), n.stop().slideUp(a)) : (e.addClass(i.opened), n.stop().slideDown(a));
                    }),
                    e.off("resize.FooterCollapse");
            }
            return function () {
                e.on("resize.FooterCollapse", n), e.width() < 768 && t(".is--footer-collapse-true").length > 0 && n();
            };
        })()),
        (T4SThemeSP.Notices = (function () {
            var e,
                i,
                a,
                s,
                r,
                d = t("#t4s-notices__tmp"),
                l = d.html(),
                c = "is--show",
                u = "is--active-notices",
                f = "click.notices",
                p = "hide.t4s.notices",
                h = !1,
                m = 200,
                g = T4Sconfigs.autoHideNotices,
                v = T4Sconfigs.timeOutNotices;
            function y() {
                a.hide(), clearTimeout(r), e.removeClass(c), n.removeClass(u), e.off(f).off(p);
            }
            return (
                d.remove(),
                function (d, b = "warning") {
                    h ||
                        (T4SThemeSP.$appendComponent.after(l),
                        (e = t("#t4s-notices__wrapper")),
                        (i = e.find(".t4s-notices__mess")),
                        (a = e.find(".t4s-notices__progressbar")),
                        (s = a.show().find(">span")),
                        (h = !0),
                        (l = null),
                        s.css("animation-duration", `${v}ms`)),
                        e.attr("data-notices-status", b),
                        "object" == typeof d
                            ? (i.html(""),
                              t.each(d, function (t, e) {
                                  i.append('<span class="t4s-d-block">' + e[0] + "</span>");
                              }))
                            : i.html(d),
                        g ? a.show() : a.hide(),
                        setTimeout(function () {
                            e.addClass(c), n.addClass(u);
                        }, m),
                        g &&
                            (r = setTimeout(function () {
                                y();
                            }, v + m)),
                        e.on(f, function () {
                            y();
                        }),
                        o.on(p, function () {
                            y();
                        });
                }
            );
        })()),
        (T4SThemeSP.FormShopifyMessSuccess = function () {
            t(document).on("submit", 'form[action^="/contact"]', function (e) {
                localStorage.setItem("t4s-recentform", t(this).attr("id"));
            });
            let e = location.href,
                i = localStorage.getItem("t4s-recentform") || "";
            (e.indexOf("contact_posted=true") < 0 && "" !== i) ||
                (e.indexOf("contact_posted=true#ContactFormNotifyStock") > -1 || i.includes("ContactFormNotifyStock")
                    ? T4SThemeSP.Notices(l.frm_notify_stock_success, "success")
                    : e.indexOf("contact_posted=true#ContactFormAsk") > -1 || i.includes("ContactFormAsk")
                    ? T4SThemeSP.Notices(l.frm_contact_ask_success, "success")
                    : (e.indexOf("contact_posted=true#t4sNewsletterFormPopup") > -1 || i.includes("t4sNewsletterFormPopup")) && T4SThemeSP.Notices(l.frm_newsletter_popup_success, "success"));
        }),
        (T4SThemeSP.PreloadStylePopup = function () {
            var e = t("#t4s-style-popup");
            0 != e.length && t("#t4s-assets-pre").html(e.html());
        }),
        (T4SThemeSP.BtnMore = (function () {
            var e = { enabled: "is--enabled", btn: "[data-btn-toogle]", open: "is--open" };
            function i(i) {
                (this.el = i),
                    (this.$el = t(i)),
                    this.clickHandler(),
                    this.$el.addClass(e.enabled),
                    (this.selector = this.$el.data("slector")),
                    (this.tMore = this.$el.data("tmore")),
                    (this.tLess = this.$el.data("tless")),
                    (this.hasIsotope = this.$el.hasClass("isotopet4s"));
            }
            return (
                (i.prototype = Object.assign({}, i.prototype, {
                    clickHandler: function () {
                        var i = this;
                        i.$el.on("click.more", e.btn, function (a) {
                            a.preventDefault();
                            let n = t(this);
                            n.parent().find(i.selector).slideToggle(200),
                                n.toggleClass(e.open),
                                n.hasClass(e.open) ? n.html(i.tLess) : n.html(i.tMore),
                                i.hasIsotope &&
                                    (i.$el.isotopet4s("layout"),
                                    setTimeout(function () {
                                        i.$el.isotopet4s("layout");
                                    }, 219));
                        });
                    },
                })),
                i
            );
        })()),
        (T4SThemeSP.initBtnMore = void (
            0 != (C = t("[data-wrap-toogle]:not(.is--enabled)")).length &&
            C.each(function () {
                this.btnMore = new T4SThemeSP.BtnMore(this);
            })
        )),
        (T4SThemeSP.fixHand = function () {
            var t = navigator.userAgent.indexOf("Windows Phone") >= 0;
            !/iP(ad|hone|od)/.test(navigator.userAgent) ||
                t ||
                a > 1199 ||
                $script(T4Sconfigs.script12c, function () {
                    T4SThemeSP.FastClick.attach(document.body),
                        T4Sconfigs.disFlashyApp ||
                            (function () {
                                const t = document.querySelector("body");
                                new MutationObserver(function () {
                                    let t = document.querySelector("flashy-popup");
                                    t && !t.classList.contains("needsclick") && t.classList.add("needsclick");
                                }).observe(t, { attributes: !0, childList: !0, subtree: !0 });
                            })();
                });
        });
})(jQuery_T4NT),
    jQuery_T4NT(document).ready(function (t) {
        smoothscroll.polyfill(),
            T4SThemeSP.FormShopifyMessSuccess(),
            T4SThemeSP.BgVideo(),
            T4SThemeSP.ParallaxInt(),
            t(".t4s-parallax-bg:not(.lazyloadt4sed)").on("lazyloaded", function (t) {
                T4SThemeSP.ParallaxInt();
            }),
            T4SThemeSP.Countdown(),
            T4SThemeSP.AnimateOnScroll(),
            T4SThemeSP._initProducts(),
            T4SThemeSP.slate.a11y.accessibleLinks({ $links: t("a[href]:not([aria-describedby])") }),
            T4SThemeSP.Tabs.Default(),
            T4SThemeSP.Tabs.Simple(),
            T4SThemeSP.Tabs.Accordion(),
            T4SThemeSP.Footer(),
            T4SThemeSP.PopupMFP(),
            T4SThemeSP.Cookies(),
            T4SThemeSP.fixHand(),
            $script([T4Sconfigs.script3, T4Sconfigs.script6]),
            setTimeout(function () {
                T4SThemeSP.LinkMyltiLang();
            }, 500),
            setTimeout(function () {
                T4SThemeSP.PreloadStylePopup();
            }, 1500);
    });
