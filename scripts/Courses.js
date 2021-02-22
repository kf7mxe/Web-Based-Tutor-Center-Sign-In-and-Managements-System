import Firebase from "/scripts/Firebase.js"
import HTMLRenderer from "/scripts/HTMLRenderer.js"
import EventListeners from "/scripts/CoursesEventListeners.js"
import Search from "/scripts/Search.js"

export default class Courses {
    constructor(){
        console.log("in courses constructor")
        firebase = new Firebase();
        this.htmlRenderer = new HTMLRenderer('#courses-table');
        this.search = new Search();
        this.eventListeners = new EventListeners();
        this.data =[];
        firebase.getCollectionRealtimeData("courses","coursePrefix",this.data,this.htmlRenderer);
        this.search.filterHtml("#searchBar","#courses-table tr")
    }
}
let courses = new Courses();


