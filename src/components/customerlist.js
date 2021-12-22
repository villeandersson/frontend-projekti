import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Addcustomer from "./addcustomer";
import Editcustomer from "./editcustomer";
import Addtraining from "./addtraining";

export default function Customerlist() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [customers, setCustomers] = useState([]);

  const gridRef = useRef();

  const columns = [
    {
      flex: 1,
      headerName: "Add Training",
      field: "_links",
      resizable: true,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => {
        console.log(params);
        const id = params.data.links[0].href;
        return <Addtraining id={id} saveTraining={saveTraining} />;
      },
    },
    {
      flex: 1,
      headerName: "Edit Customer",
      field: "_links",
      resizable: true,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => {
        const url = params.data.links[0].href;
        return <Editcustomer url={url} updateCustomer={updateCustomer} />;
      },
    },
    {
      flex: 1,
      headerName: "Delete Customer",
      field: "_links",
      resizable: true,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => {
        const url = params.data.links[0].href;
        return (
          <div>
            <Button color="warning" onClick={() => deleteCustomer(url)}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
    {
      flex: 1,
      headerName: "First name",
      field: "firstname",
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Last name",
      field: "lastname",
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Email",
      field: "email",
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Phone",
      field: "phone",
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Address",
      field: "streetaddress",
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Postcode",
      field: "postcode",
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "City",
      field: "city",
      resizable: true,
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

  const saveCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (
      window.confirm("Are you sure you want to delete the selected customer?")
    ) {
      fetch(url, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const updateCustomer = (customer, url) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const saveTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input type="search" onChange={onFilterTextChange} placeholder="Search" />
      <Addcustomer saveCustomer={saveCustomer} />
      <div
        className="ag-theme-material"
        style={{
          height: "700px",
          width: "90%",
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
