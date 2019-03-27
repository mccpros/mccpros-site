import { formatContentfulEntryList, formatContentfulEntry } from '../utils/formatContentfulData';

// Can't use ES6 import with contentful
const contentful = require('contentful');

class ContentController {
  constructor(router) {
    this.router = router;

    this.client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });

    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/content/:content_type', this.getContentByType.bind(this));
    this.router.get('/content/:content_type/:id', this.getContentByID.bind(this));
  }

  getContentByType(req, res) {
    const { content_type } = req.params;

    this.client
      .getEntries({
        content_type
      })
      .then(data => {
        const formattedData = formatContentfulEntryList(data);

        res.send(formattedData);
      })
      .catch(err => console.log(err));
  }

  getContentByID(req, res) {
    const { id } = req.params;

    this.client
      .getEntry(id)
      .then(data => {
        const formattedData = formatContentfulEntry(data);

        res.send(formattedData);
      })
      .catch(err => console.log(err));
  }
}

module.exports = ContentController;
