export function getCookie(name) {
  try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
          const cookieValue = parts.pop().split(';').shift();
          return decodeURIComponent(cookieValue);
      }
      return null;
  } catch (err) {
      console.error('Error getting cookie:', err);
      return null;
  }
}

export const setCookie = (name, value) => {
  try {
    if (!name || value === undefined) {
      throw new Error('Invalid cookie parameters');
    }
    // No 'expires' or 'max-age' => session cookie
    document.cookie = `${name}=${value}; path=/`;
  } catch (err) {
    console.error('Error setting cookie:', err);
  }
};

export const deleteCookie = (name) => {
  try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  } catch (err) {
      console.error('Error deleting cookie:', err);
  }
}