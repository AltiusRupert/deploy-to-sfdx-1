echo "Updating PATH"
export PATH=$PATH:/app

echo "Updating PATH to include Salesforce CLI ..."
export PATH=$PATH:/app/.local/share/sfdx/cli/bin/

# do not autoupdate
export SFDX_AUTOUPDATE_DISABLE=true
echo "Creating local resources ..."
mkdir /app/tmp

export DISPLAY=':99.0'
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &

echo "Completed!"