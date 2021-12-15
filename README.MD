GitHub Pull Request Notifier

This app will query a given repo for opened, updated, and closed pull requests for the previous week.

To run:
```
docker build -t github-pr .
docker run -it \
    -e GITHUB_REPO_OWNER=hashicorp \
    -e GITHUB_REPO=terraform \
    github-pr
```

NOTE: The GitHub API has a limit of 60 requests per IP for ununathenticated requests. The api does not allow us to query by time frame so we need call the endpoint using the paginate method. This will query for all pull requests.
Repos with more active PRs will need a GitHub token in order to process the large number of items. This can be passed as an env variable:

```
docker run -it \
    -e GITHUB_REPO_OWNER=hashicorp \
    -e GITHUB_REPO=terraform \
    -e GITHUB_API_TOKEN=<my-token> \
    github-pr
```

https://docs.github.com/en/rest/reference/pulls