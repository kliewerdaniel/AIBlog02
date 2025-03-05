import PostPage from '@/components/PostPage';
import { Author, PostImage, RelatedPost } from '@/components/PostPage';

// Define the content item type to match PostPage component
type ContentItem = {
  type: 'paragraph' | 'heading' | 'subheading' | 'blockquote' | 'code' | 'image' | 'list';
  content: string;
  items?: string[];
  language?: string;
  ordered?: boolean;
  image?: PostImage;
  level?: 2 | 3;
};

// Sample post data based on ID
const getPostData = (id: string) => {
  const posts = [
    {
      id: '1',
      title: 'The Art of Monochromatic Design',
      date: 'March 5, 2025',
      readingTime: '5 min read',
      excerpt: 'Exploring how limiting your color palette to black and white can create stunning, timeless designs that communicate with clarity and elegance.',
      author: {
        name: 'Alex Morgan',
        avatar: '/images/avatar-1.jpg',
        bio: 'Design Director'
      },
      featuredImage: {
        src: '/images/blog-1.jpg',
        alt: 'Black and white design elements arranged in a minimalist composition',
        caption: 'Monochromatic design elements showcasing the power of contrast and simplicity'
      },
      content: [
        {
          type: 'paragraph',
          content: 'In a world saturated with color, black and white design stands out through its stark contrast and timeless elegance. By removing color from the equation, we\'re forced to rely on other design elements: typography, spacing, hierarchy, and composition.'
        },
        {
          type: 'heading',
          content: 'The Power of Contrast'
        },
        {
          type: 'paragraph',
          content: 'In monochromatic design, contrast becomes your most powerful tool. The interplay between light and dark creates visual interest and guides the viewer\'s eye through the composition. This limitation isn\'t a weakness—it\'s a strength. It creates focus and clarity, allowing the content to speak for itself without the distraction of color.'
        },
        {
          type: 'paragraph',
          content: 'The result is a design that feels both modern and classic, sophisticated yet approachable. It\'s no coincidence that many luxury brands rely heavily on black and white in their visual identity—it communicates elegance and timelessness in a way that color trends simply cannot.'
        },
        {
          type: 'image',
          image: {
            src: '/images/contrast-example.jpg',
            alt: 'Example of contrast in monochromatic design',
            caption: 'Strong contrast creates visual hierarchy and guides the eye through the composition'
          }
        },
        {
          type: 'heading',
          content: 'Typography as the Hero'
        },
        {
          type: 'paragraph',
          content: 'In monochromatic design, typography takes center stage. The interplay between serif and sans-serif fonts creates visual interest and establishes hierarchy. Serif fonts like Playfair Display bring a touch of elegance to headings, while clean sans-serif fonts like Inter ensure readability for body text.'
        },
        {
          type: 'paragraph',
          content: 'The careful selection of font weights, sizes, and spacing creates rhythm and flow, guiding the reader through the content with ease. This attention to typographic detail is what separates good monochromatic design from great monochromatic design.'
        },
        {
          type: 'blockquote',
          content: '"Black and white creates a strange dreamscape that color never can." — Jack Antonoff'
        },
        {
          type: 'heading',
          content: 'Embracing Space'
        },
        {
          type: 'paragraph',
          content: 'White space (or negative space) is a crucial element in monochromatic design. It provides breathing room for the content, creates emphasis, and contributes to the overall aesthetic. The strategic use of space can direct attention, create groupings, and establish relationships between elements.'
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Creates visual breathing room',
            'Emphasizes important elements',
            'Improves readability and comprehension',
            'Contributes to the overall aesthetic',
            'Establishes relationships between elements'
          ]
        },
        {
          type: 'paragraph',
          content: 'In this blog design, you\'ll notice generous margins, comfortable line heights, and thoughtful spacing between elements. This isn\'t just about aesthetics—it\'s about creating a reading experience that feels comfortable and natural.'
        },
        {
          type: 'subheading',
          content: 'The Role of Texture and Pattern'
        },
        {
          type: 'paragraph',
          content: 'Without color to create visual interest, monochromatic design often relies on texture and pattern. Subtle gradients, grain effects, and geometric patterns can add depth and dimension to a design without introducing color.'
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Adding subtle texture with CSS */
.textured-bg {
  background-color: #f5f5f5;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}`
        },
        {
          type: 'subheading',
          content: 'Adding Dimension with Animation'
        },
        {
          type: 'paragraph',
          content: 'While staying true to our monochromatic palette, we\'ve incorporated subtle animations to add dimension and life to the design. These animations enhance the user experience without distracting from the content, creating moments of delight as you navigate through the blog.'
        },
        {
          type: 'paragraph',
          content: 'The animations follow the same principles as our visual design: clean, purposeful, and elegant. They reinforce the content hierarchy and guide the user\'s attention in a natural, intuitive way.'
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Start with subtle fade-in animations for page elements',
            'Use slight scale changes on hover to indicate interactivity',
            'Implement smooth transitions between states',
            'Ensure animations support the content hierarchy',
            'Keep timing consistent throughout the experience'
          ]
        }
      ],
      tags: ['Design', 'Typography', 'Minimalism', 'UX/UI'],
      relatedPosts: [
        {
          id: '2',
          title: 'Typography in Black & White',
          date: 'March 7, 2025',
          excerpt: 'How serif and sans-serif fonts work together to create visual hierarchy and improve readability in monochromatic design systems.',
          image: '/images/blog-2.jpg'
        },
        {
          id: '3',
          title: 'Minimalism: Less is More',
          date: 'March 10, 2025',
          excerpt: 'The philosophy behind minimalist design and why removing color can actually enhance the user experience by focusing attention on what matters.',
          image: '/images/blog-3.jpg'
        },
        {
          id: '4',
          title: 'The Psychology of Black & White',
          date: 'March 15, 2025',
          excerpt: 'Understanding how monochromatic design affects perception, cognition, and emotional response in users.',
          image: '/images/blog-4.jpg'
        }
      ],
      nextPost: {
        id: '2',
        title: 'Typography in Black & White'
      },
      previousPost: null
    },
    {
      id: '2',
      title: 'Typography in Black & White',
      date: 'March 7, 2025',
      readingTime: '4 min read',
      excerpt: 'How serif and sans-serif fonts work together to create visual hierarchy and improve readability in monochromatic design systems.',
      author: {
        name: 'Alex Morgan',
        avatar: '/images/avatar-1.jpg',
        bio: 'Design Director'
      },
      featuredImage: {
        src: '/images/blog-2.jpg',
        alt: 'Typography samples in black and white',
        caption: 'The interplay between serif and sans-serif typography creates visual interest in monochromatic design'
      },
      content: [
        {
          type: 'paragraph',
          content: 'Typography is the backbone of any design, but in monochromatic systems, it becomes the star of the show. Without color to differentiate elements, the choice of typefaces, their sizes, weights, and spacing become crucial design decisions.'
        },
        {
          type: 'heading',
          content: 'Serif vs. Sans-Serif'
        },
        {
          type: 'paragraph',
          content: 'The classic pairing of serif and sans-serif fonts creates natural contrast and hierarchy. Serif fonts, with their decorative strokes, bring character and elegance to headings and pull quotes. Sans-serif fonts, with their clean lines, ensure readability for body text and UI elements.'
        },
        {
          type: 'paragraph',
          content: 'This contrast is particularly effective in monochromatic design, where other forms of visual differentiation are limited. The distinct personalities of these font families create visual interest without relying on color.'
        },
        {
          type: 'heading',
          content: 'Creating Hierarchy'
        },
        {
          type: 'paragraph',
          content: 'In the absence of color, typographic hierarchy becomes even more important. Size, weight, spacing, and style all work together to guide the reader through the content in a logical, intuitive way.'
        },
        {
          type: 'blockquote',
          content: '"Typography is what language looks like." — Ellen Lupton'
        }
      ],
      tags: ['Typography', 'Design', 'Readability', 'UX/UI'],
      relatedPosts: [
        {
          id: '1',
          title: 'The Art of Monochromatic Design',
          date: 'March 5, 2025',
          excerpt: 'Exploring how limiting your color palette to black and white can create stunning, timeless designs that communicate with clarity and elegance.',
          image: '/images/blog-1.jpg'
        },
        {
          id: '3',
          title: 'Minimalism: Less is More',
          date: 'March 10, 2025',
          excerpt: 'The philosophy behind minimalist design and why removing color can actually enhance the user experience by focusing attention on what matters.',
          image: '/images/blog-3.jpg'
        },
        {
          id: '5',
          title: 'Grid Systems in Monochromatic Design',
          date: 'March 18, 2025',
          excerpt: 'How to use grid systems to create structure, balance, and harmony in black and white designs.',
          image: '/images/blog-5.jpg'
        }
      ],
      nextPost: {
        id: '3',
        title: 'Minimalism: Less is More'
      },
      previousPost: {
        id: '1',
        title: 'The Art of Monochromatic Design'
      }
    },
    {
      id: '3',
      title: 'Minimalism: Less is More',
      date: 'March 10, 2025',
      readingTime: '6 min read',
      excerpt: 'The philosophy behind minimalist design and why removing color can actually enhance the user experience by focusing attention on what matters.',
      author: {
        name: 'Jordan Lee',
        avatar: '/images/avatar-2.jpg',
        bio: 'UX Researcher'
      },
      featuredImage: {
        src: '/images/blog-3.jpg',
        alt: 'Minimalist black and white composition',
        caption: 'Minimalism strips away the unnecessary to focus on what truly matters'
      },
      content: [
        {
          type: 'paragraph',
          content: 'Minimalism in design is about more than just aesthetics—it\'s a philosophy that values simplicity, clarity, and purpose. By removing unnecessary elements and focusing on what truly matters, minimalist design creates experiences that are both beautiful and functional.'
        },
        {
          type: 'heading',
          content: 'The Essence of Minimalism'
        },
        {
          type: 'paragraph',
          content: 'At its core, minimalism is about reduction—stripping away the unnecessary until only the essential remains. In design, this means eliminating decorative elements that don\'t serve a purpose and focusing on the content and functionality that users actually need.'
        },
        {
          type: 'blockquote',
          content: '"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry'
        }
      ],
      tags: ['Minimalism', 'Design Philosophy', 'UX/UI', 'Simplicity'],
      relatedPosts: [
        {
          id: '1',
          title: 'The Art of Monochromatic Design',
          date: 'March 5, 2025',
          excerpt: 'Exploring how limiting your color palette to black and white can create stunning, timeless designs that communicate with clarity and elegance.',
          image: '/images/blog-1.jpg'
        },
        {
          id: '2',
          title: 'Typography in Black & White',
          date: 'March 7, 2025',
          excerpt: 'How serif and sans-serif fonts work together to create visual hierarchy and improve readability in monochromatic design systems.',
          image: '/images/blog-2.jpg'
        },
        {
          id: '6',
          title: 'Negative Space as a Design Element',
          date: 'March 22, 2025',
          excerpt: 'How to use negative space intentionally to create balance, emphasis, and visual interest in your designs.',
          image: '/images/blog-6.jpg'
        }
      ],
      nextPost: {
        id: '4',
        title: 'The Psychology of Black & White'
      },
      previousPost: {
        id: '2',
        title: 'Typography in Black & White'
      }
    }
  ];
  
  return posts.find(post => post.id === id) || {
    id,
    title: `Sample Blog Post ${id}`,
    date: `March ${Number(id) + 4}, 2025`,
    readingTime: '4 min read',
    excerpt: 'A sample blog post with monochromatic styling.',
    author: {
      name: 'Sample Author',
      avatar: '/images/avatar-default.jpg',
      bio: 'Content Creator'
    },
    featuredImage: {
      src: '/images/blog-default.jpg',
      alt: 'Default blog image',
      caption: 'Sample image for demonstration purposes'
    },
    content: [
      {
        type: 'paragraph',
        content: 'This is a sample blog post with monochromatic styling. The content is generated dynamically based on the post ID.'
      },
      {
        type: 'heading',
        content: 'Sample Heading'
      },
      {
        type: 'paragraph',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        type: 'blockquote',
        content: '"This is a sample blockquote for demonstration purposes." — Unknown'
      }
    ],
    tags: ['Sample', 'Demo', 'Monochromatic'],
    relatedPosts: [
      {
        id: '1',
        title: 'The Art of Monochromatic Design',
        date: 'March 5, 2025',
        excerpt: 'Exploring how limiting your color palette to black and white can create stunning, timeless designs that communicate with clarity and elegance.',
        image: '/images/blog-1.jpg'
      },
      {
        id: '2',
        title: 'Typography in Black & White',
        date: 'March 7, 2025',
        excerpt: 'How serif and sans-serif fonts work together to create visual hierarchy and improve readability in monochromatic design systems.',
        image: '/images/blog-2.jpg'
      },
      {
        id: '3',
        title: 'Minimalism: Less is More',
        date: 'March 10, 2025',
        excerpt: 'The philosophy behind minimalist design and why removing color can actually enhance the user experience by focusing attention on what matters.',
        image: '/images/blog-3.jpg'
      }
    ],
    nextPost: null,
    previousPost: null
  };
};

// Define the post type to match PostPage component
type Post = {
  id: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  author: Author;
  featuredImage: PostImage;
  content: ContentItem[];
  tags: string[];
  relatedPosts: RelatedPost[];
  nextPost?: {
    id: string;
    title: string;
  };
  previousPost?: {
    id: string;
    title: string;
  };
};

export default function Post({ params }: { params: { id: string } }) {
  // Cast the post data to the correct type
  const post = getPostData(params.id) as Post;
  
  return <PostPage post={post} />;
}
