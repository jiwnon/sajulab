document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const resultText = document.getElementById('result-text');
    const workerApiUrl = "https://sajulab-worker.alithya0707.workers.dev/api/saju"; // User's Worker URL

    submitBtn.addEventListener('click', async () => {
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        const hour = document.getElementById('hour').value;

        if (year && month && day && hour) {
            resultText.textContent = 'Calculating your fortune...';
            try {
                const response = await fetch(`${workerApiUrl}?year=${year}&month=${month}&day=${day}&hour=${hour}`);
                const data = await response.json();

                if (response.ok) {
                    resultText.innerHTML = `
                        <h2>${data.yearPillar} ${data.monthPillar} ${data.dayPillar} ${data.hourPillar}</h2>
                        <p>${data.interpretation}</p>
                    `;
                } else {
                    resultText.textContent = `Error: ${data.error || 'Failed to fetch fortune.'}`;
                }
            } catch (error) {
                console.error('Error fetching Saju:', error);
                resultText.textContent = 'An error occurred while fetching your fortune.';
            }
        } else {
            resultText.textContent = 'Please enter all birth information.';
        }
    });
});