import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";

type TimePickerProps = {
  label: string;
  NewDate: Date | null;
  setNewDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function TimePicker(props: TimePickerProps) {
  const handleDateChange = (date: Date | null) => {
    props.setNewDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label={props.label}
        value={props.NewDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change time",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
