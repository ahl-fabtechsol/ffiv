import React from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export default function TableMui({
  th,
  td,
  styleTableTh,
  styleTableContainer,
  styleTableThead,
  customFields,
  loading,
}) {
  const found = (key) => customFields?.find((obj) => obj.name === key);
  return (
    <>
      <TableContainer
        style={{
          ...styleTableContainer,
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        <Table
          aria-label="simple table"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0px 0px",
          }}
        >
          <Header
            values={{
              styleTableThead,
              th,
              loading,
              styleTableTh,
            }}
          />

          {!loading ? (
            <TableBody className="relative " sx={{ height: "100px" }}>
              {td?.length > 0 ? (
                td?.map((row, index) => (
                  <MuiTableRow
                    rowRounded
                    values={{ row, th, index, found, customFields }}
                  />
                ))
              ) : (
                <div
                  className="text-center p-3 position-absolute translate-middle"
                  style={{ top: "50%", left: "50%" }}
                >
                  No Data Available
                </div>
              )}
            </TableBody>
          ) : (
            <TableBody className="relative " sx={{ height: "80px" }}>
              <div
                className="text-center p-3 absolute translate-middle"
                style={{ top: "0%", left: "50%" }}
              >
                <CircularProgress />
              </div>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
const MuiTableRow = ({ values }) => {
  const { row, th, index, found, customFields } = values;
  return (
    <TableRow key={index}>
      {Object.keys(th).map((key, ind) => (
        <TableCell
          key={ind}
          style={{ whiteSpace: "nowrap", padding: "25px" }}
          align="center"
        >
          {customFields && found(key)
            ? found(key).data(row[key], row)
            : getNestedValue(row, key)}
          {key === "sr" && index + 1}
        </TableCell>
      ))}
    </TableRow>
  );
};
const Header = ({ values, headerRounded }) => {
  const { styleTableThead, th, styleTableTh } = values;

  return (
    <TableHead sx={{ ...styleTableThead }}>
      <TableRow>
        {Object.entries(th).map(([key, value], index) => (
          <TableCell key={index} align="center" sx={styleTableTh}>
            {value}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
const getNestedValue = (obj, key) => {
  const keys = key.split(".");
  return keys.reduce(function (acc, currentKey) {
    return acc && acc[currentKey] !== undefined ? acc[currentKey] : "";
  }, obj);
};
