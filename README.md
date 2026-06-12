# CT-e Manager — ShipSmart

Interface web para emissão e gestão de CT-es via Metabase + LogCTe.

## Deploy no Vercel

1. Suba este projeto no GitHub
2. Importe o repositório no Vercel
3. Em **Environment Variables** no Vercel, adicione:

```
METABASE_URL=https://shipsmart.metabaseapp.com
METABASE_USER=henrique.vital@shipsmart.global
METABASE_PASS=METAb@se2025!
METABASE_QUESTION_ID=15068
LOGCTE_URL=http://ws.logcte.com.br/LogCTeIntegracao.asmx
LOGCTE_KEY=5936989ca963fd02a19a83e09e5f7f4f
CNPJ_EMISSOR=28575809000160
```

4. Deploy automático ✅

## Dev local

```bash
npm install
npm run dev
```
