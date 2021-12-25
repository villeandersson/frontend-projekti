import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

export default function Traininglist() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [trainings, setTrainings] = useState([]);

  const gridRef = useRef();

  function dateFormatter(params) {
    console.log(params);
    return moment(params.value).format("MMM D YYYY hh:mm");
  }

  const columns = [
    {
      flex: 1,
      headerName: "",
      field: "id",
      resizable: true,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => {
        const url = `https://customerrest.herokuapp.com/api/trainings/${params.data.id}`;
        return (
          <div>
            <Button color="warning" onClick={() => deleteTraining(url)}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
    {
      flex: 1,
      headerName: "Activity",
      field: "activity",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: dateFormatter,
    },
    {
      flex: 1,
      headerName: "Duration (min)",
      field: "duration",
      sortable: true,
      filter: true,
    },

    {
      flex: 1,
      headerName: "Customer",
      field: "customer",
      sortable: true,
      filter: true,
      cellRendererFramework: (params) => {
        return params.value.firstname + " " + params.value.lastname;
      },
    },
  ];

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
  };

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  const deleteTraining = (url) => {
    if (
      window.confirm("Are you sure you want to delete the selected training?")
    ) {
      fetch(url, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <input type="search" onChange={onFilterTextChange} placeholder="Search" />
      <div
        className="ag-theme-material"
        style={{
          height: "700px",
          width: "80%",
          margin: "auto",
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          rowSelection="single"
          columnDefs={columns}
          rowData={trainings}
          animateRows="true"
          pagination="true"
          paginationAutoPageSize="true"
        ></AgGridReact>
      </div>
    </div>
  );
}
