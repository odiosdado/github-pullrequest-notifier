import GitHub from "./services/github/index.js";
import config from './config/index.js';
import Notification from './services/notification/index.js';

const main = async () => {
    try {
        if (config.missingRequiredEnv()) {
            console.log("GITHUB_REPO_OWNER and GITHUB_REPO environment variables are required.")
            console.log("Exiting app...")
            process.exit(1);
        }

        const today = new Date();
        let lastWeek = new Date(today.setDate(today.getDate() - 7));

        const github = new GitHub(config);
        const notification = new Notification(config);

        console.log(`Generating pull request summary for ${config.gitHubOwner}/${config.gitHubRepo} beginning ${lastWeek}`);
        const summary = await github.getPullRequestSummary(lastWeek);
        notification.printSummaryToConsole(summary, lastWeek, config);
    } catch (error) {
        console.log(`Error generating pull request summary: `);
        console.log(error);
    }
}

main();
