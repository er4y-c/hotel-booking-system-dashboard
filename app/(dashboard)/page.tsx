import React from 'react';
import Breadcrumbs from '@/components/breadcrumbs';

export default function Home() {
  return (
    <div>
      <Breadcrumbs items={[{ text: 'Dashboard', href: '/' }]} />
      <h1>Welcome !</h1>
    </div>
  );
}
