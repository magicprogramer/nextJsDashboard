const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.db = router.db;

app.use(cors());
app.use(jsonServer.defaults());
app.use(auth);
app.use(router);

app.listen(8000, () => {
  console.log('JSON Server is running on http://localhost:3030');
});
