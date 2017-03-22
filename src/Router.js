class Router {

  constructor(root, stateMap) {
    this._root = root;
    this._stateMap = stateMap;
    window.addEventListener('hashchange', this.updateForCurrent.bind(this));
    this.updateForCurrent();
  }

  updateForCurrent() {
    this.update(this._stateFromUrl(window.location.href));
  }

  update(state) {
    if (this._currentVm) {
      this._currentVm.tearDown();
    }

    this._root.empty();

    const stateInfo = this._stateMap[state];
    if (!stateInfo) {
      return;
    }

    const templateUrl = stateInfo.templateUrl;
    const VmClass = stateInfo.vmClass;

    this._root.load(templateUrl, null, () => {
      this._currentVm = new VmClass(this._root);
    });
  }

  _stateFromUrl(url) {
    const split = url.split('#');

    if (split.length == 1) {
      return null;
    }

    return split.slice(1).join('');
  }

}

export default Router;
