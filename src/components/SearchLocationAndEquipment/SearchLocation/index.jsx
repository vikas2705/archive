import { makeStyles } from "@material-ui/styles";
import { TextField } from "@sencha/ext-react-modern";

const useStyles = makeStyles({
  searchWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    border: '1px solid #E9EBEF',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  listWrapper: {
    background: '#F7F9FB',
    display: 'flex',
    flexDirection: 'column',
    // height: 'calc(100% - 76px)'
    overflow: 'auto',
  },
  countText: {
    marginLeft: 36,
  },
  list: {
    marginLeft: 20,
    marginRight: 20,
    background: 'white',
  },
  name: {
    marginBottom: 0,
    color: '#33415C',
    fontSize: 15,
    fontWeight: 700,
  },
  item: {
    borderBottom: '1px solid #F7F9FB',
    paddingLeft: 15,
    paddingBottom: 11,
    color: '#33415C',
  },
  code: {
    margin: 0,
    fontSize: 15,
    fontWeight: 400,
    color: '#33415C',
  }
})

const MOCK_DATA = [
  {
    name: 'Sydney',
    code: 'LOC0001'
  },
  {
    name: 'Sydney Harbour',
    code: 'LOC0002'
  },
  {
    name: 'Sydney Warehouse',
    code: 'LOC0003'
  },
  {
    name: 'Sydney',
    code: 'LOC0001'
  },
  {
    name: 'Sydney Harbour',
    code: 'LOC0002'
  },
  {
    name: 'Sydney Warehouse',
    code: 'LOC0003'
  },
  {
    name: 'Sydney',
    code: 'LOC0001'
  },
  {
    name: 'Sydney Harbour',
    code: 'LOC0002'
  },
  {
    name: 'Sydney Warehouse',
    code: 'LOC0003'
  },
  {
    name: 'Sydney Warehouse',
    code: 'LOC0003'
  },
  {
    name: 'Sydney',
    code: 'LOC0001'
  },
  {
    name: 'Sydney Harbour',
    code: 'LOC0002'
  },
  {
    name: 'Sydney Warehouse',
    code: 'LOC0003'
  },
]
export default function SearchLocation(props) {
  const classes = useStyles();
  const list = MOCK_DATA;
  return (
    <>
      <div className={classes.searchWrapper}>
        <TextField label="Enter Name or Code" />
      </div>
      <div className={classes.listWrapper}>
        <h5 className={classes.countText}>{list.length} locations found</h5>
        <div className={classes.list}>
          {list.map(item => (
            <div key={item.code} className={classes.item}>
              <h4 className={classes.name}>{item.name}</h4>
              <h5 className={classes.code}>{item.code}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}