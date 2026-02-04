document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const resultText = document.getElementById('result-text');

    submitBtn.addEventListener('click', () => {
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        const hour = document.getElementById('hour').value;

        if (year && month && day && hour) {
            resultText.textContent = `You entered: Year ${year}, Month ${month}, Day ${day}, Hour ${hour}.
            (Fortune reading logic will be implemented here later.)`;
        } else {
            resultText.textContent = 'Please enter all birth information.';
        }
    });
});