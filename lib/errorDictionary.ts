const ErrorDictionary = {
    NO_USERID_MATCHING_SESSION_TOKEN: 'No userId was found for the provided session token',
    NO_USER_MATCHING_SESSION_TOKEN: 'No user was found for the provided session token',
    NO_SESSION_TOKEN_PROVIDED: 'No session token was received',
    UNAUTHENTICATED: 'No session token or related user was detected',
    INVALID_REQUEST: 'The request is missing required parameters',
    INVALID_SLUG: 'The provided slug is invalid or already in use',
};

export default ErrorDictionary;
