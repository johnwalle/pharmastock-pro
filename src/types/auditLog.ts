export type ActionType = 'Add' | 'Edit' | 'Delete' | 'View';

export interface AuditLogEntry {
  id: number;
  user: string;
  avatar: string;
  action: ActionType;
  timestamp: string;
  details: string;
}
