# GitHub Pull Request Notifier

This app will query a given repo for opened, updated, and closed pull requests for the previous week.

## How to use
Build the docker image and run the container as follows:
```
docker build -t github-pr .
docker run -it \
    -e GITHUB_REPO_OWNER=hashicorp \
    -e GITHUB_REPO=terraform \
    github-pr
```

## Special use case

In order to query repos with extensive pull request history, we need to use a github API token. This is due to limit on the GitHub API of 60 requests per IP for ununathenticated requests.
The api does not allow us to query by time frame so we need call the endpoint using the paginate method. This will query for all pull requests.
Repos with more active PRs will need a GitHub token in order to process the large number of items. This can be passed as an env variable:

```
docker run -it \
    -e GITHUB_REPO_OWNER=microsoft \
    -e GITHUB_REPO=vscode \
    -e GITHUB_API_TOKEN=<my-token> \
    github-pr
```

## References:
- https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
- https://docs.github.com/en/rest/reference/pulls
- https://github.com/octokit/octokit.js