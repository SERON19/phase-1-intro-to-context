function createEmployeeRecord(employeeCard){

    return {
        firstName: employeeCard[0],
        familyName: employeeCard[1],
        title: employeeCard[2],
        payPerHour: employeeCard[3],
        timeInEvents:[],
        timeOutEvents: []       
    }

}

function createEmployeeRecords(employeesCard) {
    return employeesCard.map(function (employeeInfo) {
        return createEmployeeRecord(employeeInfo)
    });
}

function createTimeInEvent(employeeRecord, timeIn) {
    const [date, hour] = timeIn.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOut) {
    const [date, hour] = timeOut.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateToBePaid) {
    let clockIn = employeeRecord.timeInEvents.find((e) => e.date == dateToBePaid).hour
   let clockOut = employeeRecord.timeOutEvents.find((e) => e.date == dateToBePaid).hour
   return (clockOut - clockIn)/100
}

let wagesEarnedOnDate = (employeeRecord, dateOfTheForm) => {
   const payPerHour = parseInt(employeeRecord.payPerHour)
   const hoursWorked = hoursWorkedOnDate(employeeRecord, dateOfTheForm)
   return payPerHour * hoursWorked
}

let allWagesFor = (employeeRecord) => {
   let employeeWages = []
   let datesWorked = employeeRecord.timeInEvents.map((e) => e.date)
   for (let date of datesWorked) {
      employeeWages.push(wagesEarnedOnDate(employeeRecord, date))
   }
   return employeeWages.reduce((total, wage) => total + wage)
}

let calculatePayroll = (AllEmployeeRecords) => {
   return AllEmployeeRecords.reduce((previoutAmount, employee) => {
      return previoutAmount + allWagesFor(employee)
  }, 0)
}
