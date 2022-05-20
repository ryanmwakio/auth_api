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
      errorMessage: err.message,
      error: err,
    });
  }
};
