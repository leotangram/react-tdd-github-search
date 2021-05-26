import ErrorBoundary from './components/error-boundary/ErrorBoundary'
import GitHubSearchPage from './components/github-search-page/GitHubSearchPage'

function App() {
  return (
    <ErrorBoundary>
      <GitHubSearchPage />
    </ErrorBoundary>
  )
}

export default App
