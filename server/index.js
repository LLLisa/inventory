const app = require('./api');

const PORT = process.env.PORT || 1312;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
