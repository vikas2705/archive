import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import EAMRadioButtonGroup from "../../components/EAMRadioButtonGroup";
import EAMSelect from "../../components/EAMSelect";
import EAMTabs from "../../components/EAMTabs";
import IsVisible from "../../components/Form/IsVisible";
import PageHeader from "../../components/PageHeader";

const useStyles = makeStyles({
  root: {

  },
  container: {

  },
  tabWrapper: {
    '& > button': {
      background: '#FFFFFF',
      border: '1px solid #C9CDD6',
      boxSizing: 'border-box',
      borderRadius: 5,
      marginRight: 10,
      padding: 12,
    }
  },
  tabContainer: {
    marginTop: 9,
    marginBottom: '9px !important',
    marginLeft: 9,
    '& > ': {
      '& .MuiTabs-indicator': {
        backgroundColor: '#FF5C00',
        height: 5,
      }
    }
  }
});
const tabsData = [{ label: "Issue" }, { label: "Receipt" }, { label: "Return" }];
export default function ToDoList() {
  const classes = useStyles();
  const [filter, setFilter] = useState('Document');
  const [activeTabIndex, setActiveTabIndex] = useState(0);


  return (
    <div className={classes.root}>
      <PageHeader
        title="To Do List"
        showBack
      />
      <div className={classes.container}>
        <EAMTabs
          classes={{
            scroller: classes.tabContainer,
            flexContainer: classes.tabWrapper
            // scroller: classes.tabs
          }}
          tabsData={tabsData}
          value={activeTabIndex} onChange={(event, ind) => {
            setActiveTabIndex(ind);
          }} />
          <div className={classes.formWrapper}>
          <EAMRadioButtonGroup
          title=""
          id=""
          value={filter}
          onFieldChange={(id, value)=>{
            setFilter(value);
          }}
          options={[
            {
              id: "Document",
              value: "Document",
              label: "Document",
              name: "radios",
            },
            {
              id: "Item",
              value: "Item",
              label: "Item",
              name: "radios",
            },
          ]}
          />
          <IsVisible visible={filter === 'Docuement'}>
          <EAMSelect
                id="test"
                shouldFormat
                title='Ref. Doc. Type'
                value="All"
                onFieldChange={()=>{}}
                labelField="a"
                valueField="a"
                options={[
                  { a: 'All'},
                  { a: 'Production Order'},
                  { a: 'Maintaince Work Order'},
                  { a: 'Service WOrk Order'},
                  { a: 'Sub Contract Order'},
                  { a: 'Material Request'},
                ]}
              />
          </IsVisible>
          <IsVisible visible={filter === 'Item'}>

          </IsVisible>
          </div>
      </div>

    </div>
  )
}