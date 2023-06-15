import axios, { AxiosError } from "axios";
import {
  AutocompleteResult,
  SearchResult,
  SongDetailResult,
} from "./shazam.types";

const CancelToken = axios.CancelToken;
let cancel: undefined | (() => void);

export const fetchAutocomplete = async (term: string) => {
  if (cancel !== undefined) cancel();
  if (term === "") {
    return [];
  }
  let suggestionArray: string[] = [];
  try {
    const result: AutocompleteResult = (
      await axios.request({
        method: "GET",
        url: `${import.meta.env.VITE_SHAZAM_BASE_URL}/auto-complete`,
        params: {
          term: term,
          locale: "en-US",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_SHAZAM_HOSTNAME,
        },
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
    ).data;
    const hints = result.hints;
    hints.forEach((item) => {
      suggestionArray.push(item.term);
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.code !== "ERR_CANCELED") console.log(error);
    } else {
      console.error(error);
    }
  } finally {
    return suggestionArray;
  }
};

export const searchSong = async (term: string, offset: Number) => {
  if (term === "") return [];
  try {
    const result: SearchResult = (
      await axios.request({
        method: "GET",
        url: `${import.meta.env.VITE_SHAZAM_BASE_URL}/search`,
        params: {
          term: term,
          locale: "en-US",
          offset: `${offset}`,
          limit: "5",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_SHAZAM_HOSTNAME,
        },
      })
    ).data;
    return result.tracks.hits;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchSongDetail = async (key: string) => {
  try {
    const result: SongDetailResult = (
      await axios.request({
        method: "GET",
        url: `${import.meta.env.VITE_SHAZAM_BASE_URL}/songs/get-details`,
        params: {
          key: key,
          locale: "en-US",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_SHAZAM_HOSTNAME,
        },
      })
    ).data;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPopularTracksInCharts = async (listId: string) => {
  try {
    const result = (
      await axios.request({
        method: "GET",
        url: `${import.meta.env.VITE_SHAZAM_BASE_URL}/charts/track`,
        params: {
          locale: "en-US",
          listId: listId,
          pageSize: "20",
          startFrom: "0",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_SHAZAM_HOSTNAME,
        },
      })
    ).data;
    if (result.tracks === undefined) throw Error("check listId");
    return result.tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
