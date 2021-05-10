import { render, screen } from '@testing-library/react'
import GitHubSearchPage from './GitHubSearchPage'

describe('when the GitHubSearchPage is mounted', () => {
  test('should must display the title', () => {
    render(<GitHubSearchPage />)

    expect(
      screen.getByRole('heading', { name: /github repositories list/i }),
    ).toBeInTheDocument()
  })
})
