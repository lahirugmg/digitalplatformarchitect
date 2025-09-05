import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Architecture Explorer',
  description: 'This page has moved. You will be redirected to Patterns.',
};

export default function ExplorePage() {
  redirect('/patterns');
}

