# stationf

> (Reservation for StationF)

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Used Tech and stack

I used VueJs and bootstrap-vue for the frontend, axios to the CRUD operations and communication with the RestAPI.
Node with express, and mongoose for the server side and ATLAS Mongodb as a database.

#### Site description:

- This site is used basically for managing rooms reservations in the begist startups compus the "Station F compus", when the user find his room after choose one filter, he must choose a date and a time to confirm and submit his room, date and time changes are watched with 'watch function' in the vuejs logic treatement and the rooms list will be updated in realtime whith a gived date and time to eliminate rooms that are reserved.
- Using CSS with bootstrap-vue to custom some bootstrap features.
- Rest API is the simplest part in our site we call this api two times :
  -When submetting a room.
  -When the user fixes date and time.
  -POST for submetting, GET for find rooms in a given time and date.
- Axios to transform CRUD user requests

##### Thank You

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
