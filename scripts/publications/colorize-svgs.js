const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets', 'papers');

// Brand Palette (Vibrant & Professional)
const PALETTE = {
    // Backgrounds
    '#eee': '#E3F2FD', // Light Blue bg
    '#ffffff': '#FFFFFF',
    'white': '#FFFFFF',

    // Borders/Strokes
    '#999': '#1E88E5', // Blue border
    '#666': '#5E35B1', // Purple edge
    '#333': '#1565C0', // Dark Blue text/arrow
    '#000': '#0D47A1', // Darkest Blue text
    '#000000': '#0D47A1',

    // Specific Node Colors (Mermaid defaults -> Vibrant)
    '#BAB0AC': '#FF7043', // Actor (Orange)
    '#4E79A7': '#2196F3', // Control (Blue)
    '#59A14F': '#66BB6A', // Data (Green)
    '#9C6ADE': '#AB47BC', // Policy (Purple)
    '#F28E2B': '#FFA726', // Obs (Amber)
    '#E15759': '#EF5350', // Risk (Red)
    '#76B7B2': '#26A69A', // State (Teal)

    // Audit/Warning matches
    '#552222': '#D32F2F', // Error Red
};

function getAllSvgs(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllSvgs(file));
        } else {
            if (file.toLowerCase().endsWith('.svg')) {
                results.push(file);
            }
        }
    });
    return results;
}

function colorize() {
    console.log('Colorizing SVGs...');
    const svgs = getAllSvgs(ASSETS_DIR);

    let count = 0;
    for (const svgPath of svgs) {
        let content = fs.readFileSync(svgPath, 'utf8');
        let originalContent = content;

        // Perform Replacements
        for (const [key, val] of Object.entries(PALETTE)) {
            // Case insensitive global replace
            const regex = new RegExp(key, 'gi');
            content = content.replace(regex, val);
        }

        // Additional enhancements for stroke widths to make them pop
        content = content.replace(/stroke-width:1px/g, 'stroke-width:1.5px');

        if (content !== originalContent) {
            fs.writeFileSync(svgPath, content);

            // Delete companion PNG if exists to force regeneration
            const pngPath = svgPath.replace(/\.svg$/i, '.png');
            if (fs.existsSync(pngPath)) {
                fs.unlinkSync(pngPath);
            }
            count++;
        }
    }
    console.log(`Colorized ${count} SVGs.`);
}

colorize();
