# Get-repository.sh
source ./env.sh

curl \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_API_TOKEN"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/$ORG/$REPO_NAME


# Create-organization-repository.sh

source ./env.sh

# Create repo details
name='scaffolding'
description='basic scaffolding app'
homepage='https://github.com',
private=true,
has_issues=false,
has_projects=false
has_wiki=true

curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_API_TOKEN"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/orgs/$ORG/repos \
  -d '{"name": "scaffolding","description":"basic scaffolding app","homepage":"https://github.com","private":true,"has_issues":false,"has_projects":false,"has_wiki":true}'
  
  
#   List-organization-repositories.sh

source ./env.sh

curl \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_API_TOKEN"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/orgs/$ORG/repos
  
  
#   add new repo

echo "# scaffolding" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/$repo/scaffolding.git
git push -u origin main

# push to existing repo
git remote add origin https://github.com/$repo/scaffolding.git
git branch -M main
git push -u origin main

  
  
  
  
  
