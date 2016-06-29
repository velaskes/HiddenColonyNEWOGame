// ==UserScript==
// @name        Colonia Hidden
// @grant       GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version      0.1
// @include      *://*.ogame.*/game/index.php?*page=*
// @include      *://*.ogame.gameforge.*/game/index.php?*page=*
// ==/UserScript==

var playerid = document.querySelector('meta[name="ogame-player-id"]').getAttribute("content");
var universe = document.querySelector('meta[name="ogame-universe"]').getAttribute("content");
var timestampuni = document.querySelector('meta[name="ogame-timestamp"]').getAttribute("content");

$("body").append ( '<div id="gmPopupContainer"><div id="gmPopupContainerChild"></div><button id="gmActualDlgBtn" type="button">Actualizar</button>&nbsp;<button id="gmCloseDlgBtn" type="button">Cerrar</button></div>' );


$("#menuTableTools").append ( '<li><a id="gmOpenBtn" class="menubutton" href="javascript:void(0)"><span class="textlabel">Hidden Colony NEW</span></a></li>' );

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

GM_addStyle ("#gmPopupContainer{position:absolute;top:30%;left:20%;padding:2em;background:#182028;border:3pxdoubleblack;border-radius:1ex;z-index:777;}#gmPopupContainerbutton{cursor:pointer;margin:1em1em0;border:1pxoutsetbuttonface;}");

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
            var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
            var entries = dom.getElementsByTagName('planet');
            var title;
            var j =0;
            for (var i = 0; i < entries.length; i++) {
                title = entries[i].attributes.coords.value;
                totplanetsp = totplanetsp + "<a>"+(i+1)+" --> "+title+"</a><br />";
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
            var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
            var entries = dom.getElementsByTagName('planet');
            var title;
            var j =0;
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].attributes.player.value == playerid){
                    title = entries[i].attributes.coords.value;
                    j=j+1;
                    totplanets2 = totplanets2 + "<a>"+j+" --> "+title+"</a><br />";
                }
            } 
            totplanets2 = totplanets2 + "<br />";
            var divPorPlanetas = document.createElement('div');
            divPorPlanetas.innerHTML = totplanets2;
            var main = document.getElementById("gmPopupContainerChild");
            main.appendChild(divPorPlanetas);
        }});
} 
