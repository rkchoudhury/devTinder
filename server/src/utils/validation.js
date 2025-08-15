const validator = require("validator");

const validateSignUpData = (data) => {
    const { firstName, lastName, emailId, password } = data;

    if (!firstName || firstName?.length < 4 || firstName?.length > 50) {
        throw new Error("First Name is not valid");
    } else if (lastName?.length > 50) {
        throw new Error("Last Name is not valid");
    } else if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Email Id is not valid");
    } else if (!password || !validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }

};

const validateLoginData = (emailId) => {
    const isValidEmailId = validator.isEmail(emailId);

    if (!isValidEmailId) {
        throw new Error("Invalid EmailId.");
    }
}

const validateForgotPasswordData = (emailId, password) => {
    const isValidEmailId = validator.isEmail(emailId);
    const isValidPassword = validator.isStrongPassword(password);

    if (!isValidEmailId) {
        throw new Error("Invalid EmailId.");
    }

    if (!isValidPassword) {
        throw new Error("Please enter a strong password");
    }
}

const validateEditProfileData = (data) => {
    const allowedFieldUpdate = [
        "firstName",
        "lastName",
        "gender",
        "age",
        "gender",
        "about",
        "photoUrl",
        "skills",
    ];

    const shouldAllowUpdate = Object.keys(data).every(key => allowedFieldUpdate.includes(key));
    return shouldAllowUpdate;
};


module.exports = {
    validateSignUpData,
    validateLoginData,
    validateEditProfileData,
    validateForgotPasswordData,
}