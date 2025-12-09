const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
            maxLength: 50,
        },
        emailId: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            maxLength: 100,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email Id.")
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Password is weak. Please enter a strong password.")
                }
            }
        },
        age: {
            type: Number,
            min: 18,
            max: 100,
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "other"].includes(value)) {
                    throw new Error("Gender is not valid.")
                }
            },
            maxLength: 6,
            lowercase: true,
        },
        about: {
            type: String,
            default: "Hey there! Let's connect",
            maxLength: 250,
        },
        photoUrl: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s',
            maxLength: 200,
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("The Photo URL is invalid.")
                }
            }
        },
        skills: {
            type: [String],
            validate(value) {
                if (value?.length > 10) {
                    throw new Error("Maximum 10 skills can be added.")
                }
            }
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        membershipType: {
            type: String,
            enum: {
                values: ["gold", "silver"],
                message: '{VALUE} is incorrect membership type.'
            },
        },
        membershipValidity: {
            type: String,
            enum: {
                values: ["3 Months", "6 Months"],
                message: '{VALUE} is incorrect membership type.'
            },
        }
    },
    {
        timestamps: true
    }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '7d' });
    return token;
}

userSchema.methods.validatePassword = async function (passwordEnteredByUser) {
    const user = this;
    const passwordHash = user?.password;
    const isPasswordValid = await bcrypt.compare(passwordEnteredByUser, passwordHash);
    return isPasswordValid;
}

const User = model("User", userSchema);

module.exports = User;
