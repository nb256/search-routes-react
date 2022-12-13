import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import throttle from "lodash/throttle";

import { SearchCitiesResponse } from "../../types";
import searchCities from "../../api/searchCities";

interface CitySelectionProps {
  label: string;
  onChange?: (value: string) => void;
  initialValue?: string;
}

export default function CitySelection({
  label,
  onChange,
  initialValue,
}: CitySelectionProps) {
  const [value, setValue] = useState<string | null>(initialValue || null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: SearchCitiesResponse) => void
        ) => {
          searchCities(request.input).then((results) => {
            callback(results);
          });
        },
        200
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: SearchCitiesResponse) => {
      if (active) {
        let newOptions: string[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [
            ...newOptions,
            ...(results?.result?.map((city) => city.name) || []),
          ];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(_: any, newValue: string | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue || null);
        if (onChange) {
          onChange(newValue || "");
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth required />
      )}
      noOptionsText="Type to search…"
    />
  );
}
