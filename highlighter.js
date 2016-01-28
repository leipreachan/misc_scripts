javascript: (function () {
    function attribute(e, t, n) {
        e.setAttribute(t, n)
    }

    function highlight(r) {
        for (var i = 0; i < r.length; i++) {
            e = r[i];
            try {
                e.os = e.getAttribute('style');
                attribute(e, 'style', e.os + ';border:2px dashed red;')
            } catch (s) {
            }
            t = draw_arrow(e);
            g.appendChild(t)
        }
        return r
    }

    function side_menu(t) {
        function r(t, r) {
            clr = 'position:fixed;top:' + r + 'px;left:0;padding:5px;background-color:#00293E;color:#fff;z-index:10000;';
            e = v.createElement('span');
            attribute(e, 'name', w + '-cmt');
            attribute(e, 'style', clr);
            e.innerHTML = t;
            return e
        }

        sp = r(t, 0);
        ht = r(['ESC / Q',
            'close',
            'R',
            'redraw',
            'C',
            'clean',
            '%E2%86%90 / P',
            'prev',
            '%E2%86%92 / N',
            'next'].join('<br>'), 30);
        g.appendChild(sp);
        g.appendChild(ht)
    }

    function iterate_over_elements(e) {
        var t = [],
                n = v.evaluate(e, v, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        var r = n.iterateNext();
        while (r) {
            t.push(r);
            r = n.iterateNext()
        }
        return t
    }

    function get_cookies(e) {
        p = v.cookie.split(e + '=');
        if (p.length == 2) return p.pop().split(';').shift()
    }

    function locate(e, t) {
        switch (e) {
            case 0:
            case 'css':
                return v.querySelectorAll(t);
            case 'xpath':
                return iterate_over_elements(t);
            case 'id':
                return v.getElementById(t)
        }
    }

    function draw_arrow(e) {
        try {
            var t = v.createElement('img'),
                    r = m.pageXOffset + e.getBoundingClientRect().left,
                    i = m.pageYOffset + e.getBoundingClientRect().top + (e.getBoundingClientRect().bottom - e.getBoundingClientRect().top) / 2;
            t.name = w;
            t.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAXCAYAAACswNlYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QwMDAMRpdV9vQAAAp9JREFUWMPt2M1rXGUUx/HPc+eGBCuSauumC8G1GlxYSaHTpNEEhC660f+gvuDGv6C4cOtat25EdyIUMqFOnNgWrO+67KaSpmgtxtIY47wcFzNTb9PpUKRJZzIeuKtzeJ6HH+d8z7knRYSRtPRyifU3aY1jjewqjVUmroozN+4IH1mhIB3dz8QHOLzNs4Er7S9dYfzd0RYK0guPkX1ITPXwXie9Liqf56MnTErMPU02S8zgOWKsR+Qy8YZYuj46pZdmD1CaIc1iBgcK3ibxHZ4lZQi8x5PviPfre5tRafZhxo7TKpPKeOL2gPieVKNVY/Mi+6bwCXGN9JpY+mL7kfneKaeFZ2h2hMmfJ8ZJXWHWUSMtkS2LxV+3ceoE6SLZKVFZ63VFPsRZM0k+T7zI3DTNgx1RoNHOmKhRqvHIT+LjZu9z3s5Il2mcFtXGXa8bmtJLr45xaZqsTJRJT6FUiFgjzpLV2FwRK7/f1+sHWqg0d4jScWIBR7Cv4N3qlNMizZo4e3lHnzJQQvWHcBA//Avh1pei+teuPe2BCnUHhOMwJgoR68QSWYX8gjhz7YE9ddeFSicnudmBsGnSwULS1Mku3BOEd9l2vuvdFcLd1m2VqBIV8nNicWMgcbkjGXULwrdYM1nw3iQ+a3ennYfwYAmVXhpn6xhpvj+EsyX+/rrfvDKo9t9KryeEsyKEf2mXUlajfl5Ufxv64f+eMyqdnGSjTGuedAyPF7x1UgHC0z+K06299PuY95lpcrIjfSD8MxZpVXjoK/Hpn3t6AXFbRqUTh9jqQvgo9hdibxDLwwbh+yeUhUdpnmrvaWKqs5PpcvgSqdpeYm2cE+c3jajlNF/BWx3d/sAKaZl6VVRX/W9doUof0WgR39L6Zhhb927YP7XjHE2XKsCmAAAAAElFTkSuQmCC';
            attribute(t, 'style', 'position:absolute;top:' + i + 'px;left:' + (r - 75) + 'px;z-index:10000;');
            return t
        } catch (s) {
        }
    }

    function main() {
        clean(1);
        k = get_cookies('locator');
        k = typeof k !== b ? '' : k;
        var e = prompt('Locator:', k),
                t = 0,
                n = 0;
        if (!e || e == 'null') return;
        e = e.trim();
        dt = new Date;
        dt.setDate(dt.getDate() + 10);
        v.cookie = 'path=/; locator=' + e + '; expires=' + dt.toUTCString();
        s = e.split('=');
        if (s[0] && s[1]) {
            switch (s[0]) {
                case 'xpath':
                case 'css':
                case 'id':
                {
                    t = s[0];
                    n = s[1];
                    break
                }
            }
        }
        if (!t) {
            if (e.substr(1, 1) == '/') {
                t = 'xpath'
            } else {
                t = 'css'
            }
            n = e
        }
        var o = locate(t, n);
        ell = o.length;
        if (ell == 0) {
            side_menu('element was not found');
            return
        }
        side_menu('<b>' + ell + ' candidate' + (ell > 1 ? 's' : '') + '</b> for ' + t + ' locator ' + e);
        highlight([o[0]]);
        o.scrl = h();
        return o
    }

    function clean(e) {
        var t = locate(0, '*[name' + (e ? '*' : '') + '=' + w + ']');
        for (n = 0; n < t.length; n++) {
            try {
                t[n].remove()
            } catch (r) {
            }
        }
        if (typeof y !== b) for (n = 0; n < y.length; n++) {
            if (typeof y[n] !== b) y[n].style = y[n].os
        }
    }

    function h() {
        var e = 0;
        return function (t) {
            if (typeof y[e + t] !== b) {
                e += t;
                clean(0);
                highlight([y[e]]);
                y[e].scrollIntoView(1)
            }
        }
    }

    function keyboard(e) {
        switch (e.key.toLowerCase()) {
            case 'esc':
            case 'q':
                clean(1);
                m.onkeypress = E;
                return;
            case 'c':
                clean(1);
                return;
            case 'r':
                y = main();
                return;
            case 'n':
            case 'right':
                if (y) {
                    y.scrl(1)
                }
                return;
            case 'p':
            case 'left':
                if (y) {
                    y.scrl(-1)
                }
                return
        }
    }

    var v = document,
            m = window,
            g = v.body,
            y = [],
            b = 'undefined';
    var w = 'leipr-tst',
            E = m.onkeypress;
    m.onkeypress = keyboard;
    y = main();
})()
