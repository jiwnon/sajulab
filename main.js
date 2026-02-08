document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const resultText = document.getElementById('result-text');
    const todayFortuneText = document.getElementById('today-fortune-text');
    const themeToggle = document.getElementById('theme-toggle');
    const workerApiUrl = "https://sajulab-worker.alithya0707.workers.dev/api/saju";

    // 다크/라이트 모드: 저장된 값 또는 시스템 설정 사용
    const THEME_KEY = 'sajulab-theme';
    function getPreferredTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'dark' || saved === 'light') return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    }
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }
    setTheme(getPreferredTheme());
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Function to fetch and display Today's Fortune
    async function fetchTodayFortune() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // getMonth() is 0-indexed
        const day = now.getDate();
        const hour = now.getHours();

        todayFortuneText.textContent = 'Loading today\'s fortune...';
        try {
            const response = await fetch(`${workerApiUrl}?year=${year}&month=${month}&day=${day}&hour=${hour}`);
            const data = await response.json();

            if (response.ok) {
                todayFortuneText.innerHTML = `
                    <p>기준: ${year}년 ${month}월 ${day}일 ${hour}시</p>
                    <h2>${data.yearPillar} ${data.monthPillar} ${data.dayPillar} ${data.hourPillar}</h2>
                    <p>${data.interpretation}</p>
                `;
            } else {
                todayFortuneText.textContent = `Error: ${data.error || 'Failed to fetch today\'\'s fortune.'}`;
            }
        } catch (error) {
            console.error('Error fetching today\'s fortune:', error);
            todayFortuneText.textContent = 'An error occurred while fetching today\'s fortune.';
        }
    }

    // Call fetchTodayFortune on page load
    fetchTodayFortune();

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
