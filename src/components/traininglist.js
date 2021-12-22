import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import moment from "moment";

export default function Traininglist() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [trainings, setTrainings] = useState([]);

  const gridRef = useRef();

  function dateFormatter(date) {
    return moment(date).format("MMM D YYYY h:mm");
  }

  const columns = [
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
  ];

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content));
  };

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
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
