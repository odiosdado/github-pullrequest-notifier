import dotenv from 'dotenv';
dotenv.config();

export default {
    gitHubApiToken: process.GITHUB_API_TOKEN,
    gitHubRepo: process.env.GITHUB_REPO,
    gitHubOwner: process.env.GITHUB_REPO_OWNER,
    missingRequiredEnv: () => {
        return (process.env.GITHUB_REPO === undefined || process.env.GITHUB_REPO_OWNER === undefined)
    }
}