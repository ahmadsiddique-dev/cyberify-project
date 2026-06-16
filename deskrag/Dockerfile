FROM node:20-alpine

RUN npm install -g pnpm@10.33.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN mkdir -p uploads

EXPOSE 7000

CMD ["node", "index.js"]
