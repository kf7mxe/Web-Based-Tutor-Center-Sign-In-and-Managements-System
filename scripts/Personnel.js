import Firebase from "/scripts/Firebase.js"
import HTMLRenderer from "/scripts/HTMLRenderer.js"
import Search from "/scripts/Search.js"
firebase = new Firebase();
let htmlRenderer = new HTMLRenderer('#personelCards');
let search = new Search();
let data =[];
firebase.getCollectionRealtimeData("personnel","lastName",data,htmlRenderer);
search.filterHtml("#searchBar","#personelCards div")