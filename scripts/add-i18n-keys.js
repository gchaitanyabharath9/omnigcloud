const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Add FloatingActions keys
data.FloatingActions = {
    talkToExpert: 'Talk to an Expert',
    chatSupport: {
        title: 'Chat Support',
        replyTime: 'Typically replies in 2m',
        greeting: '👋 Hi there! I\'m your OmniGCloud assistant. How can I help you modernize your infrastructure today?',
        actions: {
            connectSales: '💬 Connect with Sales',
            bookDemo: '📅 Book a Platform Demo',
            viewDocs: '📚 View Documentation'
        },
        placeholder: 'Type a message...'
    },
    contact: {
        title: 'Get in Touch',
        description: 'Our sovereign cloud architects are ready to audit your infrastructure.',
        emailArchitects: 'Email Architects',
        viewFullPage: 'View Full Contact Page'
    }
};

// Add ChatWidget keys
data.ChatWidget = {
    brand: 'SOVEREIGN AI'
};

// Add GlobalError keys
data.GlobalError = {
    title: 'SYSTEM_WIDE_FAILURE',
    message: 'System integrity compromised. The application cannot load.',
    cta: 'Force Reboot'
};

// Add Products.detail keys
if (!data.Products) data.Products = {};
data.Products.detail = {
    platformMetrics: 'PLATFORM METRICS'
};

// Add Home.cta metrics
if (!data.Home) data.Home = {};
if (!data.Home.cta) data.Home.cta = {};
data.Home.cta.realResults = 'Real Results from Real Deployments';
data.Home.cta.metrics = {
    errorReduction: 'Error rate reduction in 30 days',
    averageUptime: 'Average uptime across all deployments'
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Updated en.json');
