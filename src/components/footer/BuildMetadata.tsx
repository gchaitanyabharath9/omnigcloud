import React from 'react';

const BuildMetadata = () => {
    // Environment variables injected via next.config.ts -> `env` property
    // These are available on both server and client because they are inlined during build.
    // We access them via process.env directly.
    const version = process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0';
    const env = (process.env.NEXT_PUBLIC_APP_ENV || 'LOCAL').toUpperCase();
    const commit = process.env.NEXT_PUBLIC_GIT_COMMIT || 'dev';
    const time = process.env.NEXT_PUBLIC_BUILD_TIME;

    // Format date safely for display (UTC -> YYYY-MM-DD)
    // We use a simple string logic to avoid hydration issues if server/client timezones differ,
    // though ISO string is mostly safe.
    const dateStr = time ? time.split('T')[0] : 'Unknown Date';

    // Determining visual style based on environment
    // PROD: Stealthy/Neutral
    // SIT: Cautionary/Visible
    // DEV: Informational
    let colorClass = 'text-zinc-600 opacity-50'; // Default PROD
    let label = env;

    if (env === 'SIT') {
        colorClass = 'text-yellow-600 opacity-90 font-bold';
    } else if (env === 'DEV' || env === 'LOCAL') {
        colorClass = 'text-blue-500 opacity-80';
    }

    // Protection:
    // 1. aria-hidden="true" to hide from screen readers (it's technical metadata)
    // 2. data-nosnippet to prevent Google from indexing this text
    // 3. no-print class to hide from print styles (optional but good practice)

    return (
        <div
            className={`flex items-center gap-2 text-[10px] font-mono mt-2 select-none ${colorClass} no-print`}
            data-nosnippet
            aria-hidden="true"
        >
            <span>v{version}</span>
            <span className="opacity-30">•</span>
            <span>{label}</span>
            {commit !== 'dev' && (
                <>
                    <span className="opacity-30">•</span>
                    <span title="Commit Hash">{commit}</span>
                </>
            )}
            <span className="opacity-30">•</span>
            <span title={time || 'Build Date'}>{dateStr}</span>
        </div>
    );
};

export default BuildMetadata;
