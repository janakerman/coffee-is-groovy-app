const compTripsAscending = (a, b) => a.time.getTime() - b.time.getTime();
const beforeNow = (trip) => (trip.time.getTime() - Date.now()) > 0;

export default class Trip {
  constructor(id, shop, time, buyer) {
    this.id = id;
    this.shop = shop;
    this.time = time;
    this.buyer = buyer;
  }

  isOpen() {
    return this.time.getTime() - Date.now()  >= 0;
  }

  timeUntil() {
    return (this.time.getTime() - Date.now()) / 1000;
  }

  compare(other) {
    return compTripsAscending(this, other);
  }
}

export const getNextTrip = (trips) => {
  if (!trips || trips.length == 0) {
    return null;
  }
  return trips.sort(compTripsAscending)
    .filter(beforeNow)[0];
}
