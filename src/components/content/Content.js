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

const Content = ({
  isSearchApplied,
  repoList,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleChangeRowsPerPage = ({ target: { value } }) =>
    setRowsPerPage(value)

  const renderWithBox = element => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={400}
    >
      {element}
    </Box>
  )

  if (isSearchApplied && !!repoList.length) {
    return (
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
              {repoList.map(
                ({
                  forks_count: forksCount,
                  id,
                  name,
                  open_issues_count: openIssuesCount,
                  owner: { avatar_url: avatarUrl },
                  stargazers_count: stargazersCount,
                  updated_at: updatedAt,
                  html_url: htmlUrl,
                }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <Avatar src={avatarUrl} alt={name} />
                      <Link href={htmlUrl}>{name}</Link>
                    </TableCell>
                    <TableCell>{stargazersCount}</TableCell>
                    <TableCell>{forksCount}</TableCell>
                    <TableCell>{openIssuesCount}</TableCell>
                    <TableCell>{updatedAt}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={1}
          rowsPerPage={rowsPerPage}
          page={0}
          onChangePage={() => {}}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    )
  }

  if (isSearchApplied && !repoList.length) {
    return renderWithBox(<Typography>You search has no results</Typography>)
  }

  return renderWithBox(
    <Typography>
      Please provide a search option and click in the search button
    </Typography>,
  )
}

Content.propTypes = {
  isSearchApplied: PropTypes.bool.isRequired,
  repoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
}

export default Content
