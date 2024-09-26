import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import UpdateForm from "../components/UpdateForm";
import WorkBook from "../components/WorkBook";
import { DataProvider } from "../context/dataContext";

export default function WorkPage() {
  return (
    <>
      <DataProvider>
        <Navbar />
        <Header />
        <Form />
        <WorkBook />
        <UpdateForm />
      </DataProvider>
    </>
  );
}
