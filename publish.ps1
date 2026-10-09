# Publishes ONLY career-package/portfolio to https://plamentanevgit.github.io
# Usage (from the newCV folder):  .\publish.ps1
# Commit your changes first (VS Code Source Control -> Commit); this sends what is committed.

Set-Location $PSScriptRoot

# git writes progress to stderr, so do not let PowerShell treat that as an error; check exit codes instead.
$ErrorActionPreference = 'Continue'

if (-not (git remote | Select-String -Quiet '^pages$')) {
    git remote add pages https://github.com/PlamenTanevGit/PlamenTanevGit.github.io.git
}

$dirty = git status --porcelain -- career-package/portfolio
if ($dirty) {
    Write-Warning "You have uncommitted changes in career-package/portfolio. Commit them first, or they will not be published."
}

$sha = (git subtree split --prefix=career-package/portfolio HEAD 2>$null | Select-Object -Last 1)
if ($LASTEXITCODE -ne 0 -or -not $sha) { Write-Error "git subtree split failed"; exit 1 }

git push pages "${sha}:refs/heads/main" --force 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) { Write-Error "git push failed"; exit 1 }

Write-Host "Done. Live in about 1-2 minutes: https://plamentanevgit.github.io"
