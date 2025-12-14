# Troubleshooting Guide

## MongoDB Replica Set Error

### Error Message
```
Invalid `prisma.booking.create()` invocation: Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.
```

### Why This Happens
Prisma requires MongoDB to run as a replica set, even for simple operations. This is a MongoDB/Prisma requirement, not a bug.

### Solutions

#### Solution 1: Use MongoDB Atlas (Recommended - Easiest)
MongoDB Atlas already runs as a replica set, so this is the easiest solution:

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Get your connection string
4. Update `.env`:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mobiledorms?retryWrites=true&w=majority"
   ```

#### Solution 2: Set Up Local MongoDB as Replica Set

**Windows:**
```powershell
# Run as Administrator
.\scripts\setup-local-mongodb.ps1
```

**macOS/Linux:**
```bash
chmod +x scripts/setup-local-mongodb.sh
./scripts/setup-local-mongodb.sh
```

Then update `.env`:
```env
DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"
```

#### Solution 3: Manual Replica Set Setup

1. **Start MongoDB with replica set:**
   ```bash
   mongod --replSet rs0 --dbpath /data/db
   ```

2. **In a new terminal, initialize replica set:**
   ```bash
   mongosh
   ```
   
   Then run:
   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [{ _id: 0, host: "localhost:27017" }]
   })
   ```

3. **Verify replica set:**
   ```javascript
   rs.status()
   ```
   
   You should see `"set" : "rs0"` in the output.

4. **Update connection string:**
   ```env
   DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"
   ```

### Verify Your Setup

After setting up, verify the connection:

```bash
# Generate Prisma client
npx prisma generate

# Test connection
npx prisma db push

# If successful, you should see:
# "Your database is now in sync with your schema"
```

## Other Common Issues

### Connection String Format

**MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

**Local MongoDB (Replica Set):**
```
mongodb://localhost:27017/dbname?replicaSet=rs0
```

**Local MongoDB (Single Instance - Won't Work with Prisma):**
```
mongodb://localhost:27017/dbname
```
❌ This will NOT work - Prisma requires replica set!

### Authentication Errors

If you get authentication errors:

1. **Check username and password** in connection string
2. **Verify database user** has proper permissions
3. **Check IP whitelist** (for Atlas) - add `0.0.0.0/0` for development

### Schema Sync Issues

If schema changes aren't applying:

```bash
# Regenerate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Or use migrations (for production)
npx prisma migrate dev
```

### Port Already in Use

If MongoDB port 27017 is already in use:

1. **Find the process:**
   ```bash
   # Windows
   netstat -ano | findstr :27017
   
   # macOS/Linux
   lsof -i :27017
   ```

2. **Stop the process** or use a different port

## Still Having Issues?

1. Check MongoDB logs for errors
2. Verify MongoDB is running: `mongosh` should connect
3. Check Prisma logs: Set `log: ['query', 'error', 'warn']` in `lib/prisma.ts`
4. Review the [MongoDB Setup Guide](./MONGODB_SETUP.md)
5. Check [Prisma MongoDB Documentation](https://www.prisma.io/docs/concepts/database-connectors/mongodb)

