
const explainContentPrompt = (content, language) => `Please use ${language} language and do not use markdown or HTML formatting in your response, only plain text, to produce a concise explanatory essay explaining the following content:
${content}`;
const analyzeTextPrompt = (content, language) => `Analyze the following text, provide your response in plain text without using any Markdown formatting or special characters. And use ${language} to express your analysis effectively:
${content}`;

const correctContentPrompt = (content, language) => `Please identify and correct the grammatical errors in the following sentence. Do not use any markdown or HTML formatting in your response, only plain text. Describe the corrections in ${language} , but when given a revised sentence, be consistent with the language of the original sentence:
${content}`;


const completeTextPrompt = (content) => `Please complete the following text:   
${content}.

Requirements:
- Provide a coherent and logical continuation of the text.
- Maintain consistency with the existing style and tone.
- You should respond use the same language as the original text.
`;

const translatePrompt = (content, language) => `Please translate the following into ${language}: 
${content}.`;


const summarizeContentPrompt = (content, language) => `Please summarizes the following content:
${content}.

Requirements:
- Use ${language} to express your summary effectively;
- Keep your summary as short as possible
`;

// - Use structured and coherent sentences to summarize the content;
// - The generated summary text should be as short as possible as the original text;

const generateDraftPrompt = (content, language) => `Please write an article that thoroughly covers the topic of 
${content}.

Requirements:
Your article should provide a comprehensive analysis, exploring different aspects, implications, and potential impact of ${content}. Aim to offer readers a deep understanding of ${content} and its relevance in today's world.
The article should be between 500-800 words and written in ${language}. Ensure the content is well-structured, engaging, and informative.`;


const explainCellPrompt = (content, language) => `Please explain the following form. Do not use markdown or HTML formatting in your response, only plain text. The form is ### wrapped in content and the table elements are separated by Spaces. The explanation should be in ${language} language.
${content}`;

const summariseCellPrompt = (content, language) => `Please summarise the following form. Do not use markdown or HTML formatting in your response, only plain text. The form is ### wrapped in content and the table elements are separated by Spaces. The explanation should be in ${language} language.
${content}`;

const rewriteContentPrompt = (content) => `Please rewrite the following: 
${content};

Requirements:
- The rewritten content should be clear and concise.
- Ensure the meaning of the original content is preserved.
- You should respond use the same language as the original text.`;

const shortenContentPrompt = (content) => `Please shorten the following content: 
${content}

Requirements:
- The shortened content should be concise and to the point.
- Maintain the key information and main ideas.
- Ensure the content remains coherent and logical.
- You should respond use the same language as the original text.
`;

const expandContentPrompt = (content) => `Please expand the following: 
${content}

Requirements:
- The expanded content should provide additional details and explanations.
- Elaborate on the key points and concepts.
- Ensure the content is informative and engaging.
- You should respond use the same language as the original text.
`;

const textToImagePrompt = (content) => `Please convert the following text to a picture:
${content}
`;

const slideOutlinePrompt = (topic, pages, language) => `I am preparing a presentation on ${topic}.
Please assist in generating content for ${pages} slides, with as many bullet points as possible.
The content should be returned in ${language}. You must add content for each slide. For each slide, you must add at least 4 bullet points. Don't return any other message.`;

const slideOutlineJSONPrompt = (topic, pages, language) => `I am preparing a presentation on ${topic}. 
Please assist in generating an outline in JSON format, adhering to the specified format ${JSON.stringify(output_format)}. 
The presentation should span ${pages} pages, with as many bullet points as possible. 
The content should be returned in ${language}. You must add content for each slide. For each slide, you must add at least 4 bullet. Please ensure the output is valid JSON match the RFC-8295 specification. Don't return any other message.`;
const output_format = {
    "title": "example title",
    "pages": [
        {
            "title": "title for page 1",
            "content": [
                {
                    "title": "title for bullet 1",
                    "description": "detail for bullet 1",
                },
                {
                    "title": "title for bullet 2",
                    "description": "detail for bullet 2",
                },
                {
                    "title": "title for bullet 3",
                    "description": "detail for bullet 3",
                },
            ],
        },
        {
            "title": "title for page 2",
            "content": [
                {
                    "title": "title for bullet 1",
                    "description": "detail for bullet 1",
                },
                {
                    "title": "title for bullet 2",
                    "description": "detail for bullet 2",
                },
            ],
        },
    ],
}

