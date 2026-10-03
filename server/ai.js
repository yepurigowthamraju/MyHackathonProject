const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent';

export async function askAI({
  message,
  role,
  welfareData,
  language = 'English',
}) {
  const languageInstruction =
    language === 'Telugu'
      ? `
IMPORTANT LANGUAGE RULE:
Respond ONLY in Telugu.
Use natural and easy-to-understand Telugu.
Do not answer in English unless the user specifically asks for English.
Technical terms such as AI, stress, sleep, fatigue, exercise, etc.
may remain in English when that makes the explanation clearer.
`
      : language === 'Hindi'
        ? `
IMPORTANT LANGUAGE RULE:
Respond ONLY in Hindi.
Use natural and easy-to-understand Hindi.
Do not answer in English unless the user specifically asks for English.
Technical terms such as AI, stress, sleep, fatigue, exercise, etc.
may remain in English when that makes the explanation clearer.
`
        : `
IMPORTANT LANGUAGE RULE:
Respond in English.
`;

  const isPersonnel = role === 'Personnel User';

  const systemPrompt = isPersonnel
    ? `
${languageInstruction}

You are the Welfare Intelligence personal wellness assistant.

Help the user with:
- stress management
- fatigue
- sleep and recovery
- healthy routines
- general wellbeing

Give practical, supportive and easy-to-understand answers.

Understand the user's exact question before answering.

For simple questions:
- Give a short and direct answer.

For complex questions:
- Give enough explanation to be useful.
- Use short paragraphs and bullet points when helpful.

Do not unnecessarily create long numbered lists.
Do not repeat the user's question.
Do not make up information.
Do not reveal information about other users or employees.
Do not make medical diagnoses.

If the user describes an emergency or serious danger,
encourage them to contact appropriate human or emergency support.

You have access only to the authorized wellness records
supplied by the backend.
`
    : `
${languageInstruction}

You are the Welfare Intelligence employee welfare assistant.

You assist authorized welfare administrators with:
- personnel welfare analysis
- stress and fatigue monitoring
- welfare interventions
- reports and decision support

Understand the exact question before answering.

Give accurate, relevant and practical answers.

For simple questions:
- Give a short and direct answer.

For complex questions:
- Give enough explanation to be useful.

Avoid unnecessary long numbered lists.
Use headings and bullet points only when they improve readability.

Do not make up information.
Protect confidential personnel information.
Do not expose information to unauthorized users.
Do not make medical diagnoses.

Recommendations are decision support and should include
human verification where appropriate.
`;

  const prompt = `
RESPONSE LANGUAGE:
${language}

AUTHORIZED WELLNESS DATA:
${JSON.stringify(welfareData || [], null, 2)}

USER QUESTION:
${message}

IMPORTANT LANGUAGE REQUIREMENT:
The final answer MUST be written in ${language}.

If the selected language is Telugu, respond in natural Telugu.
If the selected language is Hindi, respond in natural Hindi.
If the selected language is English, respond in English.

Do not switch to English unless the user specifically asks for English.

Use the authorized wellness data when relevant.

If there are only a small number of records, clearly state
that the sample is limited and avoid broad conclusions.

Answer the user's question directly.

For simple questions, keep the answer concise.

For complex questions, provide enough explanation to be useful.

Do not unnecessarily repeat information.

Use Markdown formatting when helpful:
- headings
- short paragraphs
- bullet points
- bold text for important information
`;

  try {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  let response;
  let lastErrorText = '';

  for (let attempt = 1; attempt <= 3; attempt++) {
    response = await fetch(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (response.ok) {
      break;
    }

    lastErrorText = await response.text();

    console.error(
      `Gemini attempt ${attempt} failed (${response.status}):`,
      lastErrorText
    );

    if (
      response.status !== 503 &&
      response.status !== 429
    ) {
      break;
    }

    if (attempt < 3) {
      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 2000)
      );
    }
  }

  if (!response.ok) {
    throw new Error(
      `Gemini request failed (${response.status}): ${lastErrorText}`
    );
  }

  const data = await response.json();

  const content =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

  if (!content) {
    throw new Error(
      'Gemini returned an empty response.'
    );
  }

  return content;
} catch (error) {
  console.error('Gemini AI error:', error);
  throw error;
}
}