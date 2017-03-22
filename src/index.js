import $ from 'jquery';
import data from './data';
import {getNextTrip} from './Trip';
import Timer from './Timer';
import {getFullName} from './Person';

const timer = new Timer($('.next-countdown'));
let renderTimer;


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

const render = (trips) => {
  // nextTrip && renderTimer(nextTrip.timeUntil());
  updateVisibility(trips);
  renderOpenTable(trips);

  const nextTrip = getNextTrip(trips);
  if (!nextTrip) {
    return;
  }
  timer.time = nextTrip.timeUntil();
}

data.getOpenTrips().then((trips) => {
  render(trips);
  renderTimer = setInterval(() => {
    render(trips);
  }, 1000);
});
