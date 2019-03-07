export default function ({ app, store, isServer }) {
  if (isServer) {
    return;
  }

  // common process on response
  app.$axios.interceptors.response.use(response => response, (error) => {
    const message = error.response.data.message || 'Error is occured on the server.';

    alert(message);

    // Credential Error
    if (error.response.status === 401) {
      window.location = '/login';
    }
  });
};
