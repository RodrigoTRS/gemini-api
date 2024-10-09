import { exec } from "child_process";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = path.join(__dirname, "..");

export async function createZip() {

    return new Promise<void>((resolve, reject) => {
        exec(
            `cd ${root} && zip -rv server.zip . -x "./dist/*" -x "./node_modules/*" -x "./db/*" -x "./scripts/*" -x ".env" -x "package-lock.json"`,
            { maxBuffer: 1024 * 1024 * 100}, // 100MB Buffer
            (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                }
    
                if (stderr) {
                    return reject(stderr);
                }
    
                return resolve();
            });
    });
}
