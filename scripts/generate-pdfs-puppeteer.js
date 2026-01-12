const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Papers to convert
const papers = [
  {
    input: 'src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md',
    output: 'publication-pdfs/A1-Cloud-Native-Enterprise-Reference.pdf',
    name: 'A1 Paper'
  },
  {
    input: 'src/app/[locale]/research/papers/a2-high-throughput-distributed-systems/A2-PAPER-FULL.md',
    output: 'publication-pdfs/A2-High-Throughput-Distributed-Systems.pdf',
    name: 'A2 Paper'
  },
  {
    input: 'src/app/[locale]/research/papers/a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md',
    output: 'publication-pdfs/A3-Enterprise-Observability-Operational-Intelligence.pdf',
    name: 'A3 Paper'
  },
  {
    input: 'src/app/[locale]/research/papers/a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md',
    output: 'publication-pdfs/A4-Platform-Governance-Multicloud-Hybrid.pdf',
    name: 'A4 Paper'
  },
  {
    input: 'src/app/[locale]/research/papers/a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md',
    output: 'publication-pdfs/A5-Monolith-to-Cloud-Native-Modernization.pdf',
    name: 'A5 Paper'
  },
  {
    input: 'src/app/[locale]/research/papers/a6-adaptive-policy-enforcement/A6-PAPER-FULL.md',
    output: 'publication-pdfs/A6-Adaptive-Policy-Enforcement.pdf',
    name: 'A6 Paper'
  },
  {
    input: 'src/app/[locale]/research/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md',
    output: 'publication-pdfs/Scholarly-Article-Enterprise-Architecture.pdf',
    name: 'Scholarly Article'
  },
  {
    input: 'src/app/[locale]/research/frameworks/aecp/AECP-FULL.md',
    output: 'publication-pdfs/AECP-Framework.pdf',
    name: 'AECP Framework'
  }
];

function convertMarkdownToHTML(markdown) {
  let html = markdown;

  // Normalize line endings
  html = html.replace(/\r\n/g, '\n');

  // Convert Mermaid blocks to divs with class
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
    return `<pre class="mermaid">\n${code}\n</pre>`;
  });

  // Convert other code blocks
  html = html.replace(/```(\w+)\n([\s\S]*?)```/g, (match, lang, code) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="language-${lang}">${escaped}</code></pre>`;
  });

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert horizontal rules
  html = html.replace(/^---$/gim, '<hr>');

  // Convert paragraphs
  html = html.split('\n\n').map(para => {
    if (para.trim().startsWith('<')) return para;
    if (para.trim() === '') return '';
    return `<p>${para.trim()}</p>`;
  }).join('\n');

  // Convert tables
  html = html.replace(/\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match) => {
    const lines = match.trim().split('\n');
    const headers = lines[0].split('|').filter(h => h.trim()).map(h => h.trim());
    const rows = lines.slice(2).map(line =>
      line.split('|').filter(c => c.trim()).map(c => c.trim())
    );

    let table = '<table class="research-table">\n<thead>\n<tr>\n';
    headers.forEach(h => table += `<th>${h}</th>\n`);
    table += '</tr>\n</thead>\n<tbody>\n';
    rows.forEach((row, idx) => {
      const rowClass = idx % 2 === 0 ? 'even-row' : 'odd-row';
      table += `<tr class="${rowClass}">\n`;
      row.forEach(cell => table += `<td>${cell}</td>\n`);
      table += '</tr>\n';
    });
    table += '</tbody>\n</table>';
    return table;
  });

  return html;
}

const HTML_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Research Paper</title>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      themeVariables: {
        fontSize: '20px', // Larger font for readability
        primaryColor: '#4A90E2',
        primaryTextColor: '#fff',
        primaryBorderColor: '#2E5C8A',
        lineColor: '#5C7CFA',
        secondaryColor: '#7950F2',
        tertiaryColor: '#20C997',
        background: '#ffffff',
        mainBkg: '#E3F2FD',
        secondBkg: '#F3E5F5',
        tertiaryBkg: '#E8F5E9',
        clusterBkg: '#FFF3E0',
        clusterBorder: '#FF9800',
        defaultLinkColor: '#5C7CFA',
        titleColor: '#1A237E',
        edgeLabelBackground: '#ffffff',
        nodeTextColor: '#1A237E'
      },
      securityLevel: 'loose',
      maxTextSize: 100000,
      flowchart: { 
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis',
        padding: 20
      },
      sequence: { 
        useMaxWidth: false,
        actorMargin: 100,
        boxMargin: 20,
        messageFontSize: 20,
        noteFontSize: 18,
        actorFontSize: 20
      },
      gantt: { 
        useMaxWidth: false,
        barHeight: 40,
        fontSize: 18,
        sectionFontSize: 20
      },
      journey: { useMaxWidth: false },
      er: { useMaxWidth: false, fontSize: 18 },
      class: { useMaxWidth: false },
      state: { useMaxWidth: false, fontSize: 18 },
      pie: { useMaxWidth: false }
    });
    
    // Manually render each diagram with error handling
    window.addEventListener('DOMContentLoaded', async () => {
      const diagrams = document.querySelectorAll('pre.mermaid');
      let successCount = 0;
      let errorCount = 0;
      let errorDetails = [];
      
      for (let i = 0; i < diagrams.length; i++) {
        const diagram = diagrams[i];
        let code = diagram.textContent.trim();
        
        // Fix common Mermaid syntax issues
        // Fix block-beta syntax (not supported in Mermaid 11)
        if (code.includes('block-beta')) {
          code = code.replace(/block-beta/g, 'graph TD');
          code = code.replace(/columns \\d+/g, '');
          code = code.replace(/block:/g, 'subgraph ');
          code = code.replace(/end(?!\\s*subgraph)/g, 'end');
        }
        
        try {
          const { svg } = await mermaid.render(\`mermaid-\${i}\`, code);
          const container = document.createElement('div');
          container.className = 'mermaid-rendered';
          container.innerHTML = svg;
          
          // Constrain diagram size and add colorful styling
          const svgElement = container.querySelector('svg');
          if (svgElement) {
            // Get original dimensions
            const viewBox = svgElement.getAttribute('viewBox');
            let width, height;
            
            if (viewBox) {
              const parts = viewBox.split(/\s+|,/);
              width = parseFloat(parts[2]);
              height = parseFloat(parts[3]);
            } else {
              width = parseInt(svgElement.getAttribute('width') || '800');
              height = parseInt(svgElement.getAttribute('height') || '600');
            }
            
            // Set max width without shrinking if possible
            const MAX_WIDTH = 750; // Increased readable width
            
            if (width > MAX_WIDTH) {
              // Instead of strict transform scaling which shrinks text, 
              // we set width to 100% and let it contain specific max width
              svgElement.style.width = '100%';
              svgElement.style.maxWidth = \`\${MAX_WIDTH}px\`;
              svgElement.style.height = 'auto'; // Maintain aspect ratio
              
              // Ensure container fits
              container.style.width = '100%';
            } else {
              svgElement.style.width = \`\${width}px\`;
              svgElement.style.height = \`\${height}px\`;
            }
          }
          
          diagram.replaceWith(container);
          successCount++;
        } catch (error) {
          console.error(\`Failed to render diagram \${i}:\`, error.message);
          errorDetails.push({ index: i, error: error.message, code: code.substring(0, 100) });
          
          diagram.innerHTML = \`<div class="mermaid-error">
            <div class="error-header">
              <strong>⚠️ Diagram Rendering Error</strong>
            </div>
            <p class="error-message">This diagram could not be rendered due to a syntax issue. The diagram has been preserved for reference.</p>
            <details class="error-details">
              <summary>🔍 View Error Details & Diagram Code</summary>
              <div class="error-info">
                <p><strong>Error:</strong> \${error.message}</p>
                <pre class="diagram-code">\${code}</pre>
              </div>
            </details>
          </div>\`;
          errorCount++;
        }
      }
      
      console.log(\`Rendered \${successCount} diagrams successfully, \${errorCount} errors\`);
      if (errorCount > 0) {
        console.log('Error details:', errorDetails);
      }
      window.diagramsReady = true;
    });
  </script>
  <style>
    @page {
      margin: 1in;
      size: letter;
    }
    
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
      background: #ffffff;
    }
    
    /* Headers - Keep with following content */
    h1 {
      font-size: 24pt;
      font-weight: bold;
      margin-top: 24pt;
      margin-bottom: 12pt;
      page-break-after: avoid;
      page-break-inside: avoid;
      color: #1A237E;
      border-bottom: 4px solid #4A90E2;
      padding-bottom: 8pt;
      background: linear-gradient(90deg, rgba(74,144,226,0.1) 0%, transparent 100%);
      padding-left: 8pt;
    }
    
    h2 {
      font-size: 18pt;
      font-weight: bold;
      margin-top: 18pt;
      margin-bottom: 9pt;
      page-break-after: avoid;
      page-break-inside: avoid;
      color: #283593;
      border-bottom: 3px solid #5C7CFA;
      padding-bottom: 6pt;
      background: linear-gradient(90deg, rgba(92,124,250,0.15) 0%, transparent 100%);
      padding-left: 8pt;
    }
    
    h3 {
      font-size: 14pt;
      font-weight: bold;
      margin-top: 14pt;
      margin-bottom: 7pt;
      page-break-after: avoid;
      page-break-inside: avoid;
      color: #3949AB;
      border-left: 4px solid #7950F2;
      padding-left: 10pt;
      background: linear-gradient(90deg, rgba(121,80,242,0.1) 0%, transparent 100%);
      padding-top: 4pt;
      padding-bottom: 4pt;
    }
    
    /* Figure captions and labels - keep with diagrams */
    p:has(strong:first-child) {
      page-break-after: avoid;
      page-break-inside: avoid;
    }
    
    /* Labels like "Algorithm:", "Figure:", "Table:" - keep with following content */
    p:contains("Algorithm:"),
    p:contains("Figure"),
    p:contains("Table"),
    strong:contains("Algorithm:"),
    strong:contains("Figure"),
    strong:contains("Table") {
      page-break-after: avoid !important;
      page-break-inside: avoid !important;
      margin-bottom: 4pt;
    }
    
    p {
      margin: 0 0 12pt 0;
      text-align: justify;
      orphans: 3;
      widows: 3;
    }
    
    code {
      font-family: 'Courier New', monospace;
      font-size: 9pt;
      background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
      padding: 3px 6px;
      border-radius: 4px;
      border: 1px solid #64B5F6;
      color: #0D47A1;
    }
    
    pre {
      background: linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%);
      padding: 14pt;
      border-radius: 6px;
      page-break-inside: avoid;
      page-break-before: avoid;
      margin: 14pt 0;
      border-left: 5px solid #4A90E2;
      box-shadow: 0 3px 6px rgba(0,0,0,0.15);
      
      /* WRAPPING FIXES */
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
      overflow-x: hidden;
      max-width: 100%;
    }
    
    pre code {
      background: none;
      padding: 0;
      border: none;
      color: #263238;
    }
    
    /* Colorful Tables with STRONG gradients - NEVER SPLIT */
    table.research-table {
      border-collapse: collapse;
      width: 100%;
      margin: 16pt 0;
      page-break-inside: avoid !important;
      page-break-before: avoid !important;
      page-break-after: auto;
      font-size: 10pt;
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
      border-radius: 10px;
      overflow: hidden;
      border: 3px solid #4A90E2;
    }
    
    table.research-table thead {
      background: linear-gradient(135deg, #1976D2 0%, #5C7CFA 50%, #7950F2 100%);
      color: white;
      display: table-header-group;
      page-break-inside: avoid !important;
      page-break-after: avoid !important;
    }
    
    table.research-table tbody {
      display: table-row-group;
      page-break-before: avoid !important;
    }
    
    table.research-table th {
      border: none;
      padding: 14pt;
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 9pt;
      background: rgba(255,255,255,0.1);
      page-break-inside: avoid !important;
      page-break-after: avoid !important;
    }
    
    table.research-table td {
      border: 1px solid #BDBDBD;
      padding: 11pt;
      text-align: left;
      page-break-inside: avoid;
    }
    
    table.research-table tr {
      page-break-inside: avoid !important;
      page-break-after: auto;
    }
    
    table.research-table tr.even-row {
      background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%);
    }
    
    table.research-table tr.odd-row {
      background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #E3F2FD 100%);
    }
    
    table.research-table tbody tr:hover {
      background: linear-gradient(135deg, #FFF9C4 0%, #FFF59D 50%, #FFEB3B 100%);
      transition: background 0.3s ease;
    }
    
    /* Colorful Diagrams with STRONG borders */
    .mermaid-rendered {
      margin: 24pt 0;
      page-break-inside: avoid;
      page-break-before: avoid;
      text-align: center;
      background: linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 50%, #F3E5F5 100%);
      padding: 20pt;
      border: 4px solid #4A90E2;
      border-radius: 12px;
      max-width: 100%;
      overflow: hidden;
      box-shadow: 0 6px 16px rgba(74, 144, 226, 0.3);
    }
    
    .mermaid-rendered svg {
      max-width: 100%;
      height: auto;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
    }
    
    /* Enhanced Error Styling */
    .mermaid-error {
      margin: 24pt 0;
      padding: 18pt;
      background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%);
      border: 4px solid #FF9800;
      border-radius: 10px;
      page-break-inside: avoid;
      box-shadow: 0 6px 12px rgba(255, 152, 0, 0.3);
    }
    
    .mermaid-error .error-header {
      color: #E65100;
      font-size: 12pt;
      margin-bottom: 10pt;
      padding-bottom: 10pt;
      border-bottom: 3px solid #FFB74D;
      font-weight: bold;
    }
    
    .mermaid-error .error-message {
      color: #BF360C;
      margin: 10pt 0;
      font-weight: 500;
    }
    
    .mermaid-error details {
      margin-top: 14pt;
      background: #FFFFFF;
      padding: 12pt;
      border-radius: 6px;
      border: 2px solid #FFB74D;
    }
    
    .mermaid-error summary {
      cursor: pointer;
      font-weight: bold;
      color: #E65100;
      padding: 6pt;
    }
    
    .mermaid-error .error-info {
      margin-top: 10pt;
    }
    
    .mermaid-error .diagram-code {
      font-size: 8pt;
      max-height: 200pt;
      overflow-y: auto;
      background: #F5F5F5;
      border-left: 4px solid #FF9800;
    }
    
    blockquote {
      border-left: 5px solid #7950F2;
      padding-left: 14pt;
      margin-left: 0;
      font-style: italic;
      background: linear-gradient(90deg, rgba(121,80,242,0.2) 0%, transparent 100%);
      padding: 12pt 12pt 12pt 18pt;
      border-radius: 0 6px 6px 0;
    }
    
    hr {
      border: none;
      border-top: 4px solid #4A90E2;
      margin: 24pt 0;
      page-break-after: avoid;
      background: linear-gradient(90deg, transparent 0%, #4A90E2 50%, transparent 100%);
      height: 4px;
    }
    
    a {
      color: #1976D2;
      text-decoration: none;
      border-bottom: 2px dotted #1976D2;
    }
    
    a:hover {
      color: #0D47A1;
      border-bottom: 2px solid #0D47A1;
    }
    
    strong {
      font-weight: bold;
      color: #1A237E;
    }
    
    em {
      font-style: italic;
      color: #3949AB;
    }
  </style>
</head>
<body>
  {{CONTENT}}
</body>
</html>
`;

async function convertMarkdownToPDF(inputPath, outputPath, name, browser) {
  console.log(`\n📄 Converting ${name}...`);

  try {
    // Read markdown file
    const fullInputPath = path.resolve(inputPath);
    const fullOutputPath = path.resolve(outputPath);
    const markdown = fs.readFileSync(fullInputPath, 'utf8');

    // Convert markdown to HTML
    const htmlContent = convertMarkdownToHTML(markdown);

    // Create full HTML with template
    const fullHtml = HTML_TEMPLATE.replace('{{CONTENT}}', htmlContent);

    // Create a new page
    const page = await browser.newPage();

    // Listen for console messages to track diagram rendering
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('Rendered') || text.includes('Failed') || text.includes('Error details')) {
        console.log(`  ${text}`);
      }
    });

    // Set content and wait for Mermaid to render
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Wait for diagrams to be ready
    await page.waitForFunction(() => window.diagramsReady === true, { timeout: 90000 });

    // Additional wait to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Count Mermaid diagrams
    const stats = await page.evaluate(() => {
      return {
        rendered: document.querySelectorAll('.mermaid-rendered').length,
        errors: document.querySelectorAll('.mermaid-error').length
      };
    });

    // Generate PDF
    await page.pdf({
      path: fullOutputPath,
      format: 'Letter',
      margin: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in'
      },
      printBackground: true,
      preferCSSPageSize: true
    });

    await page.close();

    console.log(`  ✅ Successfully converted ${name} (${stats.rendered} diagrams rendered, ${stats.errors} errors)`);

  } catch (error) {
    console.error(`  ❌ Error converting ${name}: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Starting PDF generation with colorful styling...\n');

  // Ensure output directory exists
  fs.mkdirSync('publication-pdfs', { recursive: true });

  // Launch browser once for all conversions
  console.log('🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const paper of papers) {
      await convertMarkdownToPDF(paper.input, paper.output, paper.name, browser);
    }
  } finally {
    await browser.close();
  }

  console.log('\n✅ PDF generation complete!');
  console.log(`📁 PDFs saved to: ${path.resolve('publication-pdfs')}`);
}

main().catch(console.error);
