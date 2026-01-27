
import fs from "fs";
import path from "path";

async function syncI18n() {
    const rootDir = process.cwd();
    const messagesDir = path.join(rootDir, "src", "messages");
    const enPath = path.join(messagesDir, "en.json");

    console.log("Reading en.json...");
    const enContent = JSON.parse(fs.readFileSync(enPath, "utf-8"));

    const targetNamespaces = ["Resources", "Papers", "Breadcrumb"];
    const locales = ["es", "fr", "de", "zh", "hi", "ja", "ko"];

    for (const locale of locales) {
        const localePath = path.join(messagesDir, `${locale}.json`);
        console.log(`Processing ${locale}.json...`);

        if (fs.existsSync(localePath)) {
            const localeContent = JSON.parse(fs.readFileSync(localePath, "utf-8"));

            let modified = false;

            const propagateObject = (source: Record<string, any>, target: Record<string, any>, prefix: string) => {
                for (const key in source) {
                    if (target[key] !== undefined) {
                        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                            if (typeof target[key] !== 'object') {
                                console.log(`  Replacing string with object at ${prefix}.${key}`);
                                target[key] = {};
                                modified = true;
                            }
                            propagateObject(source[key], target[key], `${prefix}.${key}`);
                        }
                        continue;
                    }

                    target[key] = source[key];
                    console.log(`  Added missing key: ${prefix}.${key}`);
                    modified = true;
                }
            };

            for (const ns of targetNamespaces) {
                if (!localeContent[ns]) {
                    localeContent[ns] = {};
                    modified = true;
                }
                propagateObject(enContent[ns], localeContent[ns], ns);
            }

            if (modified) {
                fs.writeFileSync(localePath, JSON.stringify(localeContent, null, 2));
                console.log(`  Saved ${locale}.json`);
            } else {
                console.log(`  No changes for ${locale}.json`);
            }

        } else {
            console.warn(`  Warning: ${locale}.json not found!`);
        }
    }

    console.log("Sync complete.");
}

syncI18n().catch(console.error);
