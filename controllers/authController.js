const bcrypt = require("bcrypt");
const axios = require("axios");

const User = require("../models").User;

//postRegister
exports.postRegister = async (req, res, next) => {
  try {
    //destructure the req.body
    let { name, email, password, location_name } = req.body;

    //check if location_name is truthy
    if (!location_name) {
      location_name = "Nairobi, Kenya";
    }

    let url = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_KEY}&query=${location_name}`;
    let response = await axios.get(url);

    let latitude = response.data.data[0].latitude;
    let longitude = response.data.data[0].longitude;

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

    //check if username is already taken
    let user_Name = await User.findOne({ where: { user_name: userName } });
    if (user_Name) {
      return res.status(400).json({
        statusMessage: "Error",
        message: "Username is already taken",
      });
    }

    //check if email already exists
    const userEmail = await User.findOne({
      where: {
        email: email,
      },
    });
    //if the email already exists
    if (userEmail) {
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
      user_name: userName,
      is_verified: false,
      location_name: location_name,
      location_lat: latitude || 0.0,
      location_lng: longitude || 0.0,
      phone: "",
      website: "",
    });

    await newUser.save();

    if (newUser) {
      console.log(newUser);
      return res.status(201).json({
        message: "User created!",
        statusCode: 201,
        successful: true,
        statusMessage: "Successful",
        responseObject: [
          {
            user_id: newUser.dataValues.id,
            otp: 12545,
            is_verified: newUser.dataValues.is_verified,
            password: newUser.dataValues.password,
            user_location: {
              location_name: newUser.dataValues.location_name,
              location_lat: newUser.dataValues.location_lat,
              location_lng: newUser.dataValues.location_lng,
            },
            user_contacts: {
              phone: newUser.dataValues.phone,
              email: newUser.email,
              website: newUser.dataValues.phone,
            },
          },
        ],
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusMessage: "Error",
      successful: false,
      errorMessage: err.message,
      error: err,
    });
  }
};

//post login async await
exports.postLogin = async (req, res, next) => {
  try {
    //destructure the req.body
    let { email, password } = req.body;

    //trim the email and password
    email = email.trim();
    password = password;

    //check if the email or password is empty
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        successful: false,
        message: "Please fill in all the fields",
      });
    }

    //find the user
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if the user does not exist
    if (!user) {
      return res.status(400).json({
        statusMessage: "Error",
        successful: false,
        message: "User does not exist",
      });
    }

    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        statusMessage: "Error",
        successful: false,
        message: "Password is incorrect",
      });
    }

    //if the user exists and the password is correct
    if (user) {
      console.log(user);
      return res.status(200).json({
        statusMessage: "Successful",
        successful: true,
        message: "User logged in",
        responseObject: [
          {
            user_id: user.dataValues.id,
            otp: 12545,
            is_verified: user.dataValues.is_verified,
            password: user.dataValues.password,
            user_location: {
              location_name: user.dataValues.location_name,
              location_lat: user.dataValues.location_lat,
              location_lng: user.dataValues.location_lng,
            },
            user_contacts: {
              phone: user.dataValues.phone,
              email: user.email,
              website: user.dataValues.phone,
            },
          },
        ],
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusMessage: "Error",
      successful: false,
      errorMessage: err.message,
      error: err,
    });
  }
};
