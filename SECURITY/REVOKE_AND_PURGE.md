# Immediate steps to revoke exposed token and remove it from the repository

This document explains exactly what to do when an API token (for example `dpl_7AddvMzJ9nvsSDPqLxiBAdqk3H2e`) has been exposed in the repository or environment. Follow these steps in order.

1) Revoke / rotate the token NOW (urgent)
   - If the token belongs to Vercel, GitHub Actions, or any third-party service, revoke it immediately from that provider's console. Create a new token if needed and store it securely.
   - Do not wait for repo cleanup — revocation prevents active abuse.

2) Remove token from the working tree (current files)
   - Replace the token in any committed files with a placeholder or move it into environment variables.
   - Example: replace the literal token with DPL_TOKEN_PLACEHOLDER in files.
   - Commit these changes and push to all active branches (feature and main) so the token is not present in the tip of branches.

3) Purge token from Git history (recommended)
   - Use git-filter-repo (recommended) or the BFG Repo-Cleaner to remove the token from past commits and tags. This rewrites history and requires force-pushing to the remote and coordination with collaborators.

   Recommended commands (git-filter-repo):

   # Install git-filter-repo (if not already installed)
   pip install git-filter-repo

   # Work on a mirror clone to safely rewrite history
   git clone --mirror https://github.com/kimanidpm002022-creator/benlei-zenith-2026.git repo.git
   cd repo.git

   # Create a file 'replacements.txt' with the exact token(s) to replace:
   # dpl_7AddvMzJ9nvsSDPqLxiBAdqk3H2e==***REMOVED***
   echo "dpl_7AddvMzJ9nvsSDPqLxiBAdqk3H2e==***REDACTED***" > replacements.txt

   # Replace occurrences and rewrite history
   git filter-repo --replace-text replacements.txt

   # Push rewritten history back to GitHub (force)
   git push --force --all
   git push --force --tags

   Note: After this, all collaborators must reclone the repository (or carefully rebase) because history was rewritten.

   Alternative (BFG) steps are available in the included script.

4) Update all places where the token was used
   - Vercel project settings (Environment Variables), GitHub Secrets, CI pipelines, deploy scripts, third-party services: replace old token with the rotated/new token.

5) Revoke old credentials at providers
   - If the token allowed creation of other secrets or access to other services, audit downstream access and rotate other keys as necessary.

6) Notify collaborators and rotate keys
   - Inform team members about the history rewrite and that they need to re-clone.
   - Provide new tokens via secure channels only (e.g., password manager, secret manager, or the platform's secret UI).

7) Prevent future leaks
   - Add .env and other secret files to .gitignore (already present).
   - Use environment variables in deployment platforms and GitHub Secrets instead of committing secrets.
   - Add a pre-commit hook (detect-secrets or git-secrets) to catch secrets before commit.

If you want, run the purge script below on your machine (instructions included). If you want me to prepare a PR that removes tokens from the current tip of branches, I can do that as well.
