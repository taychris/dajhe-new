import toast from "react-hot-toast";

const ContactForm = () => {
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      message: event.target.message.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/contact'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    if(response.status === 200) {
      toast.success('Čoskoro o nás budete počut.')
      event.target.reset()
    }
    if(response.status === 500) {
      console.log(response.json())
      toast.error('Internal server error.')
    }
  }

  return (
    <>
        <form className="flex flex-col max-w-xl w-full relative z-0" id="contact" onSubmit={handleSubmit}>
            <label className="text-lg font-thin mb-1" htmlFor="fullName">Full name</label>
            <input className="rounded-full mb-4 text-[#241127] px-2 py-1 shadow-md shadow-slate-500 font-extralight" name="fullName" type="text" required/>

            <label className="text-lg font-thin mb-1" htmlFor="email">Your email</label>
            <input className="rounded-full mb-4 text-[#241127] px-2 py-1 shadow-md shadow-slate-500 font-extralight" name="email" type="email" required/>
            
            <label className="text-lg font-thin mb-1" htmlFor="message">Message</label>
            <textarea className="rounded-2xl text-[#241127] px-2 py-1 shadow-md shadow-slate-500 mb-8 font-extralight" name="message" id="" cols="30" rows="5" required></textarea>
            
            <button className="max-w-max rounded-full text-[#241127] bg-[#AFFC41] px-8 py-2 m-auto font-light md:text-xl hover:text-white duration-500" type="submit">
              send.
            </button>
            <img className="absolute -z-10 bottom-[20%] right-[-20%] w-96 md:right-[-30%]" src="https://github.com/taychris/lots-of-images/blob/main/paper_plane.png?raw=true"/>
        </form>
    </>
    )
}

export default ContactForm