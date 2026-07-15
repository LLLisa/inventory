import { Redirect } from 'expo-router';

/** Legacy URL from the previous site — redirect to the descriptive slug. */
export default function LegacyBasicText() {
  return <Redirect href="/basic-text" />;
}
