import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';

const useStyles = makeStyles({
  row: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    display: 'grid',
    // gridAutoColumns: '44%',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '8%',
    '& > *':{
      // maxWidth: '50%',
    }
  },
  noSpaceBottom: {
    marginBottom: '0px !important'
  }
});

export default function FormRow({ noSpaceBottom, className, children }) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.row, {
      [classes.noSpaceBottom]: noSpaceBottom
    })}>
      {children}
    </div>
  )
}