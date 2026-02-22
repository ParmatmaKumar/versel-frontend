import React from 'react'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import ContactDetails from '../components/ContactPage/ContactDetails'
import Footer from '../components/common/Footer'

const Contact = () => {
    return (
      <div>
          <div className="mx-auto my-20 flex w-[1260px] max-w-maxContent flex-col justify-between text-white lg:flex-row gap-10">

            <div className="lg:w-[40%]">
                <ContactDetails />
            </div>
            <div className='flex flex-col items-center justify-center border border-gray-400 rounded-lg lg:w-[60%] p-15'>
                <h1 className='text-gray-100 text-4xl font-bold mb-4'>Got a Idea? We've got the skills. Let's team up</h1>
                <p className='text-gray-400 mt-5 mb-8 text-[17px]'>Tell us more about yourself and what you're got in mind.</p>
                <ContactUsForm />
            </div>

        </div> 

        {/* Review  */}


        <Footer/>
      </div>
    )
}
export default Contact