interface Env {
  // Example binding to a D1 database
  // DB: D1Database;
}

// Simplified Saju calculation (placeholder - not astronomically accurate)
function calculateSaju(year: number, month: number, day: number, hour: number) {
    // *** 중요: 이 코드는 매우 단순화되었으며, 실제 사주 계산 방식과는 다릅니다. ***
    // 실제 사주 계산은 복잡한 음력 변환, 절기, 출생 지역 및 시간에 따른 정밀한 계산을 포함합니다.
    // 이 해석은 재미를 위한 것이며, 실제 운세와는 무관합니다.

    const stems = ["甲 (갑)", "乙 (을)", "丙 (병)", "丁 (정)", "戊 (무)", "己 (기)", "庚 (경)", "辛 (신)", "壬 (임)", "癸 (계)"];
    const branches = ["子 (자)", "丑 (축)", "寅 (인)", "卯 (묘)", "辰 (진)", "巳 (사)", "午 (오)", "未 (미)", "申 (신)", "酉 (유)", "戌 (술)", "亥 (해)"];

    // Placeholder logic for pillars
    const yearStem = stems[(year + 6) % 10];
    const yearBranch = branches[(year + 8) % 12];

    const monthStem = stems[(month * 2 + 7) % 10];
    const monthBranch = branches[(month + 2) % 12];

    const dayStem = stems[(day + hour + 5) % 10];
    const dayBranch = branches[(day + hour + 1) % 12];

    const hourStem = stems[(hour + 9) % 10];
    const hourBranch = branches[(hour + 3) % 12];

    // Simple interpretation logic (randomly varied based on inputs)
    let interpretation = `
        생년월일시(${year}년 ${month}월 ${day}일 ${hour}시)를 기준으로 도출된 당신의 사주팔자입니다.<br>
        년주: ${yearStem}${yearBranch} &nbsp; 월주: ${monthStem}${monthBranch} &nbsp; 일주: ${dayStem}${dayBranch} &nbsp; 시주: ${hourStem}${hourBranch}
        <br><br>
    `;

    // Add some varied, ambiguous interpretations
    const interpretationPhrases = [
        "당신은 심지가 곧고 추진력이 강한 성향을 가지고 있습니다. 때로는 고집스럽게 보일 수 있으나, 그만큼 목표 달성 능력이 뛰어납니다.",
        "타인과의 관계에서 유연함과 포용력을 발휘하는 타입입니다. 주변 사람들에게 긍정적인 영향을 주며 인복이 따를 것입니다.",
        "뛰어난 통찰력과 분석적인 사고를 바탕으로 어떤 문제든 현명하게 해결해 나갈 잠재력을 가지고 있습니다.",
        "창의적이고 예술적인 기질이 돋보이며, 자신만의 독특한 방식으로 세상을 바라보는 매력이 있습니다. 변화를 두려워하지 않는 자세가 중요합니다.",
        "꾸준함과 성실함이 당신의 가장 큰 무기입니다. 비록 당장의 성과가 보이지 않아도 끈기 있게 노력하면 반드시 큰 결실을 맺을 것입니다.",
        "새로운 것을 배우고 탐구하는 것을 즐기며, 지적인 호기심이 강합니다. 다양한 경험을 통해 지혜를 넓혀나가세요.",
        "강한 책임감과 리더십으로 주변을 이끄는 능력이 있습니다. 어려운 상황에서도 침착하게 대처하며 신뢰를 얻을 것입니다.",
        "감성이 풍부하고 타인의 감정에 잘 공감하는 편입니다. 섬세한 마음으로 주변을 돌보며 따뜻한 관계를 유지할 것입니다."
    ];

    const specificPhrases = [];

    // Vary phrases based on year/month for some "plausible" variation
    if (year % 2 === 0) { // Even year
        specificPhrases.push("당신의 삶에는 안정과 조화가 중요하며, 균형 잡힌 시각으로 세상을 바라봅니다.");
    } else { // Odd year
        specificPhrases.push("새로운 도전과 변화를 통해 자신을 발전시키는 데 에너지를 쏟는 타입입니다.");
    }

    if (month >= 3 && month <= 5) { // Spring (roughly)
        specificPhrases.push("새로운 시작과 성장에 대한 강한 열망을 가지고 있으며, 활동적인 에너지가 넘칩니다.");
    } else if (month >= 6 && month <= 8) { // Summer
        specificPhrases.push("열정적이고 활발한 기운이 당신을 이끌며, 밝고 긍정적인 태도로 주변을 환하게 만듭니다.");
    } else if (month >= 9 && month <= 11) { // Autumn
        specificPhrases.push("성숙하고 결실을 맺는 시기의 기운이 강하여, 깊이 있는 생각과 현실적인 판단을 중시합니다.");
    } else { // Winter
        specificPhrases.push("고요함 속에서 내면의 힘을 기르고, 미래를 위한 준비에 탁월한 능력을 발휘합니다.");
    }

    interpretation += interpretationPhrases[(year + month + day + hour) % interpretationPhrases.length] + "<br>";
    interpretation += specificPhrases[(year + month) % specificPhrases.length] + "<br>";


    interpretation += `<br>
        <span style="color: #888; font-size: 0.9em;">
            * 이 사주 해석은 오락을 위한 것이며, 실제 사주 명리학과는 관련이 없습니다. 결과에 일희일비하지 마세요.
        </span>
    `;

    return {
        yearPillar: `${yearStem}${yearBranch}`,
        monthPillar: `${monthStem}${monthBranch}`,
        dayPillar: `${dayStem}${dayBranch}`,
        hourPillar: `${hourStem}${hourBranch}`,
        interpretation: interpretation,
    };
}


export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === '/api/saju') {
            const params = url.searchParams;
            const year = parseInt(params.get('year') || '0');
            const month = parseInt(params.get('month') || '0');
            const day = parseInt(params.get('day') || '0');
            const hour = parseInt(params.get('hour') || '0');

            if (!year || !month || !day || !hour) {
                return new Response(JSON.stringify({ error: 'Missing birth information (year, month, day, hour)' }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 400
                });
            }

            const sajuResult = calculateSaju(year, month, day, hour);

            return new Response(JSON.stringify(sajuResult), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // 중요: 프로덕션 환경에서는 Pages 도메인으로 조정해야 합니다.
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }

        // Catch-all for other paths
        return new Response('SajuLab Worker API. Use /api/saju endpoint with birth information.', {
            headers: { 'Content-Type': 'text/plain' },
            status: 200
        });
    },
};