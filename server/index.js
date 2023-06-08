import express, { json } from "express";
import mysql from "mysql";
import bcrypt from "bcrypt";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

let secretKey = "mysecretkey12345";
function generateToken(email) {
  const payload = { email };
  const secret = secretKey;
  const options = { expiresIn: "1h" };
  const token = jsonwebtoken.sign(payload, secret, options);
  return token;
}

const app = express();
const PORT = 3002;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bd",
});

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//get cars
app.post("/cars/get", (req, res) => {
  let q = `SELECT * FROM cars WHERE UserId='${req.body.userid}'`;
  db.query(q, (err, result) => {
    if (err) {
      return res.json({ success: false, msg: err });
    }
    res.json({ success: true, cars: result });
  });
});

app.post("/admin/cars/get", (req, res) => {
  const q = `SELECT c.*, u.name, u.surname
  FROM cars c
  JOIN users u ON c.UserId = u.id`;
  db.query(q, (err, result) => {
    if (err) {
      return res.json({ success: false, msg: err });
    }
    res.json({ success: true, cars: result });
  });
});

app.post("/car/get", (req, res) => {
  const q = `SELECT * FROM cars WHERE id='${req.body.carid}'`;
  db.query(q, (err, result) => {
    if (err) {
      return res.json({ success: false, msg: err });
    }
    console.log(result);
    res.json({ success: true, car: result });
  });
});

// get role
app.post("/get/role", (req, res) => {
  const query = `SELECT users.roleId, roles.name AS rolename
  FROM users
  JOIN roles ON users.roleId = roles.id
  WHERE users.id = '${req.body.userid}';`;
  db.query(query, (err, data) => {
    if (err) return res.json({ success: false, msg: err });
    return res.json({
      success: true,
      msg: "Success!",
      user: data,
    });
  });
});

//CAR

//ADD CAR
app.post("/add/car", (req, res) => {
  const q = `
  INSERT INTO cars (carbrand, carmodel, caryear, carplate, UserId, lastmodify)
  VALUES ('${req.body.car.carbrand}', '${req.body.car.carmodel}', '${req.body.car.caryear}', '${req.body.car.carplate}', ${req.body.userid} , CURDATE());
`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err });
    setModify(req.body.userid, "cars", data.insertId);
    return res.json({
      success: true,
      msg: "Success!",
    });
  });
});
//UPDATE CAR
app.post("/car/update", (req, res) => {
  const q = `
  UPDATE cars
  SET carbrand='${req.body.car.carbrand}', carmodel='${req.body.car.carmodel}', caryear='${req.body.car.caryear}', carplate='${req.body.car.carplate}' , lastmodify=CURDATE()
  WHERE id='${req.body.carid}'
`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err });
    setModify(req.body.userid, "cars", req.body.carid);
    return res.json({
      success: true,
      msg: "Success!",
    });
  });
});

//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const q = `SELECT password,id FROM users WHERE email='${email}'`;
  db.query(q, function (err, results) {
    if (err) {
      res.json({
        success: false,
        msg: err,
      });
    }
    if (results.length > 0) {
      const hash = results[0].password;
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          console.error(err);
          res.json({
            success: false,
            msg: err,
          });
        }
        if (result) {
          const token = generateToken(email);
          res.json({
            success: true,
            token: token,
            id: results[0].id,
            msg: "Sėkmingai prisijungta!",
          });
        } else {
          res.json({
            success: false,
            msg: "Neteisingas slaptažodis",
          });
        }
      });
    } else {
      res.json({
        success: false,
        msg: "Neteisingas slaptažodis",
      });
    }
  });
});

//autentification

app.post("/autentification", (req, res) => {
  const { token } = req.body;
  jsonwebtoken.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error(err);
    } else {
      const email = decoded.email;
      const query = `SELECT users.name, users.surname, users.id, users.RoleId, roles.name AS rolename
      FROM users
      JOIN roles ON users.roleId = roles.id
      WHERE users.email = '${email}';`;
      db.query(query, (err, data) => {
        if (err) if (err) return res.json({ success: false, msg: err });
        return res.json({ success: true, msg: "Success!", user: data });
      });
    }
  });
});

//register

app.post("/register", async (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      res.json({
        success: false,
        msg: "404",
      });
      return;
    }
    const q =
      "INSERT INTO users (`name`, `surname`, `email`, `tel`, `password` , 'roleId') VALUES (?)";
    const emailCheck = `SELECT * FROM users WHERE email='${req.body.email}' OR tel='${req.body.tel}'`;
    const values = [
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.tel,
      hash,
      3,
    ];
    db.query(emailCheck, (err, data) => {
      if (err) return res.json({ success: false, msg: err });

      if (data.length == 0) {
        db.query(q, [values], (err, data) => {
          if (err) return res.json({ success: false, msg: err });

          // setModify()
          return res.json({ success: true, msg: "Success!" });
        });
      } else {
        res.json({
          success: false,
          msg: "Toks el.paštas arba telefono numeris jau naudojamas !",
        });
      }
    });
  });
});

app.post("/workers/date", (req, res) => {
  const q = `SELECT * FROM workers WHERE id NOT IN ( SELECT DISTINCT WorkerId FROM reservations WHERE Date = '${req.body.date}' AND Time = '${req.body.time}' ); `;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});
app.post("/add/workers", (req, res) => {
  const q = `INSERT INTO workers (name, surname) VALUES ('${req.body.name}', '${req.body.surname}')`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
    });
  });
});
app.post("/workers", (req, res) => {
  const q = `SELECT * FROM workers`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

app.post("/edit/worker", (req, res) => {
  const q = `UPDATE workers SET name='${req.body.name}' , surname='${req.body.surname}' WHERE id=${req.body.id}`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});
app.post("/delete/worker", (req, res) => {
  const q = `DELETE FROM workers WHERE id='${req.body.id}'`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});
//reservacion

app.post("/get/rezervations/dates", (req, res) => {
  const query = `SELECT Time
  FROM reservations
  WHERE Date = '${req.body.date}';`;
  db.query(query, (err, data) => {
    if (err) return res.json({ success: false, msg: err });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

app.post("/reservation/create", (req, res) => {
  if (req.body.reservationId) {
    const q = `UPDATE reservations
    SET UserId='${req.body.userid}', Date='${req.body.date}' , Time='${
      req.body.time
    }', Description='${req.body.description}',CarId='${
      req.body.carid
    }',IsDeleted='${0}' , StatusId='${req.body.statusId}' , WorkerId='${
      req.body.workerId
    }'
    WHERE ReservationId='${req.body.reservationId}'`;

    db.query(q, (err, result) => {
      if (err) {
        return res.json({ success: false, msg: err });
      }
      setModify(req.body.userid, "reservations", req.body.reservationId);
      return res.json({
        success: true,
        msg: "Success!",
      });
    });
  } else {
    const q =
      "INSERT INTO reservations (`UserId`, `StatusId`, `Date`, `Time`, `Description`, `CarId` ,`IsDeleted`) VALUES (?)";
    const values = [
      req.body.userid,
      1,
      req.body.date,
      req.body.time,
      req.body.description,
      req.body.carid,
      0,
    ];
    db.query(q, [values], (err, result) => {
      if (err) {
        return res.json({ success: false, msg: err });
      }
      setModify(req.body.userid, "reservations", result.insertId);
      return res.json({
        success: true,
        msg: "Success!",
      });
    });
  }
});

app.post("/get/reservations", (req, res) => {
  const q = `SELECT * from reservations WHERE Date='${req.body.date}'`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

app.post("/get/reservation", (req, res) => {
  const q = `SELECT u.id as userId ,u.name, u.surname, u.email, u.tel ,
                  c.carbrand, c.carmodel, c.caryear, c.carplate, c.id as carId,
                  s.Id as statusId, s.text ,s.color,
                  r.Date , r.Time, r.Description, r.WorkerId
           FROM reservations r
           INNER JOIN users u ON r.UserId = u.id
           INNER JOIN cars c ON r.CarId = c.id
           INNER JOIN status s ON r.StatusId = s.Id
           WHERE r.ReservationId = '${req.body.id}'`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

app.post("/admin/reservations", (req, res) => {
  const query = `
  SELECT r.*, c.*, s.*, u.name, u.surname, u.email, u.tel
  FROM reservations r
  INNER JOIN users u ON r.UserId = u.id
  INNER JOIN cars c ON r.CarId = c.id
  INNER JOIN status s ON r.StatusId = s.Id
`;

  db.query(query, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

app.post("/reservations", (req, res) => {
  let q = "";
  if (req.body.userid == 1) {
    q = `SELECT r.*, c.*, s.*
    FROM reservations r
    INNER JOIN cars c ON r.CarId = c.id
    INNER JOIN status s ON r.StatusId = s.Id`;
  } else {
    q = `SELECT r.*, c.*, s.*
  FROM reservations r
  INNER JOIN cars c ON r.CarId = c.id
  INNER JOIN status s ON r.StatusId = s.Id
  WHERE r.UserId ='${req.body.userid}';`;
  }
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

//users
app.post("/profiles", (req, res) => {
  let q = `SELECT id, name, surname ,tel ,email FROM users WHERE roleId=3`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

app.post("/user/update", (req, res) => {
  const q = `UPDATE users 
  SET name='${req.body.name}', surname='${req.body.surname}', email='${req.body.email}', tel='${req.body.tel}'
  WHERE id='${req.body.id}'
  `;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    setModify(req.body.modifyUser, "users", req.body.id);
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

app.post("/getuser", (req, res) => {
  const q = `SELECT * FROM users WHERE id='${req.body.id}'`;
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, msg: err });
    return res.json({
      success: true,
      msg: "Success!",
      user: {
        id: data[0].id,
        name: data[0].name,
        surname: data[0].surname,
        tel: data[0].tel,
        email: data[0].email,
      },
    });
  });
});

//status
app.post("/get/status", (req, res) => {
  let query = "SELECT * FROM status";
  db.query(query, (err, data) => {
    if (err) return res.json({ success: false, msg: err, data: [] });
    return res.json({
      success: true,
      msg: "Success!",
      data: data,
    });
  });
});

// send email
// app.post("/api/register", async (req, res) => {
//   const { name, surname, email, tel, password } = req.body;

//   // Validate input fields
//   if (!name || !surname || !email || !tel || !password) {
//     res.json({ error: "Missing required fields" });
//     return;
//   }

//   // Validate email format
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     res.json({ error: "Invalid email address" });
//     return;
//   }

//   // Check if email already exists
//   // Generate confirmation code
//   const confirmationCode = Math.floor(Math.random() * 1000000);

//   // Send confirmation email
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "sig.kublickas99@gmail.com",
//       pass: "milywchwnoshnjqg",
//     },
//   });

//   const mailOptions = {
//     from: "sig.kublickas99@gmail.com",
//     to: "sig.kublickas99@gmail.com",
//     subject: "Confirm your email address",
//     text: `Your confirmation code is ${confirmationCode}`,
//   };

//   transporter.sendMail(mailOptions, async (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ error: "Failed to send confirmation email" });
//       return;
//     }

//     // Save user data and confirmation code in database
//     const userData = {
//       name,
//       surname,
//       email,
//       tel,
//       password,
//       confirmationCode,
//     };
//     // await users.insertOne(userData);
//     res.json({ message: "Registration successful" });
//   });
// });

// // Generate a verification token
// const generateVerificationToken = () => {
//   return crypto.randomBytes(20).toString("hex");
// };

// // Send confirmation email
// const sendConfirmationEmail = (user) => {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "sig.kublickas99@gmail.com",
//       pass: "milywchwnoshnjqg",
//     },
//   });

//   const mailOptions = {
//     from: "sig.kublickas99@gmail.com",
//     to: user.email,
//     subject: "Account Confirmation",
//     text: `Hello, ${user.username}! Please click the following link to confirm your registration: http://your_domain/verify/${user.verificationToken}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// Registration endpoint
// app.post("/register", (req, res) => {
//   const { username, email, password } = req.body;

//   // Check if the user already exists
//   const existingUser = users.find((user) => user.email === email);
//   if (existingUser) {
//     return res.status(400).json({ error: "User already exists." });
//   }

//   // Generate a verification token
//   const verificationToken = generateVerificationToken();

//   // Create a new user object
//   const newUser = {
//     username,
//     email,
//     password,
//     verificationToken,
//     isVerified: false,
//   };

//   // Store the new user in the database
//   users.push(newUser);

//   // Send confirmation email
//   sendConfirmationEmail(newUser);

//   res.status(200).json({
//     message:
//       "Registration successful. Please check your email to confirm your account.",
//   });
// });

// Account verification endpoint
app.get("/verify/:token", (req, res) => {
  const { token } = req.params;

  // Find the user with the corresponding verification token
  const user = users.find((user) => user.verificationToken === token);

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }

  // Mark the user's account as verified
  user.isVerified = true;
  user.verificationToken = null;

  res.status(200).json({ message: "Account verified successfully." });
});

const setModify = (userId, table, rowId) => {
  const q = `INSERT INTO modify (userId, modifydate, modifytime ,modifytable,modifyrowid)
  VALUES ('${userId}', CURDATE(), CURTIME(), '${table}', '${rowId}');`;
  db.query(q, (err, data) => {
    if (err) console.log({ success: false, msg: err });
    console.log({ success: true, msg: "Success!" });
  });
};
