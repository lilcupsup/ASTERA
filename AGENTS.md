# ASTERA project instructions

For every task in this project, keep the GitHub repository synchronized:

- Finish the requested edits, review `git status`, and commit all intended project changes with a concise message.
- Push the commit to the configured GitHub `main` branch before ending the task. If the branch or remote differs, inspect the current Git state and push the current project branch instead of rewriting history.
- If the push fails, report the exact reason and leave the local commit intact for the next project chat to retry.
- Never use force push. Do not commit generated dependencies, build output, local secrets, or temporary browser artifacts.

The repository has a local post-commit hook that pushes each new commit to origin. Keep one coherent commit per completed task so the completed task is pushed automatically.
