---
layout: post
title:  Building a Multimodal Story Generation System Complete Setup Guide
date:   2025-01-23 07:42:44 -0500
---

**Summary:** A step-by-step tutorial on creating an AI system that generates illustrated stories by combining text and image generation. The article explains how to build a pipeline that uses large language models to create narrative text and then generates corresponding images for each story segment. It covers prompt engineering techniques for maintaining narrative consistency, implementing memory mechanisms to track story elements across generations, and creating coherent visual styles throughout the illustrations. The post includes code examples for integrating various AI models (including GPT-4 and Stable Diffusion), managing the handoff between text and image generation, implementing user controls for story direction, and creating a web interface for the system. It also addresses technical challenges like maintaining character consistency across images and balancing text-image alignment with creative freedom.



# Multimodal Story Generation System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-blue.svg)](https://www.python.org/)
[![Ollama Required](https://img.shields.io/badge/Ollama-Required-important.svg)](https://ollama.ai/)

Transform visual inputs into structured narratives using cutting-edge AI technologies. This system combines computer vision and large language models to generate dynamic, multi-chapter stories from images.



## Features

- 🖼️ **Image Analysis** - Extract narrative elements from images using LLaVA
- 📖 **Adaptive Story Generation** - Generate 5-chapter stories with Gemma2-27B
- 🧠 **Context Awareness** - Maintain narrative consistency with ChromaDB RAG
- 📊 **Interactive Visualization** - ReactFlow-powered story graph interface
- 🚀 **Production Ready** - Dockerized microservices architecture

## Table of Contents

- [Quick Start](#quick-start)
- [System Requirements](#system-requirements)
- [Architecture](#architecture)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)


## Quick Start

### Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/kliewerdaniel/ITB02
   cd ITB02
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   
   # Apple Silicon Special Setup
   pip install --pre torch --extra-index-url https://download.pytorch.org/whl/nightly/cpu
   brew install libjpeg webp
   ```

4. **Initialize AI Models**
   ```bash
   ollama pull gemma2:27b
   ollama pull llava
   ```

5. **Start Services**
   ```bash
   # Backend (FastAPI)
   uvicorn backend.main:app --reload

   # Frontend (new terminal)
   cd frontend
   npm install && npm run dev
   ```

6. **Verify Installation**
   ```bash
   curl http://localhost:8000/health
   # Expected response: {"status":"healthy"}
   ```

## System Requirements

- Python 3.11+
- Node.js 18+
- Ollama runtime
- 16GB RAM (24GB+ recommended for GPU acceleration)
- 10GB+ Disk Space

## Architecture

```text
[Frontend] ←HTTP→ [FastAPI]  
                 ↓     ↑  
              [Ollama] ←→ [ChromaDB]  
                 ↓  
              [Redis]  
                 ↓  
            [Celery Workers]
```

### Key Components

| Component           | Technology Stack       | Function                           |
|---------------------|------------------------|------------------------------------|
| Image Analysis      | LLaVA, Pillow          | Visual narrative extraction        |
| Story Engine        | Gemma2-27B, LangChain  | Context-aware chapter generation   |
| Knowledge Base      | ChromaDB               | Narrative consistency management   |
| API Layer           | FastAPI                | REST endpoint management           |
| Visualization       | ReactFlow, Zustand     | Interactive story mapping          |

## Production Deployment

### Docker Setup

```bash
# Build and launch all services
docker-compose up --build

# Initialize vector store
docker exec -it backend python -c "from backend.core.rag_manager import NarrativeRAG; NarrativeRAG()"
```

### Cluster Configuration

```yaml
# docker-compose.yml excerpt
services:
  ollama:
    deploy:
      resources:
        limits:
          memory: 12G
          cpus: '4'
```

## Troubleshooting

### Common Issues

1. **Missing Vector Store**
   ```bash
   rm -rf chroma_db && mkdir chroma_db
   ```

2. **Out-of-Memory Errors**
   ```bash
   export OLLAMA_MAX_LOADED_MODELS=2
   ```

3. **CUDA Compatibility Issues**
   ```bash
   pip uninstall torch
   pip install torch --extra-index-url https://download.pytorch.org/whl/cu117
   ```


---

**Daniel Kliewer**  
[GitHub Profile](https://github.com/kliewerdaniel)  
*AI Systems Developer*
