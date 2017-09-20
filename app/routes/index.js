var redis = require("redis");
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client = redis.createClient()

randomstring = require('randomstring')

module.exports = function(app, db) {
  app.get('/:slug', async function(req, res){
    var slug = req.params.slug;
    var long_url = await client.getAsync('slug:'+slug);
    res.redirect(long_url);
  });

  app.post('/links', async (req, res) => {
    token = req.body.token
    long_url = req.body.long_url

    if (token != 'ABCD') {
      res.send(403)
      return  
    }

    var slug;

    while (true) {
      slug = randomstring.generate(5);
      result = await client.getAsync('slug:'+slug);
      if (!result){
        break;
      }
    }
    
    await client.set('slug:'+slug, long_url)
    res.send({slug: slug})    
  });
};