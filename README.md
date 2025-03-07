
# World's Most Annoying Login

A deliberately frustrating login experience that showcases various UI/UX anti-patterns. This project is designed to demonstrate what NOT to do when creating user interfaces, while being entertaining at the same time.

## Implemented Anti-Patterns & Dark Patterns

This project intentionally implements several anti-patterns and dark patterns:

1. **Moving Targets**: The login form moves away when users try to interact with it
2. **Random Distractions**: Floating emojis and objects cluttering the screen
3. **Impossible CAPTCHAs**: 
   - Mathematical problems that change before you can solve them
   - A gorilla that must catch a moving banana
   - Spinning, blurry images that are difficult to identify
4. **Absurd Validation Rules**: Password requirements that are impossible to satisfy
5. **Cursor Hijacking**: Occasionally takes control of the user's cursor
6. **Intrusive Pop-ups**: System update notifications and error messages that interrupt the user
7. **Fake Progress Bars**: Progress indicators that never complete
8. **Time Pressure**: A countdown timer forcing rushed decisions
9. **Misleading Feedback**: Unhelpful, nonsensical error messages
10. **Excessive Animation**: Everything moves, shakes, rotates, or bounces
11. **Comic Sans Font**: The universal sign of unprofessionalism
12. **Sensory Overload**: Random sounds play at unexpected times
13. **Low Success Rate**: Only a 20% chance of successful login, regardless of input

## Rationale

This project serves as:

1. **Educational Tool**: Demonstrates what to avoid in UI/UX design
2. **Comic Relief**: Provides entertainment through deliberate frustration
3. **UX Awareness**: Highlights the importance of user-friendly interfaces
4. **Pattern Recognition**: Makes dark patterns more recognizable by exaggerating them


## Tech Stack

- **React**: UI library for component-based architecture
- **TypeScript**: For type safety and better developer experience
- **Vite**: Fast build tooling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: For page navigation
- **Supabase**: For backend integration and data storage (connected but not actively used in this demo)

## Components Breakdown

- **AnnoyingLogin**: Main container for the login experience
- **MovingForm**: Login form that escapes the cursor
- **HellishCaptcha**: Three different impossible CAPTCHAs
- **FloatingDistractions**: Random floating elements that distract the user
- **ErrorMessages**: Popup error messages with unhelpful content
- **SuccessMessage**: Celebration screen shown if login succeeds


