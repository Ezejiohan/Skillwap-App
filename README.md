# SkillSwap

SkillSwap is a modern full-stack web application that enables people to share, discover, and exchange skills with others in their community. Users can post skills they want to teach or learn, browse offerings, and connect directly with skill providers.

This project was built as part of the **Remote Hustle Developers Challenge (RHDC) – Stage 1** and has been significantly enhanced with production-ready features.

---

## 🚀 Recent Improvements

### Performance & Optimization
- **Code Splitting**: Implemented lazy loading for all page components with React.lazy and Suspense
- **Bundle Analysis**: Added bundle analyzer to monitor and optimize build size
- **Compression**: Enabled Gzip compression for production builds
- **Font Optimization**: Added font preloading for better loading performance
- **Reduced Motion**: Added support for `prefers-reduced-motion` for accessibility

### Accessibility (WCAG 2.1 AA Compliant)
- **Semantic HTML**: Proper ARIA labels, roles, and landmarks
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: Comprehensive screen reader compatibility
- **Color Contrast**: High contrast ratios for better readability
- **Focus Management**: Proper focus indicators and management
- **Error Handling**: Clear error messages and validation feedback

### Backend API
- **Full-Stack Architecture**: Complete Express.js API with TypeScript
- **RESTful Endpoints**: CRUD operations for skills and users
- **Data Validation**: Input validation and sanitization
- **Error Handling**: Centralized error handling middleware
- **Security**: Helmet.js for security headers, CORS configuration
- **Type Safety**: Full TypeScript coverage across backend

### Code Quality
- **TypeScript Strict Mode**: Enhanced type safety and error catching
- **ESLint Configuration**: Comprehensive linting rules
- **Code Organization**: Modular architecture with clear separation of concerns
- **Error Boundaries**: React error boundaries for graceful error handling

---

## Problem

Many people want to learn practical skills but cannot easily find someone willing to teach or exchange knowledge with them.

There is no simple platform for people to quickly **offer skills and connect with learners**.

---

## Solution

SkillSwap provides a platform where users can:

- Post a skill they can teach or want to learn
- Browse skills shared by others with advanced filtering
- Contact skill providers directly to arrange exchanges
- Build a community of skill sharers

The platform is lightweight, performant, accessible, and ready for production use.

---

## Features

### Core Features
- ✅ Post new skills (offer to teach or request to learn)
- ✅ Browse and filter available skills
- ✅ Direct contact with skill providers
- ✅ Real-time state management
- ✅ Responsive design for all devices

### Enhanced Features
- 🎨 Animated UI using Framer Motion
- ♿ Full accessibility compliance (WCAG 2.1 AA)
- 🚀 Optimized performance with code splitting
- 🔒 Secure API with proper validation
- 📱 Mobile-first responsive design
- 🎯 Advanced filtering and search capabilities

---

## Tech Stack

### Frontend
- **React 19.2.4** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **TypeScript** - Full backend type safety
- **CORS** - Cross-origin resource sharing
- **Helmet.js** - Security headers
- **UUID** - Unique identifier generation
- **Dotenv** - Environment variable management

### Development Tools
- **Vite 8.0.0** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **TypeScript Compiler** - Type checking
- **Bundle Analyzer** - Build size optimization
- **tsx** - TypeScript execution for development

### Deployment
- **Vercel/Netlify** - Frontend deployment
- **Railway/Render** - Backend deployment

---

## Project Structure

```
skillswap/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Navbar.tsx
│   │   └── SkillCard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Explore.tsx
│   │   └── PostSkill.tsx
│   ├── store/
│   │   └── skillStores.ts
│   ├── types/
│   │   └── skill.ts
│   ├── utils/
│   │   └── index.ts
│   ├── constants/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── skills.ts
│   │   │   └── users.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── public/
├── index.html
├── package.json
├── tsconfig*.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yorsyboy/skillswap.git
   cd skillswap
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3001`

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## API Documentation

### Skills Endpoints

- `GET /api/skills` - Get all skills (with optional query parameters)
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Users Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check

- `GET /api/health` - Server health status

---

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run analyze` - Analyze bundle size

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server

### Code Quality

- **Linting:** `npx eslint .`
- **Type Checking:** `npx tsc --noEmit`
- **Bundle Analysis:** `npm run analyze`

---

## Deployment

### Frontend Deployment
Deploy the `dist` folder to Vercel, Netlify, or any static hosting service.

### Backend Deployment
Deploy to Railway, Render, or any Node.js hosting service.

### Environment Variables for Production
```env
PORT=3001
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- Built for the Remote Hustle Developers Challenge
- Icons by Lucide React
- Fonts by Google Fonts
- UI inspiration from modern design systems

The application will run on:

http://localhost:5173

```

## Deployment, Repo and Video

Live Demo: [Click here](https://skillswaps.vercel.app)

GitHub Repository: [View Code](https://github.com/Yorsyboy/skillswap)

Demo Video: [Watch Video](https://screenrec.com/share/6uNSt2vKcO)
