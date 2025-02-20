import { Resend } from "resend";
import dotenv from "dotenv"
dotenv.config();

const resend = new Resend(process.env.RESEND_API)

const sendEmail = async function({subject,html}) {
  const { data, error } = await resend.emails.send({
    from: "IdeaMAll <onboarding@resend.dev>",
    to: "kkjha817855@gmail.com",
    subject: subject,
    html: html,
  });
  if (error) {
    return console.error({ error });
  }
};



export default sendEmail;