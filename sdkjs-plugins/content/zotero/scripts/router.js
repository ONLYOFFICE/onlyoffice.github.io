// @ts-check

function Router() {
    this._states = ["mainState", "loginState"];
    this._routes = ["main", "login"];
    /** @type {"main"|"login"} */
    this._currentRoute = "login";
    this._currentRouteIndex = 1;
    this._containers = this._states.map(function (route) {
        const container = document.getElementById(route);
        if (!container) throw new Error(`container ${route} not found`);
        return container;
    });
}

/** @returns {"main"|"login"} */
Router.prototype.getRoute = function () {
    return this._currentRoute;
};

/** @param {"main"|"login"} route */
Router.prototype._setCurrentRoute = function (route) {
    this._containers[this._currentRouteIndex].classList.add("hidden");
    this._currentRoute = route;
    this._currentRouteIndex = this._routes.indexOf(route);
    this._containers[this._currentRouteIndex].classList.remove("hidden");
};

Router.prototype.openMain = function () {
    this._setCurrentRoute("main");
};

Router.prototype.openLogin = function () {
    this._setCurrentRoute("login");
};
