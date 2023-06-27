import { CombinedData } from "../index";

interface MusicSectionProps {
  title: string;
  items: CombinedData[];
}

const MusicSection: React.FC<MusicSectionProps> = ({ title, items }) => (
  <div className="m-10">
    <h3 className="font-Belanosime text-2xl font-bold text-purple-700">
      {title}
    </h3>
    <div className="m-10 flex overflow-x-auto rounded-xl border-2 border-black bg-purple-50 pb-10">
      {items.map((item) => (
        <div key={item.id} className="m-5 flex flex-col items-center">
          <img
            src={item.album?.artwork}
            alt={item.album?.artwork}
            className="h-40 w-40 rounded-xl object-cover"
          />
          <div className="w-40 text-center">
            <h2 className="m-4">{item.album?.artist}</h2>
            <h2 className="m-4">{item.album?.name}</h2>
            <p className="m-4 font-bold">
              {item.price} {item.currency}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MusicSection;
