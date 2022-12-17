import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import styles from "./SearchRouteForm.module.css";
import CitiesSelection from "../CitiesSelection/CitiesSelection";

export default function SearchRouteForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [dateOfTrip, setDateOfTrip] = useState<Date | null>(
    searchParams.get("date") ? moment(searchParams.get("date")).toDate() : null
  );
  const [passengers, setPassengers] = useState(
    parseInt(searchParams.get("passengers") || "1")
  );
  const [cities, setCities] = useState<string[]>(
    searchParams.get("cities") ? searchParams.get("cities")!.split(",") : []
  );
  const [dateError, setDateError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cities.filter((city) => city).length > 0) {
      searchParams.set("cities", cities.join(","));
    }
    if (dateOfTrip) {
      searchParams.set("date", dateOfTrip.toISOString());
    }
    if (passengers) {
      searchParams.set("passengers", passengers.toString());
    }

    setSearchParams(searchParams);
  }, [dateOfTrip, passengers, cities, setSearchParams, searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/results",
      search: createSearchParams({
        cities: cities.join(","),
        date: dateOfTrip ? dateOfTrip.toISOString() : "",
        passengers: passengers.toString(),
      }).toString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} className={styles.container}>
        <Typography variant="h4" component="h4">
          Search Your Route
        </Typography>
        <CitiesSelection onChange={setCities} value={cities} />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            value={dateOfTrip}
            onChange={(e) => {
              // check if moment date is in the future
              if (moment(e).isBefore(moment())) {
                setDateError(true);
                setDateOfTrip(null);
              } else {
                setDateError(false);
                setDateOfTrip(e);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Date of trip"
                sx={{ width: 300 }}
                required
                error={dateError}
                helperText={
                  dateError ? "Date of trip must be in the future" : ""
                }
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          label="Number of passengers"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          sx={{ width: 300 }}
          required
          value={passengers}
          onChange={(e) => setPassengers(parseInt(e.target.value))}
        />

        <Button variant="contained" type="submit">
          Calculate Distance
        </Button>
      </Stack>
    </form>
  );
}
