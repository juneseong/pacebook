import React from "react";

const DateSelectItem = props => {
    let text = typeof props.text === "string" ? props.value + 1 : props.text;
    if (text < 10) text = ("0" + text.toString()).slice(-2);

    return (
        <option value={text}>
            {props.text}
        </option>
    )
};

export default DateSelectItem;