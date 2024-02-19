const cardholderName = document.getElementById('cardholderName');
const cardNumber = document.getElementById('cardNumber');
const expMonth = document.getElementById('expMonth');
const expYear = document.getElementById('expYear');
const cvc = document.getElementById('cvc');

const displayCardNums = document.querySelector('.card-numbers');
const displayCardNameSurname = document.querySelector('.card-name-surname');
const displayCardExpDate = document.querySelector('.card-exp-date');
const displayCardCVC = document.querySelector('.card-cvc');

const smallElements = document.querySelectorAll('small');
const form = document.querySelector('form');

const updateErrorMessage = (index, inputValid, inputMsg, empty) => {
    const inputElement = smallElements[index].previousElementSibling;
    if (inputValid) {
        smallElements[index].style.display = 'none';
        inputElement.classList.remove('fail');
    } else {
        smallElements[index].style.display = 'block';
        if (empty) {
            smallElements[index].textContent = 'Can\'t be blank';
        } else {
            smallElements[index].textContent = inputMsg;
        }
        inputElement.classList.add('fail');
    }
};

cardholderName.addEventListener('input', (e) => {
    let input = e.target.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;
    displayCardNameSurname.textContent = input;
    updateErrorMessage(
        0,
        nameRegex.test(input),
        'Please use only letters',
        input === ''
    );
});

cardNumber.addEventListener('input', (e) => {
    let input = e.target.value;
    const cardNumberRegex = /^[0-9]{16}$/;
    updateErrorMessage(
        1,
        cardNumberRegex.test(input),
        'Use 16 numbers',
        input === ''
    );
    displayCardNums.textContent = input.match(/.{1,4}/g).join('  ');
});

expMonth.addEventListener('input', (e) => {
    let input = e.target.value;
    let isValid = /^[0-9]{1,2}$/.test(input) && input >= 1 && input <= 12;

    if (isValid) {
        updateErrorMessage(2, true, input === '');
        displayCardExpDate.textContent = input + '/';
    } else {
        updateErrorMessage(
            2,
            false,
            'Wrong date format, use month [1-12] and year [2024-2055]',
            input === ''
        );
    }
});

expYear.addEventListener('input', (e) => {
    const year = e.target.value;
    let isValid = /^[0-9]{4}$/.test(year) && year >= 2024 && year <= 2055;

    if (isValid) {
        updateErrorMessage(2, true, year === '');
        displayCardExpDate.textContent = expMonth.value + '/' + year;
    } else {
        updateErrorMessage(
            2,
            false,
            'Wrong date format, use month [1-12] and year [2024-2055]',
            year === ''
        );
    }
});

cvc.addEventListener('input', (e) => {
    let input = e.target.value;
    const cvcRegex = /^[0-9]{3,4}$/;
    displayCardCVC.textContent = input;
    updateErrorMessage(
        3,
        cvcRegex.test(input),
        'Wrong cvc format, use 3/4 numbers',
        input === ''
    );
});

const successMessage = document.querySelector('.success-message');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMessage.style.display = 'block';
    form.style.display = 'none';

    cardholderName.value = '';
    cardNumber.value = '';
    expMonth.value = '';
    expYear.value = '';
    cvc.value = '';
});
