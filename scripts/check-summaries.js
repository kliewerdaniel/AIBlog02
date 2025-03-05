const fs = require('fs');
const path = require('path');

// Function to get summaries from summaries.md
function getSummaries() {
  const summariesPath = path.join(process.cwd(), '_posts', 'summaries.md');
  if (!fs.existsSync(summariesPath)) {
    console.error('summaries.md not found');
    return new Map();
  }

  const content = fs.readFileSync(summariesPath, 'utf8');
  const summaryMap = new Map();

  // Extract summaries using regex
  const regex = /## (.+?)\n([\s\S]+?)(?=\n## |$)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const title = match[1].trim();
    const summary = match[2].trim();
    
    // Convert title to ID format
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    summaryMap.set(id, summary);
  }

  return summaryMap;
}

// Function to check if a blog post has a summary
function hasSummary(content) {
  return /\*\*Summary:\*\*/.test(content) || /\*\*.*?:\*\*\s*([\s\S]*?)(?=\n\n)/.test(content);
}

// Function to add a summary to a blog post
function addSummary(filePath, summary) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the post already has a summary
  if (hasSummary(content)) {
    console.log(`${path.basename(filePath)} already has a summary`);
    return;
  }
  
  // Find the position after the frontmatter
  const frontmatterMatch = content.match(/^---\n[\s\S]*?\n---\n/);
  if (!frontmatterMatch) {
    console.error(`${path.basename(filePath)} has no frontmatter`);
    return;
  }
  
  const frontmatterEndPos = frontmatterMatch[0].length;
  
  // Insert the summary after the frontmatter
  const newContent = 
    content.slice(0, frontmatterEndPos) + 
    `\n**Summary:** ${summary}\n\n` + 
    content.slice(frontmatterEndPos);
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, newContent);
  console.log(`Added summary to ${path.basename(filePath)}`);
}

// Main function
function main() {
  const postsDir = path.join(process.cwd(), '_posts');
  const summaryMap = getSummaries();
  
  // Get all markdown files except summaries.md and _template.md
  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md') && file !== 'summaries.md' && !file.startsWith('_template'));
  
  console.log(`Found ${files.length} blog posts`);
  console.log(`Found ${summaryMap.size} summaries`);
  
  let addedCount = 0;
  let alreadyHadCount = 0;
  let missingCount = 0;
  
  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the post already has a summary
    if (hasSummary(content)) {
      console.log(`${file} already has a summary`);
      alreadyHadCount++;
      continue;
    }
    
    // Extract ID from filename
    const slug = file.replace(/\.md$/, '');
    let id;
    
    // Handle filenames with date prefixes
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch && slug.startsWith(dateMatch[0])) {
      id = slug.substring(dateMatch[0].length + 1); // +1 for the hyphen
    } else {
      id = slug;
    }
    
    // If id is empty, use the full slug
    if (!id || id.trim() === '') {
      id = slug;
    }
    
    // Try to find a matching summary
    let summary = summaryMap.get(id);
    
    // If no summary found, try to match by title
    if (!summary) {
      // Extract title from frontmatter
      const titleMatch = content.match(/title:\s*(.+)/);
      if (titleMatch) {
        const title = titleMatch[1].trim().replace(/^["']|["']$/g, '');
        const titleId = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        summary = summaryMap.get(titleId);
      }
    }
    
    if (summary) {
      addSummary(filePath, summary);
      addedCount++;
    } else {
      console.error(`No summary found for ${file}`);
      missingCount++;
    }
  }
  
  console.log(`\nSummary:`);
  console.log(`${alreadyHadCount} posts already had summaries`);
  console.log(`${addedCount} posts had summaries added`);
  console.log(`${missingCount} posts had no matching summary`);
}

main();
