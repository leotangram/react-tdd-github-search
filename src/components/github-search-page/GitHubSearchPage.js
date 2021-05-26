import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TablePagination,
  TextField,
  Typography,
} from '@material-ui/core'
import { getRepos } from '../../services'
import Content from '../content/Content'
import GitHubTable from '../github-table/GitHubTable'

const ROWS_PER_PAGE_DEFAULT = 30
const INITIAL_CURRENT_PAGE = 0
const INITIAL_TOTAL_COUNT = 0

const GitHubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchApplied, setIsSearchApplied] = useState(false)
  const [repoList, setRepoList] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT)
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE)
  const [totalCount, setTotalCount] = useState(INITIAL_TOTAL_COUNT)
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const didMount = useRef(false)
  const searchByInput = useRef(null)

  const handleSearch = useCallback(async () => {
    try {
      setIsSearching(true)
      const response = await getRepos({
        q: searchByInput.current.value,
        rowsPerPage,
        currentPage,
      })

      if (!response.ok) {
        throw response
      }
      const data = await response.json()
      setRepoList(data.items)
      setTotalCount(data.total_count)
      setIsSearchApplied(true)
    } catch (error) {
      const data = await error.json()
      setIsOpen(true)
      setErrorMessage(data.message)
    } finally {
      setIsSearching(false)
    }
  }, [rowsPerPage, currentPage])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    handleSearch()
  }, [handleSearch])

  const handleChangeRowsPerPage = ({ target: { value } }) => {
    setCurrentPage(INITIAL_CURRENT_PAGE)
    setRowsPerPage(value)
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

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
            inputRef={searchByInput}
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
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Content>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
        message={errorMessage}
      />
    </Container>
  )
}

export default GitHubSearchPage
