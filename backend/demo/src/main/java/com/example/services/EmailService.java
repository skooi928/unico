package com.example.services;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

import com.example.utils.PropertyLoader;

public class EmailService {
    private static final String EMAIL = PropertyLoader.getProperty("email");
    private static final String APP_PASSWORD = PropertyLoader.getProperty("email.password");

    public void sendVerificationEmail(String to, String token) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(EMAIL, APP_PASSWORD);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(EMAIL));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
        message.setSubject("Verify Your Email");

        String verificationLink = "http://localhost:5173/verify?token=" + token;
        String htmlContent = String.format(
                "<h2>Welcome to Our App!</h2>" +
                        "<p>Please click the link below to verify your email:</p>" +
                        "<a href='%s'>Verify Email</a>" +
                        "<p>This link will expire in 24 hours.</p>",
                verificationLink);

        message.setContent(htmlContent, "text/html; charset=utf-8");
        Transport.send(message);
    }
}