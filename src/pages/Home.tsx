import { MusicCardData } from "../components/Carousal/Carousal.types";
import { useEffect, useState } from "react";
import Carousal from "../components/Carousal/Carousal";
import { fetchPopularTracksInCharts } from "../utils/shazam/shazam";
import guyHeadphoneIllustration from "../assets/guyHeadphoneCouch.svg";

export default function Home() {
  const [popTracks, setPopTracks] = useState<MusicCardData[]>([]);
  const [rockTracks, setRockTracks] = useState<MusicCardData[]>([]);

  const fetchTracksInChart = async (trackName: string) => {
    let tracks = await fetchPopularTracksInCharts(trackName);
    if (tracks === undefined) {
      tracks = [];
    }
    return tracks;
  };

  const fetchAllTracks = async () => {
    let Poptracks = await fetchTracksInChart("genre-global-chart-1");
    if (Poptracks === undefined) {
      Poptracks = [];
    }
    setPopTracks(
      Poptracks.map((item: any) => {
        return {
          key: item.key,
          title: item.title,
          subtitle: item.subtitle,
          image: item.images.background,
        };
      })
    );
    let Rocktracks = await fetchTracksInChart("genre-global-chart-2");
    if (Rocktracks === undefined) {
      Rocktracks = [];
    }
    setRockTracks(
      Rocktracks.map((item: any) => {
        return {
          key: item.key,
          title: item.title,
          subtitle: item.subtitle,
          image: item.images.background,
        };
      })
    );
  };

  useEffect(() => {
    fetchAllTracks();
  }, []);

  return (
    <div className="home">
      <div className="hero container-fluid bg-danger py-4 gx-0">
        <div className="container row m-auto">
          <div className="illustration col-auto d-none d-sm-block">
            <img
              src={guyHeadphoneIllustration}
              className="img-fluid m-3"
              alt="illustration"
              height={180}
              width={180}
            />
          </div>
          <div className="align-items-end col text-sm-end ms-5 mb-5 mt-sm-5 text-white">
            <h2>Your favourite tunes</h2>
            <h3>
              All <i className="bi bi-brightness-high-fill text-warning" /> and
              all <i className="bi bi-moon-fill text-warning" />
            </h3>
          </div>
        </div>
      </div>
      <Carousal title="Global Pop" data={popTracks} />
      <Carousal title="Global Rock" data={rockTracks} />
    </div>
  );
}
