import { MusicCardProps } from "./MusicCard.types";
import { useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../redux/features/favourites/favouritesSlice";
import styles from "./MusicCard.module.scss";

export default function MusicCard({
  id,
  imgUrl,
  title,
  subtitle,
  isFav,
}: MusicCardProps) {
  const dispatch = useAppDispatch();
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const cardTitle: string =
    title.length > 20 ? title.slice(0, 20) + "..." : title;
  const cardSubtitle: string =
    subtitle.length > 17 ? subtitle.slice(0, 17) + "..." : subtitle;

  const loaded = () => {
    imgContainerRef.current?.classList.add(styles.loaded);
  };
  const handleFavouriteClick = () => {
    isFav ? dispatch(removeFromFavourite(id)) : dispatch(addToFavourite(id));
  };

  return (
    <div className={styles.card} role="button">
      <div className={styles.blurLoad} ref={imgContainerRef}>
        <img
          src={imgUrl}
          className={styles.cardImg}
          alt="album cover"
          loading="lazy"
          ref={imgRef}
          onLoad={() => {
            loaded();
          }}
        />
      </div>
      <div className={styles.overlay}>
        {/* <i className="bi bi-play" /> */}
        </div>
      {isFav ? (
        <i
          className={`bi bi-star-fill mx-2 my-1 ${styles.favBtn}`}
          onClick={handleFavouriteClick}
        />
      ) : (
        <i
          className={`bi bi-star mx-2 my-1 ${styles.favBtn}`}
          onClick={handleFavouriteClick}
        />
      )}

      <div className="p-1 text-center">
        <div className={styles.cardTitle}>{cardTitle}</div>
        <div className={styles.cardSubtitle}>{cardSubtitle}</div>
      </div>
    </div>
  );
}
