import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

import styles from "./SearchRouteForm.module.css";
import CitiesSelection from "../CitiesSelection/CitiesSelection";

export default function SearchRouteForm() {
  const [dateOfTrip, setDateOfTrip] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState(0);
  const [cities, setCities] = useState<string[]>([]);
  const [dateError, setDateError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit", cities, dateOfTrip, passengers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} className={styles.container}>
        <Typography variant="h4" component="h4">
          Search Your Route
        </Typography>
        <CitiesSelection onChange={setCities} />

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
