export type AlertStatus = 'IDLE' | 'OPEN' | 'CANCELLED' | 'RESOLVED';

export type AlertState = {
  id: string | null;
  status: AlertStatus;
  createdAt: number | null;
  location: {
    latitude: number;
    longitude: number;
  } | null;
};

export type AlertRecord = {
  id: string;
  status: Extract<AlertStatus, 'CANCELLED' | 'RESOLVED'>;
  createdAt: number;
  closedAt: number;
  location: {
    latitude: number;
    longitude: number;
  };
};
