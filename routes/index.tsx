import { Head } from "$fresh/runtime.ts"

export default function Home() {
  return (
    <>
    <Head>
      <script src="/quagga-client.js" type="module"></script>
    </Head>
      <div>
        <h1>ISBNスキャン📚</h1>
        <div id="scanner" style="width: 500px; height: 400px;"></div>
        <form method="post" action="/bookData">
          <div>読み取ったISBN: <input type="text" id="isbn" name="isbn"/></div>
          <button type="submit">検索</button>
        </form>
      </div>
    </>
  );
}
