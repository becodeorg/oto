# becodeorg/oto
#
# /scripts/push-rc.sh - Script: push release candidate
#
# coded by leny@BeCode
# started at 06/06/2020

VERSION=$(node -p -e "require('./package.json').version")

echo $VERSION

npm install && \
git add --all && \
git diff-index --quiet HEAD || git commit -m "Bump $VERSION" && \
git push && \
git switch master && \
git merge develop && \
git tag $VERSION && \
git push && \
git push --tags && \
git switch develop && \
git merge master
