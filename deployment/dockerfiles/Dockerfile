# Base image
FROM node:18-alpine AS base

# Create app directory
WORKDIR /app

# Install dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm ci --only=production
RUN cp -R node_modules /tmp/node_modules
RUN npm ci

# Build application
FROM dependencies AS build
COPY . .
RUN npm run build --if-present

# Production image
FROM base AS production
ENV NODE_ENV=production
COPY --from=dependencies /tmp/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/config ./config
COPY --from=build /app/package*.json ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "src/main.js"]