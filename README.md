# Marketplace Frontend

A modern marketplace application built with Next.js, TypeScript and HeroUI.

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: HeroUI
- **Authentication**: NextAuth.js
- **State Management**: Redux
- **Linting**: ESLint
- **Code Formatting**: Prettier

## Project Structure

```
marketplace/
├── app/                # Next.js app directory (pages and layouts)
├── components/         # Reusable React components
├── config/            # Configuration files
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and shared logic
├── public/            # Static assets
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── utils/             # Helper functions
```

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/fabiangzvo/marketplace-front.git
cd marketplace-front
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**
   Copy the example environment file and modify it according to your needs:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configurations:

| Variable              | Description                 | Default Value           |
| --------------------- | --------------------------- | ----------------------- |
| `NEXTAUTH_SECRET`     | Secret key for NextAuth.js  | -                       |
| `NEXTAUTH_URL`        | Base URL for authentication | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API endpoint        | `http://localhost:4000` |

4. **Run the development server**

```bash
pnpm dev
```

#### 5. Production Mode

```bash
pnpm build && pnpm start
```

### 6. Linting

```bash
pnpm lint
```
