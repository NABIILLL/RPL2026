interface User {
  name: string;
  email: string;
  id?: string;
}

export function saveUser(user: User): void {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user:', error);
  }
}

export function getUser(): User | null {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}

export function clearUser(): void {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Failed to clear user:', error);
  }
}
