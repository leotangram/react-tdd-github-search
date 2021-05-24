import {
  Avatar,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import PropTypes from 'prop-types'

const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open issues',
  'Updated at',
]

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
})

const GitHubTable = ({ repoList }) => {
  const classes = useStyles()

  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader>
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
  )
}

GitHubTable.propTypes = {
  repoList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default GitHubTable
