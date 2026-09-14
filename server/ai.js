import OpenAI from 'openai';

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function askAI({ message, role, welfareData }) {
  const systemPrompt =
    role === 'Personnel User'
      ? `
You are the Welfare Intelligence personal wellness assistant.

Help the user with:
- stress management
- fatigue
- sleep and recovery
- healthy routines
- general wellbeing

Give practical, supportive and easy-to-understand answers.

Do not reveal information about other users or employees.
Do not make medical diagnoses.
If the user describes an emergency or serious danger, encourage them to contact appropriate human or emergency support.
`
      : `
You are the Welfare Intelligence employee welfare assistant.

You assist authorized welfare administrators with:
- personnel welfare analysis
- stress and fatigue monitoring
- welfare interventions
- reports and decision support

Protect confidential personnel information.
Do not expose information to unauthorized users.
Your recommendations are decision support and should include human verification where appropriate.
`;

  const response = await getOpenAIClient().responses.create({
    model: 'gpt-5.6-luna',
    instructions: systemPrompt,
   input: `
You have access to the following authorized wellness records from the Welfare Intelligence database.

These records are real data provided by the backend for this request.
You MUST analyze these records when answering the administrator's question.
Do NOT say that you do not have access to the wellness data if records are present below.
Do NOT ask the administrator to upload or provide the data again.

AUTHORIZED WELLNESS DATA:
${JSON.stringify(welfareData, null, 2)}

ADMINISTRATOR QUESTION:
${message}

Use the wellness records above as the primary source for your answer.
Summarize important patterns, risk levels, stress, fatigue, sleep, mood and energy where relevant.
If there are only a small number of records, clearly state that the sample is limited and avoid making broad conclusions.
`,
  });

  return response.output_text;
}