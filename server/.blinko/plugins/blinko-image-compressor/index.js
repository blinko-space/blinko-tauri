var Cn = Object.defineProperty;
var Sn = (n, r, s) => r in n ? Cn(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s;
var Ee = (n, r, s) => (Sn(n, typeof r != "symbol" ? r + "" : r, s), s);
var it, j, Gt, ze, St, Kt, Zt, Xt, gt, dt, ht, $e = {}, Yt = [], kn = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ot = Array.isArray;
function ke(n, r) {
  for (var s in r)
    n[s] = r[s];
  return n;
}
function pt(n) {
  n && n.parentNode && n.parentNode.removeChild(n);
}
function mt(n, r, s) {
  var o, e, t, u = {};
  for (t in r)
    t == "key" ? o = r[t] : t == "ref" ? e = r[t] : u[t] = r[t];
  if (arguments.length > 2 && (u.children = arguments.length > 3 ? it.call(arguments, 2) : s), typeof n == "function" && n.defaultProps != null)
    for (t in n.defaultProps)
      u[t] === void 0 && (u[t] = n.defaultProps[t]);
  return Ve(n, u, o, e, null);
}
function Ve(n, r, s, o, e) {
  var t = { type: n, props: r, key: s, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: e ?? ++Gt, __i: -1, __u: 0 };
  return e == null && j.vnode != null && j.vnode(t), t;
}
function Pe(n) {
  return n.children;
}
function xe(n, r) {
  this.props = n, this.context = r;
}
function De(n, r) {
  if (r == null)
    return n.__ ? De(n.__, n.__i + 1) : null;
  for (var s; r < n.__k.length; r++)
    if ((s = n.__k[r]) != null && s.__e != null)
      return s.__e;
  return typeof n.type == "function" ? De(n) : null;
}
function Jt(n) {
  var r, s;
  if ((n = n.__) != null && n.__c != null) {
    for (n.__e = n.__c.base = null, r = 0; r < n.__k.length; r++)
      if ((s = n.__k[r]) != null && s.__e != null) {
        n.__e = n.__c.base = s.__e;
        break;
      }
    return Jt(n);
  }
}
function kt(n) {
  (!n.__d && (n.__d = !0) && ze.push(n) && !Ze.__r++ || St !== j.debounceRendering) && ((St = j.debounceRendering) || Kt)(Ze);
}
function Ze() {
  for (var n, r, s, o, e, t, u, l = 1; ze.length; )
    ze.length > l && ze.sort(Zt), n = ze.shift(), l = ze.length, n.__d && (s = void 0, e = (o = (r = n).__v).__e, t = [], u = [], r.__P && ((s = ke({}, o)).__v = o.__v + 1, j.vnode && j.vnode(s), vt(r.__P, s, o, r.__n, r.__P.namespaceURI, 32 & o.__u ? [e] : null, t, e ?? De(o), !!(32 & o.__u), u), s.__v = o.__v, s.__.__k[s.__i] = s, nn(t, s, u), s.__e != e && Jt(s)));
  Ze.__r = 0;
}
function en(n, r, s, o, e, t, u, l, h, g, c) {
  var i, a, f, v, S, N, b = o && o.__k || Yt, E = r.length;
  for (h = Nn(s, r, b, h, E), i = 0; i < E; i++)
    (f = s.__k[i]) != null && (a = f.__i === -1 ? $e : b[f.__i] || $e, f.__i = i, N = vt(n, f, a, e, t, u, l, h, g, c), v = f.__e, f.ref && a.ref != f.ref && (a.ref && bt(a.ref, null, f), c.push(f.ref, f.__c || v, f)), S == null && v != null && (S = v), 4 & f.__u || a.__k === f.__k ? h = tn(f, h, n) : typeof f.type == "function" && N !== void 0 ? h = N : v && (h = v.nextSibling), f.__u &= -7);
  return s.__e = S, h;
}
function Nn(n, r, s, o, e) {
  var t, u, l, h, g, c = s.length, i = c, a = 0;
  for (n.__k = new Array(e), t = 0; t < e; t++)
    (u = r[t]) != null && typeof u != "boolean" && typeof u != "function" ? (h = t + a, (u = n.__k[t] = typeof u == "string" || typeof u == "number" || typeof u == "bigint" || u.constructor == String ? Ve(null, u, null, null, null) : ot(u) ? Ve(Pe, { children: u }, null, null, null) : u.constructor === void 0 && u.__b > 0 ? Ve(u.type, u.props, u.key, u.ref ? u.ref : null, u.__v) : u).__ = n, u.__b = n.__b + 1, l = null, (g = u.__i = Un(u, s, h, i)) !== -1 && (i--, (l = s[g]) && (l.__u |= 2)), l == null || l.__v === null ? (g == -1 && a--, typeof u.type != "function" && (u.__u |= 4)) : g != h && (g == h - 1 ? a-- : g == h + 1 ? a++ : (g > h ? a-- : a++, u.__u |= 4))) : n.__k[t] = null;
  if (i)
    for (t = 0; t < c; t++)
      (l = s[t]) != null && !(2 & l.__u) && (l.__e == o && (o = De(l)), rn(l, l));
  return o;
}
function tn(n, r, s) {
  var o, e;
  if (typeof n.type == "function") {
    for (o = n.__k, e = 0; o && e < o.length; e++)
      o[e] && (o[e].__ = n, r = tn(o[e], r, s));
    return r;
  }
  n.__e != r && (r && n.type && !s.contains(r) && (r = De(n)), s.insertBefore(n.__e, r || null), r = n.__e);
  do
    r = r && r.nextSibling;
  while (r != null && r.nodeType == 8);
  return r;
}
function Xe(n, r) {
  return r = r || [], n == null || typeof n == "boolean" || (ot(n) ? n.some(function(s) {
    Xe(s, r);
  }) : r.push(n)), r;
}
function Un(n, r, s, o) {
  var e, t, u = n.key, l = n.type, h = r[s];
  if (h === null || h && u == h.key && l === h.type && !(2 & h.__u))
    return s;
  if (o > (h != null && !(2 & h.__u) ? 1 : 0))
    for (e = s - 1, t = s + 1; e >= 0 || t < r.length; ) {
      if (e >= 0) {
        if ((h = r[e]) && !(2 & h.__u) && u == h.key && l === h.type)
          return e;
        e--;
      }
      if (t < r.length) {
        if ((h = r[t]) && !(2 & h.__u) && u == h.key && l === h.type)
          return t;
        t++;
      }
    }
  return -1;
}
function Nt(n, r, s) {
  r[0] == "-" ? n.setProperty(r, s ?? "") : n[r] = s == null ? "" : typeof s != "number" || kn.test(r) ? s : s + "px";
}
function Qe(n, r, s, o, e) {
  var t;
  e:
    if (r == "style")
      if (typeof s == "string")
        n.style.cssText = s;
      else {
        if (typeof o == "string" && (n.style.cssText = o = ""), o)
          for (r in o)
            s && r in s || Nt(n.style, r, "");
        if (s)
          for (r in s)
            o && s[r] === o[r] || Nt(n.style, r, s[r]);
      }
    else if (r[0] == "o" && r[1] == "n")
      t = r != (r = r.replace(Xt, "$1")), r = r.toLowerCase() in n || r == "onFocusOut" || r == "onFocusIn" ? r.toLowerCase().slice(2) : r.slice(2), n.l || (n.l = {}), n.l[r + t] = s, s ? o ? s.t = o.t : (s.t = gt, n.addEventListener(r, t ? ht : dt, t)) : n.removeEventListener(r, t ? ht : dt, t);
    else {
      if (e == "http://www.w3.org/2000/svg")
        r = r.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (r != "width" && r != "height" && r != "href" && r != "list" && r != "form" && r != "tabIndex" && r != "download" && r != "rowSpan" && r != "colSpan" && r != "role" && r != "popover" && r in n)
        try {
          n[r] = s ?? "";
          break e;
        } catch {
        }
      typeof s == "function" || (s == null || s === !1 && r[4] != "-" ? n.removeAttribute(r) : n.setAttribute(r, r == "popover" && s == 1 ? "" : s));
    }
}
function Ut(n) {
  return function(r) {
    if (this.l) {
      var s = this.l[r.type + n];
      if (r.u == null)
        r.u = gt++;
      else if (r.u < s.t)
        return;
      return s(j.event ? j.event(r) : r);
    }
  };
}
function vt(n, r, s, o, e, t, u, l, h, g) {
  var c, i, a, f, v, S, N, b, E, R, F, H, y, z, d, m, w, C = r.type;
  if (r.constructor !== void 0)
    return null;
  128 & s.__u && (h = !!(32 & s.__u), t = [l = r.__e = s.__e]), (c = j.__b) && c(r);
  e:
    if (typeof C == "function")
      try {
        if (b = r.props, E = "prototype" in C && C.prototype.render, R = (c = C.contextType) && o[c.__c], F = c ? R ? R.props.value : c.__ : o, s.__c ? N = (i = r.__c = s.__c).__ = i.__E : (E ? r.__c = i = new C(b, F) : (r.__c = i = new xe(b, F), i.constructor = C, i.render = Mn), R && R.sub(i), i.props = b, i.state || (i.state = {}), i.context = F, i.__n = o, a = i.__d = !0, i.__h = [], i._sb = []), E && i.__s == null && (i.__s = i.state), E && C.getDerivedStateFromProps != null && (i.__s == i.state && (i.__s = ke({}, i.__s)), ke(i.__s, C.getDerivedStateFromProps(b, i.__s))), f = i.props, v = i.state, i.__v = r, a)
          E && C.getDerivedStateFromProps == null && i.componentWillMount != null && i.componentWillMount(), E && i.componentDidMount != null && i.__h.push(i.componentDidMount);
        else {
          if (E && C.getDerivedStateFromProps == null && b !== f && i.componentWillReceiveProps != null && i.componentWillReceiveProps(b, F), !i.__e && (i.shouldComponentUpdate != null && i.shouldComponentUpdate(b, i.__s, F) === !1 || r.__v == s.__v)) {
            for (r.__v != s.__v && (i.props = b, i.state = i.__s, i.__d = !1), r.__e = s.__e, r.__k = s.__k, r.__k.some(function(x) {
              x && (x.__ = r);
            }), H = 0; H < i._sb.length; H++)
              i.__h.push(i._sb[H]);
            i._sb = [], i.__h.length && u.push(i);
            break e;
          }
          i.componentWillUpdate != null && i.componentWillUpdate(b, i.__s, F), E && i.componentDidUpdate != null && i.__h.push(function() {
            i.componentDidUpdate(f, v, S);
          });
        }
        if (i.context = F, i.props = b, i.__P = n, i.__e = !1, y = j.__r, z = 0, E) {
          for (i.state = i.__s, i.__d = !1, y && y(r), c = i.render(i.props, i.state, i.context), d = 0; d < i._sb.length; d++)
            i.__h.push(i._sb[d]);
          i._sb = [];
        } else
          do
            i.__d = !1, y && y(r), c = i.render(i.props, i.state, i.context), i.state = i.__s;
          while (i.__d && ++z < 25);
        i.state = i.__s, i.getChildContext != null && (o = ke(ke({}, o), i.getChildContext())), E && !a && i.getSnapshotBeforeUpdate != null && (S = i.getSnapshotBeforeUpdate(f, v)), l = en(n, ot(m = c != null && c.type === Pe && c.key == null ? c.props.children : c) ? m : [m], r, s, o, e, t, u, l, h, g), i.base = r.__e, r.__u &= -161, i.__h.length && u.push(i), N && (i.__E = i.__ = null);
      } catch (x) {
        if (r.__v = null, h || t != null)
          if (x.then) {
            for (r.__u |= h ? 160 : 128; l && l.nodeType == 8 && l.nextSibling; )
              l = l.nextSibling;
            t[t.indexOf(l)] = null, r.__e = l;
          } else
            for (w = t.length; w--; )
              pt(t[w]);
        else
          r.__e = s.__e, r.__k = s.__k;
        j.__e(x, r, s);
      }
    else
      t == null && r.__v == s.__v ? (r.__k = s.__k, r.__e = s.__e) : l = r.__e = Fn(s.__e, r, s, o, e, t, u, h, g);
  return (c = j.diffed) && c(r), 128 & r.__u ? void 0 : l;
}
function nn(n, r, s) {
  for (var o = 0; o < s.length; o++)
    bt(s[o], s[++o], s[++o]);
  j.__c && j.__c(r, n), n.some(function(e) {
    try {
      n = e.__h, e.__h = [], n.some(function(t) {
        t.call(e);
      });
    } catch (t) {
      j.__e(t, e.__v);
    }
  });
}
function Fn(n, r, s, o, e, t, u, l, h) {
  var g, c, i, a, f, v, S, N = s.props, b = r.props, E = r.type;
  if (E == "svg" ? e = "http://www.w3.org/2000/svg" : E == "math" ? e = "http://www.w3.org/1998/Math/MathML" : e || (e = "http://www.w3.org/1999/xhtml"), t != null) {
    for (g = 0; g < t.length; g++)
      if ((f = t[g]) && "setAttribute" in f == !!E && (E ? f.localName == E : f.nodeType == 3)) {
        n = f, t[g] = null;
        break;
      }
  }
  if (n == null) {
    if (E == null)
      return document.createTextNode(b);
    n = document.createElementNS(e, E, b.is && b), l && (j.__m && j.__m(r, t), l = !1), t = null;
  }
  if (E === null)
    N === b || l && n.data === b || (n.data = b);
  else {
    if (t = t && it.call(n.childNodes), N = s.props || $e, !l && t != null)
      for (N = {}, g = 0; g < n.attributes.length; g++)
        N[(f = n.attributes[g]).name] = f.value;
    for (g in N)
      if (f = N[g], g != "children") {
        if (g == "dangerouslySetInnerHTML")
          i = f;
        else if (!(g in b)) {
          if (g == "value" && "defaultValue" in b || g == "checked" && "defaultChecked" in b)
            continue;
          Qe(n, g, null, f, e);
        }
      }
    for (g in b)
      f = b[g], g == "children" ? a = f : g == "dangerouslySetInnerHTML" ? c = f : g == "value" ? v = f : g == "checked" ? S = f : l && typeof f != "function" || N[g] === f || Qe(n, g, f, N[g], e);
    if (c)
      l || i && (c.__html === i.__html || c.__html === n.innerHTML) || (n.innerHTML = c.__html), r.__k = [];
    else if (i && (n.innerHTML = ""), en(r.type === "template" ? n.content : n, ot(a) ? a : [a], r, s, o, E == "foreignObject" ? "http://www.w3.org/1999/xhtml" : e, t, u, t ? t[0] : s.__k && De(s, 0), l, h), t != null)
      for (g = t.length; g--; )
        pt(t[g]);
    l || (g = "value", E == "progress" && v == null ? n.removeAttribute("value") : v !== void 0 && (v !== n[g] || E == "progress" && !v || E == "option" && v !== N[g]) && Qe(n, g, v, N[g], e), g = "checked", S !== void 0 && S !== n[g] && Qe(n, g, S, N[g], e));
  }
  return n;
}
function bt(n, r, s) {
  try {
    if (typeof n == "function") {
      var o = typeof n.__u == "function";
      o && n.__u(), o && r == null || (n.__u = n(r));
    } else
      n.current = r;
  } catch (e) {
    j.__e(e, s);
  }
}
function rn(n, r, s) {
  var o, e;
  if (j.unmount && j.unmount(n), (o = n.ref) && (o.current && o.current !== n.__e || bt(o, null, r)), (o = n.__c) != null) {
    if (o.componentWillUnmount)
      try {
        o.componentWillUnmount();
      } catch (t) {
        j.__e(t, r);
      }
    o.base = o.__P = null;
  }
  if (o = n.__k)
    for (e = 0; e < o.length; e++)
      o[e] && rn(o[e], r, s || typeof n.type != "function");
  s || pt(n.__e), n.__c = n.__ = n.__e = void 0;
}
function Mn(n, r, s) {
  return this.constructor(n, s);
}
function In(n, r, s) {
  var o, e, t, u;
  r == document && (r = document.documentElement), j.__ && j.__(n, r), e = (o = typeof s == "function") ? null : s && s.__k || r.__k, t = [], u = [], vt(r, n = (!o && s || r).__k = mt(Pe, null, [n]), e || $e, $e, r.namespaceURI, !o && s ? [s] : e ? null : r.firstChild ? it.call(r.childNodes) : null, t, !o && s ? s : e ? e.__e : r.firstChild, o, u), nn(t, n, u);
}
it = Yt.slice, j = { __e: function(n, r, s, o) {
  for (var e, t, u; r = r.__; )
    if ((e = r.__c) && !e.__)
      try {
        if ((t = e.constructor) && t.getDerivedStateFromError != null && (e.setState(t.getDerivedStateFromError(n)), u = e.__d), e.componentDidCatch != null && (e.componentDidCatch(n, o || {}), u = e.__d), u)
          return e.__E = e;
      } catch (l) {
        n = l;
      }
  throw n;
} }, Gt = 0, xe.prototype.setState = function(n, r) {
  var s;
  s = this.__s != null && this.__s !== this.state ? this.__s : this.__s = ke({}, this.state), typeof n == "function" && (n = n(ke({}, s), this.props)), n && ke(s, n), n != null && this.__v && (r && this._sb.push(r), kt(this));
}, xe.prototype.forceUpdate = function(n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), kt(this));
}, xe.prototype.render = Pe, ze = [], Kt = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Zt = function(n, r) {
  return n.__v.__b - r.__v.__b;
}, Ze.__r = 0, Xt = /(PointerCapture)$|Capture$/i, gt = 0, dt = Ut(!1), ht = Ut(!0);
var En = 0;
function I(n, r, s, o, e, t) {
  r || (r = {});
  var u, l, h = r;
  if ("ref" in h)
    for (l in h = {}, r)
      l == "ref" ? u = r[l] : h[l] = r[l];
  var g = { type: n, props: h, key: s, ref: u, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --En, __i: -1, __u: 0, __source: e, __self: t };
  if (typeof n == "function" && (u = n.defaultProps))
    for (l in u)
      h[l] === void 0 && (h[l] = u[l]);
  return j.vnode && j.vnode(g), g;
}
var Be, ee, ct, Ft, Ye = 0, on = [], re = j, Mt = re.__b, It = re.__r, Et = re.diffed, zt = re.__c, Rt = re.unmount, Pt = re.__;
function yt(n, r) {
  re.__h && re.__h(ee, n, Ye || r), Ye = 0;
  var s = ee.__H || (ee.__H = { __: [], __h: [] });
  return n >= s.__.length && s.__.push({}), s.__[n];
}
function He(n) {
  return Ye = 1, zn(an, n);
}
function zn(n, r, s) {
  var o = yt(Be++, 2);
  if (o.t = n, !o.__c && (o.__ = [s ? s(r) : an(void 0, r), function(l) {
    var h = o.__N ? o.__N[0] : o.__[0], g = o.t(h, l);
    h !== g && (o.__N = [g, o.__[1]], o.__c.setState({}));
  }], o.__c = ee, !ee.__f)) {
    var e = function(l, h, g) {
      if (!o.__c.__H)
        return !0;
      var c = o.__c.__H.__.filter(function(a) {
        return !!a.__c;
      });
      if (c.every(function(a) {
        return !a.__N;
      }))
        return !t || t.call(this, l, h, g);
      var i = o.__c.props !== l;
      return c.forEach(function(a) {
        if (a.__N) {
          var f = a.__[0];
          a.__ = a.__N, a.__N = void 0, f !== a.__[0] && (i = !0);
        }
      }), t && t.call(this, l, h, g) || i;
    };
    ee.__f = !0;
    var t = ee.shouldComponentUpdate, u = ee.componentWillUpdate;
    ee.componentWillUpdate = function(l, h, g) {
      if (this.__e) {
        var c = t;
        t = void 0, e(l, h, g), t = c;
      }
      u && u.call(this, l, h, g);
    }, ee.shouldComponentUpdate = e;
  }
  return o.__N || o.__;
}
function Tt(n, r) {
  var s = yt(Be++, 3);
  !re.__s && sn(s.__H, r) && (s.__ = n, s.u = r, ee.__H.__h.push(s));
}
function Rn(n) {
  return Ye = 5, Pn(function() {
    return { current: n };
  }, []);
}
function Pn(n, r) {
  var s = yt(Be++, 7);
  return sn(s.__H, r) && (s.__ = n(), s.__H = r, s.__h = n), s.__;
}
function Tn() {
  for (var n; n = on.shift(); )
    if (n.__P && n.__H)
      try {
        n.__H.__h.forEach(Ge), n.__H.__h.forEach(_t), n.__H.__h = [];
      } catch (r) {
        n.__H.__h = [], re.__e(r, n.__v);
      }
}
re.__b = function(n) {
  ee = null, Mt && Mt(n);
}, re.__ = function(n, r) {
  n && r.__k && r.__k.__m && (n.__m = r.__k.__m), Pt && Pt(n, r);
}, re.__r = function(n) {
  It && It(n), Be = 0;
  var r = (ee = n.__c).__H;
  r && (ct === ee ? (r.__h = [], ee.__h = [], r.__.forEach(function(s) {
    s.__N && (s.__ = s.__N), s.u = s.__N = void 0;
  })) : (r.__h.forEach(Ge), r.__h.forEach(_t), r.__h = [], Be = 0)), ct = ee;
}, re.diffed = function(n) {
  Et && Et(n);
  var r = n.__c;
  r && r.__H && (r.__H.__h.length && (on.push(r) !== 1 && Ft === re.requestAnimationFrame || ((Ft = re.requestAnimationFrame) || Hn)(Tn)), r.__H.__.forEach(function(s) {
    s.u && (s.__H = s.u), s.u = void 0;
  })), ct = ee = null;
}, re.__c = function(n, r) {
  r.some(function(s) {
    try {
      s.__h.forEach(Ge), s.__h = s.__h.filter(function(o) {
        return !o.__ || _t(o);
      });
    } catch (o) {
      r.some(function(e) {
        e.__h && (e.__h = []);
      }), r = [], re.__e(o, s.__v);
    }
  }), zt && zt(n, r);
}, re.unmount = function(n) {
  Rt && Rt(n);
  var r, s = n.__c;
  s && s.__H && (s.__H.__.forEach(function(o) {
    try {
      Ge(o);
    } catch (e) {
      r = e;
    }
  }), s.__H = void 0, r && re.__e(r, s.__v));
};
var Ht = typeof requestAnimationFrame == "function";
function Hn(n) {
  var r, s = function() {
    clearTimeout(o), Ht && cancelAnimationFrame(r), setTimeout(n);
  }, o = setTimeout(s, 100);
  Ht && (r = requestAnimationFrame(s));
}
function Ge(n) {
  var r = ee, s = n.__c;
  typeof s == "function" && (n.__c = void 0, s()), ee = r;
}
function _t(n) {
  var r = ee;
  n.__c = n.__(), ee = r;
}
function sn(n, r) {
  return !n || n.length !== r.length || r.some(function(s, o) {
    return s !== n[o];
  });
}
function an(n, r) {
  return typeof r == "function" ? r(n) : r;
}
function Ln(n, r) {
  for (var s in r)
    n[s] = r[s];
  return n;
}
function Lt(n, r) {
  for (var s in n)
    if (s !== "__source" && !(s in r))
      return !0;
  for (var o in r)
    if (o !== "__source" && n[o] !== r[o])
      return !0;
  return !1;
}
function Dt(n, r) {
  this.props = n, this.context = r;
}
(Dt.prototype = new xe()).isPureReactComponent = !0, Dt.prototype.shouldComponentUpdate = function(n, r) {
  return Lt(this.props, n) || Lt(this.state, r);
};
var Ot = j.__b;
j.__b = function(n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), Ot && Ot(n);
};
var Dn = j.__e;
j.__e = function(n, r, s, o) {
  if (n.then) {
    for (var e, t = r; t = t.__; )
      if ((e = t.__c) && e.__c)
        return r.__e == null && (r.__e = s.__e, r.__k = s.__k), e.__c(n, r);
  }
  Dn(n, r, s, o);
};
var Wt = j.unmount;
function ln(n, r, s) {
  return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), n.__c.__H = null), (n = Ln({}, n)).__c != null && (n.__c.__P === s && (n.__c.__P = r), n.__c = null), n.__k = n.__k && n.__k.map(function(o) {
    return ln(o, r, s);
  })), n;
}
function cn(n, r, s) {
  return n && s && (n.__v = null, n.__k = n.__k && n.__k.map(function(o) {
    return cn(o, r, s);
  }), n.__c && n.__c.__P === r && (n.__e && s.appendChild(n.__e), n.__c.__e = !0, n.__c.__P = s)), n;
}
function ut() {
  this.__u = 0, this.o = null, this.__b = null;
}
function un(n) {
  var r = n.__.__c;
  return r && r.__a && r.__a(n);
}
function qe() {
  this.i = null, this.l = null;
}
j.unmount = function(n) {
  var r = n.__c;
  r && r.__R && r.__R(), r && 32 & n.__u && (n.type = null), Wt && Wt(n);
}, (ut.prototype = new xe()).__c = function(n, r) {
  var s = r.__c, o = this;
  o.o == null && (o.o = []), o.o.push(s);
  var e = un(o.__v), t = !1, u = function() {
    t || (t = !0, s.__R = null, e ? e(l) : l());
  };
  s.__R = u;
  var l = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var h = o.state.__a;
        o.__v.__k[0] = cn(h, h.__c.__P, h.__c.__O);
      }
      var g;
      for (o.setState({ __a: o.__b = null }); g = o.o.pop(); )
        g.forceUpdate();
    }
  };
  o.__u++ || 32 & r.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), n.then(u, u);
}, ut.prototype.componentWillUnmount = function() {
  this.o = [];
}, ut.prototype.render = function(n, r) {
  if (this.__b) {
    if (this.__v.__k) {
      var s = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = ln(this.__b, s, o.__O = o.__P);
    }
    this.__b = null;
  }
  var e = r.__a && mt(Pe, null, n.fallback);
  return e && (e.__u &= -33), [mt(Pe, null, r.__a ? null : n.children), e];
};
var $t = function(n, r, s) {
  if (++s[1] === s[0] && n.l.delete(r), n.props.revealOrder && (n.props.revealOrder[0] !== "t" || !n.l.size))
    for (s = n.i; s; ) {
      for (; s.length > 3; )
        s.pop()();
      if (s[1] < s[0])
        break;
      n.i = s = s[2];
    }
};
(qe.prototype = new xe()).__a = function(n) {
  var r = this, s = un(r.__v), o = r.l.get(n);
  return o[0]++, function(e) {
    var t = function() {
      r.props.revealOrder ? (o.push(e), $t(r, n, o)) : e();
    };
    s ? s(t) : t();
  };
}, qe.prototype.render = function(n) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var r = Xe(n.children);
  n.revealOrder && n.revealOrder[0] === "b" && r.reverse();
  for (var s = r.length; s--; )
    this.l.set(r[s], this.i = [1, 0, this.i]);
  return n.children;
}, qe.prototype.componentDidUpdate = qe.prototype.componentDidMount = function() {
  var n = this;
  this.l.forEach(function(r, s) {
    $t(n, s, r);
  });
};
var On = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Wn = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, $n = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Bn = /[A-Z0-9]/g, jn = typeof document < "u", Qn = function(n) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(n);
};
function qn(n, r, s) {
  return r.__k == null && (r.textContent = ""), In(n, r), typeof s == "function" && s(), n ? n.__c : null;
}
xe.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n) {
  Object.defineProperty(xe.prototype, n, { configurable: !0, get: function() {
    return this["UNSAFE_" + n];
  }, set: function(r) {
    Object.defineProperty(this, n, { configurable: !0, writable: !0, value: r });
  } });
});
var Bt = j.event;
function Vn() {
}
function Gn() {
  return this.cancelBubble;
}
function Kn() {
  return this.defaultPrevented;
}
j.event = function(n) {
  return Bt && (n = Bt(n)), n.persist = Vn, n.isPropagationStopped = Gn, n.isDefaultPrevented = Kn, n.nativeEvent = n;
};
var Zn = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, jt = j.vnode;
j.vnode = function(n) {
  typeof n.type == "string" && function(r) {
    var s = r.props, o = r.type, e = {}, t = o.indexOf("-") === -1;
    for (var u in s) {
      var l = s[u];
      if (!(u === "value" && "defaultValue" in s && l == null || jn && u === "children" && o === "noscript" || u === "class" || u === "className")) {
        var h = u.toLowerCase();
        u === "defaultValue" && "value" in s && s.value == null ? u = "value" : u === "download" && l === !0 ? l = "" : h === "translate" && l === "no" ? l = !1 : h[0] === "o" && h[1] === "n" ? h === "ondoubleclick" ? u = "ondblclick" : h !== "onchange" || o !== "input" && o !== "textarea" || Qn(s.type) ? h === "onfocus" ? u = "onfocusin" : h === "onblur" ? u = "onfocusout" : $n.test(u) && (u = h) : h = u = "oninput" : t && Wn.test(u) ? u = u.replace(Bn, "-$&").toLowerCase() : l === null && (l = void 0), h === "oninput" && e[u = h] && (u = "oninputCapture"), e[u] = l;
      }
    }
    o == "select" && e.multiple && Array.isArray(e.value) && (e.value = Xe(s.children).forEach(function(g) {
      g.props.selected = e.value.indexOf(g.props.value) != -1;
    })), o == "select" && e.defaultValue != null && (e.value = Xe(s.children).forEach(function(g) {
      g.props.selected = e.multiple ? e.defaultValue.indexOf(g.props.value) != -1 : e.defaultValue == g.props.value;
    })), s.class && !s.className ? (e.class = s.class, Object.defineProperty(e, "className", Zn)) : (s.className && !s.class || s.class && s.className) && (e.class = e.className = s.className), r.props = e;
  }(n), n.$$typeof = On, jt && jt(n);
};
var Qt = j.__r;
j.__r = function(n) {
  Qt && Qt(n), n.__c;
};
var qt = j.diffed;
j.diffed = function(n) {
  qt && qt(n);
  var r = n.props, s = n.__e;
  s != null && n.type === "textarea" && "value" in r && r.value !== s.value && (s.value = r.value == null ? "" : r.value);
};
function Xn(n, r) {
  return r.forEach(function(s) {
    s && typeof s != "string" && !Array.isArray(s) && Object.keys(s).forEach(function(o) {
      if (o !== "default" && !(o in n)) {
        var e = Object.getOwnPropertyDescriptor(s, o);
        Object.defineProperty(n, o, e.get ? e : { enumerable: !0, get: function() {
          return s[o];
        } });
      }
    });
  }), Object.freeze(n);
}
function fn(n, r) {
  return new Promise(function(s, o) {
    let e;
    return Yn(n).then(function(t) {
      try {
        return e = t, s(new Blob([r.slice(0, 2), e, r.slice(2)], { type: "image/jpeg" }));
      } catch (u) {
        return o(u);
      }
    }, o);
  });
}
const Yn = (n) => new Promise((r, s) => {
  const o = new FileReader();
  o.addEventListener("load", ({ target: { result: e } }) => {
    const t = new DataView(e);
    let u = 0;
    if (t.getUint16(u) !== 65496)
      return s("not a valid JPEG");
    for (u += 2; ; ) {
      const l = t.getUint16(u);
      if (l === 65498)
        break;
      const h = t.getUint16(u + 2);
      if (l === 65505 && t.getUint32(u + 4) === 1165519206) {
        const g = u + 10;
        let c;
        switch (t.getUint16(g)) {
          case 18761:
            c = !0;
            break;
          case 19789:
            c = !1;
            break;
          default:
            return s("TIFF header contains invalid endian");
        }
        if (t.getUint16(g + 2, c) !== 42)
          return s("TIFF header contains invalid version");
        const i = t.getUint32(g + 4, c), a = g + i + 2 + 12 * t.getUint16(g + i, c);
        for (let f = g + i + 2; f < a; f += 12)
          if (t.getUint16(f, c) == 274) {
            if (t.getUint16(f + 2, c) !== 3)
              return s("Orientation data type is invalid");
            if (t.getUint32(f + 4, c) !== 1)
              return s("Orientation data count is invalid");
            t.setUint16(f + 8, 1, c);
            break;
          }
        return r(e.slice(u, u + 2 + h));
      }
      u += 2 + h;
    }
    return r(new Blob());
  }), o.readAsArrayBuffer(n);
});
var Je = {}, Jn = { get exports() {
  return Je;
}, set exports(n) {
  Je = n;
} };
(function(n) {
  var r, s, o = {};
  Jn.exports = o, o.parse = function(e, t) {
    for (var u = o.bin.readUshort, l = o.bin.readUint, h = 0, g = {}, c = new Uint8Array(e), i = c.length - 4; l(c, i) != 101010256; )
      i--;
    h = i, h += 4;
    var a = u(c, h += 4);
    u(c, h += 2);
    var f = l(c, h += 2), v = l(c, h += 4);
    h += 4, h = v;
    for (var S = 0; S < a; S++) {
      l(c, h), h += 4, h += 4, h += 4, l(c, h += 4), f = l(c, h += 4);
      var N = l(c, h += 4), b = u(c, h += 4), E = u(c, h + 2), R = u(c, h + 4);
      h += 6;
      var F = l(c, h += 8);
      h += 4, h += b + E + R, o._readLocal(c, F, g, f, N, t);
    }
    return g;
  }, o._readLocal = function(e, t, u, l, h, g) {
    var c = o.bin.readUshort, i = o.bin.readUint;
    i(e, t), c(e, t += 4), c(e, t += 2);
    var a = c(e, t += 2);
    i(e, t += 2), i(e, t += 4), t += 4;
    var f = c(e, t += 8), v = c(e, t += 2);
    t += 2;
    var S = o.bin.readUTF8(e, t, f);
    if (t += f, t += v, g)
      u[S] = { size: h, csize: l };
    else {
      var N = new Uint8Array(e.buffer, t);
      if (a == 0)
        u[S] = new Uint8Array(N.buffer.slice(t, t + l));
      else {
        if (a != 8)
          throw "unknown compression method: " + a;
        var b = new Uint8Array(h);
        o.inflateRaw(N, b), u[S] = b;
      }
    }
  }, o.inflateRaw = function(e, t) {
    return o.F.inflate(e, t);
  }, o.inflate = function(e, t) {
    return e[0], e[1], o.inflateRaw(new Uint8Array(e.buffer, e.byteOffset + 2, e.length - 6), t);
  }, o.deflate = function(e, t) {
    t == null && (t = { level: 6 });
    var u = 0, l = new Uint8Array(50 + Math.floor(1.1 * e.length));
    l[u] = 120, l[u + 1] = 156, u += 2, u = o.F.deflateRaw(e, l, u, t.level);
    var h = o.adler(e, 0, e.length);
    return l[u + 0] = h >>> 24 & 255, l[u + 1] = h >>> 16 & 255, l[u + 2] = h >>> 8 & 255, l[u + 3] = h >>> 0 & 255, new Uint8Array(l.buffer, 0, u + 4);
  }, o.deflateRaw = function(e, t) {
    t == null && (t = { level: 6 });
    var u = new Uint8Array(50 + Math.floor(1.1 * e.length)), l = o.F.deflateRaw(e, u, l, t.level);
    return new Uint8Array(u.buffer, 0, l);
  }, o.encode = function(e, t) {
    t == null && (t = !1);
    var u = 0, l = o.bin.writeUint, h = o.bin.writeUshort, g = {};
    for (var c in e) {
      var i = !o._noNeed(c) && !t, a = e[c], f = o.crc.crc(a, 0, a.length);
      g[c] = { cpr: i, usize: a.length, crc: f, file: i ? o.deflateRaw(a) : a };
    }
    for (var c in g)
      u += g[c].file.length + 30 + 46 + 2 * o.bin.sizeUTF8(c);
    u += 22;
    var v = new Uint8Array(u), S = 0, N = [];
    for (var c in g) {
      var b = g[c];
      N.push(S), S = o._writeHeader(v, S, c, b, 0);
    }
    var E = 0, R = S;
    for (var c in g)
      b = g[c], N.push(S), S = o._writeHeader(v, S, c, b, 1, N[E++]);
    var F = S - R;
    return l(v, S, 101010256), S += 4, h(v, S += 4, E), h(v, S += 2, E), l(v, S += 2, F), l(v, S += 4, R), S += 4, S += 2, v.buffer;
  }, o._noNeed = function(e) {
    var t = e.split(".").pop().toLowerCase();
    return "png,jpg,jpeg,zip".indexOf(t) != -1;
  }, o._writeHeader = function(e, t, u, l, h, g) {
    var c = o.bin.writeUint, i = o.bin.writeUshort, a = l.file;
    return c(e, t, h == 0 ? 67324752 : 33639248), t += 4, h == 1 && (t += 2), i(e, t, 20), i(e, t += 2, 0), i(e, t += 2, l.cpr ? 8 : 0), c(e, t += 2, 0), c(e, t += 4, l.crc), c(e, t += 4, a.length), c(e, t += 4, l.usize), i(e, t += 4, o.bin.sizeUTF8(u)), i(e, t += 2, 0), t += 2, h == 1 && (t += 2, t += 2, c(e, t += 6, g), t += 4), t += o.bin.writeUTF8(e, t, u), h == 0 && (e.set(a, t), t += a.length), t;
  }, o.crc = { table: function() {
    for (var e = new Uint32Array(256), t = 0; t < 256; t++) {
      for (var u = t, l = 0; l < 8; l++)
        1 & u ? u = 3988292384 ^ u >>> 1 : u >>>= 1;
      e[t] = u;
    }
    return e;
  }(), update: function(e, t, u, l) {
    for (var h = 0; h < l; h++)
      e = o.crc.table[255 & (e ^ t[u + h])] ^ e >>> 8;
    return e;
  }, crc: function(e, t, u) {
    return 4294967295 ^ o.crc.update(4294967295, e, t, u);
  } }, o.adler = function(e, t, u) {
    for (var l = 1, h = 0, g = t, c = t + u; g < c; ) {
      for (var i = Math.min(g + 5552, c); g < i; )
        h += l += e[g++];
      l %= 65521, h %= 65521;
    }
    return h << 16 | l;
  }, o.bin = { readUshort: function(e, t) {
    return e[t] | e[t + 1] << 8;
  }, writeUshort: function(e, t, u) {
    e[t] = 255 & u, e[t + 1] = u >> 8 & 255;
  }, readUint: function(e, t) {
    return 16777216 * e[t + 3] + (e[t + 2] << 16 | e[t + 1] << 8 | e[t]);
  }, writeUint: function(e, t, u) {
    e[t] = 255 & u, e[t + 1] = u >> 8 & 255, e[t + 2] = u >> 16 & 255, e[t + 3] = u >> 24 & 255;
  }, readASCII: function(e, t, u) {
    for (var l = "", h = 0; h < u; h++)
      l += String.fromCharCode(e[t + h]);
    return l;
  }, writeASCII: function(e, t, u) {
    for (var l = 0; l < u.length; l++)
      e[t + l] = u.charCodeAt(l);
  }, pad: function(e) {
    return e.length < 2 ? "0" + e : e;
  }, readUTF8: function(e, t, u) {
    for (var l, h = "", g = 0; g < u; g++)
      h += "%" + o.bin.pad(e[t + g].toString(16));
    try {
      l = decodeURIComponent(h);
    } catch {
      return o.bin.readASCII(e, t, u);
    }
    return l;
  }, writeUTF8: function(e, t, u) {
    for (var l = u.length, h = 0, g = 0; g < l; g++) {
      var c = u.charCodeAt(g);
      if (!(4294967168 & c))
        e[t + h] = c, h++;
      else if (!(4294965248 & c))
        e[t + h] = 192 | c >> 6, e[t + h + 1] = 128 | c >> 0 & 63, h += 2;
      else if (!(4294901760 & c))
        e[t + h] = 224 | c >> 12, e[t + h + 1] = 128 | c >> 6 & 63, e[t + h + 2] = 128 | c >> 0 & 63, h += 3;
      else {
        if (4292870144 & c)
          throw "e";
        e[t + h] = 240 | c >> 18, e[t + h + 1] = 128 | c >> 12 & 63, e[t + h + 2] = 128 | c >> 6 & 63, e[t + h + 3] = 128 | c >> 0 & 63, h += 4;
      }
    }
    return h;
  }, sizeUTF8: function(e) {
    for (var t = e.length, u = 0, l = 0; l < t; l++) {
      var h = e.charCodeAt(l);
      if (!(4294967168 & h))
        u++;
      else if (!(4294965248 & h))
        u += 2;
      else if (!(4294901760 & h))
        u += 3;
      else {
        if (4292870144 & h)
          throw "e";
        u += 4;
      }
    }
    return u;
  } }, o.F = {}, o.F.deflateRaw = function(e, t, u, l) {
    var h = [[0, 0, 0, 0, 0], [4, 4, 8, 4, 0], [4, 5, 16, 8, 0], [4, 6, 16, 16, 0], [4, 10, 16, 32, 0], [8, 16, 32, 32, 0], [8, 16, 128, 128, 0], [8, 32, 128, 256, 0], [32, 128, 258, 1024, 1], [32, 258, 258, 4096, 1]][l], g = o.F.U, c = o.F._goodIndex;
    o.F._hash;
    var i = o.F._putsE, a = 0, f = u << 3, v = 0, S = e.length;
    if (l == 0) {
      for (; a < S; )
        i(t, f, a + (C = Math.min(65535, S - a)) == S ? 1 : 0), f = o.F._copyExact(e, a, C, t, f + 8), a += C;
      return f >>> 3;
    }
    var N = g.lits, b = g.strt, E = g.prev, R = 0, F = 0, H = 0, y = 0, z = 0, d = 0;
    for (S > 2 && (b[d = o.F._hash(e, 0)] = 0), a = 0; a < S; a++) {
      if (z = d, a + 1 < S - 2) {
        d = o.F._hash(e, a + 1);
        var m = a + 1 & 32767;
        E[m] = b[d], b[d] = m;
      }
      if (v <= a) {
        (R > 14e3 || F > 26697) && S - a > 100 && (v < a && (N[R] = a - v, R += 2, v = a), f = o.F._writeBlock(a == S - 1 || v == S ? 1 : 0, N, R, y, e, H, a - H, t, f), R = F = y = 0, H = a);
        var w = 0;
        a < S - 2 && (w = o.F._bestMatch(e, a, E, z, Math.min(h[2], S - a), h[3]));
        var C = w >>> 16, x = 65535 & w;
        if (w != 0) {
          x = 65535 & w;
          var k = c(C = w >>> 16, g.of0);
          g.lhst[257 + k]++;
          var A = c(x, g.df0);
          g.dhst[A]++, y += g.exb[k] + g.dxb[A], N[R] = C << 23 | a - v, N[R + 1] = x << 16 | k << 8 | A, R += 2, v = a + C;
        } else
          g.lhst[e[a]]++;
        F++;
      }
    }
    for (H == a && e.length != 0 || (v < a && (N[R] = a - v, R += 2, v = a), f = o.F._writeBlock(1, N, R, y, e, H, a - H, t, f), R = 0, F = 0, R = F = y = 0, H = a); 7 & f; )
      f++;
    return f >>> 3;
  }, o.F._bestMatch = function(e, t, u, l, h, g) {
    var c = 32767 & t, i = u[c], a = c - i + 32768 & 32767;
    if (i == c || l != o.F._hash(e, t - a))
      return 0;
    for (var f = 0, v = 0, S = Math.min(32767, t); a <= S && --g != 0 && i != c; ) {
      if (f == 0 || e[t + f] == e[t + f - a]) {
        var N = o.F._howLong(e, t, a);
        if (N > f) {
          if (v = a, (f = N) >= h)
            break;
          a + 2 < N && (N = a + 2);
          for (var b = 0, E = 0; E < N - 2; E++) {
            var R = t - a + E + 32768 & 32767, F = R - u[R] + 32768 & 32767;
            F > b && (b = F, i = R);
          }
        }
      }
      a += (c = i) - (i = u[c]) + 32768 & 32767;
    }
    return f << 16 | v;
  }, o.F._howLong = function(e, t, u) {
    if (e[t] != e[t - u] || e[t + 1] != e[t + 1 - u] || e[t + 2] != e[t + 2 - u])
      return 0;
    var l = t, h = Math.min(e.length, t + 258);
    for (t += 3; t < h && e[t] == e[t - u]; )
      t++;
    return t - l;
  }, o.F._hash = function(e, t) {
    return (e[t] << 8 | e[t + 1]) + (e[t + 2] << 4) & 65535;
  }, o.saved = 0, o.F._writeBlock = function(e, t, u, l, h, g, c, i, a) {
    var f, v, S, N, b, E, R, F, H, y = o.F.U, z = o.F._putsF, d = o.F._putsE;
    y.lhst[256]++, v = (f = o.F.getTrees())[0], S = f[1], N = f[2], b = f[3], E = f[4], R = f[5], F = f[6], H = f[7];
    var m = 32 + (a + 3 & 7 ? 8 - (a + 3 & 7) : 0) + (c << 3), w = l + o.F.contSize(y.fltree, y.lhst) + o.F.contSize(y.fdtree, y.dhst), C = l + o.F.contSize(y.ltree, y.lhst) + o.F.contSize(y.dtree, y.dhst);
    C += 14 + 3 * R + o.F.contSize(y.itree, y.ihst) + (2 * y.ihst[16] + 3 * y.ihst[17] + 7 * y.ihst[18]);
    for (var x = 0; x < 286; x++)
      y.lhst[x] = 0;
    for (x = 0; x < 30; x++)
      y.dhst[x] = 0;
    for (x = 0; x < 19; x++)
      y.ihst[x] = 0;
    var k = m < w && m < C ? 0 : w < C ? 1 : 2;
    if (z(i, a, e), z(i, a + 1, k), a += 3, k == 0) {
      for (; 7 & a; )
        a++;
      a = o.F._copyExact(h, g, c, i, a);
    } else {
      var A, U;
      if (k == 1 && (A = y.fltree, U = y.fdtree), k == 2) {
        o.F.makeCodes(y.ltree, v), o.F.revCodes(y.ltree, v), o.F.makeCodes(y.dtree, S), o.F.revCodes(y.dtree, S), o.F.makeCodes(y.itree, N), o.F.revCodes(y.itree, N), A = y.ltree, U = y.dtree, d(i, a, b - 257), d(i, a += 5, E - 1), d(i, a += 5, R - 4), a += 4;
        for (var p = 0; p < R; p++)
          d(i, a + 3 * p, y.itree[1 + (y.ordr[p] << 1)]);
        a += 3 * R, a = o.F._codeTiny(F, y.itree, i, a), a = o.F._codeTiny(H, y.itree, i, a);
      }
      for (var _ = g, L = 0; L < u; L += 2) {
        for (var M = t[L], T = M >>> 23, $ = _ + (8388607 & M); _ < $; )
          a = o.F._writeLit(h[_++], A, i, a);
        if (T != 0) {
          var O = t[L + 1], W = O >> 16, D = O >> 8 & 255, P = 255 & O;
          d(i, a = o.F._writeLit(257 + D, A, i, a), T - y.of0[D]), a += y.exb[D], z(i, a = o.F._writeLit(P, U, i, a), W - y.df0[P]), a += y.dxb[P], _ += T;
        }
      }
      a = o.F._writeLit(256, A, i, a);
    }
    return a;
  }, o.F._copyExact = function(e, t, u, l, h) {
    var g = h >>> 3;
    return l[g] = u, l[g + 1] = u >>> 8, l[g + 2] = 255 - l[g], l[g + 3] = 255 - l[g + 1], g += 4, l.set(new Uint8Array(e.buffer, t, u), g), h + (u + 4 << 3);
  }, o.F.getTrees = function() {
    for (var e = o.F.U, t = o.F._hufTree(e.lhst, e.ltree, 15), u = o.F._hufTree(e.dhst, e.dtree, 15), l = [], h = o.F._lenCodes(e.ltree, l), g = [], c = o.F._lenCodes(e.dtree, g), i = 0; i < l.length; i += 2)
      e.ihst[l[i]]++;
    for (i = 0; i < g.length; i += 2)
      e.ihst[g[i]]++;
    for (var a = o.F._hufTree(e.ihst, e.itree, 7), f = 19; f > 4 && e.itree[1 + (e.ordr[f - 1] << 1)] == 0; )
      f--;
    return [t, u, a, h, c, f, l, g];
  }, o.F.getSecond = function(e) {
    for (var t = [], u = 0; u < e.length; u += 2)
      t.push(e[u + 1]);
    return t;
  }, o.F.nonZero = function(e) {
    for (var t = "", u = 0; u < e.length; u += 2)
      e[u + 1] != 0 && (t += (u >> 1) + ",");
    return t;
  }, o.F.contSize = function(e, t) {
    for (var u = 0, l = 0; l < t.length; l++)
      u += t[l] * e[1 + (l << 1)];
    return u;
  }, o.F._codeTiny = function(e, t, u, l) {
    for (var h = 0; h < e.length; h += 2) {
      var g = e[h], c = e[h + 1];
      l = o.F._writeLit(g, t, u, l);
      var i = g == 16 ? 2 : g == 17 ? 3 : 7;
      g > 15 && (o.F._putsE(u, l, c, i), l += i);
    }
    return l;
  }, o.F._lenCodes = function(e, t) {
    for (var u = e.length; u != 2 && e[u - 1] == 0; )
      u -= 2;
    for (var l = 0; l < u; l += 2) {
      var h = e[l + 1], g = l + 3 < u ? e[l + 3] : -1, c = l + 5 < u ? e[l + 5] : -1, i = l == 0 ? -1 : e[l - 1];
      if (h == 0 && g == h && c == h) {
        for (var a = l + 5; a + 2 < u && e[a + 2] == h; )
          a += 2;
        (f = Math.min(a + 1 - l >>> 1, 138)) < 11 ? t.push(17, f - 3) : t.push(18, f - 11), l += 2 * f - 2;
      } else if (h == i && g == h && c == h) {
        for (a = l + 5; a + 2 < u && e[a + 2] == h; )
          a += 2;
        var f = Math.min(a + 1 - l >>> 1, 6);
        t.push(16, f - 3), l += 2 * f - 2;
      } else
        t.push(h, 0);
    }
    return u >>> 1;
  }, o.F._hufTree = function(e, t, u) {
    var l = [], h = e.length, g = t.length, c = 0;
    for (c = 0; c < g; c += 2)
      t[c] = 0, t[c + 1] = 0;
    for (c = 0; c < h; c++)
      e[c] != 0 && l.push({ lit: c, f: e[c] });
    var i = l.length, a = l.slice(0);
    if (i == 0)
      return 0;
    if (i == 1) {
      var f = l[0].lit;
      return a = f == 0 ? 1 : 0, t[1 + (f << 1)] = 1, t[1 + (a << 1)] = 1, 1;
    }
    l.sort(function(F, H) {
      return F.f - H.f;
    });
    var v = l[0], S = l[1], N = 0, b = 1, E = 2;
    for (l[0] = { lit: -1, f: v.f + S.f, l: v, r: S, d: 0 }; b != i - 1; )
      v = N != b && (E == i || l[N].f < l[E].f) ? l[N++] : l[E++], S = N != b && (E == i || l[N].f < l[E].f) ? l[N++] : l[E++], l[b++] = { lit: -1, f: v.f + S.f, l: v, r: S };
    var R = o.F.setDepth(l[b - 1], 0);
    for (R > u && (o.F.restrictDepth(a, u, R), R = u), c = 0; c < i; c++)
      t[1 + (a[c].lit << 1)] = a[c].d;
    return R;
  }, o.F.setDepth = function(e, t) {
    return e.lit != -1 ? (e.d = t, t) : Math.max(o.F.setDepth(e.l, t + 1), o.F.setDepth(e.r, t + 1));
  }, o.F.restrictDepth = function(e, t, u) {
    var l = 0, h = 1 << u - t, g = 0;
    for (e.sort(function(i, a) {
      return a.d == i.d ? i.f - a.f : a.d - i.d;
    }), l = 0; l < e.length && e[l].d > t; l++) {
      var c = e[l].d;
      e[l].d = t, g += h - (1 << u - c);
    }
    for (g >>>= u - t; g > 0; )
      (c = e[l].d) < t ? (e[l].d++, g -= 1 << t - c - 1) : l++;
    for (; l >= 0; l--)
      e[l].d == t && g < 0 && (e[l].d--, g++);
    g != 0 && console.log("debt left");
  }, o.F._goodIndex = function(e, t) {
    var u = 0;
    return t[16 | u] <= e && (u |= 16), t[8 | u] <= e && (u |= 8), t[4 | u] <= e && (u |= 4), t[2 | u] <= e && (u |= 2), t[1 | u] <= e && (u |= 1), u;
  }, o.F._writeLit = function(e, t, u, l) {
    return o.F._putsF(u, l, t[e << 1]), l + t[1 + (e << 1)];
  }, o.F.inflate = function(e, t) {
    var u = Uint8Array;
    if (e[0] == 3 && e[1] == 0)
      return t || new u(0);
    var l = o.F, h = l._bitsF, g = l._bitsE, c = l._decodeTiny, i = l.makeCodes, a = l.codes2map, f = l._get17, v = l.U, S = t == null;
    S && (t = new u(e.length >>> 2 << 3));
    for (var N, b, E = 0, R = 0, F = 0, H = 0, y = 0, z = 0, d = 0, m = 0, w = 0; E == 0; )
      if (E = h(e, w, 1), R = h(e, w + 1, 2), w += 3, R != 0) {
        if (S && (t = o.F._check(t, m + (1 << 17))), R == 1 && (N = v.flmap, b = v.fdmap, z = 511, d = 31), R == 2) {
          F = g(e, w, 5) + 257, H = g(e, w + 5, 5) + 1, y = g(e, w + 10, 4) + 4, w += 14;
          for (var C = 0; C < 38; C += 2)
            v.itree[C] = 0, v.itree[C + 1] = 0;
          var x = 1;
          for (C = 0; C < y; C++) {
            var k = g(e, w + 3 * C, 3);
            v.itree[1 + (v.ordr[C] << 1)] = k, k > x && (x = k);
          }
          w += 3 * y, i(v.itree, x), a(v.itree, x, v.imap), N = v.lmap, b = v.dmap, w = c(v.imap, (1 << x) - 1, F + H, e, w, v.ttree);
          var A = l._copyOut(v.ttree, 0, F, v.ltree);
          z = (1 << A) - 1;
          var U = l._copyOut(v.ttree, F, H, v.dtree);
          d = (1 << U) - 1, i(v.ltree, A), a(v.ltree, A, N), i(v.dtree, U), a(v.dtree, U, b);
        }
        for (; ; ) {
          var p = N[f(e, w) & z];
          w += 15 & p;
          var _ = p >>> 4;
          if (!(_ >>> 8))
            t[m++] = _;
          else {
            if (_ == 256)
              break;
            var L = m + _ - 254;
            if (_ > 264) {
              var M = v.ldef[_ - 257];
              L = m + (M >>> 3) + g(e, w, 7 & M), w += 7 & M;
            }
            var T = b[f(e, w) & d];
            w += 15 & T;
            var $ = T >>> 4, O = v.ddef[$], W = (O >>> 4) + h(e, w, 15 & O);
            for (w += 15 & O, S && (t = o.F._check(t, m + (1 << 17))); m < L; )
              t[m] = t[m++ - W], t[m] = t[m++ - W], t[m] = t[m++ - W], t[m] = t[m++ - W];
            m = L;
          }
        }
      } else {
        7 & w && (w += 8 - (7 & w));
        var D = 4 + (w >>> 3), P = e[D - 4] | e[D - 3] << 8;
        S && (t = o.F._check(t, m + P)), t.set(new u(e.buffer, e.byteOffset + D, P), m), w = D + P << 3, m += P;
      }
    return t.length == m ? t : t.slice(0, m);
  }, o.F._check = function(e, t) {
    var u = e.length;
    if (t <= u)
      return e;
    var l = new Uint8Array(Math.max(u << 1, t));
    return l.set(e, 0), l;
  }, o.F._decodeTiny = function(e, t, u, l, h, g) {
    for (var c = o.F._bitsE, i = o.F._get17, a = 0; a < u; ) {
      var f = e[i(l, h) & t];
      h += 15 & f;
      var v = f >>> 4;
      if (v <= 15)
        g[a] = v, a++;
      else {
        var S = 0, N = 0;
        v == 16 ? (N = 3 + c(l, h, 2), h += 2, S = g[a - 1]) : v == 17 ? (N = 3 + c(l, h, 3), h += 3) : v == 18 && (N = 11 + c(l, h, 7), h += 7);
        for (var b = a + N; a < b; )
          g[a] = S, a++;
      }
    }
    return h;
  }, o.F._copyOut = function(e, t, u, l) {
    for (var h = 0, g = 0, c = l.length >>> 1; g < u; ) {
      var i = e[g + t];
      l[g << 1] = 0, l[1 + (g << 1)] = i, i > h && (h = i), g++;
    }
    for (; g < c; )
      l[g << 1] = 0, l[1 + (g << 1)] = 0, g++;
    return h;
  }, o.F.makeCodes = function(e, t) {
    for (var u, l, h, g, c = o.F.U, i = e.length, a = c.bl_count, f = 0; f <= t; f++)
      a[f] = 0;
    for (f = 1; f < i; f += 2)
      a[e[f]]++;
    var v = c.next_code;
    for (u = 0, a[0] = 0, l = 1; l <= t; l++)
      u = u + a[l - 1] << 1, v[l] = u;
    for (h = 0; h < i; h += 2)
      (g = e[h + 1]) != 0 && (e[h] = v[g], v[g]++);
  }, o.F.codes2map = function(e, t, u) {
    for (var l = e.length, h = o.F.U.rev15, g = 0; g < l; g += 2)
      if (e[g + 1] != 0)
        for (var c = g >> 1, i = e[g + 1], a = c << 4 | i, f = t - i, v = e[g] << f, S = v + (1 << f); v != S; )
          u[h[v] >>> 15 - t] = a, v++;
  }, o.F.revCodes = function(e, t) {
    for (var u = o.F.U.rev15, l = 15 - t, h = 0; h < e.length; h += 2) {
      var g = e[h] << t - e[h + 1];
      e[h] = u[g] >>> l;
    }
  }, o.F._putsE = function(e, t, u) {
    u <<= 7 & t;
    var l = t >>> 3;
    e[l] |= u, e[l + 1] |= u >>> 8;
  }, o.F._putsF = function(e, t, u) {
    u <<= 7 & t;
    var l = t >>> 3;
    e[l] |= u, e[l + 1] |= u >>> 8, e[l + 2] |= u >>> 16;
  }, o.F._bitsE = function(e, t, u) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8) >>> (7 & t) & (1 << u) - 1;
  }, o.F._bitsF = function(e, t, u) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8 | e[2 + (t >>> 3)] << 16) >>> (7 & t) & (1 << u) - 1;
  }, o.F._get17 = function(e, t) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8 | e[2 + (t >>> 3)] << 16) >>> (7 & t);
  }, o.F._get25 = function(e, t) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8 | e[2 + (t >>> 3)] << 16 | e[3 + (t >>> 3)] << 24) >>> (7 & t);
  }, o.F.U = (r = Uint16Array, s = Uint32Array, { next_code: new r(16), bl_count: new r(16), ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], ldef: new r(32), df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], ddef: new s(32), flmap: new r(512), fltree: [], fdmap: new r(32), fdtree: [], lmap: new r(32768), ltree: [], ttree: [], dmap: new r(32768), dtree: [], imap: new r(512), itree: [], rev15: new r(32768), lhst: new s(286), dhst: new s(30), ihst: new s(19), lits: new s(15e3), strt: new r(65536), prev: new r(32768) }), function() {
    for (var e = o.F.U, t = 0; t < 32768; t++) {
      var u = t;
      u = (4278255360 & (u = (4042322160 & (u = (3435973836 & (u = (2863311530 & u) >>> 1 | (1431655765 & u) << 1)) >>> 2 | (858993459 & u) << 2)) >>> 4 | (252645135 & u) << 4)) >>> 8 | (16711935 & u) << 8, e.rev15[t] = (u >>> 16 | u << 16) >>> 17;
    }
    function l(h, g, c) {
      for (; g-- != 0; )
        h.push(0, c);
    }
    for (t = 0; t < 32; t++)
      e.ldef[t] = e.of0[t] << 3 | e.exb[t], e.ddef[t] = e.df0[t] << 4 | e.dxb[t];
    l(e.fltree, 144, 8), l(e.fltree, 112, 9), l(e.fltree, 24, 7), l(e.fltree, 8, 8), o.F.makeCodes(e.fltree, 9), o.F.codes2map(e.fltree, 9, e.flmap), o.F.revCodes(e.fltree, 9), l(e.fdtree, 32, 5), o.F.makeCodes(e.fdtree, 5), o.F.codes2map(e.fdtree, 5, e.fdmap), o.F.revCodes(e.fdtree, 5), l(e.itree, 19, 0), l(e.ltree, 286, 0), l(e.dtree, 30, 0), l(e.ttree, 320, 0);
  }();
})();
var er = Xn({ __proto__: null, default: Je }, [Je]);
const ge = function() {
  var n = { nextZero(c, i) {
    for (; c[i] != 0; )
      i++;
    return i;
  }, readUshort: (c, i) => c[i] << 8 | c[i + 1], writeUshort(c, i, a) {
    c[i] = a >> 8 & 255, c[i + 1] = 255 & a;
  }, readUint: (c, i) => 16777216 * c[i] + (c[i + 1] << 16 | c[i + 2] << 8 | c[i + 3]), writeUint(c, i, a) {
    c[i] = a >> 24 & 255, c[i + 1] = a >> 16 & 255, c[i + 2] = a >> 8 & 255, c[i + 3] = 255 & a;
  }, readASCII(c, i, a) {
    let f = "";
    for (let v = 0; v < a; v++)
      f += String.fromCharCode(c[i + v]);
    return f;
  }, writeASCII(c, i, a) {
    for (let f = 0; f < a.length; f++)
      c[i + f] = a.charCodeAt(f);
  }, readBytes(c, i, a) {
    const f = [];
    for (let v = 0; v < a; v++)
      f.push(c[i + v]);
    return f;
  }, pad: (c) => c.length < 2 ? `0${c}` : c, readUTF8(c, i, a) {
    let f, v = "";
    for (let S = 0; S < a; S++)
      v += `%${n.pad(c[i + S].toString(16))}`;
    try {
      f = decodeURIComponent(v);
    } catch {
      return n.readASCII(c, i, a);
    }
    return f;
  } };
  function r(c, i, a, f) {
    const v = i * a, S = t(f), N = Math.ceil(i * S / 8), b = new Uint8Array(4 * v), E = new Uint32Array(b.buffer), { ctype: R } = f, { depth: F } = f, H = n.readUshort;
    if (R == 6) {
      const M = v << 2;
      if (F == 8)
        for (var y = 0; y < M; y += 4)
          b[y] = c[y], b[y + 1] = c[y + 1], b[y + 2] = c[y + 2], b[y + 3] = c[y + 3];
      if (F == 16)
        for (y = 0; y < M; y++)
          b[y] = c[y << 1];
    } else if (R == 2) {
      const M = f.tabs.tRNS;
      if (M == null) {
        if (F == 8)
          for (y = 0; y < v; y++) {
            var z = 3 * y;
            E[y] = 255 << 24 | c[z + 2] << 16 | c[z + 1] << 8 | c[z];
          }
        if (F == 16)
          for (y = 0; y < v; y++)
            z = 6 * y, E[y] = 255 << 24 | c[z + 4] << 16 | c[z + 2] << 8 | c[z];
      } else {
        var d = M[0];
        const T = M[1], $ = M[2];
        if (F == 8)
          for (y = 0; y < v; y++) {
            var m = y << 2;
            z = 3 * y, E[y] = 255 << 24 | c[z + 2] << 16 | c[z + 1] << 8 | c[z], c[z] == d && c[z + 1] == T && c[z + 2] == $ && (b[m + 3] = 0);
          }
        if (F == 16)
          for (y = 0; y < v; y++)
            m = y << 2, z = 6 * y, E[y] = 255 << 24 | c[z + 4] << 16 | c[z + 2] << 8 | c[z], H(c, z) == d && H(c, z + 2) == T && H(c, z + 4) == $ && (b[m + 3] = 0);
      }
    } else if (R == 3) {
      const M = f.tabs.PLTE, T = f.tabs.tRNS, $ = T ? T.length : 0;
      if (F == 1)
        for (var w = 0; w < a; w++) {
          var C = w * N, x = w * i;
          for (y = 0; y < i; y++) {
            m = x + y << 2;
            var k = 3 * (A = c[C + (y >> 3)] >> 7 - ((7 & y) << 0) & 1);
            b[m] = M[k], b[m + 1] = M[k + 1], b[m + 2] = M[k + 2], b[m + 3] = A < $ ? T[A] : 255;
          }
        }
      if (F == 2)
        for (w = 0; w < a; w++)
          for (C = w * N, x = w * i, y = 0; y < i; y++)
            m = x + y << 2, k = 3 * (A = c[C + (y >> 2)] >> 6 - ((3 & y) << 1) & 3), b[m] = M[k], b[m + 1] = M[k + 1], b[m + 2] = M[k + 2], b[m + 3] = A < $ ? T[A] : 255;
      if (F == 4)
        for (w = 0; w < a; w++)
          for (C = w * N, x = w * i, y = 0; y < i; y++)
            m = x + y << 2, k = 3 * (A = c[C + (y >> 1)] >> 4 - ((1 & y) << 2) & 15), b[m] = M[k], b[m + 1] = M[k + 1], b[m + 2] = M[k + 2], b[m + 3] = A < $ ? T[A] : 255;
      if (F == 8)
        for (y = 0; y < v; y++) {
          var A;
          m = y << 2, k = 3 * (A = c[y]), b[m] = M[k], b[m + 1] = M[k + 1], b[m + 2] = M[k + 2], b[m + 3] = A < $ ? T[A] : 255;
        }
    } else if (R == 4) {
      if (F == 8)
        for (y = 0; y < v; y++) {
          m = y << 2;
          var U = c[p = y << 1];
          b[m] = U, b[m + 1] = U, b[m + 2] = U, b[m + 3] = c[p + 1];
        }
      if (F == 16)
        for (y = 0; y < v; y++) {
          var p;
          m = y << 2, U = c[p = y << 2], b[m] = U, b[m + 1] = U, b[m + 2] = U, b[m + 3] = c[p + 2];
        }
    } else if (R == 0)
      for (d = f.tabs.tRNS ? f.tabs.tRNS : -1, w = 0; w < a; w++) {
        const M = w * N, T = w * i;
        if (F == 1)
          for (var _ = 0; _ < i; _++) {
            var L = (U = 255 * (c[M + (_ >>> 3)] >>> 7 - (7 & _) & 1)) == 255 * d ? 0 : 255;
            E[T + _] = L << 24 | U << 16 | U << 8 | U;
          }
        else if (F == 2)
          for (_ = 0; _ < i; _++)
            L = (U = 85 * (c[M + (_ >>> 2)] >>> 6 - ((3 & _) << 1) & 3)) == 85 * d ? 0 : 255, E[T + _] = L << 24 | U << 16 | U << 8 | U;
        else if (F == 4)
          for (_ = 0; _ < i; _++)
            L = (U = 17 * (c[M + (_ >>> 1)] >>> 4 - ((1 & _) << 2) & 15)) == 17 * d ? 0 : 255, E[T + _] = L << 24 | U << 16 | U << 8 | U;
        else if (F == 8)
          for (_ = 0; _ < i; _++)
            L = (U = c[M + _]) == d ? 0 : 255, E[T + _] = L << 24 | U << 16 | U << 8 | U;
        else if (F == 16)
          for (_ = 0; _ < i; _++)
            U = c[M + (_ << 1)], L = H(c, M + (_ << 1)) == d ? 0 : 255, E[T + _] = L << 24 | U << 16 | U << 8 | U;
      }
    return b;
  }
  function s(c, i, a, f) {
    const v = t(c), S = Math.ceil(a * v / 8), N = new Uint8Array((S + 1 + c.interlace) * f);
    return i = c.tabs.CgBI ? e(i, N) : o(i, N), c.interlace == 0 ? i = u(i, c, 0, a, f) : c.interlace == 1 && (i = function(E, R) {
      const F = R.width, H = R.height, y = t(R), z = y >> 3, d = Math.ceil(F * y / 8), m = new Uint8Array(H * d);
      let w = 0;
      const C = [0, 0, 4, 0, 2, 0, 1], x = [0, 4, 0, 2, 0, 1, 0], k = [8, 8, 8, 4, 4, 2, 2], A = [8, 8, 4, 4, 2, 2, 1];
      let U = 0;
      for (; U < 7; ) {
        const _ = k[U], L = A[U];
        let M = 0, T = 0, $ = C[U];
        for (; $ < H; )
          $ += _, T++;
        let O = x[U];
        for (; O < F; )
          O += L, M++;
        const W = Math.ceil(M * y / 8);
        u(E, R, w, M, T);
        let D = 0, P = C[U];
        for (; P < H; ) {
          let B = x[U], Z = w + D * W << 3;
          for (; B < F; ) {
            var p;
            if (y == 1 && (p = (p = E[Z >> 3]) >> 7 - (7 & Z) & 1, m[P * d + (B >> 3)] |= p << 7 - ((7 & B) << 0)), y == 2 && (p = (p = E[Z >> 3]) >> 6 - (7 & Z) & 3, m[P * d + (B >> 2)] |= p << 6 - ((3 & B) << 1)), y == 4 && (p = (p = E[Z >> 3]) >> 4 - (7 & Z) & 15, m[P * d + (B >> 1)] |= p << 4 - ((1 & B) << 2)), y >= 8) {
              const q = P * d + B * z;
              for (let Q = 0; Q < z; Q++)
                m[q + Q] = E[(Z >> 3) + Q];
            }
            Z += y, B += L;
          }
          D++, P += _;
        }
        M * T != 0 && (w += T * (1 + W)), U += 1;
      }
      return m;
    }(i, c)), i;
  }
  function o(c, i) {
    return e(new Uint8Array(c.buffer, 2, c.length - 6), i);
  }
  var e = function() {
    const c = { H: {} };
    return c.H.N = function(i, a) {
      const f = Uint8Array;
      let v, S, N = 0, b = 0, E = 0, R = 0, F = 0, H = 0, y = 0, z = 0, d = 0;
      if (i[0] == 3 && i[1] == 0)
        return a || new f(0);
      const m = c.H, w = m.b, C = m.e, x = m.R, k = m.n, A = m.A, U = m.Z, p = m.m, _ = a == null;
      for (_ && (a = new f(i.length >>> 2 << 5)); N == 0; )
        if (N = w(i, d, 1), b = w(i, d + 1, 2), d += 3, b != 0) {
          if (_ && (a = c.H.W(a, z + (1 << 17))), b == 1 && (v = p.J, S = p.h, H = 511, y = 31), b == 2) {
            E = C(i, d, 5) + 257, R = C(i, d + 5, 5) + 1, F = C(i, d + 10, 4) + 4, d += 14;
            let M = 1;
            for (var L = 0; L < 38; L += 2)
              p.Q[L] = 0, p.Q[L + 1] = 0;
            for (L = 0; L < F; L++) {
              const O = C(i, d + 3 * L, 3);
              p.Q[1 + (p.X[L] << 1)] = O, O > M && (M = O);
            }
            d += 3 * F, k(p.Q, M), A(p.Q, M, p.u), v = p.w, S = p.d, d = x(p.u, (1 << M) - 1, E + R, i, d, p.v);
            const T = m.V(p.v, 0, E, p.C);
            H = (1 << T) - 1;
            const $ = m.V(p.v, E, R, p.D);
            y = (1 << $) - 1, k(p.C, T), A(p.C, T, v), k(p.D, $), A(p.D, $, S);
          }
          for (; ; ) {
            const M = v[U(i, d) & H];
            d += 15 & M;
            const T = M >>> 4;
            if (!(T >>> 8))
              a[z++] = T;
            else {
              if (T == 256)
                break;
              {
                let $ = z + T - 254;
                if (T > 264) {
                  const B = p.q[T - 257];
                  $ = z + (B >>> 3) + C(i, d, 7 & B), d += 7 & B;
                }
                const O = S[U(i, d) & y];
                d += 15 & O;
                const W = O >>> 4, D = p.c[W], P = (D >>> 4) + w(i, d, 15 & D);
                for (d += 15 & D; z < $; )
                  a[z] = a[z++ - P], a[z] = a[z++ - P], a[z] = a[z++ - P], a[z] = a[z++ - P];
                z = $;
              }
            }
          }
        } else {
          7 & d && (d += 8 - (7 & d));
          const M = 4 + (d >>> 3), T = i[M - 4] | i[M - 3] << 8;
          _ && (a = c.H.W(a, z + T)), a.set(new f(i.buffer, i.byteOffset + M, T), z), d = M + T << 3, z += T;
        }
      return a.length == z ? a : a.slice(0, z);
    }, c.H.W = function(i, a) {
      const f = i.length;
      if (a <= f)
        return i;
      const v = new Uint8Array(f << 1);
      return v.set(i, 0), v;
    }, c.H.R = function(i, a, f, v, S, N) {
      const b = c.H.e, E = c.H.Z;
      let R = 0;
      for (; R < f; ) {
        const F = i[E(v, S) & a];
        S += 15 & F;
        const H = F >>> 4;
        if (H <= 15)
          N[R] = H, R++;
        else {
          let y = 0, z = 0;
          H == 16 ? (z = 3 + b(v, S, 2), S += 2, y = N[R - 1]) : H == 17 ? (z = 3 + b(v, S, 3), S += 3) : H == 18 && (z = 11 + b(v, S, 7), S += 7);
          const d = R + z;
          for (; R < d; )
            N[R] = y, R++;
        }
      }
      return S;
    }, c.H.V = function(i, a, f, v) {
      let S = 0, N = 0;
      const b = v.length >>> 1;
      for (; N < f; ) {
        const E = i[N + a];
        v[N << 1] = 0, v[1 + (N << 1)] = E, E > S && (S = E), N++;
      }
      for (; N < b; )
        v[N << 1] = 0, v[1 + (N << 1)] = 0, N++;
      return S;
    }, c.H.n = function(i, a) {
      const f = c.H.m, v = i.length;
      let S, N, b, E;
      const R = f.j;
      for (var F = 0; F <= a; F++)
        R[F] = 0;
      for (F = 1; F < v; F += 2)
        R[i[F]]++;
      const H = f.K;
      for (S = 0, R[0] = 0, N = 1; N <= a; N++)
        S = S + R[N - 1] << 1, H[N] = S;
      for (b = 0; b < v; b += 2)
        E = i[b + 1], E != 0 && (i[b] = H[E], H[E]++);
    }, c.H.A = function(i, a, f) {
      const v = i.length, S = c.H.m.r;
      for (let N = 0; N < v; N += 2)
        if (i[N + 1] != 0) {
          const b = N >> 1, E = i[N + 1], R = b << 4 | E, F = a - E;
          let H = i[N] << F;
          const y = H + (1 << F);
          for (; H != y; )
            f[S[H] >>> 15 - a] = R, H++;
        }
    }, c.H.l = function(i, a) {
      const f = c.H.m.r, v = 15 - a;
      for (let S = 0; S < i.length; S += 2) {
        const N = i[S] << a - i[S + 1];
        i[S] = f[N] >>> v;
      }
    }, c.H.M = function(i, a, f) {
      f <<= 7 & a;
      const v = a >>> 3;
      i[v] |= f, i[v + 1] |= f >>> 8;
    }, c.H.I = function(i, a, f) {
      f <<= 7 & a;
      const v = a >>> 3;
      i[v] |= f, i[v + 1] |= f >>> 8, i[v + 2] |= f >>> 16;
    }, c.H.e = function(i, a, f) {
      return (i[a >>> 3] | i[1 + (a >>> 3)] << 8) >>> (7 & a) & (1 << f) - 1;
    }, c.H.b = function(i, a, f) {
      return (i[a >>> 3] | i[1 + (a >>> 3)] << 8 | i[2 + (a >>> 3)] << 16) >>> (7 & a) & (1 << f) - 1;
    }, c.H.Z = function(i, a) {
      return (i[a >>> 3] | i[1 + (a >>> 3)] << 8 | i[2 + (a >>> 3)] << 16) >>> (7 & a);
    }, c.H.i = function(i, a) {
      return (i[a >>> 3] | i[1 + (a >>> 3)] << 8 | i[2 + (a >>> 3)] << 16 | i[3 + (a >>> 3)] << 24) >>> (7 & a);
    }, c.H.m = function() {
      const i = Uint16Array, a = Uint32Array;
      return { K: new i(16), j: new i(16), X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], q: new i(32), p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], c: new a(32), J: new i(512), _: [], h: new i(32), $: [], w: new i(32768), C: [], v: [], d: new i(32768), D: [], u: new i(512), Q: [], r: new i(32768), s: new a(286), Y: new a(30), a: new a(19), t: new a(15e3), k: new i(65536), g: new i(32768) };
    }(), function() {
      const i = c.H.m;
      for (var a = 0; a < 32768; a++) {
        let v = a;
        v = (2863311530 & v) >>> 1 | (1431655765 & v) << 1, v = (3435973836 & v) >>> 2 | (858993459 & v) << 2, v = (4042322160 & v) >>> 4 | (252645135 & v) << 4, v = (4278255360 & v) >>> 8 | (16711935 & v) << 8, i.r[a] = (v >>> 16 | v << 16) >>> 17;
      }
      function f(v, S, N) {
        for (; S-- != 0; )
          v.push(0, N);
      }
      for (a = 0; a < 32; a++)
        i.q[a] = i.S[a] << 3 | i.T[a], i.c[a] = i.p[a] << 4 | i.z[a];
      f(i._, 144, 8), f(i._, 112, 9), f(i._, 24, 7), f(i._, 8, 8), c.H.n(i._, 9), c.H.A(i._, 9, i.J), c.H.l(i._, 9), f(i.$, 32, 5), c.H.n(i.$, 5), c.H.A(i.$, 5, i.h), c.H.l(i.$, 5), f(i.Q, 19, 0), f(i.C, 286, 0), f(i.D, 30, 0), f(i.v, 320, 0);
    }(), c.H.N;
  }();
  function t(c) {
    return [1, null, 3, 1, 2, null, 4][c.ctype] * c.depth;
  }
  function u(c, i, a, f, v) {
    let S = t(i);
    const N = Math.ceil(f * S / 8);
    let b, E;
    S = Math.ceil(S / 8);
    let R = c[a], F = 0;
    if (R > 1 && (c[a] = [0, 0, 1][R - 2]), R == 3)
      for (F = S; F < N; F++)
        c[F + 1] = c[F + 1] + (c[F + 1 - S] >>> 1) & 255;
    for (let H = 0; H < v; H++)
      if (b = a + H * N, E = b + H + 1, R = c[E - 1], F = 0, R == 0)
        for (; F < N; F++)
          c[b + F] = c[E + F];
      else if (R == 1) {
        for (; F < S; F++)
          c[b + F] = c[E + F];
        for (; F < N; F++)
          c[b + F] = c[E + F] + c[b + F - S];
      } else if (R == 2)
        for (; F < N; F++)
          c[b + F] = c[E + F] + c[b + F - N];
      else if (R == 3) {
        for (; F < S; F++)
          c[b + F] = c[E + F] + (c[b + F - N] >>> 1);
        for (; F < N; F++)
          c[b + F] = c[E + F] + (c[b + F - N] + c[b + F - S] >>> 1);
      } else {
        for (; F < S; F++)
          c[b + F] = c[E + F] + l(0, c[b + F - N], 0);
        for (; F < N; F++)
          c[b + F] = c[E + F] + l(c[b + F - S], c[b + F - N], c[b + F - S - N]);
      }
    return c;
  }
  function l(c, i, a) {
    const f = c + i - a, v = f - c, S = f - i, N = f - a;
    return v * v <= S * S && v * v <= N * N ? c : S * S <= N * N ? i : a;
  }
  function h(c, i, a) {
    a.width = n.readUint(c, i), i += 4, a.height = n.readUint(c, i), i += 4, a.depth = c[i], i++, a.ctype = c[i], i++, a.compress = c[i], i++, a.filter = c[i], i++, a.interlace = c[i], i++;
  }
  function g(c, i, a, f, v, S, N, b, E) {
    const R = Math.min(i, v), F = Math.min(a, S);
    let H = 0, y = 0;
    for (let U = 0; U < F; U++)
      for (let p = 0; p < R; p++)
        if (N >= 0 && b >= 0 ? (H = U * i + p << 2, y = (b + U) * v + N + p << 2) : (H = (-b + U) * i - N + p << 2, y = U * v + p << 2), E == 0)
          f[y] = c[H], f[y + 1] = c[H + 1], f[y + 2] = c[H + 2], f[y + 3] = c[H + 3];
        else if (E == 1) {
          var z = c[H + 3] * 0.00392156862745098, d = c[H] * z, m = c[H + 1] * z, w = c[H + 2] * z, C = f[y + 3] * (1 / 255), x = f[y] * C, k = f[y + 1] * C, A = f[y + 2] * C;
          const _ = 1 - z, L = z + C * _, M = L == 0 ? 0 : 1 / L;
          f[y + 3] = 255 * L, f[y + 0] = (d + x * _) * M, f[y + 1] = (m + k * _) * M, f[y + 2] = (w + A * _) * M;
        } else if (E == 2)
          z = c[H + 3], d = c[H], m = c[H + 1], w = c[H + 2], C = f[y + 3], x = f[y], k = f[y + 1], A = f[y + 2], z == C && d == x && m == k && w == A ? (f[y] = 0, f[y + 1] = 0, f[y + 2] = 0, f[y + 3] = 0) : (f[y] = d, f[y + 1] = m, f[y + 2] = w, f[y + 3] = z);
        else if (E == 3) {
          if (z = c[H + 3], d = c[H], m = c[H + 1], w = c[H + 2], C = f[y + 3], x = f[y], k = f[y + 1], A = f[y + 2], z == C && d == x && m == k && w == A)
            continue;
          if (z < 220 && C > 20)
            return !1;
        }
    return !0;
  }
  return { decode: function(i) {
    const a = new Uint8Array(i);
    let f = 8;
    const v = n, S = v.readUshort, N = v.readUint, b = { tabs: {}, frames: [] }, E = new Uint8Array(a.length);
    let R, F = 0, H = 0;
    const y = [137, 80, 78, 71, 13, 10, 26, 10];
    for (var z = 0; z < 8; z++)
      if (a[z] != y[z])
        throw "The input is not a PNG file!";
    for (; f < a.length; ) {
      const U = v.readUint(a, f);
      f += 4;
      const p = v.readASCII(a, f, 4);
      if (f += 4, p == "IHDR")
        h(a, f, b);
      else if (p == "iCCP") {
        for (var d = f; a[d] != 0; )
          d++;
        v.readASCII(a, f, d - f), a[d + 1];
        const _ = a.slice(d + 2, f + U);
        let L = null;
        try {
          L = o(_);
        } catch {
          L = e(_);
        }
        b.tabs[p] = L;
      } else if (p == "CgBI")
        b.tabs[p] = a.slice(f, f + 4);
      else if (p == "IDAT") {
        for (z = 0; z < U; z++)
          E[F + z] = a[f + z];
        F += U;
      } else if (p == "acTL")
        b.tabs[p] = { num_frames: N(a, f), num_plays: N(a, f + 4) }, R = new Uint8Array(a.length);
      else if (p == "fcTL") {
        H != 0 && ((A = b.frames[b.frames.length - 1]).data = s(b, R.slice(0, H), A.rect.width, A.rect.height), H = 0);
        const _ = { x: N(a, f + 12), y: N(a, f + 16), width: N(a, f + 4), height: N(a, f + 8) };
        let L = S(a, f + 22);
        L = S(a, f + 20) / (L == 0 ? 100 : L);
        const M = { rect: _, delay: Math.round(1e3 * L), dispose: a[f + 24], blend: a[f + 25] };
        b.frames.push(M);
      } else if (p == "fdAT") {
        for (z = 0; z < U - 4; z++)
          R[H + z] = a[f + z + 4];
        H += U - 4;
      } else if (p == "pHYs")
        b.tabs[p] = [v.readUint(a, f), v.readUint(a, f + 4), a[f + 8]];
      else if (p == "cHRM")
        for (b.tabs[p] = [], z = 0; z < 8; z++)
          b.tabs[p].push(v.readUint(a, f + 4 * z));
      else if (p == "tEXt" || p == "zTXt") {
        b.tabs[p] == null && (b.tabs[p] = {});
        var m = v.nextZero(a, f), w = v.readASCII(a, f, m - f), C = f + U - m - 1;
        if (p == "tEXt")
          k = v.readASCII(a, m + 1, C);
        else {
          var x = o(a.slice(m + 2, m + 2 + C));
          k = v.readUTF8(x, 0, x.length);
        }
        b.tabs[p][w] = k;
      } else if (p == "iTXt") {
        b.tabs[p] == null && (b.tabs[p] = {}), m = 0, d = f, m = v.nextZero(a, d), w = v.readASCII(a, d, m - d);
        const _ = a[d = m + 1];
        var k;
        a[d + 1], d += 2, m = v.nextZero(a, d), v.readASCII(a, d, m - d), d = m + 1, m = v.nextZero(a, d), v.readUTF8(a, d, m - d), C = U - ((d = m + 1) - f), _ == 0 ? k = v.readUTF8(a, d, C) : (x = o(a.slice(d, d + C)), k = v.readUTF8(x, 0, x.length)), b.tabs[p][w] = k;
      } else if (p == "PLTE")
        b.tabs[p] = v.readBytes(a, f, U);
      else if (p == "hIST") {
        const _ = b.tabs.PLTE.length / 3;
        for (b.tabs[p] = [], z = 0; z < _; z++)
          b.tabs[p].push(S(a, f + 2 * z));
      } else if (p == "tRNS")
        b.ctype == 3 ? b.tabs[p] = v.readBytes(a, f, U) : b.ctype == 0 ? b.tabs[p] = S(a, f) : b.ctype == 2 && (b.tabs[p] = [S(a, f), S(a, f + 2), S(a, f + 4)]);
      else if (p == "gAMA")
        b.tabs[p] = v.readUint(a, f) / 1e5;
      else if (p == "sRGB")
        b.tabs[p] = a[f];
      else if (p == "bKGD")
        b.ctype == 0 || b.ctype == 4 ? b.tabs[p] = [S(a, f)] : b.ctype == 2 || b.ctype == 6 ? b.tabs[p] = [S(a, f), S(a, f + 2), S(a, f + 4)] : b.ctype == 3 && (b.tabs[p] = a[f]);
      else if (p == "IEND")
        break;
      f += U, v.readUint(a, f), f += 4;
    }
    var A;
    return H != 0 && ((A = b.frames[b.frames.length - 1]).data = s(b, R.slice(0, H), A.rect.width, A.rect.height)), b.data = s(b, E, b.width, b.height), delete b.compress, delete b.interlace, delete b.filter, b;
  }, toRGBA8: function(i) {
    const a = i.width, f = i.height;
    if (i.tabs.acTL == null)
      return [r(i.data, a, f, i).buffer];
    const v = [];
    i.frames[0].data == null && (i.frames[0].data = i.data);
    const S = a * f * 4, N = new Uint8Array(S), b = new Uint8Array(S), E = new Uint8Array(S);
    for (let F = 0; F < i.frames.length; F++) {
      const H = i.frames[F], y = H.rect.x, z = H.rect.y, d = H.rect.width, m = H.rect.height, w = r(H.data, d, m, i);
      if (F != 0)
        for (var R = 0; R < S; R++)
          E[R] = N[R];
      if (H.blend == 0 ? g(w, d, m, N, a, f, y, z, 0) : H.blend == 1 && g(w, d, m, N, a, f, y, z, 1), v.push(N.buffer.slice(0)), H.dispose != 0) {
        if (H.dispose == 1)
          g(b, d, m, N, a, f, y, z, 0);
        else if (H.dispose == 2)
          for (R = 0; R < S; R++)
            N[R] = E[R];
      }
    }
    return v;
  }, _paeth: l, _copyTile: g, _bin: n };
}();
(function() {
  const { _copyTile: n } = ge, { _bin: r } = ge, s = ge._paeth;
  var o = { table: function() {
    const d = new Uint32Array(256);
    for (let m = 0; m < 256; m++) {
      let w = m;
      for (let C = 0; C < 8; C++)
        1 & w ? w = 3988292384 ^ w >>> 1 : w >>>= 1;
      d[m] = w;
    }
    return d;
  }(), update(d, m, w, C) {
    for (let x = 0; x < C; x++)
      d = o.table[255 & (d ^ m[w + x])] ^ d >>> 8;
    return d;
  }, crc: (d, m, w) => 4294967295 ^ o.update(4294967295, d, m, w) };
  function e(d, m, w, C) {
    m[w] += d[0] * C >> 4, m[w + 1] += d[1] * C >> 4, m[w + 2] += d[2] * C >> 4, m[w + 3] += d[3] * C >> 4;
  }
  function t(d) {
    return Math.max(0, Math.min(255, d));
  }
  function u(d, m) {
    const w = d[0] - m[0], C = d[1] - m[1], x = d[2] - m[2], k = d[3] - m[3];
    return w * w + C * C + x * x + k * k;
  }
  function l(d, m, w, C, x, k, A) {
    A == null && (A = 1);
    const U = C.length, p = [];
    for (var _ = 0; _ < U; _++) {
      const P = C[_];
      p.push([P >>> 0 & 255, P >>> 8 & 255, P >>> 16 & 255, P >>> 24 & 255]);
    }
    for (_ = 0; _ < U; _++) {
      let P = 4294967295;
      for (var L = 0, M = 0; M < U; M++) {
        var T = u(p[_], p[M]);
        M != _ && T < P && (P = T, L = M);
      }
    }
    const $ = new Uint32Array(x.buffer), O = new Int16Array(m * w * 4), W = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (_ = 0; _ < W.length; _++)
      W[_] = 255 * ((W[_] + 0.5) / 16 - 0.5);
    for (let P = 0; P < w; P++)
      for (let B = 0; B < m; B++) {
        var D;
        _ = 4 * (P * m + B), A != 2 ? D = [t(d[_] + O[_]), t(d[_ + 1] + O[_ + 1]), t(d[_ + 2] + O[_ + 2]), t(d[_ + 3] + O[_ + 3])] : (T = W[4 * (3 & P) + (3 & B)], D = [t(d[_] + T), t(d[_ + 1] + T), t(d[_ + 2] + T), t(d[_ + 3] + T)]), L = 0;
        let Z = 16777215;
        for (M = 0; M < U; M++) {
          const V = u(D, p[M]);
          V < Z && (Z = V, L = M);
        }
        const q = p[L], Q = [D[0] - q[0], D[1] - q[1], D[2] - q[2], D[3] - q[3]];
        A == 1 && (B != m - 1 && e(Q, O, _ + 4, 7), P != w - 1 && (B != 0 && e(Q, O, _ + 4 * m - 4, 3), e(Q, O, _ + 4 * m, 5), B != m - 1 && e(Q, O, _ + 4 * m + 4, 1))), k[_ >> 2] = L, $[_ >> 2] = C[L];
      }
  }
  function h(d, m, w, C, x) {
    x == null && (x = {});
    const { crc: k } = o, A = r.writeUint, U = r.writeUshort, p = r.writeASCII;
    let _ = 8;
    const L = d.frames.length > 1;
    let M, T = !1, $ = 33 + (L ? 20 : 0);
    if (x.sRGB != null && ($ += 13), x.pHYs != null && ($ += 21), x.iCCP != null && (M = pako.deflate(x.iCCP), $ += 21 + M.length + 4), d.ctype == 3) {
      for (var O = d.plte.length, W = 0; W < O; W++)
        d.plte[W] >>> 24 != 255 && (T = !0);
      $ += 8 + 3 * O + 4 + (T ? 8 + 1 * O + 4 : 0);
    }
    for (var D = 0; D < d.frames.length; D++)
      L && ($ += 38), $ += (q = d.frames[D]).cimg.length + 12, D != 0 && ($ += 4);
    $ += 12;
    const P = new Uint8Array($), B = [137, 80, 78, 71, 13, 10, 26, 10];
    for (W = 0; W < 8; W++)
      P[W] = B[W];
    if (A(P, _, 13), _ += 4, p(P, _, "IHDR"), _ += 4, A(P, _, m), _ += 4, A(P, _, w), _ += 4, P[_] = d.depth, _++, P[_] = d.ctype, _++, P[_] = 0, _++, P[_] = 0, _++, P[_] = 0, _++, A(P, _, k(P, _ - 17, 17)), _ += 4, x.sRGB != null && (A(P, _, 1), _ += 4, p(P, _, "sRGB"), _ += 4, P[_] = x.sRGB, _++, A(P, _, k(P, _ - 5, 5)), _ += 4), x.iCCP != null) {
      const Q = 13 + M.length;
      A(P, _, Q), _ += 4, p(P, _, "iCCP"), _ += 4, p(P, _, "ICC profile"), _ += 11, _ += 2, P.set(M, _), _ += M.length, A(P, _, k(P, _ - (Q + 4), Q + 4)), _ += 4;
    }
    if (x.pHYs != null && (A(P, _, 9), _ += 4, p(P, _, "pHYs"), _ += 4, A(P, _, x.pHYs[0]), _ += 4, A(P, _, x.pHYs[1]), _ += 4, P[_] = x.pHYs[2], _++, A(P, _, k(P, _ - 13, 13)), _ += 4), L && (A(P, _, 8), _ += 4, p(P, _, "acTL"), _ += 4, A(P, _, d.frames.length), _ += 4, A(P, _, x.loop != null ? x.loop : 0), _ += 4, A(P, _, k(P, _ - 12, 12)), _ += 4), d.ctype == 3) {
      for (A(P, _, 3 * (O = d.plte.length)), _ += 4, p(P, _, "PLTE"), _ += 4, W = 0; W < O; W++) {
        const Q = 3 * W, V = d.plte[W], J = 255 & V, ie = V >>> 8 & 255, Ne = V >>> 16 & 255;
        P[_ + Q + 0] = J, P[_ + Q + 1] = ie, P[_ + Q + 2] = Ne;
      }
      if (_ += 3 * O, A(P, _, k(P, _ - 3 * O - 4, 3 * O + 4)), _ += 4, T) {
        for (A(P, _, O), _ += 4, p(P, _, "tRNS"), _ += 4, W = 0; W < O; W++)
          P[_ + W] = d.plte[W] >>> 24 & 255;
        _ += O, A(P, _, k(P, _ - O - 4, O + 4)), _ += 4;
      }
    }
    let Z = 0;
    for (D = 0; D < d.frames.length; D++) {
      var q = d.frames[D];
      L && (A(P, _, 26), _ += 4, p(P, _, "fcTL"), _ += 4, A(P, _, Z++), _ += 4, A(P, _, q.rect.width), _ += 4, A(P, _, q.rect.height), _ += 4, A(P, _, q.rect.x), _ += 4, A(P, _, q.rect.y), _ += 4, U(P, _, C[D]), _ += 2, U(P, _, 1e3), _ += 2, P[_] = q.dispose, _++, P[_] = q.blend, _++, A(P, _, k(P, _ - 30, 30)), _ += 4);
      const Q = q.cimg;
      A(P, _, (O = Q.length) + (D == 0 ? 0 : 4)), _ += 4;
      const V = _;
      p(P, _, D == 0 ? "IDAT" : "fdAT"), _ += 4, D != 0 && (A(P, _, Z++), _ += 4), P.set(Q, _), _ += O, A(P, _, k(P, V, _ - V)), _ += 4;
    }
    return A(P, _, 0), _ += 4, p(P, _, "IEND"), _ += 4, A(P, _, k(P, _ - 4, 4)), _ += 4, P.buffer;
  }
  function g(d, m, w) {
    for (let C = 0; C < d.frames.length; C++) {
      const x = d.frames[C];
      x.rect.width;
      const k = x.rect.height, A = new Uint8Array(k * x.bpl + k);
      x.cimg = f(x.img, k, x.bpp, x.bpl, A, m, w);
    }
  }
  function c(d, m, w, C, x) {
    const k = x[0], A = x[1], U = x[2], p = x[3], _ = x[4], L = x[5];
    let M = 6, T = 8, $ = 255;
    for (var O = 0; O < d.length; O++) {
      const ae = new Uint8Array(d[O]);
      for (var W = ae.length, D = 0; D < W; D += 4)
        $ &= ae[D + 3];
    }
    const P = $ != 255, B = function(X, G, oe, ce, te, de) {
      const ne = [];
      for (var K = 0; K < X.length; K++) {
        const ue = new Uint8Array(X[K]), _e = new Uint32Array(ue.buffer);
        var he;
        let me = 0, we = 0, ve = G, Fe = oe, at = ce ? 1 : 0;
        if (K != 0) {
          const xn = de || ce || K == 1 || ne[K - 2].dispose != 0 ? 1 : 2;
          let lt = 0, At = 1e9;
          for (let Oe = 0; Oe < xn; Oe++) {
            var Ae = new Uint8Array(X[K - 1 - Oe]);
            const An = new Uint32Array(X[K - 1 - Oe]);
            let Ce = G, Se = oe, Te = -1, We = -1;
            for (let Me = 0; Me < oe; Me++)
              for (let Ie = 0; Ie < G; Ie++)
                _e[le = Me * G + Ie] != An[le] && (Ie < Ce && (Ce = Ie), Ie > Te && (Te = Ie), Me < Se && (Se = Me), Me > We && (We = Me));
            Te == -1 && (Ce = Se = Te = We = 0), te && ((1 & Ce) == 1 && Ce--, (1 & Se) == 1 && Se--);
            const Ct = (Te - Ce + 1) * (We - Se + 1);
            Ct < At && (At = Ct, lt = Oe, me = Ce, we = Se, ve = Te - Ce + 1, Fe = We - Se + 1);
          }
          Ae = new Uint8Array(X[K - 1 - lt]), lt == 1 && (ne[K - 1].dispose = 2), he = new Uint8Array(ve * Fe * 4), n(Ae, G, oe, he, ve, Fe, -me, -we, 0), at = n(ue, G, oe, he, ve, Fe, -me, -we, 3) ? 1 : 0, at == 1 ? a(ue, G, oe, he, { x: me, y: we, width: ve, height: Fe }) : n(ue, G, oe, he, ve, Fe, -me, -we, 0);
        } else
          he = ue.slice(0);
        ne.push({ rect: { x: me, y: we, width: ve, height: Fe }, img: he, blend: at, dispose: 0 });
      }
      if (ce)
        for (K = 0; K < ne.length; K++) {
          if ((Ue = ne[K]).blend == 1)
            continue;
          const ue = Ue.rect, _e = ne[K - 1].rect, me = Math.min(ue.x, _e.x), we = Math.min(ue.y, _e.y), ve = { x: me, y: we, width: Math.max(ue.x + ue.width, _e.x + _e.width) - me, height: Math.max(ue.y + ue.height, _e.y + _e.height) - we };
          ne[K - 1].dispose = 1, K - 1 != 0 && i(X, G, oe, ne, K - 1, ve, te), i(X, G, oe, ne, K, ve, te);
        }
      let je = 0;
      if (X.length != 1)
        for (var le = 0; le < ne.length; le++) {
          var Ue;
          je += (Ue = ne[le]).rect.width * Ue.rect.height;
        }
      return ne;
    }(d, m, w, k, A, U), Z = {}, q = [], Q = [];
    if (C != 0) {
      const ae = [];
      for (D = 0; D < B.length; D++)
        ae.push(B[D].img.buffer);
      const X = function(te) {
        let de = 0;
        for (var ne = 0; ne < te.length; ne++)
          de += te[ne].byteLength;
        const K = new Uint8Array(de);
        let he = 0;
        for (ne = 0; ne < te.length; ne++) {
          const Ae = new Uint8Array(te[ne]), je = Ae.length;
          for (let le = 0; le < je; le += 4) {
            let Ue = Ae[le], ue = Ae[le + 1], _e = Ae[le + 2];
            const me = Ae[le + 3];
            me == 0 && (Ue = ue = _e = 0), K[he + le] = Ue, K[he + le + 1] = ue, K[he + le + 2] = _e, K[he + le + 3] = me;
          }
          he += je;
        }
        return K.buffer;
      }(ae), G = S(X, C);
      for (D = 0; D < G.plte.length; D++)
        q.push(G.plte[D].est.rgba);
      let oe = 0;
      for (D = 0; D < B.length; D++) {
        const ce = (J = B[D]).img.length;
        var V = new Uint8Array(G.inds.buffer, oe >> 2, ce >> 2);
        Q.push(V);
        const te = new Uint8Array(G.abuf, oe, ce);
        L && l(J.img, J.rect.width, J.rect.height, q, te, V), J.img.set(te), oe += ce;
      }
    } else
      for (O = 0; O < B.length; O++) {
        var J = B[O];
        const ae = new Uint32Array(J.img.buffer);
        var ie = J.rect.width;
        for (W = ae.length, V = new Uint8Array(W), Q.push(V), D = 0; D < W; D++) {
          const X = ae[D];
          if (D != 0 && X == ae[D - 1])
            V[D] = V[D - 1];
          else if (D > ie && X == ae[D - ie])
            V[D] = V[D - ie];
          else {
            let G = Z[X];
            if (G == null && (Z[X] = G = q.length, q.push(X), q.length >= 300))
              break;
            V[D] = G;
          }
        }
      }
    const Ne = q.length;
    for (Ne <= 256 && _ == 0 && (T = Ne <= 2 ? 1 : Ne <= 4 ? 2 : Ne <= 16 ? 4 : 8, T = Math.max(T, p)), O = 0; O < B.length; O++) {
      (J = B[O]).rect.x, J.rect.y, ie = J.rect.width;
      const ae = J.rect.height;
      let X = J.img;
      new Uint32Array(X.buffer);
      let G = 4 * ie, oe = 4;
      if (Ne <= 256 && _ == 0) {
        G = Math.ceil(T * ie / 8);
        var pe = new Uint8Array(G * ae);
        const ce = Q[O];
        for (let te = 0; te < ae; te++) {
          D = te * G;
          const de = te * ie;
          if (T == 8)
            for (var Y = 0; Y < ie; Y++)
              pe[D + Y] = ce[de + Y];
          else if (T == 4)
            for (Y = 0; Y < ie; Y++)
              pe[D + (Y >> 1)] |= ce[de + Y] << 4 - 4 * (1 & Y);
          else if (T == 2)
            for (Y = 0; Y < ie; Y++)
              pe[D + (Y >> 2)] |= ce[de + Y] << 6 - 2 * (3 & Y);
          else if (T == 1)
            for (Y = 0; Y < ie; Y++)
              pe[D + (Y >> 3)] |= ce[de + Y] << 7 - 1 * (7 & Y);
        }
        X = pe, M = 3, oe = 1;
      } else if (P == 0 && B.length == 1) {
        pe = new Uint8Array(ie * ae * 3);
        const ce = ie * ae;
        for (D = 0; D < ce; D++) {
          const te = 3 * D, de = 4 * D;
          pe[te] = X[de], pe[te + 1] = X[de + 1], pe[te + 2] = X[de + 2];
        }
        X = pe, M = 2, oe = 3, G = 3 * ie;
      }
      J.img = X, J.bpl = G, J.bpp = oe;
    }
    return { ctype: M, depth: T, plte: q, frames: B };
  }
  function i(d, m, w, C, x, k, A) {
    const U = Uint8Array, p = Uint32Array, _ = new U(d[x - 1]), L = new p(d[x - 1]), M = x + 1 < d.length ? new U(d[x + 1]) : null, T = new U(d[x]), $ = new p(T.buffer);
    let O = m, W = w, D = -1, P = -1;
    for (let Z = 0; Z < k.height; Z++)
      for (let q = 0; q < k.width; q++) {
        const Q = k.x + q, V = k.y + Z, J = V * m + Q, ie = $[J];
        ie == 0 || C[x - 1].dispose == 0 && L[J] == ie && (M == null || M[4 * J + 3] != 0) || (Q < O && (O = Q), Q > D && (D = Q), V < W && (W = V), V > P && (P = V));
      }
    D == -1 && (O = W = D = P = 0), A && ((1 & O) == 1 && O--, (1 & W) == 1 && W--), k = { x: O, y: W, width: D - O + 1, height: P - W + 1 };
    const B = C[x];
    B.rect = k, B.blend = 1, B.img = new Uint8Array(k.width * k.height * 4), C[x - 1].dispose == 0 ? (n(_, m, w, B.img, k.width, k.height, -k.x, -k.y, 0), a(T, m, w, B.img, k)) : n(T, m, w, B.img, k.width, k.height, -k.x, -k.y, 0);
  }
  function a(d, m, w, C, x) {
    n(d, m, w, C, x.width, x.height, -x.x, -x.y, 2);
  }
  function f(d, m, w, C, x, k, A) {
    const U = [];
    let p, _ = [0, 1, 2, 3, 4];
    k != -1 ? _ = [k] : (m * C > 5e5 || w == 1) && (_ = [0]), A && (p = { level: 0 });
    const L = er;
    for (var M = 0; M < _.length; M++) {
      for (let O = 0; O < m; O++)
        v(x, d, O, C, w, _[M]);
      U.push(L.deflate(x, p));
    }
    let T, $ = 1e9;
    for (M = 0; M < U.length; M++)
      U[M].length < $ && (T = M, $ = U[M].length);
    return U[T];
  }
  function v(d, m, w, C, x, k) {
    const A = w * C;
    let U = A + w;
    if (d[U] = k, U++, k == 0)
      if (C < 500)
        for (var p = 0; p < C; p++)
          d[U + p] = m[A + p];
      else
        d.set(new Uint8Array(m.buffer, A, C), U);
    else if (k == 1) {
      for (p = 0; p < x; p++)
        d[U + p] = m[A + p];
      for (p = x; p < C; p++)
        d[U + p] = m[A + p] - m[A + p - x] + 256 & 255;
    } else if (w == 0) {
      for (p = 0; p < x; p++)
        d[U + p] = m[A + p];
      if (k == 2)
        for (p = x; p < C; p++)
          d[U + p] = m[A + p];
      if (k == 3)
        for (p = x; p < C; p++)
          d[U + p] = m[A + p] - (m[A + p - x] >> 1) + 256 & 255;
      if (k == 4)
        for (p = x; p < C; p++)
          d[U + p] = m[A + p] - s(m[A + p - x], 0, 0) + 256 & 255;
    } else {
      if (k == 2)
        for (p = 0; p < C; p++)
          d[U + p] = m[A + p] + 256 - m[A + p - C] & 255;
      if (k == 3) {
        for (p = 0; p < x; p++)
          d[U + p] = m[A + p] + 256 - (m[A + p - C] >> 1) & 255;
        for (p = x; p < C; p++)
          d[U + p] = m[A + p] + 256 - (m[A + p - C] + m[A + p - x] >> 1) & 255;
      }
      if (k == 4) {
        for (p = 0; p < x; p++)
          d[U + p] = m[A + p] + 256 - s(0, m[A + p - C], 0) & 255;
        for (p = x; p < C; p++)
          d[U + p] = m[A + p] + 256 - s(m[A + p - x], m[A + p - C], m[A + p - x - C]) & 255;
      }
    }
  }
  function S(d, m) {
    const w = new Uint8Array(d), C = w.slice(0), x = new Uint32Array(C.buffer), k = N(C, m), A = k[0], U = k[1], p = w.length, _ = new Uint8Array(p >> 2);
    let L;
    if (w.length < 2e7)
      for (var M = 0; M < p; M += 4)
        L = b(A, T = w[M] * (1 / 255), $ = w[M + 1] * (1 / 255), O = w[M + 2] * (1 / 255), W = w[M + 3] * (1 / 255)), _[M >> 2] = L.ind, x[M >> 2] = L.est.rgba;
    else
      for (M = 0; M < p; M += 4) {
        var T = w[M] * 0.00392156862745098, $ = w[M + 1] * (1 / 255), O = w[M + 2] * (1 / 255), W = w[M + 3] * (1 / 255);
        for (L = A; L.left; )
          L = E(L.est, T, $, O, W) <= 0 ? L.left : L.right;
        _[M >> 2] = L.ind, x[M >> 2] = L.est.rgba;
      }
    return { abuf: C.buffer, inds: _, plte: U };
  }
  function N(d, m, w) {
    w == null && (w = 1e-4);
    const C = new Uint32Array(d.buffer), x = { i0: 0, i1: d.length, bst: null, est: null, tdst: 0, left: null, right: null };
    x.bst = H(d, x.i0, x.i1), x.est = y(x.bst);
    const k = [x];
    for (; k.length < m; ) {
      let U = 0, p = 0;
      for (var A = 0; A < k.length; A++)
        k[A].est.L > U && (U = k[A].est.L, p = A);
      if (U < w)
        break;
      const _ = k[p], L = R(d, C, _.i0, _.i1, _.est.e, _.est.eMq255);
      if (_.i0 >= L || _.i1 <= L) {
        _.est.L = 0;
        continue;
      }
      const M = { i0: _.i0, i1: L, bst: null, est: null, tdst: 0, left: null, right: null };
      M.bst = H(d, M.i0, M.i1), M.est = y(M.bst);
      const T = { i0: L, i1: _.i1, bst: null, est: null, tdst: 0, left: null, right: null };
      for (T.bst = { R: [], m: [], N: _.bst.N - M.bst.N }, A = 0; A < 16; A++)
        T.bst.R[A] = _.bst.R[A] - M.bst.R[A];
      for (A = 0; A < 4; A++)
        T.bst.m[A] = _.bst.m[A] - M.bst.m[A];
      T.est = y(T.bst), _.left = M, _.right = T, k[p] = M, k.push(T);
    }
    for (k.sort((U, p) => p.bst.N - U.bst.N), A = 0; A < k.length; A++)
      k[A].ind = A;
    return [x, k];
  }
  function b(d, m, w, C, x) {
    if (d.left == null)
      return d.tdst = function(M, T, $, O, W) {
        const D = T - M[0], P = $ - M[1], B = O - M[2], Z = W - M[3];
        return D * D + P * P + B * B + Z * Z;
      }(d.est.q, m, w, C, x), d;
    const k = E(d.est, m, w, C, x);
    let A = d.left, U = d.right;
    k > 0 && (A = d.right, U = d.left);
    const p = b(A, m, w, C, x);
    if (p.tdst <= k * k)
      return p;
    const _ = b(U, m, w, C, x);
    return _.tdst < p.tdst ? _ : p;
  }
  function E(d, m, w, C, x) {
    const { e: k } = d;
    return k[0] * m + k[1] * w + k[2] * C + k[3] * x - d.eMq;
  }
  function R(d, m, w, C, x, k) {
    for (C -= 4; w < C; ) {
      for (; F(d, w, x) <= k; )
        w += 4;
      for (; F(d, C, x) > k; )
        C -= 4;
      if (w >= C)
        break;
      const A = m[w >> 2];
      m[w >> 2] = m[C >> 2], m[C >> 2] = A, w += 4, C -= 4;
    }
    for (; F(d, w, x) > k; )
      w -= 4;
    return w + 4;
  }
  function F(d, m, w) {
    return d[m] * w[0] + d[m + 1] * w[1] + d[m + 2] * w[2] + d[m + 3] * w[3];
  }
  function H(d, m, w) {
    const C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], x = [0, 0, 0, 0], k = w - m >> 2;
    for (let A = m; A < w; A += 4) {
      const U = d[A] * 0.00392156862745098, p = d[A + 1] * (1 / 255), _ = d[A + 2] * (1 / 255), L = d[A + 3] * (1 / 255);
      x[0] += U, x[1] += p, x[2] += _, x[3] += L, C[0] += U * U, C[1] += U * p, C[2] += U * _, C[3] += U * L, C[5] += p * p, C[6] += p * _, C[7] += p * L, C[10] += _ * _, C[11] += _ * L, C[15] += L * L;
    }
    return C[4] = C[1], C[8] = C[2], C[9] = C[6], C[12] = C[3], C[13] = C[7], C[14] = C[11], { R: C, m: x, N: k };
  }
  function y(d) {
    const { R: m } = d, { m: w } = d, { N: C } = d, x = w[0], k = w[1], A = w[2], U = w[3], p = C == 0 ? 0 : 1 / C, _ = [m[0] - x * x * p, m[1] - x * k * p, m[2] - x * A * p, m[3] - x * U * p, m[4] - k * x * p, m[5] - k * k * p, m[6] - k * A * p, m[7] - k * U * p, m[8] - A * x * p, m[9] - A * k * p, m[10] - A * A * p, m[11] - A * U * p, m[12] - U * x * p, m[13] - U * k * p, m[14] - U * A * p, m[15] - U * U * p], L = _, M = z;
    let T = [Math.random(), Math.random(), Math.random(), Math.random()], $ = 0, O = 0;
    if (C != 0)
      for (let D = 0; D < 16 && (T = M.multVec(L, T), O = Math.sqrt(M.dot(T, T)), T = M.sml(1 / O, T), !(D != 0 && Math.abs(O - $) < 1e-9)); D++)
        $ = O;
    const W = [x * p, k * p, A * p, U * p];
    return { Cov: _, q: W, e: T, L: $, eMq255: M.dot(M.sml(255, W), T), eMq: M.dot(T, W), rgba: (Math.round(255 * W[3]) << 24 | Math.round(255 * W[2]) << 16 | Math.round(255 * W[1]) << 8 | Math.round(255 * W[0]) << 0) >>> 0 };
  }
  var z = { multVec: (d, m) => [d[0] * m[0] + d[1] * m[1] + d[2] * m[2] + d[3] * m[3], d[4] * m[0] + d[5] * m[1] + d[6] * m[2] + d[7] * m[3], d[8] * m[0] + d[9] * m[1] + d[10] * m[2] + d[11] * m[3], d[12] * m[0] + d[13] * m[1] + d[14] * m[2] + d[15] * m[3]], dot: (d, m) => d[0] * m[0] + d[1] * m[1] + d[2] * m[2] + d[3] * m[3], sml: (d, m) => [d * m[0], d * m[1], d * m[2], d * m[3]] };
  ge.encode = function(m, w, C, x, k, A, U) {
    x == null && (x = 0), U == null && (U = !1);
    const p = c(m, w, C, x, [!1, !1, !1, 0, U, !1]);
    return g(p, -1), h(p, w, C, k, A);
  }, ge.encodeLL = function(m, w, C, x, k, A, U, p) {
    const _ = { ctype: 0 + (x == 1 ? 0 : 2) + (k == 0 ? 0 : 4), depth: A, frames: [] }, L = (x + k) * A, M = L * w;
    for (let T = 0; T < m.length; T++)
      _.frames.push({ rect: { x: 0, y: 0, width: w, height: C }, img: new Uint8Array(m[T]), blend: 0, dispose: 1, bpp: Math.ceil(L / 8), bpl: Math.ceil(M / 8) });
    return g(_, 0, !0), h(_, w, C, U, p);
  }, ge.encode.compress = c, ge.encode.dither = l, ge.quantize = S, ge.quantize.getKDtree = N, ge.quantize.getNearest = b;
})();
const dn = { toArrayBuffer(n, r) {
  const s = n.width, o = n.height, e = s << 2, t = n.getContext("2d").getImageData(0, 0, s, o), u = new Uint32Array(t.data.buffer), l = (32 * s + 31) / 32 << 2, h = l * o, g = 122 + h, c = new ArrayBuffer(g), i = new DataView(c), a = 1 << 20;
  let f, v, S, N, b = a, E = 0, R = 0, F = 0;
  function H(d) {
    i.setUint16(R, d, !0), R += 2;
  }
  function y(d) {
    i.setUint32(R, d, !0), R += 4;
  }
  function z(d) {
    R += d;
  }
  H(19778), y(g), z(4), y(122), y(108), y(s), y(-o >>> 0), H(1), H(32), y(3), y(h), y(2835), y(2835), z(8), y(16711680), y(65280), y(255), y(4278190080), y(1466527264), function d() {
    for (; E < o && b > 0; ) {
      for (N = 122 + E * l, f = 0; f < e; )
        b--, v = u[F++], S = v >>> 24, i.setUint32(N + f, v << 8 | S), f += 4;
      E++;
    }
    F < u.length ? (b = a, setTimeout(d, dn._dly)) : r(c);
  }();
}, toBlob(n, r) {
  this.toArrayBuffer(n, (s) => {
    r(new Blob([s], { type: "image/bmp" }));
  });
}, _dly: 9 };
var fe = { CHROME: "CHROME", FIREFOX: "FIREFOX", DESKTOP_SAFARI: "DESKTOP_SAFARI", IE: "IE", IOS: "IOS", ETC: "ETC" }, tr = { [fe.CHROME]: 16384, [fe.FIREFOX]: 11180, [fe.DESKTOP_SAFARI]: 16384, [fe.IE]: 8192, [fe.IOS]: 4096, [fe.ETC]: 8192 };
const wt = typeof window < "u", hn = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope, et = wt && window.cordova && window.cordova.require && window.cordova.require("cordova/modulemapper"), nr = (wt || hn) && (et && et.getOriginalSymbol(window, "File") || typeof File < "u" && File), mn = (wt || hn) && (et && et.getOriginalSymbol(window, "FileReader") || typeof FileReader < "u" && FileReader);
function xt(n, r, s = Date.now()) {
  return new Promise((o) => {
    const e = n.split(","), t = e[0].match(/:(.*?);/)[1], u = globalThis.atob(e[1]);
    let l = u.length;
    const h = new Uint8Array(l);
    for (; l--; )
      h[l] = u.charCodeAt(l);
    const g = new Blob([h], { type: t });
    g.name = r, g.lastModified = s, o(g);
  });
}
function _n(n) {
  return new Promise((r, s) => {
    const o = new mn();
    o.onload = () => r(o.result), o.onerror = (e) => s(e), o.readAsDataURL(n);
  });
}
function gn(n) {
  return new Promise((r, s) => {
    const o = new Image();
    o.onload = () => r(o), o.onerror = (e) => s(e), o.src = n;
  });
}
function Re() {
  if (Re.cachedResult !== void 0)
    return Re.cachedResult;
  let n = fe.ETC;
  const { userAgent: r } = navigator;
  return /Chrom(e|ium)/i.test(r) ? n = fe.CHROME : /iP(ad|od|hone)/i.test(r) && /WebKit/i.test(r) ? n = fe.IOS : /Safari/i.test(r) ? n = fe.DESKTOP_SAFARI : /Firefox/i.test(r) ? n = fe.FIREFOX : (/MSIE/i.test(r) || document.documentMode) && (n = fe.IE), Re.cachedResult = n, Re.cachedResult;
}
function pn(n, r) {
  const s = Re(), o = tr[s];
  let e = n, t = r, u = e * t;
  const l = e > t ? t / e : e / t;
  for (; u > o * o; ) {
    const h = (o + e) / 2, g = (o + t) / 2;
    h < g ? (t = g, e = g * l) : (t = h * l, e = h), u = e * t;
  }
  return { width: e, height: t };
}
function st(n, r) {
  let s, o;
  try {
    if (s = new OffscreenCanvas(n, r), o = s.getContext("2d"), o === null)
      throw new Error("getContext of OffscreenCanvas returns null");
  } catch {
    s = document.createElement("canvas"), o = s.getContext("2d");
  }
  return s.width = n, s.height = r, [s, o];
}
function vn(n, r) {
  const { width: s, height: o } = pn(n.width, n.height), [e, t] = st(s, o);
  return r && /jpe?g/.test(r) && (t.fillStyle = "white", t.fillRect(0, 0, e.width, e.height)), t.drawImage(n, 0, 0, e.width, e.height), e;
}
function Ke() {
  return Ke.cachedResult !== void 0 || (Ke.cachedResult = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && typeof document < "u" && "ontouchend" in document), Ke.cachedResult;
}
function tt(n, r = {}) {
  return new Promise(function(s, o) {
    let e, t;
    var u = function() {
      try {
        return t = vn(e, r.fileType || n.type), s([e, t]);
      } catch (h) {
        return o(h);
      }
    }, l = function(h) {
      try {
        var g = function(c) {
          try {
            throw c;
          } catch (i) {
            return o(i);
          }
        };
        try {
          let c;
          return _n(n).then(function(i) {
            try {
              return c = i, gn(c).then(function(a) {
                try {
                  return e = a, function() {
                    try {
                      return u();
                    } catch (f) {
                      return o(f);
                    }
                  }();
                } catch (f) {
                  return g(f);
                }
              }, g);
            } catch (a) {
              return g(a);
            }
          }, g);
        } catch (c) {
          g(c);
        }
      } catch (c) {
        return o(c);
      }
    };
    try {
      if (Ke() || [fe.DESKTOP_SAFARI, fe.MOBILE_SAFARI].includes(Re()))
        throw new Error("Skip createImageBitmap on IOS and Safari");
      return createImageBitmap(n).then(function(h) {
        try {
          return e = h, u();
        } catch {
          return l();
        }
      }, l);
    } catch {
      l();
    }
  });
}
function nt(n, r, s, o, e = 1) {
  return new Promise(function(t, u) {
    let l;
    if (r === "image/png") {
      let i, a, f;
      return i = n.getContext("2d"), { data: a } = i.getImageData(0, 0, n.width, n.height), f = ge.encode([a.buffer], n.width, n.height, 4096 * e), l = new Blob([f], { type: r }), l.name = s, l.lastModified = o, h.call(this);
    }
    {
      let i = function() {
        return h.call(this);
      };
      var g = i;
      if (r === "image/bmp")
        return new Promise((a) => dn.toBlob(n, a)).then((function(a) {
          try {
            return l = a, l.name = s, l.lastModified = o, i.call(this);
          } catch (f) {
            return u(f);
          }
        }).bind(this), u);
      {
        let a = function() {
          return i.call(this);
        };
        var c = a;
        if (typeof OffscreenCanvas == "function" && n instanceof OffscreenCanvas)
          return n.convertToBlob({ type: r, quality: e }).then((function(f) {
            try {
              return l = f, l.name = s, l.lastModified = o, a.call(this);
            } catch (v) {
              return u(v);
            }
          }).bind(this), u);
        {
          let f;
          return f = n.toDataURL(r, e), xt(f, s, o).then((function(v) {
            try {
              return l = v, a.call(this);
            } catch (S) {
              return u(S);
            }
          }).bind(this), u);
        }
      }
    }
    function h() {
      return t(l);
    }
  });
}
function be(n) {
  n.width = 0, n.height = 0;
}
function Le() {
  return new Promise(function(n, r) {
    let s, o, e, t;
    return Le.cachedResult !== void 0 ? n(Le.cachedResult) : xt("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==", "test.jpg", Date.now()).then(function(u) {
      try {
        return s = u, tt(s).then(function(l) {
          try {
            return o = l[1], nt(o, s.type, s.name, s.lastModified).then(function(h) {
              try {
                return e = h, be(o), tt(e).then(function(g) {
                  try {
                    return t = g[0], Le.cachedResult = t.width === 1 && t.height === 2, n(Le.cachedResult);
                  } catch (c) {
                    return r(c);
                  }
                }, r);
              } catch (g) {
                return r(g);
              }
            }, r);
          } catch (h) {
            return r(h);
          }
        }, r);
      } catch (l) {
        return r(l);
      }
    }, r);
  });
}
function bn(n) {
  return new Promise((r, s) => {
    const o = new mn();
    o.onload = (e) => {
      const t = new DataView(e.target.result);
      if (t.getUint16(0, !1) != 65496)
        return r(-2);
      const u = t.byteLength;
      let l = 2;
      for (; l < u; ) {
        if (t.getUint16(l + 2, !1) <= 8)
          return r(-1);
        const h = t.getUint16(l, !1);
        if (l += 2, h == 65505) {
          if (t.getUint32(l += 2, !1) != 1165519206)
            return r(-1);
          const g = t.getUint16(l += 6, !1) == 18761;
          l += t.getUint32(l + 4, g);
          const c = t.getUint16(l, g);
          l += 2;
          for (let i = 0; i < c; i++)
            if (t.getUint16(l + 12 * i, g) == 274)
              return r(t.getUint16(l + 12 * i + 8, g));
        } else {
          if ((65280 & h) != 65280)
            break;
          l += t.getUint16(l, !1);
        }
      }
      return r(-1);
    }, o.onerror = (e) => s(e), o.readAsArrayBuffer(n);
  });
}
function yn(n, r) {
  const { width: s } = n, { height: o } = n, { maxWidthOrHeight: e } = r;
  let t, u = n;
  return isFinite(e) && (s > e || o > e) && ([u, t] = st(s, o), s > o ? (u.width = e, u.height = o / s * e) : (u.width = s / o * e, u.height = e), t.drawImage(n, 0, 0, u.width, u.height), be(n)), u;
}
function wn(n, r) {
  const { width: s } = n, { height: o } = n, [e, t] = st(s, o);
  switch (r > 4 && r < 9 ? (e.width = o, e.height = s) : (e.width = s, e.height = o), r) {
    case 2:
      t.transform(-1, 0, 0, 1, s, 0);
      break;
    case 3:
      t.transform(-1, 0, 0, -1, s, o);
      break;
    case 4:
      t.transform(1, 0, 0, -1, 0, o);
      break;
    case 5:
      t.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      t.transform(0, 1, -1, 0, o, 0);
      break;
    case 7:
      t.transform(0, -1, -1, 0, o, s);
      break;
    case 8:
      t.transform(0, -1, 1, 0, 0, s);
  }
  return t.drawImage(n, 0, 0, s, o), be(n), e;
}
function Vt(n, r, s = 0) {
  return new Promise(function(o, e) {
    let t, u, l, h, g, c, i, a, f, v, S, N, b, E, R, F, H, y, z, d;
    function m(C = 5) {
      if (r.signal && r.signal.aborted)
        throw r.signal.reason;
      t += C, r.onProgress(Math.min(t, 100));
    }
    function w(C) {
      if (r.signal && r.signal.aborted)
        throw r.signal.reason;
      t = Math.min(Math.max(C, t), 100), r.onProgress(t);
    }
    return t = s, u = r.maxIteration || 10, l = 1024 * r.maxSizeMB * 1024, m(), tt(n, r).then((function(C) {
      try {
        return [, h] = C, m(), g = yn(h, r), m(), new Promise(function(x, k) {
          var A;
          if (!(A = r.exifOrientation))
            return bn(n).then((function(p) {
              try {
                return A = p, U.call(this);
              } catch (_) {
                return k(_);
              }
            }).bind(this), k);
          function U() {
            return x(A);
          }
          return U.call(this);
        }).then((function(x) {
          try {
            return c = x, m(), Le().then((function(k) {
              try {
                return i = k ? g : wn(g, c), m(), a = r.initialQuality || 1, f = r.fileType || n.type, nt(i, f, n.name, n.lastModified, a).then((function(A) {
                  try {
                    {
                      let L = function() {
                        if (u-- && (R > l || R > b)) {
                          let T, $;
                          return T = d ? 0.95 * z.width : z.width, $ = d ? 0.95 * z.height : z.height, [H, y] = st(T, $), y.drawImage(z, 0, 0, T, $), a *= f === "image/png" ? 0.85 : 0.95, nt(H, f, n.name, n.lastModified, a).then(function(O) {
                            try {
                              return F = O, be(z), z = H, R = F.size, w(Math.min(99, Math.floor((E - R) / (E - l) * 100))), L;
                            } catch (W) {
                              return e(W);
                            }
                          }, e);
                        }
                        return [1];
                      }, M = function() {
                        return be(z), be(H), be(g), be(i), be(h), w(100), o(F);
                      };
                      var p = L, _ = M;
                      if (v = A, m(), S = v.size > l, N = v.size > n.size, !S && !N)
                        return w(100), o(v);
                      var U;
                      return b = n.size, E = v.size, R = E, z = i, d = !r.alwaysKeepResolution && S, (U = (function(T) {
                        for (; T; ) {
                          if (T.then)
                            return void T.then(U, e);
                          try {
                            if (T.pop) {
                              if (T.length)
                                return T.pop() ? M.call(this) : T;
                              T = L;
                            } else
                              T = T.call(this);
                          } catch ($) {
                            return e($);
                          }
                        }
                      }).bind(this))(L);
                    }
                  } catch (L) {
                    return e(L);
                  }
                }).bind(this), e);
              } catch (A) {
                return e(A);
              }
            }).bind(this), e);
          } catch (k) {
            return e(k);
          }
        }).bind(this), e);
      } catch (x) {
        return e(x);
      }
    }).bind(this), e);
  });
}
const rr = `
let scriptImported = false
self.addEventListener('message', async (e) => {
  const { file, id, imageCompressionLibUrl, options } = e.data
  options.onProgress = (progress) => self.postMessage({ progress, id })
  try {
    if (!scriptImported) {
      // console.log('[worker] importScripts', imageCompressionLibUrl)
      self.importScripts(imageCompressionLibUrl)
      scriptImported = true
    }
    // console.log('[worker] self', self)
    const compressedFile = await imageCompression(file, options)
    self.postMessage({ file: compressedFile, id })
  } catch (e) {
    // console.error('[worker] error', e)
    self.postMessage({ error: e.message + '\\n' + e.stack, id })
  }
})
`;
let ft;
function ir(n, r) {
  return new Promise((s, o) => {
    ft || (ft = function(u) {
      const l = [];
      return typeof u == "function" ? l.push(`(${u})()`) : l.push(u), URL.createObjectURL(new Blob(l));
    }(rr));
    const e = new Worker(ft);
    e.addEventListener("message", function(u) {
      if (r.signal && r.signal.aborted)
        e.terminate();
      else if (u.data.progress === void 0) {
        if (u.data.error)
          return o(new Error(u.data.error)), void e.terminate();
        s(u.data.file), e.terminate();
      } else
        r.onProgress(u.data.progress);
    }), e.addEventListener("error", o), r.signal && r.signal.addEventListener("abort", () => {
      o(r.signal.reason), e.terminate();
    }), e.postMessage({ file: n, imageCompressionLibUrl: r.libURL, options: { ...r, onProgress: void 0, signal: void 0 } });
  });
}
function se(n, r) {
  return new Promise(function(s, o) {
    let e, t, u, l, h, g;
    if (e = { ...r }, u = 0, { onProgress: l } = e, e.maxSizeMB = e.maxSizeMB || Number.POSITIVE_INFINITY, h = typeof e.useWebWorker != "boolean" || e.useWebWorker, delete e.useWebWorker, e.onProgress = (f) => {
      u = f, typeof l == "function" && l(u);
    }, !(n instanceof Blob || n instanceof nr))
      return o(new Error("The file given is not an instance of Blob or File"));
    if (!/^image/.test(n.type))
      return o(new Error("The file given is not an image"));
    if (g = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope, !h || typeof Worker != "function" || g)
      return Vt(n, e).then((function(f) {
        try {
          return t = f, a.call(this);
        } catch (v) {
          return o(v);
        }
      }).bind(this), o);
    var c = (function() {
      try {
        return a.call(this);
      } catch (f) {
        return o(f);
      }
    }).bind(this), i = function(f) {
      try {
        return Vt(n, e).then(function(v) {
          try {
            return t = v, c();
          } catch (S) {
            return o(S);
          }
        }, o);
      } catch (v) {
        return o(v);
      }
    };
    try {
      return e.libURL = e.libURL || "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js", ir(n, e).then(function(f) {
        try {
          return t = f, c();
        } catch {
          return i();
        }
      }, i);
    } catch {
      i();
    }
    function a() {
      try {
        t.name = n.name, t.lastModified = n.lastModified;
      } catch {
      }
      try {
        e.preserveExif && n.type === "image/jpeg" && (!e.fileType || e.fileType && e.fileType === n.type) && (t = fn(n, t));
      } catch {
      }
      return s(t);
    }
  });
}
se.getDataUrlFromFile = _n, se.getFilefromDataUrl = xt, se.loadImage = gn, se.drawImageInCanvas = vn, se.drawFileInCanvas = tt, se.canvasToFile = nt, se.getExifOrientation = bn, se.handleMaxWidthOrHeight = yn, se.followExifOrientation = wn, se.cleanupCanvasMemory = be, se.isAutoOrientationInBrowser = Le, se.approximateBelowMaximumCanvasSizeOfBrowser = pn, se.copyExifWithoutOrientation = fn, se.getBrowserName = Re, se.version = "2.0.2";
const rt = {
  quality: 0.6,
  // 默认质量值
  useQuality: !0,
  // 默认启用质量压缩
  maintainSize: !0,
  // 默认保持原始尺寸 (已弃用)
  maxWidth: 1920,
  // 默认最大宽度
  maxHeight: 1080,
  // 默认最大高度
  useScaling: !1,
  // 默认不使用百分比缩放
  scalePercent: 100,
  // 默认100%不缩放
  useSizeLimits: !1,
  // 默认不使用最大尺寸限制
  enabled: !0
  // 默认启用压缩
};
class ye {
  constructor(r = rt) {
    Ee(this, "settings");
    this.settings = r;
  }
  /**
   * 更新压缩设置
   */
  updateSettings(r) {
    this.settings = { ...this.settings, ...r }, console.log("更新压缩设置:", this.settings);
  }
  /**
   * 获取当前压缩设置
   */
  getSettings() {
    return { ...this.settings };
  }
  /**
   * 检查文件是否可以压缩
   */
  canCompress(r) {
    return this.settings.enabled ? ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(r.type) : !1;
  }
  /**
   * 压缩图片文件
   */
  async compressImage(r) {
    if (!this.canCompress(r))
      throw new Error("File cannot be compressed");
    const s = performance.now();
    console.log("开始压缩图片，设置:", {
      quality: this.settings.quality,
      useQuality: this.settings.useQuality,
      maxWidth: this.settings.maxWidth,
      maxHeight: this.settings.maxHeight,
      useScaling: this.settings.useScaling,
      scalePercent: this.settings.scalePercent,
      useSizeLimits: this.settings.useSizeLimits
    });
    let o = this.settings.quality;
    r.size > 1024 * 1024 ? o = Math.min(o, 0.5) : r.size > 500 * 1024 && (o = Math.min(o, 0.6)), r.type === "image/png" && (o = Math.min(o, 0.5));
    const e = {
      maxSizeMB: 10,
      // 最大文件大小限制（MB）
      useWebWorker: !0,
      // 使用WebWorker进行压缩（提高性能）
      alwaysKeepResolution: !this.settings.useScaling && !this.settings.useSizeLimits,
      // 只有当不使用任何尺寸调整选项时才保持分辨率
      initialQuality: this.settings.useQuality !== !1 ? o : 1,
      // 只有当启用质量压缩时才应用质量设置
      maxIteration: 10,
      // 最大压缩迭代次数
      fileType: r.type,
      // 确保输出与输入文件类型相同
      exifOrientation: 1,
      // 修正图片方向
      onProgress: () => {
      }
      // 防止进度回调报错
    };
    let t = !1, u = null;
    if (this.settings.useScaling || this.settings.useSizeLimits) {
      t = !0;
      try {
        const l = new Image(), h = new Promise((g) => {
          l.onload = () => {
            g({ width: l.width, height: l.height });
          }, l.onerror = () => {
            g({ width: 0, height: 0 });
          };
        });
        l.src = URL.createObjectURL(r), u = await h, URL.revokeObjectURL(l.src);
      } catch (l) {
        console.warn("获取图片尺寸失败:", l), t = !1;
      }
    }
    if (t && u && u.width > 0 && u.height > 0) {
      let l = u.width, h = u.height;
      if (this.settings.useScaling && this.settings.scalePercent && this.settings.scalePercent < 100) {
        const g = this.settings.scalePercent / 100;
        l = Math.floor(l * g), h = Math.floor(h * g), console.log(`应用百分比缩放 ${this.settings.scalePercent}%:`, {
          originalDimensions: u,
          scaledDimensions: { width: l, height: h }
        });
      }
      if (this.settings.useSizeLimits && this.settings.maxWidth && this.settings.maxHeight) {
        if (l > this.settings.maxWidth) {
          const g = this.settings.maxWidth / l;
          l = this.settings.maxWidth, h = Math.floor(h * g);
        }
        if (h > this.settings.maxHeight) {
          const g = this.settings.maxHeight / h;
          h = this.settings.maxHeight, l = Math.floor(l * g);
        }
        console.log("应用最大尺寸限制:", {
          maxWidth: this.settings.maxWidth,
          maxHeight: this.settings.maxHeight,
          resultDimensions: { width: l, height: h }
        });
      }
      (l !== u.width || h !== u.height) && (e.maxWidthOrHeight = Math.max(l, h), e.alwaysKeepResolution = !1, console.log("最终尺寸调整:", {
        originalDimensions: u,
        targetDimensions: { width: l, height: h },
        maxWidthOrHeight: e.maxWidthOrHeight
      }));
    }
    try {
      console.log("压缩选项:", e);
      const l = await se(r, e), h = {
        originalFile: r,
        compressedFile: l,
        originalSize: r.size,
        compressedSize: l.size,
        compressionRatio: l.size / r.size
      }, g = performance.now();
      if (console.log("压缩完成:", {
        originalSize: this.formatFileSize(h.originalSize),
        compressedSize: this.formatFileSize(h.compressedSize),
        ratio: `${(h.compressionRatio * 100).toFixed(2)}%`,
        reduction: `${((1 - h.compressionRatio) * 100).toFixed(2)}%`,
        time: `${(g - s).toFixed(0)}ms`
      }), l.size >= r.size * 0.9) {
        console.log("压缩效果不明显，尝试使用更低质量再次压缩");
        const c = {
          ...e,
          initialQuality: Math.max(0.1, o - 0.4),
          // 大幅降低质量
          fileType: r.type,
          maxWidthOrHeight: e.maxWidthOrHeight ? Math.floor(e.maxWidthOrHeight * 0.8) : (
            // 降低分辨率
            this.settings.maxWidth ? Math.floor(Math.max(this.settings.maxWidth, this.settings.maxHeight || 0) * 0.8) : void 0
          )
        };
        console.log("强制压缩选项:", c);
        try {
          const i = await se(r, c);
          if (i.size < l.size * 0.9) {
            const a = {
              originalFile: r,
              compressedFile: i,
              originalSize: r.size,
              compressedSize: i.size,
              compressionRatio: i.size / r.size
            };
            return console.log("强制压缩成功:", {
              originalSize: this.formatFileSize(a.originalSize),
              compressedSize: this.formatFileSize(a.compressedSize),
              ratio: `${(a.compressionRatio * 100).toFixed(2)}%`,
              reduction: `${((1 - a.compressionRatio) * 100).toFixed(2)}%`
            }), a;
          }
        } catch (i) {
          console.warn("二次压缩失败，使用第一次压缩结果", i);
        }
      }
      return h;
    } catch (l) {
      throw console.error("压缩图片出错:", l), l;
    }
  }
  /**
   * 格式化文件大小为易读格式
   */
  static formatFileSize(r) {
    if (r === 0)
      return "0 Bytes";
    const s = 1024, o = ["Bytes", "KB", "MB", "GB"], e = Math.floor(Math.log(r) / Math.log(s));
    return parseFloat((r / Math.pow(s, e)).toFixed(2)) + " " + o[e];
  }
  /**
   * 格式化文件大小为易读格式（实例方法版本）
   */
  formatFileSize(r) {
    return ye.formatFileSize(r);
  }
}
function or() {
  const [n, r] = He(rt), [s, o] = He({
    originalImage: null,
    compressedImage: null,
    originalSize: 0,
    compressedSize: 0,
    compressionRatio: 0,
    originalDimensions: null,
    compressedDimensions: null,
    isCompressing: !1,
    error: null,
    originalFile: null,
    settingsChanged: !1
  }), [e, t] = He(!1), [u, l] = He(!1), [h, g] = He(!1), [c, i] = He(!1), a = Rn(null), f = window.Blinko.i18n;
  Tt(() => {
    const d = () => {
      const m = window.innerWidth < 640;
      l(m);
    };
    return d(), window.addEventListener("resize", d), () => window.removeEventListener("resize", d);
  }, []), Tt(() => {
    window.Blinko.api.config.getPluginConfig.query({
      pluginName: "blinko-image-compressor"
    }).then((d) => {
      if (d && d.compressionSettings)
        try {
          const m = JSON.parse(d.compressionSettings);
          r(m);
        } catch (m) {
          console.error("无法解析保存的设置:", m);
        }
    }).catch((d) => {
      console.error("加载设置失败:", d);
    });
  }, []);
  const v = async (d) => {
    if (!d || !d.type.startsWith("image/")) {
      o((m) => ({
        ...m,
        error: "请选择有效的图片文件",
        settingsChanged: !1
      }));
      return;
    }
    try {
      o((U) => ({
        ...U,
        isCompressing: !0,
        error: null,
        originalFile: d,
        settingsChanged: !1
      }));
      const m = URL.createObjectURL(d), w = await S(m), x = await new ye(n).compressImage(d), k = URL.createObjectURL(x.compressedFile), A = await S(k);
      o((U) => ({
        ...U,
        originalImage: m,
        compressedImage: k,
        originalSize: x.originalSize,
        compressedSize: x.compressedSize,
        compressionRatio: x.compressionRatio,
        originalDimensions: w,
        compressedDimensions: A,
        isCompressing: !1,
        error: null,
        settingsChanged: !1
      }));
    } catch (m) {
      console.error("压缩图片出错:", m), o((w) => ({
        ...w,
        isCompressing: !1,
        error: `压缩失败: ${m.message}`,
        settingsChanged: !1
      }));
    }
  }, S = (d) => new Promise((m) => {
    const w = new Image();
    w.onload = () => {
      m({ width: w.width, height: w.height });
    }, w.onerror = () => {
      m({ width: 0, height: 0 });
    }, w.src = d;
  }), N = (d) => {
    var m;
    d.preventDefault(), t(!1), (m = d.dataTransfer) != null && m.files && d.dataTransfer.files.length > 0 && v(d.dataTransfer.files[0]);
  }, b = (d) => {
    const m = d.currentTarget.files;
    m && m.length > 0 && v(m[0]);
  }, E = (d) => {
    const m = { ...n, ...d };
    r(m), s.originalFile && o((w) => ({
      ...w,
      settingsChanged: !0
    }));
  }, R = () => {
    s.originalFile && s.settingsChanged && v(s.originalFile);
  }, F = () => {
    var d;
    (d = a.current) == null || d.click();
  }, H = u && !h, y = () => {
    i(!0);
  }, z = () => {
    i(!1);
  };
  return /* @__PURE__ */ I("div", { className: "max-w-4xl mx-auto p-4 rounded-lg max-h-[70vh] overflow-y-auto", children: [
    /* @__PURE__ */ I("h2", { className: "text-lg font-medium mb-5 text-gray-700 flex items-center", children: [
      /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-blue-500", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ I("path", { fillRule: "evenodd", d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z", clipRule: "evenodd" }) }),
      f.t("imageCompressor.preview.title")
    ] }),
    /* @__PURE__ */ I("div", { className: "mb-6 bg-white p-5 rounded-lg shadow-md border border-gray-100", children: [
      /* @__PURE__ */ I("h3", { className: "font-medium mb-4 text-base flex items-center text-gray-700", children: [
        /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1 text-blue-500", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ I("path", { fillRule: "evenodd", d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) }),
        f.t("imageCompressor.settings.title")
      ] }),
      /* @__PURE__ */ I("div", { className: "mb-4", children: [
        /* @__PURE__ */ I("h4", { className: "text-sm font-medium mb-3 bg-gray-50 p-2 rounded-md text-gray-700", children: f.t("imageCompressor.settings.options") }),
        /* @__PURE__ */ I("div", { className: "mb-5 pl-2", children: [
          /* @__PURE__ */ I("label", { className: "flex items-center space-x-2 mb-2 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer", children: [
            /* @__PURE__ */ I(
              "input",
              {
                type: "checkbox",
                checked: n.useQuality !== !1,
                onChange: (d) => E({ useQuality: d.currentTarget.checked }),
                className: "h-5 w-5 rounded text-blue-500 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ I("span", { className: "text-sm font-medium text-gray-700", children: f.t("imageCompressor.settings.useQuality") })
          ] }),
          n.useQuality !== !1 && /* @__PURE__ */ I(Pe, { children: /* @__PURE__ */ I("div", { className: "ml-6 mt-3", children: [
            /* @__PURE__ */ I("label", { className: "block text-sm font-medium mb-2 text-gray-700", children: [
              f.t("imageCompressor.settings.quality"),
              " (",
              Math.round(n.quality * 100),
              "%)",
              /* @__PURE__ */ I("div", { className: "flex items-center mt-2", children: [
                /* @__PURE__ */ I(
                  "input",
                  {
                    type: "range",
                    min: "10",
                    max: "100",
                    value: n.quality * 100,
                    onChange: (d) => E({ quality: Number(d.currentTarget.value) / 100 }),
                    className: "block w-full mr-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  }
                ),
                /* @__PURE__ */ I(
                  "input",
                  {
                    type: "number",
                    min: "10",
                    max: "100",
                    value: Math.round(n.quality * 100),
                    onChange: (d) => E({ quality: Number(d.currentTarget.value) / 100 }),
                    className: "w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ I("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
              /* @__PURE__ */ I("span", { children: "10%" }),
              /* @__PURE__ */ I("span", { children: "100%" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ I("div", { className: "mb-5 pl-2", children: [
          /* @__PURE__ */ I("label", { className: "flex items-center space-x-2 mb-2 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer", children: [
            /* @__PURE__ */ I(
              "input",
              {
                type: "checkbox",
                checked: n.useScaling !== !1,
                onChange: (d) => E({ useScaling: d.currentTarget.checked }),
                className: "h-5 w-5 rounded text-blue-500 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ I("span", { className: "text-sm font-medium text-gray-700", children: f.t("imageCompressor.settings.useScaling") })
          ] }),
          n.useScaling !== !1 && /* @__PURE__ */ I("div", { className: "ml-6 mt-3", children: [
            /* @__PURE__ */ I("label", { className: "block text-sm font-medium mb-2 text-gray-700", children: [
              f.t("imageCompressor.settings.scalePercent"),
              " (",
              n.scalePercent || 100,
              "%)",
              /* @__PURE__ */ I("div", { className: "flex items-center mt-2", children: [
                /* @__PURE__ */ I(
                  "input",
                  {
                    type: "range",
                    min: "10",
                    max: "100",
                    step: "1",
                    value: n.scalePercent || 100,
                    onChange: (d) => E({ scalePercent: Number(d.currentTarget.value) }),
                    className: "block w-full mr-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  }
                ),
                /* @__PURE__ */ I(
                  "input",
                  {
                    type: "number",
                    min: "10",
                    max: "100",
                    value: n.scalePercent || 100,
                    onChange: (d) => E({ scalePercent: Number(d.currentTarget.value) }),
                    className: "w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ I("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
              /* @__PURE__ */ I("span", { children: "10%" }),
              /* @__PURE__ */ I("span", { children: "100%" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ I("div", { className: "mb-4 pl-2", children: [
          /* @__PURE__ */ I("label", { className: "flex items-center space-x-2 mb-2 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer", children: [
            /* @__PURE__ */ I(
              "input",
              {
                type: "checkbox",
                checked: n.useSizeLimits !== !1,
                onChange: (d) => E({ useSizeLimits: d.currentTarget.checked }),
                className: "h-5 w-5 rounded text-blue-500 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ I("span", { className: "text-sm font-medium text-gray-700", children: f.t("imageCompressor.settings.useSizeLimits") })
          ] }),
          n.useSizeLimits !== !1 && /* @__PURE__ */ I("div", { className: "ml-6", children: /* @__PURE__ */ I("div", { className: `grid ${u ? "grid-cols-1 gap-2" : "grid-cols-2 gap-4"} mb-2`, children: [
            /* @__PURE__ */ I("div", { children: /* @__PURE__ */ I("label", { className: "block text-sm font-medium mb-2", children: [
              f.t("imageCompressor.settings.maxWidth"),
              " (px)",
              /* @__PURE__ */ I(
                "input",
                {
                  type: "number",
                  min: "100",
                  max: "10000",
                  value: n.maxWidth || 1920,
                  onChange: (d) => E({ maxWidth: Number(d.currentTarget.value) }),
                  className: "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                }
              )
            ] }) }),
            /* @__PURE__ */ I("div", { children: /* @__PURE__ */ I("label", { className: "block text-sm font-medium mb-2", children: [
              f.t("imageCompressor.settings.maxHeight"),
              " (px)",
              /* @__PURE__ */ I(
                "input",
                {
                  type: "number",
                  min: "100",
                  max: "10000",
                  value: n.maxHeight || 1080,
                  onChange: (d) => E({ maxHeight: Number(d.currentTarget.value) }),
                  className: "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                }
              )
            ] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ I("div", { className: "mt-5 flex justify-between", children: [
        s.originalFile && s.settingsChanged && /* @__PURE__ */ I(
          "button",
          {
            onClick: R,
            className: "py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
            disabled: s.isCompressing,
            children: s.isCompressing ? "正在压缩..." : f.t("imageCompressor.preview.compressNow")
          }
        ),
        /* @__PURE__ */ I(
          "button",
          {
            onClick: () => E({ ...rt }),
            className: "py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors",
            children: f.t("imageCompressor.settings.reset")
          }
        )
      ] })
    ] }),
    !s.originalImage && /* @__PURE__ */ I(
      "div",
      {
        className: `border-2 border-dashed rounded-lg p-6 text-center ${e ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"} transition-colors`,
        onDragOver: (d) => {
          d.preventDefault(), t(!0);
        },
        onDragLeave: () => t(!1),
        onDrop: N,
        onClick: F,
        children: [
          /* @__PURE__ */ I(
            "input",
            {
              ref: a,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: b
            }
          ),
          /* @__PURE__ */ I("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-gray-400 mb-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ I("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
            /* @__PURE__ */ I("p", { className: "mb-2", children: f.t("imageCompressor.preview.dragImage") })
          ] })
        ]
      }
    ),
    s.error && /* @__PURE__ */ I("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-4 shadow-sm", children: /* @__PURE__ */ I("div", { className: "flex", children: [
      /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-red-500 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ I("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }),
      s.error
    ] }) }),
    s.isCompressing && /* @__PURE__ */ I("div", { className: "text-center py-8 bg-white rounded-md shadow-sm border border-gray-100 mt-4", children: [
      /* @__PURE__ */ I("div", { className: "inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500" }),
      /* @__PURE__ */ I("p", { className: "mt-4 text-gray-600", children: "压缩中..." })
    ] }),
    s.originalImage && s.compressedImage && !s.isCompressing && /* @__PURE__ */ I("div", { className: "mt-6", children: [
      /* @__PURE__ */ I("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ I("h3", { className: "text-lg font-semibold text-gray-700 flex items-center", children: [
          /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-[#4a90e2]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ I("path", { d: "M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3" }),
            /* @__PURE__ */ I("rect", { x: "6", y: "4", width: "4", height: "16", rx: "1" }),
            /* @__PURE__ */ I("rect", { x: "14", y: "4", width: "4", height: "16", rx: "1" })
          ] }),
          "图片对比"
        ] }),
        u && /* @__PURE__ */ I(
          "button",
          {
            onClick: () => g(!h),
            className: "text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center",
            children: [
              /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: h ? /* @__PURE__ */ I("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h7" }) : /* @__PURE__ */ I("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" }) }),
              h ? "单列显示" : "双列显示"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ I("div", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-4", children: /* @__PURE__ */ I("div", { className: "bg-gradient-to-r from-blue-50 to-green-50 px-4 py-3 border-b", children: /* @__PURE__ */ I("div", { className: "flex flex-wrap justify-between items-center", children: [
        /* @__PURE__ */ I("div", { className: "flex items-center", children: [
          /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-blue-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ I("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
            /* @__PURE__ */ I("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
            /* @__PURE__ */ I("polyline", { points: "21 15 16 10 5 21" })
          ] }),
          /* @__PURE__ */ I("div", { children: [
            /* @__PURE__ */ I("span", { className: "font-medium", children: "原始图片:" }),
            /* @__PURE__ */ I("span", { className: "ml-2 text-sm text-gray-700", children: [
              ye.formatFileSize(s.originalSize),
              s.originalDimensions && /* @__PURE__ */ I("span", { className: "ml-1", children: [
                "(",
                s.originalDimensions.width,
                " × ",
                s.originalDimensions.height,
                ")"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ I("div", { className: "flex items-center mt-2 sm:mt-0", children: [
          /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-green-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ I("path", { d: "M8 17L12 21L16 17" }),
            /* @__PURE__ */ I("path", { d: "M12 12V21" }),
            /* @__PURE__ */ I("path", { d: "M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" }),
            /* @__PURE__ */ I("polyline", { points: "16 16 12 12 8 16" })
          ] }),
          /* @__PURE__ */ I("div", { children: [
            /* @__PURE__ */ I("span", { className: "font-medium", children: "压缩后:" }),
            /* @__PURE__ */ I("span", { className: "ml-2 text-sm text-gray-700", children: [
              ye.formatFileSize(s.compressedSize),
              s.compressedDimensions && /* @__PURE__ */ I("span", { className: "ml-1", children: [
                "(",
                s.compressedDimensions.width,
                " × ",
                s.compressedDimensions.height,
                ")"
              ] }),
              /* @__PURE__ */ I("span", { className: s.compressionRatio < 1 ? "ml-1 text-green-600 font-medium" : "ml-1 text-orange-500 font-medium", children: [
                "(",
                Math.round((1 - s.compressionRatio) * 100),
                "% 减少)"
              ] })
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ I(
        "div",
        {
          className: "border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer mb-4 bg-white relative group",
          onClick: y,
          children: /* @__PURE__ */ I("div", { className: "flex justify-center items-center p-3", children: [
            /* @__PURE__ */ I("div", { className: "absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10", children: /* @__PURE__ */ I("div", { className: "bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center", children: [
              /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-blue-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ I("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3h-6" }) }),
              "点击查看大图对比"
            ] }) }),
            /* @__PURE__ */ I("div", { className: `grid ${H ? "grid-cols-1 gap-4" : "grid-cols-2 gap-4"} w-full`, children: [
              /* @__PURE__ */ I("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ I("div", { className: "text-sm text-gray-500 mb-2 text-center", children: "原始图片" }),
                /* @__PURE__ */ I("div", { className: "bg-gray-50 p-2 rounded w-full flex justify-center", children: /* @__PURE__ */ I(
                  "img",
                  {
                    src: s.originalImage,
                    alt: "Original",
                    className: "object-contain max-h-[300px] w-auto"
                  }
                ) })
              ] }),
              /* @__PURE__ */ I("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ I("div", { className: "text-sm text-gray-500 mb-2 text-center", children: "压缩后" }),
                /* @__PURE__ */ I("div", { className: "bg-gray-50 p-2 rounded w-full flex justify-center", children: /* @__PURE__ */ I(
                  "img",
                  {
                    src: s.compressedImage,
                    alt: "Compressed",
                    className: "object-contain max-h-[300px] w-auto"
                  }
                ) })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ I("div", { className: "flex justify-center mt-6 mb-6", children: /* @__PURE__ */ I(
        "button",
        {
          className: "px-8 py-3 bg-white border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-sm font-medium flex items-center",
          onClick: () => {
            o({
              originalImage: null,
              compressedImage: null,
              originalSize: 0,
              compressedSize: 0,
              compressionRatio: 0,
              originalDimensions: null,
              compressedDimensions: null,
              isCompressing: !1,
              error: null,
              originalFile: null,
              settingsChanged: !1
            }), a.current && (a.current.value = "");
          },
          children: [
            /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ I("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }),
            "重新选择图片"
          ]
        }
      ) })
    ] }),
    c && /* @__PURE__ */ I(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4",
        onClick: z,
        children: /* @__PURE__ */ I("div", { className: "relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg p-4 overflow-auto", onClick: (d) => d.stopPropagation(), children: [
          /* @__PURE__ */ I("div", { className: "flex flex-col md:flex-row items-center justify-center gap-4", children: [
            /* @__PURE__ */ I("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ I("h3", { className: "text-base text-gray-700 mb-2", children: "原始图片" }),
              /* @__PURE__ */ I("div", { className: "bg-gray-50 p-2 rounded", children: /* @__PURE__ */ I(
                "img",
                {
                  src: s.originalImage || "",
                  alt: "Original full view",
                  className: "max-h-[70vh] max-w-[45vw] object-contain"
                }
              ) }),
              /* @__PURE__ */ I("div", { className: "text-sm text-gray-500 mt-2", children: [
                ye.formatFileSize(s.originalSize),
                s.originalDimensions && /* @__PURE__ */ I("span", { children: [
                  " (",
                  s.originalDimensions.width,
                  " × ",
                  s.originalDimensions.height,
                  ")"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ I("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ I("h3", { className: "text-base text-gray-700 mb-2", children: "压缩后" }),
              /* @__PURE__ */ I("div", { className: "bg-gray-50 p-2 rounded", children: /* @__PURE__ */ I(
                "img",
                {
                  src: s.compressedImage || "",
                  alt: "Compressed full view",
                  className: "max-h-[70vh] max-w-[45vw] object-contain"
                }
              ) }),
              /* @__PURE__ */ I("div", { className: "text-sm text-gray-500 mt-2", children: [
                ye.formatFileSize(s.compressedSize),
                s.compressedDimensions && /* @__PURE__ */ I("span", { children: [
                  " (",
                  s.compressedDimensions.width,
                  " × ",
                  s.compressedDimensions.height,
                  ")"
                ] }),
                /* @__PURE__ */ I("span", { className: s.compressionRatio < 1 ? "ml-1 text-green-600" : "ml-1 text-orange-500", children: [
                  "(",
                  Math.round((1 - s.compressionRatio) * 100),
                  "% 减少)"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ I(
            "button",
            {
              className: "absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300",
              onClick: z,
              children: /* @__PURE__ */ I("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ I("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] })
      }
    )
  ] });
}
System.register([], (n) => ({
  execute: () => {
    n("default", class {
      constructor() {
        Ee(this, "imageCompressor");
        Ee(this, "settings", rt);
        Ee(this, "originalUploadFunction", null);
        // 启用设置面板
        Ee(this, "withSettingPanel", !0);
        /**
         * Renders the settings panel UI
         * @returns {HTMLElement} Container element with rendered settings component
         */
        Ee(this, "renderSettingPanel", () => {
          const s = document.createElement("div");
          return qn(/* @__PURE__ */ I(or, {}), s), s;
        });
        Object.assign(this, { name: "blinko-image-compressor", author: "jooooody", url: "https://github.com/GreenHatHG/blinko-image-compressor", version: "0.0.1", minAppVersion: "0.0.0", displayName: { default: "Blinko Image Compressor", zh: "Blinko图片压缩器" }, description: { default: "Automatically compress images when uploading to save storage space and bandwidth. Access compression settings through the plugin settings panel.", zh: "上传图片时自动压缩，节省存储空间和带宽。通过插件设置面板访问压缩设置。" }, readme: { default: "README.md", zh: "README_zh.md" } }), this.imageCompressor = new ye(this.settings);
      }
      /**
       * Initializes the plugin
       * Sets up internationalization and hooks into file upload
       */
      async init() {
        this.initI18n(), await this.loadSettings(), this.interceptFileUpload();
      }
      /**
       * Loads saved compression settings from plugin config
       */
      async loadSettings() {
        try {
          const s = await window.Blinko.api.config.getPluginConfig.query({
            pluginName: "blinko-image-compressor"
          });
          if (s && s.compressionSettings)
            try {
              const o = JSON.parse(s.compressionSettings);
              this.settings = o, this.imageCompressor.updateSettings(o), console.log("Loaded compression settings:", o);
            } catch (o) {
              console.error("Failed to parse saved settings:", o);
            }
        } catch (s) {
          console.error("Failed to load settings:", s);
        }
      }
      /**
       * Intercepts file upload process to compress images before upload
       */
      interceptFileUpload() {
        var o, e;
        const s = window.Blinko;
        (e = (o = s.store) == null ? void 0 : o.resourceStore) != null && e.upload && (this.originalUploadFunction = s.store.resourceStore.upload, s.store.resourceStore.upload = async (t) => {
          if (this.settings.enabled && this.imageCompressor.canCompress(t))
            try {
              const u = s.i18n;
              console.log("开始压缩图片:", t.name, "Size:", t.size, "Type:", t.type, "设置:", this.settings);
              const l = await this.imageCompressor.compressImage(t);
              if (l.compressionRatio < 0.9) {
                const h = ye.formatFileSize(l.originalSize), g = ye.formatFileSize(l.compressedSize), c = Math.round((1 - l.compressionRatio) * 100);
                if (s.toast.success(
                  u.t("imageCompressor.messages.compressed", {
                    original: h,
                    compressed: g,
                    percent: c
                  })
                ), console.log("压缩成功:", {
                  file: t.name,
                  originalSize: h,
                  compressedSize: g,
                  reduction: `${c}%`,
                  compressionRatio: l.compressionRatio
                }), !l.compressedFile.type || l.compressedFile.type !== t.type) {
                  console.warn("文件类型不匹配, 设置正确的 MIME 类型:", t.type);
                  const i = new File(
                    [await l.compressedFile.arrayBuffer()],
                    l.compressedFile.name,
                    { type: t.type }
                  );
                  return this.originalUploadFunction(i);
                }
                return this.originalUploadFunction(l.compressedFile);
              } else
                s.toast.info && s.toast.info(u.t("imageCompressor.messages.noCompression")), console.log("压缩效果不明显，使用原始文件:", {
                  file: t.name,
                  originalSize: l.originalSize,
                  compressedSize: l.compressedSize,
                  compressionRatio: l.compressionRatio
                });
            } catch (u) {
              console.error("Error compressing image:", u), s.toast.error(
                s.i18n.t("imageCompressor.messages.error", {
                  message: u.message
                })
              );
            }
          return this.originalUploadFunction(t);
        });
      }
      /**
       * Initializes internationalization resources
       * Adds English and Chinese translation bundles
       */
      initI18n() {
        window.Blinko.i18n.addResourceBundle("en", "translation", { title: "Image Compressor", countLabel: "Count is {{count}}", successMessage: "Success!", imageCompressor: { title: "Image Compression", tooltip: "Image Compressor", settingIconTooltip: "Click this image editor icon to open settings panel", settings: { title: "Image Compression Settings", quality: "Compression Quality", options: "Compression Options", useQuality: "Use quality compression", useScaling: "Use percentage scaling", useSizeLimits: "Use maximum size limits", maintainSize: "Maintain Original Size (No resolution change)", maxWidth: "Maximum Width", maxHeight: "Maximum Height", scalePercent: "Scale by Percentage", sizeCombinationNote: "Note: Both percentage scaling and maximum dimensions will be applied together, using the more restrictive limit", preset: "Preset", save: "Save Settings", reset: "Reset Settings" }, messages: { saved: "Settings saved", resetDone: "Settings reset to default", compressed: "Image compressed: {{original}} → {{compressed}} ({{percent}}% reduction)", noCompression: "Image doesn't need compression or compression effect is minimal", error: "Compression failed: {{message}}" }, preview: { title: "Image Compression Preview", dragImage: "Drag an image here, or click to select", selectImage: "Select Image", original: "Original Image", compressed: "Compressed", compressNow: "Compress Now" } } }), window.Blinko.i18n.addResourceBundle("zh", "translation", { title: "图片压缩器", countLabel: "计数为 {{count}}", successMessage: "成功！", imageCompressor: { title: "图片压缩", tooltip: "图片压缩工具", settingIconTooltip: "点击此图片编辑图标打开设置面板", settings: { title: "图片压缩设置", quality: "压缩质量", options: "压缩选项", useQuality: "使用质量压缩", useScaling: "使用百分比缩放", useSizeLimits: "使用最大尺寸限制", maintainSize: "保持原始尺寸（不调整图片分辨率）", maxWidth: "最大宽度", maxHeight: "最大高度", scalePercent: "按百分比缩放", sizeCombinationNote: "注意：百分比缩放和最大尺寸限制会同时应用，取较严格的限制值", preset: "预设", save: "保存设置", reset: "重置设置" }, messages: { saved: "设置已保存", resetDone: "设置已重置", compressed: "图片已压缩: {{original}} → {{compressed}} (减少 {{percent}}%)", noCompression: "图片无需压缩或压缩效果不明显", error: "压缩失败: {{message}}" }, preview: { title: "图片压缩预览", dragImage: "拖拽图片到此处，或点击选择", selectImage: "选择图片", original: "原始图片", compressed: "压缩后", compressNow: "立即压缩" } } });
      }
      /**
       * Cleanup function called when plugin is disabled
       */
      destroy() {
        var o;
        const s = window.Blinko;
        this.originalUploadFunction && ((o = s.store) != null && o.resourceStore) && (s.store.resourceStore.upload = this.originalUploadFunction), s.events && s.events.off && s.events.off("editor:loaded"), console.log("Image Compressor plugin destroyed");
      }
    });
  }
}));
