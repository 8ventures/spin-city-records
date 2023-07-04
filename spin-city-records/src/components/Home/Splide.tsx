import { useRouter } from "next/router";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css";

import vinylLibrary from "./images/vinyl-library.jpg";
import vinylStudio from "./images/vinyl-studio.jpg";

const SplideCarousel = () => {
  const router = useRouter();
  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    height: "15rem",
    arrows: false,
  };

  const handleAboutClick = () => {
    router.push("/about");
  };

  return (
    <div className="mx-auto mt-0 max-w-full">
      <Splide options={options} hasTrack={false}>
        <div style={{ position: "relative" }}>
          <SplideTrack>
            <SplideSlide key={vinylLibrary.src} onClick={handleAboutClick}>
              <img src={vinylLibrary.src} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-center font-Ultra text-6xl text-white">
                Welcome to Spin City Records
              </div>
            </SplideSlide>
            {/* <SplideSlide key={vinylStudio.src} onClick={handleAboutClick}>
              <img src={vinylStudio.src} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-center text-6xl text-white">
                Welcome to Spin City Records
              </div>
            </SplideSlide> */}
          </SplideTrack>
        </div>
      </Splide>
    </div>
  );
};

export default SplideCarousel;
