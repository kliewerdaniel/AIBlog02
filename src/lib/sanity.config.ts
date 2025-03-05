import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { dashboardTool } from '@sanity/dashboard';
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify';
import { media } from 'sanity-plugin-media';
import ContentMetricsWidget from './dashboard/ContentMetrics';

// Define the actions that should be available for singleton documents
const singletonActions = ['publish', 'discardChanges', 'restore'];

// Define the singleton document types
const singletonTypes = ['siteSettings'];

export default defineConfig({
  name: 'default',
  title: 'Black & White Blog',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton items (like site settings)
            ...singletonTypes.map((type) =>
              S.listItem()
                .title(type === 'siteSettings' ? 'Site Settings' : type)
                .id(type)
                .child(
                  S.document()
                    .schemaType(type)
                    .documentId(type)
                )
            ),
            // Regular document types
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Authors')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(),
    dashboardTool({
      widgets: [
        ContentMetricsWidget(),
        netlifyWidget({
          title: 'Netlify Deployments',
          sites: [
            {
              title: 'Blog Website',
              apiId: process.env.NETLIFY_SITE_ID || 'your-netlify-site-id',
              buildHookId: process.env.NETLIFY_WEBHOOK_ID || 'your-netlify-webhook-id',
              name: 'Black & White Blog',
            },
          ],
        }),
      ],
    }),
    media(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.includes(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.includes(action))
        : input,
  },

  // Custom theme with black and white aesthetic
  studio: {
    components: {
      // Customize the studio to match the blog's black and white aesthetic
    }
  },
});
