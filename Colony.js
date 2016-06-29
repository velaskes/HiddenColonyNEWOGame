// ==UserScript==
// @name        Colonia Hidden
// @include     https://*.ogame.*/game*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/
var playerid = document.querySelector('meta[name="ogame-player-id"]').getAttribute("content");
var universe = document.querySelector('meta[name="ogame-universe"]').getAttribute("content");
var timestampuni = document.querySelector('meta[name="ogame-timestamp"]').getAttribute("content");
//--- Use jQuery to add the form in a "popup" dialog.
$("body").append ( '                                                          \
    <div id="gmPopupContainer">                                               \
    <div id="gmPopupContainerChild"></div>                                               \
     <button id="gmActualDlgBtn" type="button">Actualizar</button>         \
     <button id="gmCloseDlgBtn" type="button">Cerrar</button>         \
</div>                                                                    \
' );


$("#menuTableTools").append ( '<li><a id="gmOpenBtn" class="menubutton" href="javascript:void(0)"><span class="textlabel">Hidden Colony NEW</span></a></li>' );

//--- Use jQuery to activate the dialog buttons.

$("#gmPopupContainer").hide ();
$("#gmOpenBtn").click ( function () {
    actualitzar();
    $("#gmPopupContainer").show ();
} );
$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );
$("#gmActualDlgBtn").click ( function () {
    actualitzar();
} );
//--- CSS styles make it work...
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    30%;                            \
        left:                   20%;                            \
        padding:                2em;                            \
        background:             #182028;                     \
        border:                 3px double black;               \
        border-radius:          1ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );


function actualitzar(){
    $("div#gmPopupContainerChild div").remove();

var totplanetsp ="<b>PlayerData</b><br />";
GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://'+universe+'/api/playerData.xml?id='+playerid,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "application/xml");
        
        var entries = dom.getElementsByTagName('planet');
        var title;
        var j =0
        for (var i = 0; i < entries.length; i++) {
           title = entries[i].attributes['coords'].value
           
            totplanetsp = totplanetsp + "<a>"+(i+1)+" --> "+title+"</a><br />";
           
           //title = (new XMLSerializer()).serializeToString(entries[i]);
            
        } 
         totplanetsp = totplanetsp + "<br />";
        var divPorPlanetas = document.createElement('div');
            divPorPlanetas.innerHTML = totplanetsp;
            var main = document.getElementById("gmPopupContainerChild");
            main.appendChild(divPorPlanetas);
    }});
var totplanets2  = "<b>Universe</b><br />"; 


GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://'+universe+'/api/universe.xml',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "application/xml");
        
        var entries = dom.getElementsByTagName('planet');
        var title;
        var j =0
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].attributes['player'].value == playerid){
              title = entries[i].attributes['coords'].value
              j=j+1;
            totplanets2 = totplanets2 + "<a>"+j+" --> "+title+"</a><br />";
            }
           //title = (new XMLSerializer()).serializeToString(entries[i]);
            
        } 
         totplanets2 = totplanets2 + "<br />";
        var divPorPlanetas = document.createElement('div');
            divPorPlanetas.innerHTML = totplanets2;
            var main = document.getElementById("gmPopupContainerChild");
            main.appendChild(divPorPlanetas);
    }});
} 

    
