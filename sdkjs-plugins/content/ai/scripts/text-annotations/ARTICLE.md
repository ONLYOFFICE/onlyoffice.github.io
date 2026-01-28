# Text Annotations API Guide

Нужно написать техническую статью для разработчиков. Есть текстовый редактор OnlyOffice, у него есть API для разработчиков плагинов. В  Api добавились новые методы для разметки, т.е. выделения участков текста. У выделенных участков появляется подчеркивание снизу.

Данный функционал планируется использовать для аннотаций к параграфам текста, поэтому и участки с текстом называются аннотациями.

Для управления аннотациями есть 3 метода:

1) *[```AnnotateParagraph```](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Methods/AnnotateParagraph/)* - добавляет аннотации к указанному абзацу.
2) *[```SelectAnnotationRange```](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Methods/SelectAnnotationRange/)* - выделяет текст в документе, используя заданную аннотацию.
3) *[```RemoveAnnotationRange```](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Methods/RemoveAnnotationRange/)* - Удаляет определенный диапазон аннотаций из документа.



### О новых методах на примере написания плагина.

Инструкция как пользоваться плагином находится [тут](https://github.com/ONLYOFFICE-PLUGINS/onlyoffice.github.io/blob/feature/AI/sdkjs-plugins/content/ai/scripts/text-annotations/custom-annotations/README.md).
Плагин будет добавлять аннотации к тексту, т.е. он будет помогать пользователям создавать AI ассистентов, с помощью которых они будут анализировать текст и выделять участки, которые удовлетворяют критериям описанным в промпте AI ассистента. На выбор будет 3 опции:

1) *Hint* - просто показать пояснительный текст
2) *Replace* - предложить текст для замены
3) *Replace + Hint* - предложить текст для замены и снизу показать пояснительный текст. В пояснительном тексте могут быть ссылки.

Использовать плагин можно разными способами, думаю пользователи могут придумать намного больше вариантов, чем описано в этой статье. Например можно сделать проверку текста на плагиат, указав порог уникальности в 90%, или проверять не сгенерирован ли текст с помощью ИИ. Можно проверять ошибки, например несоответствие дат, имен или фактов. Можно проводить лексический анализ текста или смотреть соответствует ли текст гражданскому кодексу.

Интерфейс добавления нового или редактирования существующего ассистента состоит из 3 полей:

1) *Имя*
2) *Тип* (Hint, Replace, Replace + Hint)
3) *Промпт* - самое важное поле, в которое пользователь будет писать свой запрос, тут нужно быть максимально конкретным, желательно без размытых формулировок.  

Еще есть скрытое поле, в котором содержится уникальный id ассистента.

Сохраняется ассистент в localStorage в виде объекта упакованного в строку:  

```js
const assistant = {
  id: string,
  name: string,
  type: number, // 0 - Hint, 1 - Replace, 2 - Replace + Hint
  query: string, // prompt - пользовательский запрос
}
```

## Пример создания ассистента

- Имя: *Корректор дат*  
- Тип: *Replace + Hint*  
- Запрос: *Хочу найти в тексте все неправильные даты в промежутке между 1900 и 2000 годом, а потом исправить их. Если дата правильная - игнорируй ее. Хочу видеть пояснение со ссылками на источники.*  

### Запуск ассистента

После запуска ассистента пользовательский запрос модифицируется, к нему добавляются правила, чтобы при отправке запроса в ИИ ответ был в нужном для нас формате. Например для того чтобы заменить в тексте все неправильные даты подкрепив их пояснительным текстом, нам необходимо знать какой фрагмент текста был выбран для этой цели, а также сам текст пояснения.

```js
let prompt = `You are a multi-disciplinary text analysis assistant.  
    Your task is to find text fragments that match the user's criteria.`;
    // ...
prompt += `Response format - return ONLY this JSON array with no additional text:
    [{
        "origin": "exact text fragment that matches the query",
        "suggestion": "suggested replacement (plain text)",
        "reason": "detailed explanation why it matches the criteria",
        "difference":"visual representation showing exact changes between origin and suggestion"
        "occurrence": 1,
        "confidence": 0.95
    }]
    \n\n`;
prompt += "USER REQUEST:\n```" + assistant.query + "\n```\n\n"; // пользовательский запрос
prompt += "TEXT TO ANALYZE:\n```\n" + paragraph_text + "\n```\n\n";
    // ....
```

Для анализа можно использовать весь текст документа(все параграфы), либо только выделенный фрагмент(только выделенные параграфы). Мы будем рассматривать случай когда обрабатывается только выделенный фрагмент.

Параграфы с текстом будем получать подписавшись на событие [onParagraphText](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Events/onParagraphText/).  

```js
window.Asc.plugin.attachEditorEvent("onParagraphText", (data) => {
    const {paragraphId, recalcId, text, annotations} = data;
    console.log("Paragraph updated:", paragraphId);
    annotations.forEach(a => {
        console.log(`Annotation ${a.id}: ${a.name} at ${a.start} (${a.length} chars)`);
    });
});
```

Из примера выше у нас есть доступ ко всем параграфам, из них нам нужны только выделенные - достаточно узнать их 
```id```. Сделать это можно вызвав метод [GetAllParagraphs](https://api.onlyoffice.com/docs/office-api/usage-api/text-document-api/ApiRange/Methods/GetAllParagraphs/) и [GetInternalId](https://api.onlyoffice.com/docs/office-api/usage-api/text-document-api/ApiParagraph/Methods/GetInternalId/):

```js
const range = Api.GetDocument().GetRangeBySelect();
const paragraphs = range.GetAllParagraphs();
const ids = paragraphs.map(p => p.GetInternalId());
```

 Ответ возвращается в таком виде:

```js
let aiAnswer = {
    origin: "фрагмент соответствующий запросу",
    suggestion: "предполагаемая замена",
    reason: "подробоне объяснение почему фрагмент удовлетворяет запросу",
    difference: "разница между исходным текстом и предполагаемой заменой (в html формате для наглядности)"
    // --//--
    occurrence: "Сколько раз вхождение встречается в параграфе (1 раз, 2 раза и т. д.)"
    confidence: "значение от 0 до 1, процент уверенности в правильном выборе"
}
```

Далее отправляем запрос в AI и получвем ответ с нужными нам вхождениями, т.е. с подробной информацией о каждом из них. Результат нужно **отобразить в тексте документа**. Для этого у нас есть метод *[AnnotateParagraph](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Methods/AnnotateParagraph/)* (появился в версии редактора 9.2.0).  

```js
window.Asc.plugin.executeMethod("AnnotateParagraph", [{
    type: "highlightText", // пока что возможно только это значение
    name: "customAssistant_" + assistantId, // id ассистента
    paragraphId: "p1", // значение берется из информации о параграфе
    recalcId: "r12", // значение берется из информации о параграфе
    ranges: [ // то что нам нужно вычислить опираясь на aiAnswer.origin и aiAnswer.occurance
        { start: 5, length: 10, id: "a1" } 
        // start - это порядковый номер первого символа вхождения в параграфе 
    ]
}]);
```

Аннотации мы в текст мы умеем добавлять, нужно теперь добавить полезных действий. По клику на аннотацию будем показывать всплывающее окно в котором покажем исходный текст, предполагаемую замену и краткое пояснение. Снизу окна будут кнопки ***Принять/Отклонить***. Для этого у нас есть три события:

1) [```onBlurAnnotation```](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Events/onBlurAnnotation/) - The function called when an annotation loses focus.
2) [```onClickAnnotation```](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Events/onClickAnnotation/) - The function called when the user clicks an annotation.
3) [```onFocusAnnotation```](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Events/onFocusAnnotation/) - The function called when an annotation receives focus.  
Все три события возвращают ```{name, paragraphId, rangeId}```

Из трех событий нам хватит и двух:  
```onClickAnnotation``` - для того чтобы показыть всплыващее окно.  
```onBlurAnnotation``` - для того чтобы скрыть всплывающее окно


```js
let popup = new window.Asc.PluginWindow();

let variation = {
    url : 'annotationPopup.html',
    isVisual : true,
    buttons : [{ text:'Accept', primary: true }, { text:'Reject', primary: false }],
    isModal : false,
    description: 'Proposal for replacement',
    EditorsSupport : ["word"],
    size : [300, 200],
    fixedSize : true,
    isTargeted : true // указываем что окно должно появиться рядом с аннотацией
};

window.Asc.plugin.attachEditorEvent("onClickAnnotation", (annotation) => {
    // --//--
    popup.show(variation);
});  

window.Asc.plugin.attachEditorEvent.attachEditorEvent("onBlurAnnotation", (annotation) => {
    // --//--
    popup.close();
});
```  

Для полного счастья не хватает возможности заменять "неправильный" текст на тот что предложил ИИ, либо отказаться от замены.

```js
/**
 * @param {string} paragraphId
 * @param {string} rangeId
 * @param {string} suggestion - текст который ИИ предложил в качестве замены
 */
async function onAccept(paragraphId, rangeId, suggestion) {

    // выделяем в документе текст с аннотацией, т.е. текст который хотим изменить
    await new Promise(resolve => 
        window.Asc.plugin.executeMethod(
            "SelectAnnotationRange", 
            [{
                paragraphId: paragraphId,
                rangeId: rangeId,
                name: "customAssistant_" + id, // id ассистента
            }],
            resolve
        );
    );

    // заменяем текст выделенного фрагмента и снимаем выделение
    Asc.scope.suggestion = aiAnswer.suggestion;
    await new Promise(resolve => {
        Asc.plugin.callCommand(
            () => {
                Api.ReplaceTextSmart([Asc.scope.suggestion]);
                Api.GetDocument().RemoveSelection();
            }
            false, // нужно ли закрыть окно сразу после выполнения
            true, // Defines whether the document will be recalculated or not
            resolve
        );
    });

    // удаляем аннотацию, т.к. она выполнила свою функцию
    await new Promise(resolve => 
        window.Asc.plugin.executeMethod(
            "RemoveAnnotationRange", 
            [{
                paragraphId: paragraphId,
                rangeId: rangeId,
                name: "customAssistant_" + id, // id ассистента
            }],
            resolve
        );
    );

    // Returns focus to the editor.
    await new Promise(resolve => 
        window.Asc.plugin.executeMethod(
            "FocusEditor",
            [],
            resolve
        );
    );
},

```

```js
/**
 * @param {string} paragraphId
 * @param {string} rangeId
 */
async function onReject(paragraphId, rangeId)
{
    // удаляем аннотацию
    await new Promise(resolve => 
        window.Asc.plugin.executeMethod(
            "RemoveAnnotationRange", 
            [{
                paragraphId: paragraphId,
                rangeId: rangeId,
                name: "customAssistant_" + id, // id ассистента
            }],
            resolve
        );
    );
};
```
