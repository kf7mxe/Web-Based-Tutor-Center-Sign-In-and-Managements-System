export default class ReportHelperFunctions{
    
    constructor(){
        this.dateRange=[]
        this.courses = []
        this.prefixesCount  = {}

    }

    aNumberFiller(inPersonTrackerData){
        console.log("checking an umber filler", inPersonTrackerData)
        let uniqueANumbers = []
	    let options = ''
        for (let i = 0; i < inPersonTrackerData.length; i++) {
            if (!uniqueANumbers.includes(inPersonTrackerData[i].aNumber)) {
                uniqueANumbers.push(inPersonTrackerData[i].aNumber)
                options = options +
                    `<option selected value="${inPersonTrackerData[i].aNumber}">${inPersonTrackerData[i].aNumber}</options>`
            }
        }
        return options
    }

    coursePrefixSelectFiller(courses){
        let options = '';
        let prefixes = [];
        prefixesCount = {};
        for (let i = 0; i < courses.length; i++) {
            if(prefixes.includes(courses[i].coursePrefix)) {
                let key = courses[i].coursePrefix
                prefixesCount[key] = prefixesCount[key] + 1
            }else{
                options = options +`<option selected value="${courses[i].coursePrefix}">${courses[i].coursePrefix}</options>`
                prefixes.push(courses[i].coursePrefix)
                let key = courses[i].coursePrefix
                prefixesCount[key]=1
                }
        }
        return options;
    }

    fillCourseFromPrefix(courses){
        const selectedPrefix = document.querySelectorAll('#coursePrefixSelectGeneratePDFModal option:checked');
        const valuesPrefixSelected = Array.from(selectedPrefix).map(el => el.value);
        let selectedCourses = '';
        for (let i = 0; i < courses.length; i++) {
            if (valuesPrefixSelected.includes(courses[i].coursePrefix)) {
                selectedCourses = selectedCourses +
                    `<option selected value="${courses[i].course}">${courses[i].course}</option>`
            }
        }
        document.querySelector('#selectCourseGeneratePDFReportSelect').innerHTML = selectedCourses
    }
    dateRangeFiller(inPersonTrackerData) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                      "October", "November", "December"
                     ];
        let options = ''
        for (let i = 0; i < inPersonTrackerData.length; i++) {
            let date = new Date(inPersonTrackerData[i].date)
            let dateString = `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`
            if (!this.dateRange.includes(dateString)) {
                this.dateRange.push(dateString)
            }
        }
        this.dateRange.sort(function(a,b){
            let aDate = new Date(a)
            let bDate = new Date(b)
            if(aDate.getTime() < bDate.getTime()){
                return -1;
            } else if(aDate.getTime() > bDate.getTime()){
                return 1;
            }
            return 0;
        })
        for (let i = 0; i < this.dateRange.length; i++) {
            options = options + `<option selected value="${this.dateRange[i]}">${this.dateRange[i]}</option>`
        }
        return options;
    }
    getDateRange(){
        return this.dateRange;
    }
    getAllCourses(){
        return this.courses;
    }
    getCoursesPerPrefixCount(){
             return this.prefixesCount;
    }
    courseSelectFiller(courses) {
        this.courses = courses;
        let options = ''
        for (let i = 0; i < courses.length; i++) {
            options = options + `<option selected value="${courses[i].course}">${courses[i].course}</options>`
        }
        return options;
    }
    coursePrefixSelectFiller(courses) {
        let options = '';
        let prefixes = [];
        this.prefixesCount = {};
        for (let i = 0; i < courses.length; i++) {
            if(prefixes.includes(courses[i].coursePrefix)) {
                let key = courses[i].coursePrefix
                this.prefixesCount[key] = this.prefixesCount[key] + 1
            }else{
                options = options +`<option selected value="${courses[i].coursePrefix}">${courses[i].coursePrefix}</options>`
                prefixes.push(courses[i].coursePrefix)
                let key = courses[i].coursePrefix
                this.prefixesCount[key]=1
                }
        }
        return options;
    }

    getCurrentCoursePerPrefixCount(courses) {
        let temPrefixes = [];
        this.prefixesCount = {};
        for (let i = 0; i < courses.length; i++) {
            let prefix = courses[i].split(" ")[0];
            if (temPrefixes.includes(prefix)) {
                let key = prefix
                this.prefixesCount[key] = this.prefixesCount[key] + 1
            } else {
                temPrefixes.push(prefix)
                let key = prefix
                temPrefixes[prefix] = 1
                this.prefixesCount[key] = 1
            }
        }
        return this.prefixesCount;
    }

    filterAllCoursesFromAllSelectedPrefixes(courses, filledPrefixes) {
        let filteredCourses = [];
        for (let i = 0; i < courses.length; i++) {
            if (!filledPrefixes.includes(courses[i].coursePrefix)) {
                filteredCourses.push(courses[i])
            }
        }
        return filteredCourses;
    }

    aNumberFiller(inPersonTrackerData) {
        let uniqueANumbers = []
        let options = ''
        for (let i = 0; i < inPersonTrackerData.length; i++) {
            if (!uniqueANumbers.includes(inPersonTrackerData[i].aNumber)) {
                uniqueANumbers.push(inPersonTrackerData[i].aNumber)
                options = options +
                    `<option selected value="${inPersonTrackerData[i].aNumber}">${inPersonTrackerData[i].aNumber}</options>`
            }
        }
        return options
    }


    calculateNumberHoursForEachEntry(inPersonTrackerData) {
        for (let i = 0; i < inPersonTrackerData.length; i++) {
            let tempHoursList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let timeOut = Number(inPersonTrackerData[i].timeOut.split(':')[0] - 8);
            if (inPersonTrackerData[i].timeOut.split(':')[1] >= 30) { //
                timeOut = timeOut + 0.5
            }
            let timeIn = Number(inPersonTrackerData[i].timeIn.split(':')[0]) - 8;
            if (inPersonTrackerData[i].timeIn.split(':')[1] > 30) {
                timeIn = timeIn + 0.5
            }
            let duration = timeOut - timeIn;
            for (let hour = timeIn; hour <= timeOut; hour = hour + 0.5) {
                tempHoursList[hour * 2] = 1;
            }
            inPersonTrackerData[i].hoursInTutorCenter = tempHoursList;
        }
    }
    generateGraph(enteredData, enteredType, canvasIdToLoadInto, enteredOptions,dontDestroy) {
        var canvas = document.getElementById(canvasIdToLoadInto).getContext('2d');
        // if(dontDestroy){
        //     let pdfChart = new Chart(canvas,{
        //         type: enteredType,
        //         data: enteredData,
        //         options: enteredOptions
        //     })
        // }
        if(window.chart != undefined && dontDestroy==false) {
            window.chart.destroy(); 
        }
       
        window.chart = new Chart(canvas, {
            type: enteredType,
            data: enteredData,
            options: enteredOptions
        })
        document.querySelector('#generatingGraphLoadingSpinner').classList.add('d-none')
        document.querySelector('#generatingGraphLoadingSpinner').classList.remove('d-flex')
    }

    getDateRangeBetweenTwoDates(beginDate, endDate,inPersonTrackerData) {
        let tempDateRange = []
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
        console.log('length',inPersonTrackerData.length)
        for (let i = 0; i < inPersonTrackerData.length; i++) {
            let tempDate = new Date(inPersonTrackerData[i].date)
            if (tempDate > beginDate && tempDate < endDate) {
                let dateString = `${months[tempDate.getMonth()]} ${tempDate.getDate()},${tempDate.getFullYear()}`
                tempDateRange.push(dateString)
            }
        }
        console.log('temp data range',tempDateRange)
        return tempDateRange;
    }

  
    

    downloadDataAsCSV(unAlteredInPersonTrackerdata){
        var keys = Object.keys(unAlteredInPersonTrackerdata[0]);
        let resultString = '';
        for(let key =0;key<keys.length;key++){
            if(key!=(keys.length-1)){
            resultString = resultString +keys[key]+','
            console.log("key",keys[key])
            console.log("Result string",resultString)
            }
            else{
                resultString = resultString + keys[key]+'\n'
            }
        }
        for(let i=0;i<unAlteredInPersonTrackerdata.length; i++){
            for(let key =0;key <keys.length;key++){
                let item = unAlteredInPersonTrackerdata[i]
                if(key!=(keys.length-1)){
                    if(keys[key]=="date"){
                        resultString = resultString +'"'+ item[keys[key]]+'"'+ ','
                    } 
                    else {
                resultString = resultString + item[keys[key]]+ ','
                }
                }
                else{resultString = resultString + item[keys[key]]+ '\n'}
            }
        }
        let csvData = new Blob([resultString], { type: 'text/csv' });  
        let csvUrl = URL.createObjectURL(csvData);
        let hiddenElement = document.createElement('a');
            hiddenElement.href = csvUrl;
            hiddenElement.target = '_blank';
            hiddenElement.download = "Tutoring-Center-In-Person-Tracker" + '.csv';
            hiddenElement.click();
    }

    downloadDataAsJson(unAlteredInPersonTrackerdata){
        let jsonData = new Blob([JSON.stringify(unAlteredInPersonTrackerdata)], { type: 'application/json' });  
        let csvUrl = URL.createObjectURL(jsonData);
        let hiddenElement = document.createElement('a');
            hiddenElement.href = csvUrl;
            hiddenElement.target = '_blank';
            hiddenElement.download = "Tutoring-Center-In-Person-Tracker" + '.json';
            hiddenElement.click();
    }
}