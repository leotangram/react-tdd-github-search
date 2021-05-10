import { Button, TextField, Typography } from '@material-ui/core'

const GitHubSearchPage = () => (
  <>
    <Typography component="h1" variant="h3">
      GitHub repositories list page
    </Typography>
    <TextField label="Filter by" id="filterBy" />
    <Button>Search</Button>
  </>
)

export default GitHubSearchPage
