# Test app

## API Docs

http://localhost:8000/docs

## Setup development

```bash
cp .env.sample .env # Make local .env file from sample
npm i # Install dependencies
npm run migrate # Run database migrations
npx prisma generate # Update current prisma schema
```

## Run client

```bash
npm start
```

## Run server

```bash
npm start:server
```
