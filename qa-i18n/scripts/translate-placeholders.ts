import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'src/messages');

const translations: Record<string, string> = {
    "command-center": "커맨드 센터",
    "dashboard": "대시보드",
    "executive": "경영진 개요",
    "technical": "기술 운영",
    "roi": "ROI 성과",
    "cost": "비용 절감",
    "uptime": "가동 시간",
    "security": "보안",
    "deployment": "배포",
    "scaling": "스케일링",
    "error": "오류율",
    "performance": "성능",
    "telemetry": "원격 측정",
    "organization": "조직",
    "contact_us": "문의하기",
    "information": "정보",
    "tiers": "요금 계정",
    "pillars": "플랫폼 기둥",
    "advanced": "고급 운영",
    "industries": "산업",
    "useCases": "사례",
    "documentation": "문서",
    "community": "커뮤니티",
    "news": "뉴스"
};

function fillPlaceholders() {
    console.log('🌏 Filling placeholders for Tier 2 locales...');

    ['zh', 'hi', 'ja', 'ko'].forEach(locale => {
        const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
        if (!fs.existsSync(filePath)) return;

        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);

        function recursiveFix(obj: Record<string, any>) {
            for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    recursiveFix(obj[key]);
                } else if (typeof obj[key] === 'string') {
                    if (obj[key].includes('[TODO') || obj[key].includes('[MISSING]')) {
                        // Try to find a translation for the key
                        const cleanKey = key.toLowerCase().replace(/_/g, '-');
                        if (translations[cleanKey]) {
                            obj[key] = translations[cleanKey];
                        } else if (translations[key]) {
                            obj[key] = translations[key];
                        }
                    }
                }
            }
        }

        recursiveFix(data);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        console.log(`✅ ${locale}: Processed placeholders.`);
    });
}

fillPlaceholders();
