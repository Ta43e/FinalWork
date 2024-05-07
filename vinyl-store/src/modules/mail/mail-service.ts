import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

@Injectable()
export class MailService {
  configService = new ConfigService();
  private sender: string = this.configService.get('SENDER');
  private pass: string = this.configService.get('PASS_MAIL');

  async sendMail(message: string, rec?: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: this.sender,
        pass: this.pass,
      },
    });
    const mailOption: nodemailer.SendMailOptions = {
      from: this.sender,
      to: rec,
      subject: 'FinalWork ALEH KOZAK',
      text: message,
      html: `<i>${message}</i>`,
    };

    transporter.sendMail(mailOption, (error: Error | null) => {
      if (error) {
        console.error('Error occurred while sending email:', error);
      } else {
        console.log('Email sent successfully');
      }
    });
  }
}
