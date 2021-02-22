import Firebase from '/scripts/firebase.js'
import HTMLElementRenderer from "/scripts/HTMLRenderer.js"
import FacilityTrackerEventListeners from "/scripts/FacilityTrackerEventListeners.js"
import Search from "/scripts/Search.js"
export default class FacilityTrackerEditor {
    constructor(){
        this.index =10;
        this.amountToLoad = 10;
        this.loginItems = []
        this.currentLoginItems = []
        firebase = new Firebase();
        this.HTMLElementRenderer = new HTMLElementRenderer('inPersonTrackerTable');
        this.search = new Search();
        this.eventListeners = new FacilityTrackerEventListeners(this);
        this.fillRowsWithData()
    }

    fillRowsWithData(){
        this.HTMLElementRenderer.resetContainer()
        firebase.getCollectionDataPromise("inPersonTracker").then(data=>{
            for(let i = 0;i<data.length; i++){
                this.loginItems.push(data[i])
                this.currentLoginItems.push(data[i])
                if(i<=this.amountToLoad){
                    this.HTMLElementRenderer.facilityTrackerEditorHtmlRenderer(data[i])
                }
            }
            let context = this
            window.addEventListener('scroll',function(e){
                context.lazyLoad(context)
            });
            this.search.lazyLoadSearchListener('#search',this.loginItems,this.facilityEntryFilter,this,this.HTMLElementRenderer.facilityTrackerEditorHtmlRenderer,'#inPersonTrackerTable')

        })
    }

    renderRows(){
        let list = "";
        for(let i=0;i<amountToLoad;i++){
            this.HTMLElementRenderer.facilityTrackerEditorHtmlRenderer(currentLoginItems[i]);
        }
    } 
    facilityEntryFilter(dataToSearchThrough,value){
        if(dataToSearchThrough.data().aNumber.toLowerCase().includes(value) || dataToSearchThrough.data().major.toLowerCase().includes(value) ||  dataToSearchThrough.data().course.toLowerCase().includes(value) || dataToSearchThrough.data().date.toLowerCase().includes(value))
            {
                return true
            }
            return false;
    }

    async lazyLoad(){
        let scrollIsAtTheBottom = (document.documentElement.scrollHeight - window.innerHeight) === window.scrollY;
        let bottom = document.documentElement.scrollHeight >= window.innerHeight -20
        let difference = (document.documentElement.scrollHeight - window.innerHeight)-window.scrollY
        if(difference<1){scrollIsAtTheBottom = true}
       if(bottom){
           for(var j=this.index;j<(this.index+this.amountToLoad);j++){
               if(this.currentLoginItems.length >j){
                   this.HTMLElementRenderer.facilityTrackerEditorHtmlRenderer(this.currentLoginItems[j])
           }
       }
       this.index = this.index +this.amountToLoad
   }
}

}

let facilityTrackerEditor = new FacilityTrackerEditor();