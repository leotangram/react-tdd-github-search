import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
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
  const fireClickSearch = () =>
    fireEvent.click(screen.getByRole('button', { name: /search/i }))

  test('should the search button should be disabled until the search is done', async () => {
    const button = screen.getByRole('button', { name: /search/i })
    expect(button).not.toBeDisabled()

    fireClickSearch()

    expect(button).toBeDisabled()
    await waitFor(() => expect(button).not.toBeDisabled())
  })

  test('the data should be displayed as a sticky table', async () => {
    fireClickSearch()
    await waitFor(() =>
      expect(
        screen.queryByText(
          /please provide a search option and click in the search button/i,
        ),
      ).not.toBeInTheDocument(),
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('should the header table contain: Repository, stars, forks, open issues and updated at', async () => {
    fireClickSearch()
    const table = await screen.findByRole('table')
    const tableHeaders = within(table).getAllByRole('columnheader')

    expect(tableHeaders).toHaveLength(5)

    const [repository, stars, forks, openIssues, updatedAt] = tableHeaders

    expect(repository).toHaveTextContent(/repository/i)
    expect(stars).toHaveTextContent(/stars/i)
    expect(forks).toHaveTextContent(/forks/i)
    expect(openIssues).toHaveTextContent(/open issues/i)
    expect(updatedAt).toHaveTextContent(/updated at/i)
  })

  test('should each result have: owner avatar image, name, stars, updated at, forks, open issues, it should have a link that opens in a new tab', async () => {
    fireClickSearch()

    const table = await screen.findByRole('table')
    const whithinTable = within(table)
    const tableCells = whithinTable.getAllByRole('cell')
    const [repository, stars, forks, openIssues, updatedAt] = tableCells

    expect(within(repository).getByRole('img', { name: /test/i }))
    expect(tableCells).toHaveLength(5)
    expect(repository).toHaveTextContent(/test/i)
    expect(stars).toHaveTextContent(/10/)
    expect(forks).toHaveTextContent(/5/)
    expect(openIssues).toHaveTextContent(/2/i)
    expect(updatedAt).toHaveTextContent(/2021-01-01/i)
    expect(whithinTable.getByText(/test/i).closest('a')).toHaveAttribute(
      'href',
      'http://localhost:3001/test',
    )
  })

  test('should display be total results number of the search and the current number of results', async () => {
    fireClickSearch()
    await screen.findByRole('table')

    expect(screen.getByText(/1-1 of 1/i)).toBeInTheDocument()
  })

  test('A results size per page select/combobox with the options: 30, 50, 100. The default is 30', async () => {
    fireClickSearch()
    await screen.findByRole('table')

    const rowPerPage = screen.getByLabelText(/rows per page/i)

    expect(rowPerPage).toBeInTheDocument()

    fireEvent.mouseDown(rowPerPage)
    const listbox = screen.getByRole('listbox', { name: /rows per page/i })

    const options = within(listbox).getAllByRole('option')
    const [option30, option50, option100] = options
    expect(option30).toHaveTextContent(/30/i)
    expect(option50).toHaveTextContent(/50/i)
    expect(option100).toHaveTextContent(/100/i)
  })

  test('should exits the next and previous pagination', async () => {
    fireClickSearch()
    await screen.findByRole('table')
    const previousPageBtn = screen.getByRole('button', {
      name: /previous page/i,
    })

    expect(previousPageBtn).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /next page/i }),
    ).toBeInTheDocument()
    expect(previousPageBtn).toBeDisabled()
  })
})
