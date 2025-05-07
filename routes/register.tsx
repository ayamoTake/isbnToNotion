
export const handler = {
    async POST(req: Request): Promise<Response> {
        const form = await req.formData();

        const title = form.get("title")?.toString() ?? "";
        const isbn = form.get("isbn")?.toString() ?? "";
        const subtitle = form.get("subtitle")?.toString() ?? "";
        // const author = form.get("author")?.toString().replace(/,/g, " ") ?? "";
        const authors = form.getAll("author").map(name => name.toString().trim()).flatMap((name: string) =>
            name.includes("&")
                ? name.split("&").map(n => n.trim())
                : [name.trim()]
        ) ?? [];

        const publisher = form.get("publisher")?.toString().replace(/,/g, " ") ?? "";

        const NOTION_TOKEN = Deno.env.get("NOTION_TOKEN");
        const DATABASE_ID = Deno.env.get("DATABASE_ID");

        const res = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NOTION_TOKEN}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28",
            },
            body: JSON.stringify({
                parent: { database_id: DATABASE_ID },
                properties: {
                    "タイトル": {
                        title: [{
                            text: {
                                content: title
                            }
                        }]
                    },
                    "サブタイトル": {
                        rich_text: [{
                            text: {
                                content: subtitle || ""
                            }
                        }]
                    },
                    "ISBN": {
                        rich_text: [{
                            text: {
                                content: isbn || ""
                            }
                        }]
                    },
                    "著者": {
                        multi_select: authors.filter(name => name !== "").map((name: string) => ({ name: name }))
                    },
                    "出版社": {
                        multi_select: [
                            { name: publisher },
                        ]
                    },
                    "ステータス": {
                        select: {
                            name: "一読待ち"
                        }
                    },
                }
            }),
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error("エラー詳細:", errorBody);
            return new Response(`登録失敗にゃ…: ${errorBody}`, { status: 500 });
        }

        const url = new URL(req.url);
        const redirectUrl = `${url.protocol}//${url.host}/`;

        return Response.redirect(redirectUrl, 303);
    }
};
