const bcrypt = require("bcrypt");
const axios = require("axios");

const User = require("../models").User;

//postRegister
exports.postRegister = async (req, res, next) => {
  try {
    let { name, email, password, location_name } = req.body;

    //check if location_name is truthy
    if (!location_name) {
      location_name = "Nairobi, Kenya";
    }

    let url = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_KEY}&query=${location_name}`;
    let response = await axios.get(url);

    let latitude = response.data.data[0].latitude;
    let longitude = response.data.data[0].longitude;
    let region = response.data.data[0].region;

    //trim the user_name and email
    userName = name.trim();
    email = email.trim();
    password = password;

    //check if the user_name or email is empty
    if (!userName || !email || !password) {
      return res.json({
        successful: false,
        statusCode: 400,
        statusMessage: "Error",
        message: "Please fill in all the fields",
      });
    }

    //check if username is already taken
    let user_Name = await User.findOne({ where: { user_name: userName } });
    if (user_Name) {
      return res.json({
        successful: false,
        statusCode: 400,
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
      return res.json({
        successful: false,
        statusCode: 400,
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
      location_region: region,
      phone: "",
      website: "",
    });

    await newUser.save();

    let Otp = `${Math.floor(Math.random() * (9999 - 1000) + 1000)}`;

    if (newUser) {
      return res.json({
        message: "User created you can now login",
        statusCode: 201,
        successful: true,
        statusMessage: "Successful",
        responseObject: [
          {
            user_id: newUser.dataValues.id,
            otp: Otp,
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
    return res.json({
      statusMessage: "Error",
      message: "Something went wrong",
      statusCode: 500,
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
      return res.json({
        statusMessage: "error",
        statusCode: 400,
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
      return res.json({
        statusMessage: "Error",
        statusCode: 400,
        successful: false,
        message: "User does not exist",
      });
    }

    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        statusMessage: "Error",
        statusCode: 400,
        successful: false,
        message: "Password is incorrect",
      });
    }

    //if the user exists and the password is correct
    if (user) {
      return res.json({
        statusMessage: "Successful",
        statusCode: 200,
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
              name: user.user_name,
              phone: user.dataValues.phone,
              email: user.email,
              website: user.dataValues.phone,
            },
          },
        ],
      });
    }
  } catch (err) {
    return res.json({
      statusMessage: "Error",
      statusCode: 500,
      message: "Something went wrong",
      successful: false,
      errorMessage: err.message,
      error: err,
    });
  }
};
