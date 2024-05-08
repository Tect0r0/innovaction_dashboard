import Body from './Body'
import Logo from './assets/innovaction1-t.png'
import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <>
      <header>
        <div className="title-card">
          <img className="logo" src={Logo} alt="Logo" />
          <h1 className="title">Innovaction Gym - Event Dashboard</h1>
          <SignedOut><SignInButton /></SignedOut> {/* <SignedOut>:  Si el usuario no está logueado */}
          <UserButton />
        </div>
      </header>
      <Body />
    </>
  )
}