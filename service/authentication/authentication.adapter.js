export const toTokenRequestJson = data => {
  if (data) {
    return {
      ttl: data.ttl,
      privateKey: data.privateKey,
      userName: data.userName,
      password: data.password
    };
  }
  return null;
};

export const toRefreshTokenRequestJson = data => {
  if (data) {
    return {
      ttl: data.ttl,
      refreshToken: data.refreshToken
    };
  }
  return null;
};

export const toAuthentication = data => {
  if (data) {
    return {
      id: data.id,
      token: data.token,
      expiryDate: data.expiryDate,
      refreshToken: data.refreshToken,
      isExpired: data.isExpired
    };
  }
  return null;
};
