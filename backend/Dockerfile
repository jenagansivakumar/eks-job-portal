FROM --platform=linux/arm64/v8 node:20.18.0 as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM --platform=linux/arm64/v8 node:20.18.0
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "start"] 