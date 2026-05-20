export type Status = 'fulfilled' | 'in-progress' | 'evaded' | 'pending';
export type SourceTier = 1 | 2 | 3;

export interface Promise {
  id: string;
  slug: string;
  title: string;
  titleMl: string;
  description: string;
  trackingNote?: string | null;
  manifestoQuote: string;
  sector: Sector;
  status: Status;
  icon: string;
  sources: Source[];
  lastUpdated: string; // ISO date
  createdAt: string;
}

export interface Source {
  title: string;
  url: string;
  publication: string;
  date: string;
  tier: SourceTier;
  summary: string;
}

export interface Sector {
  id: string;
  name: string;
  nameMl: string;
  icon: string;
  color: string;
}
