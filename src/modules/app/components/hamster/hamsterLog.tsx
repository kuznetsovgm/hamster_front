import { FC } from "react"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useGetHamsterLogQuery } from "../../store"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Hamster } from "../../interfaces/hamster"
import { HamsterAction } from "./hamsterAction"

interface IProps {}

const columns: GridColDef<Hamster.HamsterLog>[] = [
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: ({ row }) => (
      <HamsterAction action={row.action} date={row.createdAt} />
    ),
  },
]

export const HamsterLog: FC<IProps> = (props) => {
  const {
    data,
    isFetching: isLoginUrlFetching,
    isError: isLoginUrlError,
  } = useGetHamsterLogQuery(
    {},
    {
      pollingInterval: 300000,
    },
  )

  if (isLoginUrlFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Box>
      {/* <Typography variant="h5">Последние действия</Typography> */}
      <Box height={600}>
        <DataGrid<Hamster.HamsterLog>
          columns={columns}
          rows={data ?? []}
          columnHeaderHeight={0}
          rowSelection={false}
          hideFooter
          rowHeight={60}
          sx={{
            backgroundColor: "transparent",
            "&.MuiDataGrid-root": {
              border: "none",
            },
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            ".MuiDataGrid-cell": {
              borderTop: "none",
            },
          }}
        />
      </Box>
    </Box>
  )
}
