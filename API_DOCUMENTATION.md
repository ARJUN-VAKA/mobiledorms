# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

Admin endpoints require authentication. Include one of the following:

1. **API Key Header**:
   ```
   x-api-key: your-admin-api-key
   ```

2. **Bearer Token** (if implemented):
   ```
   Authorization: Bearer your-token
   ```

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Response**: 429 Too Many Requests when exceeded

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### Bookings

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "eventName": "Music Festival 2024",
  "eventDate": "2024-07-15",
  "location": "Austin, TX",
  "numberOfCapsules": 5,
  "duration": 3,
  "message": "Optional message"
}
```

**Response**: `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    ...
  },
  "message": "Booking created successfully"
}
```

#### Get Bookings
```http
GET /api/bookings?status=pending&page=1&limit=50&email=user@example.com
```

**Query Parameters**:
- `status` (optional): Filter by status (pending, confirmed, cancelled)
- `email` (optional): Filter by email (for non-admin users)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "bookings": [...],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 100,
      "totalPages": 2
    }
  }
}
```

#### Get Booking by ID
```http
GET /api/bookings/[id]
Authorization: Bearer token (or x-api-key for admin)
```

#### Update Booking
```http
PATCH /api/bookings/[id]
Authorization: Bearer token (admin only)
Content-Type: application/json

{
  "status": "confirmed",
  "capsuleId": "capsule-id"
}
```

#### Delete Booking
```http
DELETE /api/bookings/[id]
Authorization: Bearer token (admin only)
```

### Partner Inquiries

#### Create Partner Inquiry
```http
POST /api/partners
Content-Type: application/json

{
  "organizationName": "Event Co",
  "contactName": "Jane Smith",
  "email": "jane@eventco.com",
  "phone": "+1234567890",
  "partnerType": "event",
  "message": "Interested in partnership"
}
```

**Partner Types**: `event`, `corporate`, `government`, `ngo`

#### Get Partner Inquiries
```http
GET /api/partners?status=pending&partnerType=event&page=1&limit=50
Authorization: Bearer token (admin only)
```

#### Get Partner Inquiry by ID
```http
GET /api/partners/[id]
Authorization: Bearer token (admin only)
```

#### Update Partner Inquiry
```http
PATCH /api/partners/[id]
Authorization: Bearer token (admin only)
Content-Type: application/json

{
  "status": "approved"
}
```

**Status Values**: `pending`, `contacted`, `approved`, `rejected`

### Capsules

#### Create Capsule
```http
POST /api/capsules
Authorization: Bearer token (admin only)
Content-Type: application/json

{
  "name": "Capsule Unit D",
  "location": "New York, NY",
  "capacity": 8,
  "status": "available",
  "pricePerNight": 60,
  "features": "[\"WiFi\", \"AC\", \"Lockers\"]"
}
```

#### Get Capsules
```http
GET /api/capsules?status=available&location=Austin&page=1&limit=50
```

#### Get Capsule by ID
```http
GET /api/capsules/[id]
```

#### Update Capsule
```http
PATCH /api/capsules/[id]
Authorization: Bearer token (admin only)
Content-Type: application/json

{
  "status": "maintenance",
  "pricePerNight": 65
}
```

#### Delete Capsule
```http
DELETE /api/capsules/[id]
Authorization: Bearer token (admin only)
```

**Note**: Cannot delete capsules with active bookings

### Statistics

#### Get Dashboard Statistics
```http
GET /api/stats
Authorization: Bearer token (admin only)
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "bookings": {
      "total": 150,
      "pending": 25,
      "confirmed": 100,
      "cancelled": 25
    },
    "inquiries": {
      "total": 50,
      "pending": 10
    },
    "capsules": {
      "total": 20,
      "available": 15,
      "booked": 3,
      "maintenance": 2
    },
    "revenue": {
      "total": 45000,
      "currency": "USD"
    }
  }
}
```

## Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid auth)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `405` - Method Not Allowed
- `409` - Conflict (duplicate entry)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Examples

### Using cURL

```bash
# Create a booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "eventName": "Festival",
    "eventDate": "2024-07-15",
    "location": "Austin, TX",
    "numberOfCapsules": 5,
    "duration": 3
  }'

# Get bookings (admin)
curl -X GET http://localhost:3000/api/bookings \
  -H "x-api-key: your-admin-api-key"

# Update booking status
curl -X PATCH http://localhost:3000/api/bookings/[id] \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-admin-api-key" \
  -d '{"status": "confirmed"}'
```

### Using JavaScript/Fetch

```javascript
// Create booking
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    eventName: 'Festival',
    eventDate: '2024-07-15',
    location: 'Austin, TX',
    numberOfCapsules: 5,
    duration: 3,
  }),
})

const data = await response.json()

// Get stats (admin)
const statsResponse = await fetch('/api/stats', {
  headers: {
    'x-api-key': 'your-admin-api-key',
  },
})

const stats = await statsResponse.json()
```

