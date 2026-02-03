
// --- DOM Element References ---
const chartContainer = document.getElementById('chart-container');
const stockInfoContainer = document.getElementById('stock-info-container');
const symbolInput = document.getElementById('symbol-input');
const searchButton = document.getElementById('search-button');

// --- Chart Initialization ---
const chart = LightweightCharts.createChart(chartContainer, {
    layout: {
        backgroundColor: '#121212',
        textColor: '#f0f0f0',
    },
    grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
    },
    timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        timeVisible: true,
        secondsVisible: false,
    },
});

const candlestickSeries = chart.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderDownColor: '#ef5350',
    borderUpColor: '#26a69a',
    wickDownColor: '#ef5350',
    wickUpColor: '#26a69a',
});

// --- Mock Data API ---
const MOCK_DATA = {
    '005930': {
        info: { name: '삼성전자', price: '82,000 원', change: '+1,200 (1.49%)', volume: '15.5M' },
        chartData: Array.from({ length: 60 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (60 - i));
            const open = 75000 + Math.random() * 1000 - 500 + i * 100;
            const close = open + Math.random() * 1000 - 500;
            const high = Math.max(open, close) + Math.random() * 500;
            const low = Math.min(open, close) - Math.random() * 500;
            return { time: date.toISOString().split('T')[0], open, high, low, close };
        }),
    },
    '035420': {
        info: { name: 'NAVER', price: '188,000 원', change: '-2,500 (-1.31%)', volume: '0.5M' },
        chartData: Array.from({ length: 60 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (60 - i));
            const open = 220000 + Math.random() * 2000 - 1000 - i * 500;
            const close = open + Math.random() * 1000 - 500;
            const high = Math.max(open, close) + Math.random() * 1000;
            const low = Math.min(open, close) - Math.random() * 1000;
            return { time: date.toISOString().split('T')[0], open, high, low, close };
        }),
    },
};

function fetchStockData(symbol) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (MOCK_DATA[symbol]) {
                resolve(MOCK_DATA[symbol]);
            } else {
                reject(`'${symbol}'에 대한 데이터를 찾을 수 없습니다.`);
            }
        }, 800); // Simulate network delay
    });
}

// --- UI Update Functions ---
function updateStockInfo(info) {
    if (!info) {
        stockInfoContainer.innerHTML = '';
        return;
    }
    const isPositive = info.change.startsWith('+');
    const changeColor = isPositive ? 'color: #26a69a;' : 'color: #ef5350;';

    stockInfoContainer.innerHTML = `
        <div style="font-size: 2rem; font-weight: bold;">${info.name}</div>
        <div style="font-size: 1.5rem; margin: 0.5rem 0;">${info.price}</div>
        <div style="${changeColor} font-size: 1.2rem;">${info.change}</div>
        <div style="color: #888; margin-top: 0.5rem;">거래량: ${info.volume}</div>
    `;
}

function updateChart(data) {
    candlestickSeries.setData(data);
    chart.timeScale().fitContent();
}

// --- Event Handlers & Main Logic ---
async function handleSearch() {
    const symbol = symbolInput.value.trim();
    if (!symbol) {
        alert('종목 코드를 입력해주세요.');
        return;
    }

    stockInfoContainer.innerHTML = `<p>데이터 로딩 중...</p>`;
    candlestickSeries.setData([]); // Clear previous data

    try {
        const stockData = await fetchStockData(symbol);
        updateStockInfo(stockData.info);
        updateChart(stockData.chartData);
    } catch (error) {
        stockInfoContainer.innerHTML = `<p style="color: #ef5350;">${error}</p>`;
    }
}

searchButton.addEventListener('click', handleSearch);
symbolInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

window.addEventListener('resize', () => {
    if (chartContainer.clientWidth > 0 && chartContainer.clientHeight > 0) {
        chart.resize(chartContainer.clientWidth, chartContainer.clientHeight);
    }
});

// --- Initial Load ---
function initialize() {
    symbolInput.value = '005930'; // Default stock
    handleSearch();
}

initialize();
