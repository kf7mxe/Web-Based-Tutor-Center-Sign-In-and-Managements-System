import Firebase from "/scripts/Firebase.js"
import GenerateSelectableCellsTable from "/scripts/GenerateSelectableCellsTable.js"

export default class Schedule{
    
    constructor(){
        firebase = new Firebase();
        this.page = this.selectScheduleFromUrl()
        this.collection = this.getScheduleCollection()
        this.generateSelectableCellsTable = new GenerateSelectableCellsTable();
        this.tableConfig = {
            startingTime:700,
            rows:26,
            cols:6
        }
        this.data =[];
        this.changesSaved="unchanged";
        this.weekDayHours = ['','','','','']
        this.weekday = ["friday","monday", "thursday","tuesday","wednesday"]
        this.setUpListeners();
        this.fillAndGenerateCellsFromFirebase();
        window.onbeforeunload = function(){
            if(this.changesSaved ==="changed"){
                return "You have unsaved changes to the schedule, Are you sure you want to leave?"
            }
        }
    }

    selectScheduleFromUrl(){
        let pageUrl= window.location.pathname
        return pageUrl.split('/')[pageUrl.split('/').length-1]
    }
    getScheduleCollection(){
        switch(this.page.split(".")[0]){
            case 'in-person-schedule':
                return 'inPersonSchedule'
            case 'online-schedule':
                return 'schedule'
            case 'schedule':
                return 'scheduleTest'
        }
    }

    fillAndGenerateCellsFromFirebase(){
        firebase.getCollectionDataPromise(this.collection).then(data=>{
            for(let i=0;i<5;i++){
                console.log("getting firebase collection ",data[i].id)
                let hoursData = JSON.parse(data[i].data().hours);
                this.weekDayHours[this.weekday.indexOf(data[i].id)]=hoursData
                console.log('testing hoursData h',hoursData)
                document.querySelector(`#${this.weekday[this.weekday.indexOf(data[i].id)]}`).innerHTML =this.generateSelectableCellsTable.generateEditTable(hoursData,this.tableConfig,this.generateSelectableCellsTable.incrementTimeEveryThirtyMin,this.generateSelectableCellsTable.getHeaderTime,this.generateSelectableCellsTable.tutorCenterScheduleRenderer);
                this.setUpClickListenersForCells(this.weekDayHours[this.weekday.indexOf(data[i].id)],this.weekday.indexOf(data[i].id))

            }
        })
    }

    setUpClickListenersForCells(data,day){
        let scheduleObj = this;
        document.getElementById(this.weekday[day]).addEventListener("click", function(e) {
            // e.target is the clicked element!
            // If it was a list item
            if(e.target && e.target.nodeName == "TD") {
                // List item found!  Output the ID!
                scheduleObj.changesSaved = "changed";
                if(scheduleObj.changesSaved=="changed"){document.querySelector('#unsavedAlert').classList.remove('d-none')}
            else{document.querySelector('#unsavedAlert').classList.add('d-none')}
                let ij = e.target.id.split(",")
                let i=ij[0]
                let j = ij[1]
                console.log(data)
                if(data[i][j]!=="X"){
                    data[i][j]="X";
                    }
                    else{
                        data[i][j]="&nbsp;";
                    }

                document.querySelector(`#${scheduleObj.weekday[day]}`).innerHTML = scheduleObj.generateSelectableCellsTable.generateEditTable(data,scheduleObj.tableConfig,scheduleObj.generateSelectableCellsTable.incrementTimeEveryThirtyMin,scheduleObj.generateSelectableCellsTable.getHeaderTime,scheduleObj.generateSelectableCellsTable.tutorCenterScheduleRenderer);
                ;
            }
        });
    }
    setUpListeners(){
        let scheduleObj = this;
        document.querySelector("#updateSchedule").addEventListener("click",function(){
            for(let i=0;i<5;i++){
                console.log("Testing WeekDay Hour",scheduleObj.weekDayHours)
                scheduleObj.updateFirebaseSchedule(scheduleObj.weekDayHours[i],scheduleObj.weekday[i])
            }
        })
    }

    updateFirebaseSchedule(data,day){
        let scheduleObj =this;
        let tempJson = {hours: JSON.stringify(data)}
        firebase.updateCollectionDoc('schedule',day,tempJson).then(result => {
            this.changesSaved = "saved"
                    if(this.changesSaved=="changed"){document.querySelector('#unsavedAlert').classList.remove('d-none')}
    else{document.querySelector('#unsavedAlert').classList.add('d-none')}
        })
    }
}
let schedule = new Schedule();

    //  for(let i=0;i<5;i++){
    //      firebase.
    //  }


//generateSelectableCellsTable.generateEditTable(data,tableConfig,generateSelectableCellsTable.incrementTimeEveryThirtyMin(),generateSelectableCellsTable.getHeaderTime(),generateSelectableCellsTable.tutorCenterScheduleRenderer())
//let eventListeners = new EventListeners();
//firebase.getCollectionRealtimeData("personnel","lastName",data,htmlRenderer);
//eventListeners.coursesSetEventListeners();
