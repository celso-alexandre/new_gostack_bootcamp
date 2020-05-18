export default {
  jwt: {
    secret: process.env.APP_SECRET || 'P4ssw0rd1234567890',
    expiresIn: '1d',
  },
}
