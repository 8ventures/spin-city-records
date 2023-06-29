import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vinyl from "./images/vinyl.png";
import records from "./images/records.png";
import record from "./images/record.png";

function Arrow({ type, onClick }: { type: string; onClick?: () => void }) {
  const isLeft = type === "prev";

  return (
    <div
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "calc(60%)",
        zIndex: "2",
        cursor: "pointer",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [isLeft ? "left" : "right"]: "10px",
        borderRadius: "50%",
      }}
    >
      {isLeft ? "<" : ">"}
    </div>
  );
}

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ height: "" }}>
      <Slider {...settings}>
        <div className="relative flex h-80 justify-center text-center text-white">
          <Image
            src={vinyl}
            alt="vinyl"
            className="absolute inset-0 object-cover"
            priority
          />
          <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 font-Belanosima text-2xl">
            Welcome to Spin City Records, a unique online marketplace built by
            vinyl enthusiasts, for vinyl enthusiasts. We connect sellers and
            buyers, facilitating the exchange of vinyl records from every corner
            of the music world. Discover hard-to-find rarities, pick up the
            latest releases, or sell your own cherished collection.
          </p>
        </div>
        <div className="relative flex h-80 justify-center text-center text-white">
          <Image
            src={records}
            alt="records"
            className="absolute inset-0 object-cover"
            priority
          />
          <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 font-Belanosima text-2xl">
            Our platform ensures a smooth, secure trading experience, with
            quality at the forefront. Whether you're browsing to buy or looking
            to list, our user-friendly interface makes it effortless.
          </p>
        </div>
        <div className="relative flex h-80 justify-center text-center text-white">
          <Image
            src={record}
            alt="record"
            className="absolute inset-0 object-cover"
            priority
          />
          <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 font-Belanosima text-2xl">
            Join us at Spin City Records - your dedicated hub for buying and
            selling vinyl records. Let's keep the passion for vinyl alive and
            spinning!
          </p>
        </div>
      </Slider>
    </div>
  );
}
