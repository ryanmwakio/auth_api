const bcrypt = require("bcrypt");

const User = require("../models").User;

//postRegister
exports.postRegister = async (req, res, next) => {
  try {
    //destructure the req.body
    let { name, email, password } = req.body;

    //trim the user_name and email
    userName = name.trim();
    email = email.trim();
    password = password;

    //check if the user_name or email is empty
    if (!userName || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all the fields",
      });
    }

    //regex for name, email and password
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    //check if the name is valid
    if (!nameRegex.test(userName)) {
      return res.status(400).json({
        statusMessage: "error",
        message: "Name is invalid",
      });
    }

    //check if the email is valid
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        statusMessage: "error",
        message: "Email is invalid",
      });
    }

    //check if email already exists
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    //if the email already exists
    if (user) {
      return res.status(400).json({
        statusMessage: "error",
        message: "Email already exists",
      });
    }

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      userName: userName,
      is_verified: false,
      location_name: "",
      location_lat: 0,
      location_lng: 0,
      phone: "",
      website: "",
    });

    await newUser.save();

    if (newUser) {
      console.log(newUser);
      return res.status(201).json({
        statusMessage: "successful",
        message: "User created!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusMessage: "error",
      errorMessage: err.message,
      error: err,
    });
  }
};
