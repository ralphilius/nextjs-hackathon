# NextJS Hackathon Starter
A boilerplate for NextJS application with Typescript support

Getting Started
--------

First, set up environment variables:

```bash
npm run setup
# or
yarn setup 
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Features
--------

 - **Typescript** support
 - **TailwindCSS** for styling with utility-first classes
 - Authentication with Supabase or Firebase
    - Email/password or passwordless with magic link
    - Multiple providers: Google, Facebook, Twitter, Github, Discord,...
 - **SWR** for data fetching
 - **NProgress** for page transition progress indicator
 - Custom 404, 403 pages
 - Handful React Hooks
   - `useAuth` for getting user information
   - `useInterval` for for timeout tasks
 - **envdist** to set up environment variables
 - Multiple icons with **Heroicons**