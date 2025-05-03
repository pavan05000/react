FROM node:18

WORKDIR /app

# Copy only package.json and lock first for caching
COPY package.json package-lock.json ./

# Use legacy-peer-deps and skip audit fix (DO NOT auto-fix in production builds)
RUN npm install --legacy-peer-deps

# Then copy the rest of the code
COPY . .

# Build React app
RUN npm run build

# Optional: Serve using `serve`
RUN npm install -g serve

CMD ["serve", "-s", "build"]
