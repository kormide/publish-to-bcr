import { GitHubClient } from "../infrastructure/github.js";
import { Repository } from "./repository.js";

export class PublishEntryService {
  constructor(private readonly githubClient: GitHubClient) {}

  public async sendRequest(
    rulesetRepo: Repository,
    tag: string,
    bcrForkRepo: Repository,
    bcr: Repository,
    branch: string,
    releaser: string
  ): Promise<void> {
    const pullNumber = await this.githubClient.createPullRequest(
      bcrForkRepo,
      branch,
      bcr,
      "main",
      `Publish ${rulesetRepo.canonicalName}@${tag}`
    );
    await this.githubClient.requestReview(bcr, pullNumber, [releaser]);
  }
}
