import { getAuth, GoogleAuthProvider, signInWithPopup,} from 'firebase/auth';
import {auth, firebase } from "./Configuration"

function SignIn() {

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    }

  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <p>Do not violate the community guidelines or you will be banned for life!</p>
      </>
    )
  
  }



  export default SignIn