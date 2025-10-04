# 🐙 OctoClimate

A personal climate action companion that helps users track their environmental impact, get personalized recommendations, and build sustainable habits for a greener future.

![OctoClimate Banner](https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=1200&h=400&fit=crop&crop=center)

## ✨ Features

### 🎯 **Smart Onboarding**
- Interactive 4-step setup process
- Personalized goal selection (energy, transport, food, waste, water, shopping)
- Automatic recommendation generation based on user preferences

### 📊 **Impact Tracking**
- Real-time carbon footprint monitoring
- Beautiful data visualizations with interactive charts
- Progress tracking toward sustainability goals
- Octopus-themed impact visualization

### 🎯 **Personalized Actions**
- AI-powered recommendations tailored to your lifestyle
- Difficulty-based action categorization (easy, medium, hard)
- Frequency tracking (daily, weekly, monthly, one-time)
- Carbon savings estimation for each action

### 🏆 **Gamification**
- Achievement system with 5 tiers: First Step → Week Warrior → Eco Champion → Climate Hero → Earth Guardian
- Progressive unlocking based on total carbon saved
- Beautiful badge collection with meaningful milestones

### 💬 **AI Assistant**
- Intelligent chat widget for climate advice
- Contextual help and motivation
- Educational content about sustainability

### 🎨 **Beautiful UI/UX**
- Modern, responsive design with Tailwind CSS v4
- Gradient-based color scheme (cyan to teal)
- Smooth animations and transitions
- Mobile-optimized interface

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase (Database, Auth, Storage, Edge Functions)
- **Server**: Hono web framework on Deno
- **Notifications**: Sonner toasts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/E-e6/OctoClimate-AI-Companion.git
   cd OctoClimate-AI-Companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Update `/utils/supabase/info.tsx` with your project credentials
   - Deploy the edge functions from `/supabase/functions/server/`

4. **Configure environment variables**
   ```bash
   # Create .env.local file
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to see the app

## 📁 Project Structure

```
octoclimate-app/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Navigation.tsx  # Main navigation
│   ├── ChatWidget.tsx  # AI assistant
│   └── ...
├── pages/              # Main application pages
│   ├── GetStarted.tsx  # Onboarding flow
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Profile.tsx     # User profile
│   └── ...
├── context/            # React context providers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── supabase/           # Supabase configuration
└── styles/             # Global CSS and themes
```

## 🎯 Core Functionality

### User Journey
1. **Onboarding**: New users complete a 4-step setup process
2. **Goal Setting**: Users select their climate focus areas
3. **Action Taking**: Users complete recommended climate actions
4. **Progress Tracking**: Users monitor their impact and earn achievements
5. **Continuous Engagement**: AI assistant provides ongoing support and motivation

### Data Models
- **User Profiles**: Name, email, preferences, goals, carbon savings
- **Activities**: Completed climate actions with carbon impact
- **Recommendations**: Personalized action suggestions
- **Achievements**: Progressive milestone system

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Write meaningful commit messages
- Add comments for complex logic

## 📊 Database Schema

The app uses a flexible key-value store pattern with Supabase:
- `kv_store_d66871e6` table for data persistence
- User profiles, activities, and preferences stored as JSON
- Automatic relationship management through the app context

## 🔒 Security & Privacy

- User data is securely stored in Supabase
- No sensitive information is logged or exposed
- Email addresses are only used for account management
- All API calls are authenticated and rate-limited

## 🌍 Impact Goals

OctoClimate aims to:
- **Educate** users about climate action opportunities
- **Motivate** sustained behavior change through gamification
- **Track** real environmental impact
- **Build** a community of climate-conscious individuals
- **Simplify** the path to sustainable living

## 📈 Roadmap

- [ ] Social features and community challenges
- [ ] Integration with smart home devices
- [ ] Carbon offset marketplace
- [ ] Corporate team challenges
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and insights
- [ ] Partnerships with environmental organizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Supabase** for the robust backend infrastructure
- **Tailwind CSS** for the utility-first styling approach
- **Recharts** for the data visualization components
- **Lucide** for the clean, consistent icons

## 📞 Support

- 📧 Email: support@octoclimate.app
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/octoclimate-app/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/octoclimate-app/discussions)

---

**Made with 💚 for our planet's future**

*Join us in making climate action accessible, engaging, and impactful for everyone.*