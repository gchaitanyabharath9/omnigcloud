const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const baseDir = path.resolve('src/messages');

const newKeys = {
    api: {
        title: "API Reference",
        versionLabel: "REST API v1",
        description: "Interact with the OmniGCloud control plane programmatically. All requests require a valid Bearer token.",
        endpoints: {
            discovery: {
                desc: "List all discovered assets across providers."
            },
            modernization: {
                desc: "Initiate a modernization sequence from a blueprint."
            },
            governance: {
                desc: "Check drift status for a specific cluster."
            }
        }
    }
};

locales.forEach(locale => {
    const filePath = path.join(baseDir, `${locale}.json`);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (!content.Docs) {
        content.Docs = {};
    }

    // Add or merge the api keys
    content.Docs.api = {
        ...content.Docs.api,
        ...newKeys.api
    };

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    console.log(`Updated ${locale}.json`);
});
