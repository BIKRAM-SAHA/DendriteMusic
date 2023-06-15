import { AutocompleteProps } from "./Autocomplete.types";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./AutocompleteBox.module.scss";

export default function AutocompleteBox({
  changeEventHandler,
  clickEventHandler,
  searchEventHandler,
  blurEventHandler,
  suggestionsLoading,
  suggestions,
}: AutocompleteProps) {
  const [inputVal, setInputVal] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputVal.trim() !== e.target.value.trim())
      changeEventHandler(e.target.value.trim());
    setInputVal(e.target.value);
  };
  const onBlurHandler = () => {
    blurEventHandler();
  };
  const onSearchHandler = () => {
    searchEventHandler(inputVal);
  };

  return (
    <div className={styles.searchBox} onBlur={onBlurHandler}>
      <div className="container py-5">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className={`form ${styles.inputForm}`}>
              <input
                type="text"
                className="form-control form-input pe-5"
                placeholder="🎵🎶"
                value={inputVal}
                onChange={onChangeHandler}
              />
              <span className={styles.leftPan}>
                <button className="btn btn-primary" onClick={onSearchHandler}>
                  <i className="bi bi-search" />
                </button>
              </span>
              <div className={styles.suggestions}>
                {suggestionsLoading ? (
                  <Spinner />
                ) : (
                  suggestions.map((suggestion, index) => (
                    <div
                      className={styles.suggestion}
                      onMouseDown={() => {
                        console.log(suggestion);
                        setInputVal(suggestion);
                        clickEventHandler();
                      }}
                      key={index}
                    >
                      <i className="bi bi-search me-2" />
                      {suggestion}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
