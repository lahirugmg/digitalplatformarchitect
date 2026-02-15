# Feature: User Authentication & Cloud Sync

**Priority:** High 🟢  
**Category:** Core Infrastructure  
**Effort:** Large (3-4 weeks)  
**Impact:** High

## Overview
Replace localStorage-based progress tracking with user authentication and cloud-based sync. Enable users to access their progress, pipelines, and unlocked content across devices.

## Current State
- Skill tree progress stored in localStorage ([lib/unlock-system.ts](lib/unlock-system.ts))
- Pipeline designs saved to localStorage ([app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx](app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx))
- No user accounts or authentication
- Progress lost when clearing browser data or switching devices
- No way to backup or restore progress

## Proposed Solution

### Authentication Options
1. **Next-Auth.js** (Recommended)
   - Support for multiple providers (Google, GitHub, Email)
   - Built-in JWT handling
   - Works seamlessly with Next.js
   
2. **Clerk** or **Auth0**
   - Managed authentication service
   - Pre-built UI components
   - Faster implementation

### Data Storage
- **Database:** PostgreSQL or MongoDB
- **ORM:** Prisma or Drizzle
- **Hosting:** Vercel Postgres, Supabase, or PlanetScale

### Data Model
```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  lastLoginAt: Date
  subscription?: 'free' | 'pro' | 'enterprise'
}

interface UserProgress {
  userId: string
  completedNodes: string[]
  unlockedNodes: string[]
  tokens: number
  streakDays: number
  totalXP: number
  level: number
  lastActivityDate: Date
}

interface SavedPipeline {
  id: string
  userId: string
  name: string
  description?: string
  playgroundType: 'data-pipeline' | 'message-flow' | 'enterprise-integration'
  nodes: Node[]
  edges: Edge[]
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  tags: string[]
}
```

## Features

### 1. User Registration & Login
- Email/password authentication
- Social login (Google, GitHub)
- Password reset flow
- Email verification

### 2. Profile Management
- User profile page
- Avatar upload
- Display name and bio
- Achievement badges
- Public profile option

### 3. Cloud Sync
- Automatic background sync of progress
- Sync across all devices
- Conflict resolution (last-write-wins or prompt user)
- Offline mode with sync when online

### 4. Pipeline Management
- Save multiple pipeline designs
- Name and describe pipelines
- Version history
- Share pipelines via link
- Fork others' public pipelines
- Export/import pipelines

### 5. Backup & Export
- Download all user data as JSON
- Restore from backup
- GDPR compliance (data deletion)

## User Experience

### Anonymous Users (Current)
- Continue allowing anonymous usage
- Show banner encouraging sign-up
- 7-day grace period to preserve localStorage progress
- One-click import of existing progress after sign-up

### Signed-In Users
- Seamless sync indicator in header
- "Last synced: 2m ago" status
- Manual sync button for immediate backup
- Conflict resolution prompts when needed

### Migration Path
```typescript
// Auto-migrate localStorage to cloud on first sign-in
async function migrateLocalProgressToCloud(userId: string) {
  const localProgress = loadUserProgress() // from localStorage
  const cloudProgress = await fetchUserProgress(userId)
  
  if (!cloudProgress) {
    // First time user - import localStorage
    await saveUserProgress(userId, localProgress)
  } else {
    // Show merge UI if conflict
    showProgressMergeDialog(localProgress, cloudProgress)
  }
}
```

## Technical Implementation

### Phase 1: Authentication Setup (Week 1)
- Install and configure Next-Auth.js
- Create authentication pages (login, register, reset password)
- Set up database schema
- Implement basic session management

### Phase 2: Data Migration (Week 2)
- Create API routes for progress CRUD operations
- Migrate localStorage logic to API calls
- Implement automatic sync
- Add offline detection

### Phase 3: Pipeline Management (Week 3)
- Create saved pipelines UI
- Implement save/load functionality
- Add sharing features
- Version history tracking

### Phase 4: Polish & Testing (Week 4)
- Conflict resolution UI
- Profile pages
- Data export
- Security audit
- Load testing

## API Routes Needed
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/reset-password

GET    /api/user/profile
PUT    /api/user/profile
DELETE /api/user/account

GET    /api/user/progress
PUT    /api/user/progress
PATCH  /api/user/progress/sync

GET    /api/pipelines
POST   /api/pipelines
GET    /api/pipelines/:id
PUT    /api/pipelines/:id
DELETE /api/pipelines/:id
POST   /api/pipelines/:id/fork

GET    /api/user/export-data
```

## Benefits
- **User Retention:** Users can access progress anywhere
- **Data Security:** Progress backed up in cloud
- **Social Features:** Enable sharing and collaboration (future)
- **Monetization:** Foundation for premium features
- **Analytics:** Better understanding of user behavior
- **Community:** Enable public profiles and shared content

## Risks & Mitigation
- **Privacy Concerns:** Make privacy options clear, allow anonymous mode
- **Data Loss:** Implement robust backup and recovery
- **Cost:** Database and hosting costs (start with free tier, scale with revenue)
- **Complexity:** Use managed services to reduce maintenance

## Success Metrics
- 40%+ of active users sign up within 2 weeks
- <100ms API response time for sync operations
- 99.9% uptime for authentication services
- <1% data sync conflicts
- User retention increases by 25%

## Dependencies
- Next-Auth.js or similar auth provider
- PostgreSQL/MongoDB database
- Hosting with database support (Vercel, Railway, Supabase)

## Future Enhancements
- Team accounts for organizations
- OAuth API for third-party integrations
- Single Sign-On (SSO) for enterprises
- Multi-factor authentication (MFA)
- Progressive Web App (PWA) for offline-first experience
