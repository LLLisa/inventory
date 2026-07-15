import { Redirect } from 'expo-router';

/** Legacy URL from the previous site — redirect to the descriptive slug. */
export default function LegacyItWorks() {
  return <Redirect href="/it-works" />;
}
