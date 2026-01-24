import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/styles/**/*.{css,scss}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    main: "var(--primary-main)",
                    foreground: "var(--primary-contrast)",
                    glow: "var(--primary-glow)",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                },
                card: {
                    DEFAULT: "var(--card-bg)",
                    border: "var(--card-border)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                surface: {
                    DEFAULT: "var(--surface-1)",
                    1: "var(--surface-1)",
                    2: "var(--surface-2)",
                },
                success: "var(--color-success)",
                warning: "var(--color-warning)",
                danger: "var(--color-danger)",
                info: "var(--color-info)",
                accent: "var(--color-accent-purple)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
            fontFamily: {
                body: "var(--font-body)",
                heading: "var(--font-heading)",
                mono: "var(--font-mono)",
            },
            spacing: {
                header: "var(--header-height)",
                breadcrumb: "var(--breadcrumb-height)",
                "section-pt": "var(--section-pt)",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};

export default config;
