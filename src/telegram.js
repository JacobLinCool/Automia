import { TOKEN } from "./token";

async function send({ id, text, mode = "MarkdownV2" }) {
    return fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: id,
            parse_mode: mode,
            text: text,
        }),
    });
}

export { send };
