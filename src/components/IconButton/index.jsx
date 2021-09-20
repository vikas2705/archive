import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    disabled: {
        opacity: "0.2",
        cursor: "not-allowed",
        pointerEvents: "none",
    },
    wrapper: {
        cursor: "pointer",
    },
});
export default function IconButton({ onClick, disabled, className, children }) {
    const classes = useStyles();
    const handleClick = () => {
        if (disabled) {
            return;
        }
        if (onClick) {
            onClick();
        }
    };
    return (
        <span
            className={clsx(className, classes.wrapper, {
                [classes.disabled]: disabled,
            })}
            onClick={handleClick}
        >
            {children}
        </span>
    );
}
