let userInfo = {};

function submitForm() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const dobInput = document.getElementById('dob');
  const dob = dobInput.valueAsDate;

  //ar vardas ir pavardė yra ne tušti
  if (!firstName || !lastName) {
    displayError('Vardas ir pavardė turi būti užpildyti.');
    return;
  }

  //ar gimimo data yra tinkama
  if (!isValidDate(dob) || dob > new Date()) {
    displayError('Netinkama gimimo data.');
    return;
  }

  userInfo = {
    vardas: firstName,
    pavardė: lastName,
    gimimoData: dob
  };

  console.log(userInfo);
  clearError();
  displayInfoOnWebsite(userInfo);
  calculateAndDisplayDaysLived(userInfo.gimimoData);
  adjustFontSize();
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function adjustFontSize() {
  const resultContainer = document.getElementById('resultContainer');
  const daysLived = calculateDaysDifference(userInfo.gimimoData, new Date());

  if (daysLived <= 1000) {
    resultContainer.style.fontSize = '10px';
  } else if (daysLived > 1000 && daysLived <= 7000) {
    resultContainer.style.fontSize = '16px';
  } else {
    resultContainer.style.fontSize = '20px';
  }
}

function displayInfoOnWebsite(userInfo) {
  const infoContainer = document.getElementById('infoContainer');
  infoContainer.innerHTML = '';

  for (const key in userInfo) {
    const label = document.createElement('p');
    if (key === 'gimimoData') {
      label.textContent = `Gimimo data: ${formatDate(userInfo[key])}`;
    } else {
      label.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${userInfo[key]}`;
    }
    infoContainer.appendChild(label);
  }
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${padNumber(day)}.${padNumber(month)}.${year}`;
}

function padNumber(num) {
  return num.toString().padStart(2, '0');
}

function calculateAndDisplayDaysLived(dob) {
  const currentDate = new Date();
  const daysLived = calculateDaysDifference(dob, currentDate);

  if (daysLived < 0) {
    displayError('Klaida: Įvesta gimimo data yra ateityje.');
    return;
  }

  const daysWordEnding = getDaysWordEnding(daysLived);

  const resultMessage = `${userInfo.vardas} ${userInfo.pavardė} nugyveno ${daysLived} ${daysWordEnding}.`;

  console.log(resultMessage);
  displayResultOnWebsite(resultMessage);
}

function calculateDaysDifference(date1, date2) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.floor((date2 - date1) / millisecondsPerDay);

  return daysDifference;
}

function getDaysWordEnding(days) {
  if (days % 10 === 1 && days !== 11) {
    return 'dieną';
  } else if ((days % 10 >= 2 && days % 10 <= 9) && (days < 10 || days > 20)) {
    return 'dienas';
  } else {
    return 'dienų';
  }
}

function displayError(errorMessage) {
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.textContent = errorMessage;
  setTimeout(clearError, 5000);
}

function clearError() {
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.textContent = '';
}

function displayResultOnWebsite(resultMessage) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.textContent = resultMessage;
}
