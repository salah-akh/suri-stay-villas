# Hajezna Backend Refactor Pack

This folder is a drop-in refactor pack for an existing Node.js/Express + Mongoose API.
It does not create a new app. Copy or merge these files into your current backend.

## Route Access Rules

- Public:
  - `GET /api/listings`
  - `GET /api/listings/:id`
  - `GET /api/meta/classifieds`
- Protected by `isAuthenticated`:
  - `POST /api/listings`
  - `PUT /api/listings/:id`
  - `POST /api/favorites/toggle`
  - `GET /api/favorites`
  - `POST /api/messages`
  - `GET /api/messages`
  - `GET /api/messages/:room_id`
  - `GET /api/users/listings`
  - `PATCH /api/users/me`

## Cascading Dropdown Location Logic

The frontend must never send a typed address string.

1. Client calls `GET /api/meta/classifieds`.
2. User selects:
   - `governorate_id`
   - then a `district_id` inside that governorate
   - then a `neighborhood_id` inside that district
3. Client sends the selected IDs plus display names in `listing.location`.
4. `Listing` validates the selection with `isValidLocationSelection`.

Example payload:

```json
{
  "category_key": "villas",
  "title": "Sea view private villa in Latakia",
  "description": "Detailed user-written rental description.",
  "price_per_night": 140,
  "area_gross": 180,
  "area_net": 145,
  "guest_capacity": 8,
  "view_type": "Sea",
  "pool_status": "Conservative Private",
  "heating_type": "Solar",
  "location": {
    "governorate_id": "latakia",
    "governorate_name": "Latakia",
    "district_id": "latakia-coast",
    "district_name": "Latakia Coast",
    "neighborhood_id": "ras-al-bassit",
    "neighborhood_name": "Ras al-Bassit",
    "latitude": 35.837,
    "longitude": 35.982
  },
  "media": [
    { "type": "image", "url": "https://cdn.example.com/villa-1.jpg" },
    { "type": "video", "url": "https://cdn.example.com/villa-tour.mp4" }
  ]
}
```

## Production-Safe Merge Steps

1. Add new schema fields as optional first if your current collection has live documents.
2. Deploy code that reads both old and new data. For example, map old `address` into `location.neighborhood_name` temporarily.
3. Backfill existing listings in batches:
   - infer `category_key` from old property type
   - map old city strings to `governorate_id`
   - set default enum values where missing:
     - `view_type: "None"`
     - `pool_status: "No Pool"`
     - `heating_type: "Electricity/AC"`
   - convert old `image_url` or `images` into `media: [{ type: "image", url }]`
4. After backfill, make required fields strict in the model and keep validation enabled.
5. Add indexes after backfill during low traffic:
   - category/location index
   - text index for title/description
   - favorite unique index
   - chat room unique index
6. Only then remove old free-text address fields from API responses.

## Sahibinden-Style Mechanics Without Brand Copying

The code follows the same structured marketplace mechanics:

- hierarchical categories
- tabular listing feed
- strict enum filters
- protected posting/favorites/messages
- detail response split into media, technical specs, description, and map data

It does not copy proprietary UI, branding, or protected assets.
