matrix-chart.js requires __.js

```javascript
function reDrawMatrixChart() {
    $.getJSON('matrixChartData') // use whatever XHR library you want
        .done((data) => {
            window.matrix-chart.draw(data);
        })
        .fail(() => {
            console.log('oups');
        });
}

function _lockTooltip() {
    const svgBox = window.matrix-chart.getSvg().getBoundingClientRect();
    const overlay = __.cel('div', {
        id: 'matrix-chart-lock-overlay',
        style: {
            top: `${svgBox.top}px`,
            left: `${svgBox.left}px`,
            width: `${svgBox.width}px`,
            height: `${svgBox.height}px`,
        }
    }, document.body);
    __.ctn('Click anywhere on the chart to unlock', overlay);
    overlay.addEventListener('click', _unlockTooltip);
    window.locktooltip = true;
}

function _unlockTooltip() {
    const overlay = __.gid('matrix-chart-lock-overlay');
    overlay.parentNode.removeChild(overlay);
    window.locktooltip = false;
    _hideTooltip();
}
function _hideTooltip() {
  console.log('hide tooltip');
}

function _showTooltip() {
  console.log(e.target.dataset);
}

function _invertXAxis() {
    const options = window.matrix-chart.getOptions();
    let xAxisName, xAxisAlign = options.xAxisAlign;
    if (xAxisAlign === 'left') {
        xAxisAlign = 'right';
        xAxisName = '← Time (UTC) ←';
    } else {
        xAxisAlign = 'left';
        xAxisName = MATRIX_CHART_OPTIONS.xAxisName;
    }
    window.matrix-chart.setOptions(__.merge(options, {xAxisAlign, xAxisName}));
    reDrawMatrixChart();
}

const MATRIX_CHART_OPTIONS = {
    squareSize: 8,
    externalCss: "/css/qa/dhchecker.css",
    xAxisName: '→ Time (UTC) →',
    yAxisName: '← Rows ←',
    mouseClickPixelCallback: _lockTooltip,
    mouseOverPixelCallback: _showTooltip,
    mouseOutPixelCallback: _hideTooltip,
    mouseXAxisClickCallback: _invertXAxis,
    xAxisLabelNameGetter: (index) => {
    
    // x Axis will show '-1h' and 'now' on different ends of the axis
        const first = '-' + (history.state['from'] || history.state['rt']);
        const last = 'now';
        if (index === 'first') {
            return (window.matrix-chart.getOptions().xAxisAlign === 'left') ? first : last;
        }
        if (index === 'last') {
            return (window.matrix-chart.getOptions().xAxisAlign === 'left') ? last : first;
        }
        const hours = index / 60 - Math.trunc(index / 60);
        if (index != 0 && index !== "undefined" && hours === 0) {
            return `-${index / 60}h`;
        }
        return false;
    },
};

const window.matrix-chart = new MatrixChart(__.gid('matrix'), 1, options);
reDrawMatrixChart();
```
