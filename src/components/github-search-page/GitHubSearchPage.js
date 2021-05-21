import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  TablePagination,
  TextField,
  Typography,
} from '@material-ui/core'
import { getRepos } from '../../services'
import Content from '../content/Content'
import GitHubTable from '../github-table/GitHubTable'

const ROWS_PER_PAGE_DEFAULT = 30

const GitHubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchApplied, setIsSearchApplied] = useState(false)
  const [repoList, setRepoList] = useState([])
  const [searchBy, setSearchBy] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT)

  const didMount = useRef(false)

  const handleSearch = useCallback(async () => {
    setIsSearching(true)
    const response = await getRepos({ q: searchBy, rowsPerPage })
    const data = await response.json()
    setRepoList(data.items)
    setIsSearchApplied(true)
    setIsSearching(false)
  }, [rowsPerPage, searchBy])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    handleSearch()
  }, [handleSearch])

  const handleChange = ({ target: { value } }) => setSearchBy(value)

  const handleChangeRowsPerPage = ({ target: { value } }) =>
    setRowsPerPage(value)

  return (
    <Container>
      <Box my={4}>
        <Typography component="h1" variant="h3">
          GitHub repositories list page
        </Typography>
      </Box>
      <Grid container spacing={2} justify="space-between">
        <Grid item md={6} xs={12}>
          <TextField
            value={searchBy}
            onChange={handleChange}
            fullWidth
            label="Filter by"
            id="filterBy"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            color="primary"
            disabled={isSearching}
            fullWidth
            onClick={handleSearch}
            variant="contained"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Box my={4}>
        <Content isSearchApplied={isSearchApplied} repoList={repoList}>
          <GitHubTable repoList={repoList} />
          <TablePagination
            rowsPerPageOptions={[30, 50, 100]}
            component="div"
            count={1}
            rowsPerPage={rowsPerPage}
            page={0}
            onChangePage={() => {}}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Content>
      </Box>
    </Container>
  )
}

export default GitHubSearchPage
