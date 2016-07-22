(function (locator) {
    function highlight(e) {
        try {
            draw_frame(e);
            draw_arrow(e);
        } catch (s) {
        }
    }
    function locate(e, t) {
        switch (e) {
            case 0:
            case 'css':
                return v.querySelector(t);
            case 'xpath':
                return v.evaluate(t, v, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            case 'id':
                return v.getElementById(t)
        }
    }
    function topleft(e) {
        return [m.pageYOffset + e.getBoundingClientRect().top,
        m.pageXOffset + e.getBoundingClientRect().left]
    }
    function draw_frame(e) {
        try {
            tl = topleft(e);
            height = e.getBoundingClientRect().height;
            width = e.getBoundingClientRect().width;
            t = v.createElement('div');
            t.name = w;
            t.setAttribute('style', 'position:absolute;top:' + tl[0] + 'px;left:' + tl[1] + 'px;width:' + width + 'px;height:' + height + 'px;z-index:10000;rgba(0, 0, 0, 0.4);border:2px dashed red;');
            v.body.appendChild(t);
        } catch (ex) {
        }
    }
    function draw_arrow(e) {
        try {
            tl = topleft(e);
            var t = v.createElement('img'),
            r = tl[1] - 75,
            i = tl[0] + (e.getBoundingClientRect().bottom - e.getBoundingClientRect().top) / 2;
            t.name = w;
            t.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAXCAYAAACswNlYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QwMDAMRpdV9vQAAAp9JREFUWMPt2M1rXGUUx/HPc+eGBCuSauumC8G1GlxYSaHTpNEEhC660f+gvuDGv6C4cOtat25EdyIUMqFOnNgWrO+67KaSpmgtxtIY47wcFzNTb9PpUKRJZzIeuKtzeJ6HH+d8z7knRYSRtPRyifU3aY1jjewqjVUmroozN+4IH1mhIB3dz8QHOLzNs4Er7S9dYfzd0RYK0guPkX1ITPXwXie9Liqf56MnTErMPU02S8zgOWKsR+Qy8YZYuj46pZdmD1CaIc1iBgcK3ibxHZ4lZQi8x5PviPfre5tRafZhxo7TKpPKeOL2gPieVKNVY/Mi+6bwCXGN9JpY+mL7kfneKaeFZ2h2hMmfJ8ZJXWHWUSMtkS2LxV+3ceoE6SLZKVFZ63VFPsRZM0k+T7zI3DTNgx1RoNHOmKhRqvHIT+LjZu9z3s5Il2mcFtXGXa8bmtJLr45xaZqsTJRJT6FUiFgjzpLV2FwRK7/f1+sHWqg0d4jScWIBR7Cv4N3qlNMizZo4e3lHnzJQQvWHcBA//Avh1pei+teuPe2BCnUHhOMwJgoR68QSWYX8gjhz7YE9ddeFSicnudmBsGnSwULS1Mku3BOEd9l2vuvdFcLd1m2VqBIV8nNicWMgcbkjGXULwrdYM1nw3iQ+a3ennYfwYAmVXhpn6xhpvj+EsyX+/rrfvDKo9t9KryeEsyKEf2mXUlajfl5Ufxv64f+eMyqdnGSjTGuedAyPF7x1UgHC0z+K06299PuY95lpcrIjfSD8MxZpVXjoK/Hpn3t6AXFbRqUTh9jqQvgo9hdibxDLwwbh+yeUhUdpnmrvaWKqs5PpcvgSqdpeYm2cE+c3jajlNF/BWx3d/sAKaZl6VVRX/W9doUof0WgR39L6Zhhb927YP7XjHE2XKsCmAAAAAElFTkSuQmCC';
            t.setAttribute('style', 'position:absolute;top:' + i + 'px;left:' + r + 'px;z-index:10000;');
            v.body.appendChild(t);
        } catch (ex) {
        }
    }
    function main() {
        var e = locator,
        t = 0,
        n = 0;
        if (!e || e == 'null') return;
        e = e.trim();
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
        highlight(locate(t, n));
    }
    var v = document,
    m = window,
    w = 'selenium-pointer';
    main();
})(element_or_locator)
