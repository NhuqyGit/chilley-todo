export const validateUsernameSyntax = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,}$/;
    return regex.test(username);
};
export const validateEmailSyntax = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};
