var redis = require("redis");
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client = redis.createClient(process.env.REDIS_URL)

randomstring = require('randomstring')

module.exports = function(app, db) {
  app.get('/:slug', async function(req, res){
    var slug = req.params.slug;
    var long_url = await client.getAsync('slug:'+slug);
    if (long_url){
      res.redirect(long_url);
    } else {
      res.sendStatus(404) 
    }
  });

  app.post('/links', async (req, res) => {
    auth_token = req.body.auth_token
    long_url = req.body.long_url

    if (auth_token != process.env.AUTH_TOKEN) {
      res.sendStatus(403)
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
    res.send({short_url: process.env.APP_URL + slug})    
  });
};