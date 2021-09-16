import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { matchSorter } from "match-sorter";
import "./styles.css";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="d-flex">
      <div className="input-group input-group mb-3">
        <div className="input-group-prepend form-group">
          <span
            className="input-group-text bg-transparent border-white"
            id="inputGroup-sizing-sm"
          >
            Buscar:
          </span>
        </div>
        <input
          type="text"
          className="form-control border border-primary rounded"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0",
          }}
        />
      </div>
    </span>
  );
}

function CreatorFilter({ setToggler, toggle }) {
  return (
    <span className="d-flex">
      <div className=" mb-3 mr-3">
        <div className="">
          <span
            className={`btn btn-outline-primary text-capitalize ${
              toggle ? "creatorFilterActive" : "creatorFilterInactive"
            }`}
            style={{ width: "fit-content" }}
            onClick={() => setToggler(() => !toggle)}
          >
            <span
              className={`filterBtn_innerSpace ${
                toggle ? "cerrar" : "text-slide"
              }`}
            >
              <span className="text-slide">Mis Proyectos</span>
              <div>
                <span className="line line1 bg-primary"></span>
                <span className="line line3 bg-primary"></span>
              </div>
            </span>
          </span>
        </div>
      </div>
    </span>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      style={{ display: "none" }}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

const CustomTable = ({
  projectsData,
  setToggleUserProjects,
  toggleUserProjects,
}) => {
  let { url } = useRouteMatch();
  const history = useHistory();

  const handleRowClick = async (id) => {
    history.push(`${url}/${id}`);
  };

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const data = React.useMemo(
    () =>
      Object.keys(projectsData).map((key, index) => ({
        proyectName: projectsData[key].proyectName,
        startDate: projectsData[key].startDate,
        typeProyect: projectsData[key].typeProyect,
        enterpriseProject: projectsData[key].enterpriseProject,
        objectiveProject: projectsData[key].objectiveProject,
        statusProject: projectsData[key].statusProject,
        _id: projectsData[key]._id,
      })),
    [projectsData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Proyecto",
        accessor: "proyectName",
        Cell: (row) => (
          <div
            style={{ textAlign: "left", maxWidth: "13em", minWidth: "13em" }}
          >
            {row.value}
          </div>
        ),
      },
      {
        Header: "Fecha De Inicio",
        accessor: "startDate",
      },
      {
        Header: "Tipo De Proyecto",
        accessor: "typeProyect",
      },
      {
        Header: "Empresa",
        accessor: "enterpriseProject",
        Cell: (row) => (
          <div style={{ maxWidth: "10em", minWidth: "10em" }}>{row.value}</div>
        ),
      },
      {
        Header: "Objetivo",
        accessor: "objectiveProject",
      },
      {
        Header: "Estatus",
        accessor: "statusProject",
      },
      {
        Header: "ID",
        accessor: "_id",
        show: false,
      },
    ],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { hiddenColumns: "_id", pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <div
      id="table__responsive"
      className="table-responsive table h-100"
      style={{ paddingBottom: "4em", overflowX: "scroll" }}
    >
      <span className="d-flex justify-content-sm-between">
        <div className="pagination">
          <span className="pt-2">Mostrar </span>
          <select
            style={{ margin: "0 .5em", width: "4em" }}
            className="custom-select border border-primary"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span className="pt-2">elementos </span>
        </div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <CreatorFilter
          setToggler={setToggleUserProjects}
          toggle={toggleUserProjects}
        />
      </span>
      <Table
        {...getTableProps()}
        className="display table-hover table table-striped table-bordered "
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr></tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      onClick={() => handleRowClick(row.values._id)}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="mb-4">
        <button
          className="btn btn-sm rounded-sm btn-outline-primary"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="btn btn-sm rounded-sm btn-outline-primary"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="btn btn-sm rounded-sm btn-outline-primary"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="btn btn-sm rounded-sm btn-outline-primary"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
    </div>
  );
};

export default CustomTable;
