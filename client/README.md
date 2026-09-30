# Client

```bash
npm install
npm run dev
```

App: http://localhost:5173  
API proxy → http://localhost:3000

```
src/
  api/                 http helper + todos client
  store/               redux + redux-saga
    todos/             actions, reducer, saga
  components/
    atoms/             smallest controls (empty for now)
    molecules/         TodoRow
    organisms/         TodoList
    templates/         AppShell
  pages/               TodosPage
```
