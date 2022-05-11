import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "../stitches.config";

export const StyledInput = styled('button', {
    color: '$foreground',
    background: '$background',
    width: '50%',
    height: '50%'
})

const DateSelect = ({ props }) => {
    return <DatePicker 
        showTimeSelect
        customInput={<StyledInput />}
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        shouldCloseOnSelect
        {...props} 
    />
};

export default DateSelect