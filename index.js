// Your code here
function createEmployeeRecord(infoArr) {
    const worker = {}
    worker.firstName = infoArr[0]
    worker.familyName = infoArr[1]
    worker.title = infoArr[2]
    worker.payPerHour = infoArr[3]
    worker.timeInEvents = []
    worker.timeOutEvents = []
    return worker
}

function createEmployeeRecords(arrArr) {
    const records = []
   arrArr.forEach(e => {
    records.push(createEmployeeRecord(e))
   });
    return records
}

function createTimeInEvent(recordObj, dateStamp) {
    const newEvent= {}
    newEvent.type = "TimeIn"
    newEvent.hour = parseInt(dateStamp.split(" ")[1])
    newEvent.date = dateStamp.split(" ")[0]
    recordObj.timeInEvents.push(newEvent)
    return recordObj
}

function createTimeOutEvent(recordObj, dateStamp) {
    const newEvent= {}
    newEvent.type = "TimeOut"
    newEvent.hour = parseInt(dateStamp.split(" ")[1])
    newEvent.date = dateStamp.split(" ")[0]
    recordObj.timeOutEvents.push(newEvent)
    return recordObj
}

function hoursWorkedOnDate(recordObj, date) {
    let timeIn = recordObj.timeInEvents.find(e => {return e.date === date})
    let timeOut = recordObj.timeOutEvents.find(e => {return e.date === date})
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(recordObj, date) {
    return recordObj.payPerHour * hoursWorkedOnDate(recordObj, date)
}

function allWagesFor(recordObj) {
    let total = 0
    recordObj.timeInEvents.forEach(e => {
        total += wagesEarnedOnDate(recordObj, e.date)
    });
    return total
}

function calculatePayroll(arr) {
    let total = 0
    arr.forEach(e => {
        total += allWagesFor(e)
    });
    return total
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => {return e.firstName === firstName})
}