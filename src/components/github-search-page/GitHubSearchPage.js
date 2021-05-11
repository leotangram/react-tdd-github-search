import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

const GitHubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchApplied, setIsSearchApplied] = useState(false)

  const handleClick = async () => {
    setIsSearching(true)
    await Promise.resolve()
    setIsSearchApplied(true)
    setIsSearching(false)
  }

  const renderContent = () =>
    isSearchApplied ? (
      <table>
        <thead>
          <tr>
            <th>Repository</th>
            <th>Stars</th>
            <th>Forks</th>
            <th>Open issues</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="" alt="test" />
              <a href="http://localhost:3001/test">Test</a>
            </td>
            <td>10</td>
            <td>5</td>
            <td>2</td>
            <td>2021-01-01</td>
          </tr>
        </tbody>
      </table>
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

  return (
    <Container>
      <Typography component="h1" variant="h3">
        GitHub repositories list page
      </Typography>
      <Grid container spacing={2} justify="space-between">
        <Grid item md={6} xs={12}>
          <TextField fullWidth label="Filter by" id="filterBy" />
        </Grid>
        <Grid item md={6} xs={12}>
          <Button
            color="primary"
            disabled={isSearching}
            fullWidth
            onClick={handleClick}
            variant="contained"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {renderContent()}
    </Container>
  )
}

export default GitHubSearchPage
