FROM ghcr.io/puppeteer/puppeteer:latest

USER root

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (ignoring scripts to avoid immediate post-install builds that might fail)
RUN npm ci --omit=dev --ignore-scripts

# Copy source code
COPY . .

# Create auth directory structure with correct permissions
RUN mkdir -p .wwebjs_auth .wwebjs_cache && \
    chown -R pptruser:pptruser /app

# Switch to non-root user (provided by the image)
USER pptruser

# Expose port (if you add an API later, currently it's just a worker)
# EXPOSE 3000

# Start the server
CMD ["node", "src/index.js"]
