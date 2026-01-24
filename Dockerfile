# Use Node.js 24-slim image
FROM node:24-slim

# Set working directory
WORKDIR /app

# Build-time environment variables
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_CHATBOT_API_URL
ARG NEXT_PUBLIC_BASE_API_URL
ARG NEXT_PUBLIC_FLORIDA_YACHT_TRADER_URL

# Convert ARG → ENV (needed for Next.js build)
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_CHATBOT_API_URL=$NEXT_PUBLIC_CHATBOT_API_URL
ENV NEXT_PUBLIC_BASE_API_URL=$NEXT_PUBLIC_BASE_API_URL
ENV NEXT_PUBLIC_FLORIDA_YACHT_TRADER_URL=$NEXT_PUBLIC_FLORIDA_YACHT_TRADER_URL

# Install system dependencies
RUN apt update && apt install -y curl

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start"]
