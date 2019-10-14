import sendGrid from "@sendgrid/mail";
import configurations from "../config";

sendGrid.setApiKey(configurations.SENDGRID_API_KEY);

export const sendEmail = async(mailOptions) => {
    try {
         await sendGrid.send(mailOptions);
    } catch (error) {
        return e.message || "Couldnot send the email"; 
    }
    
}