FROM node
WORKDIR /usr/
COPY ./dist/ .
COPY ./backend/ .
RUN cd backend && npm install 

CMD ["node", "./backend/index.js"]