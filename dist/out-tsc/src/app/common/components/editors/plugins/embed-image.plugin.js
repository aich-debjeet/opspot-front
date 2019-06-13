"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var EmbedImage = /** @class */ (function () {
    function EmbedImage(options) {
        this.options = { placeholder: '' };
        this.urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        this.options = __assign({}, options);
        this.button = document.createElement('button');
        this.button.className = 'medium-editor-action';
        this.button.innerHTML = options.buttonText || "</>";
        this.button.onclick = this.handleClick.bind(this);
    }
    EmbedImage.prototype.init = function () {
        this._serializePreImages = this.base.serialize;
        this.base.serialize = this.editorSerialize.bind(this);
        this.$element = document.querySelector('.medium-editor-element');
        this.events();
    };
    EmbedImage.prototype.getButton = function () {
        return this.button;
    };
    EmbedImage.prototype.createP = function () {
        var p = document.createElement('p');
        p.innerHTML = '<br>';
        return p;
    };
    EmbedImage.prototype.upgradeSpinner = function ($place) {
        var spinner = $place.querySelector('.mdl-spinner');
        if (spinner) {
            window.componentHandler.upgradeElement(spinner);
        }
    };
    EmbedImage.prototype.insertHTML = function (imgSrc, $place, timestamp) {
        if ($place === void 0) { $place = null; }
        if (timestamp === void 0) { timestamp = ''; }
        var sel = window.getSelection(), range;
        var div = this.getHTML(imgSrc, timestamp);
        if ($place) {
            var p = document.createElement('p');
            p.appendChild(div);
            $place.parentNode.replaceChild(p, $place);
            p.parentNode.insertBefore(this.createP(), p);
            if (p.nextElementSibling) {
                p.parentNode.insertBefore(this.createP(), p.nextElementSibling);
            }
            else {
                p.parentNode.appendChild(this.createP());
            }
            this.upgradeSpinner(div);
            return;
        }
        if (window.getSelection && (sel = window.getSelection()).rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.collapse(true);
            var div_1 = this.getHTML(imgSrc, timestamp);
            range.insertNode(this.createP());
            range.insertNode(div_1);
            var p = this.createP();
            range.insertNode(p);
            // Move the caret immediately after the inserted div
            range.setStartAfter(p);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            this.upgradeSpinner(div_1);
        }
    };
    EmbedImage.prototype.getHTML = function (imgSrc, timestamp) {
        if (timestamp === void 0) { timestamp = ''; }
        var div = document.createElement('div');
        div.classList.add('m-blog--image');
        div.classList.add('medium-insert-images');
        div.setAttribute('contenteditable', 'false');
        var inProgressOverlay = null;
        var spinner = null;
        var img = document.createElement('img');
        timestamp.trim();
        if (timestamp !== '') {
            img.classList.add('medium-image-preview-' + timestamp);
            inProgressOverlay = document.createElement('div');
            inProgressOverlay.classList.add('m-blog--image--in-progress-overlay');
            spinner = document.createElement('div');
            spinner.classList.add('mdl-spinner', 'mdl-js-spinner', 'is-active');
            window.componentHandler.upgradeElement(spinner);
            inProgressOverlay.appendChild(spinner);
        }
        img.src = imgSrc;
        img.onerror = function () {
            this.classList.add('m--img-not-found');
        };
        img.addEventListener('click', this.selectImage.bind(this));
        div.appendChild(img);
        var span = document.createElement('span');
        span.classList.add('m-blog--image-caption');
        span.textContent = this.options.placeholder;
        span.addEventListener('click', this.selectImage.bind(this));
        div.appendChild(span);
        if (inProgressOverlay) {
            div.appendChild(inProgressOverlay);
        }
        return div;
    };
    EmbedImage.prototype.handleClick = function (event) {
        var src = this.window.getSelection().toString().trim();
        if (this.urlRegex.exec(src)) {
            this.insertHTML(src);
        }
        this.base.checkContentChanged();
    };
    EmbedImage.prototype.events = function () {
        var _this = this;
        /* prevent default image drag&drop */
        this.$element.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.$element.addEventListener('drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.$element.addEventListener('keypress', function (e) {
            if (e.keyCode == 13) {
                _this.unselectImage(e);
            }
        });
        document.addEventListener('click', this.unselectImage.bind(this));
        this.$element.addEventListener('click', this.selectImage.bind(this));
        this.base.subscribe('action-images', function (data, editable) {
            var $place = _this.$element.querySelector('.medium-insert-active');
            _this.insertHTML(data.link, $place, '');
        });
        this.window.addEventListener('attachment-preview-loaded', function (event) {
            var $place = _this.$element.querySelector('.medium-insert-active');
            _this.insertHTML(event.detail.src, $place, event.detail.timestamp);
        });
        this.window.addEventListener('attachment-upload-finished', function (event) {
            var imgClass = 'medium-image-preview-' + event.detail.timestamp;
            var image = _this.$element.querySelector('.' + imgClass);
            var overlay = image.parentElement.querySelector('.m-blog--image--in-progress-overlay');
            overlay.parentElement.removeChild(overlay);
            image.classList.remove(imgClass);
            image.setAttribute('src', window.Opspot.site_url + 'fs/v1/thumbnail/' + event.detail.guid);
        });
    };
    ;
    EmbedImage.prototype.editorSerialize = function () {
        var data = this._serializePreImages();
        for (var i = 0; i < data.length; ++i) {
            var key = data[i];
            var $data = document.createElement('div');
            $data.innerHTML = data[key].value;
            $data.querySelector('.medium-insert-images').querySelector('figcaption, figure').removeAttribute('contenteditable');
            data[key].value = $data.innerHTML;
        }
        return data;
    };
    EmbedImage.prototype.selectImage = function (e) {
        var $image = e.target;
        if ($image.tagName === 'SPAN') {
            $image = $image.parentNode.querySelector('img');
        }
        if ($image.tagName !== 'IMG') {
            return;
        }
        this.$currentImage = $image;
        $image.classList.add('medium-insert-image-active');
        $image.parentNode.setAttribute('contenteditable', 'true');
        var caption = $image.nextSibling;
        caption.setAttribute('contenteditable', 'true');
        if (caption === e.target) {
            if (caption.textContent.trim() === this.options.placeholder) {
                caption.textContent = '';
            }
        }
        event.stopPropagation();
    };
    EmbedImage.prototype.unselectImage = function (e) {
        var $el = e.target, $image = document.querySelector('.medium-insert-image-active');
        if (!$image) {
            return;
        }
        if ($el.tagName === 'IMG' && $el.classList.contains('medium-insert-image-active')) {
            if ($image !== $el) {
                $image.classList.remove('medium-insert-image-active');
                $image.parentNode.setAttribute('contenteditable', 'false');
                var caption_1 = $el.nextSibling;
                caption_1.setAttribute('contenteditable', false);
                if (caption_1.textContent.includes(this.options.placeholder)) {
                    caption_1.textContent = '';
                }
                return;
            }
        }
        else if ($el.tagName === 'SPAN' && $image.nextSibling === $el) {
            return;
        }
        $image.classList.remove('medium-insert-image-active');
        $image.parentNode.setAttribute('contenteditable', 'false');
        var caption = $image.nextSibling;
        caption.setAttribute('contenteditable', false);
        if (caption.textContent.trim() === '') {
            caption.textContent = this.options.placeholder;
        }
        this.$currentImage = null;
    };
    /**
     * Move caret at the beginning of the empty paragraph
     */
    EmbedImage.prototype.moveCaret = function ($el, position) {
        if (position === void 0) { position = 0; }
        var range, sel, el, textEl;
        range = document.createRange();
        sel = window.getSelection();
        el = $el;
        if (!el.childNodes.length) {
            textEl = document.createTextNode(' ');
            el.appendChild(textEl);
        }
        range.setStart(el.childNodes[0], position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };
    EmbedImage.prototype.prepare = function () {
        var elements = this.$element.querySelectorAll('.m-blog--image');
        for (var i = 0; i < elements.length; ++i) {
            var item = elements[i];
            item.setAttribute('contenteditable', 'false');
            var caption = item.querySelector('.m-blog--image-caption');
            if (caption.textContent === this.options.placeholder) {
                caption.textContent = '';
            }
        }
        for (var i = 0; i < elements.length; ++i) {
            var item = elements[i];
            item.setAttribute('contenteditable', 'false');
            var caption = item.querySelector('.m-blog--image-caption');
            if (caption.textContent === this.options.placeholder) {
                caption.textContent = '';
            }
        }
    };
    return EmbedImage;
}());
exports.EmbedImage = EmbedImage;
//# sourceMappingURL=embed-image.plugin.js.map