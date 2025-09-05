import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Technical Discovery',
  description: 'This page has moved. You’ll be redirected to Solutions & Discovery.'
};

export default function DiscoveryPage() {
  redirect('/solutions#technical-discovery');
}
