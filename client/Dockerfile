FROM node:13.12.0-alpine



WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

# Install dependencies
RUN npm install

# Build the React app
# RUN npm run build

CMD ["npm", "start"]