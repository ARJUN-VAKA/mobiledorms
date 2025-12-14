# PowerShell script to set up local MongoDB as replica set (Windows)

Write-Host "Setting up MongoDB Replica Set for Prisma..." -ForegroundColor Green

# Check if MongoDB is installed
$mongodPath = "C:\Program Files\MongoDB\Server\*\bin\mongod.exe"
$mongoPath = "C:\Program Files\MongoDB\Server\*\bin\mongo.exe"

if (-not (Test-Path $mongodPath)) {
    Write-Host "MongoDB not found. Please install MongoDB first." -ForegroundColor Red
    Write-Host "Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    exit 1
}

# Get MongoDB version path
$mongodExe = (Get-ChildItem $mongodPath | Select-Object -First 1).FullName
$mongoExe = (Get-ChildItem $mongoPath | Select-Object -First 1).FullName
$mongoDir = Split-Path $mongodExe

Write-Host "Found MongoDB at: $mongoDir" -ForegroundColor Green

# Create data directory
$dataDir = "C:\data\db"
if (-not (Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
    Write-Host "Created data directory: $dataDir" -ForegroundColor Green
}

# Create config file
$configFile = Join-Path $mongoDir "mongod.cfg"
$configContent = @"
storage:
  dbPath: $dataDir
replication:
  replSetName: rs0
net:
  port: 27017
  bindIp: 127.0.0.1
"@

Set-Content -Path $configFile -Value $configContent -Force
Write-Host "Created config file: $configFile" -ForegroundColor Green

# Check if MongoDB is already running
$mongoProcess = Get-Process -Name mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "MongoDB is already running. Stopping it..." -ForegroundColor Yellow
    Stop-Process -Name mongod -Force
    Start-Sleep -Seconds 2
}

# Start MongoDB
Write-Host "Starting MongoDB with replica set configuration..." -ForegroundColor Green
Start-Process -FilePath $mongodExe -ArgumentList "--config", $configFile -WindowStyle Hidden

# Wait for MongoDB to start
Start-Sleep -Seconds 5

# Initialize replica set
Write-Host "Initializing replica set..." -ForegroundColor Green
$initScript = @"
rs.initiate({
  _id: "rs0",
  members: [{ _id: 0, host: "localhost:27017" }]
})
"@

$initScript | & $mongoExe --quiet

Write-Host "`nMongoDB Replica Set setup complete!" -ForegroundColor Green
Write-Host "Update your .env file with:" -ForegroundColor Yellow
Write-Host 'DATABASE_URL="mongodb://localhost:27017/mobiledorms?replicaSet=rs0"' -ForegroundColor Cyan

