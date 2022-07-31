'use strict';

var __instance = null;

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const orgNameRegex = /^[\p{L} ,.*!?()@'0-9-]{3,50}$/iu;
const latLngRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
const orgDescRegex = /^[\p{L} ,.*!?()@'0-9-]{3,500}$/iu;
const orgVerRegex = /^[\p{L} ,.*!?()@'0-9-]{3,500}$/iu;

const User = {

    checkEmail: function checkEmail(email) {
        if (!mailRegex.test(email)) {
            if (this.throwsException)
                throw new Error('User.checkEmail: data is invalid');
            return false;
        }
        return true;
    },

    checkPassword: function checkPassword(password) {
        if (!passwordRegex.test(password)) {
            if (this.throwsException)
                throw new Error('User.checkPassword: data is invalid');
            return false;
        }
        return true;
    },

    checkCredentials: function checkCredentials(email, password) {
        User.checkEmail(email);
        User.checkPassword(password);
        return true;
    },

}

const Org = {

    checkName: function checkName(name) {
        if (!orgNameRegex.test(name)) {
            if (this.throwsException)
                throw new Error('Org.checkName: data is invalid');
            return false;
        }
        return true;
    },

    checkLocation: function checkLocation(location) {
        if (!latLngRegex.test(location)) {
            if (this.throwsException)
                throw new Error('Org.checkLocation: data is invalid');
            return false;
        }
        return true;
    },

    checkDescription: function checkDescription(description) {
        if (!orgDescRegex.test(description)) {
            if (this.throwsException)
                throw new Error('Org.checkDescription: data is invalid');
            return false;
        }
        return true;
    },

    checkVerification: function checkVerification(verification) {
        if (!orgVerRegex.test(verification)) {
            if (this.throwsException)
                throw new Error('Org.checkVerification: data is invalid');
            return false;
        }
        return true;
    },

    checkOrganization: function checkOrganization(
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
    },

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

class sbl {

    constructor(throwsException = false) {
        this.throwsException = throwsException;
        this.User = User;
        this.Org = Org;
        this.Utils = Utils;
        this.User.throwsException = throwsException;
        this.Org.throwsException = throwsException;
        this.Utils.throwsException = throwsException;
    }

    static getInstance(throwsException = false) {
        if (__instance === null)
            __instance = new sbl(throwsException);
        return __instance;
    }

    thatDontThrow() {
        this.throwsException = false;
        return this;
    }
}

module.exports = sbl;