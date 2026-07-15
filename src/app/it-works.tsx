import ReadingView from '@/components/ReadingView';
import { itWorks } from '@/data/readings';

export default function ItWorksScreen() {
  return (
    <ReadingView
      reading={itWorks}
      description="Read Step Ten from It Works: How and Why — The Twelve Steps and Twelve Traditions of Narcotics Anonymous. Recovery in NA is about learning how to live."
    />
  );
}
