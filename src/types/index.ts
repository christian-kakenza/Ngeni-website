// ============================================================
// NGENI — Types globaux
// ============================================================

export type Locale = "fr" | "en";

export type Role = "ADMIN" | "CLIENT" | "GUEST";

export type ProjectStatus = "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

// ============================================================
// Types de navigation
// ============================================================

export type NavItem = {
  labelKey: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  adminOnly?: boolean;
};

// ============================================================
// Types métier
// ============================================================

export type ServiceKey =
  | "rpa"
  | "agents"
  | "saas"
  | "web"
  | "medical"
  | "agriculture"
  | "education"
  | "energy"
  | "construction"
  | "consulting";

export type Service = {
  key: ServiceKey;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string;
  tag: string;
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  clientId: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: number | null;
  createdAt: Date;
  updatedAt: Date;
  tasks?: Task[];
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  service: string | null;
  source: string;
  createdAt: Date;
};

// ============================================================
// Types API / tRPC
// ============================================================

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
