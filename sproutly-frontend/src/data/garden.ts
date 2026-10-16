/**
 * Sample garden data used to render the UI until the backend exposes plants, jobs and
 * terrace layouts. Replace these with API queries (see src/hooks/use-me.ts for the pattern).
 */

export type SunHours = '2-4' | '4-6' | '6+';

export type Plant = {
  id: string;
  name: string;
  nickname?: string;
  ageDays: number;
  photo?: string;
  sunHours: number;
  thirsty?: boolean;
  /** Position on the terrace grid, in feet from the top-left corner. */
  x: number;
  y: number;
};

export type SunZone = { x: number; y: number; w: number; h: number; hours: SunHours };

export type Terrace = {
  widthFt: number;
  depthFt: number;
  /** Which edge has the parapet wall. */
  parapet: 'top' | 'bottom' | 'left' | 'right';
  /** Compass bearing of the map's "up" direction, in degrees (0 = north). */
  northDeg: number;
  zones: SunZone[];
};

export type Job = {
  id: string;
  title: string;
  detail?: string;
  plantId: string;
  timing: 'Morning' | 'Afternoon' | 'Evening';
};

export const terrace: Terrace = {
  widthFt: 12,
  depthFt: 8,
  parapet: 'bottom',
  northDeg: 0,
  zones: [
    { x: 0, y: 3, w: 12, h: 5, hours: '4-6' },
    { x: 6, y: 4, w: 6, h: 4, hours: '6+' },
  ],
};

export const plants: Plant[] = [
  { id: 'p1', name: 'Cherry tomato', nickname: 'Balcony corner', ageDays: 42, sunHours: 6, thirsty: true, x: 10.5, y: 6.5 },
  { id: 'p2', name: 'Chilli', ageDays: 63, sunHours: 6, thirsty: true, x: 8.5, y: 6.5 },
  { id: 'p3', name: 'Basil', ageDays: 28, sunHours: 5, x: 6.5, y: 6.6 },
  { id: 'p4', name: 'Mint', ageDays: 90, sunHours: 3, x: 2.6, y: 1.5 },
  { id: 'p5', name: 'Curry leaf', ageDays: 210, sunHours: 5, thirsty: true, x: 1.5, y: 6.5 },
  { id: 'p6', name: 'Spinach', ageDays: 21, sunHours: 4, x: 3.5, y: 4.5 },
  { id: 'p7', name: 'Hibiscus', ageDays: 180, sunHours: 6, x: 10.5, y: 4.5 },
  { id: 'p8', name: 'Money plant', ageDays: 365, sunHours: 2, x: 4.5, y: 1.5 },
  { id: 'p9', name: 'Rose', ageDays: 120, sunHours: 6, thirsty: true, x: 8.5, y: 4.6 },
  { id: 'p10', name: 'Coriander', ageDays: 18, sunHours: 4, x: 3.5, y: 6.6 },
  { id: 'p11', name: 'Aloe vera', ageDays: 300, sunHours: 6, x: 11, y: 1.5 },
  { id: 'p12', name: 'Lemongrass', ageDays: 75, sunHours: 5, x: 6.5, y: 4.6 },
  { id: 'p13', name: 'Marigold', ageDays: 35, sunHours: 6, x: 8.5, y: 1.6 },
  { id: 'p14', name: 'Tulsi', ageDays: 50, sunHours: 5, x: 6.5, y: 1.6 },
];

export const todaysJobs: Job[] = [
  { id: 'j1', title: 'Feed the tomatoes', detail: 'Liquid seaweed', plantId: 'p1', timing: 'Morning' },
  { id: 'j2', title: 'Pinch basil tips', plantId: 'p3', timing: 'Morning' },
  { id: 'j3', title: 'Harvest 6 chillies', plantId: 'p2', timing: 'Evening' },
];

export const weather = { tempC: 32, summary: 'clear', advice: 'Water before 10 am.' };

export const tip = 'Monsoon is 3 weeks away. Raise pots off the floor to stop waterlogging.';

export const plantById = (id: string) => plants.find((p) => p.id === id);
export const thirstyPlants = () => plants.filter((p) => p.thirsty);

export const sunLabel = (hours: number) =>
  hours >= 6 ? `${hours}h sun, good spot` : hours >= 4 ? `${hours}h sun, fair spot` : `${hours}h sun, shady spot`;
