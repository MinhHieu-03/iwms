#!/bin/bash
# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Specify the Node.js version you want to use
NODE_VERSION="22.14.0"
nvm use "$NODE_VERSION"

# Navigate to your project directory
cd /home/rostek/iwms/rostek-iwms-47
git reset --hard HEAD
git pull
node -v
npm install
# npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build successful"

    # Restart the Node.js application (replace 'app.js' with your entry file)
    pm2 restart pm2_dev.json

    # You can use 'npm start' or 'node your_entry_file.js' if not using a process manager like pm2
    # npm start
    echo "++++++++++++Node.js application restarted0"
else
    echo "==============0==========Build failed. Please check the build logs for errors."
fi