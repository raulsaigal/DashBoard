// Import required dependencies
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, TextField, Paper,Button } from '@mui/material';
import Navbar from '../Dashboard/Navbar';
import { Route,Routes } from 'react-router-dom';
import Home from '../Home';




// Sample data for demonstration
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', registrationDate: '2024-01-10' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', registrationDate: '2023-12-05' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', registrationDate: '2024-02-15' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', registrationDate: '2024-03-20' },
  // Add more data as needed
];

function DataTable() {
  const [data, setData] = useState(sampleData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  
   
  
  // Filtering logic
  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    const isAsc = sortConfig.direction === 'asc';
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return isAsc ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return isAsc ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle sort change
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to the first page
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Registration Date'],
      ...data.map((row) => [row.id, row.name, row.email, row.registrationDate])
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'user_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    
    <Paper sx={{ padding: 2 }}>

       <Navbar/>

       <Routes>
       <Route path='/#overview' element={<Home/>} />
    </Routes>

      {/* Search Field */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Export Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '15px' }}
        onClick={exportToCSV}
      >
        Export to CSV
      </Button>
      
      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'email'}
                  direction={sortConfig.key === 'email' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'registrationDate'}
                  direction={sortConfig.key === 'registrationDate' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('registrationDate')}
                >
                  Registration Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.registrationDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
 );
}
function Analytics() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Navbar />

      <h1>Analytics Page</h1>
      <p>Here you can display analytics data or charts.</p>
    </Paper>
  );
}

export  { DataTable, Analytics };
