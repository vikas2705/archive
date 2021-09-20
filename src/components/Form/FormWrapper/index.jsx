import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    overflow: 'auto',
    background: '#F7F9FB',
    // paddingLeft: 12,
    // paddingRight: 12,
    // padding: '14px 12px 0px 12px',
    height: '100%'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 12,
  },
  wrapper: {
    width: "100%",
    minHeight: "100%",
    background: "#ffffff",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
    padding: '18px 11px 50px 12px',
    '& > *': {
      marginBottom: 16,
    }
    // maxWidth: "380px",
  },
});

export default function FormWrapper({ children, wrapperRef }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.wrapper} ref={wrapperRef}>
          {children}
        </div>
      </div>
    </div>
  )
}