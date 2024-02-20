FROM node:13.12.0-alpine



# WORKDIR /app

COPY public/ /public
COPY src/ /src
COPY package.json /

# Install dependencies
RUN npm install 

# Build the React app
# RUN npm run build

CMD ["npm", "start"]