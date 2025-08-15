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
        "about",
        "photoUrl",
        "skills",
    ];

    const shouldAllowUpdate = Object.keys(data).every(key => allowedFieldUpdate.includes(key));

    if (shouldAllowUpdate) {
        const { firstName, lastName, about, photoUrl, skills } = data;

        // Further data validation:
        // If we have added any condtion in the User schema level then 
        // that validation will be also applied when the data is being entered into the Database.
        if (firstName?.length < 4 || firstName?.length > 50) {
            throw new Error("First Name is not valid");
        } else if (lastName?.length > 50) {
            throw new Error("Last Name is not valid");
        } else if (about?.length > 50) {
            throw new Error("Maximum 250 characters length can be allowed in the about field.");
        } else if (photoUrl && !validator.isURL(photoUrl)) {
            throw new Error("Invalid photo URL.");
        } else if (skills?.length > 10) {
            throw new Error("Maximum 10 skills can be allowed.");
        }
    } else {
        throw new Error("Invalid edit request!");
    }
};


module.exports = {
    validateSignUpData,
    validateLoginData,
    validateEditProfileData,
    validateForgotPasswordData,
}