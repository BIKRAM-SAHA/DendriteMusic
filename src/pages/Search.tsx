import { Track } from "../utils/shazam/shazam.types";
import { useState } from "react";
import Loader from "../components/Loader/Loader";
import MusicCard from "../components/cards/MusicCard/MusicCard";
import AutocompleteBox from "../components/AutocompleteBox/AutocompleteBox";
import { useAppSelector } from "../redux/hooks";
import { fetchAutocomplete, searchSong } from "../utils/shazam/shazam";

let timerId: number;

export default function Search() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);
  const [tracksLoading, setTracksLoading] = useState<boolean>(false);

  const favourites = useAppSelector((state) => state.favourites);

  const callAutoComplete = (term: string) => {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(async () => {
      if (term === "") return;
      setSuggestionsLoading(true);
      const val = await fetchAutocomplete(term);
      setSuggestions(val);
      if (val.length) setSuggestionsLoading(false);
    }, 750);
  };

  const changeEventHandler = (val: string) => {
    callAutoComplete(val);
  };
  const blurEventHandler = () => {
    setSuggestions([]);
  };
  const clickEventHandler = () => {
    setSuggestions([]);
  };
  const searchEventHandler = async (val: string) => {
    setSuggestions([]);
    setTracksLoading(true);
    const results = await searchSong(val, 0);
    const songs = results.map((item) => item.track);
    setTracks(songs);
    setTracksLoading(false);
  };

  return (
    <div className="container">
      <div className=" row flex-column">
        <div className="container col order-2">
          <div className="row gap-4">
            {tracksLoading ? (
              <Loader />
            ) : (
              tracks &&
              tracks.map((item) => (
                <div className="col" key={item.key}>
                  <MusicCard
                    id={item.key}
                    imgUrl={item.images.background}
                    title={item.title}
                    subtitle={item.subtitle}
                    isFav={favourites.includes(item.key)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col order-1">
          <AutocompleteBox
            changeEventHandler={changeEventHandler}
            clickEventHandler={clickEventHandler}
            searchEventHandler={searchEventHandler}
            blurEventHandler={blurEventHandler}
            suggestions={suggestions}
            suggestionsLoading={suggestionsLoading}
          />
        </div>
      </div>
    </div>
  );
}
