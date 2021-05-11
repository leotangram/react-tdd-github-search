import {
  Avatar,
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'

const Content = ({ isSearchApplied }) =>
  isSearchApplied ? (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            <TableCell>Stars</TableCell>
            <TableCell>Forks</TableCell>
            <TableCell>Open issues</TableCell>
            <TableCell>Updated at</TableCell>
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
