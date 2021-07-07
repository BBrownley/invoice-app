import styled from "styled-components";
import DatePicker from "react-datepicker";

import InputStyle from "./mixins/InputStyle.elements";

export const StyledDatePickerContainer = styled.div`
  font-weight: bold;
  position: relative;
  .react-datepicker__input-container input {
    ${InputStyle}
    border-color: ${props =>
      props.darkMode ? props.theme.colors.black300 : ""};
    &:hover {
      cursor: pointer;
      border: 1px solid ${props => props.theme.colors.primary};
    }
  }
  .react-datepicker {
    margin-top: -1.5rem;
    background-color: black;
  }
  .react-datepicker__header, .react-datepicker__navigation {
    margin-top: 1rem;
  }
  .react-datepicker,
  .react-datepicker__header {
    border: none;
    background-color: ${props =>
      props.darkMode ? props.theme.colors.black300 : "white"}
  }
  .react-datepicker__month-container {
    font-family: "Spartan", sans-serif;
  }
  .react-datepicker__day-names,
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__month {
    margin-top: 2rem;
  }
  .react-datepicker__day {
    color: ${props => props.darkMode && "white"};
    &:hover {
      background: transparent;
      color: ${props => props.theme.colors.primary};
    }
    &:active,
    :focus {
      background: transparent;
      color: ${props => props.theme.colors.primary};
    }
    &--disabled {
      color: ${props => (props.darkMode ? "#343854" : "")};
    }
    &--selected {
      background: transparent;
      color: ${props => props.theme.colors.primary};
    }
  }

  .calendar-icon {
    position: absolute;
    right: 1.25rem;
    top: 1.75rem;
    transform: translateY(-50%);
    font-size: 1.25rem;
    color: ${props => props.theme.colors.blueGray};
    pointer-events: none;
  }

  .react-datepicker__current-month {
    color: ${props => props.darkMode && "white"}
  }
`;

export const StyledDatePicker = styled(DatePicker)``;
