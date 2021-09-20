import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { usePages } from "../../../app/trackedContext";
import { useDispatch } from "react-redux";
import "../../css/control/RTNavBar.css";
import  RTMenuDrawer  from "../container/RTMenuDrawer";


export function RTNavBar(props) {
  const { title, rightIcons, className, isMenuOpen, isDispatch } = props;
  const history = useHistory();
  const [menuState, setMenuState] = useState(isMenuOpen);
  const pages = usePages();
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuState(open);
  };
  const dispatch = useDispatch();
  return (
    <div className="app-navbar">
      <div className="app-navbar-inner app-navbar-left">
        <RTMenuDrawer
          isOpen={menuState ? menuState : false}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)} />
        {pages.length > 1 && (
          <button
            className="nebula-icons navigate_before-nbicon rtnavlefticon"
            onClick={(e) => {
              history.goBack();
              if (isDispatch && isDispatch.length > 0) {
                for (var i in isDispatch) {
                    dispatch({ type: isDispatch[i].type, payload: isDispatch[i].payload });
                }
              }
            }}
          >
          </button>
        )}
        <button
          className="nebula-icons neb-hammenu_out"
          onClick={(e) => {
            setMenuState(true);
          }}
        >
          
        </button>
        <div className={"app-navbar-title " + (className ? className : "")}>{title}</div>
      </div>
      <div className="app-navbar-inner app-navbar-center"></div>
      <div className="app-navbar-inner app-navbar-right">
        {rightIcons && rightIcons.map((rightIcon, index) => {
          return (<>{
            rightIcon.type === "icon" && <button
              className={"nebula-icons " + (rightIcon.iconCls ? rightIcon.iconCls : "")}
              style={{ border: "none", background: "transparent", padding: "0px", margin: "5px", fontSize:"20px" }}
              onClick={rightIcon.action}
              key={"navrighticons_" + index}
            >
            </button>
          }
            {
              rightIcon.type === "image" && <img
                src={rightIcon.src}
                className="app-navbar-profile" onClick={rightIcon.action} key={"navprofile_" + index} />
            }
            {
              rightIcon.type === "status" &&
              <div className={rightIcon.cls} onClick={rightIcon.action} key={"navstatus_" + index}>{rightIcon.text}</div>
            }
          </>)
        })}
      </div>
    </div>
  );
}

