FROM node:14
WORKDIR /app
COPY ["./web2backend/package.json", "./web2backend/package-lock.json", "./"]
RUN npm install
COPY ["./client/smart-waterloo-web", "./client"]
COPY ["./web2backend", "./backend"]
WORKDIR /app/client
RUN npm install
RUN npm run build
WORKDIR /app
ENV PORT=8006
EXPOSE 8006
CMD ["npm", "start"]