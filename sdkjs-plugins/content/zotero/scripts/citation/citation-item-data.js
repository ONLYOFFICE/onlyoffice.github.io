// @ts-check

/**
 * @param {string|number} id
 */
function CitationItemData(id) {
    if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("CitationItemData: id is required");
    }

    this._id = id;
    this._type = undefined;
    this._citationKey = undefined;
    this._categories = new Array();
    this._language = undefined;
    this._journalAbbreviation = undefined;
    this._shortTitle = undefined;

    this._author = new Array();
    this._chair = new Array();
    this._collectionEditor = new Array();
    this._compiler = new Array();
    this._composer = new Array();
    this._containerAuthor = new Array();
    this._contributor = new Array();
    this._curator = new Array();
    this._director = new Array();
    this._editor = new Array();
    this._editorialDirector = new Array();
    this._executiveProducer = new Array();
    this._guest = new Array();
    this._host = new Array();
    this._illustrator = new Array();
    this._narrator = new Array();
    this._organizer = new Array();
    this._originalAuthor = new Array();
    this._performer = new Array();
    this._producer = new Array();
    this._recipient = new Array();
    this._reviewedAuthor = new Array();
    this._scriptwriter = new Array();
    this._seriesCreator = new Array();
    this._translator = new Array();
    this._accessed = {};
    this._container = {};
    this._eventDate = {};
    this._issued = {};
    this._originalDate = {};
    this._submitted = {};
    this._abstract = undefined;
    this._annote = undefined;
    this._archive = undefined;
    this._archiveCollection = undefined;
    this._archiveLocation = undefined;
    this._archivePlace = undefined;
    this._authority = undefined;
    this._callNumber = undefined;
    this._chapterNumber = undefined;
    this._citationNumber = undefined;
    this._citationLabel = undefined;
    this._collectionNumber = undefined;
    this._collectionTitle = undefined;
    this._containerTitle = undefined;
    this._containerTitleShort = undefined;
    this._dimensions = undefined;
    this._DOI = undefined;
    this._edition = undefined;
    this._event = undefined;
    this._eventTitle = undefined;
    this._eventPlace = undefined;
    this._firstReferenceNoteNumber = undefined;
    this._genre = undefined;
    this._ISBN = undefined;
    this._ISSN = undefined;
    this._issue = undefined;
    this._jurisdiction = undefined;
    this._keyword = undefined;
    this._locator = undefined;
    this._medium = undefined;
    this._note = undefined;
    this._number = undefined;
    this._numberOfPages = undefined;
    this._numberOfVolumes = undefined;
    this._originalPublisher = undefined;
    this._originalPublisherPlace = undefined;
    this._originalTitle = undefined;
    this._page = undefined;
    this._part = undefined;
    this._partTitle = undefined;
    this._pageFirst = undefined;
    this._PMCID = undefined;
    this._PMID = undefined;
    this._printing = undefined;
    this._publisher = undefined;
    this._publisherPlace = undefined;
    this._references = undefined;
    this._reviewedGenre = undefined;
    this._reviewedTitle = undefined;
    this._scale = undefined;
    this._section = undefined;
    this._source = undefined;
    this._status = undefined;

    this._title = undefined;
    this._titleShort = undefined;
    this._URL = undefined;
    this._version = undefined;
    this._volume = undefined;
    this._volumeTitle = undefined;
    this._volumeTitleShort = undefined;
    this._yearSuffix = undefined;
    this._custom = {};

    this.schema =
        "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}

/**
 * @param {"article"|"article-journal"|"article-magazine"|"article-newspaper"|"bill"|"book"|"broadcast"|"chapter"|"classic"|"collection"|"dataset"|"document"|"entry"|"entry-dictionary"|"entry-encyclopedia"|"event"|"figure"|"graphic"|"hearing"|"interview"|"legal_case"|"legislation"|"manuscript"|"map"|"motion_picture"|"musical_score"|"pamphlet"|"paper-conference"|"patent"|"performance"|"periodical"|"personal_communication"|"post"|"post-weblog"|"report"|"review"|"review-book"|"software"|"song"|"speech"|"standard"|"thesis"|"treaty"|"webpage"} type
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setType = function (type) {
    this._type = type;
    return this;
};

/**
 * @param {string} key
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCitationKey = function (key) {
    this._citationKey = key;
    return this;
};

/**
 * @param {Array<string>} categories
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCategories = function (categories) {
    this._categories = categories;
    return this;
};

/**
 * @param {string} language
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setLanguage = function (language) {
    this._language = language;
    return this;
};

/**
 * @param {string} journalAbbreviation
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setJournalAbbreviation = function (
    journalAbbreviation
) {
    this._journalAbbreviation = journalAbbreviation;
    return this;
};

/**
 * @param {string} shortTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setShortTitle = function (shortTitle) {
    this._shortTitle = shortTitle;
    return this;
};
/**
 * @param {Array<Object>} author
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setAuthor = function (author) {
    this._author = Array.isArray(author) ? author : [author];
    return this;
};
/**
 * @param {Array<Object>} chair
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setChair = function (chair) {
    this._chair = Array.isArray(chair) ? chair : [chair];
    return this;
};
/**
 * @param {Array<Object>} collectionEditor
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCollectionEditor = function (collectionEditor) {
    this._collectionEditor = Array.isArray(collectionEditor)
        ? collectionEditor
        : [collectionEditor];
    return this;
};
/**
 * @param {Array<Object>} compiler
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCompiler = function (compiler) {
    this._compiler = Array.isArray(compiler) ? compiler : [compiler];
    return this;
};
/**
 * @param {Array<Object>} composer
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setComposer = function (composer) {
    this._composer = Array.isArray(composer) ? composer : [composer];
    return this;
};
/**
 * @param {Array<Object>} containerAuthor
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setContainerAuthor = function (containerAuthor) {
    this._containerAuthor = Array.isArray(containerAuthor)
        ? containerAuthor
        : [containerAuthor];
    return this;
};
/**
 * @param {Array<Object>} contributor
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setContributor = function (contributor) {
    this._contributor = Array.isArray(contributor)
        ? contributor
        : [contributor];
    return this;
};
/**
 * @param {Array<Object>} curator
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCurator = function (curator) {
    this._curator = Array.isArray(curator) ? curator : [curator];
    return this;
};
/**
 * @param {Array<Object>} director
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setDirector = function (director) {
    this._director = Array.isArray(director) ? director : [director];
    return this;
};
/**
 * @param {Array<Object>} editor
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setEditor = function (editor) {
    this._editor = Array.isArray(editor) ? editor : [editor];
    return this;
};
/**
 * @param {Array<Object>} editorialDirector
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setEditorialDirector = function (editorialDirector) {
    this._editorialDirector = Array.isArray(editorialDirector)
        ? editorialDirector
        : [editorialDirector];
    return this;
};
/**
 * @param {Array<Object>} executiveProducer
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setExecutiveProducer = function (executiveProducer) {
    this._executiveProducer = Array.isArray(executiveProducer)
        ? executiveProducer
        : [executiveProducer];
    return this;
};
/**
 * @param {Array<Object>} guest
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setGuest = function (guest) {
    this._guest = Array.isArray(guest) ? guest : [guest];
    return this;
};
/**
 * @param {Array<Object>} host
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setHost = function (host) {
    this._host = Array.isArray(host) ? host : [host];
    return this;
};
/**
 * @param {Array<Object>} illustrator
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setIllustrator = function (illustrator) {
    this._illustrator = Array.isArray(illustrator)
        ? illustrator
        : [illustrator];
    return this;
};
/**
 * @param {Array<Object>} narrator
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setNarrator = function (narrator) {
    this._narrator = Array.isArray(narrator) ? narrator : [narrator];
    return this;
};
/**
 * @param {Array<Object>} organizer
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setOrganizer = function (organizer) {
    this._organizer = Array.isArray(organizer) ? organizer : [organizer];
    return this;
};
/**
 * @param {Array<Object>} originalAuthor
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setOriginalAuthor = function (originalAuthor) {
    this._originalAuthor = Array.isArray(originalAuthor)
        ? originalAuthor
        : [originalAuthor];
    return this;
};
/**
 * @param {Array<Object>} performer
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPerformer = function (performer) {
    this._performer = Array.isArray(performer) ? performer : [performer];
    return this;
};
/**
 * @param {Array<Object>} producer
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setProducer = function (producer) {
    this._producer = Array.isArray(producer) ? producer : [producer];
    return this;
};
/**
 * @param {Array<Object>} recipient
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setRecipient = function (recipient) {
    this._recipient = Array.isArray(recipient) ? recipient : [recipient];
    return this;
};
/**
 * @param {Array<Object>} reviewedAuthor
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setReviewedAuthor = function (reviewedAuthor) {
    this._reviewedAuthor = Array.isArray(reviewedAuthor)
        ? reviewedAuthor
        : [reviewedAuthor];
    return this;
};
/**
 * @param {Array<Object>} scriptwriter
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setScriptwriter = function (scriptwriter) {
    this._scriptwriter = Array.isArray(scriptwriter)
        ? scriptwriter
        : [scriptwriter];
    return this;
};
/**
 * @param {Array<Object>} seriesCreator
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setSeriesCreator = function (seriesCreator) {
    this._seriesCreator = Array.isArray(seriesCreator)
        ? seriesCreator
        : [seriesCreator];
    return this;
};
/**
 * @param {Array<Object>} translator
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setTranslator = function (translator) {
    this._translator = Array.isArray(translator) ? translator : [translator];
    return this;
};
/**
 * @param {Object} accessed
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setAccessed = function (accessed) {
    this._accessed = accessed || {};
    return this;
};
/**
 * @param {Object} container
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setContainer = function (container) {
    this._container = container || {};
    return this;
};
/**
 * @param {Object} eventDate
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setEventDate = function (eventDate) {
    this._eventDate = eventDate || {};
    return this;
};
/**
 * @param {Object} issued
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setIssued = function (issued) {
    this._issued = issued || {};
    return this;
};
/**
 * @param {Object} originalDate
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setOriginalDate = function (originalDate) {
    this._originalDate = originalDate || {};
    return this;
};
/**
 * @param {Object} submitted
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setSubmitted = function (submitted) {
    this._submitted = submitted || {};
    return this;
};
/**
 * @param {string} abstract
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setAbstract = function (abstract) {
    this._abstract = abstract;
    return this;
};
/**
 * @param {string} annote
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setAnnote = function (annote) {
    this._annote = annote;
    return this;
};
/**
 * @param {string} archive
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setArchive = function (archive) {
    this._archive = archive;
    return this;
};
/**
 * @param {string} archiveCollection
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setArchiveCollection = function (archiveCollection) {
    this._archiveCollection = archiveCollection;
    return this;
};
/**
 * @param {string} archiveLocation
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setArchiveLocation = function (archiveLocation) {
    this._archiveLocation = archiveLocation;
    return this;
};
/**
 * @param {string} archivePlace
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setArchivePlace = function (archivePlace) {
    this._archivePlace = archivePlace;
    return this;
};
/**
 * @param {string} authority
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setAuthority = function (authority) {
    this._authority = authority;
    return this;
};
/**
 * @param {string} callNumber
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCallNumber = function (callNumber) {
    this._callNumber = callNumber;
    return this;
};
/**
 * @param {"string"|"number"} chapterNumber
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setChapterNumber = function (chapterNumber) {
    this._chapterNumber = chapterNumber;
    return this;
};
/**
 * @param {"string"|"number"} citationNumber
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCitationNumber = function (citationNumber) {
    this._citationNumber = citationNumber;
    return this;
};
/**
 * @param {string} citationLabel
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCitationLabel = function (citationLabel) {
    this._citationLabel = citationLabel;
    return this;
};
/**
 * @param {"string"|"number"} collectionNumber
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCollectionNumber = function (collectionNumber) {
    this._collectionNumber = collectionNumber;
    return this;
};
/**
 * @param {string} collectionTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCollectionTitle = function (collectionTitle) {
    this._collectionTitle = collectionTitle;
    return this;
};
/**
 * @param {string} containerTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setContainerTitle = function (containerTitle) {
    this._containerTitle = containerTitle;
    return this;
};
/**
 * @param {string} containerTitleShort
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setContainerTitleShort = function (
    containerTitleShort
) {
    this._containerTitleShort = containerTitleShort;
    return this;
};
/**
 * @param {string} dimensions
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setDimensions = function (dimensions) {
    this._dimensions = dimensions;
    return this;
};
/**
 * @param {string} DOI
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setDOI = function (DOI) {
    this._DOI = DOI;
    return this;
};
/**
 * @param {"string"|"number"} edition
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setEdition = function (edition) {
    this._edition = edition;
    return this;
};
/**
 * @param {string} event
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setEvent = function (event) {
    this._event = event;
    return this;
};
/**
 * @param {string} eventTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setEventTitle = function (eventTitle) {
    this._eventTitle = eventTitle;
    return this;
};
/**
 * @param {string} eventPlace
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setEventPlace = function (eventPlace) {
    this._eventPlace = eventPlace;
    return this;
};
/**
 * @param {"string"|"number"} firstReferenceNoteNumber
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setFirstReferenceNoteNumber = function (
    firstReferenceNoteNumber
) {
    this._firstReferenceNoteNumber = firstReferenceNoteNumber;
    return this;
};
/**
 * @param {string} genre
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setGenre = function (genre) {
    this._genre = genre;
    return this;
};
/**
 * @param {string} ISBN
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setISBN = function (ISBN) {
    this._ISBN = ISBN;
    return this;
};
/**
 * @param {string} ISSN
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setISSN = function (ISSN) {
    this._ISSN = ISSN;
    return this;
};
/**
 * @param {"string"|"number"} issue
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setIssue = function (issue) {
    this._issue = issue;
    return this;
};
/**
 * @param {string} jurisdiction
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setJurisdiction = function (jurisdiction) {
    this._jurisdiction = jurisdiction;
    return this;
};
/**
 * @param {string} keyword
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setKeyword = function (keyword) {
    this._keyword = keyword;
    return this;
};
/**
 * @param {"string"|"number"} locator
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setLocator = function (locator) {
    this._locator = locator;
    return this;
};
/**
 * @param {string} medium
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setMedium = function (medium) {
    this._medium = medium;
    return this;
};
/**
 * @param {string} note
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setNote = function (note) {
    this._note = note;
    return this;
};
/**
 * @param {"string"|"number"} number
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setNumber = function (number) {
    this._number = number;
    return this;
};
/**
 * @param {"string"|"number"} numberOfPages
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setNumberOfPages = function (numberOfPages) {
    this._numberOfPages = numberOfPages;
    return this;
};
/**
 * @param {"string"|"number"} numberOfVolumes
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setNumberOfVolumes = function (numberOfVolumes) {
    this._numberOfVolumes = numberOfVolumes;
    return this;
};
/**
 * @param {string} originalPublisher
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setOriginalPublisher = function (originalPublisher) {
    this._originalPublisher = originalPublisher;
    return this;
};
/**
 * @param {string} originalPublisherPlace
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setOriginalPublisherPlace = function (
    originalPublisherPlace
) {
    this._originalPublisherPlace = originalPublisherPlace;
    return this;
};
/**
 * @param {string} originalTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setOriginalTitle = function (originalTitle) {
    this._originalTitle = originalTitle;
    return this;
};
/**
 * @param {"string"|"number"} page
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPage = function (page) {
    this._page = page;
    return this;
};
/**
 * @param {"string"|"number"} pageFirst
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPageFirst = function (pageFirst) {
    this._pageFirst = pageFirst;
    return this;
};
/**
 * @param {string} part
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPart = function (part) {
    this._part = part;
    return this;
};
/**
 * @param {string} partTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPartTitle = function (partTitle) {
    this._partTitle = partTitle;
    return this;
};
/**
 * @param {string} PMCID
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPMCID = function (PMCID) {
    this._PMCID = PMCID;
    return this;
};
/**
 * @param {string} PMID
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPMID = function (PMID) {
    this._PMID = PMID;
    return this;
};
/**
 * @param {string} printing
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPrinting = function (printing) {
    this._printing = printing;
    return this;
};
/**
 * @param {string} publisher
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPublisher = function (publisher) {
    this._publisher = publisher;
    return this;
};
/**
 * @param {string} publisherPlace
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setPublisherPlace = function (publisherPlace) {
    this._publisherPlace = publisherPlace;
    return this;
};
/**
 * @param {string} references
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setReferences = function (references) {
    this._references = references;
    return this;
};
/**
 * @param {string} reviewedGenre
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setReviewedGenre = function (reviewedGenre) {
    this._reviewedGenre = reviewedGenre;
    return this;
};
/**
 * @param {string} reviewedTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setReviewedTitle = function (reviewedTitle) {
    this._reviewedTitle = reviewedTitle;
    return this;
};
/**
 * @param {string} scale
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setScale = function (scale) {
    this._scale = scale;
    return this;
};
/**
 * @param {string} section
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setSection = function (section) {
    this._section = section;
    return this;
};
/**
 * @param {string} source
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setSource = function (source) {
    this._source = source;
    return this;
};
/**
 * @param {string} status
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setStatus = function (status) {
    this._status = status;
    return this;
};
/**
 * @param {string} title
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setTitle = function (title) {
    this._title = title;
    return this;
};
/**
 * @param {string} titleShort
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setTitleShort = function (titleShort) {
    this._titleShort = titleShort;
    return this;
};
/**
 * @param {string} URL
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setURL = function (URL) {
    this._URL = URL;
    return this;
};
/**
 * @param {string} version
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setVersion = function (version) {
    this._version = version;
    return this;
};
/**
 * @param {string|number} volume
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setVolume = function (volume) {
    this._volume = volume;
    return this;
};
/**
 * @param {string} volumeTitle
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setVolumeTitle = function (volumeTitle) {
    this._volumeTitle = volumeTitle;
    return this;
};
/**
 * @param {string} volumeTitleShort
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setVolumeTitleShort = function (volumeTitleShort) {
    this._volumeTitleShort = volumeTitleShort;
    return this;
};
/**
 * @param {string} yearSuffix
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setYearSuffix = function (yearSuffix) {
    this._yearSuffix = yearSuffix;
    return this;
};
/**
 * @param {Object} custom
 * @returns {CitationItemData}
 */
CitationItemData.prototype.setCustom = function (custom) {
    this._custom = Object.assign(this._custom, custom);
    return this;
};

CitationItemData.prototype.toJSON = function () {
    var result = {};
    result.id = this._id;

    if (this._type !== undefined) result.type = this._type;
    if (this._citationKey !== undefined)
        result["citation-key"] = this._citationKey;
    if (this._categories.length > 0) result.categories = this._categories;
    if (this._language !== undefined) result.language = this._language;
    if (this._journalAbbreviation !== undefined)
        result.journalAbbreviation = this._journalAbbreviation;
    if (this._shortTitle !== undefined) result.shortTitle = this._shortTitle;

    if (this._author.length > 0) result.author = this._author;
    if (this._chair.length > 0) result.chair = this._chair;
    if (this._collectionEditor.length > 0)
        result["collection-editor"] = this._collectionEditor;
    if (this._compiler.length > 0) result.compiler = this._compiler;
    if (this._composer.length > 0) result.composer = this._composer;
    if (this._containerAuthor.length > 0)
        result["container-author"] = this._containerAuthor;
    if (this._contributor.length > 0) result.contributor = this._contributor;
    if (this._curator.length > 0) result.curator = this._curator;
    if (this._director.length > 0) result.director = this._director;
    if (this._editor.length > 0) result.editor = this._editor;
    if (this._editorialDirector.length > 0)
        result["editorial-director"] = this._editorialDirector;
    if (this._executiveProducer.length > 0)
        result["executive-producer"] = this._executiveProducer;
    if (this._guest.length > 0) result.guest = this._guest;
    if (this._host.length > 0) result.host = this._host;
    if (this._illustrator.length > 0) result.illustrator = this._illustrator;
    if (this._narrator.length > 0) result.narrator = this._narrator;
    if (this._organizer.length > 0) result.organizer = this._organizer;
    if (this._originalAuthor.length > 0)
        result["original-author"] = this._originalAuthor;
    if (this._performer.length > 0) result.performer = this._performer;
    if (this._producer.length > 0) result.producer = this._producer;
    if (this._recipient.length > 0) result.recipient = this._recipient;
    if (this._reviewedAuthor.length > 0)
        result["reviewed-author"] = this._reviewedAuthor;
    if (this._scriptwriter.length > 0)
        result["script-writer"] = this._scriptwriter;
    if (this._seriesCreator.length > 0)
        result["series-creator"] = this._seriesCreator;
    if (this._translator.length > 0) result.translator = this._translator;

    if (Object.keys(this._accessed).length > 0)
        result.accessed = this._accessed;
    if (Object.keys(this._container).length > 0)
        result.container = this._container;
    if (Object.keys(this._eventDate).length > 0)
        result["event-date"] = this._eventDate;
    if (Object.keys(this._issued).length > 0) result.issued = this._issued;
    if (Object.keys(this._originalDate).length > 0)
        result["original-date"] = this._originalDate;
    if (Object.keys(this._submitted).length > 0)
        result.submitted = this._submitted;

    if (this._abstract !== undefined) result.abstract = this._abstract;
    if (this._annote !== undefined) result.annote = this._annote;
    if (this._archive !== undefined) result.archive = this._archive;
    if (this._archiveCollection !== undefined)
        result["archive_collection"] = this._archiveCollection;
    if (this._archiveLocation !== undefined)
        result["archive_location"] = this._archiveLocation;
    if (this._archivePlace !== undefined)
        result["archive-place"] = this._archivePlace;
    if (this._authority !== undefined) result.authority = this._authority;
    if (this._callNumber !== undefined)
        result["call-number"] = this._callNumber;
    if (this._chapterNumber !== undefined)
        result["chapter-number"] = this._chapterNumber;
    if (this._citationNumber !== undefined)
        result["citation-number"] = this._citationNumber;
    if (this._citationLabel !== undefined)
        result["citation-label"] = this._citationLabel;
    if (this._collectionNumber !== undefined)
        result["collection-number"] = this._collectionNumber;
    if (this._collectionTitle !== undefined)
        result["collection-title"] = this._collectionTitle;
    if (this._containerTitle !== undefined)
        result["container-title"] = this._containerTitle;
    if (this._containerTitleShort !== undefined)
        result["container-title-short"] = this._containerTitleShort;
    if (this._dimensions !== undefined) result.dimensions = this._dimensions;
    if (this._DOI !== undefined) result.DOI = this._DOI;
    if (this._edition !== undefined) result.edition = this._edition;
    if (this._event !== undefined) result.event = this._event;
    if (this._eventTitle !== undefined)
        result["event-title"] = this._eventTitle;
    if (this._eventPlace !== undefined)
        result["event-place"] = this._eventPlace;
    if (this._firstReferenceNoteNumber !== undefined)
        result["first-reference-note-number"] = this._firstReferenceNoteNumber;
    if (this._genre !== undefined) result.genre = this._genre;
    if (this._ISBN !== undefined) result.ISBN = this._ISBN;
    if (this._ISSN !== undefined) result.ISSN = this._ISSN;
    if (this._issue !== undefined) result.issue = this._issue;
    if (this._jurisdiction !== undefined)
        result.jurisdiction = this._jurisdiction;
    if (this._keyword !== undefined) result.keyword = this._keyword;
    if (this._locator !== undefined) result.locator = this._locator;
    if (this._medium !== undefined) result.medium = this._medium;
    if (this._note !== undefined) result.note = this._note;
    if (this._number !== undefined) result.number = this._number;
    if (this._numberOfPages !== undefined)
        result["number-of-pages"] = this._numberOfPages;
    if (this._numberOfVolumes !== undefined)
        result["number-of-volumes"] = this._numberOfVolumes;
    if (this._originalPublisher !== undefined)
        result["original-publisher"] = this._originalPublisher;
    if (this._originalPublisherPlace !== undefined)
        result["original-publisher-place"] = this._originalPublisherPlace;
    if (this._originalTitle !== undefined)
        result["original-title"] = this._originalTitle;
    if (this._page !== undefined) result.page = this._page;
    if (this._pageFirst !== undefined) result["page-first"] = this._pageFirst;
    if (this._part !== undefined) result.part = this._part;
    if (this._partTitle !== undefined) result["part-title"] = this._partTitle;
    if (this._PMCID !== undefined) result.PMCID = this._PMCID;
    if (this._PMID !== undefined) result.PMID = this._PMID;
    if (this._printing !== undefined) result.printing = this._printing;
    if (this._publisher !== undefined) result.publisher = this._publisher;
    if (this._publisherPlace !== undefined)
        result["publisher-place"] = this._publisherPlace;
    if (this._references !== undefined) result.references = this._references;
    if (this._reviewedGenre !== undefined)
        result["reviewed-genre"] = this._reviewedGenre;
    if (this._reviewedTitle !== undefined)
        result["reviewed-title"] = this._reviewedTitle;
    if (this._scale !== undefined) result.scale = this._scale;
    if (this._section !== undefined) result.section = this._section;
    if (this._source !== undefined) result.source = this._source;
    if (this._status !== undefined) result.status = this._status;

    if (this._title !== undefined) result.title = this._title;
    if (this._titleShort !== undefined)
        result["title-short"] = this._titleShort;
    if (this._URL !== undefined) result.URL = this._URL;
    if (this._version !== undefined) result.version = this._version;
    if (this._volume !== undefined) result.volume = this._volume;
    if (this._volumeTitle !== undefined)
        result["volume-title"] = this._volumeTitle;
    if (this._volumeTitleShort !== undefined)
        result["volume-title-short"] = this._volumeTitleShort;
    if (this._yearSuffix !== undefined)
        result["year-suffix"] = this._yearSuffix;
    if (Object.keys(this._custom).length !== 0) result.custom = this._custom;

    return result;
};
