# Publishes ONLY career-package/portfolio to https://plamentanevgit.github.io
# Usage (from the newCV folder):  .\publish.ps1
# Commit your changes first (VS Code Source Control -> Commit); this sends what is committed.

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if (-not (git remote | Select-String -Quiet '^pages$')) {
    git remote add pages https://github.com/PlamenTanevGit/PlamenTanevGit.github.io.git
}

$dirty = git status --porcelain -- career-package/portfolio
if ($dirty) {
    Write-Warning "You have uncommitted changes in career-package/portfolio. Commit them first, or they will not be published."
}

$sha = git subtree split --prefix=career-package/portfolio HEAD
git push pages "${sha}:refs/heads/main" --force
Write-Host "Done. Live in about 1-2 minutes: https://plamentanevgit.github.io"
