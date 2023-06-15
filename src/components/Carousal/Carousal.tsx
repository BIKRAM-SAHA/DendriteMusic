import { CarousalProps } from "./Carousal.types";
import MusicCard from "../cards/MusicCard/MusicCard";
import Loader from "../Loader/Loader";
import { useAppSelector } from "../../redux/hooks";

export default function Carousal({ title, data }: CarousalProps) {
  const favourites = useAppSelector((state) => state.favourites);

  return (
    <div className="m-3">
      <div className="row">
        <div className="text-muted fw-bold col-auto">{title}</div>
        <hr className="border border-danger border-2 opacity-50 col m-auto me-3" />
      </div>
      <div
        className="mx-3 my-2 py-1 row row-gap-1 overflow-x-scroll overflow-y-hidden flex-nowrap hiddenScroll"
        style={{ height: "200px" }}
      >
        {!data.length ? (
          <Loader />
        ) : (
          data.map((element) => (
            <div className="col-auto" key={element.key}>
              <MusicCard
                id={element.key}
                imgUrl={element.image}
                title={element.title}
                subtitle={element.subtitle}
                isFav={favourites.includes(element.key)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
