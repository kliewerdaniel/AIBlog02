import fs from 'fs';
import path from 'path';
import { getSummaries } from './summaries';

// Define the content item type
export type ContentItem = 
  | {
      type: 'paragraph' | 'heading' | 'subheading' | 'blockquote' | 'code';
      content: string;
      language?: string;
      level?: 2 | 3;
    }
  | {
      type: 'list';
      content: string; // This will be a joined string of all items for compatibility
      items: string[];
      ordered: boolean;
    }
  | {
      type: 'image';
      content: string; // Alt text or description
      image: {
        src: string;
        alt: string;
        caption?: string;
      };
    };

// Define the post type based on the blog's requirements
export interface Post {
  id: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  featuredImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  content: ContentItem[];
  tags: string[];
  relatedPosts: {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image?: string;
  }[];
  nextPost?: {
    id: string;
    title: string;
  };
  previousPost?: {
    id: string;
    title: string;
  };
}

// Simple frontmatter parser
function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const mainContent = match[2];
  
  // Parse the frontmatter
  const data: Record<string, any> = {};
  const lines = frontmatter.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = value.slice(1, -1).split(',').map(item => item.trim());
        } catch (e) {
          data[key] = value;
        }
      } else {
        data[key] = value;
      }
    }
  }
  
  return { data, content: mainContent };
}

// Function to estimate reading time
function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

// Function to convert markdown content to structured content
function parseMarkdownContent(content: string): ContentItem[] {
  const lines = content.split('\n');
  const parsedContent: ContentItem[] = [];
  
  let currentList: string[] = [];
  let isOrderedList = false;
  let inList = false;
  let currentParagraph = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Handle empty lines - they can separate paragraphs
    if (!line) {
      if (currentParagraph) {
        parsedContent.push({
          type: 'paragraph',
          content: processInlineFormatting(currentParagraph)
        });
        currentParagraph = '';
      }
      continue;
    }
    
    // Headings
    if (line.startsWith('# ')) {
      // H1 is usually the title, so we skip it
      continue;
    } else if (line.startsWith('## ')) {
      // If we have a paragraph in progress, add it first
      if (currentParagraph) {
        parsedContent.push({
          type: 'paragraph',
          content: processInlineFormatting(currentParagraph)
        });
        currentParagraph = '';
      }
      
      parsedContent.push({
        type: 'heading',
        content: processInlineFormatting(line.substring(3))
      });
    } else if (line.startsWith('### ')) {
      // If we have a paragraph in progress, add it first
      if (currentParagraph) {
        parsedContent.push({
          type: 'paragraph',
          content: processInlineFormatting(currentParagraph)
        });
        currentParagraph = '';
      }
      
      parsedContent.push({
        type: 'subheading',
        content: processInlineFormatting(line.substring(4))
      });
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      // If we have a paragraph in progress, add it first
      if (currentParagraph) {
        parsedContent.push({
          type: 'paragraph',
          content: processInlineFormatting(currentParagraph)
        });
        currentParagraph = '';
      }
      
      parsedContent.push({
        type: 'blockquote',
        content: processInlineFormatting(line.substring(2))
      });
    }
    // Code blocks
    else if (line.startsWith('```')) {
      // If we have a paragraph in progress, add it first
      if (currentParagraph) {
        parsedContent.push({
          type: 'paragraph',
          content: processInlineFormatting(currentParagraph)
        });
        currentParagraph = '';
      }
      
      const language = line.substring(3).trim();
      let codeContent = '';
      i++;
      
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeContent += lines[i] + '\n';
        i++;
      }
      
      parsedContent.push({
        type: 'code',
        content: codeContent.trim(),
        language
      });
    }
    // Ordered lists
    else if (/^\d+\.\s/.test(line)) {
      // If we have a paragraph in progress, add it first
      if (currentParagraph) {
        parsedContent.push({
          type: 'paragraph',
          content: processInlineFormatting(currentParagraph)
        });
        currentParagraph = '';
      }
      
      if (!inList || !isOrderedList) {
        // Start a new ordered list
        if (inList) {
          // End the previous list
          parsedContent.push({
            type: 'list',
            content: currentList.join(', '), // Join items for content field
            ordered: isOrderedList,
            items: currentList.map(item => processInlineFormatting(item))
          });
          currentList = [];
        }
        inList = true;
        isOrderedList = true;
      }
      currentList.push(line.replace(/^\d+\.\s/, ''));
    }
    // Unordered lists
    else if (/^[\*\-]\s/.test(line)) {
      // If we have a paragraph in progress, add it first
      if (currentParagraph) {
        parsedContent.push({
          type: 'paragraph',
          content: processInlineFormatting(currentParagraph)
        });
        currentParagraph = '';
      }
      
      if (!inList || isOrderedList) {
        // Start a new unordered list
        if (inList) {
          // End the previous list
          parsedContent.push({
            type: 'list',
            content: currentList.join(', '), // Join items for content field
            ordered: isOrderedList,
            items: currentList.map(item => processInlineFormatting(item))
          });
          currentList = [];
        }
        inList = true;
        isOrderedList = false;
      }
      currentList.push(line.replace(/^[\*\-]\s/, ''));
    }
    // Regular paragraphs - accumulate lines for a single paragraph
    else {
      if (inList) {
        // End the current list
        parsedContent.push({
          type: 'list',
          content: currentList.join(', '), // Join items for content field
          ordered: isOrderedList,
          items: currentList.map(item => processInlineFormatting(item))
        });
        currentList = [];
        inList = false;
      }
      
      // If we already have content in the paragraph, add a space
      if (currentParagraph) {
        currentParagraph += ' ' + line;
      } else {
        currentParagraph = line;
      }
    }
  }
  
  // Add any remaining list
  if (inList && currentList.length > 0) {
    parsedContent.push({
      type: 'list',
      content: currentList.join(', '), // Join items for content field
      ordered: isOrderedList,
      items: currentList.map(item => processInlineFormatting(item))
    });
  }
  
  // Add any remaining paragraph
  if (currentParagraph) {
    parsedContent.push({
      type: 'paragraph',
      content: processInlineFormatting(currentParagraph)
    });
  }
  
  return parsedContent;
}

// Function to process inline markdown formatting
function processInlineFormatting(text: string): string {
  // Bold: **text** or __text__
  text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
  
  // Italic: *text* or _text_
  text = text.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');
  
  // Strikethrough: ~~text~~
  text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');
  
  // Inline code: `code`
  text = text.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Links: [text](url)
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  return text;
}

// Function to get all posts
export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  // Filter out template files and non-markdown files
  const postFilenames = filenames.filter(filename => 
    filename.endsWith('.md') && 
    !filename.startsWith('_template') &&
    filename !== 'summaries.md'
  );
  
  // Log the number of posts found for debugging
  console.log(`Found ${postFilenames.length} posts out of ${filenames.length} files in _posts directory`);
  
  // Get summaries from summaries.md
  const summaryMap = getSummaries();
  
  const allPosts = postFilenames.map((filename, index) => {
    try {
      // Get the file path
      const filePath = path.join(postsDirectory, filename);
      
      // Read the file content
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse the frontmatter
      const { data, content } = parseFrontmatter(fileContent);
      
      // Generate a slug from the filename
      const slug = filename.replace(/\.md$/, '');
      let id;
      
      // Handle filenames with date prefixes more safely
      const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
      if (dateMatch && slug.startsWith(dateMatch[0])) {
        id = slug.substring(dateMatch[0].length + 1); // +1 for the hyphen
      } else {
        id = slug;
      }
      
      // If id is empty (which could happen if the filename is just a date), use the full slug
      if (!id || id.trim() === '') {
        id = slug;
      }
    
      // Parse the content
      const parsedContent = parseMarkdownContent(content);
      
      // Extract categories and tags
      const categories = data.categories || [];
      const tags = data.tags || [];
      
      // Flatten categories and tags into a single array
      const allTags = Array.isArray(categories) 
        ? [...categories, ...(Array.isArray(tags) ? tags : [])]
        : Array.isArray(tags) 
          ? tags 
          : [];
      
      // Debug logging
      console.log(`Post ID: ${id}`);
      console.log(`Has summary: ${summaryMap.has(id)}`);
      
      // Try to find a matching summary
      let summary = summaryMap.get(id);
      
      // If no summary found, try to match by title
      if (!summary && data.title) {
        const titleId = data.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        console.log(`Trying title ID: ${titleId}`);
        console.log(`Has title summary: ${summaryMap.has(titleId)}`);
        
        summary = summaryMap.get(titleId);
      }
      
      // Create the post object
      const post: Post = {
        id,
        title: data.title || 'Untitled Post',
        date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : new Date().toLocaleDateString(),
        readingTime: estimateReadingTime(content),
        excerpt: summary || data.description || content.substring(0, 150) + '...',
        author: {
          name: data.author || 'Anonymous',
          avatar: '/images/avatar-default.jpg',
          bio: data.authorBio || 'Author'
        },
        featuredImage: {
          src: data.image || '/images/blog-1.jpg',
          alt: data.title || 'Blog post image',
          caption: data.imageCaption
        },
        content: parsedContent,
        tags: allTags,
        relatedPosts: []
      };
      
      return post;
    } catch (error) {
      console.error(`Error processing post ${filename}:`, error);
      // Return a minimal post object for files that can't be processed
      return {
        id: filename.replace(/\.md$/, ''),
        title: `Error loading: ${filename}`,
        date: new Date().toLocaleDateString(),
        readingTime: '1 min',
        excerpt: 'This post could not be loaded properly.',
        author: {
          name: 'System',
          avatar: '/images/avatar-default.jpg',
          bio: 'System'
        },
        featuredImage: {
          src: '/images/blog-1.jpg',
          alt: 'Error',
        },
        content: [{
          type: 'paragraph' as const,
          content: 'This post could not be loaded properly.'
        }],
        tags: ['error'],
        relatedPosts: []
      } as Post;
    }
  });
  
  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Add next/previous post links
  const postsWithLinks = sortedPosts.map((post, index) => {
    const nextPost = index > 0 ? {
      id: sortedPosts[index - 1].id,
      title: sortedPosts[index - 1].title
    } : undefined;
    
    const previousPost = index < sortedPosts.length - 1 ? {
      id: sortedPosts[index + 1].id,
      title: sortedPosts[index + 1].title
    } : undefined;
    
    // Add related posts (3 most recent excluding current post)
    const relatedPosts = sortedPosts
      .filter(p => p.id !== post.id)
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        image: p.featuredImage.src
      }));
    
    return {
      ...post,
      nextPost,
      previousPost,
      relatedPosts
    };
  });
  
  return postsWithLinks;
}

// Function to get a single post by ID
export function getPostById(id: string): Post | null {
  const posts = getAllPosts();
  return posts.find(post => post.id === id) || null;
}

// Function to get all post IDs
export function getAllPostIds(): string[] {
  const posts = getAllPosts();
  return posts.map(post => post.id);
}
