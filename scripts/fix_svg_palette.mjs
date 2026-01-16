import fs from 'fs';
import path from 'path';

const papersDir = path.join(process.cwd(), 'papers');

const palette = {
    Control: { oldFill: '#4E79A7', oldStroke: '#2C3E50', oldText: '#fff', newFill: '#f0f4f8', newStroke: '#4E79A7', newText: '#2C3E50' },
    Data: { oldFill: '#59A14F', oldStroke: '#274E13', oldText: '#fff', newFill: '#f0f8f0', newStroke: '#59A14F', newText: '#274E13' },
    Policy: { oldFill: '#9C6ADE', oldStroke: '#4B0082', oldText: '#fff', newFill: '#f4f0f8', newStroke: '#9C6ADE', newText: '#4B0082' },
    Obs: { oldFill: '#F28E2B', oldStroke: '#8B4513', oldText: '#fff', newFill: '#f8f4f0', newStroke: '#F28E2B', newText: '#8B4513' },
    Risk: { oldFill: '#E15759', oldStroke: '#7B241C', oldText: '#fff', newFill: '#f8f0f0', newStroke: '#E15759', newText: '#7B241C' },
    State: { oldFill: '#76B7B2', oldStroke: '#0E6251', oldText: '#fff', newFill: '#f0f8f8', newStroke: '#76B7B2', newText: '#0E6251' },
    Actor: { oldFill: '#BAB0AC', oldStroke: '#515A5A', oldText: '#000', newFill: '#f4f4f4', newStroke: '#BAB0AC', newText: '#515A5A' }
};

function processSvg(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    for (const [cls, colors] of Object.entries(palette)) {
        // Replace in styles
        const oldStyle = `. ${cls}>*{fill:${colors.oldFill}!important;stroke:${colors.oldStroke}!important;stroke-width:2px!important;color:${colors.oldText}!important;}`
            .replace(/\./g, `\\.${cls}`) // escape for regex if needed, but we use simple string replace first

        // Actually SVG styles look like: #my-svg .Control>*{fill:#4E79A7!important;stroke:#2C3E50!important;stroke-width:2px!important;color:#fff!important;}
        // Note: grep showed space after .
        // Example: #my-svg .Control>*

        const regexMain = new RegExp(`#my-svg \\.${cls}>\\*\\{fill:${colors.oldFill}!important;stroke:${colors.oldStroke}!important;stroke-width:2px!important;color:${colors.oldText}!important;\\}`, 'gi');
        const newMain = `#my-svg .${cls}>*{fill:${colors.newFill}!important;stroke:${colors.newStroke}!important;stroke-width:2px!important;color:${colors.newText}!important;}`;

        if (content.match(regexMain)) {
            content = content.replace(regexMain, newMain);
            changed = true;
        }

        const regexSpan = new RegExp(`#my-svg \\.${cls} span\\{fill:${colors.oldFill}!important;stroke:${colors.oldStroke}!important;stroke-width:2px!important;color:${colors.oldText}!important;\\}`, 'gi');
        const newSpan = `#my-svg .${cls} span{fill:${colors.newFill}!important;stroke:${colors.newStroke}!important;stroke-width:2px!important;color:${colors.newText}!important;}`;

        if (content.match(regexSpan)) {
            content = content.replace(regexSpan, newSpan);
            changed = true;
        }

        const regexTspan = new RegExp(`#my-svg \\.${cls} tspan\\{fill:${colors.oldText}!important;\\}`, 'gi');
        const newTspan = `#my-svg .${cls} tspan{fill:${colors.newText}!important;}`;

        if (content.match(regexTspan)) {
            content = content.replace(regexTspan, newTspan);
            changed = true;
        }

        // Also handle cases where color is lowercase or has spaces (though mermaid output is consistent)
        // For Actor it was color:#000
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.svg')) {
            processSvg(fullPath);
        }
    }
}

walk(papersDir);
