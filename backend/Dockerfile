FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE 4040

CMD ["bun", "run", "index.ts"]


