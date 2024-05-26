import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";

export const ChartWind = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
    </Box>
  );
};