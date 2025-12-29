import Breadcrumb from "@/components/Breadcrumb";
import { Cloud, BarChart } from "lucide-react";

export default function ServicesHero() {
    return (
        <section id="services-hero" className="snap-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '6rem' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container">
                    <Breadcrumb />
                    <div className="grid-2-strict items-center">
                        {/* Text Content */}
                        <div>
                            <div className="badge badge-primary-subtle mb-4">
                                <Cloud size={14} color="var(--primary)" />
                                <span>AUTONOMOUS MODERNIZATION</span>
                            </div>
                            <h1 className="mb-6" style={{ lineHeight: 1.1 }}>
                                Modernize Azure & OCP <br />
                                <span className="text-gradient">with Logic, Not Labor</span>
                            </h1>
                            <p className="text-lead mb-8">
                                Leverage <span style={{ color: 'var(--primary)', fontWeight: 800 }}>Terraform</span> and <span style={{ color: 'var(--primary)', fontWeight: 800 }}>Ansible</span> to automate your enterprise cloud core.
                            </p>
                            <div className="flex gap-4 mb-8">
                                <button className="btn-primary">
                                    Explore Solutions
                                </button>
                            </div>

                            {/* Tech Badges Grid */}
                            <div className="flex gap-3 flex-wrap">
                                {[
                                    { n: 'Java', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&q=80' },
                                    { n: '.NET Core', img: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=200&q=80' },
                                    { n: 'Node.js', img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=200&q=80' },
                                    { n: 'Python', img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=200&q=80' },
                                    { n: 'Go', img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80' }
                                ].map((tech, i) => (
                                    <div key={i} className="relative overflow-hidden rounded-md border border-white/10 w-24 h-12 flex items-center justify-center group">
                                        <img src={tech.img} alt={tech.n} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" />
                                        <span className="relative z-10 text-xs font-bold">{tech.n}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Content - Split into 2 vertical cards for density */}
                        <div className="flex flex-col gap-4 h-full">
                            <div className="img-card-container h-64">
                                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&fit=crop" alt="Global Cloud Network" className="img-cover" />
                                <div className="card-overlay" style={{ background: 'linear-gradient(45deg, rgba(2,6,23,0.8), rgba(59, 130, 246, 0.2))' }}></div>
                                <div className="card-content-overlay justify-center items-center">
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)' }}>
                                        <Cloud size={40} color="#60efff" strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 h-32">
                                <div className="img-card-container">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" alt="Stats" className="img-cover" />
                                    <div className="card-overlay" style={{ background: 'rgba(0,0,0,0.7)' }}></div>
                                    <div className="card-content-overlay justify-center items-center p-2">
                                        <div className="stat-label mb-1">VELOCITY</div>
                                        <div className="stat-value text-success">+400%</div>
                                    </div>
                                </div>
                                <div className="img-card-container">
                                    <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80" alt="Stats" className="img-cover" />
                                    <div className="card-overlay" style={{ background: 'rgba(0,0,0,0.7)' }}></div>
                                    <div className="card-content-overlay justify-center items-center p-2">
                                        <div className="stat-label mb-1">ERRORS</div>
                                        <div className="stat-value text-primary">0.01%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
