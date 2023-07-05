import { useRouter } from "next/router";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { DM_Serif_Display } from "@next/font/google";

import vinylLibrary from "./images/vinyl-library.jpg";
import vinylStudio from "./images/vinyl-studio.jpg";
import rainbow from "./images/rainbow.jpg";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const SplideCarousel = () => {
  const router = useRouter();
  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    interval: 6000,
    height: "15rem",
    arrows: false,
  };

  const handleAboutClick = () => {
    router.push("/").catch((e) => console.log(e));
  };

  return (
    <div className={"mx-auto mt-0 max-w-full"}>
      <Splide options={options} hasTrack={false}>
        <div style={{ position: "relative" }}>
          <SplideTrack>
            <SplideSlide key={vinylLibrary.src} onClick={handleAboutClick}>
              <img src={vinylLibrary.src} />
              <div
                className={`${serif.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-center text-3xl md:text-4xl lg:text-5xl`}
              >
                <h1 className="bg-black bg-opacity-50 p-4 text-white">
                  Welcome to Spin City Records
                </h1>
              </div>
            </SplideSlide>
            <SplideSlide key={vinylStudio.src} onClick={handleAboutClick}>
              <img src={vinylStudio.src} />
              <div
                className={`${serif.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-center text-lg md:text-2xl lg:text-4xl`}
              >
                {" "}
                <h1 className="bg-black bg-opacity-50 p-4 text-white">
                  Be the first to own exclusive vinyl editions. Discover rare
                  and limited releases from your favorite artists.{" "}
                </h1>
              </div>
            </SplideSlide>
            <SplideSlide key={rainbow.src} onClick={handleAboutClick}>
              <img src={rainbow.src} />
              <div
                className={`${serif.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-center text-lg md:text-2xl lg:text-4xl`}
              >
                {" "}
                <h1 className="bg-black bg-opacity-50 p-4 text-white ">
                  Spin City Records{" "}
                  <span className="text-[#FF5500]">Exclusive</span>
                </h1>
                <h2 className="text-md bg-black bg-opacity-50 p-4 text-white md:text-2xl lg:text-3xl">
                  Pink Floyd - The Dark Side of the Moon (Limited Edition Pink
                  Vinyl)
                </h2>
              </div>
            </SplideSlide>
          </SplideTrack>
        </div>
      </Splide>
    </div>
  );
};

export default SplideCarousel;
