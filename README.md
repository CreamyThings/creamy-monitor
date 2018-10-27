# creamy-monitor
creamy-monitor simplifies monitoring of network-connected services.

# Setup

```bash
# install dependencies
npm install

# change config
cp .env.example .env
vi .env # edit it to your liking

# start the DB
docker-compose up

# migrate
npm run knex migrate:latest

# start local server
npm run start

# start local client
npm run serve

```
