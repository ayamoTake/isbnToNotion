# isbnToNotion

ISBNコードをもとにOpenBDから書籍情報を取得し、Notionに自動登録するDeno製ツールです。
Quagga2を使ってバーコードのスキャンにも対応しています。

## 🔧 使用技術

- [Deno](https://deno.land/) - セキュアなランタイム (MIT License)
- [OpenBD API](https://openbd.jp/) - 書籍情報取得用の公共API
- [Notion API](https://developers.notion.com/) - データベースへの登録
- [@ericblade/quagga2](https://github.com/ericblade/quagga2) - バーコード読み取りライブラリ (MIT License)

## 📚 機能概要

1. カメラで書籍のバーコードを読み取り
2. ISBNをOpenBD APIに送信して書籍情報を取得
3. Notionに書籍情報を自動登録

## ⚖️ ライセンスとクレジット

このプロジェクトは [MIT License](./LICENSE) の下で提供されます。

以下の外部ライブラリ・サービスを利用しています：

- [@ericblade/quagga2](https://github.com/ericblade/quagga2)（MIT License）
- [OpenBD API](https://openbd.jp/)（商用利用可能／帰属表示を推奨）
- [Notion API](https://developers.notion.com/)（Notion API利用規約に準拠）
- [Deno](https://deno.land/)（MIT License）

© 2025 Ayamo Takeuchi

