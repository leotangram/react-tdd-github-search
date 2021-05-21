import { Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const Content = ({ children, isSearchApplied, repoList }) => {
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
    return children
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
  children: PropTypes.node.isRequired,
  isSearchApplied: PropTypes.bool.isRequired,
  repoList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Content
