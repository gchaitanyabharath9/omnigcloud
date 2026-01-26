
import fs from "fs";
import path from "path";

const JA_FILE = path.join(process.cwd(), "src/messages/ja.json");

const MISSING_KEY_STRUCTURE = {
    Industries: {
        healthcare: {
            paradox: {
                p1: "AI adoption in healthcare is hindered by data privacy concerns.",
                p2: "Sovereign clouds enable secure, compliant AI deployment.",
                features: {
                    gating: {
                        title: "Autonomous Gating",
                        desc: "Prevent unauthorized data egress with policy-as-code."
                    },
                    acceleration: {
                        title: "Model Acceleration",
                        desc: "Optimize inference latency on edge devices."
                    },
                    ai: {
                        title: "Clinical AI",
                        desc: "Deploy diagnostic models with human-in-the-loop validation."
                    }
                }
            },
            faq: {
                item0: { q: "Is patient data secure?", a: "Yes, fully encrypted and sovereign." },
                item1: { q: "Can we use public cloud models?", a: "Yes, via secure private endpoints." },
                item2: { q: "What about compliance?", a: "We support HIPAA and GDPR natively." },
                item3: { q: "How fast is deployment?", a: "Weeks instead of months." }
            }
        }
    }
};

function deepMerge(target: any, source: any) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

function run() {
    if (!fs.existsSync(JA_FILE)) {
        console.error(`File not found: ${JA_FILE}`);
        return;
    }

    try {
        const content = JSON.parse(fs.readFileSync(JA_FILE, "utf-8"));
        const merged = deepMerge(content, MISSING_KEY_STRUCTURE);
        fs.writeFileSync(JA_FILE, JSON.stringify(merged, null, 2));
        console.log("✅ Patched ja.json with missing Industries keys");
    } catch (e) {
        console.error("Error patching ja.json:", e);
    }
}

run();
