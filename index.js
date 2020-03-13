const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_2 = document.getElementById('password_2');

// Show input error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');

  small.innerText = message;
}
// Show input success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
// Get fieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email not valid');
  }
}

// Check fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    }
  });
}

// Check input lenght

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have a maximum of ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords

function checkPasswordsMatch(password_1, password_2) {
  if (password_1.value === password_2.value) {
    showSuccess(password_2);
  } else {
    showError(password_2, 'Passwords do not match');
  }
}

// Event Listners
form.addEventListener('submit', function(event) {
  event.preventDefault();

  checkRequired([username, email, password, password_2]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password_2);
});
