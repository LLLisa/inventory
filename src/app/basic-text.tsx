import ReadingView from '@/components/ReadingView';
import { basicText } from '@/data/readings';

export default function BasicTextScreen() {
  return (
    <ReadingView
      reading={basicText}
      description="Read Step Ten from the Basic Text of Narcotics Anonymous, Sixth Edition — 'We continued to take personal inventory and when we were wrong promptly admitted it.'"
    />
  );
}
