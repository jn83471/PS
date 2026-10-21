import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { HourByHourselectStyles } from "./HourByHourStyles";
import MenuItem from "@mui/material/MenuItem";

interface CustomSelectProps {
    label: string;
    value: any;
    onChange: (value: any) => void;
    disabled: boolean;
    options: {
        label: string;
        value: number;
    }[];
}

export const CustomSelect = ({
    label,
    value,
    onChange,
    disabled,
    options
}: CustomSelectProps) => (
    <FormControl className="flex-1" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
        disabled={disabled}
            label={label}
            value={value}
            sx={HourByHourselectStyles}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map(option => (
                <MenuItem
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);