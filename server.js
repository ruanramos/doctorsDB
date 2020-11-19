const app = require('./src/config/custom-express');

const server = app.listen(3000, () => {
    console.log("running server");
})