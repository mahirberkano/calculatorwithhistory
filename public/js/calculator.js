function clearDisplay() {
    document.getElementById('display').value = '';
}

let calculated = false; // Add a flag to track if the last action was a calculation

function appendToDisplay(value) {
    let display = document.getElementById('display');
    let currentValue = display.value;

    // Reset the display if the last action was a calculation or an error occurred
    if (currentValue === 'Error' || calculated) {
        display.value = value;
        calculated = false; // Reset the flag after updating the display
    } else {
        // Prevent multiple consecutive operators
        const lastChar = currentValue[currentValue.length - 1];
        if (['/', '*', '-', '+'].includes(lastChar) && ['/', '*', '-', '+'].includes(value)) {
            return;
        }
        display.value += value;
    }
}

function calculateResult() {
    let display = document.getElementById('display');
    try {
        if (!calculated) { // Check if the last action was not a calculation
            let result = eval(display.value);
            if (isNaN(result) || result === Infinity) {
                display.value = "Error";
            } else {
                saveCalculation(display.value, result); // Save only if it's the first time
                display.value = result;
                calculated = true; // Set the flag to true after a calculation
            }
        }
    } catch (e) {
        display.value = "Error";
    }
}



async function saveCalculation(expression, result) {
    const response = await fetch('/api/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression, result })
    });
}
