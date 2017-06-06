if(!window.INSTALL_SCOPE){
    window.INSTALL_SCOPE = {};
}
if('undefined' == typeof INSTALL_SCOPE.BlockLy){
    INSTALL_SCOPE.BlockLy = {};
}
(function(){
    class gSearch{
        getHost(){
            return INSTALL_SCOPE.BlockLy.gSearch.location.host;
        }
        
        reload(options){
            this.options = options;
            this.currentSVG = this.SVG.replace(/color/,this.options.icon_color); 
            this.reRender();
        }
        reRender(){
            this.searchOuter = document.createElement('blockly-g-search');
            this.searchOuter.innerHTML = `<blockly-g-search-inner>
                                        <blockly-g-search-visible-on-open>
                                            <input class="blockly-g-search-input" type='search'>
                                            <button type="button" class="blockly-g-search-submit" >Search</button>
                                        </blockly-g-search-visible-on-open>
                                        <blockly-g-search-trigger >
                                        Trigger
                                        </blockly-g-search-trigger>
                                    </blockly-g-search-inner>`;
            this.addClass(this.searchOuter,'theme-' + this.options.theme);    
            this.elm = ('undefined' != typeof INSTALL.createElement) ? INSTALL.createElement(this.options.location, this.elm) : document.body;
            console.log(typeof INSTALL.createElement);
            this.renderInElm();
            if(this.options["location type"] == 'floated'){
                this.renderFloated();
            }        
            
            this.searchInput = document.getElementsByClassName('blockly-g-search-input')[0];
            this.searchSubmit = document.getElementsByClassName('blockly-g-search-submit')[0];
            this.trigger = document.getElementsByTagName('blockly-g-search-trigger')[0];
            //console.log(this, 'fffffff');
            this.trigger.innerHTML = this.currentSVG;
            this.searchInput.setAttribute('placeholder',this.options.placeholder);
            this.searchSubmit.textContent  = this.options.submit_text;
            this.bindEvents();
        }
        bindEvents(){
            var myThis = this;
            this.searchInput.onblur = function(){
                myThis.blur();
            }
            this.searchInput.onkeypress = function(e){
                e = e ? e : window.event;
                myThis.keyPress(e);
            }

            this.searchSubmit.onclick = function(){
                myThis.search();
            }

            this.searchSubmit.onfocus = function(){
                myThis.focusOnSubmit();
            }
            this.searchSubmit.onblur = function(){
                myThis.blur();
            }

            this.trigger.onclick = function(){
                myThis.searchTrigger();
            }
        }
        renderInElm(){
            var elm = INSTALL_SCOPE.BlockLy.gSearch.elm ? INSTALL_SCOPE.BlockLy.gSearch.elm : document.body;
            elm.appendChild(this.searchOuter);
            //searchOuter.id='searchOuter'
            
        }
        renderFloated(){
            this.addClass(this.searchOuter, 'blockly-g-floated');
            var cssObj = {};
            cssObj[this.options.postion_horizontal.type] = this.options.postion_horizontal.distance;
            cssObj[this.options.postion_vertical.type] = this.options.postion_vertical.distance;
            
            //console.log(this.options);
            //console.log(cssObj);
            this.addCss(this.searchOuter, cssObj);
            //document.body.appendChild(this.searchOuter);
        }
        blur(){
            var _this = this;
            this.closeTimeout = setTimeout(function(){
                _this.closeSearch()
            },100)
        }
        focusOnSubmit(){
            clearTimeout(this.closeTimeout);
        }
        closeSearch(){
            this.removeClass(this.searchOuter, 'blockly-gsearch-opened');
            //document.getElementById('search_open').style.display='none'
            //document.getElementById('search_trigger').style.display='block'
        }
        addClass(elm, className){
            var classAttr = elm.className,
                classList = classAttr.split(' ');
            if(classList.indexOf(className) == -1){
                classList.push(className);
            }
            elm.className = classList.join(' ');
        }
        removeClass(elm, className){
            var classAttr = elm.className,
                classList = classAttr.split(' ');
            if(classList.indexOf(className) > -1){
                classList.splice(classList.indexOf(className),1);
            }
            elm.className = classList.join(' ');
        }
        addCss(domElm, cssObj){
            for(var i in cssObj){
                domElm.style[i] = cssObj[i];
            }
            console.log(domElm, domElm.style);
        }
        searchTrigger(){
            this.openSearch();
        }
        openSearch(){
            this.addClass(this.searchOuter, 'blockly-gsearch-opened');
            // document.getElementById('search_open').style.display='block'
            // document.getElementById('search_trigger').style.display='none'
            this.searchInput.focus()
        }
        keyPress(e){
            if(e.keyCode==13) {
                this.search();
            }
        }
        search(){
            window.open(this.getSearchUrl(),'_blank')
        }
        getSearchUrl(){
            var searchTerm = this.getSearchTerm();
            return 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm) + ' site:' + this.getHost()
        }
        getSearchTerm(){
            return this.searchInput.value;
        }    
    };
/*BlockLyGSearch.options = null;
BlockLyGSearch.location : null;
*/
INSTALL_SCOPE.BlockLy.gSearch = new gSearch()
INSTALL_SCOPE.BlockLy.gSearch.SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"      width="30" height="30" viewBox="0 0 485.213 485.213" fill="color" style="enable-background:new 0 0 485.213 485.213;"    xml:space="preserve"> <g>  <g>         <path d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951          C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46           c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465             C318.424,257.208,257.206,318.416,181.956,318.416z"/>        <path d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324            c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z"/>   </g> </g> </svg>';
INSTALL_SCOPE.BlockLy.gSearch.elm = null;

if(window.INSTALL_OPTIONS) {
    INSTALL_SCOPE.BlockLy.gSearch.location = INSTALL.proxy.originalURL.parsed;
    // console.log('dddddd');
    // console.log(INSTALL);
    INSTALL_SCOPE.BlockLy.gSearch.reload(INSTALL_OPTIONS);
}
else {
    INSTALL_SCOPE.BlockLy.gSearch.location = window.location;
    INSTALL_SCOPE.BlockLy.gSearch.reload({
        color:'blue',
        'location type':'floated',
        'postion_horizontal' :{
            'type':'left',
            distance:'10px'
        },
        'postion_vertical' :{
            'type':'top',
            distance:'10px'
        },
        submit_text:'now',
        theme:'light',
        placeholder:'Enter search term ...'
    });
}
//INSTALL_SCOPE.BlockLy.gSearch.addSearchToPage();
//console.log('ssss');
})();






 
