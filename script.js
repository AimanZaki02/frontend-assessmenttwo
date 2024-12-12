// Page 1
const mobileInput = document.getElementById("mobile-number");
const checkPointsButton = document.getElementById("check-points-button");
const errorMessage = document.getElementById("error-message");

if (mobileInput && checkPointsButton) {
  mobileInput.addEventListener("input", () => {
    const value = mobileInput.value.trim();
    if (value === "0173527250") { // Valid mobile number without +60 prefix
      checkPointsButton.disabled = false;
      errorMessage.textContent = ""; // Clear error message
      document.querySelector(".mobile-input").classList.add("valid"); // Add valid class
    } else {
      checkPointsButton.disabled = true;
      errorMessage.textContent = "Invalid mobile number."; // Show error message
      document.querySelector(".mobile-input").classList.remove("valid"); // Remove valid class
    }
  });

  checkPointsButton.addEventListener("click", () => {
    // Ensure the phone number is stored correctly in the proper format
    const phone = mobileInput.value.startsWith("0")
      ? "+60" + mobileInput.value.slice(1)
      : "+60" + mobileInput.value;

    localStorage.setItem("phone", phone);
    window.location.href = "registration.html"; // Redirect to registration page
  });
}

// Page 2
const nameInput = document.getElementById("name");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const emailInput = document.getElementById("email");
const noEmailCheckbox = document.getElementById("no-email");
const continueButton = document.getElementById("continue-button");

if (continueButton) {
  continueButton.addEventListener("click", () => {
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      document.getElementById("name-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("name-error").style.display = "none";
    }

    // Validate Birthday
    const day = parseInt(dayInput.value.trim(), 10);
    const month = parseInt(monthInput.value.trim(), 10);
    const year = parseInt(yearInput.value.trim(), 10);
    const today = new Date();

    if (
      isNaN(day) || isNaN(month) || isNaN(year) || // Check if inputs are numbers
      day < 1 || day > 31 || // Valid day range
      month < 1 || month > 12 || // Valid month range
      year < 1900 || year > today.getFullYear() || // Valid year range
      new Date(year, month - 1, day) > today || // Check if date is not in the future
      new Date(year, month - 1, day).getDate() !== day // Valid day for the month
    ) {
      document.getElementById("birthday-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("birthday-error").style.display = "none";
    }

    // Validate Email
    if (!noEmailCheckbox.checked && !emailInput.value.includes("@")) {
      document.getElementById("email-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("email-error").style.display = "none";
    }

    if (isValid) {
      // Save to localStorage
      localStorage.setItem("name", nameInput.value);
      localStorage.setItem("birthday", `${day}/${month}/${year}`);
      localStorage.setItem("email", noEmailCheckbox.checked ? "No email address" : emailInput.value);

      // Navigate to confirmation page
      window.location.href = "confirmation.html";
    }
  });
}

// Page 3
const phoneElement = document.getElementById("phone");
const nameElement = document.getElementById("name-output");
const birthdayElement = document.getElementById("birthday-output");
const emailElement = document.getElementById("email-output");

// Populate confirmation page with stored data
if (phoneElement && nameElement && birthdayElement && emailElement) {
  const phone = "+60173527250"; // Hardcoded value to display the desired phone number
  phoneElement.textContent = phone; // Display only the desired phone number
  nameElement.textContent = localStorage.getItem("name") || "N/A";
  birthdayElement.textContent = localStorage.getItem("birthday") || "N/A";
  emailElement.textContent = localStorage.getItem("email") || "N/A";
}