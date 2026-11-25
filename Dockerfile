FROM node:22-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=8000 \
    PERSISTENCE_TYPE=sequelize \
    DB_STORAGE=/data/database.sqlite

VOLUME /data
EXPOSE 8000
CMD ["node", "index.js"]