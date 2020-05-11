import nodemailer, { Transporter } from 'nodemailer'

import IMailProvider from '../models/IMailProvider'

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    const account = nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })

      console.log(account)

      this.client = transporter
    })
  }

  public async sendMail(to: string, body: string): Promise<void> {
    try {
      const message = await this.client.sendMail({
        from: 'GoBarber Team <gobarber@gobarber.com>',
        to,
        subject: 'Password Recovery ✔',
        text: body,
      })

      console.log('Message sent: %s', message.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    } catch (err) {
      throw new Error(err)
    }
  }
}
