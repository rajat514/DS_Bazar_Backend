const Admin = require("../modals/admin");
const TokenDB = require("../modals/token");


const IsLogIn = async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (authorization) {
        const token = authorization.split(' ')[1];
        if (!token) return res.status(403).json({ message: 'Token not found' });

        try {
            const decodedToken = await TokenDB.findOne({ token });
            if (!decodedToken) return res.status(400).json({ message: 'Token not correct' });
            // console.log(decodedToken)
            const admin = await Admin.findOne({ email: decodedToken.email })
            if (!admin) return res.status(400).json({ errorMsg: 'Invalid Token!' })

            req.admin = admin;

        } catch (error) {
            console.log(error);
            return res.status(500).json({ errorMsg: error });
        }
    }
    else {
        return res.status(401).json({ errorMsg: 'Unauthorized Access!' });
    }
    next()
};


const isLogOut = async (req, res) => {
    try {
        await TokenDB.deleteOne({ email: req.admin.email });

        return res.status(200).json({ successMsg: 'Log Out Successfully!' });

    } catch (error) {

    }
}


module.exports = {
    IsLogIn, isLogOut
}