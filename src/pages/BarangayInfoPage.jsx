import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import AddModal from "../components/modal/AddModal";
import AddBrgyOfficial from "../components/modal/AddBrgyOfficial";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import EditBrgyOfficial from "../components/modal/EditBrgyOfficial";
import Swal from "sweetalert2";
import ViewModal from "../components/modal/ViewModal";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "contact", label: "Contact No.", alignRight: false },
  { id: "email", label: "E-mail", alignRight: false },
  { id: "position", label: "Position", alignRight: false },
  { id: "cstatus", label: "Civil Status", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.fname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BarangayInfoPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false)

  const [viewModalOpen, setViewModalOpen] = useState(false)

  const [brgyOfficials, setBrgyOfficials] = useState([]);

  const [viewModalData, setViewModalData] =  useState({})

  const [editData, setEditData] = useState({})

  const [formID, setFormID] = useState("")

  const [loading, setLoading] = useState(true)

  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, "data_brgyofficials"));
        const dataSnap = await getDocs(dataRef);
        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setBrgyOfficials(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const dataRef = doc(db, "data_brgyofficials", id)
      await deleteDoc(dataRef)
      toast.success("Deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      nav('/dashboard/brgyinfo')
    } catch(err) {
      console.error(err)
    }
  }

  const handleEditModal = (id, data) => {
    setFormID(id);
    setEditData(data);
    setEditModalOpen(true);
  };


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = brgyOfficials.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - brgyOfficials.length) : 0;

  const filteredUsers = applySortFilter(
    brgyOfficials,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Barangay Information</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Barangay Officials
          </Typography>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Barangay Officials
          </Button>
          <AddBrgyOfficial
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Stack>

        {loading ? (
          <Loader/>
        ) : (

          <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={brgyOfficials.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((official, index) => {
                      const {
                        id,
                        fname,
                        position,
                        cstatus,
                        email,
                        contact,
                        bod,
                      } = official;
                      const selectedUser = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, fname)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={fname}
                                src={`/assets/images/avatars/avatar_${
                                  index + 1
                                }.jpg`}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {fname}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{contact}</TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{position}</TableCell>

                          <TableCell align="left">{cstatus}</TableCell>

                          <TableCell align="left">
                          <IconButton
                              size="small"
                              color="inherit"
                              onClick={() => handleEditModal(id, official)}
                            >
                              <Iconify icon={"material-symbols:edit-outline"} />
                            </IconButton>
                            
                            <IconButton
                              size="small"
                              color="inherit"
                              onClick={() => handleDelete(id)}
                            >
                              <Iconify icon={"material-symbols:delete-outline"} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="inherit"
                              onClick={() => {setViewModalOpen(true), setViewModalData(official)}}
                            >
                              <Iconify icon={"carbon:view"} />
                            </IconButton>
                            <ViewModal open={viewModalOpen} onClose={() => setViewModalOpen(false)} data={viewModalData}/>
                          </TableCell>

                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <EditBrgyOfficial open={editModalOpen} onClose={() => setEditModalOpen(false)} formID={formID} data={editData}/>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={brgyOfficials.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        )}

      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
