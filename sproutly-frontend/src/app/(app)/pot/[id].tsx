import { useLocalSearchParams } from 'expo-router';

import { PotSheet } from '@/screens/garden/pot-sheet';

export default function PotSheetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PotSheet id={id} />;
}
