import React from 'react';
import ContactUsForm from '../../ContactPage/ContactUsForm';

const ContactFormSection = () => {
    return (
        <div className='flex flex-col items-center justify-center my-20'>
            <h1 className='text-gray-100 text-4xl font-bold mb-4'>Get in Touch</h1>
            <p className='text-gray-400 mb-8 text-[17px]'>We'd love to hear from you! Please fill out this form.</p>
            <div className="w-[40%] ">
                <ContactUsForm />
            </div>
        </div>
    )
}
export default ContactFormSection;