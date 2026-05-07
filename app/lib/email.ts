import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    try {
        const info = await transporter.sendMail({
            from: `"RankNexis Systems" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        
        return { success: false, error };
    }
}

export function getInviteTemplate(name: string, setupLink: string) {
    return `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 24px;">
            <h1 style="font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.05em; color: #000;">Welcome to <span style="color: #FF4D00;">RankNexis</span></h1>
            <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">Hello ${name || 'Expert'},</p>
            <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">You have been added to the RankNexis internal node. To activate your account and start managing your portfolio, please set up your password using the link below:</p>
            <div style="margin: 32px 0;">
                <a href="${setupLink}" style="background-color: #FF4D00; color: #fff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">Setup Your Password</a>
            </div>
            <p style="font-size: 12px; color: #9ca3af;">This link will expire in 24 hours. For security, please do not share this email.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
            <p style="font-size: 10px; color: #9ca3af; text-transform: uppercase; font-weight: 800;">RankNexis Strategy & Vision • Systems Engineering Node</p>
        </div>
    `;
}

export function getResetTemplate(resetLink: string) {
    return `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 24px;">
            <h1 style="font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.05em; color: #000;">Password <span style="color: #FF4D00;">Reset.</span></h1>
            <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">A password reset request was initiated for your RankNexis account.</p>
            <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">Click the button below to initialize your new access code:</p>
            <div style="margin: 32px 0;">
                <a href="${resetLink}" style="background-color: #000; color: #fff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">Reset Password</a>
            </div>
            <p style="font-size: 12px; color: #9ca3af;">This link is valid for 1 hour. If you did not request this, please ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
            <p style="font-size: 10px; color: #9ca3af; text-transform: uppercase; font-weight: 800;">RankNexis Systems • Secure Access Protocol</p>
        </div>
    `;
}
