export function parseModelReponse(response: string) {
    return JSON.parse(response.replaceAll("_", "").trim());
}