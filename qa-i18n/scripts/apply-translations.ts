import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');

const TRANSLATIONS: Record<string, Record<string, any>> = {
    es: {
        Docs: {
            meta: {
                title: "Documentación de OmniGCloud | Compendio Técnico Erudito",
                description: "Documentación de arquitectura agnóstica de nube basada en evidencia. Lea el libro blanco académico y explore los patrones de orquestación autónoma."
            },
            hero: {
                title: "Compendio Técnico Erudito",
                badge: "CONTRIBUCIÓN ORIGINAL DE GRAN SIGNIFICADO",
                description: "La siguiente documentación formaliza el marco de Orquestación Soberana Autónoma (ASO). Este compendio sirve como la evidencia técnica primaria para la revisión académica, demostrando un avance significativo en el gobierno agnóstico de la nube y la sincronización de estado de múltiples infraestructuras."
            },
            sidebar: {
                documentation: "Documentación",
                links: {
                    introduction: "Introducción",
                    architecture: "Arquitectura",
                    whitepaper: "Libro Blanco",
                    security: "Modelo de Seguridad"
                },
                blueprints: "Planos",
                blueprint_links: {
                    aws: "Modernización de AWS",
                    azure: "Azure Sovereign Hub",
                    openshift: "OpenShift en GCP",
                    hybrid: "Malla Híbrida"
                }
            },
            cards: {
                architecture: {
                    title: "Patrones de Diseño",
                    description: "Patrones soberanos para la evidencia académica EB-1A.",
                    exhibit: "EXHIBICIÓN DE EVIDENCIA 01",
                    cta: "Ver Patrones"
                },
                whitepaper: {
                    title: "Libro Blanco Académico",
                    description: "Formalización de la Orquestación Soberana Autónoma (ASO).",
                    exhibit: "EXHIBICIÓN DE EVIDENCIA 02",
                    cta: "Leer Documento"
                },
                guide: {
                    title: "Guía de Inicio Rápido",
                    description: "Póngase en marcha con OmniGCloud en menos de 15 minutos.",
                    exhibit: "EXHIBICIÓN DE EVIDENCIA 03",
                    cta: "Leer Guía"
                },
                api: {
                    title: "Referencia de API",
                    description: "Documentación completa para nuestras APIs REST y GraphQL.",
                    exhibit: "EXHIBICIÓN DE EVIDENCIA 04",
                    cta: "Ver Docs de API"
                }
            },
            banner: {
                title: "Planos de Gobernanza",
                description: "Planos de cumplimiento preconfigurados para SOC 2, HIPAA y GDPR con remediación de desviación automática.",
                cta: "Explorar Planos"
            }
        }
    },
    fr: {
        Docs: {
            meta: {
                title: "Documentation OmniGCloud | Compendium Technique Savant",
                description: "Documentation d'architecture cloud-agnostique basée sur des preuves. Lisez le livre blanc académique et explorez les modèles d'orchestration autonome."
            },
            hero: {
                title: "Compendium Technique Savant",
                badge: "CONTRIBUTION ORIGINALE DE GRANDE IMPORTANCE",
                description: "La documentation suivante formalise le cadre d'Orchestration Souveraine Autonome (ASO). Ce compendium sert de preuve technique primaire pour l'examen académique, démontrant une percée significative dans la gouvernance cloud-agnostique et la synchronisation d'état multi-infrastructure."
            },
            sidebar: {
                documentation: "Documentation",
                links: {
                    introduction: "Introduction",
                    architecture: "Architecture",
                    whitepaper: "Livre Blanc",
                    security: "Modèle de Sécurité"
                },
                blueprints: "Modèles",
                blueprint_links: {
                    aws: "Modernisation AWS",
                    azure: "Azure Sovereign Hub",
                    openshift: "OpenShift sur GCP",
                    hybrid: "Maillage Hybride"
                }
            },
            cards: {
                architecture: {
                    title: "Modèles de Conception",
                    description: "Modèles souverains pour les preuves académiques EB-1A.",
                    exhibit: "PIÈCE À CONCOURS 01",
                    cta: "Voir les Modèles"
                },
                whitepaper: {
                    title: "Livre Blanc Académique",
                    description: "Formalisation de l'Orchestration Souveraine Autonome (ASO).",
                    exhibit: "PIÈCE À CONCOURS 02",
                    cta: "Lire le Livre"
                },
                guide: {
                    title: "Guide de Démarrage Rapide",
                    description: "Soyez opérationnel avec OmniGCloud en moins de 15 minutes.",
                    exhibit: "PIÈCE À CONCOURS 03",
                    cta: "Lire le Guide"
                },
                api: {
                    title: "Référence API",
                    description: "Documentation complète pour nos API REST et GraphQL.",
                    exhibit: "PIÈCE À CONCOURS 04",
                    cta: "Voir l'API"
                }
            },
            banner: {
                title: "Modèles de Gouvernance",
                description: "Modèles de conformité pré-configurés pour SOC 2, HIPAA et GDPR avec remédiation automatique de la dérive.",
                cta: "Explorer les Modèles"
            }
        }
    },
    de: {
        Docs: {
            meta: {
                title: "OmniGCloud Dokumentation | Wissenschaftliches Kompendium",
                description: "Evidenzbasierte cloud-agnostische Architektur-Dokumentation. Lesen Sie das wissenschaftliche Whitepaper und erkunden Sie autonome Orchestrierungsmuster."
            },
            hero: {
                title: "Wissenschaftliches Technisches Kompendium",
                badge: "ORIGINALBEITRAG VON HOHER BEDEUTUNG",
                description: "Die folgende Dokumentation formalisiert das Framework für Autonome Souveräne Orchestrierung (ASO). Dieses Kompendium dient als primärer technischer Nachweis für die wissenschaftliche Überprüfung und demonstriert einen bedeutenden Durchbruch in der cloud-agnostischen Governance und Multi-Infrastruktur-Statussynchronisation."
            },
            sidebar: {
                documentation: "Dokumentation",
                links: {
                    introduction: "Einführung",
                    architecture: "Architektur",
                    whitepaper: "Whitepaper",
                    security: "Sicherheitsmodell"
                },
                blueprints: "Blueprints",
                blueprint_links: {
                    aws: "AWS Modernisierung",
                    azure: "Azure Sovereign Hub",
                    openshift: "OpenShift auf GCP",
                    hybrid: "Hybrid Mesh"
                }
            },
            cards: {
                architecture: {
                    title: "Designmuster",
                    description: "Souveräne Muster für EB-1A wissenschaftliche Belege.",
                    exhibit: "BEWEISSTÜCK 01",
                    cta: "Muster anzeigen"
                },
                whitepaper: {
                    title: "Wissenschaftliches Whitepaper",
                    description: "Formalisierung der Autonomen Souveränen Orchestrierung (ASO).",
                    exhibit: "BEWEISSTÜCK 02",
                    cta: "Paper lesen"
                },
                guide: {
                    title: "Schnellstart-Anleitung",
                    description: "In weniger als 15 Minuten mit OmniGCloud startklar sein.",
                    exhibit: "BEWEISSTÜCK 03",
                    cta: "Guide lesen"
                },
                api: {
                    title: "API-Referenz",
                    description: "Vollständige Dokumentation für unsere REST- und GraphQL-APIs.",
                    exhibit: "BEWEISSTÜCK 04",
                    cta: "API-Docs anzeigen"
                }
            },
            banner: {
                title: "Governance-Blueprints",
                description: "Vorkonfigurierte Compliance-Blueprints für SOC 2, HIPAA und GDPR mit automatischer Drift-Korrektur.",
                cta: "Blueprints erkunden"
            }
        }
    },
    zh: {
        Docs: {
            meta: {
                title: "OmniGCloud 文档 | 学术技术纲要",
                description: "基于证据的云原生架构文档。阅读学术白皮书并探索自主编排模式。"
            },
            hero: {
                title: "学术技术纲要",
                badge: "具有重大意义的原创性贡献",
                description: "以下文档正式确定了自主主权编排 (ASO) 框架。本纲要作为学术评审的主要技术依据，展示了在云原生治理和多基础设施状态同步方面的重大突破。"
            },
            sidebar: {
                documentation: "文档",
                links: {
                    introduction: "简介",
                    architecture: "架构",
                    whitepaper: "白皮书",
                    security: "安全模型"
                },
                blueprints: "蓝图",
                blueprint_links: {
                    aws: "AWS 现代化",
                    azure: "Azure 主权中心",
                    openshift: "GCP 上的 OpenShift",
                    hybrid: "混合网格"
                }
            },
            cards: {
                architecture: {
                    title: "设计模式",
                    description: "用于 EB-1A 学术证据的主权模式。",
                    exhibit: "证据展示 01",
                    cta: "查看模式"
                },
                whitepaper: {
                    title: "学术白皮书",
                    description: "自主主权编排 (ASO) 的正式化。",
                    exhibit: "证据展示 02",
                    cta: "阅读论文"
                },
                guide: {
                    title: "快速入门指南",
                    description: "在 15 分钟内快速上手 OmniGCloud。",
                    exhibit: "证据展示 03",
                    cta: "阅读指南"
                },
                api: {
                    title: "API 参考",
                    description: "我们的 REST 和 GraphQL API 的完整文档。",
                    exhibit: "证据展示 04",
                    cta: "查看 API 文档"
                }
            },
            banner: {
                title: "治理蓝图",
                description: "预配置的 SOC 2、HIPAA 和 GDPR 合规性蓝图，具有自动漂移补救功能。",
                cta: "探索蓝图"
            }
        }
    },
    hi: {
        Docs: {
            meta: {
                title: "OmniGCloud डॉक्युमेंटेशन | विद्वतापूर्ण तकनीकी सारांश",
                description: "साक्ष्य-आधारित क्लाउड-अज्ञेयवादी आर्किटेक्चर दस्तावेज़। विद्वतापूर्ण श्वेतपत्र पढ़ें और स्वायत्त ऑर्केस्ट्रेशन पैटर्न का पता लगाएं।"
            },
            hero: {
                title: "विद्वतापूर्ण तकनीकी सारांश",
                badge: "प्रमुख महत्व का मूल योगदान",
                description: "निम्नलिखित दस्तावेज़ स्वायत्त संप्रभु ऑर्केस्ट्रेशन (ASO) ढांचे को औपचारिक रूप देता है। यह सारांश विद्वतापूर्ण समीक्षा के लिए प्राथमिक तकनीकी साक्ष्य के रूप में कार्य करता है, जो क्लाउड-अज्ञेयवादी शासन और बहु-बुनियादी ढांचे की स्थिति सिंक्रनाइज़ेशन में एक महत्वपूर्ण सफलता का प्रदर्शन करता है।"
            },
            sidebar: {
                documentation: "दस्तावेज़",
                links: {
                    introduction: "परिचय",
                    architecture: "आर्किटेक्चर",
                    whitepaper: "श्वेतपत्र",
                    security: "सुरक्षा मॉडल"
                },
                blueprints: "ब्लूप्रिंट",
                blueprint_links: {
                    aws: "AWS आधुनिकीकरण",
                    azure: "Azure संप्रभु हब",
                    openshift: "GCP पर OpenShift",
                    hybrid: "हाइब्रिड मेश"
                }
            },
            cards: {
                architecture: {
                    title: "डिजाइन पैटर्न",
                    description: "EB-1A विद्वतापूर्ण साक्ष्य के लिए संप्रभु पैटर्न।",
                    exhibit: "साक्ष्य प्रदर्शनी 01",
                    cta: "पैटर्न देखें"
                },
                whitepaper: {
                    title: "विद्वतापूर्ण श्वेतपत्र",
                    description: "स्वायत्त संप्रभु ऑर्केस्ट्रेशन (ASO) का औपचारिकरण।",
                    exhibit: "साक्ष्य प्रदर्शनी 02",
                    cta: "पेपर पढ़ें"
                },
                guide: {
                    title: "क्विक स्टार्ट गाइड",
                    description: "15 मिनट के भीतर OmniGCloud के साथ शुरुआत करें।",
                    exhibit: "साक्ष्य प्रदर्शनी 03",
                    cta: "गाइड पढ़ें"
                },
                api: {
                    title: "API संदर्भ",
                    description: "हमारे REST और GraphQL API के लिए पूर्ण दस्तावेज़।",
                    exhibit: "साक्ष्य प्रदर्शनी 04",
                    cta: "API डॉक्स देखें"
                }
            },
            banner: {
                title: "शासन ब्लूप्रिंट",
                description: "स्वचालित बहाव निवारण के साथ SOC 2, HIPAA और GDPR के लिए पूर्व-कॉन्फ़िगर अनुपालन ब्लूप्रिंट।",
                cta: "ब्लूप्रिंट एक्सप्लोर करें"
            }
        }
    },
    ja: {
        Docs: {
            meta: {
                title: "OmniGCloud ドキュメント | 学術技術要覧",
                description: "証拠に基づいたクラウド・アグノスティック・アーキテクチャ・ドキュメント。学術ホワイトペーパーを読み、自律的なオーケストレーション・パターンを探索してください。"
            },
            hero: {
                title: "学術技術要覧",
                badge: "重大な意義を持つ独創的な貢献",
                description: "以下のドキュメントは、自律主権オーケストレーション (ASO) フレームワークを形式化したものです。この要覧は、学術的な審査のための主要な技術的証拠として機能し、クラウド・アグノスティックなガバナンスと複数インフラストラクチャの状態同期における画期的な進歩を実証しています。"
            },
            sidebar: {
                documentation: "ドキュメント",
                links: {
                    introduction: "導入",
                    architecture: "アーキテクチャ",
                    whitepaper: "ホワイトペーパー",
                    security: "セキュリティモデル"
                },
                blueprints: "ブループリント",
                blueprint_links: {
                    aws: "AWS モダナイゼーション",
                    azure: "Azure 主権ハブ",
                    openshift: "GCP上のOpenShift",
                    hybrid: "ハイブリッドメッシュ"
                }
            },
            cards: {
                architecture: {
                    title: "デザインパターン",
                    description: "EB-1A 学術証拠のための主権パターン。",
                    exhibit: "証拠展示 01",
                    cta: "パターンを表示"
                },
                whitepaper: {
                    title: "学術ホワイトペーパー",
                    description: "自律主権オーケストレーション (ASO) の形式化。",
                    exhibit: "証拠展示 02",
                    cta: "論文を読む"
                },
                guide: {
                    title: "クイックスタートガイド",
                    description: "15分以内に OmniGCloud を稼働させます。",
                    exhibit: "証拠展示 03",
                    cta: "ガイドを読む"
                },
                api: {
                    title: "API リファレンス",
                    description: "REST および GraphQL API の完全なドキュメント。",
                    exhibit: "証拠展示 04",
                    cta: "APIドキュメントを表示"
                }
            },
            banner: {
                title: "ガバナンス・ブループリント",
                description: "自動的なドリフト修正を備えた、SOC 2、HIPAA、GDPR向けの事前設定済みコンプライアンス・ブループリント。",
                cta: "ブループリントを探索"
            }
        }
    },
    ko: {
        Docs: {
            meta: {
                title: "OmniGCloud 문서 | 학술 기술 개요",
                description: "증거 기반의 클라우드 애그노스틱 아키텍처 문서. 학술 백서를 읽고 자율 오케스트레이션 패턴을 살펴보세요."
            },
            hero: {
                title: "학술 기술 개요",
                badge: "중대한 의미를 지닌 독창적 공헌",
                description: "다음 문서는 자율 주권 오케스트레이션(ASO) 프레임워크를 공식화합니다. 이 개요는 학술적 검토를 위한 주요 기술적 증거로 활용되며, 클라우드 애그노스틱 거버넌스 및 다중 인프라 상태 동기화의 획기적인 발전을 입증합니다."
            },
            sidebar: {
                documentation: "문서",
                links: {
                    introduction: "소개",
                    architecture: "아키텍처",
                    whitepaper: "백서",
                    security: "보안 모델"
                },
                blueprints: "청사진",
                blueprint_links: {
                    aws: "AWS 현대화",
                    azure: "Azure 주권 허브",
                    openshift: "GCP 기반 OpenShift",
                    hybrid: "하이브리드 메시"
                }
            },
            cards: {
                architecture: {
                    title: "디자인 패턴",
                    description: "EB-1A 학술 증거를 위한 주권 패턴.",
                    exhibit: "증거 전시 01",
                    cta: "패턴 보기"
                },
                whitepaper: {
                    title: "학술 백서",
                    description: "자율 주권 오케스트레이션(ASO)의 공식화.",
                    exhibit: "증거 전시 02",
                    cta: "백서 읽기"
                },
                guide: {
                    title: "빠른 시작 가이드",
                    description: "15분 이내에 OmniGCloud를 시작하고 실행하세요.",
                    exhibit: "증거 전시 03",
                    cta: "가이드 읽기"
                },
                api: {
                    title: "API 참조",
                    description: "REST 및 GraphQL API에 대한 전체 문서.",
                    exhibit: "증거 전시 04",
                    cta: "API 문서 보기"
                }
            },
            banner: {
                title: "거버넌스 청사진",
                description: "자동 드리프트 해결 기능을 갖춘 SOC 2, HIPAA 및 GDPR을 위한 사전 구성된 준수 청사진.",
                cta: "청사진 살펴보기"
            }
        }
    }
};

function deepMerge(target: Record<string, any>, source: Record<string, any>) {
    for (const key in source) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}

function apply() {
    ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].forEach(locale => {
        const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
        if (!fs.existsSync(filePath)) return;

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        deepMerge(data, TRANSLATIONS[locale]);

        // Final pass to remove common root TODOs
        const rootToRemove = ['nav', 'news'];
        rootToRemove.forEach(k => delete data[k]);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        console.log(`✅ ${locale}: Applied translations and cleaned up.`);
    });
}

apply();
