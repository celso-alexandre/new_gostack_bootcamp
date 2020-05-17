interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: process.env.DEFAULT_FROM_EMAIL_ADDRESS,
      name: process.env.DEFAULT_FROM_NAME,
    },
  },
} as IMailConfig
