# =========================
# 1) Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time env for Vite
ARG VITE_API_URL
ARG VITE_ADMIN_API_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ADMIN_API_URL=$VITE_ADMIN_API_URL

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source
COPY . .

# Build Vite app
RUN npm run build


# =========================
# 2) Run stage (Nginx)
# =========================
FROM nginx:stable-alpine

# SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]