var express = require("express");
var Sequelize = require("sequelize");
var cors = require("cors");
var dbconfig = require("./db.config");
const nodemailer = require("nodemailer");
const { where } = require("sequelize");

var app = express();
app.use(express.json());
app.use(cors());

async function main(username) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bharathganji1@gmail.com", // generated ethereal user
      pass: "Ganjisai@19", // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: '"Team ShopIT 😋" <bharathganji1@gmail.com>', // sender address
    to: username, // list of receivers
    subject: "Hello ✔, Update on purchase!", // Subject line
    text: "Your order is successfully placed. \n team ShopIT", // plain text body
    html: "<b>Your order is successfully placed</b> <br><b>team ShopIT</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle,
  },
});

let userTable = sequelize.define(
  "userTable",
  {
    uid: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
let orderTable = sequelize.define(
  "orderTable",
  {
    orderdetails: {
      type: Sequelize.JSON,
    },
    email: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
let menProductsTable = sequelize.define(
  "menProductsTable",
  {
    title: Sequelize.STRING,

    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    rating: Sequelize.INTEGER,
    img: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
let womenProductsTable = sequelize.define(
  "womenProductsTable",
  {
    title: Sequelize.STRING,

    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    rating: Sequelize.INTEGER,
    img: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
let kidsProductsTable = sequelize.define(
  "kidsProductsTable",
  {
    title: Sequelize.STRING,

    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    rating: Sequelize.INTEGER,
    img: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

app.get("/orderdetails/:id", (req, res) => {
  username = req.params.id;

  console.log("in /orderdetails \n");
  console.log(JSON.stringify(username));
  console.log("in /orderdetails" + username + "username received");
  orderTable
    .findAll({
      raw: true,
      where: {
        email: username,
      },
    })
    .then((data) => {
      console.log("fetched...");
      res.send(data);
    })
    .catch((err) => {
      console.log("error in finAll()");
      res.status(404).send(err);
    });
});

app.post("/insertorderdetails", (req, res) => {
  username_param = req.body.username;
  orderdetails_param=req.body.orderdetails;
  console.log("in /insertorderdetails body\n");
  
  OrderObj = { 
    email: username_param,
    orderdetails: orderdetails_param,
}

console.log(JSON.stringify(OrderObj)+'\n');
  orderTable.build(OrderObj, { raw: true })
  .save()
  .then((data) => {
      console.log('records insert are...' + data);
      res.send(data);
  }).catch((err) => {
      console.log("error in insertorderdetails/post()");
      console.log(err);
      res.status(401).send(err);
  })
});

app.post("/sendmail", (req, res) => {
  username = req.body.username;

  console.log("in /sendmail body\n");
  console.log(JSON.stringify(username));
  console.log("in /sendmail" + username + "username received");
  main(username).catch(console.error);
  res.send("completed");
});

app.get("/", (req, res) => {
  console.log("in /");
  res.send("hello");
});

app.get("/getAllUsers", (req, res) => {
  console.log("\n in /getAllUsers  ");

  userTable
    .findAll({ raw: true })
    .then((data) => {
      console.log("fetched...");
      res.send(data);
    })
    .catch((err) => {
      console.log("error in finAll()");
      res.status(404).send(err);
    });
});

app.get("/getAllMenProducts", (req, res) => {
  console.log("\n in /getAllMenProducts  ");

  menProductsTable
    .findAll({ raw: true })
    .then((data) => {
      console.log("fetched...");
      res.send(data);
    })
    .catch((err) => {
      console.log("error in finAll()");
      res.status(404).send(err);
    });
});

app.get("/getAllWomenProducts", (req, res) => {
  console.log("\n in /getAllWomenProducts  ");

  womenProductsTable
    .findAll({ raw: true })
    .then((data) => {
      console.log("fetched...");
      res.send(data);
    })
    .catch((err) => {
      console.log("error in finAll()");
      res.status(404).send(err);
    });
});

app.get("/getAllKidsProducts", (req, res) => {
  console.log("\n in /getAllKidsProducts  ");

  kidsProductsTable
    .findAll({ raw: true })
    .then((data) => {
      console.log("fetched...");
      res.send(data);
    })
    .catch((err) => {
      console.log("error in finAll()");
      res.status(404).send(err);
    });
});
app.get("/getuserById/:id", (req, res) => {
  console.log("\n in /getPolicyById/:id ");
  id = req.params.id;
  userTable
    .findByPk(id, { raw: true })
    .then((data) => {
      console.log("fetched...");
      res.send(data);
    })
    .catch((err) => {
      console.log("error in finAll()");
      res.status(404).send(err);
    });
});

app.post("/validate", (req, res) => {
  console.log("\n in /validate");
  username_param = req.body.email;
  password_param = req.body.password;
  userTable
    .findAll({
      raw: true,
      // attributes: ['username', 'password'],
      where: {
        email: username_param,
        password: password_param,
      },
    })
    .then((data) => {
      console.log("fetched..." + JSON.stringify(data));
      console.log(data.length);
      if (data.length != 0) {
        console.log(JSON.stringify(data) + "from validate");
        res.send("validated" + JSON.stringify(data));
      } else {
        res.send("no_user_found");
      }
    })
    .catch((err) => {
      console.log("error in validate/get()");
      console.log(err);
      res.status(401).send(err);
    });
});

app.post("/insertnewUser", (req, res) => {
  console.log("\n in /insertnewUser ");

  uid_param = req.body.uid;
  username_param = req.body.username;
  password_param = req.body.password;
  email_param = req.body.email;

  userObj = {
    uid: uid_param,
    username: username_param,
    password: password_param,
    email: email_param,
  };

  userTable
    .build(userObj, { raw: true })
    .save()
    .then((data) => {
      console.log("records insert are..." + JSON.stringify(data));
      res.send("success");
    })
    .catch((err) => {
      console.log("error in inserting/post()");
      res.status(401).send("failed");
    });
});

app.put("/updateUser", (req, res) => {
  uid_param = req.body.uid;
  username_param = req.body.username;
  password_param = req.body.password;
  email_param = req.body.email;

  userObj = {
    uid: uid_param,
    username: username_param,
    password: password_param,
    email: email_param,
  };
  console.log("\n");
  // console.log(empObj);
  userTable
    .update(userObj, { where: { uid: uid_param } })
    .then((data) => {
      console.log("records updated are..." + data);
      res.send(data);
    })
    .catch((err) => {
      console.log("error in updating/put()");
      res.status(401).send(err);
    });
});

//delete
app.delete("/deleteUser/:id", function (req, res) {
  console.log("in /deleteuser...");
  var id = req.params.id;
  userTable
    .destroy({ where: { uid: id } })
    .then((data) => {
      console.log("records user deleted are..." + data);
      res.status(200).send("record id deleted: " + id);
    })
    .catch((err) => {
      console.log("error in destroy()");
      res.status(400).send(err);
    });
});

app.listen(8001, () => {
  console.log("server started at http://localhost:8001");
});
// orderTable.sync()
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))
// menProductsTable
//   .sync({force:true})
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
// kidsProductsTable.sync({force:true})
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))
// womenProductsTable.sync({force:true})
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))

// _____ProductsTable
//   .bulkCreate([
//     {
//       title: 'Boys Cotton dress',
//       description: 'Bold N Elegant Cool Printed Bear Cartoon Printed ',
//       price: 1599,
//       rating: 4,
//       img: '../../../../../assets/kids/1.jpg',
//     },
//     {
//       title: 'Boys woolen dress blue',
//       description:
//         'Some quick example text to build on the card title and make up the bulk of the card content',
//       price: 1399,
//       rating: 4,
//       img: '../../../../../assets/kids/2.jpg',
//     },
//     {
//       title: 'kids panda dress',
//       description:
//         ' Baby Spring Hooded Flannel Romper Panda Style Outfits Panda',
//       price: 1299,
//       rating: 3,

//       img: '../../../../../assets/kids/3.jpg',
//     },
//     {
//       title: 'girls dress',
//       description:
//         'pink girls dress with good texture',
//       price: 1199,
//       rating: 3,

//       img: '../../../../../assets/kids/4.jpg',
//     },
//     {
//       title: 'boys dress black and white',
//       description:
//         'boys dress black and white stripes',
//       price: 1199,
//       rating: 4,

//       img: '../../../../../assets/kids/5.jpg',
//     },
//     {
//       title: 'girls dress',
//       description:
//         'girls dress blue colour with pink design',
//       price: 1399,
//       rating: 2,

//       img: '../../../../../assets/kids/6.jpg',
//     },
//     {
//       title: 'boys dress set',
//       description:
//         'Bold N Elegant Sky Blue n Grey Cute Elephant Tail 2pc',
//       price: 1299,
//       rating: 3,

//       img: '../../../../../assets/kids/7.jpg',
//     },
//     {
//       title: 'Kids Cotton Printed Clothing Set',
//       description:
//       'Material: Cotton blend, Smooth breathable and Skin-Friendly Fabric',
//       price: 1599,
//       rating: 2,

//       img: '../../../../../assets/kids/8.jpg',
//     },
//     {
//       title: 'Boys Cotton Stylish T-Shirt',
//       description:
//         'Boys Cotton Stylish T-Shirt and Pant Set in Orange Color',
//       price: 1499,
//       rating: 3,

//       img: '../../../../../assets/kids/9.jpg',
//     },
//     {
//       title: 'girls summer style dress',
//       description:
//         'Baby Girl Dress Spring Summer Baby Girl Princess Clothes',
//       price: 999,
//       rating: 4,
//       img: '../../../../../assets/kids/10.jpg',
//     },
//     {
//       title: 'Boys Chest Printed shirt ',
//       description:
//         'Boy Chest Printed Hooded Sweatshirt',
//       price: 2000,
//       rating: 4,
//       img: '../../../../../assets/kids/11.jpg',
//     },
//   ])
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
