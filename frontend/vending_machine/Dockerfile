FROM oven/bun

COPY . /vending_machine
WORKDIR /vending_machine
RUN bun install
# RUN bun build

ENV PORT=8000
ENV HOSTNAME=0.0.0.0

CMD ["bun", "dev"]
