import Image from "next/image";
import { StickyBackground } from "./StickyBackground";
import logo from "../../public/assets/logo.png";

export function Header() {
  return (
    <StickyBackground
      backgroundHeightSpacing={{ h: "h-80", top: "top-80" }}
      contentBackground="bg-secondary-500"
    >
      <nav className="flex justify-center bg-secondary-500">
        <div className="max-w-screen-2xl flex-grow">
          <a href="https://trustedtwin.com/">
            {<Image src={logo} alt={"logo"} />}
          </a>
        </div>
      </nav>
      <header className="max-w-screen-2xl  mx-auto px-6 py-3 drop-shadow-md h-[calc(100%-66px)] flex flex-col">
        <div className="text-3xl sm:text-5xl font-title font-bold whitespace-pre-line leading-hero text-center my-auto">
          <h1>{"Trusted Twin Rest Api example app"}</h1>
        </div>
      </header>
    </StickyBackground>
  );
}
