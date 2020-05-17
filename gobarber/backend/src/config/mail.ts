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
      email: 'webmaster@celsoalexandre.com',
      name: 'Celso Alexandre Webmaster',
    },
  },
} as IMailConfig
