'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if ('undefined' == typeof INSTALL_SCOPE.Blockly) {
    INSTALL_SCOPE.Blockly = {};
}
(function () {
    var gSearch = function () {
        function gSearch() {
            _classCallCheck(this, gSearch);
        }

        _createClass(gSearch, [{
            key: 'getHost',
            value: function getHost() {
                return INSTALL_SCOPE.Blockly.gSearch.location.host;
            }
        }, {
            key: 'reload',
            value: function reload(options) {
                this.options = options;


                this.reRender();
            }
        }, {
            key: 'reRender',
            value: function reRender() {
                this.searchOuter = document.createElement('blockly-g-search');
                this.searchOuter.innerHTML = '<blockly-g-search-outer>\n                                            <blockly-g-search-inner>\n                                                <blockly-g-search-visible-on-open>\n                                                    <input class="blockly-g-search-input" type=\'search\'>\n                                                </blockly-g-search-visible-on-open>\n                                                <blockly-g-search-bg>\n                                                    <button type="button" class="blockly-g-search-submit" >Search</button>\n                                                </blockly-g-search-bg>\n                                                </blockly-g-search-inner>\n                                            </blockly-g-search-outer>';
                this.addClass(this.searchOuter, 'blockly-g-search-theme-' + this.options.theme);
                this.elm = !INSTALL_SCOPE.devel ? INSTALL.createElement(this.options.location, this.elm) : document.body;

                this.renderInElm();
                if (this.options["location type"] == 'floated') {
                    this.renderFloated();
                }

                this.searchInput = document.getElementsByClassName('blockly-g-search-input')[0];
                this.searchSubmit = document.getElementsByClassName('blockly-g-search-submit')[0];

                this.searchInput.setAttribute('placeholder', this.options.placeholder);
                this.resizeSubmit();
                this.bindEvents();
                if (INSTALL_ID == 'preview') {
                    this.openSearch();
                }
            }
        }, {
            key: 'bindEvent',
            value: function bindEvent(el, evtType, fn) {
                if (el.addEventListener) {

                    el.addEventListener(evtType, fn, false);
                } else if (el.attachEvent) {
                    var _el = el,
                        f = function f() {
                        fn.call(_el, window.event);
                    };
                    el.attachEvent('on' + evtType, f);
                    el['blockly' + fn.toString() + evtType] = f;
                }
            }
        }, {
            key: 'removeEvent',
            value: function removeEvent(el, evtType, fn) {
                if (el.removeEventListener) {
                    el.removeEventListener(evtType, fn, false);
                } else if (el.detachEvent) {
                    el.detachEvent('on' + evtType, el['blockly' + fn.toString() + evtType]);
                }
            }
        }, {
            key: 'bindEvents',
            value: function bindEvents() {
                var myThis = this;
                this.bindEvent(window, 'resize', function () {
                    myThis.resizeSubmit();
                });
                this.bindEvent(this.searchInput, 'blur', function () {
                    myThis.blur();
                });

                this.bindEvent(this.searchInput, 'focus', function () {
                    myThis.focus();
                });

                this.bindEvent(this.searchInput, 'keypress', function (e) {
                    e = e ? e : window.event;
                    myThis.keyPress(e);
                });

                this.bindEvent(this.searchSubmit, 'click', function () {
                    myThis.iconClick();
                });
                this.bindEvent(this.searchSubmit, 'focus', function () {
                    myThis.focus();
                });

                this.bindEvent(this.searchSubmit, 'blur', function () {
                    myThis.blur();
                });
            }
        }, {
            key: 'renderInElm',
            value: function renderInElm() {
                var elm = INSTALL_SCOPE.Blockly.gSearch.elm ? INSTALL_SCOPE.Blockly.gSearch.elm : document.body;
                elm.appendChild(this.searchOuter);
            }
        }, {
            key: 'renderFloated',
            value: function renderFloated() {
                this.addClass(this.searchOuter, 'blockly-g-floated');
                console.log('this.options.position_horizontal.type', this.options.position_horizontal.type);
                if ('right' == this.options.position_horizontal.type) {
                    this.addClass(this.searchOuter, 'blockly-g-floated-at-left');
                }
                this.addClass(this.searchOuter, 'blockly-g-floated');
                var cssObj = {};
                cssObj[this.options.position_horizontal.type] = this.options.position_horizontal.distance + 'px';
                cssObj[this.options.position_vertical.type] = this.options.position_vertical.distance + 'px';

                this.addCss(this.searchOuter, cssObj);
            }
        }, {
            key: 'resizeSubmit',
            value: function resizeSubmit() {
                var currentWidth = this.searchSubmit.offsetWidth;
                if (currentWidth) {
                    this.addCss(this.searchSubmit, { height: currentWidth + 'px' });
                }
            }
        }, {
            key: 'blur',
            value: function blur() {
                var _this = this;

                if (this.getSearchTerm()) {
                    return;
                }
                this.closeTimeout = setTimeout(function () {
                    _this.closeSearch();
                }, 100);
            }
        }, {
            key: 'focus',
            value: function focus() {
                clearTimeout(this.closeTimeout);
            }
        }, {
            key: 'closeSearch',
            value: function closeSearch() {
                this.removeClass(this.searchOuter, 'blockly-gsearch-opened');
            }
        }, {
            key: 'getClassArr',
            value: function getClassArr(elm) {
                var classAttr = elm.className,
                    classList = classAttr.split(' ');
                return classList;
            }
        }, {
            key: 'hadClass',
            value: function hadClass(elm, className) {
                var classList = this.getClassArr(elm);
                return classList.indexOf(className) > -1;
            }
        }, {
            key: 'addClass',
            value: function addClass(elm, className) {
                var classList = this.getClassArr(elm);
                if (classList.indexOf(className) == -1) {
                    classList.push(className);
                }
                elm.className = classList.join(' ');
            }
        }, {
            key: 'removeClass',
            value: function removeClass(elm, className) {
                var classList = this.getClassArr(elm);
                if (classList.indexOf(className) > -1) {
                    classList.splice(classList.indexOf(className), 1);
                }
                elm.className = classList.join(' ').replace(/^\s|\s$/g, '');
            }
        }, {
            key: 'addCss',
            value: function addCss(domElm, cssObj) {
                for (var i in cssObj) {
                    domElm.style[i] = cssObj[i];
                }
            }
        }, {
            key: 'iconClick',
            value: function iconClick() {
                var hadVal = this.getSearchTerm();
                if (hadVal) {
                    this.search();
                }

                this.toggleSearch();
            }
        }, {
            key: 'toggleSearch',
            value: function toggleSearch() {
                if (!this.hadClass(this.searchOuter, 'blockly-gsearch-opened')) {
                    this.openSearch();
                } else {
                    this.closeSearch();
                }
            }
        }, {
            key: 'openSearch',
            value: function openSearch() {
                this.addClass(this.searchOuter, 'blockly-gsearch-opened');
                if (INSTALL_ID !== 'preview') {
                    this.searchInput.focus();
                }
            }
        }, {
            key: 'closeSearch',
            value: function closeSearch() {
                this.removeClass(this.searchOuter, 'blockly-gsearch-opened');
            }
        }, {
            key: 'keyPress',
            value: function keyPress(e) {
                if (e.keyCode == 13) {
                    this.search();
                }
            }
        }, {
            key: 'search',
            value: function search() {
                var openFunction;
                if (INSTALL_ID === 'preview') {
                    openFunction = CloudflareApps.preview.open.direct;
                } else {
                    openFunction = window.open;
                }
                openFunction(this.getSearchUrl(), '_blank');
            }
        }, {
            key: 'getSearchUrl',
            value: function getSearchUrl() {
                var searchTerm = this.getSearchTerm();
                return 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm) + ' site:' + this.getHost();
            }
        }, {
            key: 'getSearchTerm',
            value: function getSearchTerm() {
                return this.searchInput.value;
            }
        }]);

        return gSearch;
    }();

    ;

    INSTALL_SCOPE.Blockly.gSearch = new gSearch();

    INSTALL_SCOPE.Blockly.gSearch.elm = null;

    INSTALL_SCOPE.Blockly.gSearch.location = INSTALL.proxy.originalURL.parsed;

    INSTALL_SCOPE.Blockly.gSearch.reload(INSTALL_OPTIONS);
})();
