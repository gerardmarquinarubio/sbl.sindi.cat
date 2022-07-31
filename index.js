'use strict';

var throwsException = true;

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const orgNameRegex = /^[\p{L} (),@1-9-]{3,50}$/giu;
const latLngRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
const orgDescRegex = /^[\p{L} ,.*!?()@1-9-]{3,500}$/giu;
const orgVerRegex = /^[\p{L} ,.*!?()@1-9-]{3,500}$/giu;

class User {

    static checkEmail(email) {
        if (!mailRegex.test(email)) {
            if (throwsException)
                throw new Error('User.checkEmail: data is invalid');
            return false;
        }
        return true;
    }

    static checkPassword(password) {
        if (!passwordRegex.test(password)) {
            if (throwsException)
                throw new Error('User.checkPassword: data is invalid');
            return false;
        }
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
        if (!orgNameRegex.test(name)) {
            if (throwsException)
                throw new Error('Org.checkName: data is invalid');
            return false;
        }
    }

    static checkLocation(location) {
        if (!latLngRegex.test(location)) {
            if (throwsException)
                throw new Error('Org.checkLocation: data is invalid');
            return false;
        }
        return true;
    }

    static checkDescription(description) {
        if (!orgDescRegex.test(description)) {
            if (throwsException)
                throw new Error('Org.checkDescription: data is invalid');
            return false;
        }
    }

    static checkVerification(verification) {
        if (!orgVerRegex.test(verification)) {
            if (throwsException)
                throw new Error('Org.checkVerification: data is invalid');
            return false;
        }
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
    static async verifyHcaptcha(hcaptcha, fetch) {
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
    throwsException,
    User,
    Org,
    Utils,
}