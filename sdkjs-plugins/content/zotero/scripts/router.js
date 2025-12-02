// @ts-check

function Router() {
    this._states = ["mainState", "configState"];
    this._routes = ["main", "config"];
    /** @type {"main"|"config"} */
    this._currentRoute = "config";
    this._currentRouteIndex = 1;
    this._containers = this._states.map(function (route) {
        const container = document.getElementById(route);
        if (!container) throw new Error(`container ${route} not found`);
        return container;
    });
}

/** @returns {"main"|"config"} */
Router.prototype.getRoute = function () {
    return this._currentRoute;
};

/** @param {"main"|"config"} route */
Router.prototype._setCurrentRoute = function (route) {
    this._containers[this._currentRouteIndex].classList.add("hidden");
    this._currentRoute = route;
    this._currentRouteIndex = this._routes.indexOf(route);
    this._containers[this._currentRouteIndex].classList.remove("hidden");
};

Router.prototype.openMain = function () {
    this._setCurrentRoute("main");
};

Router.prototype.openConfig = function () {
    this._setCurrentRoute("config");
};
