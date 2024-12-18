// // Import required dependencies
// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, TextField, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// // Sample data for demonstration
// const sampleData = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', registrationDate: '2024-01-10' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', registrationDate: '2023-12-05' },
//   { id: 3, name: 'Alice Johnson', email: 'alice@example.com', registrationDate: '2024-02-15' },
//   { id: 4, name: 'Bob Brown', email: 'bob@example.com', registrationDate: '2024-03-20' },
//   // Add more data as needed
// ];

// function DataTable() {
//   const [data, setData] = useState(sampleData);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Filtering logic
//   const filteredData = data.filter(
//     (row) =>
//       row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Sorting logic
//   const sortedData = [...filteredData].sort((a, b) => {
//     const isAsc = sortConfig.direction === 'asc';
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return isAsc ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return isAsc ? 1 : -1;
//     }
//     return 0;
//   });

//   // Pagination logic
//   const paginatedData = sortedData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // Handle sort change
//   const handleSort = (key) => {
//     const direction =
//       sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
//     setSortConfig({ key, direction });
//   };

//   // Handle search change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setPage(0); // Reset to the first page
//   };

//   // Handle pagination change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   return (
//     <Paper sx={{ padding: 2 }}>
//       {/* Search Field */}
//       <TextField
//         label="Search"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={searchQuery}
//         onChange={handleSearchChange}
//       />

//       {/* Table */}
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortConfig.key === 'name'}
//                   direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
//                   onClick={() => handleSort('name')}
//                 >
//                   Name
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortConfig.key === 'email'}
//                   direction={sortConfig.key === 'email' ? sortConfig.direction : 'asc'}
//                   onClick={() => handleSort('email')}
//                 >
//                   Email
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortConfig.key === 'registrationDate'}
//                   direction={sortConfig.key === 'registrationDate' ? sortConfig.direction : 'asc'}
//                   onClick={() => handleSort('registrationDate')}
//                 >
//                   Registration Date
//                 </TableSortLabel>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                 <TableCell>{row.registrationDate}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

// function Profile() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [open, setOpen] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     let tempErrors = {};
//     if (!formData.name) tempErrors.name = 'Name is required';
//     if (!formData.email) {
//       tempErrors.email = 'Email is required';
//     } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
//       tempErrors.email = 'Email is not valid';
//     }
//     if (!formData.password) tempErrors.password = 'Password is required';
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Updated Profile Data:', formData);
//       setOpen(false);
//     }
//   };

//   return (
//     <Paper sx={{ padding: 2 }}>
//       <h1>User Profile</h1>
//       <Button variant="contained" onClick={() => setOpen(true)}>
//         Update Profile
//       </Button>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Update Profile</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             error={!!errors.name}
//             helperText={errors.name}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             error={!!errors.email}
//             helperText={errors.email}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             error={!!errors.password}
//             helperText={errors.password}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// }

// function Analytics() {
//   return (
//     <Paper sx={{ padding: 2 }}>
//       <h1>Analytics Page</h1>
//       <p>Here you can display analytics data or charts.</p>
//     </Paper>
//   );
// }

// export default { DataTable, Analytics, Profile };

import React, { useState, useEffect } from 'react';
import './Setting.css'

const Profile = () => {
  // State for user profile information
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedProfileData = {
      userId: 'USER_ID',  // You should replace this with the actual logged-in user's ID
      name: userData.name,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    };
  
    try {
      const response = await fetch('http://localhost:3000/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating profile');
    }
  };
  
  

  // State for theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Toggle theme
  const handleThemeToggle = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
  };

  // Set the theme class
  const themeClass = isDarkMode ? 'dark-mode' : '';

  return (
    <div className={`profile-container ${themeClass}`}>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      <button onClick={handleThemeToggle}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default Profile;
