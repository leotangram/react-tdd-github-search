import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { OK_STATUS } from '../../consts'
import { handlerPaginated } from '../../__fixtures__/handlers'
import {
  getReposListBy,
  makeFakeRepo,
  makeFakeResponse,
} from '../../__fixtures__/repos'
import GitHubSearchPage from './GitHubSearchPage'

const fakeResponse = makeFakeResponse({ totalCount: 1 })
const fakeRepo = makeFakeRepo()
fakeResponse.items = [fakeRepo]

const server = setupServer(
  rest.get('/search/repositories', (req, res, ctx) => {
    return res(ctx.status(OK_STATUS), ctx.json(fakeResponse))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
beforeEach(() => render(<GitHubSearchPage />))

const fireClickSearch = () =>
  fireEvent.click(screen.getByRole('button', { name: /search/i }))

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
    const avatarImage = within(repository).getByRole('img', {
      name: fakeRepo.name,
    })

    expect(avatarImage).toBeInTheDocument()
    expect(tableCells).toHaveLength(5)
    expect(repository).toHaveTextContent(fakeRepo.name)
    expect(stars).toHaveTextContent(fakeRepo.stargazers_count)
    expect(forks).toHaveTextContent(fakeRepo.forks_count)
    expect(openIssues).toHaveTextContent(fakeRepo.open_issues_count)
    expect(updatedAt).toHaveTextContent(fakeRepo.updated_at)
    expect(whithinTable.getByText(fakeRepo.name).closest('a')).toHaveAttribute(
      'href',
      fakeRepo.html_url,
    )
    expect(avatarImage).toHaveAttribute('src', fakeRepo.owner.avatar_url)
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

describe('when the developer does a search, without results', () => {
  test('should show a empty state message: “You search has no results”', async () => {
    server.use(
      rest.get('/search/repositories', (req, res, ctx) =>
        res(ctx.status(OK_STATUS), ctx.json(makeFakeResponse())),
      ),
    )

    fireClickSearch()

    await waitFor(() =>
      expect(
        screen.getByText(/you search has no results/i),
      ).toBeInTheDocument(),
    )

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})

describe('when the developer types on filter by and does a search', () => {
  it('must display the related repos', async () => {
    const internalFakeResponse = makeFakeResponse()
    const REPO_NAME = 'laravel'

    const expectedRepo = getReposListBy({ name: REPO_NAME })[0]

    server.use(
      rest.get('/search/repositories', (req, res, ctx) =>
        res(
          ctx.status(OK_STATUS),
          ctx.json({
            ...internalFakeResponse,
            items: getReposListBy({ name: req.url.searchParams.get('q') }),
          }),
        ),
      ),
    )

    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: REPO_NAME },
    })

    fireClickSearch()

    const table = await screen.findByRole('table')

    expect(table).toBeInTheDocument()

    const withinTable = within(table)

    const tableCells = withinTable.getAllByRole('cell')

    const [repository] = tableCells

    expect(repository).toHaveTextContent(expectedRepo.name)
  })
})

describe('when the developer does a search and selects 50 rows per page', () => {
  it('must fetch a new search and didsplay 50 rows results on the table', async () => {
    server.use(rest.get('/search/repositories', handlerPaginated))

    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: 'test' },
    })

    expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled()

    fireClickSearch()

    expect(await screen.findByRole('table')).toBeInTheDocument()
    expect(await screen.findAllByRole('row')).toHaveLength(31)

    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i))
    fireEvent.click(screen.getByRole('option', { name: '50' }))

    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i }),
        ).not.toBeDisabled(),
      { timeout: 3000 },
    )
    expect(screen.getAllByRole('row')).toHaveLength(51)
  }, 10000)
})

describe('when the developer clicks on search and then on next page button', () => {
  test('must display the next repositories page', async () => {
    server.use(rest.get('/search/repositories', handlerPaginated))

    fireClickSearch()

    expect(await screen.findByRole('table')).toBeInTheDocument()

    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /next page/i }),
    ).not.toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: /next page/i }))

    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled()

    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i }),
        ).not.toBeDisabled(),
      { timeout: 3000 },
    )

    expect(screen.getByRole('cell', { name: /2-0/ })).toBeInTheDocument()
  }, 10000)
})
