import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import GitHubSearchPage from './GitHubSearchPage'

beforeEach(() => render(<GitHubSearchPage />))

describe('when the GitHubSearchPage is mounted', () => {
  test('should must display the title', () => {
    expect(
      screen.getByRole('heading', { name: /github repositories list/i }),
    ).toBeInTheDocument()
  })

  test('must be an input text in order to "filter by".', () => {
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument()
  })

  test('must be a Search Button', () => {
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  test('must be a initial message “Please provide a search option and click in the search button”', () => {
    expect(
      screen.getByText(
        /please provide a search option and click in the search button/i,
      ),
    ).toBeInTheDocument()
  })
})

describe('when the developer does a search', () => {
  test('should the search button should be disabled until the search is done', async () => {
    const button = screen.getByRole('button', { name: /search/i })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(button).toBeDisabled()
    await waitFor(() => expect(button).not.toBeDisabled())
  })
})
