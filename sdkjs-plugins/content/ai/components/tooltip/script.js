function Tooltip(targetEl, options) {
    this._init = function() {
        var self = this;
        var defaults = {
            text: '',
            xAnchor: 'center',
            yAnchor: 'bottom',
            align: 'center'
        };
        this.options = Object.assign({}, defaults, options);

        this.tooltipEl = document.getElementById('tooltip');
        if(!this.tooltipEl) {
            this.tooltipEl = document.createElement("div");
            this.tooltipEl.id = "tooltip";
            document.body.appendChild(this.tooltipEl);
            $(this.tooltipEl).hide();
        }

        targetEl.addEventListener('mouseover', function(e) {
            $(self.tooltipEl).show();
            self.tooltipEl.innerText = self.options.text;
            self._updatePosition();
        });
        targetEl.addEventListener('mouseleave', function(e) {
            $(self.tooltipEl).hide();
        });
    };

    this._updatePosition = function() {
        var rectTooltip = this.tooltipEl.getBoundingClientRect();
        var rectEl = targetEl.getBoundingClientRect();
        var yOffset = 3;
        var xOffset = 0;
        if(this.options.align == 'right') {
            xOffset = -rectTooltip.width;
        } else if(this.options.align == 'center') {
            xOffset = -rectTooltip.width / 2;
        }


        if(this.options.xAnchor == 'right') {
            this.tooltipEl.style.left = rectEl.right + xOffset + 'px';
        } else if(this.options.xAnchor == 'center') {
            this.tooltipEl.style.left = rectEl.left + rectEl.width/2 + xOffset + 'px';
        }


        if(this.options.yAnchor == 'bottom') {
            this.tooltipEl.style.top = rectEl.bottom  + yOffset + 'px';
        } else if(this.options.yAnchor == 'top') {
            this.tooltipEl.style.top = rectEl.top  - yOffset - rectTooltip.height + 'px';
        }
    };

    this.getText = function() {
        return this.options.text;
    };

    this.setText = function(text) {
        this.options.text = text;
        this.tooltipEl.innerText = text;
        this._updatePosition();
    };

    this._init();
}