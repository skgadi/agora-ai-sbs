# AgoraAI-SBS

**AgoraAI for Smart Bioelectrochemical Systems**

[![GitHub Repository](https://img.shields.io/badge/GitHub-skgadi%2Fagora--ai--sbs-blue)](https://github.com/skgadi/agora-ai-sbs)
[![Docker Pulls](https://img.shields.io/docker/pulls/skgadi/agora-ai-sbs?color=orange)](https://hub.docker.com/r/skgadi/agora-ai-sbs)
[![License](https://img.shields.io/badge/License-Open--Source-green)](LICENSE)

---

## 🌱 Overview

**AgoraAI-SBS** is a domain-specialized extension of the AgoraAI multi-agent conversational framework, designed explicitly for **Smart Bioelectrochemical Systems (SBS)**.

The platform enables **multi-human, multi-AI, voice-to-voice interaction** between researchers, operators, and AI agents that embody distinct scientific, engineering, and operational roles relevant to bioelectrochemical systems—such as microbial electrochemical cells, biosensors, electro-bioreactors, and hybrid cyber-physical systems.

AgoraAI-SBS facilitates:

- Collaborative scientific reasoning
- Real-time system interpretation
- Cross-disciplinary dialogue between biology, electrochemistry, control systems, and AI

All interactions occur within a **shared, state-aware conversational environment**, enabling structured, traceable, and reproducible discussions.

---

## 🧬 What Makes AgoraAI-SBS Different?

Unlike general-purpose conversational AI platforms, AgoraAI-SBS is **purpose-built for scientific and engineering workflows**, with an emphasis on:

- **System-level reasoning**
- **Multi-perspective expert simulation**
- **Human–AI co-analysis of bioelectrochemical processes**
- **Voice-driven, hands-free interaction for lab and field environments**

---

## ✨ Key Features

### 🧠 Multi-Agent Scientific Reasoning

- Deploy multiple AI agents, each configured with a **domain-specific role** (e.g., electrochemist, microbiologist, control engineer, data analyst).
- Agents communicate simultaneously with each other and with multiple human participants.

### 🔁 Context-Aware, State-Persistent Conversations

- All AI responses are generated from a **shared, evolving system state**.
- Enables long-form discussions that preserve experimental context, assumptions, and constraints.

### 🎙️ Voice-to-Voice Interaction

- Supports real-time speech-to-text (STT) and text-to-speech (TTS) for natural, hands-free interaction.
- Designed for laboratory, pilot-scale, and operational environments.

### 📊 Event Reporting & Knowledge Capture

The administrative interface allows:

- Generation of a **Full Session Report**, including:
  - System configuration
  - Defined agent roles
  - Human participants
  - Complete conversational transcript
- Downloading and uploading transcripts for:
  - Experiment documentation
  - Reproducibility
  - Training and audit trails

### 🔀 Controlled Conversational Flow

- Explicit transition from **Setup State** (system definition and role assignment) to **Active Analysis State**
- Manual controls to:
  - Interrupt AI speech
  - Force agent responses
  - Re-direct the discussion

---

## 🧪 Example Use Cases

- Collaborative analysis of microbial electrochemical cell performance
- AI-assisted troubleshooting of SBS control anomalies
- Hypothesis exploration involving electrochemical and biological coupling
- Training and education in interdisciplinary bioelectrochemical systems
- Decision support for SBS operation and optimization

---

## 💻 Technology Stack

### Front-end (`/client`)

- **Framework:** Vue.js 3 (Composition API) + Quasar Framework
- **Deployment:** Progressive Web App (PWA)
- **Language:** TypeScript
- **Package Manager:** Yarn

The UI is optimized for:

- Multi-participant interaction
- Low-latency voice exchange
- Scientific session management

---

### Back-end (`/server`)

- **Runtime:** Node.js
- **Real-Time Communication:** Socket.IO
- **Language:** TypeScript
- **AI Integration:** Centralized LLM orchestration and prompt management

The back-end serves as the **single source of truth** for:

- System state
- Agent roles
- Conversational history

---

## 🚀 Getting Started

### Prerequisites

- Docker
- A supported Generative AI API Key (e.g., Google Gemini)

---

### Installation via Docker Hub

```bash
docker pull skgadi/agora-ai-sbs
```

---

### Running the Container

```bash
docker run -d \
  -p 3000:3000 \
  -e MY_PAI_GEMINI_API_KEY="YOUR_API_KEY" \
  -e MY_PAI_ADMIN_PASSWORD="YOUR_ADMIN_PASSWORD" \
  skgadi/agora-ai-sbs
```

- Main interface: `http://localhost:3000`
- Admin interface: `http://localhost:3000/admin`

---

### Docker Compose Example

```yaml
version: "3.8"

services:
  agora-ai-sbs:
    image: skgadi/agora-ai-sbs:latest
    container_name: agora-ai-sbs
    restart: unless-stopped
    environment:
      MY_PAI_GEMINI_API_KEY: "YOUR_API_KEY"
      MY_PAI_ADMIN_PASSWORD: "STRONG_PASSWORD"
    ports:
      - "8080:3000"
```

---

## 📁 Repository & Resources

- **Source Code:** [https://github.com/skgadi/agora-ai-sbs](https://github.com/skgadi/agora-ai-sbs)
- **Docker Hub:** [https://hub.docker.com/r/skgadi/agora-ai-sbs](https://hub.docker.com/r/skgadi/agora-ai-sbs)

---

## 🔬 Scientific Context

AgoraAI-SBS is designed as a **research-enabling platform** for Smart Bioelectrochemical Systems.
The underlying multi-agent architecture and its application to SBS analysis are intended for scientific dissemination and peer-reviewed publication.

---

## 📜 License

This project is released as open-source under the terms specified in the LICENSE file.
