class MatrixChart {
    constructor(parentElement, svgId, options = {}) {
        this.data = {};
        this.options = {
            backgroundColor: 'white',
            statusColorMap: { // background color
                0: 'green',
                1: 'red',
            },
            statusClassMap: { // css class
            },
            defaultStatus: 0,
            transpose: false,
            strokeWidth: 1,
            squareSize: 7,
            xAxis: {
                align: 'left',
                title: false,
                labelNameGetter: (columnIndex, min, max) => {
                    return false;
                },
                clickCallback: this._empty,
            },
            yAxis: {
                title: false,
                labelNameGetter: (columnIndex, min, max) => {
                    return false;
                },
                clickCallback: this._empty,
            },
            mouseOverCallback: this._empty,
            mouseOutCallback: this._empty,
            mouseClickPixelCallback: this._empty,
            mouseDblClickPixelCallback: this._empty,
            mouseOverPixelCallback: this._empty,
            mouseOutPixelCallback: this._empty,
        };
        this.settings = {
            axisStrokeLength: 8,
            xShift: 1.5 * this.options.squareSize,
            yShift: 1.5 * this.options.squareSize,
        };

        this.parentElement = __.cel('span', {}, parentElement);
        this.options = __.merge(this.options, options);
        this.shadow = this.parentElement.attachShadow({mode: 'open'});
        this.svg = this._createSVGRootElement(svgId);
        __.ach(this.shadow, this.svg);
    }

    _empty() {
    }

    /**
     *
     * data format:
     * ```
     * {
     * rows: [
     *          0: {
     *              id: ..,
     *              name: ...,
     *              series: [ // if not empty populate with non-default pixel statuses
     *                  53: 4,
     *                  99: 1,
     *                  103: {state: 2, text: '....'},
     *              ]
     *          }
     *      ],
     *      // columns IS OPTIONAL
     * columns: [
     *     ....
     *     53: {
     *          id: ...,
     *          name: ...
     *     }
     *  ],
     * customData: { // optional custom data
     *
     *  }
     * }
     *```
     * @param data
     */
    draw(data) {
        this.data = data;
        this._prepareCanvas();
        this._attachGlobalListeners();
        this._drawRows();
        this._drawLabels();
    }

    setOptions(options) {
        this.options = options;
    }

    getOptions() {
        return this.options;
    }

    getCustomData() {
        return this.data.customData || {};
    }

    getSvg() {
        return this.svg;
    }

    _attachGlobalListeners() {
        this.svg.addEventListener('mouseover', this.options.mouseOverCallback);
        this.svg.addEventListener('mouseout', this.options.mouseOutCallback);
    }

    _getSvgBox() {
        return this.svg.getBoundingClientRect();
    }

    _createSVGRootElement(id) {
        const root = this._createSVGElement('svg', {id: `svg-${id}`});
        if (this.options.hasOwnProperty('externalCss')) {
            __.cel('link', {
                rel: 'stylesheet',
                href: this.options.externalCss
            }, this.shadow);
        }
        return root;
    }

    _createSVGElement(tag, attrs = {}, title = false) {
        let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        __.attrs(el, attrs);
        if (!title) return el;
        el.innerHTML = `<title>${title}</title>`;
        return el;
    }

    _createPixel(pixelInfo, pixelX, pixelY) {
        const zoom = this.options.squareSize;
        let state = pixelInfo.hasOwnProperty('state') ? pixelInfo.state : pixelInfo;
        state = state === "undefined" ? this.options.defaultStatus : state;

        let x = this._getXShift() + pixelX * zoom - 0.5 * zoom;
        if (this.options.xAxis.align === 'right') {
            x = this._getSvgBox().width - pixelX * zoom - 2.5 * zoom;
        }
        let rect = this._createSVGElement('rect', {
            width: zoom,
            height: zoom,
            x,
            y: pixelY * zoom + this.settings.yShift,
        });
        const cssClass = this.options.statusClassMap[state] || false;
        if (cssClass) {
            rect.classList.add(cssClass);
        } else {
            rect.style.fill = this.options.statusColorMap[state] || this.options.statusColorMap[this.options.defaultStatus];
        }
        const name = this.data.hasOwnProperty('columns') ? this.data.columns[pixelX]['name'] : "undefined",
            id = this.data.hasOwnProperty('columns') ? this.data.columns[pixelX]['id'] : "undefined",
            title = pixelInfo.hasOwnProperty('title') ? encodeURIComponent(pixelInfo['title']) : "undefined",
            desc = pixelInfo['text'] || "undefined";
        __.props(rect, {
            style: {
                strokeWidth: `${this.options.strokeWidth}px`,
            },
            dataset: {name, id, state, title, desc,}
        });

        rect.addEventListener('click', this.options.mouseClickPixelCallback);
        rect.addEventListener('dblclick', this.options.mouseDblClickPixelCallback);
        rect.addEventListener('mouseover', this.options.mouseOverPixelCallback);
        rect.addEventListener('mouseout', this.options.mouseOutPixelCallback);
        return rect;
    }

    _drawRow(row, y) {
        const g = this._createSVGElement('g', {class: 'gline'});
        g.dataset.id = row.id;
        __.ach(this.mContainer, g);
        const pixelsInLine = this.data.columns || row.series; // columns are optional
        for (let index in pixelsInLine) {
            const rect = this._createPixel(row.series[index] || false, index, y);
            __.ach(g, rect);
        }
    }

    _isShowXAxisTitle() {
        return this.options.xAxis.title;
    }

    _isShowYAxisTitle() {
        return this.options.yAxis.title;
    }

    _drawLabels() {
        this._drawXAxisTitle();
        this._drawXAxisLabels();
        this._drawYAxisTitle();
        this._drawYAxisLabels();
    }

    _drawYAxisTitle() {
        if (!this._isShowYAxisTitle()) {
            return;
        }
        const svgBox = this._getSvgBox();
        const label = this._createSVGElement('g', {class: 'matrix-labels yaxis'});
        const text = this._createSVGElement('text', {
            'text-anchor': 'middle',
            transform: `translate(15,${svgBox.height / 2})rotate(270)`
        });
        text.addEventListener('click', this.options.yAxis.clickCallback);
        text.innerHTML = this.options.yAxis.title;
        __.ach(label, text);
        __.ach(this.svg, label);
    }

    _drawXAxisTitle() {
        if (!this._isShowXAxisTitle()) {
            return;
        }
        const svgBox = this._getSvgBox();
        const label = this._createSVGElement('g', {class: 'matrix-labels xaxis'});
        const text = this._createSVGElement('text', {
            'text-anchor': 'middle',
            x: svgBox.width / 2,
            y: svgBox.height - 5
        });
        text.addEventListener('click', this.options.xAxis.clickCallback);
        text.innerHTML = this.options.xAxis.title;
        __.ach(label, text);
        __.ach(this.svg, label);
    }

    _drawYAxisLabels() {
        if (!this._isShowYAxisTitle()) {
            return;
        }
        const mContainerBox = this.mContainer.getBoundingClientRect();
        const labelBox = this.svg.querySelector('.yaxis');

        const mXZero = mContainerBox.x - this._getSvgBox().x;
        const mYMin = this.settings.yShift - 5;
        let shape = `M${mXZero},${mYMin} l0,${mContainerBox.height + 10}`;

        let axis = this._createSVGElement('path', {
            'stroke-width': '1px',
            d: shape,
        });
        __.ach(labelBox, axis);
        /*
                for (let i = 0; i < this._getMaxLengthSeries(); i++) {
                    let label = this.options.xAxis.labelNameGetter(i);
                    if (i === 0 && !label) {
                        label = this.options.xAxis.labelNameGetter('first');
                    }
                    if (i === this._getMaxLengthSeries() - 1 && !label) {
                        label = this.options.xAxis.labelNameGetter('last');
                    }
                    if (!label) continue;
                    const x = mXZero + i * this.options.squareSize + this.options.squareSize / 2;
                    shape = `M${x},${mYMax} l0,5`;
                    const verticalLine = this._createSVGElement('path', {
                        'stroke-width': '1px',
                        d: shape
                    });
                    const textElement = this._createSVGElement('text', {
                        'text-anchor': 'middle',
                        x: x,
                        y: mContainerBox.height + 20
                    });
                    textElement.innerHTML = label;
                    __.ach(labelBox, verticalLine);
                    __.ach(labelBox, textElement);
                }
         */
    }

    _drawXAxisLabels() {
        if (!this._isShowXAxisTitle()) {
            return;
        }
        const mContainerBox = this.mContainer.getBoundingClientRect();
        const mainAaxisElement = this.svg.querySelector('.xaxis');
        const linesBox = this._createSVGElement('g');
        const labelsBox = this._createSVGElement('g');
        __.ach(mainAaxisElement, linesBox);
        __.ach(mainAaxisElement, labelsBox);

        const mXZero = mContainerBox.x - this._getSvgBox().x;
        const mYMax = mContainerBox.height + this.settings.yShift;
        let shape = `M${mXZero - 5},${mYMax} l${mContainerBox.width + 10},0`;

        let axis = this._createSVGElement('path', {
            'stroke-width': '1px',
            d: shape,
        });
        __.ach(linesBox, axis);

        let maxLength = this._getMaxLengthSeries();
        for (let i = 0; i < maxLength; i++) {
            const label = this.options.xAxis.labelNameGetter(i, 0, maxLength);
            if (!label) continue;
            const x = mXZero + i * this.options.squareSize + this.options.squareSize / 2;
            shape = `M${x},${mYMax} l0,${this.settings.axisStrokeLength}`;
            const stroke = this._createSVGElement('path', {
                'stroke-width': '1px',
                d: shape
            });
            __.ach(linesBox, stroke);

            const textElement = this._createSVGElement('text', {});
            textElement.innerHTML = label;
            __.ach(labelsBox, textElement);
            __.attrs(textElement, {
                'text-anchor': 'middle',
                x,
                y: mContainerBox.height + stroke.getBoundingClientRect().height + textElement.getBoundingClientRect().height + 3
            })
        }
    }

    _getMaxLengthSeries() {
        let max = 0;
        for (let i in this.data.rows) {
            max = this.data.rows[i].series.length > max ? this.data.rows[i].series.length : max;
        }
        return max;
    }

    _drawRows() {
        let y = 0;
        for (let i in this.data.rows) {
            this._drawRow(this.data.rows[i], y);
            y++;
        }
    }

    _getXShift() {
        return this._isShowYAxisTitle() ? this.settings.xShift + 25 : this.settings.xShift;
    }

    _prepareCanvas() {
        const data = this.data;
        __.clr(this.svg);
        let width = data.hasOwnProperty('columns') ? data.columns.length : this._getMaxLengthSeries();
        width = (width + 1) * this.options.squareSize;
        if (this._isShowXAxisTitle()) {
            width += this._getXShift();
        }
        let height = (data.rows.length + 1) * this.options.squareSize;
        if (this._isShowYAxisTitle()) {
            height += 35 + this.settings.yShift;
        }
        __.props(this.svg, {style: {height: `${height}px`, width: `${width}px`}});
        let background = this._createSVGElement('rect', {
            width: '100%',
            height: '100%',
            fill: this.options.backgroundColor
        });
        this.mContainer = this._createSVGElement('g', {class: 'mContainer'});
        __.ach(this.svg, background);
        __.ach(this.svg, this.mContainer);
    }
}
