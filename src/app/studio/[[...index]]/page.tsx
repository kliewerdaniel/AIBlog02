'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/lib/sanity.config.js';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
