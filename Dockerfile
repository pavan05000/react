FROM node:22.13.1-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install styled-components
RUN npm install -g serve 

# Copy entire app source
COPY . .

# Set the environment variable for the port
ENV PORT=6002

# Build the React app for production
RUN npm run build

# Expose the port
EXPOSE 6002

# Serve the production build using "serve"
CMD ["serve", "-s", "build", "-l", "6002"]
