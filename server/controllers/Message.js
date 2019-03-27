import sendGrid from '@sendgrid/mail';

class MessageController {
  constructor(router) {
    this.router = router;

    this.sendGrid = sendGrid;
    this.sendGrid.setApiKey(process.env.SENDGRID_SECRET);

    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/message', this.sendMessage.bind(this));
  }

  sendMessage(req, res) {
    const msg = {
      to: 'tech@mccpros.com',
      from: req.body.email,
      subject: 'Message from mccpros.com',
      text: `From ${req.body.name},
            ${req.body.message}
            Phone: ${req.body.phone}
            Company: ${req.body.company}`
    };

    this.sendGrid
      .send(msg)
      .then(() => {
        res.send({ success: true });
      })
      .catch(err => {
        console.error(err.toString());
        res.status(400).send(err.message);
      });
  }
}

module.exports = MessageController;
