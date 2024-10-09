import { createZip } from "./create-zip";
import { uploadToS3 } from "./upload-to-s3";

async function deploy() {
    await createZip();
    const upload = await uploadToS3();
    console.log(upload);
}

deploy();