# Uniform Management System - Frontend Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Authentication System](#authentication-system)
5. [Routing Architecture](#routing-architecture)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Component Architecture](#component-architecture)
9. [Environment Configuration](#environment-configuration)
10. [Design Decisions](#design-decisions)

---

## Overview

The Uniform Management System frontend is a React-based single-page application (SPA) that provides a comprehensive platform for managing school uniforms. The system supports four distinct user roles: Parents, Tailors, School Admins, and System Admins, each with their own dashboard and functionality.

---

## Technology Stack

### Core Technologies
- **React 18** - UI library for building component-based interfaces
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Authentication and backend services

### Why These Technologies?

**React**: Chosen for its component reusability, large ecosystem, and excellent developer experience.

**Vite**: Selected over Create React App for significantly faster build times and hot module replacement (HMR).

**React Router v6**: Provides declarative routing with nested routes, perfect for our multi-dashboard architecture.

**Supabase**: Offers built-in authentication with OAuth providers (Google), magic links, and email/password auth without building custom auth infrastructure.

**Tailwind CSS**: Enables rapid UI development with utility classes, reducing CSS file size and maintaining consistency.

---

## Project Structure

```
client/
├── public/                    # Static assets
│   ├── images/               # Application images
│   │   ├── Favicon.png
│   │   ├── issue.png
│   │   ├── students.png
│   │   └── Tailor.png
│   └── vite.svg
│
├── src/
│   ├── app/
│   │   ├── Api/              # API configuration
│   │   │   ├── Api.js        # Axios instance with interceptors
│   │   │   └── supabase.js   # Supabase client configuration
│   │   │
│   │   ├── components/       # Reusable components
│   │   │   ├── AdminProfileForm.jsx
│   │   │   ├── DashboardRouter.jsx
│   │   │   ├── DashoardLayout.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MockDataBanner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ParentProfileForm.jsx
│   │   │   ├── SchoolAdminProfileForm.jsx
│   │   │   └── TailorProfileForm.jsx
│   │   │
│   │   ├── pages/            # Page components
│   │   │   ├── admin/        # System admin pages
│   │   │   ├── parent/       # Parent dashboard pages
│   │   │   ├── schooladmin/  # School admin pages
│   │   │   ├── tailor/       # Tailor dashboard pages
│   │   │   ├── AuthCallback.jsx
│   │   │   ├── CompleteProfilePage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ParentDashboard.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── SchoolAdminDashboard.jsx
│   │   │   ├── SystemAdminDashboard.jsx
│   │   │   └── TailorDashboard.jsx
│   │   │
│   │   └── Stores/           # State management
│   │       ├── admin_stores.js
│   │       ├── auth_store.js
│   │       ├── parent_stores.js
│   │       ├── schooladmin_stores.js
│   │       └── tailor_stores.js
│   │
│   ├── assets/               # Static assets (SVGs, etc.)
│   ├── App.css              # Global styles
│   ├── App.jsx              # Root component with routing
│   ├── index.css            # Tailwind imports
│   ├── main.jsx             # Application entry point
│   └── Routes.jsx           # (Legacy - routing now in App.jsx)
│
├── .env                      # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html               # HTML entry point
├── package.json
├── vite.config.js           # Vite configuration
└── README.md
```

### Structure Rationale

**`/app` Directory**: Groups all application-specific code, separating it from configuration files and build artifacts.

**`/Api` Folder**: Centralizes all API-related configuration, making it easy to modify base URLs, add interceptors, or switch authentication providers.

**`/components` vs `/pages`**: 
- **Components**: Reusable UI elements used across multiple pages
- **Pages**: Route-specific components that represent full screens

**Role-based Page Folders**: Each user role has its own folder (`admin/`, `parent/`, `tailor/`, `schooladmin/`) for better organization and code splitting.

**`/Stores`**: Centralized state management separated by domain (auth, admin, parent, etc.) for maintainability.

---

## Authentication System

### Authentication Flow

The application uses **Supabase** for authentication with multiple sign-in methods:

1. **Email/Password** (Staff only)
2. **Magic Link** (Passwordless email authentication)
3. **Google OAuth** (Social login)

### Authentication Architecture

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  LoginPage / RegisterPage           │
│  - Email/Password                   │
│  - Magic Link                       │
│  - Google OAuth                     │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Supabase Authentication            │
│  - Handles OAuth flow               │
│  - Sends magic links                │
│  - Validates credentials            │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  AuthCallback.jsx                   │
│  - Receives OAuth redirect          │
│  - Extracts session data            │
│  - Sends to Django backend          │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Django Backend                     │
│  - Creates/retrieves user           │
│  - Generates JWT token              │
│  - Returns user data                │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Token Storage (localStorage)       │
│  - access_token                     │
│  - refresh_token                    │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  CompleteProfilePage                │
│  - Role-based profile form          │
│  - Redirects to dashboard           │
└─────────────────────────────────────┘
```

### Key Files

#### `supabase.js`
```javascript
// Initializes Supabase client with environment variables
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### `AuthCallback.jsx`
Handles OAuth redirects and syncs authentication between Supabase and Django:

**Key Responsibilities:**
1. Retrieves Supabase session after OAuth
2. Extracts user email and metadata
3. Retrieves role from localStorage (set during signup)
4. Sends data to Django backend
5. Stores JWT tokens
6. Redirects to profile completion

**Why This Approach?**
- **Dual Authentication**: Supabase handles OAuth complexity, Django manages application-level permissions
- **Role Persistence**: localStorage ensures role selection survives OAuth redirect
- **Token Management**: JWT tokens enable stateless authentication with Django API

### Authentication Design Decisions

**Why Supabase + Django?**
- **Supabase**: Handles OAuth providers, magic links, and user management
- **Django**: Manages application-specific user roles, permissions, and business logic
- **Best of Both**: OAuth simplicity + fine-grained permission control

**Why localStorage for Tokens?**
- Persists across page refreshes
- Accessible to Axios interceptors
- Simple implementation for SPA

**Why Role in localStorage During OAuth?**
- OAuth redirects lose application state
- Supabase doesn't reliably pass custom metadata through OAuth
- localStorage survives the redirect cycle

---

## Routing Architecture

### Route Structure

```javascript
<BrowserRouter>
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<RegisterPage />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    
    {/* Protected Routes */}
    <Route path="/complete-profile" element={<CompleteProfilePage />} />
    
    {/* Parent Dashboard */}
    <Route path="/parent-dashboard" element={<ParentDashboard />}>
      <Route index element={<Overview />} />
      <Route path="browse-schools" element={<BrowseSchools />} />
      <Route path="my-students" element={<MyStudents />} />
      <Route path="uniform-applications" element={<UniformApplications />} />
      <Route path="my-schools" element={<MySchools />} />
      <Route path="profile" element={<ParentProfile />} />
    </Route>
    
    {/* Similar nested routes for other roles... */}
  </Routes>
</BrowserRouter>
```

### Nested Routing Pattern

**Why Nested Routes?**
- **Layout Persistence**: Dashboard layout (sidebar, header) stays mounted
- **Code Splitting**: Each role's pages load independently
- **Clean URLs**: `/parent-dashboard/my-students` is more intuitive than `/parent-my-students`
- **Outlet Pattern**: Parent component renders `<Outlet />` for child routes

### Route Protection

Currently, route protection is handled at the component level (checking for tokens). Future enhancement: Implement `ProtectedRoute` wrapper component.

---

## State Management

### Current Approach: Store Files

The application uses custom store files (not Redux/Zustand) located in `/Stores`:

- `auth_store.js` - Authentication state
- `parent_stores.js` - Parent-specific data
- `tailor_stores.js` - Tailor-specific data
- `schooladmin_stores.js` - School admin data
- `admin_stores.js` - System admin data

### Why Custom Stores?

**Pros:**
- Lightweight (no external dependencies)
- Simple for small-to-medium applications
- Easy to understand for new developers

**Cons:**
- Manual state synchronization
- No built-in dev tools
- Potential for prop drilling

### Future Consideration

For scaling, consider migrating to:
- **Zustand**: Minimal boilerplate, React hooks-based
- **React Query**: For server state management (caching, refetching)

---

## API Integration

### Axios Configuration (`Api.js`)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Request Interceptor: Add JWT token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401 errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
```

### Design Decisions

**Centralized Axios Instance:**
- Single source of truth for base URL
- Consistent error handling across the app
- Easy to add global headers or interceptors

**Request Interceptor:**
- Automatically attaches JWT token to every request
- No need to manually add Authorization header in components

**Response Interceptor:**
- Handles authentication failures globally
- Automatically redirects to login on 401
- Cleans up invalid tokens

**Why Not Fetch API?**
- Axios provides interceptors out of the box
- Better error handling
- Automatic JSON transformation
- Request/response transformation

---

## Component Architecture

### Component Categories

#### 1. **Layout Components**
- `Navbar.jsx` - Global navigation
- `Footer.jsx` - Global footer
- `DashoardLayout.jsx` - Dashboard wrapper with sidebar

#### 2. **Form Components**
- `ParentProfileForm.jsx`
- `TailorProfileForm.jsx`
- `SchoolAdminProfileForm.jsx`
- `AdminProfileForm.jsx`

**Why Separate Profile Forms?**
- Each role has different required fields
- Easier to maintain role-specific validation
- Better code organization

#### 3. **Page Components**
Organized by role in subdirectories for scalability.

#### 4. **Utility Components**
- `EmptyState.jsx` - Consistent empty state UI
- `MockDataBanner.jsx` - Development indicator

### Component Design Principles

**Single Responsibility**: Each component has one clear purpose

**Composition Over Inheritance**: Components compose smaller components rather than extending classes

**Props Over State**: Prefer passing data down via props when possible

**Controlled Components**: Form inputs are controlled by React state

---

## Environment Configuration

### `.env` File

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_SUPABASE_URL=https://lkdkhjrvfqwbhgzcjmkf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Environment Variables

**`VITE_API_URL`**: Django backend API base URL
- Development: `http://127.0.0.1:8000/api`
- Production: Your deployed backend URL

**`VITE_SUPABASE_URL`**: Supabase project URL

**`VITE_SUPABASE_ANON_KEY`**: Supabase anonymous key (public, safe to expose)

### Why `VITE_` Prefix?

Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client-side code. This prevents accidentally exposing server-side secrets.

### Production Deployment

For production (Vercel):
1. Add environment variables in Vercel dashboard
2. Update `VITE_API_URL` to production backend URL
3. Redeploy application

---

## Design Decisions

### 1. **Multi-Method Authentication**

**Decision**: Support email/password, magic links, and Google OAuth

**Rationale**:
- **Email/Password**: For staff who prefer traditional login
- **Magic Links**: Passwordless convenience for parents/tailors
- **Google OAuth**: Fastest signup, reduces friction

### 2. **Role Selection at Signup**

**Decision**: Users select role (Parent/Tailor) before authentication

**Rationale**:
- Prevents wrong role assignment
- Enables role-specific onboarding
- Simplifies backend logic

### 3. **Separate Dashboards per Role**

**Decision**: Each role has its own dashboard with nested routes

**Rationale**:
- Clear separation of concerns
- Role-specific features and UI
- Easier to implement role-based access control
- Better code organization

### 4. **Profile Completion Flow**

**Decision**: After authentication, users complete their profile before accessing dashboard

**Rationale**:
- Ensures all required data is collected
- Prevents incomplete user records
- Better user experience (guided onboarding)

### 5. **Tailwind CSS Over Component Libraries**

**Decision**: Use Tailwind CSS instead of Material-UI or Ant Design

**Rationale**:
- Full design control
- Smaller bundle size
- Faster development with utility classes
- No opinionated design system to override

### 6. **Vite Over Create React App**

**Decision**: Use Vite as build tool

**Rationale**:
- 10-100x faster HMR (Hot Module Replacement)
- Faster build times
- Modern ESM-based architecture
- Better developer experience

### 7. **Axios Over Fetch**

**Decision**: Use Axios for HTTP requests

**Rationale**:
- Built-in interceptors for auth tokens
- Automatic JSON transformation
- Better error handling
- Request/response transformation

### 8. **localStorage for Token Storage**

**Decision**: Store JWT tokens in localStorage

**Rationale**:
- Persists across page refreshes
- Simple implementation
- Accessible to Axios interceptors

**Security Note**: For high-security applications, consider httpOnly cookies to prevent XSS attacks.

### 9. **Supabase + Django Hybrid Auth**

**Decision**: Use Supabase for authentication, Django for authorization

**Rationale**:
- **Supabase**: Handles OAuth complexity, magic links, user management
- **Django**: Manages application roles, permissions, business logic
- **Best of Both**: OAuth simplicity + fine-grained control

### 10. **Component-Based Architecture**

**Decision**: Break UI into small, reusable components

**Rationale**:
- Easier to test
- Better code reusability
- Simpler debugging
- Follows React best practices

---

## Development Workflow

### Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

Vite dev server runs on `http://localhost:5173` by default.

### Hot Module Replacement (HMR)

Vite provides instant HMR - changes reflect immediately without full page reload.

---

## Future Enhancements

### Recommended Improvements

1. **Protected Route Component**
   ```javascript
   <ProtectedRoute requiredRole="Parent">
     <ParentDashboard />
   </ProtectedRoute>
   ```

2. **React Query for Server State**
   - Automatic caching
   - Background refetching
   - Optimistic updates

3. **Error Boundary Components**
   - Graceful error handling
   - User-friendly error messages

4. **Loading States**
   - Skeleton screens
   - Suspense boundaries

5. **Form Validation Library**
   - React Hook Form
   - Yup/Zod for schema validation

6. **Testing**
   - Vitest for unit tests
   - React Testing Library
   - Cypress for E2E tests

7. **Performance Optimization**
   - Code splitting with React.lazy()
   - Image optimization
   - Bundle analysis

8. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

---

## Troubleshooting

### Common Issues

**Issue**: "No routes matched location"
- **Cause**: Route not defined in App.jsx
- **Solution**: Add route to routing configuration

**Issue**: 401 Unauthorized errors
- **Cause**: Missing or expired JWT token
- **Solution**: Check localStorage for `access_token`, re-login if needed

**Issue**: OAuth redirect fails
- **Cause**: Incorrect redirect URI in Google Console
- **Solution**: Verify redirect URI matches `window.location.origin + '/auth/callback'`

**Issue**: Role shows as "Unknown"
- **Cause**: User created without role
- **Solution**: Role selector now appears on CompleteProfilePage

---

## Conclusion

The Uniform Management System frontend is built with modern React practices, prioritizing developer experience, maintainability, and scalability. The architecture supports multiple user roles, flexible authentication, and a clean separation of concerns.

Key strengths:
- ✅ Modern tech stack (React 18, Vite, Tailwind)
- ✅ Multiple authentication methods
- ✅ Role-based access control
- ✅ Clean component architecture
- ✅ Centralized API configuration
- ✅ Responsive design

For questions or contributions, refer to the main README.md or contact the development team.
