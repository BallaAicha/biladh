# WelcomeSection Component

A modern, animated welcome header component for the application dashboard.

## Features

- **Time-based greeting**: Dynamically changes between "Bonjour", "Bon après-midi", and "Bonsoir" based on the time of day
- **Animated background elements**: Floating gradient blobs and particles create a dynamic, engaging background
- **Responsive design**: Adapts beautifully to different screen sizes
- **Interactive elements**: Buttons with hover and tap animations
- **Modern search interface**: Integrated search with quick access buttons
- **User activity indicators**: Shows active users on the platform

## Props

| Prop | Type | Description |
|------|------|-------------|
| user | `{ givenname?: string }` | Optional user object containing the user's given name |

## Usage

```jsx
import WelcomeSection from './components/WelcomeSection';

// Example with user object
const MyPage = () => {
  const user = {
    givenname: "Thomas",
    // other user properties...
  };

  return (
    <div>
      <WelcomeSection user={user} />
      {/* Rest of your page content */}
    </div>
  );
};

// Example without user (falls back to default text)
const LoginPage = () => {
  return (
    <div>
      <WelcomeSection />
      {/* Login form */}
    </div>
  );
};
```

## Customization

The component uses Tailwind CSS classes for styling. You can customize the appearance by modifying the following:

- Background gradient: `bg-gradient-to-r from-indigo-700 via-purple-700 to-primary-800`
- Button colors: `bg-gradient-to-r from-primary-600 to-primary-700`
- Text colors and sizes
- Animation parameters in the component code

## Dependencies

- React
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS for styling