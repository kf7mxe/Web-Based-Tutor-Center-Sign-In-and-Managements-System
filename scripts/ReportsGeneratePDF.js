import ReportHelperFunctions from "/scripts/ReportHelperFunctions.js"
import ReportFilters from "/scripts/ReportFilters.js"
import ReportsGraphOptions from "/scripts/ReportsGraphOptions.js"
import ReportsGenerateGraphData from "/scripts/ReportsGenerateGraphData.js"
export default class ReportsGeneratePDF {

    constructor(inPersonTrackerData,courses) {
        this.inPersonTrackerData = inPersonTrackerData
        this.currentFilteredData = []
        this.valuesGraphs = []
        this.valuesCourses = []
        this.valuesMajor = []
        this.valuesDepartment = []
        this.valuesService = []
        this.valuesConfidence = []
        this.valuesANumber = []
        this.valuesWeekDay = []
        this.valueHours = []
        this.title = ''
        this.startDate = ''
        this.endDate = ''
        this.dateValues = []
        this.courses = courses
        this.currentSelectedLabels = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];
        this.allLabels = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];
        this.allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        this.reportFilters = new ReportFilters(this.inPersonTrackerData,this.currentFilteredData);
        this.reportsGraphOptions = new ReportsGraphOptions();
        this.reportsGenerateGraphData = new ReportsGenerateGraphData();
        this.reportHelperFunctions = new ReportHelperFunctions();
    }

    getSelectedValuesCallGeneratePDF() {
        document.querySelector('#generatePDFProgressBar').style.width = '5%'
        document.querySelector('#pdfGenerateReportCanvasContainer').classList.remove('d-none')
        document.querySelector('#progressContainer').classList.remove('d-none')
        let selectedGraphs = document.querySelectorAll('#selectGraphsToInclude option:checked');
        this.valuesGraphs = Array.from(selectedGraphs).map(el => el.value);
        let selectedCourses = document.querySelectorAll('#selectCourseGeneratePDFReportSelect option:checked')
        this.valuesCourses = Array.from(selectedCourses).map(el => el.value);
        let selectedMajor = document.querySelectorAll('#selectMajorGeneratePDFReport option:checked')
        this.valuesMajor = Array.from(selectedMajor).map(el => el.value);
        let selectedDepartment = document.querySelectorAll('#selectDepartmentGeneratePDFReport option:checked')
        this.valuesDepartment = Array.from(selectedDepartment).map(el => el.value);
        let selectedWeekDays = document.querySelectorAll('#selectWeekGeneratePDFReport option:checked')
        this.valuesWeekDay = Array.from(selectedWeekDays).map(el =>el.value)
        let selectService = document.querySelectorAll('#selectServiceGeneratePDFReport option:checked')
        this.valuesService = Array.from(selectService).map(el => el.value)
        let selectedHours = document.querySelectorAll('#selectHourGeneratePDFReport option:checked')
        this.valueHours = Array.from(selectedHours).map(el => el.value)
        let selectConfidence = document.querySelectorAll('#selectConfidencePDFReport option:checked')
        this.valuesConfidence = Array.from(selectConfidence).map(el => el.value)
        let selectANumber = document.querySelectorAll('#ANumberSelectGeneratePDFModal option:checked')
        this.valuesANumber = Array.from(selectANumber).map(el => el.value)
        this.title = document.querySelector('#reportTitleTextInput').value
        this.startDate = ''
        this.endDate = ''
        this.reportHelperFunctions.dateRangeFiller(this.inPersonTrackerData)
        let dateRange = this.reportHelperFunctions.getDateRange();
        if (document.querySelector('#selectDataToGenerateFromSelect').value == "All Date Range") {
            this.dateValues = dateRange
            this.startDate = dateRange[0]
            this.endDate = dateRange[dateRange.length - 1]
        }
        if (document.querySelector('#selectDataToGenerateFromSelect').value == "Filter Dates") {
            this.startDate = document.querySelector('#generatePDFReportFromDateInput').value
            this.endDate = document.querySelector('#generatePDFReportToDateInput').value
            let splitStartDate = this.startDate.split('-')
            let splitEndDate = this.endDate.split('-')
            let dateStartObj = new Date(splitStartDate[0], splitStartDate[1] - 1, splitStartDate[2])
            let dateEndObj = new Date(splitEndDate[0], splitEndDate[1] - 1, splitEndDate[2])
            this.dateValues = this.reportHelperFunctions.getDateRangeBetweenTwoDates(dateStartObj, dateEndObj,this.inPersonTrackerData)
        }
    }


    generateReportFilters() {
        let reportGeneratePDFObj = this;
        setTimeout(function () {
            reportGeneratePDFObj.currentSelectedLabels = [...reportGeneratePDFObj.allLabels]
            let currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.inPersonTrackerData))
            reportGeneratePDFObj.currentFilteredData = []
            reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
            console.log('testing if report generate pdf resets ',reportGeneratePDFObj.currentFilteredData)
            reportGeneratePDFObj.currentFilteredData= reportGeneratePDFObj.reportFilters.dateRangeFilter(reportGeneratePDFObj.dateValues, 'pdf', currentFilteredDataCopy)
            console.log('all inperson filter',reportGeneratePDFObj.inPersonTrackerData.length)
            console.log('date range filter',reportGeneratePDFObj.currentFilteredData.length)
            console.log('currentfiltercopy ',currentFilteredDataCopy.length)
            document.querySelector('#generatePDFProgressBar').style.width = '5%'
            setTimeout(function () {
                currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                reportGeneratePDFObj.currentFilteredData = []
                reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                reportGeneratePDFObj.currentFilteredData = reportGeneratePDFObj.reportFilters.hourlyAnalysisDayOfTheWeekSelectFilter(reportGeneratePDFObj.valuesWeekDay, 'pdf', currentFilteredDataCopy)
                document.querySelector('#generatePDFProgressBar').style.width = '10%'
                console.log('hourly analysis day of week filter',reportGeneratePDFObj.currentFilteredData.length)
                setTimeout(function () {
                    currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                    reportGeneratePDFObj.currentFilteredData = []
                    reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                    reportGeneratePDFObj.currentFilteredData = reportGeneratePDFObj.reportFilters.hourlySelectFilter(reportGeneratePDFObj.valueHours, 'pdf', currentFilteredDataCopy)
                    document.querySelector('#generatePDFProgressBar').style.width = '15%'
                    console.log('hourly select filter',reportGeneratePDFObj.currentFilteredData.length)
                    setTimeout(function () {
                        currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                        reportGeneratePDFObj.currentFilteredData = []
                        reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                        reportGeneratePDFObj.currentFilteredData = reportGeneratePDFObj.reportFilters.majorFilter(reportGeneratePDFObj.valuesMajor, 'pdf', currentFilteredDataCopy)
                        document.querySelector('#generatePDFProgressBar').style.width = '20%'
                        console.log('major filter',reportGeneratePDFObj.currentFilteredData.length)
                        setTimeout(function () {
                            currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                            reportGeneratePDFObj.currentFilteredData = []
                            reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                            reportGeneratePDFObj.currentFilteredData=reportGeneratePDFObj.reportFilters.departmentFilter(reportGeneratePDFObj.valuesDepartment,'pdf' ,currentFilteredDataCopy)
                            document.querySelector('#generatePDFProgressBar').style.width = '25%'
                            console.log('department filter',reportGeneratePDFObj.currentFilteredData.length)
                            setTimeout(function () {
                                currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                                reportGeneratePDFObj.currentFilteredData = []
                                reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                                reportGeneratePDFObj.currentFilteredData = reportGeneratePDFObj.reportFilters.courseFilter(reportGeneratePDFObj.valuesCourses, 'pdf', currentFilteredDataCopy)
                                document.querySelector('#generatePDFProgressBar').style.width = '30%'
                                console.log('report filters',reportGeneratePDFObj.currentFilteredData.length)
                                setTimeout(function () {
                                    currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                                    reportGeneratePDFObj.currentFilteredData = []
                                    reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                                    reportGeneratePDFObj.currentFilteredData = reportGeneratePDFObj.reportFilters.aNumberFilter(reportGeneratePDFObj.valuesANumber, 'pdf', currentFilteredDataCopy)
                                    document.querySelector('#generatePDFProgressBar').style.width = '35%'
                                    console.log('aNumber',reportGeneratePDFObj.currentFilteredData.length)
                                    setTimeout(function () {
                                        currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                                        reportGeneratePDFObj.currentFilteredData = []
                                        reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                                        reportGeneratePDFObj.currentFilteredData = reportGeneratePDFObj.reportFilters.confidenceFilter(reportGeneratePDFObj.valuesConfidence, 'pdf', currentFilteredDataCopy)
                                        document.querySelector('#generatePDFProgressBar').style.width = '40%'
                                        console.log('confidence filter',reportGeneratePDFObj.currentFilteredData.length)
                                        setTimeout(function () {
                                            currentFilteredDataCopy = JSON.parse(JSON.stringify(reportGeneratePDFObj.currentFilteredData))
                                            reportGeneratePDFObj.currentFilteredData = []
                                            reportGeneratePDFObj.reportFilters.resetCurrentFilteredData()
                                            reportGeneratePDFObj.currentFilteredData = reportGeneratePDFObj.reportFilters.purposeOfVisitFilter(reportGeneratePDFObj.valuesService,'pdf',currentFilteredDataCopy)
                                            document.querySelector('#generatePDFProgressBar').style.width = '45%'
                                            console.log('purpose of visit',reportGeneratePDFObj.currentFilteredData.length)
                                            setTimeout(function () {
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Hourly Analysis')) {
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generateHourlyAnalysisData(reportGeneratePDFObj.currentFilteredData, reportGeneratePDFObj.currentSelectedLabels);
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('hourlyAnalysisChart')
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'bar', 'pdfReportHourlyAnalysisChart', graphOptions, true)
                                                }
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Daily Analysis')) {
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('dailyAnalysisChart')
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generateDailyAnalysisData(reportGeneratePDFObj.currentFilteredData, reportGeneratePDFObj.currentSelectedLabels);
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'bar', 'pdfReportDailyAnalysisChart', graphOptions, true)
                                                }
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Usage')) {
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('usageChart')
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generateUsageData(reportGeneratePDFObj.currentFilteredData, reportGeneratePDFObj.dateValues)
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'line', 'pdfReportUsageChart', graphOptions, true)
                                                }
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Top Courses')) {
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generateTopCoursesData(reportGeneratePDFObj.currentFilteredData)
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('topCourses')
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'horizontalBar', 'pdfReportTopCourses', graphOptions, true)
                                                }
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Usage By Id')) {
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generateUsageByIdData(reportGeneratePDFObj.currentFilteredData)
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('usageById')
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'bar', 'pdfReportUsageById', graphOptions, true)
                                                }
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Session Length')) {
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generateSessionLengthData(reportGeneratePDFObj.currentFilteredData)
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('sessionLength')
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'bar', 'pdfReportSessionLengthId', graphOptions, true)
                                                }
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Confidence Level')) {
                                                    console.log('testin confidence error',reportGeneratePDFObj.currentFilteredData)
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generateConfidenceData(reportGeneratePDFObj.currentFilteredData)
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('confidenceLevel')
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'bar', 'pdfReportConfidenceLevel', graphOptions, true)
                                                }
                                                if (reportGeneratePDFObj.valuesGraphs.includes('Purpose of Visit')) {
                                                    let graphOptions = reportGeneratePDFObj.reportsGraphOptions.generateOptions('purposeOfVisit')
                                                    let data = reportGeneratePDFObj.reportsGenerateGraphData.generatePurposeOfVisitsData(reportGeneratePDFObj.currentFilteredData)
                                                    reportGeneratePDFObj.reportHelperFunctions.generateGraph(data, 'bar', 'pdfReportPurposeOfVisit', graphOptions, true)
                                                }
                                                document.querySelector('#generatePDFProgressBar').style.width = '50%'
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    generatePDFReport() {
        let reportTitle = this.title == '' ? 'Engineering Tutor Center Reports' : this.title;
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });
        doc.text(105, 20, reportTitle, {
            align: "center"
        })
        doc.setFontSize(9)
        console.log('this',this)
        console.log('this dates',this.startDate,this.endDate)
        doc.text(105, 25, `${this.startDate} - ${this.endDate}`, {
            align: "center"
        })
        doc.setFontSize(12)
        doc.text(105, 35, "Filters", {
            align: "center"
        })
        doc.setFontSize(9)
        doc.text(40, 40, `Departments: ${this.convertArrayToStringForPDF(this.valuesDepartment)[0]}`, {
            align: "left"
        })
        doc.text(40, 45, `Student Majors: ${this.convertArrayToStringForPDF(this.valuesMajor)[0]}`, {
            align: "left"
        })
        let verticlePageIncrement = 1
        console.log('valuesCourses',this.valuesCourses.length)
        console.log('getAllCourses()',this.courses)
        if (this.valuesCourses.length == this.courses.length) {
            doc.text(40, 50, `Courses: All Courses Selected `, {
                align: "left"
            })
        } else {
            let allCourseCountPerPrefix = this.reportHelperFunctions.getCoursesPerPrefixCount()
            let currentCourseCountPerPrefix = this.reportHelperFunctions.getCurrentCoursePerPrefixCount(this.valuesCourses)
            let keys = Object.keys(currentCourseCountPerPrefix)
            let filledPrefixes = [];
            for (let i = 0; i < keys.length; i++) {
                if (currentCourseCountPerPrefix[keys[i]] == allCourseCountPerPrefix[keys[i]]) {
                    filledPrefixes.push(keys[i]);
                    if (i == 0) {
                        doc.text(40, 50 + verticlePageIncrement, `All Courses with prefix: ${keys[i]} are Selected`, {
                            align: "left"
                        })
                    } else {
                        doc.text(40, 50 + verticlePageIncrement, `All Courses with prefix: ${keys[i]} are Selected`, {
                            align: "left"
                        })
                    }
                    verticlePageIncrement = verticlePageIncrement + 5
                }
            }
            //verticlePageIncrement = 5
            let coursesLines = this.convertArrayToStringForPDF(this.reportHelperFunctions.filterAllCoursesFromAllSelectedPrefixes(this.valuesCourses, filledPrefixes))
            let line = 0
            while (line < coursesLines.length) {
                if (!filledPrefixes.includes(coursesLines[line].split(' ')[0])) {
                    if (line == 0) {
                        doc.text(40, 50 + verticlePageIncrement, `Courses: ${coursesLines[0]} `, {
                            align: "left"
                        })
                    }
                    if (line !== coursesLines.length && line !== 0) {
                        doc.text(40, 55 + verticlePageIncrement, `${coursesLines[line]}`, {
                            align: "left"
                        })
                        verticlePageIncrement = verticlePageIncrement + 5
                    }
                }
                if (line == 38) {
                    break;
                }
                line++;
            }
        }
        console.log("verticlePageIncrement ", verticlePageIncrement)
        doc.text(40, 65 + verticlePageIncrement, `Confidence Levels: ${this.convertArrayToStringForPDF(this.valuesConfidence)[0]}`, {
            align: "left"
        })
        let servicesOfferedLines = this.convertArrayToStringForPDF(this.valuesService)
        let serviceOfferedLine = 0;
        while (serviceOfferedLine < servicesOfferedLines.length) {
            if (serviceOfferedLine == 0) {
                doc.text(40, 60 + verticlePageIncrement, `Tutor Center Services: ${servicesOfferedLines[serviceOfferedLine]}`, {
                    align: "left"
                })
            }
            if (serviceOfferedLine !== servicesOfferedLines.length && serviceOfferedLine !== 0) {
                verticlePageIncrement = verticlePageIncrement + 5
                doc.text(40, 65 + verticlePageIncrement, `${servicesOfferedLines[serviceOfferedLine]}`, {
                    align: "left"
                })
            }
            serviceOfferedLine++
        }
        doc.setFontSize(12)
        let progress = 50
        let i = 0;
        this.addImageToPDF(progress,doc,i);
    }


    addImageToPDF(progress,doc,i) {
        let progressIncrement = 80 / this.valuesGraphs.length
        progress = progress + progressIncrement
        doc.addPage("a4", "p")
        doc.text(105, 10, `${this.valuesGraphs[i]}`, {
            align: "center"
        })
        let canvas = document.querySelector('#pdfReportHourlyAnalysisChart')
        if (this.valuesGraphs[i] == 'Hourly Analysis') {
            canvas = document.querySelector('#pdfReportHourlyAnalysisChart')
        }
        if (this.valuesGraphs[i] == 'Daily Analysis') {
            canvas = document.querySelector('#pdfReportDailyAnalysisChart')
        }
        if (this.valuesGraphs[i] == 'Usage') {
            canvas = document.querySelector('#pdfReportUsageChart')
        }
        if (this.valuesGraphs[i] == 'Top Courses') {
            canvas = document.querySelector('#pdfReportTopCourses')
        }
        if (this.valuesGraphs[i] == 'Usage By Id') {
            canvas = document.querySelector('#pdfReportUsageById')
        }
        if (this.valuesGraphs[i] == 'Session Length') {
            canvas = document.querySelector('#pdfReportSessionLengthId')
        }
        if (this.valuesGraphs[i] == 'Confidence Level') {
            canvas = document.querySelector('#pdfReportConfidenceLevel')
        }
        if (this.valuesGraphs[i] == 'Purpose of Visit') {
            canvas = document.querySelector('#pdfReportPurposeOfVisit')
        }
        let context = canvas.getContext("2d")
        let imgData = canvas.toDataURL("image/png", 1.0);
        doc.addImage(imgData, 'PNG', 15, 40, 180, 180)
        document.querySelector('#generatePDFProgressBar').style.width = progress + '%';
        console.log(i)
        if ((i + 1) == this.valuesGraphs.length) {
            console.log("this before saving",this)
            console.log('this.title',this.title)
            doc.save(`${this.title}.pdf`)
            document.querySelector('#generatePDFProgressBar').style.width = '100%'
            document.querySelector('#pdfGenerateReportCanvasContainer').classList.add('d-none')
            document.querySelector('#progressContainer').classList.add('d-none')
            document.querySelector('#pdfSuccessContainer').classList.remove('d-none')
        }
        if (i < this.valuesGraphs.length) {
            let reportageneratePDFObject = this
            setTimeout(function () {
                i = i+1
                reportageneratePDFObject.addImageToPDF(progress,doc,i)
            }, 100)
        }
    }


    convertArrayToStringForPDF(array) {
        let lines = []
        let line = ''
        for (let i = 0; i < array.length; i++) {
            if (line.length <= 50)
                line = line + array[i] + ', '
            else {
                lines.push(line)
                line = array[i]
            }
        }
        if (line.length <= 100) {
            lines.push(line)
        }
        return lines
    }

}