# Kamal Shrestha Media Platform

A high-performance, editorial-grade personal brand and media platform.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- Docker & Docker Compose (for database & cache)

### 2. Infrastructure Setup
Spin up the PostgreSQL and Redis containers:
```bash
docker-compose up -d
```

### 3. Application Setup
Run the automated setup script to install dependencies and initialize the database:
```bash
chmod +x setup.sh
./setup.sh
```

### 4. Development Mode
Start both backend and frontend development servers concurrently:
```bash
npm run dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - **Credentials:** `admin@kamal-shrestha.com.np` / `admin123`

## 🏗 Architecture

### Backend (Express + Prisma)
- **API-First**: Decoupled backend handling content delivery and management.
- **Editorial Workflow**: Built-in RBAC and status tracking (Draft -> Review -> Published).
- **Slot Engine**: Rule-based homepage placement with manual overrides.
- **Media Pipeline**: Automated image optimization (WebP/AVIF) and resizing via Sharp.

### Frontend (Next.js 15 + Tailwind v4)
- **Premium Aesthetics**: Editorial-grade design with Framer Motion animations.
- **SEO Optimized**: Dynamic JSON-LD schema generation and automatic sitemaps.
- **Responsive**: Fluid layouts for cinema hall (video), archive, and columns.
- **Dark Mode**: Native system-aware theme support.

## 🛠 Available Scripts

- `npm run dev`: Start all services.
- `npm run build`: Build both frontend and backend for production.
- `npm run prisma:generate`: Update Prisma client.
- `npm run prisma:seed`: Populate database with demo content.
- `npm run setup`: Re-run full initialization.

## 📁 Project Structure
- `/frontend`: Next.js application (App Router).
- `/backend`: Node.js Express server.
- `/backend/prisma`: Database schema and migrations.
- `/docker-compose.yml`: Infrastructure configuration.
