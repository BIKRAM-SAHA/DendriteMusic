import { MusicCardData } from "../components/Carousal/Carousal.types";
import { useEffect, useState } from "react";
import MusicCard from "../components/cards/MusicCard/MusicCard";
import Loader from "../components/Loader/Loader";
import { useAppSelector } from "../redux/hooks";
import { fetchSongDetail } from "../utils/shazam/shazam";

export default function Favourites() {
  const [musicTracks, setMusicTracks] = useState<MusicCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const favourites = useAppSelector((state) => state.favourites);

  const getTracks = async () => {
    const tracks: MusicCardData[] = [];
    for (let key in favourites) {
      const track = await fetchSongDetail(key);
      if (track === undefined) continue;
      tracks.push({
        key: track.key,
        title: track.title,
        subtitle: track.subtitle,
        image: track.images.background,
      });
    }
    setMusicTracks(tracks);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getTracks();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {isLoading ? (
          <Loader />
        ) : (
          musicTracks.map((item) => (
            <div className="col" key={item.key}>
              <MusicCard
                id={item.key}
                imgUrl={item.image}
                title={item.title}
                subtitle={item.subtitle}
                isFav={favourites.includes(item.key)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
