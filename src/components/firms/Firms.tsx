import React from "react";
import { MyProps } from "./DataTypes";
import { MyState } from "./DataTypes";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Theme, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import { Styles } from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";




const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});



// interface IProps {
//   classes?: any;
// }

class FirmList extends React.Component<MyProps, MyState> {
  gridApi: any;
  gridColumnApi: any;

  constructor(props: MyProps) {
    super(props);
  
    this.state = {
      columnDefs: [
        {
          headerName: "Firm Name",
          field: "firmName",
          sort: "asc",

          width: 1000,
          resizable: false,
          flex: 2,
        },
        {
          headerName: "State",
          field: "state",
          width: 180,
          resizable: false,
          flex: 2,
        },
        {
          headerName: "Users",
          field: "numberOfUsers",
          width: 180,
          resizable: false,
        },
        {
          headerName: "Status",
          field: "statusDescription",
          width: 180,
          resizable: false,
        },
        {
          headerName: "Test Firm",
          field: "isTestFirm",
          width: 180,
          resizable: false,
        },
      ],
      rowData: null,
    };
  }

  onGridReady = (params: any) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };


  updateData = (data: any) => {
    this.setState({ rowData: data });
  };

  //JSON DATA CODE
  componentDidMount() {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => this.updateData(data))
      // .then((rowData) => this.setState({ rowData }))
      .catch((err) => console.log(err));
  }

  //SEARCH FILTER CODE
  handleQuickFilter = (e: any) => {
    this.gridApi.setQuickFilter(e.target.value);
  };
  //DROPDOWN FILTERS
  externalFilterChanged = (newValue: any) => {
    listFilter = newValue.target.value;
    this.gridApi.onFilterChanged();
  };

  isExternalFilterPresent = () => {
    return listFilter !== "everyone";
  };
  //SWITCH STATEMENT > State
  doesExternalFilterPass = (node: any) => {
    switch (listFilter) {
      case "0":
        return true;
      case "1":
        return node.data.state === "NSW";
      case "2":
        return node.data.state === "VIC";
      case "3":
        return node.data.state === "QLD";
      case "4":
        return node.data.status === 1;
      case "5":
        return node.data.status === 2;
      case "6":
        return node.data.isTestFirm === true;
      case "7":
        return node.data.isTestFirm === false;
      default:
        return true;
    }
  };

  render() {
    const { classes } = this.props;
 

    return (
      <div>
        <div className="filter-bar">
          <input
            type="search"
            onChange={this.handleQuickFilter}
            id="filter-text-box"
            placeholder="Search"
          ></input>{" "}
          <InputLabel id="outlined-age-native-simple">State</InputLabel>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              native
              name="by-state"
              id="demo-simple-select-label"
              onChange={this.externalFilterChanged}
            >
              <option value="0" id="0">
                ALL
              </option>
              <option value="1" id="1">
                NSW
              </option>
              <option value="2" id="2">
                VIC
              </option>
              <option value="3" id="3">
                QLD
              </option>
            </Select>
          </FormControl>
          <InputLabel id="outlined-age-native-simple">Status</InputLabel>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              native
              name="by-status"
              id="demo-simple-select-label"
              onChange={this.externalFilterChanged}
            >
              <option value="0" id="0">
                ALL
              </option>
              <option value="4" id="4">
                Enabled
              </option>
              <option value="5" id="5">
                Disabled
              </option>
            </Select>
          </FormControl>
          <InputLabel id="outlined-age-native-simple">Status</InputLabel>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              native
              name="by-status"
              id="demo-simple-select-label"
              onChange={this.externalFilterChanged}
            >
              <option value="0" id="0">
                ALL
              </option>
              <option value="6" id="6">
                Test Firm
              </option>
              <option value="7" id="7">
                Live Firm
              </option>
            </Select>
          </FormControl>
        </div>

        <div className="ag-theme-material" style={{ height: "1400px" }}>
          <AgGridReact
            animateRows={true}
            isExternalFilterPresent={this.isExternalFilterPresent}
            doesExternalFilterPass={this.doesExternalFilterPass}
            onGridReady={this.onGridReady}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
      
          ></AgGridReact>
        </div>
      </div>
    );
  }
}
var listFilter = "everyone";

export default withStyles(useStyles)(FirmList);
