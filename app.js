const express = require('express');
const { Deta } = require('deta');

const deta = Deta('PROJECT_KEY')
const db = deta.Base('sokuji')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json())
app.listen(port, () => console.log(`listening on port ${port}`));


app.get('/user/:user_id', async (req, res) => {
    res.set({'Access-Control-Allow-Origin': '*'});
    const { user_id } = req.params;
    const user = await db.get(user_id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json(null);
    }
});
