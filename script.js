document.addEventListener('DOMContentLoaded', () => {

    const currencyFrom = document.getElementById('currencyFrom');
    const currencyTo = document.getElementById('currencyTo');
    const amountInput = document.getElementById('amount');
    const convertButton = document.querySelector('button[type="submit"]');
    const convertedAmountDiv = document.getElementById('convertedAmount');

    convertButton.addEventListener('click', () => {
        const fromCurrency = currencyFrom.value;
        const toCurrency = currencyTo.value;
        const amount = amountInput.value;

        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const conversionRate = data.rates[toCurrency];
                const convertedAmount = amount * conversionRate;

                convertedAmountDiv.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
                convertedAmountDiv.style.color = 'black';
            })
            .catch(error => {
                console.log('An error occurred:', error);
                convertedAmountDiv.textContent = 'Conversion failed. Please try again.';
            });
    });

    convertButton.addEventListener('mouseenter', () => {
        convertButton.style.animation = 'buttonHoverAnim 0.5s ease-in-out forwards';
    });

    convertButton.addEventListener('click', () => {
        convertButton.style.animation = 'buttonPressAnim 0.2s ease-in-out';
        convertButton.addEventListener('animationend', () => {
            convertButton.style.animation = 'none';
        });
    });

    document.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            convertButton.click();
        }
    });
});
