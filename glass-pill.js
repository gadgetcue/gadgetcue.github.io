/* Liquid glass for the bottom pill. Chromium only (SVG displacement map + backdrop-filter).
   Adapted from archisvaze/liquid-glass (MIT, (c) 2026 Archis Vaze). Other browsers keep the frosted CSS pill. */
(function () {
  var ua = navigator.userAgent;
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var ok = /Chrome|Chromium|Edg\//.test(ua) && !/Firefox|FxiOS/.test(ua) && !ios && window.CSS && CSS.supports('backdrop-filter', 'url(#a)');
  var nav = document.querySelector('.floatbar');
  if (!ok || !nav || /[?&]glass=css/.test(location.search)) return; // ?glass=css previews the Safari/Firefox look

  var SURFACE = function (x) { return Math.pow(1 - Math.pow(1 - x, 4), 0.25); }; // convex squircle
  function profile(thick, bezel, ior, n) {
    var eta = 1 / ior, out = new Float64Array(n);
    function refract(nx, ny) {
      var k = 1 - eta * eta * (1 - ny * ny); if (k < 0) return null;
      var sq = Math.sqrt(k); return [-(eta * ny + sq) * nx, eta - (eta * ny + sq) * ny];
    }
    for (var i = 0; i < n; i++) {
      var x = i / n, y = SURFACE(x), dx = x < 1 ? 0.0001 : -0.0001;
      var d = (SURFACE(x + dx) - y) / dx, mag = Math.sqrt(d * d + 1), r = refract(-d / mag, -1 / mag);
      out[i] = r ? r[0] * ((y * bezel + thick) / r[1]) : 0;
    }
    return out;
  }
  var S = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
  function geom(w, h, r, bezel, cb) {
    w = Math.round(w * S); h = Math.round(h * S); r = r * S; bezel = bezel * S;
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var ctx = c.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
    var rSq = r * r, r1Sq = (r + 1) * (r + 1), rBSq = Math.pow(Math.max(r - bezel, 0), 2), wB = w - r * 2, hB = h - r * 2;
    cb.init(d);
    for (var y1 = 0; y1 < h; y1++) for (var x1 = 0; x1 < w; x1++) {
      var x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      var y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      var dSq = x * x + y * y; if (dSq > r1Sq || dSq < rBSq) continue;
      var dist = Math.sqrt(dSq); if (dist === 0) continue;
      var op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq)); if (op <= 0) continue;
      cb.px(d, (y1 * w + x1) * 4, x / dist, y / dist, (r - dist) / bezel, op);
    }
    ctx.putImageData(img, 0, 0); return c.toDataURL();
  }
  function dispMap(w, h, r, bezel, prof, maxD) {
    return geom(w, h, r, bezel, {
      init: function (d) { for (var i = 0; i < d.length; i += 4) { d[i] = 128; d[i + 1] = 128; d[i + 2] = 0; d[i + 3] = 255; } },
      px: function (d, i, cos, sin, t, op) {
        var disp = prof[Math.min((t * prof.length) | 0, prof.length - 1)] || 0;
        d[i] = (128 + (-cos * disp / maxD) * 127 * op + 0.5) | 0; d[i + 1] = (128 + (-sin * disp / maxD) * 127 * op + 0.5) | 0;
      }
    });
  }
  function specMap(w, h, r, bezel) {
    var a = Math.PI / 3, sv = [Math.cos(a), Math.sin(a)];
    return geom(w, h, r, bezel, {
      init: function (d) { d.fill(0); },
      px: function (d, i, cos, sin, t, op) {
        var dot = Math.abs(cos * sv[0] + -sin * sv[1]), edge = Math.sqrt(Math.max(0, 1 - Math.pow(1 - t * bezel / bezel, 2)));
        var k = dot * edge, col = (255 * k) | 0; d[i] = d[i + 1] = d[i + 2] = col; d[i + 3] = (col * k * op) | 0;
      }
    });
  }

  var svgNS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('color-interpolation-filters', 'sRGB');
  svg.style.cssText = 'position:absolute;overflow:hidden'; svg.setAttribute('aria-hidden', 'true');
  var defs = document.createElementNS(svgNS, 'defs'); svg.appendChild(defs); document.body.appendChild(svg);

  var last = '';
  function build() {
    var w = Math.round(nav.offsetWidth), h = Math.round(nav.offsetHeight);
    if (w < 40 || h < 20 || nav.offsetParent === null && getComputedStyle(nav).position !== 'fixed') return;
    if (w + 'x' + h === last) return; last = w + 'x' + h;
    var r = Math.floor(h / 2), bezel = Math.max(1, Math.min(60, r - 1)); // bezel width 60, clamped like the reference
    var prof = profile(10, bezel, 3.0, 128), maxD = 1; for (var i = 0; i < prof.length; i++) maxD = Math.max(maxD, Math.abs(prof[i]));
    var disp = dispMap(w, h, r, bezel, prof, maxD), spec = specMap(w, h, r, bezel * 2.5);
    defs.innerHTML = '<filter id="lg-pill" x="0%" y="0%" width="100%" height="100%">' +
      '<feGaussianBlur in="SourceGraphic" stdDeviation="0" result="b"/>' +
      '<feImage href="' + disp + '" x="0" y="0" width="' + w + '" height="' + h + '" result="map"/>' +
      '<feDisplacementMap in="b" in2="map" scale="' + (maxD * 1.65) + '" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
      '<feColorMatrix in="d" type="saturate" values="12" result="ds"/>' +
      '<feImage href="' + spec + '" x="0" y="0" width="' + w + '" height="' + h + '" result="sp"/>' +
      '<feComposite in="ds" in2="sp" operator="in" result="sm"/>' +
      '<feComponentTransfer in="sp" result="sf"><feFuncA type="linear" slope="1"/></feComponentTransfer>' +
      '<feBlend in="sm" in2="d" mode="normal" result="ws"/><feBlend in="sf" in2="ws" mode="normal"/></filter>';
    nav.style.setProperty('--lg-radius', r + 'px');
  }
  nav.classList.add('lg');
  build();
  if (window.ResizeObserver) new ResizeObserver(build).observe(nav); else window.addEventListener('resize', build);
})();
