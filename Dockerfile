# =========================
# 1) Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install deps
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

# =========================
# 2) Run stage (Nginx)
# =========================
FROM nginx:stable-alpine

# Use our nginx config (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]