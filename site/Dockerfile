# Build the static site, then serve it with nginx. Works on Coolify (Dockerfile build pack),
# any container host, or locally: `docker build -t agent-hub-site . && docker run -p 8080:80 agent-hub-site`
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# base defaults to "/" — correct when served at a domain root (Coolify / custom domain).
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
