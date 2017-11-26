export const getCurrentUser = (user) => {
  if (!user) return { loggedIn: false };

  return {
    loggedIn: true,
    user,
  };
};

