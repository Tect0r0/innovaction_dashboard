import Body from './Body'
import Logo from './assets/innovaction1-t.png'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <>
      <SignedIn>  {/*Si el usuario está logueado, muestra el contenido*/}
        <header>
          <div className="title-card">
            <img className="logo" src={Logo} alt="Logo" />
            <h1 className="title">Innovaction Gym - Event Dashboard</h1>
            <UserButton />
          </div>
        </header>
        <Body />
      </SignedIn>

      <SignedOut>
        <header>
          <div className="title-card">
            <img className="logo" src={Logo} alt="Logo" />
            <h1 className="title">Innovaction Gym - Event Dashboard</h1>
            <SignInButton />
          </div>
        </header>
      </SignedOut>
    </>
  )
}