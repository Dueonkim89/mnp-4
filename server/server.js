const path = require('path');
const express = require('express');


const public = path.join(__dirname + '/../public');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(public))

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

