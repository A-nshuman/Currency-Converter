document.addEventListener('DOMContentLoaded', () => {

    const copyBtn = document.getElementById('copyBtn');
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

                const formattedAmount = convertedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
                convertedAmountDiv.textContent = `${formattedAmount} ${toCurrency}`;
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

    copyBtn.addEventListener('click', () => {
        copyBtn.innerHTML = 'task_alt';
        setTimeout(() => {
            copyBtn.innerHTML = 'content_copy'
        }, 500);

        const textToCopy = convertedAmountDiv.textContent;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch((err) => {
                console.error('Unable to copy text to clipboard', err);
            });
    });
});
