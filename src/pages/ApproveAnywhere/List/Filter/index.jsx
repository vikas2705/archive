import { makeStyles } from "@material-ui/styles";
import EAMButton from "../../../../components/EAMButton";
import EAMSelect from "../../../../components/EAMSelect";
import EAMText from "../../../../components/EAMText";
import FormWrapper from "../../../../components/Form/FormWrapper";
import FullScreenDialog from "../../../../components/FullScreenDialog";

const useStyles = makeStyles({
    container: {
        height: "100%",
    },
    count: {
        fontWeight: "800",
        fontSize: 16,
        color: "#33415C",
        textAlign: "center",
    },
    actionWrapper: {
        width: "100%",
        display: "flex",
        "& > button": {
            flex: 1,
        },
    },
});
export default function ApproveAnywhereListFilter({ onClose }) {
    const classes = useStyles();
    return (
        <FullScreenDialog
            modalTitle='Filters'
            open
            onClose={onClose}
            modalContent={
                <>
                    <FormWrapper>
                        <EAMSelect
                            id='test'
                            shouldFormat
                            title='Ref. Doc. Type'
                            value=''
                            onFieldChange={() => {}}
                            labelField='a'
                            valueField='a'
                            options={[]}
                        />
                        <EAMText title='Search Text' onFieldChange={() => {}} />
                    </FormWrapper>
                    <div className={classes.actionWrapper}>
                        <EAMButton variant='secondary' onClick={() => {}}>
                            Reset
                        </EAMButton>
                        <EAMButton variant='primary' onClick={() => {}}>
                            Apply
                        </EAMButton>
                    </div>
                </>
            }
        />
    );
}
