import { makeStyles } from "@material-ui/styles";
import React from "react";
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    height: `100%`,
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },
  skipBorder: {
    borderBottom: '0px !important',
  },
  lastItemBorder: {
    width: '100%',
    borderTop: '1px dashed #C9CDD6',
  },
  itemWrapper: {
    width: '100%',
    // height: '100%',
    // display: 'flex',
    borderBottom: '1px dashed #C9CDD6',
    paddingTop: 12,
    paddingBottom: 12,
  },
  itemSubWrapper: {
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    borderRight: '1px dashed #C9CDD6',
    cursor: 'pointer',
  },
  item: {
    margin: 'auto'
  },
  value: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 6,
    textAlign: 'center',
    color: '#33415C',
    // color: props => props.variant === 'colored' ? '' : '#33415C'
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#7D8597',
    // color: props => props.variant === 'colored' ? '#7D8597' : '#33415C'
  },
  secondary: {
    color: '#DD9200 !important',
  },
  danger: {
    color: '#FF3333 !important',
  },
  warn: {
    color: '#CC4A00 !important',
  },
  primary: {
    color: '#00AE50 !important',
  }
});

export default function EAMGridView(props) {
  const { value, onClick, keyProp, variant } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {value?.map((val, ind) => (
        <div key={val[keyProp]} className={clsx(classes.itemWrapper)} onClick={() => onClick(val)}>
          <div className={classes.itemSubWrapper}>
            <div className={classes.item}>
              <div
              style={{color: variant === 'colored' ? val.circlecolor: ''}}
              className={
                clsx(classes.value, {
                  [classes.danger]: val.variant === 'danger',
                  [classes.warn]: val.variant === 'warn',
                  [classes.primary]: val.variant === 'primary',
                  [classes.secondary]: val.variant === 'secondary',
                })}>{val.tabvalue}</div>
              <div className={classes.label}>{val.tabdata}</div>
            </div>
          </div>
        </div>
      ))}
      {value.length ? (<div className={classes.lastItemBorder}></div>) : null}
    </div>
  );
}

