import { auth, googleAuthProvider } from '../common/firebase';
import toast, { Toaster } from "react-hot-toast";
import { useContext } from 'react';
import { UserContext } from '../common/userContext';
import { useRouter } from 'next/router';

const Enter = () => {
  const {userData} = useContext(UserContext);

  return (
    <div className="scroll-m-14 min-h-screen flex flex-col items-center justify-center">
        {!userData.user && <SignInButton/>}
    </div>
  )
}

// Sign in with Google button
const SignInButton = () => {
    const router = useRouter()

    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider)
      .then((res) => {
        toast.success('Signed in.')
        router.push("/dashboard")
      })
      .catch((e) => {
        console.log(e)
        toast.error(e.message)
      });
    };
  
    return (
      <>
        <button className="btn-google" onClick={signInWithGoogle}>
          {/* <img src={'/google.png'} />  */} Sign in with Google
        </button>

        <Toaster/>
      </>
    );
}

// const SignOutButton = () => {
//     const signOut = async () => {
//         await auth.signOut().then(() => {
//             toast.success('Signed out.')
//         })
//         .catch((e) => {
//             console.log(e)
//             toast.error(e.message)
//         })
//     };

//     return <button onClick={signOut}>Sign Out</button>;
// }


export default Enter