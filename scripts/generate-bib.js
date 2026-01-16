const fs = require('fs');
const path = require('path');

const bibContent = `
@article{gopu2026a1,
  title={A1-REF-STD: Cloud-Native Enterprise Reference Architecture},
  author={Gopu, Chaitanya Bharath},
  journal={OmnigCloud Technical Reports},
  year={2026}
}

@article{gopu2026a2,
  title={A2-THR-STD: High-Throughput Distributed Systems},
  author={Gopu, Chaitanya Bharath},
  journal={OmnigCloud Technical Reports},
  year={2026}
}

@article{gopu2026a3,
  title={A3-OBS-STD: Enterprise Observability & Operational Intelligence},
  author={Gopu, Chaitanya Bharath},
  journal={OmnigCloud Technical Reports},
  year={2026}
}

@article{gopu2026a4,
  title={A4-GOV-STD: Platform Governance & Multi-Cloud Hybrid Strategy},
  author={Gopu, Chaitanya Bharath},
  journal={OmnigCloud Technical Reports},
  year={2026}
}

@article{gopu2026a5,
  title={A5-MOD-STD: Monolith to Cloud-Native Modernization},
  author={Gopu, Chaitanya Bharath},
  journal={OmnigCloud Technical Reports},
  year={2026}
}

@article{gopu2026a6,
  title={A6-POL-STD: Adaptive Policy Enforcement},
  author={Gopu, Chaitanya Bharath},
  journal={OmnigCloud Technical Reports},
  year={2026}
}

@article{gopu2026aecp,
  title={AECP: Autonomic Enterprise Control Plane Framework},
  author={Gopu, Chaitanya Bharath},
  journal={OmnigCloud Technical Reports},
  year={2026}
}
`;

const ids = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'SCHOLARLY'];
const WORKSPACE = process.cwd();

ids.forEach(id => {
    const refsDir = path.join(WORKSPACE, 'papers', id, 'refs');
    if (!fs.existsSync(refsDir)) fs.mkdirSync(refsDir, { recursive: true });
    fs.writeFileSync(path.join(refsDir, 'references.bib'), bibContent.trim());
});

console.log('Generated references.bib for all papers.');
