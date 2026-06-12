const FAKE_DELAY = 600;

export function mockLogin({ userId, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId || !password) {
        reject(new Error('Missing credentials'));
        return;
      }
      resolve({
        user: { id: userId, name: 'Alex Wando', role: 'Admin' },
        token: 'mock-token-' + Math.random().toString(36).slice(2),
      });
    }, FAKE_DELAY);
  });
}
