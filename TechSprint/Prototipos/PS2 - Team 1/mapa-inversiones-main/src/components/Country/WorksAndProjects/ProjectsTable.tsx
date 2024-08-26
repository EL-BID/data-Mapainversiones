import React, { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Link,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import { IProject } from "../../../types/Project";
import NextLink from "next/link";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

interface ProjectTableProps {
  projects: IProject[];
}

const ProjectTable: FC<ProjectTableProps> = ({ projects }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate the data slice for the current page
  const paginatedData = projects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle page change
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to print the table
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const tableHtml = `
        <html>
          <head>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            ${document.getElementById("table-to-print")?.innerHTML || ""}
          </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(tableHtml);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Function to download the table as CSV
  const handleDownload = () => {
    // Convert table data to CSV
    const csvContent = [
      ["Proyecto", "Entidad", "Valor", "Estado"],
      ...projects.map((project) => [
        project.NombreProyecto,
        project.entidadejecutora,
        project.CostoEstimadoProyecto,
        project.EtapaActual,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    // Create a download link and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "projects.csv");
    link.click();
  };

  return (
    <Paper>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        padding={2}
      >
        <Typography variant="h6">Resultados</Typography>
        <Box>
          <IconButton
            onClick={handlePrint}
            sx={{
              border: "1px solid gray",
              borderRadius: "8px",
            }}
          >
            <LocalPrintshopIcon />
          </IconButton>
          <IconButton
            onClick={handleDownload}
            sx={{
              border: "1px solid gray",
              borderRadius: "8px",
              marginLeft: "10px",
            }}
          >
            <DownloadOutlinedIcon />
          </IconButton>
        </Box>
      </Grid>
      <TableContainer id="table-to-print">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Proyecto</TableCell>
              <TableCell>Entidad</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((project: IProject) => (
              <TableRow key={project.IdProyecto}>
                <TableCell>
                  <Link
                    href={`/country/works-and-projects/${project.IdProyecto}`}
                    component={NextLink}
                  >
                    <Typography fontSize={14} fontWeight={500}>
                      {project.NombreProyecto}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>{project.entidadejecutora}</TableCell>
                <TableCell>{project.CostoEstimadoProyecto}</TableCell>
                <TableCell>{project.EtapaActual}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={projects.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  );
};

export default ProjectTable;
