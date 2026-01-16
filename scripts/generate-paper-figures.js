const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE = process.cwd();
const PAPERS_DIR = path.join(WORKSPACE, 'papers');

const paperIds = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'SCHOLARLY'];

paperIds.forEach(id => {
    const manuscriptPath = path.join(PAPERS_DIR, id, 'manuscript', 'canonical.md');
    const figuresDir = path.join(PAPERS_DIR, id, 'figures');
    const contentPath = path.join(PAPERS_DIR, id, 'manuscript', 'content.md');

    if (!fs.existsSync(manuscriptPath)) return;

    let content = fs.readFileSync(manuscriptPath, 'utf-8');

    // Normalize newlines to \n
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    let figCounter = 1;

    // Replace Mermaid blocks
    content = content.replace(/```mermaid([\s\S]*?)```/g, (match, code) => {
        const svgName = `fig-${figCounter}.svg`;
        const pdfName = `fig-${figCounter}.pdf`;
        const mmdPath = path.join(figuresDir, `fig-${figCounter}.mmd`);
        const svgPath = path.join(figuresDir, svgName);
        const pdfPath = path.join(figuresDir, pdfName);

        // Sanitize code for mmdc
        let lines = code.trim().split('\n').map(l => l.trimEnd());
        if (lines.length === 0) return match;

        const diagramType = lines[0].trim().toLowerCase();

        const unsupportedStyles = [
            'sequencediagram',
            'xychart',
            'xychart-beta',
            'pie',
            'gantt',
            'journey',
            'timeline',
            'quadrantchart',
            'statediagram-v2',
            'statediagram',
            'erdiagram',
            'gitgraph',
            'mindmap'
        ];

        const isUnsupported = unsupportedStyles.some(u => diagramType.startsWith(u));

        if (isUnsupported) {
            lines = lines.filter(line => {
                const tl = line.trim().toLowerCase();
                return !tl.startsWith('classdef') && !tl.startsWith('class ');
            });
        }

        // Specific fix for xychart
        if (diagramType.startsWith('xychart')) {
            lines = lines.map(line => {
                let l = line.trim();
                if (l.startsWith('title ')) {
                    const title = l.replace(/^title\s+/, '').trim().replace(/^"+/, '').replace(/"+$/, '');
                    return `title "${title}"`;
                }
                if (l.startsWith('x-axis ')) {
                    const parts = l.replace(/^x-axis\s+/, '').trim();
                    const match = parts.match(/^(.*?)\[(.*?)\]$/);
                    if (match) {
                        let axisTitle = match[1].trim().replace(/^"+/, '').replace(/"+$/, '');
                        let values = match[2].split(',').map(v => `"${v.trim().replace(/"/g, '')}"`).join(', ');
                        return `x-axis "${axisTitle}" [${values}]`;
                    } else {
                        const axisTitle = parts.replace(/^"+/, '').replace(/"+$/, '');
                        return `x-axis "${axisTitle}"`;
                    }
                }
                if (l.startsWith('y-axis ')) {
                    const parts = l.replace(/^y-axis\s+/, '').trim();
                    const match = parts.match(/^(.*?)\s+(-?\d+.*?)$/);
                    if (match) {
                        let axisTitle = match[1].trim().replace(/^"+/, '').replace(/"+$/, '');
                        let range = match[2].trim();
                        return `y-axis "${axisTitle}" ${range}`;
                    } else {
                        const axisTitle = parts.replace(/^"+/, '').replace(/"+$/, '');
                        return `y-axis "${axisTitle}"`;
                    }
                }
                return line;
            });
        }

        // Fix quadrantChart
        if (diagramType.startsWith('quadrantchart')) {
            lines = lines.map(line => {
                let l = line.trim();
                if (l.startsWith('title ')) {
                    const title = l.replace(/^title\s+/, '').trim().replace(/^"+/, '').replace(/"+$/, '');
                    return `title "${title}"`;
                }
                if (l.startsWith('x-axis ')) {
                    const axisTitle = l.replace(/^x-axis\s+/, '').trim().replace(/^"+/, '').replace(/"+$/, '');
                    return `x-axis "${axisTitle}"`;
                }
                if (l.startsWith('y-axis ')) {
                    const axisTitle = l.replace(/^y-axis\s+/, '').trim().replace(/^"+/, '').replace(/"+$/, '');
                    return `y-axis "${axisTitle}"`;
                }
                if (l.startsWith('quadrant-')) {
                    const match = l.match(/^(quadrant-\d+)\s+(.+)$/);
                    if (match) {
                        const q = match[1];
                        const text = match[2].trim().replace(/^"+/, '').replace(/"+$/, '');
                        return `${q} "${text}"`;
                    }
                }
                return line;
            });
        }

        // Quote state labels in stateDiagram-v2
        if (diagramType.startsWith('statediagram')) {
            lines = lines.map(line => {
                let l = line.trim();
                const match = l.match(/^state\s+(.*?)\s+as\s+(\w+)$/);
                if (match) {
                    let label = match[1].trim().replace(/^"+/, '').replace(/"+$/, '');
                    let alias = match[2];
                    return `state "${label}" as ${alias}`;
                }
                return line;
            });
        }

        // Use \n and hope for the best.
        const mmdContent = lines.join('\n') + '\n';
        fs.writeFileSync(mmdPath, mmdContent);

        try {
            console.log(`Generating SVG/PDF for ${id} figure ${figCounter}...`);
            execSync(`mmdc -i "${mmdPath}" -o "${svgPath}" -t neutral`, { stdio: 'inherit' });
            execSync(`mmdc -i "${mmdPath}" -o "${pdfPath}" -t neutral`, { stdio: 'inherit' });

            if (fs.existsSync(mmdPath)) fs.unlinkSync(mmdPath);

            const result = `![Diagram ${figCounter}](figures/${svgName})`;
            figCounter++;
            return result;
        } catch (err) {
            console.error(`Failed to generate for ${id} figure ${figCounter}:`, err.message);
            figCounter++;
            return `![Failed Diagram ${figCounter - 1}](figures/${svgName})`;
        }
    });

    fs.writeFileSync(contentPath, content);
});
