import ReportFilters from "/scripts/ReportFilters.js"
import ReportsGraphSetup from "/scripts/ReportsGraphSetup.js"
import ReportsGeneratePDF from "/scripts/ReportsGeneratePDF.js"
import ReportHelperFunctions from "/scripts/ReportHelperFunctions.js"
export default class ReportEventListeners{
    
    constructor(inPersonTrackerData,currentFilteredData,courses){
        this.currentFilteredData = currentFilteredData
        this.inPersonTrackerData = inPersonTrackerData
        this.courses = courses
        this.reportFilters = new ReportFilters(this.inPersonTrackerData,this.currentFilteredData);
        this.reportsGraphSetup = new ReportsGraphSetup(this.inPersonTrackerData,this.courses);
        this.reportsGeneratePDF = new ReportsGeneratePDF(this.inPersonTrackerData,this.courses);
        this.reportHelperFunctions = new ReportHelperFunctions();
        this.graphSelectEventListeners();
        this.filterEventListeners();
        this.generatePDFEventListeners();
        this.downloadAsOtherFormats();
    }
    graphSelectEventListeners(){
        let reportEventListenerObject = this;
        document.querySelector('#nav-hourly-analysis-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.hourlyAnalysisSetupAndAllData();
        })
        document.querySelector('#nav-daily-analysis-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.dailyAnalysisSetupAndAllData();
        })
        document.querySelector('#nav-usage-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.usageSetupAndAllData();
        })
        document.querySelector('#nav-top-courses-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.topCourseSetupAndAllData();
        })
        document.querySelector('#nav-usage-by-id-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.usageByIdSetupAndAllData();
        })
        document.querySelector('#nav-session-length-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.sessionLengthSetupAndAllData();
        })
        document.querySelector('#nav-confidence-level-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.confidenceLevelSetupAndAllData();
        })
        document.querySelector('#nav-purpose-of-visit-link').addEventListener('click',function(){
            reportEventListenerObject.reportsGraphSetup.purposeOfVisitSetupAndAllData();
        })        
    }
    filterEventListeners(){
        let reportEventListenerObject = this;
        document.querySelector("#hourlyAnalysisDateRange").addEventListener('change', function () {
            reportEventListenerObject.reportFilters.hourlyAnalysisSetupFilterData();
        })
        document.querySelector("#hourlyAnalysisHourSelect").addEventListener('change', function () {
            reportEventListenerObject.reportFilters.hourlyAnalysisSetupFilterData();
        })
        document.querySelector("#hourlyAnalysisDayOfTheWeekSelect").addEventListener('change', function () {
            reportEventListenerObject.reportFilters.hourlyAnalysisSetupFilterData();
        })
        document.querySelector('#dailyAnalysisDateRange').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.dailyAnalysisSetupFilterData();
        })
        document.querySelector('#dailyAnalysisHourSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.dailyAnalysisSetupFilterData();
        })
        document.querySelector('#dailyAnalysisMajorSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.dailyAnalysisSetupFilterData();
        })
        document.querySelector('#usageDateSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.usageSetupFilterData();
        })
        document.querySelector('#topCoursesDateSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.topCoursesSetupFilterData()
        })
        document.querySelector('#topCoursesCourseSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.topCoursesSetupFilterData()
        })
        document.querySelector('#topCoursesMajorSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.topCoursesSetupFilterData()
        })
        document.querySelector('#aNumber').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.usageByIdSetupFilterData();
        })
        document.querySelector('#sessionLengthDateRange').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.sessionFiltersSetupFilterData()
        })
        document.querySelector('#sessionLengthMajor').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.sessionFiltersSetupFilterData()
        })
        document.querySelector('#sessionLengthRank').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.sessionFiltersSetupFilterData()
        })
        document.querySelector('#confidenceSelectConfidence').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.confidenceFiltersSetupFilterData()
        })
        document.querySelector('#confidenceSelectRank').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.confidenceFiltersSetupFilterData()
        })
        document.querySelector('#purposeOfVisitSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.purposeOfVisitFiltersSetupFilterData()
        })
        document.querySelector('#purposeOfVisitRankSelect').addEventListener('change', function () {
            reportEventListenerObject.reportFilters.purposeOfVisitFiltersSetupFilterData()
        })
    }

    generatePDFEventListeners(){
        let reportEventListenerObject = this;
        document.querySelector('#coursePrefixSelectGeneratePDFModal').addEventListener('change', function () {
            reportEventListenerObject.reportHelperFunctions.fillCourseFromPrefix(reportEventListenerObject.courses)
        })
        document.querySelector('#selectDataToGenerateFromSelect').addEventListener('change', function () {
            if (document.querySelector('#selectDataToGenerateFromSelect').value == "Filter Dates") {
                document.querySelector('#generatePDFReportFilterDateSelectContainer').classList.remove('d-none')
            } else {
                document.querySelector('#generatePDFReportFilterDateSelectContainer').classList.add('d-none')
            }
        })
        document.querySelector('#selectSymesterSelect').addEventListener('change', function () {
            let selectedSymesterDateRange = document.querySelector('#selectSymesterSelect').value
            if (selectedSymesterDateRange != '') {
                let splitSelectedSymesterDateRange = selectedSymesterDateRange.split(',')
                document.querySelector('#generatePDFReportFromDateInput').value =splitSelectedSymesterDateRange[0]
                document.querySelector('#generatePDFReportToDateInput').value = splitSelectedSymesterDateRange[1]
            }
        })
        document.querySelectorAll('.btn-sm').forEach(button=>
            button.addEventListener('click',()=>{
                switch(button.id){
                    case 'graph-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,"#selectGraphsToInclude")
                        break;
                    case 'service-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,"#selectServiceGeneratePDFReport") 
                        break;
                    case 'week-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,"#selectWeekGeneratePDFReport") 
                        break;
                    case 'course-prefix-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,"#coursePrefixSelectGeneratePDFModal")
                        //fillCourseFromPrefix();
                        break;
                    case 'confidence-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,"#selectConfidencePDFReport")
                        break;
                    case 'course-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,"#selectCourseGeneratePDFReportSelect")
                        break;
                    case 'aNumber-select-deselect-all': 
                    reportEventListenerObject.selectDeselectSelects(button,"#ANumberSelectGeneratePDFModal")
                        break;
                    case 'student-major-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,"#selectMajorGeneratePDFReport")
                        break;
                    case 'department-select-deselect-all': 
                    reportEventListenerObject.selectDeselectSelects(button,"#selectDepartmentGeneratePDFReport")
                        break;
                    case 'hour-select-deselect-all':
                        reportEventListenerObject.selectDeselectSelects(button,'#selectHourGeneratePDFReport')
                        break;
                }
            }));


            document.querySelector('#generatePDFButton').addEventListener('click', function () {
                reportEventListenerObject.reportsGeneratePDF.getSelectedValuesCallGeneratePDF();
                reportEventListenerObject.reportsGeneratePDF.generateReportFilters();
                setTimeout(function(){
                    reportEventListenerObject.reportsGeneratePDF.generatePDFReport()
                },1000)
            });
    }


    selectDeselectSelects(button,selectElement){
        let select = document.querySelector(selectElement);
        if(button.innerHTML=="Deselect All"){
        for(let i=0;i<select.options.length;i++){
            select.options[i].selected=false;
         }
         button.innerHTML = "Select All"
        }
        else{
            for(let i=0;i<select.options.length;i++){
                select.options[i].selected=true;
         }
         button.innerHTML = "Deselect All"
        }
    }

    downloadAsOtherFormats(){
        let reportEventListenerObject = this;
        document.querySelector('#download-as-csv').addEventListener('click',function(){
            reportEventListenerObject.reportHelperFunctions.downloadDataAsCSV(reportEventListenerObject.inPersonTrackerData)
        })
        document.querySelector('#download-as-json').addEventListener('click',function(){
            reportEventListenerObject.reportHelperFunctions.downloadDataAsJson(reportEventListenerObject.inPersonTrackerData)
        })
    }
}