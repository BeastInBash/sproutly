/** Sample Grow guide content until it is served by the backend. */

export type SowCard = { id: string; name: string; readyInDays: number; sun: 'full' | 'part' | 'shade' };
export type Guide = { id: string; title: string; readMinutes: number };

export const sowThisMonth: SowCard[] = [
  { id: 's1', name: 'Spinach', readyInDays: 40, sun: 'part' },
  { id: 's2', name: 'Coriander', readyInDays: 35, sun: 'part' },
  { id: 's3', name: 'Carrot', readyInDays: 75, sun: 'full' },
  { id: 's4', name: 'Marigold', readyInDays: 50, sun: 'full' },
];

export const guideFilters = ['Vegetables', 'Herbs', 'Flowers', 'Easy for beginners', 'Grows in shade'];

export const guides: Guide[] = [
  { id: 'g1', title: 'Grow chillies in a 12-inch pot', readMinutes: 6 },
  { id: 'g2', title: 'Make compost in a bucket', readMinutes: 8 },
  { id: 'g3', title: 'Self-watering bottles for holidays', readMinutes: 4 },
];

export type DoctorCheck = { id: string; plantId: string; result: string; urgent: boolean; when: string };

export const recentChecks: DoctorCheck[] = [
  { id: 'c1', plantId: 'p9', result: 'Aphids (likely)', urgent: true, when: '2 days ago' },
  { id: 'c2', plantId: 'p3', result: 'Healthy', urgent: false, when: 'Last week' },
  { id: 'c3', plantId: 'p1', result: 'Early blight', urgent: true, when: '3 weeks ago' },
];
