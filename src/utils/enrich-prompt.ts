export function enrichPrompt(prompt: string) {
    const example = [
        {
            type: "paragraph | list",
            weight: "normal | bold",
            text: "string | string[] - If paragraph, return a single string; if list, return an array of strings"
        }
    ];

    const instructions = `
    - Use the "type" field to specify whether the content is a paragraph or a list.
    - Use the "weight" field to represent text styling: "normal" or "bold". **Do NOT use asterisks (*) for bold text**. Only set the "weight" field to "bold" without any extra characters.
    - The "text" field should contain either a single string for paragraphs or an array of strings for lists.
    - Ensure the response follows the given JSON structure exactly, with no additional formatting, markdown, or symbols like asterisks.
    - Your response must be valid JSON and fit into the format provided.
    `;

    const enrichedPrompt = `
    Here is the prompt: "${prompt}".

    Provide an answer that strictly follows the JSON format: ${JSON.stringify(example)}.

    ${instructions}
    
    **Important**: Avoid using any markdown or asterisk symbols (*). If text needs to be bold, just set "weight": "bold".
    `;

    return enrichedPrompt.trim();
}
