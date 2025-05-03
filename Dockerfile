FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps && \
    npm install styled-components && \
    npm install -g serve && \
    npm install --save-dev @babel/plugin-proposal-private-property-in-object && \
    npx update-browserslist-db@latest --update-db --no-git

COPY . .

ENV PORT=6002

RUN npm run build

EXPOSE 6002

CMD ["serve", "-s", "build", "-l", "6002"]
