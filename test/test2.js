const User = require('./test')

// 插入写法
User.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

// 查询写法
let b = '';
User.findOne(
  {
    where: {
      username: 'janedoe'
    }
  }
).then(pet => {
  // 返回json数据格式
  b = JSON.stringify(pet)
})

let a = '';
User.findAll().then(pet => {
  a = JSON.stringify(pet)
})

User.findAll().then( s => console.log(s))