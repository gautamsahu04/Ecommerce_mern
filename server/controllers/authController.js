import userModel from "../models/userModel.js";
import { comparepassword, hashpassword } from "./authhelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }

    // check the user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already exist",
      });
    }
    // register User
    const hashedPassword = await hashpassword(password);
    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: "user created successfull",
      User:{
        name:newUser.name,
        email:newUser.email,
        phone:newUser.phone,
        address:newUser.address,


      },
    });
  } catch (error) {
    console.log(error);
    resizeBy.status(error).send({
      success: false,
      message: "error in registation",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "email and password are required" });
    }
    // check the user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "invalid email or password",
      });
    }
    // check the password
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "invalid email or password",
      });
    }
    // generate token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role:user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(error).send({
      success: false,
      message: "error in login",
    });
  }
};

export const tokencheck = (req, res) => {
  res.send("token is verified");
};
