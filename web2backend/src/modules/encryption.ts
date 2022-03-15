import crypto from "crypto";
import env from "dotenv";
env.config();

const secretKey:string = process.env.ENCRYPTION_KEY||"";
const algorithm = 'aes-256-ctr';

const encrypt = (text:string) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex')+ " " + iv.toString('hex');
}

const decrypt = (ecryptedString:string) => {
    const ivContent = ecryptedString.split(" ");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivContent[1], 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(ivContent[0], 'hex')), decipher.final()]);
    return decrpyted.toString();
};

export {encrypt, decrypt}