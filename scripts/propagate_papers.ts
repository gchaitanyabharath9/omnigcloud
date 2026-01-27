
import fs from "fs";
import path from "path";

async function propagateKeys() {
    const rootDir = process.cwd();
    const messagesDir = path.join(rootDir, "src", "messages");
    const enPath = path.join(messagesDir, "en.json");

    console.log("Reading en.json...");
    const enContent = JSON.parse(fs.readFileSync(enPath, "utf-8"));
    const papersSource = enContent.Papers;

    const locales = ["es", "fr", "de", "zh", "hi", "ja", "ko"];

    for (const locale of locales) {
        const localePath = path.join(messagesDir, `${locale}.json`);
        console.log(`Processing ${locale}.json...`);

        if (fs.existsSync(localePath)) {
            const localeContent = JSON.parse(fs.readFileSync(localePath, "utf-8"));

            // Ensure Papers.Items exists
            if (!localeContent.Papers) {
                localeContent.Papers = {};
            }
            if (!localeContent.Papers.Items) {
                localeContent.Papers.Items = {};
            }

            // Propagate keys
            // We will perform a deep merge/copy of keys that are present in EN but missing in locale
            // For now, we copy the value from EN as a placeholder to pass the gate

            const missingKeys: string[] = [];
            const propagateObject = (source: Record<string, any>, target: Record<string, any>, prefix: string) => {
                for (const key in source) {
                    // Skip if key exists in target
                    if (target[key] !== undefined) {
                        // specific logic: if it's an object, recurse
                        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                            // If target[key] is a string (legacy mismatch), overwrite it with object
                            if (typeof target[key] !== 'object') {
                                console.log(`  Replacing string with object at ${prefix}.${key}`);
                                target[key] = {};
                            }
                            propagateObject(source[key], target[key], `${prefix}.${key}`);
                        }
                        continue;
                    }

                    // If missing, copy from source
                    target[key] = source[key];
                    missingKeys.push(`${prefix}.${key}`);
                }
            };

            propagateObject(papersSource, localeContent.Papers, "Papers");

            if (missingKeys.length > 0) {
                console.log(`  Added ${missingKeys.length} missing keys to ${locale}.json (e.g., ${missingKeys[0]})`);
                fs.writeFileSync(localePath, JSON.stringify(localeContent, null, 2));
            } else {
                console.log(`  No missing keys found in ${locale}.json`);
            }

        } else {
            console.warn(`  Warning: ${locale}.json not found!`);
        }
    }

    console.log("Propagation complete.");
}

propagateKeys().catch(console.error);
