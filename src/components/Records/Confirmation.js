import React from 'react';
import MaterialTable from 'material-table';

const styleCell = {
  padding: 0,
  width: 10,
}

export default function Confirmation() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Book', field: 'book', cellStyle: {styleCell}},
      { title: 'Page', field: 'page', cellStyle: {styleCell}},
      { title: 'No', field: 'no', cellStyle: {styleCell}},
      { title: 'Name', field: 'name', cellStyle: {styleCell}},
      { title: 'Father', field: 'father', cellStyle: {styleCell}},
      { title: 'Mother', field: 'mother', cellStyle: {styleCell}},
      { title: 'Birth Date', field: 'birthdate', cellStyle: {styleCell}},
      { title: 'Confirmation Date', field: 'confirmationdate', cellStyle: {styleCell}},
    ],
    data: [
      { book: 1, page: 100, no: 10, name: 'asdaasdasdasdasdasdasdas', father: 'asdasdas', mother: 'asdasdas', birthdate: '2485485', confirmationdate: 'a555456'},
    ],
  });

  return (
    <MaterialTable
      title="Confirmation"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}