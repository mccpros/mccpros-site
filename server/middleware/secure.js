module.exports = () => {
  return (req, res, next) => {
    let host = req.headers.host;
    console.log(host);

    if(!host.match(/^(www\.)/ig)) {
      console.log('no www');
      return res.redirect('https://www.' + req.headers['host'] + req.url );
    } else if(!req.connection.encrypted){
      console.log('no security');
      return res.redirect('https://' + req.headers['host'] + req.url );
    }
    console.log('passed');
    return next();
  };
}
