function yearsBetween(startDate, endDate) {
  let years = startDate.getFullYear() - endDate.getFullYear();
  return years <= 0 ? 0 : years;
}

function monthsBetween(startDate, endDate) {
  let months;
  months = (startDate.getFullYear() - endDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();
  return months <= 0 ? 0 : months;
}

function daysBetween(startDate, endDate) {
  return parseInt((endDate - startDate) / (1000 * 60 * 60 * 24));
}

function hoursBetween(startDate, endDate) {
  return parseInt(Math.abs(endDate - startDate) / (1000 * 60 * 60));
}

function minutsBetween(startDate, endDate) {
  return parseInt(Math.abs(endDate - startDate) / (1000 * 60));
}

function secondsBetween(startDate, endDate) {
  return parseInt(Math.abs(endDate - startDate) / 1000);
}

function milliSecondsBetween(startDate, endDate) {
  return parseInt(Math.abs(endDate - startDate));
}

function dateBetween(startDate, endDate) {
  const milliSeconds = startDate - endDate;
  const years = yearsBetween(startDate,endDate);
  const months = monthsBetween(startDate,endDate);
  const days = milliSeconds / (1000 * 60 * 60 * 24);
  const hours = milliSeconds / (1000 * 60 * 60);
  const minutes = milliSeconds / (1000 * 60);
  const seconds = milliSeconds / 1000;

  return {
    years, 
    months,
    days,
    hours,
    minutes,
    seconds,
    milliSeconds,
  };
}
