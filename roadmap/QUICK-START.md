# Quick Start Guide - Personalized Onboarding Feature

## 🚀 Try It Out

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   ```
   http://localhost:3000
   ```

3. **Click the button**:
   - Look for the **"Get Personalized Guidance"** button in the hero section
   - It has a ✨ sparkle icon

4. **Follow the flow**:
   - **Step 1**: Select your role (e.g., Enterprise Architect)
   - **Step 2**: Select your goal (e.g., Design a New System)
   - **Step 3**: View your personalized journey with recommendations

5. **Explore**:
   - Click on recommended links to explore content
   - Your selections are saved (try refreshing the page)
   - Click the button again to see your saved journey

## 📸 What You'll See

### Landing Page
```
┌────────────────────────────────────────────────────────┐
│  Interactive Architecture Playground                  │
│                                                        │
│  [✨ Get Personalized Guidance]  [Other Playgrounds]  │
└────────────────────────────────────────────────────────┘
```

### Modal - Step 1: Role Selection
```
┌────────────────────────────────────────────────────────┐
│  Progress: [●1 Role] ──► [○2 Goal] ──► [○3 Journey]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  I am a...                                            │
│                                                        │
│  Business & Strategy                                  │
│    💼 Business Stakeholder                            │
│    🗺️  Product Manager                                │
│    🎨 UX/UI Designer                                   │
│                                                        │
│  Architecture & Analysis                              │
│    📄 Business Analyst                                 │
│    🏢 Enterprise Architect  ← Selected                │
│    🛡️  Security Architect                              │
│    💾 Data Architect                                   │
│                                                        │
│  Engineering & Operations                             │
│    🔨 Implementation Lead                              │
│    ✅ QA Engineer                                      │
│                                                        │
│  [Start Over]                          [Continue →]   │
└────────────────────────────────────────────────────────┘
```

### Modal - Step 2: Goal Selection
```
┌────────────────────────────────────────────────────────┐
│  Progress: [✓1 Role] ──► [●2 Goal] ──► [○3 Journey]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  I want to...                                         │
│  As a Enterprise Architect, what would you like to do?│
│                                                        │
│  [All (8)] [Learn (2)] [Design (3)] [Evaluate (5)]   │
│                                                        │
│  📚 Learn Architecture Patterns                       │
│     Understand core patterns, trade-offs...           │
│     [Beginner] 2-4 hours                              │
│                                                        │
│  🏗️  Design a New System  ← Selected                  │
│     Architect a system from scratch...                │
│     [Intermediate] 4-8 hours                          │
│                                                        │
│  🔍 Evaluate Existing Architecture                    │
│     Assess current architecture...                    │
│     [Advanced] 3-6 hours                              │
│                                                        │
│  [← Back]  [Start Over]                [Continue →]   │
└────────────────────────────────────────────────────────┘
```

### Modal - Step 3: Journey View
```
┌────────────────────────────────────────────────────────┐
│  Progress: [✓1 Role] ──► [✓2 Goal] ──► [●3 Journey]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🏗️  Your Personalized Journey                        │
│                                                        │
│  As a Enterprise Architect, here's your path to       │
│  design a new system                                  │
│                                                        │
│  ▸ Start Here                                         │
│    ┌───────────────────────────────────────────────┐  │
│    │ 🛠️  Architecture Playground                   │  │
│    │ Start with blank canvas and build your...    │  │
│    │ [Interactive Playground] 2 hours              │  │
│    └───────────────────────────────────────────────┘  │
│    ┌───────────────────────────────────────────────┐  │
│    │ 📚 Design Patterns Catalog                    │  │
│    │ Browse proven patterns for your design...    │  │
│    │ [Pattern] 1 hour                              │  │
│    └───────────────────────────────────────────────┘  │
│                                                        │
│  ▸ Explore More                                       │
│    [Business Architecture]  [Pattern Library]        │
│                                                        │
│  ▸ Recommended Steps                                  │
│    1️⃣  Define business capabilities and value streams │
│    2️⃣  Map functional requirements to components      │
│    3️⃣  Select appropriate patterns for constraints    │
│    4️⃣  Design integration points and data flows       │
│    5️⃣  Document decisions and trade-offs              │
│                                                        │
│                    [Start My Journey]                  │
└────────────────────────────────────────────────────────┘
```

## 🎯 What to Test

### Basic Flow
- [x] Button is visible and clickable
- [x] Modal opens smoothly
- [x] Can select a role
- [x] Progress indicator updates
- [x] Can click "Continue" to next step
- [x] Goals are filtered based on selected role
- [x] Can select a goal
- [x] Journey is generated with recommendations
- [x] Can click "Start My Journey" to close
- [x] State persists after page refresh

### Navigation
- [x] "Back" button works between steps
- [x] "Start Over" resets the flow
- [x] Close button (X) closes modal
- [x] Can re-open modal and see saved state
- [x] Clicking backdrop closes modal

### Visual Design
- [x] Responsive on mobile, tablet, desktop
- [x] Icons display correctly
- [x] Colors match role themes
- [x] Cards have hover effects
- [x] Selected items show checkmark
- [x] Progress bar animates

### Data
- [x] All 9 roles appear
- [x] Roles are grouped correctly
- [x] Goal filtering works per role
- [x] Different role+goal combinations show different journeys
- [x] Recommendations link to real pages
- [x] Next steps are relevant to the goal

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Build for production
npm run build

# Start development server
npm run dev

# Start production server
npm start
```

## 📝 Files Created

### Components
- `components/onboarding/OnboardingModal.tsx` - Main modal
- `components/onboarding/RoleSelector.tsx` - Step 1
- `components/onboarding/GoalSelector.tsx` - Step 2
- `components/onboarding/JourneyView.tsx` - Step 3
- `components/onboarding/index.ts` - Exports

### Library
- `lib/onboarding/types.ts` - TypeScript types
- `lib/onboarding/goals.ts` - 15 goals with metadata
- `lib/onboarding/journey-engine.ts` - Recommendation logic
- `lib/onboarding/store.ts` - Zustand state management
- `lib/onboarding/index.ts` - Exports

### Files Modified
- `app/page.tsx` - Added CTA button and modal

### Documentation
- `docs/ONBOARDING-FEATURE.md` - Complete feature documentation
- `roadmap/SPRINT-1-IMPLEMENTATION-SUMMARY.md` - Sprint summary
- `roadmap/onboarding-architecture.md` - Architecture diagrams
- `roadmap/QUICK-START.md` - This file

## 🎨 Customization

### Add a New Goal

```typescript
// lib/onboarding/goals.ts
export const GOALS: Record<Goal['id'], Goal> = {
  // ... existing goals
  'my-new-goal': {
    id: 'my-new-goal',
    title: 'My New Goal',
    description: 'What this goal helps you achieve',
    icon: '🎯',
    category: 'learn', // or 'design', 'evaluate', 'build'
    relevantRoles: ['ea', 'implementation'], // which roles can see this
    estimatedTime: '2-3 hours',
    difficulty: 'intermediate',
  },
}
```

### Add a New Journey Mapping

```typescript
// lib/onboarding/journey-engine.ts
const journeyMap: Record<string, { recs: Recommendation[]; steps: string[] }> = {
  // ... existing mappings
  'ea-my-new-goal': {
    recs: [
      {
        type: 'playground',
        title: 'Try This Playground',
        description: 'Interactive learning',
        url: '/playgrounds/some-playground',
        priority: 'primary',
        estimatedTime: '1 hour',
      },
    ],
    steps: [
      'First do this',
      'Then do that',
      'Finally complete it',
    ],
  },
}
```

### Add a New Persona

Personas are shared with the playground, so add them in:
```typescript
// lib/architecture-playground/constants.ts
export const PERSONA_PROFILES: Record<Persona, PersonaProfile> = {
  // ... existing personas
}
```

## 🚦 Next Steps (From Roadmap)

After Sprint 1, the roadmap suggests:

**Sprint 2: Identity & Persistence**
- Add user authentication
- Save journeys to backend
- Resume journey capability

**Sprint 3: AI Orchestration**
- AI-generated recommendations
- Dynamic journey creation
- Personalized content

**Sprint 4: Artifacts & Decisions**
- Generate architecture diagrams
- Track decisions
- Export capabilities

See [architecture-sprint-plan.md](./architecture-sprint-plan.md) for full roadmap.

## 💡 Tips

1. **Test different combinations**: Try different role + goal combinations to see varied journeys
2. **Check persistence**: Refresh the page to verify state is saved
3. **Mobile testing**: Resize browser to test responsive design
4. **Keyboard navigation**: Try Tab, Enter, Escape keys
5. **Link verification**: Click recommendations to verify they work

## 🎉 Success!

You've successfully implemented Sprint 1 of the personalized onboarding feature! The landing page now offers:
- ✅ All existing functionality preserved
- ✨ New personalized guidance flow
- 🎯 Role-based, goal-driven recommendations
- 💾 Persistent state across sessions
- 📱 Responsive, accessible design

Enjoy exploring the new feature!
