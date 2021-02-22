import ReportsGraphOptions from "/scripts/ReportsGraphOptions.js"
import ReportsGenerateGraphData from "/scripts/ReportsGenerateGraphData.js"
import ReportHelperFunctions from "/scripts/ReportHelperFunctions.js"
export default class ReportsGraphSetup{
    
    constructor(inPersonTrackerData,courses){
        this.inPersonTrackerData = inPersonTrackerData
        this.courses = courses
        this.reportsGraphOptions = new ReportsGraphOptions();
        this.reportsGenerateGraphData = new ReportsGenerateGraphData();
        this.reportHelperFunctions = new ReportHelperFunctions();
        this.allLabels = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM','12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM','4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM','9:00 PM']
        Object.freeze(this.allLabels)
    }

    hourlyAnalysisSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        document.querySelector('#hourlyAnalysisDateRange').innerHTML = '';
        document.querySelector('#hourlyAnalysisDateRange').innerHTML = this.reportHelperFunctions.dateRangeFiller(this.inPersonTrackerData);
        let data = this.reportsGenerateGraphData.generateHourlyAnalysisData(this.inPersonTrackerData, this.allLabels)
        let graphOptions = this.reportsGraphOptions.generateOptions('hourlyAnalysisChart')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'hourlyAnalysisChart', graphOptions)
    }
    
    dailyAnalysisSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        document.querySelector('#dailyAnalysisDateRange').innerHTML = '';
        document.querySelector('#dailyAnalysisDateRange').innerHTML = this.reportHelperFunctions.dateRangeFiller(this.inPersonTrackerData);
        let data = this.reportsGenerateGraphData.generateDailyAnalysisData(this.inPersonTrackerData, this.allLabels)
        let graphOptions = this.reportsGraphOptions.generateOptions('dailyAnalysisChart')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'dailyAnalysisChart', graphOptions)
    }
    
    usageSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        document.querySelector('#usageDateSelect').innerHTML = '';
        document.querySelector('#usageDateSelect').innerHTML = this.reportHelperFunctions.dateRangeFiller(this.inPersonTrackerData);
        let data = this.reportsGenerateGraphData.generateUsageData(this.inPersonTrackerData, this.reportHelperFunctions.getDateRange())
        let graphOptions = this.reportsGraphOptions.generateOptions('usageChart')
        this.reportHelperFunctions.generateGraph(data, 'line', 'usageChart', graphOptions)
    }
    
    topCourseSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        document.querySelector('#topCoursesDateSelect').innerHTML = '';
        document.querySelector('#topCoursesDateSelect').innerHTML = this.reportHelperFunctions.dateRangeFiller(this.inPersonTrackerData);
        document.querySelector('#topCoursesCourseSelect').innerHTML = this.reportHelperFunctions.courseSelectFiller(this.courses);
        let data = this.reportsGenerateGraphData.generateTopCoursesData(this.inPersonTrackerData)
        let graphOptions = this.reportsGraphOptions.generateOptions('topCourses')
        this.reportHelperFunctions.generateGraph(data, 'horizontalBar', 'topCourses', graphOptions)
    }
    
    usageByIdSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        document.querySelector('#aNumber').innerHTML = this.reportHelperFunctions.aNumberFiller(this.inPersonTrackerData);
        let data = this.reportsGenerateGraphData.generateUsageByIdData(this.inPersonTrackerData);
        let graphOptions = this.reportsGraphOptions.generateOptions('usageById')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'usageById', graphOptions)
    }
    
    sessionLengthSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        document.querySelector('#sessionLengthDateRange').innerHTML = this.reportHelperFunctions.dateRangeFiller(this.inPersonTrackerData);
        let data = this.reportsGenerateGraphData.generateSessionLengthData(this.inPersonTrackerData)
        let graphOptions = this.reportsGraphOptions.generateOptions('sessionLength')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'sessionLengthId', graphOptions)
    }
    
    confidenceLevelSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        let data = this.reportsGenerateGraphData.generateConfidenceData(this.inPersonTrackerData)
        let graphOptions = this.reportsGraphOptions.generateOptions('confidenceLevel')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'confidenceLevel', graphOptions)
    }
    
    purposeOfVisitSetupAndAllData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        let data = this.reportsGenerateGraphData.generatePurposeOfVisitsData(this.inPersonTrackerData)
        let graphOptions = this.reportsGraphOptions.generateOptions('purposeOfVisit')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'purposeOfVisit', graphOptions)
    }
}