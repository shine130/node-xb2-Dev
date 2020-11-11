const {createTag,getTagByName} = require('./tag.service');

// 创建标签

const store = async (req,res,next) => {
  //准备数据
  const {name} = req.body;

  try {
    //查找标签
    const tag = await getTagByName(name);

    //如果标签存在就报错
    if(tag) throw new Error('TAG_ALREADY_EXISTS');

    //存储标签
    const data = await createTag({name});

    //做出响应
    res.status(201).send(data);

  }catch(error){
    next(error);
  }

}

module.exports = {
  store
};