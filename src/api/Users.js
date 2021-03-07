const BASE_URL = process.env.REACT_APP_USERS_URL;

export class Users {
  static async list() {
    try {
      const response = await fetch(`${BASE_URL}users.json`);
      if (!response.ok) {
        throw new Error('Invalid response from server');
      }

      return response.json();
    } catch (e) {
      return null;
    }
  }

  static async read(userId) {
    try {
      const response = await fetch(`${BASE_URL}${userId}.json`);
      if (!response.ok) {
        throw new Error('Invalid response from server');
      }

      return response.json();
    } catch (e) {
      return null;
    }
  }
}
