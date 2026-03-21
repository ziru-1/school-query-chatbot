<div align="center">

# 🤖 VMUF Query Chatbot

### _RAG-Based AI Query System for Virgen Milagrosa University Foundation Inc._

![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat&logo=react&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Database](https://img.shields.io/badge/Database-Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Vector DB](https://img.shields.io/badge/VectorDB-Pinecone-000000?style=flat)
![AI](https://img.shields.io/badge/AI-Cohere-FF6F61?style=flat)
![Project](https://img.shields.io/badge/Project-Thesis-dd8f61?style=flat)

<br/>

> A dynamic query system that uses Retrieval Augmented Generation (RAG)  
> to provide fast and accurate answers to institutional inquiries  
> for Virgen Milagrosa University Foundation Inc.

</div>

**Try the system here:**  
https://vivy-chatbot.vercel.app/

---

## 🖼 Screenshots

### Public Pages

<table>
<tr>
<td align="center">

Landing Page  
<img src="assets/landing-page.png" width="400"/>

</td>
<td align="center">

Chat Interface  
<img src="assets/chat-interface.png" width="400"/>

</td>
</tr>

<tr>
<td align="center">

Chatbot Conversation  
<img src="assets/chatbot-conversation.png" width="400"/>

</td>
<td align="center">

Question Suggestion  
<img src="assets/question-suggestion.png" width="400"/>

</td>
</tr>
</table>

---

### Admin Panel

> Note  
> All data shown inside the admin panel screenshots are mock data for privacy reasons,  
> except for the QA Management tab where entries are intended to be public knowledge base data.

<table>
<tr>
<td align="center">

Dashboard  
<img src="assets/dashboard.png" width="400"/>

</td>
<td align="center">

QA Management  
<img src="assets/qa-management.png" width="400"/>

</td>
</tr>

<tr>
<td align="center">

Suggestions Management  
<img src="assets/suggestions-management.png" width="400"/>

</td>
<td align="center">

Chat Logs  
<img src="assets/chat-logs.png" width="400"/>

</td>
</tr>

<tr>
<td align="center">

Manage Admins (Superadmin)
<img src="assets/manage-admins.png" width="400"/>

</td>
<td></td>
</tr>
</table>

---

## 📌 Overview

This project is a web-based AI chatbot designed to automate responses to common school-related questions such as schedules, admissions, programs, policies, and services.

The system uses a Retrieval Augmented Generation (RAG) pipeline with vector embeddings to retrieve relevant information from a knowledge base and generate context-aware responses.

The goal of the project is to:

- Reduce repetitive inquiries to faculty
- Provide instant and consistent answers
- Centralize institutional information
- Modernize university communication

---

## ⚙️ Features

- 🤖 AI chatbot with RAG pipeline
- 🔎 Vector similarity search using Pinecone
- 🧠 Cohere embedding and generation API
- 📚 Admin-managed knowledge base
- 💬 Question suggestion system
- 📝 Admin action logs
- 🔐 Role-based admin access
- ⚡ Real-time chat interface
- ☁ Free-tier cloud deployment

---

## 🧱 Tech Stack

Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui

Backend

- Node.js
- Express.js

Database

- Supabase (PostgreSQL)

Vector Database

- Pinecone

AI Models

- Cohere Embedding API
- Cohere Generate API

Deployment

- Vercel (Frontend)
- Render (Backend)
- Supabase (Database)
- Pinecone (Vector DB)
- UptimeRobot (keep free tier active)

---

## 🧠 System Architecture

User → React Frontend → Express Backend → RAG Pipeline

RAG Pipeline

1. Convert query to embedding
2. Search vector database
3. Retrieve context
4. Generate response
5. Return answer

---

## 👥 User Roles

Student

- Ask questions
- View responses
- Suggest queries

Administrator

- Add QA pairs
- Edit knowledge base
- Delete entries
- Review suggestions
- View logs
- Manage admins

---

## ⚠ Limitations

- Uses free-tier APIs
- Limited token usage
- Backend may sleep on free hosting
- Knowledge base must be maintained manually
- Not connected to official school portal

---

## 🎓 Thesis Information

Title  
Dynamic Query System Using a RAG-Based Chatbot and Vector Databases for Virgen Milagrosa University Foundation Inc.

Institution  
Virgen Milagrosa University Foundation Inc.  
San Carlos City, Pangasinan, Philippines

College  
College of Information and Computer and Information Studies

Duration  
August 2025 – April 2026

---

## 📄 License

This project is for academic purposes.
