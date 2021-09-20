import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import { AuthContext } from '../../../utils/Providers/AuthProvider';
import { useNavigation } from "../../../app/trackedContext";
import { connect } from "react-redux";
import RamcoLogo from "../../../assets/Icons/RamcoLogo";
import { useHistory } from 'react-router-dom';
import "../../css/container/RTMenuDrawer.css";



function RTMenuDrawer(props) {
  const { isOpen, onClose, onOpen, userContext } = props;
  const theme = useTheme();
  const history = useHistory();
  const useStyles = makeStyles({
    rtMenuContainer:{
      background: 'linear-gradient(165.98deg, #52E5E7 0%, #130CB7 100.63%)',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    list: {
      width: '85vw',
      [theme.breakpoints.up("sm")]: {
        width: '50vw'
      },
      [theme.breakpoints.up("md")]: {
        width: '35vw'
      }
    },
    listItem:{
      color: "#ffffff"
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = useStyles();
  const context = useContext(AuthContext);
  const menuList = [{text:"Work Request", icon:"neb-tick"},
  {text:"Inventory Inquiry", icon:"neb-search"},
  {text:"Inventory Discrepancy", icon:"neb-invent_discrepancy"},
  {text:"Inventory Operations", icon:"neb-invent_operations"}];

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <div style={{ display: "flex", height: "80px", width: "100%"}}>
        <img src="data:image/png;base64,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"
              className="menubar-profile" />
          <div style={{ width: "75%", margin: "20px 20px 20px 10px" }}>
            <div style={{ fontSize: "15px", fontWeight: "600", color: "#002855" }}>{userContext.name}</div>
            <div style={{ paddingTop:"5px", fontSize: "11px", fontWeight: "600", fontStyle: "italic", color: "#002855" }}>Test Role</div>
          </div>
          <button
            className="nebula-icons neb-logout"
            style={{ paddingBottom:"30px",marginLeft: "40px", color: "#FF3333" }}
            onClick={(e) => {
              context.logout();
            }}
          >
          </button>
        </div>
        <Divider />
        <List>
          {menuList.map((item, index) => (
            <ListItem button key={item.text} onClick={(e) => {
              history.push('/dashboard');
            }}>
            <ListItemIcon style={{minWidth: "30px"}} className={item.icon} />
            <ListItemText primary={item.text} className={clsx(classes.listItem)} />
            </ListItem>
          ))}
        </List>
        <div style={{position:"absolute", bottom:"10px", right:"10px"}}>
            <RamcoLogo/>
        </div>
      </div>
    </SwipeableDrawer>
  );
}

const mapStateToProps = (
  {
    workrequest: {
      userContext
    }
  }
) => {
  return {
    userContext
  };
};

export default connect(mapStateToProps)(RTMenuDrawer);



