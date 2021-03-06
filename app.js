import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
import axios from 'axios';

const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 4000);

// server rendered home page
app.get('/', (req, res) => {
    let page= req.query.page;
    if(page === undefined)
    {
        page = 1;
        res.redirect('/?'+'page='+page);
    }
    else {
        axios.get("https://hn.algolia.com/api/v1/search?page=" + page)
            .then((resp) => {
                if (resp.status === 200) {
                    const {preloadedState, content} = ssr({hits: resp.data.hits, isFetching: false, pageNumber: page});
                    const response = template("Hacker News", preloadedState, content);
                    res.setHeader('Cache-Control', 'assets, max-age=604800');
                    res.send(response);
                }
            })
    }
});
