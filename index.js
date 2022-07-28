'use strict';

const { isEmail, isAscii, isLatLong, minLength, maxLength } = require('class-validator');
const fetch = require('node-fetch');

class User {

    static checkEmail(email) {
        if (
            !isEmail(email)
        )
            throw new Error('User.checkEmail: data is invalid');
        return true;
    }

    static checkPassword(password) {
        if (
            !isAscii(password) ||
            !minLength(password, 8)
        ) throw new Error('User.checkPassword: data is invalid');
        return true;
    }

    static checkCredentials(email, password) {
        User.checkEmail(email);
        User.checkPassword(password);
        return true;
    }

}

class Org {

    static checkName(name) {
        if (
            !isAscii(name) ||
            !minLength(name, 3) ||
            !maxLength(name, 64)
        ) throw new Error('Org.checkName: data is invalid');
        return true;
    }

    static checkLocation(location) {
        // Temporary fix
        /*
        if (
            !isLatLong(location)
        ) throw new Error('Org.checkLocation: data is invalid');
        */
        return true;
    }

    static checkDescription(description) {
        if (
            !isAscii(description) ||
            !minLength(description, 10) ||
            !maxLength(description, 2056)
        ) throw new Error('Org.checkDescription: data is invalid');
        return true;
    }

    static checkVerification(verification) {
        if (
            !isAscii(verification) ||
            !minLength(verification, 16) ||
            !maxLength(verification, 1024)
        ) throw new Error('Org.checkVerification: data is invalid');
        return true;
    }

    static checkOrganization(
        name,
        location,
        description,
        verification
    ) {
        Org.checkName(name);
        Org.checkLocation(location);
        Org.checkDescription(description);
        Org.checkVerification(verification);
        return true;
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
        return true;
    }
}

module.exports = {
    User,
    Org,
    Utils
}