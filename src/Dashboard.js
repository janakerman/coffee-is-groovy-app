import data from './data';
import {getNextTrip} from './Trip';
import Timer from './Timer';
import {getFullName} from './Person';

const createOpenTripRow = (trip, isNext) => {
  const column = (text) => $('<td>').text(text).addClass('text-center');

  const row = $('<tr>').append([
    column(trip.shop.name),
    column(trip.time.toLocaleTimeString()),
    column(getFullName(trip.buyer))
  ]);
  !trip.isOpen() && row.addClass('danger');
  isNext && row.addClass('success');
  return row;
}

const renderOpenTable = (trips) => {
  const newRows = trips.sort((a ,b) => a.compare(b))
    .map((trip) => {
      const isNext = getNextTrip(trips) === trip;
      return createOpenTripRow(trip, isNext);
    });
  const table = $('.open-trips tbody');
  table.empty();
  table.append(newRows);
};

const updateVisibility = (trips) => {
  let isTrips = trips && trips.length;

  isTrips && $('.next-countdown').removeClass('hidden');
  isTrips && $('.open-trips table').removeClass('hidden');
  !isTrips && $('.open-trips .no-open-info').removeClass('hidden');

  renderOpenTable(trips);
}

class Dashboard {
  constructor() {
    this.timer = new Timer($('.next-countdown'));

    data.getOpenTrips().then((trips) => {
      this.render(trips);
      this.renderTimer = setInterval(() => {
        this.render(trips);
      }, 1000);
    });
  }

  render(trips) {
    updateVisibility(trips);
    renderOpenTable(trips);

    const nextTrip = getNextTrip(trips);
    if (!nextTrip) {
      return;
    }
    this.timer.time = nextTrip.timeUntil();
  }

  tearDown() {
    clearInterval(this.renderTimer);
  }
}

export default Dashboard;
