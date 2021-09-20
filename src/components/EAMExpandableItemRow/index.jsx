import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';
import { Button, Typography } from '@material-ui/core';
import IconButton from "../IconButton";
import PhoneIcon from "../../assets/Icons/PhoneIcon";
import MinusBlueIcon from "../../assets/Icons/MinusBlueIcon";
import PlusBlueIcon from "../../assets/Icons/PlusBlueIcon";
import PhoneGreenIcon from "../../assets/Icons/PhoneGreenIcon";
import QuantityField from "../../pages/Warehouse/InventoryInquiry/components/QuantityField";

const useStyles = makeStyles({
  root: {

  },
  wrapper: {
    background: '#ffffff',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #E9EBEF',
    borderRadius: 4,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 10,
  },
  wrapperBlue: {
    background: '#EDF6FF !important',
    border: '1px solid rgba(0, 115, 230, 0.3) !important',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1) !important',

  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    flex: '1',
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    '& >div:last-child': {
      marginTop: 'auto',
      marginBottom: 'auto'
    },
    '& >div:first-child': {
      display: 'flex',
      flexDirection: 'row',
      '& >div': {
        margin: 'auto'
      }
    }
  },
  quantityFieldWrapper: {
    width: 90,
  },
  rightSection: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  seperationLine: {
    borderLeft: '1px solid #0466C8',
  },
  name: {
    fontSize: 13,
    color: '#33415C',
    fontWeight: 'bold',
  },
  code: {
    fontSize: 13,
    color: '#33415C',
  },
  phoneIcon: {
    paddingLeft: 7,
    paddingRight: 7,
  },
  children: {
    marginLeft: 25,
  },
  count: {
    color: '#0466C8',
    fontSize: 14,
    fontWeight: 'bold',
  }
});
export default function EAMExpandableItemRow({ className, value, type, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();
  if (!value) {
    return;
  }

  return (

    <div id="expandableItem" className={
      clsx(className, classes.root)}
    >
      {value.map(val => (
        <>
          <div className={clsx(classes.wrapper, {
            [classes.wrapperBlue]: val.children
          })} onClick={onClick}>
            <div className={classes.row}>
              <div className={classes.leftSection}>
                <div>
                  <div>
                    {val.phNo ? (
                      <IconButton className={classes.phoneIcon}>
                        <PhoneGreenIcon />
                      </IconButton>
                    ) : null}
                  </div>
                  <div>
                    <Typography className={classes.name} variant="body1">
                      {val.name}
                    </Typography>
                    <Typography className={classes.code} variant="body1">
                      {val.code}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography variant="body1" className={classes.count}>
                    {val.quantity} Items
                  </Typography>
                </div>
              </div>
              <div className={clsx(classes.rightSection, {
                [classes.seperationLine]: !!val.children?.length
              }
              )}

                onClick={() => {
                  if (val.children) {
                    setIsExpanded(isExpanded)
                  }
                }}

              >
                {val.isInput ? (
                  (
                    <div className={classes.quantityFieldWrapper}>
                      <QuantityField mode="mini" />
                    </div>
                  )
                ) : null}
                {val?.children ? (
                  isExpanded ? <MinusBlueIcon /> : <PlusBlueIcon />

                ) : null}
              </div>
            </div>

          </div>
          {val.children ? (
            <EAMExpandableItemRow className={classes.children} value={val.children} onClick={onClick} />
          ) : null}
        </>
      ))}

    </div>
  );
}