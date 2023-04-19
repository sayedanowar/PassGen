options = document.querySelectorAll('.option input');
copyIcon = document.querySelector('.input-box span');
passInput = document.querySelector('.input-box input');
passIndicator = document.querySelector('.pass-indicator');
generateBtn = document.querySelector('.generate-btn');

const lengthSlider = document.querySelector('.pass-length input');
const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '~!@#$%^&*(|)_+-=`{}:"?><,./;[]',
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 24 ? 'weak' : lengthSlider.value <= 50 ? 'medium' : lengthSlider.value <= 75 ? 'strong' : 'very-strong';
}

const copyPass = () => {
    navigator.clipboard.writeText(passInput.value);
    copyIcon.innerText = 'check';
    setTimeout(() => {
        copyIcon.innerText = 'content_copy';
    }, 1000);
}

const generatePassword = () => {
    let staticPassword = '';
    randomPass = '';
    passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            staticPassword += characters[option.id];
        }
    });

    for (let i = 0; i < passLength; i++) {
        randomPass += staticPassword[Math.floor(Math.random() * staticPassword.length)];
    }
    passInput.value = randomPass;
}

const updateSlider = () => {
    document.querySelector('.pass-length span').innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

copyIcon.addEventListener('click', copyPass);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);
