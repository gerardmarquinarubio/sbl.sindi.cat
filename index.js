const { isEmail, isAscii, isLatLong, minLength, maxLength } = require('class-validator');

class User {

    static checkCredentials(email, password) {
        if (
            !isEmail(email) ||
            !isAscii(password) ||
            !minLength(password, 8)
        ) throw new Error('User.checkCredentials: data is invalid');
    }

}

class Org {

    static checkOrganization(
        name,
        location,
        description,
        verification
    ) {
        if (
            !isAscii(name) ||
            !minLength(name, 3) ||
            !maxLength(name, 64) ||
            !isLatLong(location) ||
            !isAscii(description) ||
            !minLength(description, 10) ||
            !maxLength(description, 2056) ||
            !isAscii(verification) ||
            !minLength(verification, 16) ||
            !maxLength(verification, 1024)
        ) throw new Error('Org.checkOrganization: data is invalid');
    }
}

class Utils {
    static async verifyHcaptcha(hcaptcha) {
        const data = await fetch('https://hcaptcha.com/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${process.env.HCAPTCHA}&response=${hcaptcha}`
        });
        const json = await data.json();
        if (!json.success)
            throw new Error('Invalid hcaptcha');
    }
}

module.exports = {
    User,
    Org,
    Utils
}