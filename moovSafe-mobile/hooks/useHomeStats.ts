import { useMemo } from 'react';

interface Vehicle {
  id: string;
  status?: string;
  [key: string]: any;
}

export function useHomeStats(vehicles?: Vehicle[]) {
  return useMemo(() => {
    if (!vehicles?.length) return { total: 0, active: 0, maintenance: 0 };

    return {
      total: vehicles.length,
      active: vehicles.filter((v: any) => v.status === 'active').length || vehicles.length,
      maintenance: vehicles.filter((v: any) => v.status === 'maintenance').length || 0,
    };
  }, [vehicles]);
}
