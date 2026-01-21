const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

if (!data.Docs) data.Docs = {};

// Add new keys
data.Docs.technicalLibrary = "Technical Library";
data.Docs.abstract = {
    title: "Abstract",
    paragraph1: "This technical volume formalizes the implementation details of the {title} within the Autonomous Sovereign Orchestration (ASO) framework. It provides the necessary evidence for original contribution in cloud-agnostic systems.",
    paragraph2: "The following sections explore the empirical validation, architectural constraints, and performance breakthroughs associated with this specific exhibit."
};
data.Docs.sections = {
    empiricalDataSet: "Empirical Data Set",
    empiricalDataSetDesc: "Verified multi-cloud telemetry",
    validationProtocols: "Validation Protocols",
    autonomousGatingLogs: "Autonomous gating logs"
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added Docs translation keys to en.json');
