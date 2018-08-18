export const toTokenRequestJson = data => {
  if (data) {
    return {
      tokenDurationMinutes: data.ttl,
      dashboardToken: data.privateKey
    };
  }
  return null;
};

export const toRefreshTokenRequestJson = data => {
  if (data) {
    return {
      tokenDurationMinutes: data.ttl,
      refreshToken: data.refreshToken
    };
  }
  return null;
};

export const toAuthentication = data => {
  if (data) {
    return {
      token: data.token,
      expiryDate: data.expiryDate,
      refreshToken: data.refreshToken,
      isExpired: data.isExpired
    };
  }
  return null;
};
