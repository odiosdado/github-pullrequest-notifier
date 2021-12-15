class Notification {
    constructor(config) {
        this.config = config;
    }
    emailSummary = (summary, date, email) => {
        throw new Error('Not implemented');
    }
    /**
     * Prints out the summary to console as a table
     * @param {*} summary 
     * @param {*} date 
     */
    printSummaryToConsole = (summary, date) => {
        if (summary.opened.length === 0
            && summary.inProgress.length === 0
            && summary.closed.length === 0) {
            console.log(`No pull requests found for ${this.config.gitHubOwner}/${this.config.gitHubRepo} for the week of ${date}`);
            return;
        }

        console.log(`Pull request summary for ${this.config.gitHubOwner}/${this.config.gitHubRepo} week of ${date}`);
        console.log(`Opened`);
        if (summary.opened.length === 0) {
            console.log(`None`);
        } else {
            console.table(summary.opened, ["html_url", "title", "created_at"]);
        }

        console.log(`In progress`);
        if (summary.inProgress.length === 0) {
            console.log(`None`);
        } else {
            console.table(summary.inProgress, ["html_url", "title", "updated_at"]);
        }

        console.log(`Closed`);
        if (summary.inProgress.length === 0) {
            console.log(`None`);
        } else {
            console.table(summary.closed, ["html_url", "title", "closed_at"]);
        }
    }
}

export default Notification;