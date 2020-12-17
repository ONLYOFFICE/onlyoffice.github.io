/**
 *
 * var loader = showLoader(document.getElementById("parent-id"))
 * loader.remove()
 *
 * parent must have position: relative
 */
showLoader = function (parent, text) {
    var loader = $('<div class="asc-plugin-loader" ><div class="asc-loader-image"></div><div class="asc-loader-title">' + (text || 'Loading') + '</div></div>');
    $(parent).append(loader);
    return loader;
};