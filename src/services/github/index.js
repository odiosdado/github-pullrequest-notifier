import octokit from "octokit";
import pluginPaginateRest from "@octokit/plugin-paginate-rest";
import { containsItemsBeforeDate } from '../../utils/index.js';

const { Octokit } = octokit;
const { paginateRest } = pluginPaginateRest;
const OctokitPlugin = Octokit.plugin(paginateRest);

class GitHub {
    constructor(config) {
        this.config = config;
        this.octokit = new OctokitPlugin({ auth: config.gitHubApi });
    }
    /**
     * Use the octokit paginate method to query for pull requests. Since we
     * cannot query by date, use the built in iterate method to exist early once
     * the pull request is older than the given date.
     * @param {*} params 
     * @returns 
     */
    executePullRequestAPI = async params => {
        const results = [];
        await this.octokit.paginate('GET /repos/{owner}/{repo}/pulls?state={state}', {
            owner: this.config.gitHubOwner,
            repo: this.config.gitHubRepo,
            state: params.state,
            per_page: 100,
            sort: params.field,
            direction: 'dsc'
        },
            (response, done) => {
                if (containsItemsBeforeDate(response.data, params.field, params.date, results)) {
                    done();
                }
            })
        return results;
    }

    getClosedPullRequests = date => {
        const params = {
            date,
            state: 'closed',
            field: 'closed_at'
        }
        return this.executePullRequestAPI(params);
    }

    getOpenedPullRequests = date => {
        const params = {
            date,
            state: 'open',
            field: 'created_at'
        }
        return this.executePullRequestAPI(params);
    }

    getInProgressPullRequests = date => {
        const params = {
            date,
            state: 'open',
            field: 'updated_at'
        }
        return this.executePullRequestAPI(params);
    }

    getPullRequestSummary = async date => {
        const opened = await this.getOpenedPullRequests(date);
        const closed = await this.getClosedPullRequests(date);
        const inProgress = await this.getInProgressPullRequests(date);
        return {
            opened,
            inProgress,
            closed,
        }
    }
}

export default GitHub;