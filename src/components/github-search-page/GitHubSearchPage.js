import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

const GitHubSearchPage = () => (
  <Container>
    <Typography component="h1" variant="h3">
      GitHub repositories list page
    </Typography>
    <Grid container spacing={2} justify="space-between">
      <Grid item md={6} xs={12}>
        <TextField fullWidth label="Filter by" id="filterBy" />
      </Grid>
      <Grid item md={6} xs={12}>
        <Button fullWidth color="primary" variant="contained">
          Search
        </Button>
      </Grid>
    </Grid>
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
  </Container>
)

export default GitHubSearchPage
