const fs = require('fs');
const content = fs.readFileSync('submission/arxiv/A1/main.tex', 'utf8');

const regex = /\\pandocbounded\{\s*(\\includegraphics\[.*?\]\{.*?\})\s*\}/gs;
let match = regex.exec(content);
if (match) {
    console.log("MATCH FOUND!");
    console.log(match[0].substring(0, 50) + "...");
} else {
    console.log("NO MATCH.");
    // Print snippet of pandocbounded
    const idx = content.indexOf('\\pandocbounded');
    if (idx > -1) {
        console.log("Snippet from text:");
        console.log(content.substring(idx, idx + 100));
    }
}
