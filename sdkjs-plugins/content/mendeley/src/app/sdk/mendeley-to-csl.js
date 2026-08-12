    class MendeleyToCls {
        /**
         * @param {*} item 
         * @returns {SearchResultItem}
         */
        static transform(item) {
            if (item.citation_key) {
                item.id = item.citation_key;
                delete item.citation_key;
            }

            item.type = this._convertMendeleyTypeToCSLType(item.type);

            this._convertMendeleyWriter(item, "author", "authors");

            this._convertMendeleyWriter(item, "editor", "editors");
            this._convertMendeleyWriter(item, "collection-editor", "editors");
            this._convertMendeleyWriter(item, "container-author", "editors");

            this._convertMendeleyWriter(item, "collection-editor", "series_editor");
            this._convertMendeleyWriter(item, "container-author", "series_editor");

            this._convertMendeleyWriter(item, "translators", "translators");

            this._convertMendeleyDate(item, "issued");
            this._convertMendeleyDate(item, "event-date");

            if (item.revision || item.series_number) {
                item.number = item.revision || item.series_number;
                delete item.revision;
                delete item.series_number
            }

            if (item.series || item.source) {
                item["container-title"] = item.series || item.source;
                item["collection-title"] = item.series || item.source;
                delete item.series;
            }

            if (item.type == "patent" && item.source) {
                item.publisher = item.source;
            }
            delete item.source;

            if (item.identifiers) {
                if (item.identifiers.doi) item.DOI = item.identifiers.doi;
                if (item.identifiers.isbn) item.ISBN = item.identifiers.isbn;
                if (item.identifiers.issn) item.ISSN = item.identifiers.issn;
                if (item.identifiers.pmid) item.PMID = item.identifiers.pmid;
                delete item.identifiers;
            }

            if (item.keywords) {
                item.keyword = item.keywords.toString();
                delete item.keywords;
            }

            if (item.websites && item.websites.length > 0) {
                item.URL = item.websites[0];
                delete item.websites;
            }

            if (item.chapter) {
                item["chapter-number"] = item.chapter;
                delete item.chapter;
            }
            if (item.city) {
                item["event-place"] = item.city;
                item["publisher-place"] = item.city;
                delete item.city;
            }
            if (item.short_title) {
                item["short-title"] = item.short_title;
                delete item.short_title;
            }

            return item;
        }
        
        /** @param {string} str */
        static _convertMendeleyTypeToCSLType(str) {
            str = str.toLowerCase();
            switch (str) {
                case "bill":
                case "book":
                case "patent":
                case "report":
                case "statute":
                case "thesis":
                    return str;
                case "book_section":
                    return "chapter";
                case "conference_proceedings":
                    return "paper-conference";
                case "encyclopedia_article":
                    return "entry-encyclopedia";
                case "film":
                    return "motion_picture";
                case "hearing":
                    return "speech";
                case "journal":
                    return "article-journal";
                case "magazine_article":
                    return "article-magazine";
                case "newspaper_article":
                    return "article-newspaper";
                case "television_broadcast":
                    return "broadcast";
                case "web_page":
                    return "webpage";
                case "case":
                case "computer_program":
                case "generic":
                case "working_paper":
                default:
                    return "article";
            }
        }

        /**
         * @param {*} item 
         * @param {string} fieldTo 
         * @param {string} fieldFrom 
         * @returns 
         */
        static _convertMendeleyWriter(item, fieldTo, fieldFrom) {
            if (!item[fieldFrom] || item[fieldFrom].length <= 0) return;
            if (!item[fieldTo]) item[fieldTo] = [];

            for (let i = 0; i < item[fieldFrom].length; i++) {
                item[fieldTo].push({
                    given: item[fieldFrom][i].first_name,
                    family: item[fieldFrom][i].last_name
                });
            }
            delete item[fieldFrom];
        }

        /**
         * @param {*} item 
         * @param {string} field 
         * @returns 
         */
        static _convertMendeleyDate(item, field) {
            if (!item.year) return;

            var date = [item.year];
            delete item.year;

            if (item.month) {
                date.push(item.month);
                delete item.month;
                if (item.day) {
                    date.push(item.day);
                    delete item.day;
                }
            }

            item[field] = {
                "date-parts": [
                    date
                ]
            };
        }

    }

    export {MendeleyToCls};
    