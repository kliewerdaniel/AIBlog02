import { Card, Flex, Stack, Text, Heading } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { useClient } from 'sanity';

interface ContentCount {
  type: string;
  title: string;
  count: number;
  icon: string;
}

export function ContentMetrics() {
  const [counts, setCounts] = useState<ContentCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const client = useClient({ apiVersion: '2023-05-03' });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const result = await client.fetch(`{
          "posts": count(*[_type == "post"]),
          "authors": count(*[_type == "author"]),
          "categories": count(*[_type == "category"]),
          "drafts": count(*[_id in path('drafts.**')])
        }`);

        const countsArray: ContentCount[] = [
          { type: 'post', title: 'Blog Posts', count: result.posts, icon: '📝' },
          { type: 'author', title: 'Authors', count: result.authors, icon: '👤' },
          { type: 'category', title: 'Categories', count: result.categories, icon: '🏷️' },
          { type: 'draft', title: 'Draft Content', count: result.drafts, icon: '📋' },
        ];

        setCounts(countsArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching content metrics:', err);
        setError('Failed to load content metrics');
        setLoading(false);
      }
    }

    fetchCounts();
  }, [client]);

  if (loading) {
    return (
      <Card padding={4} radius={2} shadow={1}>
        <Text>Loading content metrics...</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card padding={4} radius={2} shadow={1} tone="critical">
        <Text>{error}</Text>
      </Card>
    );
  }

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={1}>Content Metrics</Heading>
        <Flex wrap="wrap" gap={3}>
          {counts.map((item) => (
            <Card 
              key={item.type} 
              padding={3} 
              radius={2} 
              shadow={1} 
              style={{ flex: '1 0 200px' }}
            >
              <Stack space={3}>
                <Flex align="center" gap={2}>
                  <Text size={4}>{item.icon}</Text>
                  <Heading size={2}>{item.title}</Heading>
                </Flex>
                <Heading size={4} style={{ textAlign: 'center' }}>
                  {item.count}
                </Heading>
              </Stack>
            </Card>
          ))}
        </Flex>
      </Stack>
    </Card>
  );
}

export default function ContentMetricsWidget() {
  return {
    name: 'content-metrics',
    component: ContentMetrics,
  };
}
