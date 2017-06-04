var options,_location
if(window.INSTALL_OPTIONS) {
    options=INSTALL_OPTIONS
    _location= INSTALL.proxy.originalURL.parsed
}
else {
    options={
        color:'blue',
        position:'top left',
        placeholder:'Enter search term ...'
    }
    _location=window.location
}

function get_host(){
    return _location.host
}

function addSearchToPage(){    
    SVG=SVG.replace(/color/,options.color)
    search_outer=document.createElement('div')
    document.body.appendChild(search_outer)
    search_outer.id='search_outer'
    search_outer.innerHTML='<div id=search_open><input onblur=input_blur() onkeypress=input_key_press(event) id=site_search type=search><button style=display:none onclick=search() value=search>Search</button></div><div id="search_trigger" onclick="search_trigger()">Trigger</div></div>'
    document.getElementById('site_search').setAttribute('placeholder',options.placeholder)
    search_outer.setAttribute('class',options.position)
    document.getElementById('search_trigger').innerHTML=SVG
}
function input_blur(){
    setTimeout(function(){
        close_search()
    },100)
}
function close_search(){
    document.getElementById('search_open').style.display='none'
    document.getElementById('search_trigger').style.display='block'
}
function search_trigger(){
    open_search()
}
function open_search(){
    document.getElementById('search_open').style.display='block'
    document.getElementById('search_trigger').style.display='none'
    document.getElementById('site_search').focus()
}
function input_key_press(e){
    if(e.keyCode==13) {
        search()
    }
}
function search(){
    window.open(getSearchUrl(),'_blank')
}
function getSearchUrl(){
    var searchTerm=getSearchTerm()
    return 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm) + ' site:' + get_host()
}

function getSearchTerm(){
    return document.getElementById('site_search').value
}

var SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 	 width="30" height="30" viewBox="0 0 485.213 485.213" fill="color" style="enable-background:new 0 0 485.213 485.213;" 	 xml:space="preserve"> <g> 	<g> 		<path d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951 			C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46 			c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465 			C318.424,257.208,257.206,318.416,181.956,318.416z"/> 		<path d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324 			c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z"/> 	</g> </g> </svg>'
addSearchToPage()