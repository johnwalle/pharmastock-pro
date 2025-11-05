// types/auditLog.ts

export interface AuditLogEntry {
  _id: string;
  userId: string;
  userName: string;
  action: 'Add' | 'Edit' | 'Delete' | 'Sold';
  details: string;
  timestamp: string;
}
