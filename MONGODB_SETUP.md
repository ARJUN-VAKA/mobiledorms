# MongoDB Setup Guide

This guide will help you set up MongoDB for the Mobile Dorms application.

## Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create a MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account (M0 cluster is free forever)

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the free M0 tier
   - Select a cloud provider and region
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set user privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your specific IP
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `mobiledorms`)

6. **Update .env File**
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mobiledorms?retryWrites=true&w=majority"
   ```

### Database name and URL-encoding (important)

- Prisma requires the connection string to include a database name in the path portion of the URL (the segment immediately after the host and the `/`). If that path is missing (for example `...mongodb.net/` with no name), Prisma will raise error P1013: "Database must be defined in the connection string".

- Examples (valid):
   - Atlas (recommended):
      ```env
      DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mobiledorms?retryWrites=true&w=majority"
      ```
   - Local replica set:
      ```env
      DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"
      ```

- If your username or password contains special characters (such as `@`, `:`, `/`, `?`, `#`, or `%`), URL-encode them. Example: a password `p@ss/word` becomes `p%40ss%2Fword`:
   ```env
   DATABASE_URL="mongodb+srv://user:p%40ss%2Fword@cluster.mongodb.net/mobiledorms?retryWrites=true&w=majority"
   ```

- Keep credentials out of version control (add `.env` to `.gitignore`) and avoid sharing the `.env` file.

## Option 2: Local MongoDB (Requires Replica Set)

**⚠️ Important**: Prisma requires MongoDB to run as a replica set, even for development. MongoDB Atlas (Option 1) already runs as a replica set, so it's recommended for easier setup.

### Setting Up Local MongoDB as Replica Set

#### Windows

1. **Install MongoDB**
   - Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Install MongoDB Community Server

2. **Create Data Directory**
   ```powershell
   mkdir C:\data\db
   mkdir C:\data\rs
   ```

3. **Create MongoDB Configuration File** (`C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg`):
   ```yaml
   storage:
     dbPath: C:\data\db
   replication:
     replSetName: rs0
   net:
     port: 27017
     bindIp: 127.0.0.1
   ```

4. **Start MongoDB as Replica Set**
   ```powershell
   # Start MongoDB
   "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg"
   
   # In a new terminal, initialize replica set
   "C:\Program Files\MongoDB\Server\7.0\bin\mongo.exe"
   ```
   
   Then in the mongo shell:
   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [{ _id: 0, host: "localhost:27017" }]
   })
   ```

5. **Update .env File**
   ```env
   DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"
   ```

#### macOS/Linux

1. **Install MongoDB**
   ```bash
   # macOS
   brew install mongodb-community
   
   # Linux (Ubuntu/Debian)
   # Follow: https://www.mongodb.com/docs/manual/installation/
   ```

2. **Create Data Directory**
   ```bash
   sudo mkdir -p /data/db
   sudo chown -R $USER /data/db
   ```

3. **Start MongoDB as Replica Set**
   ```bash
   # Start MongoDB with replica set
   mongod --replSet rs0 --dbpath /data/db --bind_ip localhost
   
   # In a new terminal, initialize replica set
   mongosh
   ```
   
   Then in the mongosh shell:
   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [{ _id: 0, host: "localhost:27017" }]
   })
   ```

4. **Update .env File**
   ```env
   DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"
   ```

### Quick Development Workaround (Not Recommended for Production)

If you need a quick local setup without replica set configuration, you can use MongoDB Atlas free tier (Option 1) which is easier and already configured.

## Setup Steps

1. **Update .env file** with your MongoDB connection string:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ADMIN_EMAIL="admin@mobiledorms.com"
   ADMIN_PASSWORD="admin123"
   ADMIN_API_KEY="your-admin-api-key-here"
   ```
   
   **Note about ADMIN_API_KEY**: This is a secret key you need to generate yourself. It's used to authenticate admin API requests. You can generate a secure random key using:
   
   **Windows PowerShell:**
   ```powershell
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```
   
   **macOS/Linux/Node.js:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   
   Or use an online generator: https://randomkeygen.com/
   
   **Example generated key:**
   ```
   ADMIN_API_KEY="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Push Schema to Database**:
   ```bash
   npx prisma db push
   ```

4. **Seed the Database**:
   ```bash
   npx prisma db seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Verification

After setup, you can verify the connection by:

1. Check Prisma Studio:
   ```bash
   npx prisma studio
   ```

2. Or check your MongoDB Atlas dashboard or local MongoDB to see the collections:
   - `users`
   - `bookings`
   - `partner_inquiries`
   - `capsules`

## Quick Setup Scripts

We've provided scripts to automate local MongoDB replica set setup:

### Windows
```powershell
# Run as Administrator
.\scripts\setup-local-mongodb.ps1
```

### macOS/Linux
```bash
chmod +x scripts/setup-local-mongodb.sh
./scripts/setup-local-mongodb.sh
```

## Troubleshooting

### Replica Set Error
**Error**: `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set`

**Solution**:
1. **For MongoDB Atlas**: This is already configured - just use your Atlas connection string
2. **For Local MongoDB**: 
   - Follow the replica set setup instructions above
   - Or use the provided setup scripts
   - Make sure your connection string includes `?replicaSet=rs0`

**Verify Replica Set**:
```bash
# Connect to MongoDB
mongosh

# Check replica set status
rs.status()
```

You should see `"set" : "rs0"` in the output.

### Connection Issues
- Verify your connection string is correct
- Check that your IP is whitelisted (for Atlas)
- Ensure MongoDB is running (for local)
- Check firewall settings
- For local: Ensure replica set is initialized (`rs.status()` should work)

### Authentication Errors
- Verify database username and password
- Ensure user has proper permissions

### Schema Issues
- Run `npx prisma generate` after schema changes
- Run `npx prisma db push` to sync schema

