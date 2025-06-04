export const getLoggedInUserId = (req) => req.user?._id || null;
