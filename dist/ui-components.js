// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ee = Object.prototype.hasOwnProperty;
	function te(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ne(e, t) {
		return te(e.type, t, e.props);
	}
	function T(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function re(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ie = /\/+/g;
	function ae(e, t) {
		return typeof e == "object" && e && e.key != null ? re("" + e.key) : t.toString(36);
	}
	function oe(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function se(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, se(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ae(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ie, "$&/") + "/"), se(o, r, i, "", function(e) {
			return e;
		})) : o != null && (T(o) && (o = ne(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ie, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ae(a, u), c += se(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ae(a, u++), c += se(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return se(oe(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ce(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return se(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function le(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var E = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, D = {
		map: ce,
		forEach: function(e, t, n) {
			ce(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ce(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ce(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!T(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = D, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ee.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return te(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ee.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return te(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = T, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: le
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, E);
		} catch (e) {
			E(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.0";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, T());
			else {
				var t = n(l);
				t !== null && ae(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, ee = -1;
	function te() {
		return g ? !0 : !(e.unstable_now() - ee < w);
	}
	function ne() {
		if (g = !1, S) {
			var t = e.unstable_now();
			ee = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && te());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ae(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? T() : S = !1;
			}
		}
	}
	var T;
	if (typeof y == "function") T = function() {
		y(ne);
	};
	else if (typeof MessageChannel < "u") {
		var re = new MessageChannel(), ie = re.port2;
		re.port1.onmessage = ne, T = function() {
			ie.postMessage(null);
		};
	} else T = function() {
		_(ne, 0);
	};
	function ae(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ae(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, T()))), r;
	}, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = c(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = c(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.0";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), re = Symbol.for("react.activity"), ie = Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
	function oe(e) {
		return typeof e != "object" || !e ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var se = Symbol.for("react.client.reference");
	function ce(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === se ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ee: return "Suspense";
			case te: return "SuspenseList";
			case re: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ne: return t = e.displayName || null, t === null ? ce(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return ce(e(t));
				} catch {}
		}
		return null;
	}
	var le = Array.isArray, E = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ue = [], de = -1;
	function fe(e) {
		return { current: e };
	}
	function k(e) {
		0 > de || (e.current = ue[de], ue[de] = null, de--);
	}
	function A(e, t) {
		de++, ue[de] = e.current, e.current = t;
	}
	var pe = fe(null), me = fe(null), he = fe(null), ge = fe(null);
	function _e(e, t) {
		switch (A(he, t), A(me, e), A(pe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		k(pe), A(pe, e);
	}
	function ve() {
		k(pe), k(me), k(he);
	}
	function ye(e) {
		e.memoizedState !== null && A(ge, e);
		var t = pe.current, n = Hd(t, e.type);
		t !== n && (A(me, e), A(pe, n));
	}
	function be(e) {
		me.current === e && (k(pe), k(me)), ge.current === e && (k(ge), Qf._currentValue = O);
	}
	var xe, j;
	function Se(e) {
		if (xe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			xe = t && t[1] || "", j = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + xe + e + j;
	}
	var M = !1;
	function Ce(e, t) {
		if (!e || M) return "";
		M = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			M = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Se(n) : "";
	}
	function we(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Se(e.type);
			case 16: return Se("Lazy");
			case 13: return e.child !== t && t !== null ? Se("Suspense Fallback") : Se("Suspense");
			case 19: return Se("SuspenseList");
			case 0:
			case 15: return Ce(e.type, !1);
			case 11: return Ce(e.type.render, !1);
			case 1: return Ce(e.type, !0);
			case 31: return Se("Activity");
			default: return "";
		}
	}
	function Te(e) {
		try {
			var t = "", n = null;
			do
				t += we(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ee = Object.prototype.hasOwnProperty, De = t.unstable_scheduleCallback, Oe = t.unstable_cancelCallback, ke = t.unstable_shouldYield, Ae = t.unstable_requestPaint, N = t.unstable_now, je = t.unstable_getCurrentPriorityLevel, Me = t.unstable_ImmediatePriority, Ne = t.unstable_UserBlockingPriority, Pe = t.unstable_NormalPriority, Fe = t.unstable_LowPriority, Ie = t.unstable_IdlePriority, Le = t.log, Re = t.unstable_setDisableYieldValue, ze = null, Be = null;
	function Ve(e) {
		if (typeof Le == "function" && Re(e), Be && typeof Be.setStrictMode == "function") try {
			Be.setStrictMode(ze, e);
		} catch {}
	}
	var He = Math.clz32 ? Math.clz32 : Ge, Ue = Math.log, We = Math.LN2;
	function Ge(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ue(e) / We | 0) | 0;
	}
	var P = 256, Ke = 262144, qe = 4194304;
	function Je(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ye(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Je(n))) : i = Je(o) : i = Je(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Je(n))) : i = Je(o)) : i = Je(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Xe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ze(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Qe() {
		var e = qe;
		return qe <<= 1, !(qe & 62914560) && (qe = 4194304), e;
	}
	function $e(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function et(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function tt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - He(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && nt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function nt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - He(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function rt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - He(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function it(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : at(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function at(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function ot(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function st() {
		var e = D.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ct(e, t) {
		var n = D.p;
		try {
			return D.p = e, t();
		} finally {
			D.p = n;
		}
	}
	var lt = Math.random().toString(36).slice(2), ut = "__reactFiber$" + lt, dt = "__reactProps$" + lt, ft = "__reactContainer$" + lt, pt = "__reactEvents$" + lt, mt = "__reactListeners$" + lt, ht = "__reactHandles$" + lt, gt = "__reactResources$" + lt, _t = "__reactMarker$" + lt;
	function vt(e) {
		delete e[ut], delete e[dt], delete e[pt], delete e[mt], delete e[ht];
	}
	function yt(e) {
		var t = e[ut];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ft] || n[ut]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[ut]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function bt(e) {
		if (e = e[ut] || e[ft]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function xt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function St(e) {
		var t = e[gt];
		return t ||= e[gt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ct(e) {
		e[_t] = !0;
	}
	var wt = /* @__PURE__ */ new Set(), Tt = {};
	function Et(e, t) {
		Dt(e, t), Dt(e + "Capture", t);
	}
	function Dt(e, t) {
		for (Tt[e] = t, e = 0; e < t.length; e++) wt.add(t[e]);
	}
	var Ot = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), kt = {}, At = {};
	function jt(e) {
		return Ee.call(At, e) ? !0 : Ee.call(kt, e) ? !1 : Ot.test(e) ? At[e] = !0 : (kt[e] = !0, !1);
	}
	function F(e, t, n) {
		if (jt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, "" + n);
			}
		}
	}
	function Mt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Nt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Pt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ft(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function It(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Lt(e) {
		if (!e._valueTracker) {
			var t = Ft(e) ? "checked" : "value";
			e._valueTracker = It(e, t, "" + e[t]);
		}
	}
	function Rt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ft(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function zt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Bt = /[\n"\\]/g;
	function Vt(e) {
		return e.replace(Bt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Ht(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Pt(t)) : e.value !== "" + Pt(t) && (e.value = "" + Pt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : I(e, o, Pt(n)) : I(e, o, Pt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Pt(s) : e.removeAttribute("name");
	}
	function Ut(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Lt(e);
				return;
			}
			n = n == null ? "" : "" + Pt(n), t = t == null ? n : "" + Pt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Lt(e);
	}
	function I(e, t, n) {
		t === "number" && zt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Wt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Pt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Gt(e, t, n) {
		t != null && (t = "" + Pt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Pt(n);
	}
	function Kt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (le(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Pt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Lt(e);
	}
	function qt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Jt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Yt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Jt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Xt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Yt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Yt(e, o, t[o]);
	}
	function Zt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Qt = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), $t = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function en(e) {
		return $t.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function L() {}
	var tn = null;
	function nn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var rn = null, an = null;
	function on(e) {
		var t = bt(e);
		if (t && (e = t.stateNode)) {
			var n = e[dt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Ht(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Vt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[dt] || null;
								if (!a) throw Error(i(90));
								Ht(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Rt(r);
					}
					break a;
				case "textarea":
					Gt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Wt(e, !!n.multiple, t, !1);
			}
		}
	}
	var sn = !1;
	function cn(e, t, n) {
		if (sn) return e(t, n);
		sn = !0;
		try {
			return e(t);
		} finally {
			if (sn = !1, (rn !== null || an !== null) && (bu(), rn && (t = rn, e = an, an = rn = null, on(t), e))) for (t = 0; t < e.length; t++) on(e[t]);
		}
	}
	function ln(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[dt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var un = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, dn = !1;
	if (un) try {
		var fn = {};
		Object.defineProperty(fn, "passive", { get: function() {
			dn = !0;
		} }), window.addEventListener("test", fn, fn), window.removeEventListener("test", fn, fn);
	} catch {
		dn = !1;
	}
	var pn = null, mn = null, hn = null;
	function gn() {
		if (hn) return hn;
		var e, t = mn, n = t.length, r, i = "value" in pn ? pn.value : pn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return hn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function _n(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function vn() {
		return !0;
	}
	function yn() {
		return !1;
	}
	function bn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? vn : yn, this.isPropagationStopped = yn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = vn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = vn);
			},
			persist: function() {},
			isPersistent: vn
		}), t;
	}
	var xn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Sn = bn(xn), Cn = h({}, xn, {
		view: 0,
		detail: 0
	}), wn = bn(Cn), Tn, En, Dn, On = h({}, Cn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: zn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Dn && (Dn && e.type === "mousemove" ? (Tn = e.screenX - Dn.screenX, En = e.screenY - Dn.screenY) : En = Tn = 0, Dn = e), Tn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : En;
		}
	}), kn = bn(On), An = bn(h({}, On, { dataTransfer: 0 })), jn = bn(h({}, Cn, { relatedTarget: 0 })), Mn = bn(h({}, xn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Nn = bn(h({}, xn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Pn = bn(h({}, xn, { data: 0 })), Fn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, In = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Ln = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Rn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Ln[e]) ? !!t[e] : !1;
	}
	function zn() {
		return Rn;
	}
	var Bn = bn(h({}, Cn, {
		key: function(e) {
			if (e.key) {
				var t = Fn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = _n(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? In[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: zn,
		charCode: function(e) {
			return e.type === "keypress" ? _n(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? _n(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Vn = bn(h({}, On, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Hn = bn(h({}, Cn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: zn
	})), Un = bn(h({}, xn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Wn = bn(h({}, On, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Gn = bn(h({}, xn, {
		newState: 0,
		oldState: 0
	})), Kn = [
		9,
		13,
		27,
		32
	], qn = un && "CompositionEvent" in window, Jn = null;
	un && "documentMode" in document && (Jn = document.documentMode);
	var Yn = un && "TextEvent" in window && !Jn, Xn = un && (!qn || Jn && 8 < Jn && 11 >= Jn), Zn = " ", Qn = !1;
	function $n(e, t) {
		switch (e) {
			case "keyup": return Kn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function er(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var tr = !1;
	function nr(e, t) {
		switch (e) {
			case "compositionend": return er(t);
			case "keypress": return t.which === 32 ? (Qn = !0, Zn) : null;
			case "textInput": return e = t.data, e === Zn && Qn ? null : e;
			default: return null;
		}
	}
	function rr(e, t) {
		if (tr) return e === "compositionend" || !qn && $n(e, t) ? (e = gn(), hn = mn = pn = null, tr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Xn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var ir = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function ar(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!ir[e.type] : t === "textarea";
	}
	function or(e, t, n, r) {
		rn ? an ? an.push(r) : an = [r] : rn = r, t = Ed(t, "onChange"), 0 < t.length && (n = new Sn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var sr = null, cr = null;
	function lr(e) {
		yd(e, 0);
	}
	function ur(e) {
		if (Rt(xt(e))) return e;
	}
	function dr(e, t) {
		if (e === "change") return t;
	}
	var fr = !1;
	if (un) {
		var pr;
		if (un) {
			var mr = "oninput" in document;
			if (!mr) {
				var hr = document.createElement("div");
				hr.setAttribute("oninput", "return;"), mr = typeof hr.oninput == "function";
			}
			pr = mr;
		} else pr = !1;
		fr = pr && (!document.documentMode || 9 < document.documentMode);
	}
	function gr() {
		sr && (sr.detachEvent("onpropertychange", _r), cr = sr = null);
	}
	function _r(e) {
		if (e.propertyName === "value" && ur(cr)) {
			var t = [];
			or(t, cr, e, nn(e)), cn(lr, t);
		}
	}
	function vr(e, t, n) {
		e === "focusin" ? (gr(), sr = t, cr = n, sr.attachEvent("onpropertychange", _r)) : e === "focusout" && gr();
	}
	function yr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return ur(cr);
	}
	function br(e, t) {
		if (e === "click") return ur(t);
	}
	function xr(e, t) {
		if (e === "input" || e === "change") return ur(t);
	}
	function Sr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Cr = typeof Object.is == "function" ? Object.is : Sr;
	function wr(e, t) {
		if (Cr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ee.call(t, i) || !Cr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Tr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Er(e, t) {
		var n = Tr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Tr(n);
		}
	}
	function Dr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Dr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Or(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = zt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = zt(e.document);
		}
		return t;
	}
	function kr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var R = un && "documentMode" in document && 11 >= document.documentMode, Ar = null, jr = null, Mr = null, Nr = !1;
	function Pr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Nr || Ar == null || Ar !== zt(r) || (r = Ar, "selectionStart" in r && kr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Mr && wr(Mr, r) || (Mr = r, r = Ed(jr, "onSelect"), 0 < r.length && (t = new Sn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ar)));
	}
	function Fr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Ir = {
		animationend: Fr("Animation", "AnimationEnd"),
		animationiteration: Fr("Animation", "AnimationIteration"),
		animationstart: Fr("Animation", "AnimationStart"),
		transitionrun: Fr("Transition", "TransitionRun"),
		transitionstart: Fr("Transition", "TransitionStart"),
		transitioncancel: Fr("Transition", "TransitionCancel"),
		transitionend: Fr("Transition", "TransitionEnd")
	}, Lr = {}, Rr = {};
	un && (Rr = document.createElement("div").style, "AnimationEvent" in window || (delete Ir.animationend.animation, delete Ir.animationiteration.animation, delete Ir.animationstart.animation), "TransitionEvent" in window || delete Ir.transitionend.transition);
	function zr(e) {
		if (Lr[e]) return Lr[e];
		if (!Ir[e]) return e;
		var t = Ir[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Rr) return Lr[e] = t[n];
		return e;
	}
	var Br = zr("animationend"), Vr = zr("animationiteration"), Hr = zr("animationstart"), Ur = zr("transitionrun"), Wr = zr("transitionstart"), Gr = zr("transitioncancel"), Kr = zr("transitionend"), qr = /* @__PURE__ */ new Map(), Jr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Jr.push("scrollEnd");
	function Yr(e, t) {
		qr.set(e, t), Et(t, [e]);
	}
	var Xr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Zr = [], Qr = 0, $r = 0;
	function ei() {
		for (var e = Qr, t = $r = Qr = 0; t < e;) {
			var n = Zr[t];
			Zr[t++] = null;
			var r = Zr[t];
			Zr[t++] = null;
			var i = Zr[t];
			Zr[t++] = null;
			var a = Zr[t];
			if (Zr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ii(n, i, a);
		}
	}
	function ti(e, t, n, r) {
		Zr[Qr++] = e, Zr[Qr++] = t, Zr[Qr++] = n, Zr[Qr++] = r, $r |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ni(e, t, n, r) {
		return ti(e, t, n, r), ai(e);
	}
	function ri(e, t) {
		return ti(e, null, null, t), ai(e);
	}
	function ii(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - He(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ai(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var oi = {};
	function si(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ci(e, t, n, r) {
		return new si(e, t, n, r);
	}
	function li(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ui(e, t) {
		var n = e.alternate;
		return n === null ? (n = ci(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function di(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function fi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") li(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, pe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case re: return e = ci(31, n, t, a), e.elementType = re, e.lanes = o, e;
			case y: return pi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ci(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ee: return e = ci(13, n, t, a), e.elementType = ee, e.lanes = o, e;
			case te: return e = ci(19, n, t, a), e.elementType = te, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case ne:
						s = 14;
						break a;
					case T:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ci(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function pi(e, t, n, r) {
		return e = ci(7, e, r, t), e.lanes = n, e;
	}
	function mi(e, t, n) {
		return e = ci(6, e, null, t), e.lanes = n, e;
	}
	function hi(e) {
		var t = ci(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function gi(e, t, n) {
		return t = ci(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var _i = /* @__PURE__ */ new WeakMap();
	function vi(e, t) {
		if (typeof e == "object" && e) {
			var n = _i.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Te(t)
			}, _i.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Te(t)
		};
	}
	var yi = [], z = 0, bi = null, B = 0, xi = [], Si = 0, Ci = null, wi = 1, Ti = "";
	function Ei(e, t) {
		yi[z++] = B, yi[z++] = bi, bi = e, B = t;
	}
	function Di(e, t, n) {
		xi[Si++] = wi, xi[Si++] = Ti, xi[Si++] = Ci, Ci = e;
		var r = wi;
		e = Ti;
		var i = 32 - He(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - He(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, wi = 1 << 32 - He(t) + i | n << i | r, Ti = a + e;
		} else wi = 1 << a | n << i | r, Ti = e;
	}
	function Oi(e) {
		e.return !== null && (Ei(e, 1), Di(e, 1, 0));
	}
	function ki(e) {
		for (; e === bi;) bi = yi[--z], yi[z] = null, B = yi[--z], yi[z] = null;
		for (; e === Ci;) Ci = xi[--Si], xi[Si] = null, Ti = xi[--Si], xi[Si] = null, wi = xi[--Si], xi[Si] = null;
	}
	function Ai(e, t) {
		xi[Si++] = wi, xi[Si++] = Ti, xi[Si++] = Ci, wi = t.id, Ti = t.overflow, Ci = e;
	}
	var ji = null, Mi = null, V = !1, Ni = null, Pi = !1, Fi = Error(i(519));
	function Ii(e) {
		throw Hi(vi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Fi;
	}
	function Li(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ut] = e, t[dt] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Ut(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Kt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = L), t = !0) : t = !1, t || Ii(e, !0);
	}
	function Ri(e) {
		for (ji = e.return; ji;) switch (ji.tag) {
			case 5:
			case 31:
			case 13:
				Pi = !1;
				return;
			case 27:
			case 3:
				Pi = !0;
				return;
			default: ji = ji.return;
		}
	}
	function zi(e) {
		if (e !== ji) return !1;
		if (!V) return Ri(e), V = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && Mi && Ii(e), Ri(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Mi = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Mi = uf(e);
		} else t === 27 ? (t = Mi, Zd(e.type) ? (e = lf, lf = null, Mi = e) : Mi = t) : Mi = ji ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Bi() {
		Mi = ji = null, V = !1;
	}
	function Vi() {
		var e = Ni;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Ni = null), e;
	}
	function Hi(e) {
		Ni === null ? Ni = [e] : Ni.push(e);
	}
	var Ui = fe(null), Wi = null, Gi = null;
	function Ki(e, t, n) {
		A(Ui, t._currentValue), t._currentValue = n;
	}
	function qi(e) {
		e._currentValue = Ui.current, k(Ui);
	}
	function Ji(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Yi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ji(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ji(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Xi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Cr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ge.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Yi(t, e, n, r), t.flags |= 262144;
	}
	function Zi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Cr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Qi(e) {
		Wi = e, Gi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function $i(e) {
		return ta(Wi, e);
	}
	function ea(e, t) {
		return Wi === null && Qi(e), ta(e, t);
	}
	function ta(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Gi === null) {
			if (e === null) throw Error(i(308));
			Gi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Gi = Gi.next = t;
		return n;
	}
	var na = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ra = t.unstable_scheduleCallback, ia = t.unstable_NormalPriority, aa = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function oa() {
		return {
			controller: new na(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function sa(e) {
		e.refCount--, e.refCount === 0 && ra(ia, function() {
			e.controller.abort();
		});
	}
	var ca = null, la = 0, ua = 0, da = null;
	function fa(e, t) {
		if (ca === null) {
			var n = ca = [];
			la = 0, ua = dd(), da = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return la++, t.then(pa, pa), t;
	}
	function pa() {
		if (--la === 0 && ca !== null) {
			da !== null && (da.status = "fulfilled");
			var e = ca;
			ca = null, ua = 0, da = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ma(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ha = E.S;
	E.S = function(e, t) {
		eu = N(), typeof t == "object" && t && typeof t.then == "function" && fa(e, t), ha !== null && ha(e, t);
	};
	var ga = fe(null);
	function _a() {
		var e = ga.current;
		return e === null ? Rl.pooledCache : e;
	}
	function va(e, t) {
		t === null ? A(ga, ga.current) : A(ga, t.pool);
	}
	function ya() {
		var e = _a();
		return e === null ? null : {
			parent: aa._currentValue,
			pool: e
		};
	}
	var ba = Error(i(460)), xa = Error(i(474)), Sa = Error(i(542)), Ca = { then: function() {} };
	function wa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ta(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(L, L), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ka(e), e;
			default:
				if (typeof t.status == "string") t.then(L, L);
				else {
					if (e = Rl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ka(e), e;
				}
				throw Da = t, ba;
		}
	}
	function Ea(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Da = e, ba) : e;
		}
	}
	var Da = null;
	function Oa() {
		if (Da === null) throw Error(i(459));
		var e = Da;
		return Da = null, e;
	}
	function ka(e) {
		if (e === ba || e === Sa) throw Error(i(483));
	}
	var Aa = null, ja = 0;
	function Ma(e) {
		var t = ja;
		return ja += 1, Aa === null && (Aa = []), Ta(Aa, e, t);
	}
	function Na(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Pa(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Fa(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = ui(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = mi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === T && Ea(i) === t.type) ? (t = a(t, n.props), Na(t, n), t.return = e, t) : (t = fi(n.type, n.key, n.props, null, e.mode, r), Na(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = gi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = pi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = mi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = fi(t.type, t.key, t.props, null, e.mode, n), Na(n, t), n.return = e, n;
					case v: return t = gi(t, e.mode, n), t.return = e, t;
					case T: return t = Ea(t), f(e, t, n);
				}
				if (le(t) || oe(t)) return t = pi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ma(t), n);
				if (t.$$typeof === C) return f(e, ea(e, t), n);
				Pa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case T: return n = Ea(n), p(e, t, n, r);
				}
				if (le(n) || oe(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ma(n), r);
				if (n.$$typeof === C) return p(e, t, ea(e, n), r);
				Pa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = Ea(r), m(e, t, n, r, i);
				}
				if (le(r) || oe(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ma(r), i);
				if (r.$$typeof === C) return m(e, t, n, ea(t, r), i);
				Pa(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), V && Ei(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return V && Ei(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), V && Ei(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), V && Ei(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return V && Ei(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), V && Ei(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && Ea(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Na(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = pi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = fi(o.type, o.key, o.props, null, e.mode, c), Na(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = gi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case T: return o = Ea(o), b(e, r, o, c);
				}
				if (le(o)) return h(e, r, o, c);
				if (oe(o)) {
					if (l = oe(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ma(o), c);
				if (o.$$typeof === C) return b(e, r, ea(e, o), c);
				Pa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = mi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				ja = 0;
				var i = b(e, t, n, r);
				return Aa = null, i;
			} catch (t) {
				if (t === ba || t === Sa) throw t;
				var a = ci(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ia = Fa(!0), La = Fa(!1), Ra = !1;
	function za(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ba(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Va(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ha(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, q & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ai(e), ii(e, null, n), t;
		}
		return ti(e, r, t, n), ai(e);
	}
	function Ua(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	function Wa(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ga = !1;
	function Ka() {
		if (Ga) {
			var e = da;
			if (e !== null) throw e;
		}
	}
	function qa(e, t, n, r) {
		Ga = !1;
		var i = e.updateQueue;
		Ra = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === ua && (Ga = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ra = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ja(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ya(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ja(n[e], t);
	}
	var Xa = fe(null), Za = fe(0);
	function Qa(e, t) {
		e = Ul, A(Za, e), A(Xa, t), Ul = e | t.baseLanes;
	}
	function $a() {
		A(Za, Ul), A(Xa, Xa.current);
	}
	function eo() {
		Ul = Za.current, k(Xa), k(Za);
	}
	var to = fe(null), no = null;
	function ro(e) {
		var t = e.alternate;
		A(co, co.current & 1), A(to, e), no === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (no = e);
	}
	function io(e) {
		A(co, co.current), A(to, e), no === null && (no = e);
	}
	function ao(e) {
		e.tag === 22 ? (A(co, co.current), A(to, e), no === null && (no = e)) : oo(e);
	}
	function oo() {
		A(co, co.current), A(to, to.current);
	}
	function so(e) {
		k(to), no === e && (no = null), k(co);
	}
	var co = fe(0);
	function lo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var uo = 0, H = null, U = null, fo = null, po = !1, mo = !1, ho = !1, go = 0, _o = 0, vo = null, yo = 0;
	function bo() {
		throw Error(i(321));
	}
	function xo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Cr(e[n], t[n])) return !1;
		return !0;
	}
	function So(e, t, n, r, i, a) {
		return uo = a, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = e === null || e.memoizedState === null ? Ls : Rs, ho = !1, a = n(r, i), ho = !1, mo && (a = wo(t, n, r, i)), Co(e), a;
	}
	function Co(e) {
		E.H = Is;
		var t = U !== null && U.next !== null;
		if (uo = 0, fo = U = H = null, po = !1, _o = 0, vo = null, t) throw Error(i(300));
		e === null || tc || (e = e.dependencies, e !== null && Zi(e) && (tc = !0));
	}
	function wo(e, t, n, r) {
		H = e;
		var a = 0;
		do {
			if (mo && (vo = null), _o = 0, mo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, fo = U = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			E.H = zs, o = t(n, r);
		} while (mo);
		return o;
	}
	function To() {
		var e = E.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ao(t) : t, e = e.useState()[0], (U === null ? null : U.memoizedState) !== e && (H.flags |= 1024), t;
	}
	function Eo() {
		var e = go !== 0;
		return go = 0, e;
	}
	function Do(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function W(e) {
		if (po) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			po = !1;
		}
		uo = 0, fo = U = H = null, mo = !1, _o = go = 0, vo = null;
	}
	function Oo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return fo === null ? H.memoizedState = fo = e : fo = fo.next = e, fo;
	}
	function G() {
		if (U === null) {
			var e = H.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = U.next;
		var t = fo === null ? H.memoizedState : fo.next;
		if (t !== null) fo = t, U = e;
		else {
			if (e === null) throw H.alternate === null ? Error(i(467)) : Error(i(310));
			U = e, e = {
				memoizedState: U.memoizedState,
				baseState: U.baseState,
				baseQueue: U.baseQueue,
				queue: U.queue,
				next: null
			}, fo === null ? H.memoizedState = fo = e : fo = fo.next = e;
		}
		return fo;
	}
	function ko() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ao(e) {
		var t = _o;
		return _o += 1, vo === null && (vo = []), e = Ta(vo, e, t), t = H, (fo === null ? t.memoizedState : fo.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? Ls : Rs), e;
	}
	function jo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ao(e);
			if (e.$$typeof === C) return $i(e);
		}
		throw Error(i(438, String(e)));
	}
	function Mo(e) {
		var t = null, n = H.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = H.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = ko(), H.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ie;
		return t.index++, n;
	}
	function No(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Po(e) {
		return Fo(G(), U, e);
	}
	function Fo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (uo & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ua && (d = !0);
					else if ((uo & p) === p) {
						u = u.next, p === ua && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, H.lanes |= p, Gl |= p;
					f = u.action, ho && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, H.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Cr(o, e.memoizedState) && (tc = !0, d && (n = da, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Io(e) {
		var t = G(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Cr(o, t.memoizedState) || (tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Lo(e, t, n) {
		var r = H, a = G(), o = V;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Cr((U || a).memoizedState, n);
		if (s && (a.memoizedState = n, tc = !0), a = a.queue, cs(Bo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || fo !== null && fo.memoizedState.tag & 1) {
			if (r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, a, n, t), null), Rl === null) throw Error(i(349));
			o || uo & 127 || Ro(r, t, n);
		}
		return n;
	}
	function Ro(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = H.updateQueue, t === null ? (t = ko(), H.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function zo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Vo(t) && Ho(e);
	}
	function Bo(e, t, n) {
		return n(function() {
			Vo(t) && Ho(e);
		});
	}
	function Vo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Cr(e, n);
		} catch {
			return !0;
		}
	}
	function Ho(e) {
		var t = ri(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Uo(e) {
		var t = Oo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), ho) {
				Ve(!0);
				try {
					n();
				} finally {
					Ve(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: No,
			lastRenderedState: e
		}, t;
	}
	function Wo(e, t, n, r) {
		return e.baseState = n, Fo(e, U, typeof r == "function" ? r : No);
	}
	function Go(e, t, n, r, a) {
		if (Ns(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			E.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ko(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ko(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = E.T, o = {};
			E.T = o;
			try {
				var s = n(i, r), c = E.S;
				c !== null && c(o, s), qo(e, t, s);
			} catch (n) {
				Yo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), E.T = a;
			}
		} else try {
			a = n(i, r), qo(e, t, a);
		} catch (n) {
			Yo(e, t, n);
		}
	}
	function qo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Jo(e, t, n);
		}, function(n) {
			return Yo(e, t, n);
		}) : Jo(e, t, n);
	}
	function Jo(e, t, n) {
		t.status = "fulfilled", t.value = n, Xo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ko(e, n)));
	}
	function Yo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Xo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Xo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Zo(e, t) {
		return t;
	}
	function Qo(e, t) {
		if (V) {
			var n = Rl.formState;
			if (n !== null) {
				a: {
					var r = H;
					if (V) {
						if (Mi) {
							b: {
								for (var i = Mi, a = Pi; i.nodeType !== 8;) if (!a || (i = cf(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Mi = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ii(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Oo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Zo,
			lastRenderedState: t
		}, n.queue = r, n = As.bind(null, H, r), r.dispatch = n, r = Uo(!1), a = Ms.bind(null, H, !1, r.queue), r = Oo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Go.bind(null, H, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function $o(e) {
		return es(G(), U, e);
	}
	function es(e, t, n) {
		if (t = Fo(e, t, Zo)[0], e = Po(No)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ao(t);
		} catch (e) {
			throw e === ba ? Sa : e;
		}
		else r = t;
		t = G();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (H.flags |= 2048, rs(9, { destroy: void 0 }, ts.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ts(e, t) {
		e.action = t;
	}
	function ns(e) {
		var t = G(), n = U;
		if (n !== null) return es(t, n, e);
		G(), t = t.memoizedState, n = G();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function rs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = H.updateQueue, t === null && (t = ko(), H.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function is() {
		return G().memoizedState;
	}
	function as(e, t, n, r) {
		var i = Oo();
		H.flags |= e, i.memoizedState = rs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function os(e, t, n, r) {
		var i = G();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		U !== null && r !== null && xo(r, U.memoizedState.deps) ? i.memoizedState = rs(t, a, n, r) : (H.flags |= e, i.memoizedState = rs(1 | t, a, n, r));
	}
	function ss(e, t) {
		as(8390656, 8, e, t);
	}
	function cs(e, t) {
		os(2048, 8, e, t);
	}
	function ls(e) {
		H.flags |= 4;
		var t = H.updateQueue;
		if (t === null) t = ko(), H.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function us(e) {
		var t = G().memoizedState;
		return ls({
			ref: t,
			nextImpl: e
		}), function() {
			if (q & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ds(e, t) {
		return os(4, 2, e, t);
	}
	function fs(e, t) {
		return os(4, 4, e, t);
	}
	function ps(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ms(e, t, n) {
		n = n == null ? null : n.concat([e]), os(4, 4, ps.bind(null, t, e), n);
	}
	function hs() {}
	function gs(e, t) {
		var n = G();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && xo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function _s(e, t) {
		var n = G();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && xo(t, r[1])) return r[0];
		if (r = e(), ho) {
			Ve(!0);
			try {
				e();
			} finally {
				Ve(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function vs(e, t, n) {
		return n === void 0 || uo & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), H.lanes |= e, Gl |= e, n);
	}
	function ys(e, t, n, r) {
		return Cr(n, t) ? n : Xa.current === null ? !(uo & 42) || uo & 1073741824 && !(Y & 261930) ? (tc = !0, e.memoizedState = n) : (e = mu(), H.lanes |= e, Gl |= e, t) : (e = vs(e, n, r), Cr(e, t) || (tc = !0), e);
	}
	function bs(e, t, n, r, i) {
		var a = D.p;
		D.p = a !== 0 && 8 > a ? a : 8;
		var o = E.T, s = {};
		E.T = s, Ms(e, !1, t, n);
		try {
			var c = i(), l = E.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? js(e, t, ma(c, r), pu(e)) : js(e, t, r, pu(e));
		} catch (n) {
			js(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			D.p = a, o !== null && s.types !== null && (o.types = s.types), E.T = o;
		}
	}
	function xs() {}
	function Ss(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Cs(e).queue;
		bs(e, a, t, O, n === null ? xs : function() {
			return ws(e), n(r);
		});
	}
	function Cs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: O,
			baseState: O,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: No,
				lastRenderedState: O
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: No,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ws(e) {
		var t = Cs(e);
		t.next === null && (t = e.alternate.memoizedState), js(e, t.next.queue, {}, pu());
	}
	function Ts() {
		return $i(Qf);
	}
	function Es() {
		return G().memoizedState;
	}
	function Ds() {
		return G().memoizedState;
	}
	function Os(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Va(n);
					var r = Ha(t, e, n);
					r !== null && (hu(r, t, n), Ua(r, t, n)), t = { cache: oa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ks(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e) ? Ps(t, n) : (n = ni(e, t, n, r), n !== null && (hu(n, e, r), Fs(n, t, r)));
	}
	function As(e, t, n) {
		js(e, t, n, pu());
	}
	function js(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ns(e)) Ps(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Cr(s, o)) return ti(e, t, i, 0), Rl === null && ei(), !1;
			} catch {}
			if (n = ni(e, t, i, r), n !== null) return hu(n, e, r), Fs(n, t, r), !0;
		}
		return !1;
	}
	function Ms(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e)) {
			if (t) throw Error(i(479));
		} else t = ni(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Ns(e) {
		var t = e.alternate;
		return e === H || t !== null && t === H;
	}
	function Ps(e, t) {
		mo = po = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Fs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	var Is = {
		readContext: $i,
		use: jo,
		useCallback: bo,
		useContext: bo,
		useEffect: bo,
		useImperativeHandle: bo,
		useLayoutEffect: bo,
		useInsertionEffect: bo,
		useMemo: bo,
		useReducer: bo,
		useRef: bo,
		useState: bo,
		useDebugValue: bo,
		useDeferredValue: bo,
		useTransition: bo,
		useSyncExternalStore: bo,
		useId: bo,
		useHostTransitionStatus: bo,
		useFormState: bo,
		useActionState: bo,
		useOptimistic: bo,
		useMemoCache: bo,
		useCacheRefresh: bo
	};
	Is.useEffectEvent = bo;
	var Ls = {
		readContext: $i,
		use: jo,
		useCallback: function(e, t) {
			return Oo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: $i,
		useEffect: ss,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), as(4194308, 4, ps.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return as(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			as(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Oo();
			t = t === void 0 ? null : t;
			var r = e();
			if (ho) {
				Ve(!0);
				try {
					e();
				} finally {
					Ve(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Oo();
			if (n !== void 0) {
				var i = n(t);
				if (ho) {
					Ve(!0);
					try {
						n(t);
					} finally {
						Ve(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ks.bind(null, H, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Oo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Uo(e);
			var t = e.queue, n = As.bind(null, H, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return vs(Oo(), e, t);
		},
		useTransition: function() {
			var e = Uo(!1);
			return e = bs.bind(null, H, e.queue, !0, !1), Oo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = H, a = Oo();
			if (V) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Rl === null) throw Error(i(349));
				Y & 127 || Ro(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ss(Bo.bind(null, r, o, e), [e]), r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Oo(), t = Rl.identifierPrefix;
			if (V) {
				var n = Ti, r = wi;
				n = (r & ~(1 << 32 - He(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = go++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = yo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ts,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e) {
			var t = Oo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ms.bind(null, H, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Mo,
		useCacheRefresh: function() {
			return Oo().memoizedState = Os.bind(null, H);
		},
		useEffectEvent: function(e) {
			var t = Oo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (q & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Rs = {
		readContext: $i,
		use: jo,
		useCallback: gs,
		useContext: $i,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Po,
		useRef: is,
		useState: function() {
			return Po(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return ys(G(), U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Po(No)[0], t = G().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: $o,
		useActionState: $o,
		useOptimistic: function(e, t) {
			return Wo(G(), U, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	Rs.useEffectEvent = us;
	var zs = {
		readContext: $i,
		use: jo,
		useCallback: gs,
		useContext: $i,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Io,
		useRef: is,
		useState: function() {
			return Io(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			var n = G();
			return U === null ? vs(n, e, t) : ys(n, U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(No)[0], t = G().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e, t) {
			var n = G();
			return U === null ? (n.baseState = e, [e, n.queue.dispatch]) : Wo(n, U, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	zs.useEffectEvent = us;
	function Bs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Vs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Va(r);
			i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Va(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Va(n);
			r.tag = 2, t != null && (r.callback = t), t = Ha(e, r, n), t !== null && (hu(t, e, n), Ua(t, e, n));
		}
	};
	function Hs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !wr(n, r) || !wr(i, a) : !0;
	}
	function Us(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Vs.enqueueReplaceState(t, t.state, null);
	}
	function Ws(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Gs(e) {
		Xr(e);
	}
	function Ks(e) {
		console.error(e);
	}
	function qs(e) {
		Xr(e);
	}
	function Js(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ys(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Xs(e, t, n) {
		return n = Va(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Js(e, t);
		}, n;
	}
	function Zs(e) {
		return e = Va(e), e.tag = 3, e;
	}
	function Qs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ys(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ys(t, n, r), typeof i != "function" && (ru === null ? ru = /* @__PURE__ */ new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function $s(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Xi(t, n, a, !0), n = to.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return no === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (V) return t = to.current, t === null ? (r !== Fi && (t = Error(i(423), { cause: r }), Hi(vi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = vi(r, n), a = Xs(e.stateNode, r, a), Wa(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Fi && (e = Error(i(422), { cause: r }), Hi(vi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = vi(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = vi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Xs(n.stateNode, r, e), Wa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Zs(a), Qs(a, e, n, r), Wa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ec = Error(i(461)), tc = !1;
	function nc(e, t, n, r) {
		t.child = e === null ? La(t, null, n, r) : Ia(t, e.child, n, r);
	}
	function rc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Qi(t), r = So(e, t, n, o, a, i), s = Eo(), e !== null && !tc ? (Do(e, t, i), Dc(e, t, i)) : (V && s && Oi(t), t.flags |= 1, nc(e, t, r, i), t.child);
	}
	function ic(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !li(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ac(e, t, a, r, i)) : (e = fi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Oc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? wr : n, n(o, r) && e.ref === t.ref) return Dc(e, t, i);
		}
		return t.flags |= 1, e = ui(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ac(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (wr(a, r) && e.ref === t.ref) {
				if (tc = !1, t.pendingProps = r = a, Oc(e, i)) e.flags & 131072 && (tc = !0);
				else return t.lanes = e.lanes, Dc(e, t, i);
			}
		}
		return pc(e, t, n, r, i);
	}
	function oc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return cc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && va(t, a === null ? null : a.cachePool), a === null ? $a() : Qa(t, a), ao(t);
			else return r = t.lanes = 536870912, cc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && va(t, null), $a(), oo(t)) : (va(t, a.cachePool), Qa(t, a), oo(t), t.memoizedState = null);
		return nc(e, t, i, n), t.child;
	}
	function sc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function cc(e, t, n, r, i) {
		var a = _a();
		return a = a === null ? null : {
			parent: aa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && va(t, null), $a(), ao(t), e !== null && Xi(e, t, r, !0), t.childLanes = i, null;
	}
	function lc(e, t) {
		return t = Sc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function uc(e, t, n) {
		return Ia(t, e.child, null, n), e = lc(t, t.pendingProps), e.flags |= 2, so(t), t.memoizedState = null, e;
	}
	function dc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (V) {
				if (r.mode === "hidden") return e = lc(t, r), t.lanes = 536870912, sc(null, e);
				if (io(t), (e = Mi) ? (e = rf(e, Pi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ci === null ? null : {
						id: wi,
						overflow: Ti
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = hi(e), n.return = t, t.child = n, ji = t, Mi = null)) : e = null, e === null) throw Ii(t);
				return t.lanes = 536870912, null;
			}
			return lc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (io(t), a) {
				if (t.flags & 256) t.flags &= -257, t = uc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (tc || Xi(e, t, n, !1), a = (n & e.childLanes) !== 0, tc || a) {
				if (r = Rl, r !== null && (s = it(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ri(e, s), hu(r, e, s), ec;
				Du(), t = uc(e, t, n);
			} else e = o.treeContext, Mi = cf(s.nextSibling), ji = t, V = !0, Ni = null, Pi = !1, e !== null && Ai(t, e), t = lc(t, r), t.flags |= 4096;
			return t;
		}
		return e = ui(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function fc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function pc(e, t, n, r, i) {
		return Qi(t), n = So(e, t, n, r, void 0, i), r = Eo(), e !== null && !tc ? (Do(e, t, i), Dc(e, t, i)) : (V && r && Oi(t), t.flags |= 1, nc(e, t, n, i), t.child);
	}
	function mc(e, t, n, r, i, a) {
		return Qi(t), t.updateQueue = null, n = wo(t, r, n, i), Co(e), r = Eo(), e !== null && !tc ? (Do(e, t, a), Dc(e, t, a)) : (V && r && Oi(t), t.flags |= 1, nc(e, t, n, a), t.child);
	}
	function hc(e, t, n, r, i) {
		if (Qi(t), t.stateNode === null) {
			var a = oi, o = n.contextType;
			typeof o == "object" && o && (a = $i(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Vs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, za(t), o = n.contextType, a.context = typeof o == "object" && o ? $i(o) : oi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Bs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Vs.enqueueReplaceState(a, a.state, null), qa(t, r, a, i), Ka(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ws(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = oi, typeof u == "object" && u && (o = $i(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Us(t, a, r, o), Ra = !1;
			var f = t.memoizedState;
			a.state = f, qa(t, r, a, i), Ka(), l = t.memoizedState, s || f !== l || Ra ? (typeof d == "function" && (Bs(t, n, d, r), l = t.memoizedState), (c = Ra || Hs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ba(e, t), o = t.memoizedProps, u = Ws(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = oi, typeof l == "object" && l && (c = $i(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Us(t, a, r, c), Ra = !1, f = t.memoizedState, a.state = f, qa(t, r, a, i), Ka();
			var p = t.memoizedState;
			o !== d || f !== p || Ra || e !== null && e.dependencies !== null && Zi(e.dependencies) ? (typeof s == "function" && (Bs(t, n, s, r), p = t.memoizedState), (u = Ra || Hs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Zi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, fc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ia(t, e.child, null, i), t.child = Ia(t, null, n, i)) : nc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Dc(e, t, i), e;
	}
	function gc(e, t, n, r) {
		return Bi(), t.flags |= 256, nc(e, t, n, r), t.child;
	}
	var _c = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function vc(e) {
		return {
			baseLanes: e,
			cachePool: ya()
		};
	}
	function yc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function bc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(co.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (V) {
				if (a ? ro(t) : oo(t), (e = Mi) ? (e = rf(e, Pi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ci === null ? null : {
						id: wi,
						overflow: Ti
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = hi(e), n.return = t, t.child = n, ji = t, Mi = null)) : e = null, e === null) throw Ii(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (oo(t), a = t.mode, c = Sc({
				mode: "hidden",
				children: c
			}, a), r = pi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(null, r)) : (ro(t), xc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (ro(t), t.flags &= -257, t = Cc(e, t, n)) : t.memoizedState === null ? (oo(t), c = r.fallback, a = t.mode, r = Sc({
				mode: "visible",
				children: r.children
			}, a), c = pi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ia(t, e.child, null, n), r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, t = sc(null, r)) : (oo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (ro(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Hi({
					value: r,
					source: null,
					stack: null
				}), t = Cc(e, t, n);
			} else if (tc || Xi(e, t, n, !1), s = (n & e.childLanes) !== 0, tc || s) {
				if (s = Rl, s !== null && (r = it(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ri(e, r), hu(s, e, r), ec;
				af(c) || Du(), t = Cc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Mi = cf(c.nextSibling), ji = t, V = !0, Ni = null, Pi = !1, e !== null && Ai(t, e), t = xc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (oo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ui(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = pi(c, a, n, null), c.flags |= 2) : c = ui(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, sc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = vc(n) : (a = c.cachePool, a === null ? a = ya() : (l = aa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(e.child, r)) : (ro(t), n = e.child, e = n.sibling, n = ui(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function xc(e, t) {
		return t = Sc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Sc(e, t) {
		return e = ci(22, e, null, t), e.lanes = 0, e;
	}
	function Cc(e, t, n) {
		return Ia(t, e.child, null, n), e = xc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function wc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ji(e.return, t, n);
	}
	function Tc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Ec(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = co.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, A(co, o), nc(e, t, r, n), r = V ? B : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && wc(e, n, t);
			else if (e.tag === 19) wc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && lo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Tc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && lo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Tc(t, !0, n, null, a, r);
				break;
			case "together":
				Tc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Dc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Xi(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ui(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ui(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Oc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Zi(e)));
	}
	function kc(e, t, n) {
		switch (t.tag) {
			case 3:
				_e(t, t.stateNode.containerInfo), Ki(t, aa, e.memoizedState.cache), Bi();
				break;
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ki(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, io(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ro(t), e = Dc(e, t, n), e === null ? null : e.sibling) : bc(e, t, n) : (ro(t), t.flags |= 128, null);
				ro(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (Xi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Ec(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), A(co, co.current), r) break;
				return null;
			case 22: return t.lanes = 0, oc(e, t, n, t.pendingProps);
			case 24: Ki(t, aa, e.memoizedState.cache);
		}
		return Dc(e, t, n);
	}
	function Ac(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) tc = !0;
			else {
				if (!Oc(e, n) && !(t.flags & 128)) return tc = !1, kc(e, t, n);
				tc = !!(e.flags & 131072);
			}
		} else tc = !1, V && t.flags & 1048576 && Di(t, B, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ea(t.elementType), t.type = e, typeof e == "function") li(e) ? (r = Ws(e, r), t.tag = 1, t = hc(null, t, e, r, n)) : (t.tag = 0, t = pc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = rc(null, t, e, r, n);
								break a;
							}
							if (a === ne) {
								t.tag = 14, t = ic(null, t, e, r, n);
								break a;
							}
						}
						throw t = ce(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return pc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ws(r, t.pendingProps), hc(e, t, r, a, n);
			case 3:
				a: {
					if (_e(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ba(e, t), qa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ki(t, aa, r), r !== o.cache && Yi(t, [aa], n, !0), Ka(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = gc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = vi(Error(i(424)), t), Hi(a), t = gc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Mi = cf(e.firstChild), ji = t, V = !0, Ni = null, Pi = !0, n = La(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Bi(), r === a) {
							t = Dc(e, t, n);
							break a;
						}
						nc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return fc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : V || (n = t.type, e = t.pendingProps, r = Bd(he.current).createElement(n), r[ut] = t, r[dt] = e, Fd(r, n, e), Ct(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ye(t), e === null && V && (r = t.stateNode = ff(t.type, t.pendingProps, he.current), ji = t, Pi = !0, a = Mi, Zd(t.type) ? (lf = a, Mi = cf(r.firstChild)) : Mi = a), nc(e, t, t.pendingProps.children, n), fc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && V && ((a = r = Mi) && (r = tf(r, t.type, t.pendingProps, Pi), r === null ? a = !1 : (t.stateNode = r, ji = t, Mi = cf(r.firstChild), Pi = !1, a = !0)), a || Ii(t)), ye(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = So(e, t, To, null, null, n), Qf._currentValue = a), fc(e, t), nc(e, t, r, n), t.child;
			case 6: return e === null && V && ((e = n = Mi) && (n = nf(n, t.pendingProps, Pi), n === null ? e = !1 : (t.stateNode = n, ji = t, Mi = null, e = !0)), e || Ii(t)), null;
			case 13: return bc(e, t, n);
			case 4: return _e(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ia(t, null, r, n) : nc(e, t, r, n), t.child;
			case 11: return rc(e, t, t.type, t.pendingProps, n);
			case 7: return nc(e, t, t.pendingProps, n), t.child;
			case 8: return nc(e, t, t.pendingProps.children, n), t.child;
			case 12: return nc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ki(t, t.type, r.value), nc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Qi(t), a = $i(a), r = r(a), t.flags |= 1, nc(e, t, r, n), t.child;
			case 14: return ic(e, t, t.type, t.pendingProps, n);
			case 15: return ac(e, t, t.type, t.pendingProps, n);
			case 19: return Ec(e, t, n);
			case 31: return dc(e, t, n);
			case 22: return oc(e, t, n, t.pendingProps);
			case 24: return Qi(t), r = $i(aa), e === null ? (a = _a(), a === null && (a = Rl, o = oa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, za(t), Ki(t, aa, a)) : ((e.lanes & n) !== 0 && (Ba(e, t), qa(t, null, null, n), Ka()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ki(t, aa, r), r !== a.cache && Yi(t, [aa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ki(t, aa, r))), nc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function jc(e) {
		e.flags |= 4;
	}
	function Mc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (wu()) e.flags |= 8192;
				else throw Da = Ca, xa;
			}
		} else e.flags &= -16777217;
	}
	function Nc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) {
			if (wu()) e.flags |= 8192;
			else throw Da = Ca, xa;
		}
	}
	function Pc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Qe(), e.lanes |= t, Yl |= t);
	}
	function Fc(e, t) {
		if (!V) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Ic(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Lc(e, t, n) {
		var r = t.pendingProps;
		switch (ki(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Ic(t), null;
			case 1: return Ic(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), qi(aa), ve(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (zi(t) ? jc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Vi())), Ic(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (jc(t), o === null ? (Ic(t), Mc(t, a, null, r, n)) : (Ic(t), Nc(t, o))) : o ? o === e.memoizedState ? (Ic(t), t.flags &= -16777217) : (jc(t), Ic(t), Nc(t, o)) : (e = e.memoizedProps, e !== r && jc(t), Ic(t), Mc(t, a, e, r, n)), null;
			case 27:
				if (be(t), n = he.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ic(t), null;
					}
					e = pe.current, zi(t) ? Li(t, e) : (e = ff(a, r, n), t.stateNode = e, jc(t));
				}
				return Ic(t), null;
			case 5:
				if (be(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ic(t), null;
					}
					if (o = pe.current, zi(t)) Li(t, o);
					else {
						var s = Bd(he.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[ut] = t, o[dt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Fd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && jc(t);
					}
				}
				return Ic(t), Mc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = he.current, zi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = ji, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ut] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ii(t, !0);
					} else e = Bd(e).createTextNode(r), e[ut] = t, t.stateNode = e;
				}
				return Ic(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = zi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ut] = t;
						} else Bi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ic(t), e = !1;
					} else n = Vi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (so(t), t) : (so(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Ic(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = zi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ut] = t;
						} else Bi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ic(t), a = !1;
					} else a = Vi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (so(t), t) : (so(t), null);
				}
				return so(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Pc(t, t.updateQueue), Ic(t), null);
			case 4: return ve(), e === null && Sd(t.stateNode.containerInfo), Ic(t), null;
			case 10: return qi(t.type), Ic(t), null;
			case 19:
				if (k(co), r = t.memoizedState, r === null) return Ic(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) Fc(r, !1);
					else {
						if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = lo(e), o !== null) {
								for (t.flags |= 128, Fc(r, !1), e = o.updateQueue, t.updateQueue = e, Pc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) di(n, e), n = n.sibling;
								return A(co, co.current & 1 | 2), V && Ei(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && N() > tu && (t.flags |= 128, a = !0, Fc(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = lo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Pc(t, e), Fc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !V) return Ic(t), null;
						} else 2 * N() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Fc(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Ic(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = N(), e.sibling = null, n = co.current, A(co, a ? n & 1 | 2 : n & 1), V && Ei(t, r.treeForkCount), e);
			case 22:
			case 23: return so(t), eo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ic(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ic(t), n = t.updateQueue, n !== null && Pc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && k(ga), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), qi(aa), Ic(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Rc(e, t) {
		switch (ki(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return qi(aa), ve(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return be(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (so(t), t.alternate === null) throw Error(i(340));
					Bi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (so(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Bi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return k(co), null;
			case 4: return ve(), null;
			case 10: return qi(t.type), null;
			case 22:
			case 23: return so(t), eo(), e !== null && k(ga), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return qi(aa), null;
			case 25: return null;
			default: return null;
		}
	}
	function zc(e, t) {
		switch (ki(t), t.tag) {
			case 3:
				qi(aa), ve();
				break;
			case 26:
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ve();
				break;
			case 31:
				t.memoizedState !== null && so(t);
				break;
			case 13:
				so(t);
				break;
			case 19:
				k(co);
				break;
			case 10:
				qi(t.type);
				break;
			case 22:
			case 23:
				so(t), eo(), e !== null && k(ga);
				break;
			case 24: qi(aa);
		}
	}
	function Bc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Vc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Hc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ya(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Uc(e, t, n) {
		n.props = Ws(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Wc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Gc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function Kc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function qc(e, t, n) {
		try {
			var r = e.stateNode;
			Id(r, e.type, n, t), r[dt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Jc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Yc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Jc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Xc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = L));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Xc(e, t, n), e = e.sibling; e !== null;) Xc(e, t, n), e = e.sibling;
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Fd(t, r, n), t[ut] = e, t[dt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var $c = !1, el = !1, tl = !1, nl = typeof WeakSet == "function" ? WeakSet : Set, K = null;
	function rl(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Or(e), kr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, K = t; K !== null;) if (t = K, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, K = e;
		else for (; K !== null;) {
			switch (t = K, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ws(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, K = e;
				break;
			}
			K = t.return;
		}
	}
	function il(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				yl(e, n), r & 4 && Bc(5, n);
				break;
			case 1:
				if (yl(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = Ws(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && Hc(n), r & 512 && Wc(n, n.return);
				break;
			case 3:
				if (yl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ya(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Qc(n);
			case 26:
			case 5:
				yl(e, n), t === null && r & 4 && Kc(n), r & 512 && Wc(n, n.return);
				break;
			case 12:
				yl(e, n);
				break;
			case 31:
				yl(e, n), r & 4 && ul(e, n);
				break;
			case 13:
				yl(e, n), r & 4 && dl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || $c, !r) {
					t = t !== null && t.memoizedState !== null || el, i = $c;
					var a = el;
					$c = r, (el = t) && !a ? xl(e, n, !!(n.subtreeFlags & 8772)) : yl(e, n), $c = i, el = a;
				}
				break;
			case 30: break;
			default: yl(e, n);
		}
	}
	function al(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, al(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && vt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var ol = null, sl = !1;
	function cl(e, t, n) {
		for (n = n.child; n !== null;) ll(e, t, n), n = n.sibling;
	}
	function ll(e, t, n) {
		if (Be && typeof Be.onCommitFiberUnmount == "function") try {
			Be.onCommitFiberUnmount(ze, n);
		} catch {}
		switch (n.tag) {
			case 26:
				el || Gc(n, t), cl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				el || Gc(n, t);
				var r = ol, i = sl;
				Zd(n.type) && (ol = n.stateNode, sl = !1), cl(e, t, n), pf(n.stateNode), ol = r, sl = i;
				break;
			case 5: el || Gc(n, t);
			case 6:
				if (r = ol, i = sl, ol = null, cl(e, t, n), ol = r, sl = i, ol !== null) {
					if (sl) try {
						(ol.nodeType === 9 ? ol.body : ol.nodeName === "HTML" ? ol.ownerDocument.body : ol).removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						ol.removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				ol !== null && (sl ? (e = ol, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(ol, n.stateNode));
				break;
			case 4:
				r = ol, i = sl, ol = n.stateNode.containerInfo, sl = !0, cl(e, t, n), ol = r, sl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Vc(2, n, t), el || Vc(4, n, t), cl(e, t, n);
				break;
			case 1:
				el || (Gc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Uc(n, t, r)), cl(e, t, n);
				break;
			case 21:
				cl(e, t, n);
				break;
			case 22:
				el = (r = el) || n.memoizedState !== null, cl(e, t, n), el = r;
				break;
			default: cl(e, t, n);
		}
	}
	function ul(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function fl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new nl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new nl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function pl(e, t) {
		var n = fl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ml(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							ol = c.stateNode, sl = !1;
							break a;
						}
						break;
					case 5:
						ol = c.stateNode, sl = !1;
						break a;
					case 3:
					case 4:
						ol = c.stateNode.containerInfo, sl = !0;
						break a;
				}
				c = c.return;
			}
			if (ol === null) throw Error(i(160));
			ll(o, s, a), ol = null, sl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) gl(t, e), t = t.sibling;
	}
	var hl = null;
	function gl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ml(t, e), _l(e), r & 4 && (Vc(3, e, e.return), Bc(3, e), Vc(5, e, e.return));
				break;
			case 1:
				ml(t, e), _l(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 64 && $c && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = hl;
				if (ml(t, e), _l(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) {
						if (r === null) {
							if (e.stateNode === null) {
								a: {
									r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
									b: switch (r) {
										case "title":
											o = a.getElementsByTagName("title")[0], (!o || o[_t] || o[ut] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Fd(o, r, n), o[ut] = e, Ct(o), r = o;
											break a;
										case "link":
											var s = Vf("link", "href", a).get(r + (n.href || ""));
											if (s) {
												for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
											break;
										case "meta":
											if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
												for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
											break;
										default: throw Error(i(468, r));
									}
									o[ut] = e, Ct(o), r = o;
								}
								e.stateNode = r;
							} else Hf(a, e.type, e.stateNode);
						} else e.stateNode = If(a, r, e.memoizedProps);
					} else o === r ? r === null && e.stateNode !== null && qc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ml(t, e), _l(e), r & 512 && (el || n === null || Gc(n, n.return)), n !== null && r & 4 && qc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ml(t, e), _l(e), r & 512 && (el || n === null || Gc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						qt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, qc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (tl = !0);
				break;
			case 6:
				if (ml(t, e), _l(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = hl, hl = gf(t.containerInfo), ml(t, e), hl = a, _l(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				tl && (tl = !1, vl(e));
				break;
			case 4:
				r = hl, hl = gf(e.stateNode.containerInfo), ml(t, e), _l(e), hl = r;
				break;
			case 12:
				ml(t, e), _l(e);
				break;
			case 31:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 13:
				ml(t, e), _l(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = N()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = $c, d = el;
				if ($c = u || a, el = d || l, ml(t, e), el = d, $c = u, _l(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || $c || el || bl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, pl(e, n))));
				break;
			case 19:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ml(t, e), _l(e);
		}
	}
	function _l(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Jc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Zc(e, Yc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (qt(o, ""), n.flags &= -33), Zc(e, Yc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Xc(e, Yc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function vl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			vl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function yl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) il(e, t.alternate, t), t = t.sibling;
	}
	function bl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Vc(4, t, t.return), bl(t);
					break;
				case 1:
					Gc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Uc(t, t.return, n), bl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Gc(t, t.return), bl(t);
					break;
				case 22:
					t.memoizedState === null && bl(t);
					break;
				case 30:
					bl(t);
					break;
				default: bl(t);
			}
			e = e.sibling;
		}
	}
	function xl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					xl(i, a, n), Bc(4, a);
					break;
				case 1:
					if (xl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ja(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Hc(a), Wc(a, a.return);
					break;
				case 27: Qc(a);
				case 26:
				case 5:
					xl(i, a, n), n && r === null && o & 4 && Kc(a), Wc(a, a.return);
					break;
				case 12:
					xl(i, a, n);
					break;
				case 31:
					xl(i, a, n), n && o & 4 && ul(i, a);
					break;
				case 13:
					xl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 22:
					a.memoizedState === null && xl(i, a, n), Wc(a, a.return);
					break;
				case 30: break;
				default: xl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Sl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && sa(n));
	}
	function Cl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e));
	}
	function wl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Tl(e, t, n, r), t = t.sibling;
	}
	function Tl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				wl(e, t, n, r), i & 2048 && Bc(9, t);
				break;
			case 1:
				wl(e, t, n, r);
				break;
			case 3:
				wl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e)));
				break;
			case 12:
				if (i & 2048) {
					wl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else wl(e, t, n, r);
				break;
			case 31:
				wl(e, t, n, r);
				break;
			case 13:
				wl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? wl(e, t, n, r) : (a._visibility |= 2, El(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? wl(e, t, n, r) : Dl(e, t), i & 2048 && Sl(o, t);
				break;
			case 24:
				wl(e, t, n, r), i & 2048 && Cl(t.alternate, t);
				break;
			default: wl(e, t, n, r);
		}
	}
	function El(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					El(a, o, s, c, i), Bc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, El(a, o, s, c, i)) : u._visibility & 2 ? El(a, o, s, c, i) : Dl(a, o), i && l & 2048 && Sl(o.alternate, o);
					break;
				case 24:
					El(a, o, s, c, i), i && l & 2048 && Cl(o.alternate, o);
					break;
				default: El(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Dl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Dl(n, r), i & 2048 && Sl(r.alternate, r);
					break;
				case 24:
					Dl(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				default: Dl(n, r);
			}
			t = t.sibling;
		}
	}
	var Ol = 8192;
	function kl(e, t, n) {
		if (e.subtreeFlags & Ol) for (e = e.child; e !== null;) Al(e, t, n), e = e.sibling;
	}
	function Al(e, t, n) {
		switch (e.tag) {
			case 26:
				kl(e, t, n), e.flags & Ol && e.memoizedState !== null && Gf(n, hl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				kl(e, t, n);
				break;
			case 3:
			case 4:
				var r = hl;
				hl = gf(e.stateNode.containerInfo), kl(e, t, n), hl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ol, Ol = 16777216, kl(e, t, n), Ol = r) : kl(e, t, n));
				break;
			default: kl(e, t, n);
		}
	}
	function jl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ml(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				K = r, Fl(r, e);
			}
			jl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Nl(e), e = e.sibling;
	}
	function Nl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ml(e), e.flags & 2048 && Vc(9, e, e.return);
				break;
			case 3:
				Ml(e);
				break;
			case 12:
				Ml(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Pl(e)) : Ml(e);
				break;
			default: Ml(e);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				K = r, Fl(r, e);
			}
			jl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Vc(8, t, t.return), Pl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Pl(t));
					break;
				default: Pl(t);
			}
			e = e.sibling;
		}
	}
	function Fl(e, t) {
		for (; K !== null;) {
			var n = K;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Vc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: sa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, K = r;
			else a: for (n = e; K !== null;) {
				r = K;
				var i = r.sibling, a = r.return;
				if (al(r), r === n) {
					K = null;
					break a;
				}
				if (i !== null) {
					i.return = a, K = i;
					break a;
				}
				K = a;
			}
		}
	}
	var Il = {
		getCacheForType: function(e) {
			var t = $i(aa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return $i(aa).controller.signal;
		}
	}, Ll = typeof WeakMap == "function" ? WeakMap : Map, q = 0, Rl = null, J = null, Y = 0, X = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return q & 2 && Y !== 0 ? Y & -Y : E.T === null ? st() : dd();
	}
	function mu() {
		if (Jl === 0) {
			if (!(Y & 536870912) || V) {
				var e = Ke;
				Ke <<= 1, !(Ke & 3932160) && (Ke = 262144), Jl = e;
			} else Jl = 536870912;
		}
		return e = to.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === Rl && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), et(e, n), q & 2 && e === Rl || (e === Rl && (!(q & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (q & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Xe(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Vl && !r && yu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !vu(n)) a = Ou(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Xl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
								if (Hl && !l) {
									c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
									break a;
								}
								o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Su(e, 0), yu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							yu(r, t, Jl, !Bl);
							break a;
						case 2:
							Zl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = $l + 300 - N(), 10 < a)) {
						if (yu(r, t, Jl, !Bl), Ye(r, 0, !0) !== 0) break a;
						su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, "Throttled", -0, 0), a);
						break a;
					}
					_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: L
			}, Al(t, a, d);
			var m = (a & 62914560) === a ? $l - N() : (a & 4194048) === a ? eu - N() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Cr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - He(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && nt(e, n, t);
	}
	function bu() {
		return q & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Gi = Wi = null, W(e), Aa = null, ja = 0, e = J;
			for (; e !== null;) zc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), Rl = e, J = n = ui(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = Xe(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - He(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, ei(), n;
	}
	function Cu(e, t) {
		H = null, E.H = Is, t === ba || t === Sa ? (t = Oa(), X = 3) : t === xa ? (t = Oa(), X = 4) : X = t === ec ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, J === null && (Wl = 1, Js(e, vi(t, e.current)));
	}
	function wu() {
		var e = to.current;
		return e === null ? !0 : (Y & 4194048) === Y ? no === null : (Y & 62914560) === Y || Y & 536870912 ? e === no : !1;
	}
	function Tu() {
		var e = E.H;
		return E.H = Is, e === null ? Is : e;
	}
	function Eu() {
		var e = E.A;
		return E.A = Il, e;
	}
	function Du() {
		Wl = 4, Bl || (Y & 4194048) !== Y && to.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || Rl === null || yu(Rl, Y, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = q;
		q |= 2;
		var i = Tu(), a = Eu();
		(Rl !== e || Y !== t) && (nu = null, Su(e, t)), t = !1;
		var o = Wl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = zl;
					switch (X) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							to.current === null && (t = !0);
							var l = X;
							if (X = 0, zl = null, Pu(e, s, c, l), n && Vl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, zl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = Wl;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Gi = Wi = null, q = r, E.H = i, E.A = a, J === null && (Rl = null, Y = 0, ei()), o;
	}
	function ku() {
		for (; J !== null;) Mu(J);
	}
	function Au(e, t) {
		var n = q;
		q |= 2;
		var r = Tu(), a = Eu();
		Rl !== e || Y !== t ? (nu = null, tu = N() + 500, Su(e, t)) : Vl = Xe(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = zl;
					b: switch (X) {
						case 1:
							X = 0, zl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (wa(o)) {
								X = 0, zl = null, Nu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || Rl !== e || (X = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							wa(o) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Wf(s) : c.stateNode.complete) {
										X = 0, zl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Fu(u));
										}
										break b;
									}
							}
							X = 0, zl = null, Pu(e, t, o, 5);
							break;
						case 6:
							X = 0, zl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), Wl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Gi = Wi = null, E.H = r, E.A = a, q = n, J === null ? (Rl = null, Y = 0, ei(), Wl) : 0;
	}
	function ju() {
		for (; J !== null && !ke();) Mu(J);
	}
	function Mu(e) {
		var t = Ac(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = mc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = mc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: W(t);
			default: zc(n, t), t = J = di(t, Ul), t = Ac(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Pu(e, t, n, r) {
		Gi = Wi = null, W(t), Aa = null, ja = 0;
		var i = t.return;
		try {
			if ($s(e, i, t, n, Y)) {
				Wl = 1, Js(e, vi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Wl = 1, Js(e, vi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (V || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = to.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Lc(t.alternate, t, Ul);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Wl === 0 && (Wl = 5);
	}
	function Iu(e, t) {
		do {
			var n = Rc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Wl = 6, J = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (q & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= $r, tt(e, n, o, s, c, l), e === Rl && (J = Rl = null, Y = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Pe, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = E.T, E.T = null, a = D.p, D.p = 2, s = q, q |= 4;
				try {
					rl(e, t, n);
				} finally {
					q = s, D.p = a, E.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = q;
				q |= 4;
				try {
					gl(t, e);
					var a = zd, o = Or(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Dr(s.ownerDocument.documentElement, s)) {
						if (c !== null && kr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Er(s, h), v = Er(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					q = i, D.p = r, E.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = q;
				q |= 4;
				try {
					il(e, t.alternate, t);
				} finally {
					q = i, D.p = r, E.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Ae();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), ot(n), t = t.stateNode, Be && typeof Be.onCommitFiberRoot == "function") try {
				Be.onCommitFiberRoot(ze, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = E.T, i = D.p, D.p = 2, E.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					E.T = t, D.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, sa(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = ot(su), r = E.T, a = D.p;
		try {
			D.p = 32 > n ? 32 : n, E.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, q & 6) throw Error(i(331));
			var c = q;
			if (q |= 4, Nl(o.current), Tl(o, o.current, s, n), q = c, id(0, !1), Be && typeof Be.onPostCommitFiberRoot == "function") try {
				Be.onPostCommitFiberRoot(ze, o);
			} catch {}
			return !0;
		} finally {
			D.p = a, E.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = vi(n, t), t = Xs(e.stateNode, t, 2), e = Ha(e, t, 2), e !== null && (et(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = vi(n, e), n = Zs(2), r = Ha(t, n, 2), r !== null && (Qs(n, r, t, e), et(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ll();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Hl = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Rl === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > N() - $l ? !(q & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = Qe()), e = ri(e, t), e !== null && (et(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return De(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - He(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, ld(r, a));
						} else a = Y, a = Ye(r, r === Rl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Xe(r, a) || (n = !0, ld(r, a));
					}
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = N(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - He(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Rl, n = Y, n = Ye(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Oe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Xe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Oe(r), ot(n)) {
				case 2:
				case 8:
					n = Ne;
					break;
				case 32:
					n = Pe;
					break;
				case 268435456:
					n = Ie;
					break;
				default: n = Pe;
			}
			return r = cd.bind(null, e), n = De(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Oe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = Ye(e, e === Rl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, N()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			q & 6 ? De(Me, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = ua;
			e === 0 && (e = P, P <<= 1, !(P & 261888) && (P = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : en("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[dt] || null).action), o = r.submitter;
			o && (t = (t = o[dt] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Sn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								Ss(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Ss(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < Jr.length; hd++) {
		var gd = Jr[hd];
		Yr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Yr(Br, "onAnimationEnd"), Yr(Vr, "onAnimationIteration"), Yr(Hr, "onAnimationStart"), Yr("dblclick", "onDoubleClick"), Yr("focusin", "onFocus"), Yr("focusout", "onBlur"), Yr(Ur, "onTransitionRun"), Yr(Wr, "onTransitionStart"), Yr(Gr, "onTransitionCancel"), Yr(Kr, "onTransitionEnd"), Dt("onMouseEnter", ["mouseout", "mouseover"]), Dt("onMouseLeave", ["mouseout", "mouseover"]), Dt("onPointerEnter", ["pointerout", "pointerover"]), Dt("onPointerLeave", ["pointerout", "pointerover"]), Et("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Et("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Et("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Et("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Xr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Xr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[pt];
		n === void 0 && (n = t[pt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, wt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !dn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = yt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		cn(function() {
			var r = a, i = nn(n), s = [];
			a: {
				var c = qr.get(e);
				if (c !== void 0) {
					var l = Sn, u = e;
					switch (e) {
						case "keypress": if (_n(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Bn;
							break;
						case "focusin":
							u = "focus", l = jn;
							break;
						case "focusout":
							u = "blur", l = jn;
							break;
						case "beforeblur":
						case "afterblur":
							l = jn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = kn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = An;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Hn;
							break;
						case Br:
						case Vr:
						case Hr:
							l = Mn;
							break;
						case Kr:
							l = Un;
							break;
						case "scroll":
						case "scrollend":
							l = wn;
							break;
						case "wheel":
							l = Wn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Nn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Vn;
							break;
						case "toggle":
						case "beforetoggle": l = Gn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = ln(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== tn && (u = n.relatedTarget || n.fromElement) && (yt(u) || u[ft])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? yt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = kn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Vn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : xt(l), h = u == null ? c : xt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, yt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? xt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = dr;
					else if (ar(c)) {
						if (fr) v = xr;
						else {
							v = yr;
							var y = vr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Zt(r.elementType) && (v = dr) : v = br;
					if (v &&= v(e, r)) {
						or(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && I(c, "number", c.value);
				}
				switch (y = r ? xt(r) : window, e) {
					case "focusin":
						(ar(y) || y.contentEditable === "true") && (Ar = y, jr = r, Mr = null);
						break;
					case "focusout":
						Mr = jr = Ar = null;
						break;
					case "mousedown":
						Nr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Nr = !1, Pr(s, n, i);
						break;
					case "selectionchange": if (R) break;
					case "keydown":
					case "keyup": Pr(s, n, i);
				}
				var b;
				if (qn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else tr ? $n(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Xn && n.locale !== "ko" && (tr || x !== "onCompositionStart" ? x === "onCompositionEnd" && tr && (b = gn()) : (pn = i, mn = "value" in pn ? pn.value : pn.textContent, tr = !0)), y = Ed(r, x), 0 < y.length && (x = new Pn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = er(n), b !== null && (x.data = b)))), (b = Yn ? nr(e, n) : rr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new Pn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = ln(e, n), i != null && r.unshift(Td(e, i, a)), i = ln(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = ln(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = ln(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || qt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && qt(e, "" + r);
				break;
			case "className":
				Mt(e, "class", r);
				break;
			case "tabIndex":
				Mt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Mt(e, n, r);
				break;
			case "style":
				Xt(e, r, o);
				break;
			case "data": if (t !== "object") {
				Mt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = en("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && Nd(e, t, "name", a.name, a, null), Nd(e, t, "formEncType", a.formEncType, a, null), Nd(e, t, "formMethod", a.formMethod, a, null), Nd(e, t, "formTarget", a.formTarget, a, null)) : (Nd(e, t, "encType", a.encType, a, null), Nd(e, t, "method", a.method, a, null), Nd(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = en("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = L);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = en("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), F(e, "popover", r);
				break;
			case "xlinkActuate":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Nt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Nt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Nt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				F(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Qt.get(n) || n, F(e, n, r));
		}
	}
	function Pd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Xt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? qt(e, r) : (typeof r == "number" || typeof r == "bigint") && qt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = L);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Tt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[dt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : F(e, n, r);
			}
		}
	}
	function Fd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Nd(e, t, o, s, n, null);
					}
				}
				a && Nd(e, t, "srcSet", n.srcSet, n, null), r && Nd(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Nd(e, t, r, d, n, null);
					}
				}
				Ut(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Nd(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Wt(e, !!r, n, !0) : Wt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Nd(e, t, s, c, n, null);
				}
				Kt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Nd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Nd(e, t, u, r, n, null);
				}
				return;
			default: if (Zt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Pd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Nd(e, t, c, r, n, null));
	}
	function Id(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Nd(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Nd(e, t, p, m, r, f);
					}
				}
				Ht(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Nd(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Nd(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Wt(e, !!n, n ? [] : "", !1) : Wt(e, !!n, t, !0)) : Wt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Nd(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Nd(e, t, s, a, r, o);
				}
				Gt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Nd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Nd(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Nd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Nd(e, t, u, p, r, m);
				}
				return;
			default: if (Zt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Pd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Pd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Nd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Nd(e, t, f, p, r, m);
	}
	function Ld(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function $() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Ld(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Ld(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Np(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") pf(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, pf(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[_t] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && pf(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), vt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[_t]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		vt(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = D.d;
	D.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = bt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ws(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Vt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Fd(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Vt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Vt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Vt(n.imageSizes) + "\"]")) : i += "[href=\"" + Vt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Fd(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Vt(r) + "\"][href=\"" + Vt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Fd(r, "link", e), Ct(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = St(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					Ct(c), Fd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Ct(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Ct(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = he.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = St(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = St(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = St(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Vt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Fd(t, "link", n), Ct(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Vt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Vt(n.href) + "\"]");
				if (r) return t.instance = r, Ct(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ct(r), Fd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ct(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), Ct(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Fd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, Ct(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ct(a), Fd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[_t] || a[ut] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ct(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), Ct(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Fd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * $());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: O,
		_currentValue2: O,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $e(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $e(0), this.hiddenUpdates = $e(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ci(3, null, null, t), e.current = a, a.stateNode = e, t = oa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, za(a), e;
	}
	function tp(e) {
		return e ? (e = oi, e) : oi;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Va(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ha(e, r, t), n !== null && (hu(n, e, t), Ua(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ri(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = at(t);
			var n = ri(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 2, up(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 8, up(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = bt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Je(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - He(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(q & 6) && (tu = N() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ri(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = nn(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = yt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (je()) {
				case Me: return 2;
				case Ne: return 8;
				case Pe:
				case Fe: return 32;
				case Ie: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = bt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = yt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				tn = r, n.target.dispatchEvent(r), tn = null;
			} else return t = bt(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = bt(n);
				a !== null && (e.splice(t, 3), t -= 3, Ss(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[dt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[dt] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[ft] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = st();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.0") throw Error(i(527, Lp, "19.2.0"));
	D.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.0",
		rendererPackageName: "react-dom",
		currentDispatcherRef: E,
		reconcilerVersion: "19.2.0"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			ze = zp.inject(Rp), Be = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Gs, s = Ks, c = qs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[ft] = t.current, Sd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
}));
// node_modules/clsx/dist/clsx.mjs
function _(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = _(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function v() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = _(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/@mui/utils/resolveProps/resolveProps.mjs
function y(e, t, n = !1) {
	let r = { ...t };
	for (let i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
		let a = i;
		if (a === "components" || a === "slots") r[a] = {
			...e[a],
			...r[a]
		};
		else if (a === "componentsProps" || a === "slotProps") {
			let i = e[a], o = t[a];
			if (!o) r[a] = i || {};
			else if (!i) r[a] = o;
			else {
				r[a] = { ...o };
				for (let e in i) if (Object.prototype.hasOwnProperty.call(i, e)) {
					let t = e, s = i[t], c = o[t];
					typeof s == "function" || typeof c == "function" ? r[a][t] = (...e) => y((typeof s == "function" ? s(...e) : s) ?? {}, (typeof c == "function" ? c(...e) : c) ?? {}, n) : r[a][t] = y(s ?? {}, c ?? {}, n);
				}
			}
		} else a === "className" && n && t.className !== void 0 ? r.className = v(e?.className, t?.className) : a === "style" && n && t.style ? r.style = {
			...e?.style,
			...t?.style
		} : r[a] === void 0 && (r[a] = e[a]);
	}
	return r;
}
// node_modules/@mui/utils/composeClasses/composeClasses.mjs
function b(e, t, n = void 0) {
	let r = {};
	for (let i in e) {
		let a = e[i], o = "", s = !0;
		for (let e = 0; e < a.length; e += 1) {
			let r = a[e];
			r && (o += (s === !0 ? "" : " ") + t(r), s = !1, n && n[r] && (o += " " + n[r]));
		}
		r[i] = o;
	}
	return r;
}
// node_modules/@mui/utils/ClassNameGenerator/ClassNameGenerator.mjs
var x = (e) => e, S = (() => {
	let e = x;
	return {
		configure(t) {
			e = t;
		},
		generate(t) {
			return e(t);
		},
		reset() {
			e = x;
		}
	};
})();
// node_modules/@mui/utils/formatMuiErrorMessage/formatMuiErrorMessage.mjs
function C(e, ...t) {
	let n = new URL(`https://mui.com/production-error/?code=${e}`);
	return t.forEach((e) => n.searchParams.append("args[]", e)), `Minified MUI error #${e}; visit ${n} for the full message.`;
}
// node_modules/@mui/utils/capitalize/capitalize.mjs
function w(e) {
	if (typeof e != "string") throw Error(C(7));
	return e.charAt(0).toUpperCase() + e.slice(1);
}
// node_modules/@mui/material/utils/capitalize.mjs
var ee = w;
// node_modules/@mui/utils/fastDeepAssign/fastDeepAssign.mjs
function te(e, t) {
	let n = Array.isArray(t), r = Array.isArray(e);
	return ae(t) ? t : oe(e) ? se(t) : n && r ? re(e, t) : n === r ? ce(e, t) : se(t);
}
function ne(e) {
	let t = 0, n = e.length, r = Array(n);
	for (t = 0; t < n; t += 1) r[t] = se(e[t]);
	return r;
}
function T(e) {
	let t = {};
	for (let n in e) n !== "__proto__" && n !== "constructor" && n !== "prototype" && (t[n] = se(e[n]));
	return t;
}
function re(e, t) {
	let n = e.length;
	for (let r = 0; r < t.length; r += 1) e[n + r] = se(t[r]);
	return e;
}
function ie(e) {
	return typeof e == "object" && !!e && !(e instanceof RegExp) && !(e instanceof Date);
}
function ae(e) {
	return typeof e != "object" || !e;
}
function oe(e) {
	return typeof e != "object" || !e || e instanceof RegExp || e instanceof Date;
}
function se(e) {
	return ie(e) ? Array.isArray(e) ? ne(e) : T(e) : e;
}
function ce(e, t) {
	for (let n in t) n !== "__proto__" && n !== "constructor" && n !== "prototype" && (e[n] = n in e ? te(e[n], t[n]) : se(t[n]));
	return e;
}
// node_modules/@mui/utils/isObjectEmpty/isObjectEmpty.mjs
function le(e) {
	if (e == null) return !0;
	for (let t in e) return !1;
	return !0;
}
// node_modules/react-is/cjs/react-is.production.js
var E = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), a = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), d = Symbol.for("react.view_transition"), f = Symbol.for("react.client.reference");
	e.isValidElementType = function(e) {
		return !!(typeof e == "string" || typeof e == "function" || e === t || e === r || e === n || e === s || e === c || e === d || typeof e == "object" && e && (e.$$typeof === u || e.$$typeof === l || e.$$typeof === a || e.$$typeof === i || e.$$typeof === o || e.$$typeof === f || e.getModuleId !== void 0));
	};
})), D = /* @__PURE__ */ o(((e, t) => {
	t.exports = E();
})), O = /* @__PURE__ */ c(u(), 1), ue = D();
function de(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function fe(e) {
	if (/*#__PURE__*/ O.isValidElement(e) || (0, ue.isValidElementType)(e) || !de(e)) return e;
	let t = {};
	return Object.keys(e).forEach((n) => {
		t[n] = fe(e[n]);
	}), t;
}
function k(e, t, n = { clone: !0 }) {
	let r = n.clone ? { ...e } : e;
	return de(e) && de(t) && Object.keys(t).forEach((i) => {
		/*#__PURE__*/ O.isValidElement(t[i]) || (0, ue.isValidElementType)(t[i]) ? r[i] = t[i] : de(t[i]) && Object.prototype.hasOwnProperty.call(e, i) && de(e[i]) ? r[i] = k(e[i], t[i], n) : n.clone ? r[i] = de(t[i]) ? fe(t[i]) : t[i] : r[i] = t[i];
	}), r;
}
// node_modules/@mui/system/cssContainerQueries/cssContainerQueries.mjs
var A = /min-width:\s*([0-9.]+)/;
function pe(e, t) {
	if (!e.containerQueries || !me(t)) return t;
	let n = [];
	for (let e in t) e.startsWith("@container") && n.push(e);
	n.sort((e, t) => +(e.match(A)?.[1] || 0) - (t.match(A)?.[1] || 0));
	let r = t;
	for (let e = 0; e < n.length; e += 1) {
		let t = n[e], i = r[t];
		delete r[t], r[t] = i;
	}
	return r;
}
function me(e) {
	for (let t in e) if (t.startsWith("@container")) return !0;
	return !1;
}
function he(e, t) {
	return t === "@" || t.startsWith("@") && (e.some((e) => t.startsWith(`@${e}`)) || !!t.match(/^@\d/));
}
function ge(e, t) {
	let n = t.match(/^@([^/]+)?\/?(.+)?$/);
	if (!n) return null;
	let [, r, i] = n, a = Number.isNaN(+r) ? r || 0 : +r;
	return e.containerQueries(i).up(a);
}
function _e(e) {
	let t = (e, t) => e.replace("@media", t ? `@container ${t}` : "@container");
	function n(n, r) {
		n.up = (...n) => t(e.breakpoints.up(...n), r), n.down = (...n) => t(e.breakpoints.down(...n), r), n.between = (...n) => t(e.breakpoints.between(...n), r), n.only = (...n) => t(e.breakpoints.only(...n), r), n.not = (...n) => {
			let i = t(e.breakpoints.not(...n), r);
			return i.includes("not all and") ? i.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : i;
		};
	}
	let r = {}, i = (e) => (n(r, e), r);
	return n(i), {
		...e,
		containerQueries: i
	};
}
// node_modules/@mui/system/createBreakpoints/createBreakpoints.mjs
var ve = (e) => {
	let t = Object.keys(e).map((t) => ({
		key: t,
		val: e[t]
	})) || [];
	return t.sort((e, t) => e.val - t.val), t.reduce((e, t) => ({
		...e,
		[t.key]: t.val
	}), {});
};
function ye(e) {
	let { values: t = {
		xs: 0,
		sm: 600,
		md: 900,
		lg: 1200,
		xl: 1536
	}, unit: n = "px", step: r = 5, ...i } = e, a = ve(t), o = Object.keys(a);
	function s(e) {
		return `@media (min-width:${typeof t[e] == "number" ? t[e] : e}${n})`;
	}
	function c(e) {
		return `@media (max-width:${(typeof t[e] == "number" ? t[e] : e) - r / 100}${n})`;
	}
	function l(e, i) {
		let a = o.indexOf(i);
		return `@media (min-width:${typeof t[e] == "number" ? t[e] : e}${n}) and (max-width:${(a !== -1 && typeof t[o[a]] == "number" ? t[o[a]] : i) - r / 100}${n})`;
	}
	function u(e) {
		return o.indexOf(e) + 1 < o.length ? l(e, o[o.indexOf(e) + 1]) : s(e);
	}
	function d(e) {
		let t = o.indexOf(e);
		return t === 0 ? s(o[1]) : t === o.length - 1 ? c(o[t]) : l(e, o[o.indexOf(e) + 1]).replace("@media", "@media not all and");
	}
	let f = [];
	for (let e = 0; e < o.length; e += 1) f.push(s(o[e]));
	return {
		keys: o,
		values: a,
		up: s,
		down: c,
		between: l,
		only: u,
		not: d,
		unit: n,
		internal_mediaKeys: f,
		...i
	};
}
// node_modules/@mui/system/breakpoints/breakpoints.mjs
var be = {}, xe = {
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536
}, j = ye({ values: xe }), Se = { containerQueries: (e) => ({ up: (t) => {
	let n = typeof t == "number" ? t : xe[t] || t;
	return typeof n == "number" && (n = `${n}px`), e ? `@container ${e} (min-width:${n})` : `@container (min-width:${n})`;
} }) };
function M(e, t, n) {
	let r = {};
	return Ce(r, e.theme, t, (e, t, i) => {
		let a = n(t, i);
		e ? r[e] = a : te(r, a);
	});
}
function Ce(e, t, n, r) {
	if (t ??= be, Array.isArray(n)) {
		let i = t.breakpoints ?? j;
		for (let t = 0; t < n.length; t += 1) we(e, i.up(i.keys[t]), n[t], void 0, r);
		return e;
	}
	if (typeof n == "object") {
		let i = t.breakpoints ?? j, a = i.values ?? xe;
		for (let o in n) if (he(i.keys, o)) {
			let i = ge(t.containerQueries ? t : Se, o);
			i && we(e, i, n[o], o, r);
		} else if (o in a) we(e, i.up(o), n[o], o, r);
		else {
			let t = o;
			e[t] = n[t];
		}
		return e;
	}
	return r(void 0, n), e;
}
function we(e, t, n, r, i) {
	e[t] ??= {}, i(t, n, r);
}
function Te(e = j) {
	let { internal_mediaKeys: t } = e, n = {};
	for (let e = 0; e < t.length; e += 1) n[t[e]] = {};
	return n;
}
function Ee(e, t) {
	let n = e.internal_mediaKeys;
	for (let e = 0; e < n.length; e += 1) {
		let r = n[e];
		le(t[r]) && delete t[r];
	}
	return t;
}
function De(e, t) {
	if (Array.isArray(t)) return !0;
	if (typeof t == "object" && t) {
		for (let n = 0; n < e.keys.length; n += 1) if (e.keys[n] in t) return !0;
		let n = Object.keys(t);
		for (let t = 0; t < n.length; t += 1) if (he(e.keys, n[t])) return !0;
	}
	return !1;
}
// node_modules/@mui/system/style/style.mjs
function Oe(e, t, n, r) {
	let i;
	return i = typeof e == "function" ? e(n) : Array.isArray(e) ? e[n] || n : typeof n == "string" && ke(e, n, !0, r) || n, t && (i = t(i, n, e)), i;
}
function ke(e, t, n = !0, r = void 0) {
	if (!e || !t) return null;
	let i = t.split(".");
	if (e.vars && n) {
		let t = Ae(e.vars, i, r);
		if (t != null) return t;
	}
	return Ae(e, i, r);
}
function Ae(e, t, n = void 0) {
	let r, i = e, a = 0;
	for (; a < t.length;) {
		if (i == null) return i;
		r = i, i = i[t[a]], a += 1;
	}
	if (n && i === void 0) {
		let e = t[t.length - 1], i = `${n}${e === "default" ? "" : w(e)}`;
		return r?.[i];
	}
	return i;
}
function N(e) {
	let { prop: t, cssProperty: n = e.prop, themeKey: r, transform: i } = e, a = (e) => {
		if (e[t] == null) return null;
		let a = e[t], o = e.theme, s = ke(o, r) || {};
		return M(e, a, (e) => {
			let r = Oe(s, i, e, t);
			return n === !1 ? r : { [n]: r };
		});
	};
	return a.propTypes = {}, a.filterProps = [t], a;
}
// node_modules/@mui/system/spacing/spacing.mjs
var je = { internal_cache: {} }, Me = {
	m: "margin",
	p: "padding"
}, Ne = {
	t: "Top",
	r: "Right",
	b: "Bottom",
	l: "Left",
	x: ["Left", "Right"],
	y: ["Top", "Bottom"]
}, Pe = {
	marginX: "mx",
	marginY: "my",
	paddingX: "px",
	paddingY: "py"
}, Fe = {};
for (let e in Me) Fe[e] = [Me[e]];
for (let e in Me) for (let t in Ne) {
	let n = Me[e], r = Ne[t], i = Array.isArray(r) ? r.map((e) => n + e) : [n + r];
	Fe[e + t] = i;
}
for (let e in Pe) Fe[e] = Fe[Pe[e]];
var Ie = /* @__PURE__ */ new Set([
	"m",
	"mt",
	"mr",
	"mb",
	"ml",
	"mx",
	"my",
	"margin",
	"marginTop",
	"marginRight",
	"marginBottom",
	"marginLeft",
	"marginX",
	"marginY",
	"marginInline",
	"marginInlineStart",
	"marginInlineEnd",
	"marginBlock",
	"marginBlockStart",
	"marginBlockEnd"
]), Le = /* @__PURE__ */ new Set([
	"p",
	"pt",
	"pr",
	"pb",
	"pl",
	"px",
	"py",
	"padding",
	"paddingTop",
	"paddingRight",
	"paddingBottom",
	"paddingLeft",
	"paddingX",
	"paddingY",
	"paddingInline",
	"paddingInlineStart",
	"paddingInlineEnd",
	"paddingBlock",
	"paddingBlockStart",
	"paddingBlockEnd"
]);
[...Ie, ...Le];
function Re(e, t, n, r) {
	let i = ke(e, t, !0) ?? n;
	return typeof i == "number" || typeof i == "string" ? (e) => typeof e == "string" ? e : typeof i == "string" ? i.startsWith("var(") && e === 0 ? 0 : i.startsWith("var(") && e === 1 ? i : `calc(${e} * ${i})` : i * e : Array.isArray(i) ? (e) => {
		if (typeof e == "string") return e;
		let t = i[Math.abs(e)];
		return e >= 0 ? t : typeof t == "number" ? -t : typeof t == "string" && t.startsWith("var(") ? `calc(-1 * ${t})` : `-${t}`;
	} : typeof i == "function" ? i : () => void 0;
}
function ze(e) {
	return Re(e, "spacing", 8, "spacing");
}
function Be(e, t) {
	return typeof t == "string" || t == null ? t : e(t);
}
var Ve = [""];
function He(e, t) {
	let n = e.theme ?? je, r = n?.internal_cache?.unarySpacing ?? ze(n), i = {};
	for (let n in e) {
		if (!t.has(n)) continue;
		let a = Fe[n] ?? (Ve[0] = n, Ve), o = e[n];
		Ce(i, e.theme, o, (e, t) => {
			let n = e ? i[e] : i;
			for (let e = 0; e < a.length; e += 1) n[a[e]] = Be(r, t);
		});
	}
	return i;
}
function Ue(e) {
	return He(e, Ie);
}
Ue.propTypes = {}, Ue.filterProps = Ie;
var We = Ue;
function Ge(e) {
	return He(e, Le);
}
Ge.propTypes = {}, Ge.filterProps = Le;
var P = Ge;
// node_modules/@mui/system/compose/compose.mjs
function Ke(...e) {
	let t = e.reduce((e, t) => (t.filterProps.forEach((n) => {
		e[n] = t;
	}), e), {}), n = (e) => {
		let n = {};
		for (let r in e) t[r] && te(n, t[r](e));
		return n;
	};
	return n.propTypes = {}, n.filterProps = e.reduce((e, t) => e.concat(t.filterProps), []), n;
}
// node_modules/@mui/system/borders/borders.mjs
function qe(e) {
	return typeof e == "number" ? `${e}px solid` : e;
}
function Je(e, t) {
	return N({
		prop: e,
		themeKey: "borders",
		transform: t
	});
}
var Ye = Je("border", qe), Xe = Je("borderTop", qe), Ze = Je("borderRight", qe), Qe = Je("borderBottom", qe), $e = Je("borderLeft", qe), et = Je("borderColor"), tt = Je("borderTopColor"), nt = Je("borderRightColor"), rt = Je("borderBottomColor"), it = Je("borderLeftColor"), at = Je("outline", qe), ot = Je("outlineColor"), st = (e) => {
	if (e.borderRadius !== void 0 && e.borderRadius !== null) {
		let t = Re(e.theme, "shape.borderRadius", 4, "borderRadius");
		return M(e, e.borderRadius, (e) => ({ borderRadius: Be(t, e) }));
	}
	return null;
};
st.propTypes = {}, st.filterProps = ["borderRadius"], Ke(Ye, Xe, Ze, Qe, $e, et, tt, nt, rt, it, st, at, ot);
// node_modules/@mui/system/cssGrid/cssGrid.mjs
var ct = (e) => {
	if (e.gap !== void 0 && e.gap !== null) {
		let t = Re(e.theme, "spacing", 8, "gap");
		return M(e, e.gap, (e) => ({ gap: Be(t, e) }));
	}
	return null;
};
ct.propTypes = {}, ct.filterProps = ["gap"];
var lt = (e) => {
	if (e.columnGap !== void 0 && e.columnGap !== null) {
		let t = Re(e.theme, "spacing", 8, "columnGap");
		return M(e, e.columnGap, (e) => ({ columnGap: Be(t, e) }));
	}
	return null;
};
lt.propTypes = {}, lt.filterProps = ["columnGap"];
var ut = (e) => {
	if (e.rowGap !== void 0 && e.rowGap !== null) {
		let t = Re(e.theme, "spacing", 8, "rowGap");
		return M(e, e.rowGap, (e) => ({ rowGap: Be(t, e) }));
	}
	return null;
};
ut.propTypes = {}, ut.filterProps = ["rowGap"], Ke(ct, lt, ut, N({ prop: "gridColumn" }), N({ prop: "gridRow" }), N({ prop: "gridAutoFlow" }), N({ prop: "gridAutoColumns" }), N({ prop: "gridAutoRows" }), N({ prop: "gridTemplateColumns" }), N({ prop: "gridTemplateRows" }), N({ prop: "gridTemplateAreas" }), N({ prop: "gridArea" }));
// node_modules/@mui/system/palette/palette.mjs
function dt(e, t) {
	return t === "grey" ? t : e;
}
Ke(N({
	prop: "color",
	themeKey: "palette",
	transform: dt
}), N({
	prop: "bgcolor",
	cssProperty: "backgroundColor",
	themeKey: "palette",
	transform: dt
}), N({
	prop: "backgroundColor",
	themeKey: "palette",
	transform: dt
}));
// node_modules/@mui/system/sizing/sizing.mjs
var ft = xe;
function pt(e) {
	return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
var mt = N({
	prop: "width",
	transform: pt
}), ht = (e) => e.maxWidth !== void 0 && e.maxWidth !== null ? M(e, e.maxWidth, (t) => {
	let n = e.theme?.breakpoints?.values?.[t] || ft[t];
	return n ? e.theme?.breakpoints?.unit === "px" ? { maxWidth: n } : { maxWidth: `${n}${e.theme.breakpoints.unit}` } : { maxWidth: pt(t) };
}) : null;
ht.filterProps = ["maxWidth"];
var gt = N({
	prop: "minWidth",
	transform: pt
}), _t = N({
	prop: "height",
	transform: pt
}), vt = N({
	prop: "maxHeight",
	transform: pt
}), yt = N({
	prop: "minHeight",
	transform: pt
});
N({
	prop: "size",
	cssProperty: "width",
	transform: pt
}), N({
	prop: "size",
	cssProperty: "height",
	transform: pt
}), Ke(mt, ht, gt, _t, vt, yt, N({ prop: "boxSizing" }));
// node_modules/@mui/system/styleFunctionSx/defaultSxConfig.mjs
var bt = {
	border: {
		themeKey: "borders",
		transform: qe
	},
	borderTop: {
		themeKey: "borders",
		transform: qe
	},
	borderRight: {
		themeKey: "borders",
		transform: qe
	},
	borderBottom: {
		themeKey: "borders",
		transform: qe
	},
	borderLeft: {
		themeKey: "borders",
		transform: qe
	},
	borderColor: { themeKey: "palette" },
	borderTopColor: { themeKey: "palette" },
	borderRightColor: { themeKey: "palette" },
	borderBottomColor: { themeKey: "palette" },
	borderLeftColor: { themeKey: "palette" },
	outline: {
		themeKey: "borders",
		transform: qe
	},
	outlineColor: { themeKey: "palette" },
	borderRadius: {
		themeKey: "shape.borderRadius",
		style: st
	},
	color: {
		themeKey: "palette",
		transform: dt
	},
	bgcolor: {
		themeKey: "palette",
		cssProperty: "backgroundColor",
		transform: dt
	},
	backgroundColor: {
		themeKey: "palette",
		transform: dt
	},
	p: { style: P },
	pt: { style: P },
	pr: { style: P },
	pb: { style: P },
	pl: { style: P },
	px: { style: P },
	py: { style: P },
	padding: { style: P },
	paddingTop: { style: P },
	paddingRight: { style: P },
	paddingBottom: { style: P },
	paddingLeft: { style: P },
	paddingX: { style: P },
	paddingY: { style: P },
	paddingInline: { style: P },
	paddingInlineStart: { style: P },
	paddingInlineEnd: { style: P },
	paddingBlock: { style: P },
	paddingBlockStart: { style: P },
	paddingBlockEnd: { style: P },
	m: { style: We },
	mt: { style: We },
	mr: { style: We },
	mb: { style: We },
	ml: { style: We },
	mx: { style: We },
	my: { style: We },
	margin: { style: We },
	marginTop: { style: We },
	marginRight: { style: We },
	marginBottom: { style: We },
	marginLeft: { style: We },
	marginX: { style: We },
	marginY: { style: We },
	marginInline: { style: We },
	marginInlineStart: { style: We },
	marginInlineEnd: { style: We },
	marginBlock: { style: We },
	marginBlockStart: { style: We },
	marginBlockEnd: { style: We },
	displayPrint: {
		cssProperty: !1,
		transform: (e) => ({ "@media print": { display: e } })
	},
	display: {},
	overflow: {},
	textOverflow: {},
	visibility: {},
	whiteSpace: {},
	flexBasis: {},
	flexDirection: {},
	flexWrap: {},
	justifyContent: {},
	alignItems: {},
	alignContent: {},
	order: {},
	flex: {},
	flexGrow: {},
	flexShrink: {},
	alignSelf: {},
	justifyItems: {},
	justifySelf: {},
	gap: { style: ct },
	rowGap: { style: ut },
	columnGap: { style: lt },
	gridColumn: {},
	gridRow: {},
	gridAutoFlow: {},
	gridAutoColumns: {},
	gridAutoRows: {},
	gridTemplateColumns: {},
	gridTemplateRows: {},
	gridTemplateAreas: {},
	gridArea: {},
	position: {},
	zIndex: { themeKey: "zIndex" },
	top: {},
	right: {},
	bottom: {},
	left: {},
	boxShadow: { themeKey: "shadows" },
	width: { transform: pt },
	maxWidth: { style: ht },
	minWidth: { transform: pt },
	height: { transform: pt },
	maxHeight: { transform: pt },
	minHeight: { transform: pt },
	boxSizing: {},
	font: { themeKey: "font" },
	fontFamily: { themeKey: "typography" },
	fontSize: { themeKey: "typography" },
	fontStyle: { themeKey: "typography" },
	fontWeight: { themeKey: "typography" },
	letterSpacing: {},
	textTransform: {},
	lineHeight: {},
	textAlign: {},
	typography: {
		cssProperty: !1,
		themeKey: "typography"
	}
}, xt = {};
function St() {
	function e(t) {
		if (!t.sx) return null;
		let { sx: n, theme: r = xt, nested: i } = t, a = r.unstable_sxConfig ?? bt, o = {
			sx: null,
			theme: r,
			nested: !0
		};
		function s(n) {
			let s = n;
			if (typeof n == "function") s = n(r);
			else if (typeof n != "object") return n;
			if (!s) return null;
			let c = r.breakpoints ?? j, l = Te(c);
			for (let n in s) {
				let i = Tt(s[n], r);
				i != null && (typeof i == "object" ? a[n] ? wt(l, n, i, r, a) : De(c, i) ? Ce(l, t.theme, i, (e, t) => {
					l[e][n] = t;
				}) : (o.sx = i, l[n] = e(o)) : wt(l, n, i, r, a));
			}
			return !i && r.modularCssLayers ? { "@layer sx": pe(r, Ee(c, l)) } : pe(r, Ee(c, l));
		}
		return Array.isArray(n) ? n.map(s) : s(n);
	}
	return e.filterProps = ["sx"], e;
}
var Ct = St();
function wt(e, t, n, r, i) {
	let a = i[t];
	if (!a) {
		e[t] = n;
		return;
	}
	if (n == null) return;
	let { themeKey: o } = a;
	if (o === "typography" && n === "inherit") {
		e[t] = n;
		return;
	}
	let { style: s } = a;
	if (s) {
		te(e, s({
			[t]: n,
			theme: r
		}));
		return;
	}
	let { cssProperty: c = t, transform: l } = a, u = ke(r, o);
	Ce(e, r, n, (n, r) => {
		let i = Oe(u, l, r, t);
		c === !1 ? te(n ? e[n] : e, i) : n ? e[n][c] = i : e[c] = i;
	});
}
function Tt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/@babel/runtime/helpers/esm/extends.js
function Et() {
	return Et = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Et.apply(null, arguments);
}
// node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
function Dt(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function Ot(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var kt = /*#__PURE__*/ function() {
	function e(e) {
		var t = this;
		this._insertTag = function(e) {
			var n = t.tags.length === 0 ? t.insertionPoint ? t.insertionPoint.nextSibling : t.prepend ? t.container.firstChild : t.before : t.tags[t.tags.length - 1].nextSibling;
			t.container.insertBefore(e, n), t.tags.push(e);
		}, this.isSpeedy = e.speedy === void 0 || e.speedy, this.tags = [], this.ctr = 0, this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, this.insertionPoint = e.insertionPoint, this.before = null;
	}
	var t = e.prototype;
	return t.hydrate = function(e) {
		e.forEach(this._insertTag);
	}, t.insert = function(e) {
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(Ot(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = Dt(t);
			try {
				n.insertRule(e, n.cssRules.length);
			} catch {}
		} else t.appendChild(document.createTextNode(e));
		this.ctr++;
	}, t.flush = function() {
		this.tags.forEach(function(e) {
			return e.parentNode?.removeChild(e);
		}), this.tags = [], this.ctr = 0;
	}, e;
}(), At = "-ms-", jt = "-moz-", F = "-webkit-", Mt = "comm", Nt = "rule", Pt = "decl", Ft = "@import", It = "@keyframes", Lt = "@layer", Rt = Math.abs, zt = String.fromCharCode, Bt = Object.assign;
function Vt(e, t) {
	return Gt(e, 0) ^ 45 ? (((t << 2 ^ Gt(e, 0)) << 2 ^ Gt(e, 1)) << 2 ^ Gt(e, 2)) << 2 ^ Gt(e, 3) : 0;
}
function Ht(e) {
	return e.trim();
}
function Ut(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function I(e, t, n) {
	return e.replace(t, n);
}
function Wt(e, t) {
	return e.indexOf(t);
}
function Gt(e, t) {
	return e.charCodeAt(t) | 0;
}
function Kt(e, t, n) {
	return e.slice(t, n);
}
function qt(e) {
	return e.length;
}
function Jt(e) {
	return e.length;
}
function Yt(e, t) {
	return t.push(e), e;
}
function Xt(e, t) {
	return e.map(t).join("");
}
// node_modules/stylis/src/Tokenizer.js
var Zt = 1, Qt = 1, $t = 0, en = 0, L = 0, tn = "";
function nn(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: Zt,
		column: Qt,
		length: o,
		return: ""
	};
}
function rn(e, t) {
	return Bt(nn("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function an() {
	return L;
}
function on() {
	return L = en > 0 ? Gt(tn, --en) : 0, Qt--, L === 10 && (Qt = 1, Zt--), L;
}
function sn() {
	return L = en < $t ? Gt(tn, en++) : 0, Qt++, L === 10 && (Qt = 1, Zt++), L;
}
function cn() {
	return Gt(tn, en);
}
function ln() {
	return en;
}
function un(e, t) {
	return Kt(tn, e, t);
}
function dn(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function fn(e) {
	return Zt = Qt = 1, $t = qt(tn = e), en = 0, [];
}
function pn(e) {
	return tn = "", e;
}
function mn(e) {
	return Ht(un(en - 1, _n(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function hn(e) {
	for (; (L = cn()) && L < 33;) sn();
	return dn(e) > 2 || dn(L) > 3 ? "" : " ";
}
function gn(e, t) {
	for (; --t && sn() && !(L < 48 || L > 102 || L > 57 && L < 65 || L > 70 && L < 97););
	return un(e, ln() + (t < 6 && cn() == 32 && sn() == 32));
}
function _n(e) {
	for (; sn();) switch (L) {
		case e: return en;
		case 34:
		case 39:
			e !== 34 && e !== 39 && _n(L);
			break;
		case 40:
			e === 41 && _n(e);
			break;
		case 92: sn();
	}
	return en;
}
function vn(e, t) {
	for (; sn() && e + L !== 57 && (e + L !== 84 || cn() !== 47););
	return "/*" + un(t, en - 1) + "*" + zt(e === 47 ? e : sn());
}
function yn(e) {
	for (; !dn(cn());) sn();
	return un(e, en);
}
// node_modules/stylis/src/Parser.js
function bn(e) {
	return pn(xn("", null, null, null, [""], e = fn(e), 0, [0], e));
}
function xn(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = sn()) {
		case 40: if (m != 108 && Gt(C, d - 1) == 58) {
			Wt(C += I(mn(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += mn(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += hn(m);
			break;
		case 92:
			C += gn(ln() - 1, 7);
			continue;
		case 47:
			switch (cn()) {
				case 42:
				case 47:
					Yt(Cn(vn(sn(), ln()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = qt(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = I(C, /\f/g, "")), p > 0 && qt(C) - d && Yt(p > 32 ? wn(C + ";", r, n, d - 1) : wn(I(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (Yt(S = Sn(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) {
					if (u === 0) xn(C, t, S, S, b, a, d, s, x);
					else switch (f === 99 && Gt(C, 3) === 110 ? 100 : f) {
						case 100:
						case 108:
						case 109:
						case 115:
							xn(e, S, S, r && Yt(Sn(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
							break;
						default: xn(C, S, S, S, [""], x, 0, s, x);
					}
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + qt(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && on() == 125) continue;
			}
			switch (C += zt(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (qt(C) - 1) * _, _ = 1;
					break;
				case 64:
					cn() === 45 && (C += mn(sn())), f = cn(), u = d = qt(y = C += yn(ln())), v++;
					break;
				case 45: m === 45 && qt(C) == 2 && (h = 0);
			}
	}
	return a;
}
function Sn(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = Jt(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = Kt(e, d + 1, d = Rt(h = o[m])), y = e; _ < p; ++_) (y = Ht(h > 0 ? f[_] + " " + v : I(v, /&\f/g, f[_]))) && (c[g++] = y);
	return nn(e, t, n, i === 0 ? Nt : s, c, l, u);
}
function Cn(e, t, n) {
	return nn(e, t, n, Mt, zt(an()), Kt(e, 2, -2), 0);
}
function wn(e, t, n, r) {
	return nn(e, t, n, Pt, Kt(e, 0, r), Kt(e, r + 1, -1), r);
}
// node_modules/stylis/src/Serializer.js
function Tn(e, t) {
	for (var n = "", r = Jt(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function En(e, t, n, r) {
	switch (e.type) {
		case Lt: if (e.children.length) break;
		case Ft:
		case Pt: return e.return = e.return || e.value;
		case Mt: return "";
		case It: return e.return = e.value + "{" + Tn(e.children, r) + "}";
		case Nt: e.value = e.props.join(",");
	}
	return qt(n = Tn(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
// node_modules/stylis/src/Middleware.js
function Dn(e) {
	var t = Jt(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function On(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
// node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function kn(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
// node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var An = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = cn(), r === 38 && i === 12 && (t[n] = 1), !dn(i);) sn();
	return un(e, en);
}, jn = function(e, t) {
	var n = -1, r = 44;
	do
		switch (dn(r)) {
			case 0:
				r === 38 && cn() === 12 && (t[n] = 1), e[n] += An(en - 1, t, n);
				break;
			case 2:
				e[n] += mn(r);
				break;
			case 4: if (r === 44) {
				e[++n] = cn() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += zt(r);
		}
	while (r = sn());
	return e;
}, Mn = function(e, t) {
	return pn(jn(fn(e), t));
}, Nn = /* #__PURE__ */ new WeakMap(), Pn = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if ((e.props.length !== 1 || t.charCodeAt(0) === 58 || Nn.get(n)) && !r) {
			Nn.set(e, !0);
			for (var i = [], a = Mn(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Fn = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function In(e, t) {
	switch (Vt(e, t)) {
		case 5103: return F + "print-" + e + e;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return F + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return F + e + jt + e + At + e + e;
		case 6828:
		case 4268: return F + e + At + e + e;
		case 6165: return F + e + At + "flex-" + e + e;
		case 5187: return F + e + I(e, /(\w+).+(:[^]+)/, F + "box-$1$2" + At + "flex-$1$2") + e;
		case 5443: return F + e + At + "flex-item-" + I(e, /flex-|-self/, "") + e;
		case 4675: return F + e + At + "flex-line-pack" + I(e, /align-content|flex-|-self/, "") + e;
		case 5548: return F + e + At + I(e, "shrink", "negative") + e;
		case 5292: return F + e + At + I(e, "basis", "preferred-size") + e;
		case 6060: return F + "box-" + I(e, "-grow", "") + F + e + At + I(e, "grow", "positive") + e;
		case 4554: return F + I(e, /([^-])(transform)/g, "$1" + F + "$2") + e;
		case 6187: return I(I(I(e, /(zoom-|grab)/, F + "$1"), /(image-set)/, F + "$1"), e, "") + e;
		case 5495:
		case 3959: return I(e, /(image-set\([^]*)/, F + "$1$`$1");
		case 4968: return I(I(e, /(.+:)(flex-)?(.*)/, F + "box-pack:$3" + At + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + F + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return I(e, /(.+)-inline(.+)/, F + "$1$2") + e;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (qt(e) - 1 - t > 6) switch (Gt(e, t + 1)) {
				case 109: if (Gt(e, t + 4) !== 45) break;
				case 102: return I(e, /(.+:)(.+)-([^]+)/, "$1" + F + "$2-$3$1" + jt + (Gt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~Wt(e, "stretch") ? In(I(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (Gt(e, t + 1) !== 115) break;
		case 6444:
			switch (Gt(e, qt(e) - 3 - (~Wt(e, "!important") && 10))) {
				case 107: return I(e, ":", ":" + F) + e;
				case 101: return I(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + F + (Gt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + F + "$2$3$1" + At + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (Gt(e, t + 11)) {
				case 114: return F + e + At + I(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return F + e + At + I(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return F + e + At + I(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return F + e + At + e + e;
	}
	return e;
}
var Ln = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case Pt:
			e.return = In(e.value, e.length);
			break;
		case It: return Tn([rn(e, { value: I(e.value, "@", "@" + F) })], r);
		case Nt: if (e.length) return Xt(e.props, function(t) {
			switch (Ut(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Tn([rn(e, { props: [I(t, /:(read-\w+)/, ":" + jt + "$1")] })], r);
				case "::placeholder": return Tn([
					rn(e, { props: [I(t, /:(plac\w+)/, ":" + F + "input-$1")] }),
					rn(e, { props: [I(t, /:(plac\w+)/, ":" + jt + "$1")] }),
					rn(e, { props: [I(t, /:(plac\w+)/, At + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Rn = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || Ln, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [Pn, Fn], l, u = [En, On(function(e) {
		l.insert(e);
	})], d = Dn(c.concat(r, u)), f = function(e) {
		return Tn(bn(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new kt({
			key: t,
			container: a,
			nonce: e.nonce,
			speedy: e.speedy,
			prepend: e.prepend,
			insertionPoint: e.insertionPoint
		}),
		nonce: e.nonce,
		inserted: i,
		registered: {},
		insert: s
	};
	return p.sheet.hydrate(o), p;
}, zn = /* @__PURE__ */ o(((e) => {
	var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
	function b(e) {
		if (typeof e == "object" && e) {
			var t = e.$$typeof;
			switch (t) {
				case n: switch (e = e.type, e) {
					case l:
					case u:
					case i:
					case o:
					case a:
					case f: return e;
					default: switch (e &&= e.$$typeof, e) {
						case c:
						case d:
						case h:
						case m:
						case s: return e;
						default: return t;
					}
				}
				case r: return t;
			}
		}
	}
	function x(e) {
		return b(e) === u;
	}
	e.AsyncMode = l, e.ConcurrentMode = u, e.ContextConsumer = c, e.ContextProvider = s, e.Element = n, e.ForwardRef = d, e.Fragment = i, e.Lazy = h, e.Memo = m, e.Portal = r, e.Profiler = o, e.StrictMode = a, e.Suspense = f, e.isAsyncMode = function(e) {
		return x(e) || b(e) === l;
	}, e.isConcurrentMode = x, e.isContextConsumer = function(e) {
		return b(e) === c;
	}, e.isContextProvider = function(e) {
		return b(e) === s;
	}, e.isElement = function(e) {
		return typeof e == "object" && !!e && e.$$typeof === n;
	}, e.isForwardRef = function(e) {
		return b(e) === d;
	}, e.isFragment = function(e) {
		return b(e) === i;
	}, e.isLazy = function(e) {
		return b(e) === h;
	}, e.isMemo = function(e) {
		return b(e) === m;
	}, e.isPortal = function(e) {
		return b(e) === r;
	}, e.isProfiler = function(e) {
		return b(e) === o;
	}, e.isStrictMode = function(e) {
		return b(e) === a;
	}, e.isSuspense = function(e) {
		return b(e) === f;
	}, e.isValidElementType = function(e) {
		return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
	}, e.typeOf = b;
})), Bn = /* @__PURE__ */ o(((e, t) => {
	t.exports = zn();
})), Vn = /* @__PURE__ */ o(((e, t) => {
	var n = Bn(), r = {
		childContextTypes: !0,
		contextType: !0,
		contextTypes: !0,
		defaultProps: !0,
		displayName: !0,
		getDefaultProps: !0,
		getDerivedStateFromError: !0,
		getDerivedStateFromProps: !0,
		mixins: !0,
		propTypes: !0,
		type: !0
	}, i = {
		name: !0,
		length: !0,
		prototype: !0,
		caller: !0,
		callee: !0,
		arguments: !0,
		arity: !0
	}, a = {
		$$typeof: !0,
		render: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0
	}, o = {
		$$typeof: !0,
		compare: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0,
		type: !0
	}, s = {};
	s[n.ForwardRef] = a, s[n.Memo] = o;
	function c(e) {
		return n.isMemo(e) ? o : s[e.$$typeof] || r;
	}
	var l = Object.defineProperty, u = Object.getOwnPropertyNames, d = Object.getOwnPropertySymbols, f = Object.getOwnPropertyDescriptor, p = Object.getPrototypeOf, m = Object.prototype;
	function h(e, t, n) {
		if (typeof t != "string") {
			if (m) {
				var r = p(t);
				r && r !== m && h(e, r, n);
			}
			var a = u(t);
			d && (a = a.concat(d(t)));
			for (var o = c(e), s = c(t), g = 0; g < a.length; ++g) {
				var _ = a[g];
				if (!i[_] && !(n && n[_]) && !(s && s[_]) && !(o && o[_])) {
					var v = f(t, _);
					try {
						l(e, _, v);
					} catch {}
				}
			}
		}
		return e;
	}
	t.exports = h;
}));
// node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function Hn(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var Un = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, Wn = function(e, t, n) {
	Un(e, t, n);
	var r = e.key + "-" + t.name;
	if (e.inserted[t.name] === void 0) {
		var i = t;
		do
			e.insert(t === i ? "." + r : "", i, e.sheet, !0), i = i.next;
		while (i !== void 0);
	}
};
// node_modules/@emotion/hash/dist/emotion-hash.esm.js
function Gn(e) {
	for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	switch (i) {
		case 3: t ^= (e.charCodeAt(r + 2) & 255) << 16;
		case 2: t ^= (e.charCodeAt(r + 1) & 255) << 8;
		case 1: t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	}
	return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
// node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var Kn = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
}, qn = /[A-Z]|^ms/g, Jn = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Yn = function(e) {
	return e.charCodeAt(1) === 45;
}, Xn = function(e) {
	return e != null && typeof e != "boolean";
}, Zn = /* #__PURE__ */ kn(function(e) {
	return Yn(e) ? e : e.replace(qn, "-$&").toLowerCase();
}), Qn = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(Jn, function(e, t, n) {
			return nr = {
				name: t,
				styles: n,
				next: nr
			}, t;
		});
	}
	return Kn[e] !== 1 && !Yn(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function $n(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return nr = {
				name: i.name,
				styles: i.styles,
				next: nr
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) nr = {
					name: o.name,
					styles: o.styles,
					next: nr
				}, o = o.next;
				return a.styles + ";";
			}
			return er(e, t, n);
		case "function": if (e !== void 0) {
			var s = nr, c = n(e);
			return nr = s, $n(e, t, c);
		}
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function er(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += $n(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : Xn(s) && (r += Zn(a) + ":" + Qn(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) Xn(o[c]) && (r += Zn(a) + ":" + Qn(a, o[c]) + ";");
		else {
			var l = $n(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += Zn(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var tr = /label:\s*([^\s;{]+)\s*(;|$)/g, nr;
function rr(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	nr = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += $n(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += $n(n, t, e[o]), r && (i += a[o]);
	tr.lastIndex = 0;
	for (var s = "", c; (c = tr.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: Gn(i) + s,
		styles: i,
		next: nr
	};
}
// node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var ir = function(e) {
	return e();
}, ar = O.useInsertionEffect ? O.useInsertionEffect : !1, or = ar || ir, sr = ar || O.useLayoutEffect, cr = /* #__PURE__ */ O.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Rn({ key: "css" }) : null);
cr.Provider;
var lr = function(e) {
	return /*#__PURE__*/ (0, O.forwardRef)(function(t, n) {
		return e(t, (0, O.useContext)(cr), n);
	});
}, ur = /* #__PURE__ */ O.createContext({}), dr = {}.hasOwnProperty, fr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", pr = function(e, t) {
	var n = {};
	for (var r in t) dr.call(t, r) && (n[r] = t[r]);
	return n[fr] = e, n;
}, mr = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Un(t, n, r), or(function() {
		return Wn(t, n, r);
	}), null;
}, hr = /* @__PURE__ */ lr(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[fr], a = [r], o = "";
	typeof e.className == "string" ? o = Hn(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = rr(a, void 0, O.useContext(ur));
	o += t.key + "-" + s.name;
	var c = {};
	for (var l in e) dr.call(e, l) && l !== "css" && l !== fr && (c[l] = e[l]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ O.createElement(O.Fragment, null, /*#__PURE__*/ O.createElement(mr, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ O.createElement(i, c));
});
Vn();
var gr = function(e, t) {
	var n = arguments;
	if (t == null || !dr.call(t, "css")) return O.createElement.apply(void 0, n);
	var r = n.length, i = Array(r);
	i[0] = hr, i[1] = pr(e, t);
	for (var a = 2; a < r; a++) i[a] = n[a];
	return O.createElement.apply(null, i);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(gr ||= {});
var _r = /* #__PURE__ */ lr(function(e, t) {
	var n = e.styles, r = rr([n], void 0, O.useContext(ur)), i = O.useRef();
	return sr(function() {
		var e = t.key + "-global", n = new t.sheet.constructor({
			key: e,
			nonce: t.sheet.nonce,
			container: t.sheet.container,
			speedy: t.sheet.isSpeedy
		}), a = !1, o = document.querySelector("style[data-emotion=\"" + e + " " + r.name + "\"]");
		return t.sheet.tags.length && (n.before = t.sheet.tags[0]), o !== null && (a = !0, o.setAttribute("data-emotion", e), n.hydrate([o])), i.current = [n, a], function() {
			n.flush();
		};
	}, [t]), sr(function() {
		var e = i.current, n = e[0];
		e[1] ? e[1] = !1 : (r.next !== void 0 && Wn(t, r.next, !0), n.tags.length && (n.before = n.tags[n.tags.length - 1].nextElementSibling, n.flush()), t.insert("", r, n, !1));
	}, [t, r.name]), null;
});
function vr() {
	return rr([...arguments]);
}
function yr() {
	var e = vr.apply(void 0, arguments), t = "animation-" + e.name;
	return {
		name: t,
		styles: "@keyframes " + t + "{" + e.styles + "}",
		anim: 1,
		toString: function() {
			return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
		}
	};
}
// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var br = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, xr = /* @__PURE__ */ kn(function(e) {
	return br.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
}), Sr = function(e) {
	return e !== "theme";
}, Cr = function(e) {
	return typeof e == "string" && e.charCodeAt(0) > 96 ? xr : Sr;
}, wr = function(e, t, n) {
	var r;
	if (t) {
		var i = t.shouldForwardProp;
		r = e.__emotion_forwardProp && i ? function(t) {
			return e.__emotion_forwardProp(t) && i(t);
		} : i;
	}
	return typeof r != "function" && n && (r = e.__emotion_forwardProp), r;
}, Tr = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Un(t, n, r), or(function() {
		return Wn(t, n, r);
	}), null;
}, Er = function e(t, n) {
	var r = t.__emotion_real === t, i = r && t.__emotion_base || t, a, o;
	n !== void 0 && (a = n.label, o = n.target);
	var s = wr(t, n, r), c = s || Cr(i), l = !c("as");
	return function() {
		var u = arguments, d = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
		if (a !== void 0 && d.push("label:" + a + ";"), u[0] == null || u[0].raw === void 0) d.push.apply(d, u);
		else {
			var f = u[0];
			d.push(f[0]);
			for (var p = u.length, m = 1; m < p; m++) d.push(u[m], f[m]);
		}
		var h = lr(function(e, t, n) {
			var r = l && e.as || i, a = "", u = [], f = e;
			if (e.theme == null) {
				for (var p in f = {}, e) f[p] = e[p];
				f.theme = O.useContext(ur);
			}
			typeof e.className == "string" ? a = Hn(t.registered, u, e.className) : e.className != null && (a = e.className + " ");
			var m = rr(d.concat(u), t.registered, f);
			a += t.key + "-" + m.name, o !== void 0 && (a += " " + o);
			var h = l && s === void 0 ? Cr(r) : c, g = {};
			for (var _ in e) l && _ === "as" || h(_) && (g[_] = e[_]);
			return g.className = a, n && (g.ref = n), /*#__PURE__*/ O.createElement(O.Fragment, null, /*#__PURE__*/ O.createElement(Tr, {
				cache: t,
				serialized: m,
				isStringTag: typeof r == "string"
			}), /*#__PURE__*/ O.createElement(r, g));
		});
		return h.displayName = a === void 0 ? "Styled(" + (typeof i == "string" ? i : i.displayName || i.name || "Component") + ")" : a, h.defaultProps = t.defaultProps, h.__emotion_real = h, h.__emotion_base = i, h.__emotion_styles = d, h.__emotion_forwardProp = s, Object.defineProperty(h, "toString", { value: function() {
			return "." + o;
		} }), h.withComponent = function(t, r) {
			return e(t, Et({}, n, r, { shouldForwardProp: wr(h, r, !0) })).apply(void 0, d);
		}, h;
	};
}, Dr = /* @__PURE__ */ "a.abbr.address.area.article.aside.audio.b.base.bdi.bdo.big.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.keygen.label.legend.li.link.main.map.mark.marquee.menu.menuitem.meta.meter.nav.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rp.rt.ruby.s.samp.script.section.select.small.source.span.strong.style.sub.summary.sup.table.tbody.td.textarea.tfoot.th.thead.time.title.tr.track.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.foreignObject.g.image.line.linearGradient.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.text.tspan".split("."), Or = Er.bind(null);
Dr.forEach(function(e) {
	Or[e] = Or(e);
});
// node_modules/react/cjs/react-jsx-runtime.production.js
var kr = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n, e.jsxs = n;
})), R = (/* @__PURE__ */ o(((e, t) => {
	t.exports = kr();
})))();
function Ar(e) {
	return e == null || Object.keys(e).length === 0;
}
function jr(e) {
	let { styles: t, defaultTheme: n = {} } = e;
	return /*#__PURE__*/ (0, R.jsx)(_r, { styles: typeof t == "function" ? (e) => t(Ar(e) ? n : e) : t });
}
// node_modules/@mui/styled-engine/index.mjs
function Mr(e, t) {
	return Or(e, t);
}
function Nr(e, t) {
	Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
var Pr = [];
function Fr(e) {
	return Pr[0] = e, rr(Pr);
}
// node_modules/@mui/system/createTheme/shape.mjs
var Ir = { borderRadius: 4 };
// node_modules/@mui/system/createTheme/createSpacing.mjs
function Lr(e = 8, t = ze({ spacing: e })) {
	if (e.mui) return e;
	let n = (...e) => (e.length === 0 ? [1] : e).map((e) => {
		let n = t(e);
		return typeof n == "number" ? `${n}px` : n;
	}).join(" ");
	return n.mui = !0, n;
}
// node_modules/@mui/system/createTheme/applyStyles.mjs
function Rr(e, t) {
	let n = this;
	if (n.vars) {
		if (!n.colorSchemes?.[e] || typeof n.getColorSchemeSelector != "function") return {};
		let r = n.getColorSchemeSelector(e);
		return r === "&" ? t : ((r.includes("data-") || r.includes(".")) && (r = `*:where(${r.replace(/\s*&$/, "")}) &`), { [r]: t });
	}
	return n.palette.mode === e ? t : {};
}
// node_modules/@mui/system/createTheme/createTheme.mjs
function zr(e = {}, ...t) {
	let { breakpoints: n = {}, palette: r = {}, spacing: i, shape: a = {}, ...o } = e, s = ye(n), c = Lr(i), l = k({
		breakpoints: s,
		direction: "ltr",
		components: {},
		palette: {
			mode: "light",
			...r
		},
		spacing: c,
		shape: {
			...Ir,
			...a
		}
	}, o);
	return l = _e(l), l.applyStyles = Rr, l = t.reduce((e, t) => k(e, t), l), l.unstable_sxConfig = {
		...bt,
		...o?.unstable_sxConfig
	}, l.unstable_sx = function(e) {
		return Ct({
			sx: e,
			theme: this
		});
	}, l.internal_cache = {}, l;
}
// node_modules/@mui/system/useThemeWithoutDefault/useThemeWithoutDefault.mjs
function Br(e) {
	return Object.keys(e).length === 0;
}
function Vr(e = null) {
	let t = O.useContext(ur);
	return !t || Br(t) ? e : t;
}
// node_modules/@mui/system/useTheme/useTheme.mjs
var Hr = zr();
function Ur(e = Hr) {
	return Vr(e);
}
// node_modules/@mui/system/GlobalStyles/GlobalStyles.mjs
function Wr(e) {
	let t = Fr(e);
	return e !== t && t.styles ? (t.styles.match(/^@layer\s+[^{]*$/) || (t.styles = `@layer global{${t.styles}}`), t) : e;
}
function Gr({ styles: e, themeId: t, defaultTheme: n = {} }) {
	let r = Ur(n), i = t && r[t] || r, a = typeof e == "function" ? e(i) : e;
	return i.modularCssLayers && (a = Array.isArray(a) ? a.map((e) => Wr(typeof e == "function" ? e(i) : e)) : Wr(a)), /*#__PURE__*/ (0, R.jsx)(jr, { styles: a });
}
// node_modules/@mui/utils/generateUtilityClass/generateUtilityClass.mjs
var Kr = {
	active: "active",
	checked: "checked",
	completed: "completed",
	disabled: "disabled",
	error: "error",
	expanded: "expanded",
	focused: "focused",
	focusVisible: "focusVisible",
	open: "open",
	readOnly: "readOnly",
	required: "required",
	selected: "selected"
};
function qr(e, t, n = "Mui") {
	let r = Kr[t];
	return r ? `${n}-${r}` : `${S.generate(e)}-${t}`;
}
// node_modules/@mui/utils/generateUtilityClasses/generateUtilityClasses.mjs
function Jr(e, t, n = "Mui") {
	let r = {};
	return t.forEach((t) => {
		r[t] = qr(e, t, n);
	}), r;
}
// node_modules/@mui/system/preprocessStyles.mjs
function Yr(e) {
	let { variants: t, ...n } = e, r = {
		variants: t,
		style: Fr(n),
		isProcessed: !0
	};
	return r.style === n || t && t.forEach((e) => {
		typeof e.style != "function" && (e.style = Fr(e.style));
	}), r;
}
// node_modules/@mui/system/createStyled/createStyled.mjs
var Xr = zr();
function Zr(e) {
	return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function Qr(e, t) {
	return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function $r(e) {
	return e ? (t, n) => n[e] : null;
}
function ei(e, t, n) {
	e.theme = le(e.theme) ? n : e.theme[t] || e.theme;
}
function ti(e, t, n) {
	let r = typeof t == "function" ? t(e) : t;
	if (Array.isArray(r)) return r.flatMap((t) => ti(e, t, n));
	if (Array.isArray(r?.variants)) {
		let t;
		if (r.isProcessed) t = n ? Qr(r.style, n) : r.style;
		else {
			let { variants: e, ...i } = r;
			t = n ? Qr(Fr(i), n) : i;
		}
		return ni(e, r.variants, [t], n);
	}
	return r?.isProcessed ? n ? Qr(Fr(r.style), n) : r.style : n ? Qr(Fr(r), n) : r;
}
function ni(e, t, n = [], r = void 0) {
	let i;
	variantLoop: for (let a = 0; a < t.length; a += 1) {
		let o = t[a];
		if (typeof o.props == "function") {
			if (i ??= {
				...e,
				...e.ownerState,
				ownerState: e.ownerState
			}, !o.props(i)) continue;
		} else for (let t in o.props) if (e[t] !== o.props[t] && e.ownerState?.[t] !== o.props[t]) continue variantLoop;
		typeof o.style == "function" ? (i ??= {
			...e,
			...e.ownerState,
			ownerState: e.ownerState
		}, n.push(r ? Qr(Fr(o.style(i)), r) : o.style(i))) : n.push(r ? Qr(Fr(o.style), r) : o.style);
	}
	return n;
}
function ri(e = {}) {
	let { themeId: t, defaultTheme: n = Xr, rootShouldForwardProp: r = Zr, slotShouldForwardProp: i = Zr } = e;
	function a(e) {
		ei(e, t, n);
	}
	return (e, t = {}) => {
		Nr(e, (e) => e.filter((e) => e !== Ct));
		let { name: n, slot: o, skipVariantsResolver: s, skipSx: c, overridesResolver: l = $r(ai(o)), ...u } = t, d = n && n.startsWith("Mui") || o ? "components" : "custom", f = s === void 0 ? o && o !== "Root" && o !== "root" || !1 : s, p = c || !1, m = Zr;
		o === "Root" || o === "root" ? m = r : o ? m = i : ii(e) && (m = void 0);
		let h = Mr(e, {
			shouldForwardProp: m,
			label: void 0,
			...u
		}), g = (e) => {
			if (e.__emotion_real === e) return e;
			if (typeof e == "function") return function(t) {
				return ti(t, e, t.theme.modularCssLayers ? d : void 0);
			};
			if (de(e)) {
				let t = Yr(e);
				return function(e) {
					return t.variants ? ti(e, t, e.theme.modularCssLayers ? d : void 0) : e.theme.modularCssLayers ? Qr(t.style, d) : t.style;
				};
			}
			return e;
		}, _ = (...t) => {
			let r = [], i = t.map(g), o = [];
			if (r.push(a), n && l && o.push(function(e) {
				let t = e.theme.components?.[n]?.styleOverrides;
				if (!t) return null;
				let r = {};
				for (let n in t) r[n] = ti(e, t[n], e.theme.modularCssLayers ? "theme" : void 0);
				return l(e, r);
			}), n && !f && o.push(function(e) {
				let t = e.theme?.components?.[n]?.variants;
				return t ? ni(e, t, [], e.theme.modularCssLayers ? "theme" : void 0) : null;
			}), p || o.push(Ct), Array.isArray(i[0])) {
				let e = i.shift(), t = Array(r.length).fill(""), n = Array(o.length).fill(""), a;
				a = [
					...t,
					...e,
					...n
				], a.raw = [
					...t,
					...e.raw,
					...n
				], r.unshift(a);
			}
			let s = [
				...r,
				...i,
				...o
			], c = h(...s);
			return e.muiName && (c.muiName = e.muiName), c;
		};
		return h.withConfig && (_.withConfig = h.withConfig), _;
	};
}
function ii(e) {
	return typeof e == "string" && e.charCodeAt(0) > 96;
}
function ai(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
// node_modules/@mui/utils/useEnhancedEffect/useEnhancedEffect.mjs
var oi = typeof window < "u" ? O.useLayoutEffect : O.useEffect;
// node_modules/@mui/utils/clamp/clamp.mjs
function si(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
// node_modules/@mui/system/colorManipulator/colorManipulator.mjs
function ci(e, t = 0, n = 1) {
	return si(e, t, n);
}
function li(e) {
	e = e.slice(1);
	let t = RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g"), n = e.match(t);
	return n && n[0].length === 1 && (n = n.map((e) => e + e)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((e, t) => t < 3 ? parseInt(e, 16) : Math.round(parseInt(e, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function ui(e) {
	if (e.type) return e;
	if (e.charAt(0) === "#") return ui(li(e));
	let t = e.indexOf("("), n = e.substring(0, t);
	if (![
		"rgb",
		"rgba",
		"hsl",
		"hsla",
		"color"
	].includes(n)) throw Error(C(9, e));
	let r = e.substring(t + 1, e.length - 1), i;
	if (n === "color") {
		if (r = r.split(" "), i = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ![
			"srgb",
			"display-p3",
			"a98-rgb",
			"prophoto-rgb",
			"rec-2020"
		].includes(i)) throw Error(C(10, i));
	} else r = r.split(",");
	return r = r.map((e) => parseFloat(e)), {
		type: n,
		values: r,
		colorSpace: i
	};
}
var di = (e) => {
	let t = ui(e);
	return t.values.slice(0, 3).map((e, n) => t.type.includes("hsl") && n !== 0 ? `${e}%` : e).join(" ");
}, fi = (e, t) => {
	try {
		return di(e);
	} catch {
		return e;
	}
};
function pi(e) {
	let { type: t, colorSpace: n } = e, { values: r } = e;
	return t.includes("rgb") ? r = r.map((e, t) => t < 3 ? parseInt(e, 10) : e) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), r = t.includes("color") ? `${n} ${r.join(" ")}` : `${r.join(", ")}`, `${t}(${r})`;
}
function mi(e) {
	e = ui(e);
	let { values: t } = e, n = t[0], r = t[1] / 100, i = t[2] / 100, a = r * Math.min(i, 1 - i), o = (e, t = (e + n / 30) % 12) => i - a * Math.max(Math.min(t - 3, 9 - t, 1), -1), s = "rgb", c = [
		Math.round(o(0) * 255),
		Math.round(o(8) * 255),
		Math.round(o(4) * 255)
	];
	return e.type === "hsla" && (s += "a", c.push(t[3])), pi({
		type: s,
		values: c
	});
}
function hi(e) {
	e = ui(e);
	let t = e.type === "hsl" || e.type === "hsla" ? ui(mi(e)).values : e.values;
	return t = t.map((t) => (e.type !== "color" && (t /= 255), t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4)), Number((.2126 * t[0] + .7152 * t[1] + .0722 * t[2]).toFixed(3));
}
function gi(e, t) {
	let n = hi(e), r = hi(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function _i(e, t) {
	return e = ui(e), t = ci(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, pi(e);
}
function vi(e, t, n) {
	try {
		return _i(e, t);
	} catch {
		return e;
	}
}
function yi(e, t) {
	if (e = ui(e), t = ci(t), e.type.includes("hsl")) e.values[2] *= 1 - t;
	else if (e.type.includes("rgb") || e.type.includes("color")) for (let n = 0; n < 3; n += 1) e.values[n] *= 1 - t;
	return pi(e);
}
function z(e, t, n) {
	try {
		return yi(e, t);
	} catch {
		return e;
	}
}
function bi(e, t) {
	if (e = ui(e), t = ci(t), e.type.includes("hsl")) e.values[2] += (100 - e.values[2]) * t;
	else if (e.type.includes("rgb")) for (let n = 0; n < 3; n += 1) e.values[n] += (255 - e.values[n]) * t;
	else if (e.type.includes("color")) for (let n = 0; n < 3; n += 1) e.values[n] += (1 - e.values[n]) * t;
	return pi(e);
}
function B(e, t, n) {
	try {
		return bi(e, t);
	} catch {
		return e;
	}
}
function xi(e, t = .15) {
	return hi(e) > .5 ? yi(e, t) : bi(e, t);
}
function Si(e, t, n) {
	try {
		return xi(e, t);
	} catch {
		return e;
	}
}
// node_modules/@mui/private-theming/useTheme/ThemeContext.mjs
var Ci = /*#__PURE__*/ O.createContext(null);
// node_modules/@mui/private-theming/useTheme/useTheme.mjs
function wi() {
	return O.useContext(Ci);
}
var Ti = typeof Symbol == "function" && Symbol.for ? Symbol.for("mui.nested") : "__THEME_NESTED__";
// node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.mjs
function Ei(e, t) {
	return typeof t == "function" ? t(e) : {
		...e,
		...t
	};
}
function Di(e) {
	let { children: t, theme: n } = e, r = wi(), i = O.useMemo(() => {
		let e = r === null ? { ...n } : Ei(r, n);
		return e != null && (e[Ti] = r !== null), e;
	}, [n, r]);
	return /*#__PURE__*/ (0, R.jsx)(Ci.Provider, {
		value: i,
		children: t
	});
}
// node_modules/@mui/system/RtlProvider/index.mjs
var Oi = /*#__PURE__*/ O.createContext(void 0);
function ki({ value: e, ...t }) {
	return /*#__PURE__*/ (0, R.jsx)(Oi.Provider, {
		value: e ?? !0,
		...t
	});
}
// node_modules/@mui/system/DefaultPropsProvider/DefaultPropsProvider.mjs
var Ai = /*#__PURE__*/ O.createContext(void 0);
function ji({ value: e, children: t }) {
	return /*#__PURE__*/ (0, R.jsx)(Ai.Provider, {
		value: e,
		children: t
	});
}
function Mi(e) {
	let { theme: t, name: n, props: r } = e;
	if (!t || !t.components || !t.components[n]) return r;
	let i = t.components[n];
	return i.defaultProps ? y(i.defaultProps, r, t.components.mergeClassNameAndStyle) : !i.styleOverrides && !i.variants ? y(i, r, t.components.mergeClassNameAndStyle) : r;
}
function V({ props: e, name: t }) {
	return Mi({
		props: e,
		name: t,
		theme: { components: O.useContext(Ai) }
	});
}
// node_modules/@mui/utils/useId/useId.mjs
var Ni = 0;
function Pi(e) {
	let [t, n] = O.useState(e), r = e || t;
	return O.useEffect(() => {
		t ?? (Ni += 1, n(`mui-${Ni}`));
	}, [t]), r;
}
var Fi = { ...O }.useId;
function Ii(e) {
	if (Fi !== void 0) {
		let t = Fi();
		return e ?? t;
	}
	return Pi(e);
}
// node_modules/@mui/system/ThemeProvider/useLayerOrder.mjs
function Li(e) {
	let t = Vr(), n = Ii() || "", { modularCssLayers: r } = e, i = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
	return i = !r || t !== null ? "" : typeof r == "string" ? r.replace(/mui(?!\.)/g, i) : `@layer ${i};`, oi(() => {
		let e = document.querySelector("head");
		if (!e) return;
		let t = e.firstChild;
		if (i) {
			if (t && t.hasAttribute?.("data-mui-layer-order") && t.getAttribute("data-mui-layer-order") === n) return;
			let r = document.createElement("style");
			r.setAttribute("data-mui-layer-order", n), r.textContent = i, e.prepend(r);
		} else e.querySelector(`style[data-mui-layer-order="${n}"]`)?.remove();
	}, [i, n]), i ? /*#__PURE__*/ (0, R.jsx)(Gr, { styles: i }) : null;
}
// node_modules/@mui/system/ThemeProvider/ThemeProvider.mjs
var Ri = {};
function zi(e, t, n, r = !1) {
	return O.useMemo(() => {
		let i = e && t[e] || t;
		if (typeof n == "function") {
			let a = n(i), o = e ? {
				...t,
				[e]: a
			} : a;
			return r ? () => o : o;
		}
		return e ? {
			...t,
			[e]: n
		} : {
			...t,
			...n
		};
	}, [
		e,
		t,
		n,
		r
	]);
}
function Bi(e) {
	let { children: t, theme: n, themeId: r } = e, i = Vr(Ri), a = wi() || Ri, o = zi(r, i, n), s = zi(r, a, n, !0), c = (r ? o[r] : o).direction === "rtl", l = Li(o);
	return /*#__PURE__*/ (0, R.jsx)(Di, {
		theme: s,
		children: /*#__PURE__*/ (0, R.jsx)(ur.Provider, {
			value: o,
			children: /*#__PURE__*/ (0, R.jsx)(ki, {
				value: c,
				children: /*#__PURE__*/ (0, R.jsxs)(ji, {
					value: r ? o[r].components : o.components,
					children: [l, t]
				})
			})
		})
	});
}
// node_modules/@mui/system/memoTheme.mjs
var Vi = { theme: void 0 };
function Hi(e) {
	let t, n;
	return function(r) {
		let i = t;
		return (i === void 0 || r.theme !== n) && (Vi.theme = r.theme, i = Yr(e(Vi)), t = i, n = r.theme), i;
	};
}
// node_modules/@mui/system/InitColorSchemeScript/InitColorSchemeScript.mjs
var Ui = "mode", Wi = "color-scheme", Gi = "data-color-scheme";
({ ...O }).useSyncExternalStore;
function Ki(e) {
	return JSON.stringify(e).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
function qi(e, t) {
	let n = e.split("%s"), r = [];
	for (let e = 0; e < n.length; e += 1) e > 0 && r.push(t), n[e] && r.push(Ki(n[e]));
	return r.join(" + ") || "\"\"";
}
function Ji(e) {
	let { defaultMode: t = "system", defaultLightColorScheme: n = "light", defaultDarkColorScheme: r = "dark", modeStorageKey: i = Ui, colorSchemeStorageKey: a = Wi, attribute: o = Gi, colorSchemeNode: s = "document.documentElement", nonce: c } = e || {}, l = "", u = o;
	if (o === "class" && (u = ".%s"), o === "data" && (u = "[data-%s]"), u.startsWith(".")) {
		let e = u.substring(1);
		l += `${s}.classList.remove(${qi(e, "light")}, ${qi(e, "dark")});
      ${s}.classList.add(${qi(e, "colorScheme")});`;
	}
	let d = u.match(/\[([^[\]]+)\]/);
	if (d) {
		let e = d[1].indexOf("="), t = e === -1 ? d[1] : d[1].slice(0, e), n = e === -1 ? void 0 : d[1].slice(e + 1);
		n || (l += `${s}.removeAttribute(${qi(t, "light")});
      ${s}.removeAttribute(${qi(t, "dark")});`);
		let r = n ? qi(n.replace(/^(['"])(.*)\1$/, "$2"), "colorScheme") : "\"\"";
		l += `
      ${s}.setAttribute(${qi(t, "colorScheme")}, ${r});`;
	} else u.startsWith(".") || (l += `${s}.setAttribute(${Ki(u)}, colorScheme);`);
	return /*#__PURE__*/ (0, R.jsx)("script", {
		suppressHydrationWarning: !0,
		nonce: typeof window > "u" ? c : "",
		dangerouslySetInnerHTML: { __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem(${Ki(i)}) || ${Ki(t)};
  const dark = localStorage.getItem(${Ki(`${a}-dark`)}) || ${Ki(r)};
  const light = localStorage.getItem(${Ki(`${a}-light`)}) || ${Ki(n)};
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${l}
  }
} catch(e){}})();` }
	}, "mui-color-scheme-init");
}
// node_modules/@mui/system/cssVars/localStorageManager.mjs
function Yi() {}
var Xi = ({ key: e, storageWindow: t }) => (!t && typeof window < "u" && (t = window), {
	get(n) {
		if (typeof window > "u") return;
		if (!t) return n;
		let r;
		try {
			r = t.localStorage.getItem(e);
		} catch {}
		return r || n;
	},
	set: (n) => {
		if (t) try {
			t.localStorage.setItem(e, n);
		} catch {}
	},
	subscribe: (n) => {
		if (!t) return Yi;
		let r = (t) => {
			let r = t.newValue;
			t.key === e && n(r);
		};
		return t.addEventListener("storage", r), () => {
			t.removeEventListener("storage", r);
		};
	}
});
// node_modules/@mui/system/cssVars/useCurrentColorScheme.mjs
function Zi() {}
function Qi(e) {
	if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function $i(e, t) {
	if (e.mode === "light" || e.mode === "system" && e.systemMode === "light") return t("light");
	if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark") return t("dark");
}
function ea(e) {
	return $i(e, (t) => {
		if (t === "light") return e.lightColorScheme;
		if (t === "dark") return e.darkColorScheme;
	});
}
function ta(e) {
	let { defaultMode: t = "light", defaultLightColorScheme: n, defaultDarkColorScheme: r, supportedColorSchemes: i = [], modeStorageKey: a = Ui, colorSchemeStorageKey: o = Wi, storageWindow: s = typeof window > "u" ? void 0 : window, storageManager: c = Xi, noSsr: l = !1 } = e, u = i.join(","), d = i.length > 1, f = O.useMemo(() => c?.({
		key: a,
		storageWindow: s
	}), [
		c,
		a,
		s
	]), p = O.useMemo(() => c?.({
		key: `${o}-light`,
		storageWindow: s
	}), [
		c,
		o,
		s
	]), m = O.useMemo(() => c?.({
		key: `${o}-dark`,
		storageWindow: s
	}), [
		c,
		o,
		s
	]), [h, g] = O.useState(() => {
		let e = f?.get(t) || t, i = p?.get(n) || n, a = m?.get(r) || r;
		return {
			mode: e,
			systemMode: Qi(e),
			lightColorScheme: i,
			darkColorScheme: a
		};
	}), [_, v] = O.useState(l || !d);
	O.useEffect(() => {
		v(!0);
	}, []);
	let y = ea(h), b = O.useCallback((e) => {
		g((n) => {
			if (e === n.mode) return n;
			let r = e ?? t;
			return f?.set(r), {
				...n,
				mode: r,
				systemMode: Qi(r)
			};
		});
	}, [f, t]), x = O.useCallback((e) => {
		e ? typeof e == "string" ? e && !u.includes(e) ? console.error(`\`${e}\` does not exist in \`theme.colorSchemes\`.`) : g((t) => {
			let n = { ...t };
			return $i(t, (t) => {
				t === "light" && (p?.set(e), n.lightColorScheme = e), t === "dark" && (m?.set(e), n.darkColorScheme = e);
			}), n;
		}) : g((t) => {
			let i = { ...t }, a = e.light === null ? n : e.light, o = e.dark === null ? r : e.dark;
			return a && (u.includes(a) ? (i.lightColorScheme = a, p?.set(a)) : console.error(`\`${a}\` does not exist in \`theme.colorSchemes\`.`)), o && (u.includes(o) ? (i.darkColorScheme = o, m?.set(o)) : console.error(`\`${o}\` does not exist in \`theme.colorSchemes\`.`)), i;
		}) : g((e) => (p?.set(n), m?.set(r), {
			...e,
			lightColorScheme: n,
			darkColorScheme: r
		}));
	}, [
		u,
		p,
		m,
		n,
		r
	]), S = O.useCallback((e) => {
		h.mode === "system" && g((t) => {
			let n = e?.matches ? "dark" : "light";
			return t.systemMode === n ? t : {
				...t,
				systemMode: n
			};
		});
	}, [h.mode]), C = O.useRef(S);
	return C.current = S, O.useEffect(() => {
		if (typeof window.matchMedia != "function" || !d) return;
		let e = (...e) => C.current(...e), t = window.matchMedia("(prefers-color-scheme: dark)");
		return t.addListener(e), e(t), () => {
			t.removeListener(e);
		};
	}, [d]), O.useEffect(() => {
		if (d) {
			let e = f?.subscribe((e) => {
				(!e || [
					"light",
					"dark",
					"system"
				].includes(e)) && b(e || t);
			}) || Zi, n = p?.subscribe((e) => {
				(!e || u.match(e)) && x({ light: e });
			}) || Zi, r = m?.subscribe((e) => {
				(!e || u.match(e)) && x({ dark: e });
			}) || Zi;
			return () => {
				e(), n(), r();
			};
		}
	}, [
		x,
		b,
		u,
		t,
		s,
		d,
		f,
		p,
		m
	]), {
		...h,
		mode: _ ? h.mode : void 0,
		systemMode: _ ? h.systemMode : void 0,
		colorScheme: _ ? y : void 0,
		setMode: b,
		setColorScheme: x
	};
}
// node_modules/@mui/system/cssVars/createCssVarsProvider.mjs
var na = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function ra(e) {
	let { themeId: t, theme: n = {}, modeStorageKey: r = Ui, colorSchemeStorageKey: i = Wi, disableTransitionOnChange: a = !1, defaultColorScheme: o, resolveTheme: s } = e, c = {
		allColorSchemes: [],
		colorScheme: void 0,
		darkColorScheme: void 0,
		lightColorScheme: void 0,
		mode: void 0,
		setColorScheme: () => {},
		setMode: () => {},
		systemMode: void 0
	}, l = /*#__PURE__*/ O.createContext(void 0), u = () => O.useContext(l) || c, d = {}, f = {};
	function p(e) {
		let { children: c, theme: u, modeStorageKey: p = r, colorSchemeStorageKey: m = i, disableTransitionOnChange: h = a, storageManager: g, storageWindow: _ = typeof window > "u" ? void 0 : window, documentNode: v = typeof document > "u" ? void 0 : document, colorSchemeNode: y = typeof document > "u" ? void 0 : document.documentElement, disableNestedContext: b = !1, disableStyleSheetGeneration: x = !1, defaultMode: S = "system", forceThemeRerender: C = !1, noSsr: w } = e, ee = O.useRef(!1), te = wi(), ne = O.useContext(l), T = !!ne && !b, re = O.useMemo(() => u || (typeof n == "function" ? n() : n), [u]), ie = re[t], ae = ie || re, { colorSchemes: oe = d, components: se = f, cssVarPrefix: ce } = ae, le = Object.keys(oe).filter((e) => !!oe[e]).join(","), E = O.useMemo(() => le.split(","), [le]), D = typeof o == "string" ? o : o.light, ue = typeof o == "string" ? o : o.dark, { mode: de, setMode: fe, systemMode: k, lightColorScheme: A, darkColorScheme: pe, colorScheme: me, setColorScheme: he } = ta({
			supportedColorSchemes: E,
			defaultLightColorScheme: D,
			defaultDarkColorScheme: ue,
			modeStorageKey: p,
			colorSchemeStorageKey: m,
			defaultMode: oe[D] && oe[ue] ? S : oe[ae.defaultColorScheme]?.palette?.mode || ae.palette?.mode,
			storageManager: g,
			storageWindow: _,
			noSsr: w
		}), ge = de, _e = me;
		T && (ge = ne.mode, _e = ne.colorScheme);
		let ve = _e || ae.defaultColorScheme;
		ae.vars && !C && (ve = ae.defaultColorScheme);
		let ye = O.useMemo(() => {
			let e = ae.generateThemeVars?.() || ae.vars, t = {
				...ae,
				components: se,
				colorSchemes: oe,
				cssVarPrefix: ce,
				vars: e
			};
			if (typeof t.generateSpacing == "function" && (t.spacing = t.generateSpacing()), ve) {
				let e = oe[ve];
				e && typeof e == "object" && Object.keys(e).forEach((n) => {
					e[n] && typeof e[n] == "object" ? t[n] = {
						...t[n],
						...e[n]
					} : t[n] = e[n];
				});
			}
			return s ? s(t) : t;
		}, [
			ae,
			ve,
			se,
			oe,
			ce
		]), be = ae.colorSchemeSelector;
		oi(() => {
			if (_e && y && be && be !== "media") {
				let e = be, t = be;
				if (e === "class" && (t = ".%s"), e === "data" && (t = "[data-%s]"), e?.startsWith("data-") && !e.includes("%s") && (t = `[${e}="%s"]`), t.startsWith(".")) y.classList.remove(...E.map((e) => t.substring(1).replace("%s", e))), y.classList.add(t.substring(1).replace("%s", _e));
				else {
					let e = t.replace("%s", _e).match(/\[([^\]]+)\]/);
					if (e) {
						let [t, n] = e[1].split("=");
						n || E.forEach((e) => {
							y.removeAttribute(t.replace(_e, e));
						}), y.setAttribute(t, n ? n.replace(/"|'/g, "") : "");
					} else y.setAttribute(t, _e);
				}
			}
		}, [
			_e,
			be,
			y,
			E
		]), O.useEffect(() => {
			let e;
			if (h && ee.current && v) {
				let t = v.createElement("style");
				t.appendChild(v.createTextNode(na)), v.head.appendChild(t), window.getComputedStyle(v.body), e = setTimeout(() => {
					v.head.removeChild(t);
				}, 1);
			}
			return () => {
				clearTimeout(e);
			};
		}, [
			_e,
			h,
			v
		]), O.useEffect(() => (ee.current = !0, () => {
			ee.current = !1;
		}), []);
		let xe = O.useMemo(() => ({
			allColorSchemes: E,
			colorScheme: _e,
			darkColorScheme: pe,
			lightColorScheme: A,
			mode: ge,
			setColorScheme: he,
			setMode: fe,
			systemMode: k
		}), [
			E,
			_e,
			pe,
			A,
			ge,
			he,
			fe,
			k,
			ye.colorSchemeSelector
		]), j = !0;
		(x || ae.cssVariables === !1 || T && te?.cssVarPrefix === ce) && (j = !1);
		let Se = /*#__PURE__*/ (0, R.jsxs)(O.Fragment, { children: [/*#__PURE__*/ (0, R.jsx)(Bi, {
			themeId: ie ? t : void 0,
			theme: ye,
			children: c
		}), j && /*#__PURE__*/ (0, R.jsx)(jr, { styles: ye.generateStyleSheets?.() || [] })] });
		return T ? Se : /*#__PURE__*/ (0, R.jsx)(l.Provider, {
			value: xe,
			children: Se
		});
	}
	let m = typeof o == "string" ? o : o.light, h = typeof o == "string" ? o : o.dark;
	return {
		CssVarsProvider: p,
		useColorScheme: u,
		getInitColorSchemeScript: (e) => Ji({
			colorSchemeStorageKey: i,
			defaultLightColorScheme: m,
			defaultDarkColorScheme: h,
			modeStorageKey: r,
			...e
		})
	};
}
// node_modules/@mui/system/cssVars/createGetCssVar.mjs
function ia(e = "") {
	function t(...n) {
		if (!n.length) return "";
		let r = n[0];
		return typeof r == "string" && !r.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${r}${t(...n.slice(1))})` : `, ${r}`;
	}
	return (n, ...r) => `var(--${e ? `${e}-` : ""}${n}${t(...r)})`;
}
// node_modules/@mui/system/cssVars/cssVarsParser.mjs
var aa = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]), oa = (e, t, n, r = []) => {
	let i = e;
	for (let e = 0; e < t.length; e += 1) {
		let a = t[e];
		if (aa.has(a)) break;
		e === t.length - 1 ? Array.isArray(i) ? i[Number(a)] = n : i && typeof i == "object" && (i[a] = n) : i && typeof i == "object" && (i[a] || (i[a] = r.includes(a) ? [] : {}), i = i[a]);
	}
}, sa = (e, t, n) => {
	function r(e, i = [], a = []) {
		Object.entries(e).forEach(([e, o]) => {
			(!n || n && !n([...i, e])) && o != null && (typeof o == "object" && Object.keys(o).length > 0 ? r(o, [...i, e], Array.isArray(o) ? [...a, e] : a) : t([...i, e], o, a));
		});
	}
	r(e);
}, ca = (e, t) => typeof t == "number" ? [
	"lineHeight",
	"fontWeight",
	"opacity",
	"zIndex"
].some((t) => e.includes(t)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function la(e, t) {
	let { prefix: n, shouldSkipGeneratingVar: r } = t || {}, i = {}, a = {}, o = {};
	return sa(e, (e, t, s) => {
		if ((typeof t == "string" || typeof t == "number") && (!r || !r(e, t))) {
			let r = `--${n ? `${n}-` : ""}${e.join("-")}`, c = ca(e, t);
			Object.assign(i, { [r]: c }), oa(a, e, `var(${r})`, s), oa(o, e, `var(${r}, ${c})`, s);
		}
	}, (e) => e[0] === "vars"), {
		css: i,
		vars: a,
		varsWithDefaults: o
	};
}
// node_modules/@mui/system/cssVars/prepareCssVars.mjs
function ua(e, t = {}) {
	let { getSelector: n = _, disableCssColorScheme: r, colorSchemeSelector: i, enableContrastVars: a } = t, { colorSchemes: o = {}, components: s, defaultColorScheme: c = "light", ...l } = e, { vars: u, css: d, varsWithDefaults: f } = la(l, t), p = f, m = {}, { [c]: h, ...g } = o;
	if (Object.entries(g || {}).forEach(([e, n]) => {
		let { vars: r, css: i, varsWithDefaults: a } = la(n, t);
		p = k(p, a), m[e] = {
			css: i,
			vars: r
		};
	}), h) {
		let { css: e, vars: n, varsWithDefaults: r } = la(h, t);
		p = k(p, r), m[c] = {
			css: e,
			vars: n
		};
	}
	function _(t, n) {
		let r = i;
		if (i === "class" && (r = ".%s"), i === "data" && (r = "[data-%s]"), i?.startsWith("data-") && !i.includes("%s") && (r = `[${i}="%s"]`), t) {
			if (r === "media") return e.defaultColorScheme === t ? ":root" : { [`@media (prefers-color-scheme: ${o[t]?.palette?.mode || t})`]: { ":root": n } };
			if (r) return e.defaultColorScheme === t ? `:root, ${r.replace("%s", String(t))}` : r.replace("%s", String(t));
		}
		return ":root";
	}
	return {
		vars: p,
		generateThemeVars: () => {
			let e = { ...u };
			return Object.entries(m).forEach(([, { vars: t }]) => {
				e = k(e, t);
			}), e;
		},
		generateStyleSheets: () => {
			let t = [], i = e.defaultColorScheme || "light";
			function s(e, n) {
				Object.keys(n).length && t.push(typeof e == "string" ? { [e]: { ...n } } : e);
			}
			s(n(void 0, { ...d }), d);
			let { [i]: c, ...l } = m;
			if (c) {
				let { css: e } = c, t = o[i]?.palette?.mode, a = !r && t ? {
					colorScheme: t,
					...e
				} : { ...e };
				s(n(i, { ...a }), a);
			}
			return Object.entries(l).forEach(([e, { css: t }]) => {
				let i = o[e]?.palette?.mode, a = !r && i ? {
					colorScheme: i,
					...t
				} : { ...t };
				s(n(e, { ...a }), a);
			}), a && t.push({ ":root": {
				"--__l-threshold": "0.7",
				"--__l": "clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)",
				"--__a": "clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)"
			} }), t;
		}
	};
}
// node_modules/@mui/system/cssVars/getColorSchemeSelector.mjs
function da(e) {
	return function(t) {
		return e === "media" ? `@media (prefers-color-scheme: ${t})` : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${t}"] &` : e === "class" ? `.${t} &` : e === "data" ? `[data-${t}] &` : `${e.replace("%s", t)} &` : "&";
	};
}
// node_modules/@mui/material/colors/common.mjs
var fa = {
	black: "#000",
	white: "#fff"
}, pa = {
	50: "#fafafa",
	100: "#f5f5f5",
	200: "#eeeeee",
	300: "#e0e0e0",
	400: "#bdbdbd",
	500: "#9e9e9e",
	600: "#757575",
	700: "#616161",
	800: "#424242",
	900: "#212121",
	A100: "#f5f5f5",
	A200: "#eeeeee",
	A400: "#bdbdbd",
	A700: "#616161"
}, ma = {
	50: "#f3e5f5",
	100: "#e1bee7",
	200: "#ce93d8",
	300: "#ba68c8",
	400: "#ab47bc",
	500: "#9c27b0",
	600: "#8e24aa",
	700: "#7b1fa2",
	800: "#6a1b9a",
	900: "#4a148c",
	A100: "#ea80fc",
	A200: "#e040fb",
	A400: "#d500f9",
	A700: "#aa00ff"
}, ha = {
	50: "#ffebee",
	100: "#ffcdd2",
	200: "#ef9a9a",
	300: "#e57373",
	400: "#ef5350",
	500: "#f44336",
	600: "#e53935",
	700: "#d32f2f",
	800: "#c62828",
	900: "#b71c1c",
	A100: "#ff8a80",
	A200: "#ff5252",
	A400: "#ff1744",
	A700: "#d50000"
}, ga = {
	50: "#fff3e0",
	100: "#ffe0b2",
	200: "#ffcc80",
	300: "#ffb74d",
	400: "#ffa726",
	500: "#ff9800",
	600: "#fb8c00",
	700: "#f57c00",
	800: "#ef6c00",
	900: "#e65100",
	A100: "#ffd180",
	A200: "#ffab40",
	A400: "#ff9100",
	A700: "#ff6d00"
}, _a = {
	50: "#e3f2fd",
	100: "#bbdefb",
	200: "#90caf9",
	300: "#64b5f6",
	400: "#42a5f5",
	500: "#2196f3",
	600: "#1e88e5",
	700: "#1976d2",
	800: "#1565c0",
	900: "#0d47a1",
	A100: "#82b1ff",
	A200: "#448aff",
	A400: "#2979ff",
	A700: "#2962ff"
}, va = {
	50: "#e1f5fe",
	100: "#b3e5fc",
	200: "#81d4fa",
	300: "#4fc3f7",
	400: "#29b6f6",
	500: "#03a9f4",
	600: "#039be5",
	700: "#0288d1",
	800: "#0277bd",
	900: "#01579b",
	A100: "#80d8ff",
	A200: "#40c4ff",
	A400: "#00b0ff",
	A700: "#0091ea"
}, ya = {
	50: "#e8f5e9",
	100: "#c8e6c9",
	200: "#a5d6a7",
	300: "#81c784",
	400: "#66bb6a",
	500: "#4caf50",
	600: "#43a047",
	700: "#388e3c",
	800: "#2e7d32",
	900: "#1b5e20",
	A100: "#b9f6ca",
	A200: "#69f0ae",
	A400: "#00e676",
	A700: "#00c853"
};
// node_modules/@mui/material/styles/createPalette.mjs
function ba() {
	return {
		text: {
			primary: "rgba(0, 0, 0, 0.87)",
			secondary: "rgba(0, 0, 0, 0.6)",
			disabled: "rgba(0, 0, 0, 0.38)"
		},
		divider: "rgba(0, 0, 0, 0.12)",
		background: {
			paper: fa.white,
			default: fa.white
		},
		action: {
			active: "rgba(0, 0, 0, 0.54)",
			hover: "rgba(0, 0, 0, 0.04)",
			hoverOpacity: .04,
			selected: "rgba(0, 0, 0, 0.08)",
			selectedOpacity: .08,
			disabled: "rgba(0, 0, 0, 0.26)",
			disabledBackground: "rgba(0, 0, 0, 0.12)",
			disabledOpacity: .38,
			focus: "rgba(0, 0, 0, 0.12)",
			focusOpacity: .12,
			activatedOpacity: .12
		}
	};
}
var xa = ba();
function Sa() {
	return {
		text: {
			primary: fa.white,
			secondary: "rgba(255, 255, 255, 0.7)",
			disabled: "rgba(255, 255, 255, 0.5)",
			icon: "rgba(255, 255, 255, 0.5)"
		},
		divider: "rgba(255, 255, 255, 0.12)",
		background: {
			paper: "#121212",
			default: "#121212"
		},
		action: {
			active: fa.white,
			hover: "rgba(255, 255, 255, 0.08)",
			hoverOpacity: .08,
			selected: "rgba(255, 255, 255, 0.16)",
			selectedOpacity: .16,
			disabled: "rgba(255, 255, 255, 0.3)",
			disabledBackground: "rgba(255, 255, 255, 0.12)",
			disabledOpacity: .38,
			focus: "rgba(255, 255, 255, 0.12)",
			focusOpacity: .12,
			activatedOpacity: .24
		}
	};
}
var Ca = Sa();
function wa(e, t, n, r) {
	let i = r.light || r, a = r.dark || r * 1.5;
	e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = bi(e.main, i) : t === "dark" && (e.dark = yi(e.main, a)));
}
function Ta(e, t, n, r, i) {
	let a = i.light || i, o = i.dark || i * 1.5;
	t[n] || (t.hasOwnProperty(r) ? t[n] = t[r] : n === "light" ? t.light = `color-mix(in ${e}, ${t.main}, #fff ${(a * 100).toFixed(0)}%)` : n === "dark" && (t.dark = `color-mix(in ${e}, ${t.main}, #000 ${(o * 100).toFixed(0)}%)`));
}
function Ea(e = "light") {
	return e === "dark" ? {
		main: _a[200],
		light: _a[50],
		dark: _a[400]
	} : {
		main: _a[700],
		light: _a[400],
		dark: _a[800]
	};
}
function Da(e = "light") {
	return e === "dark" ? {
		main: ma[200],
		light: ma[50],
		dark: ma[400]
	} : {
		main: ma[500],
		light: ma[300],
		dark: ma[700]
	};
}
function Oa(e = "light") {
	return e === "dark" ? {
		main: ha[500],
		light: ha[300],
		dark: ha[700]
	} : {
		main: ha[700],
		light: ha[400],
		dark: ha[800]
	};
}
function ka(e = "light") {
	return e === "dark" ? {
		main: va[400],
		light: va[300],
		dark: va[700]
	} : {
		main: va[700],
		light: va[500],
		dark: va[900]
	};
}
function Aa(e = "light") {
	return e === "dark" ? {
		main: ya[400],
		light: ya[300],
		dark: ya[700]
	} : {
		main: ya[800],
		light: ya[500],
		dark: ya[900]
	};
}
function ja(e = "light") {
	return e === "dark" ? {
		main: ga[400],
		light: ga[300],
		dark: ga[700]
	} : {
		main: "#ed6c02",
		light: ga[500],
		dark: ga[900]
	};
}
function Ma(e) {
	return `oklch(from ${e} var(--__l) 0 h / var(--__a))`;
}
function Na(e) {
	let { mode: t = "light", contrastThreshold: n = 3, tonalOffset: r = .2, colorSpace: i, ...a } = e, o = e.primary || Ea(t), s = e.secondary || Da(t), c = e.error || Oa(t), l = e.info || ka(t), u = e.success || Aa(t), d = e.warning || ja(t);
	function f(e) {
		return i ? Ma(e) : gi(e, Ca.text.primary) >= n ? Ca.text.primary : xa.text.primary;
	}
	let p = ({ color: e, name: t, mainShade: n = 500, lightShade: a = 300, darkShade: o = 700 }) => {
		if (e = { ...e }, !e.main && e[n] && (e.main = e[n]), !e.hasOwnProperty("main")) throw Error(C(11, t ? ` (${t})` : "", n));
		if (typeof e.main != "string") throw Error(C(12, t ? ` (${t})` : "", JSON.stringify(e.main)));
		return i ? (Ta(i, e, "light", a, r), Ta(i, e, "dark", o, r)) : (wa(e, "light", a, r), wa(e, "dark", o, r)), e.contrastText || (e.contrastText = f(e.main)), e;
	}, m;
	return t === "light" ? m = ba() : t === "dark" && (m = Sa()), k({
		common: { ...fa },
		mode: t,
		primary: p({
			color: o,
			name: "primary"
		}),
		secondary: p({
			color: s,
			name: "secondary",
			mainShade: "A400",
			lightShade: "A200",
			darkShade: "A700"
		}),
		error: p({
			color: c,
			name: "error"
		}),
		warning: p({
			color: d,
			name: "warning"
		}),
		info: p({
			color: l,
			name: "info"
		}),
		success: p({
			color: u,
			name: "success"
		}),
		grey: pa,
		contrastThreshold: n,
		getContrastText: f,
		augmentColor: p,
		tonalOffset: r,
		...m
	}, a);
}
// node_modules/@mui/material/styles/focusVisible.mjs
var Pa = "--_focusVisible-offset", Fa = "--_focusVisible-behavior", Ia = "--_focusVisible-shadow", La = `var(${Pa}, 1)`, Ra = `var(${Fa}, )`, za = {
	[Pa]: 1,
	[Fa]: "initial"
};
function Ba(e) {
	return {
		[Pa]: -e,
		[Fa]: "inset"
	};
}
function Va(e, t) {
	return t.reduce((e, t) => t && "focusVisible" in t ? k(e, { focusVisible: t.focusVisible }) : e, { focusVisible: e }).focusVisible;
}
function Ha(e) {
	return typeof e == "object" && !!e && typeof e.outlineOffset == "string" && e.outlineOffset.includes(Pa);
}
function Ua(e, t) {
	return Wa({
		outlineStyle: "solid",
		outlineColor: t,
		outlineWidth: 2,
		outlineOffset: 2,
		boxShadow: `var(${Ia}, 0 0)`,
		...e === !0 ? null : e
	});
}
function Wa(e) {
	let t = e.outlineOffset ?? 0;
	typeof t == "string" && t.includes(Pa) || (e.outlineOffset = `calc(${La} * ${typeof t == "number" ? `${t}px` : t})`);
	let n = /* @__PURE__ */ new Set([
		"none",
		"initial",
		"inherit",
		"unset",
		"revert",
		"revert-layer"
	]);
	return typeof e.boxShadow != "string" || n.has(e.boxShadow.trim().toLowerCase()) || /\binset\b/.test(e.boxShadow) || e.boxShadow.includes(Fa) || (e.boxShadow = `${Ra} ${e.boxShadow}`), e;
}
// node_modules/@mui/system/cssVars/prepareTypographyVars.mjs
function Ga(e) {
	let t = {};
	return Object.entries(e).forEach((e) => {
		let [n, r] = e;
		typeof r == "object" && (t[n] = `${r.fontStyle ? `${r.fontStyle} ` : ""}${r.fontVariant ? `${r.fontVariant} ` : ""}${r.fontWeight ? `${r.fontWeight} ` : ""}${r.fontStretch ? `${r.fontStretch} ` : ""}${r.fontSize || ""}${r.lineHeight ? `/${r.lineHeight} ` : ""}${r.fontFamily || ""}`);
	}), t;
}
// node_modules/@mui/material/styles/createMixins.mjs
function Ka(e, t) {
	return {
		toolbar: {
			minHeight: 56,
			[e.up("xs")]: { "@media (orientation: landscape)": { minHeight: 48 } },
			[e.up("sm")]: { minHeight: 64 }
		},
		...t
	};
}
// node_modules/@mui/material/styles/createTypography.mjs
function qa(e) {
	return Math.round(e * 1e5) / 1e5;
}
var Ja = { textTransform: "uppercase" }, Ya = "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif";
function Xa(e, t) {
	let { fontFamily: n = Ya, fontSize: r = 14, fontWeightLight: i = 300, fontWeightRegular: a = 400, fontWeightMedium: o = 500, fontWeightBold: s = 700, htmlFontSize: c = 16, allVariants: l, pxToRem: u, ...d } = typeof t == "function" ? t(e) : t, f = r / 14, p = u || ((e) => `${e / c * f}rem`), m = (e, t, r, i, a) => ({
		fontFamily: n,
		fontWeight: e,
		fontSize: p(t),
		lineHeight: r,
		...n === Ya ? { letterSpacing: `${qa(i / t)}em` } : {},
		...a,
		...l
	});
	return k({
		htmlFontSize: c,
		pxToRem: p,
		fontFamily: n,
		fontSize: r,
		fontWeightLight: i,
		fontWeightRegular: a,
		fontWeightMedium: o,
		fontWeightBold: s,
		h1: m(i, 96, 1.167, -1.5),
		h2: m(i, 60, 1.2, -.5),
		h3: m(a, 48, 1.167, 0),
		h4: m(a, 34, 1.235, .25),
		h5: m(a, 24, 1.334, 0),
		h6: m(o, 20, 1.6, .15),
		subtitle1: m(a, 16, 1.75, .15),
		subtitle2: m(o, 14, 1.57, .1),
		body1: m(a, 16, 1.5, .15),
		body2: m(a, 14, 1.43, .15),
		button: m(o, 14, 1.75, .4, Ja),
		caption: m(a, 12, 1.66, .4),
		overline: m(a, 12, 2.66, 1, Ja),
		inherit: {
			fontFamily: "inherit",
			fontWeight: "inherit",
			fontSize: "inherit",
			lineHeight: "inherit",
			letterSpacing: "inherit"
		}
	}, d, { clone: !1 });
}
// node_modules/@mui/material/styles/shadows.mjs
var Za = .2, Qa = .14, $a = .12;
function eo(...e) {
	return [
		`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Za})`,
		`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Qa})`,
		`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${$a})`
	].join(",");
}
var to = [
	"none",
	eo(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
	eo(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
	eo(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
	eo(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
	eo(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
	eo(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
	eo(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
	eo(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
	eo(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
	eo(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
	eo(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
	eo(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
	eo(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
	eo(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
	eo(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
	eo(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
	eo(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
	eo(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
	eo(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
	eo(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
	eo(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
	eo(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
	eo(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
	eo(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
], no = ["all"], ro = {}, io = {
	easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
	easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
	easeIn: "cubic-bezier(0.4, 0, 1, 1)",
	sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ao = {
	shortest: 150,
	shorter: 200,
	short: 250,
	standard: 300,
	complex: 375,
	enteringScreen: 225,
	leavingScreen: 195
};
function oo(e) {
	return `${Math.round(e)}ms`;
}
function so(e) {
	if (!e) return 0;
	let t = e / 36;
	return Math.min(Math.round((4 + 15 * t ** .25 + t / 5) * 10), 3e3);
}
function co(e) {
	let t = { ...e };
	delete t.reducedMotion;
	let n = {
		...io,
		...t.easing
	}, r = {
		...ao,
		...t.duration
	};
	return {
		getAutoHeightDuration: so,
		create: t.create ?? ((e = no, t = ro) => {
			let { duration: i = r.standard, easing: a = n.easeInOut, delay: o = 0, ...s } = t;
			return (Array.isArray(e) ? e : [e]).map((e) => `${e} ${typeof i == "string" ? i : oo(i)} ${a} ${typeof o == "string" ? o : oo(o)}`).join(",");
		}),
		...t,
		easing: n,
		duration: r
	};
}
// node_modules/@mui/material/styles/createMotion.mjs
var lo = {};
function uo(e = lo) {
	return {
		reducedMotion: "never",
		...e
	};
}
// node_modules/@mui/material/styles/zIndex.mjs
var H = {
	mobileStepper: 1e3,
	fab: 1050,
	speedDial: 1050,
	appBar: 1100,
	drawer: 1200,
	modal: 1300,
	snackbar: 1400,
	tooltip: 1500
};
// node_modules/@mui/material/styles/stringifyTheme.mjs
function U(e) {
	return de(e) || e === void 0 || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function fo(e = {}) {
	let t = { ...e };
	function n(e) {
		let t = Object.entries(e);
		for (let r = 0; r < t.length; r++) {
			let [i, a] = t[r];
			!U(a) || i.startsWith("unstable_") || i.startsWith("internal_") ? delete e[i] : de(a) && (e[i] = { ...a }, n(e[i]));
		}
	}
	return n(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
// node_modules/@mui/material/styles/createThemeNoVars.mjs
function po(e) {
	return typeof e == "number" ? `${(e * 100).toFixed(0)}%` : `calc((${e}) * 100%)`;
}
var mo = (e) => {
	if (!Number.isNaN(+e)) return +e;
	let t = e.match(/\d*\.?\d+/g);
	if (!t) return 0;
	let n = 0;
	for (let e = 0; e < t.length; e += 1) n += +t[e];
	return n;
};
function ho(e) {
	return e.startsWith("hsl") ? mi(e) : e;
}
function go(e, t, n = "") {
	let r = n.trim();
	if (r && !r.startsWith("color(")) try {
		let e = di(ho(r));
		if (e.split(" ").length === 3 && !e.includes("NaN")) return `var(--${t}Channel, ${e})`;
	} catch {}
	return `var(--${t}Channel)`;
}
function _o(e) {
	Object.assign(e, {
		alpha(t, n) {
			let r = this || e;
			if (r.colorSpace) return `oklch(from ${t} l c h / ${typeof n == "string" ? `calc(${n})` : n})`;
			if (r.vars) {
				let e = typeof n == "string" ? `calc(${n})` : n;
				return t.startsWith("color(") ? t.replace(/\s*(?:\/[^)]*)?\)$/, ` / ${e})`) : `rgba(${t.includes("var(") ? t.replace(/var\(--([^,\s)]+)(?:,((?:[^()]|\([^()]*\))+)\)|(?:,[^)]+)?\)+)/g, go) : fi(ho(t))} / ${e})`;
			}
			return _i(t, mo(n));
		},
		lighten(t, n) {
			let r = this || e;
			return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #fff ${po(n)})` : bi(t, n);
		},
		darken(t, n) {
			let r = this || e;
			return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #000 ${po(n)})` : yi(t, n);
		}
	});
}
function vo(e = {}, ...t) {
	let { breakpoints: n, mixins: r = {}, spacing: i, palette: a = {}, motion: o = {}, transitions: s = {}, typography: c = {}, shape: l, colorSpace: u, ...d } = e;
	if (e.vars && e.generateThemeVars === void 0) throw Error(C(22));
	let f = Na({
		...a,
		colorSpace: u
	}), p = zr(e), m = k(p, {
		mixins: Ka(p.breakpoints, r),
		palette: f,
		shadows: to.slice(),
		typography: Xa(f, c),
		motion: uo(o),
		transitions: co(s),
		zIndex: { ...H }
	});
	return m = k(m, d), m = t.reduce((e, t) => k(e, t), m), delete m.transitions.reducedMotion, m.focusVisible != null && m.focusVisible !== !1 && (m.focusVisible = Ua(m.focusVisible, m.palette.primary.main)), m.unstable_sxConfig = {
		...bt,
		...d?.unstable_sxConfig
	}, m.unstable_sx = function(e) {
		return Ct({
			sx: e,
			theme: this
		});
	}, m.toRuntimeSource = fo, _o(m), m;
}
// node_modules/@mui/material/styles/getOverlayAlpha.mjs
function yo(e) {
	let t;
	return t = e < 1 ? 5.11916 * e ** 2 : 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
// node_modules/@mui/material/styles/createColorScheme.mjs
var bo = [...Array(25)].map((e, t) => {
	if (t === 0) return "none";
	let n = yo(t);
	return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
});
function xo(e) {
	return {
		inputPlaceholder: e === "dark" ? .5 : .42,
		inputUnderline: e === "dark" ? .7 : .42,
		switchTrackDisabled: e === "dark" ? .2 : .12,
		switchTrack: e === "dark" ? .3 : .38
	};
}
function So(e) {
	return e === "dark" ? bo : [];
}
function Co(e) {
	let { palette: t = { mode: "light" }, opacity: n, overlays: r, colorSpace: i, ...a } = e, o = Na({
		...t,
		colorSpace: i
	});
	return {
		palette: o,
		opacity: {
			...xo(o.mode),
			...n
		},
		overlays: r || So(o.mode),
		...a
	};
}
// node_modules/@mui/material/styles/shouldSkipGeneratingVar.mjs
function wo(e) {
	return e[0] === "motion" || e[0] === "focusVisible" || !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || e[0] === "palette" && !!e[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}
// node_modules/@mui/material/styles/excludeVariablesFromRoot.mjs
var To = (e) => [
	...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ""}overlays-${n}`),
	`--${e ? `${e}-` : ""}palette-AppBar-darkBg`,
	`--${e ? `${e}-` : ""}palette-AppBar-darkColor`
], Eo = (e) => (t, n) => {
	let r = e.rootSelector || ":root", i = e.colorSchemeSelector, a = i;
	if (i === "class" && (a = ".%s"), i === "data" && (a = "[data-%s]"), i?.startsWith("data-") && !i.includes("%s") && (a = `[${i}="%s"]`), e.defaultColorScheme === t) {
		if (t === "dark") {
			let i = {};
			return To(e.cssVarPrefix).forEach((e) => {
				i[e] = n[e], delete n[e];
			}), a === "media" ? {
				[r]: n,
				"@media (prefers-color-scheme: dark)": { [r]: i }
			} : a ? {
				[a.replace("%s", t)]: i,
				[`${r}, ${a.replace("%s", t)}`]: n
			} : { [r]: {
				...n,
				...i
			} };
		}
		if (a && a !== "media") return `${r}, ${a.replace("%s", String(t))}`;
	} else if (t) {
		if (a === "media") return { [`@media (prefers-color-scheme: ${String(t)})`]: { [r]: n } };
		if (a) return a.replace("%s", String(t));
	}
	return r;
};
// node_modules/@mui/material/styles/createThemeWithVars.mjs
function Do(e, t) {
	t.forEach((t) => {
		e[t] || (e[t] = {});
	});
}
function W(e, t, n) {
	!e[t] && n && (e[t] = n);
}
function Oo(e) {
	return typeof e != "string" || !e.startsWith("hsl") ? e : mi(e);
}
function G(e, t) {
	`${t}Channel` in e || (e[`${t}Channel`] = fi(Oo(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function ko(e) {
	return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
var Ao = (e) => {
	try {
		return e();
	} catch {}
}, jo = (e = "mui") => ia(e);
function Mo(e, t, n, r, i) {
	if (!n) return;
	n = n === !0 ? {} : n;
	let a = i === "dark" ? "dark" : "light";
	if (!r) {
		t[i] = Co({
			...n,
			palette: {
				mode: a,
				...n?.palette
			},
			colorSpace: e
		});
		return;
	}
	let { palette: o, ...s } = vo({
		...r,
		palette: {
			mode: a,
			...n?.palette
		},
		colorSpace: e
	});
	return t[i] = {
		...n,
		palette: o,
		opacity: {
			...xo(a),
			...n?.opacity
		},
		overlays: n?.overlays || So(a)
	}, s;
}
function No(e = {}, ...t) {
	let { colorSchemes: n = { light: !0 }, defaultColorScheme: r, disableCssColorScheme: i = !1, cssVarPrefix: a = "mui", nativeColor: o = !1, shouldSkipGeneratingVar: s = wo, colorSchemeSelector: c = n.light && n.dark ? "media" : void 0, rootSelector: l = ":root", ...u } = e, d = Object.keys(n)[0], f = r || (n.light && d !== "light" ? "light" : d), p = jo(a), { [f]: m, light: h, dark: g, ..._ } = n, v = { ..._ }, y = m;
	if ((f === "dark" && !("dark" in n) || f === "light" && !("light" in n)) && (y = !0), !y) throw Error(C(21, f));
	let b;
	o && (b = "oklch");
	let x = Mo(b, v, y, u, f);
	h && !v.light && Mo(b, v, h, void 0, "light"), g && !v.dark && Mo(b, v, g, void 0, "dark");
	let S = {
		defaultColorScheme: f,
		...x,
		cssVarPrefix: a,
		colorSchemeSelector: c,
		rootSelector: l,
		getCssVar: p,
		colorSchemes: v,
		font: {
			...Ga(x.typography),
			...x.font
		},
		spacing: ko(u.spacing)
	};
	Object.keys(S.colorSchemes).forEach((e) => {
		let t = S.colorSchemes[e].palette, n = (e) => {
			let n = e.split("-"), r = n[1], i = n[2];
			return p(e, t[r][i]);
		};
		t.mode === "light" && (W(t.common, "background", "#fff"), W(t.common, "onBackground", "#000")), t.mode === "dark" && (W(t.common, "background", "#000"), W(t.common, "onBackground", "#fff")), o || G(t.text, "primary");
		function r(e, t, n) {
			if (b) {
				let r;
				return e === vi && (r = `transparent ${((1 - n) * 100).toFixed(0)}%`), e === z && (r = `#000 ${(n * 100).toFixed(0)}%`), e === B && (r = `#fff ${(n * 100).toFixed(0)}%`), `color-mix(in ${b}, ${t}, ${r})`;
			}
			return e(t, n);
		}
		if (Do(t, [
			"Alert",
			"AppBar",
			"Avatar",
			"Button",
			"Chip",
			"FilledInput",
			"Input",
			"LinearProgress",
			"Skeleton",
			"Slider",
			"SnackbarContent",
			"SpeedDialAction",
			"StepConnector",
			"StepContent",
			"Switch",
			"TableCell",
			"Tooltip"
		]), t.mode === "light") {
			W(t.Alert, "errorColor", r(z, o ? p("palette-error-light") : t.error.light, .6)), W(t.Alert, "infoColor", r(z, o ? p("palette-info-light") : t.info.light, .6)), W(t.Alert, "successColor", r(z, o ? p("palette-success-light") : t.success.light, .6)), W(t.Alert, "warningColor", r(z, o ? p("palette-warning-light") : t.warning.light, .6)), W(t.Alert, "errorFilledBg", n("palette-error-main")), W(t.Alert, "infoFilledBg", n("palette-info-main")), W(t.Alert, "successFilledBg", n("palette-success-main")), W(t.Alert, "warningFilledBg", n("palette-warning-main")), W(t.Alert, "errorFilledColor", Ao(() => t.getContrastText(t.error.main))), W(t.Alert, "infoFilledColor", Ao(() => t.getContrastText(t.info.main))), W(t.Alert, "successFilledColor", Ao(() => t.getContrastText(t.success.main))), W(t.Alert, "warningFilledColor", Ao(() => t.getContrastText(t.warning.main))), W(t.Alert, "errorStandardBg", r(B, o ? p("palette-error-light") : t.error.light, .9)), W(t.Alert, "infoStandardBg", r(B, o ? p("palette-info-light") : t.info.light, .9)), W(t.Alert, "successStandardBg", r(B, o ? p("palette-success-light") : t.success.light, .9)), W(t.Alert, "warningStandardBg", r(B, o ? p("palette-warning-light") : t.warning.light, .9)), W(t.Alert, "errorIconColor", n("palette-error-main")), W(t.Alert, "infoIconColor", n("palette-info-main")), W(t.Alert, "successIconColor", n("palette-success-main")), W(t.Alert, "warningIconColor", n("palette-warning-main")), W(t.AppBar, "defaultBg", n("palette-grey-100")), W(t.Avatar, "defaultBg", n("palette-grey-400")), W(t.Button, "inheritContainedBg", n("palette-grey-300")), W(t.Button, "inheritContainedHoverBg", n("palette-grey-A100")), W(t.Chip, "defaultBorder", n("palette-grey-400")), W(t.Chip, "defaultAvatarColor", n("palette-grey-700")), W(t.Chip, "defaultIconColor", n("palette-grey-700")), W(t.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), W(t.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), W(t.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), W(t.Input, "autofillWebkitBoxShadow", "none"), W(t.LinearProgress, "primaryBg", r(B, o ? p("palette-primary-main") : t.primary.main, .62)), W(t.LinearProgress, "secondaryBg", r(B, o ? p("palette-secondary-main") : t.secondary.main, .62)), W(t.LinearProgress, "errorBg", r(B, o ? p("palette-error-main") : t.error.main, .62)), W(t.LinearProgress, "infoBg", r(B, o ? p("palette-info-main") : t.info.main, .62)), W(t.LinearProgress, "successBg", r(B, o ? p("palette-success-main") : t.success.main, .62)), W(t.LinearProgress, "warningBg", r(B, o ? p("palette-warning-light") : t.warning.main, .62)), W(t.Skeleton, "bg", b ? r(vi, o ? p("palette-text-primary") : t.text.primary, .11) : `rgba(${n("palette-text-primaryChannel")} / 0.11)`), W(t.Slider, "primaryTrack", r(B, o ? p("palette-primary-main") : t.primary.main, .62)), W(t.Slider, "secondaryTrack", r(B, o ? p("palette-secondary-main") : t.secondary.main, .62)), W(t.Slider, "errorTrack", r(B, o ? p("palette-error-main") : t.error.main, .62)), W(t.Slider, "infoTrack", r(B, o ? p("palette-info-main") : t.info.main, .62)), W(t.Slider, "successTrack", r(B, o ? p("palette-success-main") : t.success.main, .62)), W(t.Slider, "warningTrack", r(B, o ? p("palette-warning-main") : t.warning.main, .62));
			let e = b ? r(z, o ? p("palette-background-default") : t.background.default, .6825) : Si(t.background.default, .8);
			W(t.SnackbarContent, "bg", e), W(t.SnackbarContent, "color", Ao(() => b ? Ca.text.primary : t.getContrastText(e))), W(t.SpeedDialAction, "fabHoverBg", Si(t.background.paper, .15)), W(t.StepConnector, "border", n("palette-grey-400")), W(t.StepContent, "border", n("palette-grey-400")), W(t.Switch, "defaultColor", n("palette-common-white")), W(t.Switch, "defaultDisabledColor", n("palette-grey-100")), W(t.Switch, "primaryDisabledColor", r(B, o ? p("palette-primary-main") : t.primary.main, .62)), W(t.Switch, "secondaryDisabledColor", r(B, o ? p("palette-secondary-main") : t.secondary.main, .62)), W(t.Switch, "errorDisabledColor", r(B, o ? p("palette-error-main") : t.error.main, .62)), W(t.Switch, "infoDisabledColor", r(B, o ? p("palette-info-main") : t.info.main, .62)), W(t.Switch, "successDisabledColor", r(B, o ? p("palette-success-main") : t.success.main, .62)), W(t.Switch, "warningDisabledColor", r(B, o ? p("palette-warning-main") : t.warning.main, .62)), W(t.TableCell, "border", r(B, vi(o ? p("palette-divider") : t.divider, 1), .88)), W(t.Tooltip, "bg", r(vi, o ? p("palette-grey-700") : t.grey[700], .92));
		}
		if (t.mode === "dark") {
			W(t.Alert, "errorColor", r(B, o ? p("palette-error-light") : t.error.light, .6)), W(t.Alert, "infoColor", r(B, o ? p("palette-info-light") : t.info.light, .6)), W(t.Alert, "successColor", r(B, o ? p("palette-success-light") : t.success.light, .6)), W(t.Alert, "warningColor", r(B, o ? p("palette-warning-light") : t.warning.light, .6)), W(t.Alert, "errorFilledBg", n("palette-error-dark")), W(t.Alert, "infoFilledBg", n("palette-info-dark")), W(t.Alert, "successFilledBg", n("palette-success-dark")), W(t.Alert, "warningFilledBg", n("palette-warning-dark")), W(t.Alert, "errorFilledColor", Ao(() => t.getContrastText(t.error.dark))), W(t.Alert, "infoFilledColor", Ao(() => t.getContrastText(t.info.dark))), W(t.Alert, "successFilledColor", Ao(() => t.getContrastText(t.success.dark))), W(t.Alert, "warningFilledColor", Ao(() => t.getContrastText(t.warning.dark))), W(t.Alert, "errorStandardBg", r(z, o ? p("palette-error-light") : t.error.light, .9)), W(t.Alert, "infoStandardBg", r(z, o ? p("palette-info-light") : t.info.light, .9)), W(t.Alert, "successStandardBg", r(z, o ? p("palette-success-light") : t.success.light, .9)), W(t.Alert, "warningStandardBg", r(z, o ? p("palette-warning-light") : t.warning.light, .9)), W(t.Alert, "errorIconColor", n("palette-error-main")), W(t.Alert, "infoIconColor", n("palette-info-main")), W(t.Alert, "successIconColor", n("palette-success-main")), W(t.Alert, "warningIconColor", n("palette-warning-main")), W(t.AppBar, "defaultBg", n("palette-grey-900")), W(t.AppBar, "darkBg", n("palette-background-paper")), W(t.AppBar, "darkColor", n("palette-text-primary")), W(t.Avatar, "defaultBg", n("palette-grey-600")), W(t.Button, "inheritContainedBg", n("palette-grey-800")), W(t.Button, "inheritContainedHoverBg", n("palette-grey-700")), W(t.Chip, "defaultBorder", n("palette-grey-700")), W(t.Chip, "defaultAvatarColor", n("palette-grey-300")), W(t.Chip, "defaultIconColor", n("palette-grey-300")), W(t.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), W(t.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), W(t.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), W(t.Input, "autofillWebkitBoxShadow", "0 0 0 100px #266798 inset"), W(t.LinearProgress, "primaryBg", r(z, o ? p("palette-primary-main") : t.primary.main, .5)), W(t.LinearProgress, "secondaryBg", r(z, o ? p("palette-secondary-main") : t.secondary.main, .5)), W(t.LinearProgress, "errorBg", r(z, o ? p("palette-error-main") : t.error.main, .5)), W(t.LinearProgress, "infoBg", r(z, o ? p("palette-info-main") : t.info.main, .5)), W(t.LinearProgress, "successBg", r(z, o ? p("palette-success-main") : t.success.main, .5)), W(t.LinearProgress, "warningBg", r(z, o ? p("palette-warning-main") : t.warning.main, .5)), W(t.Skeleton, "bg", b ? r(vi, o ? p("palette-text-primary") : t.text.primary, .13) : `rgba(${n("palette-text-primaryChannel")} / 0.13)`), W(t.Slider, "primaryTrack", r(z, o ? p("palette-primary-main") : t.primary.main, .5)), W(t.Slider, "secondaryTrack", r(z, o ? p("palette-secondary-main") : t.secondary.main, .5)), W(t.Slider, "errorTrack", r(z, o ? p("palette-error-main") : t.error.main, .5)), W(t.Slider, "infoTrack", r(z, o ? p("palette-info-main") : t.info.main, .5)), W(t.Slider, "successTrack", r(z, o ? p("palette-success-main") : t.success.main, .5)), W(t.Slider, "warningTrack", r(z, o ? p("palette-warning-light") : t.warning.main, .5));
			let e = b ? r(B, o ? p("palette-background-default") : t.background.default, .985) : Si(t.background.default, .98);
			W(t.SnackbarContent, "bg", e), W(t.SnackbarContent, "color", Ao(() => b ? xa.text.primary : t.getContrastText(e))), W(t.SpeedDialAction, "fabHoverBg", Si(t.background.paper, .15)), W(t.StepConnector, "border", n("palette-grey-600")), W(t.StepContent, "border", n("palette-grey-600")), W(t.Switch, "defaultColor", n("palette-grey-300")), W(t.Switch, "defaultDisabledColor", n("palette-grey-600")), W(t.Switch, "primaryDisabledColor", r(z, o ? p("palette-primary-main") : t.primary.main, .55)), W(t.Switch, "secondaryDisabledColor", r(z, o ? p("palette-secondary-main") : t.secondary.main, .55)), W(t.Switch, "errorDisabledColor", r(z, o ? p("palette-error-main") : t.error.main, .55)), W(t.Switch, "infoDisabledColor", r(z, o ? p("palette-info-main") : t.info.main, .55)), W(t.Switch, "successDisabledColor", r(z, o ? p("palette-success-main") : t.success.main, .55)), W(t.Switch, "warningDisabledColor", r(z, o ? p("palette-warning-light") : t.warning.main, .55)), W(t.TableCell, "border", r(z, vi(o ? p("palette-divider") : t.divider, 1), .68)), W(t.Tooltip, "bg", r(vi, o ? p("palette-grey-700") : t.grey[700], .92));
		}
		o || (G(t.background, "default"), G(t.background, "paper"), G(t.common, "background"), G(t.common, "onBackground"), G(t, "divider")), Object.keys(t).forEach((e) => {
			let n = t[e];
			e !== "tonalOffset" && !o && n && typeof n == "object" && (n.main && W(t[e], "mainChannel", fi(Oo(n.main))), n.light && W(t[e], "lightChannel", fi(Oo(n.light))), n.dark && W(t[e], "darkChannel", fi(Oo(n.dark))), n.contrastText && W(t[e], "contrastTextChannel", fi(Oo(n.contrastText))), e === "text" && (G(t[e], "primary"), G(t[e], "secondary")), e === "action" && (n.active && G(t[e], "active"), n.selected && G(t[e], "selected")));
		});
	}), S = t.reduce((e, t) => k(e, t), S);
	let w = Va(e.focusVisible, t);
	w != null && w !== !1 && (S.focusVisible = Ua(w, p("palette-primary-main")));
	let ee = {
		prefix: a,
		disableCssColorScheme: i,
		shouldSkipGeneratingVar: s,
		getSelector: Eo(S),
		enableContrastVars: o
	}, { vars: te, generateThemeVars: ne, generateStyleSheets: T } = ua(S, ee);
	return S.vars = te, Object.entries(S.colorSchemes[S.defaultColorScheme]).forEach(([e, t]) => {
		S[e] = t;
	}), S.generateThemeVars = ne, S.generateStyleSheets = T, S.generateSpacing = function() {
		return Lr(u.spacing, ze(this));
	}, S.getColorSchemeSelector = da(c), S.spacing = S.generateSpacing(), S.shouldSkipGeneratingVar = s, S.unstable_sxConfig = {
		...bt,
		...u?.unstable_sxConfig
	}, S.unstable_sx = function(e) {
		return Ct({
			sx: e,
			theme: this
		});
	}, S.internal_cache = {}, S.toRuntimeSource = fo, S;
}
// node_modules/@mui/material/styles/createTheme.mjs
function Po(e, t, n) {
	e.colorSchemes && n && (e.colorSchemes[t] = {
		...n !== !0 && n,
		palette: Na({
			...n === !0 ? {} : n.palette,
			mode: t
		})
	});
}
function Fo(e = {}, ...t) {
	let { palette: n, cssVariables: r = !1, colorSchemes: i = n ? void 0 : { light: !0 }, defaultColorScheme: a = n?.mode, ...o } = e, s = a || "light", c = i?.[s], l = {
		...i,
		...n ? { [s]: {
			...typeof c != "boolean" && c,
			palette: n
		} } : void 0
	};
	if (r === !1) {
		if (!("colorSchemes" in e)) return vo(e, ...t);
		let r = n;
		"palette" in e || l[s] && (l[s] === !0 ? s === "dark" && (r = { mode: "dark" }) : r = l[s].palette);
		let i = vo({
			...e,
			palette: r
		}, ...t);
		if (i.defaultColorScheme = s, i.colorSchemes = l, i.palette.mode === "light" && (i.colorSchemes.light = {
			...l.light !== !0 && l.light,
			palette: i.palette
		}, Po(i, "dark", l.dark)), i.palette.mode === "dark" && (i.colorSchemes.dark = {
			...l.dark !== !0 && l.dark,
			palette: i.palette
		}, Po(i, "light", l.light)), i.focusVisible != null && i.focusVisible !== !1) {
			let n = i.focusVisible, r = Va(e.focusVisible, t), a = r && typeof r == "object" ? r.outlineColor : void 0;
			if (!a || Ha(r) && a === i.palette.primary.main) {
				let { outlineColor: e, ...t } = n;
				n = t;
			}
			Object.keys(i.colorSchemes).forEach((e) => {
				let t = i.colorSchemes?.[e]?.palette;
				t?.primary && (i.colorSchemes[e].focusVisible = Ua(n, t.primary.main));
			});
		}
		return i;
	}
	return !n && !("light" in l) && s === "light" && (l.light = !0), No({
		...o,
		colorSchemes: l,
		defaultColorScheme: s,
		...typeof r != "boolean" && r
	}, ...t);
}
// node_modules/@mui/material/styles/defaultTheme.mjs
var Io = Fo(), Lo = "$$material";
// node_modules/@mui/material/styles/useTheme.mjs
function Ro() {
	let e = Ur(Io);
	return e.$$material || e;
}
// node_modules/@mui/material/styles/slotShouldForwardProp.mjs
function zo(e) {
	return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
// node_modules/@mui/material/styles/rootShouldForwardProp.mjs
var Bo = (e) => zo(e) && e !== "classes", Vo = ri({
	themeId: Lo,
	defaultTheme: Io,
	rootShouldForwardProp: Bo
}), Ho = Hi;
// node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.mjs
function Uo(e) {
	return V(e);
}
// node_modules/@mui/material/SvgIcon/svgIconClasses.mjs
function Wo(e) {
	return qr("MuiSvgIcon", e);
}
Jr("MuiSvgIcon", [
	"root",
	"colorPrimary",
	"colorSecondary",
	"colorAction",
	"colorError",
	"colorDisabled",
	"fontSizeInherit",
	"fontSizeSmall",
	"fontSizeMedium",
	"fontSizeLarge"
]);
// node_modules/@mui/material/styles/reducedMotion.mjs
var Go = { transition: "none" };
function Ko(e, t) {
	return e === "always" ? t : e === "system" ? { "@media (prefers-reduced-motion: reduce)": t } : null;
}
// node_modules/@mui/material/transitions/utils.mjs
var qo = {}, Jo = ["all"], Yo = {};
function Xo(e, t) {
	let n = t ?? Go;
	return Ko(e.motion?.reducedMotion, n);
}
function Zo(e, t = Jo, n = Yo) {
	let r = e.transitions?.create?.(t, n), i = Xo(e);
	if (r === void 0) return i ?? qo;
	let a = { transition: r };
	return i ? {
		...a,
		...i
	} : a;
}
// node_modules/@mui/material/SvgIcon/SvgIcon.mjs
var Qo = (e) => {
	let { color: t, fontSize: n, classes: r } = e;
	return b({ root: [
		"root",
		t !== "inherit" && `color${ee(t)}`,
		`fontSize${ee(n)}`
	] }, Wo, r);
}, $o = Vo("svg", {
	name: "MuiSvgIcon",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.color !== "inherit" && t[`color${ee(n.color)}`],
			t[`fontSize${ee(n.fontSize)}`]
		];
	}
})(Ho(({ theme: e }) => ({
	userSelect: "none",
	width: "1em",
	height: "1em",
	display: "inline-block",
	flexShrink: 0,
	...Zo(e, "fill", { duration: (e.vars ?? e).transitions?.duration?.shorter }),
	variants: [
		{
			props: (e) => !e.hasSvgAsChild,
			style: { fill: "currentColor" }
		},
		{
			props: { fontSize: "inherit" },
			style: { fontSize: "inherit" }
		},
		{
			props: { fontSize: "small" },
			style: { fontSize: e.typography?.pxToRem?.(20) || "1.25rem" }
		},
		{
			props: { fontSize: "medium" },
			style: { fontSize: e.typography?.pxToRem?.(24) || "1.5rem" }
		},
		{
			props: { fontSize: "large" },
			style: { fontSize: e.typography?.pxToRem?.(35) || "2.1875rem" }
		},
		...Object.entries((e.vars ?? e).palette).filter(([, e]) => e && e.main).map(([t]) => ({
			props: { color: t },
			style: { color: (e.vars ?? e).palette?.[t]?.main }
		})),
		{
			props: { color: "action" },
			style: { color: (e.vars ?? e).palette?.action?.active }
		},
		{
			props: { color: "disabled" },
			style: { color: (e.vars ?? e).palette?.action?.disabled }
		},
		{
			props: { color: "inherit" },
			style: { color: void 0 }
		}
	]
}))), es = /*#__PURE__*/ O.forwardRef(function(e, t) {
	let n = Uo({
		props: e,
		name: "MuiSvgIcon"
	}), { children: r, className: i, color: a = "inherit", component: o = "svg", fontSize: s = "medium", htmlColor: c, inheritViewBox: l = !1, titleAccess: u, viewBox: d = "0 0 24 24", ...f } = n, p = /*#__PURE__*/ O.isValidElement(r) && r.type === "svg", m = {
		...n,
		color: a,
		component: o,
		fontSize: s,
		instanceFontSize: e.fontSize,
		inheritViewBox: l,
		viewBox: d,
		hasSvgAsChild: p
	}, h = {};
	l || (h.viewBox = d);
	let g = Qo(m);
	return /*#__PURE__*/ (0, R.jsxs)($o, {
		as: o,
		className: v(g.root, i),
		focusable: "false",
		color: c,
		"aria-hidden": !u || void 0,
		role: u ? "img" : void 0,
		ref: t,
		...h,
		...f,
		...p && r.props,
		ownerState: m,
		children: [p ? r.props.children : r, u ? /*#__PURE__*/ (0, R.jsx)("title", { children: u }) : null]
	});
});
es.muiName = "SvgIcon";
// node_modules/@mui/material/utils/useId.mjs
var ts = Ii;
// node_modules/@mui/utils/useEventCallback/useEventCallback.mjs
function ns(e) {
	let t = O.useRef(e);
	return oi(() => {
		t.current = e;
	}), O.useRef((...e) => (0, t.current)(...e)).current;
}
// node_modules/@mui/material/utils/useEventCallback.mjs
var rs = ns;
// node_modules/@mui/utils/useForkRef/useForkRef.mjs
function is(...e) {
	let t = O.useRef(void 0), n = O.useCallback((t) => {
		let n = e.map((e) => {
			if (e == null) return null;
			if (typeof e == "function") {
				let n = e, r = n(t);
				return typeof r == "function" ? r : () => {
					n(null);
				};
			}
			return e.current = t, () => {
				e.current = null;
			};
		});
		return () => {
			n.forEach((e) => e?.());
		};
	}, e);
	return O.useMemo(() => e.every((e) => e == null) ? null : (e) => {
		t.current &&= (t.current(), void 0), e != null && (t.current = n(e));
	}, e);
}
// node_modules/@mui/material/utils/useForkRef.mjs
var as = is;
// node_modules/@mui/utils/isEventHandler/isEventHandler.mjs
function os(e, t) {
	let n = e.charCodeAt(2);
	return e[0] === "o" && e[1] === "n" && n >= 65 && n <= 90 && typeof t == "function";
}
// node_modules/@mui/utils/isFocusVisible/isFocusVisible.mjs
function ss(e) {
	try {
		return e.matches(":focus-visible");
	} catch {}
	return !1;
}
// node_modules/@mui/material/utils/useFocusableWhenDisabled.mjs
function cs(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return O.useMemo(() => {
		let e = { onKeyDown(e) {
			n && t && e.key !== "Tab" && e.preventDefault();
		} };
		return r || (e.tabIndex = i, !a && n && (e.tabIndex = t ? i : -1)), (a && (t || o) || !a && n) && (e["aria-disabled"] = n), a && (!t || s) && (e.disabled = n), e;
	}, [
		r,
		n,
		t,
		o,
		s,
		a,
		i
	]);
}
// node_modules/@mui/material/ButtonBase/useButtonBase.mjs
var ls = {};
function us(e) {
	let { nativeButton: t, nativeButtonProp: n, internalNativeButton: r = t, allowInferredHostMismatch: i = !1, disabled: a, type: o, hasFormAction: s = !1, tabIndex: c = 0, focusableWhenDisabled: l, stopEventPropagation: u = !1, onBeforeKeyDown: d, onBeforeKeyUp: f } = e, p = O.useRef(null), m = l === !0, h = cs({
		focusableWhenDisabled: m,
		disabled: a,
		isNativeButton: t,
		tabIndex: c
	}), g = O.useCallback(() => {
		let e = p.current;
		return e == null ? t : e.tagName === "BUTTON" || !!(e.tagName === "A" && e.href);
	}, [t]), _ = O.useMemo(() => {
		let e = m ? {} : { tabIndex: a ? -1 : c };
		return t ? (e.type = o === void 0 && !s ? "button" : o, m || (e.disabled = a)) : (e.role = "button", !m && a && (e["aria-disabled"] = a)), m ? {
			...e,
			...h
		} : e;
	}, [
		a,
		m,
		h,
		s,
		t,
		c,
		o
	]);
	return {
		getButtonProps: O.useCallback((e = ls) => {
			let { onClick: t, onKeyDown: n, onKeyUp: r, ...i } = e, o = (e) => {
				u && e.stopPropagation(), a ? e.preventDefault() : t?.(e);
			}, s = (e) => {
				m && h.onKeyDown(e), a || (d?.(e), n?.(e), e.target !== e.currentTarget || g() || (e.key === " " ? e.preventDefault() : e.key === "Enter" && (e.preventDefault(), e.currentTarget.click())));
			}, c = (e) => {
				a || (f?.(e), r?.(e), e.target === e.currentTarget && !g() && e.key === " " && !e.defaultPrevented && e.currentTarget.click());
			};
			return {
				..._,
				...i,
				onClick: o,
				onKeyDown: s,
				onKeyUp: c
			};
		}, [
			_,
			a,
			m,
			h,
			g,
			d,
			f,
			u
		]),
		rootRef: p
	};
}
// node_modules/@mui/utils/useLazyRef/useLazyRef.mjs
var ds = {};
function fs(e, t) {
	let n = O.useRef(ds);
	return n.current === ds && (n.current = e(t)), n;
}
// node_modules/@mui/material/useLazyRipple/useLazyRipple.mjs
var ps = class e {
	ref = { current: null };
	shouldMount = !1;
	mounted = null;
	didMount = !1;
	setShouldMount = null;
	static create() {
		return new e();
	}
	static use() {
		let t = fs(e.create).current, [n, r] = O.useState(!1);
		return t.shouldMount = n, t.setShouldMount = r, O.useEffect(t.mountEffect, [n]), t;
	}
	mount() {
		return this.mounted || (this.mounted = hs(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
	}
	mountEffect = () => {
		this.shouldMount && !this.didMount && (this.ref.current !== null && (this.didMount = !0), this.mounted.resolve());
	};
	start(...e) {
		this.mount().then(() => this.ref.current?.start(...e));
	}
	stop(...e) {
		this.mount().then(() => this.ref.current?.stop(...e));
	}
	pulsate(...e) {
		this.mount().then(() => this.ref.current?.pulsate(...e));
	}
};
function ms() {
	return ps.use();
}
function hs() {
	let e, t, n = new Promise((n, r) => {
		e = n, t = r;
	});
	return n.resolve = e, n.reject = t, n;
}
// node_modules/@mui/utils/useOnMount/useOnMount.mjs
var gs = [];
function _s(e) {
	O.useEffect(e, gs);
}
// node_modules/@mui/utils/useTimeout/useTimeout.mjs
var vs = class e {
	static create() {
		return new e();
	}
	currentId = null;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = null, t();
		}, e);
	}
	clear = () => {
		this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
	};
	disposeEffect = () => this.clear;
};
function ys() {
	let e = fs(vs.create).current;
	return _s(e.disposeEffect), e;
}
// node_modules/@mui/material/ButtonBase/Ripple.mjs
function bs(e) {
	let { className: t, classes: n, pulsate: r = !1, rippleX: i, rippleY: a, rippleSize: o, in: s, onExited: c, timeout: l } = e, [u, d] = O.useState(!1), f = ys(), p = O.useRef(!1), m = O.useRef(c);
	m.current = c;
	let h = c != null, g = v(t, n.ripple, n.rippleVisible, r && n.ripplePulsate), _ = {
		width: o,
		height: o,
		top: -(o / 2) + a,
		left: -(o / 2) + i
	}, y = v(n.child, u && n.childLeaving, r && n.childPulsate);
	return !s && !u && d(!0), O.useEffect(() => {
		!s && h ? p.current || (p.current = !0, f.start(l, () => {
			p.current = !1, m.current?.();
		})) : (p.current = !1, f.clear());
	}, [
		f,
		h,
		s,
		l
	]), /*#__PURE__*/ (0, R.jsx)("span", {
		className: g,
		style: _,
		children: /*#__PURE__*/ (0, R.jsx)("span", { className: y })
	});
}
// node_modules/@mui/material/ButtonBase/touchRippleClasses.mjs
var xs = Jr("MuiTouchRipple", [
	"root",
	"ripple",
	"rippleVisible",
	"ripplePulsate",
	"child",
	"childLeaving",
	"childPulsate"
]), Ss = "(prefers-reduced-motion: reduce)", Cs = 0, ws = "0ms", Ts = () => {}, Es = () => !1, Ds = () => !0, Os = () => Ts;
function ks(e) {
	let [t, n] = O.useState(() => ({
		enabled: e,
		matches: e ? null : !1
	})), r = t.matches;
	return t.enabled !== e && (r = null, e || (r = !1)), oi(() => {
		let r = (t) => {
			n((n) => n.enabled === e && n.matches === t ? n : {
				enabled: e,
				matches: t
			});
		};
		if (!e) {
			t.enabled && r(!1);
			return;
		}
		if (typeof window > "u" || typeof window.matchMedia != "function") {
			r(!1);
			return;
		}
		let i = window.matchMedia(Ss), a = () => {
			r(i.matches);
		};
		return a(), i.addEventListener("change", a), () => {
			i.removeEventListener("change", a);
		};
	}, [e, t.enabled]), r;
}
var As = { ...O }.useSyncExternalStore;
function js(e) {
	let t = e ? Ds : Es, [n, r] = O.useMemo(() => {
		if (!e || typeof window > "u" || typeof window.matchMedia != "function") return [Es, Os];
		let t = window.matchMedia(Ss);
		return [() => t.matches, (e) => (t.addEventListener("change", e), () => {
			t.removeEventListener("change", e);
		})];
	}, [e]);
	return As(r, n, t);
}
var Ms = As === void 0 ? ks : js;
function Ns(e, t) {
	let n = Ms(!t && e === "system"), r = !t && (e === "always" || e === "system" && n !== !1);
	return O.useMemo(() => ({
		shouldReduceMotion: r,
		getTransitionTiming(e) {
			return r ? {
				duration: Cs,
				delay: ws
			} : e;
		}
	}), [r]);
}
// node_modules/@mui/material/ButtonBase/TouchRipple.mjs
var Ps = 550, Fs = {}, Is = [], Ls = () => {};
function Rs(e, t) {
	let n = new Set(t), r = /* @__PURE__ */ new Map(), i = [];
	for (let t of e) n.has(t) ? i.length > 0 && (r.set(t, i), i = []) : i.push(t);
	let a = [];
	for (let e of t) {
		let t = r.get(e);
		t && a.push(...t), a.push(e);
	}
	return a.push(...i), a;
}
function zs({ event: e, element: t, center: n }) {
	let r = t ? t.getBoundingClientRect() : {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	}, i, a;
	if (n || e === void 0 || e.clientX === 0 && e.clientY === 0 || !e.clientX && !e.touches) i = Math.round(r.width / 2), a = Math.round(r.height / 2);
	else {
		let { clientX: t, clientY: n } = e.touches && e.touches.length > 0 ? e.touches[0] : e;
		i = Math.round(t - r.left), a = Math.round(n - r.top);
	}
	let o;
	if (n) o = Math.sqrt((2 * r.width ** 2 + r.height ** 2) / 3), o % 2 == 0 && (o += 1);
	else {
		let e = Math.max(Math.abs((t ? t.clientWidth : 0) - i), i) * 2 + 2, n = Math.max(Math.abs((t ? t.clientHeight : 0) - a), a) * 2 + 2;
		o = Math.sqrt(e ** 2 + n ** 2);
	}
	return {
		rippleX: i,
		rippleY: a,
		rippleSize: o
	};
}
var Bs = yr`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, Vs = yr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, Hs = yr`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
function Us(e) {
	if (e.motion.reducedMotion === "always") return null;
	let t = vr`
    &.${xs.rippleVisible} {
      animation-name: ${Bs};
      animation-duration: ${Ps}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    &.${xs.ripplePulsate} {
      animation-duration: ${e.transitions.duration.shorter}ms;
    }

    & .${xs.childLeaving} {
      animation-name: ${Vs};
      animation-duration: ${Ps}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    & .${xs.childPulsate} {
      animation-name: ${Hs};
      animation-duration: 2500ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;
	return e.motion.reducedMotion === "system" ? vr`
      @media (prefers-reduced-motion: no-preference) {
        ${t}
      }
    ` : t;
}
var Ws = Vo("span", {
	name: "MuiTouchRipple",
	slot: "Root"
})({
	overflow: "hidden",
	pointerEvents: "none",
	position: "absolute",
	zIndex: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	borderRadius: "inherit"
}), Gs = Vo(bs, {
	name: "MuiTouchRipple",
	slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${xs.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${xs.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${xs.childLeaving} {
    opacity: 0;
  }

  & .${xs.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({ theme: e }) => Us(e)}
`, Ks = /*#__PURE__*/ O.forwardRef(function(e, t) {
	let n = Uo({
		props: e,
		name: "MuiTouchRipple"
	}), r = Ns(Ro().motion.reducedMotion, !1), { center: i = !1, classes: a = Fs, className: o, ...s } = n, [c, l] = O.useState({
		items: Is,
		order: Is
	}), u = c.items, d = O.useRef(0), f = O.useRef(null), p = O.useRef(!1);
	_s(() => (p.current = !0, () => {
		p.current = !1;
	})), O.useEffect(() => {
		f.current &&= (f.current(), null);
	}, [u]);
	let m = O.useRef(!1), h = ys(), g = O.useRef(null), _ = O.useRef(null), y = rs((e) => {
		p.current && l((t) => {
			let n = t.items.filter((t) => t.key !== e);
			return {
				items: n,
				order: Rs(t.order.filter((t) => t !== e), n.filter((e) => !e.exiting).map((e) => e.key))
			};
		});
	}), b = rs((e) => {
		let { pulsate: t, rippleX: n, rippleY: r, rippleSize: i, cb: a } = e, o = d.current;
		d.current += 1, l((e) => {
			let a = [...e.items, {
				key: o,
				pulsate: t,
				rippleX: n,
				rippleY: r,
				rippleSize: i,
				exiting: !1
			}];
			return {
				items: a,
				order: Rs(e.order, a.filter((e) => !e.exiting).map((e) => e.key))
			};
		}), f.current = a;
	}), x = rs((e = Fs, t = Fs, n = Ls) => {
		let { pulsate: r = !1, center: a = i || t.pulsate, fakeElement: o = !1 } = t;
		if (e?.type === "mousedown" && m.current) {
			m.current = !1;
			return;
		}
		e?.type === "touchstart" && (m.current = !0);
		let { rippleX: s, rippleY: c, rippleSize: l } = zs({
			event: e,
			element: o ? null : _.current,
			center: a
		});
		e?.touches ? g.current === null && (g.current = () => {
			b({
				pulsate: r,
				rippleX: s,
				rippleY: c,
				rippleSize: l,
				cb: n
			});
		}, h.start(80, () => {
			g.current &&= (g.current(), null);
		})) : b({
			pulsate: r,
			rippleX: s,
			rippleY: c,
			rippleSize: l,
			cb: n
		});
	}), S = rs(() => {
		x(Fs, { pulsate: !0 });
	}), C = rs((e, t) => {
		h.clear(), e?.type === "touchend" && g.current ? (g.current(), g.current = null, h.start(0, () => {
			C(e, t);
		})) : (g.current = null, l((e) => {
			let t = e.items.findIndex((e) => !e.exiting);
			if (t === -1) return e;
			let n = e.items.slice();
			return n[t] = {
				...n[t],
				exiting: !0
			}, {
				items: n,
				order: Rs(e.order, n.filter((e) => !e.exiting).map((e) => e.key))
			};
		}), f.current = t);
	});
	O.useImperativeHandle(t, () => ({
		pulsate: S,
		start: x,
		stop: C
	}), [
		S,
		x,
		C
	]);
	let w = new Map(u.map((e) => [e.key, e])), ee = c.order.map((e) => w.get(e)).filter(Boolean);
	return /*#__PURE__*/ (0, R.jsx)(Ws, {
		className: v(xs.root, a.root, o),
		ref: _,
		...s,
		children: ee.map((e) => /*#__PURE__*/ (0, R.jsx)(Gs, {
			classes: {
				ripple: v(a.ripple, xs.ripple),
				rippleVisible: v(a.rippleVisible, xs.rippleVisible),
				ripplePulsate: v(a.ripplePulsate, xs.ripplePulsate),
				child: v(a.child, xs.child),
				childLeaving: v(a.childLeaving, xs.childLeaving),
				childPulsate: v(a.childPulsate, xs.childPulsate)
			},
			timeout: r.shouldReduceMotion ? 0 : Ps,
			pulsate: e.pulsate,
			rippleX: e.rippleX,
			rippleY: e.rippleY,
			rippleSize: e.rippleSize,
			in: !e.exiting,
			onExited: () => y(e.key)
		}, e.key))
	});
});
// node_modules/@mui/material/ButtonBase/buttonBaseClasses.mjs
function qs(e) {
	return qr("MuiButtonBase", e);
}
var Js = Jr("MuiButtonBase", [
	"root",
	"disabled",
	"focusVisible"
]), Ys = (e) => {
	let { disabled: t, focusVisible: n, focusVisibleClassName: r, suppressFocusVisible: i, classes: a } = e, o = b({ root: [
		"root",
		t && "disabled",
		n && !i && "focusVisible"
	] }, qs, a);
	return n && !i && r && (o.root += ` ${r}`), o;
}, Xs = Vo("button", {
	name: "MuiButtonBase",
	slot: "Root"
})(Ho(({ theme: e }) => ({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
	WebkitTapHighlightColor: "transparent",
	backgroundColor: "transparent",
	outline: 0,
	border: 0,
	margin: 0,
	borderRadius: 0,
	padding: 0,
	cursor: "pointer",
	userSelect: "none",
	verticalAlign: "middle",
	MozAppearance: "none",
	WebkitAppearance: "none",
	textDecoration: "none",
	color: "inherit",
	"&::-moz-focus-inner": { borderStyle: "none" },
	[`&.${Js.disabled}`]: {
		pointerEvents: "none",
		cursor: "default"
	},
	"@media print": { colorAdjust: "exact" },
	variants: [{
		props: { internalDisabledThemeFocusVisible: !1 },
		style: e.focusVisible && {
			...za,
			[`&.${Js.focusVisible}`]: e.focusVisible
		}
	}]
}))), Zs = /*#__PURE__*/ O.forwardRef(function(e, t) {
	let n = Uo({
		props: e,
		name: "MuiButtonBase"
	}), { action: r, centerRipple: i = !1, children: a, className: o, component: s = "button", disabled: c = !1, disableRipple: l = !1, disableTouchRipple: u = !1, focusRipple: d = !1, focusVisibleClassName: f, focusableWhenDisabled: p, suppressFocusVisible: m = !1, internalNativeButton: h, internalDisabledThemeFocusVisible: g = !1, LinkComponent: _ = "a", nativeButton: y, onBlur: b, onClick: x, onContextMenu: S, onDragLeave: C, onFocus: w, onFocusVisible: ee, onKeyDown: te, onKeyUp: ne, onMouseDown: T, onMouseLeave: re, onMouseUp: ie, onTouchEnd: ae, onTouchMove: oe, onTouchStart: se, tabIndex: ce = 0, TouchRippleProps: le, touchRippleRef: E, type: D, ...ue } = n, de = !!(ue.href || ue.to), fe = !!ue.formAction, k = s;
	k === "button" && de && (k = _);
	let A = typeof k == "string" ? k === "button" : h ?? !1, pe = y ?? A, me = ms(), he = as(me.ref, E), [ge, _e] = O.useState(!1);
	(c || m) && ge && _e(!1);
	let ve = rs((e) => {
		d && !e.repeat && ge && e.key === " " && me.stop(e, () => {
			me.start(e);
		});
	}), ye = rs((e) => {
		d && e.key === " " && ge && !e.defaultPrevented && me.stop(e, () => {
			me.pulsate(e);
		});
	}), { getButtonProps: be, rootRef: xe } = us({
		nativeButton: pe,
		nativeButtonProp: y,
		internalNativeButton: A,
		allowInferredHostMismatch: de || typeof k == "string",
		disabled: c,
		type: D,
		hasFormAction: fe,
		tabIndex: ce,
		onBeforeKeyDown: ve,
		onBeforeKeyUp: ye
	}), { onClick: j, onKeyDown: Se, onKeyUp: M, ...Ce } = be({
		onClick: x,
		onKeyDown: te,
		onKeyUp: ne
	});
	O.useImperativeHandle(r, () => ({ focusVisible: () => {
		_e(!0), xe.current.focus();
	} }), [xe]);
	let we = me.shouldMount && !l && !c;
	O.useEffect(() => {
		ge && d && !l && me.pulsate();
	}, [
		l,
		d,
		ge,
		me
	]);
	let Te = Qs(me, "start", T, u), Ee = Qs(me, "stop", S, u), De = Qs(me, "stop", C, u), Oe = Qs(me, "stop", ie, u), ke = Qs(me, "stop", (e) => {
		ge && e.preventDefault(), re && re(e);
	}, u), Ae = Qs(me, "start", se, u), N = Qs(me, "stop", ae, u), je = Qs(me, "stop", oe, u), Me = Qs(me, "stop", (e) => {
		ss(e.target) || _e(!1), b && b(e);
	}, !1), Ne = rs((e) => {
		xe.current ||= e.currentTarget, !m && ss(e.target) && (_e(!0), ee && ee(e)), w && w(e);
	}), Pe = {};
	de && (Pe.tabIndex = c ? -1 : ce, c && (Pe["aria-disabled"] = c), Pe.type = D);
	let Fe = as(t, xe), Ie = {
		...n,
		centerRipple: i,
		component: s,
		disabled: c,
		disableRipple: l,
		disableTouchRipple: u,
		focusRipple: d,
		suppressFocusVisible: m,
		tabIndex: ce,
		focusVisible: ge,
		internalDisabledThemeFocusVisible: g
	}, Le = Ys(Ie);
	return /*#__PURE__*/ (0, R.jsxs)(Xs, {
		as: k,
		className: v(Le.root, o),
		ownerState: Ie,
		onBlur: Me,
		onClick: j,
		onContextMenu: Ee,
		onFocus: Ne,
		onKeyDown: Se,
		onKeyUp: M,
		onMouseDown: Te,
		onMouseLeave: ke,
		onMouseUp: Oe,
		onDragLeave: De,
		onTouchEnd: N,
		onTouchMove: je,
		onTouchStart: Ae,
		ref: Fe,
		...de ? Pe : Ce,
		...ue,
		children: [a, we ? /*#__PURE__*/ (0, R.jsx)(Ks, {
			ref: he,
			center: i,
			...le
		}) : null]
	});
});
function Qs(e, t, n, r = !1) {
	return rs((i) => (n && n(i), r || e[t](i), !0));
}
// node_modules/@mui/material/utils/createSimplePaletteValueFilter.mjs
function $s(e) {
	return typeof e.main == "string";
}
function ec(e, t = []) {
	if (!$s(e)) return !1;
	for (let n of t) if (!e.hasOwnProperty(n) || typeof e[n] != "string") return !1;
	return !0;
}
function tc(e = []) {
	return ([, t]) => t && ec(t, e);
}
// node_modules/@mui/material/CircularProgress/circularProgressClasses.mjs
function nc(e) {
	return qr("MuiCircularProgress", e);
}
Jr("MuiCircularProgress", [
	"root",
	"determinate",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"svg",
	"track",
	"circle",
	"circleDisableShrink"
]);
// node_modules/@mui/material/CircularProgress/CircularProgress.mjs
var rc = 44, ic = yr`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, ac = yr`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`, oc = typeof ic == "string" ? null : vr`
        animation: ${ic} 1.4s linear infinite;
      `, sc = typeof ac == "string" ? null : vr`
        animation: ${ac} 1.4s ease-in-out infinite;
      `, cc = (e) => {
	let { classes: t, variant: n, color: r, disableShrink: i } = e;
	return b({
		root: [
			"root",
			n,
			`color${ee(r)}`
		],
		svg: ["svg"],
		track: ["track"],
		circle: ["circle", i && "circleDisableShrink"]
	}, nc, t);
}, lc = Vo("span", {
	name: "MuiCircularProgress",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[n.variant],
			t[`color${ee(n.color)}`]
		];
	}
})(Ho(({ theme: e }) => {
	let t = Xo(e, { animation: "none" });
	return {
		display: "inline-block",
		variants: [
			{
				props: { variant: "determinate" },
				style: { ...Zo(e, "transform") }
			},
			{
				props: { variant: "indeterminate" },
				style: oc || { animation: `${ic} 1.4s linear infinite` }
			},
			...t ? [{
				props: { variant: "indeterminate" },
				style: t
			}] : [],
			...Object.entries(e.palette).filter(tc()).map(([t]) => ({
				props: { color: t },
				style: { color: (e.vars || e).palette[t].main }
			}))
		]
	};
})), uc = Vo("svg", {
	name: "MuiCircularProgress",
	slot: "Svg"
})({ display: "block" }), dc = Vo("circle", {
	name: "MuiCircularProgress",
	slot: "Circle",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.circle, n.disableShrink && t.circleDisableShrink];
	}
})(Ho(({ theme: e }) => {
	let t = Xo(e, { animation: "none" });
	return {
		stroke: "currentColor",
		variants: [
			{
				props: { variant: "determinate" },
				style: { ...Zo(e, "stroke-dashoffset") }
			},
			{
				props: { variant: "indeterminate" },
				style: {
					strokeDasharray: "80px, 200px",
					strokeDashoffset: 0
				}
			},
			{
				props: ({ ownerState: e }) => e.variant === "indeterminate" && !e.disableShrink,
				style: sc || { animation: `${ac} 1.4s ease-in-out infinite` }
			},
			...t ? [{
				props: ({ ownerState: e }) => e.variant === "indeterminate" && !e.disableShrink,
				style: t
			}] : []
		]
	};
})), fc = Vo("circle", {
	name: "MuiCircularProgress",
	slot: "Track"
})(Ho(({ theme: e }) => ({
	stroke: "currentColor",
	opacity: (e.vars || e).palette.action.activatedOpacity
}))), pc = /*#__PURE__*/ O.forwardRef(function(e, t) {
	let n = Uo({
		props: e,
		name: "MuiCircularProgress"
	}), { className: r, color: i = "primary", disableShrink: a = !1, enableTrackSlot: o = !1, min: s, max: c, size: l = 40, style: u, thickness: d = 3.6, value: f = n.min ?? 0, variant: p = "indeterminate", ...m } = n, h = s ?? 0, g = c ?? 100, _ = {
		...n,
		color: i,
		disableShrink: a,
		size: l,
		thickness: d,
		value: f,
		variant: p,
		enableTrackSlot: o
	}, y = cc(_), b = {}, x = {}, S = {};
	if (p === "determinate") {
		let e = 2 * Math.PI * ((rc - d) / 2), t = g - h;
		b.strokeDasharray = e.toFixed(3), b.strokeDashoffset = t > 0 ? `${((g - f) / t * e).toFixed(3)}px` : `${e.toFixed(3)}px`, x.transform = "rotate(-90deg)", S["aria-valuenow"] = f, S["aria-valuemin"] = h, S["aria-valuemax"] = g;
	}
	return /*#__PURE__*/ (0, R.jsx)(lc, {
		className: v(y.root, r),
		style: {
			width: l,
			height: l,
			...x,
			...u
		},
		ownerState: _,
		ref: t,
		role: "progressbar",
		...S,
		...m,
		children: /*#__PURE__*/ (0, R.jsxs)(uc, {
			className: y.svg,
			ownerState: _,
			viewBox: `${rc / 2} ${rc / 2} ${rc} ${rc}`,
			children: [o ? /*#__PURE__*/ (0, R.jsx)(fc, {
				className: y.track,
				ownerState: _,
				cx: rc,
				cy: rc,
				r: (rc - d) / 2,
				fill: "none",
				strokeWidth: d,
				"aria-hidden": "true"
			}) : null, /*#__PURE__*/ (0, R.jsx)(dc, {
				className: y.circle,
				style: b,
				ownerState: _,
				cx: rc,
				cy: rc,
				r: (rc - d) / 2,
				fill: "none",
				strokeWidth: d
			})]
		})
	});
});
// node_modules/@mui/material/Button/buttonClasses.mjs
function mc(e) {
	return qr("MuiButton", e);
}
var hc = Jr("MuiButton", /* @__PURE__ */ "root.text.outlined.contained.disableElevation.focusVisible.disabled.colorInherit.colorPrimary.colorSecondary.colorSuccess.colorError.colorInfo.colorWarning.sizeMedium.sizeSmall.sizeLarge.fullWidth.startIcon.endIcon.icon.loading.loadingWrapper.loadingIconPlaceholder.loadingIndicator.loadingPositionCenter.loadingPositionStart.loadingPositionEnd".split(".")), gc = /*#__PURE__*/ O.createContext({}), _c = /*#__PURE__*/ O.createContext(void 0), vc = (e) => {
	let { color: t, disableElevation: n, fullWidth: r, size: i, variant: a, loading: o, loadingPosition: s, classes: c } = e, l = b({
		root: [
			"root",
			o && "loading",
			a,
			`size${ee(i)}`,
			`color${ee(t)}`,
			n && "disableElevation",
			r && "fullWidth",
			o && `loadingPosition${ee(s)}`
		],
		startIcon: ["icon", "startIcon"],
		endIcon: ["icon", "endIcon"],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, mc, c);
	return {
		...c,
		...l
	};
}, yc = [
	{
		props: { size: "small" },
		style: { "& > *:nth-of-type(1)": { fontSize: 18 } }
	},
	{
		props: { size: "medium" },
		style: { "& > *:nth-of-type(1)": { fontSize: 20 } }
	},
	{
		props: { size: "large" },
		style: { "& > *:nth-of-type(1)": { fontSize: 22 } }
	}
], bc = Vo(Zs, {
	shouldForwardProp: (e) => Bo(e) || e === "classes",
	name: "MuiButton",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[n.variant],
			t[`size${ee(n.size)}`],
			n.color === "inherit" && t.colorInherit,
			n.disableElevation && t.disableElevation,
			n.fullWidth && t.fullWidth,
			n.loading && t.loading
		];
	}
})(Ho(({ theme: e }) => {
	let t = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], n = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
	return {
		...e.typography.button,
		minWidth: 64,
		padding: "6px 16px",
		border: 0,
		borderRadius: (e.vars || e).shape.borderRadius,
		...Zo(e, [
			"background-color",
			"box-shadow",
			"border-color",
			"color"
		], { duration: e.transitions.duration.short }),
		"&:hover": { textDecoration: "none" },
		[`&.${hc.disabled}`]: { color: (e.vars || e).palette.action.disabled },
		variants: [
			{
				props: { variant: "contained" },
				style: {
					color: "var(--variant-containedColor)",
					backgroundColor: "var(--variant-containedBg)",
					boxShadow: (e.vars || e).shadows[2],
					"&:hover": {
						boxShadow: (e.vars || e).shadows[4],
						"@media (hover: none)": { boxShadow: (e.vars || e).shadows[2] }
					},
					"&:active": { boxShadow: (e.vars || e).shadows[8] },
					[`&.${hc.focusVisible}`]: {
						...e.focusVisible,
						boxShadow: e.focusVisible?.boxShadow ? `${(e.vars || e).shadows[6]}, ${e.focusVisible.boxShadow}` : (e.vars || e).shadows[6]
					},
					[`&.${hc.disabled}`]: {
						color: (e.vars || e).palette.action.disabled,
						boxShadow: (e.vars || e).shadows[0],
						backgroundColor: (e.vars || e).palette.action.disabledBackground
					}
				}
			},
			{
				props: { variant: "outlined" },
				style: {
					padding: "5px 15px",
					border: "1px solid currentColor",
					borderColor: "var(--variant-outlinedBorder, currentColor)",
					backgroundColor: "var(--variant-outlinedBg)",
					color: "var(--variant-outlinedColor)",
					[`&.${hc.disabled}`]: { border: `1px solid ${(e.vars || e).palette.action.disabledBackground}` }
				}
			},
			{
				props: { variant: "text" },
				style: {
					padding: "6px 8px",
					color: "var(--variant-textColor)",
					backgroundColor: "var(--variant-textBg)"
				}
			},
			...Object.entries(e.palette).filter(tc()).map(([t]) => ({
				props: { color: t },
				style: {
					"--variant-textColor": (e.vars || e).palette[t].main,
					"--variant-outlinedColor": (e.vars || e).palette[t].main,
					"--variant-outlinedBorder": e.alpha((e.vars || e).palette[t].main, .5),
					"--variant-containedColor": (e.vars || e).palette[t].contrastText,
					"--variant-containedBg": (e.vars || e).palette[t].main,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": (e.vars || e).palette[t].dark,
						"--variant-textBg": e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity),
						"--variant-outlinedBorder": (e.vars || e).palette[t].main,
						"--variant-outlinedBg": e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity)
					} }
				}
			})),
			{
				props: { color: "inherit" },
				style: {
					color: "inherit",
					borderColor: "currentColor",
					"--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedBg : t,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedHoverBg : n,
						"--variant-textBg": e.alpha((e.vars || e).palette.text.primary, (e.vars || e).palette.action.hoverOpacity),
						"--variant-outlinedBg": e.alpha((e.vars || e).palette.text.primary, (e.vars || e).palette.action.hoverOpacity)
					} }
				}
			},
			{
				props: {
					size: "small",
					variant: "text"
				},
				style: {
					padding: "4px 5px",
					fontSize: e.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "text"
				},
				style: {
					padding: "8px 11px",
					fontSize: e.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					padding: "3px 9px",
					fontSize: e.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "outlined"
				},
				style: {
					padding: "7px 21px",
					fontSize: e.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "contained"
				},
				style: {
					padding: "4px 10px",
					fontSize: e.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "contained"
				},
				style: {
					padding: "8px 22px",
					fontSize: e.typography.pxToRem(15)
				}
			},
			{
				props: { disableElevation: !0 },
				style: {
					boxShadow: "none",
					"&:hover": { boxShadow: "none" },
					[`&.${hc.focusVisible}`]: { boxShadow: e.focusVisible?.boxShadow ?? "none" },
					"&:active": { boxShadow: "none" },
					[`&.${hc.disabled}`]: { boxShadow: "none" }
				}
			},
			{
				props: { fullWidth: !0 },
				style: { width: "100%" }
			},
			{
				props: {
					loading: !0,
					loadingPosition: "center"
				},
				style: {
					...Zo(e, [
						"background-color",
						"box-shadow",
						"border-color"
					], { duration: e.transitions.duration.short }),
					[`&.${hc.loading}`]: { color: "transparent" }
				}
			}
		]
	};
})), xc = Vo("span", {
	name: "MuiButton",
	slot: "StartIcon",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.startIcon, n.loading && t.startIconLoadingStart];
	}
})(({ theme: e }) => ({
	display: "inherit",
	alignItems: "center",
	marginRight: 8,
	marginLeft: -4,
	"&::before": {
		content: "\"\\200b\"",
		width: 0,
		overflow: "hidden"
	},
	variants: [
		{
			props: { size: "small" },
			style: { marginLeft: -2 }
		},
		{
			props: {
				loadingPosition: "start",
				loading: !0
			},
			style: {
				...Zo(e, ["opacity"], { duration: e.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "start",
				loading: !0,
				fullWidth: !0
			},
			style: { marginRight: -8 }
		},
		...yc
	]
})), Sc = Vo("span", {
	name: "MuiButton",
	slot: "EndIcon",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.endIcon, n.loading && t.endIconLoadingEnd];
	}
})(({ theme: e }) => ({
	display: "inherit",
	marginRight: -4,
	marginLeft: 8,
	variants: [
		{
			props: { size: "small" },
			style: { marginRight: -2 }
		},
		{
			props: {
				loadingPosition: "end",
				loading: !0
			},
			style: {
				...Zo(e, ["opacity"], { duration: e.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "end",
				loading: !0,
				fullWidth: !0
			},
			style: { marginLeft: -8 }
		},
		...yc
	]
})), Cc = Vo("span", {
	name: "MuiButton",
	slot: "LoadingIndicator"
})(({ theme: e }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	variants: [
		{
			props: { loading: !0 },
			style: { display: "flex" }
		},
		{
			props: { loadingPosition: "start" },
			style: { left: 14 }
		},
		{
			props: {
				loadingPosition: "start",
				size: "small"
			},
			style: { left: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "start"
			},
			style: { left: 6 }
		},
		{
			props: { loadingPosition: "center" },
			style: {
				left: "50%",
				transform: "translate(-50%)",
				color: (e.vars || e).palette.action.disabled
			}
		},
		{
			props: { loadingPosition: "end" },
			style: { right: 14 }
		},
		{
			props: {
				loadingPosition: "end",
				size: "small"
			},
			style: { right: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "end"
			},
			style: { right: 6 }
		},
		{
			props: {
				loadingPosition: "start",
				fullWidth: !0
			},
			style: {
				position: "relative",
				left: -10
			}
		},
		{
			props: {
				loadingPosition: "end",
				fullWidth: !0
			},
			style: {
				position: "relative",
				right: -10
			}
		}
	]
})), wc = Vo("span", {
	name: "MuiButton",
	slot: "LoadingIconPlaceholder"
})({
	display: "inline-block",
	width: "1em",
	height: "1em"
}), Tc = /*#__PURE__*/ O.forwardRef(function(e, t) {
	let n = O.useContext(gc), r = O.useContext(_c), i = Uo({
		props: y(n, e),
		name: "MuiButton"
	}), { children: a, color: o = "primary", component: s = "button", className: c, disabled: l = !1, disableElevation: u = !1, disableFocusRipple: d = !1, endIcon: f, focusVisibleClassName: p, fullWidth: m = !1, id: h, loading: g = null, loadingIndicator: _, loadingPosition: b = "center", size: x = "medium", startIcon: S, type: C, variant: w = "text", ...ee } = i, te = ts(h), ne = _ ?? /*#__PURE__*/ (0, R.jsx)(pc, {
		"aria-labelledby": te,
		color: "inherit",
		size: 16
	}), T = {
		...i,
		color: o,
		component: s,
		disabled: l,
		disableElevation: u,
		disableFocusRipple: d,
		fullWidth: m,
		loading: g,
		loadingIndicator: ne,
		loadingPosition: b,
		size: x,
		type: C,
		variant: w
	}, re = vc(T), ie = (S || g && b === "start") && /*#__PURE__*/ (0, R.jsx)(xc, {
		className: re.startIcon,
		ownerState: T,
		children: S || /*#__PURE__*/ (0, R.jsx)(wc, {
			className: re.loadingIconPlaceholder,
			ownerState: T
		})
	}), ae = (f || g && b === "end") && /*#__PURE__*/ (0, R.jsx)(Sc, {
		className: re.endIcon,
		ownerState: T,
		children: f || /*#__PURE__*/ (0, R.jsx)(wc, {
			className: re.loadingIconPlaceholder,
			ownerState: T
		})
	}), oe = r || "", se = typeof g == "boolean" ? /*#__PURE__*/ (0, R.jsx)("span", {
		className: re.loadingWrapper,
		style: { display: "contents" },
		children: g && /*#__PURE__*/ (0, R.jsx)(Cc, {
			className: re.loadingIndicator,
			ownerState: T,
			children: ne
		})
	}) : null, { root: ce, ...le } = re;
	return /*#__PURE__*/ (0, R.jsxs)(bc, {
		ownerState: T,
		className: v(n.className, re.root, c, oe),
		component: s,
		disabled: l || g,
		focusRipple: !d,
		focusVisibleClassName: v(re.focusVisible, p),
		ref: t,
		internalNativeButton: !0,
		type: C,
		id: g ? te : h,
		...ee,
		classes: le,
		children: [
			ie,
			b !== "end" && se,
			a,
			b === "end" && se,
			ae
		]
	});
});
// node_modules/@mui/material/BottomNavigation/bottomNavigationClasses.mjs
function Ec(e) {
	return qr("MuiBottomNavigation", e);
}
Jr("MuiBottomNavigation", ["root"]);
// node_modules/@mui/material/BottomNavigation/BottomNavigation.mjs
var Dc = (e) => {
	let { classes: t } = e;
	return b({ root: ["root"] }, Ec, t);
}, Oc = Vo("div", {
	name: "MuiBottomNavigation",
	slot: "Root"
})(Ho(({ theme: e }) => ({
	display: "flex",
	justifyContent: "center",
	height: 56,
	backgroundColor: (e.vars || e).palette.background.paper
}))), kc = /*#__PURE__*/ O.forwardRef(function(e, t) {
	let n = Uo({
		props: e,
		name: "MuiBottomNavigation"
	}), { children: r, className: i, component: a = "div", onChange: o, showLabels: s = !1, value: c, ...l } = n, u = {
		...n,
		component: a,
		showLabels: s
	}, d = Dc(u);
	return /*#__PURE__*/ (0, R.jsx)(Oc, {
		as: a,
		className: v(d.root, i),
		ref: t,
		ownerState: u,
		...l,
		children: O.Children.map(r, (e, t) => {
			if (!/*#__PURE__*/ O.isValidElement(e)) return null;
			let n = e.props.value === void 0 ? t : e.props.value;
			return /*#__PURE__*/ O.cloneElement(e, {
				selected: n === c,
				showLabel: e.props.showLabel === void 0 ? s : e.props.showLabel,
				value: n,
				onChange: o
			});
		})
	});
});
// node_modules/@mui/material/BottomNavigationAction/bottomNavigationActionClasses.mjs
function Ac(e) {
	return qr("MuiBottomNavigationAction", e);
}
var jc = Jr("MuiBottomNavigationAction", [
	"root",
	"iconOnly",
	"selected",
	"label"
]);
// node_modules/@mui/utils/isHostComponent/isHostComponent.mjs
function Mc(e) {
	return typeof e == "string";
}
// node_modules/@mui/utils/appendOwnerState/appendOwnerState.mjs
function Nc(e, t, n) {
	return e === void 0 || Mc(e) ? t : {
		...t,
		ownerState: {
			...t.ownerState,
			...n
		}
	};
}
// node_modules/@mui/utils/resolveComponentProps/resolveComponentProps.mjs
function Pc(e, t, n) {
	return typeof e == "function" ? e(t, n) : e;
}
// node_modules/@mui/utils/extractEventHandlers/extractEventHandlers.mjs
function Fc(e) {
	if (e === void 0) return {};
	let t = {}, n = Object.keys(e);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		os(i, e[i]) && (t[i] = e[i]);
	}
	return t;
}
// node_modules/@mui/utils/omitEventHandlers/omitEventHandlers.mjs
function Ic(e) {
	if (e === void 0) return {};
	let t = {}, n = Object.keys(e);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		os(i, e[i]) || (t[i] = e[i]);
	}
	return t;
}
// node_modules/@mui/utils/mergeSlotProps/mergeSlotProps.mjs
function Lc(e) {
	let { getSlotProps: t, additionalProps: n, externalSlotProps: r, externalForwardedProps: i, className: a } = e;
	if (!t) {
		let e = v(n?.className, a, i?.className, r?.className), t = {
			...n,
			...i,
			...r
		};
		if (e.length > 0 && (t.className = e), n?.style || i?.style || r?.style) {
			let e = {
				...n?.style,
				...i?.style,
				...r?.style
			};
			Object.keys(e).length > 0 && (t.style = e);
		}
		return {
			props: t,
			internalRef: void 0
		};
	}
	let o = Fc({
		...i,
		...r
	}), s = Ic(r), c = Ic(i), l = t(o), u = v(l?.className, n?.className, a, i?.className, r?.className), d = {
		...l,
		...n,
		...c,
		...s
	};
	if (u.length > 0 && (d.className = u), l?.style || n?.style || i?.style || r?.style) {
		let e = {
			...l?.style,
			...n?.style,
			...i?.style,
			...r?.style
		};
		Object.keys(e).length > 0 && (d.style = e);
	}
	return {
		props: d,
		internalRef: l.ref
	};
}
// node_modules/@mui/material/utils/useSlot.mjs
function Rc(e, t) {
	let { className: n, elementType: r, ownerState: i, externalForwardedProps: a, internalForwardedProps: o, shouldForwardComponentProp: s = !1, ...c } = t, { component: l, slots: u = { [e]: void 0 }, slotProps: d = { [e]: void 0 }, ...f } = a, p = u[e] || r, m = Pc(d[e], i), { props: { component: h, ...g }, internalRef: _ } = Lc({
		className: n,
		...c,
		externalForwardedProps: e === "root" ? f : void 0,
		externalSlotProps: m
	}), v = is(_, m?.ref, t.ref), y = e === "root" ? h || l : h;
	return [p, Nc(p, {
		...e === "root" && !l && !u[e] && o,
		...e !== "root" && !u[e] && o,
		...g,
		...y && !s && { as: y },
		...y && s && { component: y },
		ref: v
	}, i)];
}
// node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.mjs
var zc = (e) => {
	let { classes: t, showLabel: n, selected: r } = e;
	return b({
		root: [
			"root",
			!n && !r && "iconOnly",
			r && "selected"
		],
		label: [
			"label",
			!n && !r && "iconOnly",
			r && "selected"
		]
	}, Ac, t);
}, Bc = Vo(Zs, {
	name: "MuiBottomNavigationAction",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, !n.showLabel && !n.selected && t.iconOnly];
	}
})(Ho(({ theme: e }) => ({
	...Zo(e, ["color", "padding-top"], { duration: e.transitions.duration.short }),
	padding: "0px 12px",
	minWidth: 80,
	maxWidth: 168,
	color: (e.vars || e).palette.text.secondary,
	flexDirection: "column",
	flex: "1",
	[`&.${jc.selected}`]: { color: (e.vars || e).palette.primary.main },
	...e.focusVisible && Ba(1),
	variants: [{
		props: ({ showLabel: e, selected: t }) => !e && !t,
		style: { paddingTop: 14 }
	}, {
		props: ({ showLabel: e, selected: t, label: n }) => !e && !t && !n,
		style: { paddingTop: 0 }
	}]
}))), Vc = Vo("span", {
	name: "MuiBottomNavigationAction",
	slot: "Label"
})(Ho(({ theme: e }) => ({
	fontFamily: e.typography.fontFamily,
	fontSize: e.typography.pxToRem(12),
	opacity: 1,
	...Zo(e, ["font-size", "opacity"], {
		duration: "0.2s",
		easing: "ease"
	}),
	transitionDelay: "0.1s",
	[`&.${jc.selected}`]: { fontSize: e.typography.pxToRem(14) },
	variants: [{
		props: ({ showLabel: e, selected: t }) => !e && !t,
		style: {
			opacity: 0,
			transitionDelay: "0s"
		}
	}]
}))), Hc = /*#__PURE__*/ O.forwardRef(function(e, t) {
	let n = Uo({
		props: e,
		name: "MuiBottomNavigationAction"
	}), { className: r, icon: i, label: a, onChange: o, onClick: s, selected: c, showLabel: l, value: u, slots: d = {}, slotProps: f = {}, ...p } = n, m = n, h = zc(m), g = (e) => {
		o && o(e, u), s && s(e);
	}, _ = {
		slots: d,
		slotProps: f
	}, [y, b] = Rc("root", {
		elementType: Bc,
		externalForwardedProps: {
			..._,
			...p
		},
		shouldForwardComponentProp: !0,
		ownerState: m,
		ref: t,
		className: v(h.root, r),
		additionalProps: {
			internalNativeButton: !0,
			focusRipple: !0
		},
		getSlotProps: (e) => ({
			...e,
			onClick: (t) => {
				e.onClick?.(t), g(t);
			}
		})
	}), [x, S] = Rc("label", {
		elementType: Vc,
		externalForwardedProps: _,
		ownerState: m,
		className: h.label
	});
	return /*#__PURE__*/ (0, R.jsxs)(y, {
		...b,
		children: [i, /*#__PURE__*/ (0, R.jsx)(x, {
			...S,
			children: a
		})]
	});
});
// node_modules/@mui/material/styles/ThemeProviderNoVars.mjs
function Uc({ theme: e, ...t }) {
	let n = "$$material" in e ? e[Lo] : void 0;
	return /*#__PURE__*/ (0, R.jsx)(Bi, {
		...t,
		themeId: n ? Lo : void 0,
		theme: n || e
	});
}
// node_modules/@mui/material/InitColorSchemeScript/InitColorSchemeScript.mjs
var Wc = {
	attribute: "data-mui-color-scheme",
	colorSchemeStorageKey: "mui-color-scheme",
	defaultLightColorScheme: "light",
	defaultDarkColorScheme: "dark",
	modeStorageKey: "mui-mode"
}, { CssVarsProvider: Gc, useColorScheme: Kc, getInitColorSchemeScript: qc } = ra({
	themeId: Lo,
	theme: () => Fo({ cssVariables: !0 }),
	colorSchemeStorageKey: Wc.colorSchemeStorageKey,
	modeStorageKey: Wc.modeStorageKey,
	defaultColorScheme: {
		light: Wc.defaultLightColorScheme,
		dark: Wc.defaultDarkColorScheme
	},
	resolveTheme: (e) => {
		let t = {
			...e,
			typography: Xa(e.palette, e.typography)
		};
		return t.unstable_sx = function(e) {
			return Ct({
				sx: e,
				theme: this
			});
		}, t;
	}
}), Jc = Gc;
// node_modules/@mui/material/styles/ThemeProvider.mjs
function Yc({ theme: e, ...t }) {
	let n = O.useMemo(() => {
		if (typeof e == "function") return e;
		let t = "$$material" in e ? e[Lo] : e;
		return "colorSchemes" in t ? null : "vars" in t ? e : {
			...e,
			vars: null
		};
	}, [e]);
	return n ? /*#__PURE__*/ (0, R.jsx)(Uc, {
		theme: n,
		...t
	}) : /*#__PURE__*/ (0, R.jsx)(Jc, {
		theme: e,
		...t
	});
}
// node_modules/marked/lib/marked.esm.js
var Xc = m(), Zc = g();
function Qc() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var $c = Qc();
function el(e) {
	$c = e;
}
var tl = { exec: () => null };
function nl(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function K(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(il.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var rl = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), il = {
	codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
	listInterruptsParagraph: /^ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	endingSpaceTabChar: /[ \t]$/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	leadingSpaceTab: /^[ \t]+/,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	blockquoteMarkerWhitespace: /^( {0,3}>)([ \t]+)/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\][ \t]+\S/,
	listReplaceTask: /^\[[ xX]\][ \t]+/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,
	numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: nl((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: nl((e) => RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: nl((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: nl((e) => RegExp(`^ {0,${e}}#{1,6}(?:\\s|$)`)),
	pedanticHeadingBeginRegex: nl((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: nl((e) => RegExp(`^ {0,${e}}(?:</?(?:${yl})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")),
	blockquoteBeginRegex: nl((e) => RegExp(`^ {0,${e}}>`)),
	nestedContainerMarkers: /^(?: {0,3}(?:(?:[*+-]|\d{1,9}[.)])[ \t]+|>[ \t]?))+/
}, al = /^(?:[ \t]*(?:\n|$))+/, ol = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, sl = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/, cl = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ll = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ul = / {0,3}(?:[*+-]|\d{1,9}[.)])/, dl = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/, fl = K(dl).replace(/bull/g, ul).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), pl = K(dl).replace(/bull/g, ul).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ml = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, hl = /^[^\n]+/, gl = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/, _l = K(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", gl).replace("title", /(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex(), vl = K(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, ul).getRegex(), yl = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", bl = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, xl = K("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", bl).replace("tag", yl).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Sl = (e) => K(ml).replace("hr", cl).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", yl).getRegex(), Cl = Sl(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), wl = Sl(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), Tl = {
	blockquote: K(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace("paragraph", wl).getRegex(),
	code: ol,
	def: _l,
	fences: sl,
	heading: ll,
	hr: cl,
	html: xl,
	lheading: fl,
	list: vl,
	newline: al,
	paragraph: Cl,
	table: tl,
	text: hl
}, El = K("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", cl).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", yl).getRegex(), Dl = {
	...Tl,
	lheading: pl,
	table: El,
	paragraph: K(ml).replace("hr", cl).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", El).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", yl).getRegex()
}, Ol = {
	...Tl,
	html: K("^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))").replace("comment", bl).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: tl,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: K(ml).replace("hr", cl).replace("heading", " *#{1,6} *[^\n]").replace("lheading", fl).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, kl = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Al = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, jl = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, Ml = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Nl = /[\p{P}\p{S}]/u, Pl = /[\s\p{P}\p{S}]/u, Fl = /[^\s\p{P}\p{S}]/u, Il = K(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Pl).getRegex(), Ll = /[\p{Pi}\p{Ps}"']/u, q = /(?!~)[\p{P}\p{S}]/u, Rl = /(?!~)[\s\p{P}\p{S}]/u, J = /(?:[^\s\p{P}\p{S}]|~)/u, Y = K(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", rl ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), X = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, zl = K(X, "u").replace(/punct/g, Nl).getRegex(), Bl = K(X, "u").replace(/punct/g, q).getRegex(), Vl = K(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, Ll).replace(/punct/g, Nl).getRegex(), Hl = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Ul = K(Hl, "gu").replace(/notPunctSpace/g, Fl).replace(/punctSpace/g, Pl).replace(/punct/g, Nl).getRegex(), Wl = K(Hl, "gu").replace(/notPunctSpace/g, J).replace(/punctSpace/g, Rl).replace(/punct/g, q).getRegex(), Gl = K("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Fl).replace(/punctSpace/g, Pl).replace(/punct/g, Nl).getRegex(), Kl = K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Fl).replace(/punctSpace/g, Pl).replace(/punct/g, Nl).getRegex(), ql = K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Fl).replace(/punctSpace/g, Pl).replace(/punct/g, Nl).getRegex(), Jl = K(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, Nl).getRegex(), Yl = K("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Fl).replace(/punctSpace/g, Pl).replace(/punct/g, Nl).getRegex(), Xl = K(/\\(punct)/, "gu").replace(/punct/g, Nl).getRegex(), Zl = K(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, Nl).getRegex(), Ql = K(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), $l = K(bl).replace("(?:-->|$)", "-->").getRegex(), eu = K("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", $l).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), tu = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, nu = K(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", tu).getRegex(), ru = K(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", nu).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex(), iu = K(/^!?\[(label)\]\[(ref)\]/).replace("label", nu).replace("ref", gl).getRegex(), au = K(/^!?\[(ref)\](?:\[\])?/).replace("ref", gl).getRegex(), ou = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, su = K(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", tu).getRegex(), cu = K("reflink|nolink(?!\\()", "g").replace("reflink", K(/^!?\[(label)\]\[(ref)\]/).replace("label", su).replace("ref", ou).getRegex()).replace("nolink", K(/^!?\[(ref)\](?:\[\])?/).replace("ref", ou).getRegex()).getRegex(), lu = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, uu = K(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), du = {
	_backpedal: tl,
	anyPunctuation: Xl,
	anyPunctuationOutsideCode: Zl,
	autolink: Ql,
	blockSkip: Y,
	br: jl,
	code: Al,
	del: tl,
	delLDelim: tl,
	delRDelim: tl,
	emStrongLDelim: zl,
	emStrongRDelimAst: Ul,
	emStrongRDelimUnd: Kl,
	escape: kl,
	link: ru,
	nolink: au,
	punctuation: Il,
	reflink: iu,
	reflinkSearch: cu,
	tag: eu,
	text: Ml,
	url: tl
}, fu = {
	...du,
	emStrongLDelim: Vl,
	emStrongRDelimAst: Gl,
	emStrongRDelimUnd: ql,
	link: K(/^!?\[(label)\]\((.*?)\)/).replace("label", nu).getRegex(),
	reflink: K(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", nu).getRegex()
}, pu = {
	...du,
	emStrongRDelimAst: Wl,
	emStrongLDelim: Bl,
	delLDelim: Jl,
	delRDelim: Yl,
	url: K(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", uu).replace("protocol", lu).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: K(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", lu).replace(/emailProtocol/g, /(?:mailto|xmpp):/).replace("wwwStart", rl ? "(?<![^\\s*_~(])www\\." : "www\\.").getRegex()
}, mu = {
	...pu,
	br: K(jl).replace("{2,}", "*").getRegex(),
	text: K(pu.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, hu = {
	normal: Tl,
	gfm: Dl,
	pedantic: Ol
}, gu = {
	normal: du,
	gfm: pu,
	breaks: mu,
	pedantic: fu
}, _u = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, vu = (e) => _u[e];
function yu(e, t) {
	if (t) {
		if (il.escapeTest.test(e)) return e.replace(il.escapeReplace, vu);
	} else if (il.escapeTestNoEncode.test(e)) return e.replace(il.escapeReplaceNoEncode, vu);
	return e;
}
function bu(e) {
	return il.numericCharacterReference.test(e) ? e.replace(il.numericCharacterReferenceOrAmpersand, (e, t, n) => {
		if (t === void 0 && n === void 0) return "&amp;";
		let r = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return r === 0 || r > 1114111 || r >= 55296 && r <= 57343 ? "�" : r === 38 ? "&amp;" : String.fromCodePoint(r);
	}) : e;
}
function xu(e) {
	try {
		e = encodeURI(e).replace(il.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function Su(e, t) {
	let n = e.replace(il.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(il.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(il.slashPipe, "|");
	return n;
}
function Cu(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function wu(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && il.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function Tu(e) {
	return e.trim().replace(il.multipleSpaceGlobal, " ").toLowerCase().toUpperCase().toLowerCase();
}
function Eu(e, t) {
	if (e.indexOf(t[0]) === -1 && e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
var Du = /* @__PURE__ */ new WeakMap();
function Ou(e) {
	let t = {
		"*": -1,
		_: -1
	}, n = -1, r = e.length;
	for (let i = 0; i < r; i++) {
		let a = e[i];
		if (a !== "*" && a !== "_" && a !== "~") continue;
		let o = i === 0 ? "\n" : e[i - 1], s = i + 1;
		for (; s < r && e[s] === a;) s++;
		o !== " " && o !== "	" && o !== "\n" && o !== "\r" && o !== "\f" && (a === "~" ? n = i : t[a] = i), i = s - 1;
	}
	return {
		maskedSrc: e,
		lastPossibleEmStrongCloserIndex: t,
		lastPossibleDelCloserIndex: n
	};
}
function ku(e, t) {
	let n = Ou(t), r = Du.get(e);
	r ? r.push(n) : Du.set(e, [n]);
}
function Au(e) {
	let t = Du.get(e);
	t && (t.pop(), t.length === 0 && Du.delete(e));
}
function ju(e, t, n) {
	let r = Du.get(e)?.at(-1);
	return r && r.maskedSrc === t ? r.lastPossibleEmStrongCloserIndex[n] : Ou(t).lastPossibleEmStrongCloserIndex[n];
}
function Mu(e, t) {
	let n = Du.get(e)?.at(-1);
	return n && n.maskedSrc === t ? n.lastPossibleDelCloserIndex : Ou(t).lastPossibleDelCloserIndex;
}
function Nu(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function Pu(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1"), c = e[0].charAt(0) === "!", l = r.state.inLink, u = r.state.linkEmitted, d = r.state.inRawBlock;
	r.state.inLink = !0, r.state.linkEmitted = !1;
	let f = r.inlineTokens(s), p = r.state.linkEmitted;
	if (r.state.linkEmitted = u, r.state.inLink = l, !c) {
		if (p) {
			r.state.inRawBlock = d;
			return;
		}
		r.state.linkEmitted = !0;
	}
	return {
		type: c ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: f
	};
}
function Fu(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return e.slice(Math.min(r.length, i.length));
	}).join("\n");
}
function Iu(e, t, n, r) {
	if (!t.includes("<")) return !1;
	for (let i = 0; i < t.length; i++) {
		if (t[i] === "\\") {
			i++;
			continue;
		}
		if (t[i] === "`") {
			let e = r.inline.code.exec(t.slice(i));
			if (e) {
				i += e[0].length - 1;
				continue;
			}
		}
		if (t[i] !== "<") continue;
		let a = e.slice(n + i), o = r.inline.tag.exec(a) || r.inline.autolink.exec(a);
		if (o) {
			if (o[0].length > t.length - i) return !0;
			i += o[0].length - 1;
		}
	}
	return !1;
}
var Lu = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || $c;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = this.options.pedantic ? t[0] : wu(t[0]);
			return {
				type: "code",
				raw: e,
				codeBlockStyle: "indented",
				text: e.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = Fu(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = Cu(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceTabChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: Cu(t[0], "\n"),
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: Cu(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = Cu(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o = 0;
				for (; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteMarkerWhitespace, (e, t, n) => t + Nu(n, t.length)).replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code" || u?.type === "heading" || u?.type === "hr" || u?.type === "html" || u?.type === "table") break;
				if (u?.type === "blockquote") {
					let t = u, a = e.join("\n"), o = t.raw + "\n" + a.replace(this.rules.other.blockquoteSetextReplace2, ""), s = this.blockquote(o);
					i[i.length - 1] = s;
					let c = o.substring(s.raw.length).replace(/^\n/, ""), l = c ? c.split("\n").length : 0, d = l ? e.slice(0, -l) : e;
					if (d.length > 0 && (n = `${n}
${d.join("\n")}`), r = r.substring(0, r.length - t.text.length) + s.text, e = e.slice(d.length), e.length > 0 && this.rules.other.blockquoteStart.test(e[0])) continue;
					break;
				}
				if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o;
					let s = o.raw.length > t.raw.length ? a.slice(t.raw.length + 1, o.raw.length).split("\n").length : 0;
					if (s > 0) {
						let t = e.slice(0, s).join("\n");
						n = `${n}
${t}`, r = `${r}
${t}`;
					}
					e = e.slice(s);
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			if (!this.options.pedantic && this.lexer.state.lastToken?.type === "text" && !this.rules.other.listInterruptsParagraph.test(e)) return;
			let n = e, r = () => n.length - e.length, i = t[1].trim(), a = i.length > 1, o = {
				type: "list",
				raw: "",
				ordered: a,
				start: a ? +i.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			i = a ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = a ? i : "[*+-]");
			let s = this.rules.other.listItemRegex(i), c = !1;
			for (; e;) {
				let i = !1, a = "";
				if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
				let l = r();
				e = e.substring(t[0].length);
				let u = t[2].split("\n", 1)[0], d = t[1].length, f = this.options.pedantic ? Nu(u, d) : u.replace(this.rules.other.leadingSpaceTab, (e) => Nu(e, d)), p = e.split("\n", 1)[0], m = !f.trim(), h = 0;
				if (this.options.pedantic ? (h = 2, a = f.trimStart()) : m ? h = d + 1 : (h = f.search(this.rules.other.nonSpaceChar), h = h > 4 ? 1 : h, a = f.slice(h), h += d), m && this.rules.other.blankLine.test(p) && (e = e.substring(p.length + 1), i = !0), !i) {
					let t = this.rules.other.nextBulletRegex(h), n = this.rules.other.hrRegex(h), r = this.rules.other.fencesBeginRegex(h), i = this.options.pedantic ? this.rules.other.pedanticHeadingBeginRegex(h) : this.rules.other.headingBeginRegex(h), o = this.rules.other.htmlBeginRegex(h), s = this.rules.other.blockquoteBeginRegex(h), c = !1;
					for (; e;) {
						let l = e.split("\n", 1)[0], u;
						if (p = l, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), u = p) : u = p.replace(this.rules.other.leadingSpaceTab, (e) => Nu(e)), r.test(p) || i.test(p) || o.test(p) || s.test(p) || t.test(p) || n.test(p)) break;
						if (u.search(this.rules.other.nonSpaceChar) >= h || !p.trim()) a += "\n" + u.slice(h), c = !1;
						else {
							if (m || f.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || r.test(f) || i.test(f) || o.test(f) || n.test(f)) break;
							if (!this.options.pedantic && !c) {
								let e = f.replace(this.rules.other.nestedContainerMarkers, "");
								if (this.rules.block.fences.test(e) || this.rules.block.heading.test(e) || this.rules.block.hr.test(e)) break;
							}
							let e = !this.options.pedantic && /^ {0,3}(?:=+|-+) *$/.test(p) && this.rules.block.lheading.test(`${f}
${p}`) ? `    ${u.replace(/^ {0,3}/, "")}` : p;
							a += "\n" + e, c = !0;
						}
						m = !p.trim(), e = e.substring(l.length + 1), f = u.slice(h);
					}
				}
				let g = n.slice(l, r());
				o.loose || (c ? o.loose = !0 : this.rules.other.doubleBlankLine.test(g) && (c = !0)), o.items.push({
					type: "list_item",
					raw: g,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(a),
					loose: !1,
					text: a,
					tokens: []
				});
			}
			let l = o.items.at(-1);
			if (l) l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
			else return;
			o.raw = n.slice(0, r()).trimEnd();
			for (let e of o.items) if (this.lexer.state.top = !1, e.tokens = this.lexer.blockTokens(e.text, []), !o.loose) {
				let t = e.tokens.filter((e) => e.type === "space");
				o.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
			}
			for (let e of o.items) {
				let t = e.tokens[0];
				if (e.task && (t?.type === "text" || t?.type === "paragraph")) {
					e.text = e.text.replace(this.rules.other.listReplaceTask, ""), t.raw = t.raw.replace(this.rules.other.listReplaceTask, ""), t.text = t.text.replace(this.rules.other.listReplaceTask, "");
					for (let e = this.lexer.inlineQueue.length - 1; e >= 0; e--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)) {
						this.lexer.inlineQueue[e].src = this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let n = this.rules.other.listTaskCheckbox.exec(e.raw);
					if (n) {
						let t = {
							type: "checkbox",
							raw: n[0] + " ",
							checked: n[0] !== "[ ]"
						};
						e.checked = t.checked, o.loose ? e.tokens[0] && ["paragraph", "text"].includes(e.tokens[0].type) && "tokens" in e.tokens[0] && e.tokens[0].tokens ? (e.tokens[0].raw = t.raw + e.tokens[0].raw, e.tokens[0].text = t.raw + e.tokens[0].text, e.tokens[0].tokens.unshift(t)) : e.tokens.unshift({
							type: "paragraph",
							raw: t.raw,
							text: t.raw,
							tokens: [t]
						}) : e.tokens.unshift(t);
					}
				} else e.task &&= !1;
			}
			if (o.loose) for (let e of o.items) {
				e.loose = !0;
				for (let t of e.tokens) t.type === "text" && (t.type = "paragraph");
			}
			return o;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let e = wu(t[0]);
			return {
				type: "html",
				block: !0,
				raw: e,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: e
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			if (!this.rules.other.startAngleBracket.test(t[2]) && Eu(t[2], "()") !== -1) return;
			let e = Tu(t[1]), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: Cu(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = Su(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: Cu(t[0], "\n"),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push(Su(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let e = t[1].trim();
			return {
				type: "heading",
				raw: Cu(t[0], "\n"),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		if (this.lexer.state.linkParenPossible === !1) return;
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let n = t[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && Iu(e, t[1], n, this.rules)) return;
			let r = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
				if (!this.rules.other.endAngleBracket.test(r)) return;
				let e = Cu(r.slice(0, -1), "\\");
				if ((r.length - e.length) % 2 == 0) return;
			} else {
				let e = Eu(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let i = Cu(t[0].slice(0, -1), "\\");
			if ((t[0].length - i.length) % 2 == 0) return;
			let a = t[2], o = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(a);
				e && (a = e[1], o = e[3]);
			} else o = t[3] ? t[3].slice(1, -1) : "";
			return a = a.trim(), this.rules.other.startAngleBracket.test(a) && (a = this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? a.slice(1) : a.slice(1, -1)), Pu(t, {
				href: a && a.replace(this.rules.inline.anyPunctuation, "$1"),
				title: o && o.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let r = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && Iu(e, n[1], r, this.rules)) return;
			let i = t[Tu(n[2] || n[1])];
			if (!i) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return Pu(n, i, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!r || !r[1] && !r[2] && !r[3] && !r[4]) return;
		let i = r[0][0], a = n === i, o = t.length - e.length, s = o;
		for (; !this.options.pedantic && s > 0 && t[s - 1] === i;) s--;
		let c = [...t.slice(Math.max(0, s - 2), s)].at(-1) ?? "", l = c === "*" || c === "_" || !!this.rules.inline.punctuation.exec(c);
		s < o && (n = c);
		let u = s < o ? l : n === "*" || n === "_" || !!this.rules.inline.punctuation.exec(n);
		if (r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
		let d = r[1] || r[3] || "";
		if (!d || !n || u) {
			let n = [...r[0]].length - 1, u, f, p = n, m = 0, h = o - s + n, g = !this.options.pedantic && !!c.trim() && (!!d || i === "*" && !l);
			if (i !== "*" && i !== "_") return;
			let _ = i === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd, v = ju(this, t, i), y = t.length - e.length + n;
			if (v < y) return;
			t = t.slice(-1 * e.length + n);
			let b = v - y;
			for (_.lastIndex = 0; (r = _.exec(t)) !== null && !(r.index > b);) {
				if (u = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !u) continue;
				if (f = [...u].length, r[3] || r[4]) {
					p += f;
					continue;
				}
				if (r[5] || r[6] || g) {
					if (a && (r[5] || r[6])) break;
					if (h % 3 && !((h + f) % 3)) {
						m += f;
						continue;
					}
				}
				if (p -= f, p > 0) continue;
				f = Math.min(f, f + p + m);
				let t = [...r[0]][0].length, i = e.slice(0, n + r.index + t + f);
				if (Math.min(n, f) % 2) {
					let e = i.slice(1, -1);
					return {
						type: "em",
						raw: i,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let o = i.slice(2, -2);
				return {
					type: "strong",
					raw: i,
					text: o,
					tokens: this.lexer.inlineTokens(o)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let r = this.rules.inline.delLDelim.exec(e);
		if (r && (!r[1] || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = this.rules.inline.delRDelim, c = Mu(this, t), l = t.length - e.length + n;
			if (c < l) return;
			t = t.slice(-1 * e.length + n);
			let u = c - l;
			for (s.lastIndex = 0; (r = s.exec(t)) !== null && !(r.index > u);) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i || (a = [...i].length, a !== n)) continue;
				if (r[3] || r[4]) {
					o += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o);
				let t = [...r[0]][0].length, s = e.slice(0, n + r.index + t + a), c = s.slice(n, -n);
				return {
					type: "del",
					raw: s,
					text: c,
					tokens: this.lexer.inlineTokens(c)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: e ? t[0] : bu(t[0]),
				escaped: e
			};
		}
	}
}, Ru = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || $c, this.options.tokenizer = this.options.tokenizer || new Lu(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			linkParenPossible: !0,
			top: !0
		};
		let t = {
			other: il,
			block: hu.normal,
			inline: gu.normal
		};
		this.options.pedantic ? (t.block = hu.pedantic, t.inline = gu.pedantic) : this.options.gfm && (t.block = hu.gfm, t.inline = this.options.breaks ? gu.breaks : gu.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: hu,
			inline: gu
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(il.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.state.inRawBlock = !1, this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this;
		let r = this.state.lastToken;
		this.options.pedantic && (e = e.replace(il.tabCharGlobal, "    ").replace(il.spaceLine, ""));
		let i = 1 / 0;
		for (; e;) {
			if (e.length < i) i = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			this.state.lastToken = t.at(-1);
			let r;
			if (this.options.extensions?.block?.some((n) => (r = n.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
			if (r = this.tokenizer.space(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				r.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(r);
				continue;
			}
			if (r = this.tokenizer.code(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + r.raw, n.text += "\n" + r.text, this.inlineQueue.at(-1).src = n.text) : t.push(r);
				continue;
			}
			if ((r = this.tokenizer.fences(e)) || (r = this.tokenizer.heading(e)) || (r = this.tokenizer.hr(e)) || (r = this.tokenizer.blockquote(e)) || (r = this.tokenizer.list(e)) || (r = this.tokenizer.html(e))) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.def(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + r.raw, n.text += "\n" + r.raw, this.inlineQueue.at(-1).src = n.text) : (this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
					href: r.href,
					title: r.title
				}), t.push(r));
				continue;
			}
			if ((r = this.tokenizer.table(e)) || (r = this.tokenizer.lheading(e))) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startBlock) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (a = e.substring(0, t + 1));
			}
			if (this.state.top && (r = this.tokenizer.paragraph(a))) {
				let i = t.at(-1);
				n && i?.type === "paragraph" ? (i.raw += (i.raw.endsWith("\n") ? "" : "\n") + r.raw, i.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : t.push(r), n = a.length !== e.length, e = e.substring(r.raw.length);
			} else if (r = this.tokenizer.text(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + r.raw, n.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(r);
			} else if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, this.state.lastToken = r, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	linkInText(e) {
		if (!e.includes("[")) return !1;
		let t = this.tokenizer.rules.inline.link;
		for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
		for (let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
			let e = t[0], n = e.lastIndexOf("[");
			if (e.charAt(0) !== "!" && Object.hasOwn(this.tokens.links, Tu(e.slice(n + 1, -1))) && !(n > 1 && this.linkInText(e.slice(1, n - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = this.state.linkParenPossible;
		this.state.linkParenPossible = n && e.includes(")");
		try {
			return this.#e(e, t);
		} finally {
			this.state.linkParenPossible = n;
		}
	}
	#e(e, t) {
		let n = e.includes("*") || e.includes("_") || e.includes("~") || this.options.hooks?.emStrongMask || this.tokenizer.emStrong !== Lu.prototype.emStrong || this.tokenizer.del !== Lu.prototype.del ? this.#r(e) : e;
		ku(this.tokenizer, n);
		try {
			return this.#t(e, n, t);
		} finally {
			Au(this.tokenizer);
		}
	}
	#t(e, t, n) {
		let r = !1, i = "", a = 1 / 0;
		for (; e;) {
			if (e.length < a) a = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			r || (i = ""), r = !1;
			let o;
			if (this.options.extensions?.inline?.some((t) => (o = t.call({ lexer: this }, e, n)) ? (e = e.substring(o.raw.length), n.push(o), !0) : !1)) continue;
			if ((o = this.tokenizer.escape(e)) || (o = this.tokenizer.tag(e)) || (o = this.tokenizer.link(e))) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(o.raw.length);
				let t = n.at(-1);
				o.type === "text" && t?.type === "text" ? (t.raw += o.raw, t.text += o.text) : n.push(o);
				continue;
			}
			if ((o = this.tokenizer.emStrong(e, t, i)) || (o = this.tokenizer.codespan(e)) || (o = this.tokenizer.br(e)) || (o = this.tokenizer.del(e, t, i)) || (o = this.tokenizer.autolink(e)) || !this.state.inLink && (o = this.tokenizer.url(e))) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			let s = e;
			if (this.options.extensions?.startInline) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
			}
			if (o = this.tokenizer.inlineText(s)) {
				e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (i = o.raw.slice(-1)), r = !0;
				let t = n.at(-1);
				t?.type === "text" ? (t.raw += o.raw, t.text += o.text) : n.push(o);
			} else if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return n;
	}
	#n(e) {
		let { blockSkip: t, tag: n, autolink: r } = this.tokenizer.rules.inline, i = "", a = 0, o;
		for (t.lastIndex = 0; o = t.exec(e);) {
			let s = o.index + (o[2] ? o[2].length : 0), c = o.index + o[0].length;
			if (e.charAt(s) === "<") {
				let i = e.slice(s), a = n.exec(i) || r.exec(i);
				if (!a) {
					t.lastIndex = s + 1;
					continue;
				}
				c = s + a[0].length, t.lastIndex = c;
			}
			i += e.slice(a, s) + "[" + "a".repeat(c - s - 2) + "]", a = c;
		}
		return i + e.slice(a);
	}
	#r(e) {
		let t = e;
		if (this.tokens.links && e.includes("[")) {
			let e = this.tokenizer.rules.inline.reflinkSearch, n = (t) => {
				let r = t.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, Tu(t.slice(r + 1, -1)))) return t;
				if (r > 1 && t.charAt(0) !== "!") {
					let i = t.slice(1, r - 1);
					if (this.linkInText(i)) return "[" + i.replace(e, n) + "][" + "a".repeat(t.length - r - 2) + "]";
				}
				return "[" + "a".repeat(t.length - 2) + "]";
			};
			t = t.replace(e, n);
		}
		return t = t.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (e, t, n) => n ? "+".repeat(e.length) : t ? t + e.slice(t.length, -t.length).replace(/`/g, "+") + t : e), t = this.#n(t), t = this.options.hooks?.emStrongMask?.call({ lexer: this }, t) ?? t, t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw Error(t);
	}
}, zu = class {
	options;
	parser;
	constructor(e) {
		this.options = e || $c;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(il.notSpaceStart)?.[0], i = e ? e.replace(il.endingNewline, "") + "\n" : "";
		return r ? "<pre><code class=\"language-" + yu(r) + "\">" + (n ? i : yu(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : yu(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r &&= `<tbody>${r}</tbody>`, "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${yu(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: r, autolink: i }) {
		let a = i ? yu(n, !0) : this.parser.parseInline(r), o = xu(e);
		if (o === null) return a;
		e = yu(o, i);
		let s = "<a href=\"" + e + "\"";
		return t && (s += " title=\"" + yu(t) + "\""), s += ">" + a + "</a>", s;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = xu(e);
		if (i === null) return yu(n);
		e = i;
		let a = `<img src="${yu(e)}" alt="${yu(n)}"`;
		return t && (a += ` title="${yu(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : yu(e.text);
	}
}, Bu = class {
	parser;
	strong({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	em({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	image({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	br() {
		return "\n";
	}
	checkbox({ raw: e }) {
		return e;
	}
}, Vu = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || $c, this.options.renderer = this.options.renderer || new zu(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Bu(), this.textRenderer.parser = this;
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (this.options.extensions?.renderers?.[r.type]) {
				let e = r, n = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (n !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					t += n === !1 ? "" : n ?? "";
					continue;
				}
			}
			let i = r;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e === !1 ? "" : e ?? "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "checkbox":
					n += t.checkbox(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, Hu = class {
	options;
	block;
	constructor(e) {
		this.options = e || $c;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? Ru.lex : Ru.lexInline;
	}
	provideParser(e = this.block) {
		return e ? Vu.parse : Vu.parseInline;
	}
};
function Uu(e, t) {
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e.push(t[n]);
	else e.push(t);
}
var Wu = new class {
	defaults = Qc();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = Vu;
	Renderer = zu;
	TextRenderer = Bu;
	Lexer = Ru;
	Tokenizer = Lu;
	Hooks = Hu;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (Uu(n, t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) Uu(n, this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) Uu(n, this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				Uu(n, this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					Uu(n, this.walkTokens(i, t));
				}) : e.tokens && Uu(n, this.walkTokens(e.tokens, t));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: Object.create(null),
			childTokens: Object.create(null)
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new zu(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n === !1 ? "" : n ?? "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new Lu(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new Hu();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = Hu.passThroughHooks.has(n) ? (e) => {
						if (t.options.async && Hu.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : (...e) => {
						if (t.options.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return Uu(n, r.call(this, e)), t && Uu(n, t.call(this, e)), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return Ru.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return Vu.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? Ru.lex : Ru.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? Vu.parse : Vu.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? Ru.lex : Ru.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? Vu.parse : Vu.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + yu(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function Z(e, t) {
	return Wu.parse(e, t);
}
Z.options = Z.setOptions = function(e) {
	return Wu.setOptions(e), Z.defaults = Wu.defaults, el(Z.defaults), Z;
}, Z.getDefaults = Qc, Z.defaults = $c;
function Gu(...e) {
	return Wu.use(...e), Z.defaults = Wu.defaults, el(Z.defaults), Z;
}
Z.use = Gu, Z.walkTokens = function(e, t) {
	return Wu.walkTokens(e, t);
}, Z.parseInline = Wu.parseInline, Z.Parser = Vu, Z.parser = Vu.parse, Z.Renderer = zu, Z.TextRenderer = Bu, Z.Lexer = Ru, Z.lexer = Ru.lex, Z.Tokenizer = Lu, Z.Hooks = Hu, Z.parse = Z, Z.options, Z.setOptions, Z.walkTokens, Z.parseInline, Vu.parse, Ru.lex;
// node_modules/dompurify/dist/purify.es.mjs
function Ku(e, t) {
	this.v = e, this.k = t;
}
function qu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Ju(e) {
	if (Array.isArray(e)) return e;
}
function Yu(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Xu() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Zu(e, t) {
	return Ju(e) || Yu(e, t) || Qu(e, t) || Xu();
}
function Qu(e, t) {
	if (e) {
		if (typeof e == "string") return qu(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? qu(e, t) : void 0;
	}
}
function $u(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof Ku;
			Promise.resolve(s ? o.v : o).then(function(n) {
				if (s) {
					var c = t === "return" && o.k ? t : "next";
					if (!o.k || n.done) return r(c, n);
					n = e[c](n).value;
				}
				i(!!a.done, n);
			}, function(e) {
				r("throw", e);
			});
		} catch (e) {
			i(2, e);
		}
	}
	function i(e, i) {
		e === 2 ? t.reject(i) : t.resolve({
			value: i,
			done: e
		}), (t = t.next) ? r(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, i) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: i,
				resolve: a,
				reject: o,
				next: null
			};
			n ? n = n.next = s : (t = n = s, r(e, i));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
$u.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, $u.prototype.next = function(e) {
	return this._invoke("next", e);
}, $u.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, $u.prototype.return = function(e) {
	return this._invoke("return", e);
};
var ed = Object.entries, td = Object.keys, nd = Object.setPrototypeOf, rd = Object.isFrozen, id = Object.getPrototypeOf, ad = Object.getOwnPropertyDescriptor, od = Object.freeze, sd = Object.seal, cd = Object.create, ld = typeof Reflect < "u" && Reflect, ud = ld.apply, dd = ld.construct;
od ||= function(e) {
	return e;
}, sd ||= function(e) {
	return e;
}, ud ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, dd ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var fd = Id(Array.prototype.forEach), pd = Id(Array.prototype.lastIndexOf), md = Id(Array.prototype.pop), hd = Id(Array.prototype.push), gd = Id(Array.prototype.slice), _d = Id(Array.prototype.splice), vd = Array.isArray, yd = Ld(Set), Q = Id(Set.prototype.add), bd = Id(Set.prototype.has), xd = Id(String.prototype.toLowerCase), Sd = Id(String.prototype.toString), Cd = Id(String.prototype.match), wd = Id(String.prototype.replace), Td = Id(String.prototype.indexOf), Ed = Id(String.prototype.trim), Dd = Id(Number.prototype.toString), Od = Id(Boolean.prototype.toString), kd = typeof BigInt > "u" ? null : Id(BigInt.prototype.toString), Ad = typeof Symbol > "u" ? null : Id(Symbol.prototype.toString), jd = Id(Object.prototype.hasOwnProperty), Md = Id(Object.prototype.toString), Nd = RegExp.prototype.test, Pd = function(e, t) {
	return e instanceof RegExp && (e.lastIndex = 0), ud(Nd, e, [t]);
}, Fd = Ld(TypeError);
function Id(e) {
	return function(t) {
		var n = [...arguments].slice(1);
		return ud(e, t, n);
	};
}
function Ld(e) {
	return function() {
		return dd(e, [...arguments]);
	};
}
function $(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : xd;
	if (nd && nd(e, null), !vd(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (rd(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function Rd(e) {
	for (let t = 0; t < e.length; t++) jd(e, t) || (e[t] = null);
	return e;
}
function zd(e) {
	let t = cd(null);
	for (let r of ed(e)) {
		var n = Zu(r, 2);
		let i = n[0], a = n[1];
		jd(e, i) && (t[i] = vd(a) ? Rd(a) : a && typeof a == "object" && a.constructor === Object ? zd(a) : a);
	}
	return t;
}
function Bd(e) {
	let t = cd(null), n = td(e), r = n.length;
	for (; r--;) t[n[r]] = e[n[r]];
	return t;
}
function Vd(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return Dd(e);
		case "boolean": return Od(e);
		case "bigint": return kd ? kd(e) : "0";
		case "symbol": return Ad ? Ad(e) : "Symbol()";
		case "undefined": return Md(e);
		case "function":
		case "object": {
			if (e === null) return Md(e);
			let t = e, n = Hd(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : Md(e);
			}
			return Md(e);
		}
		default: return Md(e);
	}
}
function Hd(e, t) {
	for (; e !== null;) {
		let n = ad(e, t);
		if (n) {
			if (n.get) return Id(n.get);
			if (typeof n.value == "function") return Id(n.value);
		}
		e = id(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Ud(e, t) {
	for (; e !== null;) {
		let n = ad(e, t);
		if (n) return n.get ? Id(n.get) : null;
		e = id(e);
	}
	return null;
}
function Wd(e) {
	if (!e) return !1;
	try {
		return Pd(e, ""), !0;
	} catch {
		return !1;
	}
}
var Gd = od(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), Kd = od(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.filter.font.g.glyph.glyphref.hkern.image.line.lineargradient.marker.mask.metadata.mpath.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), qd = od([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), Jd = od([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), Yd = od(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), Xd = od([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), Zd = od(["#text"]), Qd = od(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), $d = od(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), ef = od(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), tf = od([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), nf = sd(/{{[\w\W]*|^[\w\W]*}}/g), rf = sd(/<%[\w\W]*|^[\w\W]*%>/g), af = sd(/\${[\w\W]*/g), of = sd(/{{|}}|\${|<%|%>|&lt;%|%&gt;/), sf = sd(/^data-[\-\w.\u00B7-\uFFFF]+$/), cf = sd(/^aria-[\-\w]+$/), lf = sd(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), uf = sd(/^(?:\w+script|data):/i), df = sd(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), ff = sd(/^html$/i), pf = sd(/^[a-z][.\w]*(-[.\w]+)+$/i), mf = sd(/<[/\w!]/g), hf = sd(/<[/\w]/g), gf = sd(/<\/no(script|embed|frames)/i), _f = sd(/\/>/i), vf = sd(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i), yf = sd(/^[\r\n\t ]+/), bf = {
	element: 1,
	text: 3,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentFragment: 11
}, xf = od($({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
])), Sf = function() {
	return typeof window > "u" ? null : window;
}, Cf = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, wf = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, Tf = function(e, t, n, r) {
	return jd(e, t) && vd(e[t]) ? $(r.base ? Bd(r.base) : {}, e[t], r.transform) : n;
}, Ef = function(e, t, n) {
	let r = jd(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? zd(r) : n;
};
function Df() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Sf(), t = (e) => Df(e);
	if (t.version = "3.4.18", t.removed = [], !e || !e.document || e.document.nodeType !== bf.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript, a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter, l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = Hd(d, "cloneNode"), p = Hd(d, "remove"), m = Hd(d, "removeAttributeNode"), h = Hd(d, "nextSibling"), g = Hd(d, "childNodes"), _ = Hd(d, "parentNode"), v = Hd(d, "shadowRoot"), y = Hd(d, "attributes"), b = o && o.prototype ? Hd(o.prototype, "nodeType") : null, x = o && o.prototype ? Hd(o.prototype, "nodeName") : null, S = o && o.prototype ? Hd(o.prototype, "ownerDocument") : null, C = function(e) {
		return b ? b(e) : e.nodeType;
	}, w = function(e) {
		return x ? x(e) : e.nodeName;
	}, ee = Ud(d, "namespaceURI"), te = function(e) {
		return ee ? ee(e) : e.namespaceURI;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let ne, T = "", re, ie = !1, ae = 0, oe = function() {
		if (ae > 0) throw Fd("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, se = function(e) {
		oe(), ae++;
		try {
			return ne.createHTML(e);
		} finally {
			ae--;
		}
	}, ce = function(e) {
		return ne && Be ? se(e) : e;
	}, le = function(e) {
		oe(), ae++;
		try {
			return ne.createScriptURL(e);
		} finally {
			ae--;
		}
	}, E = function() {
		return ie ||= (re = Cf(u, i), !0), re;
	}, D = n, O = D.implementation, ue = D.createNodeIterator, de = D.createDocumentFragment, fe = D.getElementsByTagName, k = r.importNode, A = wf();
	t.isSupported = typeof ed == "function" && typeof _ == "function" && O && O.createHTMLDocument !== void 0;
	let pe = nf, me = rf, he = af, ge = sf, _e = cf, ve = uf, ye = df, be = pf, xe = lf, j = null, Se = $({}, [
		...Gd,
		...Kd,
		...qd,
		...Yd,
		...Zd
	]), M = null, Ce = $({}, [
		...Qd,
		...$d,
		...ef,
		...tf
	]), we = null, Te = null, Ee = null, De = Object.seal(cd(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), Oe = !0, ke = !0, Ae = !1, N = !0, je = !1, Me = !0, Ne = !1, Pe = !1, Fe = null, Ie = null, Le = !1, Re = !1, ze = !1, Be = !1, Ve = !0, He = !1, Ue = "user-content-", We = !0, Ge = !1, P = null, Ke = !1, qe = null, Je = $({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Ye = null, Xe = $({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), Ze = null, Qe = $({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), $e = "http://www.w3.org/1998/Math/MathML", et = "http://www.w3.org/2000/svg", tt = "http://www.w3.org/1999/xhtml", nt = tt, rt = !1, it = null, at = $({}, [
		$e,
		et,
		tt
	], Sd), ot = od($({}, [
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	])), st = null, ct = od($({}, ["annotation-xml"])), lt = null, ut = od(cd(null)), dt = $({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), ft = null, pt = ["application/xhtml+xml", "text/html"], mt = null, ht = null, gt = n.createElement("form"), _t = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, vt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		e && typeof e == "object" || (e = {}), e = zd(e), ft = pt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, mt = ft === "application/xhtml+xml" ? Sd : xd, j = Tf(e, "ALLOWED_TAGS", Se, { transform: mt }), M = Tf(e, "ALLOWED_ATTR", Ce, { transform: mt }), it = Tf(e, "ALLOWED_NAMESPACES", at, { transform: Sd }), Ze = Tf(e, "ADD_URI_SAFE_ATTR", Qe, {
			transform: mt,
			base: Qe
		}), Ye = Tf(e, "ADD_DATA_URI_TAGS", Xe, {
			transform: mt,
			base: Xe
		}), qe = Tf(e, "FORBID_CONTENTS", Je, { transform: mt }), Te = Tf(e, "FORBID_TAGS", cd(null), { transform: mt }), Ee = Tf(e, "FORBID_ATTR", cd(null), { transform: mt }), Ke = jd(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? zd(e.USE_PROFILES) : e.USE_PROFILES : !1, Oe = e.ALLOW_ARIA_ATTR !== !1, ke = e.ALLOW_DATA_ATTR !== !1, Ae = e.ALLOW_UNKNOWN_PROTOCOLS || !1, N = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, je = e.SAFE_FOR_TEMPLATES || !1, Me = e.SAFE_FOR_XML !== !1, Ne = e.WHOLE_DOCUMENT || !1, Re = e.RETURN_DOM || !1, ze = e.RETURN_DOM_FRAGMENT || !1, Be = e.RETURN_TRUSTED_TYPE || !1, Le = e.FORCE_BODY || !1, Ve = e.SANITIZE_DOM !== !1, He = e.SANITIZE_NAMED_PROPS || !1, We = e.KEEP_CONTENT !== !1, Ge = e.IN_PLACE || !1, xe = Wd(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : lf, nt = typeof e.NAMESPACE == "string" ? e.NAMESPACE : tt, st = Ef(e, "MATHML_TEXT_INTEGRATION_POINTS", ot), lt = Ef(e, "HTML_INTEGRATION_POINTS", ct);
		let t = Ef(e, "CUSTOM_ELEMENT_HANDLING", ut);
		if (we = cd(null), jd(t, "tagNameCheck") && _t(t.tagNameCheck) && (we.tagNameCheck = t.tagNameCheck), jd(t, "attributeNameCheck") && _t(t.attributeNameCheck) && (we.attributeNameCheck = t.attributeNameCheck), jd(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (we.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), sd(we), je && (ke = !1), ze && (Re = !0), Ke && ((jd(e, "ALLOWED_TAGS") || jd(e, "ALLOWED_ATTR")) && typeof console < "u" && typeof console.warn == "function" && console.warn("DOMPurify: USE_PROFILES overrides ALLOWED_TAGS and ALLOWED_ATTR. Do not use these options together."), j = $({}, Zd), M = cd(null), Ke.html === !0 && ($(j, Gd), $(M, Qd)), Ke.svg === !0 && ($(j, Kd), $(M, $d), $(M, tf)), Ke.svgFilters === !0 && ($(j, qd), $(M, $d), $(M, tf)), Ke.mathMl === !0 && ($(j, Yd), $(M, ef), $(M, tf))), De.tagCheck = null, De.attributeCheck = null, jd(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? De.tagCheck = e.ADD_TAGS : vd(e.ADD_TAGS) && (j === Se && (j = Bd(j)), $(j, e.ADD_TAGS, mt))), jd(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? De.attributeCheck = e.ADD_ATTR : vd(e.ADD_ATTR) && (M === Ce && (M = Bd(M)), $(M, e.ADD_ATTR, mt))), jd(e, "ADD_FORBID_CONTENTS") && vd(e.ADD_FORBID_CONTENTS) && (qe === Je && (qe = Bd(qe)), $(qe, e.ADD_FORBID_CONTENTS, mt)), We && (j["#text"] = !0), Ne && $(j, [
			"html",
			"head",
			"body"
		]), j.table && (j.tbody = !0, delete Te.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw Fd("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw Fd("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = ne;
			ne = e.TRUSTED_TYPES_POLICY;
			try {
				T = se("");
			} catch (e) {
				throw ne = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (ne = void 0, T = "") : (ne === void 0 && (ne = E()), ne && typeof T == "string" && (T = se("")));
		ht = od(e);
	}, yt = $({}, [
		...Kd,
		...qd,
		...Jd
	]), bt = $({}, [...Yd, ...Xd]), xt = function(e, t, n) {
		return t === tt ? e === "svg" : t === $e ? e === "svg" && (n === "annotation-xml" || st[n]) : !!yt[e];
	}, St = function(e, t, n) {
		return t === tt ? e === "math" : t === et ? e === "math" && lt[n] : !!bt[e];
	}, Ct = function(e, t, n) {
		return t === et && !lt[n] || t === $e && !st[n] ? !1 : !bt[e] && (dt[e] || !yt[e]);
	}, wt = function(e) {
		let t = te(e), n = xd(w(e)), r = _(e), i = nt, a = "template";
		return r && C(r) === bf.element && (i = te(r), a = xd(w(r))), it[t] ? t === et ? xt(n, i, a) : t === $e ? St(n, i, a) : t === tt ? Ct(n, i, a) : ft === "application/xhtml+xml" : !1;
	}, Tt = function(e) {
		hd(t.removed, { element: e });
		try {
			_(e).removeChild(e);
		} catch {
			if (p(e), !_(e)) throw Fd("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, Et = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, Dt = function(e) {
		jt(e);
		let t = g(e);
		t && fd(gd(t), (e) => {
			try {
				p(e);
			} catch {}
		}), C(e) === bf.element && kt(e, !1);
	}, Ot = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		if (hd(t.removed, {
			attribute: r || null,
			from: n
		}), r) Et(n, r, e);
		else try {
			n.removeAttribute(e);
		} catch {}
		if (e === "is") {
			if (Re || ze) try {
				Tt(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, kt = function(e, t) {
		let n = y(e);
		if (n) for (let r = n.length - 1; r >= 0; --r) {
			let i = n[r], a = i && i.name;
			typeof a == "string" && !(t && M[mt(a)]) && Et(e, i, a);
		}
	}, At = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = [e];
		for (; r.length > 0;) {
			let e = r.pop();
			if (t(e) === !1) continue;
			if (n && C(e) === bf.element) {
				let t = v(e);
				Gt(t) && r.push(t);
			}
			let i = g(e);
			if (i) for (let e = i.length - 1; e >= 0; --e) r.push(i[e]);
		}
	}, jt = function(e) {
		At(e, (e) => {
			C(e) === bf.element && kt(e, !0);
		});
	}, F = function(e) {
		let t = [];
		return At(e, (e) => {
			t.push(e);
		}, !0), t;
	}, Mt = function(e, t) {
		let n = yd();
		fd(F(e), (e) => {
			C(e) === bf.element && Q(n, e);
		}), fd(t, (e) => {
			C(e) === bf.element && !bd(n, e) && kt(e, !0);
		});
	}, Nt = function(e, n) {
		let r = !1;
		return fd(t.removed, (t) => {
			t.element && (r ||= t.element === e, jt(t.element));
		}), Mt(e, n), r;
	}, Pt = function(e, t) {
		let n = P, r = null, i = () => (r || (r = yd(), fd(t, (e) => {
			Q(r, e);
		})), r);
		for (let t = 0;; t++) {
			let r = F(e), a = [e], o = !1;
			if (fd(r, (e) => {
				C(e) === bf.documentFragment ? hd(a, e) : !o && !bd(n, e) && (o = bd(i(), e));
			}), !o) return;
			if (t >= 8) throw Fd("the tree kept changing during in-place sanitization; refusing to return it");
			fd(a, (t, n) => {
				Ft(t, n > 0, e, i());
			});
		}
	}, Ft = function(e, t, n, r) {
		let i = Bt(e), a;
		for (; a = i.nextNode();) bd(r, a) && !bd(P, a) && (t && qt(A.uponSanitizeShadowNode, a, null), sn(a, n));
	}, It = function(e) {
		P && Q(P, e);
	}, Lt = function(e, t) {
		return Me ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, Rt = function(e) {
		Me && At(e, (e) => {
			let t = C(e);
			if (t === bf.processingInstruction || t === bf.comment && Pd(hf, e.data)) {
				try {
					p(e);
				} catch {}
				return !1;
			}
			if (t === bf.element) {
				let t = e, n = mt(w(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && Lt("for", n) && t.removeAttribute("for");
				} catch {}
			}
			return !0;
		});
	}, zt = function(e) {
		let t = null, r = null;
		if (Le) e = "<remove></remove>" + e;
		else {
			let t = Cd(e, yf);
			r = t && t[0];
		}
		ft === "application/xhtml+xml" && nt === tt && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = ne ? se(e) : e;
		if (nt === tt) try {
			t = new l().parseFromString(i, ft);
		} catch {}
		if (!t || !t.documentElement) {
			t = O.createDocument(nt, "template", null);
			try {
				t.documentElement.innerHTML = rt ? T : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), nt === tt ? fe.call(t, Ne ? "html" : "body")[0] : Ne ? t.documentElement : a;
	}, Bt = function(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], n = S ? S(e) : e.ownerDocument;
		return ue.call(n || e, e, (t ? 0 : c.SHOW_ELEMENT) | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Vt = function(e) {
		return e = wd(e, pe, " "), e = wd(e, me, " "), e = wd(e, he, " "), e;
	}, Ht = function(e) {
		Ut(e);
		let t = e.querySelectorAll?.call(e, "template");
		t && fd(t, (e) => {
			Gt(e.content) && Ht(e.content);
		});
	}, Ut = function(e) {
		e.normalize();
		let t = Bt(e, !0), n = t.nextNode();
		for (; n;) n.data = Vt(n.data), n = t.nextNode();
	}, I = function(e) {
		let t = x ? x(e) : null;
		return typeof t != "string" || mt(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== y(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== b(e) || e.childNodes !== g(e);
	}, Wt = function(e) {
		if (!b || typeof e != "object" || !e) return null;
		try {
			let t = b(e);
			return typeof t == "number" ? t : null;
		} catch {
			return null;
		}
	}, Gt = function(e) {
		return Wt(e) === bf.documentFragment;
	}, Kt = function(e) {
		return Wt(e) !== null;
	};
	function qt(e, n, r) {
		e.length !== 0 && fd(e, (e) => {
			e.call(t, n, r, ht);
		});
	}
	let Jt = function(e, t, n) {
		return !!(Me && n === bf.element && e.hasChildNodes() && !Kt(e.firstElementChild) && Pd(mf, e.textContent) && Pd(mf, e.innerHTML) || Me && xf[t] && n === bf.element && te(e) === tt && (Kt(e.firstElementChild) || typeof e.textContent == "string" && Pd(mf, e.textContent)) || n === bf.processingInstruction || Me && n === bf.comment && Pd(hf, e.data));
	}, Yt = function(e, t) {
		return e instanceof RegExp ? Pd(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, Xt = function(e, t, n) {
		if (!Te[t] && tn(t) && Yt(we.tagNameCheck, t)) return !1;
		if (We && !qe[t] && !qe[xd(t)]) {
			let t = _(e), r = g(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return Tt(e), !0;
	}, Zt = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? Bd(t) : t;
	}, Qt = function(e, t) {
		return e === t || _(e) !== null ? !1 : (Ge && jt(e), !0);
	}, $t = function(e, n) {
		if (It(e), qt(A.beforeSanitizeElements, e, null), Qt(e, n)) return !0;
		if (I(e)) return Tt(e), !0;
		let r = mt(w(e)), i = C(e);
		if (j = Zt(A.uponSanitizeElement, j, Se, Fe), qt(A.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: j
		}), Qt(e, n)) return !0;
		if (Jt(e, r, i)) return Tt(e), !0;
		if (Te[r] || !(De.tagCheck instanceof Function && De.tagCheck(r)) && !j[r]) {
			let t = Xt(e, r, n);
			return t === !1 && (qt(A.afterSanitizeElements, e, null), Qt(e, n)) ? !0 : t;
		}
		if (i === bf.element && !wt(e) || (r === "noscript" || r === "noembed" || r === "noframes") && Pd(gf, e.innerHTML)) return Tt(e), !0;
		if (je && i === bf.text) {
			let n = e.textContent, r = Vt(n);
			n !== r && (hd(t.removed, { element: e.cloneNode() }), e.textContent = r);
		}
		return qt(A.afterSanitizeElements, e, null), Qt(e, n);
	}, en = function(e, t, r) {
		if (Ee[t] || Lt(t, e) || Ve && (t === "id" || t === "name") && (r in n || r in gt)) return !1;
		let i = M[t] || De.attributeCheck instanceof Function && De.attributeCheck(t, e);
		if (ke && Pd(ge, t) || Oe && Pd(_e, t)) return !0;
		if (!i) return tn(e) && Yt(we.tagNameCheck, e) && Yt(we.attributeNameCheck, t, e) || t === "is" && we.allowCustomizedBuiltInElements && Yt(we.tagNameCheck, r);
		if (Ze[t]) return !0;
		let a = wd(r, ye, "");
		return Pd(xe, a) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Td(r, "data:") === 0 && Ye[e] || Ae && !Pd(ve, a) ? !0 : !r;
	}, L = $({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), tn = function(e) {
		return !L[xd(e)] && Pd(be, e);
	}, nn = function(e, t, n, r) {
		if (ne && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return se(r);
			case "TrustedScriptURL": return le(r);
		}
		return r;
	}, rn = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !I(e) || (Tt(e), !1);
		} catch {
			return Ot(t, e), !1;
		}
	}, an = function(e, t) {
		return Me && Pd(vf, t) ? !0 : xd(e) === "attributename" && Td(t, "href") !== -1;
	}, on = function(e, n) {
		if (qt(A.beforeSanitizeAttributes, e, null), Qt(e, n)) return;
		let r = e.attributes;
		if (!r || I(e)) return;
		M = Zt(A.uponSanitizeAttribute, M, Ce, Ie);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: M,
			forceKeepAttr: void 0
		}, a = r.length, o = mt(w(e));
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = mt(s), d = l, f = s === "value" ? d : Ed(d), p = !1;
			i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, qt(A.uponSanitizeAttribute, e, i), f = i.attrValue, He && (u === "id" || u === "name") && Td(f, Ue) !== 0 && (Ot(s, e, n), f = Ue + f, p = !0), an(s, f) ? Ot(s, e, n) : i.forceKeepAttr || (i.keepAttr ? !N && Pd(_f, f) ? Ot(s, e, n) : (je && (f = Vt(f)), en(o, u, f) ? (f = nn(o, u, c, f), f !== d && rn(e, s, c, f) && p && md(t.removed)) : Ot(s, e, n)) : Ot(s, e, n));
		}
		qt(A.afterSanitizeAttributes, e, null), Qt(e, n);
	}, sn = function(e, t) {
		$t(e, t), on(e, t), Gt(e.content) && cn(e.content);
	}, cn = function(e) {
		let t = null, n = Bt(e);
		for (qt(A.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (qt(A.uponSanitizeShadowNode, t, null), sn(t, e), C(t) === bf.element) {
			let e = v(t);
			Gt(e) && (ln(e), cn(e));
		}
		je && Ut(e), qt(A.afterSanitizeShadowDOM, e, null);
	}, ln = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				cn(e.shadow);
				continue;
			}
			let n = e.node, r = C(n) === bf.element, i = g(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = x ? x(n) : null;
				if (typeof e == "string" && mt(e) === "template") {
					let e = n.content;
					Gt(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = v(n);
				Gt(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (rt = !e, rt && (e = "<!-->"), typeof e != "string" && !Kt(e) && (e = Vd(e), typeof e != "string")) throw Fd("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Pe ? (j = Fe, M = Ie) : vt(n), t.removed = [];
		let c = Ge && typeof e != "string" && Kt(e), l = [], u = P;
		if (c) {
			Rt(e);
			let t = w(e);
			if (typeof t == "string") {
				let n = mt(t);
				if (!j[n] || Te[n]) throw Dt(e), Fd("root node is forbidden and cannot be sanitized in-place");
			}
			if (I(e)) throw Dt(e), Fd("root node is clobbered and cannot be sanitized in-place");
			l = F(e), P = yd();
		} else if (Kt(e)) i = zt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === bf.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), ln(i);
		else {
			if (!Re && !je && !Ne && e.indexOf("<") === -1) return ce(e);
			if (i = zt(e), !i) return Re ? null : Be ? T : "";
		}
		i && Le && Tt(i.firstChild);
		let d = c ? e : i;
		try {
			c && ln(e);
			let t = Bt(d);
			for (; o = t.nextNode();) sn(o, d);
			c && Pt(e, l);
		} catch (t) {
			throw c && (Dt(e), Nt(e, l)), t;
		} finally {
			P = u;
		}
		if (c) {
			if (Nt(e, l)) throw Fd("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return je && Ht(e), e;
		}
		if (Re) {
			if (je && Ht(i), ze) for (s = de.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (M.shadowroot || M.shadowrootmode) && (s = k.call(r, s, !0)), s;
		}
		let f = () => Ne ? i.outerHTML : i.innerHTML, p = f();
		return je && Pd(of, p) && (Ut(i), p = f()), Ne && j["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && Pd(ff, i.ownerDocument.doctype.name) && (p = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + p), ce(p);
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		vt(e), Pe = !0, Fe = j, Ie = M;
	}, t.clearConfig = function() {
		ht = null, Pe = !1, Fe = null, Ie = null, ne = re, T = "";
	}, t.isValidAttribute = function(e, t, n) {
		ht || vt({});
		let r = mt(e), i = mt(t);
		return typeof n == "string" && (an(t, n) || !N && Pd(_f, n)) ? !1 : en(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && jd(A, e) && hd(A[e], t);
	}, t.removeHook = function(e, t) {
		if (jd(A, e)) {
			if (t !== void 0) {
				let n = pd(A[e], t);
				return n === -1 ? void 0 : _d(A[e], n, 1)[0];
			}
			return md(A[e]);
		}
	}, t.removeHooks = function(e) {
		jd(A, e) && (A[e] = []);
	}, t.removeAllHooks = function() {
		A = wf();
	}, t;
}
var Of = Df();
// src/report.js
function kf(e) {
	try {
		let t = new URL(e);
		if (t.protocol !== "https:" || t.username || t.password || t.port) return null;
		if ([
			"www.facebook.com",
			"facebook.com",
			"m.facebook.com"
		].includes(t.hostname)) {
			let e = t.pathname.match(/^\/marketplace\/item\/(\d+)\/?$/)?.[1];
			return e ? {
				source: "Facebook Marketplace",
				kind: "publicacion",
				id: e,
				key: `facebook:${e}`,
				url: t.href
			} : null;
		}
		if (t.hostname === "mercadolibre.com.co" || t.hostname.endsWith(".mercadolibre.com.co")) {
			let e = t.pathname.match(/\/p\/(MCO\d+)(?:\/|$)/i), n = t.pathname.match(/\/(MCO-?\d+)(?:[-_/]|$)/i);
			if (!e && !n) return null;
			let r = (e || n)[1].toUpperCase().replace("-", "");
			return {
				source: "Mercado Libre",
				kind: e ? "catalogo" : "publicacion",
				id: r,
				key: `mercadolibre:${r}`,
				url: t.href
			};
		}
		if (t.hostname === "fincaraiz.com.co" || t.hostname.endsWith(".fincaraiz.com.co")) {
			let e = t.pathname.match(/\/(\d{7,})\/?$/)?.[1];
			return e ? {
				source: "Finca Raíz",
				kind: "publicacion",
				id: e,
				key: `fincaraiz:${e}`,
				url: t.href
			} : null;
		}
	} catch {}
	return null;
}
function Af(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let t of e.querySelectorAll("a[href]")) {
		let e = kf(t.href);
		e?.source === "Facebook Marketplace" && r.set(e.id, e.url);
	}
	for (let e of Array.isArray(n) ? n : []) {
		let t = String(e?.text || "").match(/^Revisando Marketplace:\s*(https:\/\/\S+)\s*$/i), n = t && kf(t[1]);
		n?.source === "Facebook Marketplace" && r.set(n.id, n.url);
	}
	let i = t.createTreeWalker(e, t.defaultView.NodeFilter.SHOW_TEXT), a = [];
	for (; i.nextNode();) {
		let e = i.currentNode;
		e.parentElement?.closest("a,code,pre") || a.push(e);
	}
	for (let e of a) {
		let n = e.nodeValue, i = /\bitem\s*[#:]?\s*(\d{5,25})\b|(?<![\w/:])\/p\/MCO\d+\b/gi, a, o = 0, s = !1, c = t.createDocumentFragment();
		for (; a = i.exec(n);) {
			let e = a[1] ? r.get(a[1]) : "https://www.mercadolibre.com.co" + a[0];
			if (c.append(t.createTextNode(n.slice(o, a.index))), e) {
				let n = t.createElement("a");
				n.href = e, n.textContent = a[0], n.target = "_blank", n.rel = "noopener noreferrer", c.append(n);
			} else c.append(t.createTextNode(a[0] + " (enlace no disponible)"));
			o = i.lastIndex, s = !0;
		}
		s && (c.append(t.createTextNode(n.slice(o))), e.replaceWith(c));
	}
}
function jf(e, t, n = []) {
	let r = e.ownerDocument, i = Of(r.defaultView), a = Z.parse(String(t ?? ""), { gfm: !0 }), o = i.sanitize(a, {
		RETURN_DOM_FRAGMENT: !0,
		ALLOWED_TAGS: [
			"a",
			"p",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"ul",
			"ol",
			"li",
			"strong",
			"em",
			"del",
			"blockquote",
			"pre",
			"code",
			"hr",
			"br",
			"table",
			"thead",
			"tbody",
			"tr",
			"th",
			"td"
		],
		ALLOWED_ATTR: [
			"href",
			"title",
			"align"
		],
		ALLOW_DATA_ATTR: !1
	});
	for (let e of o.querySelectorAll("a[href]")) try {
		let t = e.getAttribute("href");
		/^\/p\/MCO\d+\/?$/i.test(t) && e.setAttribute("href", "https://www.mercadolibre.com.co" + t);
		let n = new URL(e.getAttribute("href"), r.baseURI);
		if (!["http:", "https:"].includes(n.protocol)) throw Error("Unsupported link");
		e.target = "_blank", e.rel = "noopener noreferrer";
	} catch {
		e.removeAttribute("href");
	}
	Af(o, r, n);
	for (let e of o.querySelectorAll("table")) {
		let t = r.createElement("div");
		t.className = "report-table-scroll", t.setAttribute("role", "region"), t.setAttribute("aria-label", "Tabla del informe; desplázate horizontalmente para ver todas las columnas"), t.tabIndex = 0, e.replaceWith(t), t.append(e);
	}
	e.replaceChildren(o);
}
function Mf(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e.querySelectorAll("a[href]")) {
		let i = kf(r.href);
		if (!i || n.has(i.key)) continue;
		n.add(i.key);
		let a = r.closest("li,tr") || r.closest("p"), o = "";
		if (a && [...a.querySelectorAll("a[href]")].filter((e) => kf(e.href)).length === 1) {
			let e = a.cloneNode(!0);
			e.querySelectorAll("a").forEach((e) => e.remove()), o = e.textContent.replace(/\s+/g, " ").trim(), /^(?:enlace|fuente|ver|publicaci[oó]n)\s*:?$/i.test(o) && (o = "");
		}
		if (!o) {
			for (let t = a || r; t && t !== e && !o; t = t.parentElement) for (let e = t.previousElementSibling; e; e = e.previousElementSibling) if (/^H[1-6]$/.test(e.tagName)) {
				o = e.textContent.trim();
				break;
			}
		}
		let s = r.textContent.trim();
		!o && s && !/^https?:\/\//i.test(s) && (o = s), t.push({
			title: (o || (i.kind === "catalogo" ? "Catálogo de Mercado Libre" : "Publicación en " + i.source)).slice(0, 140),
			url: i.url,
			source: i.source,
			kind: i.kind
		});
	}
	return t;
}
// src/progress.js
function Nf(e) {
	let t = Math.max(0, Math.floor((Number.isFinite(e) ? e : 0) / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n} h ${String(r).padStart(2, "0")} min` : r ? `${r} min ${String(i).padStart(2, "0")} s` : `${i} s`;
}
function Pf(e, t = Date.now()) {
	let n = Array.isArray(e?.progress) ? e.progress.filter((e) => e && typeof e.text == "string") : [], r = n.at(-1) || null, i = ["ejecutando", "en cola"].includes(e?.status), a = Date.parse(e?.created || ""), o = null, s = 0, c = 0, l = null;
	for (let e of n) {
		let t = e.text.match(/^Marketplace:\s*(\d+)\s+anuncios encontrados en\s+(\d+)\s+pasadas?\./i), n = e.text.match(/^Marketplace:\s*(\d+)\s+anuncios encontrados;\s*(\d+)\s+desplazamientos?\./i);
		t && (l = e, o = {
			found: Number(t[1]),
			passes: Number(t[2]),
			scrolls: null,
			label: "Recorrido en curso"
		}), n && (l = e, o = {
			found: Number(n[1]),
			passes: null,
			scrolls: Number(n[2]),
			label: "Último recorrido completado"
		}), /^Revisando Marketplace:/i.test(e.text) && s++, /^Buscando en Marketplace:/i.test(e.text) && c++;
	}
	o?.label === "Recorrido en curso" && l !== r && (o.label = "Último recorrido registrado");
	let u = r?.text || "", d = "Preparando la investigación";
	return e?.status === "en cola" ? d = "En espera" : /^Marketplace:.*en\s+\d+\s+pasadas?/i.test(u) ? d = "Recorriendo Marketplace" : /^Marketplace:.*desplazamientos?/i.test(u) ? d = "Recorrido completado" : /^Mercado Libre:|^Buscando en Mercado Libre:/i.test(u) ? d = "Consultando Mercado Libre" : /^Revisando Marketplace:/i.test(u) ? d = "Revisiones solicitadas" : /^Buscando en Marketplace:/i.test(u) ? d = "Consultas solicitadas" : /^(Buscando:|Revisando fuente:)/i.test(u) && (d = "Consultando fuentes públicas"), {
		active: i,
		phase: d,
		elapsed: Number.isFinite(a) ? Nf(t - a) : null,
		latest: r?.text || "",
		latestAt: r?.at || null,
		found: o?.found ?? null,
		passes: o?.passes ?? null,
		scrolls: o?.scrolls ?? null,
		batchLabel: o?.label || null,
		readRequests: s,
		queryRequests: c
	};
}
window.RadarReport = {
	render: jf,
	highlights: Mf
}, window.RadarProgress = { derive: Pf };
var Ff = Fo({
	palette: { primary: { main: "#2968c8" } },
	shape: { borderRadius: 8 },
	typography: {
		fontFamily: "system-ui, -apple-system, sans-serif",
		button: {
			fontWeight: 650,
			textTransform: "none"
		}
	}
}), If = [
	{
		slot: "slot-stepBack",
		id: "stepBack",
		label: "Atrás",
		className: "secondary-button",
		variant: "outlined",
		hidden: !0
	},
	{
		slot: "slot-stepNext",
		id: "stepNext",
		label: "Continuar",
		className: "primary-button",
		variant: "contained"
	},
	{
		slot: "slot-startTask",
		id: "startTask",
		label: "Iniciar búsqueda",
		className: "primary-button",
		variant: "contained",
		type: "submit",
		hidden: !0
	},
	{
		slot: "slot-browserClose",
		id: "browserClose",
		label: "Terminé de conectar",
		className: "secondary-button",
		variant: "outlined"
	}
].map(({ slot: e, label: t, ...n }) => (0, Xc.createPortal)(/* @__PURE__ */ (0, R.jsx)(Tc, {
	...n,
	size: "large",
	disableElevation: !0,
	children: t
}), document.getElementById(e), e));
(0, Xc.flushSync)(() => (0, Zc.createRoot)(document.getElementById("mui-root")).render(/* @__PURE__ */ (0, R.jsx)(Yc, {
	theme: Ff,
	children: If
})));
var Lf = {
	search: "M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 14 15.5l.27.28v.79l5 4.99L20.49 20zm-5 0A4.5 4.5 0 1 1 15 9.5a4.5 4.5 0 0 1-4.5 4.5",
	mercado: "M4 4h16v3H4zm1 4h14l1 4v2h-1v7h-5v-5h-4v5H5v-7H4v-2zm2 5v6h1v-5h8v5h1v-6z",
	history: "M13 3a9 9 0 0 0-9 9H1l3.9 3.9.1.2L9 12H6a7 7 0 1 1 2.05 4.95l-1.42 1.42A9 9 0 1 0 13 3zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z",
	facebook: "M13.5 22v-9h3l.5-3h-3.5V8c0-.9.3-1.5 1.6-1.5H17V3.8c-.4-.1-1.3-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v9z"
};
function Rf() {
	let [e, t] = (0, O.useState)("search");
	return /* @__PURE__ */ (0, R.jsxs)(kc, {
		showLabels: !0,
		value: e,
		onChange: (e, n) => {
			t(n), window.dispatchEvent(new CustomEvent("radar:navigate", { detail: n }));
		},
		"aria-label": "Navegación principal",
		children: [
			/* @__PURE__ */ (0, R.jsx)(Hc, {
				label: "Buscar",
				value: "search",
				icon: /* @__PURE__ */ (0, R.jsx)(es, { children: /* @__PURE__ */ (0, R.jsx)("path", { d: Lf.search }) })
			}),
			/* @__PURE__ */ (0, R.jsx)(Hc, {
				label: "Historial",
				value: "history",
				icon: /* @__PURE__ */ (0, R.jsx)(es, { children: /* @__PURE__ */ (0, R.jsx)("path", { d: Lf.history }) })
			}),
			/* @__PURE__ */ (0, R.jsx)(Hc, {
				label: "Facebook",
				value: "facebook",
				icon: /* @__PURE__ */ (0, R.jsx)(es, { children: /* @__PURE__ */ (0, R.jsx)("path", { d: Lf.facebook }) })
			}),
			/* @__PURE__ */ (0, R.jsx)(Hc, {
				label: "Mercado",
				"aria-label": "Mercado Libre",
				value: "mercadolibre",
				icon: /* @__PURE__ */ (0, R.jsx)(es, { children: /* @__PURE__ */ (0, R.jsx)("path", { d: Lf.mercado }) })
			})
		]
	});
}
(0, Xc.flushSync)(() => (0, Zc.createRoot)(document.getElementById("mobileNav")).render(/* @__PURE__ */ (0, R.jsx)(Yc, {
	theme: Ff,
	children: /* @__PURE__ */ (0, R.jsx)(Rf, {})
})));
