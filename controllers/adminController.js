const Admin = require("../modals/admin");
const TokenDB = require("../modals/token");

const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;


const handleSignUp = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty) {
            return res.status(400).json({ errormsg: error.array() });
        }
        const { email, password } = matchedData(req)

        const admin = await Admin.find();
        if (admin.length >= 1) return res.status(400).json({ errorMsg: 'Admin already exists!' })

        const hash_password = await bcrypt.hash(password, saltRounds);

        const newAdmin = await Admin.create({
            email,
            password: hash_password
        });

        return res.status(201).json({ data: newAdmin });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};


const handleSignIn = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty) {
            return res.status(400).json({ errormsg: error.array() });
        }
        const { email, password } = matchedData(req);

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ errorMsg: 'please enter the correct email' });

        const payload = { email };
        const Token = jwt.sign(payload, process.env.secret_key);

        const isMatch = bcrypt.compare(password, admin.password)
        if (!isMatch) return res.status(400).json({ errorMsg: 'password not matched!' });

        const newUserToken = await TokenDB.create({
            email,
            token: Token
        });

        return res.status(200).json({ successMsg: 'Sign in successfully.', data: newUserToken });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
};



module.exports = {
    handleSignUp, handleSignIn
}