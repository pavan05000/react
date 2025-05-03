FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install styled-components
RUN npm install -g serve

#plugin issue fixed
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

COPY . .

ENV PORT=6002

RUN npm run build

EXPOSE 6002

CMD ["serve", "-s", "build", "-l", "6002"]
RUN npm run build

EXPOSE 6002

CMD ["serve", "-s", "build", "-l", "6002"]
