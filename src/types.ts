export interface WorkItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  link: string;
  description: string;
  tileIndex: number;
  imageFallback?: string;
  badge?: string;
}

export interface FactItem {
  id: number;
  label: string;
  value: string;
  iconName: string;
}

export interface CareerPlanStep {
  period: string;
  title: string;
  desc: string;
}
