# Bullet-Proof Next.js

This project is a scalable and modular Next.js boilerplate designed for production-ready applications. It includes best practices for maintainability, scalability, and developer experience.

## Features

-   **Modular Folder Structure**: Organized for easy feature-based scaling.
-   **TypeScript Support**: Ensuring type safety across the project.
-   **ESLint & Prettier**: Enforced coding standards.
-   **API Handling**: Custom hooks for API error and success handling.
-   **State Management**: Designed to support React Query or any other state management solution.
-   **CLI Tool**: For quickly generating a new project with this structure.

## Folder Structure

```
BULLET-PROOF-NEXT/
├── cli/                  # CLI tool for project scaffolding
├── docs/                 # Documentation files
│   ├── ADRs/             # Architectural Decision Records
│   └── 0001-folder-structure.md
├── public/               # Static assets
├── src/                  # Main source code
│   ├── app/              # Application setup and routing
│   │   ├── auth/         # Authentication pages
│   │   ├── private/      # Private routes
│   │   ├── public/       # Public routes
│   │   ├── layout.tsx    # Global layout
│   │   ├── globals.css   # Global styles
│   │   └── page.tsx      # Main entry page
│   ├── components/       # Reusable UI components
│   │   ├── features/     # Feature-specific components
│   │   ├── ui/           # Generic UI components
│   ├── config/           # Configuration files
│   │   ├── app/          # App-specific configs
│   │   ├── services/     # External services configurations
│   ├── contexts/         # Global context providers
│   ├── hooks/            # Custom React hooks
│   │   ├── api/          # API-related hooks
│   ├── lib/              # Shared utilities and libraries
│   │   ├── api/          # API client & handlers
│   │   │   ├── react-query.ts
│   │   │   ├── useApiErrorHandler.ts
│   │   │   ├── useApiSuccessHandler.ts
│   ├── stores/           # State management (e.g., Zustand, Redux)
│   ├── styles/           # Global and module styles
│   ├── tests/            # Testing setup (Jest, React Testing Library)
│   ├── types/            # TypeScript types
├── .pnpm-store/          # PNPM package manager store
├── .gitignore            # Git ignore file
├── .npmrc                # NPM configuration
├── eslint.config.mjs     # ESLint configuration
├── next-env.d.ts         # Next.js TypeScript environment settings
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── pnpm-lock.yaml        # PNPM lock file
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

-   Node.js (Latest LTS recommended)
-   PNPM (Recommended) or NPM/Yarn

### Installation

```sh
npx generate-bullet-proof-next my-app
cd my-app
pnpm install
pnpm dev
```

## CLI Tool Usage

To generate a new Next.js project with this structure:

```sh
npx generate-bullet-proof-next my-app
```

Options:

-   `--no-eslint` → Disable ESLint
-   `--no-api` → Exclude API handlers
-   `--state <store>` → Choose a state management tool (redux, zustand, recoil)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License.
