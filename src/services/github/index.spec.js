import sinon from 'sinon';
import mocha from 'mocha';
import GitHub from './index.js';
import { expect } from 'chai';

const { describe, it } = mocha;

describe('GitHub', () => {
    describe('getClosedPullRequests', () => {
        it('should return list of closed PRs when given a date', async () => {
            const gh = new GitHub({ gitHubApiToken: 'test' }, {});
            sinon.stub(gh, 'executePullRequestAPI').resolves([{ "foo": "bar" }])
            const data = await gh.getClosedPullRequests(new Date());
            expect(data.length).to.be.gt(0);
        });
    });
    describe('getOpenedPullRequests', () => {
        it('should return list of opened PRs when given a date', async () => {
            const gh = new GitHub({ gitHubApiToken: 'test' }, {});
            sinon.stub(gh, 'executePullRequestAPI').resolves([{ "foo": "bar" }])
            const data = await gh.getOpenedPullRequests(new Date());
            expect(data.length).to.be.gt(0);
        });
    });
    describe('getInProgressPullRequests', () => {
        it('should return list of in progress PRs when given a date', async () => {
            const gh = new GitHub({ gitHubApiToken: 'test' }, {});
            sinon.stub(gh, 'executePullRequestAPI').resolves([{ "foo": "bar" }])
            const data = await gh.getInProgressPullRequests(new Date());
            expect(data.length).to.be.gt(0);
        });
    });
    describe('getPullRequestSummary', () => {
        it('should return an object that contains opened, closed, inProgress key values when given a date', async () => {
            const gh = new GitHub({ gitHubApiToken: 'test' }, {});
            sinon.stub(gh, 'executePullRequestAPI').resolves([{ "foo": "bar" }])
            const data = await gh.getPullRequestSummary(new Date());
            expect(data.opened).to.not.be.undefined;
            expect(data.closed).to.not.be.undefined;
            expect(data.inProgress).to.not.be.undefined;
        });
    });
})