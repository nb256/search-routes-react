import { Stack, CircularProgress, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import calculateDistances from "../../api/calculateDistances";
import CitiesAndDistances from "../CitiesAndDistances/CitiesAndDistances";
import styles from "./SearchResults.module.css";

export default function SearchResults() {
  const [loading, setLoading] = useState(true);
  const [distances, setDistances] = useState<number[]>([]);

  const [searchParams] = useSearchParams();
  const cities = useMemo(
    () => searchParams.get("cities")?.split(",") || [],
    [searchParams]
  );

  const date = useMemo(
    () => moment(searchParams.get("date")).format("MMMM Do YYYY, h:mm:ss a"),
    [searchParams]
  );

  const passengers = useMemo(
    () => searchParams.get("passengers"),
    [searchParams]
  );

  useEffect(() => {
    calculateDistances(cities).then((distances) => {
      setDistances(distances);
      setLoading(false);
    });
  }, [cities]);

  return (
    <Stack spacing={2} className={styles.container}>
      <Typography variant="h4">Distances</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <CitiesAndDistances cities={cities} distances={distances} />
      )}
      <Typography variant="h4">Date</Typography>
      {date}
      <Typography variant="h4">Passengers</Typography>
      {passengers}
    </Stack>
  );
}
