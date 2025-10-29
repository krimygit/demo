const ROLES = {
    NEEDER: "Needer",
    DEEDER: "Deeder",
    BOTH: "Both",
    ADMIN: "Admin"
};

const STATUS = {
    ENABLE: "Enable",
    DISABLE: "Disable",
    DELETED: "Deleted",
};

const TOKEN_TYPE = {
    ACCESS_TOKEN: 1,
    REFRESH_TOKEN: 2,
    VERIFICATION_TOKEN: 3,
    RESET_PASSWORD: 4,
};
const DEFAULT_IMAGE = { //https://res.cloudinary.com/zudu/image/upload/v1624276544/Yatapay/blank-profile.png
    URL: 'https://res.cloudinary.com/zudu/image/upload',
    DUMMYPROFILE: '/v1624276544/Yatapay/blank-profile.png'
}

module.exports = {
    ROLES,
    TOKEN_TYPE,
    DEFAULT_IMAGE,
    STATUS,
};
