import Firebase from "/scripts/Firebase.js"
import ReportHelperFunctions from "/scripts/ReportHelperFunctions.js"
import ReportsGraphSetup from "/scripts/ReportsGraphSetup.js"
import ReportEventListeners from "/scripts/ReportEventListeners.js"
export default class Report{
    
    constructor(){
    firebase = new Firebase();
    this.inPersonTrackerData = [];
    this.unAlteredInPersonTrackerdata=[];
    this.currentFilteredData = [];
    this.currentSelectedLabels = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM','11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM','4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM','8:30 PM', '9:00 PM'];
    this.dateRange = [];
    this.dateRangeOptions = [];
    this.courses = []
    this.allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    this.reportHelperFunctions = new ReportHelperFunctions();
    this.reportsGraphSetup = new ReportsGraphSetup(this.inPersonTrackerData,this.courses);
    this.reportEventListeners = new ReportEventListeners(this.inPersonTrackerData,this.currentFilteredData,this.courses);
    firebase.getCollectionDataPromise("courses").then(data=>{
        for(let i=0; i<data.length; i++){
            this.courses.push(data[i].data())
        }
        document.querySelector('#coursePrefixSelectGeneratePDFModal').innerHTML =this.reportHelperFunctions.coursePrefixSelectFiller(this.courses);
        this.reportHelperFunctions.fillCourseFromPrefix(this.courses);
    });
    firebase.getCollectionDataPromise("inPersonTracker").then(data=>{
        for(let i=0; i<data.length; i++){
            this.inPersonTrackerData.push(data[i].data())
            this.unAlteredInPersonTrackerdata.push(data[i].data())
        }
        this.reportHelperFunctions.calculateNumberHoursForEachEntry(this.inPersonTrackerData);
        Object.freeze(this.inPersonTrackerData);
        this.currentFilteredData = [...this.inPersonTrackerData];
        this.reportsGraphSetup.hourlyAnalysisSetupAndAllData();
        document.querySelector('#ANumberSelectGeneratePDFModal').innerHTML = this.reportHelperFunctions.aNumberFiller(this.inPersonTrackerData)
    })
    }
}

let report = new Report();
