import React from 'react'

const Dashboard = () => {
  return (
    <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-center">Dashboard</div>
  )
}

export async function getStaticProps(context) {
    return {
      props: {
        protected: true,
      },
    }
}

export default Dashboard