export default class Timer {

  constructor($parent) {
    this._root = this._initDOM($parent);
  }

  set time(time) {
    this._time = time;
    this._render(this._time);
  }

  _initDOM($parent) {
    this._root = $('<span>').text('00:00:00');
    $parent.append(this._root)
    return this._root;
  }

  _render(t) {
    const integerFormatter = Intl.NumberFormat("latn", {
      minimumIntegerDigits: 2
    });

    const seconds = integerFormatter.format(Math.floor(t % 60));
    const minutes = integerFormatter.format(Math.floor((t / 60) % 60));
    const hours = integerFormatter.format(Math.floor((t / 60 / 60)));

    this._root.text(`${hours}:${minutes}:${seconds}`);
  }
}
