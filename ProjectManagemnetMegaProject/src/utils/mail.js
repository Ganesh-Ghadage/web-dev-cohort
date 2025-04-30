import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { ApiError } from "./api-error.js";

const sendMail = async (options) => {
  // Initialize mailgen instance with default theme and brand configuration
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Manager",
      link: "https://projectmanager.app",
    },
  });

  // For more info on how mailgen content work visit https://github.com/eladnava/mailgen#readme
  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // Generate an HTML email with the provided contents
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mail = {
    from: process.env.MAILTRAP_EMAIL,
    to: options.email, // list of receivers
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    return await transporter.sendMail(mail);
  } catch (error) {
    // As sending email is not strongly coupled to the business logic it is not worth to raise an error when email sending fails
    // So it's better to fail silently rather than breaking the app
    console.error("Error: ", error);
    throw new ApiError(
      error?.statusCode || 502,
      error?.message || "Mail sent failed",
    );
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project Manager! We're very excited to have you on board.",
      action: {
        instructions: "To verify your email please click on the below button:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of our account",
      action: {
        instructions: "To reset your password click on the below button:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Please ignore if you haven't requested for password rest. \nNeed help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

async function sendVerifyMail(username, email, token) {
  const options = {
    username,
    email,
    subject: "Verify user email",
    mailgenContent: emailVerificationMailgenContent(
      username,
      `${process.env.BASE_URL}/api/v1/users/verify/${token}`,
    ),
  };

  const info = await sendMail(options);

  // console.log(info)

  return info;
}

async function sendForgotPasswordMail(username, email, token) {
  const options = {
    username,
    email,
    subject: "Reset your password",
    mailgenContent: forgotPasswordMailgenContent(
      username,
      `${process.env.BASE_URL}/api/v1/users/rest-password/${token}`,
    ),
  };

  const info = await sendMail(options);

  // console.log(info)

  return info;
}

export { sendVerifyMail, sendForgotPasswordMail };
