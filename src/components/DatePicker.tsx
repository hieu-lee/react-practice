import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";

type DatePickerProps = {
  label: string;
  NewDate: Date | null;
  setNewDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function DatePicker(props: DatePickerProps) {
  const handleDateChange = (date: Date | null) => {
    props.setNewDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={props.NewDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
