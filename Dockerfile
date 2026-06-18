# Official Playwright image — browsers and OS deps are preinstalled.
# Tag matches the Playwright version pinned in package-lock.json (1.61.0).
FROM mcr.microsoft.com/playwright:v1.61.0-noble

WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project.
COPY . .

# Credentials and target URL are provided at runtime (see README),
# e.g. `docker run --env-file .env ...`. Nothing secret is baked in.
CMD ["npm", "test"]
