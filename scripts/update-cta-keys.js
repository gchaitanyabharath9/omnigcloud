const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

data.HomeSections.Cta.platformMetrics = 'PLATFORM METRICS';
data.HomeSections.Cta.realResults = 'Real Results from Real Deployments';
if (!data.HomeSections.Cta.metrics) data.HomeSections.Cta.metrics = {};
data.HomeSections.Cta.metrics.errorReduction = 'Error rate reduction in 30 days';
data.HomeSections.Cta.metrics.averageUptime = 'Average uptime across all deployments';

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Updated HomeSections.Cta');
