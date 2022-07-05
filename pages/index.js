// import Head from 'next/head'
// import Image from 'next/image'

export default function Home() {
  return (
    <>
    {/* hero section */}
    <section className="mb-20 flex min-h-screen flex-col justify-center md:mb-0 md:flex-row">
      <div className="mb-16 flex w-full max-w-xl flex-col justify-center md:mb-0 md:w-1/2">
        <h1 className="mb-8 text-5xl font-bold md:mb-10 md:text-7xl">
          Growing your <br />
          <span className="text-[#AFFC41]">business.</span>
        </h1>
        <p className="mb-8 text-xl font-thin md:mb-10 md:text-3xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam consectetur atque est nemo ab facere.</p>
        <button className="max-w-max rounded-full bg-[#AFFC41] px-8 py-2 font-thin md:text-xl">consult now.</button>
      </div>
      <div className="flex w-full items-center px-5 md:w-1/2">
        <img className="max-h-96 w-full object-contain" src="https://github.com/taychris/lots-of-images/blob/main/hero-img.png?raw=true" alt="" />
      </div>
    </section>

    <section className="mb-20 flex min-h-screen flex-col items-center justify-center md:mb-0 md:flex-row md:justify-between">
      <div className="relative order-first mb-10 w-full md:order-last md:w-[45%]">
        <h1 className="mb-8 text-5xl font-bold md:mb-10 md:text-7xl">
          What do we <br />
          <span className="text-[#AFFC41]">offer?</span>
        </h1>
        <p className="mb-8 text-xl font-thin md:mb-20 md:text-3xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam consectetur atque est nemo ab facere.</p>
        <img className="absolute right-0 top-44 w-48 md:relative md:right-auto md:top-auto md:m-auto md:w-2/3" src="https://github.com/taychris/lots-of-images/blob/main/dots.png?raw=true" alt="" />
      </div>

      <div className="order-last md:order-first md:w-[45%]">
        <div className="mb-10 flex border-t-2 pt-4">
          <div className="flex w-[20%]">
            <h2 className="text-4xl md:text-5xl">#1</h2>
          </div>
          <div>
            <h1 className="mb-6 max-w-min text-4xl font-normal md:text-5xl">Web Development</h1>
            <button className="text-xl text-[#AFFC41]">Explore</button>
          </div>
        </div>

        <div className="mb-10 flex border-t-2 pt-4">
          <div className="flex w-[20%]">
            <h2 className="text-4xl md:text-5xl">#2</h2>
          </div>
          <div>
            <h1 className="mb-6 max-w-min text-4xl font-normal md:text-5xl">Graphic Design</h1>
            <button className="text-xl text-[#AFFC41]">Explore</button>
          </div>
        </div>

        <div className="flex border-t-2 pt-4">
          <div className="flex w-[20%]">
            <h2 className="text-4xl md:text-5xl">#3</h2>
          </div>
          <div>
            <h1 className="mb-6 max-w-min text-4xl font-normal md:text-5xl">Video Editing</h1>
            <button className="text-xl text-[#AFFC41]">Explore</button>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-20 flex min-h-screen flex-col items-center justify-center md:mb-0">
      <h1 className="mb-16 text-center text-5xl font-bold md:text-7xl">
        Growing your <br />
        <span className="text-[#AFFC41]">business.</span>
      </h1>
      <div className="mb-10 flex flex-col gap-10 md:flex-row">
        <div className="w-full rounded-md bg-white shadow-md shadow-slate-600">
          <h1 className="px-5 py-4 text-2xl font-medium text-[#241127]">Web Development</h1>
          <img src="https://cdn.dribbble.com/userupload/3014621/file/original-9c015016ad22fb915381c31322875fa8.png?compress=1&resize=1024x768" alt="" />
        </div>

        <div className="w-full rounded-md bg-white shadow-md shadow-slate-600">
          <h1 className="px-5 py-4 text-2xl font-medium text-[#241127]">Graphic Design</h1>
          <img src="https://cdn.dribbble.com/userupload/3015600/file/original-7b2fb336136359a0a5955b85ccbe382a.png?compress=1&resize=1024x768" alt="" />
        </div>

        <div className="w-full rounded-md bg-white shadow-md shadow-slate-600">
          <h1 className="px-5 py-4 text-2xl font-medium text-[#241127]">Graphic Design</h1>
          <img src="https://cdn.dribbble.com/userupload/3014456/file/original-e1f41caa6481761ba37c9717c77de4ff.png?compress=1&resize=1024x768" alt="" />
        </div>
      </div>
      <button className="max-w-max rounded-full bg-[#AFFC41] px-8 py-2 font-thin md:text-xl">portfolio.</button>
    </section>

    <section class="flex flex-col justify-center items-center min-h-screen">
      <h1 class="mb-16 text-center text-5xl font-bold md:text-7xl">
        We can <br />
        <span class="text-[#AFFC41]">talk.</span>
      </h1>
      <form class="flex flex-col max-w-md w-full mb-6">
      <label class="text-lg font-thin mb-2" for="fullName">Full name:</label>
        <input class="rounded-full mb-4 text-[#241127] px-2 py-1 shadow-md shadow-slate-500" type="text"/>
        <label class="text-lg font-thin mb-2"  for="email">Your email:</label>
        <input class="rounded-full mb-4 text-[#241127] px-2 py-1 shadow-md shadow-slate-500" type="email"/>
        <label class="text-lg font-thin mb-2"  for="message">Message:</label>
        <textarea class="rounded-2xl mb-4 text-[#241127] px-2 py-1 shadow-md shadow-slate-500" name="message" id="" cols="30" rows="5"></textarea>
      </form>
      <button class="max-w-max rounded-full bg-[#AFFC41] px-8 py-2 font-thin md:text-xl">send.</button>
    </section>
  </>
  )
}
