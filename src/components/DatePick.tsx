import DateFnsUtils from "@date-io/date-fns";
import ptLocale from "date-fns/locale/pt";
import { useState, useEffect } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import moment from "moment";

type DatePickProps = {
  value: string;
  onChange: (value: string) => void;
}


export const DatePick: React.FC<DatePickProps> = ({value, onChange}) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    const formattedDate = moment(selectedDate).format("DD/MM/YYYY");

    console.log(formattedDate); // Output: 24/03/2023
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        onChange={(date:any) => handleDateChange(date)}
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
}


