class Messages {

    static EMAIL_NOT_FOUND = "Sorry! We couldn't find an account associated with this email address."
    static PASSWORD_INCORRECT = "Incorrect password. Please try again or click on 'Forgot Password' below."
    static LOGIN = 'You have successfully logged in';
    static ACCOUNT_DELETED = 'This account has been deleted and is no longer active.';
    static USER_NOT_DELETED = 'This account has been deleted and is no longer active.';
    static ACCOUNT_DISABLED = 'This account is disabled. Please contact your administrator.';
    static EMAIL_NOT_VERIFY = 'You need to verify your email address. Please check your registered email address inbox or spam for account activation';
    static ID_NOT_FOUND = "Sorry! We couldn't find an account with that ID";
    static FORGOT_PASSWORD = 'Your password reset link has been successfully sent';
    static INVALID_LINK = 'Sorry, the reset password link has expired. Please request a new link using forgot password';
    static VALID_LINK = 'Your account has been successfully verified!';
    static REFRESH_TOKEN = 'Tokens are refreshed.';
    static USER_NOT_FOUND = 'Sorry! We couldn\'t find an account associated with this ';

    static USER_SUCCESS = {
        phone: "OTP sent successfully to your phone number.",
        email: "Please enter your password to continue.",
        google: "You can log in.",
        apple: "You can log in."
    };
    static ACCOUNT_CREATED = 'You have successfully created an account!';
    static OTP_NOT_FOUND = 'Sorry! We couldn\'t find an account associated with this OTP.';
    static INVALID_CREDENTIALS = 'Invalid password. Please try again.';
    static USER_FETCH_SUCCESS = 'Users fetched successfully';
}

module.exports = Messages
