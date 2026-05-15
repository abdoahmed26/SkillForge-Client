import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export const sendContact = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    const allData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: data.message,
        toEmail: import.meta.env.VITE_EMAIL,
    }
    // console.log(allData);
    emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        allData,
        import.meta.env.VITE_PUBLIC_KEY
    )
    .then(() => {
        toast.success("Message sent successfully!");
    })
    .catch((error) => {
        console.error('Failed to send email. Error:', error);
        toast.error("Failed to send message!");
    });
}