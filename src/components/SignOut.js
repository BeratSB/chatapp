import { auth, firestore } from "./Configuration"

function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Ausloggen</button>
    )
  }

  export default SignOut