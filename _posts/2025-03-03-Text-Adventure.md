---
layout: post
title:  Text Adventure
date:   2025-03-03 07:42:44 -0500
---

**Summary:** A comprehensive guide to creating an AI-powered text adventure game. The tutorial walks through building an interactive fiction experience where players navigate through a dynamically generated world by typing natural language commands. It covers setting up the game engine using Python, implementing natural language understanding with AI models to interpret player inputs, designing a procedural narrative system that adapts the story based on player choices, and creating a memory mechanism to maintain narrative consistency. The post includes detailed code examples for each component, strategies for balancing predetermined story elements with AI-generated content, and techniques for handling edge cases in player interactions. It also addresses important considerations around game design principles, maintaining player agency, and optimizing AI response times for a smooth gameplay experience.


# Text Adventure Generator Web Application

[https://github.com/kliewerdaniel/textadventure07](https://github.com/kliewerdaniel/textadventure07)

This is a web application that allows users to generate interactive text adventures from images. The application uses Next.js for the frontend and integrates with a Python script for generating the text adventures.

## Features

- **Image Upload**: Upload one or more images to generate your adventure
- **Customization Options**: Adjust parameters like narrative style, temperature, and story length
- **Interactive Results**: View the generated adventure with interactive choices

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- Python 3.8 or later
- Ollama (for running local AI models)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kliewerdaniel/textadventure07.git
   cd textadventure07
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:
   ```bash
   cd text-adventure-web
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000/app](http://localhost:3000/app) in your browser to see the application.

   **Important**: Make sure to access the `/app` route to avoid hydration issues.

## Deployment

This application is configured for deployment on Netlify:

1. Push your code to a GitHub repository.

2. Connect your repository to Netlify:
   - Sign in to Netlify
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. Configure environment variables in Netlify:
   - Set any required environment variables for your Python script

## Project Structure

- `text-adventure-web/`: Next.js web application
  - `src/app/`: Application source code
    - `api/`: API routes for handling requests
    - `app/`: Client-side only application route
    - `components/`: React components
    - `utils/`: Utility functions
  - `public/`: Static assets

- `main.py`: Python script for generating text adventures
- `requirements.txt`: Python dependencies

## How It Works

1. Users upload images through the web interface
2. The application sends the images to the API
3. The API executes the Python script with the provided parameters
4. The Python script generates a text adventure based on the images
5. The results are returned to the web interface for display
