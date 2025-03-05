import fs from 'fs';
import path from 'path';

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
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Headings
    if (line.startsWith('# ')) {
      // H1 is usually the title, so we skip it
      continue;
    } else if (line.startsWith('## ')) {
      parsedContent.push({
        type: 'heading',
        content: line.substring(3)
      });
    } else if (line.startsWith('### ')) {
      parsedContent.push({
        type: 'subheading',
        content: line.substring(4)
      });
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      parsedContent.push({
        type: 'blockquote',
        content: line.substring(2)
      });
    }
    // Code blocks
    else if (line.startsWith('```')) {
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
      if (!inList || !isOrderedList) {
        // Start a new ordered list
        if (inList) {
          // End the previous list
          parsedContent.push({
            type: 'list',
            content: currentList.join(', '), // Join items for content field
            ordered: isOrderedList,
            items: [...currentList]
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
      if (!inList || isOrderedList) {
        // Start a new unordered list
        if (inList) {
          // End the previous list
          parsedContent.push({
            type: 'list',
            content: currentList.join(', '), // Join items for content field
            ordered: isOrderedList,
            items: [...currentList]
          });
          currentList = [];
        }
        inList = true;
        isOrderedList = false;
      }
      currentList.push(line.replace(/^[\*\-]\s/, ''));
    }
    // Regular paragraphs
    else {
      if (inList) {
        // End the current list
        parsedContent.push({
          type: 'list',
          content: currentList.join(', '), // Join items for content field
          ordered: isOrderedList,
          items: [...currentList]
        });
        currentList = [];
        inList = false;
      }
      
      parsedContent.push({
        type: 'paragraph',
        content: line
      });
    }
  }
  
  // Add any remaining list
  if (inList && currentList.length > 0) {
    parsedContent.push({
      type: 'list',
      content: currentList.join(', '), // Join items for content field
      ordered: isOrderedList,
      items: [...currentList]
    });
  }
  
  return parsedContent;
}

// Function to get all posts
export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  // Filter out template files and non-markdown files
  const postFilenames = filenames.filter(filename => 
    filename.endsWith('.md') && 
    !filename.startsWith('_template')
  );
  
  const allPosts = postFilenames.map((filename, index) => {
    // Get the file path
    const filePath = path.join(postsDirectory, filename);
    
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse the frontmatter
    const { data, content } = parseFrontmatter(fileContent);
    
    // Generate a slug from the filename
    const slug = filename.replace(/\.md$/, '');
    const id = slug.substring(0, 10) === slug.match(/^\d{4}-\d{2}-\d{2}/)![0] 
      ? slug.substring(11) // Remove date prefix if it exists
      : slug;
    
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
      excerpt: data.description || content.substring(0, 150) + '...',
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
