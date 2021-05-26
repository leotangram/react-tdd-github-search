import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from '@material-ui/core'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleReloadClick = () => window.location.reload()

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <>
          <Typography variant="h4">There is an unexpected error</Typography>
          <Button
            color="primary"
            type="button"
            onClick={this.handleReloadClick}
            variant="contained"
          >
            Reload
          </Button>
        </>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}
