import { Router } from "itty-router";
import { response } from "./response";
import { send } from "./telegram";

const router = Router();

router.all("*", async (request) => {
    const body = await request.json();
    // Get Message From Telegram
    if (body.message && body.message.chat && body.message.chat.id && body.message.text) {
        const text = body.message.text.toLowerCase();
        if (text.includes(String(body.message.chat.id))) {
            await send({ id: body.message.chat.id, text: `沒錯， *_${body.message.chat.id}_* 是你的訊息通道 ID 喔！` });
        } else if (text.includes("start") || text.includes("hi") || text.includes("hello") || text.includes("哈囉") || text.includes("你好")) {
            await send({
                id: body.message.chat.id,
                text: `哈囉！我是 *Automia*！\n啟用 *telegram* 模組並在參數中加入 _tg\\_id_ ，我就會通知你 Bahamut Automation 的執行狀況！\n\n你的訊息通道 ID 是 ${body.message.chat.id}\n\n[*_Bahamut Automation_*](https://github.com/JacobLinCool/Bahamut-Automation)`,
            });
        } else if (text.includes("id")) {
            await send({ id: body.message.chat.id, text: `你的訊息通道 ID 是 ${body.message.chat.id}` });
        } else if (text.includes("automia")) {
            await send({ id: body.message.chat.id, text: "Automia! _Automia!_ *Automia!*" });
        } else {
            await send({ id: body.message.chat.id, text: body.message.text.split("").reverse().join("") });
        }
        return response({ data: "", status: 200 });
    }

    // Send Message To Telegram
    if (body.send && body.id) {
        const sent = await send({ id: body.id, text: body.send }).then((r) => r.text());
        return response({ data: sent });
    }

    return response({ data: "", status: 200 });
});

async function main() {
    addEventListener("fetch", (event) => {
        event.respondWith(router.handle(event.request).catch((err) => response({ data: JSON.stringify(err, null, 2), status: 500 })));
    });
}

export { main };
