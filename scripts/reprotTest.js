"use strict";
function calculateNumberHoursForEachEntry() {
    for (let i = 0; i < inPersonTrackerData.length; i++) {
        let tempHoursList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let timeOut = Number(inPersonTrackerData[i].TimeOut.split(':')[0] - 8);
        if (inPersonTrackerData[i].TimeOut.split(':')[1] >= 30) { //
            timeOut = timeOut + 0.5
        }
        let timeIn = Number(inPersonTrackerData[i].TimeIn.split(':')[0]) - 8;
        if (inPersonTrackerData[i].TimeIn.split(':')[1] > 30) {
            timeIn = timeIn + 0.5
        }
        let duration = timeOut - timeIn;
        for (let hour = timeIn; hour <= timeOut; hour = hour + 0.5) {
            tempHoursList[hour * 2] = 1;
        }
        inPersonTrackerData[i].HoursInTutorCenter = tempHoursList;
    }
}