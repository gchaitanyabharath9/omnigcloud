/**
 * Audit log system for security and compliance
 * In-memory storage with interface for future DB persistence
 */

export type AuditEventType =
    | 'auth.login'
    | 'auth.logout'
    | 'auth.failed'
    | 'auth.mfa_enabled'
    | 'auth.mfa_disabled'
    | 'user.created'
    | 'user.updated'
    | 'user.deleted'
    | 'access.granted'
    | 'access.denied'
    | 'data.exported'
    | 'data.deleted'
    | 'settings.updated'
    | 'api.key_created'
    | 'api.key_revoked';

export interface AuditEvent {
    id: string;
    timestamp: number;
    eventType: AuditEventType;
    userId?: string;
    userEmail?: string; // Masked in logs
    ipAddress?: string;
    userAgent?: string;
    resource?: string;
    action?: string;
    status: 'success' | 'failure';
    metadata?: Record<string, any>;
}

export interface AuditLogStorage {
    save(event: AuditEvent): Promise<void>;
    query(filters: AuditQueryFilters): Promise<AuditEvent[]>;
}

export interface AuditQueryFilters {
    userId?: string;
    eventType?: AuditEventType;
    startTime?: number;
    endTime?: number;
    status?: 'success' | 'failure';
    limit?: number;
}

/**
 * In-memory audit log storage (default)
 * Replace with database implementation for production
 */
class InMemoryAuditStorage implements AuditLogStorage {
    private events: AuditEvent[] = [];
    private maxEvents = 10000; // Prevent memory bloat

    async save(event: AuditEvent): Promise<void> {
        this.events.push(event);

        // Keep only recent events
        if (this.events.length > this.maxEvents) {
            this.events = this.events.slice(-this.maxEvents);
        }
    }

    async query(filters: AuditQueryFilters): Promise<AuditEvent[]> {
        let results = [...this.events];

        if (filters.userId) {
            results = results.filter(e => e.userId === filters.userId);
        }

        if (filters.eventType) {
            results = results.filter(e => e.eventType === filters.eventType);
        }

        if (filters.status) {
            results = results.filter(e => e.status === filters.status);
        }

        if (filters.startTime) {
            results = results.filter(e => e.timestamp >= filters.startTime!);
        }

        if (filters.endTime) {
            results = results.filter(e => e.timestamp <= filters.endTime!);
        }

        // Sort by timestamp descending (newest first)
        results.sort((a, b) => b.timestamp - a.timestamp);

        // Apply limit
        if (filters.limit) {
            results = results.slice(0, filters.limit);
        }

        return results;
    }
}

/**
 * Audit logger with pluggable storage backend
 */
class AuditLogger {
    private storage: AuditLogStorage;
    private enabled = process.env.ENABLE_AUDIT_LOG !== 'false';

    constructor(storage?: AuditLogStorage) {
        this.storage = storage || new InMemoryAuditStorage();
    }

    /**
     * Set custom storage backend (e.g., database)
     */
    setStorage(storage: AuditLogStorage) {
        this.storage = storage;
    }

    /**
     * Mask email for PII compliance
     */
    private maskEmail(email?: string): string | undefined {
        if (!email) return undefined;
        return email.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => a + b.replace(/./g, '*') + c);
    }

    /**
     * Log an audit event
     */
    async log(event: Omit<AuditEvent, 'id' | 'timestamp'>): Promise<void> {
        if (!this.enabled) return;

        const auditEvent: AuditEvent = {
            id: this.generateId(),
            timestamp: Date.now(),
            ...event,
            userEmail: this.maskEmail(event.userEmail),
        };

        await this.storage.save(auditEvent);

        // Also log to structured logger for immediate visibility
        const { logger } = await import('./logger');
        logger.info(`[AUDIT] ${event.eventType}`, {
            eventId: auditEvent.id,
            userId: event.userId,
            status: event.status,
            resource: event.resource,
        });
    }

    /**
     * Query audit logs
     */
    async query(filters: AuditQueryFilters): Promise<AuditEvent[]> {
        return this.storage.query(filters);
    }

    /**
     * Generate unique event ID
     */
    private generateId(): string {
        return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

export const auditLog = new AuditLogger();

/**
 * Convenience functions for common audit events
 */
export const auditHooks = {
    async logLogin(userId: string, userEmail: string, provider: string, ipAddress?: string) {
        await auditLog.log({
            eventType: 'auth.login',
            userId,
            userEmail,
            ipAddress,
            status: 'success',
            metadata: { provider },
        });
    },

    async logLogout(userId: string, userEmail: string) {
        await auditLog.log({
            eventType: 'auth.logout',
            userId,
            userEmail,
            status: 'success',
        });
    },

    async logFailedLogin(userEmail: string, ipAddress?: string, reason?: string) {
        await auditLog.log({
            eventType: 'auth.failed',
            userEmail,
            ipAddress,
            status: 'failure',
            metadata: { reason },
        });
    },

    async logAccessDenied(userId: string, resource: string, action: string) {
        await auditLog.log({
            eventType: 'access.denied',
            userId,
            resource,
            action,
            status: 'failure',
        });
    },

    async logDataExport(userId: string, resource: string) {
        await auditLog.log({
            eventType: 'data.exported',
            userId,
            resource,
            status: 'success',
        });
    },

    async logSettingsUpdate(userId: string, setting: string, oldValue?: any, newValue?: any) {
        await auditLog.log({
            eventType: 'settings.updated',
            userId,
            resource: setting,
            status: 'success',
            metadata: { oldValue, newValue },
        });
    },
};
