import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import convertDistanceMetersToKilometers from "../../utils/convertDistanceMetersToKilometers";

export default function CitiesAndDistances({
  cities,
  distances,
}: {
  cities: string[];
  distances: number[];
}) {
  if (distances.length === 0)
    return <span>An error occured showing distances</span>;
  return (
    <Timeline position="alternate">
      {cities.map((city, index) => (
        <TimelineItem key={city}>
          <TimelineOppositeContent color="text.secondary">
            {distances[index - 1] &&
              `${convertDistanceMetersToKilometers(distances[index - 1])} km`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index < cities.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>{city}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
