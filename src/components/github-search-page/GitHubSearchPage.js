import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
