
import crypto from "crypto";

export const encrypt = (text: string) => {


    const key = Buffer.from(process.env.key!, "hex");
    const iv = Buffer.from(process.env.iv!, "hex");

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    console.log(cipher)
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;

};

export const decrypt = (encrypted: string) => {


    const key = Buffer.from(process.env.key!, "hex");
    const iv = Buffer.from(process.env.iv!, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
