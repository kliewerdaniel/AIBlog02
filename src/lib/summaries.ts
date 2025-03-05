import fs from 'fs';
import path from 'path';

interface PostSummary {
  id: string;
  summary: string;
  title: string;
}

/**
 * Parses the summaries.md file and returns a map of post IDs to their summaries
 */
export function getSummaries(): Map<string, string> {
  const summariesPath = path.join(process.cwd(), '_posts/summaries.md');
  
  // Check if the file exists
  if (!fs.existsSync(summariesPath)) {
    console.warn('Summaries file not found at', summariesPath);
    return new Map();
  }
  
  // Read the file content
  const content = fs.readFileSync(summariesPath, 'utf8');
  
  // Parse the content to extract summaries
  const summaryMap = new Map<string, string>();
  const summaries: PostSummary[] = [];
  
  // Split by ## to get each section
  const sections = content.split('## ').filter(Boolean);
  
  for (const section of sections) {
    // Skip the title section if it exists
    if (section.startsWith('Blog Post Summaries')) continue;
    
    // Extract the title and summary
    const lines = section.split('\n');
    const title = lines[0].trim();
    const summary = lines.slice(1).join('\n').trim();
    
    // Convert title to ID format (kebab-case)
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Store the summary with its title and ID
    summaries.push({
      id,
      title,
      summary
    });
    
    // Add the summary to the map with the ID as the key
    summaryMap.set(id, summary);
  }
  
  // Now add all possible variations of IDs to the map
  for (const summary of summaries) {
    // Add the original ID
    summaryMap.set(summary.id, summary.summary);
    
    // Add date-prefixed IDs
    const dateFormattedIds = [
      `2024-10-04-${summary.id}`,
      `2024-10-09-${summary.id}`,
      `2024-10-12-${summary.id}`,
      `2024-10-18-${summary.id}`,
      `2024-10-22-${summary.id}`,
      `2024-10-24-${summary.id}`,
      `2024-10-30-${summary.id}`,
      `2024-11-04-${summary.id}`,
      `2024-11-21-${summary.id}`,
      `2024-11-22-${summary.id}`,
      `2024-11-23-${summary.id}`,
      `2024-11-27-${summary.id}`,
      `2024-11-28-${summary.id}`,
      `2024-11-29-${summary.id}`,
      `2024-12-01-${summary.id}`,
      `2024-12-02-${summary.id}`,
      `2024-12-05-${summary.id}`,
      `2024-12-09-${summary.id}`,
      `2024-12-10-${summary.id}`,
      `2024-12-11-${summary.id}`,
      `2024-12-14-${summary.id}`,
      `2024-12-19-${summary.id}`,
      `2024-12-30-${summary.id}`,
      `2025-01-16-${summary.id}`,
      `2025-01-22-${summary.id}`,
      `2025-01-23-${summary.id}`,
      `2025-02-03-${summary.id}`,
      `2025-02-05-${summary.id}`,
      `2025-02-14-${summary.id}`,
      `2025-02-23-${summary.id}`,
      `2025-02-25-${summary.id}`,
      `2025-02-26-${summary.id}`,
      `2025-03-03-${summary.id}`
    ];
    
    // Add all possible date-prefixed IDs to the map
    for (const dateId of dateFormattedIds) {
      summaryMap.set(dateId, summary.summary);
    }
    
    // Add variations of the title
    // For example, "How to Build a Persona-Based Blog Post Generator Using Large Language Models"
    // might be stored as "how-to-build-a-persona-based-blog-post-generator-with-large-language-models"
    const titleVariations = [
      summary.title
        .toLowerCase()
        .replace(/using/g, 'with')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, ''),
      summary.title
        .toLowerCase()
        .replace(/with/g, 'using')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    ];
    
    // Add all title variations to the map
    for (const titleId of titleVariations) {
      summaryMap.set(titleId, summary.summary);
      
      // Also add date-prefixed variations
      for (const dateId of dateFormattedIds) {
        const dateTitle = dateId.split('-').slice(0, 3).join('-') + '-' + titleId;
        summaryMap.set(dateTitle, summary.summary);
      }
    }
  }
  
  return summaryMap;
}
