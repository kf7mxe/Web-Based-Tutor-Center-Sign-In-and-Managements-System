export default class ReportsGenerateGraphData{
    
    constructor(){
    }
    generateHourlyAnalysisData(currentData, enteredLabels) {
        let mondayTimeAmountArray = [];
        let tuesdayTimeAmountArray = [];
        let wednesdayTimeAmountArray = [];
        let thursdayTimeAmountArray = [];
        let fridayTimeAmountArray = [];
        for (let i = 0; i < enteredLabels.length; i++) {
            mondayTimeAmountArray.push(0)
            tuesdayTimeAmountArray.push(0)
            wednesdayTimeAmountArray.push(0)
            thursdayTimeAmountArray.push(0)
            fridayTimeAmountArray.push(0)
        }

        for (let i = 0; i < currentData.length; i++) {
            if (currentData[i].dayOfWeek === "Monday") {
                for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                    mondayTimeAmountArray[hours] = mondayTimeAmountArray[hours] + currentData[i].hoursInTutorCenter[
                        hours]
                }
            }
            if (currentData[i].dayOfWeek === "Tuesday") {
                for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                    tuesdayTimeAmountArray[hours] = tuesdayTimeAmountArray[hours] + currentData[i]
                        .hoursInTutorCenter[hours]
                }
            }
            if (currentData[i].dayOfWeek === "Wednesday") {
                for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                    wednesdayTimeAmountArray[hours] = wednesdayTimeAmountArray[hours] + currentData[i]
                        .hoursInTutorCenter[hours]
                }
            }
            if (currentData[i].dayOfWeek === "Thursday") {
                for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                    thursdayTimeAmountArray[hours] = thursdayTimeAmountArray[hours] + currentData[i]
                        .hoursInTutorCenter[hours]
                }
            }
            if (currentData[i].dayOfWeek === "Friday") {
                for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                    fridayTimeAmountArray[hours] = fridayTimeAmountArray[hours] + currentData[i].hoursInTutorCenter[
                        hours]
                }
            }
        }
        let data = {
            labels: enteredLabels,
            datasets: [{
                    label: 'Monday',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    data: mondayTimeAmountArray
                },
                {
                    label: 'Tuesday',
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    data: tuesdayTimeAmountArray
                },
                {
                    label: 'Wednesday',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    data: wednesdayTimeAmountArray
                },
                {
                    label: 'Thursday',
                    backgroundColor: 'rgba(100, 0, 0, 0.2)',
                    data: thursdayTimeAmountArray
                },
                {
                    label: 'Friday',
                    backgroundColor: 'rgba(100, 100, 20, 0.2)',
                    data: fridayTimeAmountArray
                }
            ]
        }
        return data
    }
 generateDailyAnalysisData(currentData, enteredLabels) {
    let electricalAmountArray = [];
    let computerAmountArray = [];
    let environmentalAmountArray = [];
    let civilAmountArray = [];
    let mechanicalAmountArray = [];
    let biologicalAmountArray = [];
    for (let i = 0; i < enteredLabels.length; i++) {
        electricalAmountArray.push(0)
        computerAmountArray.push(0)
        environmentalAmountArray.push(0)
        civilAmountArray.push(0)
        mechanicalAmountArray.push(0)
        biologicalAmountArray.push(0)
    }

    for (let i = 0; i < currentData.length; i++) {
        if (currentData[i].major === "Electrical") {
            for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                electricalAmountArray[hours] = electricalAmountArray[hours] + currentData[i].hoursInTutorCenter[
                    hours]
            }
        }
        if (currentData[i].major === "Computer") {
            for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                computerAmountArray[hours] = computerAmountArray[hours] + currentData[i].hoursInTutorCenter[
                    hours]
            }
        }
        if (currentData[i].major === "Environmental") {
            for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                environmentalAmountArray[hours] = environmentalAmountArray[hours] + currentData[i]
                    .hoursInTutorCenter[hours]
            }
        }
        if (currentData[i].major === "Civil") {
            for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                civilAmountArray[hours] = civilAmountArray[hours] + currentData[i].hoursInTutorCenter[hours]
            }
        }
        if (currentData[i].major === "Mechanical/Aerospace") {
            for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                mechanicalAmountArray[hours] = mechanicalAmountArray[hours] + currentData[i].hoursInTutorCenter[
                    hours]
            }
        }
        if (currentData[i].major === "Biological") {
            for (let hours = 0; hours < currentData[i].hoursInTutorCenter.length; hours++) {
                biologicalAmountArray[hours] = biologicalAmountArray[hours] + currentData[i].hoursInTutorCenter[
                    hours]
            }
        }
    }
    let data = {
        labels: enteredLabels,
        datasets: [{
                label: 'Electrical',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                data: electricalAmountArray
            },
            {
                label: 'Computer',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                data: computerAmountArray
            },
            {
                label: 'Environmental',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                data: environmentalAmountArray
            },
            {
                label: 'Civil',
                backgroundColor: 'rgba(100, 0, 0, 0.2)',
                data: civilAmountArray
            },
            {
                label: 'Mechanical',
                backgroundColor: 'rgba(100, 100, 20, 0.2)',
                data: mechanicalAmountArray
            },
            {
                label: 'Biological',
                backgroundColor: 'rgba(100, 50, 20, 0.2)',
                data: biologicalAmountArray
            }
        ]
    }
    return data;
}

 generateUsageData(currentData, datesArray) {
     console.log('datesArray',datesArray)
    let patronsOnDate = []
    for (let i = 0; i < datesArray.length; i++) {
        patronsOnDate.push(0)
    }
    for (let i = 0; i < currentData.length; i++) {
        currentData[i].Date
        if (datesArray.includes(currentData[i].date)) {
            patronsOnDate[datesArray.indexOf(currentData[i].date)] = patronsOnDate[datesArray.indexOf(
                currentData[i].date)] + 1;
        }
    }
    let data = {
        labels: datesArray,
        datasets: [{
            fill: false,
            data: patronsOnDate,
            label: 'Patrons By Day',
            hidden: false,
            borderColor: 'rgba(10, 20, 255, 0.9)',
            backgroundColor: 'rgba(10, 20, 255, 0.9)'
        }]
    }
    return data;
}

 generateTopCoursesData(currentData) {
    let coursesLabels = [];
    let biologicalNumberCourses = []
    let computerNumberCourses = []
    let electricalNumberCourses = []
    let environmentalNumberCourses = []
    let civilNumberCourses = []
    let mechanicalNumberCourses = []
    for (let i = 0; i < currentData.length; i++) {
        let labelsIndex = coursesLabels.indexOf(`${currentData[i].coursePrefix} ${currentData[i].courseNumber}`)
        if (labelsIndex == -1) {
            coursesLabels.push(`${currentData[i].coursePrefix} ${currentData[i].courseNumber}`)
            biologicalNumberCourses.push(0)
            computerNumberCourses.push(0)
            electricalNumberCourses.push(0)
            environmentalNumberCourses.push(0)
            civilNumberCourses.push(0)
            mechanicalNumberCourses.push(0)
        }
    }
    for (let i = 0; i < currentData.length; i++) {
        let labelsIndex = coursesLabels.indexOf(`${currentData[i].coursePrefix} ${currentData[i].courseNumber}`)
        if (currentData[i].major === 'Electrical') {
            electricalNumberCourses[labelsIndex] = electricalNumberCourses[labelsIndex] + 1;
        }
        if (currentData[i].major === 'Computer') {
            computerNumberCourses[labelsIndex] = computerNumberCourses[labelsIndex] + 1;
        }
        if (currentData[i].major === 'Environmental') {
            environmentalNumberCourses[labelsIndex] = environmentalNumberCourses[labelsIndex] + 1;
        }
        if (currentData[i].major === 'Civil') {
            civilNumberCourses[labelsIndex] = civilNumberCourses[labelsIndex] + 1;
        }
        if (currentData[i].major === 'Mechanical/Aerospace') {
            mechanicalNumberCourses[labelsIndex] = mechanicalNumberCourses[labelsIndex] + 1;
        }
        if (currentData[i].major === 'Biological') {
            biologicalNumberCourses[labelsIndex] = biologicalNumberCourses[labelsIndex] + 1;
        }
    }
    let data = {
        labels: coursesLabels,
        datasets: [{
                label: 'Electrical',
                backgroundColor: 'rgba(255, 20, 20, 0.2)',
                data: electricalNumberCourses
            }, {
                label: 'Computer',
                backgroundColor: 'rgba(10, 20, 255, 0.2)',
                data: computerNumberCourses
            }, {
                label: 'Environmental',
                backgroundColor: 'rgba(10, 0, 50, 0.5)',
                data: environmentalNumberCourses
            }, {
                label: 'Civil',
                backgroundColor: 'rgba(10, 200, 255, 0.2)',
                data: civilNumberCourses
            },
            {
                label: 'Mechanical',
                backgroundColor: 'rgba(10, 100, 255, 0.2)',
                data: mechanicalNumberCourses
            }, {
                label: 'Biological',
                backgroundColor: 'rgba(10, 20, 200, 0.2)',
                data: biologicalNumberCourses
            }
        ],
    }
    return data;
}

 generateUsageByIdData(currentData) {
    let aNumbers = [];
    let numberOfANumbers = [];
    for (let i = 0; i < currentData.length; i++) {
        if (!aNumbers.includes(currentData[i].aNumber)) {
            aNumbers.push(currentData[i].aNumber)
            numberOfANumbers.push(1)
        } else {
            let index = aNumbers.indexOf(currentData[i].aNumber)
            numberOfANumbers[index] = numberOfANumbers[index] + 1
        }
    }
    if(numberOfANumbers.length>10){
        let currentLowestUsage = 1;
        while(numberOfANumbers.length>10){
            let i = numberOfANumbers.length;
        while(numberOfANumbers.includes(currentLowestUsage)){
            if(numberOfANumbers[i]==currentLowestUsage){
                numberOfANumbers.splice(i,1) 
                aNumbers.splice(i,1)
            }
            i=i-1
        }
        currentLowestUsage = currentLowestUsage +1
    }
}



    let data = {
        labels: aNumbers,
        datasets: [{
            label: '',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: numberOfANumbers
        }],
    }
    return data;
}

 generateSessionLengthData(currentData) {
    let graduatesData = [0, 0, 0, 0, 0, 0]
    let seniorData = [0, 0, 0, 0, 0, 0]
    let juniorData = [0, 0, 0, 0, 0, 0]
    let sophomoreData = [0, 0, 0, 0, 0, 0]
    let freshmanData = [0, 0, 0, 0, 0, 0]

    let graduatesAmounts = [0, 0, 0, 0, 0, 0]
    let seniorAmounts = [0, 0, 0, 0, 0, 0]
    let juniorAmounts = [0, 0, 0, 0, 0, 0]
    let sophomoreAmounts = [0, 0, 0, 0, 0, 0]
    let freshmanAmounts = [0, 0, 0, 0, 0, 0]

    let majorArrayIndex = ['Electrical', 'Computer', 'Environmental', 'Civil', 'Mechanical/Aerospace', 'Biological']
    for (let i = 0; i < currentData.length; i++) {
        if (currentData[i].classRank == 'Senior') {
            let index = majorArrayIndex.indexOf(currentData[i].major)
            if(currentData[i].totalMinutes>0){
             seniorData[index] = (seniorData[index] + currentData[i].totalMinutes)/(seniorAmounts[index]+1);
            seniorAmounts[index] = seniorAmounts[index] + 1;
            }
        }
        if (currentData[i].classRank == 'Junior') {
            let index = majorArrayIndex.indexOf(currentData[i].major)
            if(currentData[i].totalMinutes>0){
            juniorData[index] = (juniorData[index] + currentData[i].totalMinutes)/(juniorAmounts[index]+1);
            juniorAmounts[index] = juniorAmounts[index] + 1
            }
        }
        if (currentData[i].classRank == 'Sophomore') {
            let index = majorArrayIndex.indexOf(currentData[i].major)
            if(currentData[i].totalMinutes>0){
            sophomoreData[index] = (sophomoreData[index] + currentData[i].totalMinutes)/(sophomoreAmounts[index]+1);
            sophomoreAmounts[index] = sophomoreAmounts[index] + 1
            }
        }
        if (currentData[i].classRank == 'Freshman') {
            let index = majorArrayIndex.indexOf(currentData[i].major)
            if(currentData[i].totalMinutes>0){
            freshmanData[index] = (freshmanData[index] + currentData[i].totalMinutes)/(freshmanAmounts[index]+1);
            freshmanAmounts[index] = freshmanAmounts[index] + 1
            }
        }
        if (currentData[i].classRank == 'Graduates') {
            let index = majorArrayIndex.indexOf(currentData[i].major)
            if(currentData[i].totalMinutes>0){
            graduatesData[index] = (graduatesData[index] + currentData[i].totalMinutes)/(graduatesAmounts[index]+1);
            graduatesAmounts[index] = graduatesAmounts[index] + 1
            }
        }
    }
    let data = {
        labels: majorArrayIndex,
        datasets: [{
                label: 'Graduate',
                backgroundColor: 'rgba(255, 20, 20, 0.2)',
                data: graduatesData
            }, {
                label: 'Senior',
                backgroundColor: 'rgba(10, 20, 200, 0.2)',
                data: seniorData
            }, {
                label: 'Junior',
                backgroundColor: 'rgba(25, 150, 100, 0.2)',
                data: juniorData
            },
            {
                label: 'Sophomore',
                backgroundColor: 'rgba(0, 150, 250, 0.2)',
                data: sophomoreData
            },
            {
                label: 'Freshman',
                backgroundColor: 'rgba(125, 0, 150, 0.2)',
                data: freshmanData
            }
        ],
    }
    return data;
}

 generateConfidenceData(currentData) {
    let labels = ['1 Not confidence at all', '2 Somewhat unconfident', '3 Neutral', '4 Somewhat confident',
        '5 Very Confident'
    ]
    let graduatesData = [0, 0, 0, 0, 0]
    let seniorData = [0, 0, 0, 0, 0]
    let juniorData = [0, 0, 0, 0, 0]
    let sophomoreData = [0, 0, 0, 0, 0]
    let freshmenData = [0, 0, 0, 0, 0]
    for (let i = 0; i < currentData.length; i++) {
        let index = currentData[i].confidence - 1
        if (currentData[i].classRank == 'Graduate') {
            graduatesData[index] = graduatesData[index] + 1
        }
        if (currentData[i].classRank == 'Senior') {
            seniorData[index] = seniorData[index] + 1
        }
        if (currentData[i].classRank == 'Junior') {
            juniorData[index] = juniorData[index] + 1
        }
        if (currentData[i].classRank == 'Sophomore') {
            sophomoreData[index] = sophomoreData[index] + 1
        }
        if (currentData[i].classRank == 'Freshman') {
            freshmenData[index] = freshmenData[index] + 1
        }
    }
    let data = {
        labels: labels,
        datasets: [{
                label: 'Graduate',
                backgroundColor: 'rgba(255, 20, 20, 0.5)',
                data: graduatesData
            }, {
                label: 'Senior',
                backgroundColor: 'rgba(10, 20, 255, 0.2)',
                data: seniorData
            }, {
                label: 'Junior',
                backgroundColor: 'rgba(100, 50, 140, 0.5)',
                data: juniorData
            },
            {
                label: 'Sophomore',
                backgroundColor: 'rgba(60, 90, 255, 0.5)',
                data: sophomoreData
            },
            {
                label: 'Freshman',
                backgroundColor: 'rgba(40, 20, 12, 0.7)',
                data: freshmenData
            }
        ],
    }
    return data;
}

 generatePurposeOfVisitsData(currentData) {
    let labels = ['Homework Help', 'Exam Preparation', 'Group Study Session', 'Presentation Practice', 'Other']
    let graduatesData = [0, 0, 0, 0, 0]
    let seniorData = [0, 0, 0, 0, 0]
    let juniorData = [0, 0, 0, 0, 0]
    let sophomoreData = [0, 0, 0, 0, 0]
    let freshmenData = [0, 0, 0, 0, 0]
    for (let i = 0; i < currentData.length; i++) {
        let index = labels.indexOf(currentData[i].purposeOfVisit)
        if (currentData[i].classRank == 'Graduate') {
            if (index != -1) {
                graduatesData[index] = graduatesData[index] + 1
            } else {
                graduatesData[4] = graduatesData[4] + 1
            }
        }
        if (currentData[i].classRank == 'Senior') {
            if (index != -1) {
                seniorData[index] = seniorData[index] + 1
            } else {
                seniorData[4] = seniorData[4] + 1
            }
        }
        if (currentData[i].classRank == 'Junior') {
            if (index != -1) {
                juniorData[index] = juniorData[index] + 1
            } else {
                juniorData[4] = juniorData[4] + 1
            }
        }
        if (currentData[i].classRank == 'Sophomore') {
            if (index != -1) {
                sophomoreData[index] = sophomoreData[index] + 1
            } else {
                sophomoreData[4] = sophomoreData[4] + 1
            }
        }
        if (currentData[i].classRank == 'Freshman') {
            if (index != -1) {
                freshmenData[index] = freshmenData[index] + 1
            } else {
                freshmenData[4] = freshmenData[4] + 1
            }
        }
    }
    let data = {
        labels: labels,
        datasets: [{
                label: 'Graduate',
                backgroundColor: 'rgba(255, 20, 20, 0.2)',
                data: graduatesData
            }, {
                label: 'Senior',
                backgroundColor: 'rgba(200, 20, 255, 0.5)',
                data: seniorData
            }, {
                label: 'Junior',
                backgroundColor: 'rgba(0, 150, 150, 0.2)',
                data: juniorData
            },
            {
                label: 'Sophomore',
                backgroundColor: 'rgba(100, 20, 60, 0.5)',
                data: sophomoreData
            },
            {
                label: 'Freshman',
                backgroundColor: 'rgba(30, 40, 90, 0.2)',
                data: freshmenData
            }
        ],
    }
    return data;
}

}