# 在 GitHub 网页创建「空仓库」后，在本项目目录执行一次：
#   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
# 然后双击运行本脚本，或在 PowerShell 中执行： .\git-push.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

try {
  git remote get-url origin | Out-Null
} catch {
  Write-Host "错误：尚未配置远程仓库 origin。" -ForegroundColor Red
  Write-Host "请执行（把地址换成你的仓库）："
  Write-Host '  git remote add origin https://github.com/你的用户名/仓库名.git'
  exit 1
}

git add -A
$st = git status --porcelain
if (-not $st) {
  Write-Host "没有需要提交的更改。"
} else {
  git commit -m "chore: sync $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

git push -u origin main
if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "推送成功。请到 GitHub 仓库 -> Actions 查看部署；Settings -> Pages 查看网站地址。" -ForegroundColor Green
}
