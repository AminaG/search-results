'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if ('undefined' == typeof BlockLy) {
    BlockLy = {};
}

(function () {
    var gSearch = function () {
        function gSearch() {
            _classCallCheck(this, gSearch);
        }

        _createClass(gSearch, [{
            key: 'getHost',
            value: function getHost() {
                return BlockLy.gSearch.location.host;
            }
        }, {
            key: 'addSearchToPage',
            value: function addSearchToPage() {
                this.currentSVG = this.SVG.replace(/color/, this.options.color);
                this.search_outer = document.createElement('BlockLy-g-search');
                document.body.appendChild(this.search_outer
                //search_outer.id='search_outer'
                );this.search_outer.innerHTML = '<BlockLy-g-search-inner>\n                                        <input onblur="BlockLy.gSearch.blur()" onkeypress="BlockLy.gSearch.keyPress(event)" type=\'search\'>\n                                        <button style=\'display:none\' onclick=\'BlockLy.gSearch.search()\' value=\'search\'>Search</button>\n                                        <BlockLy-g-search-trigger onclick="BlockLy.gSearch.searchTrigger()">\n                                        Trigger\n                                        </BlockLy-g-search-trigger>\n                                    </BlockLy-g-search-inner>';
                document.getElementById('site_search').setAttribute('placeholder', options.placeholder);
                search_outer.setAttribute('class', this.options.position);
                document.getElementById('search_trigger').innerHTML = this.currentSVG;
            }
        }, {
            key: 'blur',
            value: function blur() {
                var _this = this;
                setTimeout(function () {
                    _this.closeSearch();
                }, 100);
            }
        }, {
            key: 'closeSearch',
            value: function closeSearch() {
                this.removeClass(this.search_outer, 'BlockLy-gsearch-opened');
                //document.getElementById('search_open').style.display='none'
                //document.getElementById('search_trigger').style.display='block'
            }
        }, {
            key: 'addClass',
            value: function addClass(elm, className) {
                var classAttr = elm.className,
                    classList = classAttr.split(' ');
                if (classList.indexOf(className) == -1) {
                    classList.push(className);
                }
                elm.className = classList.join(' ');
            }
        }, {
            key: 'removeClass',
            value: function removeClass(elm, className) {
                var classAttr = elm.className,
                    classList = classAttr.split(' ');
                if (classList.indexOf(className) > -1) {
                    classList.splice(classList.indexOf(className), 1);
                }
                elm.className = classList.join(' ');
            }
        }, {
            key: 'searchTrigger',
            value: function searchTrigger() {
                this.openSearch();
            }
        }, {
            key: 'openSearch',
            value: function openSearch() {
                this.removeClass(this.search_outer, 'BlockLy-gsearch-opened');
                // document.getElementById('search_open').style.display='block'
                // document.getElementById('search_trigger').style.display='none'
                document.getElementById('site_search').focus();
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
                window.open(this.getSearchUrl(), '_blank');
            }
        }, {
            key: 'getSearchUrl',
            value: function getSearchUrl() {
                var searchTerm = this.getSearchTerm();
                return 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm) + ' site:' + get_host();
            }
        }, {
            key: 'getSearchTerm',
            value: function getSearchTerm() {
                return document.getElementById('site_search').value;
            }
        }]);

        return gSearch;
    }();

    ;
    /*BlockLyGSearch.options = null;
    BlockLyGSearch.location : null;
    */
    BlockLy.gSearch = new gSearch();
    BlockLy.gSearch.SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"      width="30" height="30" viewBox="0 0 485.213 485.213" fill="color" style="enable-background:new 0 0 485.213 485.213;"    xml:space="preserve"> <g>  <g>         <path d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951          C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46           c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465             C318.424,257.208,257.206,318.416,181.956,318.416z"/>        <path d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324            c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z"/>   </g> </g> </svg>';

    if (window.INSTALL_OPTIONS) {
        BlockLy.gSearch.options = INSTALL_OPTIONS;
        BlockLy.gSearch.location = INSTALL.proxy.originalURL.parsed;
    } else {
        BlockLy.gSearch.options = {
            color: 'blue',
            position: 'top left',
            placeholder: 'Enter search term ...'
        };
        BlockLy.gSearch.location = window.location;
    }
    BlockLy.gSearch.addSearchToPage();
    console.log('ssss');
})();
