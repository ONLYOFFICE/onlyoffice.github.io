# Dictionary sources

The frequency lists are adapted from the Leipzig Corpora Collection, Leipzig
University ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
English and Russian also use the 2018 English and Russian 50k lists by Hermit Dave
from [FrequencyWords](https://github.com/hermitdave/FrequencyWords), derived from
OpenSubtitles2018. The resulting English and Russian lists are distributed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
The Kazakh list is distributed under CC BY 4.0.

- English — [eng_news_2024_300K](https://downloads.wortschatz-leipzig.de/corpora/eng_news_2024_300K.tar.gz), [eng_news_2023_300K](https://downloads.wortschatz-leipzig.de/corpora/eng_news_2023_300K.tar.gz)
- Russian — [rus_news_2024_300K](https://downloads.wortschatz-leipzig.de/corpora/rus_news_2024_300K.tar.gz), [rus_news_2023_300K](https://downloads.wortschatz-leipzig.de/corpora/rus_news_2023_300K.tar.gz)
- Kazakh — [kaz_news_2020_30K](https://downloads.wortschatz-leipzig.de/corpora/kaz_news_2020_30K.tar.gz), [kaz_wikipedia_2021_300K](https://downloads.wortschatz-leipzig.de/corpora/kaz_wikipedia_2021_300K.tar.gz), [kaz_wikipedia_2016_300K](https://downloads.wortschatz-leipzig.de/corpora/kaz_wikipedia_2016_300K.tar.gz)

Adaptations: lowercase, retain single words of at least four letters in the
respective alphabet, merge case variants, combine normalized frequencies,
rank by frequency, and retain up to 150,000 words per language.

Reference: Dirk Goldhahn, Thomas Eckart, and Uwe Quasthoff, *Building Large
Monolingual Dictionaries at the Leipzig Corpora Collection: From 100 to 200
Languages*, LREC 2012. [Paper](https://aclanthology.org/L12-1154/)

## Spelling dictionaries and engine

The unmodified `.aff` and `.dic` files in `dictionaries/hunspell/` are from
ONLYOFFICE Desktop Editors 10.0.0.169. Source files are available in the
[ONLYOFFICE dictionaries repository](https://github.com/ONLYOFFICE/dictionaries).
The English license files and the Russian and Kazakh dictionary notices are
included with each dictionary.

The WebAssembly engine is distributed via
[hunspell-asm 4.0.2](https://github.com/kwonoj/hunspell-asm/tree/v4.0.2).
The [Hunspell source code](https://github.com/hunspell/hunspell) and the
[WebAssembly build sources](https://github.com/kwonoj/docker-hunspell-wasm)
are available upstream. Hunspell is distributed under GNU LGPL v3, using its LGPL 2.1-or-later option.
See `licenses/Hunspell.license` and `3rd-Party.txt`. The JS bindings and
[emscripten-wasm-loader 3.0.3](https://www.npmjs.com/package/emscripten-wasm-loader/v/3.0.3)
use MIT. Nano ID's license is in `licenses/NanoID.license`.
