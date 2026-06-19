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
  updates?: Source[];
  lastUpdated: string; // ISO date
  createdAt: string;
}

export interface Source {
  title: string;
  url: string;
  archiveUrl?: string; // Fallback web archive link (Wayback Machine / archive.today)
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

export interface Submission {
  id: string;
  promiseId: string | null;
  evidenceUrl: string;
  details: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: {
    name: string;
    email: string;
    image: string | null;
  };
  createdAt: string;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
}

