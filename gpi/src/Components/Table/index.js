import React from 'react';
import Table from 'react-bootstrap/Table'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { matchSorter } from 'match-sorter';
import './styles.css';
  
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span className="d-flex">
      <div className="input-group input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text bg-transparent border-white" id="inputGroup-sizing-sm">Buscar:</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          aria-label="Small" 
          aria-describedby="inputGroup-sizing-sm"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </div>
    </span>
  )
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      style={{display: 'none'}}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

const CustomTable = ({projectsData}) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const data = React.useMemo(() => 
  Object.keys(projectsData).map((key, index) => ({
    proyectName: projectsData[key].proyectName,
    startDate: projectsData[key].startDate,
    typeProyect: projectsData[key].typeProyect,
    enterpriseProject: projectsData[key].enterpriseProject,
    objectiveProject: projectsData[key].objectiveProject,
    statusProject: projectsData[key].statusProject,
    _id: projectsData[key]._id
  })),
  [projectsData]
)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Proyecto',
        accessor: 'proyectName', // accessor is the "key" in the data
      },
      {
        Header: 'Fecha De Inicio',
        accessor: 'startDate',
      },
      {
        Header: 'Tipo De Proyecto',
        accessor: 'typeProyect'
      },
      {
        Header: 'Empresa',
        accessor: 'enterpriseProject'
      },
      {
        Header: 'Objetivo',
        accessor: 'objectiveProject'
      },
      {
        Header: 'Estatus',
        accessor: 'statusProject'
      },
      {
        Header: 'ID',
        accessor: '_id',
        show: false
      }
    ],
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of rows, we'll use page
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
    state
  } = useTable(
    { 
      columns, 
      data, 
      defaultColumn,
      filterTypes,
      initialState: {hiddenColumns: "_id", pageIndex: 0, }
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  )

  return (
    <div id="table__responsive" className="table-responsive table h-100" style={ (pageSize === 10 ? {paddingBottom: "0"} : {paddingBottom: "4em"})}>
      <span className="d-flex justify-content-sm-between">
        <div className="pagination">
          <span className="pt-2">Mostrar </span>
          <select
            style={{margin: "0 .5em", width: "4em"}}
            className="custom-select"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
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
      </span>
      <Table id="table__responsive" {...getTableProps()} className="display table-hover table table-striped table-bordered " >
      
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </Table>
      <button className="btn btn-sm rounded-sm btn-outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button className="btn btn-sm rounded-sm btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button className="btn btn-sm rounded-sm btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button className="btn btn-sm rounded-sm btn-outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>
    </div>
  )
};

export default CustomTable;