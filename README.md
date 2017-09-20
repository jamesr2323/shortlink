# Simple Link Shortener

A Redis-backed microservice that provides shortened URLs, to be hosted on your own infrastructure. Use when you need a high volume of shortened links but don't need the extra features that come with bit.ly or rebrand.ly.

# Install

```
npm install --save
npm run dev
```

# Dependencies

Redis - specify REDIS_URL if it's not the default localhost:5432

# ENV variables

Put these in a file .env in the root
APP_URL=The prefix that goes in front of the generated slugs
AUTH_TOKEN=The token applications using the service should provide to authenticate
REDIS_URL=URL to your Redis instance