import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

export default function Customerlist() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [customers, setCustomers] = useState([]);

  const gridRef = useRef();

  const columns = [
    {
      flex: 1,
      headerName: "First name",
      field: "firstname",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Last name",
      field: "lastname",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Phone",
      field: "phone",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Address",
      field: "streetaddress",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Postcode",
      field: "postcode",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true,
    },
  ];

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
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
          rowData={customers}
          animateRows="true"
          pagination="true"
          paginationAutoPageSize="true"
        ></AgGridReact>
      </div>
    </div>
  );
}
