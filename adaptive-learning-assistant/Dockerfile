# Stage 1: Build the React frontend
FROM node:18 AS build-stage
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Setup the Node.js backend
FROM node:18-slim
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install --only=production
COPY server/ ./server/
COPY --from=build-stage /app/client/dist ./client/dist

EXPOSE 8080
WORKDIR /app/server
CMD ["node", "index.js"]
