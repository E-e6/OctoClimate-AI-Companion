# Contributing to OctoClimate 🐙

Thank you for your interest in contributing to OctoClimate! We're excited to have you help us build a better future for our planet through technology.

## 🌟 How to Contribute

### 🐛 Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Include detailed information**:
   - Steps to reproduce the bug
   - Expected behavior
   - Actual behavior
   - Browser and OS information
   - Screenshots or error messages if applicable

### 💡 Suggesting Features

1. **Check the roadmap** to see if it's already planned
2. **Open an issue** with the feature request template
3. **Describe the feature** clearly:
   - What problem does it solve?
   - How would it work?
   - Who would benefit from it?
   - Any design mockups or examples

### 🔧 Code Contributions

#### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/octoclimate-app.git
   cd octoclimate-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up Supabase** (see README.md for detailed instructions)
5. **Start the development server**:
   ```bash
   npm run dev
   ```

#### Making Changes

1. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Commit your changes** with clear messages:
   ```bash
   git commit -m "feat: add carbon footprint calculator"
   ```

#### Pull Request Process

1. **Update documentation** if needed
2. **Ensure tests pass** and add new tests for new features
3. **Follow the pull request template**
4. **Request review** from maintainers
5. **Address feedback** promptly and respectfully

## 📋 Coding Standards

### TypeScript & React

- **Use TypeScript** for all new code
- **Follow React best practices** and hooks patterns
- **Use functional components** with hooks
- **Implement proper error boundaries**
- **Use meaningful component and variable names**

### Code Style

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  carbonSaved: number;
}

const getUserProfile = async (userId: string): Promise<UserProfile> => {
  // Implementation
};

// ❌ Avoid
const getUserProfile = async (id) => {
  // Implementation without types
};
```

### Styling Guidelines

- **Use Tailwind CSS** for styling
- **Avoid custom CSS** when Tailwind utilities exist
- **Follow the design system** color palette (cyan/teal gradients)
- **Ensure responsive design** for all screen sizes
- **Maintain accessibility** standards (WCAG 2.1 AA)

### Component Structure

```typescript
// Recommended component structure
import React from 'react';
import { ComponentProps } from '../types';

interface Props extends ComponentProps {
  // Component-specific props
}

export function ComponentName({ prop1, prop2, ...props }: Props) {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Implementation
  };
  
  // Render helpers (if needed)
  const renderContent = () => {
    // Implementation
  };
  
  return (
    <div className="..." {...props}>
      {/* JSX */}
    </div>
  );
}
```

## 🧪 Testing Guidelines

### Unit Tests
- **Test components** in isolation
- **Mock external dependencies** (Supabase, APIs)
- **Test user interactions** and edge cases
- **Maintain high test coverage** (aim for 80%+)

### Integration Tests
- **Test component interactions**
- **Test data flow** between components
- **Test routing** and navigation

### Testing Best Practices
```typescript
// ✅ Good - Descriptive test names
describe('GetStarted Component', () => {
  it('should navigate to dashboard after completing onboarding', () => {
    // Test implementation
  });
  
  it('should validate required fields before allowing progression', () => {
    // Test implementation
  });
});
```

## 🗂️ Project Structure Guidelines

### File Organization
```
components/
├── ui/              # Reusable UI components (Shadcn/ui)
├── forms/           # Form-specific components
├── charts/          # Data visualization components
└── layout/          # Layout components

pages/               # Main application pages
├── GetStarted.tsx   # Onboarding flow
├── Dashboard.tsx    # Main dashboard
└── ...

utils/               # Utility functions
├── api/             # API helpers
├── calculations/    # Climate calculations
└── formatting/      # Data formatting helpers
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Files**: kebab-case for utilities (`carbon-calculator.ts`)
- **Folders**: kebab-case (`user-profile/`)
- **Constants**: UPPER_SNAKE_CASE (`CARBON_FACTORS`)
- **Functions**: camelCase (`calculateCarbonSavings`)

## 🎯 Focus Areas for Contributors

### High-Priority Areas
1. **Performance optimization** - Bundle size, loading times
2. **Accessibility improvements** - Screen readers, keyboard navigation
3. **Mobile responsiveness** - Touch interactions, small screens
4. **Test coverage** - Unit and integration tests
5. **Documentation** - Code comments, user guides

### Feature Ideas
1. **Social features** - Share achievements, team challenges
2. **Advanced analytics** - Trends, predictions, insights
3. **Gamification** - Streaks, leaderboards, challenges
4. **Integration** - Smart home devices, calendars, fitness apps
5. **Education** - Climate facts, tips, learning modules

## 🌍 Climate Impact Considerations

When contributing, consider:

- **Accuracy** of carbon calculations and climate data
- **Educational value** of features and content
- **User motivation** and behavior change psychology
- **Accessibility** to diverse user groups
- **Scalability** for global impact

## 📞 Getting Help

### Communication Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Email** - team@octoclimate.app for private matters

### Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🏆 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **Social media** shoutouts for major features
- **Special badges** in our community

## 🤝 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct:

### Our Standards
- **Be respectful** and inclusive
- **Be constructive** in feedback
- **Be patient** with newcomers
- **Be collaborative** in problem-solving

### Unacceptable Behavior
- Harassment or discrimination
- Offensive or inappropriate content
- Spam or promotional content
- Personal attacks or trolling

---

**Thank you for helping us build a more sustainable future! 🌱**

Every contribution, no matter how small, makes a difference in the fight against climate change.