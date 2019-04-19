export default function ({ app }) {
  // common process on response
  app.$axios.interceptors.response.use(response => response, (error) => {
    const message = error.response.data.message || 'Error is occured on the server.';

    if (process.client) {
      alert(message);

      // Credential Error
      if (error.response.status === 401) {
        // window.location = '/login';
      }
    }
  });
};
