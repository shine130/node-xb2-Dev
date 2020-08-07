const {getPosts} = require('./post.service');

const index = async (req,res,next) => {
  // if(req.headers.authorization !== 'secret'){
  //   return next(new Error());
  // }

  const posts = await getPosts();

  res.send(posts);
}

module.exports = {
  index,
}