import ReportsGraphOptions from "/scripts/ReportsGraphOptions.js"
import ReportsGenerateGraphData from "/scripts/ReportsGenerateGraphData.js"
import ReportHelperFunctions from "/scripts/ReportHelperFunctions.js"
export default class ReportFilters{
    
    constructor(inPersonTrackerData,currentFilteredData){
        this.inPersonTrackerData = inPersonTrackerData
        this.currentFilteredData = currentFilteredData
        this.reportsGraphOptions = new ReportsGraphOptions();
        this.reportsGenerateGraphData = new ReportsGenerateGraphData();
        this.reportHelperFunctions = new ReportHelperFunctions();
        this.allLabels = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM','12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM','4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM','9:00 PM']
        Object.freeze(this.allLabels)
        this.currentSelectedLabels = []
    }

    resetCurrentFilteredData(){
        this.currentFilteredData = []
    }

    hourlyAnalysisSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        this.currentFilteredData = []
        this.currentSelectedLabels = [...this.allLabels]
        const selectedDay = document.querySelectorAll('#hourlyAnalysisDayOfTheWeekSelect option:checked');
        const valuesDay = Array.from(selectedDay).map(el => el.value);
        let currentFilteredDataCopy = JSON.parse(JSON.stringify(this.inPersonTrackerData))
        this.hourlyAnalysisDayOfTheWeekSelectFilter(valuesDay, 'hourlyAnalysis', currentFilteredDataCopy)


        const selectedHours = document.querySelectorAll('#hourlyAnalysisHourSelect option:checked');
        const valuesHours = Array.from(selectedHours).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        console.log("currentFilteredDataCopy",currentFilteredDataCopy)
        this.hourlySelectFilter(valuesHours, 'hourlyAnalysis', currentFilteredDataCopy)

        const selectedDateRange = document.querySelectorAll('#hourlyAnalysisDateRange option:checked');
        const valuesDateRange = Array.from(selectedDateRange).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        let data = this.dateRangeFilter(valuesDateRange, 'hourlyAnalysis', currentFilteredDataCopy)

        let graphOptions = this.reportsGraphOptions.generateOptions('hourlyAnalysisChart')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'hourlyAnalysisChart', graphOptions,false)
    }

 dailyAnalysisSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        const selectedMajors = document.querySelectorAll('#dailyAnalysisMajorSelect option:checked')
        const valuesMajors = Array.from(selectedMajors).map(el => el.value);
        this.currentFilteredData = [];
        this.currentSelectedLabels = [...this.allLabels]
        let currentFilteredDataCopy = JSON.parse(JSON.stringify(this.inPersonTrackerData))
        console.log('valuesMajor',valuesMajors)
        let data = this.majorFilter(valuesMajors, 'dailyAnalysis', currentFilteredDataCopy)

        const selectedHours = document.querySelectorAll('#dailyAnalysisHourSelect option:checked');
        const valuesHours = Array.from(selectedHours).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        data = this.hourlySelectFilter(valuesHours, 'dailyAnalysis', currentFilteredDataCopy)

        const selectedDateRange = document.querySelectorAll('#dailyAnalysisDateRange option:checked');
        const valuesDateRange = Array.from(selectedDateRange).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        data = this.dateRangeFilter(valuesDateRange, 'dailyAnalysis', currentFilteredDataCopy)

        let graphOptions = this.reportsGraphOptions.generateOptions('dailyAnalysisChart')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'dailyAnalysisChart', graphOptions,false)
    }

 usageSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        const selectedDateRange = document.querySelectorAll('#usageDateSelect option:checked');
        const valuesDateRange = Array.from(selectedDateRange).map(el => el.value);
        let graphOptions = this.reportsGraphOptions.generateOptions('usageChart')
        let data = this.reportsGenerateGraphData.generateUsageData(this.inPersonTrackerData, valuesDateRange)
        this.reportHelperFunctions.generateGraph(data, 'line', 'usageChart', graphOptions,false)
    }

 topCoursesSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        const selectedMajors = document.querySelectorAll('#topCoursesMajorSelect option:checked');
        const valuesMajors = Array.from(selectedMajors).map(el => el.value);
        let currentFilteredDataCopy = JSON.parse(JSON.stringify(this.inPersonTrackerData))
        this.currentFilteredData = []
        let data = this.majorFilter(valuesMajors, 'topCourses', currentFilteredDataCopy)

        const selectedDateRange = document.querySelectorAll('#topCoursesDateSelect option:checked');
        const valuesDateRange = Array.from(selectedDateRange).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        let graphOptions = this.reportsGraphOptions.generateOptions('topCourses')
        data = this.dateRangeFilter(valuesDateRange, 'topCourses', currentFilteredDataCopy)

        const selectedCourses = document.querySelectorAll('#topCoursesCourseSelect option:checked');
        const valuesCourses = Array.from(selectedCourses).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        data = this.courseFilter(valuesCourses, 'topCourses', currentFilteredDataCopy)

        this.reportHelperFunctions.generateGraph(data, 'horizontalBar', 'topCourses', graphOptions,false)
    }

 usageByIdSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        const selectedANumbers = document.querySelectorAll('#aNumber option:checked');
        const valuesANumbers = Array.from(selectedANumbers).map(el => el.value);
        this.currentFilteredData = []
        let data = this.aNumberFilter(valuesANumbers, 'usageById', this.inPersonTrackerData)
        let graphOptions = this.reportsGraphOptions.generateOptions('usageById')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'usageById', graphOptions,false)
    }

 sessionFiltersSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        const selectedDateRange = document.querySelectorAll('#sessionLengthDateRange option:checked');
        const valuesDateRange = Array.from(selectedDateRange).map(el => el.value);
        this.currentFilteredData = []
        let currentFilteredDataCopy = JSON.parse(JSON.stringify(this.inPersonTrackerData))
        this.dateRangeFilter(valuesDateRange, 'sessionLength', currentFilteredDataCopy)

        const selectedMajors = document.querySelectorAll('#sessionLengthMajor option:checked');
        const valuesMajors = Array.from(selectedMajors).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        this.majorFilter(valuesMajors, 'sessionLength', currentFilteredDataCopy)

        const selectedRanks = document.querySelectorAll('#sessionLengthRank option:checked');
        const valuesRanks = Array.from(selectedRanks).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        let data = this.rankFilter(valuesRanks, 'sessionLength', currentFilteredDataCopy)
        let graphOptions = this.reportsGraphOptions.generateOptions('sessionLength')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'sessionLengthId', graphOptions,false)
    }

 confidenceFiltersSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        const selectedRanks = document.querySelectorAll('#confidenceSelectRank option:checked');
        const valuesRanks = Array.from(selectedRanks).map(el => el.value);
        let currentFilteredDataCopy = JSON.parse(JSON.stringify(this.inPersonTrackerData))
        this.currentFilteredData = []
        this.rankFilter(valuesRanks, '', currentFilteredDataCopy)

        const selectedConfidenceLevel = document.querySelectorAll('#confidenceSelectConfidence option:checked');
        const selectedConfidenceLevelValue = Array.from(selectedConfidenceLevel).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        let data = this.confidenceFilter(selectedConfidenceLevelValue, 'confidenceLevel', currentFilteredDataCopy)

        let graphOptions = this.reportsGraphOptions.generateOptions('confidenceLevel')
        this.reportHelperFunctions.generateGraph(data, 'bar', 'confidenceLevel', graphOptions,false)
    }

 purposeOfVisitFiltersSetupFilterData() {
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-flex')
        const selectedRanks = document.querySelectorAll('#purposeOfVisitRankSelect option:checked');
        const valuesRanks = Array.from(selectedRanks).map(el => el.value);
        let currentFilteredDataCopy = JSON.parse(JSON.stringify(this.inPersonTrackerData))
        this.currentFilteredData = []
        this.rankFilter(valuesRanks, '', currentFilteredDataCopy)

        const selectedPurposeOfVisit = document.querySelectorAll('#purposeOfVisitSelect option:checked');
        const selectedPurposeOfVisitValues = Array.from(selectedPurposeOfVisit).map(el => el.value);
        currentFilteredDataCopy = JSON.parse(JSON.stringify(this.currentFilteredData))
        this.currentFilteredData = []
        let data = this.purposeOfVisitFilter(selectedPurposeOfVisitValues,'',currentFilteredDataCopy)
        let graphOptions = this.reportsGraphOptions.generateOptions('purposeOfVisit')

        this.reportHelperFunctions.generateGraph(data, 'bar', 'purposeOfVisit', graphOptions,false)
    }

 dateRangeFilter(values, graphToGenerateDataFor, currentData) {
     console.log('in date range testing')
     console.log(this.currentFilteredData.length)
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].date)) {
                this.currentFilteredData.push(currentData[i])
            }
        }
        let data = '';
        if (graphToGenerateDataFor === 'hourlyAnalysis') {
            data = this.reportsGenerateGraphData.generateHourlyAnalysisData(this.currentFilteredData, this.currentSelectedLabels)
        }
        if (graphToGenerateDataFor === 'dailyAnalysis') {
            data = this.reportsGenerateGraphData.generateDailyAnalysisData(this.currentFilteredData, this.currentSelectedLabels)
        }
        if (graphToGenerateDataFor === 'topCourses') {
            data = this.reportsGenerateGraphData.generateTopCoursesData(this.currentFilteredData)
        }
        if(graphToGenerateDataFor==='pdf'){
            console.log(this.currentFilteredData.length)
            return this.currentFilteredData
        }
        return data;
    }

 hourlySelectFilter(values, graphToGenerateDataFor, currentData) {

        this.currentSelectedLabels = [];
        let indexOfPreviousArrayPutIntoFilteredArray = []
        for (let i = 0; i < this.allLabels.length; i++) {

            if (values.includes(this.allLabels[i])) {
                this.currentSelectedLabels.push(this.allLabels[i])
                indexOfPreviousArrayPutIntoFilteredArray.push(i)
            }
        }
        for (let i = 0; i < currentData.length; i++) {
            let newHoursInTutorCenter = [];
            for (let hour = 0; hour < currentData[i].hoursInTutorCenter.length; hour++) {
                if (indexOfPreviousArrayPutIntoFilteredArray.includes(hour)) {
                    newHoursInTutorCenter.push(currentData[i].hoursInTutorCenter[hour]);
                }
            }
            this.currentFilteredData.push(currentData[i])
            this.currentFilteredData[i].hoursInTutorCenter = newHoursInTutorCenter
        }
        let data = '';
        if (graphToGenerateDataFor === 'hourlyAnalysis') {
            data = this.reportsGenerateGraphData.generateHourlyAnalysisData(this.currentFilteredData, this.currentSelectedLabels);
        }
        if (graphToGenerateDataFor === 'dailyAnalysis') {
            data = this.reportsGenerateGraphData.generateDailyAnalysisData(this.currentFilteredData, this.currentSelectedLabels);
        }
        if(graphToGenerateDataFor === 'pdf'){
            return this.currentFilteredData
        }
        return data;
    }

 hourlyAnalysisDayOfTheWeekSelectFilter(values, graphToGenerateDataFor, currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].dayOfWeek)) {
                this.currentFilteredData.push(currentData[i])
            }
        }
        let data = ''
        if (graphToGenerateDataFor === 'hourlyAnalysis') {
            data = this.reportsGenerateGraphData.generateHourlyAnalysisData(this.currentFilteredData, this.currentSelectedLabels);
        }
        if (graphToGenerateDataFor === 'dailyAnalysis') {
            data = this.reportsGenerateGraphData.generateDailyAnalysisData(this.currentFilteredData, this.currentSelectedLabels);
        }
        if(graphToGenerateDataFor==='pdf'){
            return this.currentFilteredData
        }
        return data;
    }

 majorFilter(values, graphToGenerateDataFor, currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].major)) {
                this.currentFilteredData.push(currentData[i])
            }
        }
        let data = '';
        if (graphToGenerateDataFor == 'dailyAnalysis') {
            data = this.reportsGenerateGraphData.generateDailyAnalysisData(this.currentFilteredData, this.currentSelectedLabels)
        }
        if (graphToGenerateDataFor == 'topCourses') {
            data = this.reportsGenerateGraphData.generateTopCoursesData(this.currentFilteredData)
        }
        if(graphToGenerateDataFor == 'pdf'){
            return this.currentFilteredData
        }
        return data;
    }

 rankFilter(values, graphToGenerateDataFor, currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].classRank)) {
                this.currentFilteredData.push(currentData[i])
            }
        }
        let data = ''
        if (graphToGenerateDataFor == 'sessionLength') {
            data = this.reportsGenerateGraphData.generateSessionLengthData(this.currentFilteredData)
        }
        return data;
    }

 confidenceFilter(values, graphToGenerateDataFor, currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].confidence)) {
                this.currentFilteredData.push(currentData[i])
            }
        }
        let data = ''
        if (graphToGenerateDataFor == 'confidenceLevel') {
            data = this.reportsGenerateGraphData.generateConfidenceData(this.currentFilteredData)
        }
        if(graphToGenerateDataFor==='pdf'){
            return this.currentFilteredData
        }
        return data;
    }

 purposeOfVisitFilter(values,graphToGenerateDataFor,currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].purposeOfVisit)) {
                this.currentFilteredData.push(currentData[i])
            }
            else{console.log(currentData[i].purposeOfVisit)}
        }
        if(graphToGenerateDataFor=='pdf'){
            return this.currentFilteredData
        }
        let data = this.reportsGenerateGraphData.generatePurposeOfVisitsData(this.currentFilteredData)
        return data;
    }


    courseFilter(values, graphToGenerateDataFor, currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].course)) {
                this.currentFilteredData.push(currentData[i])
            }
        }
        let data = '';
        if (graphToGenerateDataFor == 'topCourses') {
            data = this.reportsGenerateGraphData.generateTopCoursesData(this.currentFilteredData)
        }
        if(graphToGenerateDataFor==='pdf'){
            return this.currentFilteredData
        }
        return data;
    }

 aNumberFilter(values, graphToGenerateDataFor, currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes(currentData[i].aNumber)) {
                this.currentFilteredData.push(currentData[i])
            }
        }
        let data = '';
        if (graphToGenerateDataFor == 'usageById') {
            data = this.reportsGenerateGraphData.generateUsageByIdData(this.currentFilteredData)
        }
        if(graphToGenerateDataFor==='pdf'){
            return this.currentFilteredData
        }
        return data;
    }

 departmentFilter(values,graphToGenerateDataFor,currentData) {
        for (let i = 0; i < currentData.length; i++) {
            if (values.includes('BE')) {
                if (currentData[i].major == "Biological") {
                    this.currentFilteredData.push(currentData[i])
                }
            }
            if (values.includes('ECE')) {
                if (currentData[i].major == "Computer" || currentData[i].major == "Electrical") {
                    this.currentFilteredData.push(currentData[i])
                }
            }
            if (values.includes('CEE')) {
                if (currentData[i].major == "Civil" || currentData[i].major == "Environmental") {
                    this.currentFilteredData.push(currentData[i])
                }
            }
            if (values.includes('MAE')) {
                if (currentData[i].major == "Mechanical/Aerospace") {
                    this.currentFilteredData.push(currentData[i])
                }
            }
        }
        if(graphToGenerateDataFor==='pdf'){
            return this.currentFilteredData;
        }
    }
}