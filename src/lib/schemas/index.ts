import { type SchemaTypeDefinition } from 'sanity';

import post from './post';
import author from './author';
import category from './category';
import siteSettings from './siteSettings';
import blockContent from './blockContent';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Document types
  post,
  author,
  category,
  siteSettings,
  // Object types
  blockContent,
];
