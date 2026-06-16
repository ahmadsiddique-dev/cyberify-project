# CYBERIFY DESK

> Cyberify desk is a ticket system that helps people/Organization to manage their client queries by providing a Help Center

This App is divided into Two Sections

1. Full Stack Nextjs Application
2. Nodejs Server for RAG implementation

Clone this from github
```git
git clone https://github.com/ahmadsiddique-dev/cyberify-project
```

## Full Stack Nextjs Application Setup

So First lets setup Nextjs Project
1. Change Directory
```bash
cd cyberifydesk
```

2. install packages
```bash
pnpm i
```

3. you can go to `.env.example` and make it `.env` and fill the fields


```bash
RESEND_API_KEY=REPLACE_WITH_YOUR_RESEND_API_KEY
MONGODB_URI=REPLACE_WITH_YOUR_MONGODB_URI
DESKRAG_URI=This_is_Backend_url
JWT_SECRET=cyberifydesk_secret_key_1234567890
ACCESS_TOKEN_SECRET=just_put_any_string_you_have
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=ah_you_know_what_to_put_here
REFRESH_TOKEN_EXPIRY=7d
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GOOGLE_GENERATIVE_AI_API_KEY_HERE
```
### How to run

- Run dev server

```bash
pnpm run dev
```

 
## Nodejs Server for RAG implementation

Have another terminal

1. Change directory
```bash
cd deskrag
```

2. Install packages
```bash
pnpm i
```

3. Thanks to Docker you can run 
```bash
docker compose up -d
```

Now here you need these environment variable. Btw you can use `.env.example` here as well

```bash
# tbh I might replace it
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
OPENROUTER_API_KEY=YEH_YOUR_OPENROUTER_API_KEY_HERE
ALLOWED_ORIGIN=FRONTEND_URI
# This is being sent with request to validate. Just keep it like that.
DESKRAG_API_KEY=Ahmad$417 

```

4. Now run nodejs server
```bash
pnpm run dev
```
5. Now open another terminal
```bash
pnpm run dev:worker
```


Mazy karoo