import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import CitySelection from "../CitySelection/CitySelection";

export default function CitiesSelection({
  onChange,
  value,
}: {
  onChange?: (value: string[]) => void;
  value?: string[];
}) {
  const [originCity, setOriginCity] = useState<string>(
    value?.[0] ? value[0] : ""
  );
  const [intermediateCities, setIntermediateCities] = useState<string[]>(
    value?.slice(1, -1) || []
  );
  const [destinationCity, setDestinationCity] = useState<string>(
    value?.[value.length - 1] ? value[value.length - 1] : ""
  );

  useEffect(() => {
    if (onChange) {
      onChange([originCity, ...intermediateCities, destinationCity]);
    }
  }, [originCity, intermediateCities, destinationCity, onChange]);

  const handleAddIntermediateCity = () => {
    setIntermediateCities((prevIntermediateCities) => [
      ...prevIntermediateCities,
      "",
    ]);
  };

  const handleRemoveLastIntermediateCity = () => {
    setIntermediateCities((prevIntermediateCities) =>
      prevIntermediateCities.slice(0, -1)
    );
  };

  const handleChangingIntermediateCity = (index: number) => (value: string) => {
    setIntermediateCities((prevIntermediateCities) => {
      const newIntermediateCities = [...prevIntermediateCities];
      newIntermediateCities[index] = value;
      return newIntermediateCities;
    });
  };

  return (
    <>
      <CitySelection
        label="City of origin"
        onChange={setOriginCity}
        initialValue={originCity}
      />
      <Button variant="text" onClick={handleAddIntermediateCity}>
        Add an intermediate city
      </Button>
      {intermediateCities.map((key, index) => (
        <CitySelection
          key={index}
          label={`Intermediate city ${index + 1}`}
          initialValue={key}
          onChange={handleChangingIntermediateCity(index)}
        />
      ))}
      {intermediateCities.length > 0 && (
        <Button variant="text" onClick={handleRemoveLastIntermediateCity}>
          Remove an intermediate city
        </Button>
      )}
      <CitySelection
        label="City of destination"
        onChange={setDestinationCity}
        initialValue={destinationCity}
      />
    </>
  );
}
