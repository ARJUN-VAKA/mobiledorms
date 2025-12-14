#!/bin/bash
# Bash script to set up local MongoDB as replica set (macOS/Linux)

echo "Setting up MongoDB Replica Set for Prisma..."

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "MongoDB not found. Please install MongoDB first."
    echo "macOS: brew install mongodb-community"
    echo "Linux: Follow https://www.mongodb.com/docs/manual/installation/"
    exit 1
fi

# Create data directory
DATA_DIR="/data/db"
if [ ! -d "$DATA_DIR" ]; then
    sudo mkdir -p "$DATA_DIR"
    sudo chown -R $USER "$DATA_DIR"
    echo "Created data directory: $DATA_DIR"
fi

# Check if MongoDB is already running
if pgrep -x "mongod" > /dev/null; then
    echo "MongoDB is already running. Stopping it..."
    pkill mongod
    sleep 2
fi

# Start MongoDB with replica set
echo "Starting MongoDB with replica set configuration..."
mongod --replSet rs0 --dbpath "$DATA_DIR" --bind_ip localhost --fork --logpath /tmp/mongod.log

# Wait for MongoDB to start
sleep 5

# Initialize replica set
echo "Initializing replica set..."
mongosh --quiet --eval 'rs.initiate({_id: "rs0", members: [{_id: 0, host: "localhost:27017"}]})'

echo ""
echo "MongoDB Replica Set setup complete!"
echo "Update your .env file with:"
echo 'DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"'

