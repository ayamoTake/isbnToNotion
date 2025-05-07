import { Handlers, PageProps } from "$fresh/server.ts";

interface Props {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  image: string;
};

export const handler: Handlers = {
    async POST(req, ctx) {
        const form = await req.formData();
        const isbn = form.get("isbn")?.toString();

        if (!isbn) {
            return new Response("ISBNが空です", { status: 400 });
        }

        // クエリパラメータとしてリダイレクト
        const url = new URL(req.url);
        url.pathname = "/bookData";
        const uri = encodeURIComponent(isbn);
        url.search = `?isbn=${uri}`;

        return Response.redirect(url.toString(), 303);
    },

    async GET(_req, ctx) {
        const url = new URL(_req.url);
        const isbn = url.searchParams.get("isbn") ?? "";

        let title = "";
        let subtitle = "";
        let author = "";
        let publisher = "";
        let image = "";

        if (isbn) {
          const api =`https://api.openbd.jp/v1/get?isbn=${isbn}`;
          const res = await fetch(api);
          const json = await res.json();

          if (json[0]) {
            const summary = json[0].summary;

            const title_str = summary.title;
            if (title_str.includes("=")) {
              title = title_str.split("=")[0];
              subtitle = title_str.split("=")[1];
            } else if (title_str.includes(":")) {
              title = title_str.split(":")[0];
              subtitle = title_str.split(":")[1];
            } else {
              title = title_str
            }

            author = summary.author.replace(/[, ]\d{4}-/g, "&")
            // author = summary.author.split(/ \d{4}-/g).map((name: string) => {
            //   return name.split(",").reverse().join(" ");
            // }).join("&") || "";
            image = summary.cover || "";
            publisher = summary.publisher || "";
          }
        }

        return ctx.render({ isbn, title, subtitle, author, image, publisher });
    },
};

export default function Page({ data }: PageProps<Props>) {
    return (
        <div>
          <form action="/register" method="POST">
            <h1 id="heading">ISBN: <input type="text" name="isbn" value={data.isbn}/></h1>
            <p>タイトル: <input type="text" name="title" value={data.title}/></p>
            <p>サブタイトル: <input type="text" name="subtitle" value={data.subtitle} /></p>
            {
              data.author !== ""
              ? data.author.split("&").filter(name => name !== "").map((name: string) => {
                if (/[a-zA-Z]/.test(name)) {
                  return name.split(",").reverse().join(" ");
                }
                return name.replace(/,/g,"");
              }).map((name: string) => {
                return (<p>著者: <input type="text" name="author" value={name}/></p>)
              })
              : (<p>著者: <input type="text" name="author" /></p>)
            }
            <p>出版社: <input type="text" name="publisher" value={data.publisher}/></p>
            <img src={data.image} />
            <button type="submit">登録</button>
          </form>
        </div>
    );
}
