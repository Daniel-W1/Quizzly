# Quizzly

Collaborative exam-prep platform for university students. Browse and search a repository of past exams and quizzes, take them under timed sessions, review results, and contribute new tests to earn points.

## Features

- **Test library** – tests tagged by university, department, course, teacher, exam type (midterm, final, quiz, entrance, exit), year and difficulty.
- **Timed sessions** – attempt a test with a countdown, submit, and review a per-question result breakdown.
- **Search** – full-text search and autocomplete over the test catalog.
- **Contributions** – submit your own tests (with file uploads) for review; approved contributions earn points.
- **Profiles & activity** – public profiles with an activity heatmap and contribution history.
- **Auth** – email/password with verification and password reset, plus Google sign-in.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS + shadcn/ui · Prisma + PostgreSQL · NextAuth v5 · Zustand · UploadThing · Upstash Redis (rate limiting) · Nodemailer

## Getting started

```bash
npm install          # also runs `prisma generate`
npx prisma db push   # or `prisma migrate dev`
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env` file with:

```
DATABASE_URL=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
UPLOADTHING_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Production build         |
| `npm run start` | Serve the production app |
| `npm run lint`  | Run ESLint               |
