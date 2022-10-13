FROM node:14.17-buster-slim as builder

WORKDIR /freecash

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN npm ci --ignore-scripts

COPY src src

RUN npm run build

FROM node:14.17-buster-slim as release

WORKDIR /freecash

RUN addgroup --gid 1001 --system freecash && \
    adduser --system --uid 1001 --gid 1001 freecash && \
    chown -R freecash:freecash /freecash

COPY --chown=freecash --from=builder /freecash/package.json package.json
COPY --chown=freeca`sh --from=builder /freecash/node_modules node_modules
COPY --chown=freecash --from=builder /freecash/dist dist

USER 1001:1001

CMD ["node", "dist/src/http-server"]
