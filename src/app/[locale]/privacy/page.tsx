export default function PrivacyPage() {
    return (
        <section className="container section-padding">
            <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Privacy Policy</h1>
                <p style={{ marginBottom: '1rem', color: 'var(--muted-foreground)' }}>Last Updated: December 2025</p>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                    <p>At OmniGCloud, we prioritize the privacy and security of our clients&apos; data. This policy outlines our improved data handling practices...</p>
                    <br />
                    <h3>1. Data Collection</h3>
                    <p>We collect only essential infrastructure metadata required for the operation of our platform...</p>
                </div>
            </div>
        </section>
    );
}
