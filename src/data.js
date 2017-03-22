import $ from 'jquery';
import Trip from './Trip';
import Person from './Person';

const host = 'http://localhost:8080'; // I know!
const tripStore = new Map();// Cache!

const get = (path) => {
  return $.ajax(`${host}${path}`);
}

const parseTrip = (trip) => {
  const buyer = new Person(trip.buyer.id, trip.buyer.firstName, trip.buyer.lastName);
  return new Trip(trip.id, trip.shop, new Date(trip.time), buyer);
}

const cacheTrips = (trips) => {
  tripStore.clear();
  trips.forEach(trip => tripStore.set(trip.id, trip));
  return trips;
}

class DataService {

  getOpenTrips() {
    return get(`/trips`)
      .then(tripsData => tripsData.map(parseTrip))
      .then(cacheTrips);
  }

}

const data = new DataService();

export default data;
