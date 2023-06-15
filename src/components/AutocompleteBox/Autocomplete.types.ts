export type AutocompleteProps = {
  changeEventHandler: (val: string) => void;
  clickEventHandler: () => void;
  searchEventHandler: (val: string) => void;
  blurEventHandler: () => void;
  suggestionsLoading: boolean;
  suggestions: string[];
};
