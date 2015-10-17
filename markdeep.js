/**
  markdeep.js
  Version 0.02

  Copyright 2015, Morgan McGuire, http://casual-effects.com
  All rights reserved.

  -------------------------------------------------------------

  See http://casual-effects.com/markdeep for documentation on how to
  use this script make your plain text documents render beautifully
  in web browsers.

  Markdeep was created by Morgan McGuire. It extends the work of:

   - John Grubber's original Markdown
   - Ben Hollis' Maruku Markdown dialect
   - Michel Fortin's Markdown Extras dialect
   - Dominic Baggott's markdown.js implementation
   - Ivan Sagalaev's highlight.js
   - Contributors to the above open source projects

  -------------------------------------------------------------

  You may use, extend, and redistribute this code under the terms of
  the BSD license at https://opensource.org/licenses/BSD-2-Clause.

  Embedded at the end of this file are markdown.js
  (https://github.com/evilstreak/markdown-js) by Dominic Baggott,
  which is used for Maruku and Gruber style Markdown processing after
  diagrams have been handled and highlight.js
  (https://github.com/isagalaev/highlight.js) by Ivan Sagalaev, which
  is used for code highlighting. Each has their respective license
  with them.
  @license
*/
! function() {
    "use strict";

    function e(e) {
        return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }

    function t(e) {
        return (e + "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    }

    function r(e) {
        for (var t = "*", r = t + t + t + t + t, n = {
                beforeString: e,
                diagramString: "",
                alignmentHint: "",
                afterString: ""
            }, i = e.indexOf(r); i >= 0; i = e.indexOf(r, i + r.length)) {
            var a, s = Math.max(0, e.lastIndexOf("\n", i)) + 1,
                o = i - s;
            for (a = i + r.length; e[a] === t; ++a);
            for (var c = a - s - 1, l = {
                    beforeString: e.substring(0, s),
                    diagramString: "",
                    alignmentHint: "",
                    afterString: e.substring(s, i).replace(/[ \t]*[ \t]$/, " ")
                }, u = !0, d = a; u;) {
                if (s = e.indexOf("\n", s) + 1, 0 === s) return n;
                if (e[s + o] === t && e[s + c] === t) {
                    for (var p = o; c > p && e[s + p] === t; ++p);
                    if (p === c) return l.afterString += e.substring(s + c + 1), l;
                    var h = s + o,
                        f = s + c;
                    l.afterString += e.substring(d, h).replace(/^[ \t]*[ \t]/, " ").replace(/[ \t][ \t]*$/, " "), o > 0 && (l.alignmentHint = "right"), l.diagramString += e.substring(h + 1, f) + "\n", d = f + 1
                } else u = !1
            }
        }
        return n
    }

    function n(e, t, r) {
        for (var n = r || /<pre(\s.*?)?>|<svg(\s.*?)?>|<code(\s.*?)?>|<script\s.*?>|<style\s.*?>|<protect>/i, i = ""; e.length > 0;) {
            var a = e.search(n);
            if (-1 === a) i += t(e), e = "";
            else {
                i += t(e.substring(0, a));
                var s = Math.max(e.substring(a + 1, a + 15).search(/[\s>]/), 0),
                    o = e.substring(a + 1, a + s + 1),
                    c = RegExp("</" + o + ">", "i"),
                    l = e.search(c); - 1 === l ? l = e.length : l += o.length + 3, i += e.substring(a, l), e = e.substring(l)
            }
        }
        return i
    }

    function i(i) {
        function s(e) {
            var t = r(e);
            return t.diagramString ? t.beforeString + a(t.diagramString, t.alignmentHint) + s(t.afterString) : e
        }
        i = i.replace(/(\$\$[\s\S]+?\$\$)/gm, "<protect>$1</protect>"), i = i.replace(/([^\$\d\.])\$[ \t](.*?[^\$])\$([^\$\d\.])/g, "$1\\\\($2\\\\)$3");
        var o = /^\*\*([^ \t\*].*?[^ \t\*])\*\*[ \t]*\n/.source,
            c = /([ {4,}\t][ \t]*\S.*\n)*/.source;
        return i = i.replace(RegExp(o + c, "mg"), function(e, t) {
            t = t.trim();
            var r = e.substring(e.indexOf("\n"));
            return r = r ? r.replace(/[ \t]*(\S.*?)\n/g, '<div class="subtitle">$1</div>\n') : "", "<title>" + t + '</title><div class="title">' + t + "</div>\n" + r + "<br/>\n"
        }), i = s(i), [/\n~{3,}.*\n([\s\S]+?)\n~{3,}\n/gm, /\n`{3,}.*\n([\s\S]+?)\n`{3,}\n/gm].forEach(function(e) {
            i = i.replace(e, function(e, t) {
                return "<pre><code>" + hljs.highlightAuto(t).value + "</code></pre>"
            })
        }), i = n(i, function(r) {
            function n(e, t, r) {
                var n = "[^ \\t\n" + t.source + "]",
                    i = "(" + t.source + ")(" + n + "(?:.*?" + n + ")?)(" + t.source + ")(?![A-Za-z0-9])";
                return e.replace(RegExp(i, "g"), "<" + r + ">$2</" + r + ">")
            }
            r = r.replace(/\n(_[ \t]*){3,}\s*?\n/g, "\n<hr/>\n"), r = r.replace(/\n(\*[ \t]*){3,}\s*?\n/g, "\n<hr/>\n"), r = n(r, /\*\*/, "strong"), r = n(r, /__/, "strong"), r = n(r, /\*/, "em"), r = n(r, /_/, "em"), r = r.replace(/\~\~([^~].*?)\~\~/g, "<del>$1</del>"), r = r.replace(/\n(.+?)\n={5,}[ \t]*\n/g, "\n<h1>$1</h1>\n"), r = r.replace(/\n(.+?)\n-{5,}[ \t]*\n/g, "\n<h2>$1</h2>\n"), r = r.replace(/(`)(.+?)(`)/g, "<code>$2</code>"), r = r.replace(/\[([^\[]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>'), r = r.replace(/(\n[ \t]*)\*([ \t].+)/g, "$1-$2");
            var i = "㌳",
                a = "㌴";
            return r = r.replace(/_/g, i), r = r.replace(/\*/g, a), r = t(markdown.toHTML(r, "Maruku")), r = r.replace(RegExp(i, "g"), "_"), r = r.replace(RegExp(a, "g"), "*"), r = r.replace(/<code>(.*?)<\/code>/g, function(t, r) {
                return "<code>" + e(r) + "</code>"
            })
        }), i = i.replace(/<protect>([\s\S]+?)<\/protect>/gm, "$1")
    }

    function a(t, r) {
        function n(e) {
            return -1 !== R.indexOf(e)
        }

        function i(e) {
            return -1 !== L.indexOf(e)
        }

        function a(e) {
            return n(e) || "." === e
        }

        function o(e) {
            return n(e) || "'" === e
        }

        function c(e) {
            return i(e) || "<" === e || g(e)
        }

        function l(e) {
            return i(e) || ">" === e || g(e)
        }

        function u(e) {
            return "-" === e || n(e) || f(e)
        }

        function d(e) {
            return "|" === e || n(e)
        }

        function p(e) {
            return "/" === e || n(e)
        }

        function h(e) {
            return "\\" === e || n(e)
        }

        function f(e) {
            return -1 !== A.indexOf(e)
        }

        function g(e) {
            return -1 !== E.indexOf(e)
        }

        function b(e) {
            return -1 !== S.indexOf(e)
        }

        function m(e) {
            return " " === e
        }

        function v(e, t) {
            void 0 === t && (void 0 === e ? e = t = 0 : e instanceof v && (t = e.y, e = e.x)), this.x = e, this.y = t, Object.seal(this)
        }

        function _(e) {
            this._string = e, this._used = [], this.width = e.indexOf("\n"), this.height = e.split("\n").length, "\n" === e[e.length - 1] && --this.height, Object.freeze(this)
        }

        function y(e, t, r, n) {
            this.A = e, this.B = t, r && (this.C = r, this.D = n ? n : r)
        }

        function x() {
            this.R = []
        }

        function w() {
            this.S = []
        }

        function k(e, t) {
            for (var r = 0; e.width > r; ++r)
                for (var n = 0; e.height > n; ++n)
                    if (e.j(r, n)) {
                        var s = new v(r, n);
                        do e.g(r, n), ++n; while (e.j(r, n));
                        var c = new v(r, n - 1),
                            l = e.get(s),
                            p = e.get(s.x, s.y - 1);
                        (!i(l) && ("-" === p || "_" === p || "_" === e.get(s.x - 1, s.y - 1) || "_" === e.get(s.x + 1, s.y - 1) || o(p)) || f(p)) && (s.y -= .5);
                        var h = e.get(c),
                            g = e.get(c.x, c.y + 1);
                        (!i(h) && ("-" === g || a(g)) || f(g) || "_" === e.get(c.x - 1, c.y) || "_" === e.get(c.x + 1, c.y)) && (c.y += .5), (s.x !== c.x || s.y !== c.y) && t.insert(new y(s, c))
                    }
            for (var n = 0; e.height > n; ++n)
                for (var r = 0; e.width > r; ++r)
                    if (e.m(r, n)) {
                        var s = new v(r, n);
                        do e.g(r, n), ++r; while (e.m(r, n));
                        var c = new v(r - 1, n);
                        !i(e.get(s.x - 1, s.y)) && (a(e.get(s)) && d(e.get(s.x - 1, s.y + 1)) || o(e.get(s)) && d(e.get(s.x - 1, s.y - 1))) && ++s.x, !i(e.get(c.x + 1, c.y)) && (a(e.get(c)) && d(e.get(c.x + 1, c.y + 1)) || o(e.get(c)) && d(e.get(c.x + 1, c.y - 1))) && --c.x, (s.x !== c.x || s.y !== c.y) && t.insert(new y(s, c))
                    }
            for (var b = -e.height; e.width > b; ++b)
                for (var r = b, n = 0; e.height > n; ++n, ++r)
                    if (e.o(r, n)) {
                        var s = new v(r, n);
                        do e.g(r, n), ++r, ++n; while (e.o(r, n));
                        var c = new v(r - 1, n - 1);
                        ("/" === e.get(s.x, s.y - 1) || "_" === e.get(s.x - 1, s.y - 1) || "_" === e.get(s.x, s.y - 1)) && (s.x -= .5, s.y -= .5), ("/" === e.get(c.x, c.y + 1) || "_" === e.get(c.x + 1, c.y)) && (c.x += .5, c.y += .5), t.insert(new y(s, c))
                    }
            for (var b = -e.height; e.width > b; ++b)
                for (var r = b, n = e.height - 1; n >= 0; --n, ++r)
                    if (e.p(r, n)) {
                        var s = new v(r, n);
                        do e.g(r, n), ++r, --n; while (e.p(r, n));
                        var c = new v(r - 1, n + 1);
                        ("\\" === e.get(c.x, c.y - 1) || "_" === e.get(c.x, c.y - 1) || "_" === e.get(c.x + 1, c.y - 1)) && (c.x += .5, c.y -= .5), ("\\" === e.get(s.x, s.y + 1) || "_" === e.get(s.x - 1, s.y) || "_" === e.get(s.x + 1, s.y)) && (s.x -= .5, s.y += .5), t.insert(new y(s, c))
                    }
            for (var n = 0; e.height > n; ++n)
                for (var r = 0; e.width > r; ++r) {
                    var m = e.get(r, n);
                    a(m) && (u(e.get(r - 1, n)) && d(e.get(r + 1, n + 1)) && (e.g(r - 1, n), e.g(r, n), e.g(r + 1, n + 1), t.insert(new y(new v(r - 1, n), new v(r + 1, n + 1), new v(r + 1.1, n), new v(r + 1, n + 1)))), u(e.get(r + 1, n)) && d(e.get(r - 1, n + 1)) && (e.g(r - 1, n + 1), e.g(r, n), e.g(r + 1, n), t.insert(new y(new v(r + 1, n), new v(r - 1, n + 1), new v(r - 1.1, n), new v(r - 1, n + 1))))), ")" === m && "." === e.get(r - 1, n - 1) && "'" === e.get(r - 1, n + 1) && (e.g(r, n), e.g(r - 1, n - 1), e.g(r - 1, n + 1), t.insert(new y(new v(r - 1, n - 1), new v(r - 1, n + 1), new v(r + 1.6, n - 1), new v(r + 1.6, n + 1)))), "(" === m && "." === e.get(r + 1, n - 1) && "'" === e.get(r + 1, n + 1) && (e.g(r, n), e.g(r + 1, n - 1), e.g(r + 1, n + 1), t.insert(new y(new v(r + 1, n - 1), new v(r + 1, n + 1), new v(r - 1.6, n - 1), new v(r - 1.6, n + 1)))), o(m) && (u(e.get(r - 1, n)) && d(e.get(r + 1, n - 1)) && (e.g(r - 1, n), e.g(r, n), e.g(r + 1, n - 1), t.insert(new y(new v(r - 1, n), new v(r + 1, n - 1), new v(r + 1.1, n), new v(r + 1, n - 1)))), u(e.get(r + 1, n)) && d(e.get(r - 1, n - 1)) && (e.g(r - 1, n - 1), e.g(r, n), e.g(r + 1, n), t.insert(new y(new v(r + 1, n), new v(r - 1, n - 1), new v(r - 1.1, n), new v(r - 1, n - 1)))))
                }
            for (var n = 0; e.height > n; ++n)
                for (var r = 0; e.width - 2 > r; ++r)
                    if (("_" === e.get(r, n) || "/" === e.get(r, n)) && "_" === e.get(r + 1, n)) {
                        var s = new v(r - .5, n + .5);
                        ("|" === e.get(r - 1, n) || "|" === e.get(r - 1, n + 1)) && (s.x -= .5);
                        do e.g(r, n), ++r; while ("_" === e.get(r, n));
                        var c = new v(r - .5, n + .5);
                        ("|" === e.get(r, n) || "|" === e.get(r, n + 1)) && (c.x += .5), t.insert(new y(s, c))
                    }
        }

        function N(e, t, r) {
            for (var n = 0; e.width > n; ++n)
                for (var i = 0; e.height > i; ++i) {
                    var a = e.get(n, i),
                        s = i;
                    if (f(a)) t.N(n, s - .5) && t.I(n, s + .5) && (r.insert(n, s, a), e.g(n, s));
                    else if (g(a))(t.P(n - 1, s) || t.O(n + 1, s) || t.N(n, s - 1) || t.I(n, s + 1) || t.I(n, s) || t.N(n, s) || m(e.get(n, s - 1)) && m(e.get(n + 1, s)) && m(e.get(n - 1, s)) && m(e.get(n, s + 1))) && (r.insert(n, s, a), e.g(n, s));
                    else {
                        var o = 0;
                        ">" === a && t.P(n, s) ? (g(e.get(n + 1, s)) && (o = -.5), r.insert(n + o, s, ">", 0), e.g(n, s)) : "<" === a && t.O(n, s) ? (g(e.get(n - 1, s)) && (o = .5), r.insert(n + o, s, ">", 180), e.g(n, s)) : "^" === a ? t.I(n, s - .5) ? (r.insert(n, s - .5, ">", 270), e.g(n, s)) : t.I(n, s) ? (r.insert(n, s, ">", 270), e.g(n, s)) : t.J(n, s) ? (r.insert(n, s, ">", 270 + j), e.g(n, s)) : t.L(n, s) && (r.insert(n, s, a, 270 - j), e.g(n, s)) : "v" === a && (t.N(n, s + .5) ? (r.insert(n, s + .5, ">", 90), e.g(n, s)) : t.N(n, s) ? (r.insert(n, s, ">", 90), e.g(n, s)) : t.K(n, s) ? (r.insert(n, s, ">", 90 + j), e.g(n, s)) : t.M(n, s) && (r.insert(n, s, ">", 90 - j), e.g(n, s)))
                    }
                }
        }
        var M = 8,
            C = 2,
            j = 180 * Math.atan(1 / C) / Math.PI,
            $ = 1e-6,
            B = ">v<^",
            E = "o*",
            A = "()",
            S = B + E + A,
            R = "+",
            L = R + ".'";
        v.prototype.toString = v.prototype.toSVG = function() {
            return "" + this.x * M + "," + this.y * M * C + " "
        }, _.prototype.g = function(e, t) {
            void 0 === t && e instanceof v && (t = e.y, e = e.x), e >= 0 && this.width > e && t >= 0 && this.height > t && (this._used[t * (this.width + 1) + e] = !0)
        }, _.prototype.h = function(e, t) {
            return void 0 === t && e instanceof v && (t = e.y, e = e.x), this._used[t * (this.width + 1) + e] === !0
        }, _.prototype.get = function(e, t) {
            return void 0 === t && e instanceof v && (t = e.y, e = e.x), e >= 0 && this.width > e && t >= 0 && this.height > t ? this._string[t * (this.width + 1) + e] : " "
        }, _.prototype.j = function(e, t) {
            void 0 === t && (t = e.x, e = e.x);
            var r = this.get(e, t - 1),
                n = this.get(e, t),
                i = this.get(e, t + 1);
            return d(n) ? a(r) || "^" === r || d(r) || f(r) || o(i) || "v" === i || d(i) || f(i) || g(r) || g(i) || "_" === z.get(e, t - 1) || "_" === z.get(e - 1, t - 1) || "_" === z.get(e + 1, t - 1) || (a(this.get(e - 1, t - 1)) || a(this.get(e + 1, t - 1))) && (o(this.get(e - 1, t + 1)) || o(this.get(e + 1, t + 1))) : a(n) || "^" === n ? d(i) || f(i) && "." !== n : o(n) || "v" === n ? d(r) || f(r) && "'" !== n : g(n) ? d(r) || d(i) : !1
        }, _.prototype.m = function(e, t) {
            void 0 === t && (t = e.x, e = e.x);
            var r = this.get(e - 2, t),
                n = this.get(e - 1, t),
                a = this.get(e + 0, t),
                s = this.get(e + 1, t),
                o = this.get(e + 2, t);
            return u(a) ? u(n) ? u(s) || l(s) || u(r) || c(r) : c(n) ? u(s) : u(s) && (u(o) || l(o)) : "<" === a ? u(s) && u(o) : ">" === a ? u(n) && u(r) : i(a) ? u(n) && u(r) || u(s) && u(o) : !1
        }, _.prototype.o = function(e, t) {
            void 0 === t && (t = e.x, e = e.x);
            var r = this.get(e, t),
                n = this.get(e - 1, t - 1),
                s = this.get(e + 1, t + 1);
            return "\\" === r ? h(s) || o(s) || g(s) || "v" === s || h(n) || a(n) || g(n) || "^" === n || "/" === this.get(e, t - 1) || "/" === this.get(e, t + 1) || "_" === s || "_" === n : "." === r ? "\\" === s : "'" === r ? "\\" === n : "^" === r ? "\\" === s : "v" === r ? "\\" === n : i(r) || g(r) || "|" === r ? h(n) || h(s) : void 0
        }, _.prototype.p = function(e, t) {
            void 0 === t && (t = e.x, e = e.x);
            var r = this.get(e, t),
                n = this.get(e - 1, t + 1),
                s = this.get(e + 1, t - 1);
            return "/" !== r || "\\" !== this.get(e, t - 1) && "\\" !== this.get(e, t + 1) ? p(r) ? p(s) || a(s) || g(s) || "^" === s || "_" === s || p(n) || o(n) || g(n) || "v" === n || "_" === n : "." === r ? "/" === n : "'" === r ? "/" === s : "^" === r ? "/" === n : "v" === r ? "/" === s : i(r) || g(r) || "|" === r ? p(n) || p(s) : !1 : !0
        }, _.prototype.toString = function() {
            return this._string
        }, y.prototype.q = function() {
            return this.B.x === this.A.x
        }, y.prototype.s = function() {
            return this.B.y === this.A.y
        }, y.prototype.u = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return 0 > e && (e = -e, t = -t), Math.abs(t + e) < $
        }, y.prototype.F = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return 0 > e && (e = -e, t = -t), Math.abs(t - e) < $
        }, y.prototype.G = function() {
            return void 0 !== this.C
        }, y.prototype.H = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.A.x === e && this.A.y === t || this.B.x === e && this.B.y === t
        }, y.prototype.I = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.q() && this.A.x === e && Math.min(this.A.y, this.B.y) === t
        }, y.prototype.J = function(e, t) {
            return this.u() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, y.prototype.K = function(e, t) {
            return this.u() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, y.prototype.L = function(e, t) {
            return this.F() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, y.prototype.M = function(e, t) {
            return this.F() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, y.prototype.N = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.q() && this.A.x === e && Math.max(this.A.y, this.B.y) === t
        }, y.prototype.O = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.s() && this.A.y === t && Math.min(this.A.x, this.B.x) === e
        }, y.prototype.P = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.s() && this.A.y === t && Math.max(this.A.x, this.B.x) === e
        }, y.prototype.toSVG = function() {
            var e = '<path d="M ' + this.A;
            return e += this.G() ? "C " + this.C + this.D + this.B : "L " + this.B, e += '" style="fill:none; stroke:black;"', e += "/>"
        }, x.prototype.insert = function(e) {
            this.R.push(e)
        }, x.prototype.I = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].I(e, t)) return !0;
            return !1
        }, x.prototype.J = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].J(e, t)) return !0;
            return !1
        }, x.prototype.L = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].L(e, t)) return !0;
            return !1
        }, x.prototype.K = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].K(e, t)) return !0;
            return !1
        }, x.prototype.M = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].M(e, t)) return !0;
            return !1
        }, x.prototype.N = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].N(e, t)) return !0;
            return !1
        }, x.prototype.O = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].O(e, t)) return !0;
            return !1
        }, x.prototype.P = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].P(e, t)) return !0;
            return !1
        }, x.prototype.H = function(e, t) {
            for (var r = 0; this.R.length > r; ++r)
                if (this.R[r].H(e, t)) return !0;
            return !1
        }, x.prototype.toSVG = function() {
            for (var e = "", t = 0; this.R.length > t; ++t) e += this.R[t].toSVG() + "\n";
            return e
        }, w.prototype.insert = function(e, t, r, n) {
            void 0 === r && (r = t, t = e.y, e = e.x), n = n || 0, !b(r), this.S.push({
                C: new v(e, t),
                type: r,
                angle: n
            })
        }, w.prototype.toSVG = function() {
            for (var e = "", t = 0; this.S.length > t; ++t) {
                var r = this.S[t],
                    n = r.C;
                if (f(r.type)) {
                    var i = ")" === r.type ? .75 : -.75,
                        a = new v(n.x, n.y - .5),
                        o = new v(n.x, n.y + .5),
                        c = new v(n.x + i, n.y - .5),
                        l = new v(n.x + i, n.y + .5);
                    e += '<path d="M ' + o + " C " + l + c + a + '" style="fill:none; stroke:black;"/>'
                } else if (g(r.type)) e += '<circle cx="' + n.x * M + '" cy="' + n.y * M * C + '" r="' + (M - s) + '" style="', e += "*" === r.type ? "fill:black; " : "fill:white; ", e += 'stroke:black;"/>';
                else {
                    var u = new v(n.x + 1, n.y),
                        a = new v(n.x - .5, n.y - .35),
                        o = new v(n.x - .5, n.y + .35);
                    e += '<polygon points="' + u + a + o + '" style="fill:black" transform="rotate(' + r.angle + "," + n + ')"/>\n'
                }
            }
            return e
        };
        var z = new _(t),
            I = new x,
            q = new w;
        k(z, I), N(z, I, q);
        var T = '<svg class="diagram" xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + (z.height + 1) * M * C + '" width="' + (z.width + 1) * M + '"';
        if ("left" === r ? T += ' style="float:' + r + '; margin: 15px; margin-right: 30px; margin-left: 0px;"' : "right" === r && (T += ' style="float:' + r + '; margin: 15px; margin-right: 0px; margin-left: 30px;"'), T += '><g transform="translate(' + new v(1, 1) + ')">\n', DEBUG_SHOW_GRID) {
            T += '<g style="opacity:0.1">\n';
            for (var H = 0; z.width > H; ++H)
                for (var W = 0; z.height > W; ++W) T += '<rect x="' + ((H - .5) * M + 1) + '" + y="' + ((W - .5) * M * C + 2) + '" width="' + (M - 2) + '" height="' + (M * C - 2) + '" style="fill:', T += z.h(H, W) ? "red;" : " " === z.get(H, W) ? "gray; opacity:0.05" : "blue;", T += '"/>\n';
            T += "</g>\n"
        }
        if (T += I.toSVG(), T += q.toSVG(), !DEBUG_HIDE_PASSTHROUGH) {
            T += '<g transform="translate(0, 0)">\n';
            for (var H = 0; z.width > H; ++H)
                for (var W = 0; z.height > W; ++W) {
                    var O = z.get(H, W);
                    " " === O || z.h(H, W) || (T += '<text text-anchor="middle" x="' + H * M + '" y="' + (4 + W * M * C) + '" style="fill:#o00;">' + e(O) + "</text>\n")
                }
            T += "</g>"
        }
        if (DEBUG_SHOW_SOURCE) {
            T += '<g transform="translate(2, 2)">\n';
            for (var H = 0; z.width > H; ++H)
                for (var W = 0; z.height > W; ++W) {
                    var O = z.get(H, W);
                    " " !== O && (T += '<text text-anchor="middle" x="' + H * M + '" y="' + (4 + W * M * C) + '" style="fill:#F00; font-family: Menlo, monospace; font-size: 12px; text-align: center">' + e(O) + "</text>\n")
                }
            T += "</g>"
        }
        return T += "</g></svg>"
    }
    var DEBUG_SHOW_GRID = !1,
        DEBUG_SHOW_SOURCE = DEBUG_SHOW_GRID,
        DEBUG_HIDE_PASSTHROUGH = DEBUG_SHOW_SOURCE,
        s = 2,
        STYLESHEET = "<style>body { max-width: 680px; margin-left: auto;  margin-right: auto;  padding: 20px;  text-align: justify;  line-height: 139%;  color: #222; font-family: Palatino, Georgia, \"Times New Roman\", serif;  counter-reset: h1 h2 h3;}div.title { font-size: 26px; font-weight: 800;  padding-bottom: 0px;  padding-top: 20px; line-height: 120%; text-align: center;}div.subtitle { text-align: center;}div.title, h1, h2 { font-family: Verdana, Helvetica, Arial, sans-serif;}svg.diagram { border: solid 1px; display: block; font-family: Menlo, 'Lucida Console', monospace; font-size: 12px; text-align: center; stroke-linecap:round; stroke-width: " + s + 'px;}h1::before { content: counter(h1) ". "; counter-increment: h1; counter-reset: h2 h3;}h1 { padding-bottom: 3px; border-bottom: 3px solid;  padding-top: 15px;  border-top: none; font-size: 20px;}h2::before { content: counter(h1) "." counter(h2) " " ; counter-increment: h2; counter-reset: h3;}h2 { font-family: Helvetica, Arial, sans-serif; p-bottom: 3px;  padding-top: 15px;  border-bottom: 2px solid #999;  border-top: none;  color: #555; font-size: 18px;}table {  border-collapse: collapse;}th { color: #FFF; background-color: #AAA; border: 1px solid #888; padding-left: 15px; padding-right: 15px; padding-top: 8px; padding-bottom: 8px;}td { padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #888;}tr:nth-child(even) { background: #EEE;}dt { font-weight: 700;}dd { padding-bottom: 18px;}code { white-space: pre}div.markdeepFooter { font-size: 9px; text-align: right; padding-top: 80px; color: #999;} </style>',
        o = '<!-- Markdeep: --><style class="fallback">body{white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="http://casual-effects.com/markdeep/latest/markdeep.min.js"></script>';
    window.alreadyProcessedMarkdeep || (window.alreadyProcessedMarkdeep = !0, function() {
        function e(e) {
            return -1 !== e.search(/markdeep\S*?\.js$/i)
        }

        function r(e) {
            return Array.prototype.slice.call(e)
        }
        var n = -1 !== window.location.href.search(/\?.*noformat.*/i);
        n || r(document.getElementsByTagName("script")).forEach(function(t) {
            e(t.src) && t.parentNode.removeChild(t)
        });
        var a = document.head.innerHTML + document.body.innerHTML;
        return a = a.replace(/(?:<style class="fallback">[\s\S]*?<\/style>[\s\S]*)<\/\S+@\S+\.\S+?>/gim, ""), a = a.replace(/<\/http:.*>/gi, ""), a = a.replace(/<(https?): (.*?)>/gi, function(e, t, r) {
            var n = "<" + t + "://" + r.replace(/=""\s/g, "/");
            return n.substring(0, n.length - 3) + ">"
        }), n ? (a = a.replace(/<!-- Markdeep:.+<script.+?<\/script>/g, "") + o, a = a.replace(/</g, "&lt;").replace(/>/g, "&gt;"), void(document.body.innerHTML = "<pre>" + a + "</pre>")) : (a = a.replace(/<style class=["']fallback["']>.*?<\/style>/gim, ""), a = t(a), void setTimeout(function() {
            var e = i(a),
                t = -1 !== e.search(/(?:\$\$[\s\S]+\$\$)|(?:\\begin{)/m) || -1 !== e.search(/\\\(.*\\\)/),
                r = "$$NC{\\n}{\\hat{n}} NC{\\w}{\\hat{\\omega}} NC{\\wi}{\\w_\\mathrm{i}} NC{\\wo}{\\w_\\mathrm{o}} NC{\\wh}{\\w_\\mathrm{h}} NC{\\Li}{L_\\mathrm{i}} NC{\\Lo}{L_\\mathrm{o}} NC{\\Le}{L_\\mathrm{e}} NC{\\Lr}{L_\\mathrm{r}} NC{\\Lt}{L_\\mathrm{t}} NC{\\O}{\\mathrm{O}} NC{\\degrees}{{^\\circ}} NC{\\T}{\\mathsf{T}} NC{\\mathset}[1]{\\mathbb{#1}} NC{\\Real}{\\mathset{R}} NC{\\Integer}{\\mathset{Z}} NC{\\Boolean}{\\mathset{B}} NC{\\Complex}{\\mathset{C}}$$\n".replace(/NC/g, "\\newcommand");
            if (t && (e = '<script type="text/x-mathjax-config">MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "AMS"} } });</script><span style="display:none">' + r + "</span>\n" + e), e += '<div class="markdeepFooter"><i>formatted by <a href="http://casual-effects.com/markdeep" style="color: #999">Markdeep&nbsp;&nbsp;</a></i><div style="display: inline-block; font-size: 13px; font-family: \'Times New Roman\', serif; vertical-align: middle; transform:  translate(-3px, -1px)rotate(135deg);">&#x2712;</div></div>', document.head.innerHTML += STYLESHEET + c, document.body.innerHTML = e, t) {
                var n = document.createElement("script");
                n.type = "text/javascript", n.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", document.getElementsByTagName("head")[0].appendChild(n)
            }
        }, 0))
    }()),
    /*
  markdown.min.js 0.6.0 beta 1 from https://github.com/evilstreak/markdown-js follows.
  It is released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
@license
*/
    ! function(e) {
        function t() {
            return "Markdown.mk_block( " + uneval("" + this) + ", " + uneval(this.trailing) + ", " + uneval(this.lineNumber) + " )"
        }

        function r() {
            var e = require("util");
            return "Markdown.mk_block( " + e.inspect("" + this) + ", " + e.inspect(this.trailing) + ", " + e.inspect(this.lineNumber) + " )"
        }

        function n(e) {
            for (var t = 0, r = -1; - 1 !== (r = e.indexOf("\n", r + 1));) t++;
            return t
        }

        function i(e) {
            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        }

        function a(e) {
            if ("string" == typeof e) return i(e);
            var t = e.shift(),
                r = {}, n = [];
            for (!e.length || "object" != typeof e[0] || e[0] instanceof Array || (r = e.shift()); e.length;) n.push(a(e.shift()));
            var s = "";
            for (var o in r) s += " " + o + '="' + i(r[o]) + '"';
            return "img" === t || "br" === t || "hr" === t ? "<" + t + s + "/>" : "<" + t + s + ">" + n.join("") + "</" + t + ">"
        }

        function s(e, t, r) {
            var n;
            r = r || {};
            var i = e.slice(0);
            "function" == typeof r.preprocessTreeNode && (i = r.preprocessTreeNode(i, t));
            var a = f(i);
            if (a) {
                i[1] = {};
                for (n in a) i[1][n] = a[n];
                a = i[1]
            }
            if ("string" == typeof i) return i;
            switch (i[0]) {
                case "header":
                    i[0] = "h" + i[1].level, delete i[1].level;
                    break;
                case "bulletlist":
                    i[0] = "ul";
                    break;
                case "numberlist":
                    i[0] = "ol";
                    break;
                case "listitem":
                    i[0] = "li";
                    break;
                case "para":
                    i[0] = "p";
                    break;
                case "markdown":
                    i[0] = "html", a && delete a.references;
                    break;
                case "code_block":
                    i[0] = "pre", n = a ? 2 : 1;
                    var o = ["code"];
                    o.push.apply(o, i.splice(n, i.length - n)), i[n] = o;
                    break;
                case "inlinecode":
                    i[0] = "code";
                    break;
                case "img":
                    i[1].src = i[1].href, delete i[1].href;
                    break;
                case "linebreak":
                    i[0] = "br";
                    break;
                case "link":
                    i[0] = "a";
                    break;
                case "link_ref":
                    i[0] = "a";
                    var c = t[a.ref];
                    if (!c) return a.original;
                    delete a.ref, a.href = c.href, c.title && (a.title = c.title), delete a.original;
                    break;
                case "img_ref":
                    i[0] = "img";
                    var c = t[a.ref];
                    if (!c) return a.original;
                    delete a.ref, a.src = c.href, c.title && (a.title = c.title), delete a.original
            }
            if (n = 1, a) {
                for (var l in i[1]) {
                    n = 2;
                    break
                }
                1 === n && i.splice(n, 1)
            }
            for (; i.length > n; ++n) i[n] = s(i[n], t, r);
            return i
        }

        function o(e) {
            for (var t = f(e) ? 2 : 1; e.length > t;) "string" == typeof e[t] ? e.length > t + 1 && "string" == typeof e[t + 1] ? e[t] += e.splice(t + 1, 1)[0] : ++t : (o(e[t]), ++t)
        }

        function c(e, t) {
            function r(e) {
                this.len_after = e, this.name = "close_" + t
            }
            var n = e + "_state",
                i = "strong" === e ? "em_state" : "strong_state";
            return function(a) {
                if (this[n][0] === t) return this[n].shift(), [a.length, new r(a.length - t.length)];
                var s = this[i].slice(),
                    o = this[n].slice();
                this[n].unshift(t);
                var c = this.processInline(a.substr(t.length)),
                    l = c[c.length - 1];
                if (this[n].shift(), l instanceof r) {
                    c.pop();
                    var u = a.length - l.len_after;
                    return [u, [e].concat(c)]
                }
                return this[i] = s, this[n] = o, [t.length, t]
            }
        }

        function l(e) {
            for (var t = e.split(""), r = [""], n = !1; t.length;) {
                var i = t.shift();
                switch (i) {
                    case " ":
                        n ? r[r.length - 1] += i : r.push("");
                        break;
                    case "'":
                    case '"':
                        n = !n;
                        break;
                    case "\\":
                        i = t.shift();
                    default:
                        r[r.length - 1] += i
                }
            }
            return r
        }
        var u = {};
        u.mk_block = function(e, n, i) {
            1 === arguments.length && (n = "\n\n");
            var a = new String(e);
            return a.trailing = n, a.inspect = r, a.toSource = t, void 0 !== i && (a.lineNumber = i), a
        };
        var d = u.isArray = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
        u.forEach = Array.prototype.forEach ? function(e, t, r) {
            return e.forEach(t, r)
        } : function(e, t, r) {
            for (var n = 0; e.length > n; n++) t.call(r || e, e[n], n, e)
        }, u.T = function(e) {
            for (var t in e)
                if (hasOwnProperty.call(e, t)) return !1;
            return !0
        }, u.extract_attr = function(e) {
            return d(e) && e.length > 1 && "object" == typeof e[1] && !d(e[1]) ? e[1] : void 0
        };
        var p = function(e) {
            switch (typeof e) {
                case "undefined":
                    this.dialect = p.dialects.Gruber;
                    break;
                case "object":
                    this.dialect = e;
                    break;
                default:
                    if (!(e in p.dialects)) throw Error("Unknown Markdown dialect '" + (e + "") + "'");
                    this.dialect = p.dialects[e]
            }
            this.em_state = [], this.strong_state = [], this.debug_indent = ""
        };
        p.dialects = {};
        var h = p.mk_block = u.mk_block,
            d = u.isArray;
        p.parse = function(e, t) {
            var r = new p(t);
            return r.toTree(e)
        }, p.prototype.split_blocks = function(e) {
            e = e.replace(/(\r\n|\n|\r)/g, "\n");
            var t, r = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
                i = [],
                a = 1;
            for (null !== (t = /^(\s*\n)/.exec(e)) && (a += n(t[0]), r.lastIndex = t[0].length); null !== (t = r.exec(e));) "\n#" === t[2] && (t[2] = "\n", r.lastIndex--), i.push(h(t[1], t[2], a)), a += n(t[0]);
            return i
        }, p.prototype.processBlock = function(e, t) {
            var r = this.dialect.block,
                n = r.__order__;
            if ("__call__" in r) return r.__call__.call(this, e, t);
            for (var i = 0; n.length > i; i++) {
                var a = r[n[i]].call(this, e, t);
                if (a) return (!d(a) || a.length > 0 && !d(a[0])) && this.debug(n[i], "didn't return a proper array"), a
            }
            return []
        }, p.prototype.processInline = function(e) {
            return this.dialect.inline.__call__.call(this, e + "")
        }, p.prototype.toTree = function(e, t) {
            var r = e instanceof Array ? e : this.split_blocks(e),
                n = this.tree;
            try {
                for (this.tree = t || this.tree || ["markdown"]; r.length;) {
                    var i = this.processBlock(r.shift(), r);
                    i.length && this.tree.push.apply(this.tree, i)
                }
                return this.tree
            } finally {
                t && (this.tree = n)
            }
        }, p.prototype.debug = function() {
            var e = Array.prototype.slice.call(arguments);
            e.unshift(this.debug_indent), "undefined" != typeof print && print.apply(print, e), "undefined" != typeof console && void 0 !== console.log && void 0
        }, p.prototype.loop_re_over_block = function(e, t, r) {
            for (var n, i = t.valueOf(); i.length && null !== (n = e.exec(i));) i = i.substr(n[0].length), r.call(this, n);
            return i
        }, p.buildBlockOrder = function(e) {
            var t = [];
            for (var r in e) "__order__" !== r && "__call__" !== r && t.push(r);
            e.__order__ = t
        }, p.buildInlinePatterns = function(e) {
            var t = [];
            for (var r in e)
                if (!r.match(/^__.*__$/)) {
                    var n = r.replace(/([\\.*+?|()\[\]{}])/g, "\\$1").replace(/\n/, "\\n");
                    t.push(1 === r.length ? n : "(?:" + n + ")")
                }
            t = t.join("|"), e.__patterns__ = t;
            var i = e.__call__;
            e.__call__ = function(e, r) {
                return void 0 !== r ? i.call(this, e, r) : i.call(this, e, t)
            }
        };
        var f = u.extract_attr;
        p.renderJsonML = function(e, t) {
            t = t || {}, t.root = t.root || !1;
            var r = [];
            if (t.root) r.push(a(e));
            else
                for (e.shift(), !e.length || "object" != typeof e[0] || e[0] instanceof Array || e.shift(); e.length;) r.push(a(e.shift()));
            return r.join("\n\n")
        }, p.toHTMLTree = function(e, t, r) {
            "string" == typeof e && (e = this.parse(e, t));
            var n = f(e),
                i = {};
            n && n.references && (i = n.references);
            var a = s(e, i, r);
            return o(a), a
        }, p.toHTML = function(e, t, r) {
            var n = this.toHTMLTree(e, t, r);
            return this.renderJsonML(n)
        };
        var g = {};
        g.inline_until_char = function(e, t) {
            for (var r = 0, n = [];;) {
                if (e.charAt(r) === t) return r++, [r, n];
                if (r >= e.length) return null;
                var i = this.dialect.inline.__oneElement__.call(this, e.substr(r));
                r += i[0], n.push.apply(n, i.slice(1))
            }
        }, g.subclassDialect = function(e) {
            function t() {}

            function r() {}
            return t.prototype = e.block, r.prototype = e.inline, {
                block: new t,
                inline: new r
            }
        };
        var b = u.forEach,
            f = u.extract_attr,
            h = u.mk_block,
            m = u.T,
            v = g.inline_until_char,
            _ = {
                block: {
                    atxHeader: function(e, t) {
                        var r = e.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);
                        if (!r) return void 0;
                        var n = ["header", {
                            level: r[1].length
                        }];
                        return Array.prototype.push.apply(n, this.processInline(r[2])), e.length > r[0].length && t.unshift(h(e.substr(r[0].length), e.trailing, e.lineNumber + 2)), [n]
                    },
                    setextHeader: function(e, t) {
                        var r = e.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);
                        if (!r) return void 0;
                        var n = "=" === r[2] ? 1 : 2,
                            i = ["header", {
                                    level: n
                                },
                                r[1]
                            ];
                        return e.length > r[0].length && t.unshift(h(e.substr(r[0].length), e.trailing, e.lineNumber + 2)), [i]
                    },
                    code: function(e, t) {
                        var r = [],
                            n = /^(?: {0,3}\t| {4})(.*)\n?/;
                        if (!e.match(n)) return void 0;
                        e: for (;;) {
                            var i = this.loop_re_over_block(n, e.valueOf(), function(e) {
                                r.push(e[1])
                            });
                            if (i.length) {
                                t.unshift(h(i, e.trailing));
                                break e
                            }
                            if (!t.length) break e;
                            if (!t[0].match(n)) break e;
                            r.push(e.trailing.replace(/[^\n]/g, "").substring(2)), e = t.shift()
                        }
                        return [["code_block", r.join("\n")]]
                    },
                    horizRule: function(e, t) {
                        var r = e.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);
                        if (!r) return void 0;
                        var n = [
                            ["hr"]
                        ];
                        if (r[1]) {
                            var i = h(r[1], "", e.lineNumber);
                            n.unshift.apply(n, this.toTree(i, []))
                        }
                        return r[3] && t.unshift(h(r[3], e.trailing, e.lineNumber + 1)), n
                    },
                    U: function() {
                        function e(e) {
                            return RegExp("(?:^(" + c + "{0," + e + "} {0,3})(" + a + ")\\s+)|(^" + c + "{0," + (e - 1) + "}[ ]{0,4})")
                        }

                        function t(e) {
                            return e.replace(/ {0,3}\t/g, "    ")
                        }

                        function r(e, t, r, n) {
                            if (t) return void e.push(["para"].concat(r));
                            var i = e[e.length - 1] instanceof Array && "para" === e[e.length - 1][0] ? e[e.length - 1] : e;
                            n && e.length > 1 && r.unshift(n);
                            for (var a = 0; r.length > a; a++) {
                                var s = r[a],
                                    o = "string" == typeof s;
                                o && i.length > 1 && "string" == typeof i[i.length - 1] ? i[i.length - 1] += s : i.push(s)
                            }
                        }

                        function n(e, t) {
                            for (var r = RegExp("^(" + c + "{" + e + "}.*?\\n?)*$"), n = RegExp("^" + c + "{" + e + "}", "gm"), i = []; t.length > 0 && r.exec(t[0]);) {
                                var a = t.shift(),
                                    s = a.replace(n, "");
                                i.push(h(s, a.trailing, a.lineNumber))
                            }
                            return i
                        }

                        function i(e, t, r) {
                            var n = e.list,
                                i = n[n.length - 1];
                            if (!(i[1] instanceof Array && "para" === i[1][0]))
                                if (t + 1 === r.length) i.push(["para"].concat(i.splice(1, i.length - 1)));
                                else {
                                    var a = i.pop();
                                    i.push(["para"].concat(i.splice(1, i.length - 1)), a)
                                }
                        }
                        var a = "[*+-]|\\d+\\.",
                            s = /[*+-]/,
                            o = RegExp("^( {0,3})(" + a + ")[ 	]+"),
                            c = "(?: {0,3}\\t| {4})";
                        return function(a, c) {
                            function l(e) {
                                var t = s.exec(e[2]) ? ["bulletlist"] : ["numberlist"];
                                return h.push({
                                    list: t,
                                    indent: e[1]
                                }), t
                            }
                            var u = a.match(o);
                            if (!u) return void 0;
                            for (var d, p, h = [], f = l(u), g = !1, m = [h[0].list];;) {
                                for (var v = a.split(/(?=\n)/), _ = "", y = "", x = 0; v.length > x; x++) {
                                    y = "";
                                    var w = v[x].replace(/^\n/, function(e) {
                                        return y = e, ""
                                    }),
                                        k = e(h.length);
                                    if (u = w.match(k), void 0 !== u[1]) {
                                        _.length && (r(d, g, this.processInline(_), y), g = !1, _ = ""), u[1] = t(u[1]);
                                        var N = Math.floor(u[1].length / 4) + 1;
                                        if (N > h.length) f = l(u), d.push(f), d = f[1] = ["listitem"];
                                        else {
                                            var M = !1;
                                            for (p = 0; h.length > p; p++)
                                                if (h[p].indent === u[1]) {
                                                    f = h[p].list, h.splice(p + 1, h.length - (p + 1)), M = !0;
                                                    break
                                                }
                                            M || (N++, h.length >= N ? (h.splice(N, h.length - N), f = h[N - 1].list) : (f = l(u), d.push(f))), d = ["listitem"], f.push(d)
                                        }
                                        y = ""
                                    }
                                    w.length > u[0].length && (_ += y + w.substr(u[0].length))
                                }
                                _.length && (r(d, g, this.processInline(_), y), g = !1, _ = "");
                                var C = n(h.length, c);
                                C.length > 0 && (b(h, i, this), d.push.apply(d, this.toTree(C, [])));
                                var j = c[0] && c[0].valueOf() || "";
                                if (!j.match(o) && !j.match(/^ /)) break;
                                a = c.shift();
                                var $ = this.dialect.block.horizRule(a, c);
                                if ($) {
                                    m.push.apply(m, $);
                                    break
                                }
                                b(h, i, this), g = !0
                            }
                            return m
                        }
                    }(),
                    blockquote: function(e, t) {
                        if (!e.match(/^>/m)) return void 0;
                        var r = [];
                        if (">" !== e[0]) {
                            for (var n = e.split(/\n/), i = [], a = e.lineNumber; n.length && ">" !== n[0][0];) i.push(n.shift()), a++;
                            var s = h(i.join("\n"), "\n", e.lineNumber);
                            r.push.apply(r, this.processBlock(s, [])), e = h(n.join("\n"), e.trailing, a)
                        }
                        for (; t.length && ">" === t[0][0];) {
                            var o = t.shift();
                            e = h(e + e.trailing + o, o.trailing, e.lineNumber)
                        }
                        var c = e.replace(/^> ?/gm, ""),
                            l = this.toTree(c, ["blockquote"]),
                            u = f(l);
                        return u && u.references && (delete u.references, m(u) && l.splice(1, 1)), r.push(l), r
                    },
                    referenceDefn: function(e, t) {
                        var r = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
                        if (!e.match(r)) return void 0;
                        f(this.tree) || this.tree.splice(1, 0, {});
                        var n = f(this.tree);
                        void 0 === n.references && (n.references = {});
                        var i = this.loop_re_over_block(r, e, function(e) {
                            e[2] && "<" === e[2][0] && ">" === e[2][e[2].length - 1] && (e[2] = e[2].substring(1, e[2].length - 1));
                            var t = n.references[e[1].toLowerCase()] = {
                                href: e[2]
                            };
                            void 0 !== e[4] ? t.title = e[4] : void 0 !== e[5] && (t.title = e[5])
                        });
                        return i.length && t.unshift(h(i, e.trailing)), []
                    },
                    para: function(e) {
                        return [["para"].concat(this.processInline(e))]
                    }
                },
                inline: {
                    __oneElement__: function(e, t, r) {
                        var n, i;
                        t = t || this.dialect.inline.__patterns__;
                        var a = RegExp("([\\s\\S]*?)(" + (t.source || t) + ")");
                        if (n = a.exec(e), !n) return [e.length, e];
                        if (n[1]) return [n[1].length, n[1]];
                        var i;
                        return n[2] in this.dialect.inline && (i = this.dialect.inline[n[2]].call(this, e.substr(n.index), n, r || [])), i = i || [n[2].length, n[2]]
                    },
                    __call__: function(e, t) {
                        function r(e) {
                            "string" == typeof e && "string" == typeof i[i.length - 1] ? i[i.length - 1] += e : i.push(e)
                        }
                        for (var n, i = []; e.length > 0;) n = this.dialect.inline.__oneElement__.call(this, e, t, i), e = e.substr(n.shift()), b(n, r);
                        return i
                    },
                    "]": function() {},
                    "}": function() {},
                    __escape__: /^\\[\\`\*_{}\[\]()#\+.!\-]/,
                    "\\": function(e) {
                        return this.dialect.inline.__escape__.exec(e) ? [2, e.charAt(1)] : [1, "\\"]
                    },
                    "![": function(e) {
                        var t = e.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);
                        if (t) {
                            t[2] && "<" === t[2][0] && ">" === t[2][t[2].length - 1] && (t[2] = t[2].substring(1, t[2].length - 1)), t[2] = this.dialect.inline.__call__.call(this, t[2], /\\/)[0];
                            var r = {
                                alt: t[1],
                                href: t[2] || ""
                            };
                            return void 0 !== t[4] && (r.title = t[4]), [t[0].length, ["img", r]]
                        }
                        return t = e.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/), t ? [t[0].length, ["img_ref", {
                            alt: t[1],
                            ref: t[2].toLowerCase(),
                            original: t[0]
                        }]] : [2, "!["]
                    },
                    "[": function x(e) {
                        var t = e + "",
                            r = v.call(this, e.substr(1), "]");
                        if (!r) return [1, "["];
                        var x, n, i = 1 + r[0],
                            a = r[1];
                        e = e.substr(i);
                        var s = e.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);
                        if (s) {
                            var o = s[1];
                            if (i += s[0].length, o && "<" === o[0] && ">" === o[o.length - 1] && (o = o.substring(1, o.length - 1)), !s[3])
                                for (var c = 1, l = 0; o.length > l; l++) switch (o[l]) {
                                    case "(":
                                        c++;
                                        break;
                                    case ")":
                                        0 === --c && (i -= o.length - l, o = o.substring(0, l))
                                }
                            return o = this.dialect.inline.__call__.call(this, o, /\\/)[0], n = {
                                href: o || ""
                            }, void 0 !== s[3] && (n.title = s[3]), x = ["link", n].concat(a), [i, x]
                        }
                        return s = e.match(/^\s*\[(.*?)\]/), s ? (i += s[0].length, n = {
                            ref: (s[1] || a + "").toLowerCase(),
                            original: t.substr(0, i)
                        }, x = ["link_ref", n].concat(a), [i, x]) : 1 === a.length && "string" == typeof a[0] ? (n = {
                            ref: a[0].toLowerCase(),
                            original: t.substr(0, i)
                        }, x = ["link_ref", n, a[0]], [i, x]) : [1, "["]
                    },
                    "<": function(e) {
                        var t;
                        return null !== (t = e.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/)) ? t[3] ? [t[0].length, ["link", {
                                href: "mailto:" + t[3]
                            },
                            t[3]
                        ]] : "mailto" === t[2] ? [t[0].length, ["link", {
                                href: t[1]
                            },
                            t[1].substr(7)
                        ]] : [t[0].length, ["link", {
                                href: t[1]
                            },
                            t[1]
                        ]] : [1, "<"]
                    },
                    "`": function(e) {
                        var t = e.match(/(`+)(([\s\S]*?)\1)/);
                        return t && t[2] ? [t[1].length + t[2].length, ["inlinecode", t[3]]] : [1, "`"]
                    },
                    "  \n": function() {
                        return [3, ["linebreak"]]
                    }
                }
            };
        _.inline["**"] = c("strong", "**"), _.inline.__ = c("strong", "__"), _.inline["*"] = c("em", "*"), _.inline._ = c("em", "_"), p.dialects.Gruber = _, p.buildBlockOrder(p.dialects.Gruber.block), p.buildInlinePatterns(p.dialects.Gruber.inline);
        var y = g.subclassDialect(_),
            f = u.extract_attr,
            b = u.forEach;
        y.processMetaHash = function(e) {
            for (var t = l(e), r = {}, n = 0; t.length > n; ++n)
                if (/^#/.test(t[n])) r.id = t[n].substring(1);
                else if (/^\./.test(t[n])) r["class"] = r["class"] ? r["class"] + t[n].replace(/./, " ") : t[n].substring(1);
            else if (/\=/.test(t[n])) {
                var i = t[n].split(/\=/);
                r[i[0]] = i[1]
            }
            return r
        }, y.block.document_meta = function(e) {
            if (e.lineNumber > 1) return void 0;
            if (!e.match(/^(?:\w+:.*\n)*\w+:.*$/)) return void 0;
            f(this.tree) || this.tree.splice(1, 0, {});
            var t = e.split(/\n/);
            for (var r in t) {
                var n = t[r].match(/(\w+):\s*(.*)$/),
                    i = n[1].toLowerCase(),
                    a = n[2];
                this.tree[1][i] = a
            }
            return []
        }, y.block.block_meta = function(e) {
            var t = e.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);
            if (!t) return void 0;
            var r, n = this.dialect.processMetaHash(t[2]);
            if ("" === t[1]) {
                var i = this.tree[this.tree.length - 1];
                if (r = f(i), "string" == typeof i) return void 0;
                r || (r = {}, i.splice(1, 0, r));
                for (var a in n) r[a] = n[a];
                return []
            }
            var s = e.replace(/\n.*$/, ""),
                o = this.processBlock(s, []);
            r = f(o[0]), r || (r = {}, o[0].splice(1, 0, r));
            for (var a in n) r[a] = n[a];
            return o
        }, y.block.V = function(e, t) {
            var r, n, i = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
                a = ["dl"];
            if (!(n = e.match(i))) return void 0;
            for (var s = [e]; t.length && i.exec(t[0]);) s.push(t.shift());
            for (var o = 0; s.length > o; ++o) {
                var n = s[o].match(i),
                    c = n[1].replace(/\n$/, "").split(/\n/),
                    l = n[2].split(/\n:\s+/);
                for (r = 0; c.length > r; ++r) a.push(["dt", c[r]]);
                for (r = 0; l.length > r; ++r) a.push(["dd"].concat(this.processInline(l[r].replace(/(\n)\s+/, "$1"))))
            }
            return [a]
        }, y.block.table = function w(e) {
            var t, r, n = function(e, t) {
                    t = t || "\\s", t.match(/^[\\|\[\]{}?*.+^$]$/) && (t = "\\" + t);
                    for (var r, n = [], i = RegExp("^((?:\\\\.|[^\\\\" + t + "])*)" + t + "(.*)"); r = e.match(i);) n.push(r[1]), e = r[2];
                    return n.push(e), n
                }, i = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
                a = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/;
            if (r = e.match(i)) r[3] = r[3].replace(/^\s*\|/gm, "");
            else if (!(r = e.match(a))) return void 0;
            var w = ["table", ["thead", ["tr"]],
                ["tbody"]
            ];
            r[2] = r[2].replace(/\|\s*$/, "").split("|");
            var s = [];
            for (b(r[2], function(e) {
                s.push(e.match(/^\s*-+:\s*$/) ? {
                    align: "right"
                } : e.match(/^\s*:-+\s*$/) ? {
                    align: "left"
                } : e.match(/^\s*:-+:\s*$/) ? {
                    align: "center"
                } : {})
            }), r[1] = n(r[1].replace(/\|\s*$/, ""), "|"), t = 0; r[1].length > t; t++) w[1][1].push(["th", s[t] || {}].concat(this.processInline(r[1][t].trim())));
            return b(r[3].replace(/\|\s*$/gm, "").split("\n"), function(e) {
                var r = ["tr"];
                for (e = n(e, "|"), t = 0; e.length > t; t++) r.push(["td", s[t] || {}].concat(this.processInline(e[t].trim())));
                w[2].push(r)
            }, this), [w]
        }, y.inline["{:"] = function(e, t, r) {
            if (!r.length) return [2, "{:"];
            var n = r[r.length - 1];
            if ("string" == typeof n) return [2, "{:"];
            var i = e.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);
            if (!i) return [2, "{:"];
            var a = this.dialect.processMetaHash(i[1]),
                s = f(n);
            s || (s = {}, n.splice(1, 0, s));
            for (var o in a) s[o] = a[o];
            return [i[0].length, ""]
        }, p.dialects.Maruku = y, p.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/, p.buildBlockOrder(p.dialects.Maruku.block), p.buildInlinePatterns(p.dialects.Maruku.inline), e.Markdown = p, e.parse = p.parse, e.toHTML = p.toHTML, e.toHTMLTree = p.toHTMLTree, e.renderJsonML = p.renderJsonML
    }(function() {
        return window.markdown = {}, window.markdown
    }());
    /*

  The following is highlight.min.js 8.8.0 from https://highlightjs.org/

Copyright (c) 2006, Ivan Sagalaev
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of highlight.js nor the names of its contributors
      may be used to endorse or promote products derived from this software
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
    var c = "<style>.hljs{display:block;overflow-x:auto;padding:0.5em;background:#fff;color:black;-webkit-text-size-adjust:none}.hljs-comment{color:#006a00}.hljs-keyword,.hljs-literal,.nginx .hljs-title{color:#aa0d91}.method,.hljs-list .hljs-title,.hljs-tag .hljs-title,.setting .hljs-value,.hljs-winutils,.tex .hljs-command,.http .hljs-title,.hljs-request,.hljs-status,.hljs-name{color:#008}.hljs-envvar,.tex .hljs-special{color:#660}.hljs-string{color:#c41a16}.hljs-tag .hljs-value,.hljs-cdata,.hljs-filter .hljs-argument,.hljs-attr_selector,.apache .hljs-cbracket,.hljs-date,.hljs-regexp{color:#080}.hljs-sub .hljs-identifier,.hljs-pi,.hljs-tag,.hljs-tag .hljs-keyword,.hljs-decorator,.ini .hljs-title,.hljs-shebang,.hljs-prompt,.hljs-hexcolor,.hljs-rule .hljs-value,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-number,.css .hljs-function,.hljs-function .hljs-title,.coffeescript .hljs-attribute{color:#1c00cf}.hljs-class .hljs-title,.smalltalk .hljs-class,.hljs-type,.hljs-typename,.hljs-tag .hljs-attribute,.hljs-doctype,.hljs-class .hljs-id,.hljs-built_in,.setting,.hljs-params,.clojure .hljs-attribute{color:#5c2699}.hljs-variable{color:#3f6e74}.css .hljs-tag,.hljs-rule .hljs-property,.hljs-pseudo,.hljs-subst{color:#000}.css .hljs-class,.css .hljs-id{color:#9b703f}.hljs-value .hljs-important{color:#ff7700;font-weight:bold}.hljs-rule .hljs-keyword{color:#c5af75}.hljs-annotation,.apache .hljs-sqbracket,.nginx .hljs-built_in{color:#9b859d}.hljs-preprocessor,.hljs-preprocessor *,.hljs-pragma{color:#643820}.tex .hljs-formula{background-color:#eee;font-style:italic}.diff .hljs-header,.hljs-chunk{color:#808080;font-weight:bold}.diff .hljs-change{background-color:#bccff9}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-comment .hljs-doctag{font-weight:bold}.method .hljs-id{color:#000}</style>";
    ! function(e) {
        "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("hljs", [], function() {
            return window.hljs
        }))
    }(function(e) {
        function t(e) {
            return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
        }

        function r(e) {
            return e.nodeName.toLowerCase()
        }

        function n(e, t) {
            var r = e && e.exec(t);
            return r && 0 == r.index
        }

        function i(e) {
            return /^(no-?highlight|plain|text)$/i.test(e)
        }

        function a(e) {
            var t, r, n, a = e.className + " ";
            if (a += e.parentNode ? e.parentNode.className : "", r = /\blang(?:uage)?-([\w-]+)\b/i.exec(a)) return y(r[1]) ? r[1] : "no-highlight";
            for (a = a.split(/\s+/), t = 0, n = a.length; n > t; t++)
                if (y(a[t]) || i(a[t])) return a[t]
        }

        function s(e, t) {
            var r, n = {};
            for (r in e) n[r] = e[r];
            if (t)
                for (r in t) n[r] = t[r];
            return n
        }

        function o(e) {
            var t = [];
            return function n(e, i) {
                for (var a = e.firstChild; a; a = a.nextSibling) 3 == a.nodeType ? i += a.nodeValue.length : 1 == a.nodeType && (t.push({
                    event: "start",
                    offset: i,
                    node: a
                }), i = n(a, i), r(a).match(/br|hr|img|input/) || t.push({
                    event: "stop",
                    offset: i,
                    node: a
                }));
                return i
            }(e, 0), t
        }

        function c(e, n, i) {
            function a() {
                return e.length && n.length ? e[0].offset != n[0].offset ? n[0].offset > e[0].offset ? e : n : "start" == n[0].event ? e : n : e.length ? e : n
            }

            function s(e) {
                function n(e) {
                    return " " + e.nodeName + '="' + t(e.value) + '"'
                }
                u += "<" + r(e) + Array.prototype.map.call(e.attributes, n).join("") + ">"
            }

            function o(e) {
                u += "</" + r(e) + ">"
            }

            function c(e) {
                ("start" == e.event ? s : o)(e.node)
            }
            for (var l = 0, u = "", d = []; e.length || n.length;) {
                var p = a();
                if (u += t(i.substr(l, p[0].offset - l)), l = p[0].offset, p == e) {
                    d.reverse().forEach(o);
                    do c(p.splice(0, 1)[0]), p = a(); while (p == e && p.length && p[0].offset == l);
                    d.reverse().forEach(s)
                } else "start" == p[0].event ? d.push(p[0].node) : d.pop(), c(p.splice(0, 1)[0])
            }
            return u + t(i.substr(l))
        }

        function l(e) {
            function t(e) {
                return e && e.source || e
            }

            function r(r, n) {
                return RegExp(t(r), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
            }

            function n(i, a) {
                if (!i.compiled) {
                    if (i.compiled = !0, i.k = i.k || i.bK) {
                        var o = {}, c = function(t, r) {
                                e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
                                    var r = e.split("|");
                                    o[r[0]] = [t, r[1] ? +r[1] : 1]
                                })
                            };
                        "string" == typeof i.k ? c("keyword", i.k) : Object.keys(i.k).forEach(function(e) {
                            c(e, i.k[e])
                        }), i.k = o
                    }
                    i.lR = r(i.l || /\b\w+\b/, !0), a && (i.bK && (i.b = "\\b(" + i.bK.split(" ").join("|") + ")\\b"), i.b || (i.b = /\B|\b/), i.bR = r(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = r(i.e)), i.tE = t(i.e) || "", i.eW && a.tE && (i.tE += (i.e ? "|" : "") + a.tE)), i.i && (i.iR = r(i.i)), void 0 === i.r && (i.r = 1), i.c || (i.c = []);
                    var l = [];
                    i.c.forEach(function(e) {
                        e.v ? e.v.forEach(function(t) {
                            l.push(s(e, t))
                        }) : l.push("self" == e ? i : e)
                    }), i.c = l, i.c.forEach(function(e) {
                        n(e, i)
                    }), i.starts && n(i.starts, a);
                    var u = i.c.map(function(e) {
                        return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                    }).concat([i.tE, i.i]).map(t).filter(Boolean);
                    i.t = u.length ? r(u.join("|"), !0) : {
                        exec: function() {
                            return null
                        }
                    }
                }
            }
            n(e)
        }

        function u(e, r, i, a) {
            function s(e, t) {
                for (var r = 0; t.c.length > r; r++)
                    if (n(t.c[r].bR, e)) return t.c[r]
            }

            function o(e, t) {
                if (n(e.eR, t)) {
                    for (; e.endsParent && e.parent;) e = e.parent;
                    return e
                }
                return e.eW ? o(e.parent, t) : void 0
            }

            function c(e, t) {
                return !i && n(t.iR, e)
            }

            function p(e, t) {
                var r = _.cI ? t[0].toLowerCase() : t[0];
                return e.k.hasOwnProperty(r) && e.k[r]
            }

            function h(e, t, r, n) {
                var i = n ? "" : x.classPrefix,
                    a = '<span class="' + i,
                    s = r ? "" : "</span>";
                return a += e + '">', a + t + s
            }

            function f() {
                if (!N.k) return t(j);
                var e = "",
                    r = 0;
                N.lR.lastIndex = 0;
                for (var n = N.lR.exec(j); n;) {
                    e += t(j.substr(r, n.index - r));
                    var i = p(N, n);
                    i ? ($ += i[1], e += h(i[0], t(n[0]))) : e += t(n[0]), r = N.lR.lastIndex, n = N.lR.exec(j)
                }
                return e + t(j.substr(r))
            }

            function g() {
                var e = "string" == typeof N.sL;
                if (e && !w[N.sL]) return t(j);
                var r = e ? u(N.sL, j, !0, M[N.sL]) : d(j, N.sL.length ? N.sL : void 0);
                return N.r > 0 && ($ += r.r), e && (M[N.sL] = r.top), h(r.language, r.value, !1, !0)
            }

            function b() {
                return void 0 !== N.sL ? g() : f()
            }

            function m(e, r) {
                var n = e.cN ? h(e.cN, "", !0) : "";
                e.rB ? (C += n, j = "") : e.eB ? (C += t(r) + n, j = "") : (C += n, j = r), N = Object.create(e, {
                    parent: {
                        value: N
                    }
                })
            }

            function v(e, r) {
                if (j += e, void 0 === r) return C += b(), 0;
                var n = s(r, N);
                if (n) return C += b(), m(n, r), n.rB ? 0 : r.length;
                var i = o(N, r);
                if (i) {
                    var a = N;
                    a.rE || a.eE || (j += r), C += b();
                    do N.cN && (C += "</span>"), $ += N.r, N = N.parent; while (N != i.parent);
                    return a.eE && (C += t(r)), j = "", i.starts && m(i.starts, ""), a.rE ? 0 : r.length
                }
                if (c(r, N)) throw Error('Illegal lexeme "' + r + '" for mode "' + (N.cN || "<unnamed>") + '"');
                return j += r, r.length || 1
            }
            var _ = y(e);
            if (!_) throw Error('Unknown language: "' + e + '"');
            l(_);
            var k, N = a || _,
                M = {}, C = "";
            for (k = N; k != _; k = k.parent) k.cN && (C = h(k.cN, "", !0) + C);
            var j = "",
                $ = 0;
            try {
                for (var B, E, A = 0; N.t.lastIndex = A, B = N.t.exec(r), B;) E = v(r.substr(A, B.index - A), B[0]), A = B.index + E;
                for (v(r.substr(A)), k = N; k.parent; k = k.parent) k.cN && (C += "</span>");
                return {
                    r: $,
                    value: C,
                    language: e,
                    top: N
                }
            } catch (S) {
                if (-1 != S.message.indexOf("Illegal")) return {
                    r: 0,
                    value: t(r)
                };
                throw S
            }
        }

        function d(e, r) {
            r = r || x.languages || Object.keys(w);
            var n = {
                r: 0,
                value: t(e)
            }, i = n;
            return r.forEach(function(t) {
                if (y(t)) {
                    var r = u(t, e, !1);
                    r.language = t, r.r > i.r && (i = r), r.r > n.r && (i = n, n = r)
                }
            }), i.language && (n.second_best = i), n
        }

        function p(e) {
            return x.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
                return t.replace(/\t/g, x.tabReplace)
            })), x.useBR && (e = e.replace(/\n/g, "<br>")), e
        }

        function h(e, t, r) {
            var n = t ? k[t] : r,
                i = [e.trim()];
            return e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(n) && i.push(n), i.join(" ").trim()
        }

        function f(e) {
            var t = a(e);
            if (!i(t)) {
                var r;
                x.useBR ? (r = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), r.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : r = e;
                var n = r.textContent,
                    s = t ? u(t, n, !0) : d(n),
                    l = o(r);
                if (l.length) {
                    var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                    f.innerHTML = s.value, s.value = c(l, o(f), n)
                }
                s.value = p(s.value), e.innerHTML = s.value, e.className = h(e.className, t, s.language), e.result = {
                    language: s.language,
                    re: s.r
                }, s.second_best && (e.second_best = {
                    language: s.second_best.language,
                    re: s.second_best.r
                })
            }
        }

        function g(e) {
            x = s(x, e)
        }

        function b() {
            if (!b.called) {
                b.called = !0;
                var e = document.querySelectorAll("pre code");
                Array.prototype.forEach.call(e, f)
            }
        }

        function m() {
            addEventListener("DOMContentLoaded", b, !1), addEventListener("load", b, !1)
        }

        function v(t, r) {
            var n = w[t] = r(e);
            n.aliases && n.aliases.forEach(function(e) {
                k[e] = t
            })
        }

        function _() {
            return Object.keys(w)
        }

        function y(e) {
            return e = e.toLowerCase(), w[e] || w[k[e]]
        }
        var x = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        }, w = {}, k = {};
        return e.highlight = u, e.highlightAuto = d, e.fixMarkup = p, e.highlightBlock = f, e.configure = g, e.initHighlighting = b, e.initHighlightingOnLoad = m, e.W = v, e.X = _, e.getLanguage = y, e.inherit = s, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
            b: "\\\\[\\s\\S]",
            r: 0
        }, e.ASM = {
            cN: "string",
            b: "'",
            e: "'",
            i: "\\n",
            c: [e.BE]
        }, e.QSM = {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n",
            c: [e.BE]
        }, e.PWM = {
            b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
        }, e.C = function(t, r, n) {
            var i = e.inherit({
                cN: "comment",
                b: t,
                e: r,
                c: []
            }, n || {});
            return i.c.push(e.PWM), i.c.push({
                cN: "doctag",
                b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
                r: 0
            }), i
        }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
            cN: "number",
            b: e.NR,
            r: 0
        }, e.CNM = {
            cN: "number",
            b: e.CNR,
            r: 0
        }, e.BNM = {
            cN: "number",
            b: e.BNR,
            r: 0
        }, e.CSSNM = {
            cN: "number",
            b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            r: 0
        }, e.RM = {
            cN: "regexp",
            b: /\//,
            e: /\/[gimuy]*/,
            i: /\n/,
            c: [e.BE, {
                b: /\[/,
                e: /\]/,
                r: 0,
                c: [e.BE]
            }]
        }, e.TM = {
            cN: "title",
            b: e.IR,
            r: 0
        }, e.UTM = {
            cN: "title",
            b: e.UIR,
            r: 0
        }, e.W("apache", function(e) {
            var t = {
                cN: "number",
                b: "[\\$%]\\d+"
            };
            return {
                aliases: ["apacheconf"],
                cI: !0,
                c: [e.HCM, {
                    cN: "tag",
                    b: "</?",
                    e: ">"
                }, {
                    cN: "keyword",
                    b: /\w+/,
                    r: 0,
                    k: {
                        common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
                    },
                    starts: {
                        e: /$/,
                        r: 0,
                        k: {
                            literal: "on off all"
                        },
                        c: [{
                                cN: "sqbracket",
                                b: "\\s\\[",
                                e: "\\]$"
                            }, {
                                cN: "cbracket",
                                b: "[\\$%]\\{",
                                e: "\\}",
                                c: ["self", t]
                            },
                            t, e.QSM
                        ]
                    }
                }],
                i: /\S/
            }
        }), e.W("bash", function(e) {
            var t = {
                cN: "variable",
                v: [{
                    b: /\$[\w\d#@][\w\d_]*/
                }, {
                    b: /\$\{(.*?)}/
                }]
            }, r = {
                    cN: "string",
                    b: /"/,
                    e: /"/,
                    c: [e.BE, t, {
                        cN: "variable",
                        b: /\$\(/,
                        e: /\)/,
                        c: [e.BE]
                    }]
                }, n = {
                    cN: "string",
                    b: /'/,
                    e: /'/
                };
            return {
                aliases: ["sh", "zsh"],
                l: /-?[a-z\.]+/,
                k: {
                    keyword: "if then else elif fi for while in do done case esac function",
                    literal: "true false",
                    built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
                    operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
                },
                c: [{
                        cN: "shebang",
                        b: /^#![^\n]+sh\s*$/,
                        r: 10
                    }, {
                        cN: "function",
                        b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                        rB: !0,
                        c: [e.inherit(e.TM, {
                            b: /\w[\w\d_]*/
                        })],
                        r: 0
                    },
                    e.HCM, e.NM, r, n, t
                ]
            }
        }), e.W("coffeescript", function(e) {
            var t = {
                keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
                literal: "true false null undefined yes no on off",
                built_in: "npm require console print module global window document"
            }, r = "[A-Za-z$_][0-9A-Za-z$_]*",
                n = {
                    cN: "subst",
                    b: /#\{/,
                    e: /}/,
                    k: t
                }, i = [e.BNM, e.inherit(e.CNM, {
                    starts: {
                        e: "(\\s*/)?",
                        r: 0
                    }
                }), {
                    cN: "string",
                    v: [{
                        b: /'''/,
                        e: /'''/,
                        c: [e.BE]
                    }, {
                        b: /'/,
                        e: /'/,
                        c: [e.BE]
                    }, {
                        b: /"""/,
                        e: /"""/,
                        c: [e.BE, n]
                    }, {
                        b: /"/,
                        e: /"/,
                        c: [e.BE, n]
                    }]
                }, {
                    cN: "regexp",
                    v: [{
                        b: "///",
                        e: "///",
                        c: [n, e.HCM]
                    }, {
                        b: "//[gim]*",
                        r: 0
                    }, {
                        b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
                    }]
                }, {
                    cN: "property",
                    b: "@" + r
                }, {
                    b: "`",
                    e: "`",
                    eB: !0,
                    eE: !0,
                    sL: "javascript"
                }];
            n.c = i;
            var a = e.inherit(e.TM, {
                b: r
            }),
                s = "(\\(.*\\))?\\s*\\B[-=]>",
                o = {
                    cN: "params",
                    b: "\\([^\\(]",
                    rB: !0,
                    c: [{
                        b: /\(/,
                        e: /\)/,
                        k: t,
                        c: ["self"].concat(i)
                    }]
                };
            return {
                aliases: ["coffee", "cson", "iced"],
                k: t,
                i: /\/\*/,
                c: i.concat([e.C("###", "###"), e.HCM, {
                    cN: "function",
                    b: "^\\s*" + r + "\\s*=\\s*" + s,
                    e: "[-=]>",
                    rB: !0,
                    c: [a, o]
                }, {
                    b: /[:\(,=]\s*/,
                    r: 0,
                    c: [{
                        cN: "function",
                        b: s,
                        e: "[-=]>",
                        rB: !0,
                        c: [o]
                    }]
                }, {
                    cN: "class",
                    bK: "class",
                    e: "$",
                    i: /[:="\[\]]/,
                    c: [{
                            bK: "extends",
                            eW: !0,
                            i: /[:="\[\]]/,
                            c: [a]
                        },
                        a
                    ]
                }, {
                    cN: "attribute",
                    b: r + ":",
                    e: ":",
                    rB: !0,
                    rE: !0,
                    r: 0
                }])
            }
        }), e.W("cpp", function(e) {
            var t = {
                cN: "keyword",
                b: "\\b[a-z\\d_]*_t\\b"
            }, r = {
                    cN: "string",
                    v: [e.inherit(e.QSM, {
                        b: '((u8?|U)|L)?"'
                    }), {
                        b: '(u8?|U)?R"',
                        e: '"',
                        c: [e.BE]
                    }, {
                        b: "'\\\\?.",
                        e: "'",
                        i: "."
                    }]
                }, n = {
                    cN: "number",
                    v: [{
                        b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
                    }, {
                        b: e.CNR
                    }]
                }, i = {
                    cN: "preprocessor",
                    b: "#",
                    e: "$",
                    k: "if else elif endif define undef warning error line pragma ifdef ifndef",
                    c: [{
                            b: /\\\n/,
                            r: 0
                        }, {
                            bK: "include",
                            e: "$",
                            c: [r, {
                                cN: "string",
                                b: "<",
                                e: ">",
                                i: "\\n"
                            }]
                        },
                        r, n, e.CLCM, e.CBCM
                    ]
                }, a = e.IR + "\\s*\\(",
                s = {
                    keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
                    built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf",
                    literal: "true false nullptr NULL"
                };
            return {
                aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
                k: s,
                i: "</",
                c: [t, e.CLCM, e.CBCM, n, r, i, {
                    b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                    e: ">",
                    k: s,
                    c: ["self", t]
                }, {
                    b: e.IR + "::",
                    k: s
                }, {
                    bK: "new throw return else",
                    r: 0
                }, {
                    cN: "function",
                    b: "(" + e.IR + "[\\*&\\s]+)+" + a,
                    rB: !0,
                    e: /[{;=]/,
                    eE: !0,
                    k: s,
                    i: /[^\w\s\*&]/,
                    c: [{
                            b: a,
                            rB: !0,
                            c: [e.TM],
                            r: 0
                        }, {
                            cN: "params",
                            b: /\(/,
                            e: /\)/,
                            k: s,
                            r: 0,
                            c: [e.CLCM, e.CBCM, r, n]
                        },
                        e.CLCM, e.CBCM, i
                    ]
                }]
            }
        }), e.W("cs", function(e) {
            var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
                r = e.IR + "(<" + e.IR + ">)?";
            return {
                aliases: ["csharp"],
                k: t,
                i: /::/,
                c: [e.C("///", "$", {
                        rB: !0,
                        c: [{
                            cN: "xmlDocTag",
                            v: [{
                                b: "///",
                                r: 0
                            }, {
                                b: "<!--|-->"
                            }, {
                                b: "</?",
                                e: ">"
                            }]
                        }]
                    }), e.CLCM, e.CBCM, {
                        cN: "preprocessor",
                        b: "#",
                        e: "$",
                        k: "if else elif endif define undef warning error line region endregion pragma checksum"
                    }, {
                        cN: "string",
                        b: '@"',
                        e: '"',
                        c: [{
                            b: '""'
                        }]
                    },
                    e.ASM, e.QSM, e.CNM, {
                        bK: "class interface",
                        e: /[{;=]/,
                        i: /[^\s:]/,
                        c: [e.TM, e.CLCM, e.CBCM]
                    }, {
                        bK: "namespace",
                        e: /[{;=]/,
                        i: /[^\s:]/,
                        c: [{
                                cN: "title",
                                b: "[a-zA-Z](\\.?\\w)*",
                                r: 0
                            },
                            e.CLCM, e.CBCM
                        ]
                    }, {
                        bK: "new return throw await",
                        r: 0
                    }, {
                        cN: "function",
                        b: "(" + r + "\\s+)+" + e.IR + "\\s*\\(",
                        rB: !0,
                        e: /[{;=]/,
                        eE: !0,
                        k: t,
                        c: [{
                                b: e.IR + "\\s*\\(",
                                rB: !0,
                                c: [e.TM],
                                r: 0
                            }, {
                                cN: "params",
                                b: /\(/,
                                e: /\)/,
                                eB: !0,
                                eE: !0,
                                k: t,
                                r: 0,
                                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                            },
                            e.CLCM, e.CBCM
                        ]
                    }
                ]
            }
        }), e.W("css", function(e) {
            var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
                r = {
                    cN: "function",
                    b: t + "\\(",
                    rB: !0,
                    eE: !0,
                    e: "\\("
                }, n = {
                    cN: "rule",
                    b: /[A-Z\_\.\-]+\s*:/,
                    rB: !0,
                    e: ";",
                    eW: !0,
                    c: [{
                        cN: "attribute",
                        b: /\S/,
                        e: ":",
                        eE: !0,
                        starts: {
                            cN: "value",
                            eW: !0,
                            eE: !0,
                            c: [r, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                                cN: "hexcolor",
                                b: "#[0-9A-Fa-f]+"
                            }, {
                                cN: "important",
                                b: "!important"
                            }]
                        }
                    }]
                };
            return {
                cI: !0,
                i: /[=\/|'\$]/,
                c: [e.CBCM, n, {
                    cN: "id",
                    b: /\#[A-Za-z0-9_-]+/
                }, {
                    cN: "class",
                    b: /\.[A-Za-z0-9_-]+/
                }, {
                    cN: "attr_selector",
                    b: /\[/,
                    e: /\]/,
                    i: "$"
                }, {
                    cN: "pseudo",
                    b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/
                }, {
                    cN: "at_rule",
                    b: "@(font-face|page)",
                    l: "[a-z-]+",
                    k: "font-face page"
                }, {
                    cN: "at_rule",
                    b: "@",
                    e: "[{;]",
                    c: [{
                        cN: "keyword",
                        b: /\S+/
                    }, {
                        b: /\s/,
                        eW: !0,
                        eE: !0,
                        r: 0,
                        c: [r, e.ASM, e.QSM, e.CSSNM]
                    }]
                }, {
                    cN: "tag",
                    b: t,
                    r: 0
                }, {
                    cN: "rules",
                    b: "{",
                    e: "}",
                    i: /\S/,
                    c: [e.CBCM, n]
                }]
            }
        }), e.W("diff", function(e) {
            return {
                aliases: ["patch"],
                c: [{
                    cN: "chunk",
                    r: 10,
                    v: [{
                        b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
                    }, {
                        b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
                    }, {
                        b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
                    }]
                }, {
                    cN: "header",
                    v: [{
                        b: /Index: /,
                        e: /$/
                    }, {
                        b: /=====/,
                        e: /=====$/
                    }, {
                        b: /^\-\-\-/,
                        e: /$/
                    }, {
                        b: /^\*{3} /,
                        e: /$/
                    }, {
                        b: /^\+\+\+/,
                        e: /$/
                    }, {
                        b: /\*{5}/,
                        e: /\*{5}$/
                    }]
                }, {
                    cN: "addition",
                    b: "^\\+",
                    e: "$"
                }, {
                    cN: "deletion",
                    b: "^\\-",
                    e: "$"
                }, {
                    cN: "change",
                    b: "^\\!",
                    e: "$"
                }]
            }
        }), e.W("http", function(e) {
            return {
                aliases: ["https"],
                i: "\\S",
                c: [{
                    cN: "status",
                    b: "^HTTP/[0-9\\.]+",
                    e: "$",
                    c: [{
                        cN: "number",
                        b: "\\b\\d{3}\\b"
                    }]
                }, {
                    cN: "request",
                    b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
                    rB: !0,
                    e: "$",
                    c: [{
                        cN: "string",
                        b: " ",
                        e: " ",
                        eB: !0,
                        eE: !0
                    }]
                }, {
                    cN: "attribute",
                    b: "^\\w",
                    e: ": ",
                    eE: !0,
                    i: "\\n|\\s|=",
                    starts: {
                        cN: "string",
                        e: "$"
                    }
                }, {
                    b: "\\n\\n",
                    starts: {
                        sL: [],
                        eW: !0
                    }
                }]
            }
        }), e.W("ini", function(e) {
            var t = {
                cN: "string",
                c: [e.BE],
                v: [{
                    b: "'''",
                    e: "'''",
                    r: 10
                }, {
                    b: '"""',
                    e: '"""',
                    r: 10
                }, {
                    b: '"',
                    e: '"'
                }, {
                    b: "'",
                    e: "'"
                }]
            };
            return {
                aliases: ["toml"],
                cI: !0,
                i: /\S/,
                c: [e.C(";", "$"), e.HCM, {
                    cN: "title",
                    b: /^\s*\[+/,
                    e: /\]+/
                }, {
                    cN: "setting",
                    b: /^[a-z0-9\[\]_-]+\s*=\s*/,
                    e: "$",
                    c: [{
                        cN: "value",
                        eW: !0,
                        k: "on off true false yes no",
                        c: [{
                                cN: "variable",
                                v: [{
                                    b: /\$[\w\d"][\w\d_]*/
                                }, {
                                    b: /\$\{(.*?)}/
                                }]
                            },
                            t, {
                                cN: "number",
                                b: /([\+\-]+)?[\d]+_[\d_]+/
                            },
                            e.NM
                        ],
                        r: 0
                    }]
                }]
            }
        }), e.W("java", function(e) {
            var t = e.UIR + "(<" + e.UIR + ">)?",
                r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
                n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
                i = {
                    cN: "number",
                    b: n,
                    r: 0
                };
            return {
                aliases: ["jsp"],
                k: r,
                i: /<\/|#/,
                c: [e.C("/\\*\\*", "\\*/", {
                        r: 0,
                        c: [{
                            cN: "doctag",
                            b: "@[A-Za-z]+"
                        }]
                    }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
                        cN: "class",
                        bK: "class interface",
                        e: /[{;=]/,
                        eE: !0,
                        k: "class interface",
                        i: /[:"\[\]]/,
                        c: [{
                                bK: "extends implements"
                            },
                            e.UTM
                        ]
                    }, {
                        bK: "new throw return else",
                        r: 0
                    }, {
                        cN: "function",
                        b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
                        rB: !0,
                        e: /[{;=]/,
                        eE: !0,
                        k: r,
                        c: [{
                                b: e.UIR + "\\s*\\(",
                                rB: !0,
                                r: 0,
                                c: [e.UTM]
                            }, {
                                cN: "params",
                                b: /\(/,
                                e: /\)/,
                                k: r,
                                r: 0,
                                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                            },
                            e.CLCM, e.CBCM
                        ]
                    },
                    i, {
                        cN: "annotation",
                        b: "@[A-Za-z]+"
                    }
                ]
            }
        }), e.W("javascript", function(e) {
            return {
                aliases: ["js"],
                k: {
                    keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",
                    literal: "true false null undefined NaN Infinity",
                    built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
                },
                c: [{
                        cN: "pi",
                        r: 10,
                        b: /^\s*['"]use (strict|asm)['"]/
                    },
                    e.ASM, e.QSM, {
                        cN: "string",
                        b: "`",
                        e: "`",
                        c: [e.BE, {
                            cN: "subst",
                            b: "\\$\\{",
                            e: "\\}"
                        }]
                    },
                    e.CLCM, e.CBCM, {
                        cN: "number",
                        v: [{
                            b: "\\b(0[bB][01]+)"
                        }, {
                            b: "\\b(0[oO][0-7]+)"
                        }, {
                            b: e.CNR
                        }],
                        r: 0
                    }, {
                        b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
                        k: "return throw case",
                        c: [e.CLCM, e.CBCM, e.RM, {
                            b: /</,
                            e: />\s*[);\]]/,
                            r: 0,
                            sL: "xml"
                        }],
                        r: 0
                    }, {
                        cN: "function",
                        bK: "function",
                        e: /\{/,
                        eE: !0,
                        c: [e.inherit(e.TM, {
                            b: /[A-Za-z$_][0-9A-Za-z$_]*/
                        }), {
                            cN: "params",
                            b: /\(/,
                            e: /\)/,
                            eB: !0,
                            eE: !0,
                            c: [e.CLCM, e.CBCM]
                        }],
                        i: /\[|%/
                    }, {
                        b: /\$[(.]/
                    }, {
                        b: "\\." + e.IR,
                        r: 0
                    }, {
                        bK: "import",
                        e: "[;$]",
                        k: "import from as",
                        c: [e.ASM, e.QSM]
                    }, {
                        cN: "class",
                        bK: "class",
                        e: /[{;=]/,
                        eE: !0,
                        i: /[:"\[\]]/,
                        c: [{
                                bK: "extends"
                            },
                            e.UTM
                        ]
                    }
                ],
                i: /#/
            }
        }), e.W("json", function(e) {
            var t = {
                literal: "true false null"
            }, r = [e.QSM, e.CNM],
                n = {
                    cN: "value",
                    e: ",",
                    eW: !0,
                    eE: !0,
                    c: r,
                    k: t
                }, i = {
                    b: "{",
                    e: "}",
                    c: [{
                        cN: "attribute",
                        b: '\\s*"',
                        e: '"\\s*:\\s*',
                        eB: !0,
                        eE: !0,
                        c: [e.BE],
                        i: "\\n",
                        starts: n
                    }],
                    i: "\\S"
                }, a = {
                    b: "\\[",
                    e: "\\]",
                    c: [e.inherit(n, {
                        cN: null
                    })],
                    i: "\\S"
                };
            return r.splice(r.length, 0, i, a), {
                c: r,
                k: t,
                i: "\\S"
            }
        }), e.W("makefile", function(e) {
            var t = {
                cN: "variable",
                b: /\$\(/,
                e: /\)/,
                c: [e.BE]
            };
            return {
                aliases: ["mk", "mak"],
                c: [e.HCM, {
                    b: /^\w+\s*\W*=/,
                    rB: !0,
                    r: 0,
                    starts: {
                        cN: "constant",
                        e: /\s*\W*=/,
                        eE: !0,
                        starts: {
                            e: /$/,
                            r: 0,
                            c: [t]
                        }
                    }
                }, {
                    cN: "title",
                    b: /^[\w]+:\s*$/
                }, {
                    cN: "phony",
                    b: /^\.PHONY:/,
                    e: /$/,
                    k: ".PHONY",
                    l: /[\.\w]+/
                }, {
                    b: /^\t+/,
                    e: /$/,
                    r: 0,
                    c: [e.QSM, t]
                }]
            }
        }), e.W("xml", function(e) {
            var t = "[A-Za-z0-9\\._:-]+",
                r = {
                    b: /<\?(php)?(?!\w)/,
                    e: /\?>/,
                    sL: "php"
                }, n = {
                    eW: !0,
                    i: /</,
                    r: 0,
                    c: [r, {
                        cN: "attribute",
                        b: t,
                        r: 0
                    }, {
                        b: "=",
                        r: 0,
                        c: [{
                            cN: "value",
                            c: [r],
                            v: [{
                                b: /"/,
                                e: /"/
                            }, {
                                b: /'/,
                                e: /'/
                            }, {
                                b: /[^\s\/>]+/
                            }]
                        }]
                    }]
                };
            return {
                aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
                cI: !0,
                c: [{
                        cN: "doctype",
                        b: "<!DOCTYPE",
                        e: ">",
                        r: 10,
                        c: [{
                            b: "\\[",
                            e: "\\]"
                        }]
                    },
                    e.C("<!--", "-->", {
                        r: 10
                    }), {
                        cN: "cdata",
                        b: "<\\!\\[CDATA\\[",
                        e: "\\]\\]>",
                        r: 10
                    }, {
                        cN: "tag",
                        b: "<style(?=\\s|>|$)",
                        e: ">",
                        k: {
                            title: "style"
                        },
                        c: [n],
                        starts: {
                            e: "</style>",
                            rE: !0,
                            sL: "css"
                        }
                    }, {
                        cN: "tag",
                        b: "<script(?=\\s|>|$)",
                        e: ">",
                        k: {
                            title: "script"
                        },
                        c: [n],
                        starts: {
                            e: "</script>",
                            rE: !0,
                            sL: ["actionscript", "javascript", "handlebars"]
                        }
                    },
                    r, {
                        cN: "pi",
                        b: /<\?\w+/,
                        e: /\?>/,
                        r: 10
                    }, {
                        cN: "tag",
                        b: "</?",
                        e: "/?>",
                        c: [{
                                cN: "title",
                                b: /[^ \/><\n\t]+/,
                                r: 0
                            },
                            n
                        ]
                    }
                ]
            }
        }), e.W("markdown", function(e) {
            return {
                aliases: ["md", "mkdown", "mkd"],
                c: [{
                    cN: "header",
                    v: [{
                        b: "^#{1,6}",
                        e: "$"
                    }, {
                        b: "^.+?\\n[=-]{2,}$"
                    }]
                }, {
                    b: "<",
                    e: ">",
                    sL: "xml",
                    r: 0
                }, {
                    cN: "bullet",
                    b: "^([*+-]|(\\d+\\.))\\s+"
                }, {
                    cN: "strong",
                    b: "[*_]{2}.+?[*_]{2}"
                }, {
                    cN: "emphasis",
                    v: [{
                        b: "\\*.+?\\*"
                    }, {
                        b: "_.+?_",
                        r: 0
                    }]
                }, {
                    cN: "blockquote",
                    b: "^>\\s+",
                    e: "$"
                }, {
                    cN: "code",
                    v: [{
                        b: "`.+?`"
                    }, {
                        b: "^( {4}|)",
                        e: "$",
                        r: 0
                    }]
                }, {
                    cN: "horizontal_rule",
                    b: "^[-\\*]{3,}",
                    e: "$"
                }, {
                    b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
                    rB: !0,
                    c: [{
                        cN: "link_label",
                        b: "\\[",
                        e: "\\]",
                        eB: !0,
                        rE: !0,
                        r: 0
                    }, {
                        cN: "link_url",
                        b: "\\]\\(",
                        e: "\\)",
                        eB: !0,
                        eE: !0
                    }, {
                        cN: "link_reference",
                        b: "\\]\\[",
                        e: "\\]",
                        eB: !0,
                        eE: !0
                    }],
                    r: 10
                }, {
                    b: "^\\[.+\\]:",
                    rB: !0,
                    c: [{
                        cN: "link_reference",
                        b: "\\[",
                        e: "\\]:",
                        eB: !0,
                        eE: !0,
                        starts: {
                            cN: "link_url",
                            e: "$"
                        }
                    }]
                }]
            }
        }), e.W("nginx", function(e) {
            var t = {
                cN: "variable",
                v: [{
                    b: /\$\d+/
                }, {
                    b: /\$\{/,
                    e: /}/
                }, {
                    b: "[\\$\\@]" + e.UIR
                }]
            }, r = {
                    eW: !0,
                    l: "[a-z/_]+",
                    k: {
                        built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
                    },
                    r: 0,
                    i: "=>",
                    c: [e.HCM, {
                            cN: "string",
                            c: [e.BE, t],
                            v: [{
                                b: /"/,
                                e: /"/
                            }, {
                                b: /'/,
                                e: /'/
                            }]
                        }, {
                            cN: "url",
                            b: "([a-z]+):/",
                            e: "\\s",
                            eW: !0,
                            eE: !0,
                            c: [t]
                        }, {
                            cN: "regexp",
                            c: [e.BE, t],
                            v: [{
                                b: "\\s\\^",
                                e: "\\s|{|;",
                                rE: !0
                            }, {
                                b: "~\\*?\\s+",
                                e: "\\s|{|;",
                                rE: !0
                            }, {
                                b: "\\*(\\.[a-z\\-]+)+"
                            }, {
                                b: "([a-z\\-]+\\.)+\\*"
                            }]
                        }, {
                            cN: "number",
                            b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                        }, {
                            cN: "number",
                            b: "\\b\\d+[kKmMgGdshdwy]*\\b",
                            r: 0
                        },
                        t
                    ]
                };
            return {
                aliases: ["nginxconf"],
                c: [e.HCM, {
                    b: e.UIR + "\\s",
                    e: ";|{",
                    rB: !0,
                    c: [{
                        cN: "title",
                        b: e.UIR,
                        starts: r
                    }],
                    r: 0
                }],
                i: "[^\\s\\}]"
            }
        }), e.W("objectivec", function(e) {
            var t = {
                cN: "built_in",
                b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+"
            }, r = {
                    keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
                    literal: "false true FALSE TRUE nil YES NO NULL",
                    built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
                }, n = /[a-zA-Z@][a-zA-Z0-9_]*/,
                i = "@interface @class @protocol @implementation";
            return {
                aliases: ["mm", "objc", "obj-c"],
                k: r,
                l: n,
                i: "</",
                c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
                    cN: "string",
                    v: [{
                        b: '@"',
                        e: '"',
                        i: "\\n",
                        c: [e.BE]
                    }, {
                        b: "'",
                        e: "[^\\\\]'",
                        i: "[^\\\\][^']"
                    }]
                }, {
                    cN: "preprocessor",
                    b: "#",
                    e: "$",
                    c: [{
                        cN: "title",
                        v: [{
                            b: '"',
                            e: '"'
                        }, {
                            b: "<",
                            e: ">"
                        }]
                    }]
                }, {
                    cN: "class",
                    b: "(" + i.split(" ").join("|") + ")\\b",
                    e: "({|$)",
                    eE: !0,
                    k: i,
                    l: n,
                    c: [e.UTM]
                }, {
                    cN: "variable",
                    b: "\\." + e.UIR,
                    r: 0
                }]
            }
        }), e.W("perl", function(e) {
            var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
                r = {
                    cN: "subst",
                    b: "[$@]\\{",
                    e: "\\}",
                    k: t
                }, n = {
                    b: "->{",
                    e: "}"
                }, i = {
                    cN: "variable",
                    v: [{
                        b: /\$\d/
                    }, {
                        b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
                    }, {
                        b: /[\$%@][^\s\w{]/,
                        r: 0
                    }]
                }, a = [e.BE, r, i],
                s = [i, e.HCM, e.C("^\\=\\w", "\\=cut", {
                    eW: !0
                }), n, {
                    cN: "string",
                    c: a,
                    v: [{
                        b: "q[qwxr]?\\s*\\(",
                        e: "\\)",
                        r: 5
                    }, {
                        b: "q[qwxr]?\\s*\\[",
                        e: "\\]",
                        r: 5
                    }, {
                        b: "q[qwxr]?\\s*\\{",
                        e: "\\}",
                        r: 5
                    }, {
                        b: "q[qwxr]?\\s*\\|",
                        e: "\\|",
                        r: 5
                    }, {
                        b: "q[qwxr]?\\s*\\<",
                        e: "\\>",
                        r: 5
                    }, {
                        b: "qw\\s+q",
                        e: "q",
                        r: 5
                    }, {
                        b: "'",
                        e: "'",
                        c: [e.BE]
                    }, {
                        b: '"',
                        e: '"'
                    }, {
                        b: "`",
                        e: "`",
                        c: [e.BE]
                    }, {
                        b: "{\\w+}",
                        c: [],
                        r: 0
                    }, {
                        b: "-?\\w+\\s*\\=\\>",
                        c: [],
                        r: 0
                    }]
                }, {
                    cN: "number",
                    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                    r: 0
                }, {
                    b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                    k: "split return print reverse grep",
                    r: 0,
                    c: [e.HCM, {
                        cN: "regexp",
                        b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                        r: 10
                    }, {
                        cN: "regexp",
                        b: "(m|qr)?/",
                        e: "/[a-z]*",
                        c: [e.BE],
                        r: 0
                    }]
                }, {
                    cN: "sub",
                    bK: "sub",
                    e: "(\\s*\\(.*?\\))?[;{]",
                    r: 5
                }, {
                    cN: "operator",
                    b: "-\\w\\b",
                    r: 0
                }, {
                    b: "^__DATA__$",
                    e: "^__END__$",
                    sL: "mojolicious",
                    c: [{
                        b: "^@@.*",
                        e: "$",
                        cN: "comment"
                    }]
                }];
            return r.c = s, n.c = s, {
                aliases: ["pl"],
                k: t,
                c: s
            }
        }), e.W("php", function(e) {
            var t = {
                cN: "variable",
                b: "\\$+[a-zA-Z-Ã¿][a-zA-Z0-9-Ã¿]*"
            }, r = {
                    cN: "preprocessor",
                    b: /<\?(php)?|\?>/
                }, n = {
                    cN: "string",
                    c: [e.BE, r],
                    v: [{
                            b: 'b"',
                            e: '"'
                        }, {
                            b: "b'",
                            e: "'"
                        },
                        e.inherit(e.ASM, {
                            i: null
                        }), e.inherit(e.QSM, {
                            i: null
                        })
                    ]
                }, i = {
                    v: [e.BNM, e.CNM]
                };
            return {
                aliases: ["php3", "php4", "php5", "php6"],
                cI: !0,
                k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
                c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
                        c: [{
                                cN: "doctag",
                                b: "@[A-Za-z]+"
                            },
                            r
                        ]
                    }), e.C("__halt_compiler.+?;", !1, {
                        eW: !0,
                        k: "__halt_compiler",
                        l: e.UIR
                    }), {
                        cN: "string",
                        b: /<<<['"]?\w+['"]?$/,
                        e: /^\w+;?$/,
                        c: [e.BE, {
                            cN: "subst",
                            v: [{
                                b: /\$\w+/
                            }, {
                                b: /\{\$/,
                                e: /\}/
                            }]
                        }]
                    },
                    r, t, {
                        b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
                    }, {
                        cN: "function",
                        bK: "function",
                        e: /[;{]/,
                        eE: !0,
                        i: "\\$|\\[|%",
                        c: [e.UTM, {
                            cN: "params",
                            b: "\\(",
                            e: "\\)",
                            c: ["self", t, e.CBCM, n, i]
                        }]
                    }, {
                        cN: "class",
                        bK: "class interface",
                        e: "{",
                        eE: !0,
                        i: /[:\(\$"]/,
                        c: [{
                                bK: "extends implements"
                            },
                            e.UTM
                        ]
                    }, {
                        bK: "namespace",
                        e: ";",
                        i: /[\.']/,
                        c: [e.UTM]
                    }, {
                        bK: "use",
                        e: ";",
                        c: [e.UTM]
                    }, {
                        b: "=>"
                    },
                    n, i
                ]
            }
        }), e.W("python", function(e) {
            var t = {
                cN: "prompt",
                b: /^(>>>|\.\.\.) /
            }, r = {
                    cN: "string",
                    c: [e.BE],
                    v: [{
                            b: /(u|b)?r?'''/,
                            e: /'''/,
                            c: [t],
                            r: 10
                        }, {
                            b: /(u|b)?r?"""/,
                            e: /"""/,
                            c: [t],
                            r: 10
                        }, {
                            b: /(u|r|ur)'/,
                            e: /'/,
                            r: 10
                        }, {
                            b: /(u|r|ur)"/,
                            e: /"/,
                            r: 10
                        }, {
                            b: /(b|br)'/,
                            e: /'/
                        }, {
                            b: /(b|br)"/,
                            e: /"/
                        },
                        e.ASM, e.QSM
                    ]
                }, n = {
                    cN: "number",
                    r: 0,
                    v: [{
                        b: e.BNR + "[lLjJ]?"
                    }, {
                        b: "\\b(0o[0-7]+)[lLjJ]?"
                    }, {
                        b: e.CNR + "[lLjJ]?"
                    }]
                }, i = {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    c: ["self", t, n, r]
                };
            return {
                aliases: ["py", "gyp"],
                k: {
                    keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
                    built_in: "Ellipsis NotImplemented"
                },
                i: /(<\/|->|\?)/,
                c: [t, n, r, e.HCM, {
                    v: [{
                        cN: "function",
                        bK: "def",
                        r: 10
                    }, {
                        cN: "class",
                        bK: "class"
                    }],
                    e: /:/,
                    i: /[${=;\n,]/,
                    c: [e.UTM, i]
                }, {
                    cN: "decorator",
                    b: /^[\t ]*@/,
                    e: /$/
                }, {
                    b: /\b(print|exec)\(/
                }]
            }
        }), e.W("ruby", function(e) {
            var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
                r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
                n = {
                    cN: "doctag",
                    b: "@[A-Za-z]+"
                }, i = {
                    cN: "value",
                    b: "#<",
                    e: ">"
                }, a = [e.C("#", "$", {
                    c: [n]
                }), e.C("^\\=begin", "^\\=end", {
                    c: [n],
                    r: 10
                }), e.C("^__END__", "\\n$")],
                s = {
                    cN: "subst",
                    b: "#\\{",
                    e: "}",
                    k: r
                }, o = {
                    cN: "string",
                    c: [e.BE, s],
                    v: [{
                        b: /'/,
                        e: /'/
                    }, {
                        b: /"/,
                        e: /"/
                    }, {
                        b: /`/,
                        e: /`/
                    }, {
                        b: "%[qQwWx]?\\(",
                        e: "\\)"
                    }, {
                        b: "%[qQwWx]?\\[",
                        e: "\\]"
                    }, {
                        b: "%[qQwWx]?{",
                        e: "}"
                    }, {
                        b: "%[qQwWx]?<",
                        e: ">"
                    }, {
                        b: "%[qQwWx]?/",
                        e: "/"
                    }, {
                        b: "%[qQwWx]?%",
                        e: "%"
                    }, {
                        b: "%[qQwWx]?-",
                        e: "-"
                    }, {
                        b: "%[qQwWx]?\\|",
                        e: "\\|"
                    }, {
                        b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
                    }]
                }, c = {
                    cN: "params",
                    b: "\\(",
                    e: "\\)",
                    k: r
                }, l = [o, i, {
                    cN: "class",
                    bK: "class module",
                    e: "$|;",
                    i: /=/,
                    c: [e.inherit(e.TM, {
                        b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
                    }), {
                        cN: "inheritance",
                        b: "<\\s*",
                        c: [{
                            cN: "parent",
                            b: "(" + e.IR + "::)?" + e.IR
                        }]
                    }].concat(a)
                }, {
                    cN: "function",
                    bK: "def",
                    e: "$|;",
                    c: [e.inherit(e.TM, {
                        b: t
                    }), c].concat(a)
                }, {
                    cN: "constant",
                    b: "(::)?(\\b[A-Z]\\w*(::)?)+",
                    r: 0
                }, {
                    cN: "symbol",
                    b: e.UIR + "(\\!|\\?)?:",
                    r: 0
                }, {
                    cN: "symbol",
                    b: ":",
                    c: [o, {
                        b: t
                    }],
                    r: 0
                }, {
                    cN: "number",
                    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                    r: 0
                }, {
                    cN: "variable",
                    b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
                }, {
                    b: "(" + e.RSR + ")\\s*",
                    c: [i, {
                        cN: "regexp",
                        c: [e.BE, s],
                        i: /\n/,
                        v: [{
                            b: "/",
                            e: "/[a-z]*"
                        }, {
                            b: "%r{",
                            e: "}[a-z]*"
                        }, {
                            b: "%r\\(",
                            e: "\\)[a-z]*"
                        }, {
                            b: "%r!",
                            e: "![a-z]*"
                        }, {
                            b: "%r\\[",
                            e: "\\][a-z]*"
                        }]
                    }].concat(a),
                    r: 0
                }].concat(a);
            s.c = l, c.c = l;
            var u = "[>?]>",
                d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
                p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
                h = [{
                    b: /^\s*=>/,
                    cN: "status",
                    starts: {
                        e: "$",
                        c: l
                    }
                }, {
                    cN: "prompt",
                    b: "^(" + u + "|" + d + "|" + p + ")",
                    starts: {
                        e: "$",
                        c: l
                    }
                }];
            return {
                aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
                k: r,
                c: a.concat(h).concat(l)
            }
        }), e.W("sql", function(e) {
            var t = e.C("--", "$");
            return {
                cI: !0,
                i: /[<>{}*]/,
                c: [{
                        cN: "operator",
                        bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
                        e: /;/,
                        eW: !0,
                        k: {
                            keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                            literal: "true false null",
                            built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
                        },
                        c: [{
                                cN: "string",
                                b: "'",
                                e: "'",
                                c: [e.BE, {
                                    b: "''"
                                }]
                            }, {
                                cN: "string",
                                b: '"',
                                e: '"',
                                c: [e.BE, {
                                    b: '""'
                                }]
                            }, {
                                cN: "string",
                                b: "`",
                                e: "`",
                                c: [e.BE]
                            },
                            e.CNM, e.CBCM, t
                        ]
                    },
                    e.CBCM, t
                ]
            }
        }), e
    })
}();