import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";

const API_KEY = "a79aad9743859b7143100ca7247efd7c";

const fetchOptions = async (query) => {
  const response = await Axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}&limit=5`
  );
  return response.data.map(
    (item) => `${item.name}, ${item.country}, ${item.state}`
  );
};

export const CitySearch = () => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const {
    data: options,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchOptions", inputValue],
    queryFn: () => fetchOptions(inputValue),
    enabled: false,
  });

  React.useEffect(() => {
    if (inputValue) {
      refetch();
    }
  }, [inputValue, refetch]);

  React.useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [open]);

  return (
    <div>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options || []}
        loading={isLoading}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search city"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};
