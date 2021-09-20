import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EAMText from '../../../../components/EAMText';
import classnames from "classnames";
import SearchIcon from "../../../../assets/Icons/SearchIcon";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  cardWrapper: {
    width: "80vw",
    height: "54px",
    background: "#F7F9FB",
    border: "1px solid #E9EBEF",
    boxSizing: "border-box",
    borderRadius: "3px",
    boxShadow: "none",
  },
  cardContent: {
      display: "flex",
      padding: 5,
  },
  checklistTitle: {
      paddingLeft: "20px",
      color: "#33415C",
      fontSize: "12px",
      fontWeight: "700",
  },
  checklistQty: {
      paddingLeft: "20px",
      color: "#33415C",
      fontSize: "12px",
      fontWeight: "400",
  },
});


export default function ChecklistSearchDetails({data}) {
  const classes = useStyles();
  return (
    data.map(({checklistTitle, checklistQty, status}) => {
      return (
        <Card className={classes.cardWrapper}>
          <CardContent className={classes.cardContent}>
              <div>
                  <Typography className={classes.checklistTitle}>
                      {checklistTitle}
                  </Typography>
                  <Typography className={classes.checklistQty}>
                      {checklistQty}
                  </Typography>
              </div>
          </CardContent>
      </Card>
      )
    }))
}