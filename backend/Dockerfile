FROM node:20

WORKDIR /app

# Copy only package.json and package-lock.json to optimize Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma and application files into the container
COPY prisma ./prisma
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port
EXPOSE 4000

# Run Prisma migrations and then start the application
CMD ["sh", "-c", "npx prisma db push && npm start"]
