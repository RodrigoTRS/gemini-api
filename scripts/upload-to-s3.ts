import { exec } from "child_process";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = path.join(__dirname, "..");


export async function uploadToS3() {
    return new Promise((resolve, reject) => {
        exec(
            `cd ${root} && aws s3 cp server.zip s3://gemini-server/ --profile rodrigosilva`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                }
    
                if (stderr) {
                    return reject(stderr);
                }
    
                return resolve(stdout);
            });
    });
}
