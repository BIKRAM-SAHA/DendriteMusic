export interface MusicCardData {
  key: string;
  title: string;
  subtitle: string;
  image: string;
}
export type CarousalProps = {
  title: string;
  data: MusicCardData[];
};
