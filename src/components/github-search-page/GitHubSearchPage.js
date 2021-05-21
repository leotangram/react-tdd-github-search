import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { getRepos } from '../../services'
import Content from '../content/Content'

const GitHubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchApplied, setIsSearchApplied] = useState(false)
  const [repoList, setRepoList] = useState([])
  const [searchBy, setSearchBy] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(30)

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
        <Content
          isSearchApplied={isSearchApplied}
          repoList={repoList}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>
    </Container>
  )
}

export default GitHubSearchPage
