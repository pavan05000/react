FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps && \
    npm install styled-components && \
    npm install --save-dev @babel/plugin-proposal-private-property-in-object && \
    npm install -g serve && \
    npx update-browserslist-db@latest --update-db --no-git

# Copy source and build
COPY . .
RUN npm run build

# Serve build on port 6002
EXPOSE 6002
CMD ["serve", "-s", "build", "-l", "6002"]
