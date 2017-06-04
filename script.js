
if('undefined' == typeof BlockLy){
    BlockLy = {};
}

(function(){
    class gSearch{
        getHost(){
            return BlockLy.gSearch.location.host;
        }
        addSearchToPage(){    
            this.currentSVG = this.SVG.replace(/color/,this.options.color);
            this.searchOuter = document.createElement('blockly-g-search');
            document.body.appendChild(this.searchOuter)
            //searchOuter.id='searchOuter'
            this.searchOuter.innerHTML = `<blockly-g-search-inner>
                                        <blockly-g-search-visible-on-open>
                                            <input class="blockly-g-search-input" onblur="BlockLy.gSearch.blur()" onkeypress="BlockLy.gSearch.keyPress(event)" type='search'>
                                            <button onclick='BlockLy.gSearch.search()' value='search' onfocus="BlockLy.gSearch.focusOnSubmit()" onblur="BlockLy.gSearch.blur()">Search</button>
                                        </blockly-g-search-visible-on-open>
                                        <blockly-g-search-trigger onclick="BlockLy.gSearch.searchTrigger()">
                                        Trigger
                                        </blockly-g-search-trigger>
                                    </blockly-g-search-inner>`;
            this.searchInput = document.getElementsByClassName('blockly-g-search-input')[0];
            this.searchInput.setAttribute('placeholder',this.options.placeholder)
            this.searchOuter.setAttribute('class', this.options.position)
            document.getElementsByTagName('blockly-g-search-trigger')[0].innerHTML = this.currentSVG;
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
            return this.searchInput.value
        }    
    };
/*BlockLyGSearch.options = null;
BlockLyGSearch.location : null;
*/
BlockLy.gSearch = new gSearch()
BlockLy.gSearch.SVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"      width="30" height="30" viewBox="0 0 485.213 485.213" fill="color" style="enable-background:new 0 0 485.213 485.213;"    xml:space="preserve"> <g>  <g>         <path d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951          C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46           c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465             C318.424,257.208,257.206,318.416,181.956,318.416z"/>        <path d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324            c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z"/>   </g> </g> </svg>';

if(window.INSTALL_OPTIONS) {
    BlockLy.gSearch.options = INSTALL_OPTIONS;
    BlockLy.gSearch.location = INSTALL.proxy.originalURL.parsed;
}
else {
    BlockLy.gSearch.options={
        color:'blue',
        position:'top left',
        placeholder:'Enter search term ...'
    }
    BlockLy.gSearch.location = window.location;
}
BlockLy.gSearch.addSearchToPage();
console.log('ssss');
})();






 
