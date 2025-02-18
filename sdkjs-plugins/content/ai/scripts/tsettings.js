const langs = [
    {"English": ""},
    {"Русский": "Russian"},
    {"Deutsch": "German"},
    {"Français": "French"},
    {"Español": "Spanish"},
    {"Slovenčina": "Slovak"},
];

function fillLangs(array) {
    const $list = $('#idx-lang-list');

    let currLang;
    if ( window.localStorage ) {
        currLang = window.localStorage.getItem(window.localStorageKey);
    }

    array.forEach(element => {
        const key = Object.keys(element)[0];
        const value = Object.values(element)[0];
        const $item = $(`<div class='list-item'>
                        <span>${key}</span>
                        <span lang>${value}</span>
                    </div>`);
        if ( !!currLang && currLang == value )
            $item.addClass('selected');

        $list.append($item);
    });

    $list.on('click', '.list-item', e => {
        const $target = $(e.currentTarget);

        $('.list-item', $target.parent()).removeClass('selected');
        $target.addClass('selected');

        const v = $('[lang]', e.currentTarget).text();
        console.log('lang item click', v);
    });
}

function getSelectedLang() {
    const $list = $('#idx-lang-list');
    const $selectd = $('.list-item.selected', $list);
    return $('[lang]', $selectd).text();
}

fillLangs(langs);