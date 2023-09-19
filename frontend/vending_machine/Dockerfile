FROM node:lts-slim

RUN corepack enable pnpm

COPY . /vending_machine
WORKDIR /vending_machine
RUN pnpm install
# RUN bun build

ENV PORT=8000
ENV HOSTNAME=0.0.0.0

CMD ["pnpm", "dev"]
