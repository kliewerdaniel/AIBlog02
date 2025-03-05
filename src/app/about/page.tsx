'use client';

import React from 'react';
import Image from 'next/image';
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h1>
        
        <StaggerContainer>
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Professional Overview</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I'm a multifaceted professional with over 15 years of experience spanning web development, data annotation, and digital/traditional art. 
                My expertise includes enhancing AI model accuracy through meticulous data labeling and automating workflows with Python. 
                I combine technical proficiency with creative vision to deliver innovative solutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Skills</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Web Development</li>
                    <li>Data Annotation</li>
                    <li>Python</li>
                    <li>JavaScript</li>
                    <li>Adobe Creative Suite</li>
                    <li>Google Analytics</li>
                  </ul>
                </div>
              </div>
            </section>
          </StaggerItem>
      
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Professional Experience</h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Data Annotation Specialist | Centific</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Remote | Nov 2020 – Present</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Lead AI localization projects with 99.8% annotation accuracy</li>
                    <li>Curate diverse datasets improving model training efficiency</li>
                    <li>Develop quality control protocols adopted company-wide</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Research Data Annotator | Amazon Mechanical Turk & Connect Cloud Research</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Remote | Jan 2010 – Nov 2020</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Processed 50,000+ data points with 98% consistency rating</li>
                    <li>Implemented annotation taxonomy reducing processing time</li>
                    <li>Mentored team of annotators in quality assurance practices</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Animation & Web Designer | DanielKliewer.com</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Jan 2010 – Present</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Developed responsive websites with 100% client satisfaction</li>
                    <li>Created experimental film art featured at Austin Film Society (2012)</li>
                  </ul>
                </div>
              </div>
            </section>
          </StaggerItem>
      
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Education</h2>
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">University of Mary Hardin-Baylor</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">2003 – 2007</p>
                <p className="text-gray-700 dark:text-gray-300">BA, History</p>
              </div>
            </section>
          </StaggerItem>
      
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">My Journey</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">
                    <span>1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">2023</h3>
                    <p className="text-gray-700 dark:text-gray-300">Began rebuilding through art and creativity</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">
                    <span>2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">2024</h3>
                    <p className="text-gray-700 dark:text-gray-300">Secured stable housing and employment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">
                    <span>3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">2025</h3>
                    <p className="text-gray-700 dark:text-gray-300">Launched this blog to share experiences and technical knowledge</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  My professional path has been shaped by both triumphs and challenges. In 2023, I faced significant personal hardship that led me to rebuild my life from the ground up. This experience taught me resilience and resourcefulness that continue to inform my approach to both work and life.
                </p>
                
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic text-gray-700 dark:text-gray-300 my-6">
                  "Each line etched on paper was more than mere art—it was an affirmation of existence, a defiance against oblivion."
                </blockquote>
                
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  During this period, I turned to art as both solace and opportunity. With just colored pencils and a notebook, I created drawings that I was able to sell, providing the means to acquire basic technology. This small beginning allowed me to reconnect with the digital world and begin rebuilding my career.
                </p>
              </div>
            </section>
          </StaggerItem>
      
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Technical Journey</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                With determination and focus, I progressed from basic tools to more advanced technology, enabling me to work as an independent contractor contributing to research and development of large language models through platforms like Remotasks and OneForma.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                This experience reignited my passion for technology and creation, leading me to invest in a personal domain and hosting services. I built an e-commerce site, explored affiliate marketing and blogging, and developed my skills in web development and digital content creation.
              </p>
            </section>
          </StaggerItem>
      
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Current Focus & Projects</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Today, I focus on developing software solutions that serve others and contribute value to the community. My work combines technical expertise with creative problem-solving, informed by my unique perspective and experiences.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Through this blog, I share both technical knowledge and personal insights, aiming to inspire others facing their own challenges while providing practical information on technology, development, and digital innovation.
              </p>
            </section>
          </StaggerItem>
      
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Creative Projects</h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Experimental Film Installation</h3>
                  <p>Mixed analog/digital media using Photoshop/Wacom, featured in Austin Film Society's Avant Cinema (2012)</p>
                </li>
                <li className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Digital Art Fabrication</h3>
                  <p>Interactive displays using vintage hardware/modulators</p>
                </li>
              </ul>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Publications & Exhibitions</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">"Possible and Remembered Time"</span> - Co-lab Space, Austin (2012)</li>
                  <li><span className="font-medium">Avant Cinema Program</span> - Austin Film Society (2012)</li>
                </ul>
              </div>
            </section>
          </StaggerItem>
      
          <StaggerItem>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Contact Information</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start">
                  <div className="text-blue-500 mr-3 text-2xl">📍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Location</h3>
                    <p className="text-gray-700 dark:text-gray-300">Austin, Texas, United States</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-blue-500 mr-3 text-2xl">📧</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Email</h3>
                    <a href="mailto:danielkliewer@gmail.com" className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                      danielkliewer@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
