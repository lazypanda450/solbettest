# Project Setup Instructions

### Initial Configuration

1. Rename `.env.example` to `.env`:
   - Locate the `.env.example` file at the root of the project.
   - Rename it to `.env`.
   - Open the `.env` file and fill in the necessary values as per your project's requirements.

2. Edit `config.ts`:
   - Navigate to the `config.ts` file in the project directory.
   - Update the configuration values to match your project settings or preferences.

### Installing Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Running the Development Server

To start the development server, use the following command:

```bash
npm run dev
```

This will start the server on [http://localhost:3000](http://localhost:3000) by default. Visit this URL in your browser to view your project.

### Deploying to Vercel

For deploying the project to Vercel, simply connect your GitHub repository to Vercel and follow the prompts to deploy your Next.js application.

Ensure that all environment variables in your `.env` file are also configured in your Vercel project settings.
