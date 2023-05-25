const inputDay = document.getElementById("day-input");
const inputDayError = document.getElementById("day-input-error");
const inputMonth = document.getElementById("month-input");
const inputMonthError = document.getElementById("month-input-error");
const inputYear = document.getElementById("year-input");
const inputYearError = document.getElementById("year-input-error");
const outputDay = document.getElementById("day-output");
const outputMonth = document.getElementById("month-output");
const outputYear = document.getElementById("year-output");

function hideAllResult() {
  hideResult(outputDay);
  hideResult(outputMonth);
  hideResult(outputYear);
}

function hideResult(element) {
  element.innerHTML = "--";
}

function showError(element, errortext) {
  element.classList.remove("hidden");
  element.innerHTML = errortext;
}

function removeAllError() {
  inputDayError.classList.add("hidden");
  inputMonthError.classList.add("hidden");
  inputYearError.classList.add("hidden");
}

function validateDay() {
  if (inputDay.value > 31 || inputDay.value < 1) {
    showError(inputDayError, "Must be a valid day");
    hideResult(outputDay);
  }
}

function validateMonth() {
  if (inputMonth.value > 12 || inputMonth.value < 1) {
    showError(inputMonthError, "Must be a valid month");
    hideResult(outputMonth);
  }
}

function validateYear() {
  if (inputYear.value > new Date().getFullYear() || inputYear.value < 1) {
    showError(inputYearError, "Must be a past year");
    hideResult(outputYear);
  }
}

function isValidDate(year, month, day) {
  var d = new Date(year, month, day);
  if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
    return true;
  }
  return false;
}

function validate() {
  const monthValue = Number(inputMonth.value) - 1; // We must decrease 1 to inputMonth because javascript identify January as 0 and February as 1
  removeAllError();
  if (isValidDate(inputYear.value, monthValue, inputDay.value)) {
    validateDay();
    validateMonth();
    validateYear();
    calculate();
  } else {
    showError(inputDayError, "Must be a valid date");
    hideAllResult();
  }
}

function calculate() {
  var now = moment(new Date()); //todays date
  var end = moment(`${inputYear.value}-${inputMonth.value}-${inputDay.value}`); // input date
  var duration = moment.duration(now.diff(end));
  var years = duration.asYears();

  const yearsOutput = Math.floor(duration.asYears());
  outputYear.innerHTML = yearsOutput;

  const monthsOutput = moment.duration(years - yearsOutput, "months");
  outputMonth.innerHTML = Math.floor(monthsOutput._data.months * 12);

  const daysOutput = Math.floor(
    (monthsOutput._data.months * 12 -
      Math.floor(monthsOutput._data.months * 12)) *
      30
  );
  outputDay.innerHTML = daysOutput;
}
