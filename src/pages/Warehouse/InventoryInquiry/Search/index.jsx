import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useMemo, useState } from "react";
import clsx from 'clsx';

import { useHistory, useLocation } from "react-router-dom";
import TodoIcon from "../../../../assets/Icons/TodoIcon";
import IconButton from "../../../../components/IconButton";
import PageHeader from "../../../../components/PageHeader";
import { makeStyles } from '@material-ui/styles';
import ItemList from './Item';
import NameAndCodeField from '../../../../components/NameAndCodeField';
import Warehouse from './Warehouse';
import Serial from './Serial';
import InventoryDetailsSearch from '../../../../components/InventorySearchDetails';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 70px)'
  },
  itemWrapper: {
    border: '1px solid #E9EBEF',
    borderRadius: 5,
    gridTemplateColumns: 'repeat(3, 1fr)',
    /* grid-gap: 5%; */
    display: 'grid'
  },
  topContainer: {
    marginLeft: 29,
    marginRight: 25,
    marginTop: 11,
    marginBottom: 17,
    '& > div:last-child': {
      marginTop: 14,
    }
  },
  item: {
    // width: '33.33%',
    // float: 'left',
    paddingTop: 13,
    background: '#F7F9FB',
    border: '1px solid #E9EBEF',

    paddingBottom: 15,
    textAlign: 'center'
  },
  listWrapper: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 13,
    background: '#e5e5e599',
    overflow: 'auto',
  },
  highlightBox:{
    background: '#3B9DFF',
  }
});

const SEARCH_BY_LIST = ["Item", 'Warehouse', 'Zone', 'Bin', 'Lot', 'Serial'];

export default function SearchInventory() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { path: basePath } = useRouteMatch();
  const [selectedItem, setSelectedItem] = useState(SEARCH_BY_LIST[0]);

  const navBarightIcons = useMemo(() => ([{
    id: "1",
    type: "status",
    text: (<IconButton><TodoIcon /> </IconButton>),
    iconCls: "neb-timeline",
    action: () => {
      // history.push(`${location.pathname}/list/Status/view`);
    }
  }]), []);
  return (
    <>
      <PageHeader
        title='Inventory Inquiry'
        rightActions={navBarightIcons}
        showNav
      />
      <div className={classes.root}>
        <div className={classes.topContainer}>
          <div className={classes.itemWrapper}>
            {SEARCH_BY_LIST.map(item => (
              <div
                className={clsx(classes.item, {
                  [classes.highlightBox]: selectedItem === item
                })}

                onClick={() => { setSelectedItem(item) }}
              >
                {item}
              </div>
            ))}
          </div>
          <div>
            <InventoryDetailsSearch />
          </div>
        </div>
        <div className={classes.listWrapper}>
          {selectedItem === 'Item' ? <ItemList /> : null}
          {['Warehouse', 'Bin', 'Lot', 'Zone'].indexOf(selectedItem) !== -1 ? <Warehouse /> : null}
          {['Serial'].indexOf(selectedItem) !== -1 ? <Serial /> : null}
        </div>
      </div>
    </>
  )
}