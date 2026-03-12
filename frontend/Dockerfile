# frontend/Dockerfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npi ci
COPY . .
RUN npm run build

FROM ngnix:apline
COPY --from=builder /app/dist /usr/share/ngnix/html
COPY ngnix.conf /etc/ngnix/conf.d/default/conf
EXPOSE 80