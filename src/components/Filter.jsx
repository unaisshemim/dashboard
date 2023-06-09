import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall(props) {
  const { margin, data, filterTitle, query } = props;

  const [filterData, setFilterData] = useState("");

  const handleChange = (event) => {
    setFilterData(event.target.value);
    query(event.target.value);
  };
 

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120, marginLeft: `${margin}%`, overflowY: 'auto',}}
      size="small"
    >
      <InputLabel id="demo-select-small" style={{fontSize:'14px'}}>{filterTitle}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={filterData}
        label="sector"
        onChange={handleChange}
        
        
      >
        <MenuItem value="">
          All {/* Add your default value label here */}
        </MenuItem>
        {data ? (
          data.map((value) => <MenuItem value={value}
        
          >{value}</MenuItem>)
        ) : (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
