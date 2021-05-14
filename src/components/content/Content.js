import {
  Avatar,
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'

const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open issues',
  'Updated at',
]

const Content = ({ isSearchApplied }) =>
  isSearchApplied ? (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map(name => (
                <TableCell key={name}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar src="/logo192.png" alt="test" />
                <Link href="http://localhost:3001/test">Test</Link>
              </TableCell>
              <TableCell>10</TableCell>
              <TableCell>5</TableCell>
              <TableCell>2</TableCell>
              <TableCell>2021-01-01</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[30, 50, 100]}
        component="div"
        count={1}
        rowsPerPage={30}
        page={0}
        onChangePage={() => {}}
        onChangeRowsPerPage={() => {}}
      />
    </>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={400}
    >
      <Typography>
        Please provide a search option and click in the search button
      </Typography>
    </Box>
  )

Content.propTypes = {
  isSearchApplied: PropTypes.bool.isRequired,
}

export default Content
