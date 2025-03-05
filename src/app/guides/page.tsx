'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import { FadeInOnScroll, RevealOnScroll } from '@/components/ScrollAnimations';
import { motion } from 'framer-motion';

interface ProjectLink {
  type: 'Blog Post' | 'GitHub Repository' | 'Chrome Web Store';
  url: string;
}

interface Project {
  title: string;
  description: string;
  links: ProjectLink[];
}

export default function GuidesPage() {
  const projects: Project[] = [
    {
      title: 'AI-Powered Filename Generator Chrome Extension',
      description: 'This Chrome extension leverages AI to suggest contextually relevant filenames during file downloads or saves. It analyzes the content and proposes descriptive names, enhancing file organization and retrieval efficiency.',
      links: [
        { type: 'Blog Post', url: '/posts/2025-02-25-Building-an-AI-Powered-Filename-generator-chrome-extension' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/chrome-ai-filename-generator' },
        { type: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/ai-filename-generator/eocbkbnabbmclgneeakdbglicbhbimbj' }
      ]
    },
    {
      title: 'Tech Company Orchestrator',
      description: 'A simulation tool that models the workflow of a tech company by orchestrating various agents to collaboratively process prompts. It generates comprehensive outputs like code, design specifications, and deployment scripts using OpenAI models and NetworkX for directed graph interactions.',
      links: [
        { type: 'Blog Post', url: '/posts/2024-11-29-Tech-Company-Orchestrator' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/tech-company-orchestrator' }
      ]
    },
    {
      title: 'PersonaGen',
      description: 'A project focused on enhancing persona management by refactoring a Django-based application. It transitions from storing persona characteristics in a single JSON field to individually modifiable fields, improving flexibility and scalability.',
      links: [
        { type: 'Blog Post', url: '/posts/2024-12-05-PersonaGen' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/personagen' }
      ]
    },
    {
      title: 'GhostWriter',
      description: 'An open-source AI-powered writing assistant designed to simplify and enhance the writing process across various domains. It offers features like content generation, editing, proofreading, SEO optimization, and collaboration tools.',
      links: [
        { type: 'Blog Post', url: '/posts/2024-10-24-Ghost-Writer' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/ghostwriter' }
      ]
    },
    {
      title: 'Multimodal Story Generation System',
      description: 'A system that transforms visual inputs into structured narratives by combining computer vision and large language models. It generates dynamic, multi-chapter stories from images, featuring components like image analysis, adaptive story generation, and an interactive story graph interface.',
      links: [
        { type: 'Blog Post', url: '/posts/2025-01-23-Building-a-Multimodal-Story-Generation-system' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/ITB02' }
      ]
    },
    {
      title: 'PydanticAI-RAG',
      description: "A project that integrates persona-driven data modeling with Retrieval-Augmented Generation (RAG) using Pydantic AI's Agent and Tools APIs. It combines concepts from the PersonaGen07 repository and Pydantic AI to create a system that retrieves context-relevant information and adapts responses based on predefined persona traits.",
      links: [
        { type: 'Blog Post', url: '/posts/2024-12-09-Pydantic-RAG' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/PersonaGen07' }
      ]
    },
    {
      title: 'RedDiss',
      description: 'An AI-powered diss track generator that transforms Reddit content into personalized diss tracks. Developed for the Loco Local LocalLLaMa Hackathon 1.0, RedDiss combines Reddit data extraction with AI technologies to produce unique audio tracks.',
      links: [
        { type: 'Blog Post', url: '/posts/2025-02-14-RedDiss' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/reddiss' }
      ]
    },
    {
      title: 'Reddit Content Analysis and Blog Generator',
      description: "A tool that analyzes a user's Reddit activity to extract meaningful insights and generate structured blog posts. It processes Reddit engagement—posts, comments, and upvoted content—using AI-driven agents to detect themes, analyze sentiment, and produce cohesive narratives.",
      links: [
        { type: 'Blog Post', url: '/posts/2025-02-03-Scrape-Reddit-Analysis-Blog' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/RedToBlog02' }
      ]
    },
    {
      title: 'Django-React-Ollama Integration',
      description: 'A full-stack application that integrates Django for the backend and React for the frontend. The application allows users to upload writing samples, analyzes them using an AI language model, and generates blog posts in the style of the uploaded samples.',
      links: [
        { type: 'Blog Post', url: '/posts/2024-10-22-integrating-django-react-ollama-with-XAi-API' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/Django-React-Ollama-Integration' }
      ]
    },
    {
      title: 'Image to Book Generator',
      description: 'This project transforms static images into coherent, long-form narratives using modern AI tools. The system combines multimodal perception, recursive context management, and human-in-the-loop editing to create stories that maintain stylistic consistency while evolving organically from a visual seed.',
      links: [
        { type: 'Blog Post', url: '/posts/2025-01-22-Image-to-Book' },
        { type: 'GitHub Repository', url: 'https://github.com/kliewerdaniel/ITB03' }
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-16 pb-16 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeInOnScroll className="space-y-6">
              <RevealOnScroll>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                  AI Project Guides
                </h1>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
                  Explore a collection of AI projects with detailed guides, code repositories, and implementation resources.
                </p>
              </RevealOnScroll>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 lg:px-8">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 h-full flex flex-col"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.links.map((link, linkIndex) => {
                        const isExternal = !link.url.startsWith('/');
                        const linkProps = isExternal ? { 
                          href: link.url, 
                          target: "_blank", 
                          rel: "noopener noreferrer" 
                        } : { href: link.url };
                        
                        return (
                          <Link 
                            key={linkIndex} 
                            {...linkProps}
                            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                              link.type === 'Blog Post' 
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800' 
                                : link.type === 'GitHub Repository'
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                            }`}
                          >
                            {link.type === 'Blog Post' && (
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            )}
                            {link.type === 'GitHub Repository' && (
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            )}
                            {link.type === 'Chrome Web Store' && (
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm0 3a9 9 0 110 18 9 9 0 010-18zm0 1.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 1.5a6 6 0 110 12 6 6 0 010-12zm0 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                              </svg>
                            )}
                            {link.type}
                            {isExternal && (
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
