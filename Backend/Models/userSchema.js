const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("This is not valid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password min length 8 must contain a symbol,upper and lowercase letters"
    );
  }
  try {
    const exists = await this.findOne({ email });
    if (exists) {
      throw new Error("Email Already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashPassword });
    return user;
  } catch (error) {
    throw new Error("Error signing up: " + error.message);
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All the field must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email address");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("password does not match");
  } else {
    return user;
  }
};

module.exports = mongoose.model("Users", userSchema);
