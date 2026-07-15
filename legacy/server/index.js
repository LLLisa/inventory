const app = require('./api');

const PORT = process.env.PORT || 1953;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
